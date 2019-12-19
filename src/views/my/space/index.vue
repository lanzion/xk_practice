<template>
  <div class="space">
    <div class="container">
      <div class="space-fl fl">
        <ul v-if="code == 1">
          <li
            v-for="(item,index) in navlistteach"
            :key="index"
            @click="change(item.path)"
            :class="(item.path).slice(0,10) === ($route.path).slice(0,10) ?'active': ''"
          >{{item.name}}</li>
        </ul>
        <ul v-if="code == 0">
          <li
            v-for="(item,index) in navliststds"
            :key="index"
            @click="change(item.path)"
            :class="(item.path).slice(0,10) === ($route.path).slice(0,10) ?'active': ''"
          >{{item.name}}</li>
        </ul>
      </div>

      <div class="space-fr fl">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>我的大课堂</el-breadcrumb-item>
          <el-breadcrumb-item>{{gettitle}}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </div>
      <div class="space-pos">
        <h5>
          为了您能及时接受活动通知，请绑定手机号
          <i>马上绑定</i>
          <em>×</em>
        </h5>
        <!-- <div class="space-pos-p"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
// 我的空间
import { mapState } from "vuex";
export default {
  name: "space",
  data() {
    return {
      code: "",
      navlistteach: [
        {
          name: "实践课堂",
          path: "/space/classroom"
        },
        {
          name: "作品管理",
          path: "/space/agment"
        },
        {
          name: "作品评分",
          path: "/space/wscoring"
        },
        {
          name: "学生管理",
          path: "/space/mgtudent"
        },
        {
          name: "基本资料",
          path: "/space/bsinfor"
        },
        {
          name: "头像设置",
          path: "/space/avatar"
        },
        {
          name: "账号安全",
          path: "/space/accountsecurity"
        }
      ],
      navliststds: [
        {
          name: "我的活动",
          path: "/space/myactivities"
        },
        {
          name: "我的作品",
          path: "/space/mywork"
        },
        {
          name: "我的收藏",
          path: "/space/mycollection"
        },
        {
          name: "基本资料",
          path: "/space/bsinfor"
        },
        {
          name: "头像设置",
          path: "/space/avatar"
        },
        {
          name: "账号安全",
          path: "/space/accountsecurity"
        }
      ]
    };
  },
  created() {
    this.code = this.$store.state.login.identity;
  },
  computed: {
    isok() {
      return this.$store.state.test.isok;
    },
    gettitle() {
      return this.$store.state.test.title;
    },
    ...mapState("dict", {
      subject: state => (state.subject || {}).dicList || [],
      auditStatus: state => (state.examineStatus || {}).dicList || [],
      lockStatus: state => (state.lockStatus || {}).dicList || []
    })
  },
  methods: {
    change(url) {
      this.$router.push({
        path: url
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.space {
  .container {
    overflow: hidden;
    position: relative;
    .space-fl {
      width: 200px;
      ul {
        background-color: #f5f8ff;
        padding: 70px 0;
        li {
          width: 100%;
          height: 44px;
          text-align: center;
          font-size: 18px;
          font-weight: normal;
          letter-spacing: 1px;
          color: #333333;
          line-height: 44px;
        }
        .active {
          color: #008aff;
          background-color: #ffffff;
        }
      }
    }
    .space-fr {
      padding-left: 20px;
      box-sizing: border-box;
      .el-breadcrumb {
        font-size: 14px;
        color: #666666;
        line-height: 38px;
        margin-bottom: 30px;
      }
    }
    .space-pos {
      width: 300px;
      position: absolute;
      right: 0;
      top: 8px;
      h5 {
        height: 24px;
        line-height: 24px;
        width: 100%;
        font-size: 12px;
        letter-spacing: 0px;
        color: #666666;
        border: 1px solid #eee;
        i {
          font-size: 12px;
          letter-spacing: 0px;
          color: #008aff;
        }
      }
      // .space-pos-p {
      //     position: absolute;
      //     top: 0;
      //     right: 20px;
      //     width: 0;
      //     height: 0;
      //     border: 15px solid;
      //     border-color: transparent transparent #fff;
      //   }
    }
  }
}
</style>
