<template>
  <div class="content">
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">基地名称:</span>
      <div class="school-detail-list-redource">{{listData.name}}</div>
    </div>
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">联系人:</span>
      <div class="school-detail-list-redource">{{listData.liaisonMan}}</div>
    </div>
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">联系方式:</span>
      <div class="school-detail-list-redource">{{listData.liaisonWay}}</div>
    </div>
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">传 真:</span>
      <div class="school-detail-list-redource">{{listData.fax?listData.fax:'暂无传真'}}</div>
    </div>
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">邮 箱:</span>
      <div class="school-detail-list-redource">{{listData.email}}</div>
    </div>
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">所在地区:</span>
      <div class="school-detail-list-redource">{{region.province.name+region.city.name+region.area.name}}</div>
    </div>
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">详细地址:</span>
      <div class="school-detail-list-redource">{{listData.address}}</div>
    </div>
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">注册类型:</span>
      <div class="school-detail-list-redource">
        <span v-for="(item,index) in listData.infoTypeList" :key="index">{{item.dicdetailName}}>{{item.dictypeName}}<span v-if='index<listData.infoTypeList.length-1'>、</span></span>
      </div>
    </div>
    <div class="school-detail-main-list">
      <span class="school-detail-list-head">审核记录</span>
      <div class="school-detail-list-redource" style="height:20px;"></div>
    </div>
    <div style="maxWidth:1200px;marginTop:10px;">
      <el-table
        ref="table"
        :data="listData.auditDtoList"
        stripe
        align="center"
        border
        :header-cell-style="{'background-color':'#eee', 'color':'#666'}"
      >
        <el-table-column prop="createDate" label="提交时间" align="center" width="200" />
        <el-table-column prop="updateDate" label="操作时间" align="center" width="200" />
        <el-table-column prop="updateName" label="操作人" align="center" width="200" />
        <el-table-column prop="auditStatus" label="操作结果" align="center" width="100">
          <template slot-scope="scope">
              <span v-if="scope.row.auditStatus == 'A'">通过</span>
              <span v-else>不通过</span>
            </template>
        </el-table-column>  
        <el-table-column prop="content" label="问题说明" align="center" />
      </el-table>
    </div>
    <div class="school-detail-main-list" v-if="auditStatusFlag">
      <span class="school-detail-list-head">问题描述</span>
      <div class="school-detail-list-redource" style="height:20px;"></div>
    </div>
    <el-form>
      <div style="maxWidth:1200px;marginTop:10px;" v-if="auditStatusFlag">
        <el-input type="textarea" :rows="4" placeholder="请填写问题描述" v-model="content"></el-input>
      </div>
      <div class="school-detail-main-list">
        <span class="school-detail-list-head"></span>
        <div class="school-detail-list-redource">
          <el-form-item class="g-form--footer">
            <el-button type="primary" plain @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit('A')" v-if="auditStatusFlag">通过</el-button>
            <el-button type="primary" @click="submit('B')" v-if="auditStatusFlag">不通过</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { adminBaseInfoDetail,baseinfoAudit } from "@/api/newApi";
import { requestRegion } from "@/api/common";
import { log } from 'util';

