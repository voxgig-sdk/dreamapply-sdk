# Dreamapply Python SDK



The Python SDK for the Dreamapply API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.AcademicTerm()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/dreamapply-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from dreamapply_sdk import DreamapplySDK

client = DreamapplySDK({
    "apikey": os.environ.get("DREAMAPPLY_APIKEY"),
})
```

### 2. List academicterm records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    academicterms = client.AcademicTerm().list()
    for academicterm in academicterms:
        print(academicterm)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an academicterm

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    academicterm = client.AcademicTerm().load({"id": 1})
    print(academicterm)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    tableviews = client.TableView().list()
    print(tableviews)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = DreamapplySDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
tableview = client.TableView().list()
# tableview contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = DreamapplySDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
DREAMAPPLY_TEST_LIVE=TRUE
DREAMAPPLY_APIKEY=<your-key>
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### DreamapplySDK

```python
from dreamapply_sdk import DreamapplySDK

client = DreamapplySDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = DreamapplySDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### DreamapplySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `AcademicTerm` | `(data) -> AcademicTermEntity` | Create an AcademicTerm entity instance. |
| `AcademicYear` | `(data) -> AcademicYearEntity` | Create an AcademicYear entity instance. |
| `Administrator` | `(data) -> AdministratorEntity` | Create an Administrator entity instance. |
| `Applicant` | `(data) -> ApplicantEntity` | Create an Applicant entity instance. |
| `Application` | `(data) -> ApplicationEntity` | Create an Application entity instance. |
| `Course` | `(data) -> CourseEntity` | Create a Course entity instance. |
| `Fee` | `(data) -> FeeEntity` | Create a Fee entity instance. |
| `Institution` | `(data) -> InstitutionEntity` | Create an Institution entity instance. |
| `Intake` | `(data) -> IntakeEntity` | Create an Intake entity instance. |
| `Invoice` | `(data) -> InvoiceEntity` | Create an Invoice entity instance. |
| `Journal` | `(data) -> JournalEntity` | Create a Journal entity instance. |
| `Login` | `(data) -> LoginEntity` | Create a Login entity instance. |
| `Scoresheet` | `(data) -> ScoresheetEntity` | Create a Scoresheet entity instance. |
| `TableView` | `(data) -> TableViewEntity` | Create a TableView entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

### Entities

#### AcademicTerm

| Field | Description |
| --- | --- |
| `finish` |  |
| `grace` |  |
| `id` |  |
| `name` |  |
| `start` |  |
| `type` |  |
| `year` |  |

Operations: List, Load.

API path: `/academic-terms`

#### AcademicYear

| Field | Description |
| --- | --- |
| `name` |  |
| `start` |  |

Operations: List, Load.

API path: `/academic-years`

#### Administrator

| Field | Description |
| --- | --- |
| `email` |  |
| `function` |  |
| `id` |  |
| `name` |  |
| `outgoingEmail` |  |
| `outgoingName` |  |
| `phone` |  |

Operations: List, Load.

API path: `/administrators`

#### Applicant

| Field | Description |
| --- | --- |
| `address` |  |
| `citizenship` |  |
| `email` |  |
| `id` |  |
| `matriculation` |  |
| `name` |  |
| `name_family` |  |
| `name_given` |  |
| `notes` |  |
| `phone` |  |
| `photo` |  |
| `reference` |  |
| `region` |  |
| `registered` |  |
| `tracker_ID` |  |
| `type` |  |
| `vatin` |  |

Operations: Create, List, Load.

API path: `/applicants`

#### Application

| Field | Description |
| --- | --- |
| `academicTerm` | Sub-resource (AcademicTerm); see the DreamApply SDK. |
| `activities` |  |
| `applicant` |  |
| `career` |  |
| `contact` |  |
| `created` |  |
| `education` |  |
| `extras` |  |
| `grades` |  |
| `home` |  |
| `host` |  |
| `id` |  |
| `languages` |  |
| `legal` |  |
| `misc` |  |
| `motivation` |  |
| `pdf` |  |
| `profile` |  |
| `residences` |  |
| `revised` |  |
| `status` |  |
| `submitted` |  |
| `visa` |  |

