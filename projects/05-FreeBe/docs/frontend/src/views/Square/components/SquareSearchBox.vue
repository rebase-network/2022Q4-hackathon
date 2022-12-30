<script setup lang="ts">
// search logic - 后续切分组件
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();
const btnVisibility = ref<boolean>(!userStore.profile.result.wallet_address);
</script>

<template>
  <div class="dao-search">
    <input class="search_input_box" type="text" placeholder="Search DAO name">
    <FreeBtn to="/createdao" v-if="!btnVisibility" style="min-width: 180px; height: 40px; line-height: 40px;"
      size="adaptive"> + Create DAO
    </FreeBtn>
  </div>
</template>

<style scoped lang="less">
.dao-search {
  height: 40px;
  border-radius: 24px;
  display: flex;


  .search_input_box {
    width: 100%;
    min-width: 400px;
    height: 40px;
    border-radius: inherit;
    outline-style: none;
    border: 1px solid #ccc;
    padding: 13px 20px;
    font-size: 14px;
    font-weight: 700;
    border: solid 1px #292422;
    font-family: "Microsoft soft";
    margin-right: 20px;

    &:focus {
      border-color: @cyan-primary-color;
      outline: 0;
      // box-shadow: inset 0 2px 2px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
    }
  }
}
</style>
