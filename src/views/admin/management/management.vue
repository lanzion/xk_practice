<template>
  <div class="management">
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
        <el-form-item class="fr" :style="{'margin':'0'}">
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

        <div :style="{'height':'40px','width':'100%'}">
             <el-button type="primary" :style="{'float':'right'}" @click="goto()">添加</el-button>
        </div>

        <el-table :data="tableData4" style="width: 100%" align="center" border :header-cell-style="{'background-color':'#eee', 'color':'#666'}">
          <el-table-column fixed prop="date" label="项目标题" width="120" align="center"></el-table-column>
          <el-table-column prop="name" label="项目类型" width="120" align="center"></el-table-column>
          <el-table-column prop="province" label="项目描述"  align="center"></el-table-column>
          <el-table-column prop="city" label="日办次数" width="120" align="center"></el-table-column>
          <el-table-column  label="项目附件" width="120" align="center">
              <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData4)"
                type="text"
                size="small"
              >点击下载</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="zip" label="状态" width="80" align="center"></el-table-column>
          <el-table-column prop="list" label="最后修改人" width="120" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
              >修改</el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData4)"
                type="text"
                size="small"
              >移除</el-button>
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
  name: "management",
  data() {
    return {
      tableData4: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
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
      goto(){
          this.$router.push({
              name:'managelist',
          })
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
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
      console.log("-222222", datas);
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
