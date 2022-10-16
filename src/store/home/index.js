import { reqCategoryList, reqBannerList, reqFloorList } from "@/api"

// home模块小仓库
const state = {
  // 分类列表的数据
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  // floor的数据
  floorList: []
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
const actions = {
  // 通过调用api中的接口函数，向服务器发送请求，获取数据
  async categoryList(context) {
    let result = await reqCategoryList()
    if (result.status === 200) {
      context.commit("CATEGORYLIST", result.data.data)
    }
  },
  // 获取轮播图数据
  async getBannerList(context) {
    let result = await reqBannerList()
    if (result.status === 200) {
      context.commit("GETBANNERLIST", result.data.data)
    }
  },
  // 获取floor数据
  async getFloorList(context) {
    let result = await reqFloorList()
    if (result.status === 200) {
      context.commit("GETFLOORLIST", result.data.data)
    }
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}