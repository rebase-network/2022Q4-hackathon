import FreeRequestManager from "@/utils/RequestManager";
import type { Pagination, XtxResponse } from "@/types/Response";
import { Dao, DaoListReq, DaoInfoReq, DaoCreateEditParams } from "@/types/Dao";

export class DaoAPI {
  static getDaoList(arg: DaoListReq) {
    return FreeRequestManager.instance.request<XtxResponse<Dao[]>>({
      url: "/free_be/dao/list",
      data: arg
    });
  }

  static getDaoInfo(arg: DaoInfoReq) {
    return FreeRequestManager.instance.request<XtxResponse<Dao>>({
      url: "/free_be/dao/info",
      data: arg
    });
  }

  static handleCreateDao(arg: DaoCreateEditParams): Promise<XtxResponse<Dao>> {
    return FreeRequestManager.instance.request<XtxResponse<Dao>, DaoCreateEditParams>({
      url: "/free_be/dao/create",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: arg
    });
  }


  static handleEditDao(arg: DaoCreateEditParams) {
    return FreeRequestManager.instance.request<XtxResponse<Dao[]>, DaoCreateEditParams>({
      url: "/free_be/dao/edit",
      data: arg
    });
  }
}
