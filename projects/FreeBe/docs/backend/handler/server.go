package handler

import (
	"context"
	"freebe/configs"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"net"
	"net/url"
	"sync"
	"time"
)

type Server struct {
	echo     *echo.Echo
	ctx      context.Context
	listener net.Listener
	once     sync.Once
	endpoint *url.URL
	err      error
	network  string
	address  string
	timeout  time.Duration

	metric          bool
	metricProcess   bool
	metricGo        bool
	metricSubSystem string

	profile bool
	tracing bool
	logging bool
}

func (s *Server) Server() *echo.Echo {
	return s.echo
}

func NewServer() *Server {
	srv := &Server{
		address: configs.Conf.Http,
		timeout: 1 * time.Second,
	}
	e := echo.New()
	//e.HideBanner = true
	//e.HidePort = true
	e.Use(middleware.Recover())
	srv.echo = e
	return srv
}

func (s *Server) Run() error {
	err := s.Server().Start(s.address)
	if err != nil {
		return err
	}
	return nil
}
