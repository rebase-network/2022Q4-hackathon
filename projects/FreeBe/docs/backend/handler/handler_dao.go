package handler

import (
	"fmt"
	"freebe/logger"
	"freebe/service"
	"github.com/labstack/echo"
	"net/http"
	"strconv"
	"strings"
	"time"
)

const TotalValuation = 20000000

type HtDaoBase struct {
	Id             int64     `gorm:"column:id" json:"id" form:"id"`                                        //自增id
	UserId         uint32    `gorm:"column:user_id" json:"user_id" form:"user_id"`                         // 创建者id
	DaoName        string    `gorm:"column:dao_name" json:"dao_name" form:"dao_name" `                     // dao名称
	DaoImage       string    `gorm:"column:dao_image" json:"dao_image" form:"dao_image" `                  // dao图片logo
	Mission        string    `gorm:"column:mission" json:"mission" form:"mission"`                         // dao使命
	CreatorWallet  string    `gorm:"column:creator_wallet" json:"creator_wallet" form:"creator_wallet"`    // 创建者钱包地址
	TotalValuation int64     `gorm:"column:total_valuation" json:"total_valuation" form:"total_valuation"` // 估值
	MemberCount    int       `gorm:"column:member_count" json:"member_count" form:"member_count"`          // 成员数量
	CreateAt       int64     `gorm:"column:create_at" json:"create_at" form:"create_at"`                   // 创建时间戳
	UpdateAt       int64     `gorm:"column:update_at" json:"update_at" form:"update_at"`                   // 更新时间戳
	CreateAtText   time.Time `gorm:"column:create_at_text" json:"create_at_text" form:"create_at_text"`    // 创建时间
	UpdateAtText   time.Time `gorm:"column:update_at_text" json:"update_at_text" form:"update_at_text"`    // 更新时间
	ThemeColor     string    `gorm:"column:theme_color" json:"theme_color" form:"theme_color"`             // 主题颜色值
	Status         int       `gorm:"column:status" json:"status" form:"status"`                            // 状态：1：有效 2：删除
}

type DaoBaseInfo struct {
	WalletAddress  string              `json:"wallet_address" form:"wallet_address" validate:"required"`             // 创建者钱包地址
	DaoName        string              `json:"dao_name" form:"dao_name" validate:"required"`                         // dao名称
	DaoImage       string              `json:"dao_image" form:"dao_image" validate:"required"`                       // dao图片
	Mission        string              `json:"mission" form:"mission" validate:"required"`                           // dao mission
	ThemeColor     string              `json:"theme_color" form:"theme_color"`                                       // 颜色值
	TotalValuation int64               `gorm:"column:total_valuation" json:"total_valuation" form:"total_valuation"` // dao总估值
	Member         []DaoMemberBaseInfo `gorm:"column:member" json:"member,omitempty" form:"member"`                  // dao成员信息
	MemberCount    int                 `gorm:"column:member_count" json:"member_count" form:"member_count"`          // dao成员数量
	DaoId          int64               `json:"dao_id" form:"dao_id" validate:"required"`                             // daoId
}

type HandleCreateDaoReq struct {
	WalletAddress string `json:"wallet_address" form:"wallet_address" validate:"required"` //创建者钱包地址
	DaoName       string `json:"dao_name" form:"dao_name" validate:"required"`             //dao名称
	DaoImage      string `json:"dao_image" form:"dao_image" validate:"required"`           //dao图片
	Mission       string `json:"mission" form:"mission" validate:"required"`               //dao mission
	ThemeColor    string `json:"theme_color" form:"theme_color" validate:"required"`       //颜色值
	Action        string `json:"action" form:"action" validate:"required"`                 // create:创建 edit:修改
}

type HandleCreateDaoResp struct {
	Status  int          `json:"status"`
	Message Message      `json:"message"`
	Data    *DaoBaseInfo `json:"data"`
}

type HandleEditDaoReq struct {
	WalletAddress string `json:"wallet_address" form:"wallet_address" validate:"required"` //创建者钱包地址
	DaoName       string `json:"dao_name" form:"dao_name"`                                 //dao名称
	DaoImage      string `json:"dao_image" form:"dao_image"`                               //dao图片
	Mission       string `json:"mission" form:"mission"`                                   //dao mission
	ThemeColor    string `json:"theme_color" form:"theme_color"`                           //颜色值
	DaoId         int    `json:"dao_id" form:"dao_id" validate:"required"`                 //daoId
	Action        string `json:"action" form:"action" validate:"required"`                 // create:创建 edit:修改
}

