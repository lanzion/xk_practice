<template>
    <div class="ptba">
        <!-- <ul>
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
        </ul> -->
        <cardlist :datas="datas" :type = 3></cardlist>
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
}
</style>
