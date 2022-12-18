package handler

import (
	"fmt"
	"freebe/logger"
	"freebe/service"
	"github.com/labstack/echo"
	"net/http"
	"sort"
	"strings"
	"time"
)

type TaskOperation string
type TaskStatus int

const (
	Create  TaskOperation = "Create"  // 创建
	Cancel  TaskOperation = "Cancel"  // 取消
	Claim   TaskOperation = "Claim"   // 认领
	Assign  TaskOperation = "Assign"  // 分配
	Submit  TaskOperation = "Submit"  // 提交结果
	Confirm TaskOperation = "Confirm" // 确认完成

	Canceled      TaskStatus = 0 //取消
	ToBeClaimed   TaskStatus = 1 //待领取
	Progressing   TaskStatus = 2 //进行中
	ToBeConfirmed TaskStatus = 3 //已提交结果待确认
	Done          TaskStatus = 4 //完成
)

type HtTaskRecord struct {
	Id            int64     `gorm:"column:id" json:"id" form:"id"`                                      //自增id
	OperationType int       `gorm:"column:operation_type" json:"operation_type" form:"operation_type"`  // 操作类型 1：创建 2：认领 3：分配 4：提交结果 5：确认完成 6:取消任务
	OperationName string    `gorm:"column:operation_name" json:"operation_name" form:"operation_name" ` // 操作类型名称
	DaoId         int       `gorm:"column:dao_id" json:"dao_id" form:"dao_id" `                         // dao id
	TaskId        int       `gorm:"column:task_id" json:"task_id" form:"task_id"`                       // 任务id
	Operator      string    `gorm:"column:operator" json:"operator" form:"operator"`                    // 操作人钱包地址
	OperatedUser  string    `gorm:"column:operated_user" json:"operated_user" form:"operated_user"`     // 被操作人钱包地址，仅有分配操作时有
	OperateAt     time.Time `gorm:"column:operate_at" json:"operate_at" form:"operate_at"`              // 操作时间
	SubmitResult  string    `gorm:"column:submit_result" json:"submit_result" form:"submit_result"`     // 提交结果hash地址
	CreateAt      time.Time `gorm:"column:create_at" json:"create_at" form:"create_at"`                 // 创建时间
}

type HtDaoTask struct {
	Id         int64     `gorm:"column:id" json:"id" form:"id"`                            //自增id
	Objective  string    `gorm:"column:objective" json:"objective" form:"objective"`       // 目标
	TaskName   string    `gorm:"column:task_name" json:"task_name" form:"task_name" `      // 任务名称
	DaoId      int       `gorm:"column:dao_id" json:"dao_id" form:"dao_id" `               // dao id
	KeyResult  string    `gorm:"column:key_result" json:"key_result" form:"key_result"`    // 关键结果
	Reward     int       `gorm:"column:reward" json:"reward" form:"reward"`                // 奖励
	Deadline   time.Time `gorm:"column:deadline" json:"deadline" form:"deadline"`          // 截至时间
	CreateBy   string    `gorm:"column:create_by" json:"create_by" form:"create_by"`       // 创建者钱包地址
	ClaimBy    string    `gorm:"column:claim_by" json:"claim_by" form:"claim_by"`          // 认领者钱包地址
	ConfirmBy  string    `gorm:"column:confirm_by" json:"confirm_by" form:"confirm_by"`    // 确认人钱包地址
	CreateAt   time.Time `gorm:"column:create_at" json:"create_at" form:"create_at"`       // 创建时间
	CreateUnix int       `gorm:"column:create_unix" json:"create_unix" form:"create_unix"` // 创建时间戳
	UpdateAt   time.Time `gorm:"column:update_at" json:"update_at" form:"update_at"`       // 更新时间
	Status     int       `gorm:"column:status" json:"status" form:"status"`                // 状态 0:被取消 1: 已创建待claim 2：进行中（已被领取）3：已提交结果 4：已确认完成
}

