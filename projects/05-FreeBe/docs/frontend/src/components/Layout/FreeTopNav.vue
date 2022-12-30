<script setup lang="ts">
const navigation = [
  { name: 'DAO Square', path: '/', current: true },
  { name: 'MyDAOs', path: '/mydaos', current: false },
  // { name: 'Notifications', path: '/notifications', current: false },
  // { name: 'Create', path: '/createdao', current: false },
]

const navActive = ref(0);

function checkoutNav(index: number) {
  navActive.value = index;
}
</script>


<template>
  <nav class="app-top-nav">
    <div class="navbar_box">
      <RouterLink to="/">
        <div class="logo-box">
          <img src="@/assets/logos/Freebe_logo.svg" alt="">
        </div>
      </RouterLink>
      <i class="split_line"></i>
      <ul>
        <router-link class="nav_li" v-for="item in navigation" :to="item.path">
          {{ item.name }}
        </router-link>
      </ul>
    </div>
    <div class="account">
      <FreeAccount />
    </div>
  </nav>
</template>

<style scoped lang="less">
.app-top-nav {
  // background: #cdcdcd;
  width: 100%;
  height: 75px;
  border-bottom: solid 2px rgba(206, 206, 206, 0.4);
  background-color: @light-cyan-color;
  background-blend-mode: soft-light, normal;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  position: fixed;
  z-index: 9999;
  top: 0;
  background-color: @light-bg-color;

  .navbar_box {
    display: flex;
    align-items: center;

    .logo-box {
      display: inline-block;
      text-align: center;
      padding: 0 3rem 0 1.875rem;
      width: 180px;
      height: 80px;

      img {
        margin: auto;
        padding-top: 13px;
      }
    }

    i {
      display: inline-block;
      width: 2px;
      height: 25px;
      background-color: #e6e6e7;
    }

    ul {
      display: flex;
      height: 53px;
      align-items: center;

      .nav_li {
        width: 150px;
        text-align: center;
        padding: 0 15px;
        margin-right: 5px;
        color: #71718a;
        line-height: 1;
        display: inline-block;
        font-weight: 700;

        &:hover {
          color: @cyan-primary-color;
        }
      }
    }
  }
}
</style>
