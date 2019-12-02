<template>
  <div class="schoolinfo g-search--wrap clearfix" style="maxWidth:1200px;min-width: 700px;">
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
          <el-form-item label="学校代码" prop="identityCode">
            <el-input v-model="form.identityCode" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="学校名称" prop="schoolName">
            <el-input v-model="form.schoolName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="所属学段" prop="schoolType">
            <el-checkbox-group v-model="form.schoolType">
              <el-checkbox v-for="(item) in fit" :label="item.code" :key="item.code">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="管理部门" prop="orgName">
            <el-input v-model="form.orgName" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="联系人" prop="linkName">
            <el-input v-model="form.linkName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="联系人电话" prop="phone">
            <el-input v-model="form.phone"></el-input>
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
        <el-col :span="18">
          <el-form-item label="主页大图" prop="backgroundImg">
            <ali-upload
              :limit="1"
              :file-list.sync="backgroundImg"
              :before-upload="beforeUploadCover"
              accept=".gif, .jpg, .png, .jpeg"
              :on-change="uploadhomePageCover"
              @remove="removehomePageCover"
            >
              <p
                class="upload-list-tips"
              >用于学校主页个性化展示。仅支持JPG、GIF、PNG、JPEG格式，文件小于 5 M，建议上传的图片像素为1920 x 400px</p>
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
        <el-col :span="15">
          <el-form-item label="简介" prop="remark">
            <editor-bar v-model="form.remark" @change="remarkChange" :isClear="isClear"></editor-bar>
            <p class="tips">简介将会在学校主页展示</p>
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
import { fit } from "@/utils/utility/dict.js";
import { validatePhone } from "@/utils/utility/validateRule.js";
import { schoolModify, schoolDetail } from "@/api/newApi";
import { log } from "util";
export default {
  name: "baseinfo",
  mixins: [uploadFileSize],
  components: {
    "ali-upload": aliUpload,
    EditorBar: EditorBar
  },
  data() {
    return {
      fit: fit,
      backgroundImg: [],
      cover: [],
      officialAccounts: [],
      isClear: false,
      defaultRegion: [],
      form: {
        schoolType: []
      },
      rules: {
        schoolName: [
          {
            required: true,
            message: "请填写学校名称",
            trigger: ["change", "blur"]
          }
        ],
        linkName: [
          {
            required: true,
            message: "请填写联系人",
            trigger: ["change", "blur"]
          }
        ],
        phone: [
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
      this.$set(this.form, "backgroundImg", this.getFileUrl(file.url) || null);
    },
    removehomePageCover(file) {
      this.$set(this.form, "backgroundImg", null);
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
    changeRegion(region) {
      if (region[0].code) this.form.provinceId = region[0].code;
      if (region[1].code) this.form.cityId = region[1].code;
      if (region[2].code) this.form.areaId = region[2].code;
    },
    // 获取信息
    async getSchoolDetail() {
      this.isLoading = true;
      const res = await schoolDetail();
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
          datas.schoolType = datas.schoolType.split(",");
          this.defaultRegion = [datas.provinceId, datas.cityId, datas.areaId];
          this.form = datas;
        }
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    },
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
        const formList = Object.assign({}, this.form);
          formList.schoolType = formList.schoolType.join(',');
          this.isLoading = true;
            schoolModify(formList)
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
  created(){
      this.getSchoolDetail()
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