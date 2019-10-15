<template>
  <el-form label-width="120px" :model="form">
    <el-form-item class="is-text" label="账号">
      <el-col :span="18">{{ form.account }}</el-col>
    </el-form-item>
    <el-form-item class="is-text" label="证件号">
      <el-col :span="18">{{ form.certiNum || '无' }}</el-col>
    </el-form-item>
    <el-form-item class="is-text" label="姓名">
      <el-col :span="18">{{ form.name }}</el-col>
    </el-form-item>
    <el-form-item class="is-text" label="就读学校">
      <el-col :span="18">{{ form.schoolName || '无' }}</el-col>
    </el-form-item>
    <hr class="separation-line" />
    <el-form-item label="性别">
      <el-col :span="18">
        <el-radio-group v-model="form.sex">
          <el-radio v-for="item in sex" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-col>
    </el-form-item>
    <el-form-item label="手机号码">
      <el-col :span="18">
        <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="电子邮箱">
      <el-col :span="18">
        <el-input v-model="form.email" placeholder="请输入电子邮箱"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="联系地址">
      <el-col :span="18">
        <el-input v-model="form.address" placeholder="请输入联系地址"></el-input>
      </el-col>
    </el-form-item>
    <hr class="separation-line" />
    <el-form-item label="个人简介">
      <el-col :span="18">
        <el-input type="textarea" :rows="4" placeholder="请输入个人简介" v-model="form.sign"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item class="m-operate--box is-right">
      <el-col :span="18">
        <el-button type="primary" @click="submit">保存</el-button>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("dict", {
      sex: state => ((state.sex || {}).dicList || []).filter(x => x.option)
    })
  },
  props: {
    form: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    ...mapActions("experience", ["submitExperience"]),
    submit() {
      this.submitExperience(this.form).then(res => {
        const { code, msg } = res;
        if (code === 200) {
          this.$message({
            message: this.form.id ? "编辑成功" : "添加成功",
            type: "success"
          });
          this.$router.go(-1);
        } else {
          this.$message({
            message: msg,
            type: "warning"
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/module/my-module-form.scss";
</style>
