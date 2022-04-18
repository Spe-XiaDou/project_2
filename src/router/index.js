import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue'
import Login from '@/views/Login/login.vue'
import User from '@/views/User/User.vue'
import Home from '@/views/Home/Home.vue'
import Mall from '@/views/Mall/Mall.vue'
import pageOne from '@/views/Other/pageOne.vue'
import pageTwo from '@/views/Other/pageTwo.vue'

Vue.use(VueRouter)

const routes = [
  // 登录页路由
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path:'/',
    name: "Main",
    component: Main,
    children: [
      { path: 'home', name:'home', component: Home },
      { path: 'user', name:'user', component: User },
      // { path: '/', redirect: 'home' },
      { path: 'mall', name:'mall', component: Mall },
      { path: 'page1', name:'page1', component: pageOne },
      { path: 'page2', name:'page2', component: pageTwo },
    ]}
]

const router = new VueRouter({
  routes
})

export default router
