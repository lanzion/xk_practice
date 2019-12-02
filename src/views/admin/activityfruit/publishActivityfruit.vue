<template>
  <div
    class="publishactivityfruit g-search--wrap clearfix"
    style="maxWidth:1200px;min-width: 700px;"
  >
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
          <el-form-item label="活动成果标题" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="15">
          <el-form-item label="活动成果类型" prop="resultType">
            <el-radio-group v-model="form.resultType">
              <el-radio :label="1">活动小结</el-radio>
              <el-radio :label="2">学生作品</el-radio>
              <el-radio :label="3">学生感悟</el-radio>
              <el-radio :label="4">活动影像</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <component :is="outcome" ref="child" :childForm="form"></component>
    <div :style="{'marginTop':'20px', 'padding-left': '100px','text-align': 'center'}">
      <el-button type="primary" plain style="margin-top: 30px;" @click="draft">存草稿</el-button>
      <el-button type="primary" @click="submitForm">提交审核</el-button>
    </div>
  </div>
</template>

<script>
import activityres from "./activityres.vue";
import { resultActivityDraft,resultActivityCommit,resultActivityDetail,resultActivityUpdate } from "@/api/newApi";
export default {
  components: {
    activityres: resolve =>
      require(["@/views/admin/activityfruit/activityres.vue"], resolve)
  },
  data() {
    return {
      form: {
        resultType: 1
      },
      rules: {
        title: [
          {
            required: true,
            message: "活动成果标题",
            trigger: ["change", "blur"]
          }
        ],
        resultType: [
          {
            required: true,
            message: "请选择活动成果类型",
            trigger: ["change", "blur"]
          }
        ]
      },
      childForm: {}
    };
  },
  computed: {
    outcome() {
      return "activityres";
    }
  },
  methods: {
    // 获取详情
    async getData()  {
        const id = this.$route.query.id;
        if(id){
           let res = await resultActivityDetail({id})
           const { entity: datas = {} } = res.data;
           try{
               if(res.data.code==200){
                   this.form = Object.assign({}, datas);
               }else{
                   this.$message({
                  message: res.data.msg || `加载失败`,
                  type: "error"
                });
               }
           }catch(err){
               console.log(err);
           }finally{

           }
        }
    },
    submitForm() {
      let flag = this.$refs.child.submitForm();
      this.$refs["ruleForm"].validate(valid => {
        if (valid && flag) {
          let formList = Object.assign({}, this.form);
        //   for (const key in this.form) {
        //       formList[key] = this.form[key]
        //   }
          resultActivityCommit(formList).then(res => {
            try {
              let datas = res.data;
              if (datas.code == 200) {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: res.data.msg || `提交失败`,
                  type: "error"
                });
              }
            } catch (err) {
              console.log(err);
            }
          });
        }
      });
    },
    draft() {
        let haed;
        const id = this.$route.query.id;
        if(id) haed = resultActivityUpdate
        else haed = resultActivityDraft
      let flag = this.$refs.child.submitForm();
      this.$refs["ruleForm"].validate(valid => {
        if (valid && flag) {
          let formList = Object.assign({}, this.form);
          haed(formList).then(res => {
            try {
              let datas = res.data;
              if (datas.code == 200) {
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
            } catch (err) {
              console.log(err);
            }
          });
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