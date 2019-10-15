<template>
  <el-form label-width="120px" :model="form">
    <el-form-item class="is-text" label="账号">
      <el-col :span="18">{{ form.account }}</el-col>
    </el-form-item>
    <el-form-item class="is-text" label="证件号">
      <el-col :span="18">{{ form.certiNum }}</el-col>
    </el-form-item>
    <el-form-item class="is-text" label="姓名">
      <el-col :span="18">{{ form.name }}</el-col>
    </el-form-item>
    <el-form-item class="is-text" label="就职学校">
      <el-col :span="18">{{ form.schoolName }}</el-col>
    </el-form-item>
    <hr class="separation-line" />
    <el-form-item label="任教学科">
      <el-col :span="18">
        <el-select
          class="is-input"
          popper-class="is-input"
          v-model="form.teach"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请输入任教学科，按回车键确认"
        >
          <el-option v-for="item in []" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="性别">
      <el-col :span="18">
        <el-radio-group v-model="form.sex">
          <el-radio v-for="item in sex" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-col>
    </el-form-item>
    <el-form-item label="最高学历">
      <el-col :span="9">
        <el-select v-model="form.education" placeholder="请选择最高学历">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="编制类型">
      <el-col :span="9">
        <el-select v-model="form.compileType" placeholder="请选择编制类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="职称">
      <el-col :span="9">
        <el-select v-model="form.title" placeholder="请选择职称">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
    <el-form-item label="教学特长">
      <el-col :span="18">
        <el-input type="textarea" :rows="4" placeholder="请输入教学特长" v-model="form.speciality"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="研究成果">
      <el-col :span="18">
        <el-input type="textarea" :rows="4" placeholder="请输入研究成果" v-model="form.achievement"></el-input>
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
    return {
      options: []
    };
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
