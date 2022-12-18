<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" ref="svg_target" />
  </svg>
</template>

<script setup lang="ts">
const svg_target = ref();
const props = withDefaults(defineProps<{
  name: string
  prefix?: string;
  color?: string;
}>(), {
  prefix: 'icon',
  color: 'red',
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="less" scoped>
.svg-icon {
  width: 1.2em;
  height: 1.2em;
  overflow: hidden;
  display: inline-block;
  fill: currentColor;

}
</style>
