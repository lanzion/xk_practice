<template>
    <el-row :gutter="20" type="flex" class="permiss-wrap">
        <el-col :span="6" class="permiss-list--wrap">
            <head-operate class="g-tree--head" :items="headBtnGroup" v-bind="{
                add: { callback: append },
                del: { callback: remove }
            }" />
            <!-- 菜单列表 -->
            <permiss-tree ref="tree" v-loading="isLoading" :datas.sync="permissTree" :expandedKeys.sync="expandedKeys">
                <span slot="operate" slot-scope="{ node, data }" class="button-group">
                    <!-- 添加 -->
                    <el-button
                        type="text"
                        size="mini"
                        @click.stop="() => append(data)">
                        <i class="el-icon-plus"></i>
                    </el-button>
                    <!-- 修改 -->
                    <el-button
                        type="text"
                        size="mini"
                        @click.stop="() => modify(data)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <!-- 删除 -->
                    <el-button
                        type="text"
                        size="mini"
                        @click.stop="() => remove(node, data)">
                        <i class="el-icon-delete"></i>
                    </el-button>
                </span>
            </permiss-tree>
        </el-col>
        <el-col :span="18" class="permiss-form--wrap">
            <!-- 菜单详情表单 -->
            <permiss-form class="permiss-form--box" :pids.sync="modelPIds" :menu.sync="permissTree" :form.sync="form" @callback="onSubmit"></permiss-form>
        </el-col>
    </el-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { delPermiss } from '@/api/system'

import permission from '@/mixin/admin-operate'

const form = {
    name: '',
    model: '',
    pid: '',
    url: '',
    status: '1',
    sort: 1,
    menuId: '',
    type: '',
    position: []
}

export default {
    mixins: [permission],
    data() {
        return {
            form: { ...form },
            modelPIds: [], // 父级菜单列表项
            expandedKeys: [] // 记录当前各个tab菜单列表展开项
        }
    },
    components: {
        'permiss-tree': resolve => require(['@/components/admin/system/permiss/permiss-tree-list'], resolve),
        'permiss-form': resolve => require(['@/components/admin/system/permiss/permiss-form'], resolve)
    },
    computed: {
        ...mapState('permiss', {
            permissTree: state => state.tree || [],
            permissObj: state => state.tree || [],
        }),
        ...mapGetters('permiss', {
            permissList: 'list'
        })
    },
    created() {
        this.getDatas()
    },
    methods: {
        ...mapActions('permiss', ['getPermissList']),

        // 获取菜单权限列表
        async getDatas() {
            this.isLoading = true

            this.getPermissList().finally(() => {
                this.isLoading = false
            })
        },

        // 查找当前权限父级列表
        findPIds(item, arr = []) {
            arr.unshift(item.id)
            if (item.pid) {
                const parent = this.permissList.find(x => x.id === item.pid)
                return this.findPIds(parent, arr)
            }
            return arr
        },

        // 点击添加权限数据
        append(data) {
            let _data = data
            if (!data.id) {
                _data = {}
            }
            const item = Object.assign({}, _data)
            delete item.children
            this.modelPIds = this.findPIds(_data)
            this.form = Object.assign({}, form, { model: item.model })
        },

        // 修改添加权限数据
        modify(data) {
            const item = Object.assign({}, data)
            delete item.children
            this.form = item
            // console.log(item)
            this.modelPIds = this.findPIds(data).slice(0, -1)
        },

        // 修改删除权限数据
        remove(node, data) {
            let $tree = this.$refs.tree
            if (data) {
                const { id } = data
                $tree = $tree.$children[0]
                $tree.setCheckedKeys([id]) // 设置树形子组件选中项
            }
            const ids = $tree.getCheckedKeys() // 获取树形子组件选中项
            if (!ids.length) {
                this.$message({
                    message: '请选择要删除的权限菜单',
                    type: 'warning'
                })
                return
            }
            this.$confirm('此操作将同时删除该权限子级权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delPermiss({ ids: ids.toString() }).then(res => {
                    const { code, msg } = res.data
                    if (code === 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.onSubmit()
                    } else {
                        this.$message.error(msg)
                    }
                }).finally(() => {
                    $tree.setCheckedKeys([])
                })
            }).catch(() => {})
        },

        // 表单提交成功回调函数
        onSubmit() {
            this.expandedKeys = this.$refs.tree.getNode() // 设置树形子组件展开项
            this.getDatas()
            this.form = { ...form }
        }
    }
}
</script>

<style lang='scss' scoped>
.permiss-wrap {
    height: 100%;
    padding-bottom: 20px;
    margin-top: 20px;
    
    .permiss-list--wrap,
    .permiss-form--wrap {
        height: 100%;
        overflow: auto;
    }
    .permiss-list--wrap {
        min-width: 300px;
    }
    .permiss-form--wrap {
        min-width: 400px;
    }
    .permiss-form--box {
        max-width: 600px;
    }
}
</style>
