<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl" @submit.native.prevent>
        <el-form-item label="课程分类">
          <el-cascader v-model="form.values" :options="arr" :props="{ expandTrigger: 'hover' }"></el-cascader>
        </el-form-item>

        <el-form-item label="基地/机构所属地区">
          <region type="object" @change="getaddres" class="regions"></region>
        </el-form-item>

        <el-form-item label="适合学段">
          <el-select v-model="form.fit" placeholder="请选择学段" @change="resetPage" clearable>
            <el-option
              v-for="item in fit"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="选修类型">
          <el-select v-model="form.courseType" placeholder="请选择状态" @change="resetPage" clearable>
            <el-option
              v-for="item in courseType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择" @change="resetPage" clearable>
            <el-option
              v-for="item in status"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="form.name"
            placeholder="请输入课程名称关键字"
            @keyup.native.enter="resetPage"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPage">搜索</el-button>
        </el-form-item>
        <section class="g-table--head clearfix fr">
          <head-operate
            class="fr"
            :items="headBtnGroup"
            v-bind="{
                    display: { callback: display },
                    none: { callback: none },
                }"
          />
        </section>
      </el-form>
    </div>

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

      <el-table-column label="已发起活动场次" align="center">
        <template slot-scope="scope">{{scope.row.activityNum}}场</template>
      </el-table-column>

      <!-- <el-table-column prop="courseDesigner" label="发布者" align="center"></el-table-column> -->

      <el-table-column prop="createDate" align="center" label="发布时间" show-overflow-tooltip/>

      <el-table-column label="状态" align="center">
        <template slot-scope="scope"><span>{{scope.row.status|filterCode(3)}}</span></template>
      </el-table-column>

      <el-table-column label="操作" align="center" :width="operateWidth">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                        detail: { query: { id: 'id'} },
                         edit: { visible: identity == 6 || identity == 7 || identity == 10 , query: { id: 'id'} },
                         shield:{callback:shield}
                    }"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>
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
      fit:fit,
      courseType:courseType,
      status:status,
      form: {
        // name: "",
        // arrangeStatus: "",
        // courseTypeParent: "",
        // isCompulsory: "",
        // courseType: ""
      },
      listData: [],
      arr: [],
      selection: [],
    };
  },
  computed: {
    ...mapState("dict", {
      sex: state => (state.sex || {}).dicList || [],
      auditStatus: state => (state.examineStatus || {}).dicList || [],
      lockStatus: state => (state.lockStatus || {}).dicList || []
    }),
    ...mapState("login", {
      identity: state => state.identity || {}
    })
  },
  created() {
    this.getDatas();
    this.getActivityTypeParent();
  },
  watch: {},
  beforeMount() {
    // console.log(this.identity);
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
    changeSelection(val) {
      val.forEach(o => (o.isId = 1));
      this.selection = val;
    },
    shield() {
      this.over();
    },
    getaddres() {},
    display() {
      if (this.selection.length) {
      } else {
        this.$message({
          message: "请至少选择一条数据!",
          type: "warning"
        });
      }
    },
    none() {
      if (this.selection.length) {
        this.over();
      } else {
        this.$message({
          message: "请至少选择一条数据!",
          type: "warning"
        });
      }
    },
    over() {
      this.$confirm(
        "确定屏蔽课程吗？屏蔽后前台首页、课程列表将无法看到此课程, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "屏蔽成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消屏蔽"
          });
        });
    }
  }
};
</script>

<style lang='scss' scoped>
@import "~@/assets/css/mixin/core.scss";

.lockStatus {
  &::before {
    font-size: 18px;
    vertical-align: sub;
  }
  @each $color-key, $color-value in $--lock-status-color {
    &.__status-#{$color-key} {
      color: $color-value;
    }
  }
}
.auditStatus {
  @each $color-key, $color-value in $--examine-status-color {
    &.__status-#{$color-key} {
      color: $color-value;
    }
  }
}
</style>
