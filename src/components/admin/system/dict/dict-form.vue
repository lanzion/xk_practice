<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" v-loading="isLoading">
        <el-form-item label="代码" prop="code">
            <el-input v-model="form.code" placeholder="请输入代码"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="字典" prop="dicTypeId">
            <el-select v-model="form.dicTypeId" placeholder="请选择字典">
                <el-option
                    v-for="item in types"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="排序">
            <el-input-number v-model="form.orders" placeholder="请输入排序"></el-input-number>
        </el-form-item>
        <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item class="g-form-footer">
            <el-button type="primary" @click="submit" :loading="isLoading">{{ form ? '保存' : '立即创建' }}</el-button>
            <el-button @click="close">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { addDict, editDict } from '@/api/system'

const form = {
    dicTypeId: '',
    dictName: '',
    code: '',
    name: '',
    orders: '',
    remark: ''
}

export default {
    data() {
        return {
            form: {},
            rules: {
                code: [
                    { required: true, message: '请输入代码', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入名称', trigger: 'change' }
                ],
                dicTypeId: [
                    { required: true, message: '请选择字典', trigger: 'change' }
                ]
            }
        }
    },
    props: {
        detail: Object,
        types: {
            type: Array,
            default() {
                return []
            }
        }
    },
    watch: {
        detail: {
            handler: function (detail) {
                this.form = Object.keys(detail).length ? detail : { ...form }
                this.$nextTick(() => {
                    this.$refs.form.resetFields()
                })
            },
            deep: true,
            immediate: true
        }
    },
    methods: {

        // 添加/修改表单
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.isLoading = true

                    const { id } = this.form
                    let handler = addDict
                    let txt = '创建'
                    if (id) {
                        handler = editDict
                        txt = '保存'
                    }
                    handler(this.form).then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                message: `${txt}成功`,
                                type: 'success'
                            })
                            this.$emit('change')
                            this.close()
                        } else {
                            this.$message({
                                message: res.data.msg || `${txt}失败`,
                                type: 'error'
                            })
                        }
                    }).finally(() => {
                        this.isLoading = false
                        this.close()
                    })
                } else {
                    return false
                }
            })
        },

        // 重置详情数据关闭弹窗
        close() {
            this.$emit('close')
        },

        // 清空详情数据
        reset() {
            this.form = { ...form }
            this.$refs.form.resetFields()
        }
    }
}
</script>
