<template>
  <b-container fluid="xl" class="mt-3">
    <!-- <b-alert show variant="danger" v-show="account.connected == false">
      {{ $t('GLOBAL.LOGIN') }}
    </b-alert> -->
    <b-row cols-dm="1" cols-lg="2">
      <!-- User Center Left Detail Start -->
      <b-col md="12" lg="3" class="mb-3">
        <b-card no-body class="text-center">
          <b-card-body>
            <b-avatar size="10rem" src="https://placekitten.com/300/300"></b-avatar>
            <hr /> <b-card-title>Vitalik</b-card-title>
            <b-card-text>Addr(0xIeE3OcEx....Ie93)</b-card-text>
          </b-card-body>

          <b-row sm="6" md="6" lg="6">
            <b-col><strong>1.3W</strong> Following</b-col>
            <b-col><strong>1.3W</strong> Followers</b-col>
          </b-row> <hr />
          <b-table :fields="fields" :items="balances" fixed class="mb-5">
            <template #cell(icon)="row">
              <b-avatar size="28px" :src="'https://bscscan.com/token/images/' + row.item.icon">
              </b-avatar>
              {{ row.item.symbol }}
            </template>

            <template #cell(balance)="row">
              <span class="text-success">
                {{ parseFloat(row.item.balance).toFixed(10) }}
              </span>
              <b-icon class="btn mb-2" icon="arrow-repeat" @click="initialization()"></b-icon>
            </template>
          </b-table>
        </b-card>
      </b-col>
      <!-- User Center Left Detail End -->

      <!-- User Center Right Bar Start -->
      <b-col md="12" lg="9">
        <!-- User Recommend Start -->
        <b-card :header="$t('USER.RECOMMEND')" no-body>
          <b-card-body>
            <b-card-title>{{ $t('USER.REC_TITLE') }}</b-card-title>
            <b-card-text>{{ $t('USER.REC_CONTENT') }}</b-card-text>
          </b-card-body>

          <b-form class="p-3">
            <!-- Gamb Token Reward Start -->
            <!-- <h5>{{ $t('USER.GAMB') }}</h5> <hr />
            <b-row cols-md="1" cols-lg="2">
              <b-col lg="6" class="mb-3">
                <b-form-group id="input-group-1" :label="$t('USER.TOTAL_REWARD')" label-for="input-1" >
                  <b-form-input id="input-1" v-model="account.totalClaimed" disabled ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6" class="mb-3">
                <b-form-group id="input-group-1" :label="$t('USER.NOW_REWARD')" label-for="input-1"
                  :description="$t('USER.REWARD_DESC')">
                  <b-input-group>
                    <b-form-input id="input-1" v-model="account.notClaimed" disabled ></b-form-input>
                    <b-input-group-append>
                      <b-button variant="outline-success" @click="claimInviterGambReward()"
                        v-if="account.gambDisabled" :disabled="account.connected == false">
                        {{ $t('USER.REW_CLAIM') }}
                      </b-button>
                      <b-button variant="outline-success" v-else disabled>
                        <b-spinner type="grow" small></b-spinner>
                        {{ $t('USER.REW_CLAIM') }} ...
                      </b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row> -->
            <!-- Gamb Token Reward End -->
          </b-form>
        </b-card>
        <!-- User Recommend End -->
      </b-col>
      <!-- User Center Right Bar End -->
    </b-row>
  </b-container>
</template>

<script src="./UserProfile.js"></script>