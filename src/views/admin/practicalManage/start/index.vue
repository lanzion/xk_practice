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
        <template slot-scope="scope">{{scope.row.parentName+'>'+scope.row.childrenName}}</template>
      </el-table-column>
      <el-table-column prop="title" label="基地/机构" align="center" show-overflow-tooltip />
      <el-table-column prop="courseDesigner" label="发布教育局" align="center" show-overflow-tooltip></el-table-column>
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
    <el-dialog title="发起课程活动" :visible.sync="centerDialogVisible" width="60%" center>
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

      <div class="center">
        <div class="center-title">课程信息</div>

        <el-row :gutter="20">
          <el-col :span="8">
            <span>课程分类:</span>
            <span>{{courseinfo.parentName+'>'+courseinfo.childrenName}}</span>
          </el-col>
          <el-col :span="8">
            <span>适合学段:</span>
            <span>{{courseinfo.fit|filterFit}}</span>
          </el-col>
          <el-col :span="8">
            <span>基地/机构:</span>
            <span>{{courseinfo.baseinfoId}}</span>
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
            <span>{{baseInfo.baseInfo.schoolName}}</span>
          </el-col>
          <el-col :span="8">
            <span>学校联系人:</span>
            <span>{{baseInfo.baseInfo.linkName}}</span>
          </el-col>
          <el-col :span="8">
            <span>联系人电话:</span>
            <span>{{baseInfo.baseInfo.phone}}</span>
          </el-col>
        </el-row>

        <el-form ref="form" class="g-form--wrap" label-width="120px" :model="form" :rules="rules">
          <el-form-item label="学校带队教师:" prop="name">
            <el-input v-model="form.name" placeholder="请输入学校指导教师"></el-input>
          </el-form-item>
          <el-form-item label="带队教师电话:" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入选修类型"></el-input>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="date">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1" v-if="istrue">
              <el-form-item label prop="resource">
                <el-radio-group v-model="form.resource">
                  <el-radio label="上午"></el-radio>
                  <el-radio label="下午"></el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="参与学生" required>
            <el-input v-model="input" @focus="gettwo" placeholder="请输入内容"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="resetForm('form')">取消</el-button>
            <el-button type="primary" @click="submitForm('form')">发起活动</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- -------------------------------------------------------------------------------------------------- -->
    <el-dialog title :visible.sync="middleDialogVisible" width="60%" center>
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
        <el-button type="primary">确定</el-button>
      </el-row>
    </el-dialog>
    <!-- -------------------------------------------------------------------------------------------- -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { courseList, getActivityTypeParent } from "@/api/resetApi";

import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";

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
      courseinfo:{},
      input: "",
      istrue: false,
      centerDialogVisible: false,
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
            message: "请填写学校指导教师",
            trigger: ["blur"]
          }
        ],
        phone: [
          {
            required: true,
            message: "请填写指导教师电话",
            trigger: ["blur"]
          }
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        resource: [{ required: true, message: "请选择时段", trigger: "change" }]
      }
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
    console.log(this.baseInfo);
  },
  watch: {
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
      const res = await courseList(formList, this.pages);

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
      this.courseinfo = res.data
      this.centerDialogVisible = true;
      this.active++;
    },
    max() {},
    // canle() {
    //     this.centerDialogVisible = false;
    //     this.active--;
    // },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          alert("submit!");
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
    popoverHide(checkedIds, checkedData) {
      console.log(checkedIds);
      console.log(checkedData);
    },
    gettwo() {
      this.middleDialogVisible = true;
    },
    getchild(data) {
      console.log(data);
      // this.getchilds = data.typelist
      this.getchilds.push(data.typelist);
    },
    quxiao() {
      this.middleDialogVisible = false;
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
</style>
