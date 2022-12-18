<script setup lang="ts">
const props = defineProps<{ checked: boolean }>();

const emit = defineEmits<{ (e: "update:checked"): void }>();

const switchStyle = ref(props.checked);
const checkedModel = useVModel(props, "checked", emit);

// 监听外部布尔值的变化
watch(
  () => props.checked,
  () => {
    // 如果外部的布尔值变为真
    if (props.checked) {
      switchStyle.value = false;
    } else {
      switchStyle.value = true;
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div>
    <SvgIcon class="free_switch_box" @click="(checkedModel = !checkedModel)"
      :name="switchStyle ? 'switch_closed' : 'switch_open'" />
  </div>
</template>


<style scoped lang="less">
.free_switch_box {
  width: 60px;
  height: 30px;
}
</style>
