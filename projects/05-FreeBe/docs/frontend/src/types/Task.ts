import { UserBaseInfo } from "./User";

// export type TaskOperation = ["create", "claim", "assign", "submit", "confirm", "cancel"]
export type TaskOperation = "create" | "claim" | "assign" | "submit" | "confirm" | "cancel";

export interface TaskBaseInfo {
  creator_info: UserBaseInfo; // 创建人信息
  dao_id: number; // dao id
  deadline: string; // 截至时间
  id: number; // 自增id
  key_result: string; // 关键结果
  objective: string; // 目标
  operate_record: TaskRecordBase[]; // 任务操作记录
  reward: number; // 奖励
  status: number; // 状态 0:被取消 1: 已创建待claim 2：进行中（已被领取）3：已提交结果 4：已确认完成
  task_name: string; // 任务名称
}

export interface TaskRecordBase {
  dao_id: number; // dao id
  id: number; // 自增id
  operate_at: string; // 操作时间
  operated_user_info: UserBaseInfo; // 被操作人信息
  operation_type: number; // 操作类型 1：创建(create) 2：认领(claim) 3：分配（assign) 4：提交结果(submit) 5：确认完成(confirm) 6：取消（cancel）
  operator_info: UserBaseInfo; // 操作人信息
  submit_result: string; // 提交结果hash地址
  task_id: number; // 任务id
}

export interface TaskRecordReq {
  operated_user?: string; // 被操作用户钱包地址，只有行为是Assign时有数据
  operation: TaskOperation; // Claim: 认领 , Assign 分配 , Submit 提交结果, Confirm 确认完成
  submit_result?: string; // 提交结果hash地址
  task_id: number; // 任务id
  wallet_address: string; // 钱包地址
}


export interface HtDaoTask {
  claim_by: string // 认领者钱包地址
  confirm_by: string // 确认人钱包地址
  create_at: string // 创建时间
  create_by: string // 创建者钱包地址
  create_unix: number // 创建时间戳
  dao_id: number // dao id
  deadline: string // 截至时间
  id: number // 自增id
  key_result: string // 关键结果
  objective: string // 目标
  reward: number // 奖励
  status: number // 状态 0:被取消 1: 已创建待claim 2：进行中（已被领取）3：已提交结果 4：已确认完成
  task_name: string // 任务名称
  update_at: string // 更新时间
}


export interface HandleEditTaskReq {
  action: "create" | "edit"; // create:创建 edit:修改
  deadline: number; // 截至时间戳
  key_result: string; // 关键结果
  objective: string; // 目标
  reward: number; // 奖励
  task_id: number; // 任务id
  task_name: string; // 任务名称
  wallet_address: string; // 创建者钱包地址
}
