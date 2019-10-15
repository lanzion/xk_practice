<template>
  <div class="evaluateothersiscores">
    <div class="ungradedstudents">
      <div class="uploadworks">
        <ul>
          <li @click="changes(g.id)" v-for="(g,index) in datas" :key="index">
            <div>
              <el-image :src="g.cover" style="width: 277px;height:155px">
                <div
                  slot="error"
                  class="image-slot"
                  style="font-size: 30px;line-height: 155px;text-align: center;"
                >
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <h4>{{g.cname}}</h4>
            <span>{{g.workName}}</span>
            <span>{{g.createName}}</span>
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
    </div>
  </div>
</template>
<script>
import { evaluateothersevaluatedlist } from "@/api/frontstage";
export default {
  name: "evaluateothersiscores",
  data() {
    return {
      datas: [],
      pass: true,
      code: "",
      nomore: false,
      pages: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getlist();
  },
  computed: {
    newname() {
      return this.$store.state.test.newname;
    }
  },
  watch: {
    newname: {
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
      let res = await evaluateothersevaluatedlist(
        { cname: this.newname },
        this.pages
      );
      this.datas = res.data.entity.resultData;
    },
    changes(id) {
      localStorage.setItem("busId", id);
      this.$router.push({
        path: "/detailsofselfevaluation",
        query: { busId: id, type: 2, seetable: true }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.uploadworks {
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
      height: 285px;
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span {
        height: 30px;
        font-size: 14px;
        display: block;
        text-indent: 6px;
        border-radius: 12px;
        width: 100%;
        text-align: left;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>