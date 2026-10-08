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
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"title": "Finish",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "grace",
						"title": "Grace",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "start",
						"title": "Start",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "year",
						"title": "Year",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "academic_term",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/academic-terms",
								"segments": []any{
									map[string]any{
										"lit": "academic-terms",
									},
								},
								"parts": []any{
									"academic-terms",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/academic-terms/{id}",
								"segments": []any{
									map[string]any{
										"lit": "academic-terms",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"academic-terms",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "start",
						"title": "Start",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "academic_year",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/academic-years",
								"segments": []any{
									map[string]any{
										"lit": "academic-years",
									},
								},
								"parts": []any{
									"academic-years",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/academic-years/{id}",
								"segments": []any{
									map[string]any{
										"lit": "academic-years",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"academic-years",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "function",
						"title": "Function",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "outgoingEmail",
						"title": "Outgoing Email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "outgoingName",
						"title": "Outgoing Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"title": "Phone",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "administrator",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/administrators",
								"segments": []any{
									map[string]any{
										"lit": "administrators",
									},
								},
								"parts": []any{
									"administrators",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/administrators/{id}",
								"segments": []any{
									map[string]any{
										"lit": "administrators",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"administrators",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "citizenship",
						"title": "Citizenship",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "matriculation",
						"title": "Matriculation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name_family",
						"title": "Name Family",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name_given",
						"title": "Name Given",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "notes",
						"title": "Notes",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "phone",
						"title": "Phone",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "photo",
						"title": "Photo",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "reference",
						"title": "Reference",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "region",
						"title": "Region",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "registered",
						"title": "Registered",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tracker_ID",
						"title": "Tracker Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vatin",
						"title": "Vatin",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "applicant",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/applicants",
								"segments": []any{
									map[string]any{
										"lit": "applicants",
									},
								},
								"parts": []any{
									"applicants",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/applicants",
								"segments": []any{
									map[string]any{
										"lit": "applicants",
									},
								},
								"parts": []any{
									"applicants",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/applicants/{id}",
								"segments": []any{
									map[string]any{
										"lit": "applicants",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"applicants",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Academic Term",
						"type": "`$OBJECT`",
						"short": "Sub-resource (AcademicTerm); see the DreamApply SDK.",
					},
					map[string]any{
						"name": "activities",
						"title": "Activities",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "applicant",
						"title": "Applicant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "career",
						"title": "Career",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "contact",
						"title": "Contact",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "created",
						"title": "Created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "education",
						"title": "Education",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "extras",
						"title": "Extras",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "grades",
						"title": "Grades",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "home",
						"title": "Home",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "host",
						"title": "Host",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "languages",
						"title": "Languages",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "legal",
						"title": "Legal",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "misc",
						"title": "Misc",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "motivation",
						"title": "Motivation",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "pdf",
						"title": "Pdf",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "profile",
						"title": "Profile",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "residences",
						"title": "Residences",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "revised",
						"title": "Revised",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "submitted",
						"title": "Submitted",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "visa",
						"title": "Visa",
						"type": "`$ARRAY`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "application",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/applications",
								"segments": []any{
									map[string]any{
										"lit": "applications",
									},
								},
								"parts": []any{
									"applications",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/applications/{id}",
								"segments": []any{
									map[string]any{
										"lit": "applications",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"applications",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Accreditation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "awards_abbr",
						"title": "Awards Abbr",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "awards_full",
						"title": "Awards Full",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "code",
						"title": "Code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "codeInternal",
						"title": "Code Internal",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "credits",
						"title": "Credits",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "featured",
						"title": "Featured",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "institution",
						"title": "Institution",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mode",
						"title": "Mode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "prospect_uri",
						"title": "Prospect Uri",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "quota",
						"title": "Quota",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated",
						"title": "Updated",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "course",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/courses",
								"segments": []any{
									map[string]any{
										"lit": "courses",
									},
								},
								"parts": []any{
									"courses",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/courses",
								"segments": []any{
									map[string]any{
										"lit": "courses",
									},
								},
								"parts": []any{
									"courses",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/courses/{id}",
								"segments": []any{
									map[string]any{
										"lit": "courses",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"courses",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "notes",
						"title": "Notes",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "fee",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/fees",
								"segments": []any{
									map[string]any{
										"lit": "fees",
									},
								},
								"parts": []any{
									"fees",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/fees/{id}",
								"segments": []any{
									map[string]any{
										"lit": "fees",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"fees",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "departments",
						"title": "Departments",
						"type": "`$OBJECT`",
						"short": "Sub-resource (InstitutionDepartments); see the DreamApply SDK.",
					},
					map[string]any{
						"name": "erasmus",
						"title": "Erasmus",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "iban",
						"title": "Iban",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "registration",
						"title": "Registration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "vat",
						"title": "Vat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "www",
						"title": "Www",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "institution",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/institutions",
								"segments": []any{
									map[string]any{
										"lit": "institutions",
									},
								},
								"parts": []any{
									"institutions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/institutions/{id}",
								"segments": []any{
									map[string]any{
										"lit": "institutions",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"institutions",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Arrival",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "commence",
						"title": "Commence",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "decision",
						"title": "Decision",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "policy",
						"title": "Policy",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pre",
						"title": "Pre",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "start",
						"title": "Start",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "intake",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/intakes",
								"segments": []any{
									map[string]any{
										"lit": "intakes",
									},
								},
								"parts": []any{
									"intakes",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/intakes/{id}",
								"segments": []any{
									map[string]any{
										"lit": "intakes",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"intakes",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Applicant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "application",
						"title": "Application",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "collected",
						"title": "Collected",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "course",
						"title": "Course",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "deadline",
						"title": "Deadline",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "delivered",
						"title": "Delivered",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "instructions",
						"title": "Instructions",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "issued",
						"title": "Issued",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nr",
						"title": "Nr",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "payer",
						"title": "Payer",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "reminded",
						"title": "Reminded",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "smallprint",
						"title": "Smallprint",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "invoice",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/invoices",
								"segments": []any{
									map[string]any{
										"lit": "invoices",
									},
								},
								"parts": []any{
									"invoices",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/invoices/{id}",
								"segments": []any{
									map[string]any{
										"lit": "invoices",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"invoices",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/invoices/{id}",
								"segments": []any{
									map[string]any{
										"lit": "invoices",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"invoices",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Administrator",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "applicant",
						"title": "Applicant",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "application",
						"title": "Application",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "bind",
						"title": "Bind",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "course",
						"title": "Course",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "document",
						"title": "Document",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "event",
						"title": "Event",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "flag",
						"title": "Flag",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "institution",
						"title": "Institution",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "invoice",
						"title": "Invoice",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "logged",
						"title": "Logged",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "offer",
						"title": "Offer",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "tracker",
						"title": "Tracker",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "journal",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/journal",
								"segments": []any{
									map[string]any{
										"lit": "journal",
									},
								},
								"parts": []any{
									"journal",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "ip",
						"title": "Ip",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "logged",
						"title": "Logged",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "result",
						"title": "Result",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "role",
						"title": "Role",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "roleId",
						"title": "Role Id",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "login",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/logins",
								"segments": []any{
									map[string]any{
										"lit": "logins",
									},
								},
								"parts": []any{
									"logins",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Confirmed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created",
						"title": "Created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "depth",
						"title": "Depth",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "group",
						"title": "Group",
						"type": "`$OBJECT`",
						"short": "Sub-resource (object); see the DreamApply SDK.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "instructions",
						"title": "Instructions",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "maps",
						"title": "Maps",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rangeMax",
						"title": "Range Max",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rangeMin",
						"title": "Range Min",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reference",
						"title": "Reference",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scale",
						"title": "Scale",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "scored",
						"title": "Scored",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scores",
						"title": "Scores",
						"type": "`$OBJECT`",
						"short": "Sub-resource (Scores); see the DreamApply SDK.",
					},
					map[string]any{
						"name": "subject",
						"title": "Subject",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "scoresheet",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/scoresheets",
								"segments": []any{
									map[string]any{
										"lit": "scoresheets",
									},
								},
								"parts": []any{
									"scoresheets",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/scoresheets/{id}",
								"segments": []any{
									map[string]any{
										"lit": "scoresheets",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"scoresheets",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"name": "created",
						"title": "Created",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "modified",
						"title": "Modified",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tabledata",
						"title": "Tabledata",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "table_view",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/tableviews",
								"segments": []any{
									map[string]any{
										"lit": "tableviews",
									},
								},
								"parts": []any{
									"tableviews",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/tableviews/{id}",
								"segments": []any{
									map[string]any{
										"lit": "tableviews",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"tableviews",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
