// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import axios from 'axios'
import layer from 'vue-layer'
//引入组件库
import jvuewheel from '@jyeontu/jvuewheel'
//引入样式
import '@jyeontu/jvuewheel/lib/jvuewhell.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$axios = axios
Vue.prototype.$layer = layer(Vue)
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.use(jvuewheel)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
