<template>
    <el-form ref="form" class="m-form--wrap" label-width="120px" :model="form" :rules="rules">
        <el-form-item label="手机号" prop="phone">
            <el-col :span="9">
                <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
            <el-col :span="9">
                <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="9">
                <el-button class="is-eq-input" type="primary" plain @click="getPhoneCode" :disabled="!!timeout">
                    {{ timeout ? `重新发送 (${timeout}s)` : '获取验证码' }}
                </el-button>
            </el-col>
        </el-form-item>
        <el-form-item class="m-operate--box is-right">
            <el-col :span="9">
                <el-button @click="back">取消</el-button>
                <el-button type="primary" @click="submit">保存</el-button>
            </el-col>
        </el-form-item>
    </el-form>
</template>

<script>
import { requestPhoneCode, validPhone } from '@/api/account'

import { validatePhone } from '@/utils/utility/validateRule'

export default {
    data() {
        return {
            isLoading: false,
            form: {
                phone: '',
                code: ''
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: ['change', 'blur'] },
                    { validator: validatePhone, trigger: ['change', 'blur'] }
                ],
                code: [
                    { required: true, message: '请输入验证码', trigger: ['change', 'blur'] }
                ]
            },
            timeout: 0
        }
    },
    beforeDestroy() {
        this.clearTimer()
    },
    methods: {

        // 获取验证码
        getPhoneCode() {
            this.$refs.form.validateField('phone', (message) => {
                if (!message) {
                    requestPhoneCode({ phone: this.form.phone }).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.countdown()
                        }
                        this.$message({
                            message: msg,
                            type: code === 200 ? 'success' : 'warning'
                        })
                    })
                }
            })
        },

        // 倒计时
        countdown() {
            this.timeout = 60
            this.timer = setInterval(() => {
                if (this.timeout) {
                    this.timeout -= 1
                } else {
                    this.clearTimer()
                }
            }, 1000)
        },

        // 清除定时器
        clearTimer() {
            clearInterval(this.timer)
            this.timer = null
        },

        // 提交绑定
        submit() {
            this.isLoading = true

            validPhone(this.form).then(res => {
                const { code, msg } = res.data
                if (code === 200) {
                    this.$message({
                        message: '绑定成功',
                        type: 'success'
                    })
                    this.back()
                } else {
                    this.$message({
                        message: msg,
                        type: 'warning'
                    })
                }
            }).finally(() => {
                this.isLoading = false
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
