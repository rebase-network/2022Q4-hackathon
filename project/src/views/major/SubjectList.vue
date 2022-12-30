<template>
  <div>
    <b-carousel fade indicators>
      <b-carousel-slide :caption="major.title" :img-src="major.image">
      </b-carousel-slide>
    </b-carousel>
    <b-container fluid="xl" class="mt-5">
      <h1>Major Description</h1>
      <p>{{ major.description }}</p><hr />
      <b-row cols="1" cols-sm="1" cols-md="3" cols-lg="4">
        <b-col v-for="s in subjectList" :key="s.subjectAddr" class="mb-3">
          <router-link :to="'/subdetail?addr=' + s.subjectAddr"
            class="text-secondary" style="text-decoration:none;">
            <b-card :img-src="s.image" :title="s.title"
              img-alt="Image" img-top img-height="260" img-width="360">
              <b-card-text class="d-md-none">
                {{ s.description.substring(0, 50) }} ...
              </b-card-text>
              <b-card-text class="d-none d-md-block">
                {{ s.description.substring(0, 190) }} ...
              </b-card-text>
            </b-card>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script src="./SubjectList.js"></script>