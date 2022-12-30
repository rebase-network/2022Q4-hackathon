<template>
  <div class="background">
    <div class="percent" :style="'width:' + data / 100 + '%'"></div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps(['data']);
</script>
<style scoped>
.background {
  width: 120px;
  height: 8px;
  border-radius: 12px;
  background-color: #f1f5f9;
}

.percent {
  height: 8px;
  border-radius: 12px;
  background-color: #060608;
}
</style>
