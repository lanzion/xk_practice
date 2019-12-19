<template>
  <div class="openactivityinfo">
    <div class="title">课程基本信息</div>
    <div class="clearfix">
      <el-col>
        <el-col :span="3" class="subtitle">活动分类：</el-col>
        <el-col :span="20">{{actData.typeParentName}}</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">活动名称：</el-col>
        <el-col :span="20">{{actData.name}}</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">活动封面：</el-col>
        <el-col :span="20">
          <el-image :src="getFileUrl(actData.cover)" class="school-detail-img" @click="prewImage">
            <div slot="placeholder" class="image-slot">
              加载中
              <span class="dot">...</span>
            </div>
          </el-image>
        </el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">适合学段：</el-col>
        <el-col :span="20">{{actData.fitSection|filterFit}}</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">是否收费：</el-col>
        <el-col :span="20">{{actData.free?actData.price+'元':actData.free}}</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">报名时间：</el-col>
        <el-col :span="20">{{actData.enrollStartDate}} 至 {{actData.enrollEndDate}}</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">活动时间：</el-col>
        <el-col :span="20" class="activity_box">
          <el-col :span="6">
            <p
              v-for="item in actData.activityDates"
              :key="item.id"
            >{{item.activityStartDate}} 至 {{item.activityEndDate}}</p>
          </el-col>
          <el-col
            :span="4"
            v-if="actData.activityDates"
            class="activity_num"
          >共{{actData.activityDates.length}}场</el-col>
        </el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">每场人数限制：</el-col>
        <el-col :span="20">{{actData.enrollMaxNum}} 人</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">活动地点：</el-col>
        <el-col :span="20">{{actData.address}}</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">集合地点：</el-col>
        <el-col :span="20">{{actData.place}}</el-col>
      </el-col>
    </div>

    <div class="title">活动联系人信息</div>
    <div class="clearfix">
      <el-col>
        <el-col :span="3" class="subtitle">联系人：</el-col>
        <el-col :span="20">{{actData.contactName}}</el-col>
      </el-col>
      <el-col>
        <el-col :span="3" class="subtitle">联系人电话：</el-col>
        <el-col :span="20">{{actData.contactPhone}}</el-col>
      </el-col>
    </div>
    <div class="title">活动详情</div>
    <div class="clearfix">
      <el-col>
        <el-col :span="22" :offset="1"><div v-html="actData.detail"></div></el-col>
      </el-col>
    </div>
    <div class="clearfix">
      <el-col>
        <el-col :span="3" class="subtitle">活动配套资源：</el-col>
        <el-col :span="19">
          <div v-for="(item,index) in actData.resourcesLists" :key="index">
            <a
              :href="item.resourceUrl"
              @click.prevent="downloadItem(item.resourceUrl,item.name)"
              class="download"
            >{{item.name}}</a>
          </div>
        </el-col>
      </el-col>
    </div>

    <div class="btn_list">
      <el-button @click="offDialogVisible=true" v-if="actData.status==1">不通过活动</el-button>
      <el-button type="primary" @click="submi" :disabled='actData.status!=1'>{{actData.status|submiTxt}}</el-button>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="getFileUrl(dialogImageUrl)" alt />
    </el-dialog>
    <el-dialog title :visible.sync="offDialogVisible" width="500px">
      <div class="visble_conter">
        <div class="visble_title">
          <span>*</span> 请选择屏蔽原因：
        </div>
        <div class="radio_list">
          <el-row>
            <el-col :span="8" v-for="item in openActNotPass" :key="item.id">
              <el-radio v-model="radio" :label="item.code">{{item.name}}</el-radio>
            </el-col>
          </el-row>
        </div>
        <div
          class="other"
          v-if="openActNotPass.length&&radio==openActNotPass[openActNotPass.length-1].code"
        >
          <div class="visble_title">
            <span>*</span> 屏蔽原因说明：
          </div>
          <div>
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="othertxt"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="offDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="shieidSubmi">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getActivityTypeParent } from "@/api/resetApi";
import { openActivityDetail, openActivityAudit } from "@/api/newApi";
import { requestDataDict } from "@/api/common.js";
export default {
  data() {
    return {
      activityTypeParent: [],
      radio: "",
      othertxt: "",
      actData: {},
      dialogVisible: false,
      offDialogVisible: false,
      dialogImageUrl: "",
      openActNotPass: []
    };
  },
  filters: {
    filterFit(val) {
      let txt = "";
      if (val)
        txt = val
          .replace(/primarySchool_L/g, "小学低年级")
          .replace(/primarySchool_H/g, "小学高年级")
          .replace(/middleSchool/g, "初中")
          .replace(/highSchool/g, "高中");
      return txt;
    },
    submiTxt(val){
      let txt = "";
      switch (val) {
        case '1':
          txt = '确认通过活动'
          break;
        case '2':
          txt = '已通过活动'
          break;
        case '3':
          txt = '活动不通过'
          break;
      
        default:
          break;
      }
      return txt
    }
  },
  methods: {
    async getDataDict(groupCode) {
      const res = await requestDataDict({ groupCode });
      const datas = res.data.entity || {};
      this.openActNotPass = datas.dicList;
    },
    submi() {
      let param = {
        activityId: this.actData.id,
        auditStatus: 2
      };
      this.openActivityAudit(param,true);
    },
    openActivityAudit(param, isPass) {
      openActivityAudit(param).then(res => {
        try {
          let data = res.data;
          if (data.code == 200) {
            if (isPass) {
              this.$confirm("恭喜，活动确认成功！", "", {
                confirmButtonText: "查看活动确认书",
                cancelButtonText: "返回活动列表"
              })
                .then(() => {
                  this.$router.push({
                    path: "/practicalManage/openActivityList",
                    query: { id: this.actData.id }
                  });
                })
                .catch(() => {
                  this.$router.push({
                    path: "/practicalManage/openActivityList"
                  });
                });
            } else {
              this.$router.push({ path: "/practicalManage/openActivityList" });
            }
          } else {
            this.$message({
              message: res.data.msg || `操作失败`,
              type: "error"
            });
          }
        } catch (err) {
          console.log(err);
        } finally {
        }
      });
    },
    prewImage() {
      this.dialogImageUrl = this.actData.cover;
      this.dialogVisible = true;
    },
    shieidSubmi() {
      if (
        this.radio ==
          this.openActNotPass[this.openActNotPass.length - 1].code &&
        !this.othertxt
      ) {
        this.$message({
          message: "请选择屏蔽原因或填写屏蔽原因",
          type: "warning"
        });
        return;
      }
      let param = {
        activityId: this.actData.id,
        content: this.othertxt,
        causeCode: this.radio,
        auditStatus: 3
      };
      this.openActivityAudit(param,false);
    },
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
            this.getActData();
          }
        })
        .finally(() => {});
    },
    getActData() {
      const id = this.id || this.$route.query.id;
      if (!id) return;
      this.showLoading();
      openActivityDetail({ id }).then(res => {
        try {
          let data = res.data;
          if (data.code == 200) {
            this.actData = Object.assign({}, data.entity);
            this.activityTypeParent.forEach(v => {
              if (v.code == this.actData.typeParent)
                this.actData["typeParentName"] = c.name;
            });
          } else {
            this.$message({
              message: res.data.msg || `加载失败`,
              type: "error"
            });
          }
        } catch (err) {
          console.log(err);
        } finally {
          this.hideLoading();
        }
      });
    }
  },
  created() {
    this.getActivityTypeParent();
    this.getDataDict("CAUSE_PARENT");
  }
};
</script>

<style lang="scss" scoped>
.openactivityinfo {
  font-size: 14px;
  line-height: 30px;
  .school-detail-img {
    width: 300px;
    height: 300px;
    cursor: pointer;
    /deep/ .el-image__error {
      background: #eee;
    }
  }
  .title {
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    color: #000;
  }
  .subtitle {
    text-align: right;
  }
  .btn_list {
    text-align: center;
    padding-top: 30px;
  }
  .activity_box {
    position: relative;
    .activity_num {
      position: absolute;
      bottom: 0;
      left: 25%;
    }
  }
  .download {
    color: #169bd5;
  }
}
.visble_conter {
  line-height: 30px;
  .visble_title {
    color: #000;
    span {
      color: #d9001b;
    }
  }
}
</style>