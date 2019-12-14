<template>
    <div class="bases">
        <div class="bases-fl-evaluate">
            <ul class="bases-fl-evaluate-ul">
                <li v-for="(g,index) in lists" :key="index" @click="gobase(g.baseInfoId)">
                    <div>
                        <ov-image :type="3" :src-data="g.cover" :img-height="'235px'"></ov-image>
                    </div>
                    <h3>{{g.baseInfoName}}</h3>
                    <h4>已参加课程:</h4>
                    <ul>
                        <li v-for="(t,index) in g.courseList" :key="index">《{{t.courseName}}》</li>
                    </ul>
                </li>
            </ul>
            <infinite-loading @infinite="getlists" ref="infiniteLoading">
                <span slot="spinner">正在加载中...</span>
                <span slot="no-more">没有更多数据了...</span>
                 <span slot="no-results">暂无数据...</span>
            </infinite-loading>
        </div>
    </div>
</template>

<script>
import { requestwebapischoolDetailbase } from '@/api/webApi/school'
export default {
    name: 'schooldetailbases',
    data() {
        return {
            value: 5,
            time: require('../../../../../../static/img/time.png'),
            erweima: require('../../../../../../static/img/xikegongzhonghao.png'),
            lists: [],
            pages: {
                pageSize: 8,
                pageNum: 1
            }
        }
    },
    created() {
    },
    methods: {
        async getlists($state) {
            this.isLoading = true
            let schoolId = this.$route.query.schoolId
            if (schoolId) {
                this.id = schoolId
            } else {
                this.id = sessionStorage.getItem('schoolId')
            }
            const res = await requestwebapischoolDetailbase(
                { id: this.id },
                this.pages
            )
            const { entity: datas = {} } = res.data
            try {
                if (datas.resultData.length) {
                    this.lists = datas.resultData
                    $state.loaded()
                    if (this.lists.length / 5 === 8) {
                        $state.complete()
                    }
                    if (this.lists.length < this.pages.pageSize) {
                        $state.complete()
                    }
                    this.pages.pageSize += 8
                } else {
                    $state.complete()
                }
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.lists = []
            } finally {
                this.isLoading = false
            }
        },
        gobase(id) {
            sessionStorage.setItem('baseId', id)
            this.$router.push({
                path: '/base/basedetail',
                query: { baseId: id }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.bases {
    overflow: hidden;
    min-height: 400px;
    .bases-fl-evaluate {
        margin-bottom: 90px;
        margin-top: 28px;
        .bases-fl-evaluate-header {
            border-bottom: 1px solid #eee;
            height: 34px;
            margin-bottom: 18px;
            span,
            i {
                display: inline-block;
            }
            .bases-fl-evaluate-header-one {
                font-size: 22px;
                line-height: 31px;
                letter-spacing: 0px;
                color: #333333;
            }
            .bases-fl-evaluate-header-two {
                font-size: 16px;
                letter-spacing: 0px;
                color: #666666;
            }
            .bases-fl-evaluate-header-thr {
                font-size: 16px;
                line-height: 29px;
                letter-spacing: 0px;
                color: #666666;
                float: right;
                cursor: pointer;
            }
            .bases-fl-evaluate-header-min {
            }
            .bases-fl-evaluate-header-max {
                float: right;
                cursor: pointer;
            }
        }
        .bases-fl-evaluate-ul {
            overflow: hidden;
            margin-bottom: 30px;
            li {
                width: 380px;
                height: 388px;
                border: 1px solid #eeeeee;
                box-sizing: border-box;
                float: left;
                margin-right: 30px;
                &:nth-last-child(3n) {
                    margin-right: 0px;
                }
                h3 {
                    height: 34px;
                    font-size: 16px;
                    line-height: 34px;
                    letter-spacing: 2.3px;
                    color: #262626;
                    padding: 0 10px;
                    box-sizing: border-box;
                    margin-bottom: 10px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                h4 {
                    height: 24px;
                    font-size: 14px;
                    line-height: 24px;
                    letter-spacing: 2px;
                    color: #666666;
                    padding: 0 10px;
                    box-sizing: border-box;
                    margin-bottom: 6px;
                }
                ul {
                    li {
                        height: 22px;
                        font-size: 14px;
                        line-height: 22px;
                        letter-spacing: 1.4px;
                        color: #008aff;
                        padding: 0 10px;
                        box-sizing: border-box;
                        border: none;
                        margin-bottom: 4px;
                    }
                }
            }
        }
    }
}
</style>
