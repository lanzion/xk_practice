<template>
  <div class="completionofregistration">
    <div class="container">
      <div :style="{'marginBottom':'30px'}">
        <img :src="imgurl" alt />
      </div>
      <div :style="{'marginBottom':'30px'}">
        <p>注册完成,去登录</p>
      </div>
      <div>
        <a href="/my.html#/login">
          <el-button type="primary" round>点击登录</el-button>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "completionofregistration",
  data() {
    return {
      imgurl: require("../../../../static/img/wancheng(1).png")
    };
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.completionofregistration {
  .container {
    width: 100%;
    div {
      width: 100%;
      padding-bottom: 0 300px;
      text-align: center;
      overflow: hidden;
      img {
        width: 54px;
        height: 54px;
      }
      p {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #3e3e3e;
        text-align: center;
      }
    }
  }
}
</style>