type TaskBaseInfo struct {
	Id            int64            `gorm:"column:id" json:"id" form:"id"`                                               //自增id
	Objective     string           `gorm:"column:objective" json:"objective" form:"objective"`                          // 目标
	TaskName      string           `gorm:"column:dao_name" json:"task_name" form:"dao_name" `                           // 任务名称
	DaoId         int              `gorm:"column:dao_id" json:"dao_id" form:"dao_id" `                                  // dao id
	KeyResult     string           `gorm:"column:key_result" json:"key_result" form:"key_result"`                       // 关键结果
	Reward        int              `gorm:"column:reward" json:"reward" form:"reward"`                                   // 奖励
	Deadline      time.Time        `gorm:"column:deadline" json:"deadline" form:"deadline"`                             // 截至时间
	CreatorInfo   *UserBaseInfo    `gorm:"column:creator_info" json:"creator_info,omitempty" form:"creator_info"`       // 创建人信息
	OperateRecord []TaskRecordBase `gorm:"column:operate_record" json:"operate_record,omitempty" form:"operate_record"` // 任务操作记录
	Status        int              `gorm:"column:status" json:"status" form:"status"`                                   // 状态 0:被取消 1: 已创建待claim 2：进行中（已被领取）3：已提交结果 4：已确认完成
}

type TaskListInfo struct {
	Id          int64         `gorm:"column:id" json:"id" form:"id"`                                         //自增id
	TaskName    string        `gorm:"column:dao_name" json:"task_name" form:"dao_name" `                     // 任务名称
	DaoId       int           `gorm:"column:dao_id" json:"dao_id" form:"dao_id" `                            // dao id
	Reward      int           `gorm:"column:reward" json:"reward" form:"reward"`                             // 奖励
	Deadline    time.Time     `gorm:"column:deadline" json:"deadline" form:"deadline"`                       // 截至时间
	CreatorInfo *UserBaseInfo `gorm:"column:creator_info" json:"creator_info,omitempty" form:"creator_info"` // 创建人信息
	Status      int           `gorm:"column:status" json:"status" form:"status"`                             // 状态 0:被取消 1: 已创建待claim 2：进行中（已被领取）3：已提交结果 4：已确认完成
}

type TaskRecordBase struct {
	Id               int64         `gorm:"column:id" json:"id" form:"id"`                                     //自增id
	OperationType    int           `gorm:"column:operation_type" json:"operation_type" form:"operation_type"` // 操作类型 1：创建(create) 2：认领(claim) 3：分配（assign) 4：提交结果(submit) 5：确认完成(confirm) 6：取消（cancel）
	DaoId            int           `gorm:"column:dao_id" json:"dao_id" form:"dao_id" `                        // dao id
	TaskId           int           `gorm:"column:task_id" json:"task_id" form:"task_id"`                      // 任务id
	OperatorInfo     *UserBaseInfo `json:"operator_info" form:"operator_info"`                                // 操作人信息
	OperatedUserInfo *UserBaseInfo `json:"operated_user_info,omitempty" form:"operated_user_info"`            // 被操作人信息
	OperateAt        time.Time     `gorm:"column:operate_at" json:"operate_at" form:"operate_at"`             // 操作时间
	SubmitResult     string        `gorm:"column:submit_result" json:"submit_result" form:"submit_result"`    // 提交结果hash地址
}

type HandleCreateTaskReq struct {
	WalletAddress string `json:"wallet_address" form:"wallet_address" validate:"required"` // 创建者钱包地址
	TaskName      string `json:"task_name" form:"task_name" validate:"required"`           // 任务名称
	DaoId         int    `json:"dao_id" form:"dao_id" validate:"required"`                 // dao id
	Objective     string `json:"objective" form:"objective" validate:"required"`           // 目标
	KeyResult     string `json:"key_result" form:"key_result" validate:"required"`         // 关键结果
	Deadline      int    `json:"deadline" form:"deadline" validate:"required"`             // 截至时间戳
	Reward        int    `json:"reward" form:"reward" validate:"required"`                 // 奖励
	Action        string `json:"action" form:"action" validate:"required"`                 // create:创建 edit:修改
}

type HandleCreateTaskResp struct {
	Status  int        `json:"status"`
	Message Message    `json:"message"`
	Data    *HtDaoTask `json:"data"`
}

type HandleEditTaskReq struct {
	WalletAddress string `json:"wallet_address" form:"wallet_address" validate:"required"` // 创建者钱包地址
	TaskName      string `json:"task_name" form:"task_name" validate:"required"`           // 任务名称
	TaskId        int    `json:"task_id" form:"task_id" validate:"required"`               // 任务id
	Objective     string `json:"objective" form:"objective" validate:"required"`           // 目标
	KeyResult     string `json:"key_result" form:"key_result" validate:"required"`         // 关键结果
	Deadline      int    `json:"deadline" form:"deadline" validate:"required"`             // 截至时间戳
	Reward        int    `json:"reward" form:"reward" validate:"required"`                 // 奖励
	Action        string `json:"action" form:"action" validate:"required"`                 // create:创建 edit:修改
}

