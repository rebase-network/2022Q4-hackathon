import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPersistedState from 'pinia-plugin-persistedstate';
import pinia from "@/stores/store";

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
})

import 'normalize.css';
import '@styles/variables.less';
import '@styles/base.css';
import '@styles/layout.less';
import 'virtual:svg-icons-register';


import App from './App.vue';
import router from './router';
const app = createApp(App);
pinia.use(piniaPersistedState);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount('#app');
