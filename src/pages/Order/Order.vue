<template>
  <section class="order">
    <div  class="order_login" v-if="userInfo.userId">
         <HeaderTop title="我的订单">
      <a class="back" slot="left" @click="$router.back()">
        <i class="iconfont icon-arrow_left"></i>
      </a>
    </HeaderTop>
      <div class="tab">
      <div class="tab-item">
        <router-link :to="{path:'/order/all',query:{status:0,userId:userInfo.userId}}" replace>全部</router-link>
      </div>
   
      <div class="tab-item">
        <router-link  :to="{path:'/order/paid',query:{status:1,userId:userInfo.userId}}" replace>已付款</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'/order/received',query:{status:2,userId:userInfo.userId}}" replace>已收货</router-link>
      </div>
     </div>
      <keep-alive>
         <router-view/>
       </keep-alive>
   </div>
    <div  class="order_no_login" v-else>
     <img src="./images/person.png">
      <h3>登录后查看我的订单</h3>
      <button @click="toLogin()">立即登陆</button>
    </div> 
  </section>
</template>

<script>
import {mapState} from 'vuex'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  export default {
    computed: {
       ...mapState(['userInfo']),
       ...mapState(['order']),
    },
    mounted() {
        document.addEventListener('touchstart', function(event) {
    // 判断默认行为是否可以被禁用
    if (event.cancelable) {
        // 判断默认行为是否已经被禁用
        if (!event.defaultPrevented) {
            event.preventDefault();
        }
    }
}, false);
    },
    methods: {
     toLogin(){
         this.$router.push('/login')
      },
    
    },
    components: {
      HeaderTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
  .order  //订单
    width 100%
    .header
      background-color #c92027
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .order_login
      padding-top 60px
      width 80%
      margin 0 auto
    .order_no_login
      padding-top 140px
      width 60%
      margin 0 auto
      text-align center
      >img
        display block
        width 100%
        height 30%
      >h3
        padding 10px 0
        font-size 17px
        color #6a6a6a
      >button
        display inline-block
        background #c92027
        font-size 14px
        color #fff
        border 0
        outline none
        border-radius 5px
        padding 10px 20px
</style>