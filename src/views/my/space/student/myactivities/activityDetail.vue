<template>
  <div class="activityDetail">
    <div class="activityDetail-img">
      <div class="activityDetail-fl fl">
        <ov-image :src-data="'123'" :img-height="'260px'" :type="3"></ov-image>
      </div>
      <div v-if="type===1" class="activityDetail-fr fl">
        <h3>{{cutString('机器人编程课程机器人编程课程课程机器人编机人编程课程机器人编程课程机器人编程课程课程机器人编机人编程课程',88)}}</h3>
        <el-row>
          <el-col class="dlest-fr-title">
            <span>课程分类:</span>
            <span>家国情怀教育</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dlest-fr-title">
            <span>基地/机构:</span>
            <span>广州城市规划展览中心</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dlest-fr-title">
            <span>基地/机构联系方式:</span>
            <span>王先生 13636363636</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dlest-fr-title">
            <span>基地/机构地址:</span>
            <span>广州市天河区广州市天河区兴科路723号</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dlest-fr-title">
            <span>学校带队教师及电话:</span>
            <span>张老师 1356252362</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dlest-fr-title">
            <span>活动开始时间及时长:</span>
            <span>2019-11-08上午 半天</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dlest-fr-title-one">
            <span>选修类型:</span>
            <span>必修</span>
          </el-col>
          <el-col class="dlest-fr-title-one">
            <span>适合学段:</span>
            <span>初中、高中</span>
          </el-col>
          <el-col class="dlest-fr-title-one">
            <span>是否收费:</span>
            <span>免费</span>
          </el-col>
        </el-row>
      </div>
      <div v-else-if="type===2" class="activityDetail-fr fl">
        <h3>{{cutString('机器人编程课程机器人编程课程课程机器人编机人编程课程机器人编程课程机器人编程课程课程机器人编机人编程课程',88)}}</h3>
        <el-row>
          <el-col class="dlest-fr-title">
            <span>活动分类:</span>
            <span>家国情怀教育</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dlest-fr-title">
            <span>基地/机构:</span>
            <span>广州城市规划展览中心</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dlest-fr-title">
            <span>联系方式:</span>
            <span>王先生 13636363636</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dlest-fr-title">
            <span>活动地点:</span>
            <span>广州市天河区广州市天河区兴科路723号</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dlest-fr-title">
            <span>集合地点:</span>
            <span>广州市天河区广州市天河区兴科路723号正门</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dlest-fr-title">
            <span>活动时间:</span>
            <span>2019-11-08 10:00-12:00</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="dlest-fr-title-two">
            <span>适合学段:</span>
            <span>初中、高中</span>
          </el-col>
          <el-col class="dlest-fr-title-two">
            <span>是否收费:</span>
            <span>免费</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="start-stups">
      <div class="start-title">活动当前进度:</div>
      <div class="start-stups-col">
        <span :class="active > 0 ? 'start-stups-num active':'start-stups-num' ">1</span>
        <span :class="active > 0 ? 'start-stups-rows active':'start-stups-rows' ">学校组织活动</span>
        <span :class="active > 0 ? 'start-stups-width active':'start-stups-width' "></span>
      </div>
      <div class="start-stups-col">
        <span :class="active > 1 ? 'start-stups-num active':'start-stups-num' ">2</span>
        <span :class="active > 1 ? 'start-stups-rows active':'start-stups-rows' ">开展实践活动</span>
        <span :class="active > 1 ? 'start-stups-width active':'start-stups-width' "></span>
      </div>
      <div class="start-stups-col">
        <span :class="active > 2 ? 'start-stups-num active':'start-stups-num' ">3</span>
        <span :class="active > 2 ? 'start-stups-rows active':'start-stups-rows' ">活动评价</span>
        <span :class="active > 2 ? 'start-stups-width active':'start-stups-width' "></span>
      </div>
      <div class="start-stups-col">
        <span :class="active > 3 ? 'start-stups-num active':'start-stups-num' ">4</span>
        <span :class="active > 3 ? 'start-stups-rows active':'start-stups-rows' ">活动结束</span>
      </div>
    </div>

    <div v-if="type===1" class="activityDetail-conent">
      <div class="title">
        <h3>课程设计者:</h3>
        <p>天河区教育局教研室 徐攀</p>
      </div>
      <div class="title">
        <h3>课程简介:</h3>
        <p>广州是历史文化名城，也是座英雄之城、花园之城。在日新月异的今天更是国际化大都市。自古以来，广州商贸、文化交流活跃，生活在广州的人民应该感受到这座城市的包容、拼搏之精神，也感受到大发展给市民带来的幸福。</p>
      </div>
      <div class="title">
        <h3>课程目标:</h3>
        <p>天河区教育局教研室 徐攀</p>
      </div>
      <div class="title">
        <h3>课前准备:</h3>
        <p>天河区教育局教研室 徐攀</p>
      </div>
      <div class="title">
        <h3>课程活动设计:</h3>
        <p>天河区教育局教研室 徐攀</p>
      </div>
      <div class="title">
        <h3>预计成果:</h3>
        <p>天河区教育局教研室 徐攀</p>
      </div>
      <div class="title">
        <h3>学习任务单:</h3>
        <p>天河区教育局教研室 徐攀</p>
      </div>
    </div>

    <div v-else-if="type===2" class="activityDetail-conent">
      <div class="title">
        <h3>活动详情:</h3>
        <p>
          广州是历史文化名城，也是座英雄之城、花园之城。在日新月异的今天更是国际化大都市。自古以来，广州商贸、文化交流活跃，生活在广州的人民应该感受到这座城市的包容、拼搏之精神，也感受到大发展给市民带来的幸福。
          广州商贸、文化交流活跃，生活在广州的人民应该感受到这座城市的包容、拼搏之精神，也感受到大发展给市民带来的幸福。
          广州商贸、文化交流活跃，生活在广州的人民应该感受到这座城市的包容、拼搏之精神，也感受到大发展给市民带来的幸福。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "activityDetail",
  props: {},
  data() {
    return {
      active: 1,
      type: 1
    };
  },
  computed: {},
  created() {
    this.type = this.$route.query.type;
    console.log(this.type);
  },
  mounted() {},
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="scss">
.activityDetail {
  width: 980px;
  .activityDetail-img {
    width: 100%;
    overflow: hidden;
    padding-bottom: 20px;
    border-bottom: 1px solid #b5b5b5;
    .activityDetail-fl {
      width: 420px;
      margin-right: 40px;
    }
    .activityDetail-fr {
      width: 500px;
      h3 {
        font-size: 22px;
        line-height: 29px;
        letter-spacing: 0px;
        color: #333333;
        margin-bottom: 20px;
      }
      .dlest-fr-title {
        height: 26px;
        span {
          height: 26px;
          vertical-align: middle;
          font-size: 16px;
          display: inline-block;
          &:nth-child(1) {
            color: #666;
            margin-right: 10px;
          }
          &:nth-child(2) {
            width: 336px;
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .dlest-fr-title-one {
        width: 130px;
        &:nth-child(2) {
          width: 200px;
        }
        &:nth-child(3) {
          float: right;
        }
        span {
          height: 26px;
          vertical-align: middle;
          font-size: 16px;
          display: inline-block;
          &:nth-child(1) {
            color: #666;
            margin-right: 10px;
          }
          &:nth-child(2) {
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .dlest-fr-title-two {
        width: 130px;
        &:nth-child(1) {
          width: 200px;
        }
        &:nth-child(2) {
          float: right;
        }
        span {
          height: 26px;
          vertical-align: middle;
          font-size: 16px;
          display: inline-block;
          &:nth-child(1) {
            color: #666;
            margin-right: 10px;
          }
          &:nth-child(2) {
            color: #333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
  .start-stups {
    background-color: rgba(242, 242, 242, 1);
    text-align: center;
    height: 50px;
    margin-top: 10px;
    padding: 0 10px;
    min-width: 1300px;
    .start-title {
      float: left;
      height: 50px;
      line-height: 50px;
      color: #000;
      font-size: 18px;
      margin-right: 20px;
    }
    .start-stups-col {
      float: left;
      margin-right: 10px;
      // width: 200px;
      height: 50px;
      line-height: 50px;
      text-align: left;
      .start-stups-num {
        display: inline-block;
        text-align: center;
        margin-right: 10px;
        width: 20px;
        height: 20px;
        line-height: 30px;
        color: #ccc;
        border: 2px solid #ccc;
        border-radius: 50%;
        vertical-align: middle;
        line-height: 20px;
      }
      .start-stups-rows {
        display: inline-block;
        color: #ccc;
        margin-right: 10px;
        font-size: 14px;
      }
      .start-stups-width {
        display: inline-block;
        border: 1px solid #ccc;
        width: 35px;
        vertical-align: middle;
      }
      .active {
        border-color: #008aff;
        color: #008aff;
      }
    }
  }
  .activityDetail-conent {
    width: 100%;
    overflow: hidden;
    padding: 36px 52px 36px 10px;
    box-sizing: border-box;
    margin-bottom: 80px;
    .title {
      margin-bottom: 30px;
      h3 {
        letter-spacing: 2px;
        margin-bottom: 15px;
        color: #000;
        font-size: 18px;
        color: #333;
      }
      p {
        letter-spacing: 1px;
        line-height: 30px;
        font-size: 16px;
        color: #666;
      }
    }
  }
}
</style>
