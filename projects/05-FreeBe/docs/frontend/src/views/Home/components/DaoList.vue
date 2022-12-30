<template>
  <div v-for="item in data">
    <RouterLink to="/TheDao">
      <div class="card hoverShadow">
        <img :src="item.logo" class="logo">
        <div class="daoName">
          <span class="SeeDAO">
            SeeDAO
          </span>
          <!-- <img src="@/assets/svg/link.svg" class="link" /> -->
          <SvgIcon name="link" color="#000" />
        </div>
        <div class="line"></div>
        <div class="card_detail">
          <div class="detail">
            <!-- <img src="@/assets/svg/block-reward.svg" class="link" /> -->
            <SvgIcon name="reward" color="" />
            <span class="My-shares">
              My shares:
            </span>
            <span class="sharesValue">
              {{ item.myshare / 100 }}%
            </span>
          </div>
          <div class="detail">
            <!-- <img src="@/assets/svg/66.svg" class="link" /> -->
            <SvgIcon name="valuation" color="" />
            <span class="My-shares">
              Valuation:
            </span>
            <span class="text-style">
              ${{ item.Valuation }}
            </span>
          </div>
        </div>
      </div>
      <!-- <button><span>Withdraw</span></button> -->
    </RouterLink>
  </div>
</template>
  
<script setup lang="ts">
const props = defineProps(['data']);
</script>
  
<style scoped lang="less">
.text-style {
  font-weight: bold;
  margin-left: 5px;
}

.detail {
  display: flex;
  height: 24px;
  margin-top: 8px;
}

.My-shares {
  /* margin: auto 8px auto 8px; */
  font-family: HelveticaNeue;
  font-size: 16px;
  letter-spacing: 0.06px;
  color: #24262f;
}

.sharesValue {
  width: 59px;
  height: 24px;
  margin: 0 0 0 8px;
  font-family: HelveticaNeue;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: #0fbcc0;
}

button {
  width: 160px;
  height: 40px;
  margin: 32px 9px 0 10px;
  border-radius: 20px;
  border: solid 1px #060608;
}

button span {
  line-height: 40px;
  font-family: HelveticaNeue;
  font-size: 16px;
  text-align: center;
  color: #060608;
}

.daoName {
  display: flex;
}

.line {
  width: 40px;
  height: 2px;
  margin: 6px 41px 16px 1px;
  border-radius: 2px;
  background-color: #0c0c0e;
}

.SeeDAO {
  /* margin: 22px 8px 16px 1px; */
  font-family: HelveticaNeue;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.07px;
  color: #0c0c0e;
}

.logo {
  width: 80px;
  height: 80px;
  margin: 0 1px 22px;
  /* padding: 20px 15px 20px 14px; */
  border: solid 1px #f8f8f9;
  background-color: #fff;
}

.card_detail {
  margin-top: 20px;
}

.card {
  width: 240px;
  height: 280px;
  margin-right: 24px;
  padding: 0 31px 34px 30px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #e2e2e2;
  }
}
</style>
  