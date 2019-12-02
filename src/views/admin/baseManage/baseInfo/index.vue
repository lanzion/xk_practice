<template>
  <div class="baseinfo g-search--wrap clearfix" style="maxWidth:1200px;min-width: 700px;">
    <el-form
      :model="form"
      ref="ruleForm"
      :rules="rules"
      label-width="150px"
      class="demo-ruleForm"
      :style="{'marginBottm':'20px'}"
    >
      <el-row>
        <el-col :span="15">
          <el-form-item label="基地/机构" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="授权部门" prop="eduName">
            <el-input v-model="form.eduName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="负责人" prop="leadingCadre">
            <el-input v-model="form.leadingCadre"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="负责人电话" prop="cadrePhone">
            <el-input v-model="form.cadrePhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="联系人" prop="linkMan">
            <el-input v-model="form.linkMan"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="联系人电话" prop="linkPhone">
            <el-input v-model="form.linkPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="指导教师" prop="guideTeacher">
            <el-input v-model="form.guideTeacher"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="指导教师电话" prop="teacherPhone">
            <el-input v-model="form.teacherPhone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="所在地区" prop="provinceId">
            <region type="object" @change="changeRegion" :default="defaultRegion" class="regions"></region>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="详细地址" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="交通方式" prop="transport">
            <el-input v-model="form.transport"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="主页大图" prop="designSpaceBackground">
            <ali-upload
              :limit="1"
              :file-list.sync="homePageCover"
              :before-upload="beforeUploadCover"
              accept=".gif, .jpg, .png, .jpeg"
              :on-change="uploadhomePageCover"
              @remove="removehomePageCover"
            >
              <p
                class="upload-list-tips"
              >用于基地/机构主页个性化展示。仅支持JPG、GIF、PNG、JPEG格式，文件小于 5 M， 建议上传的图片像素为1920 x 400px</p>
            </ali-upload>
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
        <el-col :span="20">
          <el-form-item label="简介" prop="remark">
            <editor-bar v-model="form.remark" @change="remarkChange" :isClear="isClear"></editor-bar>
            <p class="tips">简介将会在基地/机构主页展示</p>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="微信公众号" prop="officialAccounts">
            <ali-upload
              :limit="1"
              :file-list.sync="officialAccounts"
              :before-upload="beforeUploadCover"
              accept=".gif, .jpg, .png, .jpeg"
              :on-change="uploadofficialAccounts"
              @remove="removeofficialAccounts"
            >
              <p class="upload-list-tips">仅支持JPG、GIF、PNG、JPEG格式，文件小于 5 M， 建议上传的图片像素为200 x 200px</p>
            </ali-upload>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="官网" prop="pathUrl">
            <el-input v-model="form.pathUrl"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div :style="{'marginTop':'20px', 'padding-left': '100px','text-align': 'center'}">
      <el-button type="primary" plain style="margin-top: 30px;">取消</el-button>
      <el-button type="primary" @click="submitForm">确认提交</el-button>
    </div>
  </div>
</template>

<script>
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import aliUpload from "@/components/common/upload.vue";
import EditorBar from "@/components/common/wangEnduit.vue";
import { baseDetail, baseModify } from "@/api/newApi";
import { validatePhone } from "@/utils/utility/validateRule.js";
export default {
  name: "baseinfo",
  mixins: [uploadFileSize],
  components: {
    "ali-upload": aliUpload,
    EditorBar: EditorBar
  },
  data() {
    return {
      homePageCover: [],
      cover: [],
      officialAccounts: [],
      isClear: false,
      isReadOnly: false,
      defaultRegion: [],
      form: {},
      rules: {
        name: [
          {
            required: true,
            message: "请填写基地/机构名称",
            trigger: ["change", "blur"]
          }
        ],
        linkMan: [
          {
            required: true,
            message: "请填写联系人名称",
            trigger: ["change", "blur"]
          }
        ],
        linkPhone: [
          {
            required: true,
            validator: validatePhone,
            trigger: ["change", "blur"]
          }
        ],
        address: [
          {
            required: true,
            message: "请填写详细地址",
            trigger: ["change", "blur"]
          }
        ],
        remark: [
          {
            required: true,
            message: "请填写简介",
            trigger: ["change", "blur"]
          }
        ],
        provinceId: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请选择所属省份"));
              } else if (!this.form.cityId) {
                callback(new Error("请选择所属城市"));
              } else if (!this.form.areaId) {
                callback(new Error("请选择所属地区"));
              } else {
                callback();
              }
            },
            trigger: ["change", "blur"]
          }
        ],
        cover: [{ required: true, message: "请上传封面图", trigger: "blur" }]
      }
    };
  },
  methods: {
    uploadhomePageCover({ file } = {}) {
      this.$set(
        this.form,
        "designSpaceBackground",
        this.getFileUrl(file.url) || null
      );
    },
    removehomePageCover(file) {
      this.$set(this.form, "designSpaceBackground", null);
    },
    uploadcover({ file } = {}) {
      this.$set(this.form, "cover", this.getFileUrl(file.url) || null);
    },
    removecover(file) {
      this.$set(this.form, "cover", null);
    },
    uploadofficialAccounts({ file } = {}) {
      this.$set(
        this.form,
        "officialAccounts",
        this.getFileUrl(file.url) || null
      );
    },
    removeofficialAccounts(file) {
      this.$set(this.form, "officialAccounts", null);
    },
    remarkChange(val) {
      this.form.remark = val;
    },
    //   获取详情
    async getData() {
      this.isLoading = true;
      const res = await baseDetail();
      const { entity: datas = {} } = res.data;
      try {
        if (res.data.code == 200) {
          if (datas.designSpaceBackground) {
            this.homePageCover = [
              {
                name: "2.png",
                status: "success",
                uploadName: "_2.png",
                url: datas.designSpaceBackground
              }
            ];
          }
          if (datas.cover) {
            this.cover = [
              {
                name: "2.png",
                status: "success",
                uploadName: "_2.png",
                url: datas.cover
              }
            ];
          }
          if (datas.officialAccounts) {
            this.officialAccounts = [
              {
                name: "2.png",
                status: "success",
                uploadName: "_2.png",
                url: datas.officialAccounts
              }
            ];
          }
          this.defaultRegion = [datas.provinceId, datas.cityId, datas.areaId];
          this.form = datas;
        }
      } catch (err) {
        console.log(err);
      }
    },
    changeRegion(region) {
      if (region[0].code) this.form.provinceId = region[0].code;
      if (region[1].code) this.form.cityId = region[1].code;
      if (region[2].code) this.form.areaId = region[2].code;
    },
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.isLoading = true;
          baseModify(this.form)
            .then(res => {
              let data = res.data;
              if (data.code == 200) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: res.data.msg || `保存失败`,
                  type: "error"
                });
              }
            })
            .finally(() => {
              this.isLoading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss" scoped>
.tips {
  color: #999;
  font-size: 12px;
  line-height: 2;
}
</style>