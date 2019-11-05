<template>
  <div class="newgrounds">
    <div class="g-search--wrap clearfix" style="maxWidth:1200px;min-width: 700px;">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :style="{'marginBottm':'20px'}"
      >
        <el-row>
          <el-col :span="15">
            <el-form-item label="服务标题" prop="title">
              <el-input v-model="ruleForm.title" :disabled="isReadOnly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="所属基地" prop="baseinfoName">
              <el-input v-model="ruleForm.baseinfoName" :disabled="isReadOnly" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="服务金额" prop="price" class="half">
          <el-input v-model="ruleForm.price" :disabled="isReadOnly"></el-input>
        </el-form-item>
        <el-form-item label="适合人群" prop="scope" class="half">
          <el-checkbox-group v-model="checkboxGroup1" :disabled="isReadOnly">
            <el-checkbox label="A" name="type">小学</el-checkbox>
            <el-checkbox label="B" name="type">初中</el-checkbox>
            <el-checkbox label="C" name="type">高中</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="最大参与" prop="maxMannum" class="half">
          <el-input v-model="ruleForm.maxMannum" :disabled="isReadOnly"></el-input>
        </el-form-item>
        <el-form-item label="班级限制" prop="maxClassNum" class="half">
          <el-input v-model="ruleForm.maxClassNum" :disabled="isReadOnly"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="基地时间">
            <span style="marginRight:15px;color:#606266;">基地上班时间:{{detail.startTime}}</span>
            <span
              style="marginRight:15px;color:#606266;"
            >基地午休时间:{{detail.startLunchHour}}-{{detail.endLunchHour}}</span>
            <span style="marginRight:15px;color:#606266;">基地下班时间:{{detail.endTime}}</span>
          </el-form-item>
        </div>
        <el-form-item label="活动时长" prop="maxTime" class="half">
          <el-select v-model="ruleForm.maxTime" placeholder="请选择活动时长" @change="checkNum" clearable :disabled="isReadOnly">
            <el-option
              v-for="item in option"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="ruleForm.maxTime"></el-input> -->
        </el-form-item>

        <el-form-item label="日办次数" prop="maxFrequency" class="half">
          <el-input v-model="ruleForm.maxFrequency" :disabled="isReadOnly"></el-input>
        </el-form-item>
        <el-form-item label="服务时间段" v-show="timeArr.length>0">
          <div class="school-time-box">
            <span
              class="school-time-btn"
              v-for="(item,index) in timeArr"
              :key="index"
            >{{`${item.start}~${item.end}`}}</span>
          </div>
        </el-form-item>

        <el-form-item label="负责人" prop="personInCharge" class="half">
          <el-input v-model="ruleForm.personInCharge" :disabled="isReadOnly"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="personInChargePhone" class="half">
          <el-input v-model="ruleForm.personInChargePhone" :disabled="isReadOnly"></el-input>
        </el-form-item>
        <el-form-item label="服务位置" prop="address" class="half">
          <el-input v-model="ruleForm.address" :disabled="isReadOnly"></el-input>
        </el-form-item>
        <el-form-item label="服务说明" prop="expound">
          <el-input type="textarea" v-model="ruleForm.expound" :disabled="isReadOnly"></el-input>
        </el-form-item>
        <el-form-item label="是否开启" prop="status">
          <el-radio-group v-model="ruleForm.status" :disabled="isReadOnly">
            <el-radio v-for="(item) in isOpen" :label="item.id" :key="item.id" >{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="服务图片" prop="cover">
          <ali-upload
            :limit="1"
            :file-list.sync="cover"
            :before-upload="beforeUploadCover"
            accept=".gif, .jpg, .png, .jpeg"
            :on-change="uploadCover"
            @remove="remove"
            :disabled="isReadOnly"
          >
            <p
              class="upload-list-tips"
            >仅支持JPG、GIF、PNG、JPEG格式，文件小于 {{ imgStandardFileSize }} M。500*500像素比例</p>
          </ali-upload>
        </el-form-item>
      </el-form>
      <div :style="{'width':'100%','textAlign':'center','marginTop':'20px'}">
        <el-button type="primary" plain @click="goback">返回列表</el-button>
        <el-button type="primary" @click="submit" v-if="!isReadOnly">提交审核</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { log } from "util";
import {
  baseInfoAdd,
  baseinfoDetail,
  baseinfoEdit,
  adminBaseInfoDetail
} from "@/api/newApi";
import aliUpload from "@/components/common/upload.vue";
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
const identiy = localStorage.getItem("xk_practice_identity");

import { validatePhone } from "@/utils/utility/validateRule.js";

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
      isReadOnly: this.operation,
      isOpen: [
        {
          id: "A",
          name: "开启"
        },
        {
          id: "B",
          name: "关闭"
        }
      ],
      detail: {},
      option: [
        {
          value: 1,
          label: 1
        },
        {
          value: 2,
          label: 2
        },
        {
          value: 3,
          label: 3
        },
        {
          value: 4,
          label: 4
        },
        {
          value: 5,
          label: 5
        }
      ],
      timeArr: [],
      identiy: identiy,
      checkboxGroup1: [],
      cover: [],
      ruleForm: {
        title: "",
        price: "",
        specialtypeId: "", //领域标识
        specialdetailId: "", //主题标识
        scope: "", //适合人群
        // minMannum:'',//至小参与人数
        maxMannum: "", //至大参与人数
        maxTime: "", //时长
        maxFrequency: "", //日办次数
        maxClassNum: "", //最大班级数
        personInCharge: "", //基地联系人
        personInChargePhone: "", //联系方式
        address: "", //项目地址
        expound: "", //项目详情
        status: "", //项目状态
        baseinfoId: "", //基地ID
        cover: "",
        courseTimeDtoList: []
      },
      srcList: [],
      rules: {
        status: [
          {
            required: true,
            message: "请选择开启状态",
            trigger: ["change", "blur"]
          }
        ],
        cover: [
          {
            required: true,
            message: "请选择服务图片",
            trigger: ["change", "blur"]
          }
        ],
        title: [
          {
            required: true,
            message: "请填写活动名称",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "请填写服务金额",
            trigger: "blur"
          }
        ],
        maxMannum: [
          {
            required: true,
            message: "请填写活动人数",
            trigger: "blur"
          }
        ],
        maxTime: [
          {
            required: true,
            message: "请填写活动时长",
            trigger: "blur"
          }
        ],
        maxFrequency: [
          {
            required: true,
            message: "请活动时长无匹配时间段",
            trigger: ["blur", "change"]
          }
        ],
        maxClassNum: [
          {
            required: true,
            message: "请填写最大班级",
            trigger: "blur"
          }
        ],
        personInCharge: [
          {
            required: true,
            message: "请填写联系人",
            trigger: "blur"
          }
        ],
        personInChargePhone: [
          {
            validator: validatePhone,
            required: true,
            trigger: ["blur", "change"]
          }
        ],
        address: [
          {
            required: true,
            message: "请填写服务地址",
            trigger: "blur"
          }
        ],
        expound: [
          {
            required: true,
            message: "请填写服务说明",
            trigger: "blur"
          }
        ]
      },
      isSheng: false
    };
  },
  methods: {
    uploadCover({ file } = {}) {
      this.ruleForm.cover = this.cover.map((item, index) => item.url);
    },
    remove(file) {
      this.ruleForm.cover = [];
    },
    //提交
    submit() {
      let id = this.id || this.$route.query.id;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          const formList = Object.assign({}, this.ruleForm);
          formList.scope = this.checkboxGroup1.join(",");
          formList.maxMannum = Number(this.ruleForm.maxMannum);
          formList.maxTime = Number(this.ruleForm.maxTime);
          formList.maxFrequency = Number(this.ruleForm.maxFrequency);
          formList.maxClassNum = Number(this.ruleForm.maxClassNum);
          formList.personInChargePhone = Number(formList.personInChargePhone);
          formList.price = Number(this.ruleForm.price);
          formList.status = this.ruleForm.status;
          formList.auditStatus = this.ruleForm.auditStatus || "C";
          formList.cover = this.getFileUrl(this.ruleForm.cover[0]);
          formList.courseTimeDtoList = this.ruleForm.courseTimeDtoList;
          if (id) {
            baseinfoEdit(formList).then(res => {
              const datas = res.data;
              if (datas.code == 200) {
                this.$alert("修改成功", {
                  confirmButtonText: "确定",
                  callback: action => {
                    this.$router.push({ path: "/baseAuthority/serviceList" });
                  }
                });
              } else {
                this.$message({
                  message: datas.msg,
                  type: "warning"
                });
              }
            });
          } else {
            baseInfoAdd(formList).then(
              res => {
                const _datas = res.data;
                if (_datas.code == 200) {
                  this.$alert("添加成功", {
                    confirmButtonText: "确定",
                    callback: action => {
                      this.$router.push({ path: "/baseAuthority/serviceList" });
                    }
                  });
                } else {
                  this.$message({
                    message: datas.msg,
                    type: "warning"
                  });
                }
              },
              err => console.log(err)
            );
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    checkNum() {
      if (
        !this.detail.startTime ||
        !this.detail.endTime ||
        !this.detail.startLunchHour ||
        !this.detail.endLunchHour
      ) {
        this.$message({
          message: "基地作息时间有误",
          type: "warning"
        });
      } else {
        if (!this.ruleForm.maxTime) {
          this.timeArr = [];
          this.ruleForm.courseTimeDtoList = [];
          this.ruleForm.maxFrequency = "";
          return false;
        }
        let startTime = parseInt(this.detail.startTime.slice(0, 2)),
          endTime = parseInt(this.detail.endTime.slice(0, 2)),
          startLunchHour = parseInt(this.detail.startLunchHour.slice(0, 2)),
          endLunchHour = parseInt(this.detail.endLunchHour.slice(0, 2)),
          startTimeHalf = parseInt(this.detail.startTime.slice(3, 4)),
          endLunchHourHalf = parseInt(this.detail.endLunchHour.slice(3, 4)),
          arr = [],
          arr1 = [];
        if (startTimeHalf > 0) {
          //判断上班时间是否大于当前整数时
          startTime = startTime + 1;
        }
        if (endLunchHourHalf > 0) {
          //判断上班时间是否大于当前整数时
          endLunchHour = endLunchHour + 1;
        }
        let num1 = (startLunchHour - startTime) / this.ruleForm.maxTime; //获取时间段个数
        let num2 = (endTime - endLunchHour) / this.ruleForm.maxTime;
        // console.log(num1)
        //  console.log(num2)
        if (num1 >= 1) {
          num1 = parseInt(num1);
          for (let i = 0; i < num1; i++) {
            let start =
                startTime + i * this.ruleForm.maxTime > 9
                  ? startTime + i * this.ruleForm.maxTime
                  : `0${startTime + i * this.ruleForm.maxTime}`,
              end =
                startTime + (i + 1) * this.ruleForm.maxTime > 9
                  ? startTime + (i + 1) * this.ruleForm.maxTime
                  : `0${startTime + (i + 1) * this.ruleForm.maxTime}`;
            arr.push({
              start: start + ":00",
              end: end + ":00"
            });
            arr1.push(`${start + ":00"}~${end + ":00"}`);
          }
        }
        if (num2 >= 1) {
          num2 = parseInt(num2);
          for (let i = 0; i < num2; i++) {
            let start =
                endLunchHour + i * this.ruleForm.maxTime > 9
                  ? endLunchHour + i * this.ruleForm.maxTime
                  : `0${endLunchHour + i * this.ruleForm.maxTime}`,
              end =
                endLunchHour + (i + 1) * this.ruleForm.maxTime > 9
                  ? endLunchHour + (i + 1) * this.ruleForm.maxTime
                  : `0${endLunchHour + (i + 1) * this.ruleForm.maxTime}`;
            arr.push({
              start: start + ":00",
              end: end + ":00"
            });
            arr1.push(`${start + ":00"}~${end + ":00"}`);
          }
        }
        this.timeArr = arr;
        this.ruleForm.courseTimeDtoList = arr1;
        if (arr.length == 0) {
          this.ruleForm.maxFrequency = "";
        } else {
          this.ruleForm.maxFrequency = arr.length;
        }

        // console.log(arr)
      }
    },
    async getbaseDetail() {
      //获取基地详情
      this.getDetailData();
      if (this.identiy == 13) {
        let baseInfo = JSON.parse(localStorage.getItem("xk_practice_userInfo"));
        const res = await adminBaseInfoDetail({ id: baseInfo.baseId });
        try {
          const _datas = res.data.entity;
          this.ruleForm.baseinfoName = _datas.name;
          // console.log(_datas);
          this.detail = _datas;
          this.isSheng = true;
        } catch (error) {
          console.log(error);
        } finally {
        }
      }
    },
    // 获取详情
    getDetailData() {
      const id = this.id || this.$route.query.id;
      if (id) {
        this.showLoading()
        baseinfoDetail({ id: id })
          .then(res => {
            let datas = res.data;
            if (datas.code == 200) {
              const formData = datas.entity || {};
              formData.courseTimeDtoList = formData.courseTimeDtoList || [];
              let arrList = [];
              formData.courseTimeDtoList.forEach(o => {
                let arr = o.split("~") || [];
                if (arr.length == 2) {
                  arrList.push({
                    start: arr[0],
                    end: arr[1]
                  });
                }
              });

              formData.cover = [formData.cover];
              this.ruleForm = formData;
              if (arrList.length > 0) {
                this.timeArr = arrList;
              } else {
                this.checkNum();
              }
              this.checkboxGroup1 = this.ruleForm.scope.split(",");
              if (this.ruleForm.cover)
                this.cover = [
                  {
                    uploadName:"200.jpg",
                    url: this.ruleForm.cover[0]
                  }
                ];
            } else {
              this.$message({
                message: datas.msg,
                type: "warning"
              });
            }
          })
          .finally(() => {
            this.hideLoading()
          });
      }
    },
    goback() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getbaseDetail();
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
.newgrounds .half {
  width: 49.8%;
  display: inline-block;
}
.table_title {
  padding-left: 30px;
}
.table_title p {
  padding: 20px 0;
}
.newgrounds {
  /deep/ .el-upload--picture-card {
    height: 40px;
    line-height: 46px;
  }
}
.school-time-box {
  font-size: 0;
  .school-time-btn {
    display: inline-block;
    text-align: center;
    margin-right: 10px;
    height: 36px;
    line-height: 36px;
    vertical-align: top;
    margin-bottom: 7px;
    padding: 0 10px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    border: 1px solid #008aff;
    background: #008aff;
  }
}
</style>
