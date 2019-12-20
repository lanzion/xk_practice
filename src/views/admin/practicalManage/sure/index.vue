<template>
  <div class="sure">
    <div class="tab" v-if="identity==6||identity==7||identity==10">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">课程活动</el-menu-item>
        <el-menu-item index="2">开放式活动</el-menu-item>
      </el-menu>
    </div>
    <div class="start-stups">
      <div class="start-title">活动进度:</div>
      <div class="start-stups-col" v-for="(item,index) in progress" :key="index">
        <span :class="active > index ? 'start-stups-num active':'start-stups-num' ">{{index+1}}</span>
        <span :class="active > index ? 'start-stups-rows active':'start-stups-rows' ">{{item}}</span>
        <span
          :class="active > index ? 'start-stups-width active':'start-stups-width' "
          v-if="index!=progress.length-1"
        ></span>
      </div>
    </div>

    <section class="g-table--head clearfix fr">
      <head-operate
        class="fr"
        :items="headBtnGroup"
        v-bind="{
                    overshow:{visible:activeIndex=='1', callback: overshow },
                    passAct:{visible:activeIndex=='2',callback:passAct},
                    noPassAct:{visible:activeIndex=='2',callback:noPassAct},
                }"
      />
    </section>
    <!-- 课程活动 -->
    <el-table
      ref="table"
      :data="listData"
      stripe
      align="center"
      v-loading="isLoading"
      border
      @selection-change="changeSelection"
    >
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column
        v-for="(col, index) in rowHeader"
        :key="index"
        :prop="col.prop"
        :label="col.label"
        show-overflow-tooltip
        align="center"
      >
        <template slot-scope="scope" v-if="listData.length">
          <my-render
            v-if="col.render"
            :row="scope.row"
            :render="col.render(scope)"
            :classTxt="col.classTxt?col.classTxt(scope):''"
          ></my-render>
          <div v-else>{{scope.row[col.prop]}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" :width="operateWidth">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                         show: {visible:activeIndex=='1', callback: show },
                         confirmOpenAct: {visible:activeIndex=='2', query: { id: 'id'} },
                    }"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 开放式活动 -->

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
        <p
          class="print_tips"
          v-if="!(confirmation.baseInstAuditStatus==1&&confirmation.eduAgencyAuditStatus==1)"
        >基地/机构、教育局确认后方可打印</p>
      </div>
    </el-dialog>
    <el-dialog title :visible.sync="offDialogVisible" width="500px">
      <div class="visble_conter" v-if="openActNotPass.length">
        <div class="visble_title">
          <span>*</span> 请选择屏蔽原因：
        </div>
        <div class="radio_list">
          <el-row>
            <el-col :span="8" v-for="item in openActNotPass" :key="item.id">
              <el-radio v-model="radio" :label="item.code">{{item.name}}</el-radio>
            </el-col>
          </el-row>
        </div>
        <div
          class="other"
          v-if="openActNotPass.length&&radio==openActNotPass[openActNotPass.length-1].code"
        >
          <div class="visble_title">
            <span>*</span> 屏蔽原因说明：
          </div>
          <div>
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="othertxt"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="offDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="shieidSubmi">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import { activityState } from "@/utils/utility/dict.js";
import {
  activityWtAudit,
  cbookView,
  confirmActivity,
  openActivityStayPager,
  openActivityAuditBatchAdd
} from "@/api/newApi";
import { requestDataDict } from "@/api/common.js";
import MyRender from "@/components/admin/common/MyRender.vue";
import {
  auditStatus,
  fit,
  status,
  isFree,
  courseType,
  courseDuration
} from "@/utils/utility/dict.js";
let _filterCode = (val, num) => {
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
};
export default {
  name: "sure",
  mixins: [permission, user],
  components: {
    "my-render": MyRender
  },
  data() {
    return {
      progress: [
        "学校发起活动",
        "基地/机构确认活动",
        "教育局确认活动",
        "开展实践活动",
        "活动评价"
      ],
      activeIndex: "1",
      pos: "0",
      active: 2,
      activityState: activityState,
      listData: [],
      centerDialogVisible: false,
      offDialogVisible: false,
      openActNotPass: [],
      radio: "",
      othertxt: "",
      multipleSelection: [],
      form: {
        activityTitle: "",
        commentStatus: "",
        schoolName: ""
      },
      confirmation: {},
      openActHeader: [
        {
          prop: "name",
          label: "活动名称"
        },
        {
          prop: "typeParentName",
          label: "活动分类"
        },
        {
          prop: "baseInfoName",
          label: "基地/机构"
        },
        {
          prop: "enrollDate",
          label: "报名时间",
          render: params => {
            return params.row.enrollStartDate + "至" + params.row.enrollEndDate;
          }
        },
        {
          prop: "activityDate",
          label: "活动时间",
          render: params => {
            return (
              params.row.activityStartDate +
              "至" +
              params.row.activityEndDate +
              " 共" +
              params.row.enrollAllNum +
              "场"
            );
          }
        },
        {
          prop: "enrollMaxNum",
          label: "每场人数限制",
          render: params => {
            return params.row.enrollMaxNum + "人";
          }
        },
        {
          prop: "free",
          label: "是否收费",
          render: params => {
            return params.row.free ? params.row.price + "元" : "免费";
          }
        },
        {
          prop: "createDate",
          label: "活动发起时间"
        }
      ]
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
    }),
    rowHeader() {
      if (this.activeIndex == 1) {
        return this.ActHeader;
      } else if (this.activeIndex == 2) {
        return this.openActHeader;
      }
    },
    ActHeader() {
      let arr = [
        {
          prop: "courseName",
          label: "课程名称"
        },
        {
          prop: "classificationParentName",
          label: "课程分类"
        },
        {
          prop: "baseInstName",
          label: "基地/机构"
        },
        {
          prop: "schoolName",
          label: "参与学校"
        },
        {
          prop: "startTime",
          label: "活动开始时间"
        },
        {
          prop: "courseDuration",
          label: "活动时长",
          render: params => {
            return _filterCode(params.row.courseDuration, "6");
          }
        },
        {
          prop: "gmtCreate",
          label: "发起活动时间"
        },
        {
          prop: "actJoinStuNums",
          label: "学生人数"
        },
        {
          prop: "baseInstAuditStatus",
          label: "基地确认状态",
          classTxt: params => {
            return params.row.baseInstAuditStatus ? "statusActive" : "";
          },
          render: params => {
            return params.row.baseInstAuditStatus ? "已确定" : "未确定";
          }
        }
      ];
      if (this.identity == 13) {
        arr.splice(2, 1);
        arr.splice(arr.length - 1, 1);
      }
      return arr;
    }
  },
  created() {
    this.getDatas();
    if (this.identity == "13") {
      this.active = 2;
    } else {
      this.active = 3;
      this.getDataDict("CAUSE_PARENT");
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.listData = [];
      this.activeIndex = key;
      if (key == 1) {
        this.progress = [
          "学校发起活动",
          "基地/机构确认活动",
          "教育局确认活动",
          "开展实践活动",
          "活动评价"
        ];
        this.active = 3;
      } else {
        this.progress = [
          "基地/机构发起活动",
          "教育局确认活动",
          "开展实践活动",
          "活动评价"
        ];
        this.active = 2;
      }
      this.resetPage();
    },
    async getDataDict(groupCode) {
      const res = await requestDataDict({ groupCode });
      const datas = res.data.entity || {};
      this.openActNotPass = datas.dicList;
    },
    // 重置分页
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getDatas();
    },
    // 获取列表数据
    async getDatas() {
      this.isLoading = true;
      let head;
      if (this.activeIndex == 1) head = activityWtAudit;
      else head = openActivityStayPager;
      const formList = Object.assign({}, this.form);
      const res = await head(formList, this.pages);

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
          message: "最少要选择一个活动",
          type: "warning"
        });
        return;
      }
      this.confirmActivity(true);
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
      let txt = "";
      if (this.identity == "13")
        txt = "确认活动审核通过吗？确认后活动将提交教育局审核。";
      else
        txt =
          "确认活动审核通过吗？确认后学校、基地/机构将遵照确认书开展实践活动。";
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
    },
    passAct() {
      if (!this.multipleSelection.length) {
        this.$message({
          message: "最少要选择一个活动",
          type: "warning"
        });
        return;
      }
      let param = {
        auditStatus: "2",
        auditList: []
      };
      this.multipleSelection.forEach(v => {
        let obj = { activityId: v.id };
        param.auditList.push(obj);
      });
      const h = this.$createElement;
      this.$msgbox({
        title: "",
        message: h("p", { style: "padding: 30px 3px" }, [
          h(
            "span",
            null,
            "确认活动通过吗？确认后基地/机构将遵照确认书开展活动。"
          )
        ]),
        showCancelButton: true,
        confirmButtonText: "确定通过",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "确认中...";
            openActivityAuditBatchAdd(param).then(res => {
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
        .catch(() => {});
    },
    noPassAct() {
      if (!this.multipleSelection.length) {
        this.$message({
          message: "最少要选择一个活动",
          type: "warning"
        });
        return;
      }
      this.offDialogVisible = true;
    },
    shieidSubmi() {
      if(!this.radio) return
      if (this.radio ==this.openActNotPass[this.openActNotPass.length - 1].code &&!this.othertxt) {
        this.$message({
          message: "请选择屏蔽原因或填写屏蔽原因",
          type: "warning"
        });
        return;
      }
      let param = {
        auditStatus: "3",
        auditList: [],
        causeCode: this.radio,
        content: this.othertxt
      };
      this.multipleSelection.forEach(v => {
        let obj = {activityId: v.id,};
        param.auditList.push(obj);
      });
      openActivityAuditBatchAdd(param).then(res => {
        try {
          let _datas = res.data;
          if (_datas.code == 200) {
            this.$message({
              message: "不通过活动成功",
              type: "success"
            });
            this.centerDialogVisible = false;
            this.getDatas();
          } else {
            this.$message({
              message: _datas.msg || `不通过活动失败`,
              type: "error"
            });
          }
        } catch (err) {
          console.log(err);
        } finally {
          this.offDialogVisible = false;
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
.sure {
  /deep/ .statusActive {
    color: #70b603;
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
.tab {
  margin-top: 20px;
}
.visble_conter {
  line-height: 30px;
  .visble_title {
    color: #000;
    span {
      color: #d9001b;
    }
  }
}
</style>
