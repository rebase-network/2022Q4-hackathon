<template>
  <b-container fluid="xl" class="mt-5">
    <b-row cols="1" cols-sm="1" cols-md="3" cols-lg="4">
      <b-col v-for="m in majorList" :key="m.majorId" class="mb-3">
        <router-link :to="'/subject?id=' + m.majorId"
          class="text-secondary" style="text-decoration:none;">
          <b-card :img-src="m.image" :title="m.title"
            img-alt="Image" img-top img-height="260" img-width="360">
            <b-card-text class="d-md-none">
              {{ m.description.substring(0, 50) }} ...
            </b-card-text>
            <b-card-text class="d-none d-md-block">
              {{ m.description.substring(0, 190) }} ...
            </b-card-text>
          </b-card>
        </router-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script src="./MajorList.js"></script>