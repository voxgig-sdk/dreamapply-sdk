#!/usr/bin/env python3
"""Derive an OpenAPI 3.0.3 spec for the DreamApply API from the vendor's own
PHP SDK (github.com/dream-group/dream-apply-sdk, MIT).

That SDK is itself @generated: `gen/` holds 126 generated files that encode the
API far more precisely than the prose knowledge base does — field names, PHP
types, nullability, enum domains, URL fragments, and (structurally, via base
class and traits) which operations each collection supports.

This script is the whole provenance of .sdk/def/dreamapply-openapi.json. Re-run
it against a newer SDK checkout to regenerate the spec; nothing here is
hand-edited.

Grammar it relies on, all verified against the checkout:
  RootNamespace   buildCollection(Foos::class, $this->baseUrl . '/foos', ...)
  Collection      @implements ArrayAccess<int, Foo>      -> item model
                  extends Collection                      -> list + GET /{id}
                  extends CollectionWithNoRecordRequests  -> list only
                  use CollectionOfCreatable               -> POST
                  use CollectionOfDeletable               -> DELETE /{id}
  Record          @property-read <type> $<name>           -> schema property
                  const FOO_BAR = 'Baz'                   -> enum domain
"""
import json, re, sys, os
from pathlib import Path

SDK = Path(sys.argv[1])
GEN = SDK / 'gen'
MODELS = GEN / 'Models'

PHP_JSON = {
    'int': ('integer', None), 'integer': ('integer', None),
    'string': ('string', None), 'bool': ('boolean', None), 'boolean': ('boolean', None),
    'float': ('number', 'float'), 'double': ('number', 'double'),
    'array': ('array', None), 'mixed': (None, None),
}

def read(p):
    return p.read_text(encoding='utf-8', errors='replace')

def navigation_props(src):
    """Properties whose getter builds a sub-resource rather than returning data.

    The SDK draws this line precisely:

        getEmail()        -> return $this->getRawField('email');
        getApplications() -> buildCollection(X::class, $this->getRawField('applications'))

    The second kind IS present in the JSON, but it holds a LINK, not applicant
    data. Emitting it as a field would put a bogus column on every generated
    SDK, so those are excluded and the sub-resource is left to its own endpoint.
    """
    nav = set()
    for m in re.finditer(r'function\s+get(\w+)\(\)\s*\{(.*?)\n    \}', src, re.S):
        method, body = m.group(1), m.group(2)
        if 'buildCollection' in body or 'buildRecord' in body or 'buildSimpleArray' in body:
            # Two forms: the link is a raw field, or the URL is built from
            # baseUrl. The second names no field, so fall back to the getter
            # name (getEmails -> emails).
            found = re.findall(r"getRawField\('(\w+)'\)", body)
            nav.update(found if found else [method[0].lower() + method[1:]])
    return nav


def embedded_objects(src):
    """getObjectField('name', ApplicantName::class) -> {'name': 'ApplicantName'}

    Unlike a sub-resource link, this really is a nested object inside the JSON,
    so it earns a $ref to the nested model's own schema rather than being
    flattened to an opaque `type: object`.
    """
    return {m.group(1): m.group(2)
            for m in re.finditer(r"getObjectField\('(\w+)',\s*(\w+)::class\)", src)}


def docblock_props(src):
    """@property-read <type> $<name> -> [(name, type, nullable)]"""
    out = []
    for m in re.finditer(r'@property-read\s+([^\s]+)\s+\$(\w+)', src):
        raw, name = m.group(1), m.group(2)
        parts = [p for p in raw.split('|')]
        nullable = 'null' in parts
        types = [p for p in parts if p != 'null']
        out.append((name, types[0] if types else 'mixed', nullable))
    return out

