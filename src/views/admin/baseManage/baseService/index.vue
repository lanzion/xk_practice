<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        <el-form-item label="审核状态">
          <el-select v-model="stateValue" placeholder="请选择状态" @change="resetPage" clearable>
            <el-option
              v-for="item in fpStates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="keyword" placeholder="请填写服务名称" @keyup.native.enter="resetPage" ></el-input>
        </el-form-item>
        <el-button type="primary" plain @click="resetPage">搜索</el-button>
        <!-- 表头权限及统计 -->
        <section class="g-table--head clearfix fr">
          <head-operate
            class="fr"
            :items="headBtnGroup"
            v-bind="{
                    add: {},
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
      :header-cell-style="{'background-color':'#eee', 'color':'#666'}"
    >
      <el-table-column prop="title" label="服务标题" align="center" />
      <el-table-column prop="baseinfoName" label="所属基地" align="center" />
      <el-table-column prop="price" label="服务金额" align="center" />
      <el-table-column prop="personInCharge" label="负责人" align="center"></el-table-column>
      <el-table-column prop="personInChargePhone" label="联系方式" align="center" />
      <el-table-column prop="auditDate" label="审核时间" align="center" />
      <el-table-column prop="auditStatus" label="审核状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.auditStatus == 'A'">通过</span>
          <span v-if="scope.row.auditStatus == 'B'">不通过</span>
          <span v-if="scope.row.auditStatus == 'C'">未审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="auditMan" label="审核人" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                        edit: { query: { id: 'id'} }
                    }"
          /> -->
          <span class="fil_btn" @click="edit(scope.row.id)">{{filterBtn(scope.row.auditStatus)}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      :param="pages"
      :total="totalNum"
      @change="getDatas"
    ></pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { baseinfoList } from "@/api/newApi";

import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";

export default {
  mixins: [permission, user],
  data() {
    return {
      listData: [],
      keyword: null,
      fpStates: [
        {
          value: "A",
          label: "通过"
        },
        {
          value: "B",
          label: "不通过"
        },
        {
          value: "C",
          label: "未审核"
        },
      ],
      stateValue: null
    };
  },
  computed: {
   
  },
  created() {
    this.getDatas();
  },
  watch: {
    
  },
  methods: {
    filterBtn(item){
      if(item=="A") return "详情"
      else return "审核"
    },
    edit(id){
      this.$router.push({
        path:'/baseManage/baseService/detail',
        query:{id:id}
      })
    },
    // 重置分页
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getDatas();
    },
    // 获取列表数据
    async getDatas() {
      this.isLoading = true;
      const res = await baseinfoList({auditStatus:this.stateValue,title:this.keyword}, this.pages);

      const { entity: datas = {} } = res.data;

      try {
     
        this.listData = datas.resultData || [];
        this.totalNum = datas.totalNum || 0;
      } catch (error) {
        this.listData = [];
        this.totalNum =0;
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "~@/assets/css/mixin/core.scss";
.elFrom {
  width: 100%;
}
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
.icon-famous {
  font-size: 20px;
  vertical-align: middle;
  &.is-active {
    color: $--color-secondary;
  }
}
.fil_btn{
  color: #00a8ff;
  cursor:pointer;
}
</style>
