<script setup lang="ts">
import XtxButton from "@/components/Native/FreeBtn.vue";

export type callback = () => void;

withDefaults(
  defineProps<{
    title?: string;
    content: string;
    sure?: callback;
    cancel?: callback;
    close?: callback;
  }>(),
  {
    title: "温馨提示",
    sure: () => { },
    cancel: () => { },
    close: () => { },
  }
);
</script>

<template>
  <div class="xtx-confirm">
    <div class="wrapper">
      <div class="header">
        <h3>{{ title }}</h3>
        <a href="JavaScript:" class="iconfont icon-close-new" @click="close"></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ content }}</span>
      </div>
      <div class="footer">
        <XtxButton @click="
  cancel();
close();
        " size="mini" type="gray">取消</XtxButton>
        <XtxButton @click="
  sure();
close();
        " size="mini" type="primary">确认</XtxButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.4s;

  &.fade {
    background: rgba(0, 0, 0, 0.5);
  }

  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s;

    &.fade {
      transform: translate(-50%, -50%);
      opacity: 1;
    }

    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }

    .body {
      padding: 20px 40px;
      font-size: 16px;

      .icon-warning {
        color: cyan-primary-color;
        margin-right: 3px;
        font-size: 16px;
      }
    }

    .footer {
      text-align: right;

      .xtx-button {
        margin-left: 20px;
      }
    }

    .header {
      position: relative;

      h3 {
        font-weight: normal;
        font-size: 18px;
      }

      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;

        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
