import type { App } from "vue";
import SvgIcon from '@/components/Handle/SvgIcon.vue' // svg component

const requireAll = function (requireContext: unknown) {
  return Object.values(requireContext as Record<string, unknown>);
};

const req = import.meta.globEager("./icons/*.svg");
console.log(req);

requireAll(req)

export default function (app: App) {
  app.component('SvgIcon', SvgIcon)
}
