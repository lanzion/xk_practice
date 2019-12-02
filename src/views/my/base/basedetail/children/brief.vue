<template>
    <div class="brief">
        <div class="brief-fl fl">
            <div class="brief-fl-title">
                <h3>{{baseDetail.name}}</h3>
                <p id="conent">{{baseDetail.remark}}</p>
            </div>
        </div>
        <div class="brief-fr fr">
            <div class="brief-fr-one">
                <ul>
                    <li>
                        <i :style="{backgroundImage:'url('+plo+')'}"></i>
                        <span>{{baseDetail.linkMan}}</span>
                    </li>
                    <li>
                        <i :style="{backgroundImage:'url('+dianhua+')'}"></i>
                        <span>{{baseDetail.linkPhone}}</span>
                    </li>
                    <li>
                        <i :style="{backgroundImage:'url('+dizhi+')'}"></i>
                        <span>
                            {{baseDetail.address}}
                            <i :style="{backgroundImage:'url('+baiduditu+')'}"></i>
                        </span>
                    </li>
                    <li>
                        <i :style="{backgroundImage:'url('+jiaotong+')'}"></i>
                        <span>{{baseDetail.transport}}</span>
                    </li>
                    <li>
                        <i :style="{backgroundImage:'url('+dengji+')'}"></i>
                        <span>省级</span>
                    </li>
                    <li>
                        <i :style="{backgroundImage:'url('+pingfeng+')'}"></i>
                        <span>{{numFilter(baseDetail.scorse)}}</span>
                    </li>
                    <li>
                        <i :style="{backgroundImage:'url('+guanwang+')'}"></i>
                        <span>
                            <a :href="baseDetail.pathUrl">{{baseDetail.pathUrl}}</a>
                        </span>
                    </li>
                </ul>
                <div class>
                    <img :src="baseDetail.officialAccounts" alt />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'brief',
    data() {
        return {
            value: 5,
            baseDetail: {},
            time: require('../../../../../../static/img/time.png'),
            erweima: require('../../../../../../static/img/xikegongzhonghao.png'),
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
    created() {
        this.baseDetail = JSON.parse(sessionStorage.getItem('baseDetail'))
    },
    methods: {
        numFilter(value) {
            let realVal = parseFloat(value).toFixed(1)
            return realVal
        },
        // go() {
        //     this.$router.push({ path: '/base/basedetail/brief' })
        // }
    }
}
</script>
<style lang='scss' scoped>
.brief {
    overflow: hidden;
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
</style>
