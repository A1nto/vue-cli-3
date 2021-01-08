import "@babel/polyfill"
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import api from './apis'

Vue.config.productionTip = false
Vue.$api = Vue.prototype.$api = api

const ENV = process.env.VUE_APP_ENV
console.log(ENV)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
