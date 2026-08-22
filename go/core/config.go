package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Dreamapply",
			"slug": "dreamapply",
			"version": "0.1.2",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://{instance}.dreamapply.com/api",
			"server": map[string]any{
				"instance": "demo",
			},
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"academic_term": map[string]any{},
				"academic_year": map[string]any{},
				"administrator": map[string]any{},
				"applicant": map[string]any{},
				"application": map[string]any{},
				"course": map[string]any{},
				"fee": map[string]any{},
				"institution": map[string]any{},
				"intake": map[string]any{},
				"invoice": map[string]any{},
				"journal": map[string]any{},
				"login": map[string]any{},
				"scoresheet": map[string]any{},
				"table_view": map[string]any{},
			},
		},
		"entity": map[string]any{
			"academic_term": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "finish",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "grace",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "start",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "year",
						"type": "`$OBJECT`",
					},
				},
				"name": "academic_term",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/academic-terms",
								"parts": []any{
									"academic-terms",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/academic-terms/{id}",
								"parts": []any{
									"academic-terms",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"academic_year": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "start",
						"type": "`$STRING`",
					},
				},
				"name": "academic_year",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/academic-years",
								"parts": []any{
									"academic-years",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/academic-years/{id}",
								"parts": []any{
									"academic-years",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"administrator": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "function",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "outgoingEmail",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "outgoingName",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"type": "`$STRING`",
					},
				},
				"name": "administrator",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/administrators",
								"parts": []any{
									"administrators",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/administrators/{id}",
								"parts": []any{
									"administrators",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"applicant": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "citizenship",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "matriculation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name_family",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name_given",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "notes",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "photo",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "reference",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "registered",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tracker_ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vatin",
						"type": "`$STRING`",
					},
				},
				"name": "applicant",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/applicants",
								"parts": []any{
									"applicants",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/applicants",
								"parts": []any{
									"applicants",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/applicants/{id}",
								"parts": []any{
									"applicants",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"application": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "academicTerm",
						"short": "Sub-resource (AcademicTerm); see the DreamApply SDK.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "activities",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "applicant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "career",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "contact",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "education",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "extras",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "grades",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "home",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "host",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "languages",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "legal",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "misc",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "motivation",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "pdf",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "profile",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "residences",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "revised",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "submitted",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "visa",
						"type": "`$ARRAY`",
					},
				},
				"name": "application",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/applications",
								"parts": []any{
									"applications",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/applications/{id}",
								"parts": []any{
									"applications",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"course": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accreditation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "awards_abbr",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "awards_full",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "codeInternal",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "credits",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "departments",
						"short": "Sub-resource (InstitutionDepartments); see the DreamApply SDK.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "duration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "erasmus",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "featured",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "iban",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "institution",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "prospect_uri",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "quota",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "registration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "www",
						"type": "`$STRING`",
					},
				},
				"name": "course",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/courses",
								"parts": []any{
									"courses",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.institution`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/courses",
								"parts": []any{
									"courses",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/courses/{id}",
								"parts": []any{
									"courses",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.institution`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"fee": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "notes",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
				},
				"name": "fee",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/fees",
								"parts": []any{
									"fees",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/fees/{id}",
								"parts": []any{
									"fees",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"institution": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "departments",
						"short": "Sub-resource (InstitutionDepartments); see the DreamApply SDK.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "erasmus",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "iban",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "registration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "www",
						"type": "`$STRING`",
					},
				},
				"name": "institution",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/institutions",
								"parts": []any{
									"institutions",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/institutions/{id}",
								"parts": []any{
									"institutions",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.departments`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"intake": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "arrival",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "commence",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "decision",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "policy",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pre",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "start",
						"type": "`$STRING`",
					},
				},
				"name": "intake",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/intakes",
								"parts": []any{
									"intakes",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/intakes/{id}",
								"parts": []any{
									"intakes",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"invoice": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "applicant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "application",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "collected",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "course",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "currency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "deadline",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "delivered",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "instructions",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "issued",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nr",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "payer",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "reminded",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "smallprint",
						"type": "`$STRING`",
					},
				},
				"name": "invoice",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/invoices",
								"parts": []any{
									"invoices",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/invoices/{id}",
								"parts": []any{
									"invoices",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/invoices/{id}",
								"parts": []any{
									"invoices",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"journal": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "administrator",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "applicant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "application",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "bind",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "course",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "document",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "event",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "flag",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "institution",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "invoice",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "logged",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "offer",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "tracker",
						"type": "`$OBJECT`",
					},
				},
				"name": "journal",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/journal",
								"parts": []any{
									"journal",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"login": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "ip",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "logged",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "result",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "role",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "roleId",
						"type": "`$INTEGER`",
					},
				},
				"name": "login",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/logins",
								"parts": []any{
									"logins",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"scoresheet": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "confirmed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "depth",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "group",
						"short": "Sub-resource (object); see the DreamApply SDK.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "instructions",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "maps",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rangeMax",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rangeMin",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reference",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scale",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "scored",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scores",
						"short": "Sub-resource (Scores); see the DreamApply SDK.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "subject",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$STRING`",
					},
				},
				"name": "scoresheet",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/scoresheets",
								"parts": []any{
									"scoresheets",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/scoresheets/{id}",
								"parts": []any{
									"scoresheets",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"table_view": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "content",
						"short": "Sub-resource (StreamInterface); see the DreamApply SDK.",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "mime",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "modified",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "size",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "tabledata",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uploaded",
						"type": "`$STRING`",
					},
				},
				"name": "table_view",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/tableviews",
								"parts": []any{
									"tableviews",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/tableviews/{id}",
								"parts": []any{
									"tableviews",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.tabledata`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
