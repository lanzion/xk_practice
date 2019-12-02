<template>
    <div class="home">
        <swriper :type="numimg" class="swriper" />
        <div class="container">
            <statistics class="statistics" />
            <curriculumcenter />
            <!-- <baseguide /> -->
            <!-- <newactivities class="newactivities" />
            <baseguide />
            <latestworks />-->
            <!-- <mapvue @selectLocation="selectLocation" /> -->
            <!-- <mapvue /> -->
        </div>
        <!-- <aside class="aside g-bg--white fl">
      <aside-menu :datas="permiss" />
        </aside>-->
    </div>
</template>
<script>
export default {
    name: 'index',
    data() {
        return {
            numimg: '1'
        }
    },
    components: {
        swriper: resolve =>
            require(['@/components/my/swriper/swriper'], resolve),
        curriculumcenter: resolve =>
            require([
                '@/views/my/home/curriculumcenter/curriculumcenter'
            ], resolve),
        // newactivities: resolve =>
        //     require(['@/views/my/home/newActivities/newActivities'], resolve),
        // baseguide: resolve =>
        //     require(['@/views/my/home/baseguide/baseguide'], resolve),
        // latestworks: resolve =>
        //     require(['@/views/my/home/latestworks/latestworks'], resolve),
        statistics: resolve =>
            require(['@/views/my/home/statistics/statistics'], resolve)
        // mapvue: resolve => require(['@/views/my/home/mapvue/mapvue'], resolve)
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {
        // selectLocation(location) {
        //     console.log(location)
        //     console.log(parseFloat(location.lng))
        //     console.log(parseFloat(location.lat))
        // }
    }
}
</script>
<style lang="scss" scoped>
.swriper {
    margin-bottom: 180px;
}
.container {
    position: relative;
    .statistics {
        position: absolute;
        top: -230px;
        z-index: 10;
    }
    .newactivities {
        // margin-top: 200px;
    }
}
</style>
