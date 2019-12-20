<template>
  <div class="schooldetail">
    <div>
      <ov-image :type="5" :src-data="datas.backgroundImg" :img-height="'350px'" class="ovimage">
        <span slot="spans">{{datas.schoolName}}</span>
      </ov-image>
    </div>
    <div class="header" v-if="num != 0">
      <div class="container">
        <ul class="header-ul">
          <li
            v-for="(g,index) in arr"
            :class="g.path == $route.path ? 'active' :''"
            :key="index"
            @click="go(g.path)"
          >{{g.name}}</li>
        </ul>
      </div>
    </div>
    <div class="container" v-if="num != 0">
      <router-view :datas="JSON.stringify(datas)"></router-view>
    </div>

    <div class="container" v-if="num == 0">
      <div class="brief">
        <div class="brief-one">
          <div class="brief-fl fl">
            <div class="brief-fl-title">
              <h3>{{datas.schoolName}}</h3>
              <p id="conent" v-html="datas.remark">
                <span></span>
              </p>
            </div>
          </div>
          <div class="brief-fr fr">
            <div class="brief-fr-one">
              <ul>
                <li v-if="datas.linkName !== null">
                  <i :style="{backgroundImage:'url('+plo+')'}"></i>
                  <span>{{datas.linkName}}</span>
                </li>
                <li v-if="datas.phone !== null">
                  <i :style="{backgroundImage:'url('+dianhua+')'}"></i>
                  <span>{{datas.phone}}</span>
                </li>
                <li v-if="datas.address !== null">
                  <i :style="{backgroundImage:'url('+dizhi+')'}"></i>
                  <span>
                    {{datas.address}}
                    <i
                      @click="getMap(datas.address,datas.name)"
                      :style="{backgroundImage:'url('+baiduditu+')'}"
                    ></i>
                  </span>
                </li>
                <li v-if="datas.pathUrl !== null">
                  <i :style="{backgroundImage:'url('+guanwang+')'}"></i>
                  <span>
                    <a :href="datas.pathUrl">{{datas.pathUrl}}</a>
                  </span>
                </li>
              </ul>
              <div class v-if="datas.officialAccounts !== null">
                <img :src="datas.officialAccounts" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { requestwebapischoolDetail } from "@/api/webApi/school";
