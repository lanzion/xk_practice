<template>
  <el-form ref="form" class="g-form--wrap" label-width="100px" :model="form" :rules="rules">
    <div class="title">课程基本信息</div>
    <el-form-item label="活动分类" prop="typeParent">
      <el-select v-model="form.typeParent" filterable placeholder="请选择活动分类">
        <el-option
          v-for="item in activityTypeParent"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
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
    <el-form-item label="适合学段" prop="fitSection">
      <el-checkbox-group v-model="form.fitSection">
        <el-checkbox v-for="(item) in fit" :label="item.code" :key="item.code">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="是否收费" prop="free">
      <el-radio-group v-model="form.free">
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
    <el-form-item label="报名时间">
      <el-row>
        <el-col :span="14">
          <div class>
            <el-date-picker
              v-model="startTimeAndEndTime"
              @change="changestartTimeAndEndTime"
              format="yyyy 年 MM 月 dd 日"
              value-format="timestamp"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="活动时间">
      <div class="block">
    <el-date-picker
      v-model="value"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      placeholder="选择日期">
    </el-date-picker>
    <span>{{value}}</span>
  </div>
    </el-form-item>
    <el-form-item label="每场人数限制" prop="enrollMaxNum">
      <el-input
        v-model="form.enrollMaxNum"
        :style="{'width':'100px'}"
        placeholder
        oninput="value=value.replace(/[^\d]/g,'')"
      ></el-input>
      <span>人</span>
    </el-form-item>
    <el-form-item label="活动地点" prop="address">
      <el-input v-model="form.address" placeholder="请输入活动地点"></el-input>
    </el-form-item>
    <el-form-item label="集合地点" prop="place">
      <el-input v-model="form.place" placeholder="请输入集合地点"></el-input>
    </el-form-item>
    <div class="title">活动联系人信息</div>
    <el-form-item label="联系人" prop="contactName">
      <el-input v-model="form.contactName" placeholder="请输入联系人"></el-input>
    </el-form-item>
    <el-form-item label="联系人电话" prop="contactPhone">
      <el-input v-model="form.contactPhone" placeholder="请输入联系电话"></el-input>
    </el-form-item>
    <div class="title">活动详情</div>
    <editor-bar v-model="form.detail" :isClear="isClear" @change="activityDesignChange"></editor-bar>
    <br />
    <br />
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
import { getActivityTypeParent } from "@/api/resetApi";
import {
  auditStatus,
  fit,
  status,
  isFree,
  courseType,
  courseDuration
} from "@/utils/utility/dict.js";
import { validatePhone } from "@/utils/utility/validateRule.js";
export default {
  mixins: [upload, uploadFileSize],
  components: {
    "ali-upload": aliUpload,
    EditorBar: EditorBar
  },
  data() {
    return {
      value: '',
      startTimeAndEndTime: '',
      activityTypeParent: [],
      fit: fit,
      status: status,
      isFree: isFree,
      isClear: false,
      activityList: [],
      cover: [],
      fileType: ".doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar",
      form: {
        fitSection: [],
        resourceList: []
      },
      rules: {
        typeParent: [
          {
            required: true,
            message: "请选择活动分类",
            trigger: ["change"]
          }
        ],
        name: [
          {
            required: true,
            message: "请填写活动名称",
            trigger: ["change"]
          }
        ],
        cover: [
          {
            required: true,
            message: "请上传课程封面",
            trigger: ["change"]
          }
        ],
        fitSection: [
          {
            required: true,
            message: "请选择学段",
            trigger: ["change"]
          }
        ],
        free: [
          {
            required: true,
            message: "请选择是否收费",
            trigger: ["change"]
          }
        ],
        fitSection: [
          {
            required: true,
            message: "请选择学段",
            trigger: ["change"]
          }
        ],
        enrollMaxNum: [
          {
            required: true,
            message: "请填写每场限制人数",
            trigger: ["change","blur"]
          }
        ],
        address: [
          {
            required: true,
            message: "请填写活动地点",
            trigger: ["change","blur"]
          }
        ],
        contactName: [
          {
            required: true,
            message: "请填写联系人",
            trigger: ["change"]
          }
        ],
        contactPhone: [
          {
            required: true,
            message: "请填写联系人电话",
            trigger: ["blur"],
            validator: validatePhone
          }
        ],
      }
    };
  },
  computed: {},
  methods: {
    test(e){
      console.log(e);
      this.form.activityDates = e;
    },
    uploadCover({ file } = {}) {
      this.form.cover = this.cover.map((item, index) => item.url);
    },
    remove(file) {
      this.form.cover = [];
    },
    activityDesignChange(val) {
      this.form.detail = val;
    },
    cancel() {
      this.$router.go(-1);
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true;
          const formList = Object.assign({}, this.form);
          let resourceList = formList.resourceList.map(v => {
            return { resourceUrl: v.url, name: v.name };
          });
          formList.resourceList = resourceList;
          formList.cover = this.getFileUrl(formList.cover[0]);
          console.log(formList);
        }
      });
    },
    getActivityTypeParent() {
      getActivityTypeParent({})
        .then(res => {
          const datas = res.data;
          if (datas) {
            let arrBox = [];
            datas.typelist.forEach(o => {
              let arr = o.dicDetailList.map(k => {
                return {
                  value: k.code,
                  label: k.name
                };
              });
              arrBox.push({
                value: o.code,
                label: o.name,
                children: arr
              });
            });

            this.activityTypeParent = arrBox;
          }
        })
        .finally(() => {});
    },
    changestartTimeAndEndTime(val) {
      console.log(val);
      this.startTimeAndEndTime = val
    }
  },
  created() {
    this.getActivityTypeParent();
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