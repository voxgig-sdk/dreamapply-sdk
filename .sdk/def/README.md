# Where this spec came from

DreamApply publishes no OpenAPI description. `dreamapply-openapi.json` was
**derived mechanically** from the vendor's own MIT-licensed PHP SDK,
[dream-group/dream-apply-sdk](https://github.com/dream-group/dream-apply-sdk).

That SDK is itself `@generated`: alongside its hand-written base classes in
`src/`, it autoloads a `gen/` directory of 126 generated files that encode the
API far more precisely than the prose knowledge base does — field names, PHP
types, nullability, enum domains, URL fragments, and, structurally, which
operations each collection supports.

## Reproducing it

```sh
git clone https://github.com/dream-group/dream-apply-sdk /tmp/da-sdk
python3 derive-spec.py /tmp/da-sdk dreamapply-openapi.json
```

Nothing in the spec is hand-edited. `derive-spec.py` is the entire provenance.

## What the derivation reads

| Source in the SDK | Becomes |
|---|---|
| `RootNamespace::buildCollection(Foos::class, baseUrl . '/foos')` | path |
| `@implements ArrayAccess<int, Foo>` | collection item type |
| `extends Collection` / `CollectionWithNoRecordRequests` | list + `GET /{id}` / list only |
| `use CollectionOfCreatable` / `CollectionOfDeletable` | `POST` / `DELETE /{id}` |
| `@property-read <type> $<name>` | schema property, with nullability |
| `const TYPE_* = '...'` | enum domain |
| `getObjectField('x', Y::class)` | embedded object, `$ref` to `Y` |
| `buildCollection(...)` in a getter | sub-resource **link** — excluded from the schema |
| `$this->data['name_family']` in a CreatableModel | request-body property |

The last two are the ones that matter for correctness. A getter that builds a
collection returns a *link*, not data, so emitting it as a field would put a
bogus column on every generated SDK. And a CreatableModel's `$this->data[...]`
keys are the **wire** names — `setNameFamily()` writes `name_family` — so the
setter names are ignored.

## Known limits

Stated plainly rather than papered over:

- **HTTP verbs are inferred** from base classes and traits, not declared.
- **PHP types are not JSON Schema.** `string` covers dates, enums and free text
  alike; the constants recover some enum domains, formats are simply absent.
- **The SDK may lag the live API.** Last upstream push 2025-12-18, tracking v8.
- **Coverage is what the SDK exposes**, which may be a subset of the API.
- **Nothing has been verified against a running instance.** DreamApply has no
  self-serve sandbox, so no request in this spec has been executed.

Requiredness is deliberately absent: `@property-read` means "the SDK exposes a
getter", not "the API always sends it", and the absence of `|null` is not
evidence of the opposite.
