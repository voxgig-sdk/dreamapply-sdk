# Dreamapply TypeScript SDK Reference

Complete API reference for the Dreamapply TypeScript SDK.


## DreamapplySDK

### Constructor

```ts
new DreamapplySDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `DreamapplySDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = DreamapplySDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `DreamapplySDK` instance in test mode.


### Instance Methods

#### `AcademicTerm(data?: object)`

Create a new `AcademicTerm` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AcademicTermEntity` instance.

#### `AcademicYear(data?: object)`

Create a new `AcademicYear` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AcademicYearEntity` instance.

#### `Administrator(data?: object)`

Create a new `Administrator` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AdministratorEntity` instance.

#### `Applicant(data?: object)`

Create a new `Applicant` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApplicantEntity` instance.

#### `Application(data?: object)`

Create a new `Application` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApplicationEntity` instance.

#### `Course(data?: object)`

Create a new `Course` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CourseEntity` instance.

#### `Fee(data?: object)`

Create a new `Fee` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FeeEntity` instance.

#### `Institution(data?: object)`

Create a new `Institution` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InstitutionEntity` instance.

#### `Intake(data?: object)`

Create a new `Intake` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `IntakeEntity` instance.

#### `Invoice(data?: object)`

Create a new `Invoice` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InvoiceEntity` instance.

#### `Journal(data?: object)`

Create a new `Journal` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `JournalEntity` instance.

#### `Login(data?: object)`

Create a new `Login` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LoginEntity` instance.

#### `Scoresheet(data?: object)`

Create a new `Scoresheet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScoresheetEntity` instance.

#### `TableView(data?: object)`

Create a new `TableView` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TableViewEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `DreamapplySDK.test()`.

**Returns:** `DreamapplySDK` instance in test mode.


---

## AcademicTermEntity

```ts
const academic_term = client.AcademicTerm()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `finish` | `string` | No |  |
| `grace` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `start` | `string` | No |  |
| `type` | `Record<string, any>` | No |  |
| `year` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AcademicTerm().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AcademicTerm().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AcademicTermEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AcademicYearEntity

```ts
const academic_year = client.AcademicYear()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `start` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AcademicYear().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AcademicYear().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AcademicYearEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AdministratorEntity

```ts
const administrator = client.Administrator()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No |  |
| `function` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `outgoingEmail` | `string` | No |  |
| `outgoingName` | `string` | No |  |
| `phone` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Administrator().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Administrator().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AdministratorEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApplicantEntity

```ts
const applicant = client.Applicant()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `citizenship` | `string` | No |  |
| `email` | `string` | No |  |
| `id` | `number` | No |  |
| `matriculation` | `string` | No |  |
| `name` | `Record<string, any>` | No |  |
| `name_family` | `string` | No |  |
| `name_given` | `string` | No |  |
| `notes` | `string` | No |  |
| `phone` | `string` | No |  |
| `photo` | `Record<string, any>` | No |  |
| `reference` | `string` | No |  |
| `region` | `string` | No |  |
| `registered` | `string` | No |  |
| `tracker_ID` | `string` | No |  |
| `type` | `string` | No |  |
| `vatin` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Applicant().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Applicant().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Applicant().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApplicantEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ApplicationEntity

```ts
const application = client.Application()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `academicTerm` | `Record<string, any>` | No | Sub-resource (AcademicTerm); see the DreamApply SDK. |
| `activities` | `any[]` | No |  |
| `applicant` | `Record<string, any>` | No |  |
| `career` | `any[]` | No |  |
| `contact` | `any[]` | No |  |
| `created` | `string` | No |  |
| `education` | `any[]` | No |  |
| `extras` | `any[]` | No |  |
| `grades` | `any[]` | No |  |
| `home` | `any[]` | No |  |
| `host` | `any[]` | No |  |
| `id` | `number` | No |  |
| `languages` | `any[]` | No |  |
| `legal` | `any[]` | No |  |
| `misc` | `any[]` | No |  |
| `motivation` | `any[]` | No |  |
| `pdf` | `Record<string, any>` | No |  |
| `profile` | `any[]` | No |  |
| `residences` | `any[]` | No |  |
| `revised` | `string` | No |  |
| `status` | `string` | No |  |
| `submitted` | `string` | No |  |
| `visa` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Application().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Application().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApplicationEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CourseEntity

```ts
const course = client.Course()
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
| `departments` | `Record<string, any>` | No | Sub-resource (InstitutionDepartments); see the DreamApply SDK. |
| `duration` | `string` | No |  |
| `erasmus` | `string` | No |  |
| `featured` | `string` | No |  |
| `iban` | `string` | No |  |
| `id` | `number` | No |  |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Course().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Course().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Course().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CourseEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FeeEntity

