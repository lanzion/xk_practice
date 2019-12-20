<template>
  <div class="publishedWorks">
    <div class="publishedWorks-btn">
      <span>存草稿</span>
      <span>提交作品</span>
    </div>
    <el-form ref="form" class="g-form--wrap" label-width="100px" :model="form" :rules="rules">
      <el-form-item label="活动封面" prop="cover">
        <ali-upload
          :limit="1"
          :file-list.sync="cover"
          :before-upload="beforeUploadCover"
          accept=".gif, .jpg, .png, .jpeg"
          :on-change="uploadCover"
          @remove="remove"
        ></ali-upload>
        <div class="upload_tips">仅支持JPG、GIF、PNG、JPEG格式，文件小于 5 M。建议上传的图片像素为 600 x 370</div>
      </el-form-item>

      <el-form-item label="活动类型" prop="radio">
        <el-radio v-model="form.radio" label="1">活动作品</el-radio>
        <el-radio v-model="form.radio" label="2">活动感悟</el-radio>
      </el-form-item>

      <el-form-item label="关联活动" prop="value">
        <el-select v-model="form.value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="活动标题" prop="name">
        <el-input v-model="form.name" placeholder="请输入课程设计者单位及名称"></el-input>
      </el-form-item>

      <el-form-item label="活动正文" prop="coursePreparation">
        <editor-bar
          v-model="form.coursePreparation"
          :isClear="isClear"
          @change="coursePreparationChange"
        ></editor-bar>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { upload } from "@/mixin/common";
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import aliUpload from "@/components/common/upload.vue";
import EditorBar from "@/components/common/wangEnduit.vue";
import {
  auditStatus,
  fit,
  status,
  isFree,
  courseType,
  courseDuration
} from "@/utils/utility/dict.js";
export default {
  name: "publishedWorks",
  mixins: [upload, uploadFileSize],
  components: {
    "ali-upload": aliUpload,
    EditorBar: EditorBar
  },
  data() {
    return {
      auditStatus: auditStatus,
      fit: fit,
      status: status,
      isFree: isFree,
      courseType: courseType,
      courseDuration: courseDuration,
      isClear: false,
      options: [],
      isLoading: false,
      cover: [],
      form: {
        name: "",
        cover: "",
        value: "",
        radio: "",
        coursePreparation: ""
      },
      rules: {
        coursePreparation: [
          {
            required: true,
            message: "请填写活动正文",
            trigger: ["blur"]
          }
        ],

        cover: [
          {
            required: true,
            message: "请选择封面",
            trigger: ["blur"]
          }
        ],

        name: [
          { required: true, message: "请填写课程名称", trigger: ["blur"] }
        ],
        radio: [
          { required: true, message: "请填写课程名称", trigger: ["blur"] }
        ],
        value: [
          { required: true, message: "请填写课程名称", trigger: ["blur"] }
        ]
      }
    };
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    coursePreparationChange(val) {
      this.form.coursePreparation = val;
    },
    uploadCover({ file } = {}) {
      this.form.cover = this.cover.map((item, index) => item.url);
    },
    remove(file) {
      this.form.cover = [];
    },
    submit() {
      let that = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          let head, Text;
          this.isLoading = true;
          const formList = Object.assign({}, this.form);
          let resourceList = formList.resourceList.map(v => {
            return { resourceId: v.url, resourceName: v.name };
          });
          formList.resourceList = resourceList;
          formList.cover = this.getFileUrl(formList.cover[0]);
          formList.classificationParent = formList.values[0];
          formList.classificationChildren = formList.values[1];
          if (!formList.auditStatus) formList.auditStatus = "A";
          formList.fit = formList.fit.join(",");
          console.log(formList);
          if (formList.id) {
            head = courseEdit;
            Text = "修改";
          } else {
            head = courseAdd;
            Text = "提交";
          }
          head(formList)
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: `${Text}成功`,
                  type: "success",
                  onClose() {}
                });
                that.$router.push({
                  path: "/practicalManage/courseManage"
                });
              } else {
                this.isLoading = false;
                this.$message({
                  message: res.data.msg || `${Text}失败`,
                  type: "error"
                });
              }
            })
            .finally(() => {});
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.tips {
  color: #7f7f7f;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.g-form--wrap {
  margin-top: 0px;
}
.title {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  color: #000;
}
.publishedWorks {
  position: relative;
  margin-bottom: 50px;
  .publishedWorks-btn {
    position: absolute;
    cursor: pointer;
    right: 0;
    top: 0;
    span{
        display: inline-block;
        width: 80px;
        height: 30px;
        border-radius: 4px;
        background: #008aff;
        color:#fff;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
    }
  }
}
</style>
