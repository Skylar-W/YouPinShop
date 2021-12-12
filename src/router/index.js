//配置路由的入口文件
import Vue from 'vue'
import vueRouter from 'vue-router'
//导入路由配置
import routes from './routes'
//使用路由插件
Vue.use(vueRouter)

//先把vueRouter原型对象上的push和replace方法保存备份一下
let originPush = vueRouter.prototype.push
let originReplace = vueRouter.prototype.replace

//重写vueRouter原型对象上的push和replace方法
vueRouter.prototype.push = function(location, resolve, reject) {
  if(resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}

vueRouter.prototype.replace = function(location, resolve, reject) {
  if(resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}

//导出路由
export default new vueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
})