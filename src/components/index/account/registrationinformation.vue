<template>
  <div class="registrationinformation">
    <div class="container">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">我同意社会实践大课堂《用户使用协议》</el-checkbox>
        </el-form-item>
      </el-form>
      <div class="next">
        <el-button style="margin-top: 12px;" @click="submitForm('ruleForm')">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { verificationofbaseregistrationaccount } from "@/api/frontstage";
import {
  validateAccount,
  validatePwd,
  validateVerifyPwd,
} from "@/utils/utility/validateRule";

import register from "@/mixin/register";
export default {
  mixins: [register],
  name: "registrationinformation",
  data() {
    const validateRePwd = (rule, value, callback) => {
      validateVerifyPwd(this.ruleForm.pass)(rule, value, callback);
    };
    return {
      checked: true,
      ruleForm: {
        pass: "",
        checkPass: "",
        name: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["change", "blur"]
          },
          { validator: validateAccount, trigger: ["change", "blur"] }
        ],
        pass: [{ validator: validatePwd, trigger: ["change", "blur"] }],
        checkPass: [
          { validator: validateRePwd, trigger: ["change", "blur"] }
        ]
      }
    };
  },
  created() {
    this.$store.commit("changeactive", 1);
    this.getHistoryData();
  },
  computed: {
    active() {
      return this.$store.state.test.active;
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.checked) {
            this.$message({
              message: "请勾选用户使用协议",
              type: "error"
            });
            return false;
          }
          this.yanzhengzhanghao();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async yanzhengzhanghao() {
      let res = await verificationofbaseregistrationaccount({
        account: this.ruleForm.name
      });
      console.log(res);
      if (res.data.code === 200) {
        let regist = {
          name: this.ruleForm.name,
          pwd: this.ruleForm.pass
        };
        sessionStorage.setItem("regist", JSON.stringify(regist));
        this.$store.commit("changeactive", 2);
        this.$router.push({ path: "/informationauthentication" });
      } else {
        this.$alert("该用户名已经存在!", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: "请重新输入账号"
            });
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getHistoryData() {
      let data = sessionStorage.getItem("regist");
      if (data) {
        let _data = JSON.parse(data);
        this.ruleForm.name = _data.name;
        this.ruleForm.pass = _data.pwd;
        this.ruleForm.checkPass = _data.pwd;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.registrationinformation {
  background: #fff;
  .container {
    padding: 0 300px;
    box-sizing: border-box;
  }
}
.next {
  text-align: center;
  background: #fff;
}
</style>