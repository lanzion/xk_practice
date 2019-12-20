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
      <el-input :style="{'width':'100px'}" v-if="form.free==1" v-model="form.price"></el-input>
      <span v-if="form.free==1">元</span>
    </el-form-item>
    <el-form-item label="报名时间" prop="enrollEndDateStr">
      <el-row>
        <el-col :span="14">
          <div class="c-datepicker-date-editor J-datepicker-range-between30 mt10 enrolldate">
            <i class="el-input__icon el-range__icon el-icon-time"></i>
            <input
              placeholder="开始日期"
              name
              class="c-datepicker-data-input"
              :value="form.enrollStartDateStr"
            />
            <span class="c-datepicker-range-separator">-</span>
            <input
              placeholder="结束日期"
              name
              class="c-datepicker-data-input"
              :value="form.enrollEndDateStr"
            />
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="活动时间" prop="activityDates">
      <el-col :span="14" class="activity_box">
        <div
          class="c-datepicker-date-editor J-datepicker-range-between30 mt10 activitydate"
          v-for="(item,index) in activityArr"
          :key="index"
        >
          <i class="el-input__icon el-range__icon el-icon-time"></i>
          <input
            placeholder="开始日期"
            name
            class="c-datepicker-data-input"
            :class="'activityStartDateStr'+index"
            :value="item.activityStartDateStr"
          />
          <span class="c-datepicker-range-separator">-</span>
          <input
            placeholder="结束日期"
            name
            class="c-datepicker-data-input"
            :class="'activityEndDateStr'+index"
            :value="item.activityEndDateStr"
          />
        </div>
      </el-col>
      <el-button type="primary" @click="addActivity" class="addactivity">+ 新增活动场次</el-button>
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
    <el-form-item label="活动配套资源" prop="resourcesLists">
      <upload listType="file" :file-list.sync="form.resourcesLists" :accept="fileType">
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
// import "@/assets/laydate/laydate.js"
import { upload } from "@/mixin/common";
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import aliUpload from "@/components/common/upload.vue";
import EditorBar from "@/components/common/wangEnduit.vue";
import { getActivityTypeParent } from "@/api/resetApi";
import {
  openActivityAdd,
  openActivityDetail,
  openActivityModify
} from "@/api/newApi";
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
      activityArr: [
        {
          activityStartDateStr: "",
          activityEndDateStr: ""
        }
      ],
      activityTypeParent: [],
      fit: fit,
      status: status,
      isFree: [
        {code: 0, name: '免费'},
        {code: 1, name: '收费'},
      ],
      isClear: false,
      activityList: [],
      cover: [],
      fileType: ".doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar",
      form: {
        fitSection: [],
        resourcesLists: [],
        enrollEndDateStr: "",
        activityDates: []
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
            trigger: ["change", "blur"]
          }
        ],
        address: [
          {
            required: true,
            message: "请填写活动地点",
            trigger: ["change", "blur"]
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
            // trigger: ["blur"],
            validator: validatePhone
          }
        ],
        enrollEndDateStr: [
          {
            required: true,
            message: "请选择报名时间",
            trigger: "blur"
          }
        ],
        activityDates: [
          {
            required: true,
            message: "请选择报名时间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    addActivity() {
      this.activityArr.forEach((v, i) => {
        if ($(".activityEndDateStr" + i).val()) {
          v.activityStartDateStr = $(".activityStartDateStr" + i).val();
          v.activityEndDateStr = $(".activityEndDateStr" + i).val();
        }
      });
      this.activityArr.push({
        activityStartDateStr: "",
        activityEndDateStr: ""
      });
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
      this.form.activityDates = [];
      this.activityArr.forEach((v, i) => {
        let obj = {
          activityStartDateStr: "",
          activityEndDateStr: ""
        };
        if ($(".activityEndDateStr" + i).val()) {
          obj.activityStartDateStr = $(".activityStartDateStr" + i).val();
          obj.activityEndDateStr = $(".activityEndDateStr" + i).val();
          this.form.activityDates.push(obj);
        }
      });
      this.$refs.form.validate(valid => {
        if (valid) {
          let head, Text;
          const id = this.form.id;
          this.isLoading = true;
          const formList = Object.assign({}, this.form);
          let resourcesLists = formList.resourcesLists.map(v => {
            return { resourceUrl: v.url, name: v.name };
          });
          formList.resourcesLists = resourcesLists;
          formList.cover = this.getFileUrl(formList.cover[0]);
          formList.fitSection = formList.fitSection.join(",");
          if (id) {
            head = openActivityModify;
            Text = "修改";
          } else {
            head = openActivityAdd;
            Text = "新增";
          }
          head(formList).then(res => {
            try {
              let _data = res.data;
              if (_data.code == 200) {
                this.$message({
                  message: `${Text}成功`,
                  type: "success"
                });
                this.$router.push({
                  path: "/practicalManage/openActivityList"
                });
              } else {
                this.$message({
                  message: res.data.msg || `${Text}失败`,
                  type: "error"
                });
              }
            } catch (err) {
              console.log(err);
            } finally {
            }
          });
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
            this.getOpenActivityDetail();
          }
        })
        .finally(() => {});
    },
    getOpenActivityDetail() {
      const id = this.id || this.$route.query.id;
      if (!id) return;
      this.showLoading();
      openActivityDetail({ id }).then(res => {
        try {
          let data = res.data;
          if (data.code == 200) {
            let formList = Object.assign({}, data.entity);
            formList.fitSection = formList.fitSection.split(",");
            this.cover = [
              {
                name: "2.png",
                status: "success",
                uploadName: "_2.png",
                url: formList.cover
              }
            ];
            let _resourceList = [];
            if (formList.resourcesLists) {
              formList.resourcesLists.forEach(o => {
                _resourceList.push({
                  name: o.name,
                  status: "success",
                  uploadName: o.name,
                  url: o.resourceUrl
                });
              });
            }
            formList.resourcesLists = _resourceList;
            formList.cover = [formList.cover];
            formList.enrollStartDateStr = formList.enrollStartDate;
            formList.enrollEndDateStr = formList.enrollEndDate;
            if (formList.activityDates) {
              this.activityArr = [];
              formList.activityDates.forEach(v => {
                this.activityArr.push({
                  activityStartDateStr: v.activityStartDate,
                  activityEndDateStr: v.activityEndDate
                });
              });
            }
            this.form = formList;
          }
        } catch (err) {
          console.log(err);
        } finally {
          this.hideLoading();
        }
      });
    }
  },
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      $(".enrolldate").datePicker({
        isRange: true,
        hide: function(type) {
          _this.form.enrollStartDateStr = this.$input.eq(0).val();
          _this.form.enrollEndDateStr = this.$input.eq(1).val();
        }
      });
      $(".activity_box").on("focus", ".activitydate", function() {
        $(this).datePicker({
          isRange: true,
          hide: function(type) {
            _this.activityArr.forEach((v, i) => {
              if ($(".activityEndDateStr" + i).val()) {
                v.activityStartDateStr = $(".activityStartDateStr" + i).val();
                v.activityEndDateStr = $(".activityEndDateStr" + i).val();
              }
            });
          }
        });
      });
    });
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
.addactivity {
  position: absolute;
  left: 63%;
  bottom: 0;
}
.c-datepicker-range-separator {
  vertical-align: top;
}
.el-input__icon {
  vertical-align: top;
  line-height: 30px;
}
</style>