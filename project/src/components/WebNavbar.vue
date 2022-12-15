<template>
  <b-navbar toggleable="md" type="dark" variant="dark" sticky>
      <b-container fluid="xl">
        <!-- Navbar Brand -->
        <b-navbar-brand href="/">
          <b-avatar icon="book-fill" size="lg" variant="danger"></b-avatar>
        </b-navbar-brand>

        <!-- Phone Navbar For Top Start -->
        <b-navbar-nav>
          <b-nav-form class="d-md-none">
            <!-- <b-button class="me-1" variant="danger" size="sm"
              v-show="wallet.connected == false" @click="connectWallet()">
              {{ $t('MENUS.PC.CONNECT') }}
            </b-button> -->
            <b-button class="me-1" variant="danger" size="sm">
              {{ $t('MENUS.PC.CONNECT') }}
            </b-button>
            <b-button class="me-1" size="sm" href="/user">
              <b-icon icon="person-fill"></b-icon>
            </b-button>
            <b-button class="me-1" size="sm" v-b-toggle.navbar-collapse>
              <b-icon icon="list"></b-icon>
            </b-button>
          </b-nav-form>
        </b-navbar-nav>
        <!-- Phone Navbar For Top End -->

        <!-- PC Navbar Start -->
        <b-collapse id="navbar-collapse" is-nav class="text-center">
          <b-navbar-nav class="ms-auto">
            <!-- <b-nav-item href="/">{{ $t('MENUS.PC.HOME') }}</b-nav-item> -->
            <b-nav-item :href="menu.href" v-for="menu in appMenus" :key="menu.text">
              {{ $t('MENUS.PC.' + menu.text) }}
            </b-nav-item>

            <b-nav-form>
              <b-button class="d-none d-md-block mt-1 ms-5" size="sm"
                variant="danger">
                <b-icon icon="credit-card-fill" aria-hidden="true"></b-icon>
                {{ $t('MENUS.PC.CONNECT') }}
              </b-button>
            </b-nav-form>

            <b-nav-item-dropdown>
              <template slot="text">
                <b-icon icon="globe" aria-hidden="true"></b-icon>
              </template>
              <b-dropdown-item v-for="lan in languages" :key="lan.value"
                :disabled="lan.disabled" @click="changeLanguage(lan.value)">
                {{ lan.text }}
              </b-dropdown-item>
            </b-nav-item-dropdown>

            <!-- <b-nav-item-dropdown right v-for="menu in appMenus" :key="menu.text">
              <template slot="text">{{ $t('MENUS.PC.' + menu.text) }}</template>
              <b-dropdown-item v-for="chi in menu.chidren" :key="chi.text" :href="chi.href">
                {{ $t('MENUS.PC.' + chi.text) }}
              </b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-form v-show="wallet.connected == false">
              <b-button class="d-none d-md-block mt-1 ms-5" size="sm"
                variant="danger" @click="connectWallet()">
                <b-icon icon="credit-card-fill" aria-hidden="true"></b-icon>
                {{ $t('MENUS.PC.CONNECT') }}
              </b-button>
            </b-nav-form>

            <b-nav-item-dropdown>
              <template slot="text">
                <b-icon icon="globe" aria-hidden="true"></b-icon>
              </template>
              <b-dropdown-item v-for="lan in languages" :key="lan.value"
                :disabled="lan.disabled" @click="changeLanguage(lan.value)">
                {{ lan.text }}
              </b-dropdown-item>
            </b-nav-item-dropdown> -->
          </b-navbar-nav>
        </b-collapse>
        <!-- PC Navbar End -->
      </b-container>
    </b-navbar>
</template>

<script src="./WebNavbar.js"></script>


<!-- <script>
export default {
  name: 'WebNavbar'
}
</script> -->