type HandleEditTaskResp struct {
	Status  int         `json:"status"`
	Message Message     `json:"message"`
	Data    interface{} `json:"data"`
}

type HandleTaskInfoReq struct {
	WalletAddress string `json:"wallet_address" query:"wallet_address" validate:"required"` // 用户钱包地址
	TaskId        int    `json:"task_id" query:"task_id" validate:"required"`               // 任务id
	Action        int    `json:"action" query:"action" validate:"required"`                 // 1:获取详情
}

type HandleTaskInfoResp struct {
	Status  int           `json:"status"`
	Message Message       `json:"message"`
	Data    *TaskBaseInfo `json:"data"`
}

type HandleTaskListReq struct {
	WalletAddress string `json:"wallet_address" query:"wallet_address" validate:"required"` // 用户钱包地址
	Start         int    `json:"start" query:"start"`                                       // 上一页的最后一个id，第一页填写0
	DaoId         int    `json:"dao_id" query:"dao_id"`                                     // dao id
	TaskType      int    `json:"task_type" query:"task_type" validate:"required"`           // 1:dao内部任务列表
	TaskStatus    int    `json:"task_status" query:"task_status"`                           // 0:被取消 1: 已创建待claim 2：进行中（已被领取）3：已提交结果 4：已确认完成
}

type HandleTaskListResp struct {
	Status  int            `json:"status"`
	Message Message        `json:"message"`
	Data    []TaskListInfo `json:"data"`
}

type HandleOperateTaskReq struct {
	WalletAddress string        `json:"wallet_address" form:"wallet_address" validate:"required"` // 钱包地址
	TaskId        int           `json:"task_id" form:"task_id" validate:"required"`               // 任务id
	Operation     TaskOperation `json:"operation" form:"operation" validate:"required"`           //  Claim: 认领 , Assign 分配 , Submit 提交结果, Confirm 确认完成
	SubmitResult  string        `json:"submit_result" form:"submit_result"`                       // 提交结果hash地址
	OperatedUser  string        `json:"operated_user" form:"operated_user"`                       // 被操作用户钱包地址，只有行为是Assign时有数据
}

type HandleOperateTaskResp struct {
	Status  int         `json:"status"`
	Message Message     `json:"message"`
	Data    interface{} `json:"data"`
}

// @Summary task创建
// @version 1.0
// @Accept application/json
// @Description 返回数据 status 0=成功,其他均为失败，msg 为具体错误码(字符串) 具体错误码对应关系看wiki
// @Param HandleCreateTaskReq body HandleCreateTaskReq true "请求数据"
// @Success 0 object HandleCreateTaskResp 成功后返回值
// @Router /free_be/task/create [post]
func (h *HttpHandler) HandleCreateTask(ctx echo.Context) error {
	req := &HandleCreateTaskReq{}
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, HandleCreateTaskResp{1, ErrParam, nil})
	}
	if err := ctx.Validate(req); err != nil {
		logger.Logger.Errorf("HandleCreateDao Validate failed req=%v err=%v", req, err)
		return ctx.JSON(200, HandleCreateTaskResp{1, ErrParam, nil})
	}
	res := h.TaskCreate(req.WalletAddress, req.TaskName, req.Objective, req.KeyResult, req.Reward, req.Deadline, req.DaoId)
	if res.Status != 0 {
		logger.Logger.Errorw("HandleCreateDao CreateDao failed", "res", res)
	}

	return ctx.JSON(http.StatusOK, res)
}

