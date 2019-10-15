<template>
  <div class="newgrounds">
    <div class="g-search--wrap clearfix" style="maxWidth:1200px;min-width: 700px;">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :style="{'marginBottm':'20px'}"
      >
        <el-row>
          <el-col :span="15">
            <el-form-item label="基地名称" prop="name">
              <el-input v-model="ruleForm.name" :disabled="isReadonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="联系人" prop="liaisonMan">
              <el-input v-model="ruleForm.liaisonMan" :disabled="isReadonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="联系方式" prop="liaisonWay">
              <el-input v-model="ruleForm.liaisonWay" :disabled="isReadonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="传真" prop="fax">
              <el-input v-model="ruleForm.fax" :disabled="isReadonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" :disabled="isReadonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="所在地区" prop="name" style="pointerEvents:none">
              <region type="object" :disabled="isReadonly" :default="defaultRegion" class="regions"></region>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="详细地址" prop="address">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="详细地址"
                v-model="ruleForm.address"
                :disabled="isReadonly"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15">
            <el-form-item label="基地类型" prop="baseinfoTypeList">
              <el-input v-model="baseinfoTypeList" :disabled="isReadonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="基地描述" prop="remark">
              <el-input type="textarea" rows="4" v-model="ruleForm.remark" :disabled="isReadonly"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div :style="{'height':'40px'}">
        <div :style="{'float':'left','width':'600px','height':'40px'}">
          <el-form
            :model="ruleForm"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            :style="{'marginBottm':'20px'}"
          >
            <el-form-item label="工作周期" prop="workTime">
              <el-checkbox-group v-model="checkboxGroup1" style="pointerEvents:none">
                <el-checkbox-button
                  v-for="city in cities"
                  :label="city"
                  :key="city"
                >{{filterCityOptions(city)}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
        <!-- <div :style="{'float':'left','width':'300px'}">
          <span :style="{'fontSize':'14px','lineHeight':'30px'}">未选择的时间不可以预约活动课程</span>
        </div>-->
      </div>

      <div :style="{'height':'40px','width':'100%','marginTop':'20px'}">
        <div :style="{'width':'300px','float':'left'}">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="上班时间" prop="name">
              <el-time-select
                v-model="ruleForm.startTime"
                :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '18:30'
                                }"
                placeholder="选择时间"
                :disabled="isReadonly"
              ></el-time-select>
            </el-form-item>
          </el-form>
        </div>
        <!-- <div :style="{'width':'600px','float':'left'}">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="午休时间" prop="name">
              <div :style="{'width':'200px','float':'left','marginRight':'20px'}">
                <el-time-select
                  placeholder="起始时间"
                  v-model="ruleForm.startLunchHour"
                  :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '18:30',
                                    }"
                :disabled="isReadonly"></el-time-select>
              </div>
              <div :style="{'width':'200px','float':'left'}">
                <el-time-select
                  placeholder="起始时间"
                  v-model="ruleForm.endLunchHour"
                  :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '18:30',
                                    }"
                :disabled="isReadonly"></el-time-select>
              </div>
            </el-form-item>
          </el-form>
        </div>-->
        <div :style="{'width':'300px','float':'left'}">
          <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="下班时间" prop="name">
              <el-time-select
                v-model="ruleForm.endTime"
                :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '18:30'
                                }"
                placeholder="选择时间"
                :disabled="isReadonly"
              ></el-time-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div :style="{'width':'100%','height':'40px','float':'left'}">
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="170px"
          class="demo-ruleForm"
          :style="{'marginBottm':'20px'}"
        >
          <el-form-item label="每日可举办活动次数" prop="name">
            <el-input
              placeholder="请输入内容"
              v-model="ruleForm.allNum"
              clearable
              :style="{'width':'100px'}"
              :disabled="isReadonly"
            ></el-input>
            <span>次</span>
          </el-form-item>
        </el-form>
      </div>

      <div :style="{'float':'left','width':'50%','marginTop':'20px'}">
        <span
          :style="{'dispalay':'block','float':'left','fontSize':'14px','margin':'0 20px 0 30px'}"
        >LOGO</span>

        <div :style="{'float':'left','background-color': 'aliceblue'}">
          <el-image :src="ruleForm.cover" style="width: 180px; height: 180px;" fit="cover">
            <div
              slot="error"
              class="image-slot"
              style="font-size: 30px;line-height: 180px;text-align: center;"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </div>

      <div :style="{'float':'left','width':'50%','marginTop':'20px'}">
        <span
          :style="{'dispalay':'block','float':'left','fontSize':'14px','margin':'0 20px 0 0px'}"
        >空间图</span>

        <div :style="{'width':'180px','float':'left','background-color': 'aliceblue'}">
          <el-image
            :src="ruleForm.designSpacePage"
            style="width: 180px; height: 180px;"
            fit="cover"
          >
            <div
              slot="error"
              class="image-slot"
              style="font-size: 30px;line-height: 180px;text-align: center;"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </div>

      <div :style="{'float':'left','width':'100%','marginTop':'20px'}">
        <span
          :style="{'dispalay':'block','float':'left','fontSize':'14px','margin':'0 20px 0 0px','width':'70px'}"
        >背景图</span>

        <div :style="{'float':'left','background-color': 'aliceblue'}">
          <el-image
            :src="ruleForm.designSpaceBackground"
            style="width: 180px; height: 180px;"
            fit="cover"
          >
            <div
              slot="error"
              class="image-slot"
              style="font-size: 30px;line-height: 180px;text-align: center;"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </div>
      <div class="school-table-head">服务列表</div>
      <div class="school-table-box">
        <div class="school-table-tr school-table-tr-head">
          <div class="school-table-td">
            <div class="school-table-cell">服务标题</div>
          </div>
          <div class="school-table-td">
            <div class="school-table-cell">服务金额</div>
          </div>
          <div class="school-table-td">
            <div class="school-table-cell">负责人</div>
          </div>
          <div class="school-table-td">
            <div class="school-table-cell">联系方式</div>
          </div>
        </div>
      </div>
      <div class="school-infinite-box" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
        <div class="school-table-box">
          <div
            class="school-table-tr"
            v-for="(item,index) in listData"
            :key="index"
            v-show="listData.length!=0"
          >
            <div class="school-table-td">
              <div class="school-table-cell school-name">
                <router-link :to="{path:'/baseAuthority/serviceDetails',query: {id: item.id}}">{{item.title}}</router-link>
              </div>
            </div>
            <div class="school-table-td">
              <div class="school-table-cell">{{item.price}}</div>
            </div>
            <div class="school-table-td">
              <div class="school-table-cell">{{item.personInCharge}}</div>
            </div>
            <div class="school-table-td">
              <div class="school-table-cell">{{item.personInChargePhone}}</div>
            </div>
          </div>
        </div>
        <div v-if="listData.length!=0" class="school-show-title">
          <p v-if="isLoading1">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </div>

      <div class="school-table-footer" v-if="listData.length==0">暂无数据</div>
    </div>
    <div :style="{'width':'80%','marginTop':'20px','paddingLeft':'100px'}">
      <el-button type="primary" @click="goback" style="margin-top: 30px;">返回列表</el-button>
    </div>
  </div>
