  <template>
  <section class="goodsDetail">
    <HeaderTop title="商品详情">
      <a class="back" slot="left" @click="$router.back()">
        <i class="iconfont icon-arrow_left"></i>
      </a>
    </HeaderTop>
    <div class="goodsDetail-content-wrapper">
      <div class="goodsDetail-content">
        <!--首页导航-->
        <nav class="goodsDetail_nav">
          <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img :src="baseImgUrl + goodsInfo.imagePath" alt="" style="width:100%;height:100%">
                </div>
              </div>
            </div>
        </nav>
      <section class="section">
        <h3 class="section-title">商品详情</h3>
        <ul class="detail">
          <li><span class="bold">商品名</span> <span>{{goodsInfo.name}}</span></li>
          <li><span class="bold">已销售</span> <span>{{goodsInfo.alreadySell}} </span></li>
          <li><span class="bold">商品价格</span> <span>{{goodsInfo.money}} </span></li>
          <li><span class="bold">库存</span> <span>{{goodsInfo.specification}} </span></li>
          <li>
             <p class="txp"> 详细信息 </p>
              <p class="txp"> {{goodsInfo.details}}</p>
          </li>
        </ul>
      </section>   
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


  export default {
    data() {
      return {
        baseImgUrl: 'http://wlgzs.org:10012/'
      }
    },
    computed:{
      ...mapState(['goodsInfo'])
    },
    mounted () {
      let param = this.$route.query.goodsId      
      this.$store.dispatch('getGoodsInfo',param)
      new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
        },
        autoplay: true,//可选选项，自动滑动
        })
      },
    components: {
      HeaderTop,
  
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .goodsDetail //首页
    width 100%
    .goodsDetail-content-wrapper
      position fixed
      top: 0px
      bottom: 46px
      width: 100%
      .goodsDetail_nav
        bottom-border-1px(#e4e4e4)
        margin-top 15px
        height 200px
        background #fff
        .swiper-container
         width 100%
         height 100%
         .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
           width 100%;
           height 200px
           img 
            width:100%
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
       .detail
        margin-bottom -16px
        > li
         display flex
         justify-content space-between
         align-items center
         margin-right -10px
         padding 16px 12px 16px 0
         line-height 15px
         bottom-border-1px(#ddd)
         font-size 13px
          > .bold
            font-weight 700
            color #333
          > .txp
            width 100%
          &:last-child
            border-none()
        >li:last-child{
            height 50px
          }
         
    



</style>