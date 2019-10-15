<template>
  <div class="workout">
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" :model="search" class="fl elFrom" @submit.native.prevent>
        <!-- <el-form-item label="所在地">
                    <region :default="region" type="object" @change="changeRegion" :disabled="disabled"></region>
        </el-form-item>-->
        <el-form-item label="活动状态">
          <el-select v-model="value" placeholder="全部状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="审核状态">
          <el-select v-model="stateValue" placeholder="全部状态">
            <el-option
              v-for="item in fpStates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item class="fr">
          <el-form-item label>
            <el-input
              v-model="keyword"
              placeholder="参与学校名称、参与项目名称"
              @keyup.native.enter="resetPage"
              width="300"
            ></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="getDatas">搜索</el-button>
          <!-- <el-button type="primary" @click="getDatas">添加</el-button> -->
          <!-- <el-button type="primary" @click="resetForm" plain>重置</el-button> -->
        </el-form-item>

        <el-table
          ref="table"
          :data="listData"
          stripe
          align="center"
          v-loading="isLoading"
          border
          :header-cell-style="{'background-color':'#eee', 'color':'#666'}"
        >
          <!-- <el-table-column type="selection" width="45" align="center"/> -->
          <el-table-column prop="account" label="ID" align="center" />
          <el-table-column prop="theme" label="实践主题" align="center" />
          <el-table-column prop="type" label="参与学校" align="center" />
          <el-table-column prop="time" label="课程名称" align="center" />
          <el-table-column prop="time" label="参与项目" align="center" />
          <el-table-column prop="state" label="班级数量" align="center" />
          <el-table-column prop="state" label="活动状态" align="center" />

          <el-table-column label="操作" align="center" :width="300">
            <template slot-scope="scope">
              <!-- <el-button size="mini" @click="changes()">课程详情</el-button> -->
              <list-operate
                :items="listBtnGroup"
                :data="scope.row"
                :index="scope.$index"
                v-bind="{
                        edit: { query: { id: 'id'} }, // 跳转就传一个参数
                        details: { query: { id: '2020'} },
                        del: { callback: doDel },
                        stop: { callback: doStop },
                        audit: { active: isnAudit, callback: doDetail },
                        lock: { active: isnLock, callback: doLock },
                        unlock: { active: isLock, callback: doLock }
                    }"
              />
            </template>
          </el-table-column>
        </el-table>
        <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { requestAdminTeacherList, delTeacher } from "@/api/base";

import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";

const search = {
  sex: "",
  schoolId: "",
  teach: "",
  provinceId: "",
  cityId: "",
  areaId: "440106",
  auditStatus: "",
  lockStatus: ""
};

export default {
  mixins: [permission, user],
  name: "workout",
  data() {
    return {
      keyword: "",
      search: { ...search },
      selection: [],
      datas: [],
      detailVisible: false, // 详情弹窗是否可见
      detail: {
        disabled: false,
        id: ""
      }, // 详情组件传参
      options: [
        {
          label: "全部状态",
          value: "选项1"
        },
        {
          label: "未开始",
          value: "选项2"
        },
        {
          label: "进行中",
          value: "选项3"
        },
        {
          label: "已完成",
          value: "选项4"
        },
        {
          label: "已终止",
          value: "选项5"
        }
      ],
      listData: [
        {
          name: "李老师",
          phone: "15245222002",
          time: "2019-6-28 12:00",
          theme: "小草药大用途",
          type: "科技教育>科普教育",
          account: "56d4122ds",
          state: "已分配"
        },
        {
          name: "昝老师",
          phone: "15245222002",
          time: "2019-6-28 12:00",
          theme: "小草药大用途",
          type: "科技教育>科普教育",
          account: "56d4s5ds",
          state: "未分配"
        },
        {
          name: "王老师",
          phone: "15245222002",
          time: "2019-6-20 12:00",
          theme: "小草药大用途",
          type: "科技教育>科普教育",
          account: "77d4s5ds",
          state: "已终止"
        }
      ]
    };
  },
  //   methods: {
  //     changes() {
  //       this.$router.push({
  //         name: "worklist"
  //       });
  //     }
  //   }
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
      const res = await requestAdminTeacherList(
        { ...this.search, name: this.keyword },
        this.pages
      );

      const { entity: datas = {} } = res.data;
      // console.log("-222222", datas);
      try {
        this.datas = datas.resultData || [];
        this.totalNum = datas.totalNum || 0;
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
      const items = data ? [data] : this.selection;

      if (items.length) {
        const params = items.map(x => {
          return {
            id: x.id
          };
        });
        this.$confirm(`确认删除该数据吗?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delTeacher(params).then(res => {
              const { code, msg } = res.data;
              if (code === 200) {
                this.$message({
                  message: `删除成功`,
                  type: "success"
                });
                this.$refs.table.clearSelection();
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
<style lang="scss" scoped>
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

