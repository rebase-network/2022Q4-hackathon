package handler

import (
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo"
)

type HttpHandler struct {
	CheckJWT echo.MiddlewareFunc
}

func (h *HttpHandler) RegisterServer(httpSrv *Server) {
	httpSrv.Server().Validator = &CustomValidator{validator: validator.New()}
	r := httpSrv.Server().Group("/free_be")
	r.POST("/user/login", h.HandleUserLogin)

	//dao相关
	r.POST("/dao/create", h.HandleCreateDao)
	r.POST("/dao/edit", h.HandleEditDao)
	r.GET("/dao/info", h.HandleGetDaoInfo)
	r.GET("/dao/list", h.HandleGetDaoList)

	//任务相关
	r.POST("/task/create", h.HandleCreateTask)
	r.POST("/task/edit", h.HandleEditTask)
	r.POST("/task/operate", h.HandleOperateTask)
	r.GET("/task/info", h.HandleGetTaskInfo)
	r.GET("/task/list", h.HandleGetTaskList)
}

type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}
