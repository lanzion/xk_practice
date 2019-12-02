<template>
  <div class="start">
    <div class="start-stups">
      <div class="start-stups-col">
        <span :class="active > 0 ? 'start-stups-num active':'start-stups-num' ">1</span>
        <span :class="active > 0 ? 'start-stups-rows active':'start-stups-rows' ">学校选择课程</span>
        <span :class="active > 0 ? 'start-stups-width active':'start-stups-width' "></span>
      </div>
      <div class="start-stups-col">
        <span :class="active > 1 ? 'start-stups-num active':'start-stups-num' ">2</span>
        <span :class="active > 1 ? 'start-stups-rows active':'start-stups-rows' ">填写活动信息</span>
        <span :class="active > 1 ? 'start-stups-width active':'start-stups-width' "></span>
      </div>
      <div class="start-stups-col">
        <span :class="active > 2 ? 'start-stups-num active':'start-stups-num' ">3</span>
        <span :class="active > 2 ? 'start-stups-rows active':'start-stups-rows' ">生成活动确认书</span>
      </div>
    </div>

    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl" @submit.native.prevent>
        <el-form-item label="课程分类">
          <el-cascader v-model="form.values" :options="arr" :props="{ expandTrigger: 'hover' }"></el-cascader>
        </el-form-item>

        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入课程名称关键字" @keyup.native.enter="resetPage"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPage">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border>
      <el-table-column prop="name" label="课程名称" align="center" show-overflow-tooltip />
      <el-table-column label="课程分类" align="center" show-overflow-tooltip>
        <template
          slot-scope="scope"
        >{{scope.row.classificationParentName+'>'+scope.row.classificationChildrenName}}</template>
      </el-table-column>
      <el-table-column prop="baseInstName" label="基地/机构" align="center" show-overflow-tooltip />
      <el-table-column prop="eduName" label="发布教育局" align="center" show-overflow-tooltip></el-table-column>
      <el-table-column label="课程封面" align="center">
        <template slot-scope="scope">
          <div>
            <img :src="scope.row.cover" :style="{'width':'30px'}" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="适合学段" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{scope.row.fit|filterFit}}</span>
        </template>
      </el-table-column>
      <el-table-column label="选修类型" align="center" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.courseType|filterCode(5)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="课程时长" align="center" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.courseDuration|filterCode(6)}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" :width="operateWidth">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                        min: { callback: min },
                         max: { callback: max },
                    }"
          />
        </template>
      </el-table-column>
    </el-table>
    <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>

    <!-- -------------------------------------------------------------------------------------------------- -->
    <el-dialog title="发起课程活动" :visible.sync="centerDialogVisible" width="1070px" center>
      <div class="start-stups">
        <div class="start-stups-col">
          <span class="start-stups-num active">1</span>
          <span class="start-stups-rows active">学校选择课程</span>
          <span class="start-stups-width active"></span>
        </div>
        <div class="start-stups-col">
          <span :class="'start-stups-num active'">2</span>
          <span :class="'start-stups-rows active' ">填写活动信息</span>
          <span :class="'start-stups-width active'"></span>
        </div>
        <div class="start-stups-col">
          <span :class="'start-stups-num' ">3</span>
          <span :class="'start-stups-rows' ">生成活动确认书</span>
        </div>
      </div>

      <div class="center">
        <div class="center-title">课程信息</div>

        <el-row :gutter="20">
          <el-col :span="8">
            <span>课程分类:</span>
            <span>{{courseinfo.classificationParentName+'>'+courseinfo.classificationChildrenName}}</span>
          </el-col>
          <el-col :span="8">
            <span>适合学段:</span>
            <span>{{courseinfo.fit|filterFit}}</span>
          </el-col>
          <el-col :span="8">
            <span>基地/机构:</span>
            <span>{{courseinfo.baseInstName}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <span>课程名称:</span>
            <span>{{courseinfo.name}}</span>
          </el-col>
          <el-col :span="8">
            <span>选修类型:</span>
            <span>{{courseinfo.courseType|filterCode(5)}}</span>
          </el-col>
          <el-col :span="8">
            <span>联系人:</span>
            <span>{{123456789}}</span>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <span>课程设计者:</span>
            <span>{{courseinfo.courseDesigner}}</span>
          </el-col>
          <el-col :span="8">
            <span>课程时长:</span>
            <span>{{courseinfo.courseDuration|filterCode(6)}}</span>
          </el-col>
          <el-col :span="8">
            <span bg-purple-dark>联系电话:</span>
            <span>{{123456789}}</span>
          </el-col>
        </el-row>
      </div>

      <div class="center">
        <div class="center-title">学校及活动信息</div>

        <el-row :gutter="20">
          <el-col :span="8">
            <span>学校名称:</span>
            <span>{{courseinfo.schoolName}}</span>
          </el-col>
          <el-col :span="8">
            <span>学校联系人:</span>
            <span>{{courseinfo.schoolContactName}}</span>
          </el-col>
          <el-col :span="8">
            <span>联系人电话:</span>
            <span>{{courseinfo.schoolContactPhone}}</span>
          </el-col>
        </el-row>

        <el-form ref="form" class="g-form--wrap" label-width="120px" :model="form" :rules="rules">
          <el-form-item label="学校带队教师:" prop="name">
            <el-input v-model="form.name" placeholder="请输入学校指导教师"></el-input>
          </el-form-item>
          <el-form-item label="带队教师电话:" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入带队教师电话"></el-input>
          </el-form-item>
          <el-form-item label="活动开始时间" required>
            <el-col :span="11">
              <el-form-item prop="date">
                <el-date-picker
                  type="date"
                  value-format="yyyy-MM-dd hh:MM:ss"
                  placeholder="选择日期"
                  v-model="form.date"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1" v-if="istrue">
              <el-form-item label prop="resource">
                <el-radio-group v-model="form.resource">
                  <el-radio label="1">上午</el-radio>
                  <el-radio label="2">下午</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="参与学生" required>
            <!-- <el-input v-model="input" @focus="gettwo" placeholder="请输入内容"></el-input> -->
            <div class="stu_list" @click="gettwo">
              <el-tag
                v-for="tag in stu_id_list.gradeList"
                :key="tag.gradeId"
                closable
                type="info"
              >{{tag.gradeName}}({{tag.studentNums}}人)</el-tag>
              <el-tag
                v-for="tag in stu_id_list.stuIdList"
                :key="tag.studentId"
                closable
                type="info"
              >{{tag.ShowGradeName+tag.gradeName+tag.studentName}}</el-tag>
            </div>
            <div
              class="stu_tips"
            >已选学生人数/最大承载量：{{selectStuNum}}人 / {{courseinfo.maxCarryingCapacity}}人</div>
          </el-form-item>

          <el-form-item>
            <el-button @click="resetForm('form')">取消</el-button>
            <el-button type="primary" @click="submitForm('form')">发起活动</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog title="发起课程活动" :visible.sync="confirmDialogVisible" width="1070px" center>
      <div class="start-stups">
        <div class="start-stups-col">
          <span :class="'start-stups-num active' ">1</span>
          <span :class="'start-stups-rows active' ">学校选择课程</span>
          <span :class="'start-stups-width active' "></span>
        </div>
        <div class="start-stups-col">
          <span :class="'start-stups-num active' ">2</span>
          <span :class="'start-stups-rows active' ">填写活动信息</span>
          <span :class="'start-stups-width active' "></span>
        </div>
        <div class="start-stups-col">
          <span :class="'start-stups-num active'">3</span>
          <span :class="'start-stups-rows active'">生成活动确认书</span>
        </div>
      </div>
      <div class="confirm_center">
        <p>恭喜成功发起活动，请等待基地/机构确认。</p>
        <p>
          您可在
          <router-link :to="{path:'/practicalManage/practicalList'}">课程活动列表</router-link>随时查看活动进度。
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDialogVisible = false" plain>继续发起课程活动</el-button>
        <el-button type="primary" @click="sayBooks">查看活动确认书</el-button>
      </span>
    </el-dialog>
    <!-- -------------------------------------------------------------------------------------------------- -->
    <el-dialog title :visible.sync="middleDialogVisible" width="1070px" center>
      <el-row :gutter="100">
        <el-col :span="13">
          <span>请选择参加学生</span>
        </el-col>
        <el-col :span="8">
          <span>已选学生</span>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <organization-tree></organization-tree>
      </el-row>
      <el-row :gutter="10">
        <el-button type="info" @click="quxiao">取消</el-button>
        <el-button
          type="primary"
          @click="middleDialogVisible = false"
        >确定({{selectStuNum}}/{{courseinfo.maxCarryingCapacity}})</el-button>
      </el-row>
    </el-dialog>
    <!-- -------------------------------------------------------------------------------------------- -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { courseList, getActivityTypeParent } from "@/api/resetApi";
import {
  activityCourseList,
  activityCourseDetail,
  activityPublish
} from "@/api/newApi.js";

import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";

import { validatePhone } from "@/utils/utility/validateRule.js";

import {
  auditStatus,
  fit,
  status,
  isFree,
  courseType,
  courseDuration
} from "@/utils/utility/dict.js";
export default {
  mixins: [permission, user],
  data() {
    return {
      selectStuNum: 0,
      stu_id_list: {},
      courseinfo: {},
      input: "",
      istrue: false,
      centerDialogVisible: false,
      confirmDialogVisible: false,
      middleDialogVisible: false,
      active: 1,
      form: {
        name: "",
        phone: "",
        valueTime: "",
        arrangeStatus: "",
        courseTypeParent: "",
        isCompulsory: "",
        courseType: "",
        date: "",
        resource: ""
      },
      listData: [],
      arr: [],
      selection: [],
      rules: {
        name: [
          {
            required: true,
            message: "请填写学校带队教师",
            trigger: ["blur"]
          }
        ],
        phone: [
          {
            required: true,
            message: "请填写带队教师电话",
            trigger: ["blur"],
            validator: validatePhone
          }
        ],
        date: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        resource: [{ required: true, message: "请选择时段", trigger: "change" }]
      },
      classIdInActs: [],
      gradeIdInActs: [],
      studentIdInActs: [],
      activityId: ""
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
    }
  },
  components: {
    "organization-tree": resolve =>
      require(["@/views/admin/practicalManage/start/TreeSelect.vue"], resolve)
  },
  computed: {
    stuidlist() {
      return this.$store.state.test.stu_id_list;
    },
    ...mapState("dict", {
      sex: state => (state.sex || {}).dicList || [],
      auditStatus: state => (state.examineStatus || {}).dicList || [],
      lockStatus: state => (state.lockStatus || {}).dicList || [],
      ...mapState("login", {
        baseInfo: state => state.baseInfo || {}
      })
    })
  },
  created() {
    this.getDatas();
    this.getActivityTypeParent();
  },
  watch: {
    stuidlist: {
      handler: function(n) {
        if (this.centerDialogVisible) this.selectStu(n);
      }
    },
    centerDialogVisible: {
      handler(n) {
        if (!n) {
          this.selectStuNum = 0;
          this.stu_id_list = {};
          this.classIdInActs = [];
          this.gradeIdInActs = [];
          this.studentIdInActs = [];
          this.$store.commit("changeastu_id_list", null);
        }
      }
    },
    "form.date": {
      handler(newval) {
        if (newval) {
          this.istrue = true;
        } else {
          this.istrue = false;
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapActions("dict", ["getDataDict"]),
    // 重置分页
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getDatas();
    },
    // 获取列表数据
    async getDatas() {
      this.isLoading = true;
      const formList = Object.assign({}, this.form);
      const res = await activityCourseList(formList, this.pages);
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
    getActivityTypeParent() {
      getActivityTypeParent({})
        .then(res => {
          const datas = res.data;
          console.log(datas);
          if (datas) {
            let arrBox = [];
            datas.typelist.forEach(o => {
              let arr = o.dicDetailList.map(k => {
                return {
                  value: k.code,
                  label: k.name
                };
              });
              arrBox.push({
                value: o.code,
                label: o.name,
                children: arr
              });
            });

            this.arr = arrBox;
          }
        })
        .finally(() => {});
    },
    min(res) {
      let id = res.data.id;
      // 获取课程详情
      activityCourseDetail({ id }).then(res => {
        let _data = res.data;
        if (_data.code == 200) {
          this.courseinfo = _data.entity;
          this.centerDialogVisible = true;
          // this.active = 1;
        } else {
          this.$message({
            message: res.data.msg || `加载失败`,
            type: "error"
          });
        }
      });
    },
    max() {},
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (!this.selectStuNum) {
            this.$message.error("请选择参与学生");
            return;
          } else if (this.selectStuNum > this.courseinfo.maxCarryingCapacity) {
            this.$message.error("参与学生超过最大承载量");
            return;
          }
          let data = {
            courseId: this.courseinfo.id,
            schoolContactPersName: this.courseinfo.schoolContactName,
            schoolContactPersPhone: this.courseinfo.schoolContactPhone,
            schoolGuideTeacherName: this.form.name,
            schoolGuideTeacherPhone: this.form.phone,
            gmtStDate: this.form.date,
            stDayAmOrPm: this.form.resource,
            studentIdInActs: this.studentIdInActs,
            gradeIdInActs: this.gradeIdInActs,
            classIdInActs: this.classIdInActs
          };
          activityPublish(data).then(res => {
            try {
              let data = res.data;
              console.log(res);
              if (data.code == 200) {
                this.activityId = data.appendInfo.id;
                this.confirmDialogVisible = true;
                this.centerDialogVisible = false;
              } else {
                this.$message({
                  message: res.data.msg || `发起活动失败`,
                  type: "error"
                });
              }
            } catch (err) {
              console.log(err);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(form) {
      this.active--;
      this.$refs[form].resetFields();
      this.centerDialogVisible = false;
    },
    gettwo() {
      this.middleDialogVisible = true;
    },
    getchild(data) {
      console.log(data);
      this.getchilds.push(data.typelist);
    },
    quxiao() {
      this.middleDialogVisible = false;
    },
    sayBooks() {
      this.$router.push({
        path: "/practicalManage/practicalList",
        query: { activityId: this.activityId }
      });
    },
    selectStu(data) {
      this.selectStuNum = 0;
      this.classIdInActs = [];
      this.gradeIdInActs = [];
      this.studentIdInActs = [];
      let list = sessionStorage.getItem("stu_id_list");
      this.stu_id_list = data;
      this.stu_id_list.gradeList.forEach(v => {
        this.selectStuNum += v.studentNums;
        if (v.showStu) this.classIdInActs.push(v.gradeId);
        else this.gradeIdInActs.push(v.gradeId);
      });
      this.stu_id_list.stuIdList.forEach(v => {
        this.studentIdInActs.push(v.studentId);
      });
      this.selectStuNum += this.stu_id_list.stuIdList.length;
      // this.middleDialogVisible = false;
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
  .start-stups-col {
    display: inline-block;
    margin-right: 10px;
    width: 248px;
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
.center {
  border-bottom: 1px solid #ccc;
  padding-bottom: 20px;
  box-sizing: border-box;
  .center-title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: 600;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.changename {
  width: 45%;
  margin-right: 30px;
  height: 500px;
  border: 1px solid #ccc;
  padding: 20px;
  box-sizing: border-box;
}
.stu_list {
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 0 5px;
  min-height: 35px;
}
.stu_tips {
  color: #ccc;
}
.confirm_center {
  text-align: center;
  padding: 80px 0;
  line-height: 30px;
  a {
    color: #008aff;
    text-decoration: underline;
  }
}
</style>
