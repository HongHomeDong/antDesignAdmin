// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import moment from 'moment'
import 'moment/locale/zh-cn'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './components/global.less'
import { Dialog } from '@/components'
import { Pagination, FormModel } from 'ant-design-vue'

Vue.config.productionTip = false
moment.locale('zh-cn')

// mount axios Vue.$http and this.$http
const MyPlugin = {}
MyPlugin.install = function (Vue, options) {
  Vue.prototype.$moment = moment
}
Vue.use(VueAxios)
Vue.use(Dialog)
Vue.use(MyPlugin)
Vue.use(Pagination)
Vue.use(FormModel)

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
