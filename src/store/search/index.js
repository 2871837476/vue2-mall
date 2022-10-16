import { reqSearchInfo } from "@/api"

// search模块小仓库
const state = {
  searchList: {}
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  async getSearchList(context, params = {}) {
    let result = await reqSearchInfo(params)
    if (result.status == 200) {
      context.commit("GETSEARCHLIST", result.data.data)
    }
  }
}
// 项目当中，getters主要的作用是：简化仓库中的数据。可以将组件中需要用到的数据简化一下，之后组件获取数据时就很方便
const getters = {
  // 形参state是当前仓库的state，而非大仓库中的那个state
  /* 
    假如网络不好请求不到数据，state中的searchList依旧是{}，则state.searchList.xxx的值是undefined
    将undefined拿去遍历，会出错。因此在没有请求到数据时，给这些值赋为空数组 
  */
  attrsList(state) {
    return state.searchList.attrsList || []
  },
  // 商品列表数据
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}