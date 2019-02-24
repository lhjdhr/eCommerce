<template>
  <div class="con">
      <div class="paidTitle">
           <p>支付成功</p>
      </div>
      <div class="paidPic">
         <img src="./images/pic.png">
      </div>
       
       <div class="paidSure" @click="goTo('/msite')">       
             确定 
        </div>  
  </div>
</template>

<script>
    import {mapState, mapGetters,mapActions} from 'vuex'
    import {buildOrders} from '../../api'
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import alertTip from '../../components/AlertTip/AlertTip.vue'
    export default {
        data () {
         return {
             total_money:'',
             userId:'',
             goodsIds:[],
             shoppingCounts:[],
             baseImgUrl:''
         }
       },
       created() {
          this.initData();   
       },
       computed: {
            ...mapState(['shopCart','userInfo']),
             ...mapGetters(['totalCount', 'totalPrice']),
       },
       methods: {
        goTo (path) {
            this.$router.replace(path)
          },
        initData(){
              this.total_money= this.totalPrice,
              this.userId=this.userInfo.userId
              for(let i=0;i<this.shopCart.length;i++){
               this.goodsIds[i]=this.shopCart[i].goodsId;
               }
               for(var i=0;i<this.shopCart.length;i++){
               this.shoppingCounts[i]=this.shopCart[i].goodsCount;
               }
               this.shoppingCounts=[1,2]
               console.log( this.shoppingCounts)
              const {total_money,goodsIds,shoppingCounts,userId}=this
               this.$store.dispatch("bulidOrder",{total_money,goodsIds,shoppingCounts,userId})
              //this.baseImgUrl="http://wlgzs.org:10012/order/buildOrder?total_money="+this.total_money+"&goodsIds="+this.goodsIds+"&shoppingCounts="+this.shoppingCounts+"&userId="+this.userId        
           }
       },
       components: {
         HeaderTop
       }
    }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .con
   width:100%
   height:100%
   position:absolute
   top:0
   left:0
   button:0
   right:0
   background:#F6F6F6
   .paidPic
    width:249px
    height:246px
    margin:0 auto      
   .paidTitle
    text-align:center
    height:45px
    padding-top:10px
    font-weight:500
    font-size:25px
   .paidSure
    width:200px;
    height:35px
    background:#c92027
    margin:10px auto
    border-radius:30px
    text-align:center
    line-height:35px;
    color:#fff
   
    
</style>