export default {
  data() {
    return {
      listData: {},
      tabbleList:[],
      region:{
        province:{
          code:'',
          name:'',
        },
        city:{
          code:'',
          name:'',
        },
        area:{
          code:'',
          name:'',
        },
      },
      content:'',
      auditStatusFlag:true,
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    // 获取详情
    getDetailData() {
      const id = this.id || this.$route.query.id;
      if (id) {
        this.isLoading = true;

        adminBaseInfoDetail({ id:id })
          .then(res => {
            const { code, entity: datas } = res.data;
            if (code === 200 && datas) {
              this.listData = datas;
              this.getCurrentLocal(this.listData.provinceId,this.listData.cityId,this.listData.areaId)
              this.listData.auditDtoList.map((v=>{
                if(v.auditStatus=='A') {
                  this.auditStatusFlag = false;
                  return
                } 
              }))
            }
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    // 获取地区 provinceId,cityId,areaId
    getCurrentLocal(provinceId,cityId,areaId){
      requestRegion({pcode:-1}).then(res=>{
        let proList = res.data.appendInfo.list;
        proList.forEach(v => {
          if(provinceId==v.code){
            // this.region+=v.name;
            this.region.province.code = provinceId;
            this.region.province.name = v.name;
            requestRegion({pcode:provinceId}).then(res=>{
              let proList = res.data.appendInfo.list;
              proList.forEach(v => {
                if(cityId==v.code){
                  this.region.city.code = provinceId;
                  this.region.city.name = v.name;
                  requestRegion({pcode:cityId}).then(res=>{
                    let proList = res.data.appendInfo.list;
                    proList.forEach(v => {
                      if(areaId==v.code){
                        this.region.area.code = provinceId;
                        this.region.area.name = v.name;
                      }
                    });
                  })
                }
              });
            })
          }
        });
      })
    },
    // 根据是否有id提交添加/编辑表单
    submit(auditStatus) {
      this.isLoading = true;
      let data = {
        baseinfoId:this.$route.query.id,
        content:this.content,
        auditStatus:auditStatus
      }
      baseinfoAudit(data)
        .then(res => {
          if (res.data.code === 200) {
            this.$alert("审核成功", {
              confirmButtonText: "确定",
              callback: action => {
                this.$router.push({ path: "/baseManage/baseAudit" });
              }
            });
          } else {
            this.$message({
              message: res.data.msg || "审核失败",
              type: "error"
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    // 返回列表页
    cancel() {
      this.$router.go(-1);
    },
    closeEs(index, type) {
      console.log(index + type);
      if (type === "close") {
        this.activeIndex = -1;
      } else {
        this.activeIndex == index
          ? (this.activeIndex = -1)
          : (this.activeIndex = index);
      }
    }
  },
  created(){
    this.getDetailData();
  }
};
</script>

<style lang='scss' module>
@import "~@/assets/css/base/utils.scss";
@import "~@/assets/css/base/element-variables.scss";
$--magnification: 20;
$--dialog-width: 740px;
$--cover-width: $--activity-cover-ratio-width * $--magnification;
$--cover-height: $--activity-cover-ratio-height * $--magnification;
$--copper-height: ($--dialog-width - $--dialog-padding-primary * 2) /
  $--activity-cover-ratio;

:export {
  width: $--cover-width;
  height: $--cover-height;
  dialogWidth: $--dialog-width;
  boxHeight: $--copper-height;
}
textarea.el-textarea__inner {
  resize: none;
}
</style>

<style lang="scss" scoped>
@import "~@/assets/css/base/utils.scss";
@import "~@/assets/css/base/element-variables.scss";
@import "~@/assets/css/module/my-module-form.scss";
.content {
  min-width: 900px;
  .school-detail-img {
    width: 300px;
    height: 300px;
  }
  .school-detail-list {
    margin-top: 20px;
    font-size: 0;
    .school-detail-item {
      display: inline-block;
      width: 50%;
      position: relative;
      vertical-align: top;
    }
  }
  .school-detail-main-list {
    position: relative;
    margin-top: 30px;
    .school-detail-list-title {
      overflow-y: auto;
      max-height: 150px;
      max-width: 900px;
      border-radius: 4px;
      border: solid 1px #eaeaea;
      word-break: break-all;
      padding: 10px;
      box-sizing: border-box;
    }
    .school-detail-list-redource {
      font-size: 14px;
      color: #333333;
      margin-left: 82px;
      line-height: 20px;
      min-height: 20px;
      .school-detail-redource-list {
        margin-bottom: 10px;
      }
      .school-detail-name {
        color: #666666;
        margin-right: 10px;
      }
      .school-detail-name-title {
        color: #333;
        margin-right: 10px;
      }
      .school-detail-download-btn {
        display: inline-block;
        vertical-align: middle;
        width: 40px;
        height: 20px;
        background-color: #e4eefe;
        border-radius: 4px;
        border: solid 1px #008aff;
        line-height: 20px;
        color: #008aff;
        text-align: center;
        font-size: 12px;
      }
    }
  }
  .school-detail-list-head {
    color: #666666;
    position: absolute;
    top: 0;
    left: 0;
    width: 82px;
    font-size: 14px;
    line-height: 20px;
    &.list-active {
      position: static;
      width: 100%;
      span {
        color: #0099ff;
        margin: 0 7px;
      }
      margin-bottom: 20px;
    }
  }
  .school-detail-list-title {
    line-height: 20px;
    font-size: 14px;
    color: #333333;
    margin-left: 82px;
  }
}
</style>
