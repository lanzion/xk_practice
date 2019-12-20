<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/activity' }">活动中心</el-breadcrumb-item>
      <el-breadcrumb-item>活动报名</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="nimi">
      <div class="g-search--wrap clearfix">
        <el-form :inline="true" class="el-form-l fl" @submit.native.prevent>
          <el-form-item>
            <el-select v-model="isCompulsory" placeholder="请选择学段" @change="resetPage" clearable>
              <el-option v-for="item in fit" :key="item.code" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="isactivityStatus" placeholder="活动状态" @change="resetPage" clearable>
              <el-option
                v-for="item in activityStatus"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="Free" placeholder="是否收费" @change="resetPage" clearable>
              <el-option
                v-for="item in isFree"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form :inline="true" class="fr" @submit.native.prevent>
          <el-form-item class="activityregistrationname">
            <el-input
              class="el-input-l"
              v-model="name"
              placeholder="请输入基地/机构或活动关键字"
              @keyup.native.enter="resetPage"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetPage">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="activityregistration">
      <ul class="activityregistration-ul">
        <li class="activityregistration-li" v-for="(g,index) in datas" :key="index">
          <div class="activityregistration-li-img fl" @click="go(g.id ,g.baseinfoId)">
            <ov-image :type="1" :src-data="g.cover" :img-height="'222px'"></ov-image>
          </div>
          <div class="activityregistration-li-conent fl">
            <h3
              :style="{'-webkit-box-orient':'vertical'}"
              @click="go(g.id , g.baseinfoId)"
            >{{g.name}}</h3>
            <div class="activityregistration-li-conent-box">
              <span>基地名称:</span>
              <span>{{g.baseinfoName}}</span>
            </div>
            <div class="activityregistration-li-conent-box">
              <span>活动地点:</span>
              <span>{{g.address}}</span>
              <span
                @click="getMap(g.address,g.baseinfoName)"
                :style="{backgroundImage:'url('+bmap+')'}"
                class="dizhi"
              ></span>
            </div>
            <div class="activityregistration-li-conent-box">
              <span>活动类型:</span>
              <span>{{g.typeParentName}}</span>
            </div>
            <div class="activityregistration-li-conent-box">
              <span>适合学段:</span>
              <span>{{g.fitSectionName}}</span>
            </div>
            <div class="activityregistration-li-conent-box">
              <span>活动时间:</span>
              <span>{{g.dates[0].activityStartDate}}-{{g.dates[0].activityEndDate}}</span>
              <span class="moretime">共{{g.dates.length}}场</span>
            </div>
            <div class="activityregistration-li-conent-box last">
              <span v-if="g.free === 1" class="nofier">￥{{g.price}}</span>
              <span v-else-if="g.free === 0" class="fier">{{g.freeName}}</span>
            </div>
          </div>
          <div class="activityregistration-li-show fr">
            <div class="activityregistration-li-show-box">
              <span>{{g.contactName}}</span>
              <span>联系人:</span>
            </div>
            <div class="activityregistration-li-show-box">
              <span>{{g.contactPhone}}</span>
              <span>联系电话:</span>
            </div>
            <div class="activityregistration-li-show-box">
              <span>{{g.enrollMaxNum}}人/场</span>
              <span>人数限制:</span>
            </div>
            <div class="activityregistration-li-show-box">
              <div v-if="g.activityStatus === 4" class="activityregistration-li-show-box-one">
                <div class="fl">
                  <span>{{g.enrollStartDate.slice(0,10)}}</span>
                  <span>{{g.enrollStartDate.slice(10,16)}}</span>
                </div>
                <div class="fl">{{g.activityStatusName}}</div>
              </div>
              <div v-else-if="g.activityStatus === 5" class="activityregistration-li-show-box">
                <div class="activityregistration-li-show-box-two">{{g.activityStatusName}}</div>
              </div>
              <div v-else-if="g.activityStatus === 6" class="activityregistration-li-show-box">
                <div class="activityregistration-li-show-box-thr">{{g.activityStatusName}}</div>
              </div>
              <div v-else-if="g.activityStatus === 7" class="activityregistration-li-show-box">
                <div class="activityregistration-li-show-box-thr" disabled>{{g.activityStatusName}}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <infinite-loading @infinite="getlists" ref="infiniteLoading">
        <span slot="spinner">正在加载中...</span>
        <span slot="no-more">没有更多数据了...</span>
        <span slot="no-results">暂无数据...</span>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
