package service

import (
	"freebe/configs"
	"freebe/logger"
	"github.com/go-sql-driver/mysql"
	gormmysql "gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

var (
	UserDb *gorm.DB
)

//表名
const (
	UserBase          string = "user_base"
	DaoBase           string = "dao_base"
	DaoMember         string = "dao_member"
	DaoTask           string = "dao_task"
	TaskOperateRecord string = "task_operate_record"
)

func InitDB() {
	//option := options.Client()
	//
	//option.ApplyURI(configs.Conf.Mongo.URI)
	//mongoClient, err := mongo.Connect(context.Background(), option)
	//if err != nil {
	//	logger.Logger.Fatalw("mongo connect failed", "err", err, "db config", configs.Conf.Mongo)
	//}
	//if err := mongoClient.Ping(context.Background(), readpref.Primary()); err != nil {
	//	logger.Logger.Fatalw("mongo ping failed", "err", err, "db config", configs.Conf.Mongo)
	//}
	//Mongo = mongoClient.Database(configs.Conf.Mongo.DB)
	var err error
	UserDb, err = InitGormV2(configs.Conf.Mysql)
	if err != nil {
		logger.Logger.Fatalw("userDb connect failed", "err", err)
	}
	logger.Logger.Infow("InitDB Mysql success", "UserDb", UserDb)

}

// InitGormV2 open gorm v2 DB conn
// it is safe to use `nil` for gormLogger param, in this case,
// gorm v2 will use default gormlogger.Default impl
// nolint: gocritic
func InitGormV2(cfg configs.MysqlConfig) (*gorm.DB, error) {
	opt, err := mysql.ParseDSN(cfg.Dsn)
	if err != nil {
		return nil, err
	}

	if !opt.ParseTime {
		logger.Logger.Warn("InitGormV2: parseTime is disabled")
	}

	if opt.Loc.String() != "UTC" {
		logger.Logger.Infow("using non UTC timezone for parseTime", "timezone_used", opt.Loc.String())
	} else {
		logger.Logger.Infow("using UTC timezone for parseTime")
	}

	// if opt.Collation == "" {
	// 	opt.Collation = "utf8mb4"
	// }
	// dsn := opt.FormatDSN()

	db, err := gorm.Open(gormmysql.Open(cfg.Dsn), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
	})
	if err != nil {
		return nil, err
	}

	// otelConfig conn pool https://gorm.io/docs/connecting_to_the_database.html#Connection-Pool
	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}

	// SetMaxIdleConns sets the maximum number of connections in the idle connection pool.
	if cfg.MaxIdleCount > 0 {
		sqlDB.SetMaxIdleConns(cfg.MaxIdleCount)
	}

	// SetMaxOpenConns sets the maximum number of open connections to the database.
	if cfg.MaxOpenCount > 0 {
		sqlDB.SetMaxOpenConns(cfg.MaxOpenCount)
	}

	return db, nil
}
