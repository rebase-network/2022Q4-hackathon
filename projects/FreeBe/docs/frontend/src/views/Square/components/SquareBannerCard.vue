<script setup lang="ts">
import type { Dao } from "@/types/Dao"
defineProps<{ daoData: Dao[] }>()
</script>

<template>
  <div v-for="item in daoData" :key="item.dao_id">
    <router-link to="/thedao" class="marquee-item" :style="{ backgroundColor: item.theme_color }">
      <!-- <div class="dao_image" :style="{ backgroundImage: `url(${item.dao_image})` }">
      </div> -->
      <img :src="item.dao_image" class="dao_image">
      <div class="dao_contant">
        <h2>{{ item.dao_name }}</h2> <span class="inver_text">DAO</span>
        <div class="about_order">
          <div class="dao_valuation">
            <SvgIcon name="dollar" color="#fff" />
            <span>&nbsp; $ {{ item.total_valuation }} Total Valuation</span>
          </div>
          <i class="split_line"></i>
          <div class="dao_contributors">
            <SvgIcon name="people" color="#fff" />
            <span>&nbsp; {{ item.member_count }} Total Contributors</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped lang="less">
.marquee-item {
  width: 600px;
  height: 160px;
  margin: 10px;
  border-radius: 100px;
  white-space: nowrap;
  animation: marquee 5s linear infinite;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  padding: 0 40px;

  .dao_image {
    width: 100px;
    height: 100px;
    margin: 0 30px 0 0;
    border-radius: inherit;
    background-color: #fff;
  }


  .dao_contant {
    line-height: 45px;

    h2 {
      font-size: 2rem;
      display: inline-block;
    }

    .inver_text {
      font-size: 2rem;
      font-weight: 200;
      color: rgba(255, 255, 255, 0.829);
    }

    .about_order {
      display: flex;
      font-size: 14px;

      .split_line {
        display: inline-block;
        width: 1px;
        height: 20px;
        margin: 12px 10px 0px;
        background-color: #e6e6e7;
      }
    }
  }
}
</style>


