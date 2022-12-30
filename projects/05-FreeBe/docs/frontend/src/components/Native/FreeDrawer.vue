<script setup lang="ts">
const props = withDefaults(
  defineProps<{ visible: boolean, direction: "left" | "right" }>(), {
  direction: "left"
})
const emit = defineEmits<{ (e: "update:visible"): void }>();
const visibleModel = useVModel(props, "visible", emit);

const target = ref<undefined | HTMLDivElement>();

function closeMaskHandle(e: Event) {
  if (e.target === target.value) return;

  visibleModel.value = false;
}

const caleClass = computed(() => {
  return ["drawer", { 'is-open': visibleModel.value, 'is-close': !visibleModel.value }]
})

</script>

<template>
  <div @click="closeMaskHandle" :class="caleClass" :style="['background-color', 'white' ]">
    <div class="drawer-content" :class="`content-${direction}`" ref="target">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);

  transition: opacity 200 ms;

  .drawer-content {
    padding: 100px;
    background-color: @light-cyan-color;

    position: absolute;
    transition: transform 300ms;
  }

  &.is-open {
    opacity: 1;
    height: 100%;

    .drawer-content {
      transform: translateX(0);
    }
  }

  &.is-close {
    opacity: 0;
    height: 0;
    transition-delay: 300ms;

    .drawer-content {
      transform: translateX(-100%);
    }
  }

}


.content-left {
  bottom: 0;
  left: 0;
  right: auto;
  top: 0;
}

.content-right {
  bottom: 0;
  left: auto;
  right: 0;
  top: 0;
}
</style>
