<template>
  <div id="app">
    <Header></Header>
    <!-- 展示路由组件 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 通知vuex发送请求，获取的分类列表数据存放于仓库中
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style>
</style>
