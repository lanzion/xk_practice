<template>
    <div class="introduce">
        <el-table :data="tableData" border :header-cell-style="{background:'#ccc',color:'#606266'}">
            <el-table-column prop="schoolName" label="学校名称" align="center"></el-table-column>
            <el-table-column prop="schoolAddress" label="地区" align="center"></el-table-column>
        </el-table>
        <div class="more">
            <span @click="get()">查看全部院校>></span>
        </div>
        <el-dialog title="参与院校" :visible.sync="dialogTableVisible" center>
            <el-table
                :data="gridData"
                border
                :header-cell-style="{background:'#ccc',color:'#606266'}"
            >
                <el-table-column property="schoolName" label="学校名称" align="center"></el-table-column>
                <el-table-column property="schoolAddress" label="地区" align="center"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
import { requestParticipatingSchools } from '@/api/webApi/curriculumCenter'
export default {
    name: 'participatinginstitutions',
    data() {
        return {
            id: '',
            tableData: [],
            gridData: [],
            dialogTableVisible: false,
            pages: {
                pageSize: 10,
                pageNum: 1
            }
        }
    },
    created() {
        this.getlist()
    },
    methods: {
        async getlist() {
            let courseId = this.$route.query.id
            if (courseId) {
                this.id = courseId
            } else {
                this.id = sessionStorage.getItem('courseId')
            }
            const res = await requestParticipatingSchools(
                { id: this.id },
                this.pages
            )
            const { entity: datas = {} } = res.data
            try {
                this.gridData = datas.resultData || []
                this.tableData = datas.resultData.splice(10)
                this.totalNum = datas.totalNum || 0
                console.log(this.datas)
                console.log(this.gridData)
            } catch (error) {
                (this.gridData = []), (this.tableData = [])
            } finally {
                this.isLoading = false
            }
        },
        get() {
            this.dialogTableVisible = true
        }
    }
    // 院校
}
</script>
<style lang="scss" scoped>
.introduce {
    padding: 0px 30px 50px 30px;
}
.more {
    width: 100%;
    font-size: 14px;
    color: #ccc;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
    span {
        cursor: pointer;
    }
}
</style>
