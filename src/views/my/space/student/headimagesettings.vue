<template>
  <div class="hdsettings">
    <div class="titlego">
      <h4>头像设置</h4>
    </div>
    <!--elementui的上传图片的upload组件-->
    <div :style="{'height':'40px','overflow':'hidden','marginTop':'43px'}">
      <el-upload
        class="upload-demo"
        :before-upload="beforeupload"
        action="/123121213112121"
        :style="{'marginLeft':'46px','float':'left','width':'92px','height':'34px','background':'#fff','border':'1px solid #2165fe','borderRadius':'5px'}"
      >
        <div
          class="el-upload__text"
          :style="{'fontSize':'14px','width':'92px','color':'#2165fe','lineHeight':'32px','textAlign':'center'}"
        >
          <em>点击上传</em>
        </div>
      </el-upload>
      <div
        class="el-upload__tip"
        slot="tip"
        :style="{'float':'left','marginLeft':'46px','float':'left','fontSize': '12px'}"
      >只能上传jpg/png文件，且不超过500kb</div>
    </div>
    <div :style="{'height':'300px','marginTop':'75px','position':'relative'}">
      <div class="overimg">
        <img :src="src?src:imgurl" alt />
      </div>
      <div class="overoneimg">
        <img :src="src?src:imgurl" alt />
      </div>
      <div class="overtwoimg">
        <img :src="src?src:imgurl" alt />
      </div>
      <div class="overthrimg">
        <img :src="src?src:imgurl" alt />
      </div>
      <span class="prompt">-------您上传的图片将自动生成三种尺寸的头像-------</span>
    </div>
    <div :style="{'textAlign':'center','marginTop':'30px'}">
      <el-button @click="goback()">取消</el-button>
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "headimagesettings",
  data() {
    return {
    
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      src: ""
    };
  },
  created() {
    this.$store.commit("changetitle", "头像设置");
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    beforeupload(file) {
      // console.log(file);
      //创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL;

      this.src = windowURL.createObjectURL(file);
      //重新写一个表单上传的方法
      this.param = new FormData();
      this.param.append("file", file, file.name);
      return false;
    },
    httprequest() {},
    onSubmit() {
      //表单提交的事件
      var names = this.form.name;
      //下面append的东西就会到form表单数据的fields中；
      this.param.append("message", names);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      //然后通过下面的方式把内容通过axios来传到后台
      //下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
      this.$reqs.post("/upload", this.param, config).then(function(result) {
        // console.log(result);
      });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  created() {
    this.$store.commit("changetitle", "头像设置");
  }
};
</script>
<style lang="scss" scoped>
.titlego {
  width: 100%;
  height: 75px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  h4 {
    font-size: 18px;
    font-size: #333;
    height: 100%;
    line-height: 75px;
    text-indent: 45px;
  }
}
.hdsettings {
  min-height: 500px;
  overflow: hidden;
  padding-bottom: 50px;
}
.overimg {
  width: 300px;
  height: 300px;
  float: left;
  img {
    width: 100%;
    height: 100%;
  }
}
.overimg {
  width: 300px;
  height: 300px;
  float: left;
  img {
    width: 100%;
    height: 100%;
  }
}
.overoneimg {
  width: 180px;
  height: 180px;
  float: left;
  margin-left: 30px;
  margin-top: 120px;
  img {
    width: 100%;
    height: 100%;
  }
}
.overtwoimg {
  width: 140px;
  height: 140px;
  float: left;
  margin-left: 30px;
  margin-top: 160px;
  img {
    width: 100%;
    height: 100%;
  }
}
.overthrimg {
  width: 50px;
  height: 50px;
  float: left;
  margin-left: 30px;
  margin-top: 250px;
  img {
    width: 100%;
    height: 100%;
  }
}
.prompt {
  position: absolute;
  top: 30px;
  right: 250px;
}
</style>
