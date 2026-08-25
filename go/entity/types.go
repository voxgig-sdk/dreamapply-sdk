// Typed models for the Dreamapply SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/dreamapply-sdk/go/core"
)

// AcademicTerm is the typed data model for the academic_term entity.
type AcademicTerm struct {
	Finish *string `json:"finish,omitempty"`
	Grace *string `json:"grace,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Start *string `json:"start,omitempty"`
	Type *map[string]any `json:"type,omitempty"`
	Year *map[string]any `json:"year,omitempty"`
}

// AcademicTermLoadMatch is the typed request payload for AcademicTerm.LoadTyped.
type AcademicTermLoadMatch struct {
	Id int `json:"id"`
}

// AcademicTermListMatch is the typed request payload for AcademicTerm.ListTyped.
type AcademicTermListMatch struct {
	Finish *string `json:"finish,omitempty"`
	Grace *string `json:"grace,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Start *string `json:"start,omitempty"`
	Type *map[string]any `json:"type,omitempty"`
	Year *map[string]any `json:"year,omitempty"`
}

// AcademicYear is the typed data model for the academic_year entity.
type AcademicYear struct {
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Start *string `json:"start,omitempty"`
}

// AcademicYearLoadMatch is the typed request payload for AcademicYear.LoadTyped.
type AcademicYearLoadMatch struct {
	Id int `json:"id"`
}

// AcademicYearListMatch is the typed request payload for AcademicYear.ListTyped.
type AcademicYearListMatch struct {
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Start *string `json:"start,omitempty"`
}

// Administrator is the typed data model for the administrator entity.
type Administrator struct {
	Email *string `json:"email,omitempty"`
	Function *string `json:"function,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	OutgoingEmail *string `json:"outgoingEmail,omitempty"`
	OutgoingName *string `json:"outgoingName,omitempty"`
	Phone *string `json:"phone,omitempty"`
}

// AdministratorLoadMatch is the typed request payload for Administrator.LoadTyped.
type AdministratorLoadMatch struct {
	Id int `json:"id"`
}

// AdministratorListMatch is the typed request payload for Administrator.ListTyped.
type AdministratorListMatch struct {
	Email *string `json:"email,omitempty"`
	Function *string `json:"function,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	OutgoingEmail *string `json:"outgoingEmail,omitempty"`
	OutgoingName *string `json:"outgoingName,omitempty"`
	Phone *string `json:"phone,omitempty"`
}

// Applicant is the typed data model for the applicant entity.
type Applicant struct {
	Address *string `json:"address,omitempty"`
	Citizenship *string `json:"citizenship,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *int `json:"id,omitempty"`
	Matriculation *string `json:"matriculation,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
	NameFamily *string `json:"name_family,omitempty"`
	NameGiven *string `json:"name_given,omitempty"`
	Notes *string `json:"notes,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Photo *map[string]any `json:"photo,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Region *string `json:"region,omitempty"`
	Registered *string `json:"registered,omitempty"`
	TrackerID *string `json:"tracker_ID,omitempty"`
	Type *string `json:"type,omitempty"`
	Vatin *string `json:"vatin,omitempty"`
}

// ApplicantLoadMatch is the typed request payload for Applicant.LoadTyped.
type ApplicantLoadMatch struct {
	Id int `json:"id"`
}

// ApplicantListMatch is the typed request payload for Applicant.ListTyped.
type ApplicantListMatch struct {
	Address *string `json:"address,omitempty"`
	Citizenship *string `json:"citizenship,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *int `json:"id,omitempty"`
	Matriculation *string `json:"matriculation,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
	NameFamily *string `json:"name_family,omitempty"`
	NameGiven *string `json:"name_given,omitempty"`
	Notes *string `json:"notes,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Photo *map[string]any `json:"photo,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Region *string `json:"region,omitempty"`
	Registered *string `json:"registered,omitempty"`
	TrackerID *string `json:"tracker_ID,omitempty"`
	Type *string `json:"type,omitempty"`
	Vatin *string `json:"vatin,omitempty"`
}

