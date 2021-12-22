//配置路由的入口文件
import Vue from 'vue'
import vueRouter from 'vue-router'
//导入路由配置
import routes from './routes'
import store from '@/store'
//使用路由插件
Vue.use(vueRouter)

//先把vueRouter原型对象上的push和replace方法保存备份一下
let originPush = vueRouter.prototype.push
let originReplace = vueRouter.prototype.replace

//重写vueRouter原型对象上的push和replace方法
vueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}

vueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}


const router = new vueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 }
  }
})
//全局守护路由之前置路由
router.beforeEach(async (to, from, next) => {
  //获取vuex管理的仓库里的用户信息
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    if (to.path == '/login' || to.path == '/register') {//已经登录则导向home页面
      next('/home')
    } else {
      if (name) {//已经登陆了,要去非登录或者注册页,且有用户信息,则放行
        next()
      } else {
        try { //已经登录,没有用户信息,则获取用户信息
          await store.dispatch('getUserInfo')
          next()
        } catch (err) {
          //token过期,重新登录
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
    //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    //未登录而想去上面这些路由----->页面导航至登录页面
    let toPath = to.path
    if (toPath.includes('/trade') || toPath.includes('/pay') || toPath.includes('/center')) {
      //把未登录的时候想去而没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect='+toPath)
    } else {
      next()
    }
  }
})
//导出路由
export default router