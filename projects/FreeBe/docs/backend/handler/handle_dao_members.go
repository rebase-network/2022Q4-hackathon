package handler

import (
	"errors"
	"fmt"
	"freebe/logger"
	"freebe/service"
	"time"
)

type HtDaoMembers struct {
	Id            int       `gorm:"column:id" json:"id" form:"id"`                                     //自增id
	UserId        uint32    `gorm:"column:user_id" json:"user_id" form:"user_id"`                      // 成员用户id
	Name          string    `gorm:"column:name" json:"name" form:"name" `                              // 成员用户名称
	HeadImage     string    `gorm:"column:head_image" json:"head_image" form:"head_image" `            // 用户头像
	RoleType      uint8     `gorm:"column:role_type" json:"role_type" form:"role_type"`                // 用户角色：1：创建者 2：管理员 3：成员 4：游客
	WalletAddress string    `gorm:"column:wallet_address" json:"wallet_address" form:"wallet_address"` // 钱包地址
	DaoId         int64     `gorm:"column:dao_id" json:"dao_id" form:"dao_id"`                         // daoId
	Valuation     int64     `gorm:"column:valuation" json:"valuation" form:"valuation"`                // dao内贡献估值
	CreateAt      int64     `gorm:"column:create_at" json:"create_at" form:"create_at"`                // 创建时间戳
	UpdateAt      int64     `gorm:"column:update_at" json:"update_at" form:"update_at"`                // 更新时间戳
	CreateAtText  time.Time `gorm:"column:create_at_text" json:"create_at_text" form:"create_at_text"` // 创建时间
	UpdateAtText  time.Time `gorm:"column:update_at_text" json:"update_at_text" form:"update_at_text"` // 更新时间
	Status        int       `gorm:"column:status" json:"status" form:"status"`                         // 状态：1：有效 2：删除
}

type HandleDaoMembersReq struct {
	WalletAddress string `json:"wallet_address" form:"wallet_address" validate:"required"` //创建者钱包地址
	DaoName       string `json:"dao_name" form:"dao_name" validate:"required"`             //dao名称
	DaoImage      string `json:"dao_image" form:"dao_image" validate:"required"`           //dao图片
	Mission       string `json:"mission" form:"mission" validate:"required"`               //dao mission
	ThemeColor    string `json:"theme_color" form:"theme_color"`                           //颜色值
	Action        string `json:"action" form:"action" validate:"required"`                 // add:添加 remove：删除
}

type DaoMemberBaseInfo struct {
	Id        uint32 `gorm:"column:id" json:"id" form:"id"`                          //自增id
	Name      string `gorm:"column:name" json:"name" form:"name" `                   // 用户名称
	HeadImage string `gorm:"column:head_image" json:"head_image" form:"head_image" ` // 用户头像
	RoleType  uint8  `gorm:"column:role_type" json:"role_type" form:"role_type"`     // 用户角色：1：创建者 2：管理员 3：成员 4：游客
	Valuation int64  `gorm:"column:valuation" json:"valuation" form:"valuation"`     // dao内贡献估值
}

type HandleCrDaoMembersResp struct {
	Status  int         `json:"status"`
	Message Message     `json:"message"`
	Data    interface{} `json:"data"`
}

//添加/删除dao成员
func (h *HttpHandler) DaoMembersAction(action int, userInfo []*HtUserBase, daoId int64, roleType uint8, memberCount int) error {
	var err error
	if len(userInfo) <= 0 {
		err = errors.New("user is empty")
		return err
	}
	ts := time.Now()
	if action == 1 {
		var member = &HtDaoMembers{
			DaoId:         daoId,
			UserId:        userInfo[0].Id,
			Name:          userInfo[0].Name,
			HeadImage:     userInfo[0].HeadImage,
			RoleType:      roleType,
			CreateAt:      ts.Unix(),
			UpdateAt:      ts.Unix(),
			CreateAtText:  ts,
			UpdateAtText:  ts,
			Status:        1,
			WalletAddress: userInfo[0].WalletAddress,
		}
		err = h.InsertMember(member)
		if err != nil {
			logger.Logger.Errorw("DaoMembersAction InsertMember failed", "wallet_address", member.WalletAddress, "err", err)
			return err
		}

		//总数加1
		updateFields := make(map[string]interface{})
		updateFields["updated_at"] = time.Now()
		updateFields["dao_name"] = memberCount + 1
		filter := fmt.Sprintf("id=%d", daoId)
		if err := service.UserDb.Table(service.DaoBase).Where(filter).Updates(updateFields).Error; err != nil {
			logger.Logger.Errorw("EditDao Updates DaoBase failed", "updateFields", updateFields, "err", err)
			return err
		}
	}
	return nil
}

//GetDaoMembers 查询dao的成员
func (h *HttpHandler) GetDaoMembers(daoId int64) ([]*HtDaoMembers, error) {
	var conds []*HtDaoMembers
	filter := fmt.Sprintf("dao_id=%d AND status=1", daoId)
	if err := service.UserDb.Table(service.DaoMember).Model(&HtDaoMembers{}).Where(filter).Find(&conds).Error; err != nil {
		logger.Logger.Errorw("GetDaoMembers  failed ", "err", err, "filter", filter)
		return nil, err
	}
	if len(conds) == 0 {
		logger.Logger.Errorw("GetDaoMembers  failed : conds is nil", "filter", filter)
		return nil, nil
	}
	return conds, nil
}

func (h *HttpHandler) InsertMember(userInfo *HtDaoMembers) error {
	if err := service.UserDb.Table(service.DaoMember).Model(userInfo).Create(userInfo).Error; err != nil {
		logger.Logger.Errorw("InsertMember Create DaoMember failed", "wallet_address", userInfo.WalletAddress, "err", err)
		return err
	}
	return nil
}
