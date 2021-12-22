import { reqDetailInfo, reqAddCart } from "@/api/index"
import { getUUID } from "@/utils/uuid_token"
const state = {
  DetailInfo: {},
  //游客身份登录
  uuid_token: getUUID()
}
const actions = {
  //获取商品详情
  async getDetailInfo({ commit }, skuId) {
    let result = await reqDetailInfo(skuId)
    if (result.code == 200) {
      commit('GETDETAILINFO', result.data)
    }
  },
  //添加商品至购物车
  async addToCart({ commit }, { skuId, skuNum }) {
    //async函数执行返回的结果一定是一个promise【要么成功，要么失败】
    let result = await reqAddCart(skuId, skuNum)
    if(result.code == 200) {
      return '成功添加商品至购物车!'
    } else {
      return Promise.reject(new Error('添加商品至购物车失败!'))
    }
  }
}
const mutations = {
  GETDETAILINFO(state, DetailInfo) {
    state.DetailInfo = DetailInfo
  }
}
const getters = {
  categoryView(state) {
    return state.DetailInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.DetailInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.DetailInfo.spuSaleAttrList || []
  }
}

//导出路由配置
export default {
  state,
  actions,
  mutations,
  getters
}