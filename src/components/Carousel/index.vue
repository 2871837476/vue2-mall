<template>
  <div
    class="swiper-container"
    id="floor1Swiper"
  >
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="carousel in list"
        :key="carousel.id"
      >
        <img :src="carousel.imgUrl">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入Swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  // 父组件传给轮播图组件的数据
  props: ["list"],
  watch: {
    list: {
      /* 立即监听：list是父组件传过来的，是传之前就已经存在的，不会发生变化，
      如果不通过立即监听（上来就监听一次），则不会触发handler回调函数 */
      immediate: true,
      handler() {
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            loop: true, // 循环播放模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击小圆圈，切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>