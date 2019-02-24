  <template>
  <section class="addGood">
    <HeaderTop title="创建店铺">
    
      <a class="back" slot="left">
      <router-link :to="{path:'/store/goods',query:{storeId:userInfo.storeId}}">
        <i class="iconfont icon-arrow_left"></i>
          </router-link>
      </a> 
   
    </HeaderTop>
    <form class="addGood_form" @submit.prevent="addStore()" id="myFormElement">      
       <input type="hidden" v-model="userInfo.userId" value="">  
         <div class="rows">
             <label for="" class="label">店铺名：</label>
             <input type="text"  class="addGood_input" v-model="storeName">
         </div>
         <div class="row">
             <label for="" class="label">店铺简介：</label>
             <textarea v-model="storeIntroduction"  id="" cols="33" rows="8" style="border:1px solid #333;margin:10px 0 0px 28px"></textarea>
         </div>
        <div class="ro">
            <input type="submit" class="addGood_submit" value="创建"> 
        </div>
    </form>
  </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip.vue'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import { createStores} from '../../api'
  import {mapState} from 'vuex'
import { userInfo } from 'os';

  export default {

  data () { 
      return {
        userId:'',
        storeName:'',        
        storeIntroduction:'',
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
      methods:{
         changeImage(e) {
      var file = e.target.files[0]
      var reader = new FileReader()
      var that = this
      reader.readAsDataURL(file)
      reader.onload = function(e) {
        that.userIdCard = this.result
      }
    },
       async addStore(){
           let userId=this.$store.state.userInfo.userId
           var param=new FormData()
            param.append("storeName",this.storeName)
            param.append("storeIntroduction",this.storeIntroduction)
            param.append("userId",userId)
            this.$store.dispatch('createStores',param)      
         },
 
      },
    components: {
      HeaderTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .addGood
    width 100%
    height 100%
    overflow hidden
    .addGood_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
    .rows 
        width 100%
        height 35px
        margin-bottom 10px
     .label
          float left 
          width 27%
          text-align right 
          line-height 35px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.addGood_input
          float left 
          width 60%
          border 1px solid #DEE1E6
          font-size 14px
          color #333
          // background-color #f2f2f2
        &.addGood_file
          float left 
          width 60%
          // border 1px solid #f2f2f2
          font-size 14px
          color #333
          padding-top 8px
        
        &.addGood_submit
          float center
          width 100%
          border 4px solid #CA0C16
          font-size 16px
          color #fff
          marhin:0px auto
          background-color #CA0C16
      
    .ro
       width 80%
       height 30px
       margin 20px auto

    .list
      .list_container
        background-color: #fff;
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-right: 10px
            .restaurant_img
              width 50px
              height 50px
              display block
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
 
</style>