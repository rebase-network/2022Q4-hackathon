<template>
  <div id="app">
    <router-view name="navbar"></router-view>
    <router-view class="mb-1"></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  // async mounted() {
  //   console.log(3456)
  //   this.$root.networkId = await this.$root.web3.eth.getChainId()
  //   this.$root.accounts = ['0x237B4410dd37ED064FeBFa170B3243960F0437B3']
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
