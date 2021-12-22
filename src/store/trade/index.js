/* 
  获取商品订单信息和用户地址
*/
import { reqAddress, reqTradeInfo } from "@/api";
const state = {
  tradeInfo: {},
  address: []
}
const actions = {
  async getTradeInfo({ commit }) {
    let result = await reqTradeInfo()
    if (result.code == 200) {
      commit('GETTRADEINFO', result.data)
      return result.message
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  async getAddress({ commit }) {
    let result = await reqAddress()
    if (result.code == 200) {
      commit('GETADDRESS', result.data)
      return result.message
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
}
const mutations = {
  GETTRADEINFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo
  },
  GETADDRESS(state, address) {
    state.address = address
  }
}
const getters = {}

//导出数据仓库
export default {
  state,
  actions,
  mutations,
  getters
}