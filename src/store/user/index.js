//注册 | 登录 模块数据中心
import { reqVerifyCode, reqRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const actions = {
  //获取验证码
  async getVerifyCode({ commit }, phone) {
    let result = await reqVerifyCode(phone)
    if (result.code == 200) {
      commit("GETVERIFYCODE", result.data);
      return "成功获取到验证码!";
    } else {
      return Promise.reject(new Error("获取验证码失败!"));
    }
  },
  //新用户注册
  async userRegister({ commit }, user) {
    let result = await reqRegister(user)
    if (result.code == 200) {
      return '注册成功!'
    } else {
      return Promise.reject(new Error('注册失败!'))
    }
  },
  //TOKEN登录
  async userLogin({ commit }, user) {
    let result = await reqUserLogin(user)
    //服务器下发token，用户唯一标识符(uuid)
    //将来经常通过带token找服务器要用户信息进行展示
    if (result.code == 200) {
      //用户已经登录成功且获取到token
      commit("USERLOGIN", result.data.token);
      //持久化存储token
      setToken(result.data.token);
      return result.message
    } else {
      return result.message
    }
  },
  //获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return result.message
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  //退出登录
  async userLogout({ commit }) {
    let result = await reqLogout()
    if (result.code == 200) {
      commit('REMOVE')
      return result.message
    } else {
      return Promise.reject(new Error(result.message))
    }
  }
}
const mutations = {
  GETVERIFYCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  REMOVE(state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}
const getters = {}

//导出配置
export default {
  state,
  actions,
  mutations,
  getters
}