type HandleEditDaoResp struct {
	Status  int         `json:"status"`
	Message Message     `json:"message"`
	Data    interface{} `json:"data"`
}

type HandleDaoInfoReq struct {
	WalletAddress string `json:"wallet_address" query:"wallet_address" validate:"required"` //用户钱包地址
	DaoId         int    `json:"dao_id" query:"dao_id" validate:"required"`                 //daoId
	Action        int    `json:"action" query:"action" validate:"required"`                 // 1:获取详情
}

type HandleDaoInfoResp struct {
	Status  int          `json:"status"`
	Message Message      `json:"message"`
	Data    *DaoBaseInfo `json:"data"`
}

type HandleDaoListReq struct {
	WalletAddress string `json:"wallet_address" query:"wallet_address" validate:"required"` //用户钱包地址
	Start         int    `json:"start" query:"start"`                                       // 上一页的最后一个id，第一页填写0
	Action        int    `json:"action" query:"action" validate:"required"`                 // 1:获取列表
}

type HandleDaoListResp struct {
	Status  int           `json:"status"`
	Message Message       `json:"message"`
	Data    []DaoBaseInfo `json:"data"`
}

// @Summary 用户dao创建
// @version 1.0
// @Accept application/json
// @Description 返回数据 status 0=成功,其他均为失败，msg 为具体错误码(字符串) 具体错误码对应关系看wiki
// @Param HandleCreateDaoReq body HandleCreateDaoReq true "请求数据"
// @Success 0 object HandleCreateDaoResp 成功后返回值
// @Router /free_be/dao/create [post]
func (h *HttpHandler) HandleCreateDao(ctx echo.Context) error {
	req := &HandleCreateDaoReq{}
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, HandleCreateDaoResp{1, ErrParam, nil})
	}
	if err := ctx.Validate(req); err != nil {
		logger.Logger.Errorf("HandleCreateDao Validate failed req=%v err=%v", req, err)
		return ctx.JSON(200, HandleUserLoginResp{1, ErrParam, nil})
	}
	res := h.CreateDao(req.WalletAddress, req.DaoName, req.DaoImage, req.Mission, req.ThemeColor)
	if res.Status != 0 {
		logger.Logger.Errorw("HandleCreateDao CreateDao failed", "res", res)
	}

	return ctx.JSON(http.StatusOK, res)
}

func (h *HttpHandler) CreateDao(walletAddress, daoName, daoImage, mission, themeColor string) HandleCreateDaoResp {
	filter := fmt.Sprintf("wallet_address=%s", walletAddress)
	userInfo := h.GetUserInfo(filter)
	if len(userInfo) <= 0 {
		return HandleCreateDaoResp{1, EmptyUser, nil}
	}
	ts := time.Now()
	daoInfo := &HtDaoBase{
		DaoImage:       daoImage,
		DaoName:        daoName,
		CreateAt:       ts.Unix(),
		UpdateAt:       ts.Unix(),
		CreateAtText:   ts,
		UpdateAtText:   ts,
		Status:         1,
		Mission:        mission,
		ThemeColor:     themeColor,
		CreatorWallet:  walletAddress,
		TotalValuation: TotalValuation,
	}
	if err := service.UserDb.Table(service.DaoBase).Model(daoInfo).Create(daoInfo).Error; err != nil {
		logger.Logger.Errorw("CreateDao Create daoInfo failed", "uid", daoInfo.UserId, "err", err)
		return HandleCreateDaoResp{1, ErrInternal, nil}
	}

	var daoBaseInfo = &DaoBaseInfo{
		WalletAddress:  walletAddress,
		DaoName:        daoName,
		DaoImage:       daoImage,
		TotalValuation: TotalValuation,
		ThemeColor:     themeColor,
		Mission:        mission,
		MemberCount:    1,
	}

	filter = fmt.Sprintf("creator_wallet=%s AND create_at=%d", walletAddress, ts.Unix())
	newDao := h.GetDaoInfo(filter)
	if len(newDao) > 0 {
		filter = fmt.Sprintf("id=%d", newDao[0].Id)
		err := h.DaoMembersAction(1, userInfo, newDao[0].Id, 1, newDao[0].MemberCount)
		if err != nil {
			logger.Logger.Errorw("CreateDao DaoMembersAction ", "walletAddress", walletAddress, "daoId", newDao[0].Id)
		}
		daoBaseInfo.DaoId = newDao[0].Id
	}

	return HandleCreateDaoResp{0, SucessMsg, daoBaseInfo}
}

