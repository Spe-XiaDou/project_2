// import router from '@/router'
import Cookies from 'js-cookie'
export default {
  state: {
    isCollapse: false,
    tabsList: [
      {path:'/home', name: 'home', label: '首页', icon: 'home'}
    ],
    currentMenu: null,
    active: null,
    menu: []
  },
  mutations: {
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    tagToActive(state, val) {
      state.active = val.path
    },
    selectMenu(state, val) {
      if (val.name !== 'home') {
        state.currentMenu = val
        // 用于判断该标签是否已经存在，不存在返回-1
        const result = state.tabsList.findIndex(item => item.name === val.name)
        if (result === -1) {
          state.tabsList.push(val)
        } else {
          state.currentMenu = null
        }
      }
    },
    closeTag(state, val) {
      const result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result, 1)
    },
    setMenu(state, val) {
      state.menu = val
      Cookies.set('menu', JSON.stringify(val))
    },
    clearMenu(state) {
      state.menu = []
      Cookies.remove('menu')
    },
    addMenu(state, router) {
      if (!Cookies.get('menu')) {
        return
      }
      const menu = JSON.parse(Cookies.get('menu'))
      state.menu = menu
      const menuArray = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import (`../views/${item.url}`)
            return item
          })
          menuArray.push(item)
        } else {
          item.component = () => import (`../views/${item.url}`)
          menuArray.push(item)
        }
      })
      // 路由的动态添加
      // console.log(router);
      menuArray.forEach(item => {
        console.log(item);
        router.addRoute('myMain', item)
      })
    }
  }
}