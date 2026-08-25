# Typed models for the Dreamapply SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AcademicTerm(TypedDict, total=False):
    finish: str
    grace: str
    id: int
    name: str
    start: str
    type: dict
    year: dict


class AcademicTermLoadMatch(TypedDict):
    id: int


class AcademicTermListMatch(TypedDict, total=False):
    finish: str
    grace: str
    id: int
    name: str
    start: str
    type: dict
    year: dict


class AcademicYear(TypedDict, total=False):
    id: str
    name: str
    start: str


class AcademicYearLoadMatch(TypedDict):
    id: int


class AcademicYearListMatch(TypedDict, total=False):
    id: str
    name: str
    start: str


class Administrator(TypedDict, total=False):
    email: str
    function: str
    id: int
    name: str
    outgoingEmail: str
    outgoingName: str
    phone: str


class AdministratorLoadMatch(TypedDict):
    id: int


class AdministratorListMatch(TypedDict, total=False):
    email: str
    function: str
    id: int
    name: str
    outgoingEmail: str
    outgoingName: str
    phone: str


class Applicant(TypedDict, total=False):
    address: str
    citizenship: str
    email: str
    id: int
    matriculation: str
    name: dict
    name_family: str
    name_given: str
    notes: str
    phone: str
    photo: dict
    reference: str
    region: str
    registered: str
    tracker_ID: str
    type: str
    vatin: str


class ApplicantLoadMatch(TypedDict):
    id: int


class ApplicantListMatch(TypedDict, total=False):
    address: str
    citizenship: str
    email: str
    id: int
    matriculation: str
    name: dict
    name_family: str
    name_given: str
    notes: str
    phone: str
    photo: dict
    reference: str
    region: str
    registered: str
    tracker_ID: str
    type: str
    vatin: str


class ApplicantCreateData(TypedDict, total=False):
    address: str
    citizenship: str
    email: str
    id: int
    matriculation: str
    name: dict
    name_family: str
    name_given: str
    notes: str
    phone: str
    photo: dict
    reference: str
    region: str
    registered: str
    tracker_ID: str
    type: str
    vatin: str


class Application(TypedDict, total=False):
    academicTerm: dict
    activities: list
    applicant: dict
    career: list
    contact: list
    created: str
    education: list
    extras: list
    grades: list
    home: list
    host: list
    id: int
    languages: list
    legal: list
    misc: list
    motivation: list
    pdf: dict
    profile: list
    residences: list
    revised: str
    status: str
    submitted: str
    visa: list


class ApplicationLoadMatch(TypedDict):
    id: int


class ApplicationListMatch(TypedDict, total=False):
    academicTerm: dict
    activities: list
    applicant: dict
    career: list
    contact: list
    created: str
    education: list
    extras: list
    grades: list
    home: list
    host: list
    id: int
    languages: list
    legal: list
    misc: list
    motivation: list
    pdf: dict
    profile: list
    residences: list
    revised: str
    status: str
    submitted: str
    visa: list


class Course(TypedDict, total=False):
    accreditation: str
    address: str
    awards_abbr: str
    awards_full: str
    code: str
    codeInternal: str
    country: str
    credits: str
    departments: dict
    duration: str
    erasmus: str
    featured: str
    iban: str
    id: int
    institution: str
    language: str
    location: str
    mode: str
    name: str
    prospect_uri: str
    quota: str
    registration: str
    status: str
    type: str
    updated: str
    vat: str
    www: str


class CourseLoadMatch(TypedDict):
    id: int


class CourseListMatch(TypedDict, total=False):
    accreditation: str
    address: str
    awards_abbr: str
    awards_full: str
    code: str
    codeInternal: str
    country: str
    credits: str
    departments: dict
    duration: str
    erasmus: str
    featured: str
    iban: str
    id: int
    institution: str
    language: str
    location: str
    mode: str
    name: str
    prospect_uri: str
    quota: str
    registration: str
    status: str
    type: str
    updated: str
    vat: str
    www: str


