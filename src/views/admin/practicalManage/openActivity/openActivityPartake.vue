<template>
  <div class="openactivitypartake">
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        <el-form-item label="活动分类">
          <el-select v-model="form.activityStatus" placeholder="请选择" clearable>
            <el-option
              v-for="item in activityStatus"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="是否收费">
          <el-select v-model="form.activityStatus" placeholder="请选择" clearable>
            <el-option
              v-for="item in activityStatus"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-input v-model="form.name" placeholder="请输入活动名称"></el-input>
        </el-form-item>

        <el-button type="primary" @click="getDatas" plain>搜索</el-button>
      </el-form>
    </div>
    <iTable :data="listData" :col-configs="colConfigs" :loading="true" row-key="id"></iTable>
    <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>
  </div>
</template>

<script>
import iTable from "@/components/admin/common/iTable";
import { mapState, mapActions } from "vuex";
import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
export default {
  components: { iTable },
  mixins: [permission, user],
  data() {
    return {
      activityStatus: [],
      form: {},
      colConfigs: [
          { slot: "selection" },
        { prop: "name", label: "活动名称" },
        { prop: "name", label: "报名时间" },
        { prop: "name", label: "活动场次" },
        { prop: "name", label: "是否已参加" },
        { prop: "name", label: "学生评价内容" }
      ],
      listData: []
    };
  },
  methods: {
    getDatas() {},
  }
};
</script>

<style lang="scss" scoped>
</style>