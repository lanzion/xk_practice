<template>
  <div class="submit-form backend-content__middle" style="padding-top:50px;">
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-row>
        <el-form-item label="学校名称" prop="schoolName">
          <el-col :span="8">
            <el-input v-model="form.schoolName" placeholder="请输入学校名称" :disabled="isDisabled"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="学段" prop="schoolType">
            <el-checkbox-group v-model="form.schoolType" :disabled="isDisabled">
              <el-checkbox
                v-for="(item) in schoolArr"
                :label="item.id"
                :key="item.id"
              >{{ item.name }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="学校描述" prop="remark">
            <el-input type="textarea" :rows="4" placeholder="请输入学校描述" v-model="form.remark" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-form-item label="联系人" prop="linkName">
          <el-col :span="8">
            <el-input v-model="form.linkName" placeholder="请输入联系人" :disabled="isDisabled"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="联系方式" prop="phone">
          <el-col :span="8">
            <el-input v-model="form.phone" placeholder="请输入联系方式" maxlength="11" :disabled="isDisabled"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="传真" prop="fax">
          <el-col :span="8">
            <el-input v-model="form.fax" placeholder="请输入传真号" :disabled="isDisabled"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="邮箱" prop="email">
          <el-col :span="8">
            <el-input v-model="form.email" placeholder="请输入邮箱" :disabled="isDisabled"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row v-if="!isReadOnly">
        <el-col :span="8">
          <el-form-item label="所属地区" prop="provinceId">
            <region type="object" @change="changeRegion" :default="default1" class="regions" :disabled="isDisabled"></region>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="isReadOnly">
        <el-col :span="8">
          <el-form-item label="所属地区" prop="provinceId">
            <el-input v-model="location" :disabled="isDisabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="详细地址" prop="address">
          <el-col :span="8">
            <el-input v-model="form.address" placeholder="请输入详细地址" :disabled="isDisabled"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <!-- 主管部门 -->
      <el-row>
        <el-form-item label="主管部门" prop="baseId">
          <el-col :span="8">
            <el-select v-model="form.baseId" placeholder="请选择主管部门"  :disabled="isDisabled">
              <el-option
                v-for="item in baseList"
                :label="item.eduName"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="LOGO" prop="cover">
            <ali-upload
              :limit="1"
              :file-list.sync="cover"
              :before-upload="beforeUploadCover"
              accept=".gif, .jpg, .png, .jpeg"
              :on-change="uploadCover"
              @remove="remove"
              :disabled="isDisabled"
            ></ali-upload>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="空间图" prop="designSpacePage">
            <ali-upload
              :limit="1"
              :file-list.sync="designSpacePage"
              :before-upload="beforeUploadCover"
              accept=".gif, .jpg, .png, .jpeg"
              :on-change="uploadCover1"
              @remove="remove1"
              :disabled="isDisabled"
            ></ali-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="空间背景图" prop="designSpaceBackground">
            <ali-upload
              :limit="1"
              :file-list.sync="designSpaceBackground"
              :before-upload="beforeUploadCover"
              accept=".gif, .jpg, .png, .jpeg"
              :on-change="uploadCover2"
              @remove="remove2"
              :disabled="isDisabled"
            ></ali-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" style="marginRight:10px" @click="onSubmit" v-if="!isDisabled">保存</el-button>
        <el-button plain @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { baseEducationList, schoolEdit, schoolDetail, schoolAdd } from "@/api/resetApi";
import { validatePhone, validateEmail } from "@/utils/utility/validateRule";
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import aliUpload from "@/components/common/upload.vue";

let identiy = localStorage.getItem("xk_practice_identity");

export default {
  name: "schoolEdit",
  mixins: [uploadFileSize],
  components: {
    "ali-upload": aliUpload
  },
  props:{
    operation: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      isDisabled: this.operation,
      location: "",
      schoolArr: [
        {
          id: "primarySchool",
          name: "小学"
        },
        {
          id: "middleSchool",
          name: "初中"
        },
        {
          id: "highSchool",
          name: "高中"
        }
      ],
      default1: [],
      identiy: identiy,
      baseList: [],
      cover: [],
      designSpacePage: [],
      designSpaceBackground: [],
      form: {
        baseId: "",
        schoolName: "",
        linkName: "",
        phone: "",
        fax: "",
        email: "",
        remark: "",
        schoolType: [], //学校类型
        provinceId: "",
        cityId: "",
        areaId: "",
        cover: "",
        designSpacePage: "",
        designSpaceBackground: "",
        address: "" //详细地址
      },

      // 表单校验提示
      rules: {
        remark: [
          {
            required: true,
            message: "请输入学校描述",
            trigger: ["change", "blur"]
          }
        ],
        schoolType: [
          {
            required: true,
            message: "请选择学段",
            trigger: ["change", "blur"]
          }
        ],
        designSpacePage: [
          {
            required: true,
            message: "请选择空间图",
            trigger: ["change", "blur"]
          }
        ],
        cover: [
          {
            required: true,
            message: "请选择LOGO",
            trigger: ["change", "blur"]
          }
        ],
        designSpaceBackground: [
          {
            required: true,
            message: "请选择空间背景图",
            trigger: ["change", "blur"]
          }
        ],
        schoolName: [
          {
            required: true,
            message: "请输入学校名称",
            trigger: ["change", "blur"]
          }
        ],
        linkName: [
          {
            required: true,
            message: "请输入联系人",
            trigger: ["change", "blur"]
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入联系方式",
            trigger: ["change", "blur"]
          },
          { validator: validatePhone, trigger: ["change", "blur"] }
        ],
        fax: [
          { required: true, message: "请输入传真", trigger: ["change", "blur"] }
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: ["change", "blur"]
          },
          { validator: validateEmail, trigger: ["change", "blur"] }
        ],
        provinceId: [
          {
            required: true,
            message: "请选择所属地区",
            trigger: ["change", "blur"]
          },
          {
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
        address: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: ["change", "blur"]
          }
        ],
        baseId: [
          {
            required: true,
            message: "请选择主管部门",
            trigger: ["change", "blur"]
          }
        ]
      },
      isReadOnly: false,
      pages: {
        pageNum: 1,
        pageSize: 100
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 获取详情
    getDetailData() {
      const id = this.$route.query.id;
      if (id) {
        schoolDetail({ id })
          .then(res => {
            const { code, entity: datas } = res.data;
            if (code === 200 && datas) {
              (this.cover = [
                {
                  name: "2.png",
                  size: 63600,
                  status: "success",
                  uploadName:
                    "d77e555877554abab3394032b5922988-1566870608494__2.png",
                  url: datas.cover
                }
              ]),
                (this.designSpacePage = [
                  {
                    name: "2.png",
                    size: 63600,
                    status: "success",
                    uploadName:
                      "d77e555877554abab3394032b5922988-1566870608494__2.png",
                    url: datas.designSpacePage
                  }
                ]),
                (this.designSpaceBackground = [
                  {
                    name: "2.png",
                    size: 63600,
                    status: "success",
                    uploadName:
                      "d77e555877554abab3394032b5922988-1566870608494__2.png",
                    url: datas.designSpaceBackground
                  }
                ]);
              this.form.id = id;
              this.form.remark = datas.remark; // 班级简介
              this.form.schoolType = datas.schoolType.split(",") || [];
              this.form.schoolName = datas.schoolName;
              this.form.linkName = datas.linkName;
              this.form.phone = datas.phone;
              this.form.fax = datas.fax;
              this.form.email = datas.email;
              this.form.provinceId = datas.provinceId;
              this.form.cityId = datas.cityId;
              (this.form.areaId = datas.areaId),
                (this.form.cover = datas.cover);
              this.form.designSpacePage = datas.designSpacePage;
              this.form.designSpaceBackground = datas.designSpaceBackground;
              this.form.address = datas.address;

              this.getSchoolList();
              this.default1 = [
                {
                  code: datas.provinceId
                },
                {
                  code: datas.cityId
                },
                {
                  code: datas.areaId
                }
              ];
            }
          })
          .finally(() => {});
      }
    },
    uploadCover({ file } = {}) {
      this.form.cover = this.cover.map((item, index) => item.url);
    },
    uploadCover1({ file } = {}) {
      this.form.designSpacePage = this.designSpacePage.map(
        (item, index) => item.url
      );
    },
    remove(file) {
      this.form.cover = this.cover.map((item, index) => item.url);
    },
    remove1(file) {
      this.form.designSpacePage = this.designSpacePage.map(
        (item, index) => item.url
      );
    },
    uploadCover2({ file } = {}) {
      this.form.designSpaceBackground = this.designSpaceBackground.map(
        (item, index) => item.url
      );
    },
    remove2(file) {
      this.form.designSpaceBackground = this.designSpaceBackground.map(
        (item, index) => item.url
      );
    },
    remoteMethod(qurey) {
      if (this.form.areaId == "") {
        this.$message.error("请先选择省市区");
        return false;
      }
      this.resetPage(qurey);
    },
    resetPage(key) {
      this.$set(this.pages, "pageNum", 1);
      this.$set(this.pages, "pageSize", 100);
      this.baseList = [];
      this.form.baseId = "";
      this.getSchoolList(key);
    },
    async getSchoolList(key) {
      if (key) {
        formList.eduName = key;
      }
      const formList = {
        provinceId: this.form.provinceId
      };
      const res = await baseEducationList(formList, this.pages);
      const { entity: datas = {} } = res.data;

      try {
        this.baseList = [...datas.resultData];
        if (this.identiy == 6 || this.identiy == 7 || this.identiy == 10) {
          this.location = datas.resultData[0].location;
        } else if (this.identiy == 5) {
          if (datas.resultData[0]) {
            this.form.baseId = datas.resultData[0].id;
          }
        }
      } catch (error) {
        //    console.log(error)
      } finally {
      }
    },

    changeRegion(region) {
      this.form.provinceId = region[0].code || "";
      this.form.cityId = region[1].code || "";
      this.form.areaId = region[2].code || "";
      if (this.form.areaId != "") {
        this.baseList = [];
        this.form.baseId = "";
        this.getSchoolList();
      } else {
        this.baseList = [];
        this.form.baseId = "";
      }
    },

    // 提交表单
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let head;
          let txt = "保存";
          const formList = Object.assign({}, this.form);
          formList.schoolType = this.form.schoolType.join(",");
          formList.cover = this.getFileUrl(this.form.cover[0]);
          formList.designSpacePage = this.getFileUrl(
            this.form.designSpacePage[0]
          );
          formList.designSpaceBackground = this.getFileUrl(
            this.form.designSpaceBackground[0]
          );
          //console.log(formList);
          if(formList.id) head = schoolEdit;
          else head = schoolAdd;
          head(formList).then(response => {
            if (response.data.code == 200) {
              this.$message({
                message: `${txt}成功`,
                type: "success"
              });
              this.$router.go(-1);
            } else {
              this.$message.error(response.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  created() {
    if (this.identiy == 6 || this.identiy == 7 || this.identiy == 10) {
      this.isReadOnly = true;
      let baseInfo = JSON.parse(localStorage.getItem("xk_practice_baseInfo"));
      this.form.baseId = baseInfo.baseInfo.id;
    }
    this.getDetailData();
  }
};
</script>
<style lang="scss" scoped>
.el-input-number {
  display: inline-block;
  width: 100%;
  position: relative;
  line-height: normal;
  vertical-align: top;
}
.el-input-number__decrease {
  right: 37px;
}
.el-input-number__decrease,
.el-input-number__increase {
  height: auto;
  border-left: 1px solid #dfdfdf;
  width: 36px;
  line-height: 30px;
  top: 1px;
  text-align: center;
  color: #ccc;
  cursor: pointer;
  position: absolute;
  z-index: 1;
}
</style>
