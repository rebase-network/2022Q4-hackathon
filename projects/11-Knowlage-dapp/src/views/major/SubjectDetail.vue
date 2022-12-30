<template>
  <div>
    <b-carousel fade indicators>
      <b-carousel-slide :caption="subject.title" :img-src="subject.image">
      </b-carousel-slide>
    </b-carousel>
    <b-container fluid="xl" class="mt-5">
      <h1>Subject Description</h1>
      <p>{{ subject.description }}</p> <hr />
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="First" active>
          
        </b-tab>
        <b-tab title="Second">
          <b-form>
            <b-form-group id="input-group-1" label="学费代币:" label-for="input-1"
              description="用于交学费的代币" class="mt-3">
              <b-form-select id="input-1" class="form-select" v-model="form.tuitionToken" :options="tokens">
              </b-form-select>
            </b-form-group>

            <b-form-group id="input-group-2" label="课程结束时间:" label-for="input-2"
              description="于该时间结束后与授课老师结算费用" class="mt-3">
              <b-form-select id="input-2" class="form-select" v-model="form.endTime" :options="endTimes">
              </b-form-select>
            </b-form-group>

            <b-form-group id="input-group-3" label="结束后于多久开始免费:" label-for="input-3"
              description="课程结束后多久开启免费，无则永久付费" class="mt-3">
              <b-form-select id="input-3" class="form-select" v-model="form.freeTime" :options="freeTimes">
              </b-form-select>
            </b-form-group>

            <b-form-group id="input-group-4" label="参与报名人数:" label-for="input-4"
              description="如果为0则无参与上线，多少人都可以参与" class="mt-3">
              <b-form-select id="input-4" class="form-select" v-model="form.totalShares" :options="shares">
              </b-form-select>
            </b-form-group>

            <b-form-group id="input-group-5" label="学费单价:" label-for="input-5"
              description="后续所有参与者均交同等费用，如果为0则该课程不收取任何费用" class="mt-3">
              <b-form-input id="input-5" v-model="form.uintAmount" @change="calc()">
              </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-6" label="参与报名份数:" label-for="input-6"
              description="同一人可报名多份，为提高该提案热度" class="mt-3">
              <b-form-input id="input-6" v-model="form.joinShares" @change="calc()">
              </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-7" label="您的报名费用为:" label-for="input-7"
              description="单价 * 份数 = 实收报名费用" class="mt-3">
              <b-form-input id="input-7" v-model="form.real" disabled="disabled">
              </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-8" label="提案描述:" label-for="input-8"
              description="当前为简化功能，该为JSON的IPFS路径" class="mt-3">
              <b-form-input id="input-8" v-model="form.descriptionURI">
              </b-form-input>
            </b-form-group>

            <b-button variant="outline-success" class="mt-5" @click="connectWallet()">
              链接钱包
            </b-button>
            <b-button variant="outline-success" class="mt-5" @click="askNewSubject()">
              提交
            </b-button>
          </b-form>
        </b-tab>
      </b-tabs>
      <!-- <b-row cols="1" cols-sm="1" cols-md="3" cols-lg="4">
        <b-col v-for="s in subjectList" :key="s.subjectId">
          <router-link :to="'/subject?id=' + s.subjectId"
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
      </b-row> -->
    </b-container>
  </div>
</template>

<script src="./SubjectDetail.js"></script>