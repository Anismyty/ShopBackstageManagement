/* eslint-disable */
//定义白名单
const whiteList = ['/login', '/404']
import router from '@/router'

//引入了store实例
import store from '@/store'

// 前置守卫
router.beforeEach(async (to, from, next) => {
  if (store.state.token) {
    // 有toke,去登录页直接跳转首页
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 没有token去不需要token的页面，放行
    if (whiteList.indexOf(to.path) > -1) {
      // 表示要去的地址在白名单
      next()
    } else {
      // 没有token去需要token的页面，先登录
      next('/login')
    }
  }
})
