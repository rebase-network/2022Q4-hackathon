<script setup lang="ts">
import { daoData } from '@/mocks/dao';
import calculate from '@/vendors/calculate';
import hrefTranstion from "@/vendors/href";
import { useDaoStore } from "@/stores/daoStore"

const daoStore = useDaoStore();
daoStore.getDaoList({
  action: 1,
  index: 0,
  wallet_address: "123"
});

const { daoList } = storeToRefs(daoStore);

const daoDatas = computed(() => {
  return daoData.map(item => ({
    ...item,
    mission: hrefTranstion(item.mission),
    total_valuation: calculate(item.total_valuation)
  }));
})


const checked = ref<boolean>(false);
function switchState(e: Event) {
  checked.value = !checked.value;
}

</script>

<template>
  <div class="square_box" @scroll="switchState($event)">
    <transition name="slide-fade">
      <div class="about_square_box row" v-if="!checked">
        <div class="about_square">
          <SquareOnboard class="col" v-model:checked="checked" />
          <SquareSearchBox class="col" style="padding: 100px 100px 200px" />
        </div>
        <SquareBanner :dao-datas="daoDatas" />
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="detail_square_box" v-if="checked">
        <SquareOnboardSearch class="col" v-model:checked="checked" style="padding: 30px 140px 100px" />
        <SquareDetail :dao-datas="daoDatas" />
      </div>
    </transition>
  </div>
</template>

<style scoped lang="less">
.square_box {
  width: 100%;
  margin-top: 40px;


  .about_square {
    // width: 100%;
    height: 320px;
    padding: 50px 120px 0;
    display: flex;
  }

  .detail_square_box {
    margin: 50px 120px 0;
  }
}

/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(150px);
  opacity: 0;
}
</style>
