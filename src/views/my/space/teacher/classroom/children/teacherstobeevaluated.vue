<template>
    <div class="teacherstobeevaluated">
        <cardlist :datas="datas">
            <span
                class="spans"
                slot="spans"
                slot-scope="{todo}"
                @click="gotoover(todo.id,todo.courseTypeParent,todo.courseType,todo.classId)"
            >活动评价</span>
        </cardlist>
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
    name: 'teacherstobeevaluated',
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
.teacherstobeevaluated {
    width: 100%;
    height: 100%;
    padding-bottom: 80px;
    overflow: hidden;
}
</style>
