<template>
    <el-row :gutter="20" type="flex" class="nav-wrap">
        <el-col :span="6" class="nav-list--wrap g-tree--wrap">
            <head-operate class="g-tree--head" :items="headBtnGroup" v-bind="{
                add: { callback: append },
                del: { callback: remove }
            }" />
            <!-- 菜单列表 -->
            <nav-tree ref="tree" class="g-tree--body" v-loading="isLoading" :datas.sync="navTree" :expandedKeys.sync="expandedKeys">
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
            </nav-tree>
        </el-col>
        <el-col :span="18" class="nav-form--wrap">
            <!-- 菜单详情表单 -->
            <nav-form class="nav-form--box" :pids.sync="modelPIds" :menu.sync="navTree" :form.sync="form" @callback="onSubmit"></nav-form>
        </el-col>
    </el-row>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { delNav } from '@/api/config'

import permission from '@/mixin/admin-operate'

const form = {
    pid: '',
    name: '',
    model: '',
    url: '',
    status: '1',
    sort: 1,
    permissType: 0
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
        'nav-tree': resolve => require(['@/components/admin/configure/nav/nav-tree-list'], resolve),
        'nav-form': resolve => require(['@/components/admin/configure/nav/nav-form'], resolve)
    },
    computed: {
        ...mapState('nav', {
            navTree: state => state.tree || [],
            navObj: state => state.tree || [],
        }),
        ...mapGetters('nav', {
            navList: 'list'
        })
    },
    created() {
        console.log('获取菜单列表11', this.$store.state)
        this.getDatas()
    },
    methods: {
        ...mapActions('nav', ['getNavList']),

        // 获取菜单权限列表
        async getDatas() {
            this.isLoading = true

            this.getNavList().finally(() => {
                this.isLoading = false
            })
        },

        // 查找当前权限父级列表
        findPIds(item, arr = []) {
            arr.unshift(item.id)
            if (item.pid && ~item.pid) {
                const parent = this.navList.find(x => x.id === item.pid)
                return parent && this.findPIds(parent, arr)
            }
            return arr
        },

        // 点击添加导航数据
        append(data) {
            this.modelPIds = this.findPIds(data)
            this.form = Object.assign({}, form)
        },

        // 修改添加导航数据
        modify(data) {
            const item = Object.assign({}, data)
            console.log('导航数据item', item)
            this.form = item
            this.modelPIds = this.findPIds(data).slice(0, -1)
        },

        // 修改删除导航数据
        remove(node, data) {
            let $tree = this.$refs.tree
            if (data) {
                const { id } = data
                $tree = $tree.$children[0]
                $tree.setCheckedKeys([id])
            }
            const pids = $tree.getCheckedKeys()
            if (!pids.length) {
                this.$message({
                    message: '请选择要删除的导航菜单',
                    type: 'warning'
                })
                return
            }
            this.$confirm('此操作将同时删除该权限子级权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const params = pids.map(x => {
                    return {
                        id: x
                    }
                })
                delNav(params).then(res => {
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
            this.expandedKeys = this.$refs.tree.getNode()
            this.getDatas()
            this.form = { ...form }
        }
    }
}
</script>

<style lang='scss' scoped>
.nav-wrap {
    height: 100%;
    padding-bottom: 20px;
    margin-top: 20px;
    
    .nav-list--wrap,
    .nav-form--wrap {
        height: 100%;
        overflow: auto;
    }
    .nav-list--wrap {
        min-width: 300px;
    }
    .nav-form--wrap {
        min-width: 400px;
    }
    .nav-form--box {
        max-width: 600px;
    }
}
</style>
