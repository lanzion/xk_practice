<template>
    <div class="cbase">
        <div class="cbase_top">
            <img :src="imgurl" alt />
            <div class="cbase_top_el">
                <div class="cbase_top_fl">
                    <p>网易</p>
                    <span>广东省 广州市</span>
                </div>
                <div class="cbase_top_fr">
                    <p>网易是中国领先的互联网技术公司，为用户提供免费邮箱、游戏、搜索引擎服务，开设新闻、娱乐、体育等30多个内容频道，及博客、视频、论坛等互动交流，网聚人的力量。网易是中国领先的互联网技术公司，为用户提供免费邮箱、游戏、搜索引擎服务，开设新闻、娱乐.....</p>
                </div>
            </div>
        </div>
        <div class="cbase_down">
            <div class="cbase_down_top">
                <label for>活动时间:</label>
                <div class="block">
                    <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
                </div>
            </div>
            <div class="cbase_of">
                <ul class="cbase_of_ul">
                    <li class="cbase_of_li" v-for="(g,index) in list" :key="index">
                        <div class="cbase_if">
                            <ul class="cbase_if_ul">
                                <div class="demo1"><span>{{g.dateStr}}</span></div>
                                <div class="demo2"><span>{{g.dateStr}}</span></div>
                                <li class="cbase_if_li">
                                    <span>课程时间</span>
                                    <span>上课学校</span>
                                    <span>参与活动</span>
                                    <span>代课老师</span>
                                    <span>联系方式</span>
                                    <span>活动班级</span>
                                </li>
                                <li class="cbase_if_li" v-for="(j,index) in g.courseList" :key="index+'k'">
                                    <span>{{j.comeTime}}</span>
                                    <span>{{j.schoolName}}</span>
                                    <span>{{j.projectName}}</span>
                                    <span>{{j.teacherName}}</span>
                                    <span>{{j.teacherPhone}}</span>
                                    <span>{{j.className}}</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { getactivityscheduling } from '@/api/frontstage'
export default {
    // 基地
    data() {
        return {
            list: [],
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                },
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date())
                        }
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        }
                    },
                    {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', date)
                        }
                    }
                ]
            },
            value1: '',
            value2: ''
        }
    },
    created() {
        this.getactivityschedu()
    },
    methods: {
        async getactivityschedu() {
            let datas = await getactivityscheduling()
            // this.lists = datas.data.list
            // console.log(datas)
            // console.log(datas.data.list)
            this.list = datas.data.list
        }
    }
}
</script>
<style lang="scss" scoped>
.cbase {
    width: 100%;
    margin-top: 15px;
    .cbase_top {
        overflow: hidden;
        width: 100%;
        height: 120px;
        position: relative;
        margin-bottom: 40px;
        img {
            position: absolute;
            left: 0;
            top: 0;
        }
        .cbase_top_el {
            margin-top: 30px;
            height: 88px;
            border-radius: 55px 94px 94px 110px;
            background: #f9e0f0;
            padding: 0 30px 0 140px;
            .cbase_top_fl {
                float: left;
                height: 88px;
                width: 100px;
                p {
                    font-size: 22px;
                    color: #333333;
                    height: 42px;
                    line-height: 42px;
                    margin-top: 10px;
                }
                span {
                    font-size: 12px;
                    color: #666666;
                }
            }
            .cbase_top_fr {
                float: left;
                height: 88px;
                width: 890px;
                padding: 24px 0 28px 0;
                p {
                    width: 890px;
                    height: 36px;
                    font-size: 14px;
                    color: #666666;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }
        }
    }
    .cbase_down {
        background: #fff;
        .cbase_down_top {
            width: 100%;
            height: 60px;
            line-height: 60px;
            border-bottom: 1px solid #ccc;
            label {
                font-size: 16px;
                color: #333333;
                margin-left: 30px;
                margin-right: 20px;
            }
            .block {
                display: inline-block;
            }
        }
        .cbase_of {
            margin-top: 15px;
            margin-bottom: 30px;
            background: #fff;
            padding: 20px;
            box-sizing: border-box;
            .cbase_of_ul {
                box-sizing: border-box;
                width: 100%;
                // height: auto;
                .cbase_of_li {
                    box-sizing: border-box;
                    width: 100%;
                    // overflow: auto;
                    overflow: hidden;
                    margin-bottom: 30px;
                    .cbase_if {
                        box-sizing: border-box;
                        width: 100%;
                        // overflow: auto;
                        .cbase_if_ul {
                            box-sizing: border-box;
                            width: 100%;
                             border: 1px solid #ccc;
                             font-size: 0;
                             position: relative;
                             overflow: hidden;
                             .demo1{
                                 position: absolute;
                                 left: 0;
                                 top: 0;
                                 width: 132px;
                                 height: 50%;
                                 background: #fcea42;
                                 font-size: 24px;
                                 line-height: 100%;
                                 text-align: center;
                                 display: flex;
                                 justify-content: center;
                                 align-items: center;
                                 span{
                                     font-size: 16px;
                                 }
                             }
                             .demo2{
                                 position: absolute;
                                 left: 0;
                                 bottom: 0;
                                 width: 132px;
                                 height: 50%;
                                 background: #f5a449;
                                 font-size: 24px;
                                 line-height: 100%;
                                 text-align: center;
                                 display: flex;
                                 justify-content: center;
                                 align-items: center;
                                 span{
                                     font-size: 16px;
                                 }
                             }
                            .cbase_if_li {
                                box-sizing: border-box;
                                height: 40px;
                                width: 100%;
                                // overflow: hidden;
                                span{
                                    display: block;
                                    float: left;
                                    width: 170px;
                                    height: 40px;
                                    line-height: 40px;
                                    text-align: center;
                                    font-size: 16px;
                                    border-right: 1px solid #ccc;
                                    border-bottom: 1px solid #ccc;
                                    font-size: 14px;
                                    &:nth-child(1){
                                        margin-left: 132px;
                                    }
                                    &:nth-last-child(1){
                                        border-right: none;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
