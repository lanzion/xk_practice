<template>
  <div class="activitytimate">
    <div class="conent_tx">
      <div class="conent_tx_one">
        <span>活动基地</span>
      </div>
      <div class="conent_tx_two">
        <el-input v-model="input1" placeholder="请输入基地名称"></el-input>
      </div>
    </div>
    <div class="conent_tx">
      <div class="conent_tx_one">
        <span>基地地址</span>
      </div>
      <div class="conent_tx_two">
        <el-input v-model="input2" placeholder="请输入地址"></el-input>
      </div>
    </div>
    <div class="conent_tx">
      <div class="conent_tx_one">
        <span>活动课程</span>
      </div>
      <div class="conent_tx_two">
        <el-input v-model="input3" placeholder="请输入活动课程名称"></el-input>
      </div>
    </div>
    <div class="conent_tx">
      <div class="conent_tx_one">
        <span>参与服务</span>
      </div>
      <div class="conent_tx_two">
        <el-input v-model="input4" placeholder="请输入参与服务的名称"></el-input>
      </div>
    </div>
    <div class="conent_tx" :style="{'height':'auto'}">
      <div class="conent_tx_one">
        <span>服务评价</span>
      </div>
      <div class="conent_tx_two" :style="{'height':'128px'}">
        <el-input type="textarea"  :rows="5" placeholder="请输入对本次课程的服务基地进行评价..." v-model="textarea"></el-input>
      </div>
    </div>

    <div class="conent_tx">
      <div class="conent_tx_one">
        <span>上传图片</span>
      </div>
      <div class="conent_tx_two" :style="{'height':'auto'}">
        <span class="conent_tx_two_sp">
          最多5张 仅支持JPG、GIF、PNG、JPEG格式，文件小于 5 M。
          建议上传的图片像素为 140*140
        </span>
        <el-upload
          action=""
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="5"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
    </div>

    <div class="btn">
      <el-button round>返回列表</el-button>
      <el-button type="primary" round>保存提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "activitytimate",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      textarea: "",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      // console.log(this.dialogImageUrl);
    }
  }
};
</script>
<style lang="scss" scoped>
.activitytimate {
  width: 100%;
  padding: 30px 0;
  box-sizing: border-box;
  overflow: hidden;
}
.conent_tx {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 30px;
  .conent_tx_one {
    width: 80px;
    height: 40px;
    float: left;
    margin-right: 30px;
    span {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 40px;
      text-align: left;
      color: #666666;
      font-size: 16px;
    }
  }
  .conent_tx_two {
    width: 680px;
    height: 40px;
    float: left;
  }
}
.conent_tx_two_sp {
  display: block;
  height: 40px;
  line-height: 40px;
  color: #999999;
  font-size: 12px;
}
.btn {
  text-align: right;
  padding: 0 30px;
  box-sizing: border-box;
}
</style>