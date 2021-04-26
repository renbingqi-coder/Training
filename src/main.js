import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import './assets/js/main.css';
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css';
import router from './router'
import store from './store'
import axios from 'axios'
import {Message} from 'element-ui'

Vue.use(ViewUI);
Vue.prototype.$message = Message
Vue.config.productionTip = false
Vue.prototype.$http = axios;



new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