import {
  requestwebapiactivityregistration,
  requestwebapiLongitudeAndlatitude
} from "@/api/webApi/base";
import { requestwebapiListofactivities } from "@/api/webApi/activity";
import {
  fit,
  courseType,
  Courselevel,
  activityStatus,
  isFree
} from "@/utils/utility/dict.js";
export default {
  name: "",
  data() {
    return {
      municipal: "",
      fit: fit,
      values: "",
      courseType: courseType,
      Courselevel: Courselevel,
      activityStatus: activityStatus,
      isFree: isFree,
      Free: "",
      isactivityStatus: "",
      isCompulsory: "",
      isCoursetype: "",
      isCourselevel: "",
      name: "",
      options: [],
      pages: {
        pageSize: 10,
        pageNum: 1
      },
      value: 5.0,
      bmap: "../../../../static/img/baiduditu.png",
      centerDialogVisible: false,
      datas: [],
      arr: [],
      departmentOptions: [],
      cascaderData: [],
      selectedOptions: [],
      pcode: [],
      lng: "",
      lat: ""
    };
  },
  created() {
    // this.getlists();
  },
  methods: {
    async getlists($state) {
      let form = {
        fitSection: this.isCompulsory,
        activityStatus: this.isactivityStatus,
        free: this.Free,
        binstOrActName: this.name
      };
      const res = await requestwebapiListofactivities(form, this.pages);
      const { entity: datas = {} } = res.data;
      try {
        this.datas = datas.resultData || [];
        this.totalNum = datas.totalNum || 0;
        if (this.datas.length) {
          $state.loaded();
          if (this.datas.length / 5 === 10) {
            $state.complete();
          }
          if (this.datas.length < this.pages.pageSize) {
            $state.complete();
          }
          this.pages.pageSize += 10;
        } else {
          $state.complete();
        }
      } catch (error) {
        this.datas = [];
      } finally {
        this.isLoading = false;
      }
    },
    resetPage() {
      this.datas = [];
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit("$InfiniteLoading:reset");
      });
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
    },
    go(id,baseinfoId) {
      sessionStorage.setItem("activityregistrationId", id);
      this.$router.push({
        path: "/activity/activityregistration/activityregistrationdetail",
        query: { activityregistrationId: id,baseinfoId:baseinfoId }
      });
    },
    numFilter(value) {
      let realVal = parseFloat(value).toFixed(1);
      return realVal;
    }
  }
};
</script>
<style lang='scss' scoped>
.container {
  margin: 0 auto;
  .el-breadcrumb {
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 14px;
    color: #666666;
    line-height: 38px;
  }
  .activityregistration {
    min-height: 500px;
    .activityregistration-ul {
      margin-bottom: 30px;
      .activityregistration-li {
        width: 100%;
        height: 284px;
        padding: 28px 0 36px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        cursor: pointer;
        .activityregistration-li-img {
          width: 360px;
          height: 222px;
          margin-right: 28px;
        }
        .activityregistration-li-conent {
          width: 582px;
          height: 222px;
          h3 {
            margin-bottom: 28px;
            font-size: 22px;
            line-height: 28px;
            letter-spacing: 0px;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .activityregistration-li-conent-box {
            // height: 34px;
            width: 100%;
            overflow: hidden;
            span {
              letter-spacing: 0px;
              line-height: 26px;
              display: block;
              float: left;
              font-size: 16px;
              margin-right: 6px;
              &:nth-child(1) {
                color: #666666;
              }
              &:nth-child(2) {
                max-width: 480px;
                color: #262626;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              i {
                display: inline-block;
                height: 15px;
                min-width: 30px;
                line-height: 15px;
                text-align: center;
                background: #008aff;
                color: #fff;
              }
            }
            .nofier {
              font-size: 22px;
              letter-spacing: 0px;
              color: #ff0101 !important;
            }
            .fier {
              font-size: 22px;
              letter-spacing: 0px;
              color: #4aa76f !important;
            }
            .moretime {
              padding: 0 5px;
              background-color: #f2660f;
              font-size: 12px;
              font-weight: normal;
              font-stretch: normal;
              letter-spacing: 1.2px;
              color: #ffffff;
            }
            .dizhi {
              width: 16px;
              height: 26px;
              background-size: 16px;
              background-repeat: no-repeat;
              background-position: center;
            }
            .activityregistration-li-conent-rate {
              float: right;
            }
            .activityregistration-li-conent-box-span {
              color: #008aff !important;
            }
          }
          .last {
            margin-top: 12px;
          }
        }
        .activityregistration-li-show {
          padding-top: 92px;
          .activityregistration-li-show-box {
            width: 100%;
            overflow: hidden;
            span {
              display: block;
              float: right;
              font-size: 16px;
              line-height: 26px;
              &:nth-child(1) {
                color: #262626;
                margin-left: 6px;
              }
              &:nth-child(2) {
                color: #666666;
              }
            }
            .activityregistration-li-show-box-one {
              width: 180px;
              height: 40px;
              padding: 8px 10px;
              box-sizing: border-box;
              background-color: #42a6fe;
              margin-top: 12px;
              border-radius: 4px;
              div {
                &:nth-child(1) {
                  width: 68px;
                  height: 24px;
                  margin-right: 10px;
                  span {
                    display: block;
                    width: 100%;
                    text-align: right;
                    font-size: 12px;
                    letter-spacing: 0px;
                    color: #ffffff;
                    &:nth-child(1) {
                      line-height: 0;
                    }
                    &:nth-child(1) {
                      line-height: 10px;
                    }
                  }
                }
                &:nth-child(2) {
                  width: 80px;
                  text-align: center;
                  font-size: 18px;
                  letter-spacing: 0px;
                  color: #ffffff;
                  line-height: 22px;
                }
              }
            }
            .activityregistration-li-show-box-two {
              width: 180px;
              height: 40px;
              background-color: #f26565;
              margin-top: 12px;
              border-radius: 4px;
              text-align: center;
              line-height: 40px;
              font-size: 18px;
              letter-spacing: 0px;
              color: #ffffff;
            }
            .activityregistration-li-show-box-thr {
              width: 180px;
              height: 40px;
              background-color: #cccccc;
              margin-top: 12px;
              border-radius: 4px;
              text-align: center;
              line-height: 40px;
              font-size: 18px;
              letter-spacing: 0px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
.el-form-l {
  .el-form-item {
    width: 138px;
    height: 32px;
  }
}
.activityregistrationname {
  width: 230px;
  /deep/.el-form-item {
    width: 230px;
    height: 32px;
    .el-input-l {
      width: 230px;
    }
  }
}
</style>
