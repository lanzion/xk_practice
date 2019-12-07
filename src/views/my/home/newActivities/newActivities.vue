<template>
    <div class="curriculumcenter">
        <div class="curriculumcenter-center">
            <div class="page-fl-coure fl">
                <div class="page-fl-coure-header">
                    <i
                        class="page-fl-coure-header-min"
                        :style="{backgroundImage:'url('+huodongchengguo+')'}"
                    ></i>
                    <span class="page-fl-coure-header-one">活动成果</span>
                    <i
                        class="page-fl-coure-header-max"
                        :style="{backgroundImage:'url('+gengduo+')'}"
                        @click="go()"
                    ></i>
                    <span class="page-fl-coure-header-thr" @click="go()">更多</span>
                </div>
                <ul class="page-fl-coure-ul">
                    <li v-for="(g,index) in datas" :key="index" @click="goactivity(g.id)">
                        <div>
                            <ov-image :type="3" :src-data="g.cover" :img-height="'170px'"></ov-image>
                        </div>
                        <h3 :style="{'-webkit-box-orient':'vertical'}">{{g.title}}</h3>
                        <div class="page-fl-coure-ul-min">
                            <p :style="{'-webkit-box-orient':'vertical'}">{{g.summary}}</p>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="curriculumcenter-right fr">
                <div class="curriculumcenter-title">
                    <div class="page-fl-coure-header">
                        <span class="page-fl-coure-header-one">活动播报</span>
                        <i
                            class="page-fl-coure-header-max"
                            :style="{backgroundImage:'url('+gengduo+')'}"
                        ></i>
                        <span class="page-fl-coure-header-thr">更多</span>
                    </div>
                </div>
                <div class="bordernow"></div>
                <ul>
                    <li>
                        <div>
                            <i></i>
                            <span :style="{'-webkit-box-orient':'vertical'}">
                                <em>【天河区】</em>
                                教育局召开中小学社会实教育局召开中小学社会实
                            </span>
                        </div>
                        <div>
                            <span>广州</span>
                            <span>2019-11-30</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <i></i>
                            <span :style="{'-webkit-box-orient':'vertical'}">
                                <em>【天河区】</em>
                                教育局召开中小学社会实教育局召开中小学社会实
                            </span>
                        </div>
                        <div>
                            <span>广州</span>
                            <span>2019-11-30</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <i></i>
                            <span :style="{'-webkit-box-orient':'vertical'}">
                                <em>【天河区】</em>
                                教育局召开中小学社会实教育局召开中小学社会实
                            </span>
                        </div>
                        <div>
                            <span>广州</span>
                            <span>2019-11-30</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <i></i>
                            <span :style="{'-webkit-box-orient':'vertical'}">
                                <em>【天河区】</em>
                                教育局召开中小学社会实教育局召开中小学社会实
                            </span>
                        </div>
                        <div>
                            <span>广州</span>
                            <span>2019-11-30</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <i></i>
                            <span :style="{'-webkit-box-orient':'vertical'}">
                                <em>【天河区】</em>
                                教育局召开中小学社会实教育局召开中小学社会实
                            </span>
                        </div>
                        <div>
                            <span>广州</span>
                            <span>2019-11-30</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { requestwebapiactivityresults } from '@/api/webApi/activity'
