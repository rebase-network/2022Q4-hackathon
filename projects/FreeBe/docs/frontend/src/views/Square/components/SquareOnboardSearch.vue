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
      <div class="switch_detali_box">
        <FreeSwitch v-model:checked="checkedModel" />
        <p>Detail Mode</p>
      </div>
      <div class="dao_search_box">
        <SquareSearchBox />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.onbroad_about {
  min-width: 1280px;
  background-image: url('@/assets/images/background texture.svg');
  background-position: left;
  height: 200px;

  .onboard_main_text {
    font-family: HelveticaNeue;
    font-size: 32px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    display: inline-block;

    span {
      color: @cyan-primary-color;
    }
  }

  .onboard_vice_text {
    width: 600px;
    margin: 20px;
    font-family: HelveticaNeue;
    font-size: 32px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #292422;
    display: inline-block;

  }

  .switch_box {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .switch_detali_box {
      display: flex;

      p {
        margin-left: 20px;
        font-size: 20px;
        font-weight: 500;
      }
    }

  }
}
</style>
