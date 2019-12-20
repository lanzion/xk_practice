<template>
  <div class="atsecuritys">
    <div class="titlego">
      <h4>账号设置</h4>
    </div>
    <div class="conent">
      <ul>
        <li>
          <span>密码设置</span>
          <span>建议您定期更改密码以保护账号安全</span>
          <span @click="changeone()">立即修改</span>
        </li>
        <li>
          <span>手机绑定</span>
          <span>您还没绑定手机，建议绑定手机更安全</span>
          <span @click="changeotwo()">立即绑定</span>
        </li>
        <li>
          <span>邮箱绑定</span>
          <span>已绑定邮箱123456789@qq.com</span>
          <span @click="changeothr()">修改邮箱</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "accountsecurity",
  methods: {
    changeone() {
      this.$router.push({ path: "/space/accountsecurity/pswd" });
    },
    changeotwo() {
      this.$router.push({ path: "/space/accountsecurity/phone" });
    },
    changeothr() {
      this.$router.push({ path: "/space/accountsecurity/email" });
    }
  },
  created() {
    this.$store.commit("changetitle", "账号安全");
  }
};
</script>
<style lang="scss" scoped>
.atsecuritys {
  width: 980px;
  min-height: 600px;
  .titlego {
    width: 100%;
    height: 75px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    h4 {
      font-size: 18px;
      font-size: #333;
      height: 100%;
      line-height: 75px;
      text-indent: 45px;
    }
  }
  .conent {
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
    ul {
      width: 100%;
      li {
        height: 78px;
        border-bottom: 1px dashed #ccc;
        line-height: 78px;
        span {
          display: inline-block;
          &:nth-child(1) {
            font-size: 16px;
            color: #666;
            margin-right: 42px;
          }
          &:nth-child(2) {
            font-size: 16px;
            color: #333;
          }
          &:nth-child(3) {
            font-size: 14px;
            color: #008aff;
            width: 120px;
            height: 36px;
            border-radius: 5px;
            border: solid 1px #008aff;
            float: right;
            line-height: 36px;
            text-align: center;
            margin-top: 20px;
            &:hover {
              background-color: #008aff;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
</style>
