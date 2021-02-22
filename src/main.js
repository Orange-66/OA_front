// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入echarts
import Echarts from 'vue-echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
Vue.component('v-chart',Echarts)


import App from './App'
import router from './router'
//引入富文本编译器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//路由配置 delete是关键字
import {get, post, put, del} from '@/shared/ApiConfig.js'
import store from "./store";
Vue.prototype.$http = {
  get,
  post,
  put,
  del
}
Vue.use(VueQuillEditor);
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,store:store,
  template: '<App/>',
  components: {
    App
  },
  render: h => h(App)
})
