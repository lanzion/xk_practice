<template>
    <div class="school-list-wrap">
        <!-- 搜索表单 -->
        <div class="g-search--wrap clearfix">
            <el-form :inline="true" :model="search" class="fl" @submit.native.prevent>
                <el-form-item label="评价类型">
                    <el-select v-model="stateValue" placeholder="全部类型">
                        <el-option
                        v-for="item in fpStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>  
                 <el-form-item >
                    <el-form-item>
                        <el-input v-model="keyword" placeholder="实践活动标题"></el-input>
                    </el-form-item>
                    <el-button type="primary" plain @click="getDatas">搜索</el-button>
                </el-form-item>    
            </el-form>
        </div>
        
        <!-- 表格数据列表 -->
        <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border :header-cell-style="{'background-color':'#eee', 'color':'#666'}">
            <el-table-column prop="name" label="课程名称"/>
            <el-table-column prop="time" label="课程类型" />
            <el-table-column prop="name" label="活动基地" />
            <el-table-column prop="state" label="服务标题" />
            <el-table-column prop="state" label="评价人" />
            <el-table-column prop="state" label="所在班级" />
            <el-table-column prop="state" label="类型" />
            <el-table-column prop="state" label="评价内容" />
            <el-table-column label="操作" align="center" :width="operateWidth">
                <template slot-scope="scope">
                    <list-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { query: { id: 'id'} },
                        del: { callback: doDel },
                        audit: { active: isnAudit, callback: doDetail },
                        lock: { active: isnLock, callback: doLock },
                        unlock: { active: isLock, callback: doLock }
                    }" />
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>

        <!-- 重置密码弹窗 -->
        <el-dialog
            width="500px"
            title="重置密码"
            :visible.sync="passwordVisible">
            <reset-password-form ref="password" :ids.sync="selection" @close="close"></reset-password-form>
        </el-dialog>

        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { requestAdminStudentList, delStudent } from '@/api/base'

import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'

const search = {
    schoolId: '',
    provinceId: '',
    cityId: '',
    areaId: '440106',
    auditStatus: '',
    lockStatus: ''
}

export default {
    mixins: [permission, user],
    data() {
        return {
            activityTime:'',
            keyword: '',
            search: { ...search },
            selection: [],
           listData: [
                {
                    name: '李老师',
                    phone: '15245222002',
                    time: '2019-6-28 12:00',
                    theme: '小草药大用途',
                    type: '科技教育>科普教育qqweqweqweqweqwqweqweqweqweqweqweqwewqwqwweewewewewewewewe',
                    account: '56d4122ds',
                    state: '已查看'
                },
                {
                    name: '昝老师',
                    phone: '15245222002',
                    time: '2019-6-28 12:00',
                    theme: '小草药大用途',
                    type: '科技教育>科普教育',
                    account: '56d4s5ds',
                    state: '未查看'
                },
                {
                    name: '王老师',
                    phone: '15245222002',
                    time: '2019-6-20 12:00',
                    theme: '小草药大用途',
                    type: '科技教育>科普教育',
                    account: '77d4s5ds',
                    state: '未查看'
                },
            ],
            detailVisible: false, // 详情弹窗是否可见
            detail: {
                disabled: false,
                id: ''
            } ,// 详情组件传参
             fpStates: [
                {
                    value: '-1',
                    label: '全部类型'
                },
                {
                    value: '0',
                    label: '教师评价'
                },
                {
                    value: '1',
                    label: '学生评价'
                }
            ],
            stateValue: ''
        }
    },
    computed: {
        ...mapState('dict', {
            auditStatus: state => (state.examineStatus || {}).dicList || [],
            lockStatus: state => (state.lockStatus || {}).dicList || []
        })
    },
    created() {
        this.getDatas()
    },
    watch: {
        search: {
            handler: function () {
                this.$set(this.pages, 'pageNum', 1)
                this.getDatas()
            },
            deep: true
        },
      
    },
    methods: {
        ...mapActions('dict', ['getDataDict']),
        
        // 重置搜索表单
        resetForm() {
            this.search = { ...search }
        },

        // 重置分页
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.getDatas()
        },

        // 记录表格选中项
        changeSelection(val) {
            this.selection = val
        },

        // 获取列表数据
        async getDatas() {
            this.isLoading = true
            const res = await requestAdminStudentList({ ...this.search, name: this.keyword }, this.pages)

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

        // 判断是否未审
        isnAudit(item) {
            return Number(item.auditStatus) === 0
        },

        // 添加/编辑/查看详情操作
        doDetail({ model, data }) {
            this.detail = {
                disabled: model === 'detail',
                id: data && data.id || ''
            }
            
            this.detailVisible = true
        },

        // 获取详情数据
        getDetailDatas() {
            this.$refs.detail.getDetailData()
        },

        // 重置弹窗详情
        resetDetail(component) {
            this.$refs[component].reset()
            this.$set(this.detail, 'id', '')
        },

        // 删除操作
        doDel({ data }) {
            console.log(123)
        }
           
    }
}
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/mixin/core.scss';

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
</style>
