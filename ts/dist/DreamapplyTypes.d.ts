export interface AcademicTerm {
    finish?: string;
    grace?: string;
    id?: number;
    name?: string;
    start?: string;
    type?: Record<string, any>;
    year?: Record<string, any>;
}
export interface AcademicTermLoadMatch {
    id: number;
}
export interface AcademicTermListMatch {
    finish?: string;
    grace?: string;
    id?: number;
    name?: string;
    start?: string;
    type?: Record<string, any>;
    year?: Record<string, any>;
}
export interface AcademicYear {
    name?: string;
    start?: string;
}
export interface AcademicYearLoadMatch {
    id: number;
}
export interface AcademicYearListMatch {
    name?: string;
    start?: string;
}
export interface Administrator {
    email?: string;
    function?: string;
    id?: number;
    name?: string;
    outgoingEmail?: string;
    outgoingName?: string;
    phone?: string;
}
export interface AdministratorLoadMatch {
    id: number;
}
export interface AdministratorListMatch {
    email?: string;
    function?: string;
    id?: number;
    name?: string;
    outgoingEmail?: string;
    outgoingName?: string;
    phone?: string;
}
export interface Applicant {
    address?: string;
    citizenship?: string;
    email?: string;
    id?: number;
    matriculation?: string;
    name?: Record<string, any>;
    name_family?: string;
    name_given?: string;
    notes?: string;
    phone?: string;
    photo?: Record<string, any>;
    reference?: string;
    region?: string;
    registered?: string;
    tracker_ID?: string;
    type?: string;
    vatin?: string;
}
export interface ApplicantLoadMatch {
    id: number;
}
export interface ApplicantListMatch {
    address?: string;
    citizenship?: string;
    email?: string;
    id?: number;
    matriculation?: string;
    name?: Record<string, any>;
    name_family?: string;
    name_given?: string;
    notes?: string;
    phone?: string;
    photo?: Record<string, any>;
    reference?: string;
    region?: string;
    registered?: string;
    tracker_ID?: string;
    type?: string;
    vatin?: string;
}
export interface ApplicantCreateData {
    address?: string;
    citizenship?: string;
    email?: string;
    id?: number;
    matriculation?: string;
    name?: Record<string, any>;
    name_family?: string;
    name_given?: string;
    notes?: string;
    phone?: string;
    photo?: Record<string, any>;
    reference?: string;
    region?: string;
    registered?: string;
    tracker_ID?: string;
    type?: string;
    vatin?: string;
}
export interface Application {
    academicTerm?: Record<string, any>;
    activities?: any[];
    applicant?: Record<string, any>;
    career?: any[];
    contact?: any[];
    created?: string;
    education?: any[];
    extras?: any[];
    grades?: any[];
    home?: any[];
    host?: any[];
    id?: number;
    languages?: any[];
    legal?: any[];
    misc?: any[];
    motivation?: any[];
    pdf?: Record<string, any>;
    profile?: any[];
    residences?: any[];
    revised?: string;
    status?: string;
    submitted?: string;
    visa?: any[];
}
export interface ApplicationLoadMatch {
    id: number;
}
export interface ApplicationListMatch {
    academicTerm?: Record<string, any>;
    activities?: any[];
    applicant?: Record<string, any>;
    career?: any[];
    contact?: any[];
    created?: string;
    education?: any[];
    extras?: any[];
    grades?: any[];
    home?: any[];
    host?: any[];
    id?: number;
    languages?: any[];
    legal?: any[];
    misc?: any[];
    motivation?: any[];
    pdf?: Record<string, any>;
    profile?: any[];
    residences?: any[];
    revised?: string;
    status?: string;
    submitted?: string;
    visa?: any[];
}
export interface Course {
    accreditation?: string;
    address?: string;
    awards_abbr?: string;
    awards_full?: string;
    code?: string;
    codeInternal?: string;
    country?: string;
    credits?: string;
    departments?: Record<string, any>;
    duration?: string;
    erasmus?: string;
    featured?: string;
    iban?: string;
    id?: number;
    institution?: string;
    language?: string;
    location?: string;
    mode?: string;
    name?: string;
    prospect_uri?: string;
    quota?: string;
    registration?: string;
    status?: string;
    type?: string;
    updated?: string;
    vat?: string;
    www?: string;
}
export interface CourseLoadMatch {
    id: number;
}
export interface CourseListMatch {
    accreditation?: string;
    address?: string;
    awards_abbr?: string;
    awards_full?: string;
    code?: string;
    codeInternal?: string;
    country?: string;
    credits?: string;
    departments?: Record<string, any>;
    duration?: string;
    erasmus?: string;
    featured?: string;
    iban?: string;
    id?: number;
    institution?: string;
    language?: string;
    location?: string;
    mode?: string;
    name?: string;
    prospect_uri?: string;
    quota?: string;
    registration?: string;
    status?: string;
    type?: string;
    updated?: string;
    vat?: string;
    www?: string;
}
export interface CourseCreateData {
    accreditation?: string;
    address?: string;
    awards_abbr?: string;
    awards_full?: string;
    code?: string;
    codeInternal?: string;
    country?: string;
    credits?: string;
    departments?: Record<string, any>;
    duration?: string;
    erasmus?: string;
    featured?: string;
    iban?: string;
    id?: number;
    institution?: string;
    language?: string;
    location?: string;
    mode?: string;
    name?: string;
    prospect_uri?: string;
    quota?: string;
    registration?: string;
    status?: string;
    type?: string;
    updated?: string;
    vat?: string;
    www?: string;
}
export interface Fee {
    name?: string;
    notes?: string;
    type?: string;
}
export interface FeeLoadMatch {
    id: number;
}
export interface FeeListMatch {
    name?: string;
    notes?: string;
    type?: string;
}
export interface Institution {
    address?: string;
    country?: string;
    departments?: Record<string, any>;
    erasmus?: string;
    iban?: string;
    id?: number;
    location?: string;
    name?: string;
    registration?: string;
    status?: string;
    vat?: string;
    www?: string;
}
export interface InstitutionLoadMatch {
    id: number;
}
export interface InstitutionListMatch {
    address?: string;
    country?: string;
    departments?: Record<string, any>;
    erasmus?: string;
    iban?: string;
    id?: number;
    location?: string;
    name?: string;
    registration?: string;
    status?: string;
    vat?: string;
    www?: string;
}
export interface Intake {
    arrival?: string;
    commence?: string;
    decision?: Record<string, any>;
    id?: number;
    name?: string;
    policy?: string;
    pre?: Record<string, any>;
    start?: string;
}
export interface IntakeLoadMatch {
    id: number;
}
export interface IntakeListMatch {
    arrival?: string;
    commence?: string;
    decision?: Record<string, any>;
    id?: number;
    name?: string;
    policy?: string;
    pre?: Record<string, any>;
    start?: string;
}
export interface Invoice {
    applicant?: Record<string, any>;
    application?: Record<string, any>;
    collected?: string;
    course?: Record<string, any>;
    currency?: string;
    deadline?: string;
    delivered?: string;
    id?: number;
    instructions?: string;
    issued?: string;
    nr?: string;
    payer?: Record<string, any>;
    reminded?: string;
    smallprint?: string;
}
export interface InvoiceLoadMatch {
    id: number;
}
export interface InvoiceListMatch {
    applicant?: Record<string, any>;
    application?: Record<string, any>;
    collected?: string;
    course?: Record<string, any>;
    currency?: string;
    deadline?: string;
    delivered?: string;
    id?: number;
    instructions?: string;
    issued?: string;
    nr?: string;
    payer?: Record<string, any>;
    reminded?: string;
    smallprint?: string;
}
export interface InvoiceRemoveMatch {
    id: number;
}
export interface Journal {
    administrator?: Record<string, any>;
    applicant?: Record<string, any>;
    application?: Record<string, any>;
    bind?: any[];
    course?: Record<string, any>;
    document?: Record<string, any>;
    event?: string;
    flag?: Record<string, any>;
    id?: number;
    institution?: Record<string, any>;
    invoice?: Record<string, any>;
    logged?: string;
    offer?: Record<string, any>;
    tracker?: Record<string, any>;
}
export interface JournalListMatch {
    administrator?: Record<string, any>;
    applicant?: Record<string, any>;
    application?: Record<string, any>;
    bind?: any[];
    course?: Record<string, any>;
    document?: Record<string, any>;
    event?: string;
    flag?: Record<string, any>;
    id?: number;
    institution?: Record<string, any>;
    invoice?: Record<string, any>;
    logged?: string;
    offer?: Record<string, any>;
    tracker?: Record<string, any>;
}
export interface Login {
    id?: number;
    ip?: string;
    logged?: string;
    result?: string;
    role?: string;
    roleId?: number;
}
export interface LoginListMatch {
    id?: number;
    ip?: string;
    logged?: string;
    result?: string;
    role?: string;
    roleId?: number;
}
export interface Scoresheet {
    confirmed?: string;
    created?: string;
    date?: string;
    depth?: string;
    group?: Record<string, any>;
    instructions?: string;
    language?: string;
    maps?: any[];
    name?: string;
    rangeMax?: string;
    rangeMin?: string;
    reference?: string;
    scale?: number;
    scored?: string;
    scores?: Record<string, any>;
    subject?: string;
    type?: string;
}
export interface ScoresheetLoadMatch {
    id: number;
}
export interface ScoresheetListMatch {
    confirmed?: string;
    created?: string;
    date?: string;
    depth?: string;
    group?: Record<string, any>;
    instructions?: string;
    language?: string;
    maps?: any[];
    name?: string;
    rangeMax?: string;
    rangeMin?: string;
    reference?: string;
    scale?: number;
    scored?: string;
    scores?: Record<string, any>;
    subject?: string;
    type?: string;
}
export interface TableView {
    content?: Record<string, any>;
    created?: string;
    expires?: string;
    id?: number;
    mime?: string;
    modified?: string;
    name?: string;
    size?: number;
    tabledata?: Record<string, any>;
    title?: string;
    uploaded?: string;
}
export interface TableViewLoadMatch {
    id: number;
}
export interface TableViewListMatch {
    content?: Record<string, any>;
    created?: string;
    expires?: string;
    id?: number;
    mime?: string;
    modified?: string;
    name?: string;
    size?: number;
    tabledata?: Record<string, any>;
    title?: string;
    uploaded?: string;
}
