<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        <el-form-item label="账号">
          <el-input v-model="form.account" placeholder="请输入账号" @keyup.native.enter="resetPage"></el-input>
        </el-form-item>

        <el-button type="primary" plain @click="resetPage">搜索</el-button>
        <!-- 表头权限及统计 -->
        <section class="g-table--head clearfix fr">
          <head-operate
            class="fr"
            :items="headBtnGroup"
            v-bind="{
                    add: {},
                    reset:{ callback: popupPassword }
                }"
          />
        </section>
      </el-form>
    </div>
    <el-table
      @selection-change="handleSelectionChange"
      ref="table"
      :data="listData"
      stripe
      align="center"
      v-loading="isLoading"
      border
    >
      <el-table-column label="选择" align="center" type="selection" width="55"></el-table-column>
      <el-table-column prop="account" label="帐号" align="center" sortable show-overflow-tooltip />
      <el-table-column prop="userName" label="用户名" align="center" sortable show-overflow-tooltip />
      <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip/>
      <el-table-column prop="lockStatus" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.lockStatus == 0">开启</span>
          <span v-else>关闭</span>
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
                        detail: { query: { id: 'id',identity:'identity'} },
                        edit:{query:{id:'id',identity:'identity'}},
                        shieid: {visible:scope.row.lockStatus==0,callback:chengStatus},
                         open: {visible:scope.row.lockStatus==1,callback:chengStatus},
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
import { selectUserList,modifyUserStatus } from "@/api/newApi";
import { delUser } from "@/api/resetApi";

import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import { log } from "util";

export default {
  mixins: [permission, user],
  data() {
    return {
      form: {
        identityList: ["5"],
        account: null,
        type: "D"
      },
      listData: [],
      selection: [],
      datas: [],
      detailVisible: false, // 详情弹窗是否可见
      detail: {
        disabled: false,
        id: ""
      } // 详情组件传参
    };
  },
  computed: {
    ...mapState("dict", {
      subject: state => (state.subject || {}).dicList || [],
      auditStatus: state => (state.examineStatus || {}).dicList || [],
      lockStatus: state => (state.lockStatus || {}).dicList || []
    })
  },
  created() {
    this.getDataDict({ code: "subject" });
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

    // 记录表格选中项
    handleSelectionChange(val) {
      val.forEach(o => (o.isId = 1));

      this.selection = val;
    },

    // 获取列表数据
    async getDatas() {
      this.isLoading = true;
      const formList = Object.assign({}, this.form);
      const res = await selectUserList(formList, this.pages);

      try {
        const datas = res.data.entity;
        this.totalNum = datas.totalNum || 0;
        this.listData = datas.resultData;
      } catch (error) {
        this.listData = [];
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
        const params = { idList: [items.id] };
        this.$confirm(`确认删除该数据吗?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delUser(params).then(res => {
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
    chengStatus(data){
      let txt,lockStatus;
      lockStatus = data.data.lockStatus==0?1:0
      txt = lockStatus?'停用':'启用'
      this.$confirm(`${txt}后此账号将${lockStatus?'不':''}能正常使用，确定要${txt}？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          modifyUserStatus({ id: data.data.id, lockStatus: lockStatus }).then(res => {
            try {
              let _data = res.data;
              if (_data.code == 200) {
                this.$message({
                  type: "success",
                  message: `${txt}成功!`
                });
                data.data.lockStatus = lockStatus
              } else {
                this.$message({
                  type: "success",
                  message: _data.msg || `${txt}失败!`
                });
              }
            } catch (err) {
              console.log(err);
            } finally {
            }
          });
        })
        .catch(() => {});
    },
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
