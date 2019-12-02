<template>
  <div class="educationinfo g-search--wrap clearfix" style="maxWidth:1200px;min-width: 700px;">
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
          <el-form-item label="教育局代码" prop="identityCode">
            <el-input v-model="form.identityCode" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="教育局名称" prop="eduName">
            <el-input v-model="form.eduName"></el-input>
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
import { validatePhone } from "@/utils/utility/validateRule.js";
import { detailEdus, editEdus } from "@/api/resetApi";
export default {
  mixins: [uploadFileSize],
  components: {
    "ali-upload": aliUpload
  },
  data() {
    return {
      officialAccounts: [],
      defaultRegion: [],
      form: {},
      rules: {
        eduName: [
          {
            required: true,
            message: "请填写教育局名称",
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
        provinceId: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请选择所属地区"));
              } else {
                callback();
              }
            },
            trigger: ["change", "blur"]
          }
        ]
      }
    };
  },
  methods: {
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
    changeRegion(region) {
      if (region[0].code) this.form.provinceId = region[0].code;
      if (region[1].code) this.form.cityId = region[1].code;
      if (region[2].code) this.form.areaId = region[2].code;
    },
    async getData() {
      this.showLoading();
      const res = await detailEdus();
      const { entity: datas = {} } = res.data;
      try {
        if (res.data.code == 200) {
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
        }
        this.defaultRegion = [datas.provinceId, datas.cityId, datas.areaId];
        this.form = datas;
      } catch (err) {
        console.log(err);
      } finally {
        this.hideLoading();
      }
    },
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          const formList = Object.assign({}, this.form);
          this.isLoading = true;
          editEdus(formList)
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
      this.getData()
  }
};
</script>

<style lang="scss" scoped>
</style>