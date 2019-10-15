<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" v-loading="isLoading">
        <el-form-item label="链接名称" prop="linkName">
            <el-input v-model="form.linkName" placeholder="请输入链接名称"></el-input>
        </el-form-item>
        <el-form-item label="链接地址" prop="linkUrl">
            <el-input v-model="form.linkUrl" placeholder="请输入链接地址"></el-input>
        </el-form-item>
        <el-form-item label="打开方式" prop="targetType">
            <el-radio-group v-model="form.targetType">
                <el-radio-button v-for="(item) in targetType" :label="item.code" :key="item.code">{{ item.name }}</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
            <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="链接描述" prop="linkDesc">
            <el-input type="textarea" v-model="form.linkDesc" placeholder="请输入链接描述"></el-input>
        </el-form-item>
        <el-form-item class="g-form-footer">
            <el-button type="primary" @click="submit" :loading="isLoading">{{ form ? '保存' : '立即创建' }}</el-button>
            <el-button @click="close">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { addLink, editLink } from '@/api/config'

const form = {
    linkName: '',
    linkUrl: '',
    linkType: '',
    linkImg: '',
    linkDesc: '',
    targetType: 0,
    status: 1
}

export default {
    data() {
        return {
            form: {},
            rules: {
                linkName: [
                    { required: true, message: '请输入链接名称', trigger: 'change' }
                ],
                linkUrl: [
                    { required: true, message: '请输入链接地址', trigger: 'change' }
                ]
            }
        }
    },
    props: {
        detail: Object,
        status: {
            type: Array,
            default() {
                return []
            }
        },
        targetType: {
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
                    let handler = addLink
                    let txt = '创建'
                    if (id) {
                        handler = editLink
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
