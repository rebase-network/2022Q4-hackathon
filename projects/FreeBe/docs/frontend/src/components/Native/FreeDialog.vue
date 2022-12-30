<script setup lang="ts">
const props = defineProps<{ title: string; visible: boolean }>();

const emit = defineEmits<{ (e: "update:visible"): void }>();
const visibleModel = useVModel(props, "visible", emit);

const domIsVisible = ref(props.visible);
const target = ref<undefined | HTMLDivElement>();

// 监听外部布尔值的变化
watch(
  () => props.visible,
  () => {
    // 如果外部的布尔值变为真
    if (props.visible) {
      domIsVisible.value = true;
      setTimeout(() => {
        if (target.value) {
          target.value.classList.add("fade");
        }
      }, 0);
    } else {
      // 先执行动画再销毁
      setTimeout(() => {
        if (target.value) {
          target.value.classList.remove("fade");
          target.value.addEventListener("transitionend", () => {
            domIsVisible.value = false;
          });
        }
      }, 0);
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="free-dialog" v-if="domIsVisible" ref="target">
    <div class="wrapper">
      <div class="header">
        <h3>{{ title }}</h3>
        <a href="JavaScript:" @click="visibleModel = false">
          <svg-icon name="close" />
        </a>
      </div>
      <div class="body">
        <slot name="body" />
      </div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.free-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0, 0, 0, 0);
  transition: all 0.4s;

  .wrapper {
    width: 700px;
    background: #fff;
    border-radius: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    transition: all 0.4s;

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
      text-align: center;
      padding: 10px 0 30px 0;
    }

    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 40px;
      display: flex;
      justify-content: space-between;

      h3 {
        font-weight: 700;
        font-size: 18px;
      }

    }
  }

  &.fade {
    background: rgba(0, 0, 0, 0.5);

    .wrapper {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
}
</style>
