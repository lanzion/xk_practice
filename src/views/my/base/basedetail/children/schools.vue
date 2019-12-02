<template>
    <div class="schools">
        <div class="title">
            <h4>参与学校({{num}}所)</h4>
        </div>
        <el-table
            :data="lists"
            border
            :header-cell-style="{background:'#f2f5fb',color:'#666666'}"
        >
            <el-table-column property="schoolName" label="学校名称" align="center"></el-table-column>
            <el-table-column property="schoolAddress" label="地区" align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { requestwebapibaseDetailschool } from '@/api/webApi/base'
export default {
    name: 'schools',
    data() {
        return {
            lists: [],
            num: ''
        }
    },
    created() {
        this.getSchoollist()
    },
    methods: {
        async getSchoollist() {
            this.isLoading = true
            let pages = {
                pageNum: 1,
                pageSize: 12
            }
            let baseId = this.$route.query.baseId
            if (baseId) {
                this.id = baseId
            } else {
                this.id = sessionStorage.getItem('baseId')
            }
            const res = await requestwebapibaseDetailschool(
                {id: this.id},
                pages
            )
            const { entity: datas = {} } = res.data
            try {
                this.lists = datas.resultData || []
                this.num = datas.totalNum
            } catch (error) {
                this.datas = []
            } finally {
                this.isLoading = false
            }
        },
    }
}
</script>
<style lang='scss' scoped>
.schools{
    min-height: 500px;
    .title{
        text-align: center;
        font-size: 22px;
        font-weight: 800;
        color:#333;
        margin-bottom: 20px;
    }
}
</style>
