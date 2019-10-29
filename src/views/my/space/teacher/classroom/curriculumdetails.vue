<template>
    <div class="sdetails">
        <div class="conent_x">
            <span>课程名称</span>
            <span>{{datas.name}}</span>
        </div>
        <div class="conent_x">
            <span>课程类型</span>
            <span>{{datas.specialType}}>{{datas.specialDetail}}</span>
        </div>
        <div class="conent_x">
            <span>学习目标</span>
            <span>{{datas.target}}</span>
        </div>
        <div class :style="{'paddingLeft':'40px','margin':'20px 0','overflow':'hidden'}">
            <span
                :style="{'display':'inline-block','fontSize':'16px','color':'#666','vertical-align':'top','margin-right':'20px',}"
            >课程内容</span>
            <span
                :style="{'fontSize':'16px','color':'#333','display':'inline-block','height':'160px','width':'676px','border':'1px solid #ccc','overflowY':'auto','padding': '4px'}"
            >{{datas.content}}</span>
        </div>

        <div class="download">
            <span class="download_one" :style="{width:'64px'}">活动资源</span>
            <ul>
                <li v-for="(a,index) in datas.resourceList" :key="index">
                    <span>附件{{index+1}}</span>
                    <span>{{a.resourceName}}</span>
                    <a :href="a.resourceId" @click.prevent="downloadItem(a.resourceId,a.name)">下载</a>
                </li>
            </ul>
        </div>

        <div :style="{'height':'auto','marginBottom':'20px','overflow':'hidden'}">
            <div class="conent_t" :style="{'float':'left'}">
                <div class="conent_x">
                    <span>上课年级</span>
                    <span>{{datas.gradeName}}</span>
                </div>
                <div class="conent_x">
                    <span>上课时间</span>
                    <span>{{datas.startTime}}~{{datas.endTime}}</span>
                </div>
            </div>

            <div class="conent_t" :style="{'float':'left'}">
                <div class="conent_x">
                    <span>上课班级</span>
                    <span>{{datas.className}}</span>
                </div>
            </div>
        </div>
        <div class="conent_x">
            <span>活动基地</span>
            <span>{{datas.baseName}}</span>
        </div>
        <div class="conent_x">
            <span>基地地址</span>
            <span>{{datas.baseAddress}}</span>
        </div>
        <div class="conent_x">
            <span>参与服务</span>
            <span>{{datas.title}}</span>
        </div>
        <div class :style="{'paddingLeft':'40px','margin':'20px 0','overflow':'hidden'}">
            <span
                :style="{'display':'inline-block','fontSize':'16px','color':'#666','vertical-align':'top','margin-right':'20px'}"
            >服务介绍</span>
            <span
                :style="{'fontSize':'16px','color':'#333','display':'inline-block','height':'160px','width':'676px','border':'1px solid #ccc','overflowY':'auto','padding': '4px'}"
            >{{datas.expound}}</span>
        </div>
        <div class="conent_x" :style="{'position':'relative'}">
            <span class="conent_u">负责人</span>
            <span>{{datas.liaisonMan}}</span>
            <div class="conent_x" :style="{'position':'absolute','right':'-410px','top':'0px'}">
                <span class="conent_u">联系方式</span>
                <span>{{datas.liaisonWay}}</span>
            </div>
        </div>
        <div class="conent_x">
            <span class="conent_u">活动位置</span>
            <span>{{datas.baseAddress}}</span>
        </div>
        <div :style="{'textAlign':'center','marginTop':'40px'}">
            <el-button type="primary" @click="goback()">返回列表</el-button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import {
    coursedetailsteacher,
    getdetailsofstudentcourses
} from '@/api/frontstage'
export default {
    name: 'curriculumdetails',
    data() {
        return {
            datas: {},
            activityTypeParent: []
        }
    },
    created() {
        this.getdatas()
    },
    computed: {
        ...mapState('login', {
            identity: state => state.identity || {}
        })
    },
    methods: {
        goback() {
            this.$router.go(-1)
        },
        async getdatas() {
            let rid = localStorage.getItem('courseId')
            let courseId = this.$route.params.courseId
            let id = ''
            if (courseId) {
                id = courseId
            } else {
                id = rid
            }
            let res = ''
            if (this.identity == 1) {
                res = await coursedetailsteacher({ courseId: id })
            } else {
                res = await getdetailsofstudentcourses({ id: id })
            }
            let _datas = res.data.entity
            this.datas = _datas
            console.log(this.datas)
        }
    }
}
</script>
<style lang="scss" scoped>
.download {
    width: 100%;
    overflow: hidden;
    padding-left: 40px;
    box-sizing: border-box;
    line-height: 40px;
    .download_one {
        display: block;
        width: 80px;
        height: 40px;
        float: left;
        font-size: 16px;
        color: #666666;
        line-height: 40px;
        text-align: center;
        margin-right: 20px;
    }
    ul {
        float: left;
        width: 500px;
        li {
            width: 100%;
            height: 40px;
            span {
                line-height: 40px;
                text-align: left;
                margin-right: 20px;
                &:nth-child(1) {
                    font-size: 16px;
                    color: #666666;
                }
                &:nth-child(2) {
                    font-size: 16px;
                    color: #333333;
                }
                &:nth-child(3) {
                    font-size: 12px;
                    color: #999999;
                    width: 40px;
                    height: 24px;
                    border-radius: 4px;
                    border: solid 1px #cccccc;
                }
            }
            a {
                font-size: 12px;
                color: #008aff;
                width: 40px;
                height: 24px;
                border-radius: 4px;
                border: solid 1px #008aff;
                background-color: #e4eefe;
                padding: 2px 4px;
            }
        }
    }
}
.sdetails {
    padding-top: 20px;
    padding-bottom: 30px;
    box-sizing: border-box;
}
.conent_x {
    height: 40px;
    width: 100%;
    padding-left: 40px;
    box-sizing: border-box;
    span {
        display: inline-block;
        height: 100%;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        &:nth-child(1) {
            color: #666666;
            margin-right: 20px;
        }
        &:nth-child(2) {
            color: #333333;
        }
    }
}
.conent_t {
    width: 420px;
    box-sizing: border-box;
}
.conent_x {
    height: 40px;
    width: 100%;
    padding-left: 40px;
    span {
        display: inline-block;
        height: 100%;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        min-width: 64px;
        &:nth-child(1) {
            color: #666666;
            margin-right: 20px;
        }
        &:nth-child(2) {
            color: #333333;
            text-align: left;
        }
    }
}

.conent_y {
    box-sizing: border-box;
    width: 100%;
    height: 84px;
    border-top: 1px solid #ccc;
    text-align: center;
    line-height: 84px;
    color: #333333;
    font-size: 18px;
}

.conent_i {
    margin-left: 27px;
    border: 1px solid #008aff;
    border-radius: 4px;
    width: 40px;
    height: 24px;
    background-color: #77aaf9;
    opacity: 0.9;
    color: #008aff;
    font-size: 12px;
    cursor: pointer;
}
</style>
