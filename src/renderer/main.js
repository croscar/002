import Vue from 'vue'
import axios from 'axios'
import iView from 'iview'

import ECharts from 'vue-echarts/components/ECharts'

import App from './App'
import router from './router'
import store from './store'

import 'iview/dist/styles/iview.css'; 

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(iView)


// import ECharts modules manually to reduce bundle size
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'

import DlgXmEdit from './components/Dialogs/DlgXmEdit'

Vue.component('chart', ECharts)
Vue.component('DlgXmEdit', DlgXmEdit)

import DB from './db'


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
