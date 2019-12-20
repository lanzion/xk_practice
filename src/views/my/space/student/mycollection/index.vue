<template>
  <div class="mycollection">
    <ul>
      <li class="active">
        <el-badge :value="`10`+'场'" :max="99" class="item">活动</el-badge>
      </li>
    </ul>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="活动标题" width="200" align="center"></el-table-column>
      <el-table-column prop="type" label="活动分类" width="170" align="center"></el-table-column>
      <el-table-column prop="date" width="250" label="报名时间(开始-截至)" align="center"></el-table-column>
      <el-table-column prop="status" width="120" label="报名状态" align="center">
        <template>
          <span>即将开放报名</span>
        </template>
      </el-table-column>
      <el-table-column prop="operate" label="操作" align="center">
        <template>
          <span class="del" @click="del">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "mycollection",
  props: {},
  data() {
    return {
      tableData: [
        {
          date: "2019-11-08 12:00",
          start: "2019-11-09 14:00",
          name: "最美天际线作品",
          type: " 文化素养>艺术素养",
          status: " 关联活动"
        },
        {
          date: "2019-11-08 12:00",
          start: "2019-11-09 14:00",
          name: "最美天际线作品",
          type: " 文化素养>艺术素养",
          status: " 关联活动"
        },
        {
          date: "2019-11-08 12:00",
          start: "2019-11-09 14:00",
          name: "最美天际线作品",
          type: " 文化素养>艺术素养",
          status: " 关联活动"
        },
        {
          date: "2019-11-08 12:00",
          start: "2019-11-09 14:00",
          name: "最美天际线作品",
          type: " 文化素养>艺术素养",
          status: " 关联活动"
        },
        {
          date: "2019-11-08 12:00",
          start: "2019-11-09 14:00",
          name: "最美天际线作品",
          type: " 文化素养>艺术素养",
          status: " 关联活动"
        }
      ]
    };
  },
  computed: {},
  created() {
    this.$store.commit("changetitle", "我的活动");
  },
  mounted() {},
  watch: {},
  methods: {
    del() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.mycollection {
  min-height: 600px;
  width: 978px;
  .del {
    cursor: pointer;
    display: inline-block;
    width: 80px;
    height: 30px;
    background: #ccc;
    border: none;
    color: #fff;
    text-align: center;
    line-height: 30px;
  }
  ul {
    width: 100%;
    height: 44px;
    margin-bottom: 20px;
    border-bottom: 2px solid #eaeaea;
    li {
      padding: 0 8px;
      height: 35px;
      font-size: 18px;
      float: left;
      margin-right: 50px;
      line-height: 29px;
      letter-spacing: 0px;
      color: #333333;
      text-align: center;
      line-height: 32px;
      margin-top: 9px;
      cursor: pointer;
    }
    .active {
      color: #ffffff;
      background-color: #42a6fe;
      border-radius: 4px 4px 0px 0px;
    }
  }
}
</style>
