<template>
    <div class="page">
        <div class="page-one">
            <div class="page-fl fl">
                <div class="page-fl-title">
                    <h3>{{schoolDetail.schoolName}}</h3>
                    <p id="conent">
                        {{schoolDetail.remark}}
                        <span></span>
                    </p>
                    <h4 @click="go()">点击查看详情>></h4>
                </div>
            </div>
            <div class="page-fr fr">
                <div class="page-fr-one">
                    <ul>
                        <li>
                            <i :style="{backgroundImage:'url('+plo+')'}"></i>
                            <span>{{schoolDetail.linkName}}</span>
                        </li>
                        <li>
                            <i :style="{backgroundImage:'url('+dianhua+')'}"></i>
                            <span>{{schoolDetail.phone}}</span>
                        </li>
                        <li>
                            <i :style="{backgroundImage:'url('+dizhi+')'}"></i>
                            <span>
                                {{schoolDetail.address}}
                                <i
                                    @click="getMap(datas.address)"
                                    :style="{backgroundImage:'url('+baiduditu+')'}"
                                ></i>
                            </span>
                        </li>
                        <li>
                            <i :style="{backgroundImage:'url('+guanwang+')'}"></i>
                            <span>
                                <a :href="schoolDetail.pathUrl">{{schoolDetail.pathUrl}}</a>
                            </span>
                        </li>
                    </ul>
                    <div class>
                        <img :src="schoolDetail.officialAccounts" alt />
                    </div>
                </div>
            </div>
        </div>
        <div class="page-fl-coure">
            <div class="page-fl-coure-header">
                <i
                    class="page-fl-coure-header-min"
                    :style="{backgroundImage:'url('+huodongchengguo+')'}"
                ></i>
                <span class="page-fl-coure-header-one">活动成果</span>
                <i class="page-fl-coure-header-max" :style="{backgroundImage:'url('+gengduo+')'}"></i>
                <span class="page-fl-coure-header-thr">更多</span>
            </div>
            <ul class="page-fl-coure-ul">
                <li>
                    <div class="page-fl-coure-ul-img">
                        <ov-image :type="3" :src-data="'123'" :img-height="'168px'"></ov-image>
                    </div>
                    <div class="page-fl-coure-ul-connet">
                        <h3
                            :style="{'-webkit-box-orient':'vertical'}"
                        >课程名称课程课程名称课程名称名称课程名称…课程名称课程名称名称课程名称…名称名称课程名称…</h3>
                        <p :style="{'-webkit-box-orient':'vertical'}">
                            2019年5月21日，我校文科班在朱老师和宋老师的组织下来到了广东省博物大海道——南海一号沉船考古展金船中国水下考南海一号沉船考古展金船中国水下考中国水下考...
                            2019年5月21日，我校文科班在朱老师和宋老师的组织下来到了广东省博物大海道——南海一号沉船考古展金船中国水下考南海一号沉船考古展金船中国水下考中国水下考...
                        </p>
                    </div>
                </li>
                <li>
                    <div class="page-fl-coure-ul-img">
                        <ov-image :type="3" :src-data="'123'" :img-height="'168px'"></ov-image>
                    </div>
                    <div class="page-fl-coure-ul-connet">
                        <h3
                            :style="{'-webkit-box-orient':'vertical'}"
                        >课程名称课程课程名称课程名称名称课程名称…课程名称课程名称名称课程名称…名称名称课程名称…</h3>
                        <p :style="{'-webkit-box-orient':'vertical'}">
                            2019年5月21日，我校文科班在朱老师和宋老师的组织下来到了广东省博物大海道——南海一号沉船考古展金船中国水下考南海一号沉船考古展金船中国水下考中国水下考...
                            2019年5月21日，我校文科班在朱老师和宋老师的组织下来到了广东省博物大海道——南海一号沉船考古展金船中国水下考南海一号沉船考古展金船中国水下考中国水下考...
                        </p>
                    </div>
                </li>
                <li>
                    <div class="page-fl-coure-ul-img">
                        <ov-image :type="3" :src-data="'123'" :img-height="'168px'"></ov-image>
                    </div>
                    <div class="page-fl-coure-ul-connet">
                        <h3
                            :style="{'-webkit-box-orient':'vertical'}"
                        >课程名称课程课程名称课程名称名称课程名称…课程名称课程名称名称课程名称…名称名称课程名称…</h3>
                        <p :style="{'-webkit-box-orient':'vertical'}">
                            2019年5月21日，我校文科班在朱老师和宋老师的组织下来到了广东省博物大海道——南海一号沉船考古展金船中国水下考南海一号沉船考古展金船中国水下考中国水下考...
                            2019年5月21日，我校文科班在朱老师和宋老师的组织下来到了广东省博物大海道——南海一号沉船考古展金船中国水下考南海一号沉船考古展金船中国水下考中国水下考...
                        </p>
                    </div>
                </li>
                <li>
                    <div class="page-fl-coure-ul-img">
                        <ov-image :type="3" :src-data="'123'" :img-height="'168px'"></ov-image>
                    </div>
                    <div class="page-fl-coure-ul-connet">
                        <h3
                            :style="{'-webkit-box-orient':'vertical'}"
                        >课程名称课程课程名称课程名称名称课程名称…课程名称课程名称名称课程名称…名称名称课程名称…</h3>
                        <p :style="{'-webkit-box-orient':'vertical'}">
                            2019年5月21日，我校文科班在朱老师和宋老师的组织下来到了广东省博物大海道——南海一号沉船考古展金船中国水下考南海一号沉船考古展金船中国水下考中国水下考...
                            2019年5月21日，我校文科班在朱老师和宋老师的组织下来到了广东省博物大海道——南海一号沉船考古展金船中国水下考南海一号沉船考古展金船中国水下考中国水下考...
                        </p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="page-fl-evaluate">
            <div class="page-fl-evaluate-header">
                <i
                    class="page-fl-evaluate-header-min"
                    :style="{backgroundImage:'url('+shijianjidijigou+')'}"
                ></i>
                <span class="page-fl-evaluate-header-one">实践基地/机构</span>
                <i
                    class="page-fl-evaluate-header-max"
                    :style="{backgroundImage:'url('+gengduo+')'}"
                ></i>
                <span class="page-fl-evaluate-header-thr">更多</span>
            </div>
            <ul class="page-fl-evaluate-ul">
                <li>
                    <div>
                        <ov-image :type="3" :src-data="'123'" :img-height="'235px'"></ov-image>
                    </div>
                    <h3>课程名称课程名称名称课程名称…</h3>
                    <h4>已参加课程:</h4>
                    <ul>
                        <li>《寻找广州城市天际线》</li>
                        <li>《寻找广州城市天际线城市天际线》</li>
                        <li>《寻找广州城市天际线》</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { requestwebapischoolDetailbase } from '@/api/webApi/school'
