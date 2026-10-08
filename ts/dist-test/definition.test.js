"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "academic_term",
        "accessor": "AcademicTerm",
        "op": "list",
        "method": "GET",
        "path": "/academic-terms",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "start": "x",
                "grace": "x",
                "finish": "x",
                "year": {
                    "name": "x",
                    "start": "x"
                },
                "type": {
                    "name": "Legacy"
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "academic_term",
        "accessor": "AcademicTerm",
        "op": "load",
        "method": "GET",
        "path": "/academic-terms/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "start": "x",
            "grace": "x",
            "finish": "x",
            "year": {
                "name": "x",
                "start": "x"
            },
            "type": {
                "name": "Legacy"
            }
        },
        "idField": "id"
    },
    {
        "entity": "academic_year",
        "accessor": "AcademicYear",
        "op": "list",
        "method": "GET",
        "path": "/academic-years",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "name": "x",
                "start": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "academic_year",
        "accessor": "AcademicYear",
        "op": "load",
        "method": "GET",
        "path": "/academic-years/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "name": "x",
            "start": "x"
        },
        "idField": "id"
    },
    {
        "entity": "administrator",
        "accessor": "Administrator",
        "op": "list",
        "method": "GET",
        "path": "/administrators",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "email": "x",
                "outgoingName": "x",
                "outgoingEmail": "x",
                "phone": "x",
                "function": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "administrator",
        "accessor": "Administrator",
        "op": "load",
        "method": "GET",
        "path": "/administrators/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "email": "x",
            "outgoingName": "x",
            "outgoingEmail": "x",
            "phone": "x",
            "function": "x"
        },
        "idField": "id"
    },
    {
        "entity": "applicant",
        "accessor": "Applicant",
        "op": "create",
        "method": "POST",
        "path": "/applicants",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": 1,
            "type": "Child",
            "registered": "x",
            "email": "x",
            "phone": "x",
            "reference": "x",
            "matriculation": "x",
            "citizenship": "x",
            "notes": "x",
            "address": "x",
            "vatin": "x",
            "name": {
                "full": "x",
                "given": "x",
                "middle": "x",
                "family": "x",
                "parent": "x",
                "legal": "x"
            },
            "photo": {
                "uploaded": "x",
                "name": "x",
                "mime": "x",
                "size": 1,
                "content": {},
                "expires": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "applicant",
        "accessor": "Applicant",
        "op": "list",
        "method": "GET",
        "path": "/applicants",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 1,
                "type": "Child",
                "registered": "x",
                "email": "x",
                "phone": "x",
                "reference": "x",
                "matriculation": "x",
                "citizenship": "x",
                "notes": "x",
                "address": "x",
                "vatin": "x",
                "name": {
                    "full": "x",
                    "given": "x",
                    "middle": "x",
                    "family": "x",
                    "parent": "x",
                    "legal": "x"
                },
                "photo": {
                    "uploaded": "x",
                    "name": "x",
                    "mime": "x",
                    "size": 1,
                    "content": {},
                    "expires": "x"
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "applicant",
        "accessor": "Applicant",
        "op": "load",
        "method": "GET",
        "path": "/applicants/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 1,
            "type": "Child",
            "registered": "x",
            "email": "x",
            "phone": "x",
            "reference": "x",
            "matriculation": "x",
            "citizenship": "x",
            "notes": "x",
            "address": "x",
            "vatin": "x",
            "name": {
                "full": "x",
                "given": "x",
                "middle": "x",
                "family": "x",
                "parent": "x",
                "legal": "x"
            },
            "photo": {
                "uploaded": "x",
                "name": "x",
                "mime": "x",
                "size": 1,
                "content": {},
                "expires": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "application",
        "accessor": "Application",
        "op": "list",
        "method": "GET",
        "path": "/applications",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 1,
                "created": "x",
                "revised": "x",
                "submitted": "x",
                "status": "Blank",
                "profile": [],
                "legal": [],
                "contact": [],
                "home": [],
                "host": [],
                "education": [],
                "grades": [],
                "languages": [],
                "career": [],
                "activities": [],
                "residences": [],
                "motivation": [],
                "visa": [],
                "misc": [],
                "extras": [],
                "academicTerm": {},
                "applicant": {
                    "id": 1,
                    "type": "Child",
                    "registered": "x",
                    "email": "x",
                    "phone": "x",
                    "reference": "x",
                    "matriculation": "x",
                    "citizenship": "x",
                    "notes": "x",
                    "address": "x",
                    "vatin": "x",
                    "name": {
                        "full": "x",
                        "given": "x",
                        "middle": "x",
                        "family": "x",
                        "parent": "x",
                        "legal": "x"
                    },
                    "photo": {
                        "uploaded": "x",
                        "name": "x",
                        "mime": "x",
                        "size": 1,
                        "content": {},
                        "expires": "x"
                    }
                },
                "pdf": {
                    "uploaded": "x",
                    "name": "x",
                    "mime": "x",
                    "size": 1,
                    "content": {},
                    "expires": "x"
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "application",
        "accessor": "Application",
        "op": "load",
        "method": "GET",
        "path": "/applications/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 1,
            "created": "x",
            "revised": "x",
            "submitted": "x",
            "status": "Blank",
            "profile": [],
            "legal": [],
            "contact": [],
            "home": [],
            "host": [],
            "education": [],
            "grades": [],
            "languages": [],
            "career": [],
            "activities": [],
            "residences": [],
            "motivation": [],
            "visa": [],
            "misc": [],
            "extras": [],
            "academicTerm": {},
            "applicant": {
                "id": 1,
                "type": "Child",
                "registered": "x",
                "email": "x",
                "phone": "x",
                "reference": "x",
                "matriculation": "x",
                "citizenship": "x",
                "notes": "x",
                "address": "x",
                "vatin": "x",
                "name": {
                    "full": "x",
                    "given": "x",
                    "middle": "x",
                    "family": "x",
                    "parent": "x",
                    "legal": "x"
                },
                "photo": {
                    "uploaded": "x",
                    "name": "x",
                    "mime": "x",
                    "size": 1,
                    "content": {},
                    "expires": "x"
                }
            },
            "pdf": {
                "uploaded": "x",
                "name": "x",
                "mime": "x",
                "size": 1,
                "content": {},
                "expires": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "course",
        "accessor": "Course",
        "op": "create",
        "method": "POST",
        "path": "/courses",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 201,
        "sample": {
            "id": 1,
            "status": "Archived",
            "updated": "x",
            "featured": "x",
            "type": "x",
            "name": "x",
            "mode": "x",
            "duration": "x",
            "credits": "x",
            "language": "x",
            "country": "x",
            "location": "x",
            "code": "x",
            "accreditation": "x",
            "quota": "x",
            "codeInternal": "x",
            "institution": {
                "id": 1,
                "status": "x",
                "name": "x",
                "country": "x",
                "location": "x",
                "www": "x",
                "erasmus": "x",
                "address": "x",
                "vat": "x",
                "iban": "x",
                "registration": "x",
                "departments": {}
            }
        },
        "idField": "id"
    },
    {
        "entity": "course",
        "accessor": "Course",
        "op": "list",
        "method": "GET",
        "path": "/courses",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 1,
                "status": "Archived",
                "updated": "x",
                "featured": "x",
                "type": "x",
                "name": "x",
                "mode": "x",
                "duration": "x",
                "credits": "x",
                "language": "x",
                "country": "x",
                "location": "x",
                "code": "x",
                "accreditation": "x",
                "quota": "x",
                "codeInternal": "x",
                "institution": {
                    "id": 1,
                    "status": "x",
                    "name": "x",
                    "country": "x",
                    "location": "x",
                    "www": "x",
                    "erasmus": "x",
                    "address": "x",
                    "vat": "x",
                    "iban": "x",
                    "registration": "x",
                    "departments": {}
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "course",
        "accessor": "Course",
        "op": "load",
        "method": "GET",
        "path": "/courses/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 1,
            "status": "Archived",
            "updated": "x",
            "featured": "x",
            "type": "x",
            "name": "x",
            "mode": "x",
            "duration": "x",
            "credits": "x",
            "language": "x",
            "country": "x",
            "location": "x",
            "code": "x",
            "accreditation": "x",
            "quota": "x",
            "codeInternal": "x",
            "institution": {
                "id": 1,
                "status": "x",
                "name": "x",
                "country": "x",
                "location": "x",
                "www": "x",
                "erasmus": "x",
                "address": "x",
                "vat": "x",
                "iban": "x",
                "registration": "x",
                "departments": {}
            }
        },
        "idField": "id"
    },
    {
        "entity": "fee",
        "accessor": "Fee",
        "op": "list",
        "method": "GET",
        "path": "/fees",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "name": "x",
                "type": "x",
                "notes": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "fee",
        "accessor": "Fee",
        "op": "load",
        "method": "GET",
        "path": "/fees/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "name": "x",
            "type": "x",
            "notes": "x"
        },
        "idField": "id"
    },
    {
        "entity": "institution",
        "accessor": "Institution",
        "op": "list",
        "method": "GET",
        "path": "/institutions",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 1,
                "status": "x",
                "name": "x",
                "country": "x",
                "location": "x",
                "www": "x",
                "erasmus": "x",
                "address": "x",
                "vat": "x",
                "iban": "x",
                "registration": "x",
                "departments": {}
            }
        ],
        "idField": "id"
    },
    {
        "entity": "institution",
        "accessor": "Institution",
        "op": "load",
        "method": "GET",
        "path": "/institutions/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 1,
            "status": "x",
            "name": "x",
            "country": "x",
            "location": "x",
            "www": "x",
            "erasmus": "x",
            "address": "x",
            "vat": "x",
            "iban": "x",
            "registration": "x",
            "departments": {}
        },
        "idField": "id"
    },
    {
        "entity": "intake",
        "accessor": "Intake",
        "op": "list",
        "method": "GET",
        "path": "/intakes",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "start": "x",
                "policy": "Flexible",
                "arrival": "x",
                "commence": "x",
                "pre": {
                    "deadline": "x",
                    "info": "x",
                    "mask": true
                },
                "decision": {
                    "policy": "x",
                    "days": 1,
                    "date": "x"
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "intake",
        "accessor": "Intake",
        "op": "load",
        "method": "GET",
        "path": "/intakes/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "start": "x",
            "policy": "Flexible",
            "arrival": "x",
            "commence": "x",
            "pre": {
                "deadline": "x",
                "info": "x",
                "mask": true
            },
            "decision": {
                "policy": "x",
                "days": 1,
                "date": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "invoice",
        "accessor": "Invoice",
        "op": "list",
        "method": "GET",
        "path": "/invoices",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 1,
                "nr": "x",
                "issued": "x",
                "deadline": "x",
                "delivered": "x",
                "reminded": "x",
                "collected": "x",
                "currency": "x",
                "instructions": "x",
                "smallprint": "x",
                "applicant": {
                    "id": 1,
                    "type": "Child",
                    "registered": "x",
                    "email": "x",
                    "phone": "x",
                    "reference": "x",
                    "matriculation": "x",
                    "citizenship": "x",
                    "notes": "x",
                    "address": "x",
                    "vatin": "x",
                    "name": {
                        "full": "x",
                        "given": "x",
                        "middle": "x",
                        "family": "x",
                        "parent": "x",
                        "legal": "x"
                    },
                    "photo": {
                        "uploaded": "x",
                        "name": "x",
                        "mime": "x",
                        "size": 1,
                        "content": {},
                        "expires": "x"
                    }
                },
                "application": {
                    "id": 1,
                    "created": "x",
                    "revised": "x",
                    "submitted": "x",
                    "status": "Blank",
                    "profile": [],
                    "legal": [],
                    "contact": [],
                    "home": [],
                    "host": [],
                    "education": [],
                    "grades": [],
                    "languages": [],
                    "career": [],
                    "activities": [],
                    "residences": [],
                    "motivation": [],
                    "visa": [],
                    "misc": [],
                    "extras": [],
                    "academicTerm": {},
                    "applicant": {
                        "id": 1,
                        "type": "Child",
                        "registered": "x",
                        "email": "x",
                        "phone": "x",
                        "reference": "x",
                        "matriculation": "x",
                        "citizenship": "x",
                        "notes": "x",
                        "address": "x",
                        "vatin": "x",
                        "name": {
                            "full": "x",
                            "given": "x",
                            "middle": "x",
                            "family": "x",
                            "parent": "x",
                            "legal": "x"
                        },
                        "photo": {
                            "uploaded": "x",
                            "name": "x",
                            "mime": "x",
                            "size": 1,
                            "content": {},
                            "expires": "x"
                        }
                    },
                    "pdf": {
                        "uploaded": "x",
                        "name": "x",
                        "mime": "x",
                        "size": 1,
                        "content": {},
                        "expires": "x"
                    }
                },
                "course": {
                    "id": 1,
                    "status": "Archived",
                    "updated": "x",
                    "featured": "x",
                    "type": "x",
                    "name": "x",
                    "mode": "x",
                    "duration": "x",
                    "credits": "x",
                    "language": "x",
                    "country": "x",
                    "location": "x",
                    "code": "x",
                    "accreditation": "x",
                    "quota": "x",
                    "codeInternal": "x",
                    "institution": {
                        "id": 1,
                        "status": "x",
                        "name": "x",
                        "country": "x",
                        "location": "x",
                        "www": "x",
                        "erasmus": "x",
                        "address": "x",
                        "vat": "x",
                        "iban": "x",
                        "registration": "x",
                        "departments": {}
                    }
                },
                "payer": {
                    "name": "x",
                    "email": "x"
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "invoice",
        "accessor": "Invoice",
        "op": "load",
        "method": "GET",
        "path": "/invoices/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 1,
            "nr": "x",
            "issued": "x",
            "deadline": "x",
            "delivered": "x",
            "reminded": "x",
            "collected": "x",
            "currency": "x",
            "instructions": "x",
            "smallprint": "x",
            "applicant": {
                "id": 1,
                "type": "Child",
                "registered": "x",
                "email": "x",
                "phone": "x",
                "reference": "x",
                "matriculation": "x",
                "citizenship": "x",
                "notes": "x",
                "address": "x",
                "vatin": "x",
                "name": {
                    "full": "x",
                    "given": "x",
                    "middle": "x",
                    "family": "x",
                    "parent": "x",
                    "legal": "x"
                },
                "photo": {
                    "uploaded": "x",
                    "name": "x",
                    "mime": "x",
                    "size": 1,
                    "content": {},
                    "expires": "x"
                }
            },
            "application": {
                "id": 1,
                "created": "x",
                "revised": "x",
                "submitted": "x",
                "status": "Blank",
                "profile": [],
                "legal": [],
                "contact": [],
                "home": [],
                "host": [],
                "education": [],
                "grades": [],
                "languages": [],
                "career": [],
                "activities": [],
                "residences": [],
                "motivation": [],
                "visa": [],
                "misc": [],
                "extras": [],
                "academicTerm": {},
                "applicant": {
                    "id": 1,
                    "type": "Child",
                    "registered": "x",
                    "email": "x",
                    "phone": "x",
                    "reference": "x",
                    "matriculation": "x",
                    "citizenship": "x",
                    "notes": "x",
                    "address": "x",
                    "vatin": "x",
                    "name": {
                        "full": "x",
                        "given": "x",
                        "middle": "x",
                        "family": "x",
                        "parent": "x",
                        "legal": "x"
                    },
                    "photo": {
                        "uploaded": "x",
                        "name": "x",
                        "mime": "x",
                        "size": 1,
                        "content": {},
                        "expires": "x"
                    }
                },
                "pdf": {
                    "uploaded": "x",
                    "name": "x",
                    "mime": "x",
                    "size": 1,
                    "content": {},
                    "expires": "x"
                }
            },
            "course": {
                "id": 1,
                "status": "Archived",
                "updated": "x",
                "featured": "x",
                "type": "x",
                "name": "x",
                "mode": "x",
                "duration": "x",
                "credits": "x",
                "language": "x",
                "country": "x",
                "location": "x",
                "code": "x",
                "accreditation": "x",
                "quota": "x",
                "codeInternal": "x",
                "institution": {
                    "id": 1,
                    "status": "x",
                    "name": "x",
                    "country": "x",
                    "location": "x",
                    "www": "x",
                    "erasmus": "x",
                    "address": "x",
                    "vat": "x",
                    "iban": "x",
                    "registration": "x",
                    "departments": {}
                }
            },
            "payer": {
                "name": "x",
                "email": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "invoice",
        "accessor": "Invoice",
        "op": "remove",
        "method": "DELETE",
        "path": "/invoices/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "journal",
        "accessor": "Journal",
        "op": "list",
        "method": "GET",
        "path": "/journal",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 1,
                "logged": "x",
                "event": "x",
                "bind": [],
                "administrator": {
                    "id": 1,
                    "name": "x",
                    "email": "x",
                    "outgoingName": "x",
                    "outgoingEmail": "x",
                    "phone": "x",
                    "function": "x"
                },
                "applicant": {
                    "id": 1,
                    "type": "Child",
                    "registered": "x",
                    "email": "x",
                    "phone": "x",
                    "reference": "x",
                    "matriculation": "x",
                    "citizenship": "x",
                    "notes": "x",
                    "address": "x",
                    "vatin": "x",
                    "name": {
                        "full": "x",
                        "given": "x",
                        "middle": "x",
                        "family": "x",
                        "parent": "x",
                        "legal": "x"
                    },
                    "photo": {
                        "uploaded": "x",
                        "name": "x",
                        "mime": "x",
                        "size": 1,
                        "content": {},
                        "expires": "x"
                    }
                },
                "application": {
                    "id": 1,
                    "created": "x",
                    "revised": "x",
                    "submitted": "x",
                    "status": "Blank",
                    "profile": [],
                    "legal": [],
                    "contact": [],
                    "home": [],
                    "host": [],
                    "education": [],
                    "grades": [],
                    "languages": [],
                    "career": [],
                    "activities": [],
                    "residences": [],
                    "motivation": [],
                    "visa": [],
                    "misc": [],
                    "extras": [],
                    "academicTerm": {},
                    "applicant": {
                        "id": 1,
                        "type": "Child",
                        "registered": "x",
                        "email": "x",
                        "phone": "x",
                        "reference": "x",
                        "matriculation": "x",
                        "citizenship": "x",
                        "notes": "x",
                        "address": "x",
                        "vatin": "x",
                        "name": {
                            "full": "x",
                            "given": "x",
                            "middle": "x",
                            "family": "x",
                            "parent": "x",
                            "legal": "x"
                        },
                        "photo": {
                            "uploaded": "x",
                            "name": "x",
                            "mime": "x",
                            "size": 1,
                            "content": {},
                            "expires": "x"
                        }
                    },
                    "pdf": {
                        "uploaded": "x",
                        "name": "x",
                        "mime": "x",
                        "size": 1,
                        "content": {},
                        "expires": "x"
                    }
                },
                "course": {
                    "id": 1,
                    "status": "Archived",
                    "updated": "x",
                    "featured": "x",
                    "type": "x",
                    "name": "x",
                    "mode": "x",
                    "duration": "x",
                    "credits": "x",
                    "language": "x",
                    "country": "x",
                    "location": "x",
                    "code": "x",
                    "accreditation": "x",
                    "quota": "x",
                    "codeInternal": "x",
                    "institution": {
                        "id": 1,
                        "status": "x",
                        "name": "x",
                        "country": "x",
                        "location": "x",
                        "www": "x",
                        "erasmus": "x",
                        "address": "x",
                        "vat": "x",
                        "iban": "x",
                        "registration": "x",
                        "departments": {}
                    }
                },
                "institution": {
                    "id": 1,
                    "status": "x",
                    "name": "x",
                    "country": "x",
                    "location": "x",
                    "www": "x",
                    "erasmus": "x",
                    "address": "x",
                    "vat": "x",
                    "iban": "x",
                    "registration": "x",
                    "departments": {}
                },
                "invoice": {
                    "id": 1,
                    "nr": "x",
                    "issued": "x",
                    "deadline": "x",
                    "delivered": "x",
                    "reminded": "x",
                    "collected": "x",
                    "currency": "x",
                    "instructions": "x",
                    "smallprint": "x",
                    "applicant": {
                        "id": 1,
                        "type": "Child",
                        "registered": "x",
                        "email": "x",
                        "phone": "x",
                        "reference": "x",
                        "matriculation": "x",
                        "citizenship": "x",
                        "notes": "x",
                        "address": "x",
                        "vatin": "x",
                        "name": {
                            "full": "x",
                            "given": "x",
                            "middle": "x",
                            "family": "x",
                            "parent": "x",
                            "legal": "x"
                        },
                        "photo": {
                            "uploaded": "x",
                            "name": "x",
                            "mime": "x",
                            "size": 1,
                            "content": {},
                            "expires": "x"
                        }
                    },
                    "application": {
                        "id": 1,
                        "created": "x",
                        "revised": "x",
                        "submitted": "x",
                        "status": "Blank",
                        "profile": [],
                        "legal": [],
                        "contact": [],
                        "home": [],
                        "host": [],
                        "education": [],
                        "grades": [],
                        "languages": [],
                        "career": [],
                        "activities": [],
                        "residences": [],
                        "motivation": [],
                        "visa": [],
                        "misc": [],
                        "extras": [],
                        "academicTerm": {},
                        "applicant": {
                            "id": 1,
                            "type": "Child",
                            "registered": "x",
                            "email": "x",
                            "phone": "x",
                            "reference": "x",
                            "matriculation": "x",
                            "citizenship": "x",
                            "notes": "x",
                            "address": "x",
                            "vatin": "x",
                            "name": {
                                "full": "x",
                                "given": "x",
                                "middle": "x",
                                "family": "x",
                                "parent": "x",
                                "legal": "x"
                            },
                            "photo": {
                                "uploaded": "x",
                                "name": "x",
                                "mime": "x",
                                "size": 1,
                                "content": {},
                                "expires": "x"
                            }
                        },
                        "pdf": {
                            "uploaded": "x",
                            "name": "x",
                            "mime": "x",
                            "size": 1,
                            "content": {},
                            "expires": "x"
                        }
                    },
                    "course": {
                        "id": 1,
                        "status": "Archived",
                        "updated": "x",
                        "featured": "x",
                        "type": "x",
                        "name": "x",
                        "mode": "x",
                        "duration": "x",
                        "credits": "x",
                        "language": "x",
                        "country": "x",
                        "location": "x",
                        "code": "x",
                        "accreditation": "x",
                        "quota": "x",
                        "codeInternal": "x",
                        "institution": {
                            "id": 1,
                            "status": "x",
                            "name": "x",
                            "country": "x",
                            "location": "x",
                            "www": "x",
                            "erasmus": "x",
                            "address": "x",
                            "vat": "x",
                            "iban": "x",
                            "registration": "x",
                            "departments": {}
                        }
                    },
                    "payer": {
                        "name": "x",
                        "email": "x"
                    }
                },
                "offer": {
                    "id": 1,
                    "priority": 1,
                    "inserted": 1,
                    "saved": 1,
                    "confirmed": 1,
                    "comments": "x",
                    "commentsConfirmed": "x",
                    "decision": "Declined",
                    "decisionPolicy": "x",
                    "decisionDeadline": "x",
                    "decided": 1,
                    "scored": 1,
                    "notes": "x",
                    "subject": "x",
                    "course": {
                        "id": 1,
                        "status": "Archived",
                        "updated": "x",
                        "featured": "x",
                        "type": "x",
                        "name": "x",
                        "mode": "x",
                        "duration": "x",
                        "credits": "x",
                        "language": "x",
                        "country": "x",
                        "location": "x",
                        "code": "x",
                        "accreditation": "x",
                        "quota": "x",
                        "codeInternal": "x",
                        "institution": {
                            "id": 1,
                            "status": "x",
                            "name": "x",
                            "country": "x",
                            "location": "x",
                            "www": "x",
                            "erasmus": "x",
                            "address": "x",
                            "vat": "x",
                            "iban": "x",
                            "registration": "x",
                            "departments": {}
                        }
                    },
                    "intake": {
                        "id": 1,
                        "name": "x",
                        "start": "x",
                        "policy": "Flexible",
                        "arrival": "x",
                        "commence": "x",
                        "pre": {
                            "deadline": "x",
                            "info": "x",
                            "mask": true
                        },
                        "decision": {
                            "policy": "x",
                            "days": 1,
                            "date": "x"
                        }
                    },
                    "score": {
                        "auto": "x",
                        "extra": "x"
                    },
                    "reason": {
                        "id": 1,
                        "reason": "x"
                    },
                    "type": {
                        "id": 1,
                        "title": "x",
                        "colour": "x",
                        "ranking": "Eliminated",
                        "bcc": {},
                        "confirm": true,
                        "freeze": true,
                        "decide": true,
                        "decline": true,
                        "reopen": true,
                        "silence": true,
                        "subject": "x",
                        "comments": "x"
                    },
                    "typeConfirmed": {}
                },
                "document": {
                    "uploaded": "x",
                    "name": "x",
                    "mime": "x",
                    "size": 1,
                    "content": {},
                    "expires": "x"
                },
                "flag": {
                    "id": 1,
                    "created": "x",
                    "name": "x"
                },
                "tracker": {
                    "id": 1,
                    "created": "x",
                    "code": "x",
                    "notes": "x",
                    "reduction": {
                        "reduction": "x",
                        "percent": "x",
                        "amount": "x",
                        "cents": 1,
                        "currency": "x"
                    }
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "login",
        "accessor": "Login",
        "op": "list",
        "method": "GET",
        "path": "/logins",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 1,
                "logged": "x",
                "ip": "x",
                "roleId": 1,
                "role": "x",
                "result": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "scoresheet",
        "accessor": "Scoresheet",
        "op": "list",
        "method": "GET",
        "path": "/scoresheets",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "created": "x",
                "scored": "x",
                "confirmed": "x",
                "name": "x",
                "type": "x",
                "maps": [],
                "date": "x",
                "depth": "x",
                "rangeMin": "x",
                "rangeMax": "x",
                "scale": 1,
                "instructions": "x",
                "reference": "x",
                "subject": "x",
                "language": "x",
                "group": {},
                "scores": {}
            }
        ],
        "idField": "id"
    },
    {
        "entity": "scoresheet",
        "accessor": "Scoresheet",
        "op": "load",
        "method": "GET",
        "path": "/scoresheets/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "created": "x",
            "scored": "x",
            "confirmed": "x",
            "name": "x",
            "type": "x",
            "maps": [],
            "date": "x",
            "depth": "x",
            "rangeMin": "x",
            "rangeMax": "x",
            "scale": 1,
            "instructions": "x",
            "reference": "x",
            "subject": "x",
            "language": "x",
            "group": {},
            "scores": {}
        },
        "idField": "id"
    },
    {
        "entity": "table_view",
        "accessor": "TableView",
        "op": "list",
        "method": "GET",
        "path": "/tableviews",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": [
            {
                "id": 1,
                "created": "x",
                "modified": "x",
                "title": "x",
                "tabledata": {
                    "uploaded": "x",
                    "name": "x",
                    "mime": "x",
                    "size": 1,
                    "content": {},
                    "expires": "x"
                }
            }
        ],
        "idField": "id"
    },
    {
        "entity": "table_view",
        "accessor": "TableView",
        "op": "load",
        "method": "GET",
        "path": "/tableviews/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "id": 1,
            "created": "x",
            "modified": "x",
            "title": "x",
            "tabledata": {
                "uploaded": "x",
                "name": "x",
                "mime": "x",
                "size": 1,
                "content": {},
                "expires": "x"
            }
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map