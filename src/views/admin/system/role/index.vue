<template>
    <div class="role-wrap" :loading="isLoading">
        <!-- 搜索表单 -->
        <el-form :inline="true" :model="search" class="g-search--wrap" @submit.native.prevent>
            <el-form-item label="角色编码">
                <el-input v-model="search.code" placeholder="请输入角色编码" @keyup.native.enter="getDatas"></el-input>
            </el-form-item>
            <el-form-item label="角色名称">
                <el-input v-model="search.name" placeholder="请输入角色名称" @keyup.native.enter="getDatas"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getDatas">查询</el-button>
                <el-button type="primary" @click="resetForm" plain>重置</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格数据列表 -->
        <el-table :data="datas" stripe v-loading="isLoading">
            <el-table-column prop="code" label="角色编码" />
            <el-table-column prop="name" label="角色名称" />
            <el-table-column prop="remark" label="描述" />
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" active-value="1" inactive-value="0" disabled></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" :width="operateWidth">
                <template slot-scope="scope">
                    <list-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        permiss: { callback: choosePermiss }
                    }" />
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>

        <!-- 权限分配弹窗 -->
        <el-dialog
            title="权限分配"
            :visible.sync="visible"
            @close="resetDetail"
            width="30%">
            <permiss-tree ref="tree" class="dialog-menu-tree" :datas.sync="permissTree" v-loading="isRoleLoading"></permiss-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { requestRoleList, requestMenuByRole, configRoleMenu } from '@/api/system'

import permission from '@/mixin/admin-operate'

const search = {
    code: '',
    name: ''
}

export default {
    mixins: [permission],
    data() {
        return {
            search: { ...search },
            datas: [],
            menuTree: [], // 当前角色类型完整权限树形数据
            roleId: '', // 当前编辑角色
            isRoleLoading: false, // 当前角色已有权限获取状态
            visible: false // 权限分配弹窗是否可见
        }
    },
    computed: {
        ...mapState('permiss', {
            permissTree: state => state.tree || {},
            permissObj: state => state.obj || {}
        }),
        ...mapGetters('permiss', {
            permissList: 'list'
        })
    },
    watch: {
        search: {
            handler: function () {
                this.$set(this.pages, 'pageNum', 1)
            },
            deep: true
        }
    },
    components: {
        'permiss-tree': resolve => require(['@/components/admin/system/permiss/permiss-tree-list'], resolve)
    },
    created() {
        this.getDatas()
        this.getPermissData()
    },
    methods: {
        ...mapActions('permiss', ['getPermissList']),

        // 重置搜索表单
        resetForm() {
            this.search = { ...search }
        },

        // 获取角色列表
        async getDatas() {
            this.isLoading = true

            const res = await requestRoleList(this.search, this.pages)
            const { data: { entity: datas = {} } } = res
            this.datas = datas.resultData || []
            this.totalNum = datas.totalNum || 0

            this.isLoading = false
        },

        // 根据角色获取权限列表
        async getPermissListByRole(roleId) {
            this.isRoleLoading = true

            const res = await requestMenuByRole({ roleId })
            const { code, entity: datas = [] } = res.data
            if (code === 200) {
                let keys = []
                let parentKeys = []

                datas.forEach(x => {
                    keys.push(x.permissionId)
                    let parent = this.permissObj[x.permissionId]
                    if (parent) {
                        parentKeys.push(parent.pid)
                    }
                })
                parentKeys = new Set(parentKeys)

                const childKeys = keys.filter(x => !parentKeys.has(x))
                this.$refs.tree.setCheckedKeys(childKeys)
                this.roleId = roleId
            }

            this.isRoleLoading = false
        },

        // 获取所有可用菜单权限列表
        async getPermissData() {
            this.getPermissList({ status: 1 })
        },

        // 点击权限配置
        choosePermiss({ data }) {
            const { id, model } = data
            this.menuTree = this.permissList[model]
            this.getPermissListByRole(id)
            this.visible = true
        },

        // 提交角色的用户权限
        submit() {
            const childKeys = this.$refs.tree.getCheckedKeys()
            const keys = this.getParentIds(childKeys)

            const params = [...new Set(keys)].map(x => {
                return {
                    roleId: this.roleId,
                    permissionId: x
                }
            })
            configRoleMenu(params).then(res => {

            }).finally(() => {
                this.close()
            })
        },

        // 重置弹窗详情
        resetDetail() {
            this.$refs.tree.setCheckedKeys([])
        },

        // 关闭弹窗
        close() {
            this.visible = false
        },

        // 获取父级id
        getParentIds(keys, result = []) {
            const pids = keys.map(x => this.permissObj[x].pid).filter(x => x)
            result = result.concat(keys, pids)
            if (pids.length) {
                return this.getParentIds(pids, result)
            }
            return result
        }
    }
}
</script>

<style lang='scss' scoped>
.dialog-menu-tree {
    height: 320px;
    overflow: auto;
}
</style>