import { requestwebapiLongitudeAndlatitude } from '@/api/webApi/base'
export default {
    name: 'schooldetailpage',
    data() {
        return {
            id: '',
            value: 5,
            lists: [],
            lng: 0,
            lat: 0,
            schoolDetail: {},
            time: require('../../../../../../static/img/time.png'),
            erweima: require('../../../../../../static/img/xikegongzhonghao.png'),
            huodongchengguo: require('../../../../../../static/img/huodongchengguo.png'),
            gengduo: require('../../../../../../static/img/gengduo.png'),
            shijianjidijigou: require('../../../../../../static/img/shijianjidijigou.png'),
            plo: require('../../../../../../static/img/plo.png'),
            dianhua: require('../../../../../../static/img/dianhua.png'),
            dizhi: require('../../../../../../static/img/dizhi.png'),
            guanwang: require('../../../../../../static/img/guanwang.png'),
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
            this.schoolDetail = JSON.parse(val)
            console.log(this.schoolDetail)
        }
    },
    created() {
        this.schoolDetail = JSON.parse(sessionStorage.getItem('schoolDetail'))
        this.getlists()
    },
    methods: {
        go() {
            this.$router.push({
                path: '/school/schooldetail/brief',
                query: { schoolId: this.id }
            })
        },
        async getlists() {
            this.isLoading = true
            let schoolId = this.$route.query.schoolId
            if (schoolId) {
                this.id = schoolId
            } else {
                this.id = sessionStorage.getItem('schoolId')
            }
            let pages = {
                pageSize: 3,
                pageNum: 1
            }
            const res = await requestwebapischoolDetailbase(
                { id: this.id },
                pages
            )
            const { entity: datas = {} } = res.data
            try {
                this.lists = datas.resultData || []
                console.log(this.lists)
            } catch (error) {
                this.lists = []
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
                this.lng = datas.lng || 113.27
                this.lat = datas.lat || 23.13
                const { href } = this.$router.resolve({
                    name: `bmap`,
                    query: {
                        lng: this.lng,
                        lat: this.lat,
                        name: this.datas.schoolName
                    }
                })
                window.open(href, '_blank')
            } catch (error) {
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.page {
    overflow: hidden;
    .page-one {
        overflow: hidden;
        .page-fl {
            width: 862px;
            height: auto;
            .page-fl-title {
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
                    position: relative;
                    overflow: hidden;
                    span {
                        position: absolute;
                        background: linear-gradient(
                            to top,
                            #fff,
                            rgba(255, 255, 255, 0.5)
                        );
                        display: block;
                        width: 100%;
                        height: 30px;
                        bottom: 0;
                        left: 0;
                    }
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
                vertical-align: middle;
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
                vertical-align: middle;
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
                width: 560px;
                height: 168px;
                float: left;
                margin-bottom: 36px;
                cursor: pointer;
                &:nth-child(2n-1) {
                    margin-right: 80px;
                }
                &:hover {
                    .page-fl-coure-ul-connet {
                        box-shadow: 0px 2px 2px 0px rgba(6, 0, 51, 0.19);
                        border-radius: 4px 4px 0px 0px;
                        opacity: 0.9;
                    }
                }
                .page-fl-coure-ul-img {
                    float: left;
                    width: 270px;
                }
                .page-fl-coure-ul-connet {
                    float: left;
                    width: 270px;
                    height: 168px;
                    padding-left: 18px;
                    box-sizing: border-box;
                    overflow: hidden;
                    h3 {
                        margin-bottom: 18px;
                        font-size: 16px;
                        line-height: 24px;
                        letter-spacing: 0px;
                        color: #262626;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    p {
                        font-size: 14px;
                        line-height: 25px;
                        letter-spacing: 0px;
                        color: #666666;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 4;
                        overflow: hidden;
                    }
                }
            }
        }
    }
    .page-fl-evaluate {
        margin-bottom: 90px;
        margin-top: 28px;
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
                vertical-align: middle;
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
                vertical-align: middle;
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
                width: 380px;
                height: 388px;
                border: 1px solid #eeeeee;
                box-sizing: border-box;
                float: left;
                margin-right: 30px;
                &:nth-last-child(1) {
                    margin-right: 0px;
                }
                h3 {
                    height: 34px;
                    font-size: 16px;
                    line-height: 34px;
                    letter-spacing: 2.3px;
                    color: #262626;
                    padding: 0 10px;
                    box-sizing: border-box;
                    margin-bottom: 10px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                h4 {
                    height: 24px;
                    font-size: 14px;
                    line-height: 24px;
                    letter-spacing: 2px;
                    color: #666666;
                    padding: 0 10px;
                    box-sizing: border-box;
                    margin-bottom: 6px;
                }
                ul {
                    li {
                        height: 22px;
                        font-size: 14px;
                        line-height: 22px;
                        letter-spacing: 1.4px;
                        color: #008aff;
                        padding: 0 10px;
                        box-sizing: border-box;
                        border: none;
                        margin-bottom: 4px;
                    }
                }
            }
        }
    }
}
</style>
