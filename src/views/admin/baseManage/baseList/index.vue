<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        
        <el-form-item label="所在地区">
          <region type="object" @change="changeRegion" class="regions"></region>
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
    <el-table
      ref="table"
      :data="listData"
      stripe
      align="center"
      v-loading="isLoading"
      border
      :header-cell-style="{'background-color':'#eee', 'color':'#666'}"
    >
      <el-table-column prop="name" label="基地名称" align="center" sortable show-overflow-tooltip/>
      <el-table-column prop="address" label="基地地址" align="center" show-overflow-tooltip/>
      <el-table-column prop="infoTypeList" label="基地类型" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
         <div class="elips-two" style="-webkit-box-orient: vertical;"> 
                       {{scope.row.infoTypeListstr}}
        
          </div> 
        </template>
      </el-table-column>
      <el-table-column prop="liaisonMan" label="负责人" align="center" />
      <el-table-column prop="liaisonWay" label="联系方式" align="center" />
     
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
    <pagination
      :param="pages"
      :total="totalNum"
      @change="getDatas"
    ></pagination>

    <!-- 重置密码弹窗 -->
    <el-dialog width="500px" title="重置密码" :visible.sync="passwordVisible">
      <reset-password-form ref="password" :ids.sync="selection" @close="close"></reset-password-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { BaseList } from "@/api/newApi";

import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";

export default {
  mixins: [permission, user],
  data() {
    return {
      listData: [],
      keyword: "",
      provinceId:'',
      cityId:'',
      areaId:'',
      selection: [],
      datas: [],
      detailVisible: false, // 详情弹窗是否可见
      detail: {
        disabled: false,
        id: ""
      }, // 详情组件传参
     
    };
  },
  computed: {
   
  },
  created() {
    this.getDatas();
  },
  
  methods: {
    
    changeRegion(region) {
      
      if(region[0].code) this.provinceId = region[0].code;
      if(region[1].code) this.cityId = region[1].code;
      if(region[2].code) this.areaId = region[2].code;
      this.resetPage();
    },

    // 重置分页
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getDatas();
    },
    // 判断是否未审
    isnAudit(item) {
      return Number(item.auditStatus) === 0;
    },
    // 获取列表数据
    async getDatas() {
      this.isLoading = true;
      const res = await BaseList({ name: this.keyword,provinceId:this.provinceId,cityId:this.cityId,areaId:this.areaId }, this.pages);

      const { entity: datas = {} } = res.data;

      try {
         let list = datas.resultData || [];
          list.forEach(o=>{
            o.infoTypeList =o.infoTypeList||[];
            let arr =o.infoTypeList.map(j=>{
                return `${j.dictypeName}>${j.dicdetailName}`
             })
             o.infoTypeListstr = arr.join('、')
          })
        this.listData = list;
        this.totalNum = datas.totalNum || 0;
      } catch (error) {
        console.log(error)
       this.listData = [];
        this.totalNum =0;
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
.elips-two{
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
