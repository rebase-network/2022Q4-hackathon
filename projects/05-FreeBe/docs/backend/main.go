package main

import (
	"freebe/configs"
	"freebe/handler"
	"freebe/logger"
	"freebe/service"
	"github.com/labstack/echo/middleware"
)

const (
	configFile      string = "test.toml"
	configPath      string = "."
	SERVER_COMM_KEY        = ""
)

func main() {
	//日志生成
	logger.NewLogger()
	//配置读取
	configs.InitConfig(configFile, configPath)
	logger.Logger.Infow("InitConfig success", "Conf", configs.Conf)

	service.InitDB()

	httpSrv := handler.NewServer()
	httpHandler := &handler.HttpHandler{}
	httpHandler.CheckJWT = middleware.JWT([]byte(SERVER_COMM_KEY))
	httpHandler.RegisterServer(httpSrv)
	err := httpSrv.Run()
	if err != nil {
		logger.Logger.Errorw(" app Run failed", "err", err)
	}
	logger.Logger.Infow("free-be app start success", "address", configs.Conf.Http)
}