import { requestwebapiLongitudeAndlatitude } from "@/api/webApi/base";
export default {
  name: "schooldetail",
  data() {
    return {
      id: "",
      datas: {},
      num: "",
      arr: [
        {
          path: "/school/schooldetail/page",
          name: "主页"
        },
        {
          path: "/school/schooldetail/brief",
          name: "学校简介"
        },
        {
          path: "/school/schooldetail/curriculum",
          name: "活动成果"
        },
        {
          path: "/school/schooldetail/bases",
          name: "实践基地/机构"
        },
        {
          path: "/school/schooldetail/feedback",
          name: "评价反馈"
        }
      ],
      value: 5,
      schoolDetail: {},
      time: require("../../../../../static/img/time.png"),
      erweima: require("../../../../../static/img/xikegongzhonghao.png"),
      huodongchengguo: require("../../../../../static/img/huodongchengguo.png"),
      gengduo: require("../../../../../static/img/gengduo.png"),
      shijianjidijigou: require("../../../../../static/img/shijianjidijigou.png"),
      plo: require("../../../../../static/img/plo.png"),
      dianhua: require("../../../../../static/img/dianhua.png"),
      dizhi: require("../../../../../static/img/dizhi.png"),
      guanwang: require("../../../../../static/img/guanwang.png"),
      baiduditu: require("../../../../../static/img/baiduditu.png")
    };
  },
  created() {
    this.num = this.$route.query.num;
    let schoolId = this.$route.query.schoolId;
    if (schoolId) {
      this.id = schoolId;
    } else {
      this.id = sessionStorage.getItem("schoolId");
    }
    this.getlists();
  },
  computed: {
  },
  methods: {
    go(path) {
      this.$router.push({
        path: path,
        query: { schoolId: this.id, num: this.num }
      });
    },
    async getlists() {
      this.isLoading = true;
      let schoolId = this.$route.query.schoolId;
      if (schoolId) {
        this.id = schoolId;
      } else {
        this.id = sessionStorage.getItem("schoolId");
      }
      const res = await requestwebapischoolDetail({ id: this.id });
      const { entity: datas = {} } = res.data;
      try {
        this.datas = datas || {};
        sessionStorage.setItem("schoolDetail", JSON.stringify(this.datas));
      } catch (error) {
        this.datas = {};
      } finally {
        this.isLoading = false;
      }
    },
    async getMap(address, name) {
      const res = await requestwebapiLongitudeAndlatitude({
        address: address
      });
      const { entity: datas = {} } = res.data;
      try {
        this.lng = datas.lng || 113.27;
        this.lat = datas.lat || 23.13;
        const { href } = this.$router.resolve({
          name: `bmap`,
          query: { lng: this.lng, lat: this.lat, name: name }
        });
        window.open(href, "_blank");
      } catch (error) {
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.header {
  background: #f8f8f8;
  height: 60px;
  margin-bottom: 46px;
  .header-ul {
    width: 100%;
    height: 100%;
    overflow: hidden;
    li {
      float: left;
      width: 200px;
      height: 58px;
      line-height: 58px;
      text-align: center;
      margin-right: 40px;
      cursor: pointer;
      font-size: 16px;
      letter-spacing: 0px;
      color: #262626;
    }
    .active {
      border-bottom: 2px solid #008aff;
      color: #008aff;
    }
  }
}
.container {
  margin: 0 auto;
  .el-breadcrumb {
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 14px;
    color: #666666;
    line-height: 38px;
  }
}
.brief {
  overflow: hidden;
  margin-top: 20px;
  .brief-one {
    overflow: hidden;
    .brief-fl {
      width: 862px;
      height: auto;
      .brief-fl-title {
        h3 {
          width: 100%;
          font-size: 26px;
          line-height: 31px;
          letter-spacing: 0px;
          color: #262626;
          margin-bottom: 46px;
        }
        p {
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 29px;
          letter-spacing: 0px;
          color: #333333;
          position: relative;
          overflow: hidden;
        }
        h4 {
          font-size: 16px;
          line-height: 29px;
          letter-spacing: 1px;
          color: #008aff;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .brief-fr {
      width: 300px;
      .brief-fr-one {
        margin-bottom: 66px;
        ul {
          li {
            margin-top: 17px;
            i {
              display: inline-block;
              height: 16px;
              width: 16px;
              background-size: 16px;
              vertical-align: top;
              margin-right: 10px;
            }
            span {
              width: 256px;
              display: inline-block;
              vertical-align: top;
              font-size: 16px;
              a {
                color: #008aff;
              }
              i {
                margin-left: 5px;
                cursor: pointer;
              }
            }
          }
        }
        div {
          text-align: center;
          margin-top: 20px;
          img {
            width: 120px;
            height: 120px;
          }
        }
      }
      .brief-fr-two {
        .brief-fr-two-header {
          border-bottom: 1px solid #eee;
          height: 34px;
          span,
          i {
            display: inline-block;
          }
          .brief-fr-two-header-one {
            font-size: 18px;
            line-height: 31px;
            letter-spacing: 0px;
            color: #333333;
          }
          .brief-fr-two-header-two {
            font-size: 14px;
            letter-spacing: 0px;
            color: #666666;
          }
          .brief-fr-two-header-thr {
            font-size: 14px;
            line-height: 29px;
            letter-spacing: 0px;
            color: #666666;
            float: right;
            cursor: pointer;
          }
          .brief-fr-two-header-min {
          }
          .brief-fr-two-header-max {
            float: right;
            cursor: pointer;
          }
        }
        .brief-fr-two-ul {
          padding: 0 10px;
          box-sizing: border-box;
          overflow: hidden;
          .brief-fr-two-ul-li {
            width: 100%;
            font-size: 16px;
            line-height: 33px;
            letter-spacing: 1px;
            color: #666666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            &:hover {
              color: #008aff;
            }
          }
        }
      }
    }
  }
  .brief-fl-coure {
    .brief-fl-coure-header {
      border-bottom: 1px solid #eee;
      height: 34px;
      margin-bottom: 18px;
      span,
      i {
        display: inline-block;
      }
      .brief-fl-coure-header-one {
        font-size: 22px;
        line-height: 31px;
        letter-spacing: 0px;
        color: #333333;
      }
      .brief-fl-coure-header-two {
        font-size: 16px;
        letter-spacing: 0px;
        color: #666666;
      }
      .brief-fl-coure-header-thr {
        font-size: 16px;
        line-height: 29px;
        letter-spacing: 0px;
        color: #666666;
        float: right;
        cursor: pointer;
      }
      .brief-fl-coure-header-min {
      }
      .brief-fl-coure-header-max {
        float: right;
        cursor: pointer;
      }
    }
    .brief-fl-coure-ul {
      overflow: hidden;
      li {
        width: 560px;
        height: 168px;
        float: left;
        margin-bottom: 36px;
        cursor: pointer;
        &:nth-child(2n-1) {
          margin-right: 80px;
        }
        &:hover {
          .brief-fl-coure-ul-connet {
            box-shadow: 0px 2px 2px 0px rgba(6, 0, 51, 0.19);
            border-radius: 4px 4px 0px 0px;
            opacity: 0.9;
          }
          // box-shadow: 0px 2px 2px 0px rgba(6, 0, 51, 0.19);
        }
        .brief-fl-coure-ul-img {
          float: left;
          width: 270px;
        }
        .brief-fl-coure-ul-connet {
          float: left;
          width: 270px;
          padding-left: 18px;
          box-sizing: border-box;
          h3 {
            margin-bottom: 18px;
            font-size: 16px;
            line-height: 24px;
            letter-spacing: 0px;
            color: #262626;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          p {
            font-size: 14px;
            line-height: 25.5px;
            letter-spacing: 0px;
            color: #666666;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
          }
        }
      }
    }
  }
  .brief-fl-evaluate {
    margin-bottom: 90px;
    margin-top: 28px;
    .brief-fl-evaluate-header {
      border-bottom: 1px solid #eee;
      height: 34px;
      margin-bottom: 18px;
      span,
      i {
        display: inline-block;
      }
      .brief-fl-evaluate-header-one {
        font-size: 22px;
        line-height: 31px;
        letter-spacing: 0px;
        color: #333333;
      }
      .brief-fl-evaluate-header-two {
        font-size: 16px;
        letter-spacing: 0px;
        color: #666666;
      }
      .brief-fl-evaluate-header-thr {
        font-size: 16px;
        line-height: 29px;
        letter-spacing: 0px;
        color: #666666;
        float: right;
        cursor: pointer;
      }
      .brief-fl-evaluate-header-min {
      }
      .brief-fl-evaluate-header-max {
        float: right;
        cursor: pointer;
      }
    }
    .brief-fl-evaluate-ul {
      overflow: hidden;
      li {
        width: 380px;
        height: 388px;
        border: 1px solid #eeeeee;
        box-sizing: border-box;
        float: left;
        margin-right: 30px;
        &:nth-last-child(1) {
          margin-right: 0px;
        }
        h3 {
          height: 34px;
          font-size: 16px;
          line-height: 34px;
          letter-spacing: 2.3px;
          color: #262626;
          padding: 0 10px;
          box-sizing: border-box;
          margin-bottom: 10px;
        }
        h4 {
          height: 24px;
          font-size: 14px;
          line-height: 24px;
          letter-spacing: 2px;
          color: #666666;
          padding: 0 10px;
          box-sizing: border-box;
          margin-bottom: 6px;
        }
        ul {
          li {
            height: 22px;
            font-size: 14px;
            line-height: 22px;
            letter-spacing: 1.4px;
            color: #008aff;
            padding: 0 10px;
            box-sizing: border-box;
            border: none;
            margin-bottom: 4px;
          }
        }
      }
    }
  }
}
.ovimage {
  position: relative;
  span {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    line-height: 315px;
    text-align: center;
    font-size: 40px;
    color: #fff;
    font-weight: 800;
    letter-spacing: 9px;
  }
}
</style>
