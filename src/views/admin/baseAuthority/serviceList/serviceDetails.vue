<template>
  <div class="newgrounds">
    <div class="g-search--wrap clearfix" style="maxWidth:1200px;min-width: 700px;">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :style="{'marginBottm':'20px'}"
      >
        <el-row>
          <el-col :span="15">
            <el-form-item label="服务标题" prop="title">
              <el-input v-model="ruleForm.title" :disabled="isReadonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="所属基地" prop="baseinfoName">
              <el-input v-model="ruleForm.baseinfoName" :disabled="isReadonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="服务金额" prop="price" class="half">
          <el-input v-model="ruleForm.price" :disabled="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="适合人群" prop="scope" class="half">
          <el-checkbox-group v-model="checkboxGroup1" :disabled="isReadonly">
            <el-checkbox label="A" name="type">小学</el-checkbox>
            <el-checkbox label="B" name="type">初中</el-checkbox>
            <el-checkbox label="C" name="type">高中</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="最大参与" prop="maxMannum" class="half">
          <el-input v-model="ruleForm.maxMannum" :disabled="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="班级限制" prop="maxClassNum" class="half">
          <el-input v-model="ruleForm.maxClassNum" :disabled="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="活动时长" prop="maxTime" class="half">
          <el-input v-model="ruleForm.maxTime" :disabled="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="日办次数" prop="maxFrequency" class="half">
          <el-input v-model="ruleForm.maxFrequency" :disabled="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="服务时间段">
             <div class="school-time-box">
                <span class="school-time-btn" v-for="(item,index) in ruleForm.courseTimeDtoList"  :key="index" >{{item}}</span>
            </div>
        </el-form-item>
        <el-form-item label="负责人" prop="personInCharge" class="half">
          <el-input v-model="ruleForm.personInCharge" :disabled="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="personInChargePhone" class="half">
          <el-input v-model="ruleForm.personInChargePhone" :disabled="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="服务位置" prop="address" class="half">
          <el-input v-model="ruleForm.address" :disabled="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="服务说明" prop="expound">
          <el-input type="textarea" v-model="ruleForm.expound" :disabled="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="服务图片" prop="desc">
          <el-image :src="ruleForm.cover" style="width: 300px; height: 300px;" fit="cover">
            <div
              slot="error"
              class="image-slot"
              style="font-size: 30px;line-height: 180px;text-align: center;background:aliceblue"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </el-form-item>
      </el-form>
      <div :style="{'width':'100%','marginTop':'20px'}">
        <el-button type="primary" plain @click="goback">返回列表</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { baseinfoDetail } from "@/api/newApi";

export default {
  name: "newgrounds",
  data() {
    return {
      isReadonly: true,
      checkboxGroup1: [],
      cover: "",
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
        imageUrl: ""
      },
      srcList: []
    };
  },
  methods: {
    // 获取详情
    getDetailData() {
      const id = this.id || this.$route.query.id;
      if (id) {
        this.isLoading = true;
        baseinfoDetail({ id: id })
          .then(res => {
            let datas = res.data;
            if (datas.code == 200) {
              this.ruleForm = datas.entity;
              this.cover = this.ruleForm.cover;
              this.checkboxGroup1 = this.ruleForm.scope.split(",") || [];
            } else {
              this.isLoading = true;
              this.$message({
                message: datas.msg,
                type: "warning"
              });
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },

    goback() {
      this.$router.go(-1);
    }
  },
  created() {
    this.getDetailData();
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
.school-time-box{
        font-size:0;
        .school-time-btn{
            display: inline-block;
            text-align: center;
            margin-right:10px;
            height: 36px;
            line-height: 36px;
            vertical-align: top;
            margin-bottom:7px;
            padding:0 10px;
            font-size: 14px;
            border-radius: 4px;
            color:#fff;
            border:1px solid #008aff;
            background:#008aff;
        }
    }
</style>
