 <template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">惠农电商</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">用户注册</a>         
        </div>
      </div>
      <div class="login_content">
       <form @submit.prevent="login">
           <div :class="{on: !loginWay}">             
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="请输入手机号" v-model="phone">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="password">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="password">
                <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right: showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : '...'}}</span>
                </div>          
              </section>
            </section>
            <button class="login_submit">登录</button>             
          </div>
         </form> 
          <!-- 用户注册 -->
          <form  @submit.prevent="regist">
            <div :class="{on: loginWay}">
              <section>
                <section class="login_verification">
              <input type="tel" maxlength="11" placeholder="用户名" v-model="username">
            </section>
            <section class="login_message">
              <input type="tel" maxlength="8" placeholder="密码" v-model="password">
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
            </section>
              </section>  
              <button class="login_submit">注册</button>   
            </div>
          </form>  
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>

    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
  </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip.vue'
  import { reqLogin, reqRegist,checkExsis,checkExsisPhone} from '../../api'
  export default {
    data () {
      return {
        loginWay: false, // true代表短信登陆, false代表密码
        showPwd: false, // 是否显示密码
        phone: 15936517812, // 手机号
        username: '', // 用户名
        password: 123123, // 密码
        alertText: '', // 提示文本
        alertShow: false, // 是否显示警告框
      }
    },

    computed: {
      rightPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },

    methods: {
      showAlert(alertText) {
        this.alertShow = true
        this.alertText = alertText
      },
      //异步登录
      async login(){
        const {phone, password} = this
         if(!this.phone){
              this.showAlert('手机号不能为空')
            return
         } else if(!this.password) {
            this.showAlert('密码输入错误')
            return
        }           
         const result = await reqLogin({phone,password})// 发送ajax请求密码登录
         if(result.resultCode === "SUCCESS") {   
            const user = result.data  
            console.log("user:"+user)
            localStorage.setItem('phone',user.phone) 
            localStorage.setItem('userId',user.userId) 
             console.log("user"+user.storeId)
            if(user.storeId!=0 && user.storeId!=null){
               localStorage.setItem('storeId',user.storeId) 
            }  
            this.$store.dispatch('recordUser', user)// 将user保存到vuex的state
            this.$router.replace('/profile') // 去个人中心界面        
        } else {         
            const message = result.message// 显示警告提示
            this.showAlert(message)
        }
        },
      //异步注册
      async regist(){

         const {username, password,phone} = this
         if(this.username =="") {
            this.showAlert('用户名不能为空')
            return
          } else if(this.password=="") {
            this.showAlert('密码不能为空')
            return
          } 
          else if(this.phone=="" && /^1\d{10}$/gi.test(this.phoneNumber) ) {
            this.showAlert('请输入正确的手机号')
            return
          }
        const exsis =await checkExsis(this.username)
        const exsisPhone =await checkExsisPhone(this.phone)
        if(exsis.resultCode === "FAIL"){
          this.showAlert(exsis.message)
          return
        }  if(exsisPhone.resultCode === "FAIL"){
           this.showAlert(exsisPhone.message)
          return
        }
          const result = await reqRegist({username, password,phone}) // 发送ajax请求密码登陆
             if(result.resultCode === "SUCCESS") {    // 根据结果数据处理
                const user = result.data  
                console.log(result)      
                this.$store.dispatch('recordUser', user)// 将user保存到vuex的state    
                this.$router.replace('/profile') // 去个人中心界面
                 localStorage.setItem('phone',user.phone) 
                 localStorage.setItem('userId',user.userId) 
                if(user.storeId!=0 && user.storeId!=null){
                   localStorage.setItem('storeId',user.storeId) 
                }  

              } else {
                    const msg = result.message
                    this.showAlert(msg)
              }  
      },
      // 关闭警告框
      closeTip () {
        this.alertShow = false
        this.alertText = ''
      },
    },

    components: {
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #ca0c16
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #ca0c16
              font-weight 700
              border-bottom 2px solid #ca0c16
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #ca0c16
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #ca0c16
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #ca0c16
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #c92027
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>