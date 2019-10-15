<template>
  <div class="origs">
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
        <h4>{{g.workName}}</h4>
        <span class="spn1">{{g.createName}}</span>
        <span :style="{'marginRight':'12px','float': 'right'}">{{g.className}}</span>
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
      v-if="!nomore"
      :param="pages"
      :total="totalNum"
      @change="getlist"
      :page-sizes="[6, 12, 18]"
      style="text-align: right;"
    ></pagination>
  </div>
</template>
<script>
import { listofteachersunevaluatedworks } from "@/api/frontstage";
export default {
  name: "origs",
  data() {
    return {
      nomore: false,
      datas: [],
      pages: {
        pageNum: 1,
        pageSize: 6
      }
    };
  },
  computed: {
    teachernamefen() {
      return this.$store.state.test.teachernamefen;
    }
  },
  watch: {
    teachernamefen: {
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
    // 重置分页
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getlist();
    },
    changes(busId) {
      localStorage.setItem("busId", busId);
      this.$router.push({
        name: "scofworks",
        params: { busId: busId, type: 1 }
      });
    },
    async getlist() {
      let res = await listofteachersunevaluatedworks(
        { cname: this.teachernamefen },
        this.pages
      );
      this.datas = res.data.entity.resultData || [];
      this.totalNum = res.data.entity.totalNum;
    }
  },
  created() {
    this.$store.commit("changetitle", "作品评分");
    this.getlist();
  }
};
</script>
<style lang="scss" scoped>
.origs {
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
        display: inline-block;
        text-indent: 6px;
        color: #999999;
      }
      .spn1 {
        color: #333333;
        font-size: 14px;
        margin-right: 28px;
      }
    }
  }
}
</style>
