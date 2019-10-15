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
          <el-input v-model="keyword" placeholder="请填写服务名称" @keyup.native.enter="resetPage"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="baseId" filterable placeholder="请选择基地">
            <el-option v-for="item in baseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
      <el-table-column prop="auditStatus" label="审核状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.auditStatus == 'A'">通过</span>
          <span v-if="scope.row.auditStatus == 'B'">不通过</span>
          <span v-if="scope.row.auditStatus == 'C'||!scope.row.auditStatus">未审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="开启状态" align="center">
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.status == 'A'">开启</span>
          <span v-else>关闭</span>-->
          <el-switch
            v-model="scope.row.status"
            active-value="A"
            inactive-value="B"
            @change="changeStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                        del: { callback: doDel },
                        detail: { query: { id: 'id'} },
                        edit: { query: { id: 'id'} },
                      
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
import {
  baseinfoList,
  delBaseInfo,
  baseinfoEdit,
  BaseList
} from "@/api/newApi";

import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import { log } from "util";

export default {
  mixins: [permission, user],
  data() {
    return {
      listData: [],
      baseList: [],
      keyword: "",
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
        }
      ],
      stateValue: "",
      baseId: ""
    };
  },
  computed: {
    // ...mapState('dict', {
    //     subject: state => (state.subject || {}).dicList || [],
    //     auditStatus: state => (state.examineStatus || {}).dicList || [],
    //     lockStatus: state => (state.lockStatus || {}).dicList || []
    // })
  },
  created() {
    this.getDatas();
    this.getBaseList();
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
      const res = await baseinfoList(
        { 
          auditStatus: this.stateValue, 
          title: this.keyword,
          baseId:this.baseId 
        },
        this.pages
      );

      const { entity: datas = {} } = res.data;

      try {
        this.datas = datas.resultData || [];
        this.listData = datas.resultData || [];
        this.totalNum = datas.totalNum || 0;
      } catch (error) {
        this.listData = [];
        this.totalNum = 0;
      } finally {
        this.isLoading = false;
      }
    },
    // 获取基地列表
    async getBaseList() {
      const res = await BaseList({}, { pageNum: 1, pageSize: 9999 });
      const { entity: datas = {} } = res.data;
      try {
        this.baseList = datas.resultData || [];
      } catch (err) {
        console.log(err);
      }
    },
    // 删除操作
    doDel({ data }) {
      const items = data;
      if (items) {
        const params = { id: items.id };
        this.$confirm(`确认删除该数据吗?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delBaseInfo(params).then(res => {
              const { code, msg } = res.data;
              if (code === 200) {
                this.$message({
                  message: `删除成功`,
                  type: "success"
                });

                this.getDatas();
              } else {
                this.$message({
                  message: msg || "操作失败",
                  type: "error"
                });
              }
            });
          })
          .catch(() => {});
      } else {
        this.$message({
          message: "请至少选择一条数据!",
          type: "warning"
        });
      }
    },
    // 修改状态
    changeStatus(val) {
      baseinfoEdit(val).then(res => {
        const datas = res.data;
        if (datas.code == 200) {
          this.$message({
            message: "修改成功",
            type: "warning"
          });
        } else {
          this.$message({
            message: datas.msg,
            type: "warning"
          });
          val.status == "A" ? (val.status = "B") : (val.status = "A");
        }
      });
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
</style>
