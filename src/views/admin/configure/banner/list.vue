<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        <el-form-item>
          <el-input
            v-model="form.bannerName"
            placeholder="请输入轮播图名称"
            @keyup.native.enter="resetPage"
          ></el-input>
        </el-form-item>
        <el-button type="primary" plain @click="resetPage">搜索</el-button>
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
    <el-table
      ref="table"
      :data="listData"
      stripe
      align="center"
      v-loading="isLoading"
      border
      :header-cell-style="{'background-color':'#eee', 'color':'#666'}"
    >
      <el-table-column prop="bannerName" label="轮播名称" align="center" />
      <el-table-column label="位置" align="center" prop="bannerPosition"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
      <el-table-column prop="remark" label="备注" align="center" width="400" />
      <el-table-column prop="createName" label="添加人" align="center" />
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                         del: { callback: doDel },
                         edit: { query: { id: 'id'} },
                    }"
          />
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      :param="pages"
      :total="totalNum"
      @change="getDatas"
      :page-sizes="[10, 15, 20]"
    ></pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { templateList, templateDel } from "@/api/resetApi";

import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";

export default {
  mixins: [permission, user],
  data() {
    return {
      listData: [
        {
          id: "1",
          bannerName: "首页",
          bannerPosition: "前台",
          createName: "平台管理员",
          remark: "测试",
          createTime: "2019-09-09"
        }
      ],
      form: {
        bannerName: null
      }
    };
  },
  computed: {},
  created() {
    // this.getDatas()
  },
  watch: {},
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
      const res = await templateList(formList, this.pages);

      const { entity: datas = {} } = res.data;

      try {
        this.totalNum = datas.totalNum || 0;
      } catch (error) {
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
            templateDel(params).then(res => {
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
.elFrom {
  width: 100%;
}
</style>
