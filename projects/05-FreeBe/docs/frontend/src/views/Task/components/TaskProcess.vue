<script setup lang="ts">
import message from "@/utils/messagePlugin";
const props = defineProps<{ checked: boolean }>();
const emit = defineEmits<{ (e: "update:checked"): void }>();
const checkedModel = useVModel(props, "checked", emit);
// import { useDaoStore } from "@/stores/daoStore";
// const daoStore = useDaoStore();
// daoStore.getDaoList({
//   action: 1,
//   index: 1,
//   wallet_address: '0x2222'
// })
</script>

<template>
  <div class="task_process_main">
    <FreeDrawer v-model:visible="checkedModel" direction="left">
      <!-- <FreeVertuaclLine :value="10"></FreeVertuaclLine> -->
      <div class="task_detail_box">
        <h1 style="font-size: 1.5rem; font-weight: 500; margin-bottom: 1.5rem;">Status</h1>
        <li class="task_detail_time_process">
          <div class="task_point_box">
            <p class="task_point"></p>
            <p class="task_point_line"></p>
          </div>
          <div>
            <div class="task_people_datail" style="display: flex; align-items: center;">
              <strong style="font-size: 1.2rem;">Created by</strong>
              <router-link to="#">
                <img src="@/assets/images/avatar_1.png" class="task_avater_img">
                <span style="margin-right: 10px; color: black;">Zoeren</span>
              </router-link>
              <!-- <SvgIcon name="message_fill" /> -->
            </div>
            <p class="task_item_time">2022-12-13 2:33</p>
          </div>
        </li>
      </div>
      <FreeBtn size="full">Claim</FreeBtn>
    </FreeDrawer>
  </div>
</template>


<style lang="less" scoped>
.task_process_main {
  padding-top: 100px;

  .task_detail_box {
    margin: 200px 0 100px;

    .task_detail_time_process {
      display: flex;
      margin-bottom: 40px;

      .task_people_datail {
        .task_avater_img {
          width: 1.5rem;
          border-radius: 50%;
          margin: 0 5px 0 10px;
          display: inline-block;
        }
      }

      .task_item_time {
        margin-top: 5px;
        font-size: 14px;
      }
    }


    .task_point_box {
      position: relative;

      .task_point {
        width: 20px;
        height: 20px;
        margin: 3px 16px 5px 0;
        border-radius: 50%;
        border: solid 5px #abe7ef;
        background-color: #0fbcc0;
        position: relative;
        z-index: 22;
      }

      .task_point_line {
        height: 100px;
        width: 1px;
        background-color: #0fbcc0;
        position: absolute;
        top: 5px;
        left: 9px;
      }
    }
  }
}
</style>
