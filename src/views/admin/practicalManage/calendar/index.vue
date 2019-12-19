<template>
  <div class="cal">
    <div class="l_calendar">
      <div class="select_region" v-if="identity!=9&&identity!=13">
        学校地区:
        <el-select v-model="parentId" clearable placeholder="请选择省份">
          <el-option
            v-for="item in regionList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
        <el-select v-model="cityId" clearable placeholder="请选择市">
          <el-option
            v-for="item in cityList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
        <el-select v-model="areaId" clearable placeholder="请选择区">
          <el-option
            v-for="item in areaList"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="getActivityInM(new Date())">搜索</el-button>
      </div>
      <ele-calendar
        border
        :render-content="renderContent"
        :data="datedef"
        :prop="prop"
        @pick="datePick"
        @date-change="dateChange"
      ></ele-calendar>
    </div>
    <div class="activitybox" v-if="identity!=9&&identity!=13">
      <div class="activitylist_title">{{activeDate}}活动安排：</div>
      <div
        class="activity_list"
        v-if="activeList.amActivities&&activeList.amActivities.length||activeList.pmActivities&&activeList.pmActivities.length||activeList.allDayActivities&&activeList.allDayActivities.length"
      >
        <div class="amActivity_list" v-if="activeList.amActivities&&activeList.amActivities.length">
          <el-row>
            <el-col :span="2" class="amActivity_list_title">上午{{activeList.amActivities.length}}场</el-col>
            <el-col :span="22">
              <el-row
                class="activity_box"
                v-for="cityItem in activeList.amActivities"
                :key="cityItem.cityId"
              >
                <div class="city_title">{{cityItem.cityName}} ({{cityItem.cityTimeCount}})场</div>
                <div
                  v-for="areaItem in cityItem.countryActivities"
                  :key="areaItem.countryId"
                  class="city_list"
                >
                  <div class="city_title">{{areaItem.countryName}} ({{areaItem.countryTimeCount}})场</div>
                  <div v-for="item in areaItem.activities" :key="item.id" class="act_box">
                    <el-row>
                      <el-col :span="13">
                        <el-col :span="24" class="txt_box">学校名称：{{item.schoolName}}</el-col>
                        <el-col :span="24" class="txt_box">课程名称：{{item.courseName}}</el-col>
                        <el-col :span="24" class="txt_box">
                          报名人数：共{{item.actJoinStuNums}}人&nbsp;&nbsp;
                          <span
                            v-for="(subItem,index) in item.classInfos"
                            :key="index"
                          >{{subItem.className}}（{{subItem.enrollNum}}人）</span>
                        </el-col>
                      </el-col>
                      <el-col :span="8">
                        <el-col :span="24" class="txt_box">基地/机构：{{item.baseInstName}}</el-col>
                        <el-col
                          :span="24"
                          class="txt_box"
                        >活动开始时间及时长：{{item.startTime}}&nbsp;&nbsp;&nbsp;半天</el-col>
                      </el-col>
                      <el-col :span="3" class="btn">
                        <el-button type="primary" @click="look(item.id)">活动确认书</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="amActivity_list" v-if="activeList.pmActivities&&activeList.pmActivities.length">
          <el-row>
            <el-col :span="2" class="amActivity_list_title">下午{{activeList.pmActivities.length}}场</el-col>
            <el-col :span="22">
              <el-row
                class="activity_box"
                v-for="cityItem in activeList.pmActivities"
                :key="cityItem.cityId"
              >
                <div class="city_title">{{cityItem.cityName}} ({{cityItem.cityTimeCount}})场</div>
                <div
                  v-for="areaItem in cityItem.countryActivities"
                  :key="areaItem.countryId"
                  class="city_list"
                >
                  <div class="city_title">{{areaItem.countryName}} ({{areaItem.countryTimeCount}})场</div>
                  <div v-for="item in areaItem.activities" :key="item.id" class="act_box">
                    <el-row>
                      <el-col :span="13">
                        <el-col :span="24" class="txt_box">学校名称：{{item.schoolName}}</el-col>
                        <el-col :span="24" class="txt_box">课程名称：{{item.courseName}}</el-col>
                        <el-col :span="24" class="txt_box">
                          报名人数：共{{item.actJoinStuNums}}人&nbsp;&nbsp;
                          <span
                            v-for="(subItem,index) in item.classInfos"
                            :key="index"
                          >{{subItem.className}}（{{subItem.enrollNum}}人）</span>
                        </el-col>
                      </el-col>
                      <el-col :span="8">
                        <el-col :span="24" class="txt_box">基地/机构：{{item.baseInstName}}</el-col>
                        <el-col
                          :span="24"
                          class="txt_box"
                        >活动开始时间及时长：{{item.startTime}}&nbsp;&nbsp;&nbsp;半天</el-col>
                      </el-col>
                      <el-col :span="3" class="btn">
                        <el-button type="primary" @click="look(item.id)">活动确认书</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div
          class="amActivity_list"
          v-if="activeList.allDayActivities&&activeList.allDayActivities.length"
        >
          <el-row>
            <el-col :span="2" class="amActivity_list_title">全天{{activeList.allDayActivities.length}}场</el-col>
            <el-col :span="22">
              <el-row
                class="activity_box"
                v-for="cityItem in activeList.allDayActivities"
                :key="cityItem.cityId"
              >
                <div class="city_title">{{cityItem.cityName}} ({{cityItem.cityTimeCount}})场</div>
                <div
                  v-for="areaItem in cityItem.countryActivities"
                  :key="areaItem.countryId"
                  class="city_list"
                >
                  <div class="city_title">{{areaItem.countryName}} ({{areaItem.countryTimeCount}})场</div>
                  <div v-for="item in areaItem.activities" :key="item.id" class="act_box">
                    <el-row>
                      <el-col :span="13">
                        <el-col :span="24" class="txt_box">学校名称：{{item.schoolName}}</el-col>
                        <el-col :span="24" class="txt_box">课程名称：{{item.courseName}}</el-col>
                        <el-col :span="24" class="txt_box">
                          报名人数：共{{item.actJoinStuNums}}人&nbsp;&nbsp;
                          <span
                            v-for="(subItem,index) in item.classInfos"
                            :key="index"
                          >{{subItem.className}}（{{subItem.enrollNum}}人）</span>
                        </el-col>
                      </el-col>
                      <el-col :span="8">
                        <el-col :span="24" class="txt_box">基地/机构：{{item.baseInstName}}</el-col>
                        <el-col
                          :span="24"
                          class="txt_box"
                        >活动开始时间及时长：{{item.startTime}}&nbsp;&nbsp;&nbsp;全天</el-col>
                      </el-col>
                      <el-col :span="3" class="btn">
                        <el-button type="primary" @click="look(item.id)">活动确认书</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="activity_none" v-else>当天没有活动安排</div>
    </div>
    <div class="activitybox" v-else>
      <div class="activitylist_title">{{activeDate}}活动安排：</div>
      <div
        class="activity_list"
        v-if="activeList.amActivities&&activeList.amActivities.length||activeList.pmActivities&&activeList.pmActivities.length||activeList.allDayActivities&&activeList.allDayActivities.length"
      >
        <div class="amActivity_list" v-if="activeList.amActivities&&activeList.amActivities.length">
          <el-row>
            <el-col :span="2" class="amActivity_list_title">上午{{activeList.amActivities.length}}场</el-col>
            <el-col :span="22">
              <el-row class="activity_box" v-for="item in activeList.amActivities" :key="item.id">
                <el-col :span="13">
                  <el-col :span="24" class="txt_box">学校名称：{{item.schoolName}}</el-col>
                  <el-col :span="24" class="txt_box">课程名称：{{item.courseName}}</el-col>
                  <el-col :span="24" class="txt_box">
                    报名人数：共{{item.actJoinStuNums}}人&nbsp;&nbsp;
                    <span
                      v-for="(subItem,index) in item.classInfos"
                      :key="index"
                    >{{subItem.className}}（{{subItem.enrollNum}}人）</span>
                  </el-col>
                </el-col>
                <el-col :span="8">
                  <el-col :span="24" class="txt_box">基地/机构：{{item.baseInstName}}</el-col>
                  <el-col
                    :span="24"
                    class="txt_box"
                  >活动开始时间及时长：{{item.startTime}}&nbsp;&nbsp;&nbsp;半天</el-col>
                </el-col>
                <el-col :span="3" class="btn">
                  <el-button type="primary" @click="look(item.id)">活动确认书</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div class="amActivity_list" v-if="activeList.pmActivities&&activeList.pmActivities.length">
          <el-row>
            <el-col :span="2" class="amActivity_list_title">下午{{activeList.pmActivities.length}}场</el-col>
            <el-col :span="22">
              <el-row class="activity_box" v-for="item in activeList.pmActivities" :key="item.id">
                <el-col :span="13">
                  <el-col :span="24" class="txt_box">学校名称：{{item.schoolName}}</el-col>
                  <el-col :span="24" class="txt_box">课程名称：{{item.courseName}}</el-col>
                  <el-col :span="24" class="txt_box">
                    报名人数：共{{item.actJoinStuNums}}人&nbsp;&nbsp;
                    <span
                      v-for="(subItem,index) in item.classInfos"
                      :key="index"
                    >{{subItem.className}}（{{subItem.enrollNum}}人）</span>
                  </el-col>
                </el-col>
                <el-col :span="8">
                  <el-col :span="24" class="txt_box">基地/机构：{{item.baseInstName}}</el-col>
                  <el-col
                    :span="24"
                    class="txt_box"
                  >活动开始时间及时长：{{item.startTime}}&nbsp;&nbsp;&nbsp;半天</el-col>
                </el-col>
                <el-col :span="3" class="btn">
                  <el-button type="primary" @click="look(item.id)">活动确认书</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
        <div
          class="amActivity_list"
          v-if="activeList.allDayActivities&&activeList.allDayActivities.length"
        >
          <el-row>
            <el-col
              :span="2"
              class="amActivity_list_title"
            >全天{{activeList.allDayActivities.length}}场</el-col>
            <el-col :span="22">
              <el-row
                class="activity_box"
                v-for="item in activeList.allDayActivities"
                :key="item.id"
              >
                <el-col :span="13">
                  <el-col :span="24" class="txt_box">学校名称：{{item.schoolName}}</el-col>
                  <el-col :span="24" class="txt_box">课程名称：{{item.courseName}}</el-col>
                  <el-col :span="24" class="txt_box">
                    报名人数：共{{item.actJoinStuNums}}人&nbsp;&nbsp;
                    <span
                      v-for="(subItem,index) in item.classInfos"
                      :key="index"
                    >{{subItem.className}}（{{subItem.enrollNum}}人）</span>
                  </el-col>
                </el-col>
                <el-col :span="8">
                  <el-col :span="24" class="txt_box">基地/机构：{{item.baseInstName}}</el-col>
                  <el-col
                    :span="24"
                    class="txt_box"
                  >活动开始时间及时长：{{item.startTime}}&nbsp;&nbsp;&nbsp;全天</el-col>
                </el-col>
                <el-col :span="3" class="btn">
                  <el-button type="primary" @click="look(item.id)">活动确认书</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="activity_none" v-else>当天没有活动安排</div>
    </div>

    <el-dialog title :visible.sync="centerDialogVisible" width="965px" center>
      <div id="printMe">
        <div class="box" ref="print">
          <div class="pos" :class="'pos'+pos">{{pos|filterPos}}</div>
          <div class="title">《{{confirmation.courseName}}》活动确认书</div>
          <div class="center">
            <div class="name">学校信息</div>
            <el-row>
              <el-col>
                <span>学校名称:</span>
                <span>{{confirmation.schoolName}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>学校带队教师及电话:</span>
                <span>{{confirmation.guideTeacherName}} &nbsp; {{confirmation.guideTeacherPhone}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>参加学生人数:</span>
                <span>{{confirmation.actJoinStuNums}}</span>
              </el-col>
            </el-row>
            <div class="name">活动信息</div>
            <el-row>
              <el-col>
                <span>课程名称:</span>
                <span>{{confirmation.courseName}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>活动开始时间:</span>
                <span>{{confirmation.startTime}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>活动时长:</span>
                <span>{{confirmation.courseDuration|filterCode(6)}}</span>
              </el-col>
            </el-row>

            <div class="name">基地/机构信息</div>
            <el-row>
              <el-col>
                <span>基地/机构:</span>
                <span>{{confirmation.baseInstName}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>联系人及电话:</span>
                <span>{{confirmation.baseInstContactPers}} &nbsp; {{confirmation.baseInstContactPhone}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>地址:</span>
                <span>{{confirmation.baseInstAddress}}</span>
              </el-col>
            </el-row>
          </div>
          <div class="foot">温馨提示：请学校和基地/机构遵照此确认书完成实践活动，如有疑问，请联系***教育局***，联系电话020-2521235</div>
        </div>
      </div>
      <div class="show">
        <el-button
          type="primary"
          v-print="'#printMe'"
          v-if="confirmation.baseInstAuditStatus==1&&confirmation.eduAgencyAuditStatus==1"
        >打印</el-button>
        <div v-else>
          <el-button
            type="primary"
            style="background-color: rgba(51,161,255,0.5);border-color:rgba(51,161,255,0.5);"
          >打印</el-button>
          <p class="print_tips">基地/机构、教育局确认后方可打印</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import eleCalendar from "ele-calendar";
import "ele-calendar/dist/vue-calendar.css";

import moment from "moment";
import {
  schoolActivityDayTimes,
  schoolActivityDayDetail,
  cbookView,
  baseinstActivityDayTimes,
  baseinstActivityDayDetail,
  areaActivityDayTimes,
  areatActivityDayDetail,
  areatActivityAreaList
} from "@/api/newApi.js";

import {
  auditStatus,
  fit,
  status,
  isFree,
  courseType,
  courseDuration
} from "@/utils/utility/dict.js";
export default {
  name: "date-picker",
  data() {
    return {
      pos: "0",
      confirmation: {},
      centerDialogVisible: false,
      datedef: [],
      prop: "date", //对应日期字段名
      activeDate: "",
      activeList: {
        allDayActivities: [],
        amActivities: [],
        pmActivities: []
      },
      regionList: [],
      cityList: [],
      areaList: [],
      parentId: 440000,
      cityId: "",
      areaId: ""
    };
  },
  components: {
    eleCalendar
  },
  computed: {
    ...mapState("login", {
      identity: state => state.identity || {}
    })
  },
  filters: {
    filterCode: function(val, num) {
      let name, arr;
      let typeArr = {
        "1": auditStatus,
        "2": fit,
        "3": status,
        "4": isFree,
        "5": courseType,
        "6": courseDuration
      };
      arr = typeArr[num];
      arr.forEach(v => {
        if (v.code == val) name = v.name;
      });
      return name;
    },
    filterPos(val) {
      if (val == 0) return "基地/机构未确认";
      if (val == 2) return "教育局已确认";
      if (val == 1) return "活动双方已确认";
    }
  },
  watch: {
    parentId(n) {
      this.getAreatActivityAreaList(n, 2);
      this.cityId = "";
      this.areaId = "";
      this.areaList = [];
    },
    cityId(n) {
      this.getAreatActivityAreaList(n, 3);
    }
  },
  methods: {
    renderContent(h, { defdate, ...parmas }) {
      //把时间转成时间戳
      var imoment = moment(defdate);
      //把时间进行格式化
      let geshi = imoment.format("YYYY-MM-DD");
      //拿到时间所对应的星期
      let week = imoment.day();
      //用日期对比数组中的元素，如果存在就返回对象，如果不存在就返回空
      // let info = _.find(this.datedef, { date: geshi });
      let info = this.datedef.find(val => val.day == geshi);
      if (info && (info.amCount || info.pmCount || info.allDayCount)) {
        return (
          <div class="prev-month-box">
            {imoment.date()}
            <div class="prev-month-tips">
              <p>上午：{info.amCount}场</p>
              <p>下午：{info.pmCount}场</p>
              <p>全天：{info.allDayCount}场</p>
            </div>
          </div>
        );
      } else {
        return <div class="prev-month-box">{imoment.date()}</div>;
      }
    },
    datePick(date, event, row, dome) {
      // 对时间格式进行格式化，拿到年月日和周
      // 查找点击日期，是否在数组里面，如果是返回一个对象，如果没有返回空
      // 数组存在这一对象，则修改，如果不存在，则添加到数组
      let imoment = moment(date);
      // // 格式化成，年月日
      let iformat = imoment.format("YYYY-MM");
      // // 格式化，拿到日
      // let idate = imoment.date();
      // // 拿到星期
      // let week = imoment.day();
      // // 在数组中查找，数组中是否有点击日期对应的对象，有则拿出来，没有接返回空
      // let info = _.find(this.datedef, { date: iformat });
      let imoment2 = moment(this.activeDate);
      if (iformat != imoment2.format("YYYY-MM")) {
        this.getActivityInM(date);
      }
      this.getActivityInDay(date);
    },
    dateChange(date) {
      this.getActivityInM(date);
    },
    getAreatActivityAreaList(pCode, type) {
      if (pCode == "999" || pCode == "-1") {
        areatActivityAreaList({ pCode: pCode, type: type }).then(res => {
          try {
            this.regionList = res.data.appendInfo.list;
            this.getAreatActivityAreaList(this.parentId, 2);
          } catch (err) {
            console.log(err);
          }
        });
      } else {
        if (type == 2) {
          this.regionList.forEach(v => {
            if (v.code == pCode) {
              if (v.items) {
                this.cityList = v.items;
              } else {
                areatActivityAreaList({ pCode: pCode, type: type }).then(
                  res => {
                    try {
                      v["items"] = res.data.appendInfo.list;
                      this.cityList = res.data.appendInfo.list;
                      if (this.cityList.length == 1)
                        this.cityId = this.cityList[0].code;
                    } catch (err) {
                      console.log(err);
                    }
                  }
                );
              }
            }
          });
        } else {
          this.cityList.forEach(v => {
            if (v.code == pCode) {
              if (v.items) {
                this.areaList = v.items;
              } else {
                areatActivityAreaList({ pCode: pCode, type: type }).then(
                  res => {
                    try {
                      v["items"] = res.data.appendInfo.list;
                      this.areaList = res.data.appendInfo.list;
                      if (this.areaList.length == 1)
                        this.areaId = this.areaList[0].code;
                    } catch (err) {
                      console.log(err);
                    }
                  }
                );
              }
            }
          });
        }
      }
    },
    async getActivityInM(date) {
      let month = moment(date).format("YYYY-MM");
      let haed;
      if (this.identity == 9) {
        haed = schoolActivityDayTimes;
      } else if (this.identity == 13) {
        haed = baseinstActivityDayTimes;
      } else {
        haed = areaActivityDayTimes;
      }
      if (!haed) return;
      let res = await haed({
        month: month,
        provinceId: this.parentId,
        cityId: this.cityId,
        countryId: this.areaId
      });
      try {
        if (res.data.code == 200) {
          this.datedef = res.data.appendInfo.dayTimes;
        }
      } catch (err) {
        console.log(err);
      } finally {
      }
    },
    async getActivityInDay(date) {
      let day = moment(date).format("YYYY-MM-DD hh:mm:ss");
      this.activeDate = moment(date).format("YYYY-MM-DD");
      let haed;
      if (this.identity == 9) {
        haed = schoolActivityDayDetail;
      } else if (this.identity == 13) {
        haed = baseinstActivityDayDetail;
      } else {
        haed = areatActivityDayDetail;
      }
      if (!haed) return;
      let res = await haed({ day });
      try {
        if (res.data.code == 200) {
          this.activeList.allDayActivities = res.data.entity.allDayActivities;
          this.activeList.amActivities = res.data.entity.amActivities;
          this.activeList.pmActivities = res.data.entity.pmActivities;
        } else {
          this.activeList.allDayActivities = [];
          this.activeList.amActivities = [];
          this.activeList.pmActivities = [];
        }
      } catch (err) {
        console.log(err);
      } finally {
      }
    },
    look(id) {
      cbookView({ activityId: id }).then(res => {
        try {
          let _datas = res.data;
          if (_datas.code == 200) {
            this.confirmation = _datas.entity;
            this.confirmation.baseInstAuditStatus
              ? this.confirmation.eduAgencyAuditStatus
                ? (this.pos = "2")
                : (this.pos = "1")
              : (this.pos = "0");
            this.centerDialogVisible = true;
          } else {
            this.$message({
              message: _datas.msg || `加载确认书失败`,
              type: "error"
            });
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  },
  mounted() {},
  created() {
    this.getActivityInM(new Date());
    this.getActivityInDay(new Date());
    if (this.identity == "5") {
      this.getAreatActivityAreaList("999", 2);
    } else {
      this.getAreatActivityAreaList("-1", 1);
    }
  }
};
</script>
<style lang='scss' scoped>
@font-face {
  /* 引用字体文件（注意路径）format告诉浏览器这些字体文件以什么格式解析 */
  font-family: "iconfont";
  src: url("../../../../assets/font/iconfont.eot"); /* IE9*/
  src: url("../../../../assets/font/iconfont.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("../../../../assets/font/iconfont.woff") format("woff"),
    /* chrome, firefox */ url("../../../../assets/font/iconfont.ttf")
      format("truetype"),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url("../../../../assets/font/iconfont.svg#iconfont") format("svg"); /* iOS 4.1- */
}

.cal {
  padding-top: 20px;
  .select_region {
    background: #fff;
    padding: 20px;
    /deep/ .el-select {
      width: 200px;
    }
  }
}
.l_calendar {
  width: 80%;
  min-width: 900px;
  /deep/ .el-date-picker-calendar__header {
    width: 460px;
    margin: 12px auto;
    font-size: 28px;
    line-height: 36px;
    padding: 10px;
    color: #333;
    .el-picker-panel-calendar__icon-btn.el-date-picker-calendar__prev-btn.iconfont.icon-shuangzuojiantou-,
    .el-picker-panel-calendar__icon-btn.el-date-picker-calendar__prev-btn.iconfont.icon-icon_arrow_left {
      float: left;
      line-height: 36px;
      font-size: 26px;
      color: #333;
    }
    .el-picker-panel-calendar__icon-btn.el-date-picker-calendar__next-btn.iconfont.icon-shuangyoujiantou-,
    .el-picker-panel-calendar__icon-btn.el-date-picker-calendar__next-btn.iconfont.icon-icon_arrow_right {
      float: right;
      line-height: 36px;
      font-size: 26px;
      color: #333;
    }
    .icon-icon_arrow_left:before {
      content: "\e653";
      font-family: "iconfont" !important;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-icon_arrow_right:before {
      content: "\e60D";
      font-family: "iconfont" !important;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-shuangzuojiantou-:before {
      content: "\e652";
      font-family: "iconfont" !important;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-shuangyoujiantou-:before {
      content: "\e654";
      font-family: "iconfont" !important;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -webkit-text-stroke-width: 0.2px;
      -moz-osx-font-smoothing: grayscale;
    }
  }
  /deep/ .el-date-table-calendar {
    font-size: 14px;
    th {
      height: 40px;
    }
    .prev-month-box {
      height: 102px;
      padding: 10px 20px;
      .prev-month-tips {
        font-size: 12px;
        text-align: left;
        line-height: 20px;
        padding-left: 15px;
      }
    }
  }
}
.activitybox {
  // padding-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .activitylist_title {
    color: #333;
    font-size: 16px;
    padding: 10px 0;
    font-weight: 600;
  }
  .activity_list {
    padding-top: 20px;
    font-size: 14px;
    padding-bottom: 10px;
    .amActivity_list {
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      position: relative;
      .amActivity_list_title {
        color: #333;
        font-weight: 600;
        padding-left: 15px;
      }
      .activity_box {
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        margin-bottom: 20px;
        .city_title{
          color: #333;
          font-weight: 600;
          padding-bottom: 20px;
        }
        .city_list{
          padding-left: 10px;
          .city_title{
            padding-left: 20px;
          }
          .act_box{
            padding-left: 20px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
             margin-bottom: 20px;
          }
        }
        .txt_box {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 22px;
        }
        .btn {
          padding-left: 20px;
          padding-top: 26px;
        }
      }
      .activity_box:last-child {
        border-bottom: none;
        .city_list{
          .act_box:last-child{
            border-bottom: none;
            padding-bottom: 0;
          }
        }
      }
    }
    .amActivity_list:nth-of-type(2),
    .amActivity_list:nth-of-type(3) {
      padding-top: 30px;
    }
  }
  .amActivity_list::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    left: -10px;
    top: -2px;
    background: #ccc;
  }
  .amActivity_list:nth-of-type(2)::before,
  .amActivity_list:nth-of-type(3)::before {
    top: 28px;
  }
  .activity_none {
    color: #aaa;
    padding: 20px 0;
  }
}
.box {
  width: 90%;
  border: 1px solid #ccc;
  padding: 15px 20px;
  box-sizing: border-box;
  margin: 0 auto;
  position: relative;
  .pos {
    font-size: 18px;
    color: #333;
    position: absolute;
    right: -30px;
    top: 24px;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -o-transform: rotate(45deg);
  }
  .pos1 {
    color: #8bb703;
  }
  .pos2 {
    color: #d9001b;
  }
  .title {
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    font-weight: 800;
    color: #000;
  }
  .center {
    padding: 10px 80px;
    .name {
      font-size: 18px;
      font-weight: 700;
      color: #000;
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
    }
    .el-row {
      margin-bottom: 20px;
    }
    span {
      font-size: 16px;
      color: #333;
    }
  }
  .foot {
    font-size: 14px;
    color: #333;
    margin-top: 20px;
  }
}
.show {
  text-align: center;
  // height: 60px;
  line-height: 60px;
}
.statusActive {
  color: rgb(112, 182, 3);
}
.print_tips {
  color: #d9001b;
}
</style>
