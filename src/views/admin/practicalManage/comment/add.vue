<template>
  <el-form
    ref="form"
    class="g-form--wrap"
    label-width="80px"
    :model="form"
    :rules="rules"
    :isloading="isLoading"
    style="maxWidth:900px;"
  >
    <el-form-item label="点评学校">
      <el-col :span="20">
        <el-input v-model="form.schoolName" placeholder="请输入学校" :disabled="true"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="评语" prop="content">
      <el-col :span="20">
        <el-input type="textarea" :rows="4" placeholder="请填写评语" v-model="form.content"></el-input>
      </el-col>
    </el-form-item>

    <el-form-item label="活动相册" prop="cover">
      <ali-upload
        :limit="5"
        :file-list.sync="cover"
        :before-upload="beforeUploadCover"
        accept=".gif, .jpg, .png, .jpeg"
        :on-change="uploadCover"
        @remove="remove"
      >
        <p
          class="upload-list-tips"
        >最多5张，仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }} M。建议上传图片像素为680*370。</p>
      </ali-upload>
    </el-form-item>
    <el-form-item class="g-operate--box">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit" :loading="isLoading">提交点评</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { commentAdd } from "@/api/resetApi";
import {
  validateAccount,
  validateUserName,
  validateIDCode,
  validatePhone,
  validateEmail
} from "@/utils/utility/validateRule";
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import aliUpload from "@/components/common/upload.vue";

export default {
  mixins: [uploadFileSize],
  components: {
    "ali-upload": aliUpload
  },
  data() {
    return {
      isLoading: false,
      dialogVisible: false,
      cover: [],
      form: {
        shcActivityId: "",
        account: "",
        cover: [],
        schoolId:'',
        content: "",
        schoolName: ""
      },
      rules: {
        cover: [
          {
            required: true,
            message: "请选择活动封面",
            trigger: ["blur"]
          }
        ],
        content: [{ required: true, message: "请填写评语" }]
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    if (this.$route.query.id&&this.$route.query.activityId&&this.$route.query.schoolName&&this.$route.query.schoolId) {
      const query = this.$route.query;

      this.form.shcActivityId = query.id;
       this.form.schoolId = query.schoolId;
      this.form.activityId = query.activityId;
      this.form.schoolName = query.schoolName;
 
    }else{
        this.$message({
                  message: `参数缺失`,
                  type: "error"
                });
    }
  },
  methods: {
    uploadCover({ file } = {}) {
      this.form.cover = this.cover.map((item, index) => {
        return {
          resourceId: this.getFileUrl(item.url),
          resourceName: item.name
        };
      });
    },
    submit() {
      let that = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          const formList = Object.assign({}, this.form);

          const formData = {
            shcActivityId:formList.shcActivityId,
            resourceList: formList.cover, //开始时间
            content: formList.content,
            schoolId: formList.schoolId,
            activityId: formList.activityId
          };
          this.isLoading = true;
          commentAdd(formData)
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  message: `提交成功`,
                  type: "success",
                  onClose() {
                    that.$router.go(-1);
                  }
                });
              } else {
                 this.isLoading = false;
                this.$message({
                  message: res.data.msg || `提交失败`,
                  type: "error"
                });
              }
            })
            .finally(() => {
             
            });
        } else {
          return false;
        }
      });
    },
    remove(file) {
      this.form.cover = this.cover.map((item, index) => {
        return {
          resourceId: this.getFileUrl(item.url),
          resourceName: item.name
        };
      });
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss">
</style>