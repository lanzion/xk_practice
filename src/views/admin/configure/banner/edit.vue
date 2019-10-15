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
    <el-form-item label="标题" prop="bannerName">
      <el-col :span="20">
        <el-input v-model="form.bannerName" placeholder="请输入标题" ></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-col :span="20">
        <el-input type="textarea" :rows="4" placeholder="请输入备注" v-model="form.remark"></el-input>
      </el-col>
    </el-form-item>

    <el-form-item label="图片列表" prop="cover">
      <ali-upload
        :limit="10"
        :file-list.sync="cover"
        :before-upload="beforeUploadCover"
        accept=".gif, .jpg, .png, .jpeg"
        :on-change="uploadCover"
        @remove="remove"
      >
        <p
          class="upload-list-tips"
        >最多10张，仅支持JPG、GIF、PNG、JPEG格式，文件小于{{ imgStandardFileSize }} M。建议上传图片像素为680*39。</p>
      </ali-upload>
    </el-form-item>
    <el-form-item class="g-operate--box">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit" :loading="isLoading">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
        cover: [],
        remark: "",
        bannerName: ""
      },
      rules: {
        cover: [
          {
            required: true,
            message: "请选择活动封面",
            trigger: ["blur"]
          }
        ],
        bannerName: [{ required: true, message: "请输入标题" ,trigger: ["blur","change"]}],
        remark: [{ required: true, message: "请输入备注" ,trigger: ["blur","change"]}]
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    if (this.$route.query.id) {
      const query = this.$route.query;

      this.form.shcActivityId = query.id;
      this.form.activityId = query.activityId;
      this.form.schoolName = query.schoolName;
    }
  },
  methods: {
    uploadCover({ file } = {}) {
      this.form.cover = this.cover.map((item, index) => {
        return {
          resourceId: item.url,
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
            coverList: formList.cover, 
            remark: formList.content,
            bannerName: formList.bannerName,
          };
         
        } else {
          return false;
        }
      });
    },
    remove(file) {
      this.form.cover = this.cover.map((item, index) => {
        return {
          resourceId: item.url,
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