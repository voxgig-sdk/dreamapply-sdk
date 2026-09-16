"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const DebugFeature_1 = require("./feature/debug/DebugFeature");
const IdempotencyFeature_1 = require("./feature/idempotency/IdempotencyFeature");
const MetricsFeature_1 = require("./feature/metrics/MetricsFeature");
const PagingFeature_1 = require("./feature/paging/PagingFeature");
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    debug: DebugFeature_1.DebugFeature,
    idempotency: IdempotencyFeature_1.IdempotencyFeature,
    metrics: MetricsFeature_1.MetricsFeature,
    paging: PagingFeature_1.PagingFeature,
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Dreamapply',
        slug: "dreamapply",
        version: "0.1.2",
        target: "ts",
    };
    feature = {
        debug: {
            "options": {
                "active": false,
                "max": 100,
                "redact": [
                    "authorization",
                    "cookie",
                    "set-cookie",
                    "api-key",
                    "apikey",
                    "x-api-key",
                    "idempotency-key"
                ]
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "onEntry": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        idempotency: {
            "options": {
                "active": false,
                "header": "Idempotency-Key",
                "methods": [
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE"
                ],
                "ops": [
                    "create",
                    "update",
                    "remove"
                ]
            },
            "optspec": {
                "keygen": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        metrics: {
            "options": {
                "active": false
            },
            "optspec": {
                "now": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "none"
        },
        paging: {
            "options": {
                "active": false,
                "afterVar": "after",
                "cursorParam": "cursor",
                "firstVar": "first",
                "limitParam": "limit",
                "pageParam": "page",
                "startPage": 1
            },
            "optspec": {
                "limit": "`$NUMBER`",
                "ops": "`$LIST`"
            },
            "strict": false,
            "transport": "none"
        },
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://{instance}.dreamapply.com/api",
        server: {
            "instance": "demo",
        },
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            academic_term: {},
            academic_year: {},
            administrator: {},
            applicant: {},
            application: {},
            course: {},
            fee: {},
            institution: {},
            intake: {},
            invoice: {},
            journal: {},
            login: {},
            scoresheet: {},
            table_view: {},
        }
    };
    entity = {
        "academic_term": {
            "fields": [
                {
                    "name": "finish",
                    "type": "`$STRING`"
                },
                {
                    "name": "grace",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "start",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "year",
                    "type": "`$OBJECT`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "academic_term",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/academic-terms",
                            "segments": [
                                {
                                    "lit": "academic-terms"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "academic-terms"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/academic-terms/{id}",
                            "segments": [
                                {
                                    "lit": "academic-terms"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "academic-terms",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "academic_year": {
            "fields": [
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "start",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "academic_year",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/academic-years",
                            "segments": [
                                {
                                    "lit": "academic-years"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "academic-years"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/academic-years/{id}",
                            "segments": [
                                {
                                    "lit": "academic-years"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "academic-years",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "administrator": {
            "fields": [
                {
                    "name": "email",
                    "type": "`$STRING`"
                },
                {
                    "name": "function",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "outgoingEmail",
                    "type": "`$STRING`"
                },
                {
                    "name": "outgoingName",
                    "type": "`$STRING`"
                },
                {
                    "name": "phone",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "administrator",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/administrators",
                            "segments": [
                                {
                                    "lit": "administrators"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "administrators"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/administrators/{id}",
                            "segments": [
                                {
                                    "lit": "administrators"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "administrators",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "applicant": {
            "fields": [
                {
                    "name": "address",
                    "type": "`$STRING`"
                },
                {
                    "name": "citizenship",
                    "type": "`$STRING`"
                },
                {
                    "name": "email",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "matriculation",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "name_family",
                    "type": "`$STRING`"
                },
                {
                    "name": "name_given",
                    "type": "`$STRING`"
                },
                {
                    "name": "notes",
                    "type": "`$STRING`"
                },
                {
                    "name": "phone",
                    "type": "`$STRING`"
                },
                {
                    "name": "photo",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "reference",
                    "type": "`$STRING`"
                },
                {
                    "name": "region",
                    "type": "`$STRING`"
                },
                {
                    "name": "registered",
                    "type": "`$STRING`"
                },
                {
                    "name": "tracker_ID",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "type": "`$STRING`"
                },
                {
                    "name": "vatin",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "applicant",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/applicants",
                            "segments": [
                                {
                                    "lit": "applicants"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "applicants"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/applicants",
                            "segments": [
                                {
                                    "lit": "applicants"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "applicants"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/applicants/{id}",
                            "segments": [
                                {
                                    "lit": "applicants"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "applicants",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "application": {
            "fields": [
                {
                    "name": "academicTerm",
                    "short": "Sub-resource (AcademicTerm); see the DreamApply SDK.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "activities",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "applicant",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "career",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "contact",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "created",
                    "type": "`$STRING`"
                },
                {
                    "name": "education",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "extras",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "grades",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "home",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "host",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "languages",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "legal",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "misc",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "motivation",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "pdf",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "profile",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "residences",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "revised",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "name": "submitted",
                    "type": "`$STRING`"
                },
                {
                    "name": "visa",
                    "type": "`$ARRAY`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "application",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/applications",
                            "segments": [
                                {
                                    "lit": "applications"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "applications"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/applications/{id}",
                            "segments": [
                                {
                                    "lit": "applications"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "applications",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "course": {
            "fields": [
                {
                    "name": "accreditation",
                    "type": "`$STRING`"
                },
                {
                    "name": "address",
                    "type": "`$STRING`"
                },
                {
                    "name": "awards_abbr",
                    "type": "`$STRING`"
                },
                {
                    "name": "awards_full",
                    "type": "`$STRING`"
                },
                {
                    "name": "code",
                    "type": "`$STRING`"
                },
                {
                    "name": "codeInternal",
                    "type": "`$STRING`"
                },
                {
                    "name": "country",
                    "type": "`$STRING`"
                },
                {
                    "name": "credits",
                    "type": "`$STRING`"
                },
                {
                    "name": "departments",
                    "short": "Sub-resource (InstitutionDepartments); see the DreamApply SDK.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "duration",
                    "type": "`$STRING`"
                },
                {
                    "name": "erasmus",
                    "type": "`$STRING`"
                },
                {
                    "name": "featured",
                    "type": "`$STRING`"
                },
                {
                    "name": "iban",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "institution",
                    "type": "`$STRING`"
                },
                {
                    "name": "language",
                    "type": "`$STRING`"
                },
                {
                    "name": "location",
                    "type": "`$STRING`"
                },
                {
                    "name": "mode",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "prospect_uri",
                    "type": "`$STRING`"
                },
                {
                    "name": "quota",
                    "type": "`$STRING`"
                },
                {
                    "name": "registration",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "type": "`$STRING`"
                },
                {
                    "name": "updated",
                    "type": "`$STRING`"
                },
                {
                    "name": "vat",
                    "type": "`$STRING`"
                },
                {
                    "name": "www",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "course",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "POST",
                            "orig": "/courses",
                            "segments": [
                                {
                                    "lit": "courses"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.institution`"
                            },
                            "parts": [
                                "courses"
                            ]
                        }
                    ]
                },
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/courses",
                            "segments": [
                                {
                                    "lit": "courses"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "courses"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/courses/{id}",
                            "segments": [
                                {
                                    "lit": "courses"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.institution`"
                            },
                            "parts": [
                                "courses",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "fee": {
            "fields": [
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "notes",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "fee",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/fees",
                            "segments": [
                                {
                                    "lit": "fees"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "fees"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/fees/{id}",
                            "segments": [
                                {
                                    "lit": "fees"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "fees",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "institution": {
            "fields": [
                {
                    "name": "address",
                    "type": "`$STRING`"
                },
                {
                    "name": "country",
                    "type": "`$STRING`"
                },
                {
                    "name": "departments",
                    "short": "Sub-resource (InstitutionDepartments); see the DreamApply SDK.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "erasmus",
                    "type": "`$STRING`"
                },
                {
                    "name": "iban",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "location",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "registration",
                    "type": "`$STRING`"
                },
                {
                    "name": "status",
                    "type": "`$STRING`"
                },
                {
                    "name": "vat",
                    "type": "`$STRING`"
                },
                {
                    "name": "www",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "institution",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/institutions",
                            "segments": [
                                {
                                    "lit": "institutions"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "institutions"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/institutions/{id}",
                            "segments": [
                                {
                                    "lit": "institutions"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.departments`"
                            },
                            "parts": [
                                "institutions",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "intake": {
            "fields": [
                {
                    "name": "arrival",
                    "type": "`$STRING`"
                },
                {
                    "name": "commence",
                    "type": "`$STRING`"
                },
                {
                    "name": "decision",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "policy",
                    "type": "`$STRING`"
                },
                {
                    "name": "pre",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "start",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "intake",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intakes",
                            "segments": [
                                {
                                    "lit": "intakes"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "intakes"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/intakes/{id}",
                            "segments": [
                                {
                                    "lit": "intakes"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "intakes",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "invoice": {
            "fields": [
                {
                    "name": "applicant",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "application",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "collected",
                    "type": "`$STRING`"
                },
                {
                    "name": "course",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "currency",
                    "type": "`$STRING`"
                },
                {
                    "name": "deadline",
                    "type": "`$STRING`"
                },
                {
                    "name": "delivered",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "instructions",
                    "type": "`$STRING`"
                },
                {
                    "name": "issued",
                    "type": "`$STRING`"
                },
                {
                    "name": "nr",
                    "type": "`$STRING`"
                },
                {
                    "name": "payer",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "reminded",
                    "type": "`$STRING`"
                },
                {
                    "name": "smallprint",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "invoice",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/invoices",
                            "segments": [
                                {
                                    "lit": "invoices"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "invoices"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/invoices/{id}",
                            "segments": [
                                {
                                    "lit": "invoices"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "invoices",
                                "{id}"
                            ]
                        }
                    ]
                },
                "remove": {
                    "input": "data",
                    "name": "remove",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "DELETE",
                            "orig": "/invoices/{id}",
                            "segments": [
                                {
                                    "lit": "invoices"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "invoices",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "journal": {
            "fields": [
                {
                    "name": "administrator",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "applicant",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "application",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "bind",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "course",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "document",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "event",
                    "type": "`$STRING`"
                },
                {
                    "name": "flag",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "institution",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "invoice",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "logged",
                    "type": "`$STRING`"
                },
                {
                    "name": "offer",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "tracker",
                    "type": "`$OBJECT`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "journal",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/journal",
                            "segments": [
                                {
                                    "lit": "journal"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "journal"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "login": {
            "fields": [
                {
                    "name": "id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "ip",
                    "type": "`$STRING`"
                },
                {
                    "name": "logged",
                    "type": "`$STRING`"
                },
                {
                    "name": "result",
                    "type": "`$STRING`"
                },
                {
                    "name": "role",
                    "type": "`$STRING`"
                },
                {
                    "name": "roleId",
                    "type": "`$INTEGER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "login",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/logins",
                            "segments": [
                                {
                                    "lit": "logins"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "logins"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "scoresheet": {
            "fields": [
                {
                    "name": "confirmed",
                    "type": "`$STRING`"
                },
                {
                    "name": "created",
                    "type": "`$STRING`"
                },
                {
                    "name": "date",
                    "type": "`$STRING`"
                },
                {
                    "name": "depth",
                    "type": "`$STRING`"
                },
                {
                    "name": "group",
                    "short": "Sub-resource (object); see the DreamApply SDK.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "name": "instructions",
                    "type": "`$STRING`"
                },
                {
                    "name": "language",
                    "type": "`$STRING`"
                },
                {
                    "name": "maps",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "rangeMax",
                    "type": "`$STRING`"
                },
                {
                    "name": "rangeMin",
                    "type": "`$STRING`"
                },
                {
                    "name": "reference",
                    "type": "`$STRING`"
                },
                {
                    "name": "scale",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "scored",
                    "type": "`$STRING`"
                },
                {
                    "name": "scores",
                    "short": "Sub-resource (Scores); see the DreamApply SDK.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "subject",
                    "type": "`$STRING`"
                },
                {
                    "name": "type",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "scoresheet",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/scoresheets",
                            "segments": [
                                {
                                    "lit": "scoresheets"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "scoresheets"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/scoresheets/{id}",
                            "segments": [
                                {
                                    "lit": "scoresheets"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "scoresheets",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "table_view": {
            "fields": [
                {
                    "name": "content",
                    "short": "Sub-resource (StreamInterface); see the DreamApply SDK.",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "created",
                    "type": "`$STRING`"
                },
                {
                    "name": "expires",
                    "type": "`$STRING`"
                },
                {
                    "name": "id",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "mime",
                    "type": "`$STRING`"
                },
                {
                    "name": "modified",
                    "type": "`$STRING`"
                },
                {
                    "name": "name",
                    "type": "`$STRING`"
                },
                {
                    "name": "size",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "tabledata",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "title",
                    "type": "`$STRING`"
                },
                {
                    "name": "uploaded",
                    "type": "`$STRING`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "table_view",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/tableviews",
                            "segments": [
                                {
                                    "lit": "tableviews"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "tableviews"
                            ]
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "kind": "param",
                                        "name": "id",
                                        "orig": "id",
                                        "reqd": true,
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/tableviews/{id}",
                            "segments": [
                                {
                                    "lit": "tableviews"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.tabledata`"
                            },
                            "parts": [
                                "tableviews",
                                "{id}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map