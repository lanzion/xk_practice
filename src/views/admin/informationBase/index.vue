<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" :model="search" class="fl" @submit.native.prevent>
        <el-form-item style="marginBottom:10px;">
          <el-form-item>
            <el-input v-model="keyword" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="getDatas">搜索</el-button>
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
      @selection-change="changeSelection"
      border
      :header-cell-style="{'background-color':'#eee', 'color':'#666'}"
    >
      <el-table-column prop="title" label="标题" show-overflow-tooltip/>
      <el-table-column label="描述" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="elips-two" style="-webkit-box-orient: vertical;">{{scope.row.remark}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="发布时间" align="center" />
      <el-table-column prop="browseNum" label="浏览次数" align="center" />
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
      <el-table-column prop="createName" label="发布人" />
      <el-table-column label="操作" align="center" :width="operateWidth">
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

    <!-- 重置密码弹窗 -->
    <el-dialog width="500px" title="重置密码" :visible.sync="passwordVisible">
      <reset-password-form ref="password" :ids.sync="selection" @close="close"></reset-password-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { informationDel,informationEdit } from "@/api/newApi";

import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import { informationList } from "@/api/newApi";

const search = {
  sex: "",
  schoolId: "",
  provinceId: "",
  cityId: "",
  areaId: "440106",
  auditStatus: "",
  lockStatus: ""
};

export default {
  mixins: [permission, user],
  data() {
    return {
      activityTime: "",
      keyword: "",
      search: { ...search },
      selection: [],
      listData: [],
      detailVisible: false, // 详情弹窗是否可见
      detail: {
        disabled: false,
        id: ""
      }, // 详情组件传参
      fpStates: [
        {
          value: "-1",
          label: "全部状态"
        },
        {
          value: "0",
          label: "未查看"
        },
        {
          value: "1",
          label: "已查看"
        }
      ],
      stateValue: ""
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
  watch: {
    search: {
      handler: function() {
        this.$set(this.pages, "pageNum", 1);
        this.getDatas();
      },
      deep: true
    },
    pages: {
      handler: function() {
        this.getDatas();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions("dict", ["getDataDict"]),
    goDetail() {
      this.$router.push({ path: "/informationBase/list/create" });
    },
    // 重置搜索表单
    resetForm() {
      this.search = { ...search };
    },

    // 重置分页
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getDatas();
    },

    // 记录表格选中项
    changeSelection(val) {
      this.selection = val;
    },

    // 获取列表数据
    async getDatas() {
      this.isLoading = true;
      const res = await informationList(
        { orgType: "B", title: this.keyword },
        this.pages
      );

      const { entity: datas = {} } = res.data;

      try {
        const datas = res.data.entity;
        this.totalNum = datas.totalNum || 0;
        this.listData = datas.resultData || [];
      } catch (error) {
        this.datas = [];
      } finally {
        this.isLoading = false;
      }
    },

    // 判断是否未审
    isnAudit(item) {
      return Number(item.auditStatus) === 0;
    },

    // 添加/编辑/查看详情操作
    doDetail({ model, data }) {
      this.detail = {
        disabled: model === "detail",
        id: (data && data.id) || ""
      };

      this.detailVisible = true;
    },

    // 获取详情数据
    getDetailDatas() {
      this.$refs.detail.getDetailData();
    },

    // 重置弹窗详情
    resetDetail(component) {
      this.$refs[component].reset();
      this.$set(this.detail, "id", "");
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
            informationDel(params).then(res => {
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
    changeStatus(val) {
      informationEdit(val).then(res => {
        const datas = res.data;
        if (datas.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
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
.elips-two {
  display: -webkit-box;
  text-align: left;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
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
.school-list-wrap {
  /deep/ .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
}
</style>