Operations: List, Load.

API path: `/applications`

#### Course

| Field | Description |
| --- | --- |
| `accreditation` |  |
| `address` |  |
| `awards_abbr` |  |
| `awards_full` |  |
| `code` |  |
| `codeInternal` |  |
| `country` |  |
| `credits` |  |
| `departments` | Sub-resource (InstitutionDepartments); see the DreamApply SDK. |
| `duration` |  |
| `erasmus` |  |
| `featured` |  |
| `iban` |  |
| `id` |  |
| `institution` |  |
| `language` |  |
| `location` |  |
| `mode` |  |
| `name` |  |
| `prospect_uri` |  |
| `quota` |  |
| `registration` |  |
| `status` |  |
| `type` |  |
| `updated` |  |
| `vat` |  |
| `www` |  |

Operations: Create, List, Load.

API path: `/courses`

#### Fee

| Field | Description |
| --- | --- |
| `name` |  |
| `notes` |  |
| `type` |  |

Operations: List, Load.

API path: `/fees`

#### Institution

| Field | Description |
| --- | --- |
| `address` |  |
| `country` |  |
| `departments` | Sub-resource (InstitutionDepartments); see the DreamApply SDK. |
| `erasmus` |  |
| `iban` |  |
| `id` |  |
| `location` |  |
| `name` |  |
| `registration` |  |
| `status` |  |
| `vat` |  |
| `www` |  |

Operations: List, Load.

API path: `/institutions`

#### Intake

| Field | Description |
| --- | --- |
| `arrival` |  |
| `commence` |  |
| `decision` |  |
| `id` |  |
| `name` |  |
| `policy` |  |
| `pre` |  |
| `start` |  |

Operations: List, Load.

API path: `/intakes`

#### Invoice

| Field | Description |
| --- | --- |
| `applicant` |  |
| `application` |  |
| `collected` |  |
| `course` |  |
| `currency` |  |
| `deadline` |  |
| `delivered` |  |
| `id` |  |
| `instructions` |  |
| `issued` |  |
| `nr` |  |
| `payer` |  |
| `reminded` |  |
| `smallprint` |  |

Operations: List, Load, Remove.

API path: `/invoices`

#### Journal

| Field | Description |
| --- | --- |
| `administrator` |  |
| `applicant` |  |
| `application` |  |
| `bind` |  |
| `course` |  |
| `document` |  |
| `event` |  |
| `flag` |  |
| `id` |  |
| `institution` |  |
| `invoice` |  |
| `logged` |  |
| `offer` |  |
| `tracker` |  |

Operations: List.

API path: `/journal`

#### Login

| Field | Description |
| --- | --- |
| `id` |  |
| `ip` |  |
| `logged` |  |
| `result` |  |
| `role` |  |
| `roleId` |  |

Operations: List.

API path: `/logins`

#### Scoresheet

| Field | Description |
| --- | --- |
| `confirmed` |  |
| `created` |  |
| `date` |  |
| `depth` |  |
| `group` | Sub-resource (object); see the DreamApply SDK. |
| `instructions` |  |
| `language` |  |
| `maps` |  |
| `name` |  |
| `rangeMax` |  |
| `rangeMin` |  |
| `reference` |  |
| `scale` |  |
| `scored` |  |
| `scores` | Sub-resource (Scores); see the DreamApply SDK. |
| `subject` |  |
| `type` |  |

Operations: List, Load.

API path: `/scoresheets`

#### TableView

| Field | Description |
| --- | --- |
| `content` | Sub-resource (StreamInterface); see the DreamApply SDK. |
| `created` |  |
| `expires` |  |
| `id` |  |
| `mime` |  |
| `modified` |  |
| `name` |  |
| `size` |  |
| `tabledata` |  |
| `title` |  |
| `uploaded` |  |

Operations: List, Load.

API path: `/tableviews`



## Entities


### AcademicTerm

Create an instance: `academic_term = client.AcademicTerm()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finish` | `str` |  |
| `grace` | `str` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `start` | `str` |  |
| `type` | `dict` |  |
| `year` | `dict` |  |

#### Example: Load

```python
academic_term = client.AcademicTerm().load({"id": 1})
```

