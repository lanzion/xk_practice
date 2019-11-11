<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl" @submit.native.prevent>
        <el-form-item label="适合学段">
          <el-select v-model="form.fit" placeholder="请选择学段" @change="resetPage" clearable>
            <el-option v-for="item in fit" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程类型">
          <el-select v-model="form.courseType" placeholder="请选择状态" @change="resetPage" clearable>
            <el-option
              v-for="item in courseType"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="form.name" placeholder="所属课程名称" @keyup.native.enter="resetPage"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPage">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 表格数据列表 -->
    <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border>
      <el-table-column prop="name" label="课程名称" align="center" sortable show-overflow-tooltip />
      <el-table-column label="课程指标" align="center" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.parentName+'>'+scope.row.childrenName}}</template>
      </el-table-column>
      <el-table-column label="适合学段" align="center" width="120" sort-by="fit">
        <template slot-scope="scope">
          {{scope.row.fit|filterFit}}
        </template>
      </el-table-column>
      <el-table-column prop="createDate" align="center" label="创建时间" />
      <el-table-column prop="courseDesigner" align="center" label="课程设计者" />
      <!-- <el-table-column prop="statusNum" align="center" label="排课状态" /> -->
      <el-table-column label="课程类型" align="center" width="100">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.courseType === 'A' ? 'success' : (scope.row.courseType === 'B'?'warning':'primary')"
            disable-transitions
          >{{scope.row.courseType === 'A' ? '必修' : (scope.row.courseType === 'B'?'选修':'开放式')}}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="课程状态" align="center" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="changeStatus(scope.row)"
            >
          </el-switch>
        </template>
      </el-table-column>-->

      <el-table-column label="操作" align="center" :width="operateWidth">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                        detail: { query: { id: 'id'} },
                         edit: { query: { id: 'id'} },
                         list: { query: { id: 'id'} },
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
import { courseList, courseEdit } from "@/api/resetApi";

import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import { fit, courseType } from "@/utils/utility/dict.js";

export default {
  mixins: [permission, user],
  data() {
    return {
      fit: fit,
      courseType: courseType,
      form: {
        name: "",
        fit: "",
        courseType: ""
      },
      listData: []
    };
  },
  computed: {
    ...mapState("dict", {
      sex: state => (state.sex || {}).dicList || [],
      auditStatus: state => (state.examineStatus || {}).dicList || [],
      lockStatus: state => (state.lockStatus || {}).dicList || []
    })
  },
  created() {
    this.getDatas();
  },
  filters:{
    filterFit(val){
      let txt = "";
      if(val) txt = val.replace(/A/g, "小学").replace(/B/g, "初中").replace(/C/g, "高中");
      return txt;
    }
  },
  watch: {},
  methods: {
    ...mapActions("dict", ["getDataDict"]),
    // 重置分页
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getDatas();
    },
    changeStatus(val) {
      courseEdit(val).then(res => {
        const datas = res.data;
        if (datas == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        } else {
          this.$message({
            message: datas.msg,
            type: "warning"
          });
          val.status ? (val.status = 0) : (val.status = 1);
        }
      });
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
