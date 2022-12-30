<script setup lang="ts">
export interface Props {
  type: "default" | "warn" | "error" | "success";
  msg: string;
}
defineProps<Props>();

const toggle = ref(false);

onMounted(() => {
  toggle.value = true;
});

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

defineExpose(toggle);
</script>

<template>
  <Transition name="down">
    <div class="free-message" :style="style[type]" v-if="toggle">
      <SvgIcon :name="style[type].icon" :color="style[type].color" />
      <span class="text">{{ msg }}</span>
    </div>
  </Transition>
</template>

<style scoped lang="less">
.free-message {
  width: 560px;
  height: 64px;
  position: fixed;
  z-index: 9999;

  left: 45%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  // top: 20%;
  // left: 50%;
  // transform: translate(-50%, -50%);
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

.down {
  &-enter {
    &-from {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }

    &-active {
      transition: all 0.5s;
    }
  }

  &-leave {
    &-to {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }

    &-active {
      transition: all 0.5s;
    }
  }
}
</style>
