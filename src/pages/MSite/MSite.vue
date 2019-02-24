<template>
  <section class="msite">
    <div class="miste-content-wrapper">
      <div class="miste-content">
        <!--首页导航-->
        <nav class="msite_nav">
        <div class="head">
          <div class="header_search" to="/search">
              <img src="./images/nav/logo1.png"></i>
          </div>
          <span>首页</span>        
          <span class="header_login">
            <router-link class="routers"  to="/login">
              <span v-if='!userInfo.userId'> 登录|注册</span>
            </router-link>
            <router-link to="/search" class="routers">
               <i class="iconfont icon-sousuo" ></i>
            </router-link>
          </span>
        </div>
         <div class="swiper-container1">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img src="./images/nav/banner1.jpg" alt="" style="background-size:cover;width:100%;height:100%">
                </div>
                <div class="swiper-slide">
                  <img src="./images/nav/banner2.png" alt="" style="background-size:cover;width:100%;height:100%">
                </div> 
              </div>
          </div>
          <div class="swiper-container">
            <div class="swiper-wrapper">
               <div class="swiper-slide">
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/7.jpg">
                  </div>
                  <span>甜品饮品</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/27.png">
                  </div>
                  <span>五谷杂粮</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/13.jpg">
                  </div>
                  <span>水果蔬菜</span>
                </a>
                <a href="javascript:" class="link_to_food">
                  <div class="food_container">
                    <img src="./images/nav/5.jpg">
                  </div>
                  <span>肉质蛋类</span>
                </a>
                
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
          <img src="./images/msite_back.svg" alt="back">
        </nav>
        <!--首页所有商品展示-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">商品展示</span>
          </div>
          <ShopList/>
        </div>
      </div>
    </div>   
  </section>
</template>
<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'

  export default {
     mounted(){
       this.$store.dispatch('getAllFoods')
       this.aa()
        new Swiper('.swiper-container1', {
        pagination: {
            el: '.swiper-pagination',
        },
        autoplay: true,//可选选项，自动滑动
        })
    },
      computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      aa(){
        this.$nextTick(() => {// 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后),滚动
          new BScroll('.miste-content-wrapper', {
            click: true        
          })
        })
      }
    },     
    components: {
      HeaderTop,
      ShopList
    },
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .miste-content-wrapper
      position fixed
      top: 0px
      bottom: 46px
      width: 100%
      .msite_nav
        bottom-border-1px(#e4e4e4)
        height 300px
        background #fff
        .head
         width:100%
         height:45px
         text-align:center
         position:absolute
         top:0
         left:0
         z-index:999
         color:#fff
         font-size:20px
         padding:5px
         .header_search
          color:#fff
          float:left
          img
           width:45px
           height:45px
           margin-right:15px
         .header_login
          .routers
            color:#fff
            float:right
            font-size:18px
            padding-right:10px
        .swiper-container1
         width:100%;
         height:190px
         margin-bottom: 10px
        .swiper-container
          width 100%
          height 45%;
          margin-bottom: 10px
          .swiper-wrapper
            width 100%
            height 100%
            .swiper-slide
              display flex
              justify-content center
              align-items flex-start
              flex-wrap wrap
              .link_to_food
                width 25%
                .food_container
                  display block
                  width 100%
                  text-align center
                  padding-bottom 10px
                  font-size 0
                  img
                    display inline-block
                    width 50px
                    height 50px
                span
                  display block
                  width 100%
                  text-align center
                  font-size 13px
                  color #666
          .swiper-pagination
            >span.swiper-pagination-bullet-active
              background #02a774
      .msite_shop_list
        top-border-1px(#e4e4e4)
        margin-top 10px
        background #fff
        .shop_header
          padding 10px 10px 0
          .shop_icon
            margin-left 5px
            color #999
          .shop_header_title
            color #999
            font-size 14px
            line-height 20px
</style>