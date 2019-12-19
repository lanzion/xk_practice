<template>
  <div class="list">
    <div class="start-stups">
      <div class="start-title">活动进度:</div>
      <div class="start-stups-col">
        <span :class="active > 0 ? 'start-stups-num active':'start-stups-num' ">1</span>
        <span :class="active > 0 ? 'start-stups-rows active':'start-stups-rows' ">学校发起活动</span>
        <span :class="active > 0 ? 'start-stups-width active':'start-stups-width' "></span>
      </div>
      <div class="start-stups-col">
        <span :class="active > 1 ? 'start-stups-num active':'start-stups-num' ">2</span>
        <span :class="active > 1 ? 'start-stups-rows active':'start-stups-rows' ">基地/机构确认活动</span>
        <span :class="active > 1 ? 'start-stups-width active':'start-stups-width' "></span>
      </div>
      <div class="start-stups-col">
        <span :class="active > 2 ? 'start-stups-num active':'start-stups-num' ">3</span>
        <span :class="active > 2 ? 'start-stups-rows active':'start-stups-rows' ">教育局确认活动</span>
        <span :class="active > 2 ? 'start-stups-width active':'start-stups-width' "></span>
      </div>
      <div class="start-stups-col">
        <span :class="active > 3 ? 'start-stups-num active':'start-stups-num' ">4</span>
        <span :class="active > 3 ? 'start-stups-rows active':'start-stups-rows' ">开展实践活动</span>
        <span :class="active > 3 ? 'start-stups-width active':'start-stups-width' "></span>
      </div>
      <div class="start-stups-col">
        <span :class="active > 4 ? 'start-stups-num active':'start-stups-num' ">5</span>
        <span :class="active > 4 ? 'start-stups-rows active':'start-stups-rows' ">活动评价</span>
      </div>
    </div>

    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        <el-form-item label="活动状态">
          <el-select v-model="form.activityStatus" placeholder="请选择" clearable>
            <el-option
              v-for="item in activityStatus"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基地/机构" v-if="identity!=13">
          <el-select
            v-model="form.baseInstId"
            filterable
            remote
            placeholder="请选择基地/机构"
            :remote-method="remoteMethod"
            v-el-select-loadmore="loadmore"
            clearable
            @clear="remoteMethod"
          >
            <el-option
              v-for="(item,index) in beasList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学校名称" v-if="identity!=9">
          <el-select
            clearable
            v-model="form.schoolId"
            remote
            reserve-keyword
            :remote-method="getSchoolList"
            filterable
            placeholder="请输入关键词"
          >
            <el-option
              v-for="item in schoolList"
              :key="item.schoolId"
              :label="item.schoolName"
              :value="item.schoolId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-button type="primary" @click="selectList" plain>搜索</el-button>
      </el-form>
    </div>

    <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border>
      <el-table-column prop="courseName" label="课程名称" align="center" show-overflow-tooltip />
      <el-table-column label="课程分类" align="center" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.classificationParentName}}</template>
      </el-table-column>
      <el-table-column
        prop="baseInstName"
        label="基地/机构"
        align="center"
        show-overflow-tooltip
        v-if="identity=='9'||identity=='6'||identity=='7'||identity=='10'"
      />
      <el-table-column
        prop="schoolName"
        label="参与学校"
        align="center"
        show-overflow-tooltip
        v-if="identity=='13'||identity=='6'||identity=='7'||identity=='10'"
      />
      <!-- <el-table-column prop="orgName" label="发布教育局" align="center" show-overflow-tooltip></el-table-column> -->
      <el-table-column
        prop="startTime"
        label="活动开始时间"
        align="center"
        sortable
        show-overflow-tooltip
        width="140"
      />
      <el-table-column label="活动时长" align="center" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.courseDuration|filterCode(6)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="发起活动时间"
        align="center"
        sortable
        show-overflow-tooltip
        width="140"
      />
      <el-table-column
        prop="actJoinStuNums"
        label="学生人数"
        align="center"
        sortable
        show-overflow-tooltip
        width="110"
      />
      <el-table-column label="基地确认状态" align="center" sortable width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.baseInstAuditStatus==0">未确定</span>
          <span v-if="scope.row.baseInstAuditStatus==1" class="statusActive">已确定</span>
        </template>
      </el-table-column>
      <el-table-column label="教育局确认状态" align="center" sortable width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.eduAgencyAuditStatus==0">未确定</span>
          <span v-if="scope.row.eduAgencyAuditStatus==1" class="statusActive">已确定</span>
        </template>
      </el-table-column>
      <el-table-column label="活动状态" align="center" sortable show-overflow-tooltip width="110">
        <template slot-scope="scope">
          <span>{{activityStatus[scope.row.activityStatus].name}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        :width="operateWidth"
        fixed="right"
        v-if="listBtnGroup.length"
      >
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                        min: {  callback: min },
                         max: { visible:scope.row.activityStatus=='0', callback: max },
                         mid: { visible:scope.row.activityStatus&&(identity=='9'?scope.row.schoolEvalStatus=='1':scope.row.baseInstEvalStatus=='1'),callback: mid },
                         hig: { visible:scope.row.activityStatus&&(identity=='9'?scope.row.schoolEvalStatus=='0':scope.row.baseInstEvalStatus=='0'), callback: hig },
                    }"
          />
        </template>
      </el-table-column>
    </el-table>
    <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>

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
    <el-dialog
      :title="activityData.courseName"
      :visible.sync="commentDialogVisible"
      width="840px"
      center
    >
      <div class="comment_conten">
        <div class="comment_info">
          <el-row>
            <el-col :span="14">
              <div class="comment-content">
                <span>基地名称:</span>
                <span>{{activityData.baseInstName}}</span>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="comment-content">
                <span>活动开始时间及时长:</span>
                <span>{{activityData.startTime}} &nbsp; {{activityData.courseDuration|filterCode(6)}}</span>
              </div>
            </el-col>
            <el-col :span="14">
              <div class="comment-content">
                <span>学校名称:</span>
                <span>{{activityData.schoolName}}</span>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="comment-content">
                <span>学校名称:</span>
                <span>{{activityData.actJoinStuNums}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="comment_txt">
          <div class="comment_box comment_title">{{evalPointsTitle}}</div>
          <el-row class="comment_box" v-for="item in activityData.evalPoints" :key="item.pointCode">
            <el-col :span="4">
              <div class="comment_heat">{{item.pointName}}</div>
            </el-col>
            <el-col :span="14">
              <div class="comment_des">{{item.pointRemark}}</div>
            </el-col>
            <el-col :span="6">
              <div class>
                <el-rate v-model="evalPoints[item.pointCode]"></el-rate>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="comment_say">
          <el-row>
            <el-col :span="4">
              <p>评语</p>
              <p>（选填,最多300字）</p>
            </el-col>
            <el-col :span="20">
              <el-input type="textarea" v-model="comment" autosize maxlength="300" show-word-limit></el-input>
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addComment">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="seyCommentData.courseName"
      :visible.sync="seyCommentDialogVisible"
      width="840px"
      center
    >
      <div class="comment_conten" v-if="seyCommentDialogVisible">
        <div class="comment_info">
          <el-row>
            <el-col :span="14">
              <div class="comment-content">
                <span>基地名称:</span>
                <span>{{seyCommentData.baseInstName}}</span>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="comment-content">
                <span>活动开始时间及时长:</span>
                <span>{{seyCommentData.startTime}} &nbsp; {{seyCommentData.courseDuration|filterCode(6)}}</span>
              </div>
            </el-col>
            <el-col :span="14">
              <div class="comment-content">
                <span>学校名称:</span>
                <span>{{seyCommentData.schoolName}}</span>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="comment-content">
                <span>学校名称:</span>
                <span>{{seyCommentData.actJoinStuNums}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="comment_say_info">
          <el-row>
            <el-col :span="12">
              <div class="comment_say_info_left">
                <div class="comment_say_info_title">
                  学校对基地评价
                  <span
                    v-if="seyCommentData.schBaseEval"
                  >({{seyCommentData.schBaseEval.totalScoreStr}})</span>
                </div>
                <div class="comment_say_info_left_list">
                  <div class="none_comment" v-if="!seyCommentData.schBaseEval">还没有评价</div>
                  <div class="evalpointsbox" v-else>
                    <el-row
                      v-for="item in seyCommentData.schBaseEval.evalPoints"
                      :key="item.pointCode"
                    >
                      <el-col :span="6">{{item.pointName}}</el-col>
                      <el-col :span="16">
                        <el-rate v-model="item.pointScore" disabled text-color="#ff9900"></el-rate>
                      </el-col>
                    </el-row>
                    <div class="comment_say_info_left_say">评语：{{seyCommentData.schBaseEval.comment}}</div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="comment_say_info_right">
                <div class="comment_say_info_title">
                  基地对学校评价
                  <span
                    v-if="seyCommentData.baseSchEval"
                  >({{seyCommentData.baseSchEval.totalScoreStr}})</span>
                </div>
                <div class="comment_say_info_left_list">
                  <div class="none_comment" v-if="!seyCommentData.baseSchEval">还没有评价</div>
                  <div class="evalpointsbox" v-else>
                    <el-row
                      v-for="item in seyCommentData.baseSchEval.evalPoints"
                      :key="item.pointCode"
                    >
                      <el-col :span="6">{{item.pointName}}</el-col>
                      <el-col :span="16">
                        <el-rate v-model="item.pointScore" disabled text-color="#ff9900"></el-rate>
                      </el-col>
                    </el-row>
                    <div class="comment_say_info_left_say">评语：{{seyCommentData.baseSchEval.comment}}</div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import { activityState } from "@/utils/utility/dict.js";
import {
  activityList,
  cbookView,
  delActivity,
  activityDetail,
  addActivityEval,
  evalActivityView,
  searchSchoollist,
  BaseList
} from "@/api/newApi";

import {
  auditStatus,
  fit,
  status,
  isFree,
  courseType,
  courseDuration
} from "@/utils/utility/dict.js";

export default {
  name: "list",
  mixins: [permission, user],

  data() {
    return {
      beasList: [],
      baseData: {
        pageNum: 1,
        pageSize: 20
      },
      baseName: "",
      pos: "0",
      beasList: [],
      schoolList: [],
      active: 1,
      activityState: activityState,
      activityStatus: [
        { code: 0, name: "未开始" },
        { code: 1, name: "进行中" },
        { code: 2, name: "待评价" },
        { code: 3, name: "已结束" }
      ],
      listData: [],
      centerDialogVisible: false,
      commentDialogVisible: false,
      seyCommentDialogVisible: false,
      form: {
        activityStatus: ""
        // activityTitle: "",
        // commentStatus: "",
        // schoolName: ""
      },
      confirmation: {},
      activityData: {},
      evalPointsTitle: "",
      evalPoints: {},
      comment: "",
      seyCommentData: {}
    };
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
    filterFit(val) {
      let txt = "";
      if (val)
        txt = val
          .replace(/primarySchool_L/g, "小学低年级")
          .replace(/primarySchool_H/g, "小学高年级")
          .replace(/middleSchool/g, "初中")
          .replace(/highSchool/g, "高中");
      return txt;
    },
    filterPos(val) {
      if (val == 0) return "基地/机构未确认";
      if (val == 2) return "教育局已确认";
      if (val == 1) return "活动双方已确认";
    }
  },
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        const SELECTWRAP_DOM = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        SELECTWRAP_DOM.addEventListener("scroll", function() {
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
  computed: {
    ...mapState("login", {
      identity: state => state.identity || {}
    })
  },
  watch: {
    commentDialogVisible(newval) {
      if (!newval) {
        this.comment = "";
        this.activityData.evalPoints.forEach(v => {
          this.evalPoints[v.pointCode] = 0;
        });
      }
    }
  },
  created() {
    this.getBaseList(this.baseData);
    this.getDatas();
    this.getSchoolList();
    if (this.$route.query.activityId) {
      let id = this.$route.query.activityId;
      this.cbook(id);
    }
    if (this.identity == 9) this.evalPointsTitle = "学校对基地评价";
    else this.evalPointsTitle = "基地/机构对学校评价";
  },
  methods: {
    loadmore(val) {
      this.baseData.pageNum++;
      this.getBaseList(this.baseData);
    },
    getBaseList(baseData, searchName) {
      BaseList({ name: this.baseName }, baseData).then(res => {
        const { entity: datas = {} } = res.data;
        let _list = datas.resultData || [];
        if (searchName) {
          this.beasList = [];
        }
        this.beasList = [...this.beasList, ..._list];
      });
    },
    remoteMethod(query) {
      this.baseName = query;
      this.baseData.pageNum = 1;
      this.getBaseList(this.baseData, true);
    },
    selectList() {
      this.getDatas();
    },

    getSchoolList(query) {
      searchSchoollist({ schoolName: query }).then(res => {
        let _data = res.data;
        if (_data.code == 200) {
          this.schoolList = _data.appendInfo.schools;
        }
      });
    },
    // 重置分页
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getDatas();
    },
    // 获取列表数据
    async getDatas() {
      this.isLoading = true;
      const formList = Object.assign({}, this.form);
      const res = await activityList(formList, this.pages);

      const { entity: datas = {} } = res.data;

      try {
        this.listData = datas.resultData || [];
        this.totalNum = datas.totalNum || 0;
      } catch (error) {
        this.listData = [];
      } finally {
        this.isLoading = false;
      }
    },
    // 获取活动详情
    async getActivityData(activityId) {
      const res = await activityDetail({ activityId });
      const { entity: datas = {} } = res.data;
      try {
        if (res.data.code == 200) {
          this.activityData = datas;
        } else {
          this.$message({
            message: _datas.msg || `加载失败`,
            type: "error"
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    cbook(activityId) {
      cbookView({ activityId: activityId }).then(res => {
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
    },
    min(data) {
      this.cbook(data.data.id);
    },
    mid(data) {
      evalActivityView({ activityId: data.data.id }).then(res => {
        try {
          let _datas = res.data;
          if (_datas.code == 200) {
            this.seyCommentData = _datas.entity;
            this.seyCommentDialogVisible = true;
          } else {
            this.$message({
              type: "error",
              message: _datas.msg || "加载失败"
            });
          }
        } catch (err) {
          console.log(err);
        }
      });
    },
    max(data) {
      // 删除活动
      const h = this.$createElement;
      this.$msgbox({
        title: "",
        message: h("p", { style: "padding: 30px 3px" }, [
          h(
            "span",
            null,
            "确定删除活动吗？删除后此活动将不会提交给基地/机构确认。 "
          )
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "删除中...";
            delActivity({ id: data.data.id }).then(res => {
              try {
                let _datas = res.data;
                if (_datas.code == 200) {
                  done();
                  instance.confirmButtonLoading = false;
                  this.$message({
                    type: "success",
                    message: "删除成功"
                  });
                  this.getDatas();
                } else {
                  this.$message({
                    type: "error",
                    message: _datas.msg || "删除失败"
                  });
                }
              } catch (err) {
                console.log(err);
              } finally {
                instance.confirmButtonLoading = false;
              }
            });
          } else {
            done();
          }
        }
      })
        .then(action => {})
        .catch(() => {}); //一定别忘了这个
    },
    hig(data) {
      this.getActivityData(data.data.id);
      this.commentDialogVisible = true;
    },
    addComment() {
      let data = {
        activityId: this.activityData.activityId,
        comment: this.comment,
        evalPoints: []
      };
      for (var key in this.evalPoints) {
        let obj = {
          pointCode: key,
          pointContent: "",
          pointScore: this.evalPoints[key]
        };
        data.evalPoints.push(obj);
      }
      addActivityEval(data).then(res => {
        try {
          let _datas = res.data;
          if (_datas.code == 200) {
            this.$message({
              type: "success",
              message: "评论成功"
            });
            this.getDatas();
            this.commentDialogVisible = false;
          } else {
            this.$message({
              type: "error",
              message: _datas.msg || "评论失败"
            });
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.start-stups {
  background-color: rgba(242, 242, 242, 1);
  text-align: center;
  height: 50px;
  margin-top: 10px;
  padding: 0 10px;
  min-width: 1300px;
  .start-title {
    float: left;
    height: 50px;
    line-height: 50px;
    color: #000;
    font-size: 18px;
    margin-right: 20px;
  }
  .start-stups-col {
    float: left;
    margin-right: 10px;
    // width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: left;
    .start-stups-num {
      display: inline-block;
      text-align: center;
      margin-right: 10px;
      width: 20px;
      height: 20px;
      line-height: 30px;
      color: #ccc;
      border: 2px solid #ccc;
      border-radius: 50%;
      vertical-align: middle;
      line-height: 20px;
    }
    .start-stups-rows {
      display: inline-block;
      color: #ccc;
      margin-right: 10px;
      font-size: 14px;
    }
    .start-stups-width {
      display: inline-block;
      border: 1px solid #ccc;
      width: 35px;
      vertical-align: middle;
    }
    .active {
      border-color: #000;
      color: #000;
    }
  }
}
#printMe {
  text-align: initial;
  padding: 25px 25px 30px;
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
.comment_conten {
  .comment_info {
    .comment-content {
      line-height: 30px;
    }
  }
  .comment_txt {
    .comment_box {
      line-height: 42px;
      border-bottom: 1px solid #ccc;
      padding-left: 50px;
      .comment_heat {
        font-size: 12px;
        color: #000;
      }
    }
    /deep/ .el-rate {
      line-height: 50px;
    }
    .comment_title {
      font-weight: 600;
      color: #000;
    }
    .comment_las,
    .comment_title {
      border-bottom: 2px solid #ccc;
    }
  }
  .comment_say {
    margin-top: 30px;
    p {
      padding-top: 5px;
      text-align: center;
    }
    p:nth-of-type(2) {
      color: #d9001b;
    }
  }
}
.comment_say_info {
  border: 1px solid #ccc;
  .comment_say_info_left {
    border-right: 1px solid #ccc;
  }
  .evalpointsbox {
    padding-left: 20px;
    line-height: 35px;
    /deep/ .el-rate {
      line-height: 44px;
    }
  }
  .comment_say_info_title {
    border-bottom: 1px solid #ccc;
    font-weight: 600;
    line-height: 60px;
    padding-left: 20px;
    color: #000;
    span {
      font-weight: 400;
    }
  }
  .none_comment {
    padding-left: 20px;
    padding-top: 50px;
  }
}
</style>
