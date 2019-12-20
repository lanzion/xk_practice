<template>
  <div class="submitted">
    <el-table :data="tableData" style="width: 980px">
      <el-table-column prop="name" label="标题" width="180" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" width="110" align="center"></el-table-column>
      <el-table-column prop="activeis" label="关联活动" align="center"></el-table-column>
      <el-table-column prop="date" label="提交时间" width="180" align="center"></el-table-column>
      <el-table-column prop="start" label="发布时间" width="180" align="center"></el-table-column>
      <el-table-column prop="address" label="状态" width="120" align="center">
        <template>
          <span>未审核</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" width="120" label="操作" align="center">
        <template>
          <span class="editor">编辑</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "submitted",
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
  methods: {},
  components: {}
};
</script>

<style scoped lang="scss">
.submitted {
    min-height: 600px;
  .editor {
    display: inline-block;
    width: 80px;
    height: 30px;
    border-radius: 4px;
    border: solid 1px #42a6fe;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: #008aff;
    cursor: pointer;
  }
}
</style>
