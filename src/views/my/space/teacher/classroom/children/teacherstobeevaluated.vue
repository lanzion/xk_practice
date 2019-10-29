<template>
    <div class="ptba">
        <ul>
            <li v-for="(g,index) in datas" :key="index">
                <div class="boximg" @click="changes(g.courseId)">
                    <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
                </div>
                <h4 @click="changes(g.courseId)">{{g.name}}</h4>
                <div class="boxtext">
                    <span @click="changes(g.courseId)">{{g.className}}</span>
                    <span
                        class="spans"
                        @click="gotoover(g.id,g.courseTypeParent,g.courseType,g.classId)"
                    >活动评价</span>
                </div>
                <div class="timer">{{g.startDate}}~{{g.endDate}}</div>
            </li>
        </ul>
        <no-data v-if="nomore"></no-data>
        <pagination
            v-if="!nomore"
            :param="pages"
            :page-sizes="[6, 12, 18]"
            :total="totalNum"
            @change="getlist"
            style="text-align: right;"
        ></pagination>
    </div>
</template>
<script>
import { practicalcoursestobeevaluatedlist } from '@/api/frontstage'
export default {
    name: 'ptba',
    data() {
        return {
            nomore: false,
            datas: [],
            pages: {
                pageNum: 1,
                pageSize: 6
            }
        }
    },
    computed: {
        teacherworkname() {
            return this.$store.state.test.teacherworkname
        }
    },
    watch: {
        teacherworkname: {
            handler: function () {
                this.getlist()
            }
        },
        'datas.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomore = true
                } else {
                    this.nomore = false
                }
            },
            deep: true
        }
    },
    methods: {
        changes(courseId) {
            localStorage.setItem('courseId', courseId)
            this.$router.push({
                path: '/space/classroom/curriculumdetails',
                query: { courseId: courseId }
            })
        },
        async getlist() {
            this.isLoading = true
            let res = await practicalcoursestobeevaluatedlist(
                {
                    cname: '',
                    className: this.teacherworkname
                },
                this.pages
            )
            const { entity: datas = {} } = res.data
            // console.log(res);
            try {
                this.datas = datas.resultData || []
                this.listData = datas.resultData || []
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.datas = []
            } finally {
                this.isLoading = false
            }
        },
        gotoover(id, courseTypeParent, courseType, classId) {
            let goods = {
                courseTypeParent,
                courseType
            }
            localStorage.setItem('goods', JSON.stringify(goods))
            localStorage.setItem('fid', id)
            sessionStorage.setItem('reviewerClassId', classId)
            this.$router.push({
                path: '/space/classroom/curriculumevaluation',
                query: { id: id, reviewerClassId: classId }
            })
        }
    },
    created() {
        this.getlist()
    }
}
</script>
<style lang="scss" scoped>
.ptba {
    width: 100%;
    height: 100%;
    padding-bottom: 80px;
    overflow: hidden;
    ul {
        width: 100%;
        height: 100%;
        font-size: 0px;
        padding: 42px 20px 0 20px;
        box-sizing: border-box;
        overflow: hidden;
        li {
            display: inline-block;
            width: 277px;
            height: 250px;
            margin-left: 28px;
            margin-bottom: 40px;
            overflow: hidden;
            cursor: pointer;
            .boximg {
                width: 100%;
                height: 155px;
                img {
                    width: 100%;
                }
            }
            h4 {
                margin-top: 10px;
                margin-bottom: 7px;
                font-size: 16px;
                color: #333;
                text-indent: 6px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .boxtext {
                height: 24px;
                span {
                    float: left;
                    font-size: 14px;
                    display: block;
                    text-indent: 6px;
                    color: #999999;
                    width: 120px;
                    line-height: 22px;
                }
                .spans {
                    font-size: 14px;
                    color: #008aff;
                    float: right;
                    width: 88px;
                    height: 22px;
                    border: 1px solid #008aff;
                    border-radius: 12px;
                    line-height: 22px;
                    text-align: center;
                    &:hover {
                        color: #fff;
                        background: #008aff;
                    }
                }
            }
            .timer {
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                text-indent: 6px;
                color: #999;
            }
        }
    }
}
</style>