class CourseCreateData(TypedDict, total=False):
    accreditation: str
    address: str
    awards_abbr: str
    awards_full: str
    code: str
    codeInternal: str
    country: str
    credits: str
    departments: dict
    duration: str
    erasmus: str
    featured: str
    iban: str
    id: int
    institution: str
    language: str
    location: str
    mode: str
    name: str
    prospect_uri: str
    quota: str
    registration: str
    status: str
    type: str
    updated: str
    vat: str
    www: str


class Fee(TypedDict, total=False):
    id: str
    name: str
    notes: str
    type: str


class FeeLoadMatch(TypedDict):
    id: int


class FeeListMatch(TypedDict, total=False):
    id: str
    name: str
    notes: str
    type: str


class Institution(TypedDict, total=False):
    address: str
    country: str
    departments: dict
    erasmus: str
    iban: str
    id: int
    location: str
    name: str
    registration: str
    status: str
    vat: str
    www: str


class InstitutionLoadMatch(TypedDict):
    id: int


class InstitutionListMatch(TypedDict, total=False):
    address: str
    country: str
    departments: dict
    erasmus: str
    iban: str
    id: int
    location: str
    name: str
    registration: str
    status: str
    vat: str
    www: str


class Intake(TypedDict, total=False):
    arrival: str
    commence: str
    decision: dict
    id: int
    name: str
    policy: str
    pre: dict
    start: str


class IntakeLoadMatch(TypedDict):
    id: int


class IntakeListMatch(TypedDict, total=False):
    arrival: str
    commence: str
    decision: dict
    id: int
    name: str
    policy: str
    pre: dict
    start: str


class Invoice(TypedDict, total=False):
    applicant: dict
    application: dict
    collected: str
    course: dict
    currency: str
    deadline: str
    delivered: str
    id: int
    instructions: str
    issued: str
    nr: str
    payer: dict
    reminded: str
    smallprint: str


class InvoiceLoadMatch(TypedDict):
    id: int


class InvoiceListMatch(TypedDict, total=False):
    applicant: dict
    application: dict
    collected: str
    course: dict
    currency: str
    deadline: str
    delivered: str
    id: int
    instructions: str
    issued: str
    nr: str
    payer: dict
    reminded: str
    smallprint: str


class InvoiceRemoveMatch(TypedDict):
    id: int


class Journal(TypedDict, total=False):
    administrator: dict
    applicant: dict
    application: dict
    bind: list
    course: dict
    document: dict
    event: str
    flag: dict
    id: int
    institution: dict
    invoice: dict
    logged: str
    offer: dict
    tracker: dict


class JournalListMatch(TypedDict, total=False):
    administrator: dict
    applicant: dict
    application: dict
    bind: list
    course: dict
    document: dict
    event: str
    flag: dict
    id: int
    institution: dict
    invoice: dict
    logged: str
    offer: dict
    tracker: dict


class Login(TypedDict, total=False):
    id: int
    ip: str
    logged: str
    result: str
    role: str
    roleId: int


class LoginListMatch(TypedDict, total=False):
    id: int
    ip: str
    logged: str
    result: str
    role: str
    roleId: int


class Scoresheet(TypedDict, total=False):
    confirmed: str
    created: str
    date: str
    depth: str
    group: dict
    id: str
    instructions: str
    language: str
    maps: list
    name: str
    rangeMax: str
    rangeMin: str
    reference: str
    scale: int
    scored: str
    scores: dict
    subject: str
    type: str


class ScoresheetLoadMatch(TypedDict):
    id: int


class ScoresheetListMatch(TypedDict, total=False):
    confirmed: str
    created: str
    date: str
    depth: str
    group: dict
    id: str
    instructions: str
    language: str
    maps: list
    name: str
    rangeMax: str
    rangeMin: str
    reference: str
    scale: int
    scored: str
    scores: dict
    subject: str
    type: str


class TableView(TypedDict, total=False):
    content: dict
    created: str
    expires: str
    id: int
    mime: str
    modified: str
    name: str
    size: int
    tabledata: dict
    title: str
    uploaded: str


class TableViewLoadMatch(TypedDict):
    id: int


class TableViewListMatch(TypedDict, total=False):
    content: dict
    created: str
    expires: str
    id: int
    mime: str
    modified: str
    name: str
    size: int
    tabledata: dict
    title: str
    uploaded: str
