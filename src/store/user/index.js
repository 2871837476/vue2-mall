import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"

// 登录与注册的仓库
const state = {
  code: '',
  token: localStorage.getItem("TOKEN"),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo || {}
  },
  // 退出登录，清除数据
  CLEAR(state) {
    // 清空仓库中用户信息
    state.token = ''
    state.userInfo = {}
    // 清空本地存储的token
    localStorage.removeItem("TOKEN")
  }
}
const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let result = await reqGetCode(phone)
    console.log(result);
    if (result.status === 200) {
      // 拿到token
      commit("GETCODE", result.data.data)
      return 'ok'
    } else {
      return Promise.reject(new Error("fail"))
    }
  },
  // 用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user)
    console.log(result);
    if (result.status === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error("fail"))
    }
  },
  // 登录业务token
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    if (result.status === 200) {
      // 用户依旧登录成功且拿到token
      commit("USERLOGIN", result.data.data.token)
      // 持久化存储token
      localStorage.setItem("TOKEN", result.data.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error("fail"))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.status === 200) {
      commit("GETUSERINFO", result.data.data)
      return 'ok'
    } else {
      return Promise.reject(new Error("fail"))
    }
  },
  // 退出登录
  async userLogout({ commit }) {
    // 只是向服务器发起一次请求，通知服务器清除token
    let result = await reqLogout()
    if (result.status === 200) {
      // actions中不能操作state，提交mutations修改state
      commit("CLEAR")
      return 'ok'
    } else {
      return Promise.reject(new Error("fail"))
    }
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}