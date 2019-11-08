<template>
    <div class="abtd">
        <cardlist :datas="datas"></cardlist>
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
</style>
