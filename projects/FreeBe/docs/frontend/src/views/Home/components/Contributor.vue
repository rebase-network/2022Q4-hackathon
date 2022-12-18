<script lang="ts" setup>
const props = defineProps(['data']);
</script>

<template>
  <div class="SearchBox">
    <Search />
  </div>
  <div class="contributor_header">
    <span class="no">
      #
    </span>
    <div class="th_contributor">
      Contributor
    </div>
    <span class="th_id">
      ID
    </span>
    <span class="txt">
      Shares
    </span>
    <span class="txt">
      Value
    </span>
    <span class="txt">
      Credit
    </span>
  </div>
  <div id="contributor" v-for="item in data" @click="">
    <span class="no">
      {{ item.no }}
    </span>
    <div>
      <img :src="item.avatar" />
    </div>
    <span class="name">
      {{ item.name }}
    </span>
    <span class="id">
      {{ item.id }}
    </span>
    <span class="txt">
      {{ item.share }}
    </span>
    <span class="txt">
      {{ item.value }}
    </span>
    <span class="txt">
      {{ item.credit }}
    </span>
    <span> <img src="@/assets/icons/message_default.svg" class="message"></span>

  </div>
</template>

<style scoped>
.SearchBox {
  width: 400px;
}

.contributor_header {
  display: flex;
  padding: 0 53px 11px 37px;
  text-align: center;
}

.th_contributor {
  width: 132px;
  text-align: left;
}

#contributor {
  width: 864px;
  height: 56px;
  padding: 16px 53px 16px 37px;
  border-radius: 8px;
  box-shadow: 1px 1px 1px 0 #dcd3e7, -2px -2px 4px 0 #fafbff;
  border: solid 1px rgba(255, 255, 255, 0.4);
  display: flex;
  text-align: center;
  margin-bottom: 8px;
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
  margin: 4px 0 4px 72px;
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
  width: 78px;
}

.th_id {
  width: 200px;
}

.id {
  width: 200px;
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
