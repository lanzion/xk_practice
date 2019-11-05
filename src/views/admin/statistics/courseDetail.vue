<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <!-- <p class="table-head-title">活动主题：中小学生社会实践大课堂资源基地2019年暑期活动安排 <el-button class="fr" type="primary">数据导出</el-button></p> -->
      <p class="table-head-title">{{appendInfo.actTitle}}</p>
    </div>
    <p class="table-head-box">
      <span>{{appendInfo.schoolName}}</span>
      <span class="fr">总金额：￥{{appendInfo.allPrice}}</span>
    </p>
    <!-- 表格数据列表 -->
    <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border>
      <el-table-column prop="comeTime" align="center" label="活动时间" />
      <el-table-column prop="courseName" align="center" label="活动课程" />
      <el-table-column prop="projectName" align="center" label="服务标题" />
      <el-table-column prop="className" align="center" label="活动班级" />
      <el-table-column prop="stuNum" align="center" label="参与人数" />
      <el-table-column prop="price" align="center" label="服务金额" />
    </el-table>

    <!-- 分页 -->
    <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { getCourseDetail } from "@/api/resetApi";

import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";

export default {
  mixins: [permission, user],
  data() {
    return {
      first: true,
      appendInfo: {},
      form: {},
      listData: []
    };
  },
  computed: {},
  created() {
    const { schoolId, actId, baseinfoId, createType } = this.$route.query;
    if (schoolId && actId && baseinfoId && createType) {
      this.form.schoolId = schoolId;
      this.form.actId = actId;
      this.form.baseinfoId = baseinfoId;
      this.form.createType = createType;
      this.getDatas();
    }
  },
  watch: {},
  methods: {
    // 获取列表数据
    async getDatas() {
      this.isLoading = true;
      const res = await getCourseDetail(this.form, this.pages);

      const { entity: datas = {}, appendInfo = {} } = res.data;

      try {
        this.appendInfo = appendInfo;
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
.table-head-title {
  line-height: 40px;
  // border-bottom: 1px  dashed #eee;
  // padding-bottom: 10px;
  // margin-bottom:10px;
  color: #666;
  font-size: 14px;
}
.table-head-box {
  height: 40px;
  line-height: 40px;
  color: #666;
  font-size: 14px;
}
</style>
