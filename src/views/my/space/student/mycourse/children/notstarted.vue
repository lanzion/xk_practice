<template>
    <div class="notstarted">
        <studentcardlist :datas="datas">
            <span
                @click="changes(todo.id)"
                slot="course"
                slot-scope="{todo}"
            >{{todo.startDate.slice(0,10)}}~{{todo.endDate.slice(0,10)}}</span>
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
import { studentsoursesnotstartedlist } from '@/api/frontstage'
export default {
    name: 'notstarted',
    data() {
        return {
            datas: [],
            totalNum: 0,
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
    components: {
        studentcardlist: resolve =>
            require(['@/components/my/space/studentcardlist'], resolve)
    },
    computed: {
        workname() {
            return this.$store.state.test.workname
        }
    },
    watch: {
        workname: {
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
            let res = await studentsoursesnotstartedlist(
                { name: this.workname },
                this.pages
            )
            this.datas = res.data.entity.resultData
            this.totalNum = res.data.entity.totalNum
        },
        changes(gid) {
            localStorage.setItem('gid', gid)
            this.$router.push({
                path: '/space/mycourse/studentcoursedetails',
                query: { id: gid }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.notstarted {
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
    //         box-sizing: border-box;
    //         overflow: hidden;
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
    //             height: 30px;
    //             font-size: 12px;
    //             display: block;
    //             color: #666;
    //             width: 100%;
    //             text-align: left;
    //             text-indent: 6px;
    //             line-height: 30px;
    //             &:hover {
    //                 color: #008aff;
    //             }
    //         }
    //     }
    // }
}
</style>
