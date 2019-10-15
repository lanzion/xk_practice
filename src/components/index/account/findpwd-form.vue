<template>
    <el-form ref="form" class="is-line" label-position="top" :model="form" :rules="rules" :status-icon="true">
        <template v-if="step === 1">
            <h3 class="m-content--title">找回密码</h3>
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
            </el-form-item>
            <el-col :span="14">
                <el-form-item label="验证码" prop="validCode">
                    <el-input v-model="form.validCode" placeholder="验证码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10" class="m-button--wrap is-inline">
                <el-button class="m-button--item" type="primary" plain @click="getPhoneCode" :disabled="!!timeout">
                    {{ timeout ? `重新发送 (${timeout}s)` : '发送验证码' }}
                </el-button>
            </el-col>
            <div class="m-content--button">
                <el-button class="m-button--item" type="primary" @click="next(step + 1)">下一步</el-button>
            </div>
        </template>
        <template v-else-if="step === 2">
            <h3 class="m-content--title">修改密码</h3>
            <el-form-item label="新密码" prop="newPsw">
                <el-input v-model="form.newPsw" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="rePwd">
                <el-input v-model="form.rePwd" type="password" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <div class="m-content--button">
                <el-button class="m-button--item" type="primary" @click="submit">提交</el-button>
            </div>
        </template>
        <template v-if="step === 0">
            <success-info>
                <p>修改密码成功</p>
                <span slot="operate-txt">返回首页</span>
            </success-info>
        </template>
    </el-form>
</template>

<script>
import { requestPhoneCode, resetPwdByPhone } from '@/api/account'

import { validatePwd, validateVerifyPwd, validatePhone } from '@/utils/utility/validateRule'

export default {
    components: {
        'success-info': resolve => require(['@/components/index/account/success-info'], resolve)
    },
    data() {
        const validateRePwd = (rule, value, callback) => {
            validateVerifyPwd(this.form.newPsw)(rule, value, callback)
        }
        return {
            step: 1,
            form: {
                phone: '',
                validCode: '',
                newPsw: '',
                rePwd: ''
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: ['change', 'blur'] },
                    { validator: validatePhone, trigger: ['change', 'blur'] }
                ],
                newPsw: [
                    { validator: validatePwd, trigger: ['change', 'blur'] }
                ],
                rePwd: [
                    { validator: validateRePwd, trigger: ['change', 'blur'] }
                ],
                validCode: [
                    { required: true, message: '请输入验证码', trigger: 'change' }
                ]
            },
            timeout: 0,
            timer: null
        }
    },
    beforeDestroy() {
        this.clearTimer()
    },
    methods: {
        next(step) {
            if (step === 2) {
                this.validateFields(this.$refs.form, ['phone', 'validCode']).then(errors => {
                    const message = errors.filter(x => x)
                    if (!message.length) {
                        this.switchForm(step)
                    }
                })
            } else {
                this.switchForm(step)
            }
        },

        switchForm(step) {
            this.step = step
            this.$refs.form.clearValidate()
        },

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

        clearTimer() {
            clearInterval(this.timer)
            this.timer = null
        },

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

        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.isLoading = true

                    resetPwdByPhone(this.form).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.switchForm(0)
                        } else {
                            this.$message({
                                message: msg,
                                type: 'warning'
                            })
                        }
                    }).finally(() => {
                        this.isLoading = false
                    })
                } else {
                    return false
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/module/login.scss';
</style>
