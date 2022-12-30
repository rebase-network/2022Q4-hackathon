import FreeRequestManager from "@/utils/RequestManager";
import type { Pagination, XtxResponse } from "@/types/Response";
import { HtDaoTask, HandleEditTaskReq, TaskBaseInfo } from "@/types/Task";

export class TaskAPI {
  static handleCreateTask(arg: HandleEditTaskReq) {
    return FreeRequestManager.instance.request<XtxResponse<HtDaoTask>, HandleEditTaskReq>({
      url: "/free_be/task/create",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: arg
    });
  }

  static handleEditTask(arg: HandleEditTaskReq) {
    return FreeRequestManager.instance.request<XtxResponse<HtDaoTask>, HandleEditTaskReq>({
      url: '/free_be/task/edit',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      data: arg
    });
  }

  static handleTaskInfo(taskId: number, walletAddress: string) {
    return FreeRequestManager.instance.request<XtxResponse<TaskBaseInfo>>({
      url: '/free_be/task/info',
      method: 'GET',
      params: {
        action: 1,
        task_id: taskId,
        wallet_address: walletAddress
      }
    });
  }

  // // 用于获取同类商品或猜你喜欢
  // static getRelevantGoods(args?: { id?: string; limit?: number }) {
  //   // 如果开发者传递了 args 对象, 但是在 args 对象中没有传递 limit
  //   if (typeof args !== "undefined" && typeof args.limit === "undefined") {
  //     // 为 limit 参数设置默认值
  //     args.limit = 16;
  //   } else {
  //     // 开发者没有传递 args 对象
  //     // 为 limit 参数设置默认值
  //     args = { limit: 16 };
  //   }
  //   return FreeRequestManager.instance.request<XtxResponse<Goods[]>>({
  //     url: "/goods/relevant",
  //     params: args,
  //   });
  // }
  // // 获取热销榜单
  // static getHotSaleGoods(id: string, type: 1 | 2 | 3, limit: number = 3) {
  //   return FreeRequestManager.instance.request<XtxResponse<Goods[]>>({
  //     url: "/goods/hot",
  //     params: { id, type, limit },
  //   });
  // }
  // // 获取评价头部信息
  // static getEvaluateInfo(id: string) {
  //   return FreeRequestManager.instance.request<XtxResponse<EvaluateInfo>>({
  //     url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
  //   });
  // }
  // // 获取评价列表
  // static getEvaluateList(id: string, reqParams: EvaluateRequestParams) {
  //   return FreeRequestManager.instance.request<
  //     XtxResponse<Pagination<Evaluate>>
  //   >({
  //     url: `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
  //     params: reqParams,
  //   });
  // }
}
