<template>
  <div class="managelist">
    <div class="g-search--wrap clearfix" :style="{'marginTop':'20px'}">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>基地项目管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加项目</el-breadcrumb-item>
      </el-breadcrumb>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :style="{'marginTop':'20px'}"
      >
        <el-form-item label="项目标题" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 分割 -->
      <div :style="{'height':'40px'}">
        <div class="managelist_fl" :style="{'width':'48%','float':'left','height':'40px'}">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="所属领域" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div class="managelist_fr" :style="{'width':'48%','float':'right','height':'40px'}">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="所属模块" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!-- 分割 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :style="{'marginTop':'10px'}"
      >
        <el-form-item label="适合人群" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="小学" name="type"></el-checkbox>
            <el-checkbox label="初中" name="type"></el-checkbox>
            <el-checkbox label="高中" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <!-- 分割 -->

      <div :style="{'height':'200px'}">
        <div class="managelist_fl" :style="{'width':'48%','float':'left','height':'200px'}">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="最小参与" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="项目时长" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="排班限制" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div class="managelist_fr" :style="{'width':'48%','float':'right','height':'200px'}">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="最大参与" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="日办次数" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label prop :style="{'height':'32px'}"></el-form-item>
            <el-form-item label="联系方式" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :style="{'marginTop':'20px'}"
      >
        <el-form-item label="活动地址" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :style="{'marginTop':'20px'}"
      >
        <el-form-item label="详细说明" prop="desc">
          <el-input
            type="textarea"
            v-model="ruleForm.desc"
            :style="{'width':'100%','border':'1px solid #000'}"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 分割 -->
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleChange"
      >
        <span class="fj" :style="{'marginLeft':'32px'}">项目附件</span>
        <el-button size="small" type="primary">选取文件</el-button>
        <span class="fj">上传附件，文件大小在500M以内</span>
      </el-upload>

      <div :style="{'height':'40px','marginTop':'20px'}">
         <span class="fj" :style="{'marginLeft':'32px'}">项目状态</span>
        <el-radio v-model="radio" label="1">开启</el-radio>
        <el-radio v-model="radio" label="2">关闭</el-radio>
      </div>
      <div :style="{'textAlign':'center','height':'40px'}">
          <el-button>取消</el-button>
          <el-button type="primary">确认添加</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "managelist",
  data() {
    return {
        radio: '1',
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.fj {
  font-size: 14px;
  color: #606266;
  margin-right: 10px;
}
</style>
