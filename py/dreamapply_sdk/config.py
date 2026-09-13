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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "type": "`$STRING`",
          },
          {
            "name": "grace",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "start",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$OBJECT`",
          },
          {
            "name": "year",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/academic-terms",
                "segments": [
                  {
                    "lit": "academic-terms",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "academic-terms",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "academic-terms",
                  "{id}",
                ],
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
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "start",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/academic-years",
                "segments": [
                  {
                    "lit": "academic-years",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "academic-years",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "academic-years",
                  "{id}",
                ],
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
            "type": "`$STRING`",
          },
          {
            "name": "function",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "outgoingEmail",
            "type": "`$STRING`",
          },
          {
            "name": "outgoingName",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/administrators",
                "segments": [
                  {
                    "lit": "administrators",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "administrators",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "administrators",
                  "{id}",
                ],
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
            "type": "`$STRING`",
          },
          {
            "name": "citizenship",
            "type": "`$STRING`",
          },
          {
            "name": "email",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "matriculation",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$OBJECT`",
          },
          {
            "name": "name_family",
            "type": "`$STRING`",
          },
          {
            "name": "name_given",
            "type": "`$STRING`",
          },
          {
            "name": "notes",
            "type": "`$STRING`",
          },
          {
            "name": "phone",
            "type": "`$STRING`",
          },
          {
            "name": "photo",
            "type": "`$OBJECT`",
          },
          {
            "name": "reference",
            "type": "`$STRING`",
          },
          {
            "name": "region",
            "type": "`$STRING`",
          },
          {
            "name": "registered",
            "type": "`$STRING`",
          },
          {
            "name": "tracker_ID",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "vatin",
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
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/applicants",
                "segments": [
                  {
                    "lit": "applicants",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "applicants",
                ],
              },
            ],
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
                    "lit": "applicants",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "applicants",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "applicants",
                  "{id}",
                ],
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
            "short": "Sub-resource (AcademicTerm); see the DreamApply SDK.",
            "type": "`$OBJECT`",
          },
          {
            "name": "activities",
            "type": "`$ARRAY`",
          },
          {
            "name": "applicant",
            "type": "`$OBJECT`",
          },
          {
            "name": "career",
            "type": "`$ARRAY`",
          },
          {
            "name": "contact",
            "type": "`$ARRAY`",
          },
          {
            "name": "created",
            "type": "`$STRING`",
          },
          {
            "name": "education",
            "type": "`$ARRAY`",
          },
          {
            "name": "extras",
            "type": "`$ARRAY`",
          },
          {
            "name": "grades",
            "type": "`$ARRAY`",
          },
          {
            "name": "home",
            "type": "`$ARRAY`",
          },
          {
            "name": "host",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "languages",
            "type": "`$ARRAY`",
          },
          {
            "name": "legal",
            "type": "`$ARRAY`",
          },
          {
            "name": "misc",
            "type": "`$ARRAY`",
          },
          {
            "name": "motivation",
            "type": "`$ARRAY`",
          },
          {
            "name": "pdf",
            "type": "`$OBJECT`",
          },
          {
            "name": "profile",
            "type": "`$ARRAY`",
          },
          {
            "name": "residences",
            "type": "`$ARRAY`",
          },
          {
            "name": "revised",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "submitted",
            "type": "`$STRING`",
          },
          {
            "name": "visa",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/applications",
                "segments": [
                  {
                    "lit": "applications",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "applications",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "applications",
                  "{id}",
                ],
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
            "type": "`$STRING`",
          },
          {
            "name": "address",
            "type": "`$STRING`",
          },
          {
            "name": "awards_abbr",
            "type": "`$STRING`",
          },
          {
            "name": "awards_full",
            "type": "`$STRING`",
          },
          {
            "name": "code",
            "type": "`$STRING`",
          },
          {
            "name": "codeInternal",
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "type": "`$STRING`",
          },
          {
            "name": "credits",
            "type": "`$STRING`",
          },
          {
            "name": "departments",
            "short": "Sub-resource (InstitutionDepartments); see the DreamApply SDK.",
            "type": "`$OBJECT`",
          },
          {
            "name": "duration",
            "type": "`$STRING`",
          },
          {
            "name": "erasmus",
            "type": "`$STRING`",
          },
          {
            "name": "featured",
            "type": "`$STRING`",
          },
          {
            "name": "iban",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "institution",
            "type": "`$STRING`",
          },
          {
            "name": "language",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "type": "`$STRING`",
          },
          {
            "name": "mode",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "prospect_uri",
            "type": "`$STRING`",
          },
          {
            "name": "quota",
            "type": "`$STRING`",
          },
          {
            "name": "registration",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "updated",
            "type": "`$STRING`",
          },
          {
            "name": "vat",
            "type": "`$STRING`",
          },
          {
            "name": "www",
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
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/courses",
                "segments": [
                  {
                    "lit": "courses",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.institution`",
                },
                "parts": [
                  "courses",
                ],
              },
            ],
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
                    "lit": "courses",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "courses",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.institution`",
                },
                "parts": [
                  "courses",
                  "{id}",
                ],
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
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "notes",
            "type": "`$STRING`",
          },
          {
            "name": "type",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/fees",
                "segments": [
                  {
                    "lit": "fees",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "fees",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "fees",
                  "{id}",
                ],
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
            "type": "`$STRING`",
          },
          {
            "name": "country",
            "type": "`$STRING`",
          },
          {
            "name": "departments",
            "short": "Sub-resource (InstitutionDepartments); see the DreamApply SDK.",
            "type": "`$OBJECT`",
          },
          {
            "name": "erasmus",
            "type": "`$STRING`",
          },
          {
            "name": "iban",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "location",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "registration",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "vat",
            "type": "`$STRING`",
          },
          {
            "name": "www",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/institutions",
                "segments": [
                  {
                    "lit": "institutions",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "institutions",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.departments`",
                },
                "parts": [
                  "institutions",
                  "{id}",
                ],
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
            "type": "`$STRING`",
          },
          {
            "name": "commence",
            "type": "`$STRING`",
          },
          {
            "name": "decision",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "policy",
            "type": "`$STRING`",
          },
          {
            "name": "pre",
            "type": "`$OBJECT`",
          },
          {
            "name": "start",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/intakes",
                "segments": [
                  {
                    "lit": "intakes",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "intakes",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "intakes",
                  "{id}",
                ],
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
            "type": "`$OBJECT`",
          },
          {
            "name": "application",
            "type": "`$OBJECT`",
          },
          {
            "name": "collected",
            "type": "`$STRING`",
          },
          {
            "name": "course",
            "type": "`$OBJECT`",
          },
          {
            "name": "currency",
            "type": "`$STRING`",
          },
          {
            "name": "deadline",
            "type": "`$STRING`",
          },
          {
            "name": "delivered",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "instructions",
            "type": "`$STRING`",
          },
          {
            "name": "issued",
            "type": "`$STRING`",
          },
          {
            "name": "nr",
            "type": "`$STRING`",
          },
          {
            "name": "payer",
            "type": "`$OBJECT`",
          },
          {
            "name": "reminded",
            "type": "`$STRING`",
          },
          {
            "name": "smallprint",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/invoices",
                "segments": [
                  {
                    "lit": "invoices",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "invoices",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "invoices",
                  "{id}",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "invoices",
                  "{id}",
                ],
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
            "type": "`$OBJECT`",
          },
          {
            "name": "applicant",
            "type": "`$OBJECT`",
          },
          {
            "name": "application",
            "type": "`$OBJECT`",
          },
          {
            "name": "bind",
            "type": "`$ARRAY`",
          },
          {
            "name": "course",
            "type": "`$OBJECT`",
          },
          {
            "name": "document",
            "type": "`$OBJECT`",
          },
          {
            "name": "event",
            "type": "`$STRING`",
          },
          {
            "name": "flag",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "institution",
            "type": "`$OBJECT`",
          },
          {
            "name": "invoice",
            "type": "`$OBJECT`",
          },
          {
            "name": "logged",
            "type": "`$STRING`",
          },
          {
            "name": "offer",
            "type": "`$OBJECT`",
          },
          {
            "name": "tracker",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/journal",
                "segments": [
                  {
                    "lit": "journal",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "journal",
                ],
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
            "type": "`$INTEGER`",
          },
          {
            "name": "ip",
            "type": "`$STRING`",
          },
          {
            "name": "logged",
            "type": "`$STRING`",
          },
          {
            "name": "result",
            "type": "`$STRING`",
          },
          {
            "name": "role",
            "type": "`$STRING`",
          },
          {
            "name": "roleId",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/logins",
                "segments": [
                  {
                    "lit": "logins",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "logins",
                ],
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
            "type": "`$STRING`",
          },
          {
            "name": "created",
            "type": "`$STRING`",
          },
          {
            "name": "date",
            "type": "`$STRING`",
          },
          {
            "name": "depth",
            "type": "`$STRING`",
          },
          {
            "name": "group",
            "short": "Sub-resource (object); see the DreamApply SDK.",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "instructions",
            "type": "`$STRING`",
          },
          {
            "name": "language",
            "type": "`$STRING`",
          },
          {
            "name": "maps",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "rangeMax",
            "type": "`$STRING`",
          },
          {
            "name": "rangeMin",
            "type": "`$STRING`",
          },
          {
            "name": "reference",
            "type": "`$STRING`",
          },
          {
            "name": "scale",
            "type": "`$INTEGER`",
          },
          {
            "name": "scored",
            "type": "`$STRING`",
          },
          {
            "name": "scores",
            "short": "Sub-resource (Scores); see the DreamApply SDK.",
            "type": "`$OBJECT`",
          },
          {
            "name": "subject",
            "type": "`$STRING`",
          },
          {
            "name": "type",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/scoresheets",
                "segments": [
                  {
                    "lit": "scoresheets",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "scoresheets",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "scoresheets",
                  "{id}",
                ],
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
            "short": "Sub-resource (StreamInterface); see the DreamApply SDK.",
            "type": "`$OBJECT`",
          },
          {
            "name": "created",
            "type": "`$STRING`",
          },
          {
            "name": "expires",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "mime",
            "type": "`$STRING`",
          },
          {
            "name": "modified",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "size",
            "type": "`$INTEGER`",
          },
          {
            "name": "tabledata",
            "type": "`$OBJECT`",
          },
          {
            "name": "title",
            "type": "`$STRING`",
          },
          {
            "name": "uploaded",
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
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/tableviews",
                "segments": [
                  {
                    "lit": "tableviews",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "tableviews",
                ],
              },
            ],
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.tabledata`",
                },
                "parts": [
                  "tableviews",
                  "{id}",
                ],
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
