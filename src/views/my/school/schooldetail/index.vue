<template>
    <div class="schooldetail">
        <div>
            <ov-image :type="2" :src-data="datas.backgroundImg" :img-height="'300px'"></ov-image>
        </div>
        <div class="header">
            <div class="container">
                <ul class="header-ul">
                    <li
                        v-for="(g,index) in arr"
                        :class="g.path == $route.path ? 'active' :''"
                        :key="index"
                        @click="go(g.path)"
                    >{{g.name}}</li>
                </ul>
            </div>
        </div>
        <div class="container">
            <router-view :datas="JSON.stringify(datas)"></router-view>
        </div>
    </div>
</template>

<script>
import { requestwebapischoolDetail } from '@/api/webApi/school'
export default {
    name: 'schooldetail',
    data() {
        return {
            id: '',
            datas: {},
            arr: [
                {
                    path: '/school/schooldetail/page',
                    name: '主页'
                },
                {
                    path: '/school/schooldetail/brief',
                    name: '学校简介'
                },
                {
                    path: '/school/schooldetail/curriculum',
                    name: '课程/活动'
                },
                {
                    path: '/school/schooldetail/bases',
                    name: '实践基地/机构'
                },
                {
                    path: '/school/schooldetail/feedback',
                    name: '评价反馈'
                }
            ]
        }
    },
    created() {
        this.getlists()
        let schoolDetail = JSON.parse(sessionStorage.getItem('schoolDetail'))
        if (schoolDetail) {
            this.datas = schoolDetail
        }
    },
    methods: {
        go(path) {
            let schoolId = this.$route.query.schoolId
            if (schoolId) {
                this.id = schoolId
            } else {
                this.id = sessionStorage.getItem('schoolId')
            }
            this.$router.push({ path: path, query: { schoolId: this.id } })
        },
        async getlists() {
            this.isLoading = true
            let schoolId = this.$route.query.schoolId
            if (schoolId) {
                this.id = schoolId
            } else {
                this.id = sessionStorage.getItem('schoolId')
            }
            const res = await requestwebapischoolDetail({ id: this.id })
            const { entity: datas = {} } = res.data
            try {
                this.datas = datas || {}
                sessionStorage.setItem(
                    'schoolDetail',
                    JSON.stringify(this.datas)
                )
            } catch (error) {
                this.datas = {}
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.header {
    background: #f8f8f8;
    height: 60px;
    margin-bottom: 46px;
    .header-ul {
        width: 100%;
        height: 100%;
        overflow: hidden;
        li {
            float: left;
            width: 200px;
            height: 58px;
            line-height: 58px;
            text-align: center;
            margin-right: 40px;
            cursor: pointer;
            font-size: 16px;
            letter-spacing: 0px;
            color: #262626;
        }
        .active {
            border-bottom: 2px solid #008aff;
            color: #008aff;
        }
    }
}
.container {
    margin: 0 auto;
    .el-breadcrumb {
        margin-top: 16px;
        margin-bottom: 16px;
        font-size: 14px;
        color: #666666;
        line-height: 38px;
    }
}
</style>
