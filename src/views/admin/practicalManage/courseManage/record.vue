<template>
  <div class="content">
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">所属活动</span>
      <div class="school-detail-list-redource">{{datas.title}}</div>
    </div>
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">所属领域</span>
      <div
        class="school-detail-list-redource"
      >{{datas.courseTypeParentName}}/{{datas.courseTypeName}}</div>
    </div>
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">课程学段</span>
      <div class="school-detail-list-redource">
        <span v-if="datas.fit==1">小学</span>
        <span v-else-if="datas.fit==2">初中</span>
        <span v-else-if="datas.fit==3">高中</span>
      </div>
    </div>
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">课程名称</span>
      <div class="school-detail-list-redource">{{datas.name}}</div>
    </div>
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">学习目标</span>
      <div class="school-detail-list-title">{{datas.target}}</div>
    </div>

    <div class="course_scheduling_box">
      <p class="course_scheduling_title">已根据课程类型自动筛选可参与活动的基地</p>
      <div class="course_scheduling_main">
        <div
          class="course_scheduling_item"
          @click="openDialog(item)"
          v-for="item in datas.baseinfoArray"
          :key="item.baseInfoId"
        >
          <div class="course_scheduling_img_box">
            <el-image :src="item.baseInfoCover" class="course_scheduling_img" fit="cover"></el-image>
          </div>
          <p class="course_scheduling_item-title">{{item.baseInfoName}}</p>
          <!-- <p class="course_scheduling_item-title">
                                每日可举办活动次数<span>{{item.allNum}}</span>次
          </p>-->
        </div>
      </div>
    </div>

    <div class="school-detail-main-list">
      <span class="school-detail-list-head"></span>
      <div class="school-detail-list-redource">
        <el-form>
          <el-form-item class="g-form--footer">
            <el-button @click="cancel" type="primary">返回列表</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-form class="course-dialog-box" v-show="dialogVisible" :mode="form">
      <div class="course-dialog-main">
        <p class="course-dialog-head">基地服务列表</p>
        <div class="school-table-box">
          <el-table
            :data="list"
            stripe
            align="center"
            border
            :header-cell-style="{'background-color':'#eee', 'color':'#666'}"
            width="100%"
            max-height="300"
          >
            <el-table-column prop="title" label="服务标题" align="center" width="200"></el-table-column>
            <el-table-column prop="time" label="服务描述" align="center">
              <template slot-scope="scope">
                <div class="school-table-list-box">
                  <div class="school-table-list" :class="{activeIndex:activeIndex!=scope.$index}">
                    服务时长：{{scope.row.maxTime}} 小时
                    <br />
                    日办次数：{{scope.row.maxFrequency}}次
                    <br />
                    服务人群：{{scope.row.scope}}
                    <br />
                    服务人数：每次{{scope.row.minMannum||1}}-{{scope.row.maxMannum}}人
                    <br />
                    服务描述：{{scope.row.expound}}
                  </div>
                  <span
                    class="school-table-list-btn"
                    v-show="activeIndex!=scope.$index"
                    @click="closeEs(scope.$index,'open')"
                  >展开</span>
                  <span
                    class="school-table-list-btn"
                    :class="{activeIndex:activeIndex==scope.$index}"
                    v-show="activeIndex==scope.$index"
                    @click="closeEs(scope.$index,'close')"
                  >收起</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="服务金额" align="center" width="200">
              <template slot-scope="scope">￥{{scope.row.price}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="70">
              <template slot-scope="scope">
                <el-button
                  class="g-table--link"
                  type="text"
                  @click="changeItem(scope.row,scope.$index)"
                  v-if="scope.row.id==form.projectId"
                >取消</el-button>
                <el-button
                  class="g-table--link"
                  type="text"
                  @click="changeItem(scope.row,scope.$index)"
                  v-else
                >选择</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="school-detail-list">
          <div class="school-detail-item">
            <span class="school-detail-list-head" style="lineHeight:40px;">上课年级</span>
            <div class="school-detail-list-title">
              <div style="width:300px;">
                <el-form-item>
                  <el-select v-model="stateValue" placeholder="请选择年级" clearable>
                    <el-option
                      v-for="(item,index) in fpStates"
                      :key="index"
                      :label="item.name"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="school-detail-item">
            <span class="school-detail-list-head" style="lineHeight:40px;">上课班级</span>
            <div class="school-detail-list-title">
              <div style="width:300px;">
                <el-form-item>
                  <el-select v-model="stateValue1" placeholder="请选择班级" clearable>
                    <el-option
                      v-for="(item,index) in options"
                      :key="index"
                      :label="item.className"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <div class="school-detail-list" v-if="options.length>0&&stateValue1!==''">
          <div class="school-detail-item">
            <span class="school-detail-list-head">班主任</span>
            <div class="school-detail-list-title">{{options[stateValue1].teacherName}}</div>
          </div>
          <div class="school-detail-item">
            <span class="school-detail-list-head">联系方式</span>
            <div class="school-detail-list-title">{{options[stateValue1].phone}}</div>
          </div>
        </div>
        <div class="school-detail-main-list">
          <span class="school-detail-list-head" style="lineHeight:32px;">上课日期</span>
          <div class="school-detail-list-redource" style="lineHeight:32px;">
            <el-form-item>
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="activityTime"
                :editable="false"
                clearable
                type="date"
                :picker-options="pickerOptions0"
                style="width:140px;"
                @change="getDate"
              ></el-date-picker>
              <span>{{week}}</span>
              <el-button
                style="marginLeft:30px;"
                type="primary"
                @click="openDetail"
                v-show="week!=''"
              >当日日程</el-button>
            </el-form-item>
          </div>
        </div>
        <!-- <div class="school-detail-main-list">
                            <span class="school-detail-list-head">上课时间</span>
                            <div class="school-detail-list-redource">
                                   <div class="school-time-box">
                                        <span class="school-time-btn" v-for="(item,index) in time" :class="{'oy-active':timeIndex.indexOf(item.key)!=-1}" :key="index" @click="changeTime(item,index)">{{item.title}}</span>
                                   </div>
                            </div>
        </div>-->
        <div class="school-detail-main-list" v-show="time.length!=0">
          <span class="school-detail-list-head">上课时间</span>
          <div class="school-detail-list-redource">
            <div class="school-time-box">
              <span
                class="school-time-btn"
                v-for="(item,index) in time"
                :class="{'oy-active':timeIndex===item.timeCode}"
                :key="index"
                @click="changeTime(item,index)"
              >{{item.timeCode}}</span>
            </div>
          </div>
        </div>
        <div class="school-detail-main-list">
          <span class="school-detail-list-head"></span>
          <div class="school-detail-list-redource">
            <el-form-item class="g-form--footer">
              <el-button plain @click="closeDialog">取消</el-button>
              <el-button type="primary" @click="submit" :loading="isLoading">确认排课</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="course-dialog-model" @click="closeDialog"></div>
    </el-form>
  </div>
</template>

<script>
import {
  selectCourse,
  getClassAndNum,
  baseinfoProject,
  comfirCourse,
  baseprojectCourseTime
} from "@/api/resetApi";
export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now(); //- 8.64e7;如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      datas: {},
      form: {
        classId: "", //班级id
        gradeId: "",
        courseId: "", //课程id
        baseinfoId: "", //基地id
        projectId: "", //服务id
        attendClassDateStr: "", //开始日期
        startDateTxt: "",
        endDateTxt: "",
        activityId: "" //活动id
      },
      fpStates: [],
      options: [],
      gadeList: [],
      stateValue: "",
      stateValue1: "",
      dialogVisible: false,
      list: [],

      activityTime: "",
      activeIndex: 0,
      first: 1,
      weeks: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ],
      week: "",
      time: [],
      timeIndex: "",
      changIndex: "",
      checkTime: [],
      rules: {}
    };
  },
  computed: {},
  watch: {
    stateValue: {
      handler: function() {
        this.changeValue();
      },
      deep: true
    },
    activityTime: {
      handler: function() {
        this.getDate();
      },
      deep: true
    }
  },
  mounted() {},
  created() {
    this.getDetailData();
  },
  methods: {
    submit() {
      let that = this;
      const formList = Object.assign({}, this.form);

      formList.classId = this.options[this];
      if (formList.projectId === "") {
        this.$message({
          message: `请选择服务项`,
          type: "warning"
        });
        return false;
      }
      if (this.stateValue === "") {
        this.$message({
          message: `请选择年级`,
          type: "warning"
        });
        return false;
      }
      formList.gradeId = this.fpStates[this.stateValue].id;
      if (this.stateValue1 === "") {
        this.$message({
          message: `请选择班级`,
          type: "warning"
        });
        return false;
      }
      formList.classId = this.options[this.stateValue1].id;
      if (!this.activityTime) {
        this.$message({
          message: `请选择上课日期`,
          type: "warning"
        });
        return false;
      }
      formList.attendClassDateStr = this.activityTime;
      if (this.timeIndex === "") {
        this.$message({
          message: `请选择上课时间`,
          type: "warning"
        });
        return false;
      }
      formList.timecodetxt = this.timeIndex;
      this.isLoading = true;
      comfirCourse(formList)
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              message: `提交成功`,
              type: "success",
              onClose() {
                that.$router.go(-1);
              }
            });
          } else {
            this.$message({
              message: res.data.msg || `提交失败`,
              type: "error"
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    changeItem(row, index) {
      //选择服务项
      if (this.changIndex === index) {
        this.form.projectId = "";
        this.changIndex = "";
        this.time = [];
      } else {
        this.form.projectId = row.id;

        baseprojectCourseTime({ projectId: row.id })
          .then(res => {
            const { code, appendInfo: datas } = res.data;
            if (code === 200 && datas) {
              console.log(datas);
              this.time = datas.allList;
            }
          })
          .finally(() => {});

        this.changIndex = index;
      }

      this.timeIndex = "";
    },
    changeTime(item, index) {
      //选择排课时间
      if (this.form.projectId === "") {
        this.$message({
          message: `请选择基地服务`,
          type: "warning"
        });
      } else {
        this.timeIndex === item.timeCode
          ? (this.timeIndex = "")
          : (this.timeIndex = item.timeCode);
      }
    },

    changeValue() {
      //选择年级

      if (this.stateValue !== "") {
        this.options = this.fpStates[this.stateValue].classDtoList;
      } else {
        this.options = [];
      }
      this.stateValue1 = "";
    },
    getDate() {
      if (this.activityTime && this.activityTime != "") {
        let now = new Date(this.activityTime);
        let day = now.getDay();
        this.week = this.weeks[day];
        this.form.attendClassDateStr = this.activityTime;
      } else {
        this.week = "";
        this.form.attendClassDateStr = "";
      }
    },
    getDate1(time) {
      //转换时间
      let now = new Date(time);
      return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    },
    openDetail() {
      this.$router.push({
        path:
          "/practicalManage/baseAuthortySchedule/baseAuthortyScheduleDetail",
        query: {
          baseinfoId: this.form.baseinfoId,
          day: this.getDate1(this.activityTime)
        }
      });
    },
    // 获取详情
    getDetailData() {
      const id = this.id || this.$route.query.id;
      if (id) {
        selectCourse({ id })
          .then(res => {
            const { code, entity: datas } = res.data;
            if (code === 200 && datas) {
              this.datas = datas || {};
              this.form.courseId = datas.id;
              this.form.activityId = datas.activityId;
            }
          })
          .finally(() => {});
      }
    },
    // 返回列表页
    cancel() {
      this.$router.go(-1);
    },
    closeEs(index, type) {
      if (type === "close") {
        this.activeIndex = -1;
      } else {
        this.activeIndex == index
          ? (this.activeIndex = -1)
          : (this.activeIndex = index);
      }
    },
    openDialog(row) {
      if (this.first == 1) {
        getClassAndNum({}).then(res => {
          const { code, entity: datas } = res.data;
          if (code === 200 && datas) {
            this.first = 2;

            this.fpStates = datas.detlist;
          }
        });
      } else {
      }
      baseinfoProject({ baseinfoId: row.baseInfoId, auditStatus: "A" })
        .then(res => {
          const { code, entity: datas } = res.data;
          if (code === 200 && datas) {
            datas.list.forEach(o => {
              o.checked = "A";
            });
            this.list = datas.list;

            this.form.baseinfoId = row.baseInfoId;
            this.dialogVisible = true;
          } else {
            this.$message({
              message: res.data.msg,
              type: "warning"
            });
          }
        })
        .finally(() => {});
    },
    closeDialog() {
      this.form.baseinfoId = "";
      this.form.classId = "";
      this.form.projectId = "";
      this.form.endDateTxt = "";
      this.form.startDateTxt = "";
      this.form.gradeId = "";
      this.dialogVisible = false;
      this.stateValue = "";
      this.stateValue1 = "";
      this.activityTime = "";
      this.activeIndex = 0;
      this.changIndex = "";
      this.timeIndex = "";
      this.time = [];
    }
  }
};
</script>

<style lang='scss' module>
@import "~@/assets/css/base/utils.scss";
@import "~@/assets/css/base/element-variables.scss";
$--magnification: 20;
$--dialog-width: 740px;
$--cover-width: $--activity-cover-ratio-width * $--magnification;
$--cover-height: $--activity-cover-ratio-height * $--magnification;
$--copper-height: ($--dialog-width - $--dialog-padding-primary * 2) /
  $--activity-cover-ratio;

:export {
  width: $--cover-width;
  height: $--cover-height;
  dialogWidth: $--dialog-width;
  boxHeight: $--copper-height;
}
textarea.el-textarea__inner {
  resize: none;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/css/base/utils.scss";
@import "~@/assets/css/base/element-variables.scss";
@import "~@/assets/css/module/my-module-form.scss";
.content {
  min-width: 900px;
  .school-detail-img {
    width: 300px;
    height: 300px;
    cursor: pointer;
  }
  .school-detail-list {
    margin-top: 20px;
    font-size: 0;
    .school-detail-item {
      display: inline-block;
      width: 50%;
      position: relative;
      vertical-align: top;
    }
  }
  .school-detail-main-list {
    position: relative;
    margin-top: 30px;
    .school-detail-list-title {
      overflow-y: auto;
      max-height: 150px;
      max-width: 900px;
      border-radius: 4px;
      border: solid 1px #eaeaea;
      word-break: break-all;
      padding: 10px;
      box-sizing: border-box;
    }
    .school-detail-list-redource {
      font-size: 14px;
      color: #333333;
      margin-left: 82px;
      line-height: 20px;
      min-height: 40px;
      .school-detail-redource-list {
        margin-bottom: 10px;
      }
      .school-detail-name {
        color: #666666;
        margin-right: 10px;
      }
      .school-detail-name-title {
        color: #333;
        margin-right: 10px;
      }
      .school-detail-download-btn {
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 20px;
        background-color: #e4eefe;
        border-radius: 4px;
        border: solid 1px #008aff;
        line-height: 20px;
        color: #008aff;
        text-align: center;
        font-size: 12px;
      }
    }
  }
  .school-detail-list-head {
    color: #666666;
    position: absolute;
    top: 0;
    left: 0;
    width: 82px;
    font-size: 14px;
    line-height: 20px;
    &.list-active {
      position: static;
      width: 100%;
      span {
        color: #0099ff;
        margin: 0 7px;
      }
      margin-bottom: 20px;
    }
  }
  .school-detail-list-title {
    line-height: 20px;
    font-size: 14px;
    color: #333333;
    margin-left: 82px;
  }
}

.course_scheduling_box {
  margin: 20px 0;
  padding: 30px 0 10px 0;
  border-top: 1px #eaeaea dashed;
  border-bottom: 1px #eaeaea dashed;
  max-width: 984px;
  .course_scheduling_title {
    font-size: 14px;
    color: #666666;
  }
  .course_scheduling_main {
    font-size: 0;
    .course_scheduling_item {
      display: inline-block;
      box-sizing: border-box;
      vertical-align: top;
      width: 23%;
      margin: 10px 2% 0 0;
      cursor: pointer;
      .course_scheduling_img_box {
        position: relative;
        padding-top: 100%;
        margin-bottom: 7px;
        .course_scheduling_img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .image-slot {
          font-size: 14px;
          color: #666666;
        }
      }
      .course_scheduling_item-title {
        font-size: 14px;
        color: #666;
        line-height: 20px;
        padding-top: 5px;
        span {
          color: #d9001b;
        }
      }
    }
  }
}

.course-dialog-box {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  .course-dialog-model {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
    z-index: 601;
  }
  .course-dialog-main {
    position: relative;
    margin: 150px auto 0 auto;
    width: 1080px;
    background: #fff;
    padding: 20px;
    z-index: 700;
    .course-dialog-head {
      background-color: rgb(215, 215, 215);
      font-size: 14px;
      text-align: center;
      line-height: 40px;
    }
  }
}

.school-table-list-box {
  position: relative;
  padding: 0 40px 0 20px;
  .school-table-list-btn {
    position: absolute;
    top: 50%;
    right: 0;
    width: 40px;
    height: 20px;
    margin-top: -10px;
    font-size: 12px;
    line-height: 20px;
    color: #999;
    cursor: pointer;
    &.activeIndex {
      background-color: #e4eefe;
      border-radius: 4px;
      border: solid 1px #008aff;
      color: #008aff;
      text-align: center;
      top: 86px;
    }
  }
}
.school-table-list {
  text-align: left;
  line-height: 20px;
  &.activeIndex {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
.school-time-box {
  font-size: 0;
  .school-time-btn {
    display: inline-block;
    text-align: center;
    margin-right: 10px;
    height: 36px;
    line-height: 36px;
    vertical-align: top;
    margin-bottom: 7px;
    padding: 0 10px;
    font-size: 14px;
    color: #d9001b;
    border-radius: 4px;
    border: 1px solid rgb(242, 242, 242);
    background: #caf982;
    cursor: pointer;
    &.oy-active {
      color: #fff;
      border: 1px solid #008aff;
      background: #008aff;
    }
  }
}
</style>
