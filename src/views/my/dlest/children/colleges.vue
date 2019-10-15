<template>
  <div class="conent">
    <!-- <div class="conent_lf">
      <h3>{{datas.activityTheme}}</h3>
      <p>{{datas.activityTarget}}</p>
    </div>-->
    <div class="conent_lf">
      <div class="conent_lfone">
        <h3>活动主题</h3>
        <p>{{datas.activityTheme}}</p>
      </div>
      <div class="conent_lftwo">
        <h3>活动目标</h3>
        <p>{{datas.activityTarget}}</p>
      </div>
    </div>
    <div class="conent_lr">
      <p>实践统计</p>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="类型" width="96" align="center"></el-table-column>
        <el-table-column prop="name" label="数量" width="96" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="volist">
      <div class="volist_title">附件：</div>
      <div class="vo">
        <a
          class="down_vo"
          :href="item.resourceId"
          @click.prevent="downloadItem(item.resourceId,item.name)"
          v-for="item in datas.resourceVoList"
          :key="item.id"
        >{{item.name}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { getcontents, getpracticalstatistics } from "@/api/frontstage";
export default {
  data() {
    return {
      id: "",
      datas: "",
      playbillPage: "",
      tableData: [
        {
          date: "参与院校",
          name: "1"
        },
        {
          date: "参与班级",
          name: "2"
        },
        {
          date: "参与学生",
          name: "3"
        }
      ]
    };
  },
  computed: {
    aydetailsId() {
      return this.$store.state.test.aydetailsId;
    }
  },
  created() {
    this.getpractical();
    this.getqueryid();
  },
  methods: {
    async getqueryid() {
      let Mactiveid = localStorage.getItem("activeid");
      let activeid = this.$route.query.id ? this.$route.query.id : Mactiveid;
      let datas = await getcontents({ id: activeid });
      this.datas = datas.data.entity;
      this.playbillPage = this.datas.playbillPage;
      this.$store.commit("changesurl", this.playbillPage);
      this.$store.commit("changeactivitytitle", this.datas.title);
    },
    async getpractical() {
      this.id = this.$route.query.id ? this.$route.query.id : this.aydetailsId;
      this.$store.commit("changeaydetailsId", this.id);
      let lists = await getpracticalstatistics({ activityId: this.id });
      let list = lists.data;
      this.$set(this.tableData[0], "name", list.actschoolNum);
      this.$set(this.tableData[1], "name", list.classNum);
      this.$set(this.tableData[2], "name", list.actStudentNum);
    }
  }
};
</script>
<style lang="scss" scoped>
.conent {
  min-height: 600px;
  margin-bottom: 100px;
  .conent_lf {
    float: left;
    min-height: 500px;
    padding: 30px;
    width: 900px;
    background: #fff;
    margin-right: 24px;
    height: 100%;
    box-sizing: border-box;
    // h3 {
    //   // text-align: center;
    //   text-indent: 20px;
    //   // line-height: 114px;
    //   font-size: 16px;
    //   color: #333333;
    //   width: 100%;
    //   margin-bottom: 20px;
    // }
    // p {
    //   // padding: 20px 30px;
    //   text-indent: 20px;
    //   width: 100%;
    // }
    .conent_lfone {
      width: 100%;
      overflow: hidden;
      mask-border: 20px;
      h3 {
        width: 100%;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #333;
      }
      p {
        font-size: 14px;
        color: #666;
        text-indent: 20px;
        line-height: 20px;
      }
    }
    .conent_lftwo {
      h3 {
        width: 100%;
        text-align: center;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #333;
      }
      p {
        font-size: 14px;
        color: #666;
        text-indent: 20px;
        line-height: 20px;
      }
    }
  }
  .conent_lr {
    float: left;
    width: 240px;
    height: 280px;
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 18px 30px 18px;
    p {
      width: 100%;
      height: 70px;
      line-height: 70px;
      font-size: 16px;
      color: #333333;
    }
  }
  .volist {
    width: 900px;
    background: #fff;
    padding-bottom: 20px;
    padding-top: 20px;
    .volist_title {
      color: #333333;
      font-size: 16px;
      padding: 0 10px;
      display: inline-block;
      vertical-align: top;
      padding-top: 5px;
    }
    .vo {
      padding: 0 10px;
      display: inline-block;
      .down_vo {
        display: block;
        line-height: 24px;
      }
      .down_vo:hover {
        color: deepskyblue;
      }
    }
  }
}
.el-table__row {
  height: 36px;
}
</style>
