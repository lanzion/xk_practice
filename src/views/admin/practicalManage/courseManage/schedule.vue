<template>
   <div class="school-list-wrap">
        <!-- 搜索表单 -->
        <div class="school-head-title-box">
              2019年2月1日 星期一
        </div>
        <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border :header-cell-style="{'background-color':'#eee', 'color':'#666'}">
            <el-table-column prop="account" label="来访时间" align="center"/>
            <el-table-column prop="time" label="来访学校" align="center"/>
            <el-table-column prop="time" label="服务标题" align="center"/>
            <el-table-column prop="state" label="代课教师" align="center"/>
            <el-table-column prop="state" label="来访班级" align="center"/>
             <el-table-column prop="state" label="参与学生" align="center"/>
        </el-table>

        <!-- 分页 -->
        <pagination :param="pages" :total="totalNum" @change="getDatas" ></pagination>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { requestAdminTeacherList} from '@/api/base'

import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'

export default {
    mixins: [permission, user],
    data() {
        return {
            listData: [
                {
                    name: '李老师',
                    phone: '15245222002',
                    time: '2019-6-28 12:00',
                    theme: '小草药大用途',
                    type: '科技教育>科普教育qqweqweqweqweqwqweqweqweqweqweqweqwewqwqwweewewewewewewewe',
                    account: '56d4122ds',
                    state: '已分配'
                },
                {
                    name: '昝老师',
                    phone: '15245222002',
                    time: '2019-6-28 12:00',
                    theme: '小草药大用途',
                    type: '科技教育>科普教育',
                    account: '56d4s5ds',
                    state: '未分配'
                },
                {
                    name: '王老师',
                    phone: '15245222002',
                    time: '2019-6-20 12:00',
                    theme: '小草药大用途',
                    type: '科技教育>科普教育',
                    account: '77d4s5ds',
                    state: '已终止'
                },
            ],
           
        }
    },
    computed: {
        ...mapState('dict', {
            subject: state => (state.subject || {}).dicList || [],
            auditStatus: state => (state.examineStatus || {}).dicList || [],
            lockStatus: state => (state.lockStatus || {}).dicList || []
        })
    },
    created() {
        this.getDataDict({ code: 'subject' })
        this.getDatas()
    },
    watch: {
        
    },
    methods: {
        ...mapActions('dict', ['getDataDict']),

        // 重置搜索表单
        resetForm() {
           
        },

        // 重置分页
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.getDatas()
        },

        // 获取列表数据
        async getDatas() {
            this.isLoading = true
            const res = await requestAdminTeacherList({ name: '' }, this.pages)

            const { entity: datas = {} } = res.data

            try {
                this.datas = datas.resultData || []
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.datas = []
            } finally {
                this.isLoading = false
            }
        },

        // 获取详情数据
        getDetailDatas() {
            this.$refs.detail.getDetailData()
        },
       
    }
}
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/mixin/core.scss';
    .elFrom {
        width: 100%;
    }
    .lockStatus {
        &::before {
            font-size: 18px;
            vertical-align: sub;
        }
        @each $color-key, $color-value in $--lock-status-color {
            &.__status-#{$color-key} {
                color: $color-value;
            }
        }
    }
    .auditStatus {
        @each $color-key, $color-value in $--examine-status-color {
            &.__status-#{$color-key} {
                color: $color-value;
            }
        }
    }
    .icon-famous {
        font-size: 20px;
        vertical-align: middle;
        &.is-active {
            color: $--color-secondary;
        }
    }
    .school-head-title-box{
        line-height: 40px;
        font-size: 14px;
        color: #606266;
        padding:30px 0 14px 0;
    }
    
</style>
