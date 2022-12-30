<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
const { profile } = storeToRefs(userStore);

const mydaoList = [{
  name: "SeeDao",
  logo: '/src/assets/images/avatar_1.png',
  myshare: 2,
  Valuation: 100

}, {
  name: "SeeDao",
  logo: '/src/assets/images/avatar_1.png',
  myshare: 2,
  Valuation: 100

}, {
  name: "SeeDao",
  logo: '/src/assets/images/avatar_1.png',
  myshare: 2,
  Valuation: 100

}, {
  name: "SeeDao",
  logo: '/src/assets/images/avatar_1.png',
  myshare: 2,
  Valuation: 100

}]
const tabIndex = ref('0');

function setTabIndex(index: string) {
  tabIndex.value = index;
}

</script>

<template>
  <div id="Mydaos">
    <div class="dao_bg"></div>
    <div class="contains">
      <div class="contains-left">
        <div class="mydaos_logo">
          <img :src="profile.result.head_image" alt="log">
        </div>
        <div>
          <span class="FreeBe-DAO">
            {{ (profile.result.wallet_address!).slice(0, 10) }}
          </span>
          <span class="FreeBe-is-a-DAO-to">
          </span>
        </div>
        <div id="tab">
          <div class="tab" :class="tabIndex == '0' ? 'tabactive' : ''" @click="setTabIndex('0')">
            <!-- <SvgIcon name="network" class="avg_tab" /> -->
            <img src="@/assets/icons/network.svg">
            <span>My DAOs</span>
          </div>
          <div class="tab" :class="tabIndex == '1' ? 'tabactive' : ''" @click="setTabIndex('1')">
            <!-- <SvgIcon name="time" class="avg_tab" /> -->
            <img src="@/assets/icons/time.svg">
            <span>History</span>
          </div>
        </div>
        <div class="Daolist">
          <DaoList :data="mydaoList" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.Daolist {
  display: flex;
  margin-top: 32px;
}

.headers {
  width: 72px;
  height: 24px;
  display: flex;

}

.M16 {
  font-family: HelveticaNeue;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #24262f;
}

.introduction-fill {
  margin-right: 9px;
  /* filter: brightness(100); */
}

.avg_tab {
  margin-right: 5px;
}

.M20 {
  width: 91px;
  height: 32px;
  margin: 8px 11px 25px;
  font-family: HelveticaNeue;
  font-size: 32px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #24262f;
  display: block;
}

.M20 .text-style-1 {
  font-size: 16px;
}

.Total {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.Total-Valuation {
  width: 152px;
  height: 160px;
  padding: 28px 18px;
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
  font-family: HelveticaNeue;
  font-size: 14px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.05px;
  color: #24262f;
  word-break: break-all;
}

.freebeings {
  font-family: HelveticaNeue;
  font-size: 14px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 48px;
  letter-spacing: 0.05px;
  color: #24262f;
}

.free-bexyz {
  font-family: HelveticaNeue;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 48px;
  letter-spacing: normal;
  color: #292422;
}

.contains-left {
  margin: 0 auto;
}

.copy-wrap {
  width: 80px;
  height: 48px;
  margin: 0 0 0 60px;
  padding: 15px 20px 15px 21px;
  border-radius: 24px;
  background-color: #060608;
  color: #f8fafc;
}

.contains-right {
  margin: 110px 0 0 96px;
  width: 320px;
  display: block;
}

.mydao-basics {
  width: 320px;
  height: 48px;
  border-radius: 24px;
  border: solid 1px #e2e8f0;
  background-color: #fff;
  padding-left: 24px;
  display: flex;
  position: relative;
  align-items: center;
}

input::placeholder {
  color: #c5cbd2;
}

input:focus-visible {
  outline: 0;
}

.copy-button {
  right: 0;
  position: absolute;

}

.search {

  display: inline-block;

}

#tab {
  margin-top: 48px;
  display: flex;
}

.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 32px;
  margin-right: 15px;
  opacity: 0.5;
  font-family: HelveticaNeue;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.06px;
  color: #131415;
  cursor: pointer;
}

.tabactive {
  opacity: 1;
  border-radius: 16px;
  background-color: #060608;
  color: #f7f7f9;

}

.tabactive img {
  width: 16px;
  height: 16px;
  margin: 2px 8px 1px 0;
  /* object-fit: contain; */
  filter: brightness(100);
}

.FreeBe-is-a-DAO-to {
  height: 18px;
  margin: 9px 0 0;
  font-family: HelveticaNeue;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #9f9fad;
}

.FreeBe-DAO {
  display: block;
  height: 28px;
  margin: 24px auto;
  font-family: HelveticaNeue;
  font-size: 24px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.09px;
  color: #060608;
}

.FreeBe-DAO .text-style-1 {
  font-weight: 300;
}

.dao_bg {
  width: 100vw;
  height: 150px;
  /* background: url('@/assets/images/backgroudRover.jpeg') no-repeat center/cover; */
  background: url('@/assets/images/backgroudRover.jpeg');
}

.contains {
  margin: -40px auto;
  width: 1280px;
  display: flex;
}

.mydaos_logo {
  width: 80px;
  height: 80px;
  border-radius: inherit;
  // border-radius: 40px;

  img {
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }
}
</style>
