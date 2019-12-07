<template>
    <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/activity' }">活动中心</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/activity/activityregistration' }">活动报名</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'activityregistrationdetail',
    data() {
        return {}
    },
    created() {},
    methods: {}
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
}
</style>
