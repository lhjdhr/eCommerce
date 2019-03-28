<template>
  <section class="search">
     <HeaderTop title="搜索">
      <a class="back" slot="left" @click="$router.back()">
        <i class="iconfont icon-arrow_left"></i>
      </a>
    </HeaderTop>
    <form class="search_form" @submit.prevent="search">
      <input type="search" placeholder="请输入商家名称" class="search_input" v-model="keyword">
      <input type="submit" class="search_submit">
    </form>
    <section class="list" v-if="!noSearchShops">
      <ul class="list_container">
        <!--:to="'/shop?id='+item.id"-->
        <router-link :to="{path:'/goodsDetails', query:{goodsId:item.goodsId}}" tag="li"
                     v-for="item in searchGoods" :key="item.goodsId" class="list_li">
          <div class="item_left">
          <img :src="imgBaseUrl + item.imagePath" class="shop_img">
          </div>
          <section class="item_right">
            <div class="item_right_text">
              <p>
                <span style="font-weight:bold">{{item.name}}</span>
              </p>
              <p>销售： {{item.alreadySell}}斤 </p>
              <p>价格：<span>¥</span>{{item.money}}元</p>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search_none" v-else>很抱歉！无搜索结果</div>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ind from '../../api/index'
  export default {

    data () {
      return {
        keyword: '',
        imgBaseUrl: ind.ImgUrl ,
        noSearchShops: false
      }
    },

    computed: {
      ...mapState(['searchGoods'])
    },

    methods: {
      search () {
        // 得到搜索关键字
        const keyword = this.keyword.trim()
        // 进行搜索
        if(keyword) {
          this.$store.dispatch('searchGoods', keyword)
        }
      }
    },

    watch: {
      searchGoods (value) {
        if(!value.length) { // 没有数据
          this.noSearchShops = true
        } else {// 有数据
          this.noSearchShops = false
        }
      }
    },

    components: {
      HeaderTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #CA0C16
          font-size 16px
          color #fff
          background-color #CA0C16

    .list
      .list_container
        background-color: #fff;
        .list_li
          display: flex;
          justify-content: center;
          padding: 10px
          border-bottom: 1px solid $bc;
          .item_left
            margin-left: 10px;
            height 90px;
            width 90px;
            img 
               width 80px;
               height 80px
 
          .item_right
            font-size 12px
            flex 1
            .item_right_text
              p
                line-height 12px
                margin-bottom 6px
                &:last-child
                  margin-bottom 0
    .search_none
      margin: 0 auto
      color: #333
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
</style>