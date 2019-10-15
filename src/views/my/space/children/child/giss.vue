<template>
  <div class="abtd">
    <ul>
      <li @click="changes(g.courseId)" v-for="(g,index) in datas" :key="index">
        <div>
          <el-image :src="g.cover" fit="cover" style="width: 277px;height:155px">
            <div
              slot="error"
              class="image-slot"
              style="font-size: 30px;line-height: 155px;text-align: center;"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <h4>{{g.name}}</h4>
        <span>{{g.className}}</span>
         <div class="timer">{{g.startDate}}~{{g.endDate}}</div>
      </li>
    </ul>
    <div
      v-if="nomore"
      :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
    >
      <img src="~@assets/image/nothingData.svg" alt />
      <div :style="{'lineHeight':'0'}">
        <i :style="{'fontSize':'18px'}">暂无数据...</i>
      </div>
    </div>
    <pagination
      :param="pages"
      :total="totalNum"
      @change="getlist"
      style="text-align: right;"
    ></pagination>
  </div>
</template>
<script>
import { listofteacherscourses } from "@/api/frontstage";
export default {
  name: "abtd",
  data() {
    return {
      nomore: false,
      datas: [],
      code: "",
      pages: {
        pageNum: 1,
        pageSize: 10
      },
      totalNum: 0
    };
  },
  computed: {
    teacherworkname() {
      return this.$store.state.test.teacherworkname;
    }
  },
  watch: {
    teacherworkname: {
      handler: function() {
        this.getlist();
      }
    },
    "datas.length": {
      handler(newval, oldval) {
        if (newval === 0) {
          this.nomore = true;
        } else {
          this.nomore = false;
        }
      },
      deep: true
    }
  },
  methods: {
    changes(courseId) {
      localStorage.setItem("courseId", courseId);
      this.$router.push({ name: "sdetails", params: { courseId: courseId } });
    },
    async getlist() {
      let res = await listofteacherscourses(
        { status: 2, className: this.teacherworkname },
        this.pages
      );
      this.datas = res.data.entity.resultData;
      this.totalNum = res.data.entity.totalNum;
    }
  },
  created() {
    this.$store.commit("changetitle", "实践课堂");
    this.code = this.$store.state.login.identity;
    this.getlist();
  }
};
</script>
<style lang="scss" scoped>
.abtd {
  width: 100%;
  height: 100%;
  padding-bottom: 80px;
  min-height: 500px;
  overflow: hidden;
  ul {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 0px;
    padding: 42px 20px 0 20px;
    box-sizing: border-box;
    li {
      display: inline-block;
      width: 277px;
      height: 232px;
      margin-left: 28px;
      margin-bottom: 40px;
      cursor: pointer;
      div {
        width: 100%;
        height: 155px;
        img {
          width: 100%;
        }
      }
      h4 {
        margin-top: 10px;
        margin-bottom: 7px;
        font-size: 16px;
        color: #333;
        text-indent: 6px;
      }
      span {
        font-size: 12px;
        display: block;
        text-indent: 6px;
        color: #999999;
      }
      .timer{
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
         text-indent: 6px;
        color: #999;
      }
    }
  }
}
</style>
