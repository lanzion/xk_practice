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
                 <el-form-item label="所属基地" prop="address">
                    <el-input v-model="ruleForm.address" :disabled="isReadonly"></el-input>
                  </el-form-item>
           </el-col>
        </el-row>
     
         <el-row>
            <el-col :span="15">
                  <el-form-item label="服务标题" prop="title">
                    <el-input v-model="ruleForm.title" :disabled="isReadonly"></el-input>
                  </el-form-item>
           </el-col>
        </el-row>
        <el-form-item label="服务金额" prop="price" class="half">
          <el-input v-model="ruleForm.price" :disabled="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="适合人群" prop="fit" class="half">
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
        <!-- <el-form-item label="服务位置" prop="address" class="half">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>-->
        <el-form-item label="服务说明" prop="expound">
          <el-input type="textarea"  rows="4" v-model="ruleForm.expound" :disabled="isReadonly"></el-input>
        </el-form-item>
        <el-form-item label="服务图片" prop="desc">
          <div class="demo-image__preview">
            <el-image
               style="width: 300px; height: 300px;" fit="cover"
              :src="ruleForm.cover"
              :preview-src-list="srcList"
            ></el-image>
          </div>
        </el-form-item>
      </el-form>

      <div class="table_title">
        <p>审核记录</p>
        <el-table
          ref="table"
          :data="ruleForm.auditDtoList"
          stripe
          align="center"
          @selection-change="changeSelection"
          border
          :header-cell-style="{'background-color':'#eee', 'color':'#666'}"
        >
          <el-table-column prop="createDate" label="提交时间"/>
          <el-table-column prop="createName" label="提交人"/>
          <el-table-column prop="updateDate" label="操作时间" />
          <el-table-column prop="updateName" label="操作人" />
          <el-table-column prop="auditStatus" label="操作结果">
            <template slot-scope="scope">
              <span v-if="scope.row.auditStatus == 'A'">通过</span>
              <span v-else>不通过</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="问题说明" width="500" />
        </el-table>
      </div>
      <div class="description" v-if="!auditStatus">
        <div class="description_title">问题描述</div>
        <div class="description_box">
          <el-input type="textarea"  rows="4" v-model="description" placeholder="请输入问题描述"></el-input>
        </div>
      </div>
      <div :style="{'width':'100%','marginTop':'20px', 'padding-left': '30px'}">
        <el-button type="primary" @click="goback" plain>返回列表</el-button>
        <el-button type="primary" @click="audit('A')" v-if="!auditStatus">通过</el-button>
        <el-button type="primary" @click="audit('B')" v-if="!auditStatus">不通过</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  baseinfoDetail,
  activityAudit,
  baseinfoprojectAudit
} from "@/api/newApi";
export default {
  name: "newgrounds",
  data() {
    return {
      isReadonly:true,
      checkboxGroup1: [],
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
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg"
      ],
      isLoading: true,
      listData: [
        {
          submiTime: "测试"
        },
        {
          submiTime: "测试"
        }
      ],
      description: "",
      auditStatus:false,
    };
  },
  methods: {
    // 记录表格选中项
    changeSelection(val) {
      this.selection = val;
    },
    goback() {
      this.$router.go(-1);
    },
    // 获取详情
    getDetails() {
      let id = this.id || this.$route.query.id;
      if (id) {
        this.isLoading = true;
        baseinfoDetail({ id: id })
          .then(res => {
            let datas = res.data;
            if (datas.code == 200) {
              this.ruleForm = datas.entity;
              this.checkboxGroup1 = this.ruleForm.scope.split(",");
              if(this.ruleForm.auditStatus=='A') this.auditStatus = true;
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
        //获取审核记录
        // activityAudit({ activityId: id }).then(res => {
        //   console.log(res.data);
        // });
      }
    },
    // 审核
    audit(item) {
      let id = this.id || this.$route.query.id;
      baseinfoprojectAudit({
        projectId: id,
        content: this.description,
        auditStatus: item
      })
        .then(res => {
          console.log(res.data);
          let datas = res.data;
          if (datas.code == 200) {
            this.$alert("审核成功", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push({ path: "/baseManage/baseService" });
              }
            });
          } else {
            this.$message({
              message: datas.msg,
              type: "warning"
            });
          }
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.getDetails();
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
.description {
  padding-left: 30px;
  margin-top: 20px;
  &_title {
    height: 40px;
    line-height: 40px;
    background-color: #02a7f0;
    color: #fff;
    padding-left: 5px;
    font-size: 14px;
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
