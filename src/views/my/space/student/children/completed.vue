<template>
  <div class="completed">
    <ul>
      <li @click="changes(g.id)" v-for="(g,index) in datas" :key="index">
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
        <span>课程详情</span>
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
    <div class="block" v-if="!nomore" :style="{'float':'right','marginRight':'30px'}">
      <pagination
        :param="pages"
        :page-sizes="[9, 12, 15]"
        :total="totalNum"
        @change="getlist"
      ></pagination>
    </div>
  </div>
</template>
<script>
import { studentcoursecompletedlist } from "@/api/frontstage";
export default {
  name: "completed",
  data() {
    return {
      datas: [],
      code: "",
      nomore: false,
      pages: {
        pageNum: 1,
        pageSize: 9
      }
    };
  },
  created() {
    this.getlist();
  },
  computed: {
    workname() {
      return this.$store.state.test.workname;
    }
  },
  watch: {
    workname: {
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
    async getlist(val) {
      let res = await studentcoursecompletedlist(
        { name: this.workname },
        this.pages
      );
      this.datas = res.data.entity.resultData;
      this.totalNum = res.data.entity.totalNum;
    },
    changes(gid) {
      localStorage.setItem("gid", gid);
      this.$router.push({
        name: "detailsofstudentcourses",
        params: { id: gid }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.completed {
  width: 100%;
  height: 100%;
  padding-bottom: 80px;
  min-height: 500px;
  ul {
    width: 100%;
    height: 100%;
    font-size: 0px;
    padding: 42px 20px 0 20px;
    box-sizing: border-box;
    li {
      display: inline-block;
      width: 277px;
      height: 203px;
      margin-left: 28px;
      margin-bottom: 40px;
      cursor: pointer;
      div {
        width: 100%;
        height: 155px;
        img {
          width: 100%;
          height: 155px;
        }
      }
      h4 {
        margin-top: 10px;
        margin-bottom: 7px;
        font-size: 16px;
        color: #333;
        text-indent: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span {
        height: 24px;
        font-size: 14px;
        display: block;
        text-indent: 6px;
        color: #008aff;
        border: solid 1px #008aff;
        border-radius: 12px;
        width: 80px;
        text-align: center;
        line-height: 24px;
        &:hover {
          background-color: #008aff;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