def constants(src):
    """const TYPE_NATURAL = 'Natural'; grouped by prefix -> {prefix: [values]}"""
    groups = {}
    for m in re.finditer(r"const\s+([A-Z][A-Z0-9_]*)\s*=\s*'([^']*)'", src):
        const, val = m.group(1), m.group(2)
        prefix = const.rsplit('_', 1)[0] if '_' in const else const
        groups.setdefault(prefix, []).append(val)
    return groups

def item_type(src):
    m = re.search(r'@implements\s+ArrayAccess<[^,]+,\s*(\w+)>', src)
    return m.group(1) if m else None

def root_collections():
    src = read(MODELS / 'RootNamespace.php')
    out = []
    for m in re.finditer(r"buildCollection\(\s*(\w+)::class,\s*\$this->baseUrl\s*\.\s*'([^']+)'", src):
        out.append((m.group(1), m.group(2)))
    return out

def enum_for(field, groups):
    """Match a field to a constant group by name (type -> TYPE_*)."""
    want = field.upper()
    for prefix, vals in groups.items():
        if prefix == want:
            return sorted(set(vals))
    return None

def schema_for(model_name, seen):
    """Build a JSON Schema object for a Record model."""
    f = MODELS / f'{model_name}.php'
    if not f.exists():
        return None
    src = read(f)
    props, groups = {}, constants(src)
    nav = navigation_props(src)
    embedded = embedded_objects(src)
    for name, ptype, nullable in docblock_props(src):
        if name in nav:
            continue
        if name in embedded:
            sub = embedded[name]
            if sub not in seen:
                seen.add(sub)
                subsch = schema_for(sub, seen)
                if subsch:
                    schemas[sub] = subsch
            props[name] = ({'$ref': f'#/components/schemas/{sub}'}
                           if sub in schemas else
                           {'type': 'object',
                            'description': f'Embedded {sub}; shape not resolvable from the SDK.'})
            continue
        jt, fmt = PHP_JSON.get(ptype, (None, None))
        if jt is None:
            # A model-typed property is a sub-resource, not a scalar field.
            # Keep it as an opaque object rather than inventing a shape.
            prop = {'type': 'object',
                    'description': f'Sub-resource ({ptype}); see the DreamApply SDK.'}
        else:
            prop = {'type': jt}
            if fmt:
                prop['format'] = fmt
            en = enum_for(name, groups)
            if en and jt == 'string':
                prop['enum'] = en
        if nullable:
            prop['nullable'] = True
        props[name] = prop
    if not props:
        return None
    # No `required`: the SDK carries no requiredness signal. `@property-read`
    # means "the SDK exposes a getter", not "the API always sends it", and the
    # absence of `|null` is not evidence of the opposite. Claiming required
    # here would be inventing information.
    return {'type': 'object', 'properties': props}

def creatable_fields(model_name):
    f = GEN / 'CreatableModels' / f'{model_name}.php'
    if not f.exists():
        return None
    src = read(f)
    # ONLY the $this->data['...'] keys. Those are the WIRE names; the setter
    # names are just PHP camelCase over them — setNameFamily() writes
    # 'name_family'. Merging both sources emitted each field twice, once under
    # a name the server has never seen.
    names = sorted(set(re.findall(r"\$this->data\['(\w+)'\]", src)))
    fields = {n: {'type': 'string'} for n in names}
    return {'type': 'object', 'properties': fields} if fields else None

def singular(n):
    if n.endswith('ies'): return n[:-3] + 'y'
    if n.endswith('ses'): return n[:-2]
    if n.endswith('s'):   return n[:-1]
    return n

paths, schemas = {}, {}
stats = {'collections': 0, 'ops': 0, 'schemas': 0, 'enums': 0, 'skipped': []}