func (h *HttpHandler) TaskCreate(walletAddress, taskName, objective, KeyResult string, reward, deadline, daoId int) HandleCreateTaskResp {
	filter := fmt.Sprintf("wallet_address=%s", walletAddress)
	userInfo := h.GetUserInfo(filter)
	if len(userInfo) <= 0 {
		return HandleCreateTaskResp{1, EmptyUser, nil}
	}
	filter = fmt.Sprintf("id=%d", daoId)
	daoInfo := h.GetDaoInfo(filter)
	if userInfo[0].WalletAddress != daoInfo[0].CreatorWallet {
		return HandleCreateTaskResp{1, ErrNoPermission, nil}
	}
	ts := time.Now()
	taskInfo := &HtDaoTask{
		DaoId:      daoId,
		Objective:  objective,
		TaskName:   taskName,
		KeyResult:  KeyResult,
		Reward:     reward,
		CreateBy:   walletAddress,
		CreateAt:   ts,
		UpdateAt:   ts,
		Status:     1,
		CreateUnix: int(ts.Unix()),
	}
	taskInfo.Deadline = time.Unix(int64(deadline), 0)
	if err := service.UserDb.Table(service.DaoTask).Model(taskInfo).Create(taskInfo).Error; err != nil {
		logger.Logger.Errorw("CreateDaoTask Create taskInfo failed", "CreateBy", taskInfo.CreateBy, "err", err)
		return HandleCreateTaskResp{1, ErrInternal, nil}
	}
	filter = fmt.Sprintf("create_by=%s AND create_unix =%v", walletAddress, ts.Unix())
	newTask := h.GetTaskInfo(filter)
	if len(newTask) > 0 {
		h.InsertTaskRecord(int(newTask[0].Id), newTask[0].DaoId, 1, walletAddress, "", "")
	}

	return HandleCreateTaskResp{0, SucessMsg, taskInfo}
}

// @Summary task信息修改
// @version 1.0
// @Accept application/json
// @Description 返回数据 status 0=成功,其他均为失败，msg 为具体错误码(字符串) 具体错误码对应关系看wiki
// @Param HandleEditTaskReq body HandleEditTaskReq true "请求数据"
// @Success 0 object HandleEditTaskResp 成功后返回值
// @Router /free_be/task/edit [post]
func (h *HttpHandler) HandleEditTask(ctx echo.Context) error {
	req := &HandleEditTaskReq{}
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, HandleEditTaskResp{1, ErrParam, nil})
	}
	if err := ctx.Validate(req); err != nil {
		logger.Logger.Errorf("HandleCreateDao Validate failed req=%v err=%v", req, err)
		return ctx.JSON(200, HandleEditTaskResp{1, ErrParam, nil})
	}
	res := h.TaskEdit(req.WalletAddress, req.TaskName, req.Objective, req.KeyResult, req.Action, req.Reward, req.Deadline, req.TaskId)
	if res.Status != 0 {
		logger.Logger.Errorw("HandleCreateDao CreateDao failed", "res", res)
	}

	return ctx.JSON(http.StatusOK, res)
}

func (h *HttpHandler) TaskEdit(walletAddress, taskName, objective, KeyResult, action string, reward, deadline, taskId int) HandleEditTaskResp {
	filter := fmt.Sprintf("wallet_address=%s", walletAddress)
	userInfo := h.GetUserInfo(filter)
	if len(userInfo) <= 0 {
		return HandleEditTaskResp{1, EmptyUser, nil}
	}
	filter = fmt.Sprintf("id=%d", taskId)
	daoInfo := h.GetTaskInfo(filter)
	if userInfo[0].WalletAddress != daoInfo[0].CreateBy {
		return HandleEditTaskResp{1, ErrNoPermission, nil}
	}

	updateFields := make(map[string]interface{})
	if action == "edit" {
		updateFields["task_name"] = taskName
		updateFields["objective"] = objective
		updateFields["key_result"] = KeyResult
		updateFields["reward"] = reward
		updateFields["deadline"] = time.Unix(int64(deadline), 0)
		updateFields["update_at"] = time.Now()
	}
	filter = fmt.Sprintf("id=%d", taskId)
	if err := service.UserDb.Table(service.DaoTask).Where(filter).Updates(updateFields).Error; err != nil {
		logger.Logger.Errorw("TaskEdit Updates DaoTask failed", "uid", daoInfo[0].CreateBy, "err", err)
		return HandleEditTaskResp{1, ErrInternal, nil}
	}

	return HandleEditTaskResp{0, SucessMsg, updateFields}
}

