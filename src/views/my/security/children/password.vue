<template>
    <el-form class="m-form--wrap" label-width="120px" :model="form" :rules="rules">
        <el-form-item label="旧密码" prop="oldInputPwd">
            <el-col :span="9">
                <el-input v-model="form.oldInputPwd" type="password" placeholder="请输入旧密码"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd" required>
            <el-col :span="9">
                <el-input v-model="form.newPwd" type="password" placeholder="请输入新密码"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="确认密码" prop="reNewPwd" required>
            <el-col :span="9">
                <el-input v-model="form.reNewPwd" type="password" placeholder="请再次输入新密码"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item class="m-operate--box is-right">
            <el-col :span="9">
                <el-button @click="back">取消</el-button>
                <el-button type="primary" @click="submit" :disabled="isLoading">保存</el-button>
            </el-col>
        </el-form-item>
    </el-form>
</template>

<script>
import { updatePassword } from '@/api/account'

import { validatePwd, validateVerifyPwd } from '@/utils/utility/validateRule'

export default {
    data() {
        const validateRePwd = (rule, value, callback) => {
            validateVerifyPwd(this.form.newPwd)(rule, value, callback)
        }
        return {
            isLoading: false,
            form: {
                oldInputPwd: '',
                newPwd: '',
                reNewPwd: ''
            },
            rules: {
                oldInputPwd: [
                    { required: true, message: '请输入原密码', trigger: ['change', 'blur'] }
                ],
                newPwd: [
                    { validator: validatePwd, trigger: ['change', 'blur'] }
                ],
                reNewPwd: [
                    { validator: validateRePwd, trigger: ['change', 'blur'] }
                ]
            }
        }
    },
    methods: {
        // 提交表单
        submit() {
            this.isLoading = true
            updatePassword(this.form).then(res => {
                const { code, msg } = res.data
                if (code === 200) {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    this.back()
                } else {
                    this.$message({
                        message: msg,
                        type: 'warning'
                    })
                }
            })
        },

        // 返回上级页面
        back() {
            this.$router.push({ path: '/security' })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/module/my-module-form.scss';
</style>
