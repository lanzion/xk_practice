<template>
    <div class="basedetails">
        <div class="workshow">
            <div class="imgshow">
                <img :src="imgurl" alt />
            </div>
            <div class="container">
                <div class="container_title">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/work' }">基地机构</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/baseservices' }">活动基地</el-breadcrumb-item>
                        <el-breadcrumb-item>服务详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="container_one">
                    <div class="container_one_l">
                        <ov-image :src-data="baselist.cover" alt ></ov-image>
                    </div>
                    <div class="container_one_r">
                        <div class="container_one_r_header">{{baselist.name}}</div>
                        <div class="container_one_r_drss">
                            <i>
                                <img :src="dizhi" alt />
                            </i>
                            <span>{{baselist.address}}</span>
                        </div>
                        <div class="container_one_r_show">
                            <div class="container_one_r_name">
                                <i>
                                    <img :src="renhei" alt />
                                </i>
                                <span>{{baselist.liaisonMan}}</span>
                            </div>
                            <div class="container_one_r_phone">
                                <i>
                                    <img :src="phone" alt />
                                </i>
                                <span>{{baselist.liaisonWay}}</span>
                            </div>
                            <div class="container_one_r_eye">
                                <i>
                                    <img :src="eye" alt />
                                </i>
                                <span>{{baselist.browseNum}}</span>
                            </div>
                        </div>
                        <div class="container_one_r_min">
                            <p>{{baselist.remark}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="conent_thr">
                <div class="conent_thr_title">
                    <h4>{{datas.title}}</h4>
                </div>
                <div>
                    <img class="conent_img" :src="datas.cover" alt />
                </div>
                <div class="conent_thr_con">
                    <p>{{datas.expound}}</p>
                </div>
                <div class="conent_thr_cli">
                    <span>适合人群</span>
                    <el-radio v-model="radio1" label="A">小学</el-radio>
                    <el-radio v-model="radio2" label="B">初中</el-radio>
                    <el-radio v-model="radio3" label="C">高中</el-radio>
                </div>
                <div class="conent_thr_name">
                    <div
                        class="conent_thr_name_q"
                        :style="{'backgroundImage':'url('+conentimgone+')'}"
                    >
                        <span>负责人</span>
                        <span>{{datas.personInCharge}}</span>
                    </div>
                    <div
                        class="conent_thr_name_q"
                        :style="{'backgroundImage':'url('+conentimgtwo+')'}"
                    >
                        <span>联系方式</span>
                        <span>{{datas.personInChargePhone}}</span>
                    </div>
                    <div
                        class="conent_thr_name_q"
                        :style="{'backgroundImage':'url('+conentimgone+')'}"
                    >
                        <span>最大参与</span>
                        <span>{{datas.maxMannum}}人</span>
                    </div>
                    <div
                        class="conent_thr_name_q"
                        :style="{'backgroundImage':'url('+conentimgtwo+')'}"
                    >
                        <span>项目时长</span>
                        <span>{{datas.maxTime}}小时</span>
                    </div>
                </div>

                <div class="conent_thr_drs">
                    <span>服务位置</span>
                    <span>{{datas.address}}</span>
                </div>
            </div>

            <div class="conent_for">
                <div class="listsdetail_fl_two_m">
                    <h4>评论</h4>
                    <div class="listsdetail_fl_two_m_b">
                        <ul>
                            <li
                                class="listsdetail_fl_two_m_s"
                                v-for="(r,index) in lists"
                                :key="index"
                            >
                                <div class="listsdetail_fl_two_m_s_one">
                                    <!-- <img :src="r.reviewerCover" alt /> -->
                                    <el-avatar
                                        :size="80"
                                        :src="r.reviewerCover"
                                        @error="errorHandler"
                                    >
                                        <img
                                            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                                        />
                                    </el-avatar>
                                </div>
                                <div class="listsdetail_fl_two_m_s_two">
                                    <p>
                                        <span>{{r.reviewerName}}</span>
                                        <span>({{r.reviewerIdentity}})</span>
                                        <span>{{r.reviewerSchool}}</span>
                                    </p>
                                    <span class="textone">{{r.remark}}</span>
                                    <div class="textimg">
                                        <div
                                            class="textimgs"
                                            v-for="(a,index) in r.resources"
                                            :key="index"
                                        >
                                            <img :src="a.resourceId" alt />
                                        </div>
                                    </div>
                                    <span class="texttwo">{{r.createDate}}</span>
                                </div>
                            </li>
                        </ul>

                        <div
                            v-if="!nomore"
                            class="block"
                            :style="{'float':'right','margin':'30px 0'}"
                        >
                            <pagination
                                :param="pages"
                                :page-sizes="[10, 15, 20]"
                                :total="totalNum"
                                @change="getbaselist"
                            ></pagination>
                        </div>
                        <div
                            v-if="nomore"
                            :style="{'width':'100%','height':'200px','background':'#fff','textAlign':'center'}"
                        >
                            <img src="~@assets/image/nothingData.svg" alt />
                            <div :style="{'lineHeight':'0'}">
                                <i :style="{'fontSize':'18px'}">暂无数据...</i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    detailsofbaseservice,
    baseserviceevaluationlist
} from '@/api/frontstage'
export default {
    name: 'basedetails',
    data() {
        return {
            datas: '',
            nomore: false,
            imgurl: require('../../../../static/img/jidibeij.png'),
            dizhi: require('../../../../static/img/dizhi.png'),
            renhei: require('../../../../static/img/renhei.png'),
            phone: require('../../../../static/img/shouji.png'),
            eye: require('../../../../static/img/liulanhui.png'),
            conentimgone: require('../../../../static/img/jidi1.png'),
            conentimgtwo: require('../../../../static/img/jidi6.png'),
            baselist: '',
            lists: [],
            radio1: '',
            radio2: '',
            radio3: ''
        }
    },
    created() {
        this.getlist()
        this.getbaselist()
    },
    watch: {
        'lists.length': {
            handler(newval, oldval) {
                if (newval === 0 || newval == undefined) {
                    this.nomore = true
                } else {
                    this.nomore = false
                }
            },
            deep: true
        }
    },
    methods: {
        errorHandler() {
            return true
        },
        async getlist() {
            let kid = localStorage.getItem('zid')
            let oid = this.$route.query.id
            let id = ''
            if (oid) {
                id = oid
            } else {
                id = kid
            }
            let res = await detailsofbaseservice({ id: id })
            console.log(res)
            this.datas = res.data.entity
            let newstr = this.datas.scope.split(',')
            for (let i = 0; i < newstr.length; i++) {
                if (newstr[i] == 'A') {
                    this.radio1 = 'A'
                } else if (newstr[i] == 'B') {
                    this.radio2 = 'B'
                } else if (newstr[i] == 'C') {
                    this.radio3 = 'C'
                }
            }
            this.baselist =
                JSON.parse(sessionStorage.getItem('baselist')) || ''
        },
        async getbaselist() {
            let kid = localStorage.getItem('zid')
            let oid = this.$route.query.id
            let id = ''
            if (oid) {
                id = oid
            } else {
                id = kid
            }
            let res = await baseserviceevaluationlist(
                { serverId: id },
                this.pages
            )
            this.lists = res.data.entity.resultData
            this.totalNum = res.data.entity.totalNum
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-breadcrumb__inner {
    color: #fff !important;
}

.container_title {
    width: 100%;
    height: 40px;
    color: #fff;
    /deep/ .el-breadcrumb__separator {
        color: #fff;
    }
}
.conent_img {
    max-width: 600px;
}
.workshow {
    width: 100%;
    height: 100%;
    .imgshow {
        height: 276px;
        width: 100%;
        img {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }
    .container {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: 100px;
        overflow: hidden;
        .container_one {
            width: 100%;
            height: 288px;
            padding: 22px 24px;
            background: #fff;
            box-sizing: border-box;
            z-index: 1000;
            .container_one_l {
                width: 400px;
                height: 240px;
                overflow: hidden;
                margin-right: 50px;
                float: left;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .container_one_r {
                float: left;
                height: 240px;
                width: 686px;
                padding-left: 30px;
                border-left: 1px solid #ccc;
                box-sizing: border-box;
                .container_one_r_header {
                    font-size: 22px;
                    color: #333;
                    text-align: left;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                .container_one_r_drss {
                    margin-top: 10px;
                    height: 20px;
                    width: 100%;
                    i {
                        float: left;
                        margin-right: 10px;
                        img {
                            width: 16px;
                        }
                    }
                    span {
                        float: left;
                        color: #666;
                        font-size: 12px;
                    }
                }
                .container_one_r_show {
                    width: 100%;
                    height: 20px;
                    overflow: hidden;
                    margin-top: 10px;

                    img {
                        width: 16px;
                    }
                    .container_one_r_name {
                        float: left;
                        margin-right: 10px;
                        i {
                            float: left;
                            margin-right: 10px;
                        }
                        span {
                            float: left;
                        }
                    }
                    .container_one_r_phone {
                        float: left;
                        margin-right: 10px;
                        i {
                            float: left;
                            margin-right: 10px;
                        }
                        span {
                            float: left;
                        }
                    }
                    .container_one_r_eye {
                        float: left;
                        i {
                            float: left;
                            margin-right: 10px;
                        }
                        span {
                            float: left;
                        }
                    }
                }
                .container_one_r_min {
                    margin-top: 10px;
                    width: 100%;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 5px 8px;
                    box-sizing: border-box;
                    p {
                        text-indent: 20px;
                        line-height: 22px;
                        width: 100%;
                        height: 155px;
                        text-align: left;
                        font-size: 14px;
                        color: #666;
                        // display: -webkit-box;
                        // -webkit-box-orient: vertical;
                        // -webkit-line-clamp: 3;
                        // overflow: hidden;
                        // line-height: 2;
                        overflow: hidden;
                        overflow-y: auto;
                    }
                }
                // .container_one_r_eye {
                //     margin-top: 30px;
                //     height: 30px;
                //     width: 100%;
                //     i {
                //         float: left;
                //         margin-right: 10px;
                //     }
                //     span {
                //         float: left;
                //         color: #ccc;
                //         font-size: 14px;
                //     }
                // }
            }
        }
    }
    .container_two {
        overflow: hidden;
        width: 1200px;
        margin: 100px auto;
        height: 60px;
        background: #fff;
        margin-bottom: 0;
        ul {
            width: 100%;
            height: 60px;
            li {
                float: left;
                width: 100px;
                height: 30px;
                border-radius: 15px;
                margin-left: 48px;
                margin-top: 15px;
                font-size: 16px;
                color: #333333;
                line-height: 30px;
            }
        }
    }
}
.conent_thr {
    width: 1200px;
    overflow: hidden;
    margin: 85px auto;
    margin-bottom: 0px;
    background: #fff;
    padding: 20px;
    padding-top: 0px;
    box-sizing: border-box;
    .conent_thr_title {
        h4 {
            font-size: 28px;
            color: #333333;
            width: 100%;
            height: 90px;
            line-height: 90px;
            text-align: left;
        }
    }
    .conent_thr_con {
        width: 100%;
        min-height: 200px;
        padding-bottom: 58px;
        box-sizing: border-box;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
        p {
            color: #333333;
            font-size: 16px;
            line-height: 39px;
            text-indent: 20px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 16;
            overflow: hidden;
        }
    }
    .conent_thr_cli {
        height: 90px;
        line-height: 90px;
        color: #666666;
        font-size: 16px;
        span {
            margin-right: 30px;
        }
    }
    .conent_thr_name {
        height: 134px;
        width: 100%;
        .conent_thr_name_q {
            width: 182px;
            height: 134px;
            float: left;
            margin-right: 20px;
            padding: 5px 7px;
            box-sizing: border-box;
            span {
                display: block;
                width: 100%;
                height: 44px;
                line-height: 44px;
                text-align: center;
                color: #ffffff;
                font-size: 24px;
                &:nth-child(1) {
                    font-size: 16px;
                }
            }
        }
    }
    .conent_thr_drs {
        width: 100%;
        height: 75px;
        span {
            display: block;
            float: left;
            font-size: 16px;
            color: #666666;
            &:nth-child(1) {
                height: 100%;
                width: 70px;
                text-align: center;
                line-height: 75px;
                margin-right: 24px;
            }
            &:nth-child(2) {
                height: 100%;
                text-align: center;
                line-height: 75px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
.conent_for {
    width: 1200px;
    overflow: hidden;
    margin: 20px auto;
    margin-bottom: 150px;
    background: #fff;
    padding: 20px;
    padding-top: 0px;
    box-sizing: border-box;
    .listsdetail_fl_two_m {
        padding: 20px 30px;
        width: 100%;
        box-sizing: border-box;
        h4 {
            font-size: 20px;
            color: #333;
            margin-bottom: 30px;
        }
        .listsdetail_fl_two_m_b {
            width: 100%;
            ul {
                height: 100%;
                width: 100%;
                .listsdetail_fl_two_m_s {
                    height: auto;
                    width: 100%;
                    overflow: hidden;
                    padding-bottom: 15px;
                    margin-bottom: 15px;
                    border-bottom: 1px solid #ccc;
                    &:hover {
                        .listsdetail_fl_two_m_s_two {
                            p {
                                span {
                                    &:nth-child(1) {
                                        color: #008aff;
                                    }
                                    &:nth-child(2) {
                                        color: #008aff;
                                    }
                                }
                            }
                        }
                    }
                    .listsdetail_fl_two_m_s_one {
                        float: left;
                        width: 80px;
                        height: 78px;
                        border-radius: 50%;
                        border: 1px solid #ccc;
                        margin-right: 27px;
                        overflow: hidden;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .listsdetail_fl_two_m_s_two {
                        float: left;
                        width: 900px;
                        height: 100%;
                        p {
                            display: block;
                            margin-bottom: 12px;
                            span {
                                color: #333333;
                                &:nth-child(1) {
                                    display: inline-block;
                                    font-size: 16px;
                                }
                                &:nth-child(2) {
                                    display: inline-block;
                                    font-size: 12px;
                                    margin-left: 5px;
                                    margin-right: 30px;
                                }
                                &:nth-child(3) {
                                    display: inline-block;
                                    font-size: 12px;
                                }
                            }
                        }
                        .textone {
                            display: block;
                            font-size: 16px;
                            color: #333333;
                        }
                        .textimg {
                            width: 100%;
                            height: auto;
                            overflow: hidden;
                            .textimgs {
                                float: left;
                                width: 140px;
                                margin-right: 20px;
                            }
                            img {
                                margin: 10px 0;
                                margin-right: 10px;
                                height: 140px;
                                max-width: 140px;
                            }
                        }
                        .texttwo {
                            display: block;
                            font-size: 14px;
                            color: #cccccc;
                        }
                    }
                }
            }
        }
    }
}
.container_title {
    width: 100%;
    height: 40px;
    color: #fff;
    /deep/ .el-breadcrumb__separator {
        color: #fff;
    }
}
/deep/ .el-breadcrumb__inner {
    color: #fff !important;
}
</style>
