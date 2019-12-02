<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/course' }">实践活动</el-breadcrumb-item>
            <el-breadcrumb-item>活动成果</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="activityresults">
            <ul class="activityresults-ul">
                <li
                    class="activityresults-li"
                    @click="go(g.id)"
                    v-for="(g,index) in datas"
                    :key="index"
                >
                    <div class="activityresults-li-img">
                        <ov-image :src-data="g.cover" :type="3" :img-height="'222px'"></ov-image>
                    </div>
                    <div class="activityresults-li-conent">
                        <h3 :style="{'-webkit-box-orient':'vertical'}">{{g.title}}</h3>
                        <p :style="{'-webkit-box-orient':'vertical'}">{{g.summary}}</p>
                        <ul>
                            <li>
                                <i :style="{backgroundImage:'url('+plo+')'}"></i>
                                <span>{{g.author}}</span>
                            </li>
                            <li>
                                <i :style="{backgroundImage:'url('+time+')'}"></i>
                                <span>{{g.publishDate}}</span>
                            </li>
                            <li>
                                <i :style="{backgroundImage:'url('+eyes+')'}"></i>
                                <span>{{g.browseNum}}</span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { requestwebapiactivityresults } from '@/api/webApi/activity'
export default {
    name: 'activityresults',
    data() {
        return {
            time: require('../../../../../static/img/time.png'),
            eyes: require('../../../../../static/img/eyes.png'),
            plo: require('../../../../../static/img/plo.png'),
            datas: []
        }
    },
    created() {
        this.getlists()
    },
    methods: {
        async getlists() {
            this.isLoading = true
            const res = await requestwebapiactivityresults({ id: this.id })
            const { entity: datas = {} } = res.data
            try {
                this.datas = datas.resultData || []
            } catch (error) {
                this.datas = []
            } finally {
                this.isLoading = false
            }
        },
        go(id) {
            sessionStorage.setItem('activityresultsId', id)
            this.$router.push({
                path: '/activity/activityresult/activityresultdetail',
                query: {
                    activityresultsId: id
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.container {
    margin: 0 auto;
    .el-breadcrumb {
        margin-top: 16px;
        margin-bottom: 16px;
        font-size: 14px;
        color: #666666;
        line-height: 38px;
    }
    .activityresults {
        min-height: 500px;
        .activityresults-ul {
            .activityresults-li {
                width: 100%;
                height: 284px;
                padding: 28px 0 36px;
                box-sizing: border-box;
                border-bottom: 1px solid #ccc;
                cursor: pointer;
                &:hover {
                    h3 {
                        color: #008aff !important;
                    }
                }
                .activityresults-li-img {
                    float: left;
                    width: 360px;
                    height: 222px;
                    margin-right: 28px;
                }
                .activityresults-li-conent {
                    float: left;
                    width: 802px;
                    height: 222px;
                    h3 {
                        margin-bottom: 32px;
                        font-size: 22px;
                        line-height: 29px;
                        letter-spacing: 0px;
                        color: #333333;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    p {
                        margin-bottom: 60px;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #333333;
                        line-height: 26px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    ul {
                        width: 100%;
                        overflow: hidden;
                        li {
                            float: left;
                            margin-right: 22px;
                            i {
                                display: inline-block;
                                height: 14px;
                                width: 14px;
                                background-size: 14px;
                                vertical-align: middle;
                                background-repeat: no-repeat;
                            }
                            span {
                                display: inline-block;
                                font-size: 14px;
                                font-weight: normal;
                                font-stretch: normal;
                                letter-spacing: 0px;
                                color: #666666;
                                vertical-align: middle;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
