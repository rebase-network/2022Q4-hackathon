<script setup lang="ts">
const props = defineProps<{ checked: boolean }>();
const emit = defineEmits<{ (e: "update:checked"): void }>();
const checkedModel = useVModel(props, "checked", emit);

</script>

<template>
  <div class="onbroad_about">
    <p class="onboard_main_text"> <span>Onboard</span>ing</p>
    <p class="onboard_vice_text">fabulous DAOs throughout the world!</p>

    <div class="switch_box">
      <FreeSwitch v-model:checked="checkedModel" />
      <p>Detail Mode</p>
    </div>
  </div>
</template>

<style scoped lang="less">
.onbroad_about {
  background-image: url('@/assets/images/background texture.svg');
  padding: 2rem 0px 0px 7rem;

  .onboard_main_text {
    font-family: HelveticaNeue;
    font-size: 64px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;

    span {
      color: @cyan-primary-color;
    }
  }

  .onboard_vice_text {
    width: 600px;
    margin: 25px 0;
    font-family: HelveticaNeue;
    font-size: 32px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #292422;

  }

  .switch_box {
    display: flex;
    justify-content: flex-start;

    p {
      margin-left: 20px;
      font-size: 20px;
      font-weight: 500;
    }
  }
}
</style>
