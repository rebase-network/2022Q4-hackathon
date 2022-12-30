<template>
  <div class="box" v-for="item in avatarList">
    <img :src="item.avatar" />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps(['data']);

const avatarList = props.data.slice(0, 4)

// function switchtabIndex(index) {
//   console.log(index)
//   this.settabIndex(index)
// }
</script>
<style scoped>
.box {

  margin-bottom: 10px;
  margin-right: 1px;
  width: 18px;
  height: 24px;
  text-align: center;
  line-height: 24px;
}

.box img {

  display: inline-block;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 1px solid white;
  max-width: unset;
}
</style>
