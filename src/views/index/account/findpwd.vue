<template>
    <container>
        <router-link slot="header" class="link table-cell" to="/login">登录</router-link>
        <findpwd-form class="m-content--form" />
    </container>
</template>

<script>
export default {
    components: {
        'container': resolve => require(['@/components/index/common/container'], resolve),
        'findpwd-form': resolve => require(['@/components/index/account/findpwd-form'], resolve)
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/module/login.scss';
</style>
