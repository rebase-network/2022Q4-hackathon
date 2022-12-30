<script setup lang="ts">
const drawerVisible = ref(true);
function closeDrawerHandle() {
  drawerVisible.value = false;
}
</script>

<template>
  <div class="task_process_main">
    <FreeDrawer v-model:visible="drawerVisible" direction="right">
      <div class="task_nav_title">
        <div class="task_close_btn" @click="closeDrawerHandle">
          <SvgIcon name="dropdown-line" />
        </div>

        <p>{{ `Design landing page UI` }}</p>
      </div>
      <div class="task_detail_box">
        <div class="task_header_value">
          <div class="task_shares">
            <SvgIcon name="reward" class="value_svg" />
            <span>Reward shares: <i>5%{{}}</i></span>
          </div>
          <div class="task_valuation">
            <SvgIcon name="valuation" class="value_svg" />
            <span>Valuation: ${{ }}</span>
          </div>
        </div>
        <div class="task_body">
          <h3>Description</h3>
          <div class="task_objtive">
            <p class="task_option_title">Objective{{ }}</p>
            <span v-html="`The key value of DAO is creation, and creation is built upon trust of organizational consensus and vision.
            The culture in FreeBe is to trust first unless someone is actively against another. Tamper proof is just a
            afterwards protection, not the reason why people collaborate together at the first place. FreeBe needs to
            design a landing page to collect pilot users.
            https://www.notion.so/free-be/Free-be-xyz-e47ae384b5ab4f2bad3ad9001dd1e8b3`"></span>
          </div>
          <div class="task_key_results">
            <p class="task_option_title">Key Results{{ }}</p>
            <span>Deploy it on free-be.xyz.</span>
          </div>
          <div class="task_deadline">
            <p class="task_option_title">Deadline{{ }}</p>
            <span>2022-12-27</span>
          </div>
        </div>
        <div class="task_status">
          <h3>Status</h3>
        </div>
        <div class="task_footer">
          <FreeBtn size="large">Claim</FreeBtn>
          <a href="javascript:;">
            <p>Next task &nbsp; &nbsp;-> </p>
          </a>
        </div>
      </div>
    </FreeDrawer>
  </div>
</template>


<style lang="less" scoped>
.task_nav_title {
  width: 100%;
  padding: 16px 45px;
  line-height: 35px;
  text-align: center;
  display: flex;
  justify-content: flex-start;

  position: absolute;
  right: 0;
  top: 20px;

  .task_close_btn {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #f1f5f9;
    margin-right: 20px;
    transform: rotate(-90deg);
  }

  p {
    font-size: 20px;
    font-weight: 600;
  }
}

.task_detail_box {
  width: 500px;
  height: 100%;
  margin-top: 30px;
  background-blend-mode: soft-light, normal;

  h3 {
    font-size: 18px;
    font-weight: 700;
    margin: 20px 0;
  }

  .task_header_value {
    width: 100%;
    padding: 16px 45px;
    border-radius: 8px;
    border: solid 2px #0fbcc0;
    background-color: #f1f5f9;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    margin-bottom: 40px;

    .value_svg {
      margin-right: 10px;
    }

    i {
      color: #0fbcc0;
      font-weight: 500;
    }
  }

  .task_body {

    .task_option_title {
      font-family: HelveticaNeue;
      font-size: 14px;
      font-weight: 700;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.57;
      letter-spacing: normal;
      color: #9696ac;
      margin-bottom: 10px;
    }

    &>div {
      margin: 30px 0;
    }
  }

  .task_footer {
    display: flex;
    justify-items: center;
    justify-content: space-between;
    line-height: 50px;
    margin-top: 100px;

    p {
      color: black;
      font-weight: 700;
    }
  }

}
</style>
