# DreamApply API

Student admissions and application management API. UNOFFICIAL SPEC. DreamApply publishes no OpenAPI description. This spec was DERIVED MECHANICALLY from the vendor&#39;s own MIT-licensed PHP SDK (github.com/dream-group/dream-apply-sdk), whose gen/ directory is itself @generated and encodes field names, PHP types, nullability, enum domains and URL structure. Known limits, stated plainly: HTTP verbs are inferred from the SDK&#39;s base classes and traits rather than declared; PHP types carry no JSON formats, so dates appear as plain strings; and the SDK may lag the live API. Nothing here has been verified against a running instance.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 14 entities and 29 HTTP routes. There are 3 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [AcademicTerm](docs/api/academic_term.html)

Results: AcademicTerms list; AcademicTerm.

SDK operations: `list`, `load`.

### [AcademicYear](docs/api/academic_year.html)

Results: AcademicYears list; AcademicYear.

SDK operations: `list`, `load`.

### [Administrator](docs/api/administrator.html)

Results: Administrators list; Administrator.

SDK operations: `list`, `load`.

### [Applicant](docs/api/applicant.html)

Results: Applicant created; Applicants list; Applicant.

SDK operations: `create`, `list`, `load`.

### [Application](docs/api/application.html)

Results: Applications list; Application.

SDK operations: `list`, `load`.

Key fields to recognise:

- `academicTerm`: Sub-resource (AcademicTerm); see the DreamApply SDK.

### [Course](docs/api/course.html)

Results: Course created; Courses list; Course.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `departments`: Sub-resource (InstitutionDepartments); see the DreamApply SDK.

### [Fee](docs/api/fee.html)

Results: Fees list; Fee.

SDK operations: `list`, `load`.

### [Institution](docs/api/institution.html)

Results: Institutions list; Institution.

SDK operations: `list`, `load`.

Key fields to recognise:

- `departments`: Sub-resource (InstitutionDepartments); see the DreamApply SDK.

### [Intake](docs/api/intake.html)

Results: Intakes list; Intake.

SDK operations: `list`, `load`.

### [Invoice](docs/api/invoice.html)

Results: Invoices list; Invoice; Deleted.

SDK operations: `list`, `load`, `remove`.

### [Journal](docs/api/journal.html)

Results: Journal list.

SDK operations: `list`.

### [Login](docs/api/login.html)

Results: Logins list.

SDK operations: `list`.

### [Scoresheet](docs/api/scoresheet.html)

Results: Scoresheets list; Scoresheet.

SDK operations: `list`, `load`.

Key fields to recognise:

- `group`: Sub-resource (object); see the DreamApply SDK.
- `scores`: Sub-resource (Scores); see the DreamApply SDK.

### [TableView](docs/api/table_view.html)

Results: TableViews list; TableView.

SDK operations: `list`, `load`.

Key fields to recognise:

- `content`: Sub-resource (StreamInterface); see the DreamApply SDK.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [AcademicTerm](docs/api/academic_term.html) | `list` | `GET /academic-terms` | Required |
| [AcademicTerm](docs/api/academic_term.html) | `load` | `GET /academic-terms/{id}` | Required |
| [AcademicYear](docs/api/academic_year.html) | `list` | `GET /academic-years` | Required |
| [AcademicYear](docs/api/academic_year.html) | `load` | `GET /academic-years/{id}` | Required |
| [Administrator](docs/api/administrator.html) | `list` | `GET /administrators` | Required |
| [Administrator](docs/api/administrator.html) | `load` | `GET /administrators/{id}` | Required |
| [Applicant](docs/api/applicant.html) | `create` | `POST /applicants` | Required |
| [Applicant](docs/api/applicant.html) | `list` | `GET /applicants` | Required |
| [Applicant](docs/api/applicant.html) | `load` | `GET /applicants/{id}` | Required |
| [Application](docs/api/application.html) | `list` | `GET /applications` | Required |
| [Application](docs/api/application.html) | `load` | `GET /applications/{id}` | Required |
| [Course](docs/api/course.html) | `create` | `POST /courses` | Required |
| [Course](docs/api/course.html) | `list` | `GET /courses` | Required |
| [Course](docs/api/course.html) | `load` | `GET /courses/{id}` | Required |
| [Fee](docs/api/fee.html) | `list` | `GET /fees` | Required |
| [Fee](docs/api/fee.html) | `load` | `GET /fees/{id}` | Required |
| [Institution](docs/api/institution.html) | `list` | `GET /institutions` | Required |
| [Institution](docs/api/institution.html) | `load` | `GET /institutions/{id}` | Required |
| [Intake](docs/api/intake.html) | `list` | `GET /intakes` | Required |
| [Intake](docs/api/intake.html) | `load` | `GET /intakes/{id}` | Required |
| [Invoice](docs/api/invoice.html) | `list` | `GET /invoices` | Required |
| [Invoice](docs/api/invoice.html) | `load` | `GET /invoices/{id}` | Required |
| [Invoice](docs/api/invoice.html) | `remove` | `DELETE /invoices/{id}` | Required |
| [Journal](docs/api/journal.html) | `list` | `GET /journal` | Required |
| [Login](docs/api/login.html) | `list` | `GET /logins` | Required |
| [Scoresheet](docs/api/scoresheet.html) | `list` | `GET /scoresheets` | Required |
| [Scoresheet](docs/api/scoresheet.html) | `load` | `GET /scoresheets/{id}` | Required |
| [TableView](docs/api/table_view.html) | `list` | `GET /tableviews` | Required |
| [TableView](docs/api/table_view.html) | `load` | `GET /tableviews/{id}` | Required |

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
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

