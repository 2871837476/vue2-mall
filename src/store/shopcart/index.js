import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"

const state = {
  cartList: [],
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车列表数据
  async getCartList(context) {
    let result = await reqCartList()
    if (result.status === 200) {
      context.commit("GETCARTLIST", result.data.data)
    }
  },
  // 删除购物车的某个商品
  async deleteCartListBySkuId(context, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.status === 200) {
      return "ok"
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  // 删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    // 获取购物车中全部选中的产品（是一个数组）
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      // 每个被选中的商品，都发送请求，通知服务器修改数据（成功则返回成功的promise对象，失败则返回失败的promise对象）
      let promise = item.isChecked == 1 ? dispatch("deleteCartListBySkuId", item.skuId) : ''
      PromiseAll.push(promise)
    })
    // 每个被选中的商品都发送请求修改数据成功，才返回成功的promise对象
    return Promise.all(PromiseAll)
  },
  // 修改购物车某一个商品的选中状态
  async updateCheckedById(context, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.status === 200) {
      return "ok"
    } else {
      return Promise.reject(new Error("fail"))
    }
  },
  // 修改全部产品的勾选状态
  updateAllCartIsChecked({ dispatch, getters }, isChecked) {
    let promiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked
      })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}