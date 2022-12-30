<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "adaptive" | "full" | "large" | "middle" | "small" | "mini";
    type?: "default" | "primary" | "plain" | "gray" | "light";
    op_type?: "submit",
    radius?: "square" | "rounded" | "rounded-xl" | "rounded-circle";
    to?: string;
  }>(),
  { size: "middle", type: "default", to: "", radius: "rounded-xl" }
);
</script>

<template>
  <button v-if="!to" :type="op_type"  class="free-button ellipsis" :class="[size, type, radius]">
    <slot></slot>
  </button>
  <RouterLink class="free-button ellipsis" :class="[size, type, radius]" v-else :to="to">
    <slot></slot>
  </RouterLink>
</template>

<style scoped lang="less">
.free-button {
  appearance: none;
  outline: none;
  background: #fff;
  text-align: center;
  border: 1px solid transparent;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;

  a {
    width: 100%;
    height: 100%;
    color: #fff;
  }

  &:hover {
    // background-color: @cyan-primary-color;
    // border-color: @cyan-primary-color;
    background-color: @base-hover-color;
    border-color: @base-hover-color;
    color: #fff;
  }
}

/* 控制按钮尺寸 */
.adaptive {
  min-width: 40%;
  height: 100%;
  line-height: 100%;
  font-size: 16px;
}

.full {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}

.large {
  width: 240px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}

.middle {
  width: 180px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}

.small {
  width: 100px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}

.mini {
  width: 60px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
}

/* 控制按钮类型 */
.default {
  background-color: #000;
  border-color: #000000;
  color: rgb(255, 255, 255);
}

.primary {
  border-color: @cyan-primary-color;
  background: @cyan-primary-color;
  color: #fff;
}

.plain {
  border-color: @cyan-primary-color;
  color: @cyan-primary-color;
  // background: lighten(@cyan-primary-color, 50%);
}

.gray {
  border-color: #ccc;
  background: #ccc;
  color: #fff;
}

.light {
  border-color: #fff;
  background: #fff;
  color: #000;
  border-color: #000;
}

.square {
  border-radius: 5px
}
</style>
