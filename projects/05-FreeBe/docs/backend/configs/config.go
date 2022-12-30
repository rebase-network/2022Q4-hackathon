package configs

import (
	"fmt"
	"freebe/logger"
	"github.com/spf13/viper"
)

var Conf *Config

type Config struct {
	Http  string      `json:"http" yaml:"http" toml:"http"`
	Mysql MysqlConfig `json:"mysql" yaml:"mysql" toml:"mysql"`
	//Redis RedisConfig `json:"redis" yaml:"redis" toml:"redis"`
	Mongo MongoConfig `json:"mongo" yaml:"mongo" toml:"mongo"`
}

type MysqlConfig struct {
	Dsn          string `toml:"dsn" yaml:"dsn" json:"dsn" validate:"required"` // data source name
	MaxOpenCount int    `toml:"max_open_count" json:"max_open_count" validate:"required" yaml:"max_open_count"`
	MaxIdleCount int    `toml:"max_idle_count" json:"max_idle_count" validate:"required" yaml:"max_idle_count"`
	Tracing      bool   `toml:"tracing" json:"tracing" yaml:"tracing"`
}

type RedisConfig struct {
	Addr     string `json:"addr" yaml:"addr" toml:"addr"`
	PoolSize int    `toml:"pool_size" json:"pool_size"`
	Passwd   string `json:"passwd" yaml:"passwd" toml:"passwd"`
}

type MongoConfig struct {
	DB string `toml:"db" json:"db" yaml:"db" validate:"required"`
	// URI https://www.mongodb.com/docs/manual/reference/connection-string/
	URI     string `toml:"uri" yaml:"uri" json:"uri" validate:"required"`
	Tracing bool   `toml:"tracing" json:"tracing" long:"tracing" yaml:"tracing" description:"enable tracing middleware"`
}

func InitConfig(configName string, path string) {
	viper.SetConfigName(configName)
	viper.SetConfigType("toml")
	viper.AddConfigPath(path)
	err := viper.ReadInConfig()
	if err != nil {
		return
	}
	viper.Unmarshal(&Conf)
	fmt.Println(Conf)
	logger.Logger.Infow("InitConfig success", "Conf", Conf)
}
