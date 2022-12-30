import type { App } from "vue";

import Message from "@/utils/messagePlugin";
import Confirm from "@/utils/confirmPlugin";

export default {
  // 初始化导入
  install(app: App) {
    // 全局绑定
    app.config.globalProperties.$messgae = Message;
    app.config.globalProperties.$confirm = Confirm;
  },
};
