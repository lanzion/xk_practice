<template>
  <div class="sure">
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

    <section class="g-table--head clearfix fr">
      <head-operate
        class="fr"
        :items="headBtnGroup"
        v-bind="{
                    overshow:{ callback: overshow }
                }"
      />
    </section>
    <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border @selection-change="changeSelection">
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="courseName" label="课程名称" align="center" show-overflow-tooltip />
      <el-table-column label="课程分类" align="center" show-overflow-tooltip>
        <template
          slot-scope="scope"
        >{{scope.row.classificationParentName+'>'+scope.row.classificationChildrenName}}</template>
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
      <el-table-column
        label="基地确认状态"
        align="center"
        sortable
        width="150"
        v-if="identity=='9'||identity=='6'||identity=='7'||identity=='10'"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.baseInstAuditStatus==0">未确定</span>
          <span v-if="scope.row.baseInstAuditStatus==1" class="statusActive">已确定</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" :width="operateWidth">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                         show: { callback: show },
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
          <div class="title">《园中生智,研来如此》活动确认书</div>
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
        <el-button type="primary" @click="confirmActivity(false)">确认活动</el-button>
        <el-button
          type="primary"
          v-print="'#printMe'"
          v-if="confirmation.baseInstAuditStatus==1&&confirmation.eduAgencyAuditStatus==1"
        >打印</el-button>
          <el-button
          v-if="!(confirmation.baseInstAuditStatus==1&&confirmation.eduAgencyAuditStatus==1)"
            type="primary"
            style="background-color: rgba(51,161,255,0.5);border-color:rgba(51,161,255,0.5);"
          >打印</el-button>
          <p class="print_tips" v-if="!(confirmation.baseInstAuditStatus==1&&confirmation.eduAgencyAuditStatus==1)">基地/机构、教育局确认后方可打印</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import { activityState } from "@/utils/utility/dict.js";
import { activityWtAudit, cbookView, confirmActivity } from "@/api/newApi";

import {
  auditStatus,
  fit,
  status,
  isFree,
  courseType,
  courseDuration
} from "@/utils/utility/dict.js";

export default {
  name: "sure",
  mixins: [permission, user],

  data() {
    return {
      pos: "0",
      active: 1,
      activityState: activityState,
      listData: [],
      centerDialogVisible: false,
      multipleSelection: [],
      form: {
        activityTitle: "",
        commentStatus: "",
        schoolName: ""
      },
      confirmation: {}
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
  computed: {
    ...mapState("login", {
      identity: state => state.identity || {}
    })
  },
  created() {
    this.getDatas();
    if(this.identity=='13') this.active = 2
    else this.active = 3
  },
  methods: {
    // 重置分页
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getDatas();
    },
    // 获取列表数据
    async getDatas() {
      this.isLoading = true;
      const formList = Object.assign({}, this.form);
      const res = await activityWtAudit(formList, this.pages);

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
    changeSelection(val) {
      this.multipleSelection = val;
    },
    overshow() {
      if (!this.multipleSelection.length) {
        this.$message({
          message: '最少要选择一个活动',
          type: "warning"
        });
        return
      }
      this.confirmActivity(true)
    },
    confirmActivity(isBatch) {
      let ids = [];
      if (isBatch) {
        this.multipleSelection.forEach(v => {
          ids.push(v.id);
        });
      } else {
        ids = [this.confirmation.activityId];
      }
      let txt = ''
      if(this.identity=='13') txt = "确认活动审核通过吗？确认后活动将提交教育局审核。";
      else txt = "确认活动审核通过吗？确认后学校、基地/机构将遵照确认书开展实践活动。";
      const h = this.$createElement;
      this.$msgbox({
        title: "",
        message: h("p", { style: "padding: 30px 3px" }, [h("span", null, txt)]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "确认中...";
            confirmActivity({ ids: ids }).then(res => {
              try {
                let _datas = res.data;
                if (_datas.code == 200) {
                  this.$message({
                    message: "确认活动成功",
                    type: "success"
                  });
                  this.centerDialogVisible = false;
                  done();
                  this.getDatas();
                } else {
                  this.$message({
                    message: _datas.msg || `确认活动失败`,
                    type: "error"
                  });
                  done();
                }
              } catch (err) {
                console.log(err);
              }finally {
                instance.confirmButtonLoading = false;
              }
            });
          } else {
            done();
          }
        }
      })
        .then(action => {})
        .catch(() => {});
    },
    show(data) {
      cbookView({ activityId: data.data.id }).then(res => {
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
  }
};
</script>
<style lang='scss' scoped>
.start-stups {
  background-color: rgba(242, 242, 242, 1);
  text-align: center;
  height: 50px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 0 10px;
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
      margin-top: 10px;
      margin-right: 10px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      color: #ccc;
      border: 2px solid #ccc;
      border-radius: 50%;
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
      width: 90px;
      vertical-align: middle;
    }
    .active {
      border-color: #000;
      color: #000;
    }
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
.print_tips {
  color: #d9001b;
}
</style>
