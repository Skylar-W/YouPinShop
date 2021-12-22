import { reqCartList, reqDeleteCartById, reqUpdateCartStatus } from "@/api";
const state = { cartList: [] }
const actions = {
  //获取购物车列表数据
  async getCartList({ commit }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  //删除购物车产品
  async deleteCartBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200) {
      return result.message
    } else {
      return Promise.reject(new Error('删除购物车商品请求失败!'))
    }
  },
  //修改购物车产品的勾选状态(单个产品修改)
  async updateCartStatus({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCartStatus(skuId, isChecked)
    if (result.code == 200) {
      return result.message
    } else {
      return Promise.reject(new Error('商品勾选状态修改失败!'))
    }
  },
  //删除购物车内全部选中商品
  deleteAllChecked({ dispatch, getters }) {
    let promiseArr = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartBySkuId', item.skuId) : ''
      promiseArr.push(promise)
    })
    return Promise.all(promiseArr)
  },
  //切换购物车的全选状态
  updateAllChecked({state, dispatch}, isChecked) {
    let promiseArr = []
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updateCartStatus', {skuId: item.skuId, isChecked})
      promiseArr.push(promise)
    })
    return Promise.all(promiseArr)
  }
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

//导出仓库配置
export default {
  state,
  actions,
  mutations,
  getters
}