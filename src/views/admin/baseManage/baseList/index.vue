<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        <el-form-item label="所在地区">
          <region type="object" @change="changeRegion" class="regions" :clearable="true"></region>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="auditStatus" placeholder="请选择审核状态" @change="resetPage" clearable>
            <el-option
              v-for="item in auditOption"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="keyword" placeholder="请填写基地名称" @keyup.native.enter="resetPage"></el-input>
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
    <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border>
      <el-table-column prop="name" label="基地名称" align="center" sortable show-overflow-tooltip />
      <el-table-column prop="address" label="基地地址" align="center" show-overflow-tooltip />
      <el-table-column prop="linkMan" label="联系人" align="center" />
      <el-table-column prop="linkPhone" label="联系方式" align="center" />
      <el-table-column
        align="center"
        prop="auditStatus"
        label="审核状态"
        width="120"
        :filters="[{ text: '审核通过', value: 'A' }, { text: '审核不通过', value: 'B' }, { text: '待审核', value: 'C' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.auditStatus === 'A' ? 'success' : (scope.row.auditStatus === 'B'?'danger':'primary')"
            disable-transitions
          >{{scope.row.auditStatus === 'A' ? '审核通过' : (scope.row.auditStatus === 'B'?'审核不通过':'待审核')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                        detail: { query: { id: 'id'} },
                        edit:{query:{id:'id'}},
                        schedule:{query:{id:'id'}}
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
import { BaseList } from "@/api/newApi";

import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import { auditStatus } from "@/utils/utility/dict.js";

export default {
  mixins: [permission, user],
  data() {
    return {
      auditOption: auditStatus,
      auditStatus: "",
      listData: [],
      keyword: "",
      provinceId: "",
      cityId: "",
      areaId: "",
      selection: [],
      datas: [],
      detailVisible: false, // 详情弹窗是否可见
      detail: {
        disabled: false,
        id: ""
      } // 详情组件传参
    };
  },
  computed: {},
  created() {
    this.getDatas();
  },

  methods: {
    filterTag(value, row) {
      return row.auditStatus === value;
    },
    changeRegion(region) {
      if(!region.length){
        this.provinceId = "";
        this.cityId = "";
        this.areaId = "";
      }else{
        this.provinceId = (region[0].code?region[0].code:"");
        this.cityId = (region[1].code?region[1].code:"");
        this.areaId = (region[2].code?region[2].code:"");
      } 
      this.resetPage();
    },

    // 重置分页
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getDatas();
    },
    // 获取列表数据
    async getDatas() {
      this.isLoading = true;
      const res = await BaseList(
        {
          name: this.keyword,
          provinceId: this.provinceId,
          cityId: this.cityId,
          areaId: this.areaId,
          auditStatus: this.auditStatus
        },
        this.pages
      );

      const { entity: datas = {} } = res.data;

      try {
        let list = datas.resultData || [];
        list.forEach(o => {
          o.infoTypeList = o.infoTypeList || [];
          let arr = o.infoTypeList.map(j => {
            return `${j.dictypeName}>${j.dicdetailName}`;
          });
          o.infoTypeListstr = arr.join("、");
        });
        this.listData = list;
        this.totalNum = datas.totalNum || 0;
      } catch (error) {
        console.log(error);
        this.listData = [];
        this.totalNum = 0;
      } finally {
        this.isLoading = false;
      }
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

<style lang='scss' scoped>
.elips-two {
  display: -webkit-box;
  // text-align: left;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

// .school-list-wrap{
//   /deep/ .cell{
//      overflow: hidden;
//     text-overflow: ellipsis;
//     display: -webkit-box;
//     -webkit-box-orient: vertical;
//     -webkit-line-clamp: 2;
//   }
// }
.elFrom {
  width: 100%;
}
</style>
