<template>
    <div class="noaudited">
        <ul v-if="studentWorkList.length">
            <li v-for="item in studentWorkList" :key="item.classId">
                <div class="center_h">
                    <ov-image :src-data="getFileUrl(item.cover)"></ov-image>
                </div>
                <div class="center">
                    <h4>{{item.workName}}</h4>
                    <p>{{item.className}}</p>
                    <span class="center_span">{{item.userName}}</span>
                    <div class="center_t">
                        <span>上传时间</span>
                        <span>{{item.createDate}}</span>
                    </div>
                </div>
                <div class="center_r">
                    <span @click="todetils(item.id)">查看详情</span>
                </div>
            </li>
        </ul>
        <no-data v-if="nomore"></no-data>
        <pagination
            v-if="!nomore"
            :param="pages"
            :total="totalNum"
            @change="getlists"
            style="    text-align: right;"
        ></pagination>
    </div>
</template>
<script>
import { getlistofteachersworks } from '@/api/frontstage'
export default {
    // 未审核
    name: 'noaudited',
    data() {
        return {
            nomore: false,
            studentWorkList: [],
            pages: {
                pageNum: 1,
                pageSize: 10
            }
        }
    },
    computed: {
        teachernewworks() {
            return this.$store.state.test.teachernewworks
        }
    },
    created() {
        this.getlists()
    },
    watch: {
        teachernewworks: {
            handler: function () {
                this.getlists()
            }
        },
        'studentWorkList.length': {
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
        todetils(id) {
            this.$router.push({
                path: '/space/agment/workdetails',
                query: { id: id, type: 1 }
            })
        },
        async getlists() {
            let res = await getlistofteachersworks(
                { auditStatus: '0', name: this.teachernewworks },
                this.pages
            )
            try {
                let data = res.data.entity
                this.studentWorkList = data.resultData || []
                this.totalNum = data.totalNum || 0
            } catch (err) {
                this.studentWorkList = []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.noaudited {
    width: 100%;
    height: 100%;
    min-height: 500px;
    padding: 30px 25px;
    box-sizing: border-box;
    background: #fff;
    ul {
        width: 100%;
        height: 100%;
        li {
            width: 100%;
            height: 168px;
            border-bottom: 1px solid #ccc;
            margin-bottom: 30px;
            &:nth-last-child(1) {
                border-bottom: none;
            }
            div {
                float: left;
                &:nth-last-child(1) {
                    float: right;
                }
            }
            .center_h {
                width: 240px;
                margin-right: 22px;
            }
            .center {
                h4 {
                    font-size: 20px;
                    color: #333333;
                    margin-bottom: 12px;
                }
                p {
                    margin-bottom: 12px;
                    span {
                        font-size: 14px;
                        color: #008aff;
                        margin-right: 16px;
                    }
                }
                .center_span {
                    display: block;
                    font-size: 14px;
                    color: #666;
                }
            }
            .center_t {
                margin-top: 36px;
                span {
                    font-size: 14px;
                    color: #666666;
                    margin-right: 12px;
                }
            }
        }
    }
}
.center_r {
    width: 108px;
    height: 100%;
    span {
        margin-top: 50px;
        display: block;
        height: 38px;
        width: 106px;
        border: solid 1px #008aff;
        border-radius: 4px;
        font-size: 16px;
        color: #008aff;
        line-height: 38px;
        text-align: center;
    }
}
</style>
