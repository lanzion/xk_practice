<template>
  <div class="notstarted">
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
        <span>{{g.startDate.slice(0,10)}}~{{g.endDate.slice(0,10)}}</span>
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
import { studentsoursesnotstartedlist } from "@/api/frontstage";
export default {
  name: "notstarted",
  data() {
    return {
      datas: [],
      code: "",
      totalNum: 0,
      pages: {
        pageNum: 1,
        pageSize: 9
      },
      nomore: false
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
    async getlist() {
      let res = await studentsoursesnotstartedlist(
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
.notstarted {
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
      box-sizing: border-box;
      overflow: hidden;
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
        height: 30px;
        font-size: 12px;
        display: block;
        color: #666;
        width: 100%;
        text-align: left;
        text-indent: 6px;
        line-height: 30px;
        &:hover {
          color: #008aff;
        }
      }
    }
  }
}
</style>
