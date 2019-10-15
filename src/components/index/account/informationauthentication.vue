<template>
  <div class="informationauthentication">
    <div class="container">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="基地名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="基地区域" prop="provinceId">
          <region type="object" @change="changeRegion" :default="defaultRegion" class="regions"></region>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="liaisonMan">
          <el-input v-model="ruleForm.liaisonMan"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="liaisonWay">
          <el-input v-model="ruleForm.liaisonWay"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="基地类型" prop="baseinfoTypeList">
          <el-cascader
            v-model="ruleForm.baseinfoTypeList"
            :options="ActivityTypeParent"
            :props="props"
            @change="getover"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="goBack">上一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getActivityTypeParent } from "@/api/newApi";
import { registBaseInfo } from "@/api/account";
export default {
  name: "informationauthentication",
  data() {
    let validateMobile = (rule, value, callback) => {
      let regular = /^[1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|76|77|78)[0-9]{8}$/;
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!regular.test(value)) {
        callback(new Error("请输入正确格式的手机号"));
      } else {
        callback();
      }
    };
    let validateEmail = (rule, value, callback) => {
      let regular = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (value === "") {
        callback(new Error("请输入电子邮箱"));
      } else if (!regular.test(value)) {
        callback(new Error("请输入正确格式的电子邮箱"));
      } else {
        callback();
      }
    };
    return {
      props: { multiple: true, expandTrigger: "hover" },
      defaultRegion: [],
      baseinfoTypeList: [],
      ActivityTypeParent: [],
      ruleForm: {
        name: "",
        liaisonMan: "",
        liaisonWay: "",
        fax: "",
        email: "",
        provinceId: "",
        cityId: "",
        areaId: "",
        address: "",
        baseinfoTypeList: []
      },
      rules: {
        name: [{ required: true, message: "请填写基地名称", trigger: "blur" }],
        liaisonMan: [
          { required: true, message: "请填写联系人", trigger: "blur" }
        ],
        liaisonWay: [
          { required: true, validator: validateMobile, trigger: "blur" }
        ],
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
        provinceId: [
          { required: true, message: "请选择基地区域", trigger: "change" }
        ],
        address: [
          { required: true, message: "请填写详细地址", trigger: "blur" }
        ],
        baseinfoTypeList: [
          {
            type: "array",
            required: true,
            message: "请选择基地类型",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    active() {
      return this.$store.state.test.active;
    }
  },
  methods: {
    getover() {
      let res = [];
      this.ruleForm.baseinfoTypeList.forEach(x => {
        let q1 = {
          specialTypeId: x[0],
          specialDetailId: x[1]
        };
        res.push(q1);
      });
       this.baseinfoTypeList = res
       console.log(this.baseinfoTypeList)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm);
          let useData = JSON.parse(sessionStorage.getItem("regist"));
          this.ruleForm.account = useData.name;
          this.ruleForm.pwd = useData.pwd;
          this.ruleForm.baseinfoTypeList = this.baseinfoTypeList;
          this.$store.commit("changeactive", 3);
          registBaseInfo(this.ruleForm).then(
            res => {
              let _data = res.data;
              if (_data.code == 200) {
                this.$message({
                  message: "注册成功",
                  type: "success"
                });
                sessionStorage.removeItem("regist");
                this.$router.push({ path: "/completionofregistration" });
              } else {
                this.$message({
                  message: _data.msg || "注册失败",
                  type: "error"
                });
              }
            },
            err => {
              console.log(err);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      this.$router.go(-1);
    },
    changeRegion(region) {
      if (region[0].code) this.ruleForm.provinceId = region[0].code;
      if (region[1].code) this.ruleForm.cityId = region[1].code;
      if (region[2].code) this.ruleForm.areaId = region[2].code;
      console.log(region);
    },
    // 获取领域和主题模块
    getActivityTypeParent() {
      getActivityTypeParent({}).then(res => {
        let datas = res.data;
        console.log(datas);
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
          console.log(this.ActivityTypeParent);
        }
      });
    }
  },
  created() {
    this.getActivityTypeParent();
  }
};
</script>
<style lang="scss" scoped>
.informationauthentication {
  background: #fff;
  .container {
    padding: 0 300px;
    box-sizing: border-box;
  }
}
</style>