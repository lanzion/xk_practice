<template>
  <div class="drafts">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="标题" width="150" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" width="100" align="center"></el-table-column>
      <el-table-column prop="activeis" label="关联活动" width="170" align="center"></el-table-column>
      <el-table-column prop="date" label="最后保存时间" width="170" align="center"></el-table-column>
      <el-table-column prop="address" label="状态" align="center">
        <template>
          <span>未审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" align="center" width="300">
        <template>
          <span class="editor">编辑</span>
          <span class="editor">提交</span>
          <span class="editor del" @click="del">删除</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "drafts",
  props: {},
  data() {
    return {
      tableData: [
        {
          date: "2019-11-08 12:00",
          start: "2019-11-09 14:00",
          name: "最美天际线作品",
          type: " 活动作品",
          activeis: " 关联活动",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2019-11-08 12:00",
          start: "2019-11-09 14:00",
          name: "最美天际线作品",
          type: " 活动作品",
          activeis: " 关联活动",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2019-11-08 12:00",
          start: "2019-11-09 14:00",
          name: "最美天际线作品",
          type: " 活动作品",
          activeis: " 关联活动",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2019-11-08 12:00",
          start: "2019-11-09 14:00",
          name: "最美天际线作品",
          type: " 活动作品",
          activeis: " 关联活动",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  computed: {},
  created() {},
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
.drafts {
  min-height: 600px;
  .editor {
    display: block;
    float: left;
    width: 80px;
    height: 30px;
    border-radius: 4px;
    border: solid 1px #42a6fe;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: #008aff;
    margin-right: 10px;
    cursor: pointer;
  }
  .del {
    background: #ccc;
    border: none;
    color: #fff;
  }
}
</style>
