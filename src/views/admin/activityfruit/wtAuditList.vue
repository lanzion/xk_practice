<template>
  <div class="activityfruilist">
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl" @submit.native.prevent>
        <el-form-item label="类型">
          <el-select v-model="form.resultType" placeholder="请选择类型" @change="resetPage" clearable>
            <el-option
              v-for="item in resultTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.title" placeholder="请输入标题关键字" @keyup.native.enter="resetPage"></el-input>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
      <el-button type="primary" @click="resetPage">搜索</el-button>
      <div class="fr">
        <section class="g-table--head clearfix fr">
          <head-operate
            class="fr"
            :items="headBtnGroup"
            v-bind="{ pass:{ callback: pass }, unpass:{ callback: unpass }, }"
          />
        </section>
      </div>
    </div>
    <el-table
      ref="table"
      :data="listData"
      stripe
      align="center"
      v-loading="isLoading"
      border
      @selection-change="changeSelection"
    >
      <el-table-column type="selection" align="center" width="55"></el-table-column>
      <el-table-column prop="title" label="活动成果标题" align="center" show-overflow-tooltip />
      <el-table-column prop="activityInfo" label="关联活动" align="center" show-overflow-tooltip />
      <el-table-column prop="resultTypeName" label="类型" align="center" show-overflow-tooltip />
      <el-table-column prop="createName" label="发布者" align="center" show-overflow-tooltip />
      <el-table-column prop="gmtModify" label="更新时间" align="center" sortable show-overflow-tooltip />
      <el-table-column label="操作" align="center" :width="operateWidth">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{ pass:{ callback: pass }, unpass:{ callback: unpass }, del: {callback:del} }"
          />
        </template>
      </el-table-column>
    </el-table>
    <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>
  </div>
</template>

<script>
import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import {
  activityResultWtAuditList,
  resultAuditPass,
  resultAuditBatchPass,
  resultAuditUnPass,
  resultAuditBatchUnPass,
  resultActivityDelete
} from "@/api/newApi";
export default {
  mixins: [permission, user],
  data() {
    return {
      resultTypeList: [
        {
          value: 1,
          name: "活动小结"
        },
        {
          value: 2,
          name: "学生作品"
        },
        {
          value: 3,
          name: "学生感悟"
        },
        {
          value: 4,
          name: "活动影像"
        }
      ],
      form: {
        resultType: 1
      },
      listData: [],
      multipleSelection: []
    };
  },
  methods: {
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getDatas();
    },
    async getDatas() {
      this.isLoading = true;
      const formList = Object.assign({}, this.form);
      const res = await activityResultWtAuditList(formList, this.pages);

      const { entity: datas = {} } = res.data;
      try {
        this.listData = datas.resultData || [];
        this.totalNum = datas.totalNum || 0;
      } catch (error) {
        this.listData = [];
      } finally {
        this.isLoading = false;
      }
    },
    changeSelection(val) {
      this.multipleSelection = val;
    },
    pass(data) {
      this.$confirm("确定审核通过吗？通过后用户将可看到。", " ", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          if (data.data) {
            resultAuditPass({ activityResultId: data.data.id }).then(res => {
              let datas = res.data;
              if (datas.code == 200) {
                this.$message({
                  message: "审核成功",
                  type: "success"
                });
                this.getDatas();
              } else {
                this.$message({
                  message: datas.msg || `审核失败`,
                  type: "error"
                });
              }
            });
          } else {
            if (!this.multipleSelection.length) {
              this.$message({
                message: "最少要选择一条活动成果",
                type: "warning"
              });
              return;
            }
            let activityResultIds = [];
            this.multipleSelection.forEach(v => {
              activityResultIds.push(v.id);
            });
            resultAuditBatchPass({ activityResultIds: activityResultIds }).then(
              res => {
                let datas = res.data;
                if (datas.code == 200) {
                  this.$message({
                    message: "审核成功",
                    type: "success"
                  });
                  this.getDatas();
                } else {
                  this.$message({
                    message: datas.msg || `审核失败`,
                    type: "error"
                  });
                }
              }
            );
          }
        })
        .catch(() => {});
    },
    unpass(data) {
      this.$confirm("确定审核不通过吗？不通过的内容将不发布", " ", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          if (data.data) {
            resultAuditUnPass({ activityResultId: data.data.id }).then(res => {
              let datas = res.data;
              if (datas.code == 200) {
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.getDatas();
              } else {
                this.$message({
                  message: datas.msg || `操作失败`,
                  type: "error"
                });
              }
            });
          } else {
            if (!this.multipleSelection.length) {
              this.$message({
                message: "最少要选择一条活动成果",
                type: "warning"
              });
              return;
            }
            let activityResultIds = [];
            this.multipleSelection.forEach(v => {
              activityResultIds.push(v.id);
            });
            resultAuditBatchUnPass({
              activityResultIds: activityResultIds
            }).then(res => {
              let datas = res.data;
              if (datas.code == 200) {
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.getDatas();
              } else {
                this.$message({
                  message: datas.msg || `操作失败`,
                  type: "error"
                });
              }
            });
          }
        })
        .catch(() => {});
    },
    del(data) {
      let id = data.data.id;
      this.$confirm("确定删除内容吗？删除后将无法恢复。", " ", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          resultActivityDelete({ id }).then(res => {
            let _data = res.data;
            if (_data.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getDatas();
            } else {
              this.$message({
                message: _data.msg || `删除失败`,
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    }
  },
  created() {
    this.getDatas();
  }
};
</script>

<style lang="scss" scoped>
</style>