
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
      <li class="schoolactivity-conent-li">
        <div class="schoolactivity-conent-li-title">
          <div>
            <span>基地名称:</span>
            <span>广州城市规划展览中心</span>
          </div>
          <div>
            <span>活动地点:</span>
            <span>广州市天河区兴科路723号</span>
          </div>
          <div>
            <span>报名时间:</span>
            <span>2019-11-18 11：12：30</span>
          </div>
        </div>
        <div class="schoolactivity-conent-li-one">
          <div>
            <ov-image :src-data="'123'" :type='3' :img-height="'98px'"></ov-image>
          </div>
          <div>
            <h3>寻找广州最美天际线</h3>
            <p>课程分类一>课程分类二</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "schoolactivity",
  props: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="scss">
.schoolactivity {
  .schoolactivity-ul {
    margin-top: 20px;
    overflow: hidden;
    .schoolactivity-li {
      float: left;
      font-size: 16px;
      line-height: 29px;
      letter-spacing: 0px;
      color: #333333;
      &:nth-child(1) {
        width: 372px;
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
    height: 48px;
    margin-top: 16px;
    background-color: #f5f8ff;
    .schoolactivity-conent-li {
        width: 100%;
        height: 192px;
      box-shadow: 0px 1px 2px 0px 
		rgba(25, 25, 25, 0.19);
      .schoolactivity-conent-li-title {
           height: 48px;
      line-height: 48px;
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
    }
  }
}
</style>
