<template>
  <div>
    <form ref="form"  enctype="multipart/form-data" >
      <label for="">用户名</label>
      <input  v-model="storeName" placeholder="请输入用户名" name="storeName">
      <input  v-model="storeIntroduction" placeholder="请输入用户名" name="storeIntroduction"> 
      <div id="app">
        <div class="hello">
          <div class="upload">
            <div  class="upload_warp_left" @click="fileClick" >
              <button class="btn btn-success">上传图片</button>
            </div>
            <div class="upload_warp_text">
              选中{{imgList.length}}张文件
            </div>
            <div class="upload_warp" style="border: 1px solid white;" >
              <div class="upload_warp_img" v-show="imgList.length!=0">
                <div class="upload_warp_img_div" v-for="(item,index) in imgList" :key="index"
                >
                  <div class="upload_warp_img_div_top">
                    <div class="upload_warp_img_div_text">
                      {{item.file.name}}
                    </div>
                    <!-- //<img src="./del.png" class="upload_warp_img_div_del" @click="fileDel(index)"> -->
                  </div>
                  <img :src="item.file.src">
                </div>
              </div>
            </div>

            <input  @change="fileChange($event)" type="file" id="upload_file" multiple  style="hidden" />

          </div>
        </div>
      </div>
      <button @click.prevent.stop="changeInfo">提交</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      imgList: [],
      size: 0
    };
  },
  mounted() {
    this.getForumData();
  },
  methods: {
      changeInfo(){
        var formData = new FormData(this.$refs.form);         //获取表单数据
      
       formData.append(fileList)
//         let config = {   
//           headers: {
//             'Authorization': getCookie('fetoken')                           //根据需要添加头部token信息
//             }         
//         }
        
        axios.post(`http://wlgzs:10012/store/createStore?userId=4`, formData)         
        .then(res => {
             console.log(res.message)
        })
    },
    fileClick() {
      document.getElementById("upload_file").click();
    },
    fileChange(el) {
      if (!el.target.files[0].size) return;
      this.fileList(el.target.files);
      el.target.value = "";
    },
    fileList(files) {
      for (let i = 0; i < files.length; i++) {
        this.fileAdd(files[i]);
      }
    },
    fileAdd(file) {
    //   this.size = this.size + file.size; //总大小
      let reader = new FileReader();
      reader.vue = this;
      reader.readAsDataURL(file);
      reader.onload = function() {
        file.src = this.result;
        this.vue.imgList.push({
          file
        });
      };
    },
    fileDel(index) {
    //   this.size = this.size - this.imgList[index].file.size; //总大小
      this.imgList.splice(index, 1);
    },
    // bytesToSize(bytes) {
    //   if (bytes === 0) return "0 B";
    //   let k = 1000, // or 1024
    //     sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    //     i = Math.floor(Math.log(bytes) / Math.log(k));
    //   return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    // },
    dragenter(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    dragover(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    drop(el) {
      el.stopPropagation();
      el.preventDefault();
      this.fileList(el.dataTransfer.files);
    }
  }
};
</script>

<style>
.upload_warp_img_div_del {
  position: absolute;
  top: 6px;
  width: 16px;
  right: 4px;
}

.upload_warp_img_div_top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 30px;
  text-align: left;
  color: #fff;
  font-size: 12px;
  text-indent: 4px;
}

.upload_warp_img_div_text {
  white-space: nowrap;
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.upload_warp_img_div img {
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
}

.upload_warp_img_div {
  position: relative;
  height: 100px;
  width: 120px;
  border: 1px solid #ccc;
  margin: 0px 5px 5px 0px;
  float: left;
  line-height: 100px;
  display: table-cell;
  text-align: center;
  background-color: #eee;
  cursor: pointer;
}

.upload_warp_img {
  border-top: 1px solid #d2d2d2;
  padding: 5px 0 0 5px;
  overflow: hidden;
}

.upload_warp_text {
  text-align: left;
  margin-bottom: 5px;
  padding-top: 5px;
  text-indent: 14px;
  border-top: 1px solid #ccc;
  font-size: 14px;
}

.upload_warp_right {
  float: left;
  width: 57%;
  margin-left: 2%;
  height: 100%;
  border: 1px dashed #999;
  border-radius: 4px;
  line-height: 130px;
  color: #999;
}

.upload_warp_left button {
  margin: 8px 5px 0px 5px;
  cursor: pointer;
}

.upload_warp_left {
  float: left;
}

.upload_warp {
  margin: 5px;
}

.upload {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background-color: #fff;
  width: 770px;
  box-shadow: 0px 1px 0px #ccc;
  border-radius: 4px;
}

.hello {
  width: 770px;
  text-align: center;
}
</style>
