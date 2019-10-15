import { registerTeacher, registerStudent } from '@/api/account'

export default {
    data() {
        return {
            isLoading: false,
            checked: false
        }
    },
    methods: {

        submit(module) {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.isLoading = true

                    const handler = {
                        teacher: registerTeacher,
                        student: registerStudent
                    }[module]
                    handler(this.form).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.$refs.form.clearValidate()
                            this.$message({
                                message: '注册成功',
                                type: 'success'
                            })
                            setTimeout(() => {
                                this.$router.push('/login')
                            }, 2000)
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
