<script lang="ts" setup>
const props = defineProps(['data']);
const checked = ref<boolean>(false);
function switchState(e: Event) {
  checked.value = !checked.value;
}

const visibleTask = ref<boolean>(false);
</script>

<template>
  <div class="SearchBox">
    <Search />
    <FreeBtn @click="() => { visibleTask = true }">Create Task</FreeBtn>
    <CreateTask v-model:visible="visibleTask" />
  </div>
  <div class="contributor_header">
    <span class="no">
      #
    </span>
    <div class="th_contributor">
      Name
    </div>
    <span class="id">
      Deadline
    </span>
    <span class="txt">
      Value
    </span>
    <span class="th_creator">
      Creater
    </span>
    <span class="txt">
      Action
    </span>
  </div>
  <div id="contributor" v-for="item in data" @click="switchState">
    <span class="no">
      {{ item.no }}
    </span>
    <span class="th_contributor">
      {{ item.name }}
    </span>
    <span class="id">
      {{ item.deadline }}
    </span>
    <span class="txt">
      {{ item.value }}
    </span>
    <div>
      <img :src="item.avatar" />
    </div>
    <span>
      {{ item.creator }}
    </span>
    <span> <img src="@/assets/icons/message_default.svg" class="message"></span>

  </div>
  <TaskProcess v-model:checked="checked" />
</template>

<style scoped>
.SearchBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.contributor_header {
  display: flex;
  padding: 0 53px 11px 20px;
  text-align: center;
}

.th_contributor {
  width: 250px;
  text-align: left;
}

.th_creator {
  width: 200px;
  text-align: left;
}

#contributor {
  width: 864px;
  height: 56px;
  padding: 16px 53px 16px 20px;
  border-radius: 8px;
  box-shadow: 1px 1px 1px 0 #dcd3e7, -2px -2px 4px 0 #fafbff;
  border: solid 1px rgba(255, 255, 255, 0.4);
  display: flex;
  text-align: center;
  margin-bottom: 8px;
  cursor: pointer;
}

#contributor:hover {
  border-radius: 8px;
  box-shadow: 1px 1px 1px 0 #dcd3e7, -2px -2px 4px 0 #fafbff;
  border: solid 1px rgba(255, 255, 255, 0.4);
  background-blend-mode: soft-light, normal;
  background-image: linear-gradient(274deg, #2c28d4, #fff 0%), linear-gradient(to bottom, #f1f5f9, #f1f5f9);
}

.message {
  width: 16px;
  height: 16px;
  margin: 4px 0 4px 12px;
  padding: 1px;
  object-fit: contain;
}

img {
  width: 24px;
  height: 24px;
  margin: 0 8px 0 0;
  object-fit: contain;
}

.name {
  width: 100px;
  height: 24px;
  font-family: HelveticaNeue;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #131415;
  text-align: left;
}

.no {
  width: 50px;
}

.th_id {
  width: 200px;
}

.id {
  width: 100px;
  height: 22px;
  font-family: HelveticaNeue;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  color: #131415;
}

.txt {
  width: 100px;
}
</style>
