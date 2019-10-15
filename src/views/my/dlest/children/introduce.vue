<template>
  <div class="introduce">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="location" label="地区" width="180" align="center"></el-table-column>
      <el-table-column prop="schoolName" label="参与学校" width="180" align="center"></el-table-column>
      <el-table-column prop="address" label="学校地址" align="center"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { gettingschoollist } from '@/api/frontstage'
export default {
    data() {
        return {
            tableData: []
        }
    },
    created() {
        this.getlist()
    },
    methods: {
        async getlist() {
            let id = localStorage.getItem('activeid')
            const datas = await gettingschoollist({activityId: id,},this.pages)
            this.tableData = datas.data.entity.resultData
        }
    }
    // 院校
}
</script>
<style lang="scss" scoped>
.introduce{
    background: #fff;
    padding: 40px 30px 50px 30px;
    min-height: 600px;
}
</style>
