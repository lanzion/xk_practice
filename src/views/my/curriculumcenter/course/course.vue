<template>
    <div class="goods">
        <div class="container">
            <div class="taber">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/community' }">课程中心</el-breadcrumb-item>
                    <el-breadcrumb-item
                        :to="{ path: '/community/coursedetails/courseintroduction' }"
                    >实践课程</el-breadcrumb-item>
                    <el-breadcrumb-item>课程详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="goodscard">
                <div class="goodscard_fl">
                    <ov-image :src-data="getFileUrl(list.cover)"></ov-image>
                </div>
                <div class="goodscard_fr">
                    <div class="goodscard_fr_title">
                        <h4>{{list.name}}</h4>
                    </div>
                    <div class="goodscard_cli">
                        <div>
                            <img :src="imgiconws" alt />
                            <span>课程类型:{{list.courseTypeParentName}}>{{list.courseTypeName}}</span>
                        </div>
                    </div>
                    <div class="goodscard_btn">
                        <div>
                            <img :src="imgiconwt" alt />
                            <span>课程目标：</span>
                        </div>
                        <div>{{list.target}}</div>
                    </div>
                </div>
            </div>
            <div class="tabshows">
                <div class="tabshows_top">
                    <ul>
                        <li
                            v-for="(item,index) in arr"
                            :key="index"
                            @click="changes(index,item.url)"
                            :class="item.url === $route.path ? 'addclass' : ''"
                            v-text="item.name"
                        ></li>
                    </ul>
                </div>
            </div>
            <router-view />
        </div>
    </div>
</template>
<script>
import { getcoursedetails } from '@/api/frontstage'
export default {
    name: 'goods',
    data() {
        return {
            list: [],
            content: '',
            classname: [],
            imgiconw: require('../../../../../static/img/shoucang.png'),
            imgiconwz: require('../../../../../static/img/banji.png'),
            imgiconwx: require('../../../../../static/img/ren.png'),
            imgiconws: require('../../../../../static/img/leixing.png'),
            imgiconwt: require('../../../../../static/img/mubiao.png'),
            actcard: 0,
            arr: [
                {
                    name: '课程详情',
                    url: '/community/course/textdetail'
                },
                {
                    name: '实践作品',
                    url: '/community/course/textworks'
                },
                {
                    name: '课程评论',
                    url: '/community/course/textevaluate'
                }
            ]
        }
    },
    components: {},
    methods: {
        changes(index, url) {
            this.$router.push({
                path: url
            })
        },
        async getgoods() {
            let mid = localStorage.getItem('mid')
            let bid = this.$route.query.id
            let id = ''
            if (bid) {
                id = bid
            } else {
                id = mid
            }
            const data = await getcoursedetails({ id: id })
            this.list = data.data.entity
            this.content = this.list.content
            this.classname = this.list.classDtoList
            this.$store.commit('changeconent', this.content)
        }
    },
    created() {
        this.getgoods()
    },
    computed: {
        courseId() {
            return this.$store.state.test.courseId
        }
    }
}
</script>
<style lang="scss" scoped>
.goodscard {
    height: 400px;
    background: #fff;
    overflow: hidden;
    padding: 28px 24px;
    .goodscard_fl {
        float: left;
        width: 600px;
        height: 100%;
        margin-right: 30px;
        overflow: hidden;
        img {
            width: 100%;
        }
    }
    .goodscard_fr {
        width: 514px;
        height: 100%;
        float: left;
        .goodscard_fr_title {
            margin-bottom: 34px;
            height: 42px;
            h4 {
                float: left;
                width: 220px;
                height: 42px;
                font-size: 22px;
                line-height: 42px;
                color: #333333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            div {
                float: right;
                font-size: 16px;
                color: #cccccc;
                line-height: 42px;
                span {
                    img {
                        display: inline;
                    }
                    margin-left: 50px;
                }
            }
        }
        .goodscard_fine {
            height: 40px;
            div {
                height: 40px;
                img {
                    display: inline;
                    vertical-align: middle;
                }
                span {
                    vertical-align: middle;
                    font-size: 14px;
                    color: #333333;
                }
                &:nth-child(1) {
                    float: left;
                }
                &:nth-child(2) {
                    float: right;
                    span {
                        margin-right: 82px;
                    }
                }
            }
        }
        .goodscard_cli {
            height: 40px;
            div {
                height: 40px;
                img {
                    display: inline;
                    vertical-align: middle;
                }
                span {
                    vertical-align: middle;
                    font-size: 14px;
                    color: #333333;
                }
            }
        }
        .goodscard_btn {
            height: 40px;
            div {
                height: 40px;
                img {
                    display: inline;
                    vertical-align: middle;
                }
                span {
                    vertical-align: middle;
                    font-size: 14px;
                    color: #333333;
                }
                &:nth-child(1) {
                    width: 100px;
                    float: left;
                }
                &:nth-child(2) {
                    width: 400px;
                    height: 126px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    float: left;
                    padding: 10px;
                    box-sizing: border-box;
                }
            }
        }
    }
}
.taber {
    margin: 18px 0;
}
.tabshows {
    margin-top: 20px;
    .tabshows_top {
        height: 60px;
        background: #fff;
        margin-bottom: 10px;
        ul {
            height: 100%;
            border-bottom: 1px solid #ccc;
            li {
                height: 58px;
                text-align: center;
                line-height: 58px;
                float: left;
                width: 120px;
                font-size: 16px;
                color: #333333;
            }
        }
    }
}
.addclass {
    border-bottom: 2px solid #008aff;
    color: #008aff;
}
</style>