#### Example: List

```python
academic_terms = client.AcademicTerm().list()
```


### AcademicYear

Create an instance: `academic_year = client.AcademicYear()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `str` |  |
| `start` | `str` |  |

#### Example: Load

```python
academic_year = client.AcademicYear().load({"id": 1})
```

#### Example: List

```python
academic_years = client.AcademicYear().list()
```


### Administrator

Create an instance: `administrator = client.Administrator()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `str` |  |
| `function` | `str` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `outgoingEmail` | `str` |  |
| `outgoingName` | `str` |  |
| `phone` | `str` |  |

#### Example: Load

```python
administrator = client.Administrator().load({"id": 1})
```

#### Example: List

```python
administrators = client.Administrator().list()
```


### Applicant

Create an instance: `applicant = client.Applicant()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `str` |  |
| `citizenship` | `str` |  |
| `email` | `str` |  |
| `id` | `int` |  |
| `matriculation` | `str` |  |
| `name` | `dict` |  |
| `name_family` | `str` |  |
| `name_given` | `str` |  |
| `notes` | `str` |  |
| `phone` | `str` |  |
| `photo` | `dict` |  |
| `reference` | `str` |  |
| `region` | `str` |  |
| `registered` | `str` |  |
| `tracker_ID` | `str` |  |
| `type` | `str` |  |
| `vatin` | `str` |  |

#### Example: Load

```python
applicant = client.Applicant().load({"id": 1})
```

#### Example: List

```python
applicants = client.Applicant().list()
```

#### Example: Create

```python
applicant = client.Applicant().create({
})
```


### Application

Create an instance: `application = client.Application()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `academicTerm` | `dict` | Sub-resource (AcademicTerm); see the DreamApply SDK. |
| `activities` | `list` |  |
| `applicant` | `dict` |  |
| `career` | `list` |  |
| `contact` | `list` |  |
| `created` | `str` |  |
| `education` | `list` |  |
| `extras` | `list` |  |
| `grades` | `list` |  |
| `home` | `list` |  |
| `host` | `list` |  |
| `id` | `int` |  |
| `languages` | `list` |  |
| `legal` | `list` |  |
| `misc` | `list` |  |
| `motivation` | `list` |  |
| `pdf` | `dict` |  |
| `profile` | `list` |  |
| `residences` | `list` |  |
| `revised` | `str` |  |
| `status` | `str` |  |
| `submitted` | `str` |  |
| `visa` | `list` |  |

#### Example: Load

```python
application = client.Application().load({"id": 1})
```

#### Example: List

```python
applications = client.Application().list()
```


### Course

Create an instance: `course = client.Course()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accreditation` | `str` |  |
| `address` | `str` |  |
| `awards_abbr` | `str` |  |
| `awards_full` | `str` |  |
| `code` | `str` |  |
| `codeInternal` | `str` |  |
| `country` | `str` |  |
| `credits` | `str` |  |
| `departments` | `dict` | Sub-resource (InstitutionDepartments); see the DreamApply SDK. |
| `duration` | `str` |  |
| `erasmus` | `str` |  |
| `featured` | `str` |  |
| `iban` | `str` |  |
| `id` | `int` |  |
| `institution` | `str` |  |
| `language` | `str` |  |
| `location` | `str` |  |
| `mode` | `str` |  |
| `name` | `str` |  |
| `prospect_uri` | `str` |  |
| `quota` | `str` |  |
| `registration` | `str` |  |
| `status` | `str` |  |
| `type` | `str` |  |
| `updated` | `str` |  |
| `vat` | `str` |  |
| `www` | `str` |  |

#### Example: Load

```python
course = client.Course().load({"id": 1})
```

#### Example: List

```python
courses = client.Course().list()
```

#### Example: Create

```python
course = client.Course().create({
})
```


### Fee

