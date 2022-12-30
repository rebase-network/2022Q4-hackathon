<script setup lang="ts">
import { HtmlAttributes } from 'csstype';

export interface Props {
  type: "default" | "warn" | "error" | "success";
  msg: string | HtmlAttributes;
}
defineProps<Props>();

const style = {
  // 警告类型的提示
  default: {
    icon: "info_fill",
    color: "#000",
    backgroundColor: "rgb(241, 245, 249)",
    borderColor: "rgb(241, 245, 249)",
  },  // 警告类型的提示
  warn: {
    icon: "info",
    color: "#E6A23C",
    backgroundColor: "rgb(253, 246, 236)",
    borderColor: "rgb(250, 236, 216)",
  },
  // 错误类型的提示
  error: {
    icon: "info",
    color: "#F56C6C",
    backgroundColor: "rgb(254, 240, 240)",
    borderColor: "rgb(253, 226, 226)",
  },
  // 成功类型的提示
  success: {
    icon: "info",
    color: "#67C23A",
    backgroundColor: "rgb(240, 249, 235)",
    borderColor: "rgb(225, 243, 216)",
  },
};
</script>

<template>
  <div class="free-message" :style="style[type]">
    <SvgIcon :name="style[type].icon" :color="style[type].color" />
    <span class="text" v-html="msg"></span>
  </div>
</template>

<style scoped lang="less">
.free-message {
  width: 100%;
  // height: 64px;
  line-height: 64px;
  padding: 0 25px;
  border-radius: 8px;
  color: #999;
  border: 1px solid #e4e4e4;
  background-color: #f1f5f9;

  .text {
    margin-left: 0.5rem;
    vertical-align: middle;
  }
}
</style>
