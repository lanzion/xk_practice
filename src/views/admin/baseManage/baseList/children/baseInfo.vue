<template>
  <div class="newgrounds">
    <div class="g-search--wrap clearfix" style="maxWidth:1200px;min-width: 700px;">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        :style="{'marginBottm':'20px'}"
      >
        <el-row>
          <el-col :span="15">
            <el-form-item label="基地名称" prop="name">
              <el-input v-model="ruleForm.name" :disabled="isReadOnly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="联系人" prop="liaisonMan">
              <el-input v-model="ruleForm.liaisonMan" :disabled="isReadOnly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="联系方式" prop="liaisonWay">
              <el-input v-model="ruleForm.liaisonWay" :disabled="isReadOnly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="传真" prop="fax">
              <el-input v-model="ruleForm.fax" :disabled="isReadOnly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" :disabled="isReadOnly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所在地区" prop="provinceId">
              <region
                type="object"
                @change="changeRegion"
                :default="defaultRegion"
                class="regions"
                :disabled="isReadOnly"
              ></region>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="详细地址" prop="address">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="详细地址"
                v-model="ruleForm.address"
                :disabled="isReadOnly"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="基地类型" prop="baseinfoTypeList">
              <el-cascader
                :show-all-levels="false"
                v-model="ruleForm.baseinfoTypeList"
                :options="ActivityTypeParent"
                :props="{ expandTrigger: 'hover',multiple: true, }"
                :disabled="isReadOnly"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="基地描述" prop="remark">
              <el-input
                v-model="ruleForm.remark"
                type="textarea"
                :rows="4"
                placeholder="基地描述"
                :disabled="isReadOnly"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="工作日期" prop="checkboxGroup">
          <el-checkbox-group v-model="ruleForm.checkboxGroup" :disabled="isReadOnly">
            <el-checkbox-button
              v-for="city in cities"
              :label="city"
              :key="city"
            >{{filterCityOptions(city)}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="上班时间" prop="startTime" style="width: 295px;display: inline-block;">
          <el-time-select
            v-model="ruleForm.startTime"
            :disabled="isReadOnly"
            :picker-options="{
                                    start: '08:00',
                                    step: '00:15',
                                    end: '18:30'
                                }"
            placeholder="选择时间"
          ></el-time-select>
        </el-form-item>
        <el-form-item label="下班时间" prop="endTime" style="width: 250px;display: inline-block;">
          <el-time-select
            :disabled="isReadOnly"
            v-model="ruleForm.endTime"
            :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '18:30'
                                }"
            placeholder="选择时间"
          ></el-time-select>
        </el-form-item>

        <el-form-item label="每日可举办活动次数" prop="allNum">
          <el-input
            @input="checkNum(ruleForm.allNum)"
            placeholder="请输入次数"
            v-model="ruleForm.allNum"
            clearable
            :style="{'width':'120px'}"
            :disabled="isReadOnly"
          ></el-input>
          <span>次</span>
        </el-form-item>
        <el-form-item label="LOGO" prop="cover" style="width: 49%;display: inline-block;">
          <ali-upload
            :limit="1"
            :file-list.sync="cover1"
            :before-upload="beforeUploadCover"
            accept=".gif, .jpg, .png, .jpeg"
            :on-change="uploadCover1"
            @remove="remove1"
            :disabled="isReadOnly"
          >
            <p class="upload-list-tips">仅支持JPG、GIF、PNG、JPEG格式，文件小于 {{ imgStandardFileSize }} M。</p>
            <p class="upload-list-tips">建议上传的图片像素为 1200 x 300</p>
          </ali-upload>
        </el-form-item>
        <el-form-item label="空间图" prop="designSpacePage" style="width: 49%;display: inline-block;">
          <ali-upload
            :limit="1"
            :file-list.sync="cover2"
            :before-upload="beforeUploadCover"
            accept=".gif, .jpg, .png, .jpeg"
            :on-change="uploadCover2"
            @remove="remove2"
            :disabled="isReadOnly"
          >
            <p class="upload-list-tips">仅支持JPG、GIF、PNG、JPEG格式，文件小于 {{ imgStandardFileSize }} M。</p>
            <p class="upload-list-tips">建议上传的图片像素为 1200 x 300</p>
          </ali-upload>
        </el-form-item>
        <el-form-item label="背景图" prop="designSpaceBackground">
          <ali-upload
            :limit="1"
            :file-list.sync="cover3"
            :before-upload="beforeUploadCover"
            accept=".gif, .jpg, .png, .jpeg"
            :on-change="uploadCover3"
            @remove="remove3"
            :disabled="isReadOnly"
          >
            <p class="upload-list-tips">仅支持JPG、GIF、PNG、JPEG格式，文件小于 {{ imgStandardFileSize }} M。</p>
            <p class="upload-list-tips">建议上传的图片像素为 1200 x 300</p>
          </ali-upload>
        </el-form-item>
      </el-form>

      <!-- 服务列表 -->
      <div class="base-serve-list" v-if="isReadOnly">
        <div class="school-table-head">服务列表</div>
        <div class="school-table-box">
          <div class="school-table-tr school-table-tr-head">
            <div class="school-table-td">
              <div class="school-table-cell">服务标题</div>
            </div>
            <div class="school-table-td">
              <div class="school-table-cell">服务金额</div>
            </div>
            <div class="school-table-td">
              <div class="school-table-cell">负责人</div>
            </div>
            <div class="school-table-td">
              <div class="school-table-cell">联系方式</div>
            </div>
          </div>
        </div>
        <div
          class="school-infinite-box"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
        >
          <div class="school-table-box">
            <div
              class="school-table-tr"
              v-for="(item,index) in listData"
              :key="index"
              v-show="listData.length!=0"
            >
              <div class="school-table-td">
                <div class="school-table-cell school-name">
                  <router-link
                    :to="{path:'/baseAuthority/serviceDetails',query: {id: item.id}}"
                  >{{item.title}}</router-link>
                </div>
              </div>
              <div class="school-table-td">
                <div class="school-table-cell">{{item.price}}</div>
              </div>
              <div class="school-table-td">
                <div class="school-table-cell">{{item.personInCharge}}</div>
              </div>
              <div class="school-table-td">
                <div class="school-table-cell">{{item.personInChargePhone}}</div>
              </div>
            </div>
          </div>
          <div v-if="listData.length!=0" class="school-show-title">
            <p v-if="isLoading1">加载中...</p>
            <p v-if="noMore">没有更多了</p>
          </div>
        </div>
      </div>

      <div :style="{'marginTop':'20px', 'padding-left': '100px'}">
        <el-button type="primary" plain @click="goback" style="margin-top: 30px;">返回列表</el-button>
        <el-button type="primary" @click="submitForm" v-if="!isReadOnly">确认提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import aliUpload from "@/components/common/upload.vue";
