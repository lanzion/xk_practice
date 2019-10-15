<template>
    <course-list :class="{ 'is-empty': !datas.length }" :datas="datas" v-loading="isLoading">
        <template v-slot:operate="{ data }">
            <section class="table-cell m-operate--box" @click.stop="() => {}">
                <router-link :to="{ path: '/course/edit', query: { id: data.id } }"
                    class="fr el-button el-button--text operate-item--btn is-info">编辑</router-link>
                <el-button class="fr operate-item--btn is-info" type="text" @click.prevent="del(data)">删除</el-button>
                <el-button class="fr operate-item--btn is-submit" type="text" @click.prevent="submit(data)">提交</el-button>
            </section>
        </template>
    </course-list>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
        }
    },
    props: {
        datas: {
            type: Array,
            default() {
                return []
            }
        },
        isLoading: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    components: {
        'course-list': resolve => require(['@/components/my/course/course-list'], resolve)
    },
    methods: {
        ...mapActions('course', ['deleteForenotice', 'reSubmitForenotice']),

        del(data) {
            const params = [data].map(x => {
                return {
                    id: x.id
                }
            })
            this.deleteForenotice(params).then(res => {
                const { code, msg } = res
                if (code === 200) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.$emit('refresh')
                } else {
                    this.$message({
                        message: msg,
                        type: 'warning'
                    })
                }
            })
        },

        submit(data) {
            this.reSubmitForenotice({ id: data.id }).then(res => {
                const { code, msg } = res
                if (code === 200) {
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    })
                    this.$emit('refresh')
                } else {
                    this.$message({
                        message: msg,
                        type: 'warning'
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/module/my-module-list.scss';
</style>
