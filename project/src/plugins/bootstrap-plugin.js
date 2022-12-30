// Import Boostrap Vue and Icons Plugin
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  install(Vue) {
    Vue.use(BootstrapVue)
    Vue.use(IconsPlugin)
  }
}