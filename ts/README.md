# Dreamapply TypeScript SDK



The TypeScript SDK for the Dreamapply API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.AcademicTerm()` — each with a small set of operations (`list`, `load`, `create`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/dreamapply-sdk/releases](https://github.com/voxgig-sdk/dreamapply-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { DreamapplySDK } from '@voxgig-sdk/dreamapply'

const client = new DreamapplySDK({
  apikey: process.env.DREAMAPPLY_APIKEY,
})
```

### 2. List academicterm records

`list()` resolves to an array of AcademicTerm ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const academicterms = await client.AcademicTerm().list()

for (const academicterm of academicterms) {
  console.log(academicterm)
}
```

### 3. Load an academicterm

`load()` returns the entity directly and throws on failure:

```ts
try {
  const academicterm = await client.AcademicTerm().load({ id: 1 })
  console.log(academicterm)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const tableviews = await client.TableView().list()
  console.log(tableviews)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = DreamapplySDK.test()

const tableview = await client.TableView().list()
// tableview is the entity, populated with mock response data
// — call tableview.data() for the record itself
console.log(tableview)
```

You can also use the instance method:

```ts
const client = new DreamapplySDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.TableView()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new DreamapplySDK({
  apikey: '...',
  extend: [logger],
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
cd ts && npm test
```


## Reference

### DreamapplySDK

#### Constructor

```ts
new DreamapplySDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `AcademicTerm(data?)` | `AcademicTermEntity` | Create an AcademicTerm entity instance. |
| `AcademicYear(data?)` | `AcademicYearEntity` | Create an AcademicYear entity instance. |
| `Administrator(data?)` | `AdministratorEntity` | Create an Administrator entity instance. |
| `Applicant(data?)` | `ApplicantEntity` | Create an Applicant entity instance. |
| `Application(data?)` | `ApplicationEntity` | Create an Application entity instance. |
| `Course(data?)` | `CourseEntity` | Create a Course entity instance. |
| `Fee(data?)` | `FeeEntity` | Create a Fee entity instance. |
| `Institution(data?)` | `InstitutionEntity` | Create an Institution entity instance. |
| `Intake(data?)` | `IntakeEntity` | Create an Intake entity instance. |
| `Invoice(data?)` | `InvoiceEntity` | Create an Invoice entity instance. |
| `Journal(data?)` | `JournalEntity` | Create a Journal entity instance. |
| `Login(data?)` | `LoginEntity` | Create a Login entity instance. |
| `Scoresheet(data?)` | `ScoresheetEntity` | Create a Scoresheet entity instance. |
| `TableView(data?)` | `TableViewEntity` | Create a TableView entity instance. |
| `tester(testopts?, sdkopts?)` | `DreamapplySDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `DreamapplySDK.test(testopts?, sdkopts?)` | `DreamapplySDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): DreamapplySDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list, load.

API path: `/academic-terms`

#### AcademicYear

| Field | Description |
| --- | --- |
| `name` |  |
| `start` |  |

Operations: list, load.

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

Operations: list, load.

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

Operations: create, list, load.

API path: `/applicants`

#### Application

| Field | Description |
| --- | --- |
| `academicTerm` |  |
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

Operations: list, load.

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
| `departments` |  |
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

Operations: create, list, load.

API path: `/courses`

#### Fee

| Field | Description |
| --- | --- |
| `name` |  |
| `notes` |  |
| `type` |  |

Operations: list, load.

API path: `/fees`

#### Institution

| Field | Description |
| --- | --- |
| `address` |  |
| `country` |  |
| `departments` |  |
| `erasmus` |  |
| `iban` |  |
| `id` |  |
| `location` |  |
| `name` |  |
| `registration` |  |
| `status` |  |
| `vat` |  |
| `www` |  |

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load, remove.

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

Operations: list.

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

Operations: list.

API path: `/logins`

#### Scoresheet

| Field | Description |
| --- | --- |
| `confirmed` |  |
| `created` |  |
| `date` |  |
| `depth` |  |
| `group` |  |
| `instructions` |  |
| `language` |  |
| `maps` |  |
| `name` |  |
| `rangeMax` |  |
| `rangeMin` |  |
| `reference` |  |
| `scale` |  |
| `scored` |  |
| `scores` |  |
| `subject` |  |
| `type` |  |

Operations: list, load.

API path: `/scoresheets`

#### TableView

| Field | Description |
| --- | --- |
| `content` |  |
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

Operations: list, load.

API path: `/tableviews`



## Entities


### AcademicTerm

Create an instance: `const academic_term = client.AcademicTerm()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finish` | `string` |  |
| `grace` | `string` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `start` | `string` |  |
| `type` | `Record<string, any>` |  |
| `year` | `Record<string, any>` |  |

#### Example: Load

```ts
const academic_term = await client.AcademicTerm().load({ id: 1 })
```

#### Example: List

```ts
const academic_terms = await client.AcademicTerm().list()
```


### AcademicYear

Create an instance: `const academic_year = client.AcademicYear()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |
| `start` | `string` |  |

#### Example: Load

```ts
const academic_year = await client.AcademicYear().load({ id: 1 })
```

#### Example: List

```ts
const academic_years = await client.AcademicYear().list()
```


### Administrator

Create an instance: `const administrator = client.Administrator()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `function` | `string` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `outgoingEmail` | `string` |  |
| `outgoingName` | `string` |  |
| `phone` | `string` |  |

#### Example: Load

```ts
const administrator = await client.Administrator().load({ id: 1 })
```

#### Example: List

```ts
const administrators = await client.Administrator().list()
```


### Applicant

Create an instance: `const applicant = client.Applicant()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `citizenship` | `string` |  |
| `email` | `string` |  |
| `id` | `number` |  |
| `matriculation` | `string` |  |
| `name` | `Record<string, any>` |  |
| `name_family` | `string` |  |
| `name_given` | `string` |  |
| `notes` | `string` |  |
| `phone` | `string` |  |
| `photo` | `Record<string, any>` |  |
| `reference` | `string` |  |
| `region` | `string` |  |
| `registered` | `string` |  |
| `tracker_ID` | `string` |  |
| `type` | `string` |  |
| `vatin` | `string` |  |

#### Example: Load

```ts
const applicant = await client.Applicant().load({ id: 1 })
```

#### Example: List

```ts
const applicants = await client.Applicant().list()
```

#### Example: Create

```ts
const applicant = await client.Applicant().create({
})
```


### Application

Create an instance: `const application = client.Application()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `academicTerm` | `Record<string, any>` |  |
| `activities` | `any[]` |  |
| `applicant` | `Record<string, any>` |  |
| `career` | `any[]` |  |
| `contact` | `any[]` |  |
| `created` | `string` |  |
| `education` | `any[]` |  |
| `extras` | `any[]` |  |
| `grades` | `any[]` |  |
| `home` | `any[]` |  |
| `host` | `any[]` |  |
| `id` | `number` |  |
| `languages` | `any[]` |  |
| `legal` | `any[]` |  |
| `misc` | `any[]` |  |
| `motivation` | `any[]` |  |
| `pdf` | `Record<string, any>` |  |
| `profile` | `any[]` |  |
| `residences` | `any[]` |  |
| `revised` | `string` |  |
| `status` | `string` |  |
| `submitted` | `string` |  |
| `visa` | `any[]` |  |

#### Example: Load

```ts
const application = await client.Application().load({ id: 1 })
```

#### Example: List

```ts
const applications = await client.Application().list()
```


### Course

Create an instance: `const course = client.Course()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accreditation` | `string` |  |
| `address` | `string` |  |
| `awards_abbr` | `string` |  |
| `awards_full` | `string` |  |
| `code` | `string` |  |
| `codeInternal` | `string` |  |
| `country` | `string` |  |
| `credits` | `string` |  |
| `departments` | `Record<string, any>` |  |
| `duration` | `string` |  |
| `erasmus` | `string` |  |
| `featured` | `string` |  |
| `iban` | `string` |  |
| `id` | `number` |  |
| `institution` | `string` |  |
| `language` | `string` |  |
| `location` | `string` |  |
| `mode` | `string` |  |
| `name` | `string` |  |
| `prospect_uri` | `string` |  |
| `quota` | `string` |  |
| `registration` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `updated` | `string` |  |
| `vat` | `string` |  |
| `www` | `string` |  |

#### Example: Load

```ts
const course = await client.Course().load({ id: 1 })
```

#### Example: List

```ts
const courses = await client.Course().list()
```

#### Example: Create

```ts
const course = await client.Course().create({
})
```


### Fee

Create an instance: `const fee = client.Fee()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` |  |
| `notes` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```ts
const fee = await client.Fee().load({ id: 1 })
```

#### Example: List

```ts
const fees = await client.Fee().list()
```


### Institution

Create an instance: `const institution = client.Institution()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `country` | `string` |  |
| `departments` | `Record<string, any>` |  |
| `erasmus` | `string` |  |
| `iban` | `string` |  |
| `id` | `number` |  |
| `location` | `string` |  |
| `name` | `string` |  |
| `registration` | `string` |  |
| `status` | `string` |  |
| `vat` | `string` |  |
| `www` | `string` |  |

#### Example: Load

```ts
const institution = await client.Institution().load({ id: 1 })
```

#### Example: List

```ts
const institutions = await client.Institution().list()
```


### Intake

Create an instance: `const intake = client.Intake()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arrival` | `string` |  |
| `commence` | `string` |  |
| `decision` | `Record<string, any>` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `policy` | `string` |  |
| `pre` | `Record<string, any>` |  |
| `start` | `string` |  |

#### Example: Load

```ts
const intake = await client.Intake().load({ id: 1 })
```

#### Example: List

```ts
const intakes = await client.Intake().list()
```


### Invoice

Create an instance: `const invoice = client.Invoice()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applicant` | `Record<string, any>` |  |
| `application` | `Record<string, any>` |  |
| `collected` | `string` |  |
| `course` | `Record<string, any>` |  |
| `currency` | `string` |  |
| `deadline` | `string` |  |
| `delivered` | `string` |  |
| `id` | `number` |  |
| `instructions` | `string` |  |
| `issued` | `string` |  |
| `nr` | `string` |  |
| `payer` | `Record<string, any>` |  |
| `reminded` | `string` |  |
| `smallprint` | `string` |  |

#### Example: Load

```ts
const invoice = await client.Invoice().load({ id: 1 })
```

#### Example: List

```ts
const invoices = await client.Invoice().list()
```


### Journal

Create an instance: `const journal = client.Journal()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `administrator` | `Record<string, any>` |  |
| `applicant` | `Record<string, any>` |  |
| `application` | `Record<string, any>` |  |
| `bind` | `any[]` |  |
| `course` | `Record<string, any>` |  |
| `document` | `Record<string, any>` |  |
| `event` | `string` |  |
| `flag` | `Record<string, any>` |  |
| `id` | `number` |  |
| `institution` | `Record<string, any>` |  |
| `invoice` | `Record<string, any>` |  |
| `logged` | `string` |  |
| `offer` | `Record<string, any>` |  |
| `tracker` | `Record<string, any>` |  |

#### Example: List

```ts
const journals = await client.Journal().list()
```


### Login

Create an instance: `const login = client.Login()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` |  |
| `ip` | `string` |  |
| `logged` | `string` |  |
| `result` | `string` |  |
| `role` | `string` |  |
| `roleId` | `number` |  |

#### Example: List

```ts
const logins = await client.Login().list()
```


### Scoresheet

Create an instance: `const scoresheet = client.Scoresheet()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confirmed` | `string` |  |
| `created` | `string` |  |
| `date` | `string` |  |
| `depth` | `string` |  |
| `group` | `Record<string, any>` |  |
| `instructions` | `string` |  |
| `language` | `string` |  |
| `maps` | `any[]` |  |
| `name` | `string` |  |
| `rangeMax` | `string` |  |
| `rangeMin` | `string` |  |
| `reference` | `string` |  |
| `scale` | `number` |  |
| `scored` | `string` |  |
| `scores` | `Record<string, any>` |  |
| `subject` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```ts
const scoresheet = await client.Scoresheet().load({ id: 1 })
```

#### Example: List

```ts
const scoresheets = await client.Scoresheet().list()
```


### TableView

Create an instance: `const table_view = client.TableView()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `Record<string, any>` |  |
| `created` | `string` |  |
| `expires` | `string` |  |
| `id` | `number` |  |
| `mime` | `string` |  |
| `modified` | `string` |  |
| `name` | `string` |  |
| `size` | `number` |  |
| `tabledata` | `Record<string, any>` |  |
| `title` | `string` |  |
| `uploaded` | `string` |  |

#### Example: Load

```ts
const table_view = await client.TableView().load({ id: 1 })
```

#### Example: List

```ts
const table_views = await client.TableView().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
dreamapply/
├── src/
│   ├── DreamapplySDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { DreamapplySDK } from '@voxgig-sdk/dreamapply'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const tableview = client.TableView()
await tableview.list()

// tableview.data() now returns the tableview data from the last `list`
// tableview.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
