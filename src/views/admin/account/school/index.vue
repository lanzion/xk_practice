<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        <el-form-item label="账号">
          <el-input v-model="form.account" placeholder="请输入账号" @keyup.native.enter="resetPage"></el-input>
        </el-form-item>
        <el-form-item label="区域" v-if="identiy==5||identiy==6||identiy==7||identiy==10">
          <region type="object" @change="changeRegion" class="regions"></region>
        </el-form-item>
        <el-button type="primary" plain @click="resetPage">搜索</el-button>
      </el-form>
    </div>
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
      <el-table-column prop="remark" label="备注" align="center" />
      <el-table-column prop="orgName" label="所属学校" align="center" />
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
                        edit: { query: { id: 'id' ,identity:'identity'} },
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
import { selectUserList } from "@/api/newApi";
import { delUser } from "@/api/resetApi";
import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import { log } from "util";
let identiy = localStorage.getItem("xk_practice_identity");
export default {
  mixins: [permission, user],
  data() {
    return {
      listData: [],
      form: {
        provinceId: null,
        cityId: null,
        areaId: null,
        identityList: ["9"],
        account: null,
        type: "C"
      },
      identiy: identiy,
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

    changeRegion(region) {
      this.form.provinceId = region[0].code || null;
      this.form.cityId = region[1].code || null;
      this.form.areaId = region[2].code || null;
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

    doStop() {
      console.log("停止！！");
      this.$confirm("是否确认终止?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
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
