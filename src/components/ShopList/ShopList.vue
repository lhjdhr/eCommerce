 <template>
  <div class="shop_container">
    <ul class="shop_list" v-if="goods.length">
      <li class="shop_li1 border-1px" v-for="(shop, index) in goods"    
          :key="index">
        <a @click="$router.push({path: '/goodsDetails', query: {goodsId:shop.goodsId}})">
          <div class="shop_left2">
              <img :src="baseImgUrl + shop.imagePath" class="shop_img">
          </div>
          <div class="shop_right2">
            <section class="shop_detail_header">
              <h4 class="shop_title ellipsis">{{shop.name}}</h4>
              <ul class="shop_detail_ul"></ul>
            </section>
            <section class="shop_rating_order">
              <section class="shop_rating_order_left">
                <div class="order_section">
                 销量：{{shop.alreadySell}}
                 <span>价格：<span class="now">¥</span>{{shop.money}}</span>        
                </div>
              </section>
            </section>
   
          </div>
        </a>
          <div class="cartcontrol-wrapper">
             <CartControl :food="shop"/>
          </div>
      </li>
    </ul>
    <ul v-else>
      <li v-for="item in 6" :key="item">
        <img src="./images/shop_back.svg" alt="back">
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import CartControl from '../CartControl/CartControl.vue'
  import ind from '../../api/index'
  export default {
     data () {
      return {
          baseImgUrl: ind.ImgUrl 
      }
    },
     mounted () {
      this.$store.dispatch('getAllFoods')
    },
    computed: {
      ...mapState(['goods']),
      ...mapActions(['addItem'])
    },
    components:{
      CartControl
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .shop_container
    margin-bottom 50px
    .shop_list
      .shop_li1
        display:inline-block
        bottom-border-1px(#f1f1f1)
        width 50%
        .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px 
        >a
          clearFix()
          box-sizing border-box
          padding 15px 8px
          width 100%
          .shop_left2       
            box-sizing border-box
            width 87%
            height 75px
            margin-bottom:10px
            .shop_img
              display block
              width 100%
              height 100%
          .shop_right2          
            width 94%
            padding-right:20px
            .shop_detail_header
              clearFix()
              width 100%
              .shop_title
                float left
                color #333
                font-size 14px
                line-height 16px
                font-weight 700
                
              .shop_detail_ul
                float right
                margin-top 3px
                .supports
                  float left
                  font-size 10px
                  color #999
                  border 1px solid #f1f1f1
                  padding 0 2px
                  border-radius 2px
            .shop_rating_order
              clearFix()
              width 100%
              margin-top 18px
              margin-bottom 8px
              .shop_rating_order_left
                float left
                color #ff9a0d
                .rating_section
                  float left
                  font-size 10px
                  color #ff6000
                  margin-left 4px
                .order_section
                  float left
                  font-size 16px
                  color #666
                  transform scale(.8)
                  .now
                   margin-right: 8px
                   font-size: 14px
                   
              .shop_rating_order_right
                float right
                font-size 0
                .delivery_style
                  transform-origin 35px 0
                  transform scale(.7)
                  display inline-block
                  font-size 12px
                  padding 1px
                  border-radius 2px
                .delivery_left
                  color #fff
                  margin-right -10px
                  background-color #02a774
                  border 1px solid #02a774
                .delivery_right
                  color #02a774
                  border 1px solid #02a774
            .shop_distance2
              clearFix()
              width 100%
              font-size 12px
              .shop_delivery_msg
                float left
                transform-origin 0
                transform scale(.9)
                color #666
              .segmentation
                color #ccc
       
</style>