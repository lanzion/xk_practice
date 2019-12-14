<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/base' }">基地/机构</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="g-search--wrap clearfix">
            <el-form :inline="true" class="el-form-l fl" @submit.native.prevent>
                <el-form-item>
                    <el-select v-model="municipal" @change="resetPage" placeholder="认定级别" clearable>
                        <el-option
                            v-for="item in Courselevel"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="el-form-item-wd">
                    <el-cascader
                        v-model="pcode"
                        placeholder="请选择市区"
                        :props="prop"
                        @change="resetPage"
                        :show-all-levels="false"
                        class="font_pla"
                    ></el-cascader>
                    <!-- <region type="object" @change="getaddres" class="regions"></region> -->
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
        <div class="base">
            <ul class="base-ul">
                <li class="base-li" v-for="(g,index) in datas" :key="index">
                    <div class="base-li-img fl" @click="go(g.id)">
                        <ov-image :type="1" :src-data="getFileUrl(g.cover)" :img-height="'222px'"></ov-image>
                    </div>
                    <div class="base-li-conent fl">
                        <h3  @click="go(g.id)">{{cutString(g.name,140)}}</h3>
                        <div class="base-li-conent-box">
                            <span>认定级别:</span>
                            <span v-if="g.publishingUnitLevel == 'A'">省级</span>
                            <span v-else-if="g.publishingUnitLevel == 'B'">市级</span>
                            <span v-else-if="g.publishingUnitLevel == 'C'">区县级</span>
                            <span class="base-li-conent-rate">
                                <el-rate
                                    v-model="g.score"
                                    disabled
                                    :colors="['#ff7800', '#ff7800', '#ff7800']"
                                    show-score
                                    text-color="#666666"
                                    score-template="{value}分"
                                ></el-rate>
                            </span>
                        </div>
                        <div class="base-li-conent-box">
                            <span>联系人及电话:</span>
                            <span>{{g.linkMan}}</span>
                            <span>{{g.linkPhone}}</span>
                        </div>
                        <div class="base-li-conent-box">
                            <span>详细地址:</span>
                            <span>{{g.address}}</span>
                            <span
                                @click="getMap(g.address,g.name)"
                                :style="{backgroundImage:'url('+bmap+')'}"
                                class="dizhi"
                            ></span>
                        </div>
                        <div class="base-li-conent-box" v-if="g.courseDtoList.length !== 0">
                            <span>热门课程:</span>
                            <!-- <span v-if="g.courseDtoList.length === 0">暂无课程</span>
                            <span
                                v-else-if="g.courseDtoList.length !== 0"
                                v-for="(t,index) in g.courseDtoList"
                                :key="index"
                                class="base-li-conent-box-span"
                            >《{{t.courseName}}》</span>-->
                            <span
                                v-for="(t,index) in g.courseDtoList"
                                :key="index"
                                class="base-li-conent-box-span"
                            >《{{t.courseName}}》</span>
                        </div>
                        <div class="base-li-conent-box">
                            <span>
                                共
                                <i>{{g.courseNum}}</i>
                                门课程
                            </span>
                        </div>
                    </div>
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
import {
    requestwebapibase,
    requestwebapiLongitudeAndlatitude
} from '@/api/webApi/base'
import { requestRegion } from '@/api/common'
import { Courselevel } from '@/utils/utility/dict.js'
export default {
    name: '',
    data() {
        return {
            municipal: '',
            name: '',
            Courselevel: Courselevel,
            options: [],
            pages: {
                pageSize: 10,
                pageNum: 1
            },
            value: 5.0,
            bmap: '../../../../static/img/baiduditu.png',
            centerDialogVisible: false,
            datas: [],
            lng: '',
            lat: '',
            arr: [],
            values: '',
            departmentOptions: [],
            cascaderData: [],
            selectedOptions: [],
            pcode: [],
            prop: {
                lazy: true,
                lazyLoad(node, resolve) {
                    setTimeout(() => {
                        if (node.level == 0) {
                            requestRegion({ pcode: 440000 })
                                .then(res => {
                                    const cities = res.data.appendInfo.list.map(
                                        (value, i) => ({
                                            value: value.code,
                                            label: value.name,
                                            leaf: node.level >= 1
                                        })
                                    )
                                    // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                                    resolve(cities)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                        if (node.level == 1) {
                            requestRegion({ pcode: node.value })
                                .then(res => {
                                    const areas = res.data.appendInfo.list.map(
                                        (value, i) => ({
                                            value: value.code,
                                            label: value.name,
                                            leaf: node.level >= 1
                                        })
                                    )
                                    // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                                    resolve(areas)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }
                    }, 500)
                }
            }
        }
    },
    created() {
        // this.getlists()
    },
    methods: {
        async getlists($state) {
            let form = {
                provinceId: '',
                cityId: this.pcode[0],
                areaId: this.pcode[1],
                name: this.name,
                publishingUnitLevel: this.municipal
            }
            const res = await requestwebapibase(form, this.pages)
            const { entity: datas = {} } = res.data
            try {
                let array = datas.resultData || []
                array.forEach(x => {
                    if (x.score == null) {
                        x.score = 5.0
                    }
                    x.score = Number(this.numFilter(x.score))
                })
                this.totalNum = datas.totalNum || 0
                if (array.length) {
                    this.datas = array
                    $state.loaded()
                    if (this.datas.length / 5 === 10) {
                        $state.complete()
                    }
                    if (this.datas.length < this.pages.pageSize) {
                        $state.complete()
                    }
                    this.pages.pageSize += 10
                } else {
                    $state.complete()
                }
            } catch (error) {
                this.datas = []
            } finally {
                this.isLoading = false
            }
        },
        resetPage() {
            this.datas = []
            this.$nextTick(() => {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
            })
        },
        async getMap(address, name) {
            const res = await requestwebapiLongitudeAndlatitude({
                address: address
            })
            const { entity: datas = {} } = res.data
            try {
                console.log(datas)
                this.lng = datas.lng || 113.27
                this.lat = datas.lat || 23.13
                const { href } = this.$router.resolve({
                    name: `bmap`,
                    query: { lng: this.lng, lat: this.lat, name: name }
                })
                window.open(href, '_blank')
            } catch (error) {
            } finally {
                this.isLoading = false
            }
        },
        go(id) {
            sessionStorage.setItem('baseId', id)
            this.$router.push({
                path: '/base/basedetail',
                query: { baseId: id }
            })
        },
        numFilter(value) {
            let realVal = parseFloat(value).toFixed(1)
            return realVal
        }
    }
}
</script>
<style lang='scss' scoped>
.container {
    margin: 0 auto;
    .el-breadcrumb {
        margin-top: 16px;
        margin-bottom: 16px;
        font-size: 14px;
        color: #666666;
        line-height: 38px;
    }
    .base {
        min-height: 500px;
        .base-ul {
            margin-bottom: 30px;
            .base-li {
                width: 100%;
                height: 284px;
                padding: 28px 0 36px;
                box-sizing: border-box;
                border-bottom: 1px solid #eee;
                cursor: pointer;
                .base-li-img {
                    width: 360px;
                    height: 222px;
                    margin-right: 28px;
                }
                .base-li-conent {
                    width: 802px;
                    height: 222px;
                    h3 {
                        margin-bottom: 32px;
                        font-size: 22px;
                        line-height: 29px;
                        letter-spacing: 0px;
                        color: #333333;
                        overflow: hidden;
                    }
                    .base-li-conent-box {
                        height: 34px;
                        span {
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 0px;
                            display: block;
                            float: left;
                            font-size: 16px;
                            margin-right: 6px;
                            &:nth-child(1) {
                                color: #666666;
                            }
                            &:nth-child(2) {
                                color: #333333;
                                max-width: 700px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            i {
                                display: inline-block;
                                height: 15px;
                                min-width: 30px;
                                line-height: 15px;
                                text-align: center;
                                background: #008aff;
                                color: #fff;
                            }
                        }
                        .dizhi {
                            width: 16px;
                            height: 16px;
                            background-size: 16px;
                        }
                        .base-li-conent-rate {
                            float: right;
                        }
                        .base-li-conent-box-span {
                            color: #008aff !important;
                        }
                    }
                }
            }
        }
    }
}
.el-form-l {
    .el-form-item {
        width: 108px;
    }
    .el-form-item-wd {
        width: 130px;
    }
}
</style>
