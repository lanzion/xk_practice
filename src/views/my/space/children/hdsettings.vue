<template>
  <div class="hdsettings">
    <div class="titlego">
      <h4>头像设置</h4>
    </div>
    <!--elementui的上传图片的upload组件-->
    <div class="uploadtime">
      <ali-upload
        list-type="file"
        :show-file-list="false"
        :before-upload="beforeUploadCover"
        :on-success="uploadFile"
        accept=".gif, .jpg, .png, .jpeg"
      >
        <p
          slot="trigger"
          class="upload-list-tips"
        >大小不能超过{{ imgStandardFileSize }}M，仅支持gif、jpg、jpeg、png格式</p>
      </ali-upload>
    </div>
    <div :style="{'height':'300px','marginTop':'10px','position':'relative'}">
      <div class="overimg">
        <img :src="cover.url?cover.url:imgurl" alt />
      </div>
      <div class="overoneimg">
        <img :src="cover.url?cover.url:imgurl" alt />
      </div>
      <div class="overtwoimg">
        <img :src="cover.url?cover.url:imgurl" alt />
      </div>
      <div class="overthrimg">
        <img :src="cover.url?cover.url:imgurl" alt />
      </div>
      <span class="prompt">-------您上传的图片将自动生成三种尺寸的头像-------</span>
    </div>
    <div :style="{'textAlign':'center','marginTop':'30px'}">
      <el-button @click="goback()">取消</el-button>
      <el-button type="primary" @click="submit">保存</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { modifyUserFace } from "@/api/frontstage";
import { upload } from "@/mixin/common";
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import aliUpload from "@/components/common/upload.vue";
export default {
  name: "hdsettings",
  mixins: [upload, uploadFileSize],
  components: {
    "ali-upload": aliUpload
  },
  computed: {
    ...mapState("login", {
      cover: state => (state.userInfo || {}).face || null
    })
  },
  data() {
    return {
      cover: []
    };
  },
  methods: {
    uploadFile({ file } = {}) {
      this.cover = file;
      // console.log(file);
    },
    remove(file) {
      this.cover = [];
    },
    submit() {
      let that = this;
      const formData = {
        face: this.cover.url
      };
      modifyUserFace(formData)
        .then(res => {
          that.$store.commit("SAVE_USERINFOPARAM", that.user.face);
          if (res.data.code === 200) {
            this.$message({
              message: `提交成功`,
              type: "success",
              onClose() {
                that.$router.go(-1);
              }
            });
          } else {
            this.$message({
              message: res.data.msg || `提交失败`,
              type: "error"
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
      // } else {
      //   return false;
      // }
      // });
    },
    goback() {
      this.$router.go(-1);
    }
  },
  created() {
    this.$store.commit("changetitle", "头像设置");
    // console.log(this);
  }
};
</script>
<style lang="scss" scoped>
.uploadtime {
  padding: 40px;
  box-sizing: border-box;
}
.upload-list-tips {
  display: inline;
  margin-left: 10px;
  font-size: 14px;
}
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
