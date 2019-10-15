<template>
  <div class="diyt">
    <swriper :type="numimg" />
    <div class="container">
      <conentfrist />
      <conenttwo />
      <conentthr />
    </div>
    <!-- <aside class="aside g-bg--white fl">
      <aside-menu :datas="permiss" />
    </aside>-->
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "index",
  data() {
    return {
      numimg: "1",
      permiss: [],
      breadcrumb: [],
      groundimg: require("../../../../static/img/daohang.png"),
      flag: true,
      isFlag: true
    };
  },
  components: {
    swriper: resolve => require(["@/views/my/swriper/swriper"], resolve),
    conentfrist: resolve =>
      require(["@/views/my/conentfrist/conentfrist"], resolve),
    conenttwo: resolve => require(["@/views/my/conenttwo/conenttwo"], resolve),
    conentthr: resolve => require(["@/views/my/conentthr/conentthr"], resolve)
    // "aside-menu": resolve => require(["@/components/my/common/aside"], resolve)
  },
  computed: {
    ...mapGetters("login", {
      identity: "identityCode"
    }),
    ...mapState("login", {
      // 用户信息
      user: state => state.userInfo || {},
      permission: state => state.permission || {}
    })
  },
  watch: {
    // 'user.id': {
    //     handler: function (id) {
    //         if (!id) {
    //             this.redirectCallback(this.page.login.url)
    //         }
    //     },
    //     immediate: true
    // },
    identity: {
      handler: function(identity) {
        if (identity) {
          this.permiss = Object.values(this.permission[identity] || {});
          // console.log('左侧导航数据：', this.permiss)
        }
      },
      immediate: true
    }
  },
  mounted() {
    // window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop >= 800) {
        if (this.isFlag) this.flag = true;
      }
    },
    sol() {
      this.flag = false;
      this.isFlag = false;
    }
  },
  destroyed: function() {
    // window.removeEventListener("scroll", this.handleScroll); //  离开页面清除（移除）滚轮滚动事件
  }
};
</script>
<style lang="scss" scoped>
.diyt {
  font-size: 50px;
}
$aside-width: 200px;
$aside-margin: 20px;
.aside {
  width: $aside-width;
  margin-right: $aside-margin;
}
.tolower {
  position: fixed;
  bottom: 50px;
  left: 125px;
  width: 170px;
  height: 391px;
  overflow: hidden;
  z-index: 1000;
  ul {
    width: 100%;
    height: 100%;
    overflow: hidden;
    li {
      width: 100%;
      margin-top: 23px;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      font-weight: normal;
      color: #5b490c;
      text-align: center;
      cursor: pointer;
      &:nth-child(1) {
        margin-top: 168px;
      }
    }
  }
}
.guang {
  position: fixed;
  left: 80px;
  bottom: 170px;
  width: 180px;
  a {
    display: block;
    img {
      display: block;
      width: 100%;
    }
  }
  .sol {
    font-size: 14px;
    padding: 2px 6px;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    right: 0;
    color: #fafafa;
    cursor: pointer;
    border-radius: 2px 0 0 2px;
  }
}
</style>
