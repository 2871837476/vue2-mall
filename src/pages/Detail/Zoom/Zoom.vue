<template>
  <div
    class="spec-preview"
    ref="zoom"
  >
    <img :src="imgObj.imgUrl" />
    <div
      class="event"
      @mousemove="handler"
    ></div>
    <div class="big">
      <img
        :src="imgObj.imgUrl"
        ref="big"
      />
    </div>
    <!-- 绿色遮罩层 -->
    <div
      class="mask"
      ref="mask"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      // 标识当前被选中的图片
      currentIndex: 0,
    };
  },
  computed: {
    // 如果服务器数据没有请求回来，则父组件传过来的skuImageList是个空数组，
    // 『空数组[0].imgUrl』的值是undefined，因此我们至少应该将skuImageList[0]的值设为一个空对象
    imgObj() {
      return this.skuImageList[this.currentIndex] || {};
    },
  },
  mounted() {
    // 获取兄弟组件ImageList传来的自定义事件:某张图片被点击了,需要更改对应的大图
    this.$bus.$on("getIndex", (index) => {
      this.currentIndex = index;
    });
  },
  methods: {
    handler(e) {
      // 大盒子
      let zoom = this.$refs.zoom;
      // 遮罩层
      let mask = this.$refs.mask;
      // 遮罩层的左偏移量、上偏移量
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight / 2;
      // 限制范围
      if (left < 0) left = 0;
      if (left > zoom.offsetWidth - mask.offsetWidth) {
        left = zoom.offsetWidth - mask.offsetWidth;
      }
      if (top < 0) top = 0;
      if (top > zoom.offsetHeight - mask.offsetHeight) {
        top = zoom.offsetHeight - mask.offsetHeight;
      }
      mask.style.left = left + "px";
      mask.style.top = top + "px";
      // 放大镜的显示
      let big = this.$refs.big;
      big.style.left = -left * 2 + "px";
      big.style.top = -top * 2 + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>