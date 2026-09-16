# Dreamapply Golang SDK



The Golang SDK for the Dreamapply API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.AcademicTerm(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `py`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/dreamapply-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/dreamapply-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/dreamapply-sdk/go=../dreamapply-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/dreamapply-sdk/go"
)

func main() {
    client := sdk.NewDreamapplySDK(map[string]any{
        "apikey": os.Getenv("DREAMAPPLY_APIKEY"),
    "server": map[string]any{
        "instance": "<instance>",
    },
    })

    // List academicTerm records — the value is the array of records itself.
    academicTerms, err := client.AcademicTerm(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range academicTerms.([]any) {
        fmt.Println(item)
    }

    // Load a single academicTerm — the value is the loaded record.
    academicTerm, err := client.AcademicTerm(nil).Load(map[string]any{"id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(academicTerm)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
tableviews, err := client.TableView(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = tableviews
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

tableView, err := client.TableView(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(tableView) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewDreamapplySDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewDreamapplySDK

```go
func NewDreamapplySDK(options map[string]any) *DreamapplySDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *DreamapplySDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### DreamapplySDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `AcademicTerm` | `(data map[string]any) DreamapplyEntity` | Create an AcademicTerm entity instance. |
| `AcademicYear` | `(data map[string]any) DreamapplyEntity` | Create an AcademicYear entity instance. |
| `Administrator` | `(data map[string]any) DreamapplyEntity` | Create an Administrator entity instance. |
| `Applicant` | `(data map[string]any) DreamapplyEntity` | Create an Applicant entity instance. |
| `Application` | `(data map[string]any) DreamapplyEntity` | Create an Application entity instance. |
| `Course` | `(data map[string]any) DreamapplyEntity` | Create a Course entity instance. |
| `Fee` | `(data map[string]any) DreamapplyEntity` | Create a Fee entity instance. |
| `Institution` | `(data map[string]any) DreamapplyEntity` | Create an Institution entity instance. |
| `Intake` | `(data map[string]any) DreamapplyEntity` | Create an Intake entity instance. |
| `Invoice` | `(data map[string]any) DreamapplyEntity` | Create an Invoice entity instance. |
| `Journal` | `(data map[string]any) DreamapplyEntity` | Create a Journal entity instance. |
| `Login` | `(data map[string]any) DreamapplyEntity` | Create a Login entity instance. |
| `Scoresheet` | `(data map[string]any) DreamapplyEntity` | Create a Scoresheet entity instance. |
| `TableView` | `(data map[string]any) DreamapplyEntity` | Create a TableView entity instance. |

### Entity interface (DreamapplyEntity)

All entities implement the `DreamapplyEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    academicTerm, err := client.AcademicTerm(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // academicTerm is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### AcademicTerm

| Field | Description |
| --- | --- |
| `"finish"` |  |
| `"grace"` |  |
| `"id"` |  |
| `"name"` |  |
| `"start"` |  |
| `"type"` |  |
| `"year"` |  |

Operations: List, Load.

API path: `/academic-terms`

#### AcademicYear

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"name"` |  |
| `"start"` |  |

Operations: List, Load.

API path: `/academic-years`

#### Administrator

| Field | Description |
| --- | --- |
| `"email"` |  |
| `"function"` |  |
| `"id"` |  |
| `"name"` |  |
| `"outgoingEmail"` |  |
| `"outgoingName"` |  |
| `"phone"` |  |

Operations: List, Load.

API path: `/administrators`

#### Applicant

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"citizenship"` |  |
| `"email"` |  |
| `"id"` |  |
| `"matriculation"` |  |
| `"name"` |  |
| `"name_family"` |  |
| `"name_given"` |  |
| `"notes"` |  |
| `"phone"` |  |
| `"photo"` |  |
| `"reference"` |  |
| `"region"` |  |
| `"registered"` |  |
| `"tracker_ID"` |  |
| `"type"` |  |
| `"vatin"` |  |

Operations: Create, List, Load.

API path: `/applicants`

#### Application

| Field | Description |
| --- | --- |
| `"academicTerm"` | Sub-resource (AcademicTerm); see the DreamApply SDK. |
| `"activities"` |  |
| `"applicant"` |  |
| `"career"` |  |
| `"contact"` |  |
| `"created"` |  |
| `"education"` |  |
| `"extras"` |  |
| `"grades"` |  |
| `"home"` |  |
| `"host"` |  |
| `"id"` |  |
| `"languages"` |  |
| `"legal"` |  |
| `"misc"` |  |
| `"motivation"` |  |
| `"pdf"` |  |
| `"profile"` |  |
| `"residences"` |  |
| `"revised"` |  |
| `"status"` |  |
| `"submitted"` |  |
| `"visa"` |  |

Operations: List, Load.

API path: `/applications`

#### Course

| Field | Description |
| --- | --- |
| `"accreditation"` |  |
| `"address"` |  |
| `"awards_abbr"` |  |
| `"awards_full"` |  |
| `"code"` |  |
| `"codeInternal"` |  |
| `"country"` |  |
| `"credits"` |  |
| `"departments"` | Sub-resource (InstitutionDepartments); see the DreamApply SDK. |
| `"duration"` |  |
| `"erasmus"` |  |
| `"featured"` |  |
| `"iban"` |  |
| `"id"` |  |
| `"institution"` |  |
| `"language"` |  |
| `"location"` |  |
| `"mode"` |  |
| `"name"` |  |
| `"prospect_uri"` |  |
| `"quota"` |  |
| `"registration"` |  |
| `"status"` |  |
| `"type"` |  |
| `"updated"` |  |
| `"vat"` |  |
| `"www"` |  |

Operations: Create, List, Load.

API path: `/courses`

#### Fee

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"name"` |  |
| `"notes"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/fees`

#### Institution

| Field | Description |
| --- | --- |
| `"address"` |  |
| `"country"` |  |
| `"departments"` | Sub-resource (InstitutionDepartments); see the DreamApply SDK. |
| `"erasmus"` |  |
| `"iban"` |  |
| `"id"` |  |
| `"location"` |  |
| `"name"` |  |
| `"registration"` |  |
| `"status"` |  |
| `"vat"` |  |
| `"www"` |  |

Operations: List, Load.

API path: `/institutions`

#### Intake

| Field | Description |
| --- | --- |
| `"arrival"` |  |
| `"commence"` |  |
| `"decision"` |  |
| `"id"` |  |
| `"name"` |  |
| `"policy"` |  |
| `"pre"` |  |
| `"start"` |  |

Operations: List, Load.

API path: `/intakes`

#### Invoice

| Field | Description |
| --- | --- |
| `"applicant"` |  |
| `"application"` |  |
| `"collected"` |  |
| `"course"` |  |
| `"currency"` |  |
| `"deadline"` |  |
| `"delivered"` |  |
| `"id"` |  |
| `"instructions"` |  |
| `"issued"` |  |
| `"nr"` |  |
| `"payer"` |  |
| `"reminded"` |  |
| `"smallprint"` |  |

Operations: List, Load, Remove.

API path: `/invoices`

#### Journal

| Field | Description |
| --- | --- |
| `"administrator"` |  |
| `"applicant"` |  |
| `"application"` |  |
| `"bind"` |  |
| `"course"` |  |
| `"document"` |  |
| `"event"` |  |
| `"flag"` |  |
| `"id"` |  |
| `"institution"` |  |
| `"invoice"` |  |
| `"logged"` |  |
| `"offer"` |  |
| `"tracker"` |  |

Operations: List.

API path: `/journal`

#### Login

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"ip"` |  |
| `"logged"` |  |
| `"result"` |  |
| `"role"` |  |
| `"roleId"` |  |

Operations: List.

API path: `/logins`

#### Scoresheet

| Field | Description |
| --- | --- |
| `"confirmed"` |  |
| `"created"` |  |
| `"date"` |  |
| `"depth"` |  |
| `"group"` | Sub-resource (object); see the DreamApply SDK. |
| `"id"` |  |
| `"instructions"` |  |
| `"language"` |  |
| `"maps"` |  |
| `"name"` |  |
| `"rangeMax"` |  |
| `"rangeMin"` |  |
| `"reference"` |  |
| `"scale"` |  |
| `"scored"` |  |
| `"scores"` | Sub-resource (Scores); see the DreamApply SDK. |
| `"subject"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/scoresheets`

#### TableView

| Field | Description |
| --- | --- |
| `"content"` | Sub-resource (StreamInterface); see the DreamApply SDK. |
| `"created"` |  |
| `"expires"` |  |
| `"id"` |  |
| `"mime"` |  |
| `"modified"` |  |
| `"name"` |  |
| `"size"` |  |
| `"tabledata"` |  |
| `"title"` |  |
| `"uploaded"` |  |

Operations: List, Load.

API path: `/tableviews`



## Entities


### AcademicTerm

Create an instance: `academicTerm := client.AcademicTerm(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `finish` | `string` |  |
| `grace` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `start` | `string` |  |
| `type` | `map[string]any` |  |
| `year` | `map[string]any` |  |

#### Example: Load

```go
academicTerm, err := client.AcademicTerm(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(academicTerm) // the loaded record
```

#### Example: List

```go
academicTerms, err := client.AcademicTerm(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(academicTerms) // the array of records
```


### AcademicYear

Create an instance: `academicYear := client.AcademicYear(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |
| `start` | `string` |  |

#### Example: Load

```go
academicYear, err := client.AcademicYear(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(academicYear) // the loaded record
```

#### Example: List

```go
academicYears, err := client.AcademicYear(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(academicYears) // the array of records
```


### Administrator

Create an instance: `administrator := client.Administrator(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `function` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `outgoingEmail` | `string` |  |
| `outgoingName` | `string` |  |
| `phone` | `string` |  |

#### Example: Load

```go
administrator, err := client.Administrator(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(administrator) // the loaded record
```

#### Example: List

```go
administrators, err := client.Administrator(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(administrators) // the array of records
```


### Applicant

Create an instance: `applicant := client.Applicant(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `citizenship` | `string` |  |
| `email` | `string` |  |
| `id` | `int` |  |
| `matriculation` | `string` |  |
| `name` | `map[string]any` |  |
| `name_family` | `string` |  |
| `name_given` | `string` |  |
| `notes` | `string` |  |
| `phone` | `string` |  |
| `photo` | `map[string]any` |  |
| `reference` | `string` |  |
| `region` | `string` |  |
| `registered` | `string` |  |
| `tracker_ID` | `string` |  |
| `type` | `string` |  |
| `vatin` | `string` |  |

#### Example: Load

```go
applicant, err := client.Applicant(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(applicant) // the loaded record
```

#### Example: List

```go
applicants, err := client.Applicant(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(applicants) // the array of records
```

#### Example: Create

```go
result, err := client.Applicant(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Application

Create an instance: `application := client.Application(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `academicTerm` | `map[string]any` | Sub-resource (AcademicTerm); see the DreamApply SDK. |
| `activities` | `[]any` |  |
| `applicant` | `map[string]any` |  |
| `career` | `[]any` |  |
| `contact` | `[]any` |  |
| `created` | `string` |  |
| `education` | `[]any` |  |
| `extras` | `[]any` |  |
| `grades` | `[]any` |  |
| `home` | `[]any` |  |
| `host` | `[]any` |  |
| `id` | `int` |  |
| `languages` | `[]any` |  |
| `legal` | `[]any` |  |
| `misc` | `[]any` |  |
| `motivation` | `[]any` |  |
| `pdf` | `map[string]any` |  |
| `profile` | `[]any` |  |
| `residences` | `[]any` |  |
| `revised` | `string` |  |
| `status` | `string` |  |
| `submitted` | `string` |  |
| `visa` | `[]any` |  |

#### Example: Load

```go
application, err := client.Application(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(application) // the loaded record
```

#### Example: List

```go
applications, err := client.Application(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(applications) // the array of records
```


### Course

Create an instance: `course := client.Course(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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
| `departments` | `map[string]any` | Sub-resource (InstitutionDepartments); see the DreamApply SDK. |
| `duration` | `string` |  |
| `erasmus` | `string` |  |
| `featured` | `string` |  |
| `iban` | `string` |  |
| `id` | `int` |  |
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

```go
course, err := client.Course(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(course) // the loaded record
```

#### Example: List

```go
courses, err := client.Course(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(courses) // the array of records
```

#### Example: Create

```go
result, err := client.Course(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Fee

Create an instance: `fee := client.Fee(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `name` | `string` |  |
| `notes` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```go
fee, err := client.Fee(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(fee) // the loaded record
```

#### Example: List

```go
fees, err := client.Fee(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(fees) // the array of records
```


### Institution

Create an instance: `institution := client.Institution(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` |  |
| `country` | `string` |  |
| `departments` | `map[string]any` | Sub-resource (InstitutionDepartments); see the DreamApply SDK. |
| `erasmus` | `string` |  |
| `iban` | `string` |  |
| `id` | `int` |  |
| `location` | `string` |  |
| `name` | `string` |  |
| `registration` | `string` |  |
| `status` | `string` |  |
| `vat` | `string` |  |
| `www` | `string` |  |

#### Example: Load

```go
institution, err := client.Institution(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(institution) // the loaded record
```

#### Example: List

```go
institutions, err := client.Institution(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(institutions) // the array of records
```


### Intake

Create an instance: `intake := client.Intake(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `arrival` | `string` |  |
| `commence` | `string` |  |
| `decision` | `map[string]any` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `policy` | `string` |  |
| `pre` | `map[string]any` |  |
| `start` | `string` |  |

#### Example: Load

```go
intake, err := client.Intake(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(intake) // the loaded record
```

#### Example: List

```go
intakes, err := client.Intake(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(intakes) // the array of records
```


### Invoice

Create an instance: `invoice := client.Invoice(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `applicant` | `map[string]any` |  |
| `application` | `map[string]any` |  |
| `collected` | `string` |  |
| `course` | `map[string]any` |  |
| `currency` | `string` |  |
| `deadline` | `string` |  |
| `delivered` | `string` |  |
| `id` | `int` |  |
| `instructions` | `string` |  |
| `issued` | `string` |  |
| `nr` | `string` |  |
| `payer` | `map[string]any` |  |
| `reminded` | `string` |  |
| `smallprint` | `string` |  |

#### Example: Load

```go
invoice, err := client.Invoice(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(invoice) // the loaded record
```

#### Example: List

```go
invoices, err := client.Invoice(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(invoices) // the array of records
```


### Journal

Create an instance: `journal := client.Journal(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `administrator` | `map[string]any` |  |
| `applicant` | `map[string]any` |  |
| `application` | `map[string]any` |  |
| `bind` | `[]any` |  |
| `course` | `map[string]any` |  |
| `document` | `map[string]any` |  |
| `event` | `string` |  |
| `flag` | `map[string]any` |  |
| `id` | `int` |  |
| `institution` | `map[string]any` |  |
| `invoice` | `map[string]any` |  |
| `logged` | `string` |  |
| `offer` | `map[string]any` |  |
| `tracker` | `map[string]any` |  |

#### Example: List

```go
journals, err := client.Journal(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(journals) // the array of records
```


### Login

Create an instance: `login := client.Login(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `ip` | `string` |  |
| `logged` | `string` |  |
| `result` | `string` |  |
| `role` | `string` |  |
| `roleId` | `int` |  |

#### Example: List

```go
logins, err := client.Login(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(logins) // the array of records
```


### Scoresheet

Create an instance: `scoresheet := client.Scoresheet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `confirmed` | `string` |  |
| `created` | `string` |  |
| `date` | `string` |  |
| `depth` | `string` |  |
| `group` | `map[string]any` | Sub-resource (object); see the DreamApply SDK. |
| `id` | `string` |  |
| `instructions` | `string` |  |
| `language` | `string` |  |
| `maps` | `[]any` |  |
| `name` | `string` |  |
| `rangeMax` | `string` |  |
| `rangeMin` | `string` |  |
| `reference` | `string` |  |
| `scale` | `int` |  |
| `scored` | `string` |  |
| `scores` | `map[string]any` | Sub-resource (Scores); see the DreamApply SDK. |
| `subject` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```go
scoresheet, err := client.Scoresheet(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(scoresheet) // the loaded record
```

#### Example: List

```go
scoresheets, err := client.Scoresheet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(scoresheets) // the array of records
```


### TableView

Create an instance: `tableView := client.TableView(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `content` | `map[string]any` | Sub-resource (StreamInterface); see the DreamApply SDK. |
| `created` | `string` |  |
| `expires` | `string` |  |
| `id` | `int` |  |
| `mime` | `string` |  |
| `modified` | `string` |  |
| `name` | `string` |  |
| `size` | `int` |  |
| `tabledata` | `map[string]any` |  |
| `title` | `string` |  |
| `uploaded` | `string` |  |

#### Example: Load

```go
tableView, err := client.TableView(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(tableView) // the loaded record
```

#### Example: List

```go
tableViews, err := client.TableView(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(tableViews) // the array of records
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Request/response capture ring buffer for debugging |
| [`idempotency`](#idempotency) | Idempotency keys for safe retries of mutating operations |
| [`metrics`](#metrics) | Statistics capture: per-operation counters and latency |
| [`paging`](#paging) | Pagination signals for list operations |
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Request/response capture ring buffer for debugging.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency keys for safe retries of mutating operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Statistics capture: per-operation counters and latency.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Pagination signals for list operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **DebugFeature**: Request/response capture ring buffer for debugging
- **IdempotencyFeature**: Idempotency keys for safe retries of mutating operations
- **MetricsFeature**: Statistics capture: per-operation counters and latency
- **PagingFeature**: Pagination signals for list operations
- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/dreamapply-sdk/go/
├── dreamapply.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/dreamapply-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
tableview := client.TableView(nil)
tableview.List(nil, nil)

// tableview.Data() now returns the tableview data from the last list
// tableview.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
