package handler

type Message = string

const (
	SucessMsg       Message = "success"
	ErrParam        Message = "err_param"         // 参数错误
	ErrInternal     Message = "err_internal"      // 内部错误
	EmptyUser       Message = "empty_user"        // 用户未登录
	ErrNoPermission Message = "err_no_permission" // 没有权限
)
