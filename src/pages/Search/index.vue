<template>
  <div>
    <!-- 商品三级分类列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li
              class="with-x"
              v-if="searchParams.categoryName"
            >{{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li
              class="with-x"
              v-if="searchParams.keyword"
            >{{searchParams.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li
              class="with-x"
              v-if="searchParams.trademark"
            >{{searchParams.trademark.split(":")[1]}}
              <i @click="removeTradeMark">×</i>
            </li>
            <!-- 平台商品属性的面包屑 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{attrValue.split(":")[1]}}
              <i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @trademarkInfo="trademarkInfo"
          @attrInfo="attrInfo"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的结构 -->
              <ul class="sui-nav">
                <li
                  :class="{active: isOne}"
                  @click="changeOrder('1')"
                >
                  <a>综合<span v-show="isOne">{{searchParams.order.split(':')[1] == "desc" ? "降序" : "升序"}}</span></a>
                </li>
                <li
                  :class="{active: isTwo}"
                  @click="changeOrder('2')"
                >
                  <a>价格<span v-show="isTwo">{{searchParams.order.split(':')[1] == "desc" ? "降序" : "升序"}}</span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售的产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="good in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{good.title}}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a>
                    <a
                      href="javascript:void(0);"
                      class="sui-btn btn-bordered"
                    >收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器：暂时先传假数据 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="searchList.total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      // 搜索时传递给服务器的参数
      searchParams: {
        // 一级分类的id
        category1Id: "",
        // 二级分类的id
        category2Id: "",
        // 三级分类的id
        category3Id: "",
        // 分类的名字
        categoryName: "",
        // 搜索框输入的关键字
        keyword: "",
        // 排序方式: 综合升序/降序;价格升序/降序，默认值1:desc
        order: "1:desc",
        // 表示分页器当前是第几页,默认值是1
        pageNo: 1,
        // 每一页展示多少个数据,默认值是10
        pageSize: 10,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    // 发送请求之前,修改searchParams
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("search", ["goodsList"]),
    // 获取search模块展示产品一共多少数据
    ...mapState("search", ["searchList"]),
    // 判断排序的参数order是哪个？包含1还是包含2
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
  },
  methods: {
    // 作用:向服务器发送请求，获取search模块数据（根据参数不同返回不同的数据进行展示）.把请求数据封装成一个函数,当需要发送请求时就可以进行调用
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    // 删除分类的面包屑:点击面包屑的"x",会删除分类面包屑,并且重新发送请求,展示数据
    removeCategoryName() {
      // 删除分类的面包屑,需将分类名和id都置空
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 重新发送请求,展示数据
      this.getData();
      // 地址栏信息也要改变-->进行路由跳转(自己跳自己);注意,本意是删除query参数,如果路径有params,则应保留params
      this.$router.push({ name: "search", params: this.$route.params });
    },
    // 删除搜索关键字的面包屑:点击面包屑的"x",会删除关键字面包屑,并且重新发送请求,展示数据
    removeKeyword() {
      // 删除关键字的面包屑,需将keyword置空
      this.searchParams.keyword = undefined;
      // 再次发请求
      this.getData();
      // 通知兄弟组件Header清除关键字keyword
      this.$bus.$emit("clearKeyword");
      // 地址栏的路径也要改变：进行编程式导航路由跳转（自己跳自己）; 注意：本意是删除params参数,如果路径有query参数，则应保留query
      this.$router.push({ name: "search", query: this.$route.query });
    },
    // 品牌信息的回调函数（自定义事件）
    trademarkInfo(trademark) {
      // 1.整理品牌字段的参数『ID: 品牌名称』
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 2.重新发送请求
      this.getData();
    },
    // 删除品牌信息的面包屑
    removeTradeMark() {
      // 将品牌信息置空
      this.searchParams.trademark = undefined;
      // 再次发请求
      this.getData();
    },
    // 收集平台售卖属性的事件回调函数（自定义事件）
    attrInfo(attr, attrValue) {
      // 整理参数
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 判断是否已经有该售卖属性，没有的再加进参数props
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      // 再次发送请求
      this.getData();
    },
    // 删除平台售卖属性,
    removeAttr(index) {
      // 整理参数
      this.searchParams.props.splice(index, 1);
      // 再次发送请求
      this.getData();
    },
    // 排序的操作
    changeOrder(flag) {
      // flag:代表用户点击的是综合排序(1),还是价格排序(2);是用户点击的时候传递进来的
      // 这里获取的是最开始的状态:综合/价格;升序/降序
      let originFlag = this.searchParams.order.split(":")[0]; // 默认的是综合排序,即originFlag默认值是1
      let originSort = this.searchParams.order.split(":")[1];
      // 准备一个新的order值
      let newOrder = "";
      // 判断点击的是不是当前选中的
      if (flag == originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:${"desc"}`;
      }
      // 整理参数
      this.searchParams.order = newOrder;
      // 重新发送请求
      this.getData();
    },
    // 获取当前第几页的回调函数（自定义事件）
    getPageNo(pageNo) {
      // 整理参数
      this.searchParams.pageNo = pageNo;
      // 再次发请求
      this.getData();
    },
  },
  watch: {
    // 监听路由的信息是否发生变化,如果发生变化,则再次发起请求
    $route() {
      // 每次请求完毕,将相应的一级二级三级分类的id都置空,防止下次接收参数时保留了上一次请求的分类id
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 请求之前整理传递的参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 再次发送请求
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>