<script setup lang="ts">
import type { Dao } from "@/types/Dao"
defineProps<{ daoData: Dao }>();

</script>

<template>
  <router-link to="/thedao">
    <div class="square_card" :style="{ backgroundColor: daoData.theme_color }">
      <div class="card_head">
        <img :src="daoData.dao_image" alt="">
      </div>
      <div class="card_body">
        <p class="dao_title">{{ daoData.dao_name }}</p>
        <span v-html="daoData.mission"></span>
      </div>
      <i class="split_unline"></i>
      <div class="card_foot">
        <div class="about_order">
          <div class="dao_valuation">
            <SvgIcon name="dollar" color="#fff" />
            <span>&nbsp; $ {{ daoData.total_valuation }} Total Valuation</span>
          </div>
          <i class="split_line"></i>
          <div class="dao_contributors">
            <SvgIcon name="people" color="#fff" />
            <span>&nbsp; {{ daoData.member_count }} Total Contributors</span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>



<style scoped lang="less">
.square_card {
  width: 280px;
  padding: 0 35px 32px 35px;
  margin-top: 10px;
  border-radius: 8px;
  background-color: @light-cyan-color;

  .card_head {
    width: 100px;
    height: 100px;
    background-color: @light-cyan-color;
  }

  .card_body {
    .dao_title {
      font-size: 20px;
      font-weight: 700;
      margin: 10px 0;
    }
  }

  .split_unline {
    width: 40px;
    height: 2px;
    margin: 5px 0;
    display: inline-block;
    background-color: black;
  }
}

a {
  // mix-blend-mode: hard-light;
  color: @light-bg-color;
  color: @dark-bg-color;
}
</style>
