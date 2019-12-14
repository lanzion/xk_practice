<template>
  <el-form ref="form" class="g-form--wrap" label-width="100px" :model="form" :rules="rules">
    <div class="title">课程基本信息</div>
    <el-form-item label="基地/机构" prop="baseinfoId">
      <el-select
        v-model="form.baseinfoId"
        filterable
        placeholder="请选择基地/机构"
        v-el-select-loadmore="loadmore"
      >
        <el-option v-for="item in beasList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="课程分类" prop="classificationParent">
      <!-- <el-cascader v-model="form.values" :options="options" :props="{ expandTrigger: 'hover' }" placeholder="请选择课程分类"></el-cascader> -->
      <el-select v-model="form.classificationParent" filterable placeholder="请选择课程分类">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="课程名称" prop="name">
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

    <el-form-item label="选修类型">
      <el-radio-group v-model="form.courseType">
        <el-radio v-for="(item) in courseType" :label="item.code" :key="item.code">{{ item.name }}</el-radio>
      </el-radio-group>
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

    <el-form-item label="课程时长" prop="courseDuration">
      <el-select v-model="form.courseDuration" placeholder="请选择课程时长" :style="{'width':'200px'}">
        <el-option
          v-for="item in courseDuration"
          :key="item.value"
          :label="item.name"
          :value="item.code"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="最大承载量">
      <el-input
        v-model="form.maxCarryingCapacity"
        :style="{'width':'100px'}"
        placeholder
        oninput="value=value.replace(/[^\d]/g,'')"
      ></el-input>
      <span>人</span>
      <span class="tips">*不填写默认不限制人数</span>
    </el-form-item>

    <el-form-item label="课程设计者" prop="courseDesigner">
      <el-input v-model="form.courseDesigner" placeholder="请输入课程设计者单位及名称"></el-input>
    </el-form-item>

    <div class="title">课程内容</div>

    <el-form-item label="课程简介" prop="synopsis">
      <el-input type="textarea" :rows="4" placeholder="请填写课程学习简介" v-model="form.synopsis"></el-input>
    </el-form-item>
    <el-form-item label="课程目标" prop="target">
      <el-input type="textarea" :rows="4" placeholder="请填写课程学习目标" v-model="form.target"></el-input>
    </el-form-item>
    <el-form-item label="课程准备" prop="coursePreparation">
      <editor-bar
        v-model="form.coursePreparation"
        :isClear="isClear"
        @change="coursePreparationChange"
      ></editor-bar>
    </el-form-item>
    <el-form-item label="课程活动设计" prop="activityDesign">
      <editor-bar v-model="form.activityDesign" :isClear="isClear" @change="activityDesignChange"></editor-bar>
    </el-form-item>

    <el-form-item label="学习任务单" prop="studyAssignments">
      <editor-bar
        v-model="form.studyAssignments"
        :isClear="isClear"
        @change="studyAssignmentsChange"
      ></editor-bar>
    </el-form-item>

    <el-form-item label="课程配套资源" prop="resourceList">
      <upload listType="file" :file-list.sync="form.resourceList" :accept="fileType">
        <p
          class="upload_tips"
        >不限数量，文件格式：doc / docx / ppt / pptx / xls / xlsx / zip / rar，单个文件大小不超过8M</p>
      </upload>
    </el-form-item>

    <el-form-item class="g-operate--box">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit" :loading="isLoading">发布课程</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { activityList, BaseList } from "@/api/newApi";
import {
  courseEdit,
  courseAdd,
  getActivityTypeParent,
  selectAllList,
  courseDetail
} from "@/api/resetApi";

