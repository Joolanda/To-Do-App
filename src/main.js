import Vue from 'vue'
import VueMaterial from 'vue-material'
import App from './App.vue'
import { MdButton, MdContent, MdTabs, MdField } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(VueMaterial)

Vue.use(MdField);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