// ApplicantCreateData is the typed request payload for Applicant.CreateTyped.
type ApplicantCreateData struct {
	Address *string `json:"address,omitempty"`
	Citizenship *string `json:"citizenship,omitempty"`
	Email *string `json:"email,omitempty"`
	Id *int `json:"id,omitempty"`
	Matriculation *string `json:"matriculation,omitempty"`
	Name *map[string]any `json:"name,omitempty"`
	NameFamily *string `json:"name_family,omitempty"`
	NameGiven *string `json:"name_given,omitempty"`
	Notes *string `json:"notes,omitempty"`
	Phone *string `json:"phone,omitempty"`
	Photo *map[string]any `json:"photo,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Region *string `json:"region,omitempty"`
	Registered *string `json:"registered,omitempty"`
	TrackerID *string `json:"tracker_ID,omitempty"`
	Type *string `json:"type,omitempty"`
	Vatin *string `json:"vatin,omitempty"`
}

// Application is the typed data model for the application entity.
type Application struct {
	AcademicTerm *map[string]any `json:"academicTerm,omitempty"`
	Activities *[]any `json:"activities,omitempty"`
	Applicant *map[string]any `json:"applicant,omitempty"`
	Career *[]any `json:"career,omitempty"`
	Contact *[]any `json:"contact,omitempty"`
	Created *string `json:"created,omitempty"`
	Education *[]any `json:"education,omitempty"`
	Extras *[]any `json:"extras,omitempty"`
	Grades *[]any `json:"grades,omitempty"`
	Home *[]any `json:"home,omitempty"`
	Host *[]any `json:"host,omitempty"`
	Id *int `json:"id,omitempty"`
	Languages *[]any `json:"languages,omitempty"`
	Legal *[]any `json:"legal,omitempty"`
	Misc *[]any `json:"misc,omitempty"`
	Motivation *[]any `json:"motivation,omitempty"`
	Pdf *map[string]any `json:"pdf,omitempty"`
	Profile *[]any `json:"profile,omitempty"`
	Residences *[]any `json:"residences,omitempty"`
	Revised *string `json:"revised,omitempty"`
	Status *string `json:"status,omitempty"`
	Submitted *string `json:"submitted,omitempty"`
	Visa *[]any `json:"visa,omitempty"`
}

// ApplicationLoadMatch is the typed request payload for Application.LoadTyped.
type ApplicationLoadMatch struct {
	Id int `json:"id"`
}

// ApplicationListMatch is the typed request payload for Application.ListTyped.
type ApplicationListMatch struct {
	AcademicTerm *map[string]any `json:"academicTerm,omitempty"`
	Activities *[]any `json:"activities,omitempty"`
	Applicant *map[string]any `json:"applicant,omitempty"`
	Career *[]any `json:"career,omitempty"`
	Contact *[]any `json:"contact,omitempty"`
	Created *string `json:"created,omitempty"`
	Education *[]any `json:"education,omitempty"`
	Extras *[]any `json:"extras,omitempty"`
	Grades *[]any `json:"grades,omitempty"`
	Home *[]any `json:"home,omitempty"`
	Host *[]any `json:"host,omitempty"`
	Id *int `json:"id,omitempty"`
	Languages *[]any `json:"languages,omitempty"`
	Legal *[]any `json:"legal,omitempty"`
	Misc *[]any `json:"misc,omitempty"`
	Motivation *[]any `json:"motivation,omitempty"`
	Pdf *map[string]any `json:"pdf,omitempty"`
	Profile *[]any `json:"profile,omitempty"`
	Residences *[]any `json:"residences,omitempty"`
	Revised *string `json:"revised,omitempty"`
	Status *string `json:"status,omitempty"`
	Submitted *string `json:"submitted,omitempty"`
	Visa *[]any `json:"visa,omitempty"`
}

// Course is the typed data model for the course entity.
type Course struct {
	Accreditation *string `json:"accreditation,omitempty"`
	Address *string `json:"address,omitempty"`
	AwardsAbbr *string `json:"awards_abbr,omitempty"`
	AwardsFull *string `json:"awards_full,omitempty"`
	Code *string `json:"code,omitempty"`
	CodeInternal *string `json:"codeInternal,omitempty"`
	Country *string `json:"country,omitempty"`
	Credits *string `json:"credits,omitempty"`
	Departments *map[string]any `json:"departments,omitempty"`
	Duration *string `json:"duration,omitempty"`
	Erasmus *string `json:"erasmus,omitempty"`
	Featured *string `json:"featured,omitempty"`
	Iban *string `json:"iban,omitempty"`
	Id *int `json:"id,omitempty"`
	Institution *string `json:"institution,omitempty"`
	Language *string `json:"language,omitempty"`
	Location *string `json:"location,omitempty"`
	Mode *string `json:"mode,omitempty"`
	Name *string `json:"name,omitempty"`
	ProspectUri *string `json:"prospect_uri,omitempty"`
	Quota *string `json:"quota,omitempty"`
	Registration *string `json:"registration,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
	Updated *string `json:"updated,omitempty"`
	Vat *string `json:"vat,omitempty"`
	Www *string `json:"www,omitempty"`
}

