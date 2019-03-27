<template>
  <div>
    <div class="addGoods">
      <router-link  to="/addGoods">
        <i class="iconfont icon-tianjia"></i>
      </router-link>
    </div>
    <div class="split"></div>
     <div class="goods"> 
      <div class="foods-wrapper">
          <li class="food-list-hook">            
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in storeGoods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="baseImg+food.imagePath">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}} </h2>  
                  <div class="extra">
                    <span class="count">月售{{food.alreadySell}}</span>                 
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.money}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>  
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
      </div>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>


<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import Food from '../../../components/Food/Food.vue'
   import ind from '../../../api/index'
   import { userInfo } from 'os';

  export default {
    data(){
      return {
        food:{},//需要显示的food
         baseImg: ind.ImgUrl 
      }
    },
    mounted() {
       let storeId=localStorage.getItem("storeId")
       console.log("storeId="+storeId)
      this.$store.dispatch('getStoreGoods',storeId)
      
    },
    computed: {
      ...mapState(['storeGoods','userInfo']),
    },

    methods: {
   
      // 显示点击的storeGoods
      showFood (food) {
        // 设置storeGoods
        this.food = food
        // storeGoods (在父组件中调用子组件对象的方法)
        this.$refs.food.toggleShow()
      } 
    },

    components: {
      CartControl,
      Food,
    //   ShopCart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .addGoods
      color :red
      width:100%
      height:30px
      text-align :right
      padding:5px 20px 5px 0
      font-size :28px
      i 
         color :red
         font-size :24px
         padding-right:25px
  .goods
    position: absolute
    top: 207px
    bottom: 46px
    width: 100%
    background: #fff;
   
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
   
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
   .split
      width: 100%
      height: 8px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      background: #f3f5f7
</style>
