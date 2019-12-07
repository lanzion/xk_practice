<template>
    <div class="schools">
        <div class="title" v-if="nomore">
            <h4>参与学校({{num}}所)</h4>
        </div>
        <el-table v-if="nomore" class="header" :data="datas" border :header-cell-style="{background:'#f2f5fb',color:'#666666'}">
            <el-table-column label="学校名称" align="center">
                <template slot-scope="scope">
                    <span @click="goschool(scope.row.schoolId)">{{scope.row.schoolName}}</span>
                </template>
            </el-table-column>
            <el-table-column property="schoolAddress" label="地区" align="center"></el-table-column>
        </el-table>
        <infinite-loading @infinite="getSchoollist" ref="infiniteLoading">
            <span slot="spinner">正在加载中...</span>
            <span slot="no-more">没有更多数据了...</span>
            <no-data slot="no-results"></no-data>
        </infinite-loading>
    </div>
</template>

<script>
import { requestwebapibaseDetailschool } from '@/api/webApi/base'
export default {
    name: 'schools',
    data() {
        return {
            datas: [],
            num: '',
            pages: {
                pageSize: 12,
                pageNum: 1
            },
            nomore: false,
        }
    },
    created() {
        // this.getSchoollist()
    },
    watch: {
        'datas.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomore = false
                } else {
                    this.nomore = true
                }
            },
            deep: true
        }
    },
    methods: {
        async getSchoollist($state) {
            this.isLoading = true
            let baseId = this.$route.query.baseId
            if (baseId) {
                this.id = baseId
            } else {
                this.id = sessionStorage.getItem('baseId')
            }
            const res = await requestwebapibaseDetailschool(
                { id: this.id },
                this.pages
            )
            const { entity: datas = {} } = res.data
            try {
                if (datas.resultData.length) {
                    this.datas = datas.resultData
                    $state.loaded()
                    if (this.datas.length / 5 === 12) {
                        $state.complete()
                    }
                    if (this.datas.length < this.pages.pageSize) {
                        $state.complete()
                    }
                    this.pages.pageSize += 12
                } else {
                    $state.complete()
                }
                this.totalNum = datas.totalNum || 0
                this.num = this.totalNum
            } catch (error) {
                this.datas = []
            } finally {
                this.isLoading = false
            }
        },
        goschool(id) {
            sessionStorage.setItem('schoolId', id)
            this.$router.push({
                path: '/school/schooldetail',
                query: { schoolId: id }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.schools {
    min-height: 500px;
    .title {
        text-align: center;
        font-size: 22px;
        font-weight: 800;
        color: #333;
        margin-bottom: 20px;
    }
    .header{
        margin-bottom: 30px;
    }
}
</style>
