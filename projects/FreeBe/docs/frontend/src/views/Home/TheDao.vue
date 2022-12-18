<template>
  <div id="TheDao">
    <div class="dao_bg"></div>
    <div class="contains">
      <div class="contains-left">
        <div class="mydaos_logo">
          <img :src="mydao.logo" alt="log">
        </div>
        <div><span class="FreeBe-DAO">
            {{ mydao.name }}
          </span>
          <span class="FreeBe-is-a-DAO-to">
            {{ mydao.mission }}
          </span>
        </div>
        <div id="tab">
          <div class="tab" :class="tabIndex == '0' ? 'tabactive' : ''" @click="setTabIndex('0')">
            <!-- <SvgIcon name="basics" /> -->
            <img src="@/assets/icons/introduction-fill.svg" class="introduction-fill">
            <span>Basic</span>
          </div>
          <div class="tab" :class="tabIndex == '1' ? 'tabactive' : ''" @click="setTabIndex('1')">
            <img src="@/assets/icons/task.svg" class="introduction-fill">
            <!-- <SvgIcon name="tasks" /> -->
            <span>Task</span>
          </div>
          <div class="tab" :class="tabIndex == '2' ? 'tabactive' : ''" @click="setTabIndex('2')">
            <img src="@/assets/icons/vote.svg" class="introduction-fill">
            <!-- <SvgIcon name="votes" /> -->
            <span>Votes</span>
          </div>
        </div>


        <Contributor :data="contributorList" v-if="tabIndex == '0'" />
        <Task v-else-if="tabIndex == '1'" :data="taskList" />
        <Votes v-else />
      </div>
      <div class="contains-right" v-if="tabIndex == '0'">
        <div class="mydao-basics">
          <span class="free-bexyz">
            free-be.xyz/
            <span class="freebeings">
              freebeings
            </span>
          </span>
          <button class="button copy-button">
            <span class="copy-wrap"><span>Copy</span></span>
          </button>
        </div>
        <div class="Total">
          <div class="Total-Valuation">
            <span>
              Total Valuation
            </span>
            <span class="M20">
              <span class="text-style-1">$</span>20 M
            </span>
            <div class="lastweek">
              <span class="last-week">
                <span class="text-style-1">+8.3%</span>
                last week
              </span>
            </div>
          </div>
          <div class="Total-Valuation">
            <span>
              Total Contributors
            </span>
            <div class="Total-Contributors-2">
              <span class="M16">
                16
              </span>
              <div class="headers">
                <Headers :data="contributorList" />
              </div>

            </div>
            <span class="shares">
              {{ (totalShare / 100) }}% shares
            </span>
            <Process :data="totalShare" />
          </div>

        </div>
        <div class="curr">
          <div class="curr-row">
            <div class="curr-item">
              <span class="Current-Balance">
                Current Balance
              </span>
              <span class="Current-Balance-value">
                $ 5,650
              </span>
            </div>
            <div class="curr-item center">
              <div class="x630wa">
                <img src="/src/assets/images/metamask_medium.svg" />
              </div>
              <span class="MetaMask ">
                MetaMask
              </span>
            </div>

          </div>
          <div class="curr-address">
            <span>Address:</span>
            <span class="x97DB030">
              0x97D…B030
            </span>
            <SvgIcon name="copy" />
            <SvgIcon name="info" />
          </div>
        </div>
        <div class="Broadcast un_option">
          <img class="Broadcastimg" src="@/assets/images/no_date_illustration_medium.svg" />
          <span class="Broadcast-the-lastes">
            Broadcast the lastest news here.
          </span>
          <div class="BroadcastBtn">
            <span class="Broadcast-txt">
              + Broadcast
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/taskStore';
import router from '@/router';
import { useUserStore } from '@/stores/userStore';
const taskStore = useTaskStore();
const userStore = useUserStore();
const { profile } = storeToRefs(userStore);
// const { taskList } = storeToRefs(taskStore);

