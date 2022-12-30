// @ts-ignore
import { h, render } from "vue";

import FreeMessage from "@/components/Native/FreeMessage.vue";
import type { Props } from "@/components/Native/FreeMessage.vue";


export default function message(props: Props) {
  // 将 FreeMessage 单文件组件对象转换成虚拟 DOM 对象
  const vNode = h(FreeMessage, props);
  // 将 FreeMessage 组件对应的虚拟 DOM 对象转换成真实 DOM 对象
  const container = document.createElement("div");
  document.body.appendChild(container);
  render(vNode, container);

  // 3秒之后自动销毁组件
  setTimeout(() => {
    if (vNode.component && vNode.component.exposed) {
      vNode.component.exposed.value = false;
      setTimeout(() => {
        document.body.removeChild(container);
      }, 800);
    }
  }, 3000);
}
