package handler

import (
	"errors"
	"fmt"
	"freebe/logger"
	"freebe/service"
	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo"
	"net/http"
	"time"
)

type HandleUserLoginReq struct {
	WalletType    uint32 `json:"wallet_type" form:"wallet_type" validate:"required"`       //1:以太坊钱包
	WalletAddress string `json:"wallet_address" form:"wallet_address" validate:"required"` //钱包地址
	Name          string `json:"name" form:"name" validate:"required"`                     //昵称
	HeadImage     string `json:"head_image" form:"head_image" validate:"required"`         //头像hash
}

type HandleUserLoginResp struct {
	Status  int         `json:"status"`
	Message Message     `json:"message"`
	Data    interface{} `json:"data"`
}

type UserLoginInfo struct {
	Id            int       `gorm:"column:id" json:"id" form:"id"`                                        //自增id
	UserId        uint32    `gorm:"column:user_id" json:"user_id" form:"user_id"`                         // 用户id
	Name          string    `gorm:"column:name" json:"name" form:"name" `                                 // 用户名称
	HeadImage     string    `gorm:"column:head_image" json:"head_image" form:"head_image" `               // 用户头像
	RoleType      uint8     `gorm:"column:role_type" json:"role_type" form:"role_type"`                   // 用户角色：1：创建者 2：管理员 3：成员 4：游客
	WalletType    uint32    `gorm:"column:wallet_type" json:"wallet_type" form:"wallet_type"`             // 钱包类型 1: netmask
	WalletAddress string    `gorm:"column:wallet_address" json:"wallet_address" form:"wallet_address"`    // 钱包地址
	LastLoginTime time.Time `gorm:"column:last_login_time" json:"last_login_time" form:"last_login_time"` // 上次登录时间
	Status        int       `gorm:"column:status" json:"status" form:"status"`                            // 状态：1：有效 2：删除
}

type HtVoiceTaskConfig struct {
	UserId    string `gorm:"column:user_id" json:"user_id" form:"user_id"`           // 用户id
	Name      string `gorm:"column:name" json:"name" form:"name" `                   // json 名称多语言
	HeadImage string `gorm:"column:head_image" json:"head_image" form:"head_image" ` // json 副标题名称多语言
	RoleType  string `gorm:"column:role_type" json:"role_type" form:"role_type"`     // 完成eg:时间是分钟 , 币是数量
	Status    uint8  `gorm:"column:status" json:"status" form:"status"`              // 上下状态 1上架 2下架
}

func GetUid(c echo.Context) (uint32, error) {
	user, ok := c.Get("user").(*jwt.Token)
	if !ok {
		return 0, errors.New("invalid token decode uid failed")
	}

	claims, ok := user.Claims.(jwt.MapClaims)
	if !ok {
		return 0, errors.New("invalid token decode uid failed")
	}

	uid, ok := claims["uid"].(float64)
	if !ok {
		return 0, errors.New("invalid token decode uid failed")
	}

	return uint32(uid), nil
}

// @Summary 用户登录
// @version 1.0
// @Accept application/json
// @Description 返回数据 status 0=成功,其他均为失败，msg 为具体错误码(字符串) 具体错误码对应关系看wiki
// @Param HandleUserLoginReq body HandleUserLoginReq true "请求数据"
// @Success 0 object HandleUserLoginResp 成功后返回值
// @Router /free_be/user/login [post]
func (h *HttpHandler) HandleUserLogin(ctx echo.Context) error {
	req := &HandleUserLoginReq{}
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, HandleUserLoginResp{1, ErrParam, nil})
	}
	if err := ctx.Validate(req); err != nil {
		logger.Logger.Errorf("HandleUserLogin Validate failed req=%v err=%v", req, err)
		return ctx.JSON(200, HandleUserLoginResp{1, ErrParam, nil})
	}
	res := h.UserLoginIn(req.WalletAddress, req.WalletType, req.Name, req.HeadImage)
	if res.Status != 0 {
		logger.Logger.Errorw("HandleUserLogin UserLoginIn failed", "res", res)
	}

	return ctx.JSON(http.StatusOK, res)
}

func (h *HttpHandler) UserLoginIn(walletAddress string, walletType uint32, name string, headImage string) HandleUserLoginResp {
	if len(walletAddress) == 0 || walletType == 0 {
		logger.Logger.Errorw("UserLoginIn ErrParam", "walletAddress", walletAddress, "walletType", walletType)
		return HandleUserLoginResp{1, ErrParam, nil}
	}
	var conds []*HtUserBase
	filter := fmt.Sprintf("wallet_address=%s AND status=1 ", walletAddress)
	if err := service.UserDb.Table(service.UserBase).Model(&HtUserBase{}).Where(filter).Find(&conds).Error; err != nil {
		logger.Logger.Errorw("UserLoginIn  getUserBase failed ", "err", err, "filter", filter)
		return HandleUserLoginResp{1, ErrInternal, nil}
	}

	userSettingFields := make(map[string]interface{})
	if len(conds) > 0 {
		userSettingFields["update_at"] = time.Now().Unix()
		userSettingFields["update_at_text"] = time.Now()
		userSettingFields["last_login_time"] = time.Now()
		if err := service.UserDb.Table(service.UserBase).Where("wallet_address=?", walletAddress).Updates(userSettingFields).Error; err != nil {
			logger.Logger.Errorw("UserLoginIn Update UserBase failed", "userSettingFields", userSettingFields, "err", err, "walletAddress", walletAddress)
		}
	} else {
		userInfo := &HtUserBase{
			WalletType:    walletType,
			WalletAddress: walletAddress,
			CreateAt:      time.Now().Unix(),
			UpdateAt:      time.Now().Unix(),
			CreateAtText:  time.Now(),
			UpdateAtText:  time.Now(),
			Status:        1,
			RoleType:      4,
			LastLoginTime: time.Now(),
			Name:          name,
			HeadImage:     headImage,
		}
		err := h.InsertUser(userInfo)
		if err != nil {
			logger.Logger.Errorw("UserLogin InsertUser UserBase failed", "userInfo", userInfo, "err", err)
		}
	}

	return HandleUserLoginResp{0, SucessMsg, nil}
}

func (h *HttpHandler) InsertUser(userInfo *HtUserBase) error {
	if err := service.UserDb.Table(service.UserBase).Model(userInfo).Create(userInfo).Error; err != nil {
		logger.Logger.Errorw("UserLogin InsertUser UserBase failed", "wallet_address", userInfo.WalletAddress, "err", err)
		return err
	}
	return nil
}
