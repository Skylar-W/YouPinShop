import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import { reqCategoryList } from '@/api/index'
import store from "@/store"
import "@/mock/mockServer"
import "swiper/css/swiper.css"
import Pagination from "@/components/Pagination"
import { Button,MessageBox} from 'element-ui';
Vue.config.productionTip = false
//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
// //测试
// reqCategoryList()
//注册Element-UI的组件
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//统一导入发送请求的api
import * as API from "@/api"
//图片懒加载插件导入
import VueLazyLoad from "vue-lazyload"
import YP_lazy from "@/assets/YP_lazy.png"
import errorLoad from "@/assets/errorLoad.png"
//注册图片懒加载插件
Vue.use(VueLazyLoad, {
  error: errorLoad,
  loading: YP_lazy
})
//表单校验插件导入
import "@/plugins/validate"
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store
}).$mount('#app')
