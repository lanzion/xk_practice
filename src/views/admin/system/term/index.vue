<template>
  <div class="term">
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl">
        <el-form-item>
          <el-input v-model.lazy="search" placeholder="请输入学年学期"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getDatas">查询</el-button>
          <el-button type="primary" @click="resetForm" plain>重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 表头权限及统计 -->
      <section class="g-table--head clearfix fr">
        <head-operate
          class="fr"
          :items="headBtnGroup"
          v-bind="{
                    add: { callback: doAdd },
                    del: { callback: doDel }
                }"
        />
      </section>
    </div>

    <el-table
      ref="table"
      :data="datas"
      stripe
      align="center"
      v-loading="isLoading"
      @selection-change="changeSelection"
    >
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="schoolYear" label="学年学期" sortable></el-table-column>
      <el-table-column prop="startDate" label="开始时间" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.startDate | dateFormat('yyyy-MM-dd')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endDate" label="结束时间" sortable>
        <template slot-scope="scope">
          <span>{{scope.row.endDate | dateFormat('yyyy-MM-dd')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" :width="operateWidth" v-if="listBtnGroup.length">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{time: editItem, del: { callback: doDel }}"
          />
        </template>
      </el-table-column>
    </el-table>
    <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>

    <el-dialog title="起止日期" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" label-width="100px">
        <el-form-item label="学年">
          <el-date-picker v-model="addForm.year" type="year" placeholder="请选择学年" format="yyyy" value-format="yyyy"></el-date-picker>
        </el-form-item>
        <el-form-item label="学期">
          <el-radio-group v-model="addForm.term">
            <el-radio label="上学期"></el-radio>
            <el-radio label="下学期"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="addForm.startDate" type="date" placeholder="请选择开始时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="addForm.endDate" type="date" placeholder="请选择结束时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAddTerm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import permission from "@/mixin/admin-operate";
import {
  requestTermList,
  addTerm,
  editTerm,
  deleteTerm
} from "@/service/admin_system.js";
export default {
  mixins: [permission],
  data() {
    return {
      search: "",
      datas: [],
      selection: [],
      dialogFormVisible: false,
      addForm: {}
    };
  },
  methods: {
    async getDatas() {
      this.isLoading = true;
      const res = await requestTermList( this.pages, { year: this.search });
      const { data: { entity: datas = {} } } = res;
      this.datas = datas.resultData || [];
      this.totalNum = datas.totalNum || 0;
      this.isLoading = false;
    },
    resetForm() {},
    doAdd() {
      this.dialogFormVisible = true;
    },
    editItem({ data }){
      console.log(data)
    },
    doAddTerm(){
      console.log(this.addForm)
    },
    doDel() {
      alert(2);
    },
    changeSelection(val) {
      this.selection = val;
    }
  },
  created(){
    this.getDatas()
  }
};
</script>

<style lang="scss" scoped>
.term {
  /deep/ .el-dialog {
    width: 30%;
  }
}
</style>