<template>
    <div class="diyt">
        <swriper :type="numimg" />
        <div class="container">
            <newactivities />
            <baseguide />
            <latestworks />
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
            numimg: '1',
        }
    },
    components: {
        swriper: resolve =>
            require(['@/components/my/swriper/swriper'], resolve),
        newactivities: resolve =>
            require(['@/views/my/home/newActivities/newActivities'], resolve),
        baseguide: resolve =>
            require(['@/views/my/home/baseguide/baseguide'], resolve),
        latestworks: resolve =>
            require(['@/views/my/home/latestworks/latestworks'], resolve)
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {}
}
</script>
<style lang="scss" scoped>
// .diyt {
//     font-size: 50px;
// }
// $aside-width: 200px;
// $aside-margin: 20px;
// .aside {
//     width: $aside-width;
//     margin-right: $aside-margin;
// }
// .tolower {
//     position: fixed;
//     bottom: 50px;
//     left: 125px;
//     width: 170px;
//     height: 391px;
//     overflow: hidden;
//     z-index: 1000;
//     ul {
//         width: 100%;
//         height: 100%;
//         overflow: hidden;
//         li {
//             width: 100%;
//             margin-top: 23px;
//             height: 30px;
//             line-height: 30px;
//             font-size: 20px;
//             font-weight: normal;
//             color: #5b490c;
//             text-align: center;
//             cursor: pointer;
//             &:nth-child(1) {
//                 margin-top: 168px;
//             }
//         }
//     }
// }
// .guang {
//     position: fixed;
//     left: 80px;
//     bottom: 170px;
//     width: 180px;
//     a {
//         display: block;
//         img {
//             display: block;
//             width: 100%;
//         }
//     }
//     .sol {
//         font-size: 14px;
//         padding: 2px 6px;
//         background: rgba(0, 0, 0, 0.6);
//         position: absolute;
//         top: 0;
//         right: 0;
//         color: #fafafa;
//         cursor: pointer;
//         border-radius: 2px 0 0 2px;
//     }
// }
</style>