export default {
    name: 'curriculumcenter',
    data() {
        return {
            datas: [],
            pages: {
                pageSize: 3,
                pageNum: 1
            },
            time: require('../../../../../static/img/time.png'),
            erweima: require('../../../../../static/img/xikegongzhonghao.png'),
            kechenglan: require('../../../../../static/img/kechenglan.png'),
            gengduo: require('../../../../../static/img/gengduo.png'),
            fankui: require('../../../../../static/img/pingjiafankui.png'),
            plo: require('../../../../../static/img/plo.png'),
            dianhua: require('../../../../../static/img/dianhua.png'),
            dizhi: require('../../../../../static/img/dizhi.png'),
            jiaotong: require('../../../../../static/img/jiaotong.png'),
            dengji: require('../../../../../static/img/dengji.png'),
            guanwang: require('../../../../../static/img/guanwang.png'),
            pingfeng: require('../../../../../static/img/pingfeng.png'),
            baiduditu: require('../../../../../static/img/baiduditu.png'),
            huodongchengguo: require('../../../../../static/img/huodongchengguo.png')
        }
    },
    created() {
        this.getlists()
    },
    methods: {
        async getlists() {
            const res = await requestwebapiactivityresults(
                { id: this.id },
                this.pages
            )
            const { entity: datas = {} } = res.data
            try {
                this.datas = datas.resultData || []
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.datas = []
            } finally {
            }
        },
        go() {
            this.$router.push({
                path: '/activity/activityresults'
            })
        },
        goactivity(id) {
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
.curriculumcenter {
    margin-bottom: 58px;
    width: 100%;
    overflow: hidden;
    .page-fl-coure {
        width: 864px;
        overflow: hidden;
        .page-fl-coure-header {
            width: 100%;
            height: 34px;
            margin-bottom: 18px;
            span,
            i {
                display: inline-block;
            }
            .page-fl-coure-header-one {
                font-size: 22px;
                line-height: 31px;
                letter-spacing: 0px;
                color: #333333;
            }
            .page-fl-coure-header-two {
                font-size: 16px;
                letter-spacing: 0px;
                color: #666666;
            }
            .page-fl-coure-header-thr {
                font-size: 16px;
                line-height: 29px;
                letter-spacing: 0px;
                color: #666666;
                float: right;
                cursor: pointer;
            }
            .page-fl-coure-header-min {
                width: 22px;
                height: 22px;
                margin-right: 10px;
            }
            .page-fl-coure-header-max {
                float: right;
                cursor: pointer;
                width: 15px;
                height: 15px;
                margin-top: 8px;
                margin-left: 8px;
            }
        }
        .page-fl-coure-ul {
            overflow: hidden;
            li {
                width: 276px;
                height: 380px;
                float: left;
                border: solid 1px #f3f3f3;
                margin-bottom: 26px;
                border-radius: 4px;
                margin-right: 15px;
                cursor: pointer;
                &:nth-child(3n) {
                    margin-right: 0px;
                }
                &:hover {
                    box-shadow: 0px 2px 2px 0px rgba(6, 0, 51, 0.19);
                }
                h3 {
                    font-size: 16px;
                    line-height: 24px;
                    letter-spacing: 0.6px;
                    color: #262626;
                    padding: 0 10px;
                    box-sizing: border-box;
                    margin-top: 8px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    word-break: break-all;
                }
                .page-fl-coure-ul-min,
                .page-fl-coure-ul-max {
                    font-size: 14px;
                    letter-spacing: 0px;
                    color: #666666;
                    padding: 0 10px;
                    box-sizing: border-box;
                    margin-top: 15px;
                    p {
                        font-size: 14px;
                        line-height: 25.5px;
                        letter-spacing: 0.6px;
                        color: #666666;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 5;
                        overflow: hidden;
                        word-break: break-all;
                    }
                }
                .page-fl-coure-ul-max {
                    margin-top: 10px;
                }
            }
        }
    }
    .curriculumcenter-right {
        width: 300px;
        overflow: hidden;
        position: relative;
        .page-fl-coure-header {
            width: 100%;
            height: 34px;
            margin-bottom: 18px;
            span,
            i {
                display: inline-block;
            }
            .page-fl-coure-header-one {
                font-size: 22px;
                line-height: 31px;
                letter-spacing: 0px;
                color: #333333;
            }
            .page-fl-coure-header-two {
                font-size: 16px;
                letter-spacing: 0px;
                color: #666666;
            }
            .page-fl-coure-header-thr {
                font-size: 16px;
                line-height: 29px;
                letter-spacing: 0px;
                color: #666666;
                float: right;
                cursor: pointer;
            }
            .page-fl-coure-header-min {
                width: 22px;
                height: 22px;
                margin-right: 10px;
            }
            .page-fl-coure-header-max {
                float: right;
                cursor: pointer;
                width: 15px;
                height: 15px;
                margin-top: 8px;
                margin-left: 8px;
            }
        }
        .curriculumcenter-title {
            font-size: 22px;
            line-height: 31.5px;
            letter-spacing: 0px;
            color: #333333;
            margin-bottom: 18px;
        }
        .bordernow {
            position: absolute;
            left: 4px;
            width: 0px;
            height: 416px;
            background-image: linear-gradient(0deg, #f8f9f9 0%, #f9fafb 100%);
            border: dashed 1px #b9b9b9;
        }
        ul {
            overflow: hidden;
            position: relative;
            z-index: 1;
            li {
                margin-bottom: 14px;
                cursor: pointer;
                &:hover {
                    div {
                        span {
                            color: #42a6fe !important;
                            em {
                                color: #42a6fe !important;
                            }
                        }
                    }
                }
                div {
                    &:nth-child(1) {
                        width: 100%;
                        overflow: hidden;
                        margin-bottom: 8px;
                        span {
                            width: 270px;
                            float: left;
                            vertical-align: top;
                            font-size: 14px;
                            line-height: 23px;
                            letter-spacing: 1px;
                            color: #666666;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            word-break: break-all;
                            em {
                                font-size: 14px;
                                line-height: 23px;
                                letter-spacing: 1px;
                                color: #333333;
                            }
                        }
                        i {
                            display: block;
                            height: 9px;
                            width: 9px;
                            float: left;
                            border-radius: 50%;
                            margin-top: 6px;
                            background-color: #fea250;
                            margin-right: 10px;
                        }
                    }
                    &:nth-child(2) {
                        width: 100%;
                        overflow: hidden;
                        span {
                            font-size: 12px;
                            letter-spacing: 0px;
                            color: #666666;
                            &:nth-child(1) {
                                margin-right: 10px;
                                margin-left: 20px;
                            }
                        }
                    }
                }
            }
        }
        p {
            text-align: center;
            width: 260px;
            height: 40px;
            border-radius: 4px;
            border: solid 1px #42a6fe;
            font-size: 14px;
            font-weight: normal;
            font-stretch: normal;
            line-height: 40px;
            letter-spacing: 0px;
            color: #42a6fe;
            margin-left: 22px;
            cursor: pointer;
        }
    }
}
</style>
