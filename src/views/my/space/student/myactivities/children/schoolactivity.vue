
<template>
  <div class="schoolactivity">
    <ul class="schoolactivity-ul">
      <li class="schoolactivity-li">活动名称</li>
      <li class="schoolactivity-li">活动时间</li>
      <li class="schoolactivity-li">联系方式</li>
      <li class="schoolactivity-li">是否收费</li>
      <li class="schoolactivity-li">活动状态</li>
      <li class="schoolactivity-li">操作</li>
    </ul>
    <ul class="schoolactivity-conent-ul">
      <li class="schoolactivity-conent-li" v-for="(g,index) in datas" :key="index">
        <div class="schoolactivity-conent-li-title">
          <div>
            <span>基地名称:</span>
            <span>{{g.baseName}}</span>
          </div>
          <div>
            <span>活动地点:</span>
            <span>{{g.activityAddr}}</span>
          </div>
          <div>
            <span>报名时间:</span>
            <span>{{g.signTime.slice(0,16)}}</span>
          </div>
        </div>
        <div class="schoolactivity-conent-li-one">
          <div @click="goactivityDetail()">
            <ov-image :src-data="g.cover" :type="3" :img-height="'98px'"></ov-image>
          </div>
          <div @click="goactivityDetail()">
            <h3>{{g.activityName}}</h3>
            <p>{{g.typeParent}}>{{g.typeChild}}</p>
          </div>
        </div>
        <div class="schoolactivity-conent-li-two">
          <div>
            <span>{{g.activityStartTime.slice(0,10)}}</span>
            <span>{{g.activityStartTime.slice(10,16)}}</span>
          </div>
          <p v-if="g.courseDuration == 'A'">(半天)</p>
          <p v-else-if="g.courseDuration == 'B'">(一天)</p>
          <p v-else-if="g.courseDuration == 'C'">(一天半)</p>
          <p v-else-if="g.courseDuration == 'D'">(两天)</p>
          <p v-else-if="g.courseDuration == 'E'">(两天半)</p>
          <p v-else-if="g.courseDuration == 'F'">(三天)</p>
        </div>
        <div class="schoolactivity-conent-li-thr">
          <div>
            <span>学校联系人</span>
            <span>{{g.contact}}</span>
          </div>
          <p>{{g.contactPhone}}</p>
        </div>
        <div class="schoolactivity-conent-li-for">
          <span v-if="g.isFree == 0">免费</span>
          <span v-else-if="g.isFree == 1">{{g.price}}</span>
        </div>
        <div class="schoolactivity-conent-li-fiv">
          <span v-if="g.status == 0">未开始</span>
          <span v-else-if="g.status == 1">进行中</span>
          <span v-else-if="g.status == 2">待评价</span>
          <span v-else-if="g.status == 3">已结束</span>
        </div>
        <div class="schoolactivity-conent-li-six" v-if="g.status == 0">
          <span>--</span>
        </div>
        <div class="schoolactivity-conent-li-six" v-if="g.status == 1 || g.status == 2">
          <span @click="goactivityEvaluation(g)">评价</span>
          <span>发布作品</span>
          <span v-if="g.workStatus == 1">查看作品</span>
        </div>
        <div class="schoolactivity-conent-li-six" v-if="g.status == 3">
          <span @click="golookactivityEvaluation(g)">查看评价</span>
          <span>发布作品</span>
          <span v-if="g.workStatus == 1">查看作品</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { requestwebapiStudentactivitylist } from "@/api/webApi/space";