// @Summary dao信息修改
// @version 1.0
// @Accept application/json
// @Description 返回数据 status 0=成功,其他均为失败，msg 为具体错误码(字符串) 具体错误码对应关系看wiki
// @Param HandleEditDaoReq body HandleEditDaoReq true "请求数据"
// @Success 0 object HandleEditDaoResp 成功后返回值
// @Router /free_be/dao/edit [post]
func (h *HttpHandler) HandleEditDao(ctx echo.Context) error {
	req := &HandleEditDaoReq{}
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, HandleEditDaoResp{1, ErrParam, nil})
	}
	if err := ctx.Validate(req); err != nil {
		logger.Logger.Errorf("HandleEditDao Validate failed req=%v err=%v", req, err)
		return ctx.JSON(200, HandleUserLoginResp{1, ErrParam, nil})
	}
	res := h.EditDao(req.WalletAddress, req.DaoName, req.DaoImage, req.Mission, req.ThemeColor, req.Action, req.DaoId)
	if res.Status != 0 {
		logger.Logger.Errorw("HandleEditDao EditDao failed", "res", res)
	}

	return ctx.JSON(http.StatusOK, res)
}

func (h *HttpHandler) EditDao(walletAddress, daoName, daoImage, mission, themeColor, action string, daoId int) HandleEditDaoResp {
	filter := fmt.Sprintf("id=%d", daoId)
	daoInfo := h.GetDaoInfo(filter)
	if len(daoInfo) <= 0 {
		return HandleEditDaoResp{1, EmptyUser, nil}
	}
	if walletAddress != daoInfo[0].CreatorWallet {
		return HandleEditDaoResp{1, ErrNoPermission, nil}
	}
	updateFields := make(map[string]interface{})
	if action == "edit" {
		updateFields["creator_wallet"] = walletAddress
		updateFields["dao_image"] = daoImage
		updateFields["dao_name"] = daoName
		updateFields["mission"] = mission
		updateFields["theme_color"] = themeColor
		updateFields["updated_at"] = time.Now()
	}
	if err := service.UserDb.Table(service.DaoBase).Where(filter).Updates(updateFields).Error; err != nil {
		logger.Logger.Errorw("EditDao Updates DaoBase failed", "uid", daoInfo[0].CreatorWallet, "err", err)
		return HandleEditDaoResp{1, ErrInternal, nil}
	}

	return HandleEditDaoResp{0, SucessMsg, nil}
}

// @Summary 查询dao详情接口
// @version 1.0
// @Accept application/json
// @Description 返回数据 status 0=成功,其他均为失败，msg 为具体错误码(字符串) 具体错误码对应关系看wiki
// @Param HandleDaoInfoReq query HandleDaoInfoReq true "请求数据"
// @Success 0 object HandleDaoInfoResp 成功后返回值
// @Router /free_be/dao/info [GET]
func (h *HttpHandler) HandleGetDaoInfo(ctx echo.Context) error {
	req := &HandleDaoInfoReq{}
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, HandleDaoInfoResp{1, ErrParam, nil})
	}
	if err := ctx.Validate(req); err != nil {
		logger.Logger.Errorf("HandleGetDaoInfo Validate failed req=%v err=%v", req, err)
		return ctx.JSON(200, HandleDaoInfoResp{1, ErrParam, nil})
	}
	res := h.GetDao(req.WalletAddress, req.Action, req.DaoId)
	if res.Status != 0 {
		logger.Logger.Errorw("HandleGetDaoInfo GetDao failed", "res", res)
	}

	return ctx.JSON(http.StatusOK, res)
}

func (h *HttpHandler) GetDao(walletAddress string, action int, daoId int) HandleDaoInfoResp {
	filter := fmt.Sprintf("id=%d", daoId)
	daoInfo := h.GetDaoInfo(filter)
	if len(daoInfo) <= 0 {
		return HandleDaoInfoResp{1, EmptyUser, nil}
	}
	var daoBase = &DaoBaseInfo{
		WalletAddress:  daoInfo[0].CreatorWallet,
		DaoName:        daoInfo[0].DaoName,
		ThemeColor:     daoInfo[0].ThemeColor,
		DaoImage:       daoInfo[0].DaoImage,
		TotalValuation: TotalValuation,
		Mission:        daoInfo[0].Mission,
		DaoId:          daoInfo[0].Id,
	}
	daoMembers, _ := h.GetDaoMembers(daoInfo[0].Id)
	if len(daoMembers) > 0 {
		for _, v := range daoMembers {
			var tmp DaoMemberBaseInfo
			tmp.RoleType = v.RoleType
			tmp.Valuation = v.Valuation
			tmp.Id = v.UserId
			tmp.Name = v.Name
			tmp.HeadImage = v.HeadImage
			daoBase.Member = append(daoBase.Member, tmp)
		}
	}
	daoBase.MemberCount = len(daoBase.Member)
	return HandleDaoInfoResp{0, SucessMsg, daoBase}
}

