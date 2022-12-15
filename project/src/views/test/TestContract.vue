<template>
  <b-container fluid="xl" class="mt-5">
    <b-form>
      <b-form-group id="input-group-1" label="Open Major:" label-for="input-1">
        <b-input-group>
          <b-form-input id="input-1" v-model="form.majorURI"
            placeholder="Input Uniform Resource Identifier (URI) for major." required>
          </b-form-input>
          <b-input-group-append>
          <b-button variant="outline-success" @click="openMajor()">New Major</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-group id="input-group-2" label="Major ID:" label-for="input-2"
        description="Bytes32 ID of the new major." class="mt-3">
        <b-form-input id="input-2" v-model="form.majorID">
        </b-form-input>
      </b-form-group>

      <hr />

      <b-form-group id="input-group-3" label="Add Subject For Major:" label-for="input-3">
        <b-input-group>
          <b-form-input id="input-3" v-model="form.subjectURI"
            placeholder="Input Uniform Resource Identifier (URI) for subject." required>
          </b-form-input>
          <b-input-group-append>
          <b-button variant="outline-success" @click="addSubjectForMajor()">Add Subject</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>

      <b-form-group id="input-group-4" label="Subject Address:" label-for="input-4"
        description="Address of the new subject." class="mt-3">
        <b-form-input id="input-4" v-model="form.subjectAddr">
        </b-form-input>
      </b-form-group>

      <b-button  variant="outline-success" class="mt-5" @click="connectWallet()">
        Connect Wallet
      </b-button>
    </b-form>
  </b-container>
</template>
<script src="./TestContract.js"></script>