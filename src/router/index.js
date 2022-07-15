import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboardPanel'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard'),
    children: [
      {
        path: '/dashboardPanel',
        name: '首页',
        component: () => import('@/views/dashboardPanel')
      },
      {
        path: '/userList',
        name: '用户列表',
        component: () => import('@/views/user')
      },
      {
        path: '/RoleList',
        name: '角色列表',
        component: () => import('@/views/jurisdiction/RoleList')
      },
      {
        path: '/PermissionList',
        name: '权限列表',
        component: () => import('@/views/jurisdiction/PermissionList')
      },
      {
        path: '/ProductList',
        name: '商品列表',
        component: () => import('@/views/shop/ProductList')
      },
      {
        path: '/ProductList/addGoods',
        name: '添加商品',
        component: () => import('@/views/addshop')
      },
      {
        path: '/CommodityClassification',
        name: '商品分类',
        component: () => import('@/views/shop/CommodityClassification')
      },
      {
        path: '/ClassificationParameters',
        name: '分类参数',
        component: () => import('@/views/shop/ClassificationParameters')
      },
      {
        path: '/Order',
        name: '订单列表',
        component: () => import('@/views/order')
      },
      {
        path: '/dataReport',
        name: '数据报表',
        component: () => import('@/views/dataReport')
      }
    ]
  },
  // 404页面
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
