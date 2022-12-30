import Vue from 'vue'
import App from './App.vue'

import router from './router'
import BootstrapPlugin from './plugins/bootstrap-plugin'

import VueI18n from 'vue-i18n'
import data from './plugins/root-data'
import LanguageMain from './langs/language-main'
import ContractPlugin from './plugins/contract-plugin'
import ErrorPlugin from './plugins/error-plugin'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(BootstrapPlugin)
Vue.use(ContractPlugin)
Vue.use(ErrorPlugin)

const i18n = new VueI18n(LanguageMain)

new Vue({router, i18n, render: h => h(App), data}).$mount('#app')