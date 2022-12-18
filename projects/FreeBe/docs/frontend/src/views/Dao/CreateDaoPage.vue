<script setup lang="ts">
import type { Ref } from 'vue';
const hiddle: Ref<boolean> = ref(false);
const stateChanged = (newValue: boolean): void => {
  hiddle.value = newValue;
}
</script>

<template>
  <div id="CreateDao">
    <div class="left_bg ssm:max-md:hidden">
      <div class="w-20">
        <a href="/">
          <img src="@/assets/logos/light_logo.svg" width="150" alt="">
        </a>
      </div>

      <div class="freebe_about md:max-lg:hidden ssm:max-md:relative">
        <p class="head_icon_text">🖐~ </p>
        <span class="text-style-1">FreeBe</span> is a<span class="text-style-2">DAO tool</span> the <br />
        enables <br>
        a sustainable <br>
        incentive model for <br>
        organizations.
      </div>
    </div>
    <div class="right_form ssm:max-md:w-full">
      <div class="w-full h-16 flex justify-end pr-4 relative">
        <FreeAccount class="absolute right-0" />
      </div>
      <div class="py-0 p-52  py-auto w-[70rem] ssm:max-md:p-0 ssm:max-lg:w-full md:max-lg:w-full md:max-lg:p-8">
        <CreateDomain v-if="!hiddle" @onStateChanged="stateChanged" />
        <CreateDaoDetail v-else @onStateChanged="stateChanged" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
#CreateDao {
  height: 100vh;
  display: flex;

  .left_bg {
    width: 40%;
    height: 100%;
    background-image: url('../../assets/images/backgroud.jpeg');
    background-size: cover;
    position: relative;

    .freebe_about {
      background-color: #0fbcc0;
      padding: 50px;
      width: 30rem;
      height: 35.25rem;
      font-family: HelveticaNeue;
      font-size: 40px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.4;
      letter-spacing: 0.15px;
      color: #f6f6f6;
      position: absolute;
      top: 12.5rem;
      right: -5rem;
      line-height: 3.4rem;


      span {
        display: inline-block;
      }

      .head_icon_text {
        width: 100px;
        height: 48px;
        margin: 0 309px 23px 0;
        font-family: HelveticaNeue;
        font-size: 40px;
        font-weight: 300;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: 0.15px;
        color: #f6f6f6;
      }

      .text-style-1,
      .text-style-2 {
        font-weight: 500;
        padding-left: 10px;
      }

      .text-style-1 {
        width: 167px;
        height: 56px;
        background-color: #ff7083;
      }

      .text-style-2 {
        width: 197px;
        height: 56px;
        background-color: #f2d943;
      }
    }


  }

  .right_form {
    padding: 20px;
    position: relative;
  }

}
</style>
