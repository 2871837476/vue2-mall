import Vue from 'vue'
import App from './App.vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'
// 引入仓库store
import store from './store'

// 注册三级联动全局组件
import TypeNav from "./components/TypeNav"
// 注册轮播图全局组件
import Carousel from "./components/Carousel"
// 注册分页器全局组件
import Pagination from "./components/Pagination"
// element-ui按需引入
import { MessageBox } from "element-ui"
// element-ui注册组件的一种写法：挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.component('TypeNav', TypeNav)
Vue.component('Carousel', Carousel)
Vue.component('Pagination', Pagination)
// 引入mockServer.js--mock数据
import '@/mock/mockServer'
// 引入轮播图样式
import "swiper/css/swiper.css"
// 统一引入api接口函数
import * as API from "@/api"
// 引入懒加载插件
import VueLazyload from "vue-lazyload"
// 引入懒加载默认的图片
import lazyGif from "@/assets/images/lazy.gif"
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: lazyGif
})
// 引入表单验证的插件
import "@/plugins/validate"
// 关闭生产提示
Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  // 注册路由
  router,
  // 注册仓库
  store
}).$mount('#app')