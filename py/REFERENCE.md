# Dreamapply Python SDK Reference

Complete API reference for the Dreamapply Python SDK.


## DreamapplySDK

### Constructor

```python
from dreamapply_sdk import DreamapplySDK

client = DreamapplySDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DreamapplySDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = DreamapplySDK.test()
```


### Instance Methods

#### `AcademicTerm(data=None)`

Create a new `AcademicTermEntity` instance. Pass `None` for no initial data.

#### `AcademicYear(data=None)`

Create a new `AcademicYearEntity` instance. Pass `None` for no initial data.

#### `Administrator(data=None)`

Create a new `AdministratorEntity` instance. Pass `None` for no initial data.

#### `Applicant(data=None)`

Create a new `ApplicantEntity` instance. Pass `None` for no initial data.

#### `Application(data=None)`

Create a new `ApplicationEntity` instance. Pass `None` for no initial data.

#### `Course(data=None)`

Create a new `CourseEntity` instance. Pass `None` for no initial data.

#### `Fee(data=None)`

Create a new `FeeEntity` instance. Pass `None` for no initial data.

#### `Institution(data=None)`

Create a new `InstitutionEntity` instance. Pass `None` for no initial data.

#### `Intake(data=None)`

Create a new `IntakeEntity` instance. Pass `None` for no initial data.

#### `Invoice(data=None)`

Create a new `InvoiceEntity` instance. Pass `None` for no initial data.

#### `Journal(data=None)`

Create a new `JournalEntity` instance. Pass `None` for no initial data.

#### `Login(data=None)`

Create a new `LoginEntity` instance. Pass `None` for no initial data.

#### `Scoresheet(data=None)`

Create a new `ScoresheetEntity` instance. Pass `None` for no initial data.

#### `TableView(data=None)`

Create a new `TableViewEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AcademicTermEntity

```python
academic_term = client.AcademicTerm()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finish` | `str` | No |  |
| `grace` | `str` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `start` | `str` | No |  |
| `type` | `dict` | No |  |
| `year` | `dict` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AcademicTerm().list()
for academic_term in results:
    print(academic_term)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AcademicTerm().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AcademicTermEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AcademicYearEntity

```python
academic_year = client.AcademicYear()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `name` | `str` | No |  |
| `start` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AcademicYear().list()
for academic_year in results:
    print(academic_year)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AcademicYear().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AcademicYearEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AdministratorEntity

```python
administrator = client.Administrator()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `str` | No |  |
| `function` | `str` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `outgoingEmail` | `str` | No |  |
| `outgoingName` | `str` | No |  |
| `phone` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Administrator().list()
for administrator in results:
    print(administrator)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Administrator().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AdministratorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApplicantEntity

```python
applicant = client.Applicant()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | No |  |
| `citizenship` | `str` | No |  |
| `email` | `str` | No |  |
| `id` | `int` | No |  |
| `matriculation` | `str` | No |  |
| `name` | `dict` | No |  |
| `name_family` | `str` | No |  |
| `name_given` | `str` | No |  |
| `notes` | `str` | No |  |
| `phone` | `str` | No |  |
| `photo` | `dict` | No |  |
| `reference` | `str` | No |  |
| `region` | `str` | No |  |
| `registered` | `str` | No |  |
| `tracker_ID` | `str` | No |  |
| `type` | `str` | No |  |
| `vatin` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Applicant().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Applicant().list()
for applicant in results:
    print(applicant)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Applicant().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicantEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ApplicationEntity

```python
application = client.Application()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `academicTerm` | `dict` | No | Sub-resource (AcademicTerm); see the DreamApply SDK. |
| `activities` | `list` | No |  |
| `applicant` | `dict` | No |  |
| `career` | `list` | No |  |
| `contact` | `list` | No |  |
| `created` | `str` | No |  |
| `education` | `list` | No |  |
| `extras` | `list` | No |  |
| `grades` | `list` | No |  |
| `home` | `list` | No |  |
| `host` | `list` | No |  |
| `id` | `int` | No |  |
| `languages` | `list` | No |  |
| `legal` | `list` | No |  |
| `misc` | `list` | No |  |
| `motivation` | `list` | No |  |
| `pdf` | `dict` | No |  |
| `profile` | `list` | No |  |
| `residences` | `list` | No |  |
| `revised` | `str` | No |  |
| `status` | `str` | No |  |
| `submitted` | `str` | No |  |
| `visa` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Application().list()
for application in results:
    print(application)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Application().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ApplicationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CourseEntity

```python
course = client.Course()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accreditation` | `str` | No |  |
| `address` | `str` | No |  |
| `awards_abbr` | `str` | No |  |
| `awards_full` | `str` | No |  |
| `code` | `str` | No |  |
| `codeInternal` | `str` | No |  |
| `country` | `str` | No |  |
| `credits` | `str` | No |  |
| `departments` | `dict` | No | Sub-resource (InstitutionDepartments); see the DreamApply SDK. |
| `duration` | `str` | No |  |
| `erasmus` | `str` | No |  |
| `featured` | `str` | No |  |
| `iban` | `str` | No |  |
| `id` | `int` | No |  |
| `institution` | `str` | No |  |
| `language` | `str` | No |  |
| `location` | `str` | No |  |
| `mode` | `str` | No |  |
| `name` | `str` | No |  |
| `prospect_uri` | `str` | No |  |
| `quota` | `str` | No |  |
| `registration` | `str` | No |  |
| `status` | `str` | No |  |
| `type` | `str` | No |  |
| `updated` | `str` | No |  |
| `vat` | `str` | No |  |
| `www` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Course().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Course().list()
for course in results:
    print(course)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Course().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CourseEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FeeEntity

```python
fee = client.Fee()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `name` | `str` | No |  |
| `notes` | `str` | No |  |
| `type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Fee().list()
for fee in results:
    print(fee)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Fee().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FeeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InstitutionEntity

```python
institution = client.Institution()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | No |  |
| `country` | `str` | No |  |
| `departments` | `dict` | No | Sub-resource (InstitutionDepartments); see the DreamApply SDK. |
| `erasmus` | `str` | No |  |
| `iban` | `str` | No |  |
| `id` | `int` | No |  |
| `location` | `str` | No |  |
| `name` | `str` | No |  |
| `registration` | `str` | No |  |
| `status` | `str` | No |  |
| `vat` | `str` | No |  |
| `www` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Institution().list()
for institution in results:
    print(institution)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Institution().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InstitutionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## IntakeEntity