Create an instance: `fee = client.Fee()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `str` |  |
| `notes` | `str` |  |
| `type` | `str` |  |

#### Example: Load

```python
fee = client.Fee().load({"id": 1})
```

#### Example: List

```python
fees = client.Fee().list()
```


### Institution

Create an instance: `institution = client.Institution()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `str` |  |
| `country` | `str` |  |
| `departments` | `dict` | Sub-resource (InstitutionDepartments); see the DreamApply SDK. |
| `erasmus` | `str` |  |
| `iban` | `str` |  |
| `id` | `int` |  |
| `location` | `str` |  |
| `name` | `str` |  |
| `registration` | `str` |  |
| `status` | `str` |  |
| `vat` | `str` |  |
| `www` | `str` |  |

#### Example: Load

```python
institution = client.Institution().load({"id": 1})
```

#### Example: List

```python
institutions = client.Institution().list()
```


### Intake

Create an instance: `intake = client.Intake()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arrival` | `str` |  |
| `commence` | `str` |  |
| `decision` | `dict` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `policy` | `str` |  |
| `pre` | `dict` |  |
| `start` | `str` |  |

#### Example: Load

```python
intake = client.Intake().load({"id": 1})
```

#### Example: List

```python
intakes = client.Intake().list()
```


### Invoice

Create an instance: `invoice = client.Invoice()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applicant` | `dict` |  |
| `application` | `dict` |  |
| `collected` | `str` |  |
| `course` | `dict` |  |
| `currency` | `str` |  |
| `deadline` | `str` |  |
| `delivered` | `str` |  |
| `id` | `int` |  |
| `instructions` | `str` |  |
| `issued` | `str` |  |
| `nr` | `str` |  |
| `payer` | `dict` |  |
| `reminded` | `str` |  |
| `smallprint` | `str` |  |

#### Example: Load

```python
invoice = client.Invoice().load({"id": 1})
```

#### Example: List

```python
invoices = client.Invoice().list()
```


### Journal

Create an instance: `journal = client.Journal()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `administrator` | `dict` |  |
| `applicant` | `dict` |  |
| `application` | `dict` |  |
| `bind` | `list` |  |
| `course` | `dict` |  |
| `document` | `dict` |  |
| `event` | `str` |  |
| `flag` | `dict` |  |
| `id` | `int` |  |
| `institution` | `dict` |  |
| `invoice` | `dict` |  |
| `logged` | `str` |  |
| `offer` | `dict` |  |
| `tracker` | `dict` |  |

#### Example: List

```python
journals = client.Journal().list()
```


### Login

Create an instance: `login = client.Login()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `ip` | `str` |  |
| `logged` | `str` |  |
| `result` | `str` |  |
| `role` | `str` |  |
| `roleId` | `int` |  |

#### Example: List

```python
logins = client.Login().list()
```


### Scoresheet

Create an instance: `scoresheet = client.Scoresheet()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confirmed` | `str` |  |
| `created` | `str` |  |
| `date` | `str` |  |
| `depth` | `str` |  |
| `group` | `dict` | Sub-resource (object); see the DreamApply SDK. |
| `instructions` | `str` |  |
| `language` | `str` |  |
| `maps` | `list` |  |
| `name` | `str` |  |
| `rangeMax` | `str` |  |
| `rangeMin` | `str` |  |
| `reference` | `str` |  |
| `scale` | `int` |  |
| `scored` | `str` |  |
| `scores` | `dict` | Sub-resource (Scores); see the DreamApply SDK. |
| `subject` | `str` |  |
| `type` | `str` |  |

#### Example: Load

```python
scoresheet = client.Scoresheet().load({"id": 1})
```

#### Example: List

```python
scoresheets = client.Scoresheet().list()
```


### TableView

Create an instance: `table_view = client.TableView()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `dict` | Sub-resource (StreamInterface); see the DreamApply SDK. |
| `created` | `str` |  |
| `expires` | `str` |  |
| `id` | `int` |  |
| `mime` | `str` |  |
| `modified` | `str` |  |
| `name` | `str` |  |
| `size` | `int` |  |
| `tabledata` | `dict` |  |
| `title` | `str` |  |
| `uploaded` | `str` |  |

#### Example: Load

```python
table_view = client.TableView().load({"id": 1})
```

#### Example: List

```python
table_views = client.TableView().list()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── dreamapply_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`dreamapply_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
tableview = client.TableView()
tableview.list()

# tableview.data_get() now returns the tableview data from the last list
# tableview.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
