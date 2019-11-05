<template>
    <div class="dlest">
        <div class="container">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/community' }">课程中心</el-breadcrumb-item>
                <el-breadcrumb-item>{{activitytitle}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="thrnice">
                <ov-image :type = 2 :src-data="getFileUrl(bannerimgurl)"></ov-image>
            </div>
            <div class="nice">
                <ul>
                    <li
                        class="niceto"
                        v-for="(item,index) in list"
                        :key="index"
                        @click="changes(index)"
                        :class=" item.url === $route.path ? 'kladdclass' : ''"
                    >
                        <router-link v-text="item.name" :to="item.url" class="niceto"></router-link>
                    </li>
                </ul>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dlest',
    data() {
        return {
            lomax: 0,
            list: [
                {
                    name: '实践介绍',
                    url: '/community/coursedetails/courseintroduction'
                },
                {
                    name: '参与院校',
                    url: '/community/coursedetails/participatinginstitutions'
                },
                {
                    name: '实践课程',
                    url: '/community/coursedetails/practicalcurriculum'
                },
                {
                    name: '活动点评',
                    url: '/community/coursedetails/activityreview'
                },
                // {
                //     name: '活动基地',
                //     url: '/cbase'
                // },
                // {
                //     name: '服务评价',
                //     url: '/serviceevaluation'
                // }
            ],
            activeName: 'second',
        }
    },
    computed: {
        bannerimgurl() {
            return this.$store.state.test.bannerimgurl
        },
        activitytitle() {
            return this.$store.state.test.activitytitle
        }
    },
    methods: {
        changes(index) {
            this.lomax = index
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    background: #f8f8f8;
    .el-breadcrumb {
        margin-top: 28px;
        margin-bottom: 20px;
        font-size: 14px;
        color: #666666;
        line-height: 38px;
    }
    .thrnice {
        width: 100%;
        height: 300px;
        margin-bottom: 20px;
        img{
            width: 100%;
            height: 300px;
        }
    }
    .nice {
        width: 100%;
        height: 60px;
        background: #fff;
        border-bottom: 1px solid #ccc;
        .niceto {
            font-size: 16px;
            color: #333;
            display: inline-block;
            width: 128px;
            height: 58px;
            text-align: center;
            line-height: 58px;
        }
    }
    .kladdclass {
        border-bottom: solid 2px #008aff;
    }
}
</style>
