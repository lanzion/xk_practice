<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        <el-form-item label="审核状态">
          <el-select v-model="form.auditStatus" placeholder="请选择状态" @change="resetPage" clearable>
            <el-option
              v-for="item in fpStates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在地区">
          <region type="object" @change="changeRegion" class="regions"></region>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="请填写基地名称" @keyup.native.enter="resetPage"></el-input>
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
      <el-table-column prop="name" label="基地名称" align="center" />
      <el-table-column prop="address" label="基地地址" align="center" />
      <el-table-column prop="infoTypeList" label="基地类型" align="center">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.infoTypeList" :key="index">
            {{item.dicdetailName}}>{{item.dictypeName}}
            <span
              v-if="index<scope.row.infoTypeList.length-1"
            >、</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="liaisonMan" label="负责人" align="center" />
      <el-table-column prop="liaisonWay" label="联系方式" align="center" />
      <el-table-column prop="auditStatus" label="审核状态" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.auditStatus|formatStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                        edit: { query: { id: 'id'} }
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

export default {
  mixins: [permission, user],
  data() {
    return {
      listData: [],
      fpStates: [
        {
          value: "A",
          label: "通过"
        },
        {
          value: "B",
          label: "不通过"
        },
        {
          value: "C",
          label: "未审核"
        }
      ],
      stateValue: null,
      form: {
        name: "",
        provinceId: "",
        cityId: "",
        areaId: "",
        auditStatus: ""
      }
    };
  },
  computed: {
    // ...mapState('dict', {
    //     subject: state => (state.subject || {}).dicList || [],
    //     auditStatus: state => (state.examineStatus || {}).dicList || [],
    //     lockStatus: state => (state.lockStatus || {}).dicList || []
    // })
  },
  filters: {
    // 状态过滤
    formatStatus(val) {
      return val == "A" ? "通过" : val == "B" ? "不通过" : "未审核";
    }
  },
  created() {
    this.getDatas();
  },
  watch: {},
  methods: {
    changeRegion(region) {
      if (region[0].code) this.form.provinceId = region[0].code;
      if (region[1].code) this.form.cityId = region[1].code;
      if (region[2].code) this.form.areaId = region[2].code;
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
      let params = {
        name: this.form.name,
        provinceId: this.form.provinceId,
        cityId: this.form.cityId,
        areaId: this.form.areaId,
        auditStatus: this.form.auditStatus
      };

      const res = await BaseList(params, this.pages);

      const { entity: datas = {} } = res.data;

      try {
        this.listData = datas.resultData || [];
        this.totalNum = datas.totalNum || 0;
      } catch (error) {
        this.listData = [];
        this.totalNum = 0;
      } finally {
        this.isLoading = false;
      }
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
