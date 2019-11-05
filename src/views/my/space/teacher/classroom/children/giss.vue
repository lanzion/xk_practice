<template>
    <div class="giss">
        <cardlist :datas="datas" :type = 1></cardlist>
        <no-data v-if="nomore"></no-data>
        <pagination :param="pages" :total="totalNum" @change="getlist" style="text-align: right;"></pagination>
    </div>
</template>
<script>
import { listofteacherscourses } from '@/api/frontstage'
export default {
    name: 'giss',
    data() {
        return {
            nomore: false,
            datas: [],
            pages: {
                pageNum: 1,
                pageSize: 10
            },
            totalNum: 0
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
                { status: 2, className: this.teacherworkname },
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
.giss {
    width: 100%;
    height: 100%;
    padding-bottom: 80px;
    min-height: 500px;
    overflow: hidden;
}
</style>
