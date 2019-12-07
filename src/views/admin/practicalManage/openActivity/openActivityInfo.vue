<template>
  <div class="openactivityinfo">
    <div class="title">课程基本信息</div>
    <div class="clearfix">
      <el-col>
        <el-col :span="3" class="subtitle">活动分类：</el-col>
        <el-col :span="20">参观学习</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">活动名称：</el-col>
        <el-col :span="20">参观学习</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">活动封面：</el-col>
        <el-col :span="20">
          <el-image :src="getFileUrl(data.cover)" class="school-detail-img" @click="prewImage">
            <div slot="placeholder" class="image-slot">
              加载中
              <span class="dot">...</span>
            </div>
          </el-image>
        </el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">适合学段：</el-col>
        <el-col :span="20">参观学习</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">是否收费：</el-col>
        <el-col :span="20">参观学习</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">报名时间：</el-col>
        <el-col :span="20">参观学习</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">活动时间：</el-col>
        <el-col :span="20">参观学习</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">每场人数限制：</el-col>
        <el-col :span="20">参观学习</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">活动地点：</el-col>
        <el-col :span="20">参观学习</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">集合地点：</el-col>
        <el-col :span="20">参观学习</el-col>
      </el-col>
    </div>

    <div class="title">活动联系人信息</div>
    <div class="clearfix">
      <el-col>
        <el-col :span="3" class="subtitle">联系人：</el-col>
        <el-col :span="20">参观学习</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">联系人电话：</el-col>
        <el-col :span="20">参观学习</el-col>
      </el-col>
    </div>
    <div class="title">活动详情</div>
    <div class="clearfix">
      <el-col>
        <el-col :span="22" :offset="1">参观学习</el-col>
      </el-col>
    </div>
    <div class="clearfix">
      <el-col>
        <el-col :span="3" class="subtitle">活动配套资源：</el-col>
        <el-col :span="19">参观学习</el-col>
      </el-col>
    </div>

    <div class="btn_list">
      <el-button @click="offDialogVisible=true">不通过活动</el-button>
      <el-button type="primary">确认通过活动</el-button>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="getFileUrl(dialogImageUrl)" alt />
    </el-dialog>
    <el-dialog title :visible.sync="offDialogVisible" width="500px">
      <div class="visble_conter">
        <div class="visble_title">
          <span>*</span> 请选择屏蔽原因：
        </div>
        <div class="radio_list">
          <el-row>
            <el-col :span="8">
              <el-radio v-model="radio" label="内容抄袭">内容抄袭</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="违法信息">违法信息</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="人身攻击">人身攻击</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="涉黄信息">涉黄信息</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="不实信息">不实信息</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="广告营销">广告营销</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="涉及隐私">涉及隐私</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="其它">其它</el-radio>
            </el-col>
          </el-row>
        </div>
        <div class="other" v-if="radio=='其它'">
          <div class="visble_title">
            <span>*</span> 屏蔽原因说明：
          </div>
          <div>
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="othertxt"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="offDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="shieidSubmi">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "",
      othertxt: "",
      data: {},
      dialogVisible: false,
      offDialogVisible: false,
      dialogImageUrl: ""
    };
  },
  methods: {
    prewImage() {
      this.dialogImageUrl = this.data.cover;
      this.dialogVisible = true;
    },
    shieidSubmi(){
        let content = "";
      content = this.radio == "其它" ? this.othertxt : this.radio;
      if (!content) {
        this.$message({
          message: "请选择屏蔽原因或填写屏蔽原因",
          type: "warning"
        });
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.openactivityinfo {
  font-size: 14px;
  line-height: 30px;
  .school-detail-img {
    width: 300px;
    height: 300px;
    cursor: pointer;
    /deep/ .el-image__error {
      background: #eee;
    }
  }
  .title {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    color: #000;
  }
  .subtitle {
    text-align: right;
  }
  .btn_list {
    text-align: center;
    padding-top: 30px;
  }
}
.visble_conter {
  line-height: 30px;
  .visble_title {
    color: #000;
    span {
      color: #d9001b;
    }
  }
}
</style>