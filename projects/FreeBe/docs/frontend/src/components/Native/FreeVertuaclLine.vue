<template>
  <div class="progress-bar">
    <div class="progress-bar-inner" :style="{ height: progressHeight + '%' }">
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProgressBar',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  computed: {
    progressHeight() {
      return (this.value / 100) * 100;
    }
  }
});
</script>

<style lang="less" scoped>
.progress-bar {
  width: 10px;
  height: 100%;
  background-color: #ddd;

  .progress-bar-inner {
    width: 100%;
    background-color: #999;
    transition: height 0.2s;

    @progress-height: 50%;
  }
}
</style>
