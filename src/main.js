import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/reset.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
import VueQuillEditor from 'vue-quill-editor'
import '@/permission'

import * as filters from '@/filters/index'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueQuillEditor /* { default global options } */)
/* 注册全局过滤器 */
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
