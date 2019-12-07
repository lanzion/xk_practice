<template>
  <div class="activityres">
    <el-form
      :model="childForm"
      ref="ruleForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
      :style="{'marginBottm':'20px'}"
    >
      <el-row>
        <el-col :span="15">
          <el-form-item label="关联活动" prop="title">
            <el-select v-model="childForm.activityId" filterable placeholder="请选择关联活动">
              <el-option
                v-for="item in resultActivityList"
                :key="item.activityId"
                :label="item.activityInfo"
                :value="item.activityId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="作者" prop="author">
            <el-input v-model="childForm.author"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="封面图" prop="cover">
            <ali-upload
              :limit="1"
              :file-list.sync="cover"
              :before-upload="beforeUploadCover"
              accept=".gif, .jpg, .png, .jpeg"
              :on-change="uploadcover"
              @remove="removecover"
            >
              <p class="upload-list-tips">仅支持JPG、GIF、PNG、JPEG格式，文件小于 5 M， 建议上传的图片像素为288 x 178px</p>
            </ali-upload>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="活动概述" prop="summary">
            <el-input v-model="childForm.summary" type="textarea" autosize></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="活动内容" prop="content">
            <editor-bar v-model="childForm.content" @change="remarkChange" :isClear="isClear"></editor-bar>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import aliUpload from "@/components/common/upload.vue";
import EditorBar from "@/components/common/wangEnduit.vue";
import { resultActivityList } from "@/api/newApi";
export default {
  mixins: [uploadFileSize],
  components: {
    "ali-upload": aliUpload,
    EditorBar: EditorBar
  },
  props: {
    childForm: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      resultActivityList: [],
      isClear: false,
      rules: {
        author: [
          {
            required: true,
            message: "请填写作者",
            trigger: ["change", "blur"]
          }
        ],
        summary: [
          {
            required: true,
            message: "请填写活动概述",
            trigger: ["change", "blur"]
          }
        ],
        content: [
          {
            required: true,
            message: "请填写活动内容",
            trigger: ["change", "blur"]
          }
        ],
        cover: [{ required: true, message: "请上传封面图", trigger: "blur" }]
      }
    };
  },
  computed: {
    cover: {
      get: function() {
        if (this.childForm.cover) {
          return [
            {
              name: "2.png",
              status: "success",
              uploadName: "_2.png",
              url: this.childForm.cover
            }
          ];
        } else {
          return [];
        }
      },
      set: function(v) {
        if (this.childForm.cover) {
          return [
            {
              name: "2.png",
              status: "success",
              uploadName: "_2.png",
              url: this.childForm.cover
            }
          ];
        } else {
          return [];
        }
      }
    }
  },
  methods: {
    uploadcover({ file } = {}) {
      this.$set(this.childForm, "cover", this.getFileUrl(file.url) || null);
    },
    removecover(file) {
      this.$set(this.childForm, "cover", null);
      this.cover = [];
    },
    remarkChange(val) {
      this.childForm.content = val;
    },
    //   获取关联活动
    async getResultActivityList() {
      const res = await resultActivityList();
      const { appendInfo: datas = [] } = res.data;
      try {
        if (res.data.code == 200) {
          this.resultActivityList = datas.activities;
        }
      } catch (err) {
        console.log(err);
      }
    },
    submitForm() {
      let flag = null;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    }
  },
  mounted() {},
  created() {
    this.getResultActivityList();
  }
};
</script>

<style lang="scss" scoped>
</style>