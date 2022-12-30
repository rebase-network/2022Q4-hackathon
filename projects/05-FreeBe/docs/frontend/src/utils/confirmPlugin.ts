import { h, render } from "vue";
import XtxConfirm from "@/components/XtxConfirm.vue";

export default function myConfirm(props: { title?: string; content: string }) {
  return new Promise(function (resolve, reject) {
    const vNode = h(XtxConfirm, {
      ...props,
      sure: resolve,
      cancel: reject,
      close,
    });
    // 创建虚拟DOM的渲染容器
    const container = document.createElement("div");
    document.body.appendChild(container);
    // 3. 将虚拟DOM对象渲染成真实DOM对象  render
    render(vNode, container);
    // 关闭弹框
    function close() {
      render(null, container);
      document.body.removeChild(container);
    }
  });
}
