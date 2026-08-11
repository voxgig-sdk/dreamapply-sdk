package core

type DreamapplyError struct {
	IsDreamapplyError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewDreamapplyError(code string, msg string, ctx *Context) *DreamapplyError {
	return &DreamapplyError{
		IsDreamapplyError: true,
		Sdk:              "Dreamapply",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *DreamapplyError) Error() string {
	return e.Msg
}
