<template>
    <div>
        <div class="g-search--wrap clearfix">
            <!-- 搜索表单 -->
            <el-form :inline="true" :model="search" class="fl" @submit.native.prevent>
                <el-form-item label="链接名称">
                    <el-input v-model.lazy="search.linkName" placeholder="请输入链接名称" @keyup.native.enter="getDatas"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getDatas">查询</el-button>
                    <el-button type="primary" @click="resetForm" plain>重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 表头权限及统计 -->
            <section class="g-table--head clearfix fr">
                <head-operate class="fr" :items="headBtnGroup" v-bind="{
                    add: { callback: doAdd },
                    del: { callback: doDel }
                }" />
            </section>
        </div>
        
        <!-- 表格数据列表 -->
        <el-table ref="table" :data="datas" stripe align="center" v-loading="isLoading" @selection-change="changeSelection">
            <el-table-column type="selection" width="45" />
            <el-table-column prop="linkName" label="链接名称" />
            <el-table-column prop="linkUrl" label="链接地址">
                <template slot-scope="scope">
                    <a :href="scope.row.linkUrl" target="_blank">{{ scope.row.linkUrl }}</a>
                </template>
            </el-table-column>
            <el-table-column prop="targetType" label="打开方式">
                <template slot-scope="scope">
                    <span :class="['status', `__status-${scope.row.targetType}`]">{{ scope.row.targetType | translate(linkTargetType) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="linkDesc" label="链接说明" />
            <el-table-column prop="status" label="状态" align="center" width="120">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" disabled></el-switch>
                    <!-- <span :class="['status', `__status-${scope.row.status}`]">{{ scope.row.status | translate(status) }}</span> -->
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" :width="operateWidth">
                <template slot-scope="scope">
                    <list-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        edit: { callback: doEdit },
                        del: { callback: doDel }
                    }" />
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>

        <!-- 详情弹窗 -->
        <el-dialog
            width="560px"
            title="友情链接详情"
            :visible.sync="detailVisible"
            @close="resetDetail('detail')">
            <component :is="detailComponent" ref="detail" :detail="detail" :status="status" :targetType="linkTargetType" @close="close" @change="getDatas"></component>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { requestLinkList, delLink } from '@/api/config'

import permission from '@/mixin/admin-operate'

const search = {
    linkType: ''
}

export default {
    mixins: [permission],
    data() {
        return {
            search: { ...search },
            selection: [],
            datas: [],
            detailVisible: false, // 详情弹窗是否可见
            detailComponent: 'link-form',
            detail: {} // 详情组件传参
        }
    },
    computed: {
        ...mapState('dict', {
            status: state => (state.status || {}).dicList || [],
            linkTargetType: state => (state.linkTargetType || {}).dicList || []
        })
    },
    components: {
        'link-form': resolve => require(['@/components/admin/configure/link/link-form'], resolve),
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
        pages: {
            handler: function () {
                this.getDatas()
            },
            deep: true
        }
    },
    methods: {
        ...mapActions('dict', ['getDataDict']),
        
        // 重置搜索表单
        resetForm() {
            this.search = { ...search }
        },

        // 记录表格选中项
        changeSelection(val) {
            this.selection = val
        },

        // 获取列表数据
        // async getDatas() {
        //     this.isLoading = true
        //     const res = await requestLinkList(this.search, this.pages)

        //     const { data: { entity: datas = {} } } = res
        //     this.datas = datas.resultData || []
        //     this.totalNum = datas.totalNum || 0

        //     this.isLoading = false
        // },

        // 添加操作
        doAdd() {
            this.open('link-form', null)
        },

        // 修改操作
        doEdit({ data }) {
            this.open('link-form', data)
        },

        // 重置弹窗详情
        resetDetail(component) {
            this.$refs[component].reset()
            this.detail = {}
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
                    delLink(params).then(res => {
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
        },

        // 打开弹窗
        open(component, data) {
            this.detailVisible = true
            this.detailComponent = component

            if (data) {
                this.detail = Object.assign({}, data)
            }
        },

        // 关闭弹窗
        close() {
            this.detailVisible = false
            this.$refs.detail.reset()
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/mixin/core.scss';

    .status {
        @each $color-key, $color-value in $--link-target-color {
            &.__status-#{$color-key} {
                color: $color-value;
            }
        }
    }
</style>
