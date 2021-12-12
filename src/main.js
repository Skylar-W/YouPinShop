import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import {reqCategoryList} from '@/api/index'
import store from "@/store"
import "@/mock/mockServer"
import "swiper/css/swiper.css"
import Pagination from "@/components/Pagination"
Vue.config.productionTip = false
//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// //测试
// reqCategoryList()
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
