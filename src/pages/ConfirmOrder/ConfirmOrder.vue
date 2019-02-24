<template>
    <div class="confirmOrderContainer">
        <HeaderTop title="确认下单">
       
            <a class="back" slot="left" @click="$router.go(-1)" >
                 <i class="iconfont icon-arrow_left"></i>
             </a>
        </HeaderTop>
            <router-link :to='{path: "/confirmOrder/chooseAddress", query: {id: 1}}' class="address_container">         
            <div></div>
            </router-link>
            <section class="pay_way container_style">
                 <header class="header_style">
                    <span>收货地址</span>
                    <div class="more_type" style="text-align:right">
                        <span>{{userInfo.city}}</span>         
                    </div>
                </header>
                <header class="header_style">
                    <span>电话</span>
                    <div class="more_type" style="text-align:right">
                        <span>{{userInfo.phone}}</span>         
                    </div>
                </header>
                <header class="header_style">
                    <span>支付方式</span>
                    <div class="more_type" style="text-align:right">
                        <span>在线支付</span>         
                    </div>
                </header>
            </section>
            <section class="food_list">
                <header>
                     待付款列表
                </header>
                <ul class="food_list_ul">
                    <li v-for="item in shopCart" :key="item.goodsId" class="food_item_style">                 
                        <span class="food_name">{{item.name}}</span>
                        <div class="num_price">
                            <span>x {{item.count}}</span>
                            <span>¥{{item.money}}</span>
                        </div>
                    </li>
                </ul>
                <div class="food_item_style2 total_price">
                    <p class="food_name2 ellipsis">订单 ¥{{totalPrice}}</p>
                    <div class="num_price2">
                        <span>待支付 ¥{{totalPrice}}</span>
                    </div>
                </div>
            </section>
         
            <section class="confrim_order">
                <div class="paidLeft">
                    <p>待支付 ¥{{totalCount}}</p>
                </div>
                <div class="PaidRight">
                    <a  :href="baseImgUrl"> 确认下单</a>
                </div>
               
            </section>    
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
 import {mapState, mapGetters,mapActions} from 'vuex'
 
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import alertTip from '../../components/AlertTip/AlertTip.vue'

    export default {
        data () {
         return {
             total_money:'',
             userId:'',
             goodsIds:[],
             shoppingCounts:[],
             baseImgUrl:'',     
         }
       },
       mounted() {
           this.userId=this.userInfo.userId
           console.log(this.userId)
        //    this.$store.dispatch("getShopCart",this.userId)           
       },
       created() {
          this.initData();   
       },
       computed: {
            ...mapState(['shopCart','userInfo']),
             ...mapGetters(['totalCount', 'totalPrice']),
       },
    
       methods: {
           initData(){
              this.total_money= this.totalPrice,
              this.baseImgUrl="http://wlgzs.org:10012/order/ali?total_money="+this.total_money 
           },         
       },
       components: {
         HeaderTop
       }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"

  .confirmOrderContainer
     padding-top 1.95rem
     padding-bottom 3rem
        p,span
         font-family: Helvetica Neue,Tahoma,Arial;
    .container_style
     background-color: #fff;
     margin-top: .4rem;
     padding: 0 .7rem;
    .header_style
     line-height:2rem
     color #666
     .more_type
      width: 10rem;
      display: inline-block;
      text-align: right;
      vertical-align: middle; 
      .svg
       fill:#ccc
    .food_list
     background-color: #fff;
     margin-top: .4rem; 
     header
      padding: 20px;
      border-bottom: 0.025rem solid #f5f5f5;
     .food_list_ul
       padding-top: .5rem;
       .food_item_style
        line-height: 20px;
        padding: 0 .7rem;
        span,p
         font-size:0.65rem
         color:#666
        .food_name
         width:11rem
        .num_price
         text-align:right
         flex: 1;
         align-items: center;
         span:nth-of-type(1)
           color: #f60;
     .food_item_style2
        line-height: 20px;
        padding: 0 .7rem;
        span,p
         font-size:0.65rem
         color:#666
        .food_name2
         width:11rem
         p
          font-size:20px
        .num_price2
         flex: 1;
         align-items: right;
         text-align:right
         span
          font-size:20px;
          text-align:right
         span:nth-of-type(1)
           color: #f60;     
       .total_price
        border-top: 0.025rem solid #f5f5f5;
    .confrim_order
     display: flex;
     position: fixed;
     bottom: 0;
     width: 100%;
     height: 3rem;
     .paidLeft
      width:60%;
      height;100%;
      background:#eee;
      text-align:center
      line-height:3rem
      float:left
     .PaidRight
      float:right
      width:40%
      height:100%
      background:#333
      line-height:3rem
      text-align:center
      a
       color:#fff 
  
        
        
</style>
