<template>
  <el-form ref="form" class="g-form--wrap" label-width="100px" :model="form" :rules="rules">
    <div class="title">课程基本信息</div>
    <el-form-item label="活动分类" prop="values">
     <el-select v-model="form.activityList" filterable placeholder="请选择基地/机构" >
        <el-option v-for="item in activityList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
    </el-form-item>
    <el-form-item label="课程封面" prop="cover">
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
    <el-form-item label="适合学段" prop="fit">
      <el-checkbox-group v-model="form.fit">
        <el-checkbox v-for="(item) in fit" :label="item.code" :key="item.code">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="是否收费" prop="isFree">
      <el-radio-group v-model="form.isFree">
        <el-radio
          v-for="(item) in isFree"
          :label="item.code"
          :key="item.code"
          :value="item.code"
        >{{ item.name }}</el-radio>
      </el-radio-group>
      <el-input :style="{'width':'100px'}" v-if="form.isFree==1" v-model="form.price"></el-input>
      <span v-if="form.isFree==1">元</span>
    </el-form-item>
    <el-form-item label="报名时间" prop="name">
      <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
    </el-form-item>
    <el-form-item label="活动时间" prop="name">
      <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
    </el-form-item>
    <el-form-item label="每场人数限制">
      <el-input
        v-model="form.maxCarryingCapacity"
        :style="{'width':'100px'}"
        placeholder
        oninput="value=value.replace(/[^\d]/g,'')"
      ></el-input>
      <span>人</span>
      <!-- <span class="tips">*不填写默认不限制人数</span> -->
    </el-form-item>
    <el-form-item label="活动地点" prop="name">
      <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
    </el-form-item>
    <el-form-item label="集合地点" prop="name">
      <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
    </el-form-item>
    <div class="title">活动联系人信息</div>
    <el-form-item label="联系人" prop="name">
      <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
    </el-form-item>
    <el-form-item label="联系人电话" prop="name">
      <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
    </el-form-item>
    <div class="title">活动详情</div>
    <editor-bar v-model="form.activityDesign" :isClear="isClear" @change="activityDesignChange"></editor-bar>
    <br/>
    <br/>
    <el-form-item label="活动配套资源" prop="resourceList">
      <upload listType="file" :file-list.sync="form.resourceList" :accept="fileType">
        <p
          class="upload_tips"
        >不限数量，文件格式：doc / docx / ppt / pptx / xls / xlsx / zip / rar，单个文件大小不超过8M</p>
      </upload>
    </el-form-item>
    <el-form-item class="g-operate--box">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit">发布活动</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
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
  mixins: [upload, uploadFileSize],
  components: {
    "ali-upload": aliUpload,
    EditorBar: EditorBar
  },
  data() {
    return {
      fit: fit,
      status: status,
      isFree: isFree,
      isClear: false,
      activityList: [],
      cover: [],
      fileType: ".doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar",
      form:{
        fit:[],
        resourceList: [],
      },
      rules:{},
    };
  },
  computed: {
    
  },
  methods: {
    uploadCover({ file } = {}) {
      this.form.cover = this.cover.map((item, index) => item.url);
    },
    remove(file) {
      this.form.cover = [];
    },
    activityDesignChange(val) {
      this.form.activityDesign = val;
    },
    cancel() {
      this.$router.go(-1);
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
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
</style>