<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/activity' }">活动中心</el-breadcrumb-item>
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
                        <h3>{{cutString(g.title,120)}}</h3>
                        <p>{{cutString(g.summary,160)}}</p>
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
            <infinite-loading @infinite="getlists" ref="infiniteLoading">
                <span slot="spinner">正在加载中...</span>
                <span slot="no-more">没有更多数据了...</span>
                <span slot="no-results">暂无数据...</span>
            </infinite-loading>
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
            datas: [],
            pages: {
                pageSize: 8,
                pageNum: 1
            }
        }
    },
    created() {
        // this.getlists()
    },
    methods: {
        async getlists($state) {
            const res = await requestwebapiactivityresults(
                { id: this.id },
                this.pages
            )
            const { entity: datas = {} } = res.data
            try {
                if (datas.resultData.length) {
                    this.datas = datas.resultData
                    $state.loaded()
                    if (this.datas.length / 5 === 8) {
                        $state.complete()
                    }
                    if (this.datas.length < this.pages.pageSize) {
                        $state.complete()
                    }
                    this.pages.pageSize += 8
                } else {
                    $state.complete()
                }
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.datas = []
            } finally {
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
            margin-bottom: 30px;
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
                        overflow: hidden;
                        word-break: break-all;
                    }
                    p {
                        margin-bottom: 60px;
                        font-size: 16px;
                        font-weight: normal;
                        font-stretch: normal;
                        letter-spacing: 0px;
                        color: #333333;
                        line-height: 26px;
                        overflow: hidden;
                        word-break: break-all;
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
