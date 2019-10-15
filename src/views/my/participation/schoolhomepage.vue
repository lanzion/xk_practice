<template>
  <div class="schoolhomepage">
    <div class="imgshow">
      <img :src="imgurl" alt />
    </div>
    <div class="container">
      <div class="container_title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/participation' }">参与学校</el-breadcrumb-item>
          <el-breadcrumb-item>学校详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container_one">
        <div class="container_one_l">
          <el-image :src="datas.cover" style="width: 400px;height:240px">
            <div
              slot="error"
              class="image-slot"
              style="font-size: 30px;line-height: 240px;text-align: center;"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <div class="container_one_r">
          <div class="container_one_r_header">{{datas.schoolName}}</div>
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
              <span>{{datas.linkName}}</span>
            </div>
            <div class="container_one_r_phone">
              <i>
                <img :src="phone" alt />
              </i>
              <span>{{datas.phone}}</span>
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
          <!-- <div class="container_one_r_eye">
            <i>
              <img :src="eye" alt />
            </i>
            <span>{{datas.browseNum}}</span>
          </div> -->
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
import { participationschooldetails } from "@/api/frontstage";
import { stringify } from "querystring";
export default {
  name: "schoolhomepage",
  data() {
    return {
      datas: "",
      imgurl: require("../../../../static/img/xuexiaobeijng4.png"),
      dizhi: require("../../../../static/img/dizhi.png"),
      renhei: require("../../../../static/img/renhei.png"),
      phone: require("../../../../static/img/shouji.png"),
      eye: require("../../../../static/img/liulanhui.png"),
      arr: [
        {
          name: "首页",
          url: "/schoolfirst"
        },
        {
          name: "实践课程",
          url: "/schoolpracticecourse"
        },
        {
          name: "校园资讯",
          url: "/campusinformation"
        }
      ]
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    async getlist() {
      let uid = this.$route.query.id;
      let sid = localStorage.getItem("sid");
      let id = "";
      if (uid) {
        id = uid;
      } else {
        id = sid;
      }
      const res = await participationschooldetails({ id: id });
      this.datas = res.data.entity;
      console.log(res)
      let isfrom = {
        imgurl: this.datas.cover,
        name: this.datas.schoolName,
        address: this.datas.address,
        liaisonMan: this.datas.linkName,
        liaisonWay: this.datas.phone,
        remark: this.datas.remark,
        browseNum: this.datas.browseNum
      };
      sessionStorage.setItem("schoollist", JSON.stringify(isfrom));
    },
    changes(url) {
      let id = this.$route.query.id;
      this.$router.push({ path: url, query: { id: id } });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/  .el-breadcrumb__inner{
  color: #fff !important;
} 

.container_title{
  width: 100%;
  height: 30px;
  color:#fff; 
  /deep/ .el-breadcrumb__separator{
    color: #fff;
  }
}
.schoolhomepage {
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
    top: 125px;
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
          font-size: 22px;
          color: #333;
          height: 30px;
          line-height: 30px;
          text-align: left;
          text-indent: 5px;
          margin-bottom: 20px;
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
            margin-right: 10px;
            float: left;
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
        // .container_one_r_eye {
        //   margin-top: 30px;
        //   height: 30px;
        //   width: 100%;
        //   i {
        //     float: left;
        //     margin-right: 10px;
        //   }
        //   span {
        //     float: left;
        //     color: #ccc;
        //     font-size: 14px;
        //   }
        // }
      }
    }
  }
  .container_two {
    overflow: hidden;
    width: 1200px;
    margin: 100px auto;
    height: 60px;
    background: #fff;
    margin-bottom: 0;
    ul {
      width: 100%;
      height: 60px;
      li {
        float: left;
        width: 100px;
        height: 30px;
        border-radius: 15px;
        margin-left: 48px;
        margin-top: 15px;
        font-size: 16px;
        color: #333333;
        line-height: 30px;
        text-align: center;
      }
    }
  }
}
.active {
  color: #fff !important;
  background: #008aff;
  border-radius: 15px;
}
</style>