// @Summary 查询task详情接口
// @version 1.0
// @Accept application/json
// @Description 返回数据 status 0=成功,其他均为失败，msg 为具体错误码(字符串) 具体错误码对应关系看wiki
// @Param HandleTaskInfoReq query HandleTaskInfoReq true "请求数据"
// @Success 0 object HandleTaskInfoResp 成功后返回值
// @Router /free_be/task/info [GET]
func (h *HttpHandler) HandleGetTaskInfo(ctx echo.Context) error {
	req := &HandleTaskInfoReq{}
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, HandleTaskInfoResp{1, ErrParam, nil})
	}
	if err := ctx.Validate(req); err != nil {
		logger.Logger.Errorf("HandleGetTaskInfo Validate failed req=%v err=%v", req, err)
		return ctx.JSON(200, HandleTaskInfoResp{1, ErrParam, nil})
	}
	res := h.GetTaskDetail(req.WalletAddress, req.Action, req.TaskId)
	if res.Status != 0 {
		logger.Logger.Errorw("HandleGetTaskInfo GetDao failed", "res", res)
	}

	return ctx.JSON(http.StatusOK, res)
}

func (h *HttpHandler) GetTaskDetail(walletAddress string, action int, taskId int) HandleTaskInfoResp {
	filter := fmt.Sprintf("id=%d", taskId)
	taskInfo := h.GetTaskInfo(filter)
	if len(taskInfo) <= 0 {
		return HandleTaskInfoResp{1, ErrInternal, nil}
	}

	var taskBase = &TaskBaseInfo{
		Id:        taskInfo[0].Id,
		Objective: taskInfo[0].Objective,
		TaskName:  taskInfo[0].TaskName,
		KeyResult: taskInfo[0].KeyResult,
		Reward:    taskInfo[0].Reward,
		Deadline:  taskInfo[0].Deadline,
		DaoId:     taskInfo[0].DaoId,
		Status:    taskInfo[0].Status,
	}

	filter = fmt.Sprintf("task_id=%d", taskId)
	taskRecord := h.GetTaskRecordInfo(filter)
	var userInfoMap = make(map[string]*UserBaseInfo)
	if len(taskRecord) > 0 {
		for _, v := range taskRecord {
			userInfoMap[v.Operator] = nil
			if len(v.OperatedUser) > 4 {
				userInfoMap[v.OperatedUser] = nil
			}
		}
		var userAddress []string
		if len(userInfoMap) > 0 {
			for k, _ := range userInfoMap {
				userAddress = append(userAddress, k)
			}
			joinStr := strings.Join(userAddress, ",")
			filter = fmt.Sprintf("wallet_address in (%s)", joinStr)
		}

		userInfo := h.GetUserInfo(filter)
		for _, v := range userInfo {
			var tmp = &UserBaseInfo{
				Id:            v.Id,
				Name:          v.Name,
				WalletAddress: v.WalletAddress,
				HeadImage:     v.HeadImage,
			}
			userInfoMap[v.WalletAddress] = tmp
		}

		var tmpTaskRecord TaskRecordSortSlice
		for _, v := range taskRecord {
			var tmp TaskRecordBase
			tmp.DaoId = v.DaoId
			tmp.OperationType = v.OperationType
			tmp.Id = v.Id
			tmp.TaskId = v.TaskId
			tmp.SubmitResult = v.SubmitResult
			tmp.OperateAt = v.OperateAt
			if value, ok := userInfoMap[v.Operator]; ok {
				tmp.OperatorInfo = value
			}
			if len(v.OperatedUser) > 4 {
				if value, ok := userInfoMap[v.OperatedUser]; ok {
					tmp.OperatedUserInfo = value
				}
			}
			tmpTaskRecord = append(tmpTaskRecord, tmp)
		}
		sort.Sort(tmpTaskRecord)
		taskBase.OperateRecord = tmpTaskRecord
	}
	return HandleTaskInfoResp{0, SucessMsg, taskBase}
}

// @Summary 查询task列表接口
// @version 1.0
// @Accept application/json
// @Description 返回数据 status 0=成功,其他均为失败，msg 为具体错误码(字符串) 具体错误码对应关系看wiki
// @Param HandleDaoListReq query HandleDaoListReq true "请求数据"
// @Success 0 object HandleDaoListResp 成功后返回值
// @Router /free_be/dao/list [GET]
func (h *HttpHandler) HandleGetTaskList(ctx echo.Context) error {
	req := &HandleTaskListReq{}
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, HandleTaskListResp{1, ErrParam, nil})
	}
	if err := ctx.Validate(req); err != nil {
		logger.Logger.Errorf("HandleGetDaoInfo Validate failed req=%v err=%v", req, err)
		return ctx.JSON(200, HandleTaskListResp{1, ErrParam, nil})
	}
	res := h.GetTaskList(req.WalletAddress, req.Start, req.TaskStatus, req.DaoId)
	if res.Status != 0 {
		logger.Logger.Errorw("HandleGetTaskList GetTaskList failed", "res", res)
	}
	return ctx.JSON(http.StatusOK, res)
}

