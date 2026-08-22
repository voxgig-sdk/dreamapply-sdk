
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Dreamapply',
        slug: "dreamapply",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


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
      
      academic_term: {
      },

      academic_year: {
      },

      administrator: {
      },

      applicant: {
      },

      application: {
      },

      course: {
      },

      fee: {
      },

      institution: {
      },

      intake: {
      },

      invoice: {
      },

      journal: {
      },

      login: {
      },

      scoresheet: {
      },

      table_view: {
      },

    }
  }


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
              "parts": [
                "academic-terms"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "academic-terms",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "start",
          "type": "`$STRING`"
        }
      ],
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
              "parts": [
                "academic-years"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "academic-years",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "administrators"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "administrators",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "applicants"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "applicants"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "applicants",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "applications"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "applications",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "courses"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.institution`"
              }
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
              "parts": [
                "courses"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "courses",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.institution`"
              }
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
              "parts": [
                "fees"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "fees",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "institutions"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "institutions",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.departments`"
              }
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
              "parts": [
                "intakes"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "intakes",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "invoices"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "invoices",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "invoices",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "journal"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "logins"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "scoresheets"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "scoresheets",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "tableviews"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "tableviews",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.tabledata`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

