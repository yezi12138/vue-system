import system from './system.js'
import Vue from 'vue'
import request from './request'
Vue.use(system.router)

let router = new (system.router)({
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/a',
      component: () => import('./pages/main')
    },
    {
      path: '/a',
      name: 'a',
      component: () => import('./pages/a')
    },
    {
      path: '/b',
      name: 'b',
      component: () => import('./pages/b')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('./pages/error')
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('router.beforeEach', `${from.path} ----> ${to.path}`)
  request.reqManage && request.reqManage.cancelRouterReq(from.path)
  next()
})

router.registerInitScript(function () {
  console.log('registerInitScript')
  return request.post('/Account/Login', {
    account: "infvditest02",
    password: "csot.888"
  }).then(() => {
    console.log('登录成功%c', 'color: blue')
  }, () => {
    console.log('登录失败%c', 'color: red')
  })
})

router.registerPermission(function (to, from, next) {
  console.log('registerPermission', `${from.path} ----> ${to.path}`)
  if (from.path !== '/error' && to.path !== '/error') {
    next('/error')
    return false
  } else {
    return true
  }
  
})
export default router