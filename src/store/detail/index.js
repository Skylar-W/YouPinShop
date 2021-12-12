import { reqDetailInfo } from "@/api/index"
const state = { 
  DetailInfo: {},
}
const actions = {
  //获取商品详情
  async getDetailInfo({commit }, skuId) {
    let result = await reqDetailInfo(skuId)
    if(result.code == 200) {
      commit('GETDETAILINFO', result.data)
    }
  }
}
const mutations = {
  GETDETAILINFO(state, DetailInfo) {
    state.DetailInfo = DetailInfo
  }
}
const getters = {}

//导出路由配置
export default {
  state,
  actions,
  mutations,
  getters
}