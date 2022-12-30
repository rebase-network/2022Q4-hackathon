<template>
  <div class="nodata">
    <img src="@/assets/images/no_data_illustration_big.svg" class="no-data-img" />
  </div>
</template>
<script lang="ts" setup>
import message from "@/utils/messagePlugin";

const props = defineProps(['data']);
message({ type: "warn", msg: "Sorry~ The current page is not open" });
</script>
<style scoped>
.nodata {
  width: 50%;
}

.no-data-img {
  margin: 100px auto;
}
</style>