func (h *HttpHandler) GetDaoInfo(filter string) []*HtDaoBase {
	var conds []*HtDaoBase
	logger.Logger.Debugw("GetDaoInfo  ", "filter", filter)
	if err := service.UserDb.Table(service.DaoBase).Model(&HtDaoBase{}).Where(filter).Find(&conds).Error; err != nil {
		logger.Logger.Errorw("GetDaoInfo  failed ", "err", err, "filter", filter)
		return nil
	}
	if len(conds) == 0 {
		logger.Logger.Errorw("GetDaoInfo  failed : conds is nil", "filter", filter)
		return nil
	}
	return conds
}

// @Summary 查询dao列表接口
// @version 1.0
// @Accept application/json
// @Description 返回数据 status 0=成功,其他均为失败，msg 为具体错误码(字符串) 具体错误码对应关系看wiki
// @Param HandleDaoListReq query HandleDaoListReq true "请求数据"
// @Success 0 object HandleDaoListResp 成功后返回值
// @Router /free_be/dao/list [GET]
func (h *HttpHandler) HandleGetDaoList(ctx echo.Context) error {
	req := &HandleDaoListReq{}
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, HandleDaoListResp{1, ErrParam, nil})
	}
	if err := ctx.Validate(req); err != nil {
		logger.Logger.Errorf("HandleGetDaoInfo Validate failed req=%v err=%v", req, err)
		return ctx.JSON(200, HandleDaoListResp{1, ErrParam, nil})
	}
	res := h.GetDaoList(req.WalletAddress, req.Start)
	if res.Status != 0 {
		logger.Logger.Errorw("HandleGetDaoList GetDao failed", "res", res)
	}
	return ctx.JSON(http.StatusOK, res)
}

type DaoMemberCount struct {
	DaoId int64 `json:"dao_id"`
	Count int   `json:"count"`
}

func (h *HttpHandler) GetDaoList(walletAddress string, start int) HandleDaoListResp {
	var daoList []DaoBaseInfo
	filter := fmt.Sprintf("status=1 AND id>=%d", start)
	var conds []*HtDaoBase
	logger.Logger.Debugw("GetDaoList   ", "filter", filter, "walletAddress", walletAddress)
	if err := service.UserDb.Table(service.DaoBase).Model(&HtDaoBase{}).Where(filter).Find(&conds).Limit(20).Error; err != nil {
		logger.Logger.Errorw("GetDaoList  DaoBase  failed ", "err", err, "filter", filter)
	}
	if len(conds) == 0 {
		logger.Logger.Errorw("GetDaoInfo  failed : conds is nil", "filter", filter)
		return HandleDaoListResp{0, SucessMsg, nil}
	}

	var daoIdMap = make(map[int64]int)
	var daoIds []int64
	for _, v := range conds {
		daoIds = append(daoIds, v.Id)
	}
	if len(daoIds) == 1 {
		filter = fmt.Sprintf("dao_id =%d", daoIds[0])
	} else if len(daoIds) > 1 {
		var tmp []string
		for _, v := range daoIds {
			tmp = append(tmp, strconv.Itoa(int(v)))
		}
		str := strings.Join(tmp, ",")
		filter = fmt.Sprintf("dao_id IN (%s)", str)
	}

	daoMember := make([]DaoMemberCount, 0)
	res := service.UserDb.Table(service.DaoMember).Select("dao_id,count(*) as count").Group("dao_id").Scan(&daoMember)
	if res.Error != nil {
		logger.Logger.Errorw("GetDaoList DaoMember scan failed", "err", res.Error)
	}
	for _, v := range daoMember {
		daoIdMap[v.DaoId] = v.Count
	}

	for _, v := range conds {
		var tmp DaoBaseInfo
		tmp.DaoId = v.Id
		tmp.WalletAddress = v.CreatorWallet
		tmp.DaoImage = v.DaoImage
		tmp.DaoName = v.DaoName
		tmp.ThemeColor = v.ThemeColor
		tmp.Mission = v.Mission
		tmp.TotalValuation = v.TotalValuation
		if value, ok := daoIdMap[v.Id]; ok {
			tmp.MemberCount = value
		} else {
			tmp.MemberCount = 1
		}
		daoList = append(daoList, tmp)
	}

	return HandleDaoListResp{0, SucessMsg, daoList}
}