// CourseLoadMatch is the typed request payload for Course.LoadTyped.
type CourseLoadMatch struct {
	Id int `json:"id"`
}

// CourseListMatch is the typed request payload for Course.ListTyped.
type CourseListMatch struct {
	Accreditation *string `json:"accreditation,omitempty"`
	Address *string `json:"address,omitempty"`
	AwardsAbbr *string `json:"awards_abbr,omitempty"`
	AwardsFull *string `json:"awards_full,omitempty"`
	Code *string `json:"code,omitempty"`
	CodeInternal *string `json:"codeInternal,omitempty"`
	Country *string `json:"country,omitempty"`
	Credits *string `json:"credits,omitempty"`
	Departments *map[string]any `json:"departments,omitempty"`
	Duration *string `json:"duration,omitempty"`
	Erasmus *string `json:"erasmus,omitempty"`
	Featured *string `json:"featured,omitempty"`
	Iban *string `json:"iban,omitempty"`
	Id *int `json:"id,omitempty"`
	Institution *string `json:"institution,omitempty"`
	Language *string `json:"language,omitempty"`
	Location *string `json:"location,omitempty"`
	Mode *string `json:"mode,omitempty"`
	Name *string `json:"name,omitempty"`
	ProspectUri *string `json:"prospect_uri,omitempty"`
	Quota *string `json:"quota,omitempty"`
	Registration *string `json:"registration,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
	Updated *string `json:"updated,omitempty"`
	Vat *string `json:"vat,omitempty"`
	Www *string `json:"www,omitempty"`
}

// CourseCreateData is the typed request payload for Course.CreateTyped.
type CourseCreateData struct {
	Accreditation *string `json:"accreditation,omitempty"`
	Address *string `json:"address,omitempty"`
	AwardsAbbr *string `json:"awards_abbr,omitempty"`
	AwardsFull *string `json:"awards_full,omitempty"`
	Code *string `json:"code,omitempty"`
	CodeInternal *string `json:"codeInternal,omitempty"`
	Country *string `json:"country,omitempty"`
	Credits *string `json:"credits,omitempty"`
	Departments *map[string]any `json:"departments,omitempty"`
	Duration *string `json:"duration,omitempty"`
	Erasmus *string `json:"erasmus,omitempty"`
	Featured *string `json:"featured,omitempty"`
	Iban *string `json:"iban,omitempty"`
	Id *int `json:"id,omitempty"`
	Institution *string `json:"institution,omitempty"`
	Language *string `json:"language,omitempty"`
	Location *string `json:"location,omitempty"`
	Mode *string `json:"mode,omitempty"`
	Name *string `json:"name,omitempty"`
	ProspectUri *string `json:"prospect_uri,omitempty"`
	Quota *string `json:"quota,omitempty"`
	Registration *string `json:"registration,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
	Updated *string `json:"updated,omitempty"`
	Vat *string `json:"vat,omitempty"`
	Www *string `json:"www,omitempty"`
}

// Fee is the typed data model for the fee entity.
type Fee struct {
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Notes *string `json:"notes,omitempty"`
	Type *string `json:"type,omitempty"`
}

// FeeLoadMatch is the typed request payload for Fee.LoadTyped.
type FeeLoadMatch struct {
	Id int `json:"id"`
}

// FeeListMatch is the typed request payload for Fee.ListTyped.
type FeeListMatch struct {
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Notes *string `json:"notes,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Institution is the typed data model for the institution entity.
type Institution struct {
	Address *string `json:"address,omitempty"`
	Country *string `json:"country,omitempty"`
	Departments *map[string]any `json:"departments,omitempty"`
	Erasmus *string `json:"erasmus,omitempty"`
	Iban *string `json:"iban,omitempty"`
	Id *int `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	Name *string `json:"name,omitempty"`
	Registration *string `json:"registration,omitempty"`
	Status *string `json:"status,omitempty"`
	Vat *string `json:"vat,omitempty"`
	Www *string `json:"www,omitempty"`
}

// InstitutionLoadMatch is the typed request payload for Institution.LoadTyped.
type InstitutionLoadMatch struct {
	Id int `json:"id"`
}

