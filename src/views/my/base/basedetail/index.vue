<template>
    <div class="basedetail">
        <div>
            <ov-image
                :type="4"
                :src-data="datas.designSpaceBackground"
                :img-height="'350px'"
                class="ovimage"
            >
                <span slot="spans">{{datas.name}}</span>
            </ov-image>
        </div>
        <div class="header" v-show="goodsNum">
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
        <div class="container" v-show="goodsNum">
            <router-view :datas="JSON.stringify(datas)"></router-view>
        </div>
        <div class="container" v-show="!goodsNum">
            <div class="brief">
                <div class="brief-fl fl">
                    <div class="brief-fl-title">
                        <h3>{{datas.name}}</h3>
                        <p id="conent">{{datas.remark}}</p>
                    </div>
                </div>
                <div class="brief-fr fr">
                    <div class="brief-fr-one">
                        <ul>
                            <li>
                                <i :style="{backgroundImage:'url('+plo+')'}"></i>
                                <span>{{datas.linkMan}}</span>
                            </li>
                            <li>
                                <i :style="{backgroundImage:'url('+dianhua+')'}"></i>
                                <span>{{datas.linkPhone}}</span>
                            </li>
                            <li>
                                <i :style="{backgroundImage:'url('+dizhi+')'}"></i>
                                <span>
                                    {{datas.address}}
                                    <i
                                        @click="getMap(datas.address,datas.name)"
                                        :style="{backgroundImage:'url('+baiduditu+')'}"
                                    ></i>
                                </span>
                            </li>
                            <li>
                                <i :style="{backgroundImage:'url('+jiaotong+')'}"></i>
                                <span>{{datas.transport}}</span>
                            </li>
                            <li>
                                <i :style="{backgroundImage:'url('+dengji+')'}"></i>
                                <span>省级</span>
                            </li>
                            <li>
                                <i :style="{backgroundImage:'url('+pingfeng+')'}"></i>
                                <span>{{numFilter(datas.scorse === null ? 5:datas.scorse )}}</span>
                            </li>
                            <li>
                                <i :style="{backgroundImage:'url('+guanwang+')'}"></i>
                                <span>
                                    <a :href="datas.pathUrl">{{datas.pathUrl}}</a>
                                </span>
                            </li>
                        </ul>
                        <div class>
                            <img :src="datas.officialAccounts" alt />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    requestwebapibaseDetail,
    requestwebapiLongitudeAndlatitude
} from '@/api/webApi/base'
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
            ],
            value: 5,
            time: require('../../../../../static/img/time.png'),
            erweima: require('../../../../../static/img/xikegongzhonghao.png'),
            plo: require('../../../../../static/img/plo.png'),
            dianhua: require('../../../../../static/img/dianhua.png'),
            dizhi: require('../../../../../static/img/dizhi.png'),
            jiaotong: require('../../../../../static/img/jiaotong.png'),
            dengji: require('../../../../../static/img/dengji.png'),
            guanwang: require('../../../../../static/img/guanwang.png'),
            pingfeng: require('../../../../../static/img/pingfeng.png'),
            baiduditu: require('../../../../../static/img/baiduditu.png')
        }
    },
    created() {
        this.getlists()
        // let baseDetail = JSON.parse(sessionStorage.getItem('baseDetail'))
        // this.datas = baseDetail
    },
    computed: {
        goodsNum() {
            return this.$store.state.test.goodsNum
        }
    },
    methods: {
        go(path) {
            let baseId = this.$route.query.baseId
            if (baseId) {
                this.id = baseId
            } else {
                this.id = sessionStorage.getItem('baseId')
            }
            this.$router.push({ path: path, query: { baseId: this.id } })
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
                sessionStorage.setItem(
                    'baseDetail',
                    JSON.stringify(this.datas)
                )
            } catch (error) {
                this.datas = {}
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
        numFilter(value) {
            let realVal = parseFloat(value).toFixed(1)
            return realVal
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
.brief {
    overflow: hidden;
    margin-top: 20px;
    .brief-fl {
        width: 862px;
        height: auto;
        .brief-fl-title {
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
            }
        }
    }
    .brief-fr {
        width: 300px;
        .brief-fr-one {
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
    }
}
.ovimage {
    position: relative;
    span {
        position: absolute;
        display: inline-block;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        line-height: 293px;
        text-align: center;
        font-size: 40px;
        color: #fff;
        font-weight: 800;
        letter-spacing: 9px;
    }
}
</style>
