<template>
    <ul>
        <!-- <li @click="changes(g.courseId)" v-for="(g,index) in datas" :key="index">
            <div>
                <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
            </div>
            <h4>{{g.name}}</h4>
            <span v-if="identity == 1">{{g.className}}</span>
            <div class="timer">{{g.startDate}}~{{g.endDate}}</div>
        </li>-->
        <li v-for="(g,index) in datas" :key="index">
            <div class="boximg" @click="changes(g.courseId)">
                <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
            </div>
            <h4 @click="changes(g.courseId)">{{g.name}}</h4>
            <div class="boxtext">
                <span @click="changes(g.courseId)">{{g.className}}</span>

                <span
                    class="spans"
                    v-if="type === 2"
                    @click="guidang(g.id,g.classId)"
                    v-text="g.isPortfolioStatus==='0'?'未归档':'已归档'"
                ></span>

                <span
                    class="spans"
                    v-if="type === 3"
                    @click="gotoover(g.id,g.courseTypeParent,g.courseType,g.classId)"
                >活动评价</span>
            </div>
            <div class="timer">{{g.startDate}}~{{g.endDate}}</div>
        </li>
    </ul>
</template>
<script>
import { mapState } from 'vuex'
import { archivesclasscoursearchives } from '@/api/frontstage'
export default {
    name: 'cardlist',
    data() {
        return {}
    },
    props: {
        datas: {
            type: Array,
            default() {
                return []
            }
        },
        type: {
            type: Number,
            default() {
                return 1
            }
        }
    },
    created() {},
    computed: {
        ...mapState('login', {
            identity: state => state.identity || {}
        })
    },
    methods: {
        changes(courseId) {
            localStorage.setItem('courseId', courseId)
            this.$router.push({
                path: '/space/classroom/curriculumdetails',
                query: { courseId: courseId }
            })
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
    }
}
</script>
<style lang="scss" scoped>
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
</style>
