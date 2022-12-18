<template>
  <div class="searchbox">
    <input class="search" placeholder="Search name of contributor" />
    <button class="button search-button">
      <span class="button-wrap"><span class="icon icon-search "></span></span>
    </button>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps(['data']);
</script>
<style scoped>
.searchbox {
  display: flex;
  position: relative;
  height: 40px;
  margin: 32px auto 24px 0;
  padding: 9px 17px 9px 30px;
  border-radius: 24px;
  border: solid 2px #e2e8f0;
}

.icon-search {
  width: 18px;
  height: 18px;
  object-fit: contain;
  background: url('/src/assets/icons/search.svg');
}

.button-wrap {
  align-items: center;
  display: flex;
  gap: 0.25rem;
  justify-content: center;
  position: relative;
}

.search-button {
  right: 1.2rem;
  position: absolute;

}
</style>
