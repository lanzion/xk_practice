<template>
    <div class="rollingnumbers">
        <div class="select">
            <div class="select_e">
                <!-- ———— -->
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
            </div>
        </div>
        <ul class="rollingnumbers_r">
            <li>
                <div class="rollingnumbers_p"></div>
                <div class="rollingnumbers_k">
                    <h3 class="title">参与学生人数</h3>
                    <rollingnumber :time="3" :value="999999" />
                    <img :src="img04" alt />
                </div>
            </li>
            <li>
                <div class="rollingnumbers_p"></div>
                <div class="rollingnumbers_k">
                    <h3 class="title">参与学校数量</h3>
                    <rollingnumber :time="3" :value="888888" />
                    <img :src="img03" alt />
                </div>
            </li>
            <li>
                <div class="rollingnumbers_p"></div>
                <div class="rollingnumbers_k">
                    <h3 class="title">参与基地/机构数量</h3>
                    <rollingnumber :time="3" :value="77777" />
                    <img :src="img05" alt />
                </div>
            </li>
            <li>
                <div class="rollingnumbers_p"></div>
                <div class="rollingnumbers_k">
                    <h3 class="title">活动总次数</h3>
                    <rollingnumber :time="3" :value="666666" />
                    <img :src="img02" alt />
                </div>
            </li>
            <li>
                <div class="rollingnumbers_p"></div>
                <div class="rollingnumbers_k">
                    <h3 class="title">学习总时长</h3>
                    <rollingnumber :time="3" :value="55555" />
                    <img :src="img01" alt />
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'statistics',
    data() {
        return {
            istrue: false,
            jiantou: require('../../../../../static/img/jiantou.png'),
            img01: require('../../../../../static/img/001.png'),
            img02: require('../../../../../static/img/002.png'),
            img03: require('../../../../../static/img/003.png'),
            img04: require('../../../../../static/img/004.png'),
            img05: require('../../../../../static/img/005.png'),
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
    height: 200px;
    background: #2099ff;
    .select {
        background: #2099ff;
        color: #fff;
        font-size: 16px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        .select_e {
            width: 100%;
            height: 100%;
            background: #2099ff;
            .select_r {
                display: inline-block;
                text-align: center;
                font-weight: 600;
                color: #fff;
                font-size: 18px;
                width: 236px;
                height: 100%;
                cursor: pointer;
                position: relative;

                &::before {
                    content: "——";
                    margin-right: 20px;
                }
                &::after {
                    content: "——";
                    margin-left: 20px;
                }
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
                    background: #2099ff;
                    z-index: 1000;
                    .select_l {
                        width: 180px;
                        height: 30px;
                        line-height: 30px;
                        font-size: 14px;
                        cursor: pointer;
                        background: rgba(0, 0, 0, 0.4);
                        &:hover {
                            background: rgba(0, 0, 0, 0.6);
                        }
                    }
                }
            }
        }
    }
    .rollingnumbers_r {
        li {
            width: 240px;
            height: 150px;
            float: left;
            padding: 18px;
            box-sizing: border-box;
            position: relative;
            background: #2099ff;
            &:nth-child(2n-1) {
                background: #1694ff;
            }
            .title {
                color: #fff;
                margin-bottom: 10px;
                font-size: 14px;
                z-index: 1000;
            }
            .rollingnumbers_p {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }
            .rollingnumbers_k {
                position: absolute;
                box-sizing: border-box;
                padding: 18px;
                width: 100%;
                height: 100%;
                top: 0px;
                left: 0px;
                img {
                    position: absolute;
                    right: 20px;
                    bottom: 20px;
                    width: 50px;
                    height: 50px;
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
</style>