</template>
<script>
import { adminBaseInfoDetail, baseinfoList } from "@/api/newApi";
import { log } from "util";
const cityOptions = ["1", "2", "3", "4", "5", "6", "7"];
export default {
  name: "newgrounds",
  mixins: [],
  components: {},
  data() {
    return {
      isLoading1: false,
      listData: [],
      pages: {
        pageNum: 1,
        pageSize: 10
      },
      isReadonly: true,
      cover: [],
      defaultRegion: [],
      imageUrl: "",
      checkboxGroup1: [""],
      cities: cityOptions,
      input: "",
      dialogImageUrl: "",
      dialogVisible: false,
      baseinfoTypeList: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      value: "",
      startTime: "",
      endTime: "",
      value2: "",
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        city: "",
        erae: "",
        minerae: ""
      }
    };
  },
  methods: {
    filterCityOptions(code) {
      if (code == 1) return "星期一";
      if (code == 2) return "星期二";
      if (code == 3) return "星期三";
      if (code == 4) return "星期四";
      if (code == 5) return "星期五";
      if (code == 6) return "星期六";
      if (code == 7) return "星期日";
    },
    checkboxGroup() {
      if (this.checkboxGroup1.length)
        this.ruleForm.workTime = this.checkboxGroup1.join(",");
    },
    goback() {
      this.$router.go(-1);
    },
    // 获取详情
    async getbaseDetail() {
      const id = this.id || this.$route.query.id;
      if (id) {
        const res = await adminBaseInfoDetail({ id: id });
        try {
          const _datas = res.data.entity;
          this.ruleForm = _datas;
          this.defaultRegion = [
            this.ruleForm.provinceId,
            this.ruleForm.cityId,
            this.ruleForm.areaId
          ];
          if (this.ruleForm.workTime) {
            let workTime = this.ruleForm.workTime;
            if (workTime.indexOf(",") > 0)
              this.checkboxGroup1 = workTime.split(",");
            else this.checkboxGroup1 = [workTime];
          }
          if (this.ruleForm.infoTypeList.length) {
            this.ruleForm.infoTypeList.forEach((v, i) => {
              if (v.dicdetailName) {
                this.baseinfoTypeList += v.dicdetailName + ">" + v.dictypeName;
                if (i < this.ruleForm.infoTypeList.length - 1)
                  this.baseinfoTypeList += "、";
              }
            });
          }
        } catch (error) {
          console.log(error);
        } finally {
        }
      }
    },
    // 获取列表数据
    async getDatas() {
      const res = await baseinfoList({ auditStatus: "A" }, this.pages);

      const { entity: datas = {} } = res.data;

      try {
        datas.resultData.forEach((o, i) => {
          // o.key = this.resetList.length;
          this.listData.push(o);
        });
        this.pages.pageNum++;
        this.totalNum = datas.totalPageNum || 0;
      } catch (error) {
        this.listData = [];
        this.totalNum = 0;
      } finally {
        this.isLoading1 = false;
      }
    },
    load() {
      this.isLoading1 = true;
      setTimeout(() => {
        this.getDatas();
      }, 2000);
    }
  },
  computed: {
    noMore() {
      return this.pages.pageNum > this.totalNum;
    },
    disabled() {
      return this.isLoading1 || this.noMore;
    }
  },
  created() {
    this.getbaseDetail();
    this.getDatas();
  }
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  //   width: 178px;
  //   height: 178px;
  //   line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.school-infinite-box {
  max-height: 300px;
  overflow: auto;
}
.school-table-box {
  border-top: 1px solid #ebeef5;
  border-left: 1px solid #ebeef5;
  display: table;
  width: 100%;
  box-sizing: border-box;

  .school-table-tr {
    display: table-row;

    &.school-table-tr-head {
      background-color: #eef1f6;

      font-size: 14px;
      color: #666;
    }
    .school-table-td {
      display: table-cell;
      text-align: center;
      line-height: 23px;
      width: 25%;
      font-size: 14px;
      padding: 8px 0;
      border-bottom: 1px solid #ebeef5;
      border-right: 1px solid #ebeef5;
      color: #333;
      box-sizing: border-box;
      vertical-align: middle;
      .school-table-cell {
        padding: 0 10px;
        word-break: break-all;
      }
    }
  }
}
.school-table-footer {
  box-sizing: border-box;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
  border-left: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  color: #909399;
}
.school-show-title {
  p {
    text-align: center;
    line-height: 30px;
    font-size: 14px;
  }
}
.school-table-head {
  clear: both;
  padding-top: 20px;
  font-size: 14px;
  color: #333;
  //  text-align: center;
  line-height: 40px;
}
</style>
