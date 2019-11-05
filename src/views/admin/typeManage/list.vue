<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent :mode="form">
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入领域名称" @keyup.native.enter="resetPage"></el-input>
        </el-form-item>
        <el-button type="primary" plain @click="resetPage">搜索</el-button>
      </el-form>
    </div>
    <div>
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
    </div>
    <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="model-table-box">
            <div class="model-table-tr model-table-head">
              <div class="model-table-td">主题模块</div>
              <div class="model-table-td">code</div>
              <div class="model-table-td">启用状态</div>
              <div class="model-table-td">描述</div>
              <div class="model-table-td">操作</div>
            </div>
            <div
              class="model-table-tr"
              v-for="(item,index) in props.row.dicDetailList"
              :key="index"
            >
              <div class="model-table-td">{{item.name}}</div>
              <div class="model-table-td">{{item.code}}</div>
              <div class="model-table-td">
                <el-switch
                  on-color="#00A854"
                  on-text="启用"
                  on-value="1"
                  off-color="#F04134"
                  off-text="停用"
                  off-value="0"
                  v-model="item.status"
                  @change="changeSwitch1(item)"
                ></el-switch>
              </div>
              <div class="model-table-td">{{item.remark}}</div>
              <div class="model-table-td">
                <el-button class="g-table--link" type="text" @click="changeItem(item)">编辑</el-button>
              </div>
            </div>
            <div
              class="model-table-tr"
              v-if="props.row.dicDetailList&&props.row.dicDetailList.length==0||!props.row.dicDetailList"
            >
              <div class="model-table-td" style="width:100%;">暂无数据</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="领域名称" align="center" />
      <el-table-column prop="code" label="code" align="center" />
      <el-table-column prop="remark" label="描述" align="center" />
      <el-table-column label="启用状态" align="center" width="120">
        <template slot-scope="scope">
          <el-switch
            on-color="#00A854"
            on-text="启用"
            on-value="1"
            off-color="#F04134"
            off-text="停用"
            off-value="0"
            v-model="scope.row.status"
            @change="changeSwitch(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                                 edit: { query: { id: 'id'} },
                                 addType:{ query: { id: 'id'} },
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

import {
  activityType,
  activityTypUpdate,
  activityTypeDetailUpdate
} from "@/api/resetApi";
import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";

export default {
  mixins: [permission, user],
  data() {
    return {
      form: {
        name: ""
      },
      listData: []
    };
  },
  computed: {},
  created() {
    console.log(this.listBtnGroup);
    this.getDatas();
  },
  mounted() {
    this.listBtnGroup = this.listBtnGroup.filter(o => o.name != "编辑主题");
    console.log(this.listBtnGroup);
  },
  watch: {},
  methods: {
    changeSwitch(data = {}) {
      // console.log(data)

      const formData = {
        id: data.id,
        code: data.code,
        name: data.name,
        remark: data.remark
      };
      data.status ? (formData.status = "A") : (formData.status = "B");
      activityTypUpdate(formData)
        .then(res => {
          if (res.data.code === 200) {
          } else {
            this.$message({
              message: res.data.msg || `提交失败`,
              type: "error"
            });
          }
        })
        .finally(() => {});
    },
    changeSwitch1(data = {}) {
      // console.log(data)

      const formData = {
        id: data.id
      };
      data.status ? (formData.status = "A") : (formData.status = "B");
      activityTypeDetailUpdate(formData)
        .then(res => {
          if (res.data.code === 200) {
          } else {
            this.$message({
              message: res.data.msg || `提交失败`,
              type: "error"
            });
          }
        })
        .finally(() => {});
    },
    changeItem(item = {}) {
      this.$router.push({
        path: "/typeManage/typeEdit",
        query: { id: item.id }
      });
    },
    // 重置分页
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getDatas();
    },

    // 获取列表数据
    async getDatas() {
      this.isLoading = true;
      const formList = Object.assign({}, this.form);
      const res = await activityType(formList, this.pages);

      const { entity: datas = {} } = res.data;

      try {
        let list = datas.resultData || [];
        list.forEach(o => {
          o.status == "A" ? (o.status = true) : (o.status = false);
          o.dicDetailList = o.dicDetailList || [];
          o.dicDetailList.forEach(j => {
            j.status == "A" ? (j.status = true) : (j.status = false);
          });
        });
        this.listData = list;
        this.totalNum = datas.totalNum || 0;
      } catch (error) {
        this.listData = [];
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.elFrom {
  width: 100%;
}
.model-table-tr {
  font-size: 0;

  .model-table-td {
    width: 20%;
    text-align: center;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;
    font-size: 14px;
    color: #606266;
    box-sizing: border-box;
    vertical-align: top;
    position: relative;
    height: 40px;
    line-height: 40px;
  }
}
</style>
