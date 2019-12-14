<template>
    <div class="page">
        <div class="page-fl fl">
            <div class="page-fl-title">
                <h3>{{baseDetail.name}}</h3>
                <p  id="conent" v-html="baseDetail.remark">
                    <!-- <span></span> -->
                </p>
                <span class="spanover"></span>
                <h4 @click="go()">点击查看详情>></h4>
            </div>
            <div class="page-fl-coure">
                <div class="page-fl-coure-header">
                    <i
                        class="page-fl-coure-header-min"
                        :style="{backgroundImage:'url('+kechenglan+')'}"
                    ></i>
                    <span class="page-fl-coure-header-one">课程</span>
                    <span class="page-fl-coure-header-two">({{goodsNum}}门)</span>
                    <i
                        class="page-fl-coure-header-max"
                        :style="{backgroundImage:'url('+gengduo+')'}"
                    ></i>
                    <span class="page-fl-coure-header-thr" @click="coursemore()">更多</span>
                </div>
                <ul class="page-fl-coure-ul">
                    <li v-for="(g,index) in goods" :key="index" @click="gobcourse(g.id)">
                        <div>
                            <ov-image :type="3" :src-data="g.cover" :img-height="'248px'"></ov-image>
                        </div>
                        <h3>{{g.name}}</h3>
                        <div class="page-fl-coure-ul-min">
                            <span>课程分类:</span>
                            <span>{{g.parentName}}</span>
                        </div>
                        <div class="page-fl-coure-ul-max">
                            <span>适合学段:</span>
                            <span>{{g.fit}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="page-fl-evaluate" v-if="nomoreone">
                <div class="page-fl-evaluate-header">
                    <i
                        class="page-fl-evaluate-header-min"
                        :style="{backgroundImage:'url('+fankui+')'}"
                    ></i>
                    <span class="page-fl-evaluate-header-one">评价反馈</span>
                    <span class="page-fl-evaluate-header-two">({{goversNum}})</span>
                    <i
                        class="page-fl-evaluate-header-max"
                        :style="{backgroundImage:'url('+gengduo+')'}"
                    ></i>
                    <span class="page-fl-evaluate-header-thr" @click="gofeed()">更多</span>
                </div>
                <ul class="page-fl-evaluate-ul">
                    <li class="page-fl-evaluate-li" v-for="(g,index) in govers" :key="index">
                        <div class="page-fl-evaluate-li-one">
                            <span>{{g.schoolName}}</span>
                            <span>评价</span>
                            <span>《{{g.courseName}}》</span>
                        </div>
                        <div class="page-fl-evaluate-li-two">
                            <span>{{g.gmtCreate}}</span>
                            <span>
                                <el-rate
                                    v-model="g.totalScore"
                                    disabled
                                    :colors="['#ff7800', '#ff7800', '#ff7800']"
                                    show-score
                                    text-color="#666666"
                                    score-template="{value}分"
                                ></el-rate>
                            </span>
                        </div>
                        <p>{{g.comment}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="page-fr fr">
            <div class="page-fr-one">
                <ul>
                    <li v-if="baseDetail.linkMan !== null">
                        <i :style="{backgroundImage:'url('+plo+')'}"></i>
                        <span>{{baseDetail.linkMan}}</span>
                    </li>
                    <li v-if="baseDetail.linkPhone !== null">
                        <i :style="{backgroundImage:'url('+dianhua+')'}"></i>
                        <span>{{baseDetail.linkPhone}}</span>
                    </li>
                    <li v-if="baseDetail.address !== null">
                        <i :style="{backgroundImage:'url('+dizhi+')'}"></i>
                        <span>
                            {{baseDetail.address}}
                            <i
                                @click="getMap(baseDetail.address,baseDetail.name)"
                                :style="{backgroundImage:'url('+baiduditu+')'}"
                            ></i>
                        </span>
                    </li>
                    <li v-if="baseDetail.transport !== null">
                        <i :style="{backgroundImage:'url('+jiaotong+')'}"></i>
                        <span>{{baseDetail.transport}}</span>
                    </li>
                    <li v-if="baseDetail.publishingUnitLevel !== null">
                        <i :style="{backgroundImage:'url('+dengji+')'}"></i>
                        <span v-if="baseDetail.publishingUnitLevel == 'A'">省级</span>
                        <span v-else-if="baseDetail.publishingUnitLevel == 'B'">市级</span>
                        <span v-else-if="baseDetail.publishingUnitLevel == 'C'">区县级</span>
                    </li>
                    <li>
                        <i :style="{backgroundImage:'url('+pingfeng+')'}"></i>
                        <span>{{numFilter(baseDetail.scorse === null ? 5 : baseDetail.scorse )}}分</span>
                    </li>
                    <li v-if="baseDetail.pathUrl !== null">
                        <i :style="{backgroundImage:'url('+guanwang+')'}"></i>
                        <span>
                            <a :href="baseDetail.pathUrl">{{baseDetail.pathUrl}}</a>
                        </span>
                    </li>
                </ul>
                <div class  v-if="baseDetail.officialAccounts !== null">
                    <img :src="baseDetail.officialAccounts" alt />
                </div>
            </div>
            <div class="page-fr-two" v-if="nomoretwo">
                <div class="page-fr-two-header">
                    <span class="page-fr-two-header-one">参与学校</span>
                    <span class="page-fr-two-header-two">({{num}}所)</span>
                    <i class="page-fr-two-header-max" :style="{backgroundImage:'url('+gengduo+')'}"></i>
                    <span class="page-fr-two-header-thr" @click="moreschool()">更多</span>
                </div>
                <ul class="page-fr-two-ul">
                    <li
                        class="page-fr-two-ul-li"
                        v-for="(g,index) in lists"
                        :key="index"
                        @click="goschool(g.schoolId)"
                    >{{g.schoolName}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {
    requestwebapibaseDetailcourse,
    requestwebapibaseDetailschool,
    requestwebapigetBaseevaluation,
    requestwebapiLongitudeAndlatitude
} from '@/api/webApi/base'
export default {
    name: 'page',
    data() {
        return {
            id: '',
            goods: [],
            lists: [],
            istrue: false,
            value: 5,
            baseDetail: {},
            govers: [],
            goversNum: 0,
            num: '',
            goodsNum: -1,
            nomoreone: false,
            nomoretwo: false,
            time: require('../../../../../../static/img/time.png'),
            erweima: require('../../../../../../static/img/xikegongzhonghao.png'),
            kechenglan: require('../../../../../../static/img/kechenglan.png'),
            gengduo: require('../../../../../../static/img/gengduo.png'),
            fankui: require('../../../../../../static/img/pingjiafankui.png'),
            plo: require('../../../../../../static/img/plo.png'),
            dianhua: require('../../../../../../static/img/dianhua.png'),
            dizhi: require('../../../../../../static/img/dizhi.png'),
            jiaotong: require('../../../../../../static/img/jiaotong.png'),
            dengji: require('../../../../../../static/img/dengji.png'),
            guanwang: require('../../../../../../static/img/guanwang.png'),
            pingfeng: require('../../../../../../static/img/pingfeng.png'),
            baiduditu: require('../../../../../../static/img/baiduditu.png')
        }
    },
    props: {
        datas: {
            type: String,
            default() {
                return ''
            }
        }
    },
    watch: {
        datas: function (val) {
            this.baseDetail = JSON.parse(val)
        },

        goodsNum: {
            handler(newval, oldval) {
                if (newval) {
                    this.istrue = true
                    this.$store.commit('changegoodsNum', this.istrue)
                } else {
                    this.istrue = false
                    this.$store.commit('changegoodsNum', this.istrue)
                }
            },
            deep: true
        },

        'govers.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomoreone = false
                } else {
                    this.nomoreone = true
                }
            },
            deep: true
        },
        'lists.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomoretwo = false
                } else {
                    this.nomoretwo = true
                }
            },
            deep: true
        }
    },
    created() {
        this.baseDetail = JSON.parse(sessionStorage.getItem('baseDetail'))
        this.getCourselist()
        this.getSchoollist()
        this.getBaseevaluation()
    },
    methods: {
        async getCourselist() {
            this.isLoading = true
            let pages = {
                pageNum: 1,
                pageSize: 4
            }
            let baseId = this.$route.query.baseId
            if (baseId) {
                this.id = baseId
            } else {
                this.id = sessionStorage.getItem('baseId')
            }
            const res = await requestwebapibaseDetailcourse(
                { baseinfoId: this.id },
                pages
            )
            const { entity: datas = {} } = res.data
            try {
                let array = datas.resultData
                array.forEach(x => {
                    x.fit = this.filterFit(x.fit)
                })
                this.goods = array || []
                this.goodsNum = array.length
            } catch (error) {
                this.goods = []
            } finally {
                this.isLoading = false
            }
        },
        async getSchoollist() {
            this.isLoading = true
            let pages = {
                pageNum: 1,
                pageSize: 12
            }
            let baseId = this.$route.query.baseId
            if (baseId) {
                this.id = baseId
            } else {
                this.id = sessionStorage.getItem('baseId')
            }
            const res = await requestwebapibaseDetailschool(
                { id: this.id },
                pages
            )
            const { entity: datas = {} } = res.data
            try {
                this.lists = datas.resultData || []
                this.num = datas.totalNum
            } catch (error) {
                this.lists = []
            } finally {
                this.isLoading = false
            }
        },
        async getBaseevaluation() {
            this.isLoading = true
            let pages = {
                pageNum: 1,
                pageSize: 10
            }
            let baseId = this.$route.query.baseId
            if (baseId) {
                this.id = baseId
            } else {
                this.id = sessionStorage.getItem('baseId')
            }
            const res = await requestwebapigetBaseevaluation(
                { baseInstId: this.id },
                pages
            )
            const { entity: datas = {} } = res.data
            try {
                let array = datas.resultData || []
                array.forEach(x => {
                    x.totalScore = Number(this.numFilter(x.totalScore))
                })
                this.govers = array || []
                this.goversNum = datas.totalNum
            } catch (error) {
                this.govers = []
            } finally {
                this.isLoading = false
            }
        },
        async getMap(address, name) {
            const res = await requestwebapiLongitudeAndlatitude({
                address: address
            })
            const { entity: datas = {} } = res.data
            try {
                console.log(datas)
                this.lng = datas.lng || 113.27
                this.lat = datas.lat || 23.13
                const { href } = this.$router.resolve({
                    name: `bmap`,
                    query: { lng: this.lng, lat: this.lat, name: name }
                })
                window.open(href, '_blank')
            } catch (error) {
            } finally {
                this.isLoading = false
            }
        },
        gobcourse(id) {
            sessionStorage.setItem('courseId', id)
            this.$router.push({
                path: '/course/coursedetails',
                query: { courseId: id }
            })
        },
        go() {
            this.$router.push({
                path: '/base/basedetail/brief',
                query: { baseId: this.id }
            })
        },
        coursemore() {
            this.$router.push({
                path: '/base/basedetail/curriculum',
                query: { baseId: this.id }
            })
        },
        gofeed() {
            this.$router.push({
                path: '/base/basedetail/feedback',
                query: { baseId: this.id }
            })
        },
        moreschool() {
            this.$router.push({
                path: '/base/basedetail/schools',
                query: { baseId: this.id }
            })
        },
        goschool(id) {
            sessionStorage.setItem('schoolId', id)
            this.$router.push({
                path: '/school/schooldetail',
                query: { schoolId: id }
            })
        },
        filterFit(val) {
            let txt = ''
            if (val) {
                txt = val
                    .replace(/primarySchool_L/g, '小学初年级 ')
                    .replace(/primarySchool_H/g, '小学高年级')
                    .replace(/middleSchool/g, '初中')
                    .replace(/highSchool/g, '高中')
            }
            return txt
        },
        numFilter(value) {
            let realVal = parseFloat(value).toFixed(1)
            return realVal
        }
    }
}
</script>
<style lang='scss' scoped>
.page {
    overflow: hidden;
    .page-fl {
        width: 862px;
        height: auto;
        .page-fl-title {
            position: relative;
            h3 {
                width: 100%;
                font-size: 26px;
                line-height: 31px;
                letter-spacing: 0px;
                color: #262626;
                margin-bottom: 46px;
            }
            p {
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 29px;
                letter-spacing: 0px;
                color: #333333;
                height: 148px;
                overflow: hidden;
                // .spanover {
                //     position: absolute;
                //     background: linear-gradient(
                //         to top,
                //         #fff,
                //         rgba(255, 255, 255, 0.5)
                //     );
                //     display: block;
                //     width: 100%;
                //     height: 30px;
                //     bottom: 0;
                //     left: 0;
                // }
            }
            .spanover {
                    position: absolute;
                    background: linear-gradient(
                        to top,
                        #fff,
                        rgba(255, 255, 255, 0.5)
                    );
                    display: block;
                    width: 100%;
                    height: 30px;
                    bottom: 38px;
                    left: 0;
                }
            h4 {
                font-size: 16px;
                line-height: 29px;
                letter-spacing: 1px;
                color: #008aff;
                text-align: center;
                cursor: pointer;
            }
        }
        .page-fl-coure {
            .page-fl-coure-header {
                border-bottom: 1px solid #eee;
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
                    width: 404px;
                    height: 346px;
                    float: left;
                    border: solid 1px #f3f3f3;
                    margin-bottom: 48px;
                    border-radius: 4px;
                    cursor: pointer;
                    &:nth-child(2n-1) {
                        margin-right: 50px;
                    }
                    &:hover {
                        box-shadow: 0px 2px 2px 0px rgba(6, 0, 51, 0.19);
                    }
                    h3 {
                        font-size: 16px;
                        letter-spacing: 0px;
                        color: #333333;
                        padding: 0 10px;
                        box-sizing: border-box;
                        margin-top: 8px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    .page-fl-coure-ul-min,
                    .page-fl-coure-ul-max {
                        font-size: 14px;
                        letter-spacing: 0px;
                        color: #666666;
                        padding: 0 10px;
                        box-sizing: border-box;
                        margin-top: 15px;
                    }
                    .page-fl-coure-ul-max {
                        margin-top: 10px;
                    }
                }
            }
        }
        .page-fl-evaluate {
            margin-bottom: 90px;
            .page-fl-evaluate-header {
                border-bottom: 1px solid #eee;
                height: 34px;
                margin-bottom: 18px;
                span,
                i {
                    display: inline-block;
                }
                .page-fl-evaluate-header-one {
                    font-size: 22px;
                    line-height: 31px;
                    letter-spacing: 0px;
                    color: #333333;
                }
                .page-fl-evaluate-header-two {
                    font-size: 16px;
                    letter-spacing: 0px;
                    color: #666666;
                }
                .page-fl-evaluate-header-thr {
                    font-size: 16px;
                    line-height: 29px;
                    letter-spacing: 0px;
                    color: #666666;
                    float: right;
                    cursor: pointer;
                }
                .page-fl-evaluate-header-min {
                    width: 22px;
                    height: 22px;
                    margin-right: 10px;
                    background-repeat: no-repeat;
                }
                .page-fl-evaluate-header-max {
                    float: right;
                    cursor: pointer;
                    width: 15px;
                    height: 15px;
                    margin-top: 8px;
                    margin-left: 8px;
                }
            }
            .page-fl-evaluate-ul {
                overflow: hidden;
                li {
                    width: 100%;
                    border-bottom: 1px solid #eeeeee;
                    padding-bottom: 40px;
                    box-sizing: border-box;
                    margin-bottom: 18px;
                    .page-fl-evaluate-li-one {
                        span {
                            font-size: 16px;
                            margin-right: 16px;
                            &:nth-child(1) {
                                line-height: 16px;
                                letter-spacing: 0px;
                                color: #333333;
                            }
                            &:nth-child(2),
                            &:nth-child(3) {
                                letter-spacing: 0px;
                                color: #666666;
                            }
                        }
                    }
                    .page-fl-evaluate-li-two {
                        overflow: hidden;
                        margin-top: 8px;
                        margin-bottom: 10px;
                        span {
                            display: block;
                            &:nth-child(1) {
                                float: left;
                                font-size: 14px;
                                line-height: 29px;
                                letter-spacing: 0px;
                                color: #999999;
                            }
                            &:nth-child(2) {
                                float: right;
                            }
                        }
                    }
                    p {
                        font-size: 14px;
                        line-height: 25px;
                        letter-spacing: 1px;
                        color: #333333;
                        word-break: break-all;
                    }
                }
            }
        }
    }
    .page-fr {
        width: 300px;
        .page-fr-one {
            margin-bottom: 66px;
            ul {
                li {
                    margin-top: 17px;
                    i {
                        display: inline-block;
                        height: 16px;
                        width: 16px;
                        background-size: 16px;
                        vertical-align: top;
                        margin-right: 10px;
                        background-repeat: no-repeat;
                    }
                    span {
                        width: 256px;
                        display: inline-block;
                        vertical-align: top;
                        font-size: 16px;
                        a {
                            color: #008aff;
                        }
                        i {
                            cursor: pointer;
                            margin-left: 5px;
                        }
                    }
                }
            }
            div {
                text-align: center;
                margin-top: 20px;
                img {
                    width: 120px;
                    height: 120px;
                }
            }
        }
        .page-fr-two {
            .page-fr-two-header {
                border-bottom: 1px solid #eee;
                height: 34px;
                span,
                i {
                    display: inline-block;
                }
                .page-fr-two-header-one {
                    font-size: 18px;
                    line-height: 31px;
                    letter-spacing: 0px;
                    color: #333333;
                }
                .page-fr-two-header-two {
                    font-size: 14px;
                    letter-spacing: 0px;
                    color: #666666;
                }
                .page-fr-two-header-thr {
                    font-size: 14px;
                    line-height: 29px;
                    letter-spacing: 0px;
                    color: #666666;
                    float: right;
                    cursor: pointer;
                }
                .page-fr-two-header-min {
                }
                .page-fr-two-header-max {
                    float: right;
                    cursor: pointer;
                    width: 15px;
                    height: 15px;
                    margin-top: 8px;
                    margin-left: 8px;
                }
            }
            .page-fr-two-ul {
                padding: 0 10px;
                box-sizing: border-box;
                overflow: hidden;
                .page-fr-two-ul-li {
                    width: 100%;
                    font-size: 16px;
                    line-height: 33px;
                    letter-spacing: 1px;
                    color: #666666;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
                    &:hover {
                        color: #008aff;
                    }
                }
            }
        }
    }
}
</style>
