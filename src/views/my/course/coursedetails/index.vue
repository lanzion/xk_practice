<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/course' }">课程中心</el-breadcrumb-item>
            <el-breadcrumb-item>{{datas.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="dlest">
            <div class="dlest-fl">
                <ov-image :src-data="getFileUrl(datas.cover)" :img-height="'370px'"></ov-image>
            </div>
            <div class="dlest-fr">
                <h3 :style="{'-webkit-box-orient':'vertical'}">{{datas.name}}</h3>
                <el-row>
                    <el-col class="dlest-fr-title">
                        <span>课程分类:</span>
                        <span>{{datas.parentName}} > {{datas.childrenName}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="dlest-fr-title">
                        <span>适合学段:</span>
                        <span>{{fit}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="dlest-fr-title">
                        <span>选修类型:</span>
                        <span v-text="datas.courseType ==='A' ? '必修' : '选修' "></span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="dlest-fr-title">
                        <span>课程时长:</span>
                        <span v-text="datas.courseDuration ==='A' ? '半天' : '一天' "></span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="dlest-fr-title">
                        <span>是否收费:</span>
                        <span v-if="datas.isFree === 0">免费</span>
                        <span v-else-if="datas.istrue !== 0">收费</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="dlest-fr-title">
                        <span>基地/机构:</span>
                        <span>{{datas.baseinfoName}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="dlest-fr-title">
                        <span>设计者:</span>
                        <span>{{datas.courseDesigner}}</span>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="nice">
            <ul>
                <li class="niceto maright" @click="change()">
                    <span :class=" num === false ? 'active niceto' : 'niceto'">课程内容</span>
                </li>
                <li class="niceto" @click="change()">
                    <span :class=" num === true ? 'active niceto' : 'niceto'">参与学校</span>
                    <span
                        v-if="totalNum !== 0"
                        :class=" num === true ? ' actives niceto' : 'niceto'"
                    >({{totalNum}}所)</span>
                </li>
            </ul>
        </div>

        <div class="conent" v-if="num === false">
            <div class="title">
                <h3>课程简介:</h3>
                <p>{{datas.synopsis}}</p>
            </div>
            <div class="title">
                <h3>课程目标:</h3>
                <p>{{datas.target}}</p>
            </div>
        </div>

        <div class="introduce" v-if="num === true">
            <el-table
                :data="tableData"
                border
                :header-cell-style="{background:'#f2f5fb',color:'#666666'}"
            >
                <el-table-column prop="schoolName" label="学校名称" align="center"></el-table-column>
                <el-table-column prop="schoolAddress" label="地区" align="center"></el-table-column>
            </el-table>
            <div class="more">
                <span v-if="totalNum >= 10" @click="get()">查看全部学校>></span>
            </div>
            <el-dialog title="参与院校" :visible.sync="dialogTableVisible" center>
                <el-table
                    :data="gridData"
                    border
                    :header-cell-style="{background:'#f2f5fb',color:'#666666'}"
                >
                    <el-table-column property="schoolName" label="学校名称" align="center"></el-table-column>
                    <el-table-column property="schoolAddress" label="地区" align="center"></el-table-column>
                </el-table>
            </el-dialog>
        </div>

        <div class="courses">相关课程</div>
        <div class="cord">
            <ul>
                <li @click="changes()" v-for="(g,index) in lists" :key="index">
                    <div class="cord-img">
                        <ov-image :src-data="getFileUrl(imgs)" :img-height="'178px'"></ov-image>
                    </div>
                    <div class="cord-of">
                        <span>{{g.courseName}}</span>
                    </div>
                    <div class="cord-sl">
                        <span>{{g.baseInfoName}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {
    requestwebapicurriculumDetail,
    requestParticipatingSchools,
    requestRecommendedCourses
} from '@/api/webApi/curriculumCenter'
export default {
    name: 'dlest',
    data() {
        return {
            tableData: [],
            gridData: [],
            dialogTableVisible: false,
            imgs: require('../../../../../static/img/shipbj.jpg'),
            nomore: false,
            istrue: true,
            id: '',
            datas: {},
            fit: '',
            num: false,
            lists: []
        }
    },
    created() {
        this.getlists()
        this.getdatas()
        this.getcourse()
    },
    methods: {
        async getlists() {
            this.isLoading = true
            let courseId = this.$route.query.id
            if (courseId) {
                this.id = courseId
            } else {
                this.id = sessionStorage.getItem('courseId')
            }
            const res = await requestwebapicurriculumDetail({ id: this.id })
            const { entity: datas = {} } = res.data
            try {
                this.datas = datas || {}
                const fit = datas.fit
                this.fit = this.filterFit(fit)
            } catch (error) {
                this.datas = {}
            } finally {
                this.isLoading = false
            }
        },
        async getdatas() {
            let courseId = this.$route.query.id
            if (courseId) {
                this.id = courseId
            } else {
                this.id = sessionStorage.getItem('courseId')
            }
            const res = await requestParticipatingSchools(
                { id: this.id },
                this.pages
            )
            const { entity: datas = {} } = res.data
            try {
                this.gridData = datas.resultData || []
                this.tableData = datas.resultData.splice(0, 10) || []
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.gridData = []
                this.tableData = []
            } finally {
                this.isLoading = false
            }
        },
        async getcourse() {
            this.isLoading = true
            let classificationParent = this.$route.query.classificationParent
            const res = await requestRecommendedCourses({
                classificationParent: classificationParent
            })
            const { appendInfo: datas = {} } = res.data
            try {
                this.lists = datas.list || []
            } catch (error) {
                this.lists = []
            } finally {
                this.isLoading = false
            }
        },
        filterFit(val) {
            let txt = ''
            if (val) {
                txt = val
                    .replace(/primarySchool_L/g, '小学初年级 ')
                    .replace(/primarySchool_H/g, '小学高年级')
                    .replace(/middleSchool/g, '初中')
                    .replace(/highSchool/g, '高中')
            }
            return txt
        },
        get() {
            this.dialogTableVisible = true
        },
        change() {
            this.num = !this.num
        },
        changes() {}
    }
}
</script>
<style lang="scss" scoped>
.container {
    margin: 0 auto;
    .el-breadcrumb {
        margin-top: 16px;
        margin-bottom: 16px;
        font-size: 14px;
        color: #666666;
        line-height: 38px;
    }
    .dlest {
        width: 100%;
        height: 400px;
        box-sizing: border-box;
        border-bottom: solid 1px #b5b5b5;
        .dlest-fl {
            float: left;
            height: 370px;
            width: 600px;
            margin-right: 45px;
        }
        .dlest-fr {
            float: left;
            width: 484px;
            box-sizing: border-box;
            h3 {
                margin-top: 7px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 29px;
                letter-spacing: 0px;
                color: #333333;
                font-size: 22px;
                margin-bottom: 30px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .dlest-fr-title {
                height: 40px;
                span {
                    height: 40px;
                    vertical-align: middle;
                    font-size: 16px;
                    display: inline-block;
                    &:nth-child(1) {
                        color: #666;
                        margin-right: 10px;
                    }
                    &:nth-child(2) {
                        width: 390px;
                        color: #333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
    .nice {
        width: 100%;
        margin-top: 20px;
        .niceto {
            display: inline-block;
            height: 66px;
            text-align: center;
            line-height: 66px;
            span {
                display: inline-block;
                height: 64px;
                color: #333;
                font-size: 22px;
                &:nth-child(2) {
                    font-size: 16px;
                }
            }
            .active {
                border-bottom: solid 2px #008aff;
                color: #008aff;
            }
            .actives {
                color: #008aff;
            }
        }
        .maright {
            margin-right: 30px;
        }
    }
    .courses {
        width: 100%;
        height: 44px;
        font-size: 22px;
        color: #333;
    }
    .cord {
        width: 100%;
        overflow: hidden;
        ul {
            width: 100%;
            overflow: hidden;
            li {
                width: 288px;
                float: left;
                margin-right: 12px;
                margin-bottom: 20px;
                background: #fff;
                overflow: hidden;
                border: solid 1px #ededed;
                cursor: pointer;
                height: 244px;
                &:nth-child(4n) {
                    margin-right: 0px;
                }
                .cord-of {
                    width: 100%;
                    height: 30px;
                    padding: 0 10px;
                    box-sizing: border-box;
                    margin-bottom: 5px;
                    span {
                        display: inline-block;
                        width: 100%;
                        height: 36px;
                        line-height: 36px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 16px;
                        color: #333;
                    }
                }
                .cord-sl {
                    width: 100%;
                    height: 20px;
                    padding: 0 10px;
                    box-sizing: border-box;
                    span {
                        display: inline-block;
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 14px;
                        color: #666;
                    }
                }
            }
        }
    }
}
.conent {
    width: 100%;
    overflow: hidden;
    border: solid 1px #ededed;
    padding: 36px 52px 36px 28px;
    box-sizing: border-box;
    margin-bottom: 80px;
    .title {
        margin-bottom: 30px;
        h3 {
            letter-spacing: 2px;
            margin-bottom: 15px;
            color: #000;
            font-size: 18px;
            color: #333;
        }
        p {
            letter-spacing: 1px;
            line-height: 30px;
            font-size: 16px;
            color: #666;
        }
    }
}
.introduce {
    padding: 0px 30px 50px 30px;
    margin-bottom: 50px;
}
.more {
    width: 100%;
    font-size: 14px;
    color: #ccc;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
    span {
        cursor: pointer;
    }
}
</style>
