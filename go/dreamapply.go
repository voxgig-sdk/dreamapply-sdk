package voxgigdreamapplysdk

import (
	"github.com/voxgig-sdk/dreamapply-sdk/go/core"
	"github.com/voxgig-sdk/dreamapply-sdk/go/entity"
	"github.com/voxgig-sdk/dreamapply-sdk/go/feature"
	_ "github.com/voxgig-sdk/dreamapply-sdk/go/utility"
)

// Type aliases preserve external API.
type DreamapplySDK = core.DreamapplySDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type DreamapplyEntity = core.DreamapplyEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type DreamapplyError = core.DreamapplyError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAcademicTermEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewAcademicTermEntity(client, entopts)
	}
	core.NewAcademicYearEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewAcademicYearEntity(client, entopts)
	}
	core.NewAdministratorEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewAdministratorEntity(client, entopts)
	}
	core.NewApplicantEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewApplicantEntity(client, entopts)
	}
	core.NewApplicationEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewApplicationEntity(client, entopts)
	}
	core.NewCourseEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewCourseEntity(client, entopts)
	}
	core.NewFeeEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewFeeEntity(client, entopts)
	}
	core.NewInstitutionEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewInstitutionEntity(client, entopts)
	}
	core.NewIntakeEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewIntakeEntity(client, entopts)
	}
	core.NewInvoiceEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewInvoiceEntity(client, entopts)
	}
	core.NewJournalEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewJournalEntity(client, entopts)
	}
	core.NewLoginEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewLoginEntity(client, entopts)
	}
	core.NewScoresheetEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewScoresheetEntity(client, entopts)
	}
	core.NewTableViewEntityFunc = func(client *core.DreamapplySDK, entopts map[string]any) core.DreamapplyEntity {
		return entity.NewTableViewEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewDreamapplySDK = core.NewDreamapplySDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewDreamapplySDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *DreamapplySDK  { return NewDreamapplySDK(nil) }
func Test() *DreamapplySDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
