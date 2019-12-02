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
                            v-model="isCompulsory"
                            placeholder="请选择学段"
                            @change="resetPage"
                            clearable
                        >
                            <el-option
                                v-for="item in fit"
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
                            placeholder="请输入基地/机构关键字"
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
                            <i>{{g.actNum}}</i>活动
                        </span>
                    </div>
                </li>
            </ul>
            <no-data v-if="nomore"></no-data>
        </div>
    </div>
</template>

<script>
// import { requestMultField } from '@/api/common'
import { requestwebapischool } from '@/api/webApi/school'
import { fit } from '@/utils/utility/dict.js'
export default {
    data() {
        return {
            fit: fit,
            name: '',
            isCompulsory: '',
            pages: {
                pageSize: 16,
                pageNum: 1
            },
            datas: [],
            nomore: false
        }
    },
    created() {
        this.getlists()
    },
    watch: {
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
        // 重置分页
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.getlists()
        },
        async getlists() {
            this.isLoading = true
            let form = {
                schoolName: this.name,
                schoolType: this.isCompulsory,
            }
            const res = await requestwebapischool(form, this.pages)
            const { entity: datas = {} } = res.data
            try {
                this.datas = datas.resultData || []
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.datas = []
            } finally {
                this.isLoading = false
            }
        },
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
.el-form-l{
    .el-form-item{
        width: 108px;
    }
}
</style>
