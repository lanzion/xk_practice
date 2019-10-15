<template>
    <el-form ref="form" class="is-line" label-position="top" :model="form" :rules="rules" :status-icon="true">
        <el-form-item label="账号" prop="account">
            <el-input v-model="form.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" :error="error">
            <el-input v-model="form.pwd" type="password" placeholder="请输入密码" @keyup.enter.native="submit"></el-input>
        </el-form-item>
        <div class="m-content--button">
            <el-button class="m-button--item" type="primary" @click="submit" :loading="isLoading">登录</el-button>
        </div>
        <div class="m-content--link clearfix">
            <router-link class="link-item fl" to="/registertwo">免费注册</router-link>
            <router-link class="link-item fr" to="/findpwd">忘记密码</router-link>
        </div>
    </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            isLoading: false,
            form: {
                account: '',
                pwd: ''
            },
            rules: {
                account: [
                    { required: true, message: '请输入账号', trigger: ['change', 'blur'] }
                ],
                pwd: [
                    { required: true, message: '请输入密码', trigger: ['change', 'blur'] }
                ]
            },
            error: ''
        }
    },
    computed: {
        ...mapState('login', {
            identities: state => state.identities || {}
        }),
        istrue(){
            return this.$store.state.test.istrue
        }
    },
    methods: {
        ...mapActions('login', ['login', 'getUserBaseInfo', 'getPermission']),

        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.error = ''
                    this.isLoading = true

                    this.login(this.form).then((res) => {
                        const { code, msg } = res
                        this.error = msg

                        if (code === 200) {
                            this.error = ''
                        } else if (code === 209) {
                            this.$confirm('您的账号暂未通过审核', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).catch(() => {})

                            return Promise.reject(res)
                        } else {
                            return Promise.reject(res)
                        }

                        return res
                    }).then(datas => {
                        const { identity } = datas
         
                        
                        // 获取用户基本信息
                        return this.getUserBaseInfo().then((baseInfo) => {
               
                            if (baseInfo) {
                                return Promise.resolve(identity)
                            }
                        })
                    }).then(identity => {
                        // 获取后台权限
                
                        this.getPermission({ identity }).then(result => {
                            if (result === true) {
                                let { query: { callback } } = this.$route
                                 this.$store.commit('changeistrue',true)
                                callback = callback || {
                                    admin: window.page.admin.url,
                                    education: window.page.admin.url,
                                    baseInfo: window.page.admin.url,
                                    school: window.page.admin.url,
                                    teacher: window.page.my.url+'space',
                                    student: window.page.my.url+'space',
                                }[this.identities[identity].code]
                                
                                window.location.href = callback
                            }
                        })
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