```python
intake = client.Intake()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrival` | `str` | No |  |
| `commence` | `str` | No |  |
| `decision` | `dict` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `policy` | `str` | No |  |
| `pre` | `dict` | No |  |
| `start` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Intake().list()
for intake in results:
    print(intake)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Intake().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `IntakeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InvoiceEntity

```python
invoice = client.Invoice()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `applicant` | `dict` | No |  |
| `application` | `dict` | No |  |
| `collected` | `str` | No |  |
| `course` | `dict` | No |  |
| `currency` | `str` | No |  |
| `deadline` | `str` | No |  |
| `delivered` | `str` | No |  |
| `id` | `int` | No |  |
| `instructions` | `str` | No |  |
| `issued` | `str` | No |  |
| `nr` | `str` | No |  |
| `payer` | `dict` | No |  |
| `reminded` | `str` | No |  |
| `smallprint` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Invoice().list()
for invoice in results:
    print(invoice)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Invoice().load({"id": 1})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Invoice().remove({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InvoiceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## JournalEntity

```python
journal = client.Journal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `administrator` | `dict` | No |  |
| `applicant` | `dict` | No |  |
| `application` | `dict` | No |  |
| `bind` | `list` | No |  |
| `course` | `dict` | No |  |
| `document` | `dict` | No |  |
| `event` | `str` | No |  |
| `flag` | `dict` | No |  |
| `id` | `int` | No |  |
| `institution` | `dict` | No |  |
| `invoice` | `dict` | No |  |
| `logged` | `str` | No |  |
| `offer` | `dict` | No |  |
| `tracker` | `dict` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Journal().list()
for journal in results:
    print(journal)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `JournalEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LoginEntity

```python
login = client.Login()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `ip` | `str` | No |  |
| `logged` | `str` | No |  |
| `result` | `str` | No |  |
| `role` | `str` | No |  |
| `roleId` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Login().list()
for login in results:
    print(login)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LoginEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ScoresheetEntity

```python
scoresheet = client.Scoresheet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confirmed` | `str` | No |  |
| `created` | `str` | No |  |
| `date` | `str` | No |  |
| `depth` | `str` | No |  |
| `group` | `dict` | No | Sub-resource (object); see the DreamApply SDK. |
| `id` | `str` | No |  |
| `instructions` | `str` | No |  |
| `language` | `str` | No |  |
| `maps` | `list` | No |  |
| `name` | `str` | No |  |
| `rangeMax` | `str` | No |  |
| `rangeMin` | `str` | No |  |
| `reference` | `str` | No |  |
| `scale` | `int` | No |  |
| `scored` | `str` | No |  |
| `scores` | `dict` | No | Sub-resource (Scores); see the DreamApply SDK. |
| `subject` | `str` | No |  |
| `type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Scoresheet().list()
for scoresheet in results:
    print(scoresheet)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Scoresheet().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ScoresheetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TableViewEntity

```python
table_view = client.TableView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `dict` | No | Sub-resource (StreamInterface); see the DreamApply SDK. |
| `created` | `str` | No |  |
| `expires` | `str` | No |  |
| `id` | `int` | No |  |
| `mime` | `str` | No |  |
| `modified` | `str` | No |  |
| `name` | `str` | No |  |
| `size` | `int` | No |  |
| `tabledata` | `dict` | No |  |
| `title` | `str` | No |  |
| `uploaded` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.TableView().list()
for table_view in results:
    print(table_view)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.TableView().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TableViewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = DreamapplySDK({
    "feature": {
        "test": {"active": True},
    },
})
```

