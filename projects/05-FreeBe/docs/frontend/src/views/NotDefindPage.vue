<template>
  <div id="ErrorPage" class="">
    <img class="mx-auto mt-40 min-w-44" src="@/assets/images/no_data_illustration_big.svg" alt="">
  </div>
</template>

<script setup lang="ts">
import message from "@/utils/messagePlugin"
message({ type: 'error', msg: "The current pa'k;nge has been taken away by UFO~" })
</script>
