<template>
  <div class="goods">
    <div class="container">
      <div class="taber">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/community' }">主题活动</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/curriculum' }">实践课程</el-breadcrumb-item>
          <el-breadcrumb-item>课程详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <goodscard/>
      <tabshows/>
      <router-view/>
    </div>
  </div>
</template>
<script>
export default {
    name: 'goods',
    components: {
        'goodscard': resolve => require(['@/views/my/goods/children/goodscard'], resolve),
        'tabshows': resolve => require(['@/views/my/goods/children/tabshows'], resolve),
    }
}
</script>
<style lang="scss" scoped>
.taber{
    margin: 18px 0 ;
}
</style>
