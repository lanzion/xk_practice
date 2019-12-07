<template>
    <div class="container">
        <div class="nimi">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/school' }">学校专栏</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="g-search--wrap clearfix">
                <el-form :inline="true" class="el-form-l fl" @submit.native.prevent>
                    <el-form-item>
                        <el-select
                            disabled
                            v-model="isCompulsory"
                            placeholder="初中"
                            @change="resetPage"
                            clearable
                        >
                            <el-option
                                v-for="item in schoolfit"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <el-form :inline="true" class="fr">
                    <el-form-item>
                        <el-input
                            v-model="name"
                            placeholder="请输入学校的关键字"
                            @keyup.native.enter="resetPage"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="resetPage">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="cord">
            <ul>
                <li v-for="(g,index) in datas" :key="index" @click="changes(g.id)">
                    <div class="cord-img">
                        <ov-image :src-data="getFileUrl(g.cover)" :img-height="'178px'"></ov-image>
                    </div>
                    <div class="cord-of">
                        <span>{{g.schoolName}}</span>
                    </div>
                    <div class="cord-sl">
                        <span>
                            已发起
                            <i>{{g.actNum}}</i>场活动
                        </span>
                    </div>
                </li>
            </ul>
            <!-- <infinite-loading @infinite="getlists" ref="infiniteLoading">
                <span slot="spinner">正在加载中...</span>
                <span slot="no-more">没有更多数据了...</span>
                 <span slot="no-results">暂无数据...</span>
            </infinite-loading>-->
        </div>
    </div>
</template>

<script>
import { requestwebapischool } from '@/api/webApi/school'
import { schoolfit } from '@/utils/utility/dict.js'
export default {
    data() {
        return {
            schoolfit: schoolfit,
            name: '',
            isCompulsory: 'middleSchool',
            datas: [],
            pages: {
                pageSize: 12,
                pageNum: 1
            }
        }
    },
    created() {
        this.getlists()
    },
    methods: {
        // resetPage() {
        //     this.datas = []
        //     this.$nextTick(() => {
        //         this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        //     })
        // },
        resetPage() {
            this.getlists()
        },
        async getlists() {
            if (this.isCompulsory) {
                this.isCompulsory = 'middleSchool'
            }
            let form = {
                schoolName: this.name,
                schoolType: this.isCompulsory
            }
            const res = await requestwebapischool(form, this.pages)
            const { entity: datas = {} } = res.data
            try {
                this.datas = datas.resultData || []
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.datas = []
            } finally {
            }
        },
        // async getlists($state) {
        //     let form = {
        //         schoolName: this.name,
        //         schoolType: this.isCompulsory
        //     }
        //     const res = await requestwebapischool(form, this.pages)
        //     const { entity: datas = {} } = res.data
        //     try {
        //         if (datas.resultData.length) {
        //             this.datas = datas.resultData
        //             $state.loaded()
        //             if (this.datas.length / 5 === 16) {
        //                 $state.complete()
        //             }
        //             if (this.datas.length < this.pages.pageSize) {
        //                 $state.complete()
        //             }
        //             this.pages.pageSize += 16
        //         } else {
        //             $state.complete()
        //         }
        //         this.totalNum = datas.totalNum || 0
        //     } catch (error) {

        //     } finally {
        //     }
        // },
        changes(id) {
            sessionStorage.setItem('schoolId', id)
            this.$router.push({
                path: '/school/schooldetail',
                query: { schoolId: id }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    margin: 0 auto;
    .el-breadcrumb {
        font-size: 14px;
        color: #666666;
        line-height: 38px;
        margin-bottom: 28px;
    }
    .nimi {
        width: 100%;
        height: 60px;
        margin-top: 20px;
    }
    .cord {
        width: 100%;
        overflow: hidden;
        min-height: 500px;
        ul {
            width: 100%;
            overflow: hidden;
            li {
                width: 288px;
                float: left;
                margin-right: 12px;
                margin-bottom: 20px;
                background: #fff;
                overflow: hidden;
                border: solid 1px #ededed;
                cursor: pointer;
                height: 244px;
                &:nth-child(4n) {
                    margin-right: 0px;
                }
                .cord-of {
                    width: 100%;
                    height: 30px;
                    padding: 0 10px;
                    box-sizing: border-box;
                    margin-bottom: 5px;
                    span {
                        display: inline-block;
                        width: 100%;
                        height: 36px;
                        line-height: 36px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 16px;
                        color: #333;
                    }
                }
                .cord-sl {
                    width: 100%;
                    height: 20px;
                    padding: 0 10px;
                    box-sizing: border-box;
                    span {
                        display: inline-block;
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 14px;
                        color: #666;
                        i {
                            font-size: 16px;
                            font-weight: normal;
                            letter-spacing: 0px;
                            color: #008aff;
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
    }
}
.el-form-l {
    .el-form-item {
        width: 120px;
    }
}
</style>
