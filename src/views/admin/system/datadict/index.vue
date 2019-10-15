<template>
    <el-row :gutter="20" type="flex" class="dict-wrap">
        <el-col :span="6" class="dict-type--wrap g-tree--wrap">
            <head-operate class="g-tree--head" :items="typeBtnHead" v-bind="{
                add: { callback: append }
            }" />
            <!-- 字典分类列表 -->
            <dict-type-list ref="tree" class="g-tree--body" :datas.sync="typeList" v-loading="isTypeLoading" @checked="checkedType">
                <span slot="operate" slot-scope="{ data }" class="button-group">
                    <!-- 修改 -->
                    <el-button
                        v-if="isTypeEdit"
                        type="text"
                        size="mini"
                        @click.stop="() => modify(data)">
                        <i class="el-icon-edit"></i>
                    </el-button>
                    <!-- 删除 -->
                    <el-button
                        v-if="isTypeDel"
                        type="text"
                        size="mini"
                        @click.stop="() => remove(data)">
                        <i class="el-icon-delete"></i>
                    </el-button>
                </span>
            </dict-type-list>
        </el-col>
        <el-col :span="18" class="dict-list--wrap">
            <head-operate class="fr" :items="headBtnGroup" v-bind="{
                add: { callback: doDetail },
                del: { callback: doDel }
            }" />

            <!-- 子类列表 -->
            <dict-list class="dict-list--box" v-loading="isLoading" :datas="datas" :checked.sync="selection" :operateWidth="operateWidth" @callback="onSubmit">
                <template slot="operate" slot-scope="{ data, index }">
                    <list-operate :items="listBtnGroup" :data="data" :index="index" v-bind="{
                        edit: { callback: doDetail },
                        del: { callback: doDel }
                    }" />
                </template>
            </dict-list>

            <pagination :param="pages" :total="totalNum"></pagination>
        </el-col>

        <!-- 详情弹窗 -->
        <el-dialog
            width="680px"
            title="数据字典"
            :visible.sync="detailVisible"
            @close="close">
            <component :is="detailComponent" ref="detail" @sucess="getTypeDatas" :key="num"   :detail="detail" :types="typeList" @close="close" @change="getDatas"></component>
        </el-dialog>
    </el-row>
</template>

<script>
import { requestDictTypeList, delDictType, requestDictList, delDict } from '@/api/system'

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
            isTypeLoading: false, // 分类数据请求状态
            typeList: [], // 分类数据
            datas: [], // 子类数据
            selection: [], // 表格选中数据
            curType: {}, // 当前选择分类
            detailVisible: false, // 详情弹窗是否可见
            detailComponent: '',
            detail: {}, // 详情组件传参
            num:1,
            form: { ...form }
        }
    },
    computed: {
        isTypeEdit: function () {
            return !!~this.typeBtnGroup.findIndex(x => x.menuId === 'edit')
        },
        isTypeDel: function () {
            return !!~this.typeBtnGroup.findIndex(x => x.menuId === 'del')
        },
        typeBtnHead: function () {
            return this.typeBtnGroup.filter(x => {
                const pos = x.position && x.position.split(',') || []
                return pos.includes('1')
            })
        }
    },
    components: {
        'dict-type-list': resolve => require(['@/components/admin/system/dict/dict-type-list'], resolve),
        'dict-type-form': resolve => require(['@/components/admin/system/dict/dict-type-form'], resolve),
        'dict-list': resolve => require(['@/components/admin/system/dict/dict-list'], resolve),
        'dict-form': resolve => require(['@/components/admin/system/dict/dict-form'], resolve)
    },
    created() {
        this.getTypeDatas()
    },
    watch: {
        pages: {
            handler: function () {
                this.getDatas()
            },
            deep: true
        }
    },
    methods: {

        // 获取主类列表
        async getTypeDatas() {
            this.isTypeLoading = true

            const res = await requestDictTypeList()
            const { code, appendInfo: { list: datas } } = res.data

            if (code === 200) {
                this.typeList = datas
            }

            this.isTypeLoading = false
        },

        // 获取子类列表
        async getDatas() {
            this.isLoading = true

            const res = await requestDictList({ dicTypeId: this.curType.id }, this.pages)
            const { code, entity: datas } = res.data
            if (code === 200) {
                this.datas = datas.resultData || []
                this.totalNum = datas.totalNum || 0
            }

            this.isLoading = false
        },

        // 选择分类
        checkedType(item) {
            this.curType = item
            this.getDatas()
        },

        // 添加主类数据
        append() {
            this.open('dict-type-form', null)
        },

        // 修改主类数据
        modify(data) {
            this.open('dict-type-form', data)
        },

        // 删除主类数据
        remove(data) {
            this.$confirm('此操作将删除该分类数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const { id } = data
                
                delDictType([{ id }]).then(res => {
                    const { code, msg } = res.data
                    if (code === 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getTypeDatas()
                    } else {
                        this.$message.error(msg)
                    }
                })
            }).catch(() => {})
        },

        // 打开子类数据弹窗并赋值
        doDetail({ model, data }) {
            this.open('dict-form', Object.assign({
                dicTypeId: this.curType.id,
                dictName: this.curType.name,
                code: '',
                name: '',
                orders: '',
                remark: ''
            }, data))
        },

        // 删除子类数据
        doDel({ model, data }) {
            const items = data ? [data] : this.selection

            if (items.length) {
                this.$confirm('确认删除该数据吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    const ids = items.map(x => x.id).join(',')
                    delDict({ ids }).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
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

        // 表单提交成功回调函数
        onSubmit() {
            this.expandedKeys = this.$refs.tree.getNode()
            this.getDatas()
            this.form = { ...form }
        },

        // 打开弹窗赋值数据
        open(component, data) {
           

            if (data) {
                this.detail = data;
               
               
            }
            this.num++;
            this.detailVisible = true
            this.detailComponent = component
        },

        // 关闭弹窗
        close() {
            this.detail = {};
            this.detailVisible = false
            this.$refs.detail.reset()
        }
    }
}
</script>

<style lang='scss' scoped>
.dict-wrap {
    height: 100%;
    padding-bottom: 20px;
    margin-top: 20px;

    .dict-type--wrap,
    .dict-list--wrap {
        height: 100%;
        overflow: auto;
    }
    .dict-type--wrap {
        position: relative;
        min-width: 300px;
    }
    .dict-list--wrap {
        min-width: 400px;
    }
}
</style>
