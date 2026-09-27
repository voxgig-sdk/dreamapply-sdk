# Dreamapply SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Dreamapply",
            "slug": "dreamapply",
            "version": "0.1.2",
            "target": "py",
        },
        "feature": {
            "debug": {
        "options": {
          "active": False,
          "max": 100,
          "redact": [
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          ],
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "onEntry": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "idempotency": {
        "options": {
          "active": False,
          "header": "Idempotency-Key",
          "methods": [
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          ],
          "ops": [
            "create",
            "update",
            "remove",
          ],
        },
        "optspec": {
          "keygen": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "metrics": {
        "options": {
          "active": False,
        },
        "optspec": {
          "now": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "none",
      },
            "paging": {
        "options": {
          "active": False,
          "afterVar": "after",
          "cursorParam": "cursor",
          "firstVar": "first",
          "limitParam": "limit",
          "pageParam": "page",
          "startPage": 1,
        },
        "optspec": {
          "limit": "`$NUMBER`",
          "ops": "`$LIST`",
        },
        "strict": False,
        "transport": "none",
      },
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://{instance}.dreamapply.com/api",
            "server": {
                "instance": "demo",
            },
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "academic_term": {},
                "academic_year": {},
                "administrator": {},
                "applicant": {},
                "application": {},
                "course": {},
                "fee": {},
                "institution": {},
                "intake": {},
                "invoice": {},
                "journal": {},
                "login": {},
                "scoresheet": {},
                "table_view": {},
            },
        },
        "entity": {
      "academic_term": {
        "fields": [
          {
            "name": "finish",
            "title": "Finish",
            "type": "`$STRING`",
          },
          {
            "name": "grace",
            "title": "Grace",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "start",
            "title": "Start",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$OBJECT`",
          },
          {
            "name": "year",
            "title": "Year",
            "type": "`$OBJECT`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "academic_term",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/academic-terms",
                "segments": [
                  {
                    "lit": "academic-terms",
                  },
                ],
                "parts": [
                  "academic-terms",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/academic-terms/{id}",
                "segments": [
                  {
                    "lit": "academic-terms",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "academic-terms",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "academic_year": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "start",
            "title": "Start",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "academic_year",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/academic-years",
                "segments": [
                  {
                    "lit": "academic-years",
                  },
                ],
                "parts": [
                  "academic-years",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/academic-years/{id}",
                "segments": [
                  {
                    "lit": "academic-years",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "academic-years",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "administrator": {
        "fields": [
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
          },
          {
            "name": "function",
            "title": "Function",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "outgoingEmail",
            "title": "Outgoing Email",
            "type": "`$STRING`",
          },
          {
            "name": "outgoingName",
            "title": "Outgoing Name",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "title": "Phone",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "administrator",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/administrators",
                "segments": [
                  {
                    "lit": "administrators",
                  },
                ],
                "parts": [
                  "administrators",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/administrators/{id}",
                "segments": [
                  {
                    "lit": "administrators",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "administrators",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "applicant": {
        "fields": [
          {
            "name": "address",
            "title": "Address",
            "type": "`$STRING`",
          },
          {
            "name": "citizenship",
            "title": "Citizenship",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "title": "Email",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "matriculation",
            "title": "Matriculation",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$OBJECT`",
          },
          {
            "name": "name_family",
            "title": "Name Family",
            "type": "`$STRING`",
          },
          {
            "name": "name_given",
            "title": "Name Given",
            "type": "`$STRING`",
          },
          {
            "name": "notes",
            "title": "Notes",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "title": "Phone",
            "type": "`$STRING`",
          },
          {
            "name": "photo",
            "title": "Photo",
            "type": "`$OBJECT`",
          },
          {
            "name": "reference",
            "title": "Reference",
            "type": "`$STRING`",
          },
          {
            "name": "region",
            "title": "Region",
            "type": "`$STRING`",
          },
          {
            "name": "registered",
            "title": "Registered",
            "type": "`$STRING`",
          },
          {
            "name": "tracker_ID",
            "title": "Tracker Id",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
          },
          {
            "name": "vatin",
            "title": "Vatin",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "applicant",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/applicants",
                "segments": [
                  {
                    "lit": "applicants",
                  },
                ],
                "parts": [
                  "applicants",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/applicants",
                "segments": [
                  {
                    "lit": "applicants",
                  },
                ],
                "parts": [
                  "applicants",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/applicants/{id}",
                "segments": [
                  {
                    "lit": "applicants",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "applicants",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "application": {
        "fields": [
          {
            "name": "academicTerm",
            "title": "Academic Term",
            "type": "`$OBJECT`",
            "short": "Sub-resource (AcademicTerm); see the DreamApply SDK.",
          },
          {
            "name": "activities",
            "title": "Activities",
            "type": "`$ARRAY`",
          },
          {
            "name": "applicant",
            "title": "Applicant",
            "type": "`$OBJECT`",
          },
          {
            "name": "career",
            "title": "Career",
            "type": "`$ARRAY`",
          },
          {
            "name": "contact",
            "title": "Contact",
            "type": "`$ARRAY`",
          },
          {
            "name": "created",
            "title": "Created",
            "type": "`$STRING`",
          },
          {
            "name": "education",
            "title": "Education",
            "type": "`$ARRAY`",
          },
          {
            "name": "extras",
            "title": "Extras",
            "type": "`$ARRAY`",
          },
          {
            "name": "grades",
            "title": "Grades",
            "type": "`$ARRAY`",
          },
          {
            "name": "home",
            "title": "Home",
            "type": "`$ARRAY`",
          },
          {
            "name": "host",
            "title": "Host",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "languages",
            "title": "Languages",
            "type": "`$ARRAY`",
          },
          {
            "name": "legal",
            "title": "Legal",
            "type": "`$ARRAY`",
          },
          {
            "name": "misc",
            "title": "Misc",
            "type": "`$ARRAY`",
          },
          {
            "name": "motivation",
            "title": "Motivation",
            "type": "`$ARRAY`",
          },
          {
            "name": "pdf",
            "title": "Pdf",
            "type": "`$OBJECT`",
          },
          {
            "name": "profile",
            "title": "Profile",
            "type": "`$ARRAY`",
          },
          {
            "name": "residences",
            "title": "Residences",
            "type": "`$ARRAY`",
          },
          {
            "name": "revised",
            "title": "Revised",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "submitted",
            "title": "Submitted",
            "type": "`$STRING`",
          },
          {
            "name": "visa",
            "title": "Visa",
            "type": "`$ARRAY`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "application",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/applications",
                "segments": [
                  {
                    "lit": "applications",
                  },
                ],
                "parts": [
                  "applications",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/applications/{id}",
                "segments": [
                  {
                    "lit": "applications",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "applications",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "course": {
        "fields": [
          {
            "name": "accreditation",
            "title": "Accreditation",
            "type": "`$STRING`",
          },
          {
            "name": "address",
            "title": "Address",
            "type": "`$STRING`",
          },
          {
            "name": "awards_abbr",
            "title": "Awards Abbr",
            "type": "`$STRING`",
          },
          {
            "name": "awards_full",
            "title": "Awards Full",
            "type": "`$STRING`",
          },
          {
            "name": "code",
            "title": "Code",
            "type": "`$STRING`",
          },
          {
            "name": "codeInternal",
            "title": "Code Internal",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
          },
          {
            "name": "credits",
            "title": "Credits",
            "type": "`$STRING`",
          },
          {
            "name": "departments",
            "title": "Departments",
            "type": "`$OBJECT`",
            "short": "Sub-resource (InstitutionDepartments); see the DreamApply SDK.",
          },
          {
            "name": "duration",
            "title": "Duration",
            "type": "`$STRING`",
          },
          {
            "name": "erasmus",
            "title": "Erasmus",
            "type": "`$STRING`",
          },
          {
            "name": "featured",
            "title": "Featured",
            "type": "`$STRING`",
          },
          {
            "name": "iban",
            "title": "Iban",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "institution",
            "title": "Institution",
            "type": "`$STRING`",
          },
          {
            "name": "language",
            "title": "Language",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "title": "Location",
            "type": "`$STRING`",
          },
          {
            "name": "mode",
            "title": "Mode",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "prospect_uri",
            "title": "Prospect Uri",
            "type": "`$STRING`",
          },
          {
            "name": "quota",
            "title": "Quota",
            "type": "`$STRING`",
          },
          {
            "name": "registration",
            "title": "Registration",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
          },
          {
            "name": "updated",
            "title": "Updated",
            "type": "`$STRING`",
          },
          {
            "name": "vat",
            "title": "Vat",
            "type": "`$STRING`",
          },
          {
            "name": "www",
            "title": "Www",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "course",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/courses",
                "segments": [
                  {
                    "lit": "courses",
                  },
                ],
                "parts": [
                  "courses",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.institution`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/courses",
                "segments": [
                  {
                    "lit": "courses",
                  },
                ],
                "parts": [
                  "courses",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/courses/{id}",
                "segments": [
                  {
                    "lit": "courses",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "courses",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.institution`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "fee": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "notes",
            "title": "Notes",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "fee",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/fees",
                "segments": [
                  {
                    "lit": "fees",
                  },
                ],
                "parts": [
                  "fees",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/fees/{id}",
                "segments": [
                  {
                    "lit": "fees",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "fees",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "institution": {
        "fields": [
          {
            "name": "address",
            "title": "Address",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "title": "Country",
            "type": "`$STRING`",
          },
          {
            "name": "departments",
            "title": "Departments",
            "type": "`$OBJECT`",
            "short": "Sub-resource (InstitutionDepartments); see the DreamApply SDK.",
          },
          {
            "name": "erasmus",
            "title": "Erasmus",
            "type": "`$STRING`",
          },
          {
            "name": "iban",
            "title": "Iban",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "location",
            "title": "Location",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "registration",
            "title": "Registration",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
          },
          {
            "name": "vat",
            "title": "Vat",
            "type": "`$STRING`",
          },
          {
            "name": "www",
            "title": "Www",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "institution",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/institutions",
                "segments": [
                  {
                    "lit": "institutions",
                  },
                ],
                "parts": [
                  "institutions",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/institutions/{id}",
                "segments": [
                  {
                    "lit": "institutions",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "institutions",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.departments`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "intake": {
        "fields": [
          {
            "name": "arrival",
            "title": "Arrival",
            "type": "`$STRING`",
          },
          {
            "name": "commence",
            "title": "Commence",
            "type": "`$STRING`",
          },
          {
            "name": "decision",
            "title": "Decision",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "policy",
            "title": "Policy",
            "type": "`$STRING`",
          },
          {
            "name": "pre",
            "title": "Pre",
            "type": "`$OBJECT`",
          },
          {
            "name": "start",
            "title": "Start",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "intake",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/intakes",
                "segments": [
                  {
                    "lit": "intakes",
                  },
                ],
                "parts": [
                  "intakes",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/intakes/{id}",
                "segments": [
                  {
                    "lit": "intakes",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "intakes",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "invoice": {
        "fields": [
          {
            "name": "applicant",
            "title": "Applicant",
            "type": "`$OBJECT`",
          },
          {
            "name": "application",
            "title": "Application",
            "type": "`$OBJECT`",
          },
          {
            "name": "collected",
            "title": "Collected",
            "type": "`$STRING`",
          },
          {
            "name": "course",
            "title": "Course",
            "type": "`$OBJECT`",
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
          },
          {
            "name": "deadline",
            "title": "Deadline",
            "type": "`$STRING`",
          },
          {
            "name": "delivered",
            "title": "Delivered",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "instructions",
            "title": "Instructions",
            "type": "`$STRING`",
          },
          {
            "name": "issued",
            "title": "Issued",
            "type": "`$STRING`",
          },
          {
            "name": "nr",
            "title": "Nr",
            "type": "`$STRING`",
          },
          {
            "name": "payer",
            "title": "Payer",
            "type": "`$OBJECT`",
          },
          {
            "name": "reminded",
            "title": "Reminded",
            "type": "`$STRING`",
          },
          {
            "name": "smallprint",
            "title": "Smallprint",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "invoice",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/invoices",
                "segments": [
                  {
                    "lit": "invoices",
                  },
                ],
                "parts": [
                  "invoices",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/invoices/{id}",
                "segments": [
                  {
                    "lit": "invoices",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "invoices",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "kind": "http",
                "method": "DELETE",
                "orig": "/invoices/{id}",
                "segments": [
                  {
                    "lit": "invoices",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "invoices",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "journal": {
        "fields": [
          {
            "name": "administrator",
            "title": "Administrator",
            "type": "`$OBJECT`",
          },
          {
            "name": "applicant",
            "title": "Applicant",
            "type": "`$OBJECT`",
          },
          {
            "name": "application",
            "title": "Application",
            "type": "`$OBJECT`",
          },
          {
            "name": "bind",
            "title": "Bind",
            "type": "`$ARRAY`",
          },
          {
            "name": "course",
            "title": "Course",
            "type": "`$OBJECT`",
          },
          {
            "name": "document",
            "title": "Document",
            "type": "`$OBJECT`",
          },
          {
            "name": "event",
            "title": "Event",
            "type": "`$STRING`",
          },
          {
            "name": "flag",
            "title": "Flag",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "institution",
            "title": "Institution",
            "type": "`$OBJECT`",
          },
          {
            "name": "invoice",
            "title": "Invoice",
            "type": "`$OBJECT`",
          },
          {
            "name": "logged",
            "title": "Logged",
            "type": "`$STRING`",
          },
          {
            "name": "offer",
            "title": "Offer",
            "type": "`$OBJECT`",
          },
          {
            "name": "tracker",
            "title": "Tracker",
            "type": "`$OBJECT`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "journal",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/journal",
                "segments": [
                  {
                    "lit": "journal",
                  },
                ],
                "parts": [
                  "journal",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "login": {
        "fields": [
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "ip",
            "title": "Ip",
            "type": "`$STRING`",
          },
          {
            "name": "logged",
            "title": "Logged",
            "type": "`$STRING`",
          },
          {
            "name": "result",
            "title": "Result",
            "type": "`$STRING`",
          },
          {
            "name": "role",
            "title": "Role",
            "type": "`$STRING`",
          },
          {
            "name": "roleId",
            "title": "Role Id",
            "type": "`$INTEGER`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "login",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/logins",
                "segments": [
                  {
                    "lit": "logins",
                  },
                ],
                "parts": [
                  "logins",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "scoresheet": {
        "fields": [
          {
            "name": "confirmed",
            "title": "Confirmed",
            "type": "`$STRING`",
          },
          {
            "name": "created",
            "title": "Created",
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "title": "Date",
            "type": "`$STRING`",
          },
          {
            "name": "depth",
            "title": "Depth",
            "type": "`$STRING`",
          },
          {
            "name": "group",
            "title": "Group",
            "type": "`$OBJECT`",
            "short": "Sub-resource (object); see the DreamApply SDK.",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "instructions",
            "title": "Instructions",
            "type": "`$STRING`",
          },
          {
            "name": "language",
            "title": "Language",
            "type": "`$STRING`",
          },
          {
            "name": "maps",
            "title": "Maps",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "rangeMax",
            "title": "Range Max",
            "type": "`$STRING`",
          },
          {
            "name": "rangeMin",
            "title": "Range Min",
            "type": "`$STRING`",
          },
          {
            "name": "reference",
            "title": "Reference",
            "type": "`$STRING`",
          },
          {
            "name": "scale",
            "title": "Scale",
            "type": "`$INTEGER`",
          },
          {
            "name": "scored",
            "title": "Scored",
            "type": "`$STRING`",
          },
          {
            "name": "scores",
            "title": "Scores",
            "type": "`$OBJECT`",
            "short": "Sub-resource (Scores); see the DreamApply SDK.",
          },
          {
            "name": "subject",
            "title": "Subject",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "title": "Type",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "scoresheet",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/scoresheets",
                "segments": [
                  {
                    "lit": "scoresheets",
                  },
                ],
                "parts": [
                  "scoresheets",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/scoresheets/{id}",
                "segments": [
                  {
                    "lit": "scoresheets",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "scoresheets",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "table_view": {
        "fields": [
          {
            "name": "content",
            "title": "Content",
            "type": "`$OBJECT`",
            "short": "Sub-resource (StreamInterface); see the DreamApply SDK.",
          },
          {
            "name": "created",
            "title": "Created",
            "type": "`$STRING`",
          },
          {
            "name": "expires",
            "title": "Expires",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
          },
          {
            "name": "mime",
            "title": "Mime",
            "type": "`$STRING`",
          },
          {
            "name": "modified",
            "title": "Modified",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
          },
          {
            "name": "size",
            "title": "Size",
            "type": "`$INTEGER`",
          },
          {
            "name": "tabledata",
            "title": "Tabledata",
            "type": "`$OBJECT`",
          },
          {
            "name": "title",
            "title": "Title",
            "type": "`$STRING`",
          },
          {
            "name": "uploaded",
            "title": "Uploaded",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "table_view",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/tableviews",
                "segments": [
                  {
                    "lit": "tableviews",
                  },
                ],
                "parts": [
                  "tableviews",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/tableviews/{id}",
                "segments": [
                  {
                    "lit": "tableviews",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "tableviews",
                  "{id}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.tabledata`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