for coll_class, frag in root_collections():
    cf = MODELS / f'{coll_class}.php'
    if not cf.exists():
        stats['skipped'].append(coll_class); continue
    csrc = read(cf)
    item = item_type(csrc) or singular(coll_class)
    sch = schema_for(item, set())
    if sch is None:
        stats['skipped'].append(f'{coll_class} (no fields on {item})'); continue

    schemas[item] = sch
    stats['schemas'] += 1
    stats['enums'] += sum(1 for p in sch['properties'].values() if 'enum' in p)
    stats['collections'] += 1

    no_record = 'extends CollectionWithNoRecordRequests' in csrc
    creatable = 'CollectionOfCreatable' in csrc
    deletable = 'CollectionOfDeletable' in csrc
    ref = {'$ref': f'#/components/schemas/{item}'}
    tag = coll_class

    p = paths.setdefault(frag, {})
    p['get'] = {
        'tags': [tag], 'operationId': f'list{coll_class}',
        'summary': f'List {coll_class}',
        'responses': {'200': {'description': f'{coll_class} list', 'content':
            {'application/json': {'schema': {'type': 'array', 'items': ref}}}}},
    }
    stats['ops'] += 1

    if creatable:
        body = creatable_fields(item) or {'type': 'object'}
        schemas[f'{item}Create'] = body
        p['post'] = {
            'tags': [tag], 'operationId': f'create{item}',
            'summary': f'Create a {item}',
            'requestBody': {'required': True, 'content': {'application/json':
                {'schema': {'$ref': f'#/components/schemas/{item}Create'}}}},
            'responses': {'201': {'description': f'{item} created', 'content':
                {'application/json': {'schema': ref}}}},
        }
        stats['ops'] += 1

    if not no_record:
        idp = {'name': 'id', 'in': 'path', 'required': True, 'schema': {'type': 'integer'}}
        rp = paths.setdefault(f'{frag}/{{id}}', {})
        rp['get'] = {
            'tags': [tag], 'operationId': f'get{item}',
            'summary': f'Fetch one {item}', 'parameters': [idp],
            'responses': {'200': {'description': item, 'content':
                {'application/json': {'schema': ref}}}},
        }
        stats['ops'] += 1
        if deletable:
            rp['delete'] = {
                'tags': [tag], 'operationId': f'delete{item}',
                'summary': f'Delete a {item}', 'parameters': [idp],
                'responses': {'204': {'description': 'Deleted'}},
            }
            stats['ops'] += 1

spec = {
    'openapi': '3.0.3',
    'info': {
        'title': 'DreamApply API',
        'version': '8',
        'description': (
            'Student admissions and application management API.\n\n'
            'UNOFFICIAL SPEC. DreamApply publishes no OpenAPI description. This spec was '
            'DERIVED MECHANICALLY from the vendor\'s own MIT-licensed PHP SDK '
            '(github.com/dream-group/dream-apply-sdk), whose gen/ directory is itself '
            '@generated and encodes field names, PHP types, nullability, enum domains and '
            'URL structure.\n\n'
            'Known limits, stated plainly: HTTP verbs are inferred from the SDK\'s base '
            'classes and traits rather than declared; PHP types carry no JSON formats, so '
            'dates appear as plain strings; and the SDK may lag the live API. Nothing here '
            'has been verified against a running instance.'
        ),
        'license': {'name': 'MIT'},
    },
    'servers': [{
        'url': 'https://{instance}.dreamapply.com/api',
        'description': 'Per-tenant instance',
        'variables': {'instance': {'default': 'demo',
                      'description': 'Your DreamApply instance name'}},
    }],
    'components': {
        'securitySchemes': {'apiKey': {'type': 'http', 'scheme': 'bearer'}},
        'schemas': dict(sorted(schemas.items())),
    },
    'security': [{'apiKey': []}],
    'paths': dict(sorted(paths.items())),
}

out = Path(sys.argv[2])
out.write_text(json.dumps(spec, indent=2) + '\n', encoding='utf-8')
print(f"collections: {stats['collections']}  operations: {stats['ops']}  "
      f"schemas: {stats['schemas']}  enum fields: {stats['enums']}")
if stats['skipped']:
    print('skipped:', ', '.join(stats['skipped']))
print('wrote', out)
