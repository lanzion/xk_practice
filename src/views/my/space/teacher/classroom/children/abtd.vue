<template>
    <div class="abtd">
        <cardlist :datas="datas" :type = 1></cardlist>
        <no-data v-if="nomore"></no-data>
        <pagination
            v-if="!nomore"
            :param="pages"
            :total="totalNum"
            :page-sizes="[9, 12, 15]"
            @change="getlist"
            style="text-align: right;"
        ></pagination>
    </div>
</template>
<script>
import { listofteacherscourses } from '@/api/frontstage'
export default {
    name: 'abtd',
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
        async getlist() {
            let res = await listofteacherscourses(
                { status: 1, className: this.teacherworkname },
                this.pages
            )
            this.datas = res.data.entity.resultData
            this.totalNum = res.data.entity.totalNum
        }
    },
    created() {
        this.$store.commit('changetitle', '实践课堂')
        this.getlist()
    }
}
</script>
<style lang="scss" scoped>
.abtd {
    width: 100%;
    height: 100%;
    padding-bottom: 80px;
    min-height: 500px;
    overflow: hidden;
}
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
        border: 1px solid #ccc;
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
