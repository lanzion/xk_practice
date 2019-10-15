/**
 * @desc 用户公共业务
 * #1 重置密码弹窗
 * #2 锁定/解锁
 * #3 审核
 */
import { lockUser, auditUser } from '@/api/base'

export default {
    data() {
        return {
            passwordVisible: false, // 重置密码弹窗是否可见
        }
    },
    components: {
        'reset-password-form': resolve => require(['@/components/admin/user/reset-password-form'], resolve)
    },
    methods: {

        popupPassword() {
            if (this.selection.length) {
                this.passwordVisible = true
            } else {
                this.$message({
                    message: '请至少选择一条数据!',
                    type: 'warning'
                })
            }
        },

        isLock(item) {
            return Number(item.lockStatus) === 1
        },

        isnLock(item) {
            return !this.isLock(item)
        },

        doLock({ model, data }) {
            const items = data ? [data] : this.selection

            if (items.length) {
                const txt = model === 'lock' ? '锁定' : '解锁'
                const params = items.map(x => {
                    return {
                        id: x.id,
                        lockStatus: model === 'lock' ? 1 : 0
                    }
                })

                this.$confirm(`是否${txt}该数据?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    lockUser(params).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.$message({
                                message: `${txt}成功`,
                                type: 'success'
                            })
                            this.getDatas()
                        } else {
                            this.$message({
                                message: msg,
                                type: 'warning'
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

        doAudit({ model, data }) {
            const items = data ? [data] : this.selection

            if (items.length) {
                const params = items.map(x => {
                    return {
                        id: x.id,
                        auditStatus: model === 'lock' ? 1 : 0
                    }
                })

                this.$confirm(`是否审核通过该数据?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    auditUser(params).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.$message({
                                message: '审核成功',
                                type: 'success'
                            })
                            this.getDatas()
                        } else {
                            this.$message({
                                message: msg,
                                type: 'warning'
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

        // 关闭弹窗
        close() {
            this.detailVisible = false
            this.passwordVisible = false
        }
    }
}