export default {
  name: "schoolactivity",
  props: {},
  data() {
    return {
      datas: []
    };
  },
  computed: {
    studentStatus() {
      return this.$store.state.test.studentStatus;
    }
  },
  created() {
    this.getlists();
  },
  mounted() {},
  watch: {
    studentStatus: {
      handler: function() {
        this.getlists();
      }
    }
  },
  methods: {
    async getlists() {
      let form = {
        status: this.studentStatus,
        activityType: "1"
      };
      const res = await requestwebapiStudentactivitylist(form, this.pages);
      const { entity: datas = {} } = res.data;
      try {
        this.datas = datas.resultData || [];
        this.totalNum = datas.totalNum || 0;
      } catch (error) {
        this.datas = [];
      } finally {
        this.isLoading = false;
      }
    },
    goactivityDetail() {
      this.$router.push({
        path: "/space/myactivities/activityDetail",
        query: { type: 1 }
      });
    },
    goactivityEvaluation(detail) {
      sessionStorage.setItem(
        "xk_registrationactivitiesDetail",
        JSON.stringify(detail)
      );
      this.$router.push({
        path: "/space/myactivities/activityEvaluation",
        query: { activityId: detail.activityId, type: "1" }
      });
    },
    golookactivityEvaluation(detail) {
      sessionStorage.setItem(
        "xk_registrationactivitiesDetail",
        JSON.stringify(detail)
      );
      this.$router.push({
        path: "/space/myactivities/lookactivityEvaluation",
        query: { activityId: detail.activityId, type: "1" }
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.schoolactivity {
  min-height: 600px;
  .schoolactivity-ul {
    margin-top: 20px;
    overflow: hidden;
    .schoolactivity-li {
      float: left;
      font-size: 16px;
      line-height: 29px;
      letter-spacing: 0px;
      color: #333333;
      text-align: center;
      &:nth-child(1) {
        width: 352px;
        text-align: left;
      }
      &:nth-child(2) {
        width: 100px;
      }
      &:nth-child(3) {
        width: 124px;
      }
      &:nth-child(4) {
        width: 98px;
      }
      &:nth-child(5) {
        width: 120px;
      }
      &:nth-child(6) {
        width: 166px;
      }
    }
  }
  .schoolactivity-conent-ul {
    width: 100%;
    margin-top: 16px;
    .schoolactivity-conent-li {
      width: 100%;
      height: 192px;
      margin-bottom: 24px;
      box-shadow: 0px 1px 2px 0px rgba(25, 25, 25, 0.19);
      .schoolactivity-conent-li-title {
        height: 48px;
        line-height: 48px;
        background-color: #f5f8ff;
        div {
          span {
            &:nth-child(1) {
              font-size: 12px;
              letter-spacing: 0px;
              color: #666666;
            }
            &:nth-child(2) {
              font-size: 12px;
              letter-spacing: 0px;
              color: #333333;
            }
          }
          &:nth-child(1) {
            float: left;
            margin-left: 10px;
            margin-right: 60px;
          }
          &:nth-child(2) {
            float: left;
          }
          &:nth-child(3) {
            float: right;
            margin-right: 30px;
          }
        }
      }
      .schoolactivity-conent-li-one {
        width: 352px;
        height: 142px;
        float: left;
        padding: 20px 0 0 10px;
        border-right: 1px solid #e2e2e4;
        box-sizing: border-box;
        div {
          float: left;
          &:nth-child(1) {
            width: 160px;
            height: 98px;
            // margin-left: 10px;
            // margin-top: 20px;
          }
          &:nth-child(2) {
            width: 168px;
            margin-left: 10px;
            h3 {
              width: 100%;
              font-size: 16px;
              line-height: 27px;
              letter-spacing: 0px;
              color: #333333;
              margin-bottom: 20px;
            }
            p {
              width: 100%;
              font-size: 14px;
              line-height: 24px;
              letter-spacing: 0px;
              color: #666666;
            }
          }
        }
      }
      .schoolactivity-conent-li-two,
      .schoolactivity-conent-li-thr {
        width: 100px;
        height: 142px;
        float: left;
        border-right: 1px solid #e2e2e4;
        padding: 20px 0 0 10px;
        box-sizing: border-box;
        div {
          span {
            display: inline-block;
            font-size: 14px;
            line-height: 18px;
            letter-spacing: 0px;
            color: #666666;
          }
        }
        p {
          margin-top: 20px;
          font-size: 14px;
          line-height: 18px;
          letter-spacing: 0px;
          color: #666666;
          width: 100%;
          text-align: center;
        }
      }
      .schoolactivity-conent-li-thr {
        width: 122px;
      }
      .schoolactivity-conent-li-for {
        text-align: center;
        float: left;
        height: 142px;
        line-height: 142px;
        width: 98px;
        border-right: 1px solid #e2e2e4;
        box-sizing: border-box;
        span {
          font-size: 16px;
          line-height: 18px;
          letter-spacing: 0px;
          color: #1baf1b;
        }
      }
      .schoolactivity-conent-li-fiv {
        text-align: center;
        float: left;
        height: 142px;
        line-height: 142px;
        width: 120px;
        border-right: 1px solid #e2e2e4;
        box-sizing: border-box;
        span {
          font-size: 14px;
          line-height: 18px;
          letter-spacing: 0px;
          color: #666666;
        }
      }
      .schoolactivity-conent-li-six {
        width: 180px;
        height: 142px;
        text-align: center;
        float: left;
        span {
          display: block;
          width: 84px;
          height: 32px;
          line-height: 32px;
          text-align: center;
          background-color: #ffffff;
          border-radius: 4px;
          border: solid 1px #008aff;
          margin-left: 40px;
          margin-bottom: 10px;
          color: #008aff;
          &:nth-child(1) {
            margin-top: 15px;
          }
        }
      }
    }
  }
}
</style>
