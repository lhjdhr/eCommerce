<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FooterGuide from './components/FooterGuide/FooterGuide.vue'

  export default {

    mounted () {
      this.getUserInfo()
    },
     created(){
      console.log("购物车的id")
      console.log(this.userInfo.userId)
      this.$store.dispatch("getShopCart",this.userInfo.userId)
    },
    methods: {
      ...mapActions(['getUserInfo'])
    },

    components: {
      FooterGuide
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>