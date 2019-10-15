<template>
    <el-form ref="form" :model="form" :rules="rules" label-width="60px">
        <el-form-item label="密码" prop="newPwd">
            <el-input v-model="form.newPwd" :type="inputType" placeholder="请输入新密码">
                <el-button slot="append" icon="el-icon-view" @mousedown.native="changeInputType('text')" @mouseup.native="changeInputType('password')"></el-button>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button @click.stop="close">取消</el-button>
            <el-button type="primary" @click.stop="submit" :loading="isLoading">确定</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { resetPassword } from '@/api/base'

import { validatePwd } from '@/utils/utility/validateRule'

export default {
    data() {
        return {
            inputType: 'password',
            form: {
                idList: [],
                newPwd: ''
            },
            rules: {
                idList: [
                    { type: 'array', required: true, message: '请至少选择一个要修改的用户', trigger: 'change' }
                ],
                newPwd: [
                    { validator: validatePwd, trigger: ['change', 'blur'] }
                ]
            }
        }
    },
    props: {
        ids: {
            type: Array,
            default() {
                return []
            }
        }
    },
    watch: {
        ids: {
            handler: function (val) {
                if(val[0].isId==1){
                     this.$set(this.form, 'idList', val.map(x => x.account))
                }else{
                     this.$set(this.form, 'idList', val.map(x => x.id))
                }
               
            },
            immediate: true
        }
    },
    methods: {

        changeInputType(type) {
            this.inputType = type
        },

        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.isLoading = true

                    resetPassword(this.form).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.$message({
                                message: '重置成功',
                                type: 'success'
                            })
                            this.close()
                        } else {
                            this.$message({
                                message: msg || '操作失败',
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

        // 重置数据关闭弹窗
        close() {
            this.$refs.form.resetFields()
            this.$emit('close')
        }
    }
}
</script>