const mydao = {
  name: 'FreeBe Dao',
  // address: '0x9709a0C9D473813A741AEBbFD50b0c3aAD7f7aB3',
  address: false,
  mission: "#FreeBe is a #DAO tool that enables a sustainable incentive model for organizations.",
  logo: '/src/assets/images/avatar_1.png',
}
const tabIndex = ref('0');
function setTabIndex(index: string) {
  tabIndex.value = index;
}
const contributorList = [{
  no: 1,
  avatar: "/src/assets/images/2022-07-22-5-17-12@3x.png",
  id: "freebe-20221017-0001",
  name: "Zoeren",
  share: "0.71%",
  value: "$1000",
  credit: 9.8
}, {
  no: 2,
  avatar: "/src/assets/images/2022-07-22-5-17-12@3x.png",
  id: "freebe-20221017-0002",
  name: "Zoeren",
  share: "0.71%",
  value: "$1000",
  credit: 9.8
}, {
  no: 3,
  avatar: "/src/assets/images/2022-07-22-5-17-12@3x.png",
  id: "freebe-20221017-0001",
  name: "Zoeren",
  share: "0.71%",
  value: "$1000",
  credit: 9.8
}, {
  no: 4,
  avatar: "/src/assets/images/2022-07-22-5-17-12@3x.png",
  id: "freebe-20221017-0001",
  name: "Zoeren",
  share: "0.71%",
  value: "$1000",
  credit: 9.8
}, {
  no: 5,
  avatar: "/src/assets/images/2022-07-22-5-17-12@3x.png",
  id: "freebe-20221017-0001",
  name: "Zoeren",
  share: "0.71%",
  value: "$1000",
  credit: 9.8
}, {
  no: 6,
  avatar: "/src/assets/images/2022-07-22-5-17-12@3x.png",
  id: "freebe-20221017-0001",
  name: "Zoeren",
  share: "0.71%",
  value: "$1000",
  credit: 9.8
}]
const taskList = [{
  no: 1,
  avatar: "/src/assets/images/2022-07-22-5-17-12@3x.png",
  id: "freebe-20221017-0001",
  name: "  design landing page UI",
  deadline: "2022-12-27",
  value: "$1000",
  creator: "Zoeren"
}, {
  no: 1,
  avatar: "/src/assets/images/2022-07-22-5-17-12@3x.png",
  id: "freebe-20221017-0001",
  name: "  design landing page UI",
  deadline: "2022-12-27",
  value: "$1000",
  creator: "Zoeren"
}]
const totalShare = 3000
</script>

<style scoped lang="less">
.Broadcast {
  width: 320px;
  padding: 30px 67px 20px;
  height: 280px;
  border-radius: 8px;
  background-color: #f1f5f9;
}

.Broadcast-txt {
  font-family: HelveticaNeue;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 40px;
  letter-spacing: normal;
  text-align: center;
  color: #f8fafc;
  display: block;
}

.BroadcastBtn {
  width: 160px;
  height: 40px;
  margin: 32px 13px 0;
  border-radius: 20px;
  background-color: #060608;
}

.Broadcastimg {
  margin: auto;
  width: 100px;
}

.Broadcast-the-lastes {
  display: block;
  width: 186px;
  height: 38px;
  margin: 20px 0 32px;
  font-family: HelveticaNeue;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #292422;
}

.curr {
  width: 320px;
  height: 140px;
  margin: 16px auto;
  padding: 23px 37px 24px 47px;
  border-radius: 8px;
  background-color: #f1f5f9;
}

.copyaddress {
  display: unset;
  margin-left: 15px;
}

.curr-address {
  margin-top: 18px;
}

.x97DB030 {
  font-family: HelveticaNeue;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.05px;
  color: #24262f;
}

.center {
  text-align: center;
  align-items: center
}

.MetaMask {
  margin: 4px 0 0;
  font-family: HelveticaNeue;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.04px;
  color: #24262f;
}

.x630wa {
  width: 32px;
  height: 32px;
}

.curr-row {
  display: flex;
  flex-direction: row;
}

.curr-item {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.Current-Balance {

  margin: 0 0 4px;
  font-family: HelveticaNeue;
  font-size: 14px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.05px;
  color: #24262f;
}

.Current-Balance-value {

  margin: 4px 32px 0 0;
  font-family: HelveticaNeue;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: #24262f;
}

.last-week {
  font-family: HelveticaNeue;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 24px;
  letter-spacing: normal;
  color: #827d75;
}

.last-week .text-style-1 {
  font-size: 14px;
  font-weight: bold;
  color: #24262f;
}

.lastweek {
  margin: 25px 0 0;
  border-radius: 12px;
  background-color: #f1f5f9;
}

.shares {
  display: block;
  margin-top: 20px;
  font-family: HelveticaNeue;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2;
  letter-spacing: normal;
  color: #24262f
}

.Total-Contributors-2 {
  display: flex;
  margin-top: 8px;
  justify-content: space-around
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
  width: 864px;
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

  &:hover {
    cursor: pointer;
  }
}

.tabactive {
  opacity: 1;
  border-radius: 16px;
  background-color: #060608;
  color: #f7f7f9;
  /* filter: brightness(100); */
}

.tabactive img {
  width: 16px;
  height: 16px;
  margin: 2px 8px 1px 0;
  /* object-fit: contain; */
  /* filter: brightness(100); */
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
  width: 100%;
  height: 150px;
  // background: url('@/assets/images/backgroudRover.jpeg') no-repeat center/cover;
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
    border-radius: 40px;
  }
}
</style>
