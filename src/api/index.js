/* 这个模块对API进行统一管理，以后的接口请求都在这进行 */

import requests from "./request";
import mockRequests from "./mockAjax";

// 暴露TypeNav三级联动的接口
export const reqCategoryList = () => requests({
  url: '/product/getBaseCategoryList',
  method: 'get'
})

// 暴露banner轮播图的接口
export const reqBannerList = () => mockRequests.get('/banner')

// 暴露floor数据的接口
export const reqFloorList = () => mockRequests.get('/floor')

// 暴露获取搜索模块search数据的接口
// post请求；params参数至少是个空对象 
export const reqSearchInfo = (params) => requests({
  url: "/list",
  method: 'post',
  data: params
})

// 暴露请求商品详情数据的接口
export const reqGoodsInfo = (skuId) => requests({
  url: `/item/${skuId}`,
  method: 'get',
})

// 暴露添加到购物车的接口
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post',
})

// 暴露获取购物车列表的接口
export const reqCartList = () => requests({
  url: "/cart/cartList",
  method: 'get',
})

// 暴露删除购物车商品的接口
export const reqDeleteCartById = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
})

// 暴露切换商品选中状态的接口
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: "get"
})

// 获取验证码
export const reqGetCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: "get"
})

// 用户注册
// 参数为data,是对象形式,包含了手机号码phone、密码password、验证码code
export const reqUserRegister = (data) => requests({
  url: '/user/passport/register',
  method: "post",
  data
})

// 登录
export const reqUserLogin = (data) => requests({
  url: '/user/passport/login',
  method: "post",
  data
})

// 带着用户token向服务器获取用户信息
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: "get"
})

// 退出登录
export const reqLogout = () => requests({
  url: '/user/passport/logout',
  method: "get"
})

// 获取用户地址信息
export const reqAddressInfo = () => requests({
  url: '/user/userAddress/auth/findUserAddressList',
  method: "get"
})

// 获取商品清单
export const reqOrderInfo = () => requests({
  url: '/order/auth/trade',
  method: 'get'
})

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  method: 'post',
  data
})

// 获取订单支付信息
export const reqPayInfo = (orderId) => requests({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'get'
})

// 获取支付订单状态
export const reqPayStatus = (orderId) => requests({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'get'
})

// 获取个人中心--“我的订单”列表
export const reqMyOrderList = (page, limit) => requests({
  url: `/order/auth/${page}/${limit}`,
  method: 'get'
})