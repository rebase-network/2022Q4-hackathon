import FreeRequestManager from "@/utils/RequestManager";
import type { XtxResponse } from "@/types/Response";
import { UserBaseInfo } from "@/types/User";


export class UserAPI {
  static getUserLogin(arg: UserBaseInfo) {
    return FreeRequestManager.instance.request<XtxResponse<null>, UserBaseInfo>({
      method: "POST",
      url: "/free_be/user/login",
      data: arg
    });
  }
}
