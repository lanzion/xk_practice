<template>
    <div class="coursestobeevaluated">
        <studentcardlist :datas="datas">
            <span
                slot="course"
                slot-scope="{todo}"
                @click="changes(todo.id,todo.courseTypeParent,todo.courseType)"
                class="activeone"
            >活动评价</span>
        </studentcardlist>
        <no-data v-if="nomore"></no-data>
        <div class="block" v-if="!nomore" :style="{'float':'right','marginRight':'30px'}">
            <pagination
                :param="pages"
                :page-sizes="[9, 12, 15]"
                :total="totalNum"
                @change="getlist"
            ></pagination>
        </div>
    </div>
</template>
<script>
import { listlofstudentscoursestobeevaluated } from '@/api/frontstage'
export default {
    name: 'coursestobeevaluated',
    data() {
        return {
            datas: [],
            code: '',
            pages: {
                pageNum: 1,
                pageSize: 9
            },
            nomore: false
        }
    },
    created() {
        this.getlist()
    },
    computed: {
        workname() {
            return this.$store.state.test.workname
        }
    },
    components: {
        studentcardlist: resolve =>
            require(['@/components/my/space/studentcardlist'], resolve)
    },
    watch: {
        workname: {
            handler: function () {
                this.getlist()
            }
        },
        'datas.length': {
            handler(newval, oldval) {
                if (newval === 0 || newval == null) {
                    this.nomore = true
                } else {
                    this.nomore = false
                }
            },
            deep: true
        }
    },
    methods: {
        async getlist(val) {
            let res = await listlofstudentscoursestobeevaluated(
                { name: this.workname },
                this.pages
            )
            if (res.data.entity) {
                this.datas = res.data.entity.resultData
            } else {
                this.nomore = true
            }
            this.totalNum = res.data.entity.totalNum
            localStorage.setItem('serverType', this.goods)
        },
        changes(id, courseTypeParent, courseType) {
            let goods = {
                courseTypeParent,
                courseType
            }
            localStorage.setItem('fid', id)
            localStorage.setItem('goods', JSON.stringify(goods))
            this.$router.push({
                path: '/space/mycourse/activityevaluation',
                query: { id: id }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.coursestobeevaluated {
    width: 100%;
    height: 100%;
    padding-bottom: 80px;
    min-height: 500px;
    // ul {
    //     width: 100%;
    //     height: 100%;
    //     font-size: 0px;
    //     padding: 42px 20px 0 20px;
    //     box-sizing: border-box;
    //     li {
    //         display: inline-block;
    //         width: 277px;
    //         height: 203px;
    //         margin-left: 28px;
    //         margin-bottom: 40px;
    //         cursor: pointer;
    //         div {
    //             width: 100%;
    //             height: 155px;
    //             img {
    //                 width: 100%;
    //                 height: 155px;
    //             }
    //         }
    //         h4 {
    //             margin-top: 10px;
    //             margin-bottom: 7px;
    //             font-size: 16px;
    //             color: #333;
    //             text-indent: 6px;
    //             overflow: hidden;
    //             text-overflow: ellipsis;
    //             white-space: nowrap;
    //         }
    //         span {
    //             height: 24px;
    //             font-size: 14px;
    //             display: block;
    //             text-indent: 6px;
    //             color: #008aff;
    //             border: solid 1px #008aff;
    //             border-radius: 12px;
    //             width: 80px;
    //             text-align: center;
    //             line-height: 24px;
    //             &:hover {
    //                 background-color: #008aff;
    //                 color: #ffffff;
    //             }
    //         }
    //     }
    // }
}
</style>
