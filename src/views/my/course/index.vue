<template>
    <div class="m-list--wrap">
        <section class="g-tab--wrap">
            <!-- Tabs -->
            <ul class="g-tab--box fl">
                <router-link tag="li" class="g-tab--item" v-for="(tab, index) in tabs" :to="tab.url" :key="index">
                    <span class="g-tab--name">{{ tab.name }}</span>
                </router-link>
            </ul>
            <router-link to="/course/create" class="el-button el-button--primary m-button fr">发起评课</router-link>
            <el-input class="fr" placeholder="请输入评课主题" suffix-icon="icon-search" v-model="search.keyword" @keyup.enter.native="getCourseData"></el-input>
        </section>

        <div class="m-list--box">
            <!-- List -->
            <component :is="component" :class="{ 'is-empty': !datas.length }" :datas="datas" :total="totalNum" :evaluate.sync="search.evaluateStatus"  @refresh="getCourseData" :isLoading="isLoading" />
            <!-- Page -->
            <pagination v-show="datas.length" class="m-list--page" :param="page" :total="totalNum" @change="getCourseData"></pagination>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { requestMyCourseList } from '@/api/course'

const search = {
    teacherId: '',
    keyword: '',
    examineStatus: 1,
    evaluateStatus: null
}

export default {
    data() {
        return {
            isLoading: false,
            tabs: [
                { name: '审核通过', url: '/course/pass' },
                { name: '未审核', url: '/course/unaudited' },
                { name: '审核不通过', url: '/course/failed' }
            ],
            search: { ...search },
            page: {
                pageNum: 1,
                pageSize: 4
            },
            totalNum: 0,
            datas: [],
            component: 'course-pass'
        }
    },
    computed: {
        ...mapState('login', {
            tid: state => ((state.baseInfo || {}).baseInfo || {}).id || ''
        })
    },
    components: {
        'course-pass': resolve => require(['./children/pass'], resolve),
        'course-unaudited': resolve => require(['./children/unaudited'], resolve),
        'course-failed': resolve => require(['./children/failed'], resolve)
    },
    watch: {
        '$route.params.status': {
            handler: function (status) {
                this.init()
            },
            immediate: true
        },
        'search.evaluateStatus': {
            handler: function (status) {
                this.init(status)
            },
        }
    },
    methods: {
        ...mapActions('dict', ['getDataDict']),

        init(evaluateStatus = null) {
            const teacherId = this.tid
            const { status } = this.$route.params
            const examineStatus = {
                pass: 1,
                unaudited: 0,
                failed: 2
            }[status]

            this.component = `course-${status}`
            this.search = {
                keyword: '',
                teacherId,
                examineStatus,
                evaluateStatus
            }
            this.$set(this.page, 'pageNum', 1)
            this.getCourseData()
        },

        async getCourseData() {
            this.isLoading = true

            const res = await requestMyCourseList(this.search, this.page)
            const { code, entity: datas } = res.data

            if (code === 200) {
                const { dicList: grade } = await this.getDataDict({ code: 'grade' })
                const { dicList: subject } = await this.getDataDict({ code: 'subject' })
                const { dicList: textbookVersion } = await this.getDataDict({ code: 'textbookVersion' })

                this.datas = (datas.resultData || []).map(x => {
                    const gradeLabel = this.translate(x.grade, grade) || datas.grade
                    const subjectLabel = this.translate(x.subject, subject) || datas.subject
                    const textbookVersionLabel = this.translate(x.textbookVersion, textbookVersion, { key: 'id' }) || datas.textbookVersion
                    x.tags = [gradeLabel, subjectLabel, textbookVersionLabel].filter(t => t)
                    return x
                })
                this.totalNum = datas.totalNum || 0
            }
            this.isLoading = false
        },
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/module/my-module-list.scss';
</style>
