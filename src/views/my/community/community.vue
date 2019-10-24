<template>
  <div class="diyt">
    <swriper :type="imgnum" />
    <div class="container">
      <wselect />
    </div>
  </div>
</template>
<script>
export default {
    name: 'community',
    data() {
        return {
            imgnum: '2'
        }
    },
    components: {
        swriper: resolve => require(['@/views/my/swriper/swriper'], resolve),
        wselect: resolve => require(['@/views/my/wselect/wselect'], resolve)
    }
}
</script>
<style lang="scss" scoped>
.container {
  background: #f8f8f8;
  .el-breadcrumb {
    // margin-top: 28px;
    // margin-bottom: 20px;
    font-size: 14px;
    color: #666666;
    line-height: 38px;
  }
}
</style>
