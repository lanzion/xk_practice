<template>
    <container>
        <login-form class="m-content--form" />
    </container>
</template>

<script>
export default {
    components: {
        'container': resolve => require(['@/components/index/common/container'], resolve),
        'login-form': resolve => require(['@/components/index/account/login-form'], resolve)
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/module/login.scss';
</style>
