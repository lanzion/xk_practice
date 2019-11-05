<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" :model="form" class="fl" @submit.native.prevent>
        <!-- <el-form-item label="活动类型">
                    <el-select v-model="form.actype"  filterable clearable placeholder="全部类型">
                        <el-option
                        v-for="item in fpStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
        </el-form-item>-->
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入学生姓名"></el-input>
        </el-form-item>
        <el-button type="primary" plain @click="resetPage">搜索</el-button>
      </el-form>
    </div>

    <!-- 表格数据列表 -->
    <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border>
      <el-table-column prop="schoolName" align="center" label="学校" />
      <el-table-column prop="courseName" align="center" label="课程名称" />
      <el-table-column prop="section" align="center" label="学段" />
      <el-table-column prop="name" align="center" label="学生" />
      <el-table-column prop="selfScore" align="center" label="自评分" />
      <el-table-column prop="othAvgScore" align="center" label="他评分" />
      <el-table-column prop="teacherScore" align="center" label="教师评分" />
    </el-table>
    <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>
  </div>
</template>

<script>
import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import { getevalList } from "@/api/resetApi";

export default {
  mixins: [permission, user],
  data() {
    return {
      listData: [],
      form: {
        name: ""
      },
      fpStates: [],
      stateValue: ""
    };
  },
  computed: {},
  created() {
    this.getDatas();
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

      const res = await getevalList(formList, this.pages);

      const { entity: datas = {} } = res.data;

      try {
        this.listData = datas.resultData || [];
        this.totalNum = datas.totalNum || 0;
      } catch (error) {
        this.datas = [];
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