import {
  validateAccount,
  validateUserName,
  validateIDCode,
  validatePhone,
  validateEmail
} from "@/utils/utility/validateRule";
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
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        const SELECTWRAP_DOM = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        SELECTWRAP_DOM.addEventListener("scroll", function() {
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
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
      fileType: ".doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar",
      cover: [],
      options: [],
      isLoading: false,
      form: {
        domainModuleParent: "",
        domainModuleChildren: "",
        name: "",
        cover: "",
        synopsis: "",
        target: "",
        coursePreparation: "",
        activityDesign: "",
        studyAssignments: "",
        auditStatus: "",
        fit: [],
        status: "",
        isFree: "",
        courseType: "",
        courseDuration: "",
        courseDesigner: "",
        resourceList: [],
        values: []
      },
      rules: {
        baseinfoId: [
          {
            required: true,
            message: "请填写基地/机构名称",
            trigger: ["change"]
          }
        ],
        bureauEducation: [
          {
            required: true,
            message: "请填写教育局名称",
            trigger: ["change"]
          }
        ],
        cover: [
          {
            required: true,
            message: "请选择封面",
            trigger: ["change"]
          }
        ],
        target: [
          {
            required: true,
            message: "请填写课程目标",
            trigger: ["blur"]
          }
        ],
        fit: [
          {
            required: true,
            message: "请选择合适学段",
            trigger: ["change"]
          }
        ],
        classificationParent: [
          {
            required: true,
            message: "请选择课程分类",
            trigger: ["change", "blur"]
          }
        ],
        courseDesigner: [
          {
            required: true,
            message: "请填写课程设计者单位及名称",
            trigger: ["blur"]
          }
        ],
        name: [
          { required: true, message: "请填写课程名称", trigger: ["blur"] }
        ],
        courseType: [
          {
            required: true,
            message: "请选择课程类型",
            trigger: ["blur"]
          }
        ],
        courseDuration: [
          {
            required: true,
            message: "请选择课程时长",
            trigger: ["blur"]
          }
        ],
        isFree: [
          {
            required: true,
            message: "课程是否收费",
            trigger: ["change", "blur"]
          }
        ],
        status: [
          {
            required: true,
            message: "请选择课程状态",
            trigger: ["blur"]
          }
        ],
        synopsis: [
          {
            required: true,
            message: "请填写课程简介",
            trigger: ["blur"]
          }
        ]
      },
      baseData: {
        pageIndex: 1,
        pageSize: 20
      },
      beasList: []
    };
  },
  watch: {},
  created() {
    this.getActivityTypeParent();
    this.getDetailData();
  },
  mounted() {
    this.getBaseList(this.baseData);
  },
  methods: {
    loadmore() {
      this.baseData.pageIndex++;
      this.getBaseList(this.baseData);
    },
    getBaseList(baseData) {
      BaseList({}, baseData).then(res => {
        const { entity: datas = {} } = res.data;
        let _list = datas.resultData || [];
        this.beasList = [...this.beasList, ..._list];
      });
    },
    coursePreparationChange(val) {
      this.form.coursePreparation = val;
    },
    activityDesignChange(val) {
      this.form.activityDesign = val;
    },
    studyAssignmentsChange(val) {
      this.form.studyAssignments = val;
    },
    // 获取详情
    getDetailData() {
      const id = this.id || this.$route.query.id;
      if (id) {
        this.showLoading();
        courseDetail({ id })
          .then(res => {
            const { code, entity: datas } = res.data;
            if (code === 200 && datas) {
              this.cover = [
                {
                  name: "2.png",
                  status: "success",
                  uploadName: "_2.png",
                  url: datas.cover
                }
              ];
              this.form = datas;
              let _resourceList = [];
              datas.resourceList.forEach(o => {
                _resourceList.push({
                  name: o.resourceName,
                  status: "success",
                  uploadName: o.resourceName,
                  url: o.resourceId
                });
              });
              this.form.resourceList = _resourceList;
              this.form.cover = [datas.cover];
              this.form.values = [
                datas.classificationParent,
                datas.classificationChildren
              ];
              this.form.fit = datas.fit.split(",");
              console.log(this.form);
            } else {
              this.$message({
                message: res.data.msg || `加载失败`,
                type: "error"
              });
            }
          })
          .finally(() => {
            this.hideLoading();
          });
      }
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

            this.options = arrBox;
          }
        })
        .finally(() => {});
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
          // formList.classificationParent = formList.values[0];
          // formList.classificationChildren = formList.values[1];
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
    },

    cancel() {
      this.$router.go(-1);
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
