<template>
  <div class="workshow">
    <div class="imgshow">
      <img :src="imgurl" alt />
    </div>
    <div class="container">
      <div class="container_title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/work' }">基地机构</el-breadcrumb-item>
          <el-breadcrumb-item>活动基地</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container_one">
        <div class="container_one_l">
          <img :src="datas.cover" alt />
        </div>
        <div class="container_one_r">
          <div class="container_one_r_header">{{datas.name}}</div>
          <div class="container_one_r_drss">
            <i>
              <img :src="dizhi" alt />
            </i>
            <span>{{datas.address}}</span>
          </div>
          <div class="container_one_r_show">
            <div class="container_one_r_name">
              <i>
                <img :src="renhei" alt />
              </i>
              <span>{{datas.liaisonMan}}</span>
            </div>
            <div class="container_one_r_phone">
              <i>
                <img :src="phone" alt />
              </i>
              <span>{{datas.liaisonWay}}</span>
            </div>

            <div class="container_one_r_eye">
              <i>
                <img :src="eye" alt />
              </i>
              <span>{{datas.browseNum}}</span>
            </div>
          </div>
          <div class="container_one_r_min">
            <p>{{datas.remark}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container_two">
      <ul>
        <li
          v-for="(k,index) in arr"
          :class="k.url===$route.path?'active':''"
          :key="index"
          @click="changes(k.url)"
        >{{k.name}}</li>
      </ul>
    </div>
    <router-view />
  </div>
</template>
<script>
import { getaccesstobasedetails } from "@/api/frontstage";
export default {
  name: "workshow",
  data() {
    return {
      datas: "",
      imgurl: require("../../../../static/img/jidibeij.png"),
      dizhi: require("../../../../static/img/dizhi.png"),
      renhei: require("../../../../static/img/renhei.png"),
      phone: require("../../../../static/img/shouji.png"),
      eye: require("../../../../static/img/liulanhui.png"),
      arr: [
        {
          name: "相关课程",
          url: "/baseservices"
        },
        {
          name: "相关资讯",
          url: "/baseinformation"
        },
        {
          name: "基地/机构评价",
          url: "/baseevaluation"
        }
      ]
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    async getlist() {
      let nid = localStorage.getItem("nid");
      let oid = this.$route.query.id;
      let id = "";
      if (oid) {
        id = oid;
      } else {
        id = nid;
      }
      let res = await getaccesstobasedetails({ id: id });
      if (res.data.code != 200) {
        return;
      }
      this.datas = res.data.entity || {};
      let isfrom = {
        cover: this.datas.cover,
        name: this.datas.name,
        address: this.datas.address,
        liaisonMan: this.datas.liaisonMan,
        liaisonWay: this.datas.liaisonWay,
        remark: this.datas.remark,
        browseNum: this.datas.browseNum
      };
      sessionStorage.setItem("baselist", JSON.stringify(isfrom));
      sessionStorage.setItem(
        "xkbase",
        JSON.stringify(this.datas.projectVOList)
      );
    },
    changes(url) {
      let id = this.$route.query.id;
      this.$router.push({ path: url, query: { id: id } });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-breadcrumb__inner {
  color: #fff !important;
}

.container_title {
  width: 100%;
  height: 30px;
  color: #fff;
  /deep/ .el-breadcrumb__separator {
    color: #fff;
  }
}
.workshow {
  width: 100%;
  height: 100%;
  .imgshow {
    height: 276px;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
  .container {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 85px;
    overflow: hidden;
    .container_one {
      width: 100%;
      height: 288px;
      padding: 22px 24px;
      background: #fff;
      box-sizing: border-box;
      z-index: 1000;
      .container_one_l {
        width: 400px;
        height: 240px;
        overflow: hidden;
        margin-right: 50px;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .container_one_r {
        float: left;
        height: 240px;
        width: 686px;
        padding-left: 30px;
        border-left: 1px solid #ccc;
        box-sizing: border-box;
        .container_one_r_header {
          text-indent: 5px;
          font-size: 22px;
          color: #333;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          // line-height: 30px;
          margin-bottom: 20px;
          text-align: left;
        }
        .container_one_r_drss {
          margin-top: 10px;
          height: 30px;
          width: 100%;
          i {
            float: left;
            margin-right: 10px;
          }
          span {
            float: left;
            color: #666;
            font-size: 12px;
          }
        }
        .container_one_r_show {
          width: 100%;
          height: 30px;
          overflow: hidden;
          .container_one_r_name {
            float: left;
            margin-right: 10px;
            i {
              float: left;
              margin-right: 10px;
            }
            span {
              float: left;
            }
          }
          .container_one_r_phone {
            float: left;
            margin-right: 10px;
            i {
              float: left;
              margin-right: 10px;
            }
            span {
              float: left;
            }
          }
          .container_one_r_eye {
            float: left;
            i {
              float: left;
              margin-right: 10px;
            }
            span {
              float: left;
            }
          }
        }
        .container_one_r_min {
          margin-top: 16px;
          width: 100%;
          height: 100px;
          p {
            text-indent: 20px;
            line-height: 22px;
            width: 100%;
            height: 100px;
            text-align: left;
            font-size: 14px;
            color: #666;
            // display: -webkit-box;
            // -webkit-box-orient: vertical;
            // -webkit-line-clamp: 3;
            // overflow: hidden;
            // line-height: 2;
            overflow: hidden;
            overflow-y: auto;
          }
        }
      }
    }
  }
  .container_two {
    overflow: hidden;
    width: 1200px;
    margin: 70px auto;
    height: 60px;
    background: #fff;
    margin-bottom: 0;
    ul {
      width: 100%;
      height: 60px;
      margin-left: 30px;
      li {
        // float: left;
        display: inline-block;
        padding:16px 20px;
        // width: 100px;
        // height: 30px;
        border-radius: 15px;
        // margin-left: 48px;
        // margin-top: 15px;
        font-size: 16px;
        color: #333333;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
.active {
  color: #008aff !important;
  // background: #008aff;
  // border-radius: 15px;
}
</style>