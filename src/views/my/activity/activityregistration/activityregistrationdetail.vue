<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/activity' }">活动中心</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/activity/activityregistration' }">活动报名</el-breadcrumb-item>
            <el-breadcrumb-item>广东省博物馆展览活动</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="activityregistrationdetail-title">
            <div class="activityregistrationdetail-title-img fl">
                <ov-image :type="3" :src-data="'132'" :img-height="'332px'"></ov-image>
            </div>
            <div class="activityregistrationdetail-title-conent fl">
                <h3>{{cutString('广东省博物馆展览活动机器人编程课程机器人编程课程课程机器人编机人编程课程机人编程课程机人编程课广东省博物馆展览活动机器人编程课程机器人编程课程课程机器人编机人编程课程机人编程课程机人编程课',100)}}</h3>
                <div class="activityregistrationdetail-title-conent-over">
                    <div class="activityregistrationdetail-title-conent-over-one fl">
                        <el-row>
                            <el-col class="dlest-fr-title">
                                <span>活动类型:</span>
                                <span>参观学习</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col class="dlest-fr-title">
                                <span>基地名称:</span>
                                <span>广东省博物馆</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col class="dlest-fr-title">
                                <span>活动地点:</span>
                                <span>广东省博物馆埃及展馆</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col class="dlest-fr-title">
                                <span>集合地点:</span>
                                <span>广东省博物馆埃及展馆</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col class="dlest-fr-title">
                                <span>适合学段:</span>
                                <span>小学高年级 初中</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col class="dlest-fr-title">
                                <span>联系方式:</span>
                                <span>张小姐 020-23512458</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col class="dlest-fr-title">
                                <span>报名截止时间</span>
                                <span>2019-11-28 14:00</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col class="dlest-fr-title">
                                <span>活动时间</span>
                                <span>2019-11-28 14：00-16：00</span>
                                <span @mouseenter="getistrue" @mouseleave="setistrue">【展开】</span>
                                <span>共3场</span>
                                <ul class="dlest-fr-title-ul">
                                    <li class="dlest-fr-title-li">
                                        <span>2019-11-28 14：00-16：00</span>
                                    </li>
                                    <li class="dlest-fr-title-li">
                                        <span>2019-11-28 14：00-16：00</span>
                                    </li>
                                    <li class="dlest-fr-title-li">
                                        <span>2019-11-28 14：00-16：00</span>
                                    </li>
                                    <li class="dlest-fr-title-li">
                                        <span>2019-11-28 14：00-16：00</span>
                                    </li>
                                    <li class="dlest-fr-title-li">
                                        <span>2019-11-28 14：00-16：00</span>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="activityregistrationdetail-title-conent-over-thr fl">
                        <i :style="{backgroundImage:'url('+shoucanghui+')'}"></i>
                        <span>收藏</span>
                    </div>
                    <div
                        class="activityregistrationdetail-title-conent-over-two-a fl"
                        v-if="isNum === 1"
                    >
                        <div>
                            <span>免费</span>
                            <span>
                                限
                                <i>400</i>人
                            </span>
                        </div>
                        <div>
                            <span>
                                <i>2019-11-25</i>
                                <em>10:30</em>
                            </span>
                            <span>开放报名</span>
                        </div>
                    </div>

                    <div
                        class="activityregistrationdetail-title-conent-over-two-b fl"
                        v-if="isNum === 2"
                        @click="get()"
                    >
                        <div>
                            <span>免费</span>
                            <span>
                                <i>
                                    已报
                                    <em>400</em>人
                                </i>
                                <i>
                                    限
                                    <em>1000</em>人
                                </i>
                            </span>
                        </div>
                        <div>
                            <span>马上报名</span>
                        </div>
                    </div>

                    <div
                        class="activityregistrationdetail-title-conent-over-two-c fl"
                        v-if="isNum === 3"
                    >
                        <div>
                            <span>免费</span>
                            <span>
                                <i>
                                    已报
                                    <em>400</em>人
                                </i>
                                <i>
                                    限
                                    <em>1000</em>人
                                </i>
                            </span>
                        </div>
                        <div>
                            <span>报名截止</span>
                        </div>
                    </div>
                    <el-dialog title :visible.sync="centerDialogVisible" width="40%" center>
                        <div class="activityregistrationdetail-title-conent-over-two-dialog">
                            <div
                                class="activityregistrationdetail-title-conent-over-two-dialog-one"
                            >
                                <h4>请确认您的个人信息:</h4>
                                <el-row>
                                    <el-col class="dlest-fr-title">
                                        <span>姓名:</span>
                                        <span>张明明</span>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col class="dlest-fr-title">
                                        <span>学号:</span>
                                        <span>4420125631</span>
                                    </el-col>
                                </el-row>
                            </div>
                            <div
                                class="activityregistrationdetail-title-conent-over-two-dialog-two"
                            >
                                <h4>请选择活动场次:</h4>
                                <el-checkbox-group v-model="checkedCities">
                                    <el-checkbox
                                        :style="{display:'block',marginBottom:'10px'}"
                                        v-for="city in cities"
                                        :label="city"
                                        :key="city"
                                    >{{city}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                        <h4>活动开始前1小时至活动结束前可进行签到。</h4>
                        <h4>签到后请确认活动状态为已签到，一次失信未签到将会被拉入黑名单。</h4>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="centerDialogVisible = false">关闭</el-button>
                            <el-button type="primary" @click="centerDialogVisible = false">确认报名</el-button>
                        </span>
                    </el-dialog>
                </div>
            </div>
        </div>
        <div class="activityregistrationdetail-center">
            <div class="activityregistrationdetail-center-fl fl">
                <div class="activityregistrationdetail-center-one">
                    <div class="activityregistrationdetail-center-one-title">
                        <i :style="{backgroundImage:'url('+huodongxiangqing+')'}"></i>
                        <span>活动详情</span>
                    </div>
                    <div class="activityregistrationdetail-center-one-conent">
                        <p>小学低年级学段的亲子活动，通过亲子及小组协作去完成一些与雨林植物树叶相关的游戏。在活动中先通过抽取四种半片树叶的轮廓并完成正片树叶绘画的环节来确定分组，认识绘画树叶的类型并熟悉小组成员，发放热带雨林展示馆的十二种打乱的植物拼图，让家长和孩子共同完成拼图。完成拼图后通过拼图中的内容去热带雨林馆内寻找对应的植物，通过介绍牌及二维码并在任务单记录植物的资料具体信息，最后回到教室展示自己小组成果。评比环节由环节完成先后序号，及小组互评组成。</p>
                    </div>
                </div>
                <div class="activityregistrationdetail-center-two">
                    <div class="activityregistrationdetail-center-two-title">
                        <i :style="{backgroundImage:'url('+pingjiaganwu+')'}"></i>
                        <span>评价感悟</span>
                    </div>
                    <ul>
                        <li>
                            <div class="activityregistrationdetail-center-two-conent">
                                <div class="activityregistrationdetail-center-two-conent-img fl">
                                    <ov-image :src-data="'123'" :type="10" :img-height="'50px'"></ov-image>
                                </div>
                                <div class="activityregistrationdetail-center-two-conent-show fr">
                                    <div
                                        class="activityregistrationdetail-center-two-conent-show-one"
                                    >
                                        <span>张晓明</span>
                                        <span>2019-11-02 10:00</span>
                                        <span>
                                            <el-rate
                                                v-model="scoreAvg"
                                                disabled
                                                :colors="['#ff7800', '#ff7800', '#ff7800']"
                                                show-score
                                                text-color="#666666"
                                                score-template="{value}分"
                                            ></el-rate>
                                        </span>
                                    </div>
                                    <div
                                        class="activityregistrationdetail-center-two-conent-show-two"
                                    >
                                        <p>该用户对本活动基地的评价详细信息该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息…………</p>
                                    </div>
                                    <div
                                        class="activityregistrationdetail-center-two-conent-show-thr"
                                    >
                                        <ul>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="activityregistrationdetail-center-two-conent">
                                <div class="activityregistrationdetail-center-two-conent-img fl">
                                    <ov-image :src-data="'123'" :type="10" :img-height="'50px'"></ov-image>
                                </div>
                                <div class="activityregistrationdetail-center-two-conent-show fr">
                                    <div
                                        class="activityregistrationdetail-center-two-conent-show-one"
                                    >
                                        <span>张晓明</span>
                                        <span>2019-11-02 10:00</span>
                                        <span>
                                            <el-rate
                                                v-model="scoreAvg"
                                                disabled
                                                :colors="['#ff7800', '#ff7800', '#ff7800']"
                                                show-score
                                                text-color="#666666"
                                                score-template="{value}分"
                                            ></el-rate>
                                        </span>
                                    </div>
                                    <div
                                        class="activityregistrationdetail-center-two-conent-show-two"
                                    >
                                        <p>该用户对本活动基地的评价详细信息该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息…………</p>
                                    </div>
                                    <div
                                        class="activityregistrationdetail-center-two-conent-show-thr"
                                    >
                                        <ul>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="activityregistrationdetail-center-two-conent">
                                <div class="activityregistrationdetail-center-two-conent-img fl">
                                    <ov-image :src-data="'123'" :type="10" :img-height="'50px'"></ov-image>
                                </div>
                                <div class="activityregistrationdetail-center-two-conent-show fr">
                                    <div
                                        class="activityregistrationdetail-center-two-conent-show-one"
                                    >
                                        <span>张晓明</span>
                                        <span>2019-11-02 10:00</span>
                                        <span>
                                            <el-rate
                                                v-model="scoreAvg"
                                                disabled
                                                :colors="['#ff7800', '#ff7800', '#ff7800']"
                                                show-score
                                                text-color="#666666"
                                                score-template="{value}分"
                                            ></el-rate>
                                        </span>
                                    </div>
                                    <div
                                        class="activityregistrationdetail-center-two-conent-show-two"
                                    >
                                        <p>该用户对本活动基地的评价详细信息该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息……该用户对本活动基地的评价详细信息…………</p>
                                    </div>
                                    <div
                                        class="activityregistrationdetail-center-two-conent-show-thr"
                                    >
                                        <ul>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                            <li>
                                                <img :src="imshoucanghanggs" alt />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="activityregistrationdetail-center-fr fr">
                <div class="activityregistrationdetail-center-fr-one">
                    <div class="activityregistrationdetail-center-fr-one-title">
                        <span>
                            已报名
                            <i>(100人)</i>
                        </span>
                    </div>
                    <div class="activityregistrationdetail-center-fr-one-conent">
                        <ul>
                            <li>
                                <ov-image :src-data="'123'" :type="10" :img-height="'68px'"></ov-image>
                            </li>
                            <li>
                                <ov-image :src-data="'123'" :type="10" :img-height="'68px'"></ov-image>
                            </li>
                            <li>
                                <ov-image :src-data="'123'" :type="10" :img-height="'68px'"></ov-image>
                            </li>
                            <li>
                                <ov-image :src-data="'123'" :type="10" :img-height="'68px'"></ov-image>
                            </li>
                            <li>
                                <ov-image :src-data="'123'" :type="10" :img-height="'68px'"></ov-image>
                            </li>
                            <li>
                                <ov-image :src-data="'123'" :type="10" :img-height="'68px'"></ov-image>
                            </li>
                            <li>
                                <ov-image :src-data="'123'" :type="10" :img-height="'68px'"></ov-image>
                            </li>
                            <li>
                                <ov-image :src-data="'123'" :type="10" :img-height="'68px'"></ov-image>
                            </li>
                            <li>
                                <ov-image :src-data="'123'" :type="10" :img-height="'68px'"></ov-image>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="activityregistrationdetail-center-fr-two">
                    <div class="activityregistrationdetail-center-fr-two-title">
                        <span>活动推荐</span>
                    </div>
                    <div class="activityregistrationdetail-center-fr-two-conent">
                        <ul>
                            <li>
                                <div class="activityregistrationdetail-center-fr-two-conent-img">
                                    <ov-image :src-data="'123'" :type="3" :img-height="'170px'"></ov-image>
                                </div>
                                <h3>活动名称活动名称名称活动名称…</h3>
                                <p>基地名称基地名称基地名称</p>
                            </li>
                            <li>
                                <div class="activityregistrationdetail-center-fr-two-conent-img">
                                    <ov-image :src-data="'123'" :type="3" :img-height="'170px'"></ov-image>
                                </div>
                                <h3>活动名称活动名称名称活动名称…</h3>
                                <p>基地名称基地名称基地名称</p>
                            </li>
                            <li>
                                <div class="activityregistrationdetail-center-fr-two-conent-img">
                                    <ov-image :src-data="'123'" :type="3" :img-height="'170px'"></ov-image>
                                </div>
                                <h3>活动名称活动名称名称活动名称…</h3>
                                <p>基地名称基地名称基地名称</p>
                            </li>
                            <li>
                                <div class="activityregistrationdetail-center-fr-two-conent-img">
                                    <ov-image :src-data="'123'" :type="3" :img-height="'170px'"></ov-image>
                                </div>
                                <h3>活动名称活动名称名称活动名称…</h3>
                                <p>基地名称基地名称基地名称</p>
                            </li>
                            <li>
                                <div class="activityregistrationdetail-center-fr-two-conent-img">
                                    <ov-image :src-data="'123'" :type="3" :img-height="'170px'"></ov-image>
                                </div>
                                <h3>活动名称活动名称名称活动名称…</h3>
                                <p>基地名称基地名称基地名称</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
    name: 'activityregistrationdetail',
    data() {
        return {
            shoucanghui: '',
            imshoucanghanggs: '',
            huodongxiangqing: '',
            pingjiaganwu: '',
            // shoucanghui: require('../../../../../static/img/shoucanghui.png'),
            // imshoucanghanggs: require('../../../../../static/img/shoucanghang.png'),
            // huodongxiangqing: require('../../../../../static/img/huodongxiangqing.png'),
            // pingjiaganwu: require('../../../../../static/img/pingjiaganwu.png'),
            scoreAvg: 5,
            isNum: 2,
            centerDialogVisible: false,
            checkedCities: [],
            cities: cityOptions
        }
    },
    computed: {
        ...mapState('login', {
            identity: state => state.identity || {}
        })
    },
    created() {
        this.userId = localStorage.getItem('xk_practice_uid') || ''
    },
    methods: {
        change(value) {
            // eslint-disable-next-line no-undef
            $('.dlest-fr-title-ul').css({ display: 'none' })
        },
        getistrue() {
            let num = document.getElementsByClassName('dlest-fr-title-li')
                .length
            // eslint-disable-next-line no-undef
            $('.dlest-fr-title-ul')
                .css({ display: 'block' })
                .stop()
                .animate({ height: num * 30 + 'px' }, 400)
        },
        setistrue() {
            // eslint-disable-next-line no-undef
            $('.dlest-fr-title-ul')
                .stop()
                .animate({ height: '0px' }, 400)
        },
        get() {
            if (this.userId) {
                this.centerDialogVisible = true
            } else {
                this.$confirm('请先登录后再点击报名, 是否立即登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                })
                    .then(() => {
                        this.$router.push({ path: '/login' })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消登录'
                        })
                    })
            }
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
    .activityregistrationdetail-title {
        width: 100%;
        height: 340px;
        margin-bottom: 56px;
        .activityregistrationdetail-title-img {
            width: 538px;
            margin-right: 25px;
        }
        .activityregistrationdetail-title-conent {
            width: 616px;
            h3 {
                font-size: 22px;
                line-height: 29.5px;
                letter-spacing: 0px;
                color: #333333;
                overflow: hidden;
                margin-bottom: 38px;
            }
            .activityregistrationdetail-title-conent-over {
                width: 100%;
                .activityregistrationdetail-title-conent-over-one {
                    width: 448px;
                    .dlest-fr-title {
                        height: 30px;
                        position: relative;
                        span {
                            font-size: 16px;
                            &:nth-child(1) {
                                color: #666666;
                                margin-right: 5px;
                            }
                            &:nth-child(2) {
                                color: #262626;
                            }
                            &:nth-child(3) {
                                color: #008aff;
                                cursor: pointer;
                            }
                            &:nth-child(4) {
                                display: inline-block;
                                background: #f2660f;
                                font-size: 12px;

                                letter-spacing: 1.2px;
                                color: #ffffff;
                            }
                        }
                        .dlest-fr-title-ul {
                            position: absolute;
                            height: 0px;
                            top: 26px;
                            left: 67px;
                            background: #f8f8f8;
                            overflow: hidden;
                            padding: 0 6px;
                            box-sizing: border-box;
                            li {
                                // margin-bottom: 15px;
                                font-size: 12px;
                                height: 30px;
                                line-height: 30px;
                            }
                        }
                    }
                }
                .activityregistrationdetail-title-conent-over-two-a {
                    border: solid 1px #42a6fe;
                    border-radius: 4px;
                    div {
                        width: 166px;
                        height: 84px;
                        &:nth-child(1) {
                            width: 166px;
                            height: 42px;
                            border-bottom: none;
                            span {
                                display: inline-block;
                                text-align: center;
                                line-height: 42px;
                                width: 80px;
                                &:nth-child(1) {
                                    font-size: 16px;
                                    letter-spacing: 0px;
                                    color: #4aa76f;
                                    position: relative;
                                    &::after {
                                        content: "|";
                                        color: #42a6fe;
                                        position: absolute;
                                        right: 0;
                                    }
                                }
                                &:nth-child(2) {
                                    font-size: 14px;
                                    letter-spacing: 0px;
                                    color: #666666;
                                    i {
                                        color: #ff0000;
                                    }
                                }
                            }
                        }
                        &:nth-child(2) {
                            width: 166px;
                            height: 42px;
                            border-top: none;
                            background-color: #42a6fe;
                            span {
                                width: 78px;
                                height: 40px;
                                line-height: 40px;
                                box-sizing: border-box;
                                text-align: center;
                                float: left;
                                &:nth-child(1) {
                                    i,
                                    em {
                                        display: block;
                                        font-size: 12px;
                                        line-height: 16px;
                                        letter-spacing: 0px;
                                        color: #ffffff;
                                        text-align: right;
                                        margin-top: 5px;
                                        margin-right: 2px;
                                    }
                                    em {
                                        display: block;
                                        text-align: right;
                                        margin-top: 2px;
                                    }
                                }
                                &:nth-child(2) {
                                    font-size: 18px;
                                    letter-spacing: 0px;
                                    color: #ffffff;
                                    margin-left: 5px;
                                }
                            }
                        }
                    }
                }
                .activityregistrationdetail-title-conent-over-two-b {
                    border: solid 1px #f26565;
                    border-radius: 4px;
                    div {
                        width: 166px;
                        &:nth-child(1) {
                            width: 166px;
                            height: 42px;
                            span {
                                display: block;
                                float: left;
                                text-align: center;
                                line-height: 42px;
                                width: 82px;
                                &:nth-child(1) {
                                    width: 80px;
                                    font-size: 16px;
                                    letter-spacing: 0px;
                                    color: #ff0101;
                                    position: relative;
                                    &::after {
                                        content: "|";
                                        color: #f26565;
                                        position: absolute;
                                        right: 0;
                                    }
                                }
                                &:nth-child(2) {
                                    width: 80px;
                                    font-size: 12px;
                                    letter-spacing: 0px;
                                    i {
                                        display: block;
                                        color: #666666;
                                        height: 20px;
                                        line-height: 20px;
                                        em {
                                            color: #ff0000;
                                        }
                                    }
                                }
                            }
                        }
                        &:nth-child(2) {
                            width: 166px;
                            height: 42px;
                            border-top: none;
                            background-color: #f26565;
                            text-align: center;
                            cursor: pointer;
                            span {
                                width: 78px;
                                font-size: 18px;
                                height: 40px;
                                line-height: 40px;
                                box-sizing: border-box;
                                text-align: center;
                                color: #fff;
                            }
                        }
                    }
                }
                .activityregistrationdetail-title-conent-over-two-c {
                    border: solid 1px #cccccc;
                    border-radius: 4px;
                    div {
                        width: 166px;
                        &:nth-child(1) {
                            width: 166px;
                            height: 42px;
                            span {
                                display: block;
                                float: left;
                                text-align: center;
                                line-height: 42px;
                                width: 82px;
                                &:nth-child(1) {
                                    width: 80px;
                                    font-size: 16px;
                                    letter-spacing: 0px;
                                    color: #ff0101;
                                    position: relative;
                                    &::after {
                                        content: "|";
                                        color: #f26565;
                                        position: absolute;
                                        right: 0;
                                    }
                                }
                                &:nth-child(2) {
                                    width: 80px;
                                    font-size: 12px;
                                    letter-spacing: 0px;
                                    i {
                                        display: block;
                                        color: #666666;
                                        height: 20px;
                                        line-height: 20px;
                                        em {
                                            color: #ff0000;
                                        }
                                    }
                                }
                            }
                        }
                        &:nth-child(2) {
                            width: 166px;
                            height: 42px;
                            border-top: none;
                            background-color: #cccccc;
                            text-align: center;
                            span {
                                width: 78px;
                                font-size: 18px;
                                height: 40px;
                                line-height: 40px;
                                box-sizing: border-box;
                                text-align: center;
                                color: #fff;
                            }
                        }
                    }
                }
                .activityregistrationdetail-title-conent-over-two-dialog {
                    .activityregistrationdetail-title-conent-over-two-dialog-one {
                        border-bottom: 1px solid #eee;
                        h4 {
                            font-size: 18px;
                            font-weight: 800;
                            height: 40px;
                            line-height: 40px;
                            margin-bottom: 20px;
                        }
                        .dlest-fr-title {
                            height: 30px;
                            position: relative;
                            span {
                                font-size: 16px;
                                &:nth-child(1) {
                                    color: #666666;
                                    margin-right: 5px;
                                }
                                &:nth-child(2) {
                                    color: #262626;
                                }
                                &:nth-child(3) {
                                    color: #008aff;
                                    cursor: pointer;
                                }
                                &:nth-child(4) {
                                    display: inline-block;
                                    background: #f2660f;
                                    font-size: 12px;

                                    letter-spacing: 1.2px;
                                    color: #ffffff;
                                }
                            }
                            .dlest-fr-title-ul {
                                position: absolute;
                                height: 0px;
                                top: 26px;
                                left: 67px;
                                background: #f8f8f8;
                                overflow: hidden;
                                padding: 0 6px;
                                box-sizing: border-box;
                                li {
                                    // margin-bottom: 15px;
                                    font-size: 12px;
                                    height: 30px;
                                    line-height: 30px;
                                }
                            }
                        }
                    }
                    .activityregistrationdetail-title-conent-over-two-dialog-two {
                        margin-top: 20px;
                        h4 {
                            font-size: 18px;
                            font-weight: 800;
                            height: 40px;
                            line-height: 40px;
                            margin-bottom: 20px;
                        }
                    }
                }
                h4 {
                    text-align: center;
                    font-size: 14px;
                    margin-top: 20px;
                    &:nth-child(2) {
                        margin-top: 80px;
                    }
                }
                .activityregistrationdetail-title-conent-over-thr {
                    float: right;
                    margin-bottom: 124px;
                    cursor: pointer;
                    i {
                        display: inline-block;
                        width: 15px;
                        height: 13px;
                        background-size: 15px 13px;
                        background-repeat: no-repeat;
                        background-position: center;
                        vertical-align: middle;
                    }
                    span {
                        font-size: 14px;
                        letter-spacing: 0px;
                        color: #666666;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
    .activityregistrationdetail-center {
        width: 100%;
        overflow: hidden;
        .activityregistrationdetail-center-fl {
            width: 864px;
            .activityregistrationdetail-center-one {
                width: 100%;
                .activityregistrationdetail-center-one-title {
                    width: 100%;
                    height: 38px;
                    margin-bottom: 30px;
                    border-bottom: 1px solid #eee;
                    i {
                        display: inline-block;
                        width: 20px;
                        height: 22px;
                        background-size: 20px 22px;
                        background-repeat: no-repeat;
                        background-position: center;
                        vertical-align: middle;
                        margin-right: 5px;
                    }
                    span {
                        display: inline-block;
                        font-size: 22px;
                        vertical-align: middle;
                        line-height: 31.5px;
                        letter-spacing: 0px;
                        color: #333333;
                    }
                }
                .activityregistrationdetail-center-one-conent {
                    p {
                        font-size: 16px;
                        line-height: 29px;
                        letter-spacing: 1.4px;
                        color: #333333;
                    }
                }
            }
            .activityregistrationdetail-center-two {
                width: 100%;
                margin-top: 50px;
                .activityregistrationdetail-center-two-title {
                    width: 100%;
                    height: 38px;
                    margin-bottom: 30px;
                    border-bottom: 1px solid #eee;
                    i {
                        display: inline-block;
                        width: 20px;
                        height: 22px;
                        background-size: 20px 22px;
                        background-repeat: no-repeat;
                        background-position: center;
                        vertical-align: middle;
                        margin-right: 5px;
                    }
                    span {
                        display: inline-block;
                        font-size: 22px;
                        vertical-align: middle;
                        line-height: 31.5px;
                        letter-spacing: 0px;
                        color: #333333;
                    }
                }
                .activityregistrationdetail-center-two-conent {
                    border-bottom: 1px solid #eee;
                    overflow: hidden;
                    padding-bottom: 36px;
                    margin-bottom: 18px;
                    .activityregistrationdetail-center-two-conent-img {
                        width: 50px;
                        border-radius: 50%;
                    }
                    .activityregistrationdetail-center-two-conent-show {
                        width: 794px;
                        .activityregistrationdetail-center-two-conent-show-one {
                            span {
                                &:nth-child(1) {
                                    font-size: 18px;
                                    line-height: 15.7px;
                                    letter-spacing: 0px;
                                    margin-right: 10px;
                                }
                                &:nth-child(2) {
                                    font-size: 14px;
                                    line-height: 29.5px;
                                    letter-spacing: 0px;
                                    color: #999999;
                                }
                                &:nth-child(3) {
                                    float: right;
                                }
                            }
                        }
                        .activityregistrationdetail-center-two-conent-show-two {
                            margin-bottom: 20px;
                            p {
                                font-size: 14px;
                                line-height: 29.5px;
                                letter-spacing: 1.4px;
                                color: #333333;
                            }
                        }
                        .activityregistrationdetail-center-two-conent-show-thr {
                            ul {
                                li {
                                    float: left;
                                    margin-right: 20px;
                                    img {
                                        width: 100px;
                                        height: 100px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .activityregistrationdetail-center-fr {
            width: 295px;
            .activityregistrationdetail-center-fr-one {
                .activityregistrationdetail-center-fr-one-title {
                    height: 38px;
                    border-bottom: 1px solid #eee;
                    span {
                        font-size: 18px;
                        line-height: 31.5px;
                        letter-spacing: 0px;
                        color: #262626;
                        i {
                            font-size: 14px;
                            letter-spacing: 0px;
                            color: #666666;
                        }
                    }
                }
                .activityregistrationdetail-center-fr-one-conent {
                    ul {
                        padding: 0 18px;
                        overflow: hidden;
                        li {
                            width: 68px;
                            float: left;
                            margin-top: 16px;
                            margin-right: 26px;
                            border-radius: 50%;
                            overflow: hidden;
                            &:nth-child(3n) {
                                margin-right: 0px;
                            }
                        }
                    }
                }
            }
            .activityregistrationdetail-center-fr-two {
                margin-top: 60px;
                .activityregistrationdetail-center-fr-two-title {
                    height: 38px;
                    border-bottom: 1px solid #eee;
                    span {
                        font-size: 18px;
                        line-height: 31.5px;
                        letter-spacing: 0px;
                        color: #262626;
                    }
                }
                .activityregistrationdetail-center-fr-two-conent {
                    ul {
                        padding-top: 28px;
                        box-sizing: border-box;
                        li {
                            width: 276px;
                            height: 234px;
                            border: 1px solid #f3f3f3;
                            border-radius: 4px;
                            margin-left: 8px;
                            margin-bottom: 28px;
                            .activityregistrationdetail-center-fr-two-conent-img {
                                width: 276px;
                            }
                            h3 {
                                padding: 0 8px;
                                box-sizing: border-box;
                                font-size: 16px;
                                letter-spacing: 0px;
                                color: #262626;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                height: 34px;
                                line-height: 34px;
                            }
                            p {
                                font-size: 14px;
                                padding: 0 8px;
                                box-sizing: border-box;
                                height: 30px;
                                line-height: 30px;
                                letter-spacing: 0px;
                                color: #666666;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
