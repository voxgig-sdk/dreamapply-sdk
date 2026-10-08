# DreamApply API

> Student admissions and application management API.
>
> UNOFFICIAL SPEC. DreamApply publishes no OpenAPI description. This spec was DERIVED MECHANICALLY from the vendor&#39;s own MIT-licensed PHP SDK (github.com/dream-group/dream-apply-sdk), whose gen/ directory is itself @generated and encodes field names, PHP types, nullability, enum domains and URL structure.
>
> Known limits, stated plainly: HTTP verbs are inferred from the SDK&#39;s base classes and traits rather than declared; PHP types carry no JSON formats, so dates appear as plain strings; and the SDK may lag the live API. Nothing here has been verified against a running instance.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 14 entities and 29 HTTP routes. There are 3 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### AcademicTerm

Results: AcademicTerms list; AcademicTerm.

SDK operations: `list`, `load`.

### AcademicYear

Results: AcademicYears list; AcademicYear.

SDK operations: `list`, `load`.

### Administrator

Results: Administrators list; Administrator.

SDK operations: `list`, `load`.

### Applicant

Results: Applicant created; Applicants list; Applicant.

SDK operations: `create`, `list`, `load`.

### Application

Results: Applications list; Application.

SDK operations: `list`, `load`.

Key fields to recognise:

- `academicTerm`: Sub-resource (AcademicTerm); see the DreamApply SDK.

### Course

Results: Course created; Courses list; Course.

SDK operations: `create`, `list`, `load`.

### Fee

Results: Fees list; Fee.

SDK operations: `list`, `load`.

### Institution

Results: Institutions list; Institution.

SDK operations: `list`, `load`.

Key fields to recognise:

- `departments`: Sub-resource (InstitutionDepartments); see the DreamApply SDK.

### Intake

Results: Intakes list; Intake.

SDK operations: `list`, `load`.

### Invoice

Results: Invoices list; Invoice; Deleted.

SDK operations: `list`, `load`, `remove`.

### Journal

Results: Journal list.

SDK operations: `list`.

### Login

Results: Logins list.

SDK operations: `list`.

### Scoresheet

Results: Scoresheets list; Scoresheet.

SDK operations: `list`, `load`.

Key fields to recognise:

- `group`: Sub-resource (object); see the DreamApply SDK.
- `scores`: Sub-resource (Scores); see the DreamApply SDK.

### TableView

Results: TableViews list; TableView.

SDK operations: `list`, `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| AcademicTerm | `list` | `GET /academic-terms` | Required |
| AcademicTerm | `load` | `GET /academic-terms/{id}` | Required |
| AcademicYear | `list` | `GET /academic-years` | Required |
| AcademicYear | `load` | `GET /academic-years/{id}` | Required |
| Administrator | `list` | `GET /administrators` | Required |
| Administrator | `load` | `GET /administrators/{id}` | Required |
| Applicant | `create` | `POST /applicants` | Required |
| Applicant | `list` | `GET /applicants` | Required |
| Applicant | `load` | `GET /applicants/{id}` | Required |
| Application | `list` | `GET /applications` | Required |
| Application | `load` | `GET /applications/{id}` | Required |
| Course | `create` | `POST /courses` | Required |
| Course | `list` | `GET /courses` | Required |
| Course | `load` | `GET /courses/{id}` | Required |
| Fee | `list` | `GET /fees` | Required |
| Fee | `load` | `GET /fees/{id}` | Required |
| Institution | `list` | `GET /institutions` | Required |
| Institution | `load` | `GET /institutions/{id}` | Required |
| Intake | `list` | `GET /intakes` | Required |
| Intake | `load` | `GET /intakes/{id}` | Required |
| Invoice | `list` | `GET /invoices` | Required |
| Invoice | `load` | `GET /invoices/{id}` | Required |
| Invoice | `remove` | `DELETE /invoices/{id}` | Required |
| Journal | `list` | `GET /journal` | Required |
| Login | `list` | `GET /logins` | Required |
| Scoresheet | `list` | `GET /scoresheets` | Required |
| Scoresheet | `load` | `GET /scoresheets/{id}` | Required |
| TableView | `list` | `GET /tableviews` | Required |
| TableView | `load` | `GET /tableviews/{id}` | Required |

## Connect to the API

- Per-tenant instance: `https://{instance}.dreamapply.com/api`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Python | `py/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `debug`: Request/response capture ring buffer for debugging
- `idempotency`: Idempotency keys for safe retries of mutating operations
- `metrics`: Statistics capture: per-operation counters and latency
- `paging`: Pagination signals for list operations
- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

