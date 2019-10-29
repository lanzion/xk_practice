<template>
    <div class="school-list-wrap">
        <!-- 搜索表单 -->
        <div class="g-search--wrap clearfix">
            <el-form :inline="true" :model="search" class="fl" @submit.native.prevent>
                <el-form-item label="教师姓名">
                    <el-input v-model="keyword" placeholder="请输入教师姓名" @keyup.native.enter="resetPage"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getDatas">查询</el-button>
                    <el-button type="primary" @click="resetForm" plain>重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 表头权限及统计 -->
            <section class="g-table--head clearfix fr">
                <head-operate class="fr" :items="headBtnGroup" v-bind="{
                    del: { callback: doDel },
                    pwd: { callback: popupPassword },
                    lock: { callback: doLock },
                    recommend:{callback:recommend},
                    norecommend:{callback:norecommend},
                    unlock: { callback: doLock }
                }" />
            </section>
        </div>
        
        <!-- 表格数据列表 -->
        <el-table ref="table" :data="datas" stripe align="center" v-loading="isLoading" @selection-change="changeSelection">
            <el-table-column type="selection" width="45" />
            <el-table-column prop="account" label="账号" sortable/>
            <el-table-column prop="name" label="姓名" sortable/>
            <el-table-column prop="teach" label="任教学科">
                <template slot="header">
                    <th-select title="任教学科" :value.sync="search.teach" :options="technicalClassification" />
                </template>
                <template slot-scope="scope">
                    {{ scope.row.teach | translate(technicalClassification, { con: ' / ' }) }}
                </template>
            </el-table-column>
            <el-table-column prop="provience" label="所属区域">
                <template slot-scope="scope">
                    {{ scope.row.provienceName || '' }}{{ scope.row.cityName || '' }}{{ scope.row.areaName || '' }}
                </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="所属学校" />
            <el-table-column prop="phone" label="手机" width="120" />
            <el-table-column prop="lockStatus" label="账号状态" align="center" width="120">
                <template slot="header">
                    <th-select title="账号状态" :value.sync="search.lockStatus" :options="lockStatus" />
                </template>
                <template slot-scope="scope">
                    <span :class="['lockStatus', `__status-${scope.row.lockStatus}`, { 0: 'icon-unlock', 1: 'icon-lock' }[scope.row.lockStatus]]">
                        {{ scope.row.lockStatus | translate(lockStatus) }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="auditStatus" label="审核状态" align="center" width="100">
                <template slot="header">
                    <th-select title="审核状态" :value.sync="search.auditStatus" :options="auditStatus" />
                </template>
                <template slot-scope="scope">
                    <span :class="['auditStatus', `__status-${scope.row.auditStatus}`]">{{ scope.row.auditStatus | translate(auditStatus) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="isFamous" label="名师" align="center" sortable width="100">
                <template slot-scope="scope">
                    <i class="icon-famous" :class="{ 'is-active': scope.row.isFamous == '1' }"></i>
                </template>
            </el-table-column>
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
        <pagination :param="pages"  :total="totalNum" @change="getDatas"></pagination>

        <!-- 重置密码弹窗 -->
        <el-dialog
            width="500px"
            title="重置密码"
            :visible.sync="passwordVisible">
            <reset-password-form ref="password" :ids.sync="selection" @close="close"></reset-password-form>
        </el-dialog>

        <!-- 详情弹窗 -->
        <!-- <el-dialog
            width="560px"
            title="教师详情"
            :visible.sync="detailVisible"
            @close="resetDetail('detail')"
            @open="getDetailDatas">
            <teacher-form ref="detail" v-bind.sync="detail" @close="close" @change="getDatas"></teacher-form>
        </el-dialog> -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { requestAdminTeacherList, delTeacher } from '@/api/base'
import { requestDataDict } from '@/api/common.js'
import { recommendAdd,recommendCancel } from '@/api/resetApi'
import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'

const search = {
    sex: '',
    schoolId: '',
    teach: '',
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
            keyword: '',
            search: { ...search },
            selection: [],
            datas: [],
            detailVisible: false, // 详情弹窗是否可见
            detail: {
                disabled: false,
                id: ''
            } // 详情组件传参
        }
    },
    computed: {
        ...mapState('dict', {
            technicalClassification:state =>((state.technicalClassification||{}).dicList|| []).map(o=>{
                return{
                        code:o.code,
                        id:o.code,
                        name:o.name
                    }
            }),
            subject: state => (state.subject || {}).dicList || [],
            auditStatus: state => (state.examineStatus || {}).dicList || [
                { id: '0', code: 0, name: '待审核' },
                { id: '1', code: 1, name: '通过' },
                { id: '2', code: 2, name: '不通过' }
            ],
            lockStatus: state => (state.lockStatus || {}).dicList || []
        })
    },
    created() {
        this.getDataDict({ code: 'technicalClassification' })
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
        // async getDataDict(groupCode){
        //     const res = await requestDataDict({ groupCode })
        //     const datas = res.data.entity || {}

           
        // },
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
            val.forEach(o =>o.isId =1);
            this.selection = val;
            // console.log(val)
        },

        // 获取列表数据
        async getDatas() {
            this.isLoading = true
            const res = await requestAdminTeacherList({ ...this.search, name: this.keyword }, this.pages)

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
       
         recommend({ data }) {
            const items = data ? [data] : this.selection

            if (items.length) {
                const paramsArr = items.map(x => {
                    return  x.id
                })
                 const params = {
                     recommendType:2,
                     relationIds:paramsArr
                }
                this.$confirm(`确认推荐该数据吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    recommendAdd(params).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.$message({
                                message: `推荐成功`,
                                type: 'success'
                            })
                            this.$refs.table.clearSelection()
                            this.getDatas()
                        } else {
                            this.$message({
                                message: msg || '操作失败',
                                type: 'error'
                            })
                        }
                    })
                }).catch(() => {})
            } else {
                this.$message({
                    message: '请至少选择一条数据!',
                    type: 'warning'
                })
            }
        },
         norecommend({ data }) {
            const items = data ? [data] : this.selection

            if (items.length) {
               const paramsArr = items.map(x => {
                    return  x.id
                })
                 const params = {
                     recommendType:2,
                     relationIds:paramsArr
                }
                this.$confirm(`确认取消推荐吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    recommendCancel(params).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.$message({
                                message: `取消推荐成功`,
                                type: 'success'
                            })
                            this.$refs.table.clearSelection()
                            this.getDatas()
                        } else {
                            this.$message({
                                message: msg || '操作失败',
                                type: 'error'
                            })
                        }
                    })
                }).catch(() => {})
            } else {
                this.$message({
                    message: '请至少选择一条数据!',
                    type: 'warning'
                })
            }
        },
        // 删除操作
        doDel({ data }) {
            const items = data ? [data] : this.selection

            if (items.length) {
                const params = items.map(x => {
                    return {
                        id: x.id
                    }
                })
                this.$confirm(`确认删除该数据吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delTeacher(params).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.$message({
                                message: `删除成功`,
                                type: 'success'
                            })
                            this.$refs.table.clearSelection()
                            this.getDatas()
                        } else {
                            this.$message({
                                message: msg || '操作失败',
                                type: 'error'
                            })
                        }
                    })
                }).catch(() => {})
            } else {
                this.$message({
                    message: '请至少选择一条数据!',
                    type: 'warning'
                })
            }
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
    .icon-famous {
        font-size: 20px;
        vertical-align: middle;
        &.is-active {
            color: $--color-secondary;
        }
    }
</style>
