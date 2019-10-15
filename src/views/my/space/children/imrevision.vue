<template>
  <div id="modify_pwd" class="bgw">
    <h4 class="head-tit">修改密码</h4>
    <section class="modify-pwd">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <!-- 密码 -->
        <el-row>
          <el-form-item label="原密码" prop="pwd">
            <el-col :span="9">
              <el-input type="password" placeholder="请输入原密码" v-model="form.pwd"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!-- 新密码 -->
        <el-row>
          <el-form-item label="新密码" prop="newPwd">
            <el-col :span="9">
              <el-input type="password" placeholder="请输入新密码" v-model="form.newPwd"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <!-- 确认密码 -->
        <el-row>
          <el-form-item label="确认密码" prop="confirmPwd">
            <el-col :span="9">
              <el-input type="password" placeholder="请再次输入新密码" v-model="form.confirmPwd"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item>
          <el-button class="psn-confirm-btn" type="primary" @click.prevent="modifyPwd('form')">保存</el-button>
          <el-button class="psn-cancel-btn" @click.prevent="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import encrypt from "jsencrypt";
import { requestPublishKey, login } from "@/api/account.js";
import { teachersmodifypasswords } from "@/api/frontstage.js";
import { mapState, mapActions } from "vuex";

const JSEncrypt = encrypt.JSEncrypt.prototype;

export default {
  name: "modify_pwd",
  data() {
    const validateRePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次确认密码"));
      } else if (value !== this.form.newPwd) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    };
    const validatePwd = async (rule, value, callback) => {
      if (await this.judgePwd(value)) {
        callback();
      } else {
        callback(new Error("原密码错误"));
      }
    };
    const validateNewPwd = (rule, value, callback) => {
      const regular = /^(?=.*[a-z|A-Z])(?=.*\d)[^]{8,16}$/;
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value === this.form.pwd) {
        callback(new Error("不能是最近使用过的密码，请重新输入"));
      } else if (!regular.test(value)) {
        callback(new Error("密码必须由 8 到 16 位的字母、数字组成"));
      } else {
        callback();
      }
    };
    return {
      form: {
        pwd: "",
        newPwd: "",
        confirmPwd: ""
      },

      rules: {
        pwd: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur"
          },
          { validator: validatePwd, trigger: "blur" }
        ],
        newPwd: [
          { required: true, validator: validateNewPwd, trigger: "blur" }
        ],
        confirmPwd: [
          { validator: validateRePwd, required: true, trigger: "blur" }
        ]
      },
      account: "" // 当前登录用户账号
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.login.isLogin
    })
  },
  mounted() {
    this.getPublishKey();
    this.account = JSON.parse(
      localStorage.getItem("xk_practice_userInfo")
    ).account;
  },
  methods: {
    ...mapActions('login', ['logout']),
    async getPublishKey() {
      const res = await requestPublishKey();
      if (res.data.code === 200) {
        JSEncrypt.setPublicKey(res.data.entity);
      }
    },
    async judgePwd(val) {
      const params = {
        account: this.account,
        pwd: JSEncrypt.encrypt(val)
      };
      const res = await login(params);
      if (res.data.code === 200) {
        return true;
      } else {
        return false;
      }
    },
    async modifyPwd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 密码加密处理
          const params = {
            oldPwd: JSEncrypt.encrypt(this.form.pwd.trim()),
            newPwd: JSEncrypt.encrypt(this.form.newPwd.trim())
          };
          teachersmodifypasswords(params).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: "修改成功,请重新登录",
                type: "success"
              });
              this.logout().then(() => {
                this.isLogin = false;
              });
              const _this = this;
              window.setTimeout(function() {
                _this.$router.push({ path: "/login" });
              }, 1000);
            } else {
              this.$message({
                message: res.data.msg,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
@import "@/assets/css/scss/vars.scss";
* {
  box-sizing: border-box;
}
#modify_pwd {
  width: 100%;
  min-height: 741px;
  .head-tit {
    padding: 14px 15px;
    font-size: 16px;
    color: #3e3e3e;
    border-bottom: 1px solid #ccc;
  }
}
.modify-pwd {
  margin-top: 15px;
  padding: 15px;
}
</style>

<style lang="scss">
#modify_pwd {
  .el-input__inner {
    height: 38px;
  }
}
</style>