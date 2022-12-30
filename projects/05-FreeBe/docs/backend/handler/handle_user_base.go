package handler

import (
	"freebe/logger"
	"freebe/service"
	"time"
)

type HtUserBase struct {
	Id            uint32    `gorm:"column:id" json:"id" form:"id"`                                        //自增id
	Name          string    `gorm:"column:name" json:"name" form:"name" `                                 // 用户名称
	HeadImage     string    `gorm:"column:head_image" json:"head_image" form:"head_image" `               // 用户头像
	RoleType      uint8     `gorm:"column:role_type" json:"role_type" form:"role_type"`                   // 用户角色：1：创建者 2：管理员 3：成员 4：游客
	WalletType    uint32    `gorm:"column:wallet_type" json:"wallet_type" form:"wallet_type"`             // 钱包类型 1: netmask
	WalletAddress string    `gorm:"column:wallet_address" json:"wallet_address" form:"wallet_address"`    // 钱包地址
	CreateAt      int64     `gorm:"column:create_at" json:"create_at" form:"create_at"`                   // 创建时间戳
	UpdateAt      int64     `gorm:"column:update_at" json:"update_at" form:"update_at"`                   // 更新时间戳
	CreateAtText  time.Time `gorm:"column:create_at_text" json:"create_at_text" form:"create_at_text"`    // 创建时间
	UpdateAtText  time.Time `gorm:"column:update_at_text" json:"update_at_text" form:"update_at_text"`    // 更新时间
	LastLoginTime time.Time `gorm:"column:last_login_time" json:"last_login_time" form:"last_login_time"` // 上次登录时间
	Status        int       `gorm:"column:status" json:"status" form:"status"`                            // 状态：1：有效 2：删除
}

type UserBaseInfo struct {
	Id            uint32 `gorm:"column:id" json:"id" form:"id"`                                     //自增id
	WalletAddress string `gorm:"column:wallet_address" json:"wallet_address" form:"wallet_address"` // 钱包地址
	Name          string `gorm:"column:name" json:"name" form:"name" `                              // 用户名称
	HeadImage     string `gorm:"column:head_image" json:"head_image" form:"head_image" `            // 用户头像
}

func (h *HttpHandler) GetUserInfo(filter string) []*HtUserBase {
	var conds []*HtUserBase
	logger.Logger.Debugw("GetUserInfo  ", "filter", filter)
	if err := service.UserDb.Table(service.UserBase).Model(&HtUserBase{}).Where(filter).Find(&conds).Error; err != nil {
		logger.Logger.Errorw("GetUserInfo  failed ", "err", err, "filter", filter)
		return nil
	}
	if len(conds) == 0 {
		logger.Logger.Errorw("GetUserInfo  failed : conds is nil", "filter", filter)
		return nil
	}
	return conds
}
