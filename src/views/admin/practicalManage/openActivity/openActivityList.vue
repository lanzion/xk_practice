<template>
  <div class="openactivitylist">
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        <el-form-item label="活动分类">
          <el-select v-model="form.activityStatus" placeholder="请选择" clearable>
            <el-option
              v-for="item in activityStatus"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
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
        <el-form-item label="是否收费">
          <el-select v-model="form.activityStatus" placeholder="请选择" clearable>
            <el-option
              v-for="item in activityStatus"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-input v-model="form.name" placeholder="请输入活动名称"></el-input>
        </el-form-item>

        <el-button type="primary" @click="selectList" plain>搜索</el-button>
      </el-form>
    </div>
    <iTable :data="listData" :col-configs="colConfigs" :loading="true" row-key="id">
      <el-table-column slot="selection" type="selection"></el-table-column>
      <el-table-column slot="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            content="scope"
            placement="bottom-start"
          >
          <el-button type="text">{{scope.row.status}}</el-button>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column slot="operate" label="操作" fixed="right" :width="operateWidth" align="center">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                        edit: { query: { id: 'id'} },// 编辑
                         look: { callback: look }, // 
                         partake: { query: { id: 'id'} }, // 参与情况
                         confirm: { query: { id: 'id'} }, 
                    }"
          />
        </template>
      </el-table-column>
    </iTable>
    <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>

    <el-dialog title :visible.sync="centerDialogVisible" width="965px" center>
      <div id="printMe">
        <div class="box" ref="print">
          <div class="pos pos2">教育局已确认</div>
          <div class="title">《博物馆展览活动》活动确认书</div>
          <div class="center">
            <div class="name">活动信息</div>
            <el-row>
              <el-col>
                <span>活动名称:</span>
                <span>博物馆展览活动</span>
              </el-col>
              <el-col>
                <span>报名时间:</span>
                <span>2019-11-20 14:00 至 2019-11-25 18:00</span>
              </el-col>
              <el-col :span="3">
                <span>活动时间:</span>
              </el-col>
              <el-col :span="21">
                <p>2019-11-29 10:00-12:00</p>
                <p>2019-11-29 14:00-16:00</p>
                <p>2019-11-30 10:00-12:00</p>
              </el-col>
              <el-col>
                <span>每场人数限制:</span>
                <span>200人</span>
              </el-col>
            </el-row>

            <div class="name">基地/机构信息</div>
            <el-row>
              <el-col>
                <span>基地/机构:</span>
                <span>中国科学院华南植物园</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>联系人及电话:</span>
                <span>王先生 13636363223</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <span>活动地点:</span>
                <span>广州市天河区广州市天河区兴科路723号</span>
              </el-col>
              <el-col>
                <span>集合地点:</span>
                <span>广州市天河区广州市天河区兴科路723号正门</span>
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
import iTable from "@/components/admin/common/iTable";
import { mapState, mapActions } from "vuex";
import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
export default {
  components: { iTable },
  mixins: [permission, user],
  data() {
    return {
      totalNum:0,
      activityStatus: [],
      form: {},
      listData: [{ name: "1233333333333333333333333333333333333333", id: 1, status: 0 }],
      colConfigs: [
        { slot: "selection" },
        { prop: "name", label: "活动名称" },
        { prop: "name", label: "活动分类" },
        { prop: "name", label: "基地/机构" },
        { prop: "name", label: "报名时间" },
        { prop: "name", label: "活动时间" },
        { prop: "name", label: "每场人数限制" },
        { prop: "name", label: "是否收费" },
        { prop: "name", label: "教育局确认状态" },
        { slot: "status", label: "活动状态" },
        { prop: "name", label: "报名人数" },
        { prop: "name", label: "参加人数" },
        { slot: "operate" }
      ],
      confirmation: {},
      centerDialogVisible: false
    };
  },
  methods: {
    selectList() {},
    edit(data) {},
    look(data) {
      this.centerDialogVisible = true;
    },
    getDatas() {}
  }
};
</script>

<style lang="scss" scoped>
#printMe {
  text-align: initial;
  padding: 25px 25px 30px;
}
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
    line-height: 32px;
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
    span,p {
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
  line-height: 60px;
}
</style>