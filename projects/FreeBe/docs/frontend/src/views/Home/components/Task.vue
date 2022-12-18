<template>
  <div class="task">
    <div class="nav">
      <div class="nav-item" :class="taskselected == '0' ? 'on' : ''" @click="taskselected = '0'">
        <span class="To-be-claimed">
          To be claimed
        </span>
        <div class="tag tobeclaimedcolor">
          <span class="textscale">
            12
          </span>
        </div>
      </div>
      <div class="nav-item " :class="taskselected == '1' ? 'on' : ''" @click="taskselected = '1'">
        <span class="To-be-claimed">
          Progressing
        </span>
        <div class="tag progressingcolor">
          <span class="textscale">
            12
          </span>
        </div>
      </div>
      <div class="nav-item " :class="taskselected == '2' ? 'on' : ''" @click="taskselected = '2'">
        <span class="To-be-claimed">
          Done
        </span>
        <div class="tag nocolor">
          <span class="textscale">
            12
          </span>
        </div>
      </div>
      <div class="nav-item " :class="taskselected == '3' ? 'on' : ''" @click="taskselected = '3'">
        <span class="To-be-claimed">
          Cancelled
        </span>
        <div class="tag nocolor">
          <span class="textscale">
            12
          </span>
        </div>
      </div>
    </div>
    <div class="taskList">
      <div class="SearchBox">
        <TaskList :data="data" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps(['data']);
const taskselected = ref('0');
</script>
<style scoped>
.taskList {
  margin-left: 80px;
}

.task {
  display: flex;
}

.textscale {
  font-family: PingFangSC;
  font-size: 10px;
  -ms-transform: scale(0.75);
  /* IE 9 */
  -moz-transform: scale(0.75);
  /* Firefox */
  -webkit-transform: scale(0.75);
  /* Safari 和 Chrome */
  -o-transform: scale(0.75);
  /* Opera */
  display: block;
  line-height: 16px;

}

.tobeclaimedcolor {
  border: solid 1px #ff7083;
  background-color: #ff7083;
  color: #f8f8f9;

}

.progressingcolor {
  border: solid 1px #0fbcc0;
  background-color: #0fbcc0;
  color: #f8f8f9;

}

.nocolor {
  border: solid 1px #060608;
  color: #292422;
}

.tag {
  width: 24px;
  height: 16px;
  /* padding: 1px 6px 1px 7px; */
  border-radius: 12px;
  text-align: center;
}

.on {
  /* border: solid 1px #f1f5f9; */
  background-color: #f1f5f9;
  font-weight: bold;
  border-right: 3px solid #060608 !important;
}

.To-be-claimed {
  width: 136px;
  height: 19px;
  font-family: HelveticaNeue;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #292422;

}


.nav-item {
  display: flex;
  width: 240px;
  height: 64px;
  padding: 24px 31px 22px 46px;
  border: solid 1px #f1f5f9;
  cursor: pointer;
}

.nav-item:first-child {
  margin-top: 32px;
}

.nav {
  width: 240px;
}
</style>
