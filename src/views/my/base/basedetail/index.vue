<template>
    <div class="basedetail">
        <div>
            <ov-image :type="2" :src-data="datas.designSpaceBackground" :img-height="'300px'"></ov-image>
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
import { requestwebapibaseDetail } from '@/api/webApi/base'
export default {
    name: 'basedetail',
    data() {
        return {
            id: '',
            datas: '',
            baseDetail: '',
            arr: [
                {
                    path: '/base/basedetail/page',
                    name: '主页'
                },
                {
                    path: '/base/basedetail/brief',
                    name: '简介'
                },
                {
                    path: '/base/basedetail/curriculum',
                    name: '课程活动'
                },
                {
                    path: '/base/basedetail/schools',
                    name: '参与学校'
                },
                {
                    path: '/base/basedetail/feedback',
                    name: '评价反馈'
                }
            ]
        }
    },
    created() {
        this.getlists()
        let baseDetail = JSON.parse(sessionStorage.getItem('baseDetail'))
        this.datas = baseDetail
    },
    methods: {
        go(path) {
            let baseId = this.$route.query.baseId
            if (baseId) {
                this.id = baseId
            } else {
                this.id = sessionStorage.getItem('baseId')
            }
            this.$router.push({ path: path, query: {baseId: this.id} })
        },
        async getlists() {
            this.isLoading = true
            let baseId = this.$route.query.baseId
            if (baseId) {
                this.id = baseId
            } else {
                this.id = sessionStorage.getItem('baseId')
            }
            const res = await requestwebapibaseDetail({ id: this.id })
            const { entity: datas = {} } = res.data
            try {
                this.datas = datas || {}
                sessionStorage.setItem('baseDetail', JSON.stringify(this.datas))
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
