<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" :model="form" class="fl" @submit.native.prevent>
        <el-form-item style="marginBottom:10px;">
          <el-form-item>
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="resetPage">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
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
    </div>
    <!-- 表格数据列表 -->
    <el-table
      ref="table"
      :data="listData"
      stripe
      align="center"
      v-loading="isLoading"
      border
      :header-cell-style="{'background-color':'#eee', 'color':'#666'}"
    >
      <el-table-column prop="title" label="标题" align="center" />
      <el-table-column label="描述" width="300">
        <template slot-scope="scope">
          <div class="elips-two" v-html="scope.row.remark" style="-webkit-box-orient: vertical;"></div>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" align="center" label="创建时间" />
      <el-table-column prop="browseNum" align="center" label="浏览次数" />
      <el-table-column label="开启状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status=='B'">关闭</span>
          <span v-else-if="scope.row.status=='A'">开启</span>
        </template>
      </el-table-column>
      <el-table-column prop="createName" label="发布人" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                       
                         edit: { query: { id: 'id'} },
                          del: { callback: doDel },
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
import { announcementList, announcementDel } from "@/api/resetApi";

import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";

export default {
  mixins: [permission, user],
  data() {
    return {
      form: {
        title: ""
      },
      listData: [],
      stateValue: "",
    };
  },
  computed: {},
  created() {
    this.getDatas();
  },
  watch: {},
  methods: {
    ...mapActions("dict", ["getDataDict"]),
    // 重置分页
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getDatas();
    },

    // 获取列表数据
    async getDatas() {
      const formList = Object.assign({}, this.form);
      this.isLoading = true;
      const res = await announcementList(formList, this.pages);

      const { entity: datas = {} } = res.data;

      try {
        this.listData = datas.resultData || [];
        this.totalNum = datas.totalNum || 0;
        this.isLoading = false;
      } catch (error) {
        this.listData = [];
      } finally {
        this.isLoading = false;
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
            announcementDel(params).then(res => {
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
.school-list-wrap {
  /deep/ .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}
.elips-two {
  display: -webkit-box;
  text-align: left;
  word-break: break-all;
  -webkit-line-clamp: 3;
  overflow: hidden;
  max-height: 66px;
}
</style>