func (h *HttpHandler) GetTaskList(walletAddress string, start int, status int, daoId int) HandleTaskListResp {
	var taskList []TaskListInfo
	filter := fmt.Sprintf("dao_id=%d AND status=%d AND id>=%d", daoId, status, start)
	var conds []*HtDaoTask
	logger.Logger.Debugw("GetTaskList   ", "filter", filter, "walletAddress", walletAddress)
	if err := service.UserDb.Table(service.DaoTask).Model(&HtDaoTask{}).Where(filter).Find(&conds).Limit(20).Error; err != nil {
		logger.Logger.Errorw("GetTaskList  DaoBase  failed ", "err", err, "filter", filter)
	}
	if len(conds) == 0 {
		logger.Logger.Errorw("GetTaskList  failed : conds is nil", "filter", filter)
		return HandleTaskListResp{0, SucessMsg, nil}
	}

	var userInfoMap = make(map[string]*UserBaseInfo)
	for _, v := range conds {
		userInfoMap[v.CreateBy] = nil
	}
	var userAddress []string
	if len(userInfoMap) > 0 {
		for k, _ := range userInfoMap {
			userAddress = append(userAddress, k)
		}
		joinStr := strings.Join(userAddress, ",")
		filter = fmt.Sprintf("wallet_address in (%s)", joinStr)
		userInfo := h.GetUserInfo(filter)
		for _, v := range userInfo {
			var tmp = &UserBaseInfo{
				Id:            v.Id,
				Name:          v.Name,
				WalletAddress: v.WalletAddress,
				HeadImage:     v.HeadImage,
			}
			userInfoMap[v.WalletAddress] = tmp
		}

		for _, v := range conds {
			var tmp TaskListInfo
			tmp.DaoId = v.DaoId
			tmp.Id = v.Id
			tmp.Status = v.Status
			tmp.TaskName = v.TaskName
			tmp.Reward = v.Reward
			tmp.Deadline = v.Deadline
			if value, ok := userInfoMap[v.CreateBy]; ok {
				tmp.CreatorInfo = value
			}
			taskList = append(taskList, tmp)
		}

	}
	return HandleTaskListResp{0, SucessMsg, taskList}

}

// @Summary task操作
// @version 1.0
// @Accept application/json
// @Description 返回数据 status 0=成功,其他均为失败，msg 为具体错误码(字符串) 具体错误码对应关系看wiki
// @Param HandleOperateTaskReq body HandleOperateTaskReq true "请求数据"
// @Success 0 object HandleOperateTaskResp 成功后返回值
// @Router /free_be/task/operate [post]
func (h *HttpHandler) HandleOperateTask(ctx echo.Context) error {
	req := &HandleOperateTaskReq{}
	if err := ctx.Bind(req); err != nil {
		return ctx.JSON(http.StatusBadRequest, HandleEditTaskResp{1, ErrParam, nil})
	}
	if err := ctx.Validate(req); err != nil {
		logger.Logger.Errorf("HandleOperateTask Validate failed req=%v err=%v", req, err)
		return ctx.JSON(200, HandleOperateTaskResp{1, ErrParam, nil})
	}
	res := h.TaskOperate(req.WalletAddress, req.OperatedUser, req.SubmitResult, req.TaskId, req.Operation)
	if res.Status != 0 {
		logger.Logger.Errorw("HandleOperateTask TaskOperate failed", "res", res)
	}

	return ctx.JSON(http.StatusOK, res)
}

