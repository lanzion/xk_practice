<template>
    <div class="curriculumcenter">
        <div class="curriculumcenter-center">
            <div class="page-fl-coure fl">
                <div class="page-fl-coure-header">
                    <i
                        class="page-fl-coure-header-min"
                        :style="{backgroundImage:'url('+kechenglan+')'}"
                    ></i>
                    <span class="page-fl-coure-header-one">课程荟萃</span>
                    <i
                        class="page-fl-coure-header-max"
                        :style="{backgroundImage:'url('+gengduo+')'}"
                        @click="go()"
                    ></i>
                    <span class="page-fl-coure-header-thr" @click="go()">更多</span>
                </div>
                <ul class="page-fl-coure-ul">
                    <li
                        v-for="(g,index) in datas"
                        :key="index"
                        @click="gocourse(g.id,g.classificationParent)"
                    >
                        <div>
                            <ov-image
                                :type="3"
                                :src-data="getFileUrl(g.cover)"
                                :img-height="'170px'"
                            ></ov-image>
                        </div>
                        <h3>{{g.name}}</h3>
                        <div class="page-fl-coure-ul-min">
                            <p>{{g.baseinfoName}}</p>
                        </div>
                        <div class="page-fl-coure-ul-max">
                            <span v-if="g.publishingUnitLevel == 'A'">省级</span>
                            <span v-else-if="g.publishingUnitLevel == 'B'">市级</span>
                            <span v-else-if="g.publishingUnitLevel == 'C'">区级</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="curriculumcenter-right fr">
                <div class="curriculumcenter-title">
                    <span>公告资讯</span>
                </div>
                <ul>
                    <li>
                        <div>
                            <i></i>
                            <span>
                                <em>【天河区】</em>
                                {{cutString('关于开展首批天河区中小学生社会实践大课堂资源基地申报工作的通知',48)}}
                            </span>
                        </div>
                        <div>
                            <span>广州</span>
                            <span>2019-12-09</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <i></i>
                            <span>
                                <em>【天河区】</em>
                                {{cutString('关于开展首批天河区中小学生社会实践大课堂资源基地申报工作的通知',48)}}
                            </span>
                        </div>
                        <div>
                            <span>广州</span>
                            <span>2019-12-09</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <i></i>
                            <span>
                                <em>【天河区】</em>
                                {{cutString('关于开展首批天河区中小学生社会实践大课堂资源基地申报工作的通知',48)}}
                            </span>
                        </div>
                        <div>
                            <span>广州</span>
                            <span>2019-12-09</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <i></i>
                            <span>
                                <em>【天河区】</em>
                                {{cutString('关于开展首批天河区中小学生社会实践大课堂资源基地申报工作的通知',48)}}
                            </span>
                        </div>
                        <div>
                            <span>广州</span>
                            <span>2019-12-09</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <i></i>
                            <span>
                                <em>【天河区】</em>
                                {{cutString('关于开展首批天河区中小学生社会实践大课堂资源基地申报工作的通知',48)}}
                            </span>
                        </div>
                        <div>
                            <span>广州</span>
                            <span>2019-12-09</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <i></i>
                            <span>
                                <em>【天河区】</em>
                                {{cutString('关于开展首批天河区中小学生社会实践大课堂资源基地申报工作的通知',48)}}
                            </span>
                        </div>
                        <div>
                            <span>广州</span>
                            <span>2019-12-09</span>
                        </div>
                    </li>
                </ul>
                <p>更多>></p>
            </div>
        </div>
    </div>
</template>

<script>
import { requestwebapicurriculumCenter } from '@/api/webApi/curriculumCenter'
export default {
    name: 'curriculumcenter',
    data() {
        return {
            pages: {
                pageSize: 6,
                pageNum: 1
            },
            datas: [],
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
            gonggaozixun: require('../../../../../static/img/gonggaozixun.png')
        }
    },
    created() {
        this.getlists()
    },
    methods: {
        async getlists() {
            this.isLoading = true
            let form = {
                classificationParent: '',
                classificationChildren: '',
                provinceId: '',
                cityId: '',
                areaId: '',
                name: '',
                fit: '',
                publishingUnitLevel: '',
                courseType: ''
            }
            const res = await requestwebapicurriculumCenter(form, this.pages)
            const { entity: datas = {} } = res.data
            try {
                if (datas.resultData.length) {
                    this.datas = datas.resultData || []
                }
            } catch (error) {
                this.datas = []
            } finally {
                this.isLoading = false
            }
        },
        go() {
            this.$router.push({
                path: '/course'
            })
        },
        gocourse(id, classificationParent) {
            sessionStorage.setItem('courseId', id)
            this.$router.push({
                path: '/course/coursedetails',
                query: {
                    courseId: id,
                    classificationParent: classificationParent
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.curriculumcenter {
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
                height: 260px;
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
                    width: 252px;
                    font-size: 14px;
                    letter-spacing: 0px;
                    color: #666666;
                    padding: 0 10px;
                    box-sizing: border-box;
                    margin-top: 15px;
                    p {
                        width: 252px;
                        font-size: 14px;
                        letter-spacing: 0px;
                        color: #666666;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
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
        .curriculumcenter-title {
            font-size: 18px;
            letter-spacing: 0px;
            color: #333333;
            margin-bottom: 18px;
            font-weight: 500;
            margin-left: 20px;
            line-height: 31px;
        }
        ul {
            overflow: hidden;
            li {
                margin-bottom: 17px;
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
                        margin-bottom: 10px;
                        span {
                            width: 270px;
                            float: left;
                            vertical-align: top;
                            font-size: 14px;
                            line-height: 23px;
                            letter-spacing: 1px;
                            color: #666666;
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
                            height: 8px;
                            width: 6px;
                            background-repeat: no-repeat;
                            background-position: center;
                            float: left;
                            margin-top: 8px;
                            margin-right: 9px;
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
            margin-left: 12px;
            cursor: pointer;
        }
    }
}
</style>
