<template>
    <div class="ptba">
        <cardlist :datas="datas">
            <span
                class="spans"
                slot="spans"
                slot-scope="{ todo }"
                @click="guidang(todo.id,todo.classId)"
                v-text="todo.isPortfolioStatus =='0'?'未归档':'已归档'"
            ></span>
        </cardlist>
        <no-data v-if="nomore"></no-data>
        <pagination
            v-if="!nomore"
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
