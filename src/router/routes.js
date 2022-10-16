// 这里存放的是路由配置
export default [
  {
    path: "/home",
    component: () => import("@/pages/Home"),
    meta: { show: true }
  },
  {
    name: 'search',
    // ?表示可以不传参
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: { show: true }
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { show: false }
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: { show: false }
  },
  {
    path: "/detail/:skuId",
    component: () => import("@/pages/Detail"),
    meta: { show: true }
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { show: true }
  },
  {
    path: "/shopcart",
    component: () => import("@/pages/ShopCart"),
    meta: { show: true }
  },
  {
    path: "/trade",
    component: () => import("@/pages/Trade"),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart" || from.path == "/") {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/pay" || from.path == "/") {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: "/pay",
    component: () => import("@/pages/Pay"),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade" || from.path == "/") {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: "/center",
    component: () => import("@/pages/Center"),
    meta: { show: true },
    children: [
      {
        path: 'myorder',
        component: () => import("@/pages/Center/MyOrder"),
      },
      {
        path: 'grouporder',
        component: () => import("@/pages/Center/GroupOrder"),
      },
      {
        // 重定向
        path: "/center",
        redirect: "/center/myorder"
      }
    ]
  },
  // 重定向：打开网页时，立马定向到首页
  {
    path: "*",
    redirect: "/home"
  }
]