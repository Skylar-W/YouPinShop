import { reqCategoryList, reqMainBanner, reqFloorsList } from "@/api"
/* home模块的数据仓库 */
const state = {
  categoryList: [],
  bannerList: [],
  floorsList: []
}
const actions = {
  //api里的接口函数调用,向服务器发送请求,获得数据
  async categoryList({ commit }) {
    let result = await reqCategoryList()
    // console.log(result);
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  //mock获取首页banner数据
  async getMainBanner({ commit }) {
    let result = await reqMainBanner()
    if(result.code == 200) {
      commit('GETMAINBANNER', result.data)
    }
  },
  //mock获取floor数据
  async getFloorsList({ commit }) {
    let result = await reqFloorsList()
    if(result.code == 200) {
      commit('GETFLOORSLIST', result.data)
    }
  }
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETMAINBANNER(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORSLIST(state, floorsList) {
    state.floorsList = floorsList
  }
}

const getters = {}

export default { state, actions, mutations, getters }