import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from "@/utils/uuid_token"

const state = {
  goodsInfo: {},
  // 游客的临时身份
  uuid_token: getUUID(),
}
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}
const actions = {
  // 获取的产品信息的action
  async getGoodsInfo(context, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.status == 200) {
      context.commit("GETGOODSINFO", result.data.data)
    }
  },
  // 将产品加入到购物车 || 修改某一个产品的个数
  // 前台将参数带给服务器，服务器写入成功，并没有返回其他的数据，只是返回code=200代表这次操作成功.因为服务器没有返回其余的数据，所以不需要vuex三连环存储数据
  async addOrUpdateShopcar(context, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 加入购物车成功
    if (result.status === 200) {
      // 返回加入购物车成功的标记
      return '0k'
    } else {
      // 返回加入购物车失败的标记
      return Promise.reject(new Error('fail'))
    }
  }
}
// goodsInfo初始值是空对象，为了防止没有请求到数据，导致getters里获取的数据是undefined，我们应该至少将其设为空对象/空数组
const getters = {
  // 路径导航的数据
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  // 产品信息的数据
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  // 产品售卖属性的数据
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}