  <template>
    <div class="order_page">
       <HeaderTop title="订单详情">
        <a class="back" slot="left" @click="$router.back()">
           <i class="iconfont icon-arrow_left"></i>
         </a>
        </HeaderTop>
         <div class="headImg">
           
         </div>
        <div class="shop-info">
         <div class="split"></div>

      <section class="section">
        <h3 class="section-title"></h3>
        <ul class="detail">
        <li><span class="bold">商品名字</span> <span>{{orderInfo.goodsName}}</span></li>
          <li><span class="bold">用户名</span> <span>{{orderInfo.userName}}</span></li>
          <li><span class="bold">电话</span> <span>{{orderInfo.phone}}</span></li>
          <li><span class="bold">时间</span> <span>{{orderInfo.orderDate}}</span></li>
          <div class="split" style="height:7px"></div>
           <li><span class="bold">订单状态</span> <span style="color:#fb6b23;font-weight:bold">{{orderInfo.orderStatus}}</span></li>
        </ul>
      </section>
        </div>
       
        <foot-guide></foot-guide>
 
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
 
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import HeaderTop from '../../../components/HeaderTop/HeaderTop.vue'
    export default {
 
        mounted(){
            let param={orderId:this.$route.query.orderId,userId:this.$route.query.userId}
                console.log("param2:"+param)
                this.$store.dispatch('getOrderDetail',param)
        },
       
        components: {
           HeaderTop
        },
        computed: {
            ...mapState(['userInfo','orderInfo']),
        },
 
    }
</script>
  
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .shop-info
    position: absolute
    top: 170px
    bottom: 0
    left: 0
    width: 100%
    background: #fff;
    overflow: hidden
    .section
      padding 16px 14px 14px
      font-size 16px
      background-color #fff
      color #666
      border-bottom 1px solid #eee
      position relative
      .section-title
        color #000
        font-weight 700
        line-height 16px
        > .iconfont
          float right
          color #ccc
      .delivery
        margin-top 16px
        font-size 13px
        line-height 18px
        .delivery-icon
          width 55px
          font-size 11px
          margin-right 10px
          display inline-block
          text-align center
          color #fff
          background-color #0097ff
          padding 1px 0
          border-radius 4px
        .delivery-money
          margin-top 5px

      .activity
        margin-top 16px
        .activity-item
          margin-bottom 12px
          display flex
          font-size 13px
          align-items center
          &.activity-green
            .content-tag
              background-color rgb(112, 188, 70)
          &.activity-red
            .content-tag
              background-color rgb(240, 115, 115)
          &.activity-orange
            .content-tag
              background-color: rgb(241, 136, 79)
          .content-tag
            display inline-block
            border-radius 2px
            width 36px
            height: 18px
            margin-right 10px
            color #fff
            font-style normal
            position relative
            .mini-tag
              position absolute
              left 0
              top 0
              right -100%
              bottom -100%
              font-size 24px
              transform scale(.5)
              transform-origin 0 0
              display flex
              align-items center
              justify-content center
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        margin-top 16px
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
      .detail
        margin-bottom -16px
        > li
          display flex
          justify-content space-between
          align-items center
          margin-right -10px
          padding 16px 12px 16px 0
          line-height 16px
          bottom-border-1px(#ddd)
          font-size 13px
          > .bold
            font-weight 700
            color #333
          &:last-child
            border-none()


    .split
      width: 100%
      height: 16px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
</style>
