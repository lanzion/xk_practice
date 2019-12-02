<template>
    <div class="curriculum">
        <ul class="curriculum-ul">
            <li class="curriculum-li">
                <div class="curriculum-li-img">
                    <ov-image :src-data="imgs" :type="3" :img-height="'222px'"></ov-image>
                </div>
                <div class="curriculum-li-conent">
                    <h3 :style="{'-webkit-box-orient':'vertical'}">考察南海一号，点燃家国情怀 ——记天外高二文科班广东省博物馆社会实践大课堂活动...</h3>
                    <p :style="{'-webkit-box-orient':'vertical'}">2019年5月21日，我校文科班在朱老师和宋老师的组织下来到了广东省博物馆，参观了“大海道——南海一号沉船考古展”，并随后，有幸参加了省博馆长魏峻主讲的“寻找黄金船......</p>
                    <ul>
                        <li>
                            <i :style="{backgroundImage:'url('+plo+')'}"></i>
                            <span>朱智耘</span>
                        </li>
                        <li>
                            <i :style="{backgroundImage:'url('+time+')'}"></i>
                            <span>2019-05-21</span>
                        </li>
                        <li>
                            <i :style="{backgroundImage:'url('+eyes+')'}"></i>
                            <span>123</span>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'schooldetailcurriculum',
    data() {
        return {
            imgs: require('../../../../../../static/img/xuexiaobeijng4.png'),
            time: require('../../../../../../static/img/time.png'),
            eyes: require('../../../../../../static/img/eyes.png'),
            plo: require('../../../../../../static/img/plo.png')
        }
    },
    created() {},
    methods: {}
}
</script>
<style lang='scss' scoped>
.curriculum {
    min-height: 500px;
    .curriculum-ul {
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
