import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './components/index'
import './plugins/vue-scrollto'
import './plugins/vue-treeselect'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
