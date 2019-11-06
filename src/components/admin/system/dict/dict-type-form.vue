<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" v-loading="isLoading">
        <el-form-item label="代码" prop="code">
            <el-input v-model="form.code" placeholder="请输入代码"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入名称"></el-input>
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
import { addDictType, editDictType } from '@/api/system'

export default {
    data() {
        return {
            form: {
                code: '',
                name: '',
                remark: ''
            },
            isFirst: true,
            rules: {
                code: [
                    { required: true, message: '请输入代码', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入名称', trigger: 'change' }
                ]
            }
        }
    },
    props: {
        detail: {
            type: Object,
            default: {
                code: '',
                name: '',
                remark: ''
            }
        },
    },
    watch: {
        detail: {
            handler: function (detail) {
                if (Object.keys(detail).length && this.isFirst) {
                    console.log(detail)
                    this.form = Object.assign({}, detail)
                    this.isFirst = false
                    this.$nextTick(() => {
                        this.$refs.form.resetFields()
                    })
                }
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
                    let handler = addDictType
                    let txt = '创建'
                    if (id) {
                        handler = editDictType
                        txt = '保存'
                    }
                    handler(this.form).then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                message: `${txt}成功`,
                                type: 'success'
                            })
                            this.$emit('sucess')
                            this.close()
                        } else {
                            this.$message({
                                message: res.data.msg || `${txt}失败`,
                                type: 'error'
                            })
                        }
                    }).finally(() => {
                        this.isLoading = false
                    })
                } else {
                    return false
                }
            })
        },

        // 重置详情数据关闭弹窗
        close() {
            this.form = {
                code: '',
                name: '',
                remark: ''
            }
            this.isFirst = true
            this.$refs.form.resetFields()
            this.$emit('close')
        },

        // 清空详情数据
        reset() {
            this.form = {
                code: '',
                name: '',
                remark: ''
            }
            this.isFirst = true
            this.$refs.form.resetFields()
        }
    }
}
</script>
