<script setup lang="ts">
const props = defineProps(["daoDatas"]);
</script>

<template>
  <div class="square_detail">
    <FreeWaterfall :list="daoDatas">
      <template #item="{ item }">
        <div class="item">
          <SquareDetailCard :daoData="item" />
        </div>
      </template>
    </FreeWaterfall>
  </div>
</template>


