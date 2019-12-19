<template>
  <div class="list">
    <div class="g-search--wrap">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        <el-form-item label="变更类型">
          <el-select v-model="form.changeType" placeholder="请选择" clearable>
            <el-option
              v-for="item in changeTypeList"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基地/机构">
          <el-select
            v-model="form.baseinfoId"
            filterable
            remote
            placeholder="请选择基地/机构"
            :remote-method="remoteMethod"
            v-el-select-loadmore="loadmore"
            clearable
            @clear="remoteMethod"
          >
            <el-option
              v-for="(item,index) in beasList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary">搜索</el-button>

      <section class="g-table--head clearfix fr">
        <head-operate
          class="fr"
          :items="headBtnGroup"
          v-bind="{
                    
                }"
        />
      </section>
    </div>

    <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border>
      <el-table-column prop="name" label="课程名称" align="center" show-overflow-tooltip />
      <el-table-column prop="name" label="基地/机构" align="center" show-overflow-tooltip />
      <el-table-column prop="name" label="活动开始时间" align="center" sortable show-overflow-tooltip />
      <el-table-column prop="name" label="操作时间" align="center" sortable show-overflow-tooltip />
      <el-table-column prop="name" label="变更类型" align="center" show-overflow-tooltip />
      <el-table-column prop="name" label="变更内容" align="center" show-overflow-tooltip />

    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import { BaseList } from "@/api/newApi";
export default {
  mixins: [permission, user],
  data() {
    return {
      changeTypeList: [
        { name: "取消活动", code: "A" },
        { name: "变更活动", code: "B" }
      ],
      form: {},
      beasList: [],
      baseData: {
        pageNum: 1,
        pageSize: 20
      },
      baseName: "",
      listData:[]
    };
  },
  directives: {
    "el-select-loadmore": {
      bind(el, binding) {
        const SELECTWRAP_DOM = el.querySelector(
          ".el-select-dropdown .el-select-dropdown__wrap"
        );
        SELECTWRAP_DOM.addEventListener("scroll", function() {
          const condition =
            this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
            binding.value();
          }
        });
      }
    }
  },
  mounted() {
    this.getBaseList(this.baseData);
  },
  methods: {
    loadmore(val) {
      this.baseData.pageNum++;
      this.getBaseList(this.baseData);
    },
    getBaseList(baseData, searchName) {
      BaseList({ name: this.baseName }, baseData).then(res => {
        const { entity: datas = {} } = res.data;
        let _list = datas.resultData || [];
        if (searchName) {
          this.beasList = [];
        }
        this.beasList = [...this.beasList, ..._list];
      });
    },
    remoteMethod(query) {
      this.baseName = query;
      this.baseData.pageNum = 1;
      this.getBaseList(this.baseData, true);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>