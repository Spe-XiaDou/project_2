import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
// import {Button, Container, Header, Aside, Main, Radio, Menu, Submenu, MenuItem, MenuItemGroup} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from '@/router'
import store from '@/store/index.js'
import axios from 'axios'
import '@/api/mock.js'

// 将 ElementUI 注册为 Vue 插件
Vue.use(ElementUI)
// Vue.use(Button)
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Aside)
// Vue.use(Main)
// Vue.use(Radio)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(MenuItemGroup)

// 将 axios 挂载到 Vue 原型对象上
Vue.prototype.$http = axios

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  // 未登录：没有 token 且不是前往登录页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } 
  // 已处在登录状态
  else if(token && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // 在 created 阶段对页面进行动态的渲染，解决白屏问题
    store.commit('addMenu', router)
  }
}).$mount('#app')
