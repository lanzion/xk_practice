<template>
  <div class="list">
    <div class="g-search--wrap">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        <el-form-item label="活动状态">
          <el-select v-model="form.activityStatus" placeholder="请选择" clearable>
            <el-option
              v-for="item in activityStatus"
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
      <el-button type="primary" @click="centerDialogVisible=true">搜索</el-button>

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
      <el-table-column prop="name" label="课程分类" align="center" show-overflow-tooltip />
      <el-table-column prop="name" label="基地/机构" align="center" show-overflow-tooltip />
      <el-table-column prop="name" label="活动开始时间" align="center" sortable show-overflow-tooltip />
      <el-table-column prop="name" label="活动时长" align="center" show-overflow-tooltip />
      <el-table-column prop="name" label="学生人数" align="center" sortable show-overflow-tooltip />
      <el-table-column prop="name" label="活动状态" align="center" show-overflow-tooltip />

      <el-table-column label="操作" align="center" fixed="right" :width="operateWidth">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                    }"
          />
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title :visible.sync="centerDialogVisible" width="965px" center>
      <div id="printMe">
        <div class="box" ref="print">
          <div class="title">《{{confirmation.courseName}}》活动确认书</div>
          <div class="center">
            <div class="name">学校信息</div>
            <el-row>
              <el-col>
                <span>学校名称:</span>
                <span>{{confirmation.schoolName}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>学校带队教师及电话:</span>
                <span>{{confirmation.guideTeacherName}} &nbsp; {{confirmation.guideTeacherPhone}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>参加学生人数:</span>
                <span>{{confirmation.actJoinStuNums}}</span>
              </el-col>
            </el-row>
            <div class="name">活动信息</div>
            <el-row>
              <el-col>
                <span>课程名称:</span>
                <span>{{confirmation.courseName}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>活动开始时间:</span>
                <span>{{confirmation.startTime}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>活动时长:</span>
                <span>{{confirmation.courseDuration|filterCode(6)}}</span>
              </el-col>
            </el-row>

            <div class="name">基地/机构信息</div>
            <el-row>
              <el-col>
                <span>基地/机构:</span>
                <span>{{confirmation.baseInstName}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>联系人及电话:</span>
                <span>{{confirmation.baseInstContactPers}} &nbsp; {{confirmation.baseInstContactPhone}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>地址:</span>
                <span>{{confirmation.baseInstAddress}}</span>
              </el-col>
            </el-row>
          </div>
          <div class="foot">温馨提示：请学校和基地/机构遵照此确认书完成实践活动，如有疑问，请联系***教育局***，联系电话020-2521235</div>
        </div>
      </div>
      <div class="show">
        <el-button type="primary" v-print="'#printMe'">打印</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import { BaseList } from "@/api/newApi";
import {
  auditStatus,
  fit,
  status,
  isFree,
  courseType,
  courseDuration
} from "@/utils/utility/dict.js";
export default {
  mixins: [permission, user],
  data() {
    return {
      form: {},
      activityStatus: [
        { code: 0, name: "未开始" },
        { code: 1, name: "进行中" },
        { code: 2, name: "待评价" },
        { code: 3, name: "已结束" }
      ],
      beasList: [],
      baseData: {
        pageNum: 1,
        pageSize: 20
      },
      baseName: "",
      listData: [],
      centerDialogVisible: false,
      confirmation: {}
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
  filters: {
    filterCode: function(val, num) {
      let name, arr;
      let typeArr = {
        "1": auditStatus,
        "2": fit,
        "3": status,
        "4": isFree,
        "5": courseType,
        "6": courseDuration
      };
      arr = typeArr[num];
      arr.forEach(v => {
        if (v.code == val) name = v.name;
      });
      return name;
    },
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
.box {
  width: 90%;
  border: 1px solid #ccc;
  padding: 15px 20px;
  box-sizing: border-box;
  margin: 0 auto;
  position: relative;
  .pos {
    font-size: 18px;
    color: #333;
    position: absolute;
    right: -30px;
    top: 24px;
    transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -o-transform: rotate(45deg);
  }
  .pos1 {
    color: #8bb703;
  }
  .pos2 {
    color: #d9001b;
  }
  .title {
    text-align: center;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    font-weight: 800;
    color: #000;
  }
  .center {
    padding: 10px 80px;
    .name {
      font-size: 18px;
      font-weight: 700;
      color: #000;
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
    }
    .el-row {
      margin-bottom: 20px;
    }
    span {
      font-size: 16px;
      color: #333;
    }
  }
  .foot {
    font-size: 14px;
    color: #333;
    margin-top: 20px;
  }
}
.show {
  text-align: center;
  // height: 60px;
  line-height: 60px;
}
</style>