// InstitutionListMatch is the typed request payload for Institution.ListTyped.
type InstitutionListMatch struct {
	Address *string `json:"address,omitempty"`
	Country *string `json:"country,omitempty"`
	Departments *map[string]any `json:"departments,omitempty"`
	Erasmus *string `json:"erasmus,omitempty"`
	Iban *string `json:"iban,omitempty"`
	Id *int `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	Name *string `json:"name,omitempty"`
	Registration *string `json:"registration,omitempty"`
	Status *string `json:"status,omitempty"`
	Vat *string `json:"vat,omitempty"`
	Www *string `json:"www,omitempty"`
}

// Intake is the typed data model for the intake entity.
type Intake struct {
	Arrival *string `json:"arrival,omitempty"`
	Commence *string `json:"commence,omitempty"`
	Decision *map[string]any `json:"decision,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Policy *string `json:"policy,omitempty"`
	Pre *map[string]any `json:"pre,omitempty"`
	Start *string `json:"start,omitempty"`
}

// IntakeLoadMatch is the typed request payload for Intake.LoadTyped.
type IntakeLoadMatch struct {
	Id int `json:"id"`
}

// IntakeListMatch is the typed request payload for Intake.ListTyped.
type IntakeListMatch struct {
	Arrival *string `json:"arrival,omitempty"`
	Commence *string `json:"commence,omitempty"`
	Decision *map[string]any `json:"decision,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Policy *string `json:"policy,omitempty"`
	Pre *map[string]any `json:"pre,omitempty"`
	Start *string `json:"start,omitempty"`
}

// Invoice is the typed data model for the invoice entity.
type Invoice struct {
	Applicant *map[string]any `json:"applicant,omitempty"`
	Application *map[string]any `json:"application,omitempty"`
	Collected *string `json:"collected,omitempty"`
	Course *map[string]any `json:"course,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Deadline *string `json:"deadline,omitempty"`
	Delivered *string `json:"delivered,omitempty"`
	Id *int `json:"id,omitempty"`
	Instructions *string `json:"instructions,omitempty"`
	Issued *string `json:"issued,omitempty"`
	Nr *string `json:"nr,omitempty"`
	Payer *map[string]any `json:"payer,omitempty"`
	Reminded *string `json:"reminded,omitempty"`
	Smallprint *string `json:"smallprint,omitempty"`
}

// InvoiceLoadMatch is the typed request payload for Invoice.LoadTyped.
type InvoiceLoadMatch struct {
	Id int `json:"id"`
}

// InvoiceListMatch is the typed request payload for Invoice.ListTyped.
type InvoiceListMatch struct {
	Applicant *map[string]any `json:"applicant,omitempty"`
	Application *map[string]any `json:"application,omitempty"`
	Collected *string `json:"collected,omitempty"`
	Course *map[string]any `json:"course,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Deadline *string `json:"deadline,omitempty"`
	Delivered *string `json:"delivered,omitempty"`
	Id *int `json:"id,omitempty"`
	Instructions *string `json:"instructions,omitempty"`
	Issued *string `json:"issued,omitempty"`
	Nr *string `json:"nr,omitempty"`
	Payer *map[string]any `json:"payer,omitempty"`
	Reminded *string `json:"reminded,omitempty"`
	Smallprint *string `json:"smallprint,omitempty"`
}

// InvoiceRemoveMatch is the typed request payload for Invoice.RemoveTyped.
type InvoiceRemoveMatch struct {
	Id int `json:"id"`
}

// Journal is the typed data model for the journal entity.
type Journal struct {
	Administrator *map[string]any `json:"administrator,omitempty"`
	Applicant *map[string]any `json:"applicant,omitempty"`
	Application *map[string]any `json:"application,omitempty"`
	Bind *[]any `json:"bind,omitempty"`
	Course *map[string]any `json:"course,omitempty"`
	Document *map[string]any `json:"document,omitempty"`
	Event *string `json:"event,omitempty"`
	Flag *map[string]any `json:"flag,omitempty"`
	Id *int `json:"id,omitempty"`
	Institution *map[string]any `json:"institution,omitempty"`
	Invoice *map[string]any `json:"invoice,omitempty"`
	Logged *string `json:"logged,omitempty"`
	Offer *map[string]any `json:"offer,omitempty"`
	Tracker *map[string]any `json:"tracker,omitempty"`
}

// JournalListMatch is the typed request payload for Journal.ListTyped.
type JournalListMatch struct {
	Administrator *map[string]any `json:"administrator,omitempty"`
	Applicant *map[string]any `json:"applicant,omitempty"`
	Application *map[string]any `json:"application,omitempty"`
	Bind *[]any `json:"bind,omitempty"`
	Course *map[string]any `json:"course,omitempty"`
	Document *map[string]any `json:"document,omitempty"`
	Event *string `json:"event,omitempty"`
	Flag *map[string]any `json:"flag,omitempty"`
	Id *int `json:"id,omitempty"`
	Institution *map[string]any `json:"institution,omitempty"`
	Invoice *map[string]any `json:"invoice,omitempty"`
	Logged *string `json:"logged,omitempty"`
	Offer *map[string]any `json:"offer,omitempty"`
	Tracker *map[string]any `json:"tracker,omitempty"`
}

// Login is the typed data model for the login entity.
type Login struct {
	Id *int `json:"id,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Logged *string `json:"logged,omitempty"`
	Result *string `json:"result,omitempty"`
	Role *string `json:"role,omitempty"`
	RoleId *int `json:"roleId,omitempty"`
}

