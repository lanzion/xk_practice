<template>
    <div class="ptba">
        <cardlist :datas="datas" :type = 2></cardlist>
        <no-data v-if="nomore"></no-data>
        <pagination
            :param="pages"
            :page-sizes="[9,12, 24]"
            :total="totalNum"
            @change="getlist"
            style="text-align: right;"
        ></pagination>
    </div>
</template>
<script>
import {
    listofteacherscourses,
    archivesclasscoursearchives
} from '@/api/frontstage'
export default {
    name: 'ptba',
    data() {
        return {
            nomore: false,
            datas: [],
            pages: {
                pageNum: 1,
                pageSize: 9
            }
        }
    },
    components: {
        cardlist: resolve =>
            require(['@/components/my/space/cardlist'], resolve)
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
            let res = await listofteacherscourses(
                { status: 3, className: this.teacherworkname },
                this.pages
            )
            this.datas = res.data.entity.resultData
            this.totalNum = res.data.entity.totalNum
        },
        async guidang(courseClassId, classId) {
            let res = await archivesclasscoursearchives({
                courseClassId: courseClassId,
                classId: classId
            })
            if (res.data.code === 200) {
                this.$message({
                    type: 'success',
                    message: '归档成功!'
                })
                this.getlist()
            } else {
                this.$message({
                    type: 'info',
                    message: '归档失败!'
                })
            }
        }
    },
    created() {
        this.$store.commit('changetitle', '实践课堂')
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
        overflow: hidden;
        font-size: 0px;
        padding: 42px 20px 0 20px;
        box-sizing: border-box;
        overflow: hidden;
        li {
            display: inline-block;
            width: 277px;
            height: 246px;
            margin-left: 28px;
            margin-bottom: 40px;
            &:hover {
                box-shadow: 0 20px 20px 0 #ccc;
            }
            cursor: pointer;
            div {
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
            }
            .showr {
                height: 30px;
                overflow: hidden;
                span {
                    font-size: 14px;
                    display: inline-block;
                    text-indent: 6px;
                    color: #999999;
                    &:nth-child(1) {
                        margin-top: 8px;
                    }
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
