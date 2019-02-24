<template>
  <section class="addGood">  
     <div v-if="userInfo.userId">
       <HeaderTop title="个人信息修改">
         <a class="back" slot="left" @click="$router.back()">
            <i class="iconfont icon-arrow_left"></i>
         </a>
        </HeaderTop>
         <form class="addGood_form" @submit.prevent="editInfo()"> 
         <div class="rows">
             <label for="" class="label">用户名：</label>
             <input type="text"  class="addGood_input" v-model="nickname">
         </div>
          <div class="rows">
              <label for="" class="label">手机号：</label>
               <input type="text"   class="addGood_input" v-model="phone">
          </div>
          <div class="rows">
              <label for="" class="label">邮箱：</label>
               <input type="text"  class="addGood_input" v-model="email">
          </div>
          <div class="rows">
              <label for="" class="label">接收地址：</label>
               <input type="text"  class="addGood_input" v-model="acceptAddress" style="border:none">
          </div>
          <div class="rows">
              <label for="" class="label">城市：</label>
               <input type="text"  class="addGood_input" v-model="city" style="border:none">
          </div>
           <div class="ro">
            <input type="submit"  class="addGood_submit" value="确定修改"> 
        </div>
    </form>
     </div>
     <div v-else>
         <section class="create">
           <section class="create_no_login">
            <img src="./images/person.png">
            <h3>抱歉，您还没有登录！</h3>
            <button @click="toLogin()">立即登陆</button>
           </section>
        </section>
     </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import { infoEdit} from '../../api'
// import { userInfo } from 'os';
export default {
  data() {
    return {
      nickname:'',
      phone:'',
      acceptAddress:'',
      email:'',
      city:''      
    }
  },
  created() {
    this.nickname = this.userInfo.nickname,
    this.phone = this.userInfo.phone,
    this.acceptAddress = this.userInfo.acceptAddress,
    this.email = this.userInfo.email,
    this.city = this.userInfo.city   
},
  mounted(){
    let param = this.$route.query.userId  
    this.$store.dispatch('getUserInfo',param)
  },
  computed:{
      ...mapState(['userInfo'])
  },
  methods: {
    toLogin(){
      this.$router.push('/login')
    },
    async editInfo(){
      var userId=this.$route.query.userId
      const {nickname,phone,acceptAddress,email,city}=this    
      this.$store.dispatch('infoEdit',{nickname,phone,acceptAddress,email,city,userId})// 发送ajax请求密码登录
      },
  },
  components: {
      HeaderTop
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .create  //创建店铺
   width 100%
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
