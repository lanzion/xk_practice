<template>
    <ul>
        <li @click="changes(g.courseId)" v-for="(g,index) in datas" :key="index">
            <div>
                <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
            </div>
            <h4>{{g.name}}</h4>
            <span v-if="identity == 1">{{g.className}}</span>
            <div class="timer">{{g.startDate}}~{{g.endDate}}</div>
        </li>
    </ul>
</template>
<script>
import { mapState } from 'vuex'
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
        }
    },
    created() {
    },
    computed: {
        ...mapState('login', {
            identity: state => state.identity || {}
        }),
    },
    methods: {
        changes(courseId) {
            localStorage.setItem('courseId', courseId)
            this.$router.push({
                path: '/space/classroom/curriculumdetails',
                query: { courseId: courseId }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
ul {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 0px;
    padding: 42px 20px 0 20px;
    box-sizing: border-box;
    li {
        display: inline-block;
        width: 277px;
        height: 232px;
        margin-left: 28px;
        margin-bottom: 40px;
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

        span {
            font-size: 12px;
            display: block;
            text-indent: 6px;
            color: #999999;
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