import {
  adminBaseInfoDetail,
  adminBaseInfoEdit,
  getActivityTypeParent,
  adminBaseInfoAdd,
  baseinfoList
} from "@/api/newApi";
import { log } from "util";
const cityOptions = ["1", "2", "3", "4", "5", "6", "7"];
import { validatePhone, validateEmail } from "@/utils/utility/validateRule.js";
export default {
  name: "newgrounds",
  mixins: [uploadFileSize],
  components: {
    "ali-upload": aliUpload
  },
  props: {
    operation: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      isLoading1: false,
      listData: [],
      pages: {
        pageNum: 1,
        pageSize: 10
      },
      isReadOnly: this.operation,
      cover1: [],
      cover2: [],
      cover3: [],
      defaultRegion: [],
      ActivityTypeParent: [],
      cities: cityOptions,
      value: "",
      startTime: "",
      endTime: "",
      value2: "",
      ruleForm: {
        provinceId: "",
        cityId: "",
        areaId: "",
        checkboxGroup: [],
        baseinfoTypeList: [],
        name: "",
        liaisonMan: "",
        liaisonWay: "",
        fax: "",
        email: "",
        address: "",
        remark: "",
        startTime: "",
        startLunchHour: "",
        endLunchHour: "",
        endTime: "",
        allNum: "",
        cover: "",
        designSpaceBackground: "",
        designSpacePage: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: ["change", "blur"]
          }
        ],

        liaisonMan: [
          {
            required: true,
            message: "请填写联系人",
            trigger: ["change", "blur"]
          }
        ],
        liaisonWay: [
          {
            required: true,
            validator: validatePhone,
            trigger: ["change", "blur"]
          }
        ],
        email: [
          {
            required: true,
            validator: validateEmail,
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
              } else if (!this.ruleForm.cityId) {
                callback(new Error("请选择所属城市"));
              } else if (!this.ruleForm.areaId) {
                callback(new Error("请选择所属地区"));
              } else {
                callback();
              }
            },
            trigger: ["change", "blur"]
          }
        ],
        remark: [
          {
            required: true,
            message: "请填写活动描述",
            trigger: ["change", "blur"]
          }
        ],
        baseinfoTypeList: [
          {
            required: true,
            message: "请选择基地类型",
            trigger: ["change", "blur"]
          }
        ],
        checkboxGroup: [
          { required: true, message: "请选择工作周期", trigger: "blur" }
        ],
        startTime: [
          {
            required: true,
            message: "请选择上班时间",
            trigger: ["change", "blur"]
          }
        ],
        lunchHour: [
          {
            validator: (rule, value, callback) => {
              if (!this.ruleForm.startLunchHour) {
                callback(new Error("请选择午休开始时间"));
              } else if (!this.ruleForm.endLunchHour) {
                callback(new Error("请选择午休结束时间"));
              } else {
                callback();
              }
            },
            trigger: ["change", "blur"]
          }
        ],
        endTime: [
          {
            required: true,
            message: "请选择下班时间",
            trigger: ["change", "blur"]
          }
        ],
        allNum: [
          {
            required: true,
            message: "请填写每日活动次数",
            trigger: ["change", "blur"]
          }
        ],
        cover: [{ required: true, message: "请上传logo图", trigger: "blur" }],
        designSpaceBackground: [
          { required: true, message: "请上传背景图", trigger: "blur" }
        ],
        designSpacePage: [
          { required: true, message: "请上传空间图", trigger: "blur" }
        ]
      }
    };
  },
  watch: {},
  computed: {
    noMore() {
      return this.pages.pageNum > this.totalNum;
    },
    disabled() {
      return this.isLoading1 || this.noMore;
    }
  },
  methods: {
    checkNum(val) {
      let str = val.replace(/[^\d]/g, "");
      if (str[0] == 0) {
        str = str.slice(1, str.length);
      }
      this.ruleForm.allNum = str;
    },
    filterCityOptions(code) {
      if (code == 1) return "星期一";
      if (code == 2) return "星期二";
      if (code == 3) return "星期三";
      if (code == 4) return "星期四";
      if (code == 5) return "星期五";
      if (code == 6) return "星期六";
      if (code == 7) return "星期日";
    },
    // 获取详情
    async getbaseDetail() {
      const id = this.id || this.$route.query.id;
      if (id) {
        const res = await adminBaseInfoDetail({ id: id });
        try {
          const _datas = res.data.entity;
          // this.ruleForm = _datas;
          this.defaultRegion = [
            _datas.provinceId,
            _datas.cityId,
            _datas.areaId
          ];
          if (_datas.cover) {
            this.cover1 = [
              {
                name: "2.png",
                size: 63600,
                status: "success",
                uploadName: "_2.png",
                url: _datas.cover
              }
            ];
          }
          if (_datas.designSpacePage) {
            this.cover2 = [
              {
                name: "2.png",
                size: 63600,
                status: "success",
                uploadName: "_2.png",
                url: _datas.designSpacePage
              }
            ];
          }

          if (_datas.designSpaceBackground) {
            this.cover3 = [
              {
                name: "2.png",
                size: 63600,
                status: "success",
                uploadName: "_2.png",
                url: _datas.designSpaceBackground
              }
            ];
          }

          if (_datas.workTime) {
            this.ruleForm.checkboxGroup = _datas.workTime.split(",");
          } else {
            this.ruleForm.checkboxGroup = [];
          }
          let arr = [];
          _datas.infoTypeList.forEach(o => {
            arr.push([o.specialTypeId, o.specialDetailId]);
          });
          this.ruleForm.id = id;
          this.ruleForm.baseinfoTypeList = arr;
          this.ruleForm.name = _datas.name;
          this.ruleForm.liaisonMan = _datas.liaisonMan;
          this.ruleForm.liaisonWay = _datas.liaisonWay;
          this.ruleForm.fax = _datas.fax || "";
          this.ruleForm.email = _datas.email;
          this.ruleForm.provinceId = _datas.provinceId;
          this.ruleForm.cityId = _datas.cityId;
          this.ruleForm.areaId = _datas.areaId;
          this.ruleForm.address = _datas.address;
          this.ruleForm.remark = _datas.remark;
          this.ruleForm.startTime = _datas.startTime;
          this.ruleForm.startLunchHour = _datas.startLunchHour;
          this.ruleForm.endLunchHour = _datas.endLunchHour;
          this.ruleForm.endTime = _datas.endTime;
          this.ruleForm.allNum = _datas.allNum;
          this.ruleForm.cover = this.getFileUrl(_datas.cover);
          this.ruleForm.designSpaceBackground = this.getFileUrl(
            _datas.designSpaceBackground
          );
          this.ruleForm.designSpacePage = this.getFileUrl(
            _datas.designSpacePage
          );
        } catch (error) {
          console.log(error);
        } finally {
        }
      }
    },
    submitForm(formName) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let head,Text;
          this.isLoading = true;
          let formData = Object.assign({}, this.ruleForm);
          const formList = {
            id: formData.id,
            name: formData.name,
            liaisonMan: formData.liaisonMan,
            liaisonWay: formData.liaisonWay,
            fax: formData.fax || "",
            email: formData.email,
            provinceId: formData.provinceId,
            cityId: formData.cityId,
            areaId: formData.areaId,
            address: formData.address,
            remark: formData.remark,
            workTime: formData.checkboxGroup.join(","),
            startTime: formData.startTime,
            startLunchHour: formData.startLunchHour,
            endLunchHour: formData.endLunchHour,
            endTime: formData.endTime,
            allNum: formData.allNum,
            cover: formData.cover,
            designSpaceBackground: formData.designSpaceBackground,
            designSpacePage: formData.designSpacePage,
            baseinfoTypeList: []
          };
          formData.baseinfoTypeList.forEach(o => {
            formList.baseinfoTypeList.push({
              specialTypeId: o[0] || "",
              specialDetailId: o[1] || ""
            });
          });
          if (formList.id) {
               //   修改
              head = adminBaseInfoEdit;
              Text = "修改成功";
          }else{
            //   添加
            head = adminBaseInfoAdd;
            Text = "新增成功";
          }
          head(formList)
              .then(res => {
                let data = res.data;
                if (data.code == 200) {
                  this.$alert(Text, {
                    confirmButtonText: "确定",
                    callback: action => {
                      this.$router.push({ path: "/baseManage/baseList" });
                    }
                  });
                } else {
                  this.$message({
                    message: data.msg,
                    type: "warning"
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
    },
    handleChange(value) {
      this.ruleForm.city = this.ruleForm.selectedOptions[0];
      this.ruleForm.erae = this.ruleForm.selectedOptions[1];
      this.ruleForm.minerae = this.ruleForm.selectedOptions[2];
    },
    // logo
    uploadCover1({ file } = {}) {
      this.$set(this.ruleForm, "cover", this.getFileUrl(file.url) || null);
    },
    remove1(file) {
      this.$set(this.ruleForm, "cover", null);
    },
    // 空间
    uploadCover2({ file } = {}) {
      this.$set(
        this.ruleForm,
        "designSpacePage",
        this.getFileUrl(file.url) || null
      );
    },
    remove2(file) {
      this.$set(this.ruleForm, "designSpacePage", null);
    },
    // 背景
    uploadCover3({ file } = {}) {
      this.$set(
        this.ruleForm,
        "designSpaceBackground",
        this.getFileUrl(file.url) || null
      );
    },
    remove3(file) {
      this.$set(this.ruleForm, "designSpaceBackground", null);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goback() {
      this.$router.go(-1);
    },
    changeRegion(region) {
      if (region[0].code) this.ruleForm.provinceId = region[0].code;
      if (region[1].code) this.ruleForm.cityId = region[1].code;
      if (region[2].code) this.ruleForm.areaId = region[2].code;
    },

    // 获取领域和主题模块
    getActivityTypeParent() {
      getActivityTypeParent({}).then(res => {
        let datas = res.data;
        if (datas.typelist.length) {
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
          this.ActivityTypeParent = arrBox;
        }
      });
    },

    // 获取列表数据
    async getDatas() {
      const res = await baseinfoList({ auditStatus: "A" }, this.pages);

      const { entity: datas = {} } = res.data;

      try {
        datas.resultData.forEach((o, i) => {
          // o.key = this.resetList.length;
          this.listData.push(o);
        });
        this.pages.pageNum++;
        this.totalNum = datas.totalPageNum || 0;
      } catch (error) {
        this.listData = [];
        this.totalNum = 0;
      } finally {
        this.isLoading1 = false;
      }
    },
    load() {
      this.isLoading1 = true;
      setTimeout(() => {
        this.getDatas();
      }, 2000);
    }
  },
  created() {
    const id = this.id || this.$route.query.id;
    if (id) this.getbaseDetail();
    this.getActivityTypeParent();
    if (this.isReadOnly) this.getDatas();
  }
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #ccc;
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
  //   width: 178px;
  //   height: 178px;
  //   line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.school-infinite-box {
  max-height: 300px;
  overflow: auto;
}
.school-table-box {
  border-top: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  display: table;
  width: 100%;
  box-sizing: border-box;

  .school-table-tr {
    display: table-row;

    &.school-table-tr-head {
      background-color: #eef1f6;

      font-size: 14px;
      color: #666;
    }
    .school-table-td {
      display: table-cell;
      text-align: center;
      line-height: 23px;
      width: 25%;
      font-size: 14px;
      padding: 8px 0;
      border-bottom: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      color: #333;
      box-sizing: border-box;
      vertical-align: middle;
      .school-table-cell {
        padding: 0 10px;
        word-break: break-all;
      }
    }
  }
}
.school-table-footer {
  box-sizing: border-box;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
  border-left: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  color: #909399;
}
.school-show-title {
  p {
    text-align: center;
    line-height: 30px;
    font-size: 14px;
  }
}
.school-table-head {
  clear: both;
  padding-top: 20px;
  font-size: 14px;
  color: #333;
  //  text-align: center;
  line-height: 40px;
}
</style>
