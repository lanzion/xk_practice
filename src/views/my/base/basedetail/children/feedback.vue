<template>
    <div class="feedback">
        <div class="feedback-fl-evaluate">
            <div class="feedback-fl-evaluate-header">
                <span class="feedback-fl-evaluate-header-one">评分</span>
                <span class="feedback-fl-evaluate-header-two">({{totalNum}}条)</span>
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
            <ul class="feedback-fl-evaluate-ul">
                <li class="feedback-fl-evaluate-li" v-for="(g,index) in govers" :key="index">
                    <div class="feedback-fl-evaluate-li-one">
                        <span>{{g.schoolName}}</span>
                        <span>评价</span>
                        <span>《{{g.courseName}}》</span>
                    </div>
                    <div class="feedback-fl-evaluate-li-two">
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
</template>

<script>
import { requestwebapigetBaseevaluation } from '@/api/webApi/base';
export default {
    name: 'feedback',
    data() {
        return {
            govers: [],
            scoreAvg: 0
        }
    },
    created() {
        this.getBaseevaluation()
    },
    methods: {
        async getBaseevaluation() {
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
            const res = await requestwebapigetBaseevaluation(
                { baseInstId: this.id },
                pages
            )
            const { entity: datas = {} } = res.data
            const { appendInfo: lists = {} } = res.data
            try {
                let array = datas.resultData || []
                array.forEach(x => {
                    x.totalScore = Number(this.numFilter(x.totalScore))
                })
                this.govers = array || []
                this.totalNum = datas.totalNum || 0
                this.scoreAvg = Number(this.numFilter(lists.scoreAvg))
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
.feedback-fl-evaluate {
    margin-bottom: 90px;
    .feedback-fl-evaluate-header {
        border-bottom: 1px solid #eee;
        height: 34px;
        margin-bottom: 18px;
        span,
        i {
            display: inline-block;
        }
        .feedback-fl-evaluate-header-one {
            font-size: 22px;
            line-height: 31px;
            letter-spacing: 0px;
            color: #333333;
        }
        .feedback-fl-evaluate-header-two {
            font-size: 16px;
            letter-spacing: 0px;
            color: #666666;
        }
        .feedback-fl-evaluate-header-thr {
            font-size: 16px;
            line-height: 29px;
            letter-spacing: 0px;
            color: #666666;
            float: right;
            cursor: pointer;
        }
        .feedback-fl-evaluate-header-min {
        }
        .feedback-fl-evaluate-header-max {
            float: right;
            cursor: pointer;
        }
    }
    .feedback-fl-evaluate-ul {
        overflow: hidden;
        li {
            width: 100%;
            border-bottom: 1px solid #eeeeee;
            padding-bottom: 40px;
            box-sizing: border-box;
            margin-bottom: 18px;
            .feedback-fl-evaluate-li-one {
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
            .feedback-fl-evaluate-li-two {
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
            }
        }
    }
}
</style>
