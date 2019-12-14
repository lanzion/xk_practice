<template>
    <div class="rollingnumbers">
        <div class="select">
            <div class="select_e">
                <i :style="{backgroundImage:'url('+zuo+')'}"></i>
                <span class="select_r" type="text" @mouseenter="getistrue" @mouseleave="setistrue">
                    {{select}}
                    <i class="select_i" :style="{backgroundImage:'url('+jiantou+')'}"></i>
                    <ul class="select_u">
                        <li
                            class="select_l"
                            v-for="(g,index) in arr"
                            @click="change(g.value)"
                            :key="index"
                        >{{g.value}}</li>
                    </ul>
                </span>
                <i :style="{backgroundImage:'url('+you+')'}"></i>
            </div>
        </div>
        <div class="container">
            <ul class="rollingnumbers_r">
                <li>
                    <div class="rollingnumbers_k">
                        <div class="fl">
                            <img :src="xueshengrenci" alt />
                        </div>
                        <div class="fl">
                            <h3 class="title">参与学生人次</h3>
                            <rollingnumber :time="3" :value="15684" :num-color="'#f26565'"/>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="rollingnumbers_k">
                        <div class="fl">
                            <img :src="xuexiaoshuliang" alt />
                        </div>
                        <div class="fl">
                            <h3 class="title">参与学校数量</h3>
                            <rollingnumber :time="3" :value="564541" :num-color="'#ffb25b'" />
                        </div>
                    </div>
                </li>
                <li>
                    <div class="rollingnumbers_k">
                        <div class="fl">
                            <img :src="jidishuliang" alt />
                        </div>
                        <div class="fl">
                            <h3 class="title">参与基地/机构数量</h3>
                            <rollingnumber :time="3" :value="481516" :num-color="'#3fc1c9'" />
                        </div>
                    </div>
                </li>
                <li>
                    <div class="rollingnumbers_k">
                        <div class="fl">
                            <img :src="huodongzongchangci" alt />
                        </div>
                        <div class="fl">
                            <h3 class="title">活动总场次</h3>
                            <rollingnumber :time="3" :value="456551" :num-color="'#328fdd'" />
                        </div>
                    </div>
                </li>
                <li>
                    <div class="rollingnumbers_k">
                        <div class="fl">
                            <img :src="xuexizongkeshi" alt />
                        </div>
                        <div class="fl">
                            <h3 class="title">学习总课时</h3>
                            <rollingnumber :time="3" :value="48425" :num-color="'#7c8d3c'" />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'statistics',
    data() {
        return {
            istrue: false,
            jiantou: require('../../../../../static/img/xinxaila.png'),
            xueshengrenci: require('../../../../../static/img/xueshengrenci.png'),
            xuexiaoshuliang: require('../../../../../static/img/xuexiaoshuliang.png'),
            jidishuliang: require('../../../../../static/img/jidishuliang.png'),
            huodongzongchangci: require('../../../../../static/img/huodongzongchangci.png'),
            xuexizongkeshi: require('../../../../../static/img/xuexizongkeshi.png'),
            zuo: require('../../../../../static/img/zuo.png'),
            you: require('../../../../../static/img/you.png'),
            arr: [
                {
                    name: '001',
                    value: '2019年度'
                },
                {
                    name: '002',
                    value: '2018年度'
                },
                {
                    name: '003',
                    value: '2017年度'
                },
                {
                    name: '004',
                    value: '2016年度'
                },
                {
                    name: '005',
                    value: '总计'
                }
            ],
            select: '',
            oheight: ''
        }
    },
    components: {
        rollingnumber: resolve =>
            require(['@/components/my/rollingnumber/rollingnumber'], resolve)
    },
    created() {
        this.select = this.arr[0].value
    },
    methods: {
        change(value) {
            this.select = value
            // eslint-disable-next-line no-undef
            $('.select_u').css({ display: 'none' })
        },
        getistrue() {
            this.istrue = true
            let num = document.getElementsByClassName('select_l').length
            // eslint-disable-next-line no-undef
            $('.select_u')
                .css({ display: 'block' })
                .stop()
                .animate({ height: num * 30 + 'px' }, 400)
        },
        setistrue() {
            // eslint-disable-next-line no-undef
            $('.select_u')
                .stop()
                .animate({ height: '0px' }, 400)
        }
    }
}
</script>
<style lang="scss" scoped>
.rollingnumbers {
    width: 100%;
    height: auto;
    border: 1px solid #f8f8f8;
    margin-bottom: 46px;
    .select {
        text-align: center;
        height: 48px;
        line-height: 48px;
        font-size: 18px;
        letter-spacing: 0px;
        color: #374a66;
        .select_e {
            width: 100%;
            height: 100%;
            i{
                display: inline-block;
                height: 18px;
                width: 18px;
                background-repeat: no-repeat;
                background-size: 18px;
                background-position: center;
                vertical-align: middle;
                &:nth-child(1){
                    margin-left: 14px;
                }
                &:nth-child(1){
                    margin-right: 14px;
                }
            }
            .select_r {
                display: inline-block;
                margin: 0 auto;
                text-align: center;
                font-weight: 500;
                font-size: 18px;
                width: 134px;
                height: 100%;
                cursor: pointer;
                position: relative;
                letter-spacing: 0px;
                color: #262626;
                vertical-align: middle;
                // &::before {
                //     content: "——";
                //     margin-right: 20px;
                // }
                // &::after {
                //     content: "——";
                //     margin-left: 20px;
                // }
                &:hover {
                    .select_i {
                        -moz-transform: rotate(180deg);
                        -webkit-transform: rotate(180deg);
                        transform: rotate(180deg);
                        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
                    }
                }
                .select_i {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: 20px;
                    // vertical-align: middle;
                }
                .select_u {
                    position: absolute;
                    left: -25%;
                    height: 0px;
                    top: 100%;
                    width: 180px;
                    overflow: hidden;
                    z-index: 1000;
                    // background: #fff;
                    .select_l {
                        width: 180px;
                        height: 30px;
                        line-height: 30px;
                        font-size: 14px;
                        cursor: pointer;
                        background: #f8f8f8;
                        &:hover {
                            background: #eee;
                        }
                        &::after {
                            content: none;
                        }
                    }
                }
            }
        }
    }
    .container {
        overflow: hidden;
        .rollingnumbers_r {
           overflow: hidden;
            li {
                width: 240px;
                height: 110px;
                float: left;
                box-sizing: border-box;
                position: relative;
                &:nth-child(1) {
                    position: relative;
                    text-align: center;
                    .select {
                        text-align: center;
                        height: 62px;
                        line-height: 62px;
                        font-size: 18px;
                        letter-spacing: 0px;
                        color: #374a66;
                        .select_e {
                            width: 100%;
                            height: 100%;
                            .select_r {
                                display: inline-block;
                                text-align: center;
                                font-weight: 400;
                                color: #374a66;
                                font-size: 18px;
                                width: 100%;
                                height: 100%;
                                cursor: pointer;
                                position: relative;

                                // &::before {
                                //     content: "——";
                                //     margin-right: 20px;
                                // }
                                // &::after {
                                //     content: "——";
                                //     margin-left: 20px;
                                // }
                                &:hover {
                                    .select_i {
                                        -moz-transform: rotate(180deg);
                                        -webkit-transform: rotate(180deg);
                                        transform: rotate(180deg);
                                        filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
                                    }
                                }
                                .select_i {
                                    display: inline-block;
                                    width: 20px;
                                    height: 20px;
                                    background-position: center;
                                    background-repeat: no-repeat;
                                    background-size: 20px;
                                    vertical-align: middle;
                                }
                                .select_u {
                                    position: absolute;
                                    left: 26px;
                                    height: 0px;
                                    top: 100%;
                                    width: 180px;
                                    overflow: hidden;
                                    z-index: 1000;
                                    background: #fff;
                                    .select_l {
                                        width: 180px;
                                        height: 30px;
                                        line-height: 30px;
                                        font-size: 14px;
                                        cursor: pointer;
                                        background: #fff;
                                        &:hover {
                                            background: #ccc;
                                        }
                                        &::after {
                                            content: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .title {
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 29.5px;
                    letter-spacing: 0px;
                    color: #262626;
                }
                // .rollingnumbers_p {
                //     position: absolute;
                //     width: 100%;
                //     height: 100%;
                //     top: 0;
                //     left: 0;
                // }
                .rollingnumbers_k {
                    margin-top: 20px;
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    div {
                        &:nth-child(1) {
                            margin-right: 10px;
                            margin-left: 4px;
                        }
                        &:nth-child(2) {
                        }
                    }
                }
                &:hover {
                    .rollingnumbers_p {
                        background: rgba(255, 255, 255, 0.2);
                    }
                }
            }
        }
    }
}
</style>
