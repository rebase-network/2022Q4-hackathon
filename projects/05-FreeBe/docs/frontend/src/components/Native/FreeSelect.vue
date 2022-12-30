<script setup lang="ts">
interface ISelectOptions {
  title: string,
  pkid: number
}
const emit = defineEmits<{ (e: "update:title", title: string): void }>();
const props = withDefaults(defineProps<{
  selectOptions: ISelectOptions[],
  defualt: string,
  size: "full" | "large",
  signal: boolean
}>(), {
  defualt: "Ethereum Mainnet",
  size: "large",
  signal: true
})

const target = ref();

const fillOption = ref(props.defualt)
let rotate = ref(false)
let showOptions = ref(false)

const openSelect = (option: boolean) => {
  if (option) {
    showOptions.value = true;
    rotate.value = true;
  } else {
    showOptions.value = false;
    rotate.value = false;
  }
}
const getValue = (title: string) => {
  fillOption.value = title;
  emit('update:title', title);
}

onMounted(() => {
  document.addEventListener("click", function (e) {
    if (e.target != target.value) {
      openSelect(false);
    }
  })
})
</script>

<template>
  <div class="it-select" :class="size">
    <div class="it-header" @click.stop="openSelect(true)">
      <span :class="[signal ? 'signal_point' : '']"></span>
      <span class="it-select-input">
        {{ fillOption }}</span>
      <span :class="['triangle-down', { rotate: rotate }]"></span>
    </div>
    <div ref="target" :class="[
      'it-select-options-panel',
      showOptions ? 'show' : 'hidden',
    ]">
      <p class="it-select-option" @click="getValue(item.title)" v-for="(item, index) in selectOptions" :key="index">
        <i :class="[signal ? 'signal_point' : '']"></i>
        {{ item.title }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="less">
.it-select {

  position: relative;

  .it-header {
    display: flex;
    align-items: center;
    padding: 20px;
  }
}

.full {
  width: 100%;
  height: 100%;
}

.large {
  width: 230px;
}

.it-select-input {
  height: 100%;
  line-height: 100%;
  text-align: center;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.triangle-down {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 6px solid rgba(201, 201, 201, 1);
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%) rotate(0deg);
  transition: transform 0.3s ease-in-out;
}

.rotate {
  transform: translateY(-50%) rotate(180deg);
}

.it-select-options-panel {
  position: absolute;
  width: 100%;
  top: calc(100% + 15px);
  left: 0;
  background: #ffffff;
  box-shadow: 0px 0px 15px rgba(32, 110, 242, 0.15);
  border-radius: 10px;
  max-height: 264px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 99;

  p {
    text-align: left;
  }
}

.it-select-option {
  padding: 0 22px;
  cursor: pointer;
  height: 44px;
  line-height: 44px;
  font-size: 18px;
  color: #333333;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.it-select-option.check {
  color: #206ef2;
  background: #f5f7fe;
}

.it-select-option:hover {
  background: #f5f7fe;
  color: #206ef2;
}

.show {
  display: block;
}

.hidden {
  display: none;
}

.it-select {
  border: 1px solid rgba(0, 22, 93, 0.2);
  box-shadow: none !important;
  border-radius: 10px;
}

.signal_point {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #2ab6af;
}
</style>