func (h *HttpHandler) TaskOperate(operator, operatedUser, submitResult string, taskId int, operation TaskOperation) HandleOperateTaskResp {
	filter := fmt.Sprintf("id=%d", taskId)
	taskInfo := h.GetTaskInfo(filter)
	updateFields := make(map[string]interface{})

	updateFields["update_at"] = time.Now()
	var operationType int
	if len(taskInfo) > 0 {
		switch operation {
		case Claim:
			if taskInfo[0].Status >= 2 || taskInfo[0].Status == 0 {
				return HandleOperateTaskResp{1, ErrParam, nil}
			}
			updateFields["claim_by"] = operator
			updateFields["status"] = Progressing
			submitResult = ""
			operationType = 2
			operatedUser = ""

		case Submit:
			if taskInfo[0].Status >= 3 || taskInfo[0].Status == 0 || len(submitResult) < 8 {
				return HandleOperateTaskResp{1, ErrParam, nil}
			}
			if taskInfo[0].ClaimBy != operator {
				return HandleOperateTaskResp{1, ErrNoPermission, nil}
			}

			updateFields["status"] = ToBeConfirmed
			operationType = 4
			operatedUser = ""
		case Assign:
		case Confirm:
			if taskInfo[0].Status >= 4 || taskInfo[0].Status == 0 {
				return HandleOperateTaskResp{1, ErrParam, nil}
			}
			if taskInfo[0].CreateBy != operator {
				return HandleOperateTaskResp{1, ErrNoPermission, nil}
			}
			updateFields["confirm_by"] = operator
			updateFields["status"] = Done
			operationType = 5
			operatedUser = ""
		case Cancel:
			if taskInfo[0].Status >= 4 || taskInfo[0].Status == 0 {
				return HandleOperateTaskResp{1, ErrParam, nil}
			}
			if taskInfo[0].CreateBy != operator {
				return HandleOperateTaskResp{1, ErrNoPermission, nil}
			}
			updateFields["status"] = Canceled
			operationType = 6
			operatedUser = ""
		default:
			return HandleOperateTaskResp{1, ErrParam, nil}
		}
		h.UpdateTaskInfo(taskId, updateFields)
		h.InsertTaskRecord(taskId, taskInfo[0].DaoId, operationType, operator, operatedUser, submitResult)
		return HandleOperateTaskResp{0, SucessMsg, nil}
	}
	return HandleOperateTaskResp{1, ErrInternal, nil}

}

func (h *HttpHandler) GetTaskInfo(filter string) []*HtDaoTask {
	var conds []*HtDaoTask
	logger.Logger.Debugw("GetTaskInfo  ", "filter", filter)
	if err := service.UserDb.Table(service.DaoTask).Model(&HtDaoTask{}).Where(filter).Find(&conds).Error; err != nil {
		logger.Logger.Errorw("GetTaskInfo  failed ", "err", err, "filter", filter)
		return nil
	}
	if len(conds) == 0 {
		logger.Logger.Errorw("GetTaskInfo  failed : conds is nil", "filter", filter)
		return nil
	}
	return conds
}

func (h *HttpHandler) InsertTaskRecord(taskId, daoId, operationType int, operator, operatedUser, submitResult string) error {
	operateInfo := &HtTaskRecord{
		DaoId:         daoId,
		TaskId:        taskId,
		OperationType: operationType,
		Operator:      operator,
		OperatedUser:  operatedUser,
		OperateAt:     time.Now(),
		CreateAt:      time.Now(),
		SubmitResult:  submitResult,
	}
	if err := service.UserDb.Table(service.TaskOperateRecord).Model(operateInfo).Create(operateInfo).Error; err != nil {
		logger.Logger.Errorw("CreateDaoTask Create taskInfo failed", "err", err, "operateInfo", operateInfo)
		return err
	}
	return nil
}

func (h *HttpHandler) GetTaskRecordInfo(filter string) []*HtTaskRecord {
	var conds []*HtTaskRecord
	logger.Logger.Debugw("GetTaskRecordInfo  ", "filter", filter)
	if err := service.UserDb.Table(service.TaskOperateRecord).Model(&HtTaskRecord{}).Where(filter).Find(&conds).Error; err != nil {
		logger.Logger.Errorw("GetTaskRecordInfo  failed ", "err", err, "filter", filter)
		return nil
	}
	if len(conds) == 0 {
		logger.Logger.Errorw("GetTaskRecordInfo  failed : conds is nil", "filter", filter)
		return nil
	}
	return conds
}

func (h *HttpHandler) UpdateTaskInfo(taskId int, updateFields map[string]interface{}) error {
	filter := fmt.Sprintf("id=%d", taskId)
	if err := service.UserDb.Table(service.DaoTask).Where(filter).Updates(updateFields).Error; err != nil {
		logger.Logger.Errorw("UpdateTaskInfo Updates DaoTask failed", "updateFields", updateFields, "err", err)
		return err
	}
	return nil
}
