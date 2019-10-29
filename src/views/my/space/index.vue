<template>
    <div class="community">
        <div class="container">
            <div class="tonav">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>我的大课堂</el-breadcrumb-item>
                    <el-breadcrumb-item>{{gettitle}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="tx">
                <div class="nav">
                    <ul v-if="code == 1">
                        <li
                            v-for="(item,index) in navlistteach"
                            :key="index"
                            @click="change(item.path)"
                            :class="(item.path).slice(0,10) === ($route.path).slice(0,10) ?'activ': ''"
                        >{{item.name}}</li>
                    </ul>
                    <ul v-if="code == 0">
                        <li
                            v-for="(item,index) in navliststds"
                            :key="index"
                            @click="change(item.path)"
                            :class="(item.path).slice(0,10) === ($route.path).slice(0,10) ?'activ': ''"
                        >{{item.name}}</li>
                    </ul>
                </div>
                <div class="content">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 我的空间
import { mapState } from 'vuex'
export default {
    name: 'space',
    data() {
        return {
            code: '',
            navlistteach: [
                {
                    name: '实践课堂',
                    path: '/space/classroom'
                },
                {
                    name: '作品管理',
                    path: '/space/agment'
                },
                {
                    name: '作品评分',
                    path: '/space/wscoring'
                },
                {
                    name: '学生管理',
                    path: '/space/mgtudent'
                },
                {
                    name: '基本资料',
                    path: '/space/bsinfor'
                },
                {
                    name: '头像设置',
                    path: '/space/avatar'
                },
                {
                    name: '账号安全',
                    path: '/space/accountsecurity'
                }
            ],
            navliststds: [
                {
                    name: '我的课程',
                    path: '/space/mycourse'
                },
                {
                    name: '我的作品',
                    path: '/space/mywork'
                },
                {
                    name: '自我评价',
                    path: '/space/selfevaluation'
                },
                {
                    name: '评价他人',
                    path: '/space/evaluatingothers'
                },
                {
                    name: '档案袋',
                    path: '/space/archives'
                },
                {
                    name: '基本资料',
                    path: '/space/bsinfor'
                },
                {
                    name: '头像设置',
                    path: '/space/avatar'
                },
                {
                    name: '账号安全',
                    path: '/space/accountsecurity'
                }
            ]
        }
    },
    created() {
        this.code = this.$store.state.login.identity
    },
    computed: {
        isok() {
            return this.$store.state.test.isok
        },
        gettitle() {
            return this.$store.state.test.title
        },
        ...mapState('dict', {
            subject: state => (state.subject || {}).dicList || [],
            auditStatus: state => (state.examineStatus || {}).dicList || [],
            lockStatus: state => (state.lockStatus || {}).dicList || []
        })
    },
    methods: {
        change(url) {
            this.$router.push({
                path: url
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.community {
    min-height: 630px;
    .tonav {
        width: 100%;
        height: 74px;
        line-height: 74px;
        font-size: 14px;
        color: #666666;
        .el-breadcrumb {
            width: 100%;
            height: 74px;
            line-height: 74px;
            font-size: 14px;
            color: #666666;
        }
    }
    .nav {
        float: left;
        height: 100%;
        overflow: hidden;
        ul {
            width: 200px;
            background: #fff;
            padding: 36px 0;
            overflow: hidden;
            box-sizing: border-box;
            li {
                width: 100%;
                height: 56px;
                padding: 0 60px;
                text-align: center;
                line-height: 56px;
                font-size: 18px;
                color: #666;
                cursor: pointer;
                box-sizing: border-box;
                border-left: 4px solid transparent;
                text-align: justify;
                text-justify: distribute-all-lines; /*ie6-8*/
                text-align-last: justify; /* ie9*/
                -moz-text-align-last: justify; /*ff*/
                -webkit-text-align-last: justify; /*chrome 20+*/
                &:after {
                    content: "";
                    display: inline-block;
                    width: 100%;
                }
            }
        }
    }
    .content {
        background: #fff;
        margin-left: 14px;
        width: 986px;
        float: left;
        height: 100%;
    }
}
.tx {
    height: 100%;
    overflow: hidden;
    position: relative;
    .zhezao {
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.5;
        position: absolute;
    }
    .zhezao_c {
        background: #fff;
        width: 690px;
        height: 234px;
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        margin: auto;
        .zhezao_m {
            width: 100%;
            height: 35px;
            line-height: 35px;
            text-align: center;
            font-size: 16px;
            color: #fff;
            background-color: rgba(2, 167, 240, 1);
        }
    }
}
.activ {
    background: #f2f2f2;
    color: #008aff !important;
    border-left: 4px solid #008aff !important;
}
.center_s {
    margin-top: 20px;
    width: 100%;
    height: 30px;
    text-align: center;
    span {
        display: inline-block;
        width: 60px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 12px;
        color: #333;
        cursor: pointer;
    }
}
</style>
