
<template>
    <div class="wrapper">
        <!-- 头部 -->
        <header class="header table-layout">
            <h1 class="logo table-cell">
                <a :href="page.index.url">
                    <img src="~@assets/image/logo14.png" class="logo-img" />
                    <!-- <span class="logo-txt">社会实践大课堂平台</span> -->
                </a>
            </h1>
            <span class="user-name-box table-cel">{{userInfo.userName}}</span>
            <user-avatar class="table-cell" />
        </header>

        <div class="main-box">
            <!-- 左侧导航 -->
            <el-menu
                ref="menu"
                class="aside"
                text-color="#fff"
                :router="true"
                :default-active="defaultActiveMenu"
                :background-color="$style.navBg"
                :active-text-color="$style.navActiveText"
                :unique-opened="true"
            >
                <template v-for="item in nav">
                    <el-menu-item
                        class="is-level-1"
                        v-if="item.url"
                        :index="item.url"
                        :key="item.id"
                    >
                        <i :class="['el-icon-tickets', `icon-icon_${item.menuId}`]"></i>
                        <span>{{ item.name}}</span>
                    </el-menu-item>
                    <el-submenu v-else :index="item.id" :key="item.id">
                        <div class="is-level-1" slot="title">
                            <span
                                class="icon-icon_tongji-fenxi"
                                style="fontSize:18px;"
                                v-if="item.menuId=='tongji-fenxi'"
                            >
                                <span class="path1"></span>
                                <span class="path2"></span>
                                <span class="path3"></span>
                                <span class="path4"></span>
                                <span class="path5"></span>
                                <span class="path6"></span>
                            </span>

                            <i :class="['el-icon-tickets', `icon-icon_${item.menuId}`]" v-else></i>
                            <span>{{ item.name}}</span>
                        </div>
                        <el-menu-item
                            v-for="child in item.children"
                            :index="child.url"
                            :class="{ 'is-active': breadcrumb.some(x => x.url === child.url) }"
                            :key="child.id"
                        >
                            <i class="el-icon-"></i>
                            <span>{{ child.name}}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
            </el-menu>

            <!-- 主体内容 -->
            <div class="content-box">
                <el-breadcrumb
                    v-show="breadcrumb.length"
                    class="breadcrumb"
                    separator-class="el-icon-arrow-right"
                >
                    <el-breadcrumb-item
                        v-for="item in breadcrumb"
                        :to="{ path: item.url }"
                        :key="item.id"
                    >{{ item.name }}</el-breadcrumb-item>
                </el-breadcrumb>
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'App',
    //     mounted(){
    //     function checkIE(){
    //       return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
    //     }
    //     if (checkIE()) {
    //       window.addEventListener('hashchange', () => {
    //         var currentPath = window.location.hash.slice(1);
    //         if (this.$route.path !== currentPath) {
    //         this.$router.push(currentPath)
    //       }
    //     }, false)
    //     }
    //   },
    data() {
        return {
            defaultActiveMenu: '',
            // 面包屑
            breadcrumb: []
        }
    },
    computed: {
        ...mapState({
            // 用户信息
            userInfo: state => state.login.userInfo || {},
            // 全部菜单权限
            nav: state =>
                ((state.login.permission || [])[0] || {}).children || []
        }),
        permission() {
            const __obj = this.flatten(this.nav, 'id', 'children')
            return (
                (__obj &&
                    Object.values(__obj).map(x => {
                        const item = Object.assign({}, x)
                        delete item.children
                        return item
                    })) ||
                []
            )
        }
    },
    components: {
        'user-avatar': resolve =>
            require(['@/components/common/admin-head-img'], resolve)
    },
    created() {
        if (this.$cookies.get('token')) {
            this.getPermission({ identity: 5 })
        }
    },
    watch: {
        identity: {
            handler: function (identity) {
                if (
                    identity !== 'admin' ||
                    identity !== 'education' ||
                    identity !== 'school'
                ) {
                    window.location.href = this.page.index.url
                }
            }
        },
        '$route.path': {
            handler: function (params) {
                this.changeRoute()
            },
            immediate: true
        }
        // permission: 'changeRoute'
    },
    methods: {
        ...mapActions('login', ['getPermission']),

        getSubNav(items) {
            const curItem = items[0]
            const subItem = this.permission.find(x => x.id === curItem.pid)
            subItem && items.unshift(subItem)

            const flag = curItem && curItem.pid && subItem
            return flag ? this.getSubNav(items) : items
        },

        changeRoute() {
            const path = this.$route.path
            const lastItem = this.permission.find(x => x.url === path)
            const breadcrumb = lastItem ? this.getSubNav([lastItem]) : []

            this.defaultActiveMenu = breadcrumb.reduce((str, item) => {
                if (item.url) {
                    str = item.url
                }
                return str
            }, '')

            this.breadcrumb = breadcrumb
        }
    }
}
</script>

<style>
html,
body {
    height: 100% !important;
}
</style>

<style lang='scss' module>
@import "~@/assets/css/base/utils.scss";
$--nav-active-text: $--color-primary;

:export {
    navBg: $--admin-nav-bg;
    navActiveText: $--nav-active-text;
}
</style>

<style lang='scss' scoped>
@import "~@/assets/css/base/base-variables.scss";
@import "~@/assets/css/base/utils.scss";
.user-name-box {
    color: #fff;
    position: absolute;
    height: 40px;
    line-height: 40px;
    top: 50%;
    right: 70px;
    margin-top: -20px;
    font-size: 16px;
}
$--user-info-height: 60px;

.wrapper,
.content-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    flex: 1;
}

.main-box {
    display: flex;
    flex: 1;
}

.header {
    position: relative;
    width: 100%;
    height: $--header-height;
    line-height: $--header-height;
    background-color: #212121;

    .logo {
        padding-left: 56px;
        font-size: 20px;

        &-img {
            width: 170px;
            vertical-align: middle;
        }
        &-txt {
            display: inline-block;
            padding-left: 20px;
            margin-left: 20px;
            border-left: 1px solid #fff;
            line-height: 1;
            color: #fff;
        }
    }
}

.aside {
    width: $--admin-nav-width;
    background-color: #2e3951;
    overflow: auto;

    .is-level-1 {
        font-size: 16px;
    }

    .el-menu-item.is-active {
        color: $--color-primary !important;
    }
}

.content-box {
    flex: 1;
    padding: 0 $--box-margin;
    box-sizing: border-box;
    overflow: auto;

    .breadcrumb {
        margin: #{$--box-padding} 0 0;
        white-space: nowrap;
    }
}
</style>
