package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAcademicTermEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

var NewAcademicYearEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

var NewAdministratorEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

var NewApplicantEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

var NewApplicationEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

var NewCourseEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

var NewFeeEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

var NewInstitutionEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

var NewIntakeEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

var NewInvoiceEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

var NewJournalEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

var NewLoginEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

var NewScoresheetEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

var NewTableViewEntityFunc func(client *DreamapplySDK, entopts map[string]any) DreamapplyEntity

