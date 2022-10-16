/* 配置路由的文件 */
import VueRouter from "vue-router";
// 引入路由配置文件
import routes from "./routes"
// 引入仓库
import store from "@/store"

// 重写push、replace
let originPush = VueRouter.prototype.push // 先把VueRouter原型对象的push保存一份
let originReplace = VueRouter.prototype.replace // 先把VueRouter原型对象的replace保存一份
// 参数1：告诉原来的push，往哪里跳转、传递哪些参数  
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}
// 参数1：告诉原来的replace，往哪里跳转、传递哪些参数  
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => { }, () => { });
  }
}
// 对外暴露VueRouter类的实例
let router = new VueRouter({
  routes,
  scrollBehavior() {
    // y=0，表示滚动条在最上方
    return { y: 0 }
  }
})

// 全局路由守卫:前置守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  // 用户是否已经登录
  if (token) {
    // 用户登录了, 不允许再回登录页面,让其回到首页
    if (to.path == '/login') {
      next('/home')
    } else {
      // 登录了,去的不是login登录页面(如search,detail等)
      if (name) {
        // 如果有用户名,直接放行(代表有用户信息)
        next()
      } else {
        // 如果没有用户名,代表没有用户信息,需派发actions,让仓库存储用户信息再放行跳转
        try {
          await store.dispatch("user/getUserInfo")
          next()
        } catch (error) {
          // token失效了,获取不到用户信息,重新登录
          // 清除token
          store.dispatch("user/userLogout")
          next('/login')
        }
      }
    }
  } else {
    // 用户未登录,不能去交易相关、支付相关、个人中心
    // 如果未登录时去上面这些路由，则跳转到登录页面
    let toPath = to.path
    if (toPath == "/trade" || toPath == "/pay" || toPath == "/paySuccess" || toPath == "/center/myorder") {
      // 把未登录时想去而没去成的信息，存储在地址栏中（路由）
      next("/login?redirect=" + toPath)
    } else {
      // 未登录时，去的不是禁止去的路由，则放行
      next()
    }
  }
})

export default router
