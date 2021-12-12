import Vue from "vue";
import Vuex from "vuex"
import home from "./home"
import search from "./search"
import detail from "./detail"

Vue.use(Vuex)
//导出Vuex的Store类实例
export default new Vuex.Store({
  //实现Vuex模块式开发存储数据
  modules: {
    home,
    search,
    detail
  }
})