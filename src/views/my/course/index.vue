<template>
  <div class="course">
    <!-- <swriper :type="imgnum" /> -->
    <div class="container">
      <courselist />
    </div>
  </div>
</template>
<script>
export default {
    name: 'course',
    data() {
        return {
            imgnum: '2'
        }
    },
    components: {
        // swriper: resolve =>
        //     require(['@/components/my/swriper/swriper'], resolve),
        courselist: resolve =>
            require(['@/views/my/course/courselist/courselist'], resolve),
    }
}
</script>
<style lang="scss" scoped>
.container {
  .el-breadcrumb {
    font-size: 14px;
    color: #666666;
    line-height: 38px;
  }
}
</style>
