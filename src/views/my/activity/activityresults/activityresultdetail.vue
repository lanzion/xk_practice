<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/activity' }">活动中心</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/activity/activityresults'}">活动成果</el-breadcrumb-item>
            <el-breadcrumb-item>成果详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="activityresultdetail-conent">
            <div class="activityresultdetail-conent-fl fl">
                <h3>{{datas.title}}</h3>
                <div class="activityresultdetail-conent-fl-box">
                    <ul class="fl">
                        <li>
                            <i :style="{backgroundImage:'url('+plo+')'}"></i>
                            <span>{{datas.author}}</span>
                        </li>
                        <li>
                            <i :style="{backgroundImage:'url('+time+')'}"></i>
                            <span>{{datas.publishDate}}</span>
                        </li>
                        <li>
                            <i :style="{backgroundImage:'url('+eyes+')'}"></i>
                            <span>{{datas.browseNum}}</span>
                        </li>
                    </ul>
                    <div class="qrcode fr">
                        <span>发送到:</span>
                        <span>
                            <qrcode class="qrcodeimg" />
                        </span>
                    </div>
                </div>
                <div class="activityresultdetail-conent-fl-show">
                    <p v-html="datas.content"></p>
                </div>
            </div>

            <div class="activityresultdetail-conent-fr fr">
                <div class="activityresultdetail-conent-fr-one">
                    <h4>活动相关信息</h4>
                    <ul>
                        <li>
                            <i :style="{backgroundImage:'url('+xuexiao+')'}"></i>
                            <span @click="goschool(datas.schoolId)">{{datas.schoolName}}</span>
                        </li>
                        <li>
                            <i :style="{backgroundImage:'url('+jidi+')'}"></i>
                            <span @click="gobase(datas.baseInstId)">{{datas.baseInstName}}</span>
                        </li>
                        <li>
                            <i :style="{backgroundImage:'url('+kecheng+')'}"></i>
                            <span @click="gocourse(datas.courseId)">{{datas.courseName}}</span>
                        </li>
                    </ul>
                </div>
                <div class="activityresultdetail-conent-fr-two">
                    <h4>其它活动成果</h4>
                    <ul>
                        <li v-for="(g,index) in goods" :key="index" @click="other(g.id)">
                            <div class="activityresultdetail-conent-fr-two-img">
                                <ov-image :type="3" :src-data="g.cover" :img-height="'54px'" />
                            </div>
                            <div class="activityresultdetail-conent-fr-two-name">
                                <h4>{{cutString(g.title,32)}}</h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    requestwebapiactivityresultsDetail,
    requestwebapiactivityresultsOther
} from '@/api/webApi/activity'
export default {
    name: 'activityresultdetail',
    data() {
        return {
            imgs: require('../../../../../static/img/fenxiong.png'),
            time: require('../../../../../static/img/time.png'),
            eyes: require('../../../../../static/img/eyes.png'),
            plo: require('../../../../../static/img/plo.png'),
            xuexiao: require('../../../../../static/img/xuexiao.png'),
            jidi: require('../../../../../static/img/jidi.png'),
            kecheng: require('../../../../../static/img/kecheng.png'),
            datas: {},
            id: '',
            goods: []
        }
    },
    components: {
        qrcode: resolve => require(['@/components/my/qrcode/index'], resolve)
    },
    created() {
        this.getlists()
    },
    methods: {
        async getlists(id) {
            this.isLoading = true
            if (id) {
                this.id = id
            } else {
                let activityresultsId = this.$route.query.activityresultsId
                if (activityresultsId) {
                    this.id = activityresultsId
                } else {
                    this.id = sessionStorage.getItem('activityresultsId')
                }
            }
            const res = await requestwebapiactivityresultsDetail({
                id: this.id
            })
            const { entity: datas = {} } = res.data
            try {
                this.datas = datas || {}
                this.getgoods(datas.schoolId)
            } catch (error) {
                this.datas = {}
            } finally {
                this.isLoading = false
            }
        },
        async getgoods(schoolId) {
            this.isLoading = true
            // let activityresultsId = this.$route.query.activityresultsId
            // if (activityresultsId) {
            //     this.id = activityresultsId
            // } else {
            //     this.id = sessionStorage.getItem('activityresultsId')
            // }
            const res = await requestwebapiactivityresultsOther({
                schoolId: schoolId
            })
            const { appendInfo: datas = {} } = res.data
            try {
                this.goods = datas.otherResults || []
            } catch (error) {
                this.goods = []
            } finally {
                this.isLoading = false
            }
        },
        goschool(id) {
            sessionStorage.setItem('schoolId', id)
            this.$router.push({
                path: '/school/schooldetail',
                query: { schoolId: id }
            })
        },
        gobase(id) {
            sessionStorage.setItem('baseId', id)
            this.$router.push({
                path: '/base/basedetail',
                query: { baseId: id }
            })
        },
        gocourse(id) {
            sessionStorage.setItem('courseId', id)
            this.$router.push({
                path: '/course/coursedetails',
                query: { courseId: id }
            })
        },
        other(id) {
            sessionStorage.setItem('activityresultsId', id)
            this.getlists(id)
            document.documentElement.scrollTop = document.body.scrollTop = 0
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
    .activityresultdetail-conent {
        width: 100%;
        overflow: hidden;
        .activityresultdetail-conent-fl {
            width: 868px;
            height: auto;
            h3 {
                width: 100%;
                margin-bottom: 32px;
                font-size: 26px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 31px;
                letter-spacing: 0px;
                color: #333333;
                word-break: break-all;
            }
            .activityresultdetail-conent-fl-box {
                height: 30px;
                margin-bottom: 58px;
                ul {
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
                .qrcode {
                    span {
                        float: left;
                        font-size: 14px;
                        &:nth-child(1) {
                            margin-right: 10px;
                        }
                    }
                    .qrcodeimg {
                        z-index: 1000;
                    }
                }
            }
            .activityresultdetail-conent-fl-show {
                overflow: hidden;
                width: 100%;
                p {
                    width: 100%;
                    line-height: 24px;
                    font-size: 14px;
                    color: #333;
                    letter-spacing: 0px;
                    text-indent: 20px;
                    word-break: break-all;
                }
            }
        }
        .activityresultdetail-conent-fr {
            width: 300px;
            height: auto;
            .activityresultdetail-conent-fr-one {
                margin-bottom: 56px;
                h4 {
                    font-size: 18px;
                    line-height: 31px;
                    letter-spacing: 0px;
                    color: #333333;
                    border-bottom: 1px solid #eee;
                    padding: 0 10px;
                    box-sizing: border-box;
                }
                ul {
                    li {
                        margin-top: 10px;
                        cursor: pointer;
                        i {
                            display: inline-block;
                            height: 20px;
                            width: 20px;
                            background-size: 20px;
                            vertical-align: top;
                            margin-right: 10px;
                            margin-top: 3px;
                        }
                        span {
                            width: 256px;
                            display: inline-block;
                            vertical-align: top;
                            font-size: 16px;
                            font-weight: normal;
                            font-stretch: normal;
                            line-height: 23px;
                            letter-spacing: 0px;
                            color: #333333;
                        }
                        i {
                            display: inline-block;
                            height: 20px;
                            width: 20px;
                            background-repeat: no-repeat;
                            background-size: 20px;
                            vertical-align: top;
                            margin-right: 10px;
                            margin-top: 3px;
                        }
                    }
                }
            }
            .activityresultdetail-conent-fr-two {
                h4 {
                    font-size: 18px;
                    line-height: 31px;
                    letter-spacing: 0px;
                    color: #333333;
                    border-bottom: 1px solid #eee;
                    padding: 0 10px;
                    box-sizing: border-box;
                }
                ul {
                    li {
                        height: 76px;
                        border-bottom: 1px solid #eee;
                        padding: 9px 10px;
                        box-sizing: border-box;
                        cursor: pointer;
                        overflow: hidden;
                        &:hover {
                            box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
                        }
                        .activityresultdetail-conent-fr-two-img {
                            float: left;
                            width: 88px;
                            margin-right: 12px;
                            overflow: hidden;
                        }
                        .activityresultdetail-conent-fr-two-name {
                            float: left;
                            width: 178px;
                            h4 {
                                font-size: 16px;
                                line-height: 24px;
                                letter-spacing: 0px;
                                color: #333333;
                                border: none;
                                word-break: break-all;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
