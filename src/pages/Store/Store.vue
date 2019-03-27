 <template>
<div class="conwrap2">
     <section class="create" v-if="!userId" style="-webkit-transform:none !important">
      <section class="create_no_login">
      <img src="./images/person.png">
      <h3>抱歉，您还没有登录！</h3>
      <button @click="toLogin()">立即登录</button>
      </section>
    </section>
      <section class="create" v-else-if="!storeId" style="-webkit-transform:none !important">
            <section class="create_no_login">
            <img src="./images/person.png">
            <h3>抱歉，您还没有店铺！</h3>
            <button @click="createStore">创建店铺</button>
            </section>
          </section>
  <section v-else style="-webkit-transform:none !important">
       <ShopHeader/>
          <div class="tab">
              <div class="tab-item">
               <router-link :to="{path:'/store/goods',query:{storeId:storeId}}" replace>商品</router-link>
              </div>
          
            <div class="tab-item">
                <router-link :to="{path:'/store/info',query:{storeId:storeId}}" replace>详情</router-link>
            </div>
          </div>
          <keep-alive>
            <router-view/>
          </keep-alive>
  </section>
</div>
</template>

<script>
  import BScroll from 'better-scroll'
  import { MessageBox, Toast } from 'mint-ui'
  import {mapState} from 'vuex'
  import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'

  export default {
    data() {
      return {
        userId:localStorage.getItem('userId'),
        storeId:localStorage.getItem('storeId')     
      }
    },
    mounted () {
      this.aa()
      // let storeId=localStorage.getItem('storeId') 
      //  this.$store.dispatch('getStoreGoods',storeId)
      //  this.$store.dispatch('getStoreInfo',storeId)
    },
    computed:{
      ...mapState(['userInfo','storeInfo'])
    },
    methods:{
      createStore:function(){
        this.$router.push('/createStore')
      },
      toLogin(){
         this.$router.push('/login')
      },
      aa(){
        this.$nextTick(() => {// 一旦完成界面更新, 立即调用(此条语句要写在数据更新之后),滚动
          new BScroll('.conwrap2', {
            click: true        
          })
        })
      }
    },

    components: {
      ShopHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .conwrap2
   width:100%
   position:fixed
   top:0
   bottom:48px
   left:0
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 50%
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
  .create  //创建店铺
    width 100%
    -webkit-transform:none !important
    transform:none !important
  .create_no_login
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