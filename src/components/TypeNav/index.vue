<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex">
        <h2
          class="all"
          @mouseenter="enterShow"
        >全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div
            class="sort"
            v-show="show"
          >
            <!-- 利用事件委派+编程式导航，实现路由跳转和传参 -->
            <div
              class="all-sort-list2"
              @click="goSearch"
            >
              <!-- 一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList.slice(0, 16)"
                :key="c1.categoryId"
                :class="{current: currentIndex === index}"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                </h3>
                <!-- 二级.三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{display: currentIndex === index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em
                          v-for="c3 in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 按需引入
import { throttle } from "lodash";

export default {
  name: "TypeNav",
  data() {
    return {
      // 用于标记当前选中的分类
      currentIndex: -1,
      // TypeNav组件的显示与隐藏
      show: true,
    };
  },
  // 组件挂载完毕，向服务器发请求
  mounted() {
    // 如果不是home组件，则将typeNav组件中具体的商品分类进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    // 选择哪个分类，哪个分类添加背景颜色（节流）
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 鼠标移入“全部商品分类”
    enterShow() {
      this.show = true;
    },
    // 鼠标移出分类列表
    leaveIndex() {
      // 取消背景颜色
      this.currentIndex = -1;
      // 隐藏分类列表（home组件中不生效）
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // 进行路由跳转，从Home跳到Search
    goSearch(event) {
      // 获取当前触发事件的元素
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 有categoryname属性，则为a标签
      if (categoryname) {
        // 初始化参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 判断是哪个分类
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 汇总参数
        location.query = query;
        // 判断是否已有params参数
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        // 路由跳转
        this.$router.push(location);
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .current {
          background-color: skyblue;
        }
      }
    }

    // 过渡动画的样式
    // 过渡动画进入的开始状态、离开的结束状态
    .sort-enter,
    .sort-leave-to {
      height: 0px;
      opacity: 0;
    }
    // 过渡动画进入的结束状态、离开的开始状态
    .sort-enter-to,
    .sort-leave {
      height: 461px;
      opacity: 1;
    }
    // 过渡动画进入和离开的时间、速率
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.25s linear;
    }
  }
}
</style>