```ts
const fee = client.Fee()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `name` | `string` | No |  |
| `notes` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Fee().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Fee().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FeeEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InstitutionEntity

```ts
const institution = client.Institution()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | No |  |
| `country` | `string` | No |  |
| `departments` | `Record<string, any>` | No | Sub-resource (InstitutionDepartments); see the DreamApply SDK. |
| `erasmus` | `string` | No |  |
| `iban` | `string` | No |  |
| `id` | `number` | No |  |
| `location` | `string` | No |  |
| `name` | `string` | No |  |
| `registration` | `string` | No |  |
| `status` | `string` | No |  |
| `vat` | `string` | No |  |
| `www` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Institution().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Institution().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InstitutionEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## IntakeEntity

```ts
const intake = client.Intake()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `arrival` | `string` | No |  |
| `commence` | `string` | No |  |
| `decision` | `Record<string, any>` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `policy` | `string` | No |  |
| `pre` | `Record<string, any>` | No |  |
| `start` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Intake().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Intake().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `IntakeEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InvoiceEntity

```ts
const invoice = client.Invoice()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `applicant` | `Record<string, any>` | No |  |
| `application` | `Record<string, any>` | No |  |
| `collected` | `string` | No |  |
| `course` | `Record<string, any>` | No |  |
| `currency` | `string` | No |  |
| `deadline` | `string` | No |  |
| `delivered` | `string` | No |  |
| `id` | `number` | No |  |
| `instructions` | `string` | No |  |
| `issued` | `string` | No |  |
| `nr` | `string` | No |  |
| `payer` | `Record<string, any>` | No |  |
| `reminded` | `string` | No |  |
| `smallprint` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Invoice().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Invoice().load({ id: 1 })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Invoice().remove({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InvoiceEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## JournalEntity

```ts
const journal = client.Journal()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `administrator` | `Record<string, any>` | No |  |
| `applicant` | `Record<string, any>` | No |  |
| `application` | `Record<string, any>` | No |  |
| `bind` | `any[]` | No |  |
| `course` | `Record<string, any>` | No |  |
| `document` | `Record<string, any>` | No |  |
| `event` | `string` | No |  |
| `flag` | `Record<string, any>` | No |  |
| `id` | `number` | No |  |
| `institution` | `Record<string, any>` | No |  |
| `invoice` | `Record<string, any>` | No |  |
| `logged` | `string` | No |  |
| `offer` | `Record<string, any>` | No |  |
| `tracker` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Journal().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `JournalEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LoginEntity

```ts
const login = client.Login()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No |  |
| `ip` | `string` | No |  |
| `logged` | `string` | No |  |
| `result` | `string` | No |  |
| `role` | `string` | No |  |
| `roleId` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Login().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LoginEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScoresheetEntity

```ts
const scoresheet = client.Scoresheet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `confirmed` | `string` | No |  |
| `created` | `string` | No |  |
| `date` | `string` | No |  |
| `depth` | `string` | No |  |
| `group` | `Record<string, any>` | No | Sub-resource (object); see the DreamApply SDK. |
| `id` | `string` | No |  |
| `instructions` | `string` | No |  |
| `language` | `string` | No |  |
| `maps` | `any[]` | No |  |
| `name` | `string` | No |  |
| `rangeMax` | `string` | No |  |
| `rangeMin` | `string` | No |  |
| `reference` | `string` | No |  |
| `scale` | `number` | No |  |
| `scored` | `string` | No |  |
| `scores` | `Record<string, any>` | No | Sub-resource (Scores); see the DreamApply SDK. |
| `subject` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Scoresheet().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Scoresheet().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScoresheetEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TableViewEntity

```ts
const table_view = client.TableView()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | `Record<string, any>` | No | Sub-resource (StreamInterface); see the DreamApply SDK. |
| `created` | `string` | No |  |
| `expires` | `string` | No |  |
| `id` | `number` | No |  |
| `mime` | `string` | No |  |
| `modified` | `string` | No |  |
| `name` | `string` | No |  |
| `size` | `number` | No |  |
| `tabledata` | `Record<string, any>` | No |  |
| `title` | `string` | No |  |
| `uploaded` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.TableView().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.TableView().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TableViewEntity` instance with the same client and
options.

#### `client()`

Return the parent `DreamapplySDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Request/response capture ring buffer for debugging |
| `idempotency` | 0.0.1 | Idempotency keys for safe retries of mutating operations |
| `metrics` | 0.0.1 | Statistics capture: per-operation counters and latency |
| `paging` | 0.0.1 | Pagination signals for list operations |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```ts
const client = new DreamapplySDK({
  feature: {
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Request/response capture ring buffer for debugging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency keys for safe retries of mutating operations.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Statistics capture: per-operation counters and latency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Pagination signals for list operations.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

