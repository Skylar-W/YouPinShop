/* search模块数据仓库 */
import { reqSearchInfo } from "@/api"
const state = {
  searchList: {}
}
const actions = {
  //获取search模块的数据
  async getSearchList({ commit }, params = {}) {
    //params形参: 是当用户dispatch这个actions的时候,第二个参数传递来的,至少是一个空对象
    let result = await reqSearchInfo(params)
    if(result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
  tradeList(state) {
    return state.searchList.trademarkList || []
  }
}

export default { state, actions, mutations, getters }