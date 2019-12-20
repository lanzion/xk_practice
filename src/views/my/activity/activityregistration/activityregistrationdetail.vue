<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/activity' }">活动中心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/activity/activityregistration' }">活动报名</el-breadcrumb-item>
      <el-breadcrumb-item>{{datas.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="activityregistrationdetail-title">
      <div class="activityregistrationdetail-title-img fl">
        <ov-image :type="3" :src-data="'132'" :img-height="'332px'"></ov-image>
      </div>
      <div class="activityregistrationdetail-title-conent fl">
        <h3>{{cutString(datas.name,100)}}</h3>
        <div class="activityregistrationdetail-title-conent-over">
          <div class="activityregistrationdetail-title-conent-over-one fl">
            <el-row>
              <el-col class="dlest-fr-title">
                <span>活动类型:</span>
                <span>{{datas.typeParentName}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="dlest-fr-title">
                <span>基地名称:</span>
                <span>{{datas.baseinfoName}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="dlest-fr-title">
                <span>活动地点:</span>
                <span>{{datas.address}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="dlest-fr-title">
                <span>集合地点:</span>
                <span>{{datas.place}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="dlest-fr-title">
                <span>适合学段:</span>
                <span>{{datas.fitSectionName}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="dlest-fr-title">
                <span>联系方式:</span>
                <span>{{datas.contactName}} {{datas.contactPhone}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="dlest-fr-title">
                <span>报名截止时间</span>
                <span>{{datas.enrollEndDate}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="dlest-fr-title">
                <span>活动时间</span>
                <span>{{startTime}}-{{endTime}}</span>
                <span @mouseenter="getistrue" @mouseleave="setistrue">【展开】</span>
                <span>共{{timeArr.length}}场</span>
                <ul class="dlest-fr-title-ul">
                  <li class="dlest-fr-title-li" v-for="(g,index) in timeArr.slice(1)" :key="index">
                    <span>{{g.activityStartDate.slice(0,16)}}-{{g.activityEndDate.slice(0,16)}}</span>
                  </li>
                </ul>
              </el-col>
            </el-row>
          </div>
          <div class="activityregistrationdetail-title-conent-over-thr fl" @click="shoucang()">
            <i
              :style="{backgroundImage: isCollection === 0?'url('+shoucanghui+')':'url('+imshoucanghanggs+')'}"
            ></i>
            <span>收藏</span>
          </div>
          <div
            class="activityregistrationdetail-title-conent-over-two-a fl"
            v-if="datas.activityStatus === 4"
          >
            <div>
              <span v-if="datas.free === 0" :style="{color:'#4aa76f'}">免费</span>
              <span v-else-if="datas.free === 1" :style="{color:'#f26565'}">￥{{datas.price}}</span>
              <span>
                限
                <i>{{datas.enrollMaxNum}}</i>人
              </span>
            </div>
            <div>
              <span>
                <i>{{datas.enrollStartDate.slice(0,10)}}</i>
                <em>{{datas.enrollStartDate.slice(10,16)}}</em>
              </span>
              <span>即将开放报名</span>
            </div>
          </div>

          <div
            class="activityregistrationdetail-title-conent-over-two-b fl"
            @click="get()"
            v-else-if="datas.activityStatus === 5"
          >
            <div>
              <span v-if="datas.free === 0" :style="{color:'#4aa76f'}">免费</span>
              <span v-else-if="datas.free === 1" :style="{color:'#f26565'}">￥{{datas.price}}</span>
              <span>
                <i>
                  已报
                  <em>{{datas.curEnrollNum}}</em>人
                </i>
                <i>
                  限
                  <em>{{datas.enrollMaxNum}}</em>人
                </i>
              </span>
            </div>
            <div>
              <span>马上报名</span>
            </div>
          </div>

          <div
            class="activityregistrationdetail-title-conent-over-two-c fl"
            v-else-if="datas.activityStatus === 6"
          >
            <div>
              <span v-if="datas.free === 0" :style="{color:'#4aa76f'}">免费</span>
              <span v-else-if="datas.free === 1" :style="{color:'#f26565'}">￥{{datas.price}}</span>
              <span>
                <i>
                  已报
                  <em>{{datas.curEnrollNum}}</em>人
                </i>
                <i>
                  限
                  <em>{{datas.enrollMaxNum}}</em>人
                </i>
              </span>
            </div>
            <div>
              <span>名额已满</span>
            </div>
          </div>

          <div
            class="activityregistrationdetail-title-conent-over-two-c fl"
            v-else-if="datas.activityStatus === 7"
          >
            <div>
              <span v-if="datas.free === 0" :style="{color:'#4aa76f'}">免费</span>
              <span v-else-if="datas.free === 1" :style="{color:'#f26565'}">￥{{datas.price}}</span>
              <span>
                <i>
                  已报
                  <em>{{datas.curEnrollNum}}</em>人
                </i>
                <i>
                  限
                  <em>{{datas.enrollMaxNum}}</em>人
                </i>
              </span>
            </div>
            <div>
              <span>报名截止</span>
            </div>
          </div>
          <el-dialog title :visible.sync="centerDialogVisible" width="40%" center>
            <div class="activityregistrationdetail-title-conent-over-two-dialog">
              <div class="activityregistrationdetail-title-conent-over-two-dialog-one">
                <h4>请确认您的个人信息:</h4>
                <el-row>
                  <el-col class="dlest-fr-title">
                    <span>姓名:</span>
                    <span>{{registrationDetail.studentName}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col class="dlest-fr-title">
                    <span>学号:</span>
                    <span>{{registrationDetail.studentCode}}</span>
                  </el-col>
                </el-row>
              </div>
              <div class="activityregistrationdetail-title-conent-over-two-dialog-two">
                <h4>请选择活动场次:</h4>

                <el-radio-group v-model="radio">
                  <el-radio
                    v-for="(f,index) in registrationDetail.dates"
                    :key="index"
                    :style="{display:'block',marginBottom:'10px'}"
                    :label="f.id"
                  >{{f.children}}(剩余{{f.leftNum}}人)</el-radio>
                </el-radio-group>
              </div>
            </div>
            <h4>活动开始前1小时至活动结束前可进行签到。</h4>
            <h4>签到后请确认活动状态为已签到，一次失信未签到将会被拉入黑名单。</h4>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">关闭</el-button>
              <el-button type="primary" @click="applyactiviey()">确认报名</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
    <div class="activityregistrationdetail-center">
      <div class="activityregistrationdetail-center-fl fl">
        <div class="activityregistrationdetail-center-one">
          <div class="activityregistrationdetail-center-one-title">
            <i :style="{backgroundImage:'url('+huodongxiangqing+')'}"></i>
            <span>活动详情</span>
          </div>
          <div class="activityregistrationdetail-center-one-conent">
            <p>{{datas.detail}}</p>
          </div>
        </div>
        <div class="activityregistrationdetail-center-two">
          <div class="activityregistrationdetail-center-two-title">
            <i :style="{backgroundImage:'url('+pingjiaganwu+')'}"></i>
            <span>评价感悟</span>
          </div>
          <ul v-if="goods.length">
            <li v-for="(g,index) in goods" :key="index">
              <div class="activityregistrationdetail-center-two-conent">
                <div class="activityregistrationdetail-center-two-conent-img fl">
                  <ov-image :src-data="g.face" :type="10" :img-height="'50px'"></ov-image>
                </div>
                <div class="activityregistrationdetail-center-two-conent-show fr">
                  <div class="activityregistrationdetail-center-two-conent-show-one">
                    <span>{{g.name}}</span>
                    <span>{{g.gmtCreate}}</span>
                    <span>
                      <el-rate
                        v-model="g.score"
                        disabled
                        :colors="['#ff7800', '#ff7800', '#ff7800']"
                        show-score
                        text-color="#666666"
                        score-template="{value}分"
                      ></el-rate>
                    </span>
                  </div>
                  <div class="activityregistrationdetail-center-two-conent-show-two">
                    <p>{{g.comment}}</p>
                  </div>
                  <div class="activityregistrationdetail-center-two-conent-show-thr">
                    <ul>
                      <li v-for="(t,index) in g.resources" :key="index">
                        <img :src="t.resourceUrl" alt />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div v-if="!goods.length" :style="{marginTop:'10px'}">暂无评价感悟...</div>
        </div>
      </div>
      <div class="activityregistrationdetail-center-fr fr">
        <div class="activityregistrationdetail-center-fr-one">
          <div class="activityregistrationdetail-center-fr-one-title">
            <span>
              已报名
              <i v-if="poparr.length">({{poparr.length}}人)</i>
            </span>
          </div>
          <div v-if="poparr.length" class="activityregistrationdetail-center-fr-one-conent">
            <ul>
              <li v-for="(g,index) in poparr" :key="index">
                <ov-image :src-data="g.face" :type="10" :img-height="'68px'"></ov-image>
              </li>
            </ul>
          </div>
          <div v-if="!poparr.length" :style="{marginTop:'10px'}">暂无报名人员...</div>
        </div>
        <div class="activityregistrationdetail-center-fr-two">
          <div class="activityregistrationdetail-center-fr-two-title">
            <span>活动推荐</span>
          </div>
          <div class="activityregistrationdetail-center-fr-two-conent">
            <ul>
              <li v-for="(g,index) in arrRecommende" :key="index">
                <div class="activityregistrationdetail-center-fr-two-conent-img">
                  <ov-image :src-data="g.cover" :type="3" :img-height="'170px'"></ov-image>
                </div>
                <h3>{{g.name}}</h3>
                <p>{{g.baseinfoName}}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  requestwebapiListofactivitiesDetail,
  requestwebapiCollectionactivities,
  requestwebapiEvaluation,
  requestwebapiregistration,
  requestwebapiRecommendedactivities,
  requestwebapiapply,
  requestwebapiApplyactiviey
} from "@/api/webApi/activity";
export default {
  name: "activityregistrationdetail",
  data() {
    return {
      shoucanghui: require("../../../../../static/img/shoucanghui.png"),
      imshoucanghanggs: require("../../../../../static/img/shoucanghang.png"),
      huodongxiangqing: require("../../../../../static/img/huodongxiangqing.png"),
      pingjiaganwu: require("../../../../../static/img/pingjiaganwu.png"),
      scoreAvg: 5,
      isNum: 2,
      centerDialogVisible: false,
      checkedCities: [],
      radio: "",
      datas: {},
      id: "",
      isCollection: "",
      goods: [],
      poparr: [],
      timeArr: [],
      startTime: "",
      endTime: "",
      arrRecommende: [],
      identity: "",
      baseinfoId: "",
      registrationDetail: ""
    };
  },
  computed: {},
  created() {
    let activityregistrationId = this.$route.query.activityregistrationId;
    this.baseinfoId = this.$route.query.baseinfoId || "";
    if (activityregistrationId) {
      this.id = activityregistrationId;
    } else {
      this.id = sessionStorage.getItem("activityregistrationId");
    }
    this.userId = localStorage.getItem("xk_practice_uid") || "";
    let userInfo = localStorage.getItem("xk_practice_userInfo") || {};
    this.identity = userInfo.identity;
    this.getlists();
    this.getEvaluation();
    this.getregistration();
    this.getRecommende();
  },
  methods: {
    // 活动详情
    async getlists() {
      const res = await requestwebapiListofactivitiesDetail({
        activityId: this.id
      });
      const { entity: datas = {} } = res.data;
      try {
        this.datas = datas || {};
        this.timeArr = datas.dates || [];
        this.startTime = this.timeArr[0].activityStartDate.slice(0, 16);
        this.endTime = this.timeArr[0].activityEndDate.slice(0, 16);
        this.isCollection = datas.collectStatus;
      } catch (error) {
        this.datas = {};
      } finally {
        this.isLoading = false;
      }
    },
    // 评价感悟
    async getEvaluation() {
      const res = await requestwebapiEvaluation({
        activityId: this.id,
        evalType: 2
      });
      const { entity: datas = {} } = res.data;
      try {
        this.goods = datas.resultData || [];
      } catch (error) {
        this.goods = [];
      } finally {
        this.isLoading = false;
      }
    },
    // 活动报名人员列表
    async getregistration() {
      const res = await requestwebapiregistration({
        activityId: this.id
      });
      const { appendInfo: datas = {} } = res.data;
      try {
        this.poparr = datas.list || [];
      } catch (error) {
        this.poparr = [];
      } finally {
        this.isLoading = false;
      }
    },
    //开放式活动推荐列表
    async getRecommende() {
      const res = await requestwebapiRecommendedactivities({
        activityId: this.id,
        baseinfoId: this.baseinfoId
      });
      const { appendInfo: datas = {} } = res.data;
      try {
        this.arrRecommende = datas.otherActivities || [];
      } catch (error) {
        this.arrRecommende = [];
      } finally {
      }
    },
    // 活动收藏
    async shoucang() {
      const res = await requestwebapiCollectionactivities({
        activityId: this.id
      });
      const { entity: datas = {} } = res.data;
      try {
        if (datas === true) {
          this.getlists();
          if (this.isCollection === 0) {
            this.$alert("您已成功加入收藏,请到个人中心查看", "提示", {
              confirmButtonText: "确定"
            });
          } else {
            this.$alert("您已取消收藏", "提示", {
              confirmButtonText: "确定"
            });
          }
        } else {
        }
      } catch (error) {
        this.datas = {};
      } finally {
        this.isLoading = false;
      }
    },
    change(value) {
      // eslint-disable-next-line no-undef
      $(".dlest-fr-title-ul").css({ display: "none" });
    },
    getistrue() {
      let num = document.getElementsByClassName("dlest-fr-title-li").length;
      // eslint-disable-next-line no-undef
      $(".dlest-fr-title-ul")
        .css({ display: "block" })
        .stop()
        .animate({ height: num * 30 + "px" }, 400);
    },
    setistrue() {
      // eslint-disable-next-line no-undef
      $(".dlest-fr-title-ul")
        .stop()
        .animate({ height: "0px" }, 400);
    },
    // 点击报名详情
    async get() {
      if (this.userId) {
        const res = await requestwebapiapply({
          activityId: this.id
        });
        const { entity: datas = {} } = res.data;
        try {
          if (res.data.code == 200) {
            this.centerDialogVisible = true;
            this.registrationDetail = datas;
            this.registrationDetail.dates.forEach(x => {
              let start = x.activityStartDate.slice(0, 10);
              let end = x.activityEndDate.slice(0, 10);
              let ends = x.activityEndDate.slice(10, 16);
              let time = "";
              if (start == end) {
                time = x.activityStartDate.slice(0, 16) + "-" + ends;
              } else {
                time =
                  x.activityStartDate.slice(0, 16) +
                  "-" +
                  x.activityEndDate.slice(0, 16);
              }
              this.$set(x, "children", time);
            });
          } else {
            this.$message({
              message: res.data.msg,
              center: true
            });
          }
        } catch (error) {
        } finally {
          this.isLoading = false;
        }
      } else {
        this.$confirm("请先登录后再点击报名, 是否立即登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
          .then(() => {
            this.$router.push({ path: "/login" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消登录"
            });
          });
      }
    },
    // 活动报名
    async applyactiviey() {
      if (this.radio) {
        const res = await requestwebapiApplyactiviey({
          activityId: this.id,
          activityDateId: this.radio
        });
        try {
          if (res.data.code == 200) {
            this.$alert("恭喜，报名成功！", "提示", {
              confirmButtonText: "确定"
            });
          } else {
            this.$alert(res.data.msg, "提示", {
              confirmButtonText: "确定"
            });
          }
          this.centerDialogVisible = false;
        } catch (error) {
        } finally {
          this.isLoading = false;
        }
      }else{
          this.$message({
          message: '请选择活动场次',
          center: true
        });
      }
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
  .activityregistrationdetail-title {
    width: 100%;
    height: 340px;
    margin-bottom: 56px;
    .activityregistrationdetail-title-img {
      width: 538px;
      margin-right: 25px;
    }
    .activityregistrationdetail-title-conent {
      width: 616px;
      h3 {
        font-size: 22px;
        line-height: 29.5px;
        letter-spacing: 0px;
        color: #333333;
        overflow: hidden;
        margin-bottom: 38px;
      }
      .activityregistrationdetail-title-conent-over {
        width: 100%;
        .activityregistrationdetail-title-conent-over-one {
          width: 448px;
          .dlest-fr-title {
            height: 30px;
            position: relative;
            span {
              font-size: 15px;
              &:nth-child(1) {
                color: #666666;
                margin-right: 5px;
              }
              &:nth-child(2) {
                color: #262626;
              }
              &:nth-child(3) {
                color: #008aff;
                cursor: pointer;
              }
              &:nth-child(4) {
                display: inline-block;
                background: #f2660f;
                font-size: 12px;
                letter-spacing: 1.2px;
                color: #ffffff;
              }
            }
            .dlest-fr-title-ul {
              position: absolute;
              height: 0px;
              top: 26px;
              left: 67px;
              background: #f8f8f8;
              overflow: hidden;
              padding: 0 6px;
              box-sizing: border-box;
              li {
                // margin-bottom: 15px;
                font-size: 12px;
                height: 30px;
                line-height: 30px;
              }
            }
          }
        }
        .activityregistrationdetail-title-conent-over-two-a {
          border: solid 1px #42a6fe;
          border-radius: 4px;
          div {
            width: 166px;
            height: 84px;
            &:nth-child(1) {
              width: 166px;
              height: 42px;
              border-bottom: none;
              span {
                display: inline-block;
                text-align: center;
                line-height: 42px;
                width: 80px;
                &:nth-child(1) {
                  font-size: 16px;
                  letter-spacing: 0px;
                  color: #4aa76f;
                  position: relative;
                  &::after {
                    content: "|";
                    color: #42a6fe;
                    position: absolute;
                    right: 0;
                  }
                }
                &:nth-child(2) {
                  font-size: 14px;
                  letter-spacing: 0px;
                  color: #666666;
                  i {
                    color: #ff0000;
                  }
                }
              }
            }
            &:nth-child(2) {
              width: 166px;
              height: 42px;
              border-top: none;
              background-color: #42a6fe;
              span {
                width: 78px;
                height: 40px;
                line-height: 40px;
                box-sizing: border-box;
                text-align: center;
                float: left;
                &:nth-child(1) {
                  i,
                  em {
                    display: block;
                    font-size: 12px;
                    line-height: 16px;
                    letter-spacing: 0px;
                    color: #ffffff;
                    text-align: right;
                    margin-top: 5px;
                    margin-right: 2px;
                  }
                  em {
                    display: block;
                    text-align: right;
                    margin-top: 2px;
                  }
                }
                &:nth-child(2) {
                  font-size: 18px;
                  letter-spacing: 0px;
                  color: #ffffff;
                  margin-left: 5px;
                }
              }
            }
          }
        }
        .activityregistrationdetail-title-conent-over-two-b {
          border: solid 1px #f26565;
          border-radius: 4px;
          div {
            width: 166px;
            &:nth-child(1) {
              width: 166px;
              height: 42px;
              span {
                display: block;
                float: left;
                text-align: center;
                line-height: 42px;
                width: 82px;
                &:nth-child(1) {
                  width: 80px;
                  font-size: 16px;
                  letter-spacing: 0px;
                  color: #ff0101;
                  position: relative;
                  &::after {
                    content: "|";
                    color: #f26565;
                    position: absolute;
                    right: 0;
                  }
                }
                &:nth-child(2) {
                  width: 80px;
                  font-size: 12px;
                  letter-spacing: 0px;
                  i {
                    display: block;
                    color: #666666;
                    height: 20px;
                    line-height: 20px;
                    em {
                      color: #ff0000;
                    }
                  }
                }
              }
            }
            &:nth-child(2) {
              width: 166px;
              height: 42px;
              border-top: none;
              background-color: #f26565;
              text-align: center;
              cursor: pointer;
              span {
                width: 78px;
                font-size: 18px;
                height: 40px;
                line-height: 40px;
                box-sizing: border-box;
                text-align: center;
                color: #fff;
              }
            }
          }
        }
        .activityregistrationdetail-title-conent-over-two-c {
          border: solid 1px #cccccc;
          border-radius: 4px;
          div {
            width: 166px;
            &:nth-child(1) {
              width: 166px;
              height: 42px;
              span {
                display: block;
                float: left;
                text-align: center;
                line-height: 42px;
                width: 82px;
                &:nth-child(1) {
                  width: 80px;
                  font-size: 16px;
                  letter-spacing: 0px;
                  color: #ff0101;
                  position: relative;
                  &::after {
                    content: "|";
                    color: #f26565;
                    position: absolute;
                    right: 0;
                  }
                }
                &:nth-child(2) {
                  width: 80px;
                  font-size: 12px;
                  letter-spacing: 0px;
                  i {
                    display: block;
                    color: #666666;
                    height: 20px;
                    line-height: 20px;
                    em {
                      color: #ff0000;
                    }
                  }
                }
              }
            }
            &:nth-child(2) {
              width: 166px;
              height: 42px;
              border-top: none;
              background-color: #cccccc;
              text-align: center;
              span {
                width: 78px;
                font-size: 18px;
                height: 40px;
                line-height: 40px;
                box-sizing: border-box;
                text-align: center;
                color: #fff;
              }
            }
          }
        }
        .activityregistrationdetail-title-conent-over-two-dialog {
          .activityregistrationdetail-title-conent-over-two-dialog-one {
            border-bottom: 1px solid #eee;
            h4 {
              font-size: 18px;
              font-weight: 800;
              height: 40px;
              line-height: 40px;
              margin-bottom: 20px;
            }
            .dlest-fr-title {
              height: 30px;
              position: relative;
              span {
                font-size: 16px;
                &:nth-child(1) {
                  color: #666666;
                  margin-right: 5px;
                }
                &:nth-child(2) {
                  color: #262626;
                }
                &:nth-child(3) {
                  color: #008aff;
                  cursor: pointer;
                }
                &:nth-child(4) {
                  display: inline-block;
                  background: #f2660f;
                  font-size: 12px;

                  letter-spacing: 1.2px;
                  color: #ffffff;
                }
              }
              .dlest-fr-title-ul {
                position: absolute;
                height: 0px;
                top: 26px;
                left: 67px;
                background: #f8f8f8;
                overflow: hidden;
                padding: 0 6px;
                box-sizing: border-box;
                li {
                  // margin-bottom: 15px;
                  font-size: 12px;
                  height: 30px;
                  line-height: 30px;
                }
              }
            }
          }
          .activityregistrationdetail-title-conent-over-two-dialog-two {
            margin-top: 20px;
            h4 {
              font-size: 18px;
              font-weight: 800;
              height: 40px;
              line-height: 40px;
              margin-bottom: 20px;
            }
          }
        }
        h4 {
          text-align: center;
          font-size: 14px;
          margin-top: 20px;
          &:nth-child(2) {
            margin-top: 80px;
          }
        }
        .activityregistrationdetail-title-conent-over-thr {
          float: right;
          margin-bottom: 124px;
          cursor: pointer;
          i {
            display: inline-block;
            width: 15px;
            height: 13px;
            background-size: 15px 13px;
            background-repeat: no-repeat;
            background-position: center;
            vertical-align: middle;
          }
          span {
            font-size: 14px;
            letter-spacing: 0px;
            color: #666666;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .activityregistrationdetail-center {
    width: 100%;
    overflow: hidden;
    .activityregistrationdetail-center-fl {
      width: 864px;
      .activityregistrationdetail-center-one {
        width: 100%;
        .activityregistrationdetail-center-one-title {
          width: 100%;
          height: 38px;
          margin-bottom: 30px;
          border-bottom: 1px solid #eee;
          i {
            display: inline-block;
            width: 20px;
            height: 22px;
            background-size: 20px 22px;
            background-repeat: no-repeat;
            background-position: center;
            vertical-align: middle;
            margin-right: 5px;
          }
          span {
            display: inline-block;
            font-size: 22px;
            vertical-align: middle;
            line-height: 31.5px;
            letter-spacing: 0px;
            color: #333333;
          }
        }
        .activityregistrationdetail-center-one-conent {
          p {
            font-size: 16px;
            line-height: 29px;
            letter-spacing: 1.4px;
            color: #333333;
          }
        }
      }
      .activityregistrationdetail-center-two {
        width: 100%;
        margin-top: 50px;
        .activityregistrationdetail-center-two-title {
          width: 100%;
          height: 38px;
          margin-bottom: 30px;
          border-bottom: 1px solid #eee;
          i {
            display: inline-block;
            width: 20px;
            height: 22px;
            background-size: 20px 22px;
            background-repeat: no-repeat;
            background-position: center;
            vertical-align: middle;
            margin-right: 5px;
          }
          span {
            display: inline-block;
            font-size: 22px;
            vertical-align: middle;
            line-height: 31.5px;
            letter-spacing: 0px;
            color: #333333;
          }
        }
        .activityregistrationdetail-center-two-conent {
          border-bottom: 1px solid #eee;
          overflow: hidden;
          padding-bottom: 36px;
          margin-bottom: 18px;
          .activityregistrationdetail-center-two-conent-img {
            width: 50px;
            border-radius: 50%;
          }
          .activityregistrationdetail-center-two-conent-show {
            width: 794px;
            .activityregistrationdetail-center-two-conent-show-one {
              span {
                &:nth-child(1) {
                  font-size: 18px;
                  line-height: 15.7px;
                  letter-spacing: 0px;
                  margin-right: 10px;
                }
                &:nth-child(2) {
                  font-size: 14px;
                  line-height: 29.5px;
                  letter-spacing: 0px;
                  color: #999999;
                }
                &:nth-child(3) {
                  float: right;
                }
              }
            }
            .activityregistrationdetail-center-two-conent-show-two {
              margin-bottom: 20px;
              p {
                font-size: 14px;
                line-height: 29.5px;
                letter-spacing: 1.4px;
                color: #333333;
              }
            }
            .activityregistrationdetail-center-two-conent-show-thr {
              ul {
                li {
                  float: left;
                  margin-right: 20px;
                  img {
                    width: 100px;
                    height: 100px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .activityregistrationdetail-center-fr {
      width: 295px;
      .activityregistrationdetail-center-fr-one {
        .activityregistrationdetail-center-fr-one-title {
          height: 38px;
          border-bottom: 1px solid #eee;
          span {
            font-size: 18px;
            line-height: 31.5px;
            letter-spacing: 0px;
            color: #262626;
            i {
              font-size: 14px;
              letter-spacing: 0px;
              color: #666666;
            }
          }
        }
        .activityregistrationdetail-center-fr-one-conent {
          ul {
            padding: 0 18px;
            overflow: hidden;
            li {
              width: 68px;
              float: left;
              margin-top: 16px;
              margin-right: 26px;
              border-radius: 50%;
              overflow: hidden;
              &:nth-child(3n) {
                margin-right: 0px;
              }
            }
          }
        }
      }
      .activityregistrationdetail-center-fr-two {
        margin-top: 60px;
        .activityregistrationdetail-center-fr-two-title {
          height: 38px;
          border-bottom: 1px solid #eee;
          span {
            font-size: 18px;
            line-height: 31.5px;
            letter-spacing: 0px;
            color: #262626;
          }
        }
        .activityregistrationdetail-center-fr-two-conent {
          ul {
            padding-top: 28px;
            box-sizing: border-box;
            li {
              width: 276px;
              height: 234px;
              border: 1px solid #f3f3f3;
              border-radius: 4px;
              margin-left: 8px;
              margin-bottom: 28px;
              .activityregistrationdetail-center-fr-two-conent-img {
                width: 276px;
              }
              h3 {
                padding: 0 8px;
                box-sizing: border-box;
                font-size: 16px;
                letter-spacing: 0px;
                color: #262626;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                height: 34px;
                line-height: 34px;
              }
              p {
                font-size: 14px;
                padding: 0 8px;
                box-sizing: border-box;
                height: 30px;
                line-height: 30px;
                letter-spacing: 0px;
                color: #666666;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
}
</style>
