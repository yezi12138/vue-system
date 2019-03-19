import router from './router'
import App from './pages/main'
import Vue from 'vue'
import request from './request'
Vue.prototype.$http = request
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
