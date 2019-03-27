 <template>
  <section class="addGood">
    <HeaderTop title="添加商品">
      <a class="back" slot="left" @click="$router.back()">
        <i class="iconfont icon-arrow_left"></i>
      </a>
    </HeaderTop>
    <form class="addGood_form" @submit.prevent="addgoods()" enctype ="multipart/form-data">
         <div class="rows">
             <label for="" class="label">商品名：</label>
             <input type="text" name="name" class="addGood_input" v-model="name">
         </div>
         <div class="rows">
             <label for="" class="label">价格：</label>
             <input type="text" name="money" class="addGood_input" v-model="money">
         </div>
         <div class="rows">
             <label for="" class="label">库存：</label>
             <input type="text" name="inventory" class="addGood_input" v-model="inventory">
         </div>
         <div class="rows">
             <label for="" class="label">类型：</label>
             <select v-model="type" class='sele'>
                 <option>甜品饮品</option>
                 <option>五谷杂粮</option>
                 <option>水果蔬菜</option>
                 <option>肉质蛋类</option>
             </select>
         </div>
         <div class="rows">
              <label for="" class="label">商品图片：</label>
              <input @change="fileChange($event)" type="file" id="upload_file"   class="addGood_file" multiple>  
          </div>
        <div class="upload_warp" style="border: 1px solid white;">
            <div class="upload_warp_img" v-show="imgList.length!=0" style="width:100%;height:auto">
                <div class="upload_warp_img_div" v-for="(item,index) of imgList"style="display:inline-block;padding:5px;width:100px;height:100px" >
                    <div class="upload_warp_img_div_top"  @click="fileDel(index)" style="width: 16px;">
                     <i class="iconfont icon-waimai"></i>
                     </div>
                  <img :src="item.file.src" style="width:100px;height:100px">
                 </div>
             </div>
        </div>  
         <div class="row">
             <label for="" class="label">商品简介：</label>
             <textarea v-model="specification" id="" cols="33" rows="8" style="border:1px solid #333;margin:10px 0 0px 0px;color:#666">在这里添加商品的简介</textarea>
         </div>
        <div class="ro">
            <input type="submit"  class="addGood_submit" value="添加"> 
        </div>
    </form>
  </section>
</template>

<script>
  import AlertTip from '../../../components/AlertTip/AlertTip.vue'
  import HeaderTop from '../../../components/HeaderTop/HeaderTop.vue'
  import {mapState, mapGetters,mapActions} from 'vuex'
  import axios from 'axios';
  export default {
     
  data () {
      return {
        name:'',   
        money:'',
        inventory:'',
        type:'',
        specification:'请在这里添加商品的简介',
        file:'',      
        imgList: [],
      }
    },
      methods:{    
       addgoods(){
            let storeId=this.$store.state.userInfo.storeId
            var param=new FormData()
             param.append("name",this.name),
             param.append("money",this.money),
             param.append("inventory",this.inventory),
             param.append("type",this.type),
             param.append("specification",this.specification),
             param.append('storeId',storeId)
         for(var k = 0; k< this.imgList.length; k++){   
              param.append('file',this.imgList[k].file)            
         }
          this.$store.dispatch('addGoods',param)        
      },   
       fileChange(el){
                if (!el.target.files[0].size) return;
                this.fileList(el.target.files);
                el.target.value = ''
            },
            fileList(files){
                for (let i = 0; i < files.length; i++) {
                    this.fileAdd(files[i]);                  
                }
            },
            fileAdd(file){
                this.size = this.size + file.size;//总大小
                let reader = new FileReader();
                reader.vue = this;
                reader.readAsDataURL(file);
                reader.onload = function () {
                    file.src = this.result;
                    this.vue.imgList.push({
                        file
                    });
                }              
            },
            fileDel(index){
                this.size = this.size - this.imgList[index].file.size;//总大小
                this.imgList.splice(index, 1);
            },
            dragenter(el){
                el.stopPropagation();
                el.preventDefault();
            },
            dragover(el){
                el.stopPropagation();
                el.preventDefault();
            },
            drop(el){
                el.stopPropagation();
                el.preventDefault();
                this.fileList(el.dataTransfer.files);
            },
      },
    components: {
      HeaderTop
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .addGood
    width 100%
    height 100%
    overflow hidden
    .addGood_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
    .upload_warp
     width:100%
     height:auto;
     position:relative
    .rows 
        width 100%
        height 35px
        margin-bottom 10px
     .label
          float left 
          width 27%
          text-align right 
          line-height 35px
      .sele
       width 60%
       float left
       height 35px
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