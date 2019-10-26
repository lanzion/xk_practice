<template>
  <div class="wrap">
    <!-- 头部 -->
    <g-header theme="light" />
    <!-- 主体内容 -->
    <!-- <div class="container clearfix"> -->
    <!-- 左侧导航 -->
    <!-- <aside class="aside g-bg--white fl">
                <aside-menu :datas="permiss" />
    </aside>-->

    <router-view />

    <!-- 尾部 -->
    <g-footer />
    <!-- 侧边工具栏 -->
    <side-tools />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    name: 'App',
    mounted() {
        function checkIE() {
            return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
        }
        if (checkIE()) {
            window.addEventListener('hashchange', () => {
                var currentPath = window.location.hash.slice(1)
                if (this.$route.path !== currentPath) {
                    this.$router.push(currentPath)
                }
            }, false)
        }
    },
    data() {
        return {
            permiss: [],
            // 面包屑
            breadcrumb: []
        }
    },
    components: {
        'g-header': resolve =>
            require(['@/components/index/common/header'], resolve),
        'g-footer': resolve =>
            require(['@/components/index/common/footer'], resolve),
        'side-tools': resolve =>
            require(['@/components/common/side-tools'], resolve),
        'aside-menu': resolve => require(['@/components/my/common/aside'], resolve)
    },
    computed: {
        istrue() {
            return this.$store.state.test.istrue
        },
        ...mapGetters('login', {
            identity: 'identityCode'
        }),
        ...mapState('login', {
            // 用户信息
            user: state => state.userInfo || {},
            permission: state => state.permission || {}
        })
    },
    watch: {
    // 'user.id': {
    //     handler: function (id) {
    //         if (!id) {
    //             this.redirectCallback(this.page.login.url)
    //         }
    //     },
    //     immediate: true
    // },
        identity: {
            handler: function (identity) {
                if (identity) {
                    this.permiss = Object.values(this.permission[identity] || {})
                    console.log('左侧导航数据：', this.permiss)
                }
            },
            immediate: true
        },
    // $route: {
    //   handler: function(val, oldval) {
        
    //   },
    //   deep: true
    // }
    },
    created() {
    },
    methods: {}
}
</script>

<style lang='scss' scoped>
@import "~@/assets/css/base/utils.scss";
* {
  margin: 0;
  padding: 0;
}
.wrap {
  padding-top: $--header-height + $--box-margin;
  background-color: $--wrap-bg;
  padding-top:68px;
}

.container {
  padding-bottom: 100px;
  margin-top: 100px;
  background: #f8f8f8;
}

$aside-width: 200px;
$aside-margin: 20px;
.aside {
  width: $aside-width;
  margin-right: $aside-margin;
}

.content {
  width: 1200 - $aside-width - $aside-margin;
}
</style>
