<template>
    <div class="curriculum">
        <ul class="curriculum-ul">
            <li
                class="curriculum-li"
                v-for="(g,index) in goods"
                :key="index"
                @click="goactivty(g.id)"
            >
                <div class="curriculum-li-img">
                    <ov-image :src-data="g.cover" :type="3" :img-height="'222px'"></ov-image>
                </div>
                <div class="curriculum-li-conent">
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
        <infinite-loading @infinite="getgoods" ref="infiniteLoading">
            <span slot="spinner">正在加载中...</span>
            <span slot="no-more">没有更多数据了...</span>
            <span slot="no-results">暂无数据...</span>
        </infinite-loading>
    </div>
</template>

<script>
import { requestwebapiactivityresults } from '@/api/webApi/activity'
export default {
    name: 'schooldetailcurriculum',
    data() {
        return {
            time: require('../../../../../../static/img/time.png'),
            eyes: require('../../../../../../static/img/eyes.png'),
            plo: require('../../../../../../static/img/plo.png'),
            goods: [],
            pages: {
                pageSize: 8,
                pageNum: 1
            }
        }
    },
    created() {
        // this.getgoods()
    },
    methods: {
        async getgoods($state) {
            this.isLoading = true
            let schoolId = this.$route.query.schoolId
            if (schoolId) {
                this.id = schoolId
            } else {
                this.id = sessionStorage.getItem('schoolId')
            }
            const res = await requestwebapiactivityresults(
                { schoolId: this.id },
                this.pages
            )
            const { entity: datas = {} } = res.data
            try {
                if (datas.resultData.length) {
                    this.goods = datas.resultData
                    $state.loaded()
                    if (this.goods.length / 5 === 8) {
                        $state.complete()
                    }
                    if (this.goods.length < this.pages.pageSize) {
                        $state.complete()
                    }
                    this.pages.pageSize += 16
                } else {
                    $state.complete()
                }
                this.totalNum = datas.totalNum || 8
            } catch (error) {
                this.goods = []
            } finally {
                this.isLoading = false
            }
        },
        goactivty(id) {
            sessionStorage.setItem('activityresultsId', id)
            this.$router.push({
                path: '/activity/activityresult/activityresultdetail',
                query: { activityresultsId: id }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.curriculum {
    min-height: 400px;
    margin-bottom: 30px;
    .curriculum-ul {
        margin-bottom: 30px;
        .curriculum-li {
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
            .curriculum-li-img {
                float: left;
                width: 360px;
                height: 222px;
                margin-right: 28px;
            }
            .curriculum-li-conent {
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
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
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
</style>
