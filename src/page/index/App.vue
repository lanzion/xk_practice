<template>
  <div class="wrap">
    <!-- 头部 -->
    <router-view name="header" :active="activeNav" />
    <!-- 主体内容 -->
    <router-view />
    <!-- 尾部 -->
    <router-view name="footer" />
    <!-- 侧边工具栏 -->
    <router-view name="sidetool" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'App',
    // mounted(){
    //   function checkIE(){
    //     return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
    //   }
    //   if (checkIE()) {
    //     window.addEventListener('hashchange', () => {
    //       var currentPath = window.location.hash.slice(1);
    //       if (this.$route.path !== currentPath) {
    //       this.$router.push(currentPath)
    //     }
    //   }, false)
    //   }
    // },
    data() {
        return {}
    },
    computed: {
        ...mapState({
            // 身份字典
            identities: state => (state.dict.identity || {}).dicList || [],
            // 用户信息
            userInfo: state => state.login.userInfo
        })
    },
    created() {
        window.location.href = window.page.my.url
    },
    methods: {
        activeNav(item) {
            return (
                item.url.includes('#/') &&
        this.$route.path.startsWith(`/${item.url.split('#/')[1].split('/')[0]}`)
            )
        }
    }
}
</script>

<style lang='scss' scoped>
</style>
