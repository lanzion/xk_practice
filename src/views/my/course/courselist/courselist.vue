<template>
    <div>
        <div class="nimi">
            <div class="g-search--wrap clearfix">
                <el-form :inline="true" class="el-form-l fl" @submit.native.prevent>
                    <el-form-item>
                        <el-cascader
                            v-model="values"
                            :options="arr"
                            placeholder="课程分类"
                            @change="resetPage"
                            :props="{ expandTrigger: 'hover' }"
                        ></el-cascader>
                    </el-form-item>

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
                            placeholder="课程类型"
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
                            placeholder="课程认定级别"
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
                    <el-form-item class="basename">
                        <el-input
                            class="el-input-l"
                            v-model="name"
                            placeholder="请输入课程、基地/机构关键字"
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
                <li
                    v-for="(g,index) in datas"
                    :key="index"
                    @click="changes(g.id,g.classificationParent)"
                >
                    <div class="cord-img">
                        <ov-image :src-data="getFileUrl(g.cover)" :img-height="'178px'"></ov-image>
                    </div>
                    <div class="cord-of">
                        <h3>{{g.name}}</h3>
                    </div>
                    <div class="cord-sl">
                        <i :style="{'backgroundImage':'url('+dengji+')'}"></i>
                        <span v-if="g.publishingUnitLevel == 'A'">省级</span>
                        <span v-else-if="g.publishingUnitLevel == 'B'">市级</span>
                        <span v-else-if="g.publishingUnitLevel == 'C'">区级</span>
                    </div>
                    <div class="cord-sl">
                        <i :style="{'backgroundImage':'url('+jidi+')'}"></i>
                        <span>{{g.baseinfoName}}</span>
                    </div>
                    <div class="cord-sl">
                        <i :style="{'backgroundImage':'url('+kechengfenlei+')'}"></i>
                        <span>{{g.parentName}}>{{g.childrenName}}</span>
                    </div>
                    <div class="cord-sl">
                        <i :style="{'backgroundImage':'url('+kechengleixing+')'}"></i>
                        <span v-if="g.courseType == 'A'">必修</span>
                        <span v-else-if="g.courseType == 'B'">选修</span>
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
    requestnavigation,
    requestwebapicurriculumCenter
} from '@/api/webApi/curriculumCenter'
import { fit, courseType, Courselevel } from '@/utils/utility/dict.js'
export default {
    data() {
        return {
            fit: fit,
            values: '',
            courseType: courseType,
            Courselevel: Courselevel,
            name: '',
            isCompulsory: '',
            isCoursetype: '',
            isCourselevel: '',
            pages: {
                pageSize: 12,
                pageNum: 1
            },
            arr: [],
            datas: [],
            value: '',
            value1: '',
            value2: '',
            nomore: false,
            dengji: require('../../../../../static/img/dengji.png'),
            jidi: require('../../../../../static/img/jidi.png'),
            kechengfenlei: require('../../../../../static/img/kechengfenlei.png'),
            kechengleixing: require('../../../../../static/img/kechengleixing.png')
        }
    },
    created() {
        this.requestnavigation()
        // this.getlists()
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
        requestnavigation() {
            requestnavigation({})
                .then(res => {
                    const datas = res.data
                    if (datas) {
                        let arrBox = []
                        datas.typelist.forEach(o => {
                            let arr = o.dicDetailList.map(k => {
                                return {
                                    value: k.code,
                                    label: k.name
                                }
                            })
                            arrBox.push({
                                value: o.code,
                                label: o.name,
                                children: arr
                            })
                        })

                        this.arr = arrBox
                    }
                })
                .finally(() => {})
        },
        // 重置分页
        resetPage() {
            this.datas = []
            this.$nextTick(() => {
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
            })
        },
        async getlists($state) {
            this.isLoading = true
            let form = {
                classificationParent: this.values[0],
                classificationChildren: this.values[1],
                provinceId: '',
                cityId: '',
                areaId: '',
                name: this.name,
                fit: this.isCompulsory,
                publishingUnitLevel: this.isCourselevel,
                courseType: this.isCoursetype
            }
            const res = await requestwebapicurriculumCenter(form, this.pages)
            const { entity: datas = {} } = res.data
            try {
                if (datas.resultData.length) {
                    this.datas = datas.resultData
                    $state.loaded()
                    if (this.datas.length / 5 === 12) {
                        $state.complete()
                    }
                    if (this.datas.length < this.pages.pageSize) {
                        $state.complete()
                    }
                    this.pages.pageSize += 12
                } else {
                    $state.complete()
                }
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.datas = []
            } finally {
                this.isLoading = false
            }
        },
        changes(id, classificationParent) {
            sessionStorage.setItem('courseId', id)
            this.$router.push({
                path: '/course/coursedetails',
                query: {
                    courseId: id,
                    classificationParent: classificationParent
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.nimi {
    width: 100%;
    height: 60px;
    margin-top: 20px;
}
.cord {
    width: 100%;
    overflow: hidden;
    margin-bottom: 50px;
    .cord-img {
    }
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
            border-radius: 4px;
            cursor: pointer;
            overflow: hidden;
            &:nth-child(4n) {
                margin-right: 0px;
            }
            .cord-of {
                width: 100%;
                height: 30px;
                padding: 0 10px;
                box-sizing: border-box;
                margin-bottom: 8px;
                h3 {
                    height: 30px;
                    line-height: 30px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 700;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 1.6px;
                    color: #262626;
                }
                span {
                    display: inline-block;
                    line-height: 36px;
                    font-weight: 700;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 1.6px;
                    color: #262626;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;

                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .cord-sl {
                width: 100%;
                height: 20px;
                padding: 0 10px;
                box-sizing: border-box;
                margin-bottom: 8px;
                i {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background-size: 16px;
                    background-repeat: no-repeat;
                    background-position: center;
                    margin-right: 8px;
                    vertical-align: middle;
                }
                span {
                    display: inline-block;
                    height: 20px;
                    width: 238px;
                    line-height: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14px;
                    letter-spacing: 0.3px;
                    color: #333333;
                    vertical-align: middle;
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
.basename {
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
