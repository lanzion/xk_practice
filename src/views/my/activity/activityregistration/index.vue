<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/activity' }">活动中心</el-breadcrumb-item>
            <el-breadcrumb-item>活动报名</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="nimi">
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

                    <el-form-item>
                        <el-select
                            v-model="isCoursetype"
                            placeholder="活动状态"
                            @change="resetPage"
                            clearable
                        >
                            <el-option
                                v-for="item in courseType"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-select
                            v-model="isCourselevel"
                            placeholder="是否收费"
                            @change="resetPage"
                            clearable
                        >
                            <el-option
                                v-for="item in Courselevel"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-form :inline="true" class="fr" @submit.native.prevent>
                    <el-form-item class="activityregistrationname">
                        <el-input
                            class="el-input-l"
                            v-model="name"
                            placeholder="请输入基地/机构或活动关键字"
                            @keyup.native.enter="resetPage"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="resetPage">搜索</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="activityregistration">
            <ul class="activityregistration-ul">
                <li class="activityregistration-li">
                    <div class="activityregistration-li-img fl" @click="go()">
                        <ov-image :type="1" :src-data="'123'" :img-height="'222px'"></ov-image>
                    </div>
                    <div class="activityregistration-li-conent fl">
                        <h3 :style="{'-webkit-box-orient':'vertical'}" @click="go()">广东博物馆展览活动</h3>
                        <div class="activityregistration-li-conent-box">
                            <span>基地名称:</span>
                            <span>广东省博物馆</span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>活动地点:</span>
                            <span>广州市天河区五山路261号</span>
                            <span
                                @click="getMap()"
                                :style="{backgroundImage:'url('+bmap+')'}"
                                class="dizhi"
                            ></span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>活动类型:</span>
                            <span>参观学习</span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>适合学段:</span>
                            <span>小学高年级 初中</span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>活动时间:</span>
                            <span>2019-11-28 14：00-16：00...</span>
                            <span class="moretime">共3场</span>
                        </div>
                        <div class="activityregistration-li-conent-box last">
                            <span class="nofier">￥1500</span>
                        </div>
                    </div>
                    <div class="activityregistration-li-show fr">
                        <div class="activityregistration-li-show-box">
                            <span>张小姐</span>
                            <span>联系人:</span>
                        </div>
                        <div class="activityregistration-li-show-box">
                            <span>020-23512458</span>
                            <span>联系电话:</span>
                        </div>
                        <div class="activityregistration-li-show-box">
                            <span>200人/场</span>
                            <span>人数限制:</span>
                        </div>
                        <div class="activityregistration-li-show-box">
                            <div class="activityregistration-li-show-box-one">
                                <div class="fl">
                                    <span>2019-11-25</span>
                                    <span>10:30</span>
                                </div>
                                <div class="fl">开放报名</div>
                            </div>
                        </div>
                    </div>
                </li>

                <li class="activityregistration-li">
                    <div class="activityregistration-li-img fl" @click="go()">
                        <ov-image :type="1" :src-data="'123'" :img-height="'222px'"></ov-image>
                    </div>
                    <div class="activityregistration-li-conent fl">
                        <h3 :style="{'-webkit-box-orient':'vertical'}" @click="go()">广东博物馆展览活动</h3>
                        <div class="activityregistration-li-conent-box">
                            <span>基地名称:</span>
                            <span>广东省博物馆</span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>活动地点:</span>
                            <span>广州市天河区五山路261号</span>
                            <span
                                @click="getMap()"
                                :style="{backgroundImage:'url('+bmap+')'}"
                                class="dizhi"
                            ></span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>活动类型:</span>
                            <span>参观学习</span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>适合学段:</span>
                            <span>小学高年级 初中</span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>活动时间:</span>
                            <span>2019-11-28 14：00-16：00...</span>
                            <span class="moretime">共3场</span>
                        </div>
                        <div class="activityregistration-li-conent-box last">
                            <!-- <span class="nofier">￥1500</span> -->
                            <span class="fier">免费</span>
                        </div>
                    </div>
                    <div class="activityregistration-li-show fr">
                        <div class="activityregistration-li-show-box">
                            <span>张小姐</span>
                            <span>联系人:</span>
                        </div>
                        <div class="activityregistration-li-show-box">
                            <span>020-23512458</span>
                            <span>联系电话:</span>
                        </div>
                        <div class="activityregistration-li-show-box">
                            <span>200人/场</span>
                            <span>人数限制:</span>
                        </div>
                        <div class="activityregistration-li-show-box">
                            <div class="activityregistration-li-show-box-two">报名中</div>
                        </div>
                    </div>
                </li>

                <li class="activityregistration-li">
                    <div class="activityregistration-li-img fl" @click="go()">
                        <ov-image :type="1" :src-data="'123'" :img-height="'222px'"></ov-image>
                    </div>
                    <div class="activityregistration-li-conent fl">
                        <h3 :style="{'-webkit-box-orient':'vertical'}" @click="go()">广东博物馆展览活动</h3>
                        <div class="activityregistration-li-conent-box">
                            <span>基地名称:</span>
                            <span>广东省博物馆</span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>活动地点:</span>
                            <span>广州市天河区五山路261号</span>
                            <span
                                @click="getMap()"
                                :style="{backgroundImage:'url('+bmap+')'}"
                                class="dizhi"
                            ></span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>活动类型:</span>
                            <span>参观学习</span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>适合学段:</span>
                            <span>小学高年级 初中</span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>活动时间:</span>
                            <span>2019-11-28 14：00-16：00...</span>
                            <span class="moretime">共3场</span>
                        </div>
                        <div class="activityregistration-li-conent-box last">
                            <!-- <span class="nofier">￥1500</span> -->
                            <span class="fier">免费</span>
                        </div>
                    </div>
                    <div class="activityregistration-li-show fr">
                        <div class="activityregistration-li-show-box">
                            <span>张小姐</span>
                            <span>联系人:</span>
                        </div>
                        <div class="activityregistration-li-show-box">
                            <span>020-23512458</span>
                            <span>联系电话:</span>
                        </div>
                        <div class="activityregistration-li-show-box">
                            <span>200人/场</span>
                            <span>人数限制:</span>
                        </div>
                        <div class="activityregistration-li-show-box">
                            <div class="activityregistration-li-show-box-thr">名额已满</div>
                        </div>
                    </div>
                </li>

                <li class="activityregistration-li">
                    <div class="activityregistration-li-img fl" @click="go()">
                        <ov-image :type="1" :src-data="'123'" :img-height="'222px'"></ov-image>
                    </div>
                    <div class="activityregistration-li-conent fl">
                        <h3 :style="{'-webkit-box-orient':'vertical'}" @click="go()">广东博物馆展览活动</h3>
                        <div class="activityregistration-li-conent-box">
                            <span>基地名称:</span>
                            <span>广东省博物馆</span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>活动地点:</span>
                            <span>广州市天河区五山路261号</span>
                            <span
                                @click="getMap()"
                                :style="{backgroundImage:'url('+bmap+')'}"
                                class="dizhi"
                            ></span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>活动类型:</span>
                            <span>参观学习</span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>适合学段:</span>
                            <span>小学高年级 初中</span>
                        </div>
                        <div class="activityregistration-li-conent-box">
                            <span>活动时间:</span>
                            <span>2019-11-28 14：00-16：00...</span>
                            <span class="moretime">共3场</span>
                        </div>
                        <div class="activityregistration-li-conent-box last">
                            <!-- <span class="nofier">￥1500</span> -->
                            <span class="fier">免费</span>
                        </div>
                    </div>
                    <div class="activityregistration-li-show fr">
                        <div class="activityregistration-li-show-box">
                            <span>张小姐</span>
                            <span>联系人:</span>
                        </div>
                        <div class="activityregistration-li-show-box">
                            <span>020-23512458</span>
                            <span>联系电话:</span>
                        </div>
                        <div class="activityregistration-li-show-box">
                            <span>200人/场</span>
                            <span>人数限制:</span>
                        </div>
                        <div class="activityregistration-li-show-box">
                            <div class="activityregistration-li-show-box-thr">报名截止</div>
                        </div>
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
import {
    requestwebapiactivityregistration,
    requestwebapiLongitudeAndlatitude
} from '@/api/webApi/base'
import { fit, courseType, Courselevel } from '@/utils/utility/dict.js'
export default {
    name: '',
    data() {
        return {
            municipal: '',
            fit: fit,
            values: '',
            courseType: courseType,
            Courselevel: Courselevel,
            isCompulsory: '',
            isCoursetype: '',
            isCourselevel: '',
            name: '',
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
            departmentOptions: [],
            cascaderData: [],
            selectedOptions: [],
            pcode: []
        }
    },
    created() {},
    methods: {
        async getlists($state) {
            let form = {
                provinceId: '',
                cityId: this.pcode[0],
                areaId: this.pcode[1],
                name: this.name,
                publishingUnitLevel: this.municipal
            }
            const res = await requestwebapiactivityregistration(
                form,
                this.pages
            )
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
        go() {
            // sessionStorage.setItem('activityregistrationId', id)
            this.$router.push({
                path:
                    '/activity/activityregistration/activityregistrationdetail'
                // query: { activityregistrationId: id }
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
    .activityregistration {
        min-height: 500px;
        .activityregistration-ul {
            margin-bottom: 30px;
            .activityregistration-li {
                width: 100%;
                height: 284px;
                padding: 28px 0 36px;
                box-sizing: border-box;
                border-bottom: 1px solid #eee;
                overflow: hidden;
                cursor: pointer;
                .activityregistration-li-img {
                    width: 360px;
                    height: 222px;
                    margin-right: 28px;
                }
                .activityregistration-li-conent {
                    width: 582px;
                    height: 222px;
                    h3 {
                        margin-bottom: 28px;
                        font-size: 22px;
                        line-height: 28px;
                        letter-spacing: 0px;
                        color: #333333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .activityregistration-li-conent-box {
                        // height: 34px;
                        width: 100%;
                        overflow: hidden;
                        span {
                            letter-spacing: 0px;
                            line-height: 26px;
                            display: block;
                            float: left;
                            font-size: 16px;
                            margin-right: 6px;
                            &:nth-child(1) {
                                color: #666666;
                            }
                            &:nth-child(2) {
                                max-width: 480px;
                                color: #262626;
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
                        .nofier {
                            font-size: 22px;
                            letter-spacing: 0px;
                            color: #ff0101 !important;
                        }
                        .fier {
                            font-size: 22px;
                            letter-spacing: 0px;
                            color: #4aa76f !important;
                        }
                        .moretime {
                            padding: 0 5px;
                            background-color: #f2660f;
                            font-size: 12px;
                            font-weight: normal;
                            font-stretch: normal;
                            letter-spacing: 1.2px;
                            color: #ffffff;
                        }
                        .dizhi {
                            width: 16px;
                            height: 26px;
                            background-size: 16px;
                            background-repeat: no-repeat;
                            background-position: center;
                        }
                        .activityregistration-li-conent-rate {
                            float: right;
                        }
                        .activityregistration-li-conent-box-span {
                            color: #008aff !important;
                        }
                    }
                    .last {
                        margin-top: 12px;
                    }
                }
                .activityregistration-li-show {
                    padding-top: 92px;
                    .activityregistration-li-show-box {
                        width: 100%;
                        overflow: hidden;
                        span {
                            display: block;
                            float: right;
                            font-size: 16px;
                            line-height: 26px;
                            &:nth-child(1) {
                                color: #262626;
                                margin-left: 6px;
                            }
                            &:nth-child(2) {
                                color: #666666;
                            }
                        }
                        .activityregistration-li-show-box-one {
                            width: 180px;
                            height: 40px;
                            padding: 8px 10px;
                            box-sizing: border-box;
                            background-color: #42a6fe;
                            margin-top: 12px;
                            border-radius: 4px;
                            div {
                                &:nth-child(1) {
                                    width: 68px;
                                    height: 24px;
                                    margin-right: 10px;
                                    span {
                                        display: block;
                                        width: 100%;
                                        text-align: right;
                                        font-size: 12px;
                                        letter-spacing: 0px;
                                        color: #ffffff;
                                        &:nth-child(1) {
                                            line-height: 0;
                                        }
                                        &:nth-child(1) {
                                            line-height: 10px;
                                        }
                                    }
                                }
                                &:nth-child(2) {
                                    width: 80px;
                                    text-align: center;
                                    font-size: 18px;
                                    letter-spacing: 0px;
                                    color: #ffffff;
                                    line-height: 22px;
                                }
                            }
                        }
                        .activityregistration-li-show-box-two {
                            width: 180px;
                            height: 40px;
                            background-color: #f26565;
                            margin-top: 12px;
                            border-radius: 4px;
                            text-align: center;
                            line-height: 40px;
                            font-size: 18px;
                            letter-spacing: 0px;
                            color: #ffffff;
                        }
                        .activityregistration-li-show-box-thr {
                            width: 180px;
                            height: 40px;
                            background-color: #cccccc;
                            margin-top: 12px;
                            border-radius: 4px;
                            text-align: center;
                            line-height: 40px;
                            font-size: 18px;
                            letter-spacing: 0px;
                            color: #ffffff;
                        }
                    }
                }
            }
        }
    }
}
.el-form-l {
    .el-form-item {
        width: 138px;
        height: 32px;
    }
}
.activityregistrationname {
    width: 230px;
    /deep/.el-form-item {
        width: 230px;
        height: 32px;
        .el-input-l {
            width: 230px;
        }
    }
}
</style>
