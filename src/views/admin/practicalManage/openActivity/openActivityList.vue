<template>
  <div class="openactivitylist">
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        <!-- <el-form-item label="活动分类">
          <el-select v-model="form.activityTypeParent" placeholder="请选择" clearable>
            <el-option
              v-for="item in activityTypeParent"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="活动状态">
          <el-select v-model="form.status" placeholder="请选择" clearable>
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否收费">
          <el-select v-model="form.free" placeholder="请选择" clearable>
            <el-option
              v-for="item in free"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-input v-model="form.name" placeholder="请输入活动名称"></el-input>
        </el-form-item>

        <el-button type="primary" @click="selectList" plain>搜索</el-button>
      </el-form>
    </div>
    <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border>
      <el-table-column prop="name" label="课程名称" align="center" show-overflow-tooltip />

      <el-table-column prop="typeParentName" label="活动分类" align="center" show-overflow-tooltip />
      <el-table-column label="报名时间" align="center" sortable show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.enrollStartDate}}至{{scope.row.enrollEndDate}}</template>
      </el-table-column>
      <el-table-column label="活动时间" align="center" sortable show-overflow-tooltip>
        <template
          slot-scope="scope"
        >{{scope.row.activityStartDate}}至{{scope.row.activityEndDate}} 共{{scope.row.actDateNum}}场</template>
      </el-table-column>
      <el-table-column label="每场人数限制" align="center" sortable show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.enrollMaxNum}}人</template>
      </el-table-column>
      <el-table-column label="是否收费" align="center" sortable show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.free?scope.row.price+'元':'免费'}}</template>
      </el-table-column>
      <el-table-column label="教育局确认状态" align="center" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.status|filterStatus}}</template>
      </el-table-column>
      <el-table-column prop="actStatusName" label="活动状态" align="center" show-overflow-tooltip />

      <el-table-column label="操作" fixed="right" :width="operateWidth" align="center">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                        edit: {visible:scope.row.status!='2', query: { id: 'id'} },// 编辑
                         look: { callback: look }, // 
                         partake: { query: { id: 'id'} }, // 参与情况
                         confirm: {visible:scope.row.status=='0', query: { id: 'id'} }, 
                    }"
          />
        </template>
      </el-table-column>
    </el-table>
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
import { mapState, mapActions } from "vuex";
import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import { getActivityTypeParent } from "@/api/resetApi";
import { openActivityPager } from "@/api/newApi";
export default {
  mixins: [permission, user],
  data() {
    return {
      totalNum: 0,
      activityTypeParent: [],
      status: [
        { value: 1, label: "未确认" },
        { value: 2, label: "已确认" },
        { value: 3, label: "不通过" }
      ],
      free: [{ value: 0, label: "免费" }, { value: 1, label: "收费" }],
      form: {},
      listData: [],
      confirmation: {},
      centerDialogVisible: false
    };
  },
  filters: {
    filterStatus(val) {
      let txt = "";
      switch (val) {
        case '1':
          txt = "未确认";
          break;
        case '2':
          txt = "已确认";
          break;
        case '3':
          txt = "不通过";
          break;
        default:
      }
      return txt;
    }
  },
  methods: {
    getActivityTypeParent() {
      getActivityTypeParent({})
        .then(res => {
          const datas = res.data;
          if (datas) {
            let arrBox = [];
            datas.typelist.forEach(o => {
              let arr = o.dicDetailList.map(k => {
                return {
                  value: k.code,
                  label: k.name
                };
              });
              arrBox.push({
                value: o.code,
                label: o.name,
                children: arr
              });
            });

            this.activityTypeParent = arrBox;
          }
        })
        .finally(() => {});
    },
    selectList() {},
    edit(data) {},
    look(data) {
      this.centerDialogVisible = true;
    },
    getDatas() {
      this.isLoading = true
      openActivityPager(this.form, this.pages).then(res => {
        try {
          let data = res.data;
          if (data.code == 200) {
            this.totalNum = data.totalNum;
            this.listData = data.entity.resultData;
          }
        } catch (err) {
          console.log(err);
        } finally {
          this.isLoading = false
        }
      });
    }
  },
  created() {
    this.getActivityTypeParent();
    this.getDatas();
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
    span,
    p {
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