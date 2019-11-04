require('./bootstrap');
window.Vue = require('vue');

import store from '~/store'
import '~/components/index'
import '~/plugins/vue-scrollto'

const app = new Vue({
    store,
    el: '#app'
})
