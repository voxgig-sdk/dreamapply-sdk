# Dreamapply Golang SDK Reference

Complete API reference for the Dreamapply Golang SDK.


## DreamapplySDK

### Constructor

```go
func NewDreamapplySDK(options map[string]any) *DreamapplySDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *DreamapplySDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *DreamapplySDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `AcademicTerm(data map[string]any) DreamapplyEntity`

Create a new `AcademicTerm` entity instance. Pass `nil` for no initial data.

#### `AcademicYear(data map[string]any) DreamapplyEntity`

Create a new `AcademicYear` entity instance. Pass `nil` for no initial data.

#### `Administrator(data map[string]any) DreamapplyEntity`

Create a new `Administrator` entity instance. Pass `nil` for no initial data.

#### `Applicant(data map[string]any) DreamapplyEntity`

Create a new `Applicant` entity instance. Pass `nil` for no initial data.

#### `Application(data map[string]any) DreamapplyEntity`

Create a new `Application` entity instance. Pass `nil` for no initial data.

#### `Course(data map[string]any) DreamapplyEntity`

Create a new `Course` entity instance. Pass `nil` for no initial data.

#### `Fee(data map[string]any) DreamapplyEntity`

Create a new `Fee` entity instance. Pass `nil` for no initial data.

#### `Institution(data map[string]any) DreamapplyEntity`

Create a new `Institution` entity instance. Pass `nil` for no initial data.

#### `Intake(data map[string]any) DreamapplyEntity`

Create a new `Intake` entity instance. Pass `nil` for no initial data.

#### `Invoice(data map[string]any) DreamapplyEntity`

Create a new `Invoice` entity instance. Pass `nil` for no initial data.

#### `Journal(data map[string]any) DreamapplyEntity`

Create a new `Journal` entity instance. Pass `nil` for no initial data.

#### `Login(data map[string]any) DreamapplyEntity`

Create a new `Login` entity instance. Pass `nil` for no initial data.

#### `Scoresheet(data map[string]any) DreamapplyEntity`

Create a new `Scoresheet` entity instance. Pass `nil` for no initial data.

#### `TableView(data map[string]any) DreamapplyEntity`

Create a new `TableView` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AcademicTermEntity

```go
academicTerm := client.AcademicTerm(nil)
fmt.Println(academicTerm.GetName()) // "academic_term"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finish` | `string` | No |  |
| `grace` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `start` | `string` | No |  |
| `type` | `map[string]any` | No |  |
| `year` | `map[string]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.AcademicTerm(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.AcademicTerm(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AcademicTermEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AcademicYearEntity

```go
academicYear := client.AcademicYear(nil)
fmt.Println(academicYear.GetName()) // "academic_year"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No |  |
| `start` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.AcademicYear(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.AcademicYear(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AcademicYearEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AdministratorEntity

```go
administrator := client.Administrator(nil)
fmt.Println(administrator.GetName()) // "administrator"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No |  |
| `function` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `outgoingEmail` | `string` | No |  |
| `outgoingName` | `string` | No |  |
| `phone` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Administrator(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Administrator(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AdministratorEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ApplicantEntity

```go
applicant := client.Applicant(nil)
fmt.Println(applicant.GetName()) // "applicant"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `citizenship` | `string` | No |  |
| `email` | `string` | No |  |
| `id` | `int` | No |  |
| `matriculation` | `string` | No |  |
| `name` | `map[string]any` | No |  |
| `name_family` | `string` | No |  |
| `name_given` | `string` | No |  |
| `notes` | `string` | No |  |
| `phone` | `string` | No |  |
| `photo` | `map[string]any` | No |  |
| `reference` | `string` | No |  |
| `region` | `string` | No |  |
| `registered` | `string` | No |  |
| `tracker_ID` | `string` | No |  |
| `type` | `string` | No |  |
| `vatin` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Applicant(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Applicant(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Applicant(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ApplicantEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ApplicationEntity

```go
application := client.Application(nil)
fmt.Println(application.GetName()) // "application"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `academicTerm` | `map[string]any` | No |  |
| `activities` | `[]any` | No |  |
| `applicant` | `map[string]any` | No |  |
| `career` | `[]any` | No |  |
| `contact` | `[]any` | No |  |
| `created` | `string` | No |  |
| `education` | `[]any` | No |  |
| `extras` | `[]any` | No |  |
| `grades` | `[]any` | No |  |
| `home` | `[]any` | No |  |
| `host` | `[]any` | No |  |
| `id` | `int` | No |  |
| `languages` | `[]any` | No |  |
| `legal` | `[]any` | No |  |
| `misc` | `[]any` | No |  |
| `motivation` | `[]any` | No |  |
| `pdf` | `map[string]any` | No |  |
| `profile` | `[]any` | No |  |
| `residences` | `[]any` | No |  |
| `revised` | `string` | No |  |
| `status` | `string` | No |  |
| `submitted` | `string` | No |  |
| `visa` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Application(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Application(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ApplicationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CourseEntity

```go
course := client.Course(nil)
fmt.Println(course.GetName()) // "course"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accreditation` | `string` | No |  |
| `address` | `string` | No |  |
| `awards_abbr` | `string` | No |  |
| `awards_full` | `string` | No |  |
| `code` | `string` | No |  |
| `codeInternal` | `string` | No |  |
| `country` | `string` | No |  |
| `credits` | `string` | No |  |
| `departments` | `map[string]any` | No |  |
| `duration` | `string` | No |  |
| `erasmus` | `string` | No |  |
| `featured` | `string` | No |  |
| `iban` | `string` | No |  |
| `id` | `int` | No |  |
| `institution` | `string` | No |  |
| `language` | `string` | No |  |
| `location` | `string` | No |  |
| `mode` | `string` | No |  |
| `name` | `string` | No |  |
| `prospect_uri` | `string` | No |  |
| `quota` | `string` | No |  |
| `registration` | `string` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `updated` | `string` | No |  |
| `vat` | `string` | No |  |
| `www` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Course(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Course(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Course(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CourseEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FeeEntity

```go
fee := client.Fee(nil)
fmt.Println(fee.GetName()) // "fee"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No |  |
| `notes` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Fee(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Fee(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FeeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InstitutionEntity

```go
institution := client.Institution(nil)
fmt.Println(institution.GetName()) // "institution"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `country` | `string` | No |  |
| `departments` | `map[string]any` | No |  |
| `erasmus` | `string` | No |  |
| `iban` | `string` | No |  |
| `id` | `int` | No |  |
| `location` | `string` | No |  |
| `name` | `string` | No |  |
| `registration` | `string` | No |  |
| `status` | `string` | No |  |
| `vat` | `string` | No |  |
| `www` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Institution(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Institution(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InstitutionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## IntakeEntity

```go
intake := client.Intake(nil)
fmt.Println(intake.GetName()) // "intake"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrival` | `string` | No |  |
| `commence` | `string` | No |  |
| `decision` | `map[string]any` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `policy` | `string` | No |  |
| `pre` | `map[string]any` | No |  |
| `start` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Intake(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Intake(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `IntakeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InvoiceEntity

```go
invoice := client.Invoice(nil)
fmt.Println(invoice.GetName()) // "invoice"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `applicant` | `map[string]any` | No |  |
| `application` | `map[string]any` | No |  |
| `collected` | `string` | No |  |
| `course` | `map[string]any` | No |  |
| `currency` | `string` | No |  |
| `deadline` | `string` | No |  |
| `delivered` | `string` | No |  |
| `id` | `int` | No |  |
| `instructions` | `string` | No |  |
| `issued` | `string` | No |  |
| `nr` | `string` | No |  |
| `payer` | `map[string]any` | No |  |
| `reminded` | `string` | No |  |
| `smallprint` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Invoice(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Invoice(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Invoice(nil).Remove(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InvoiceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## JournalEntity

```go
journal := client.Journal(nil)
fmt.Println(journal.GetName()) // "journal"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `administrator` | `map[string]any` | No |  |
| `applicant` | `map[string]any` | No |  |
| `application` | `map[string]any` | No |  |
| `bind` | `[]any` | No |  |
| `course` | `map[string]any` | No |  |
| `document` | `map[string]any` | No |  |
| `event` | `string` | No |  |
| `flag` | `map[string]any` | No |  |
| `id` | `int` | No |  |
| `institution` | `map[string]any` | No |  |
| `invoice` | `map[string]any` | No |  |
| `logged` | `string` | No |  |
| `offer` | `map[string]any` | No |  |
| `tracker` | `map[string]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Journal(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `JournalEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LoginEntity

```go
login := client.Login(nil)
fmt.Println(login.GetName()) // "login"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `ip` | `string` | No |  |
| `logged` | `string` | No |  |
| `result` | `string` | No |  |
| `role` | `string` | No |  |
| `roleId` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Login(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LoginEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ScoresheetEntity

```go
scoresheet := client.Scoresheet(nil)
fmt.Println(scoresheet.GetName()) // "scoresheet"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confirmed` | `string` | No |  |
| `created` | `string` | No |  |
| `date` | `string` | No |  |
| `depth` | `string` | No |  |
| `group` | `map[string]any` | No |  |
| `instructions` | `string` | No |  |
| `language` | `string` | No |  |
| `maps` | `[]any` | No |  |
| `name` | `string` | No |  |
| `rangeMax` | `string` | No |  |
| `rangeMin` | `string` | No |  |
| `reference` | `string` | No |  |
| `scale` | `int` | No |  |
| `scored` | `string` | No |  |
| `scores` | `map[string]any` | No |  |
| `subject` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Scoresheet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Scoresheet(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ScoresheetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TableViewEntity

```go
tableView := client.TableView(nil)
fmt.Println(tableView.GetName()) // "table_view"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `map[string]any` | No |  |
| `created` | `string` | No |  |
| `expires` | `string` | No |  |
| `id` | `int` | No |  |
| `mime` | `string` | No |  |
| `modified` | `string` | No |  |
| `name` | `string` | No |  |
| `size` | `int` | No |  |
| `tabledata` | `map[string]any` | No |  |
| `title` | `string` | No |  |
| `uploaded` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.TableView(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.TableView(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TableViewEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewDreamapplySDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