// LoginListMatch is the typed request payload for Login.ListTyped.
type LoginListMatch struct {
	Id *int `json:"id,omitempty"`
	Ip *string `json:"ip,omitempty"`
	Logged *string `json:"logged,omitempty"`
	Result *string `json:"result,omitempty"`
	Role *string `json:"role,omitempty"`
	RoleId *int `json:"roleId,omitempty"`
}

// Scoresheet is the typed data model for the scoresheet entity.
type Scoresheet struct {
	Confirmed *string `json:"confirmed,omitempty"`
	Created *string `json:"created,omitempty"`
	Date *string `json:"date,omitempty"`
	Depth *string `json:"depth,omitempty"`
	Group *map[string]any `json:"group,omitempty"`
	Id *string `json:"id,omitempty"`
	Instructions *string `json:"instructions,omitempty"`
	Language *string `json:"language,omitempty"`
	Maps *[]any `json:"maps,omitempty"`
	Name *string `json:"name,omitempty"`
	RangeMax *string `json:"rangeMax,omitempty"`
	RangeMin *string `json:"rangeMin,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Scale *int `json:"scale,omitempty"`
	Scored *string `json:"scored,omitempty"`
	Scores *map[string]any `json:"scores,omitempty"`
	Subject *string `json:"subject,omitempty"`
	Type *string `json:"type,omitempty"`
}

// ScoresheetLoadMatch is the typed request payload for Scoresheet.LoadTyped.
type ScoresheetLoadMatch struct {
	Id int `json:"id"`
}

// ScoresheetListMatch is the typed request payload for Scoresheet.ListTyped.
type ScoresheetListMatch struct {
	Confirmed *string `json:"confirmed,omitempty"`
	Created *string `json:"created,omitempty"`
	Date *string `json:"date,omitempty"`
	Depth *string `json:"depth,omitempty"`
	Group *map[string]any `json:"group,omitempty"`
	Id *string `json:"id,omitempty"`
	Instructions *string `json:"instructions,omitempty"`
	Language *string `json:"language,omitempty"`
	Maps *[]any `json:"maps,omitempty"`
	Name *string `json:"name,omitempty"`
	RangeMax *string `json:"rangeMax,omitempty"`
	RangeMin *string `json:"rangeMin,omitempty"`
	Reference *string `json:"reference,omitempty"`
	Scale *int `json:"scale,omitempty"`
	Scored *string `json:"scored,omitempty"`
	Scores *map[string]any `json:"scores,omitempty"`
	Subject *string `json:"subject,omitempty"`
	Type *string `json:"type,omitempty"`
}

// TableView is the typed data model for the table_view entity.
type TableView struct {
	Content *map[string]any `json:"content,omitempty"`
	Created *string `json:"created,omitempty"`
	Expires *string `json:"expires,omitempty"`
	Id *int `json:"id,omitempty"`
	Mime *string `json:"mime,omitempty"`
	Modified *string `json:"modified,omitempty"`
	Name *string `json:"name,omitempty"`
	Size *int `json:"size,omitempty"`
	Tabledata *map[string]any `json:"tabledata,omitempty"`
	Title *string `json:"title,omitempty"`
	Uploaded *string `json:"uploaded,omitempty"`
}

// TableViewLoadMatch is the typed request payload for TableView.LoadTyped.
type TableViewLoadMatch struct {
	Id int `json:"id"`
}

// TableViewListMatch is the typed request payload for TableView.ListTyped.
type TableViewListMatch struct {
	Content *map[string]any `json:"content,omitempty"`
	Created *string `json:"created,omitempty"`
	Expires *string `json:"expires,omitempty"`
	Id *int `json:"id,omitempty"`
	Mime *string `json:"mime,omitempty"`
	Modified *string `json:"modified,omitempty"`
	Name *string `json:"name,omitempty"`
	Size *int `json:"size,omitempty"`
	Tabledata *map[string]any `json:"tabledata,omitempty"`
	Title *string `json:"title,omitempty"`
	Uploaded *string `json:"uploaded,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
