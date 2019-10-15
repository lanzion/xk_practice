<template>
    <div class="m-page--wrap has-bg">
        <div class="m-content--wrap container">
            <!-- <header class="m-header--wrap table-layout">
                <h1 class="table-cell">
                    <img class="logo" src="~@/assets/image/logo-white.svg">
                    <span class="title">社会实践大课堂</span>
                </h1>
                <slot name="header" />
            </header> -->
            <div class="m-content--box table-layout">
                <div class="m-content--img table-cell">
                    <!-- <img src="~@/assets/image/login/login-image.png"> -->
                    <div class="m-content--img_top">
                        <div class="m-content--img_top_left">
                            <img src="~@/assets/image/login/keji.png">
                        </div>
                        <div class="m-content--img_top_right">
                            <img src="~@/assets/image/login/renwen.png" style="padding-bottom: 10px;">
                            <img src="~@/assets/image/login/shengtai.png">
                        </div>
                    </div>
                    <div class="m-content--img_bottom"><img src="~@/assets/image/login/shehui.png"></div>
                </div>
                <section class="m-content--field table-cell">
                    <slot />
                </section>
            </div>
            <!-- <footer class="m-footer--wrap">粤ICP备14047309号-1</footer> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '~@/assets/css/module/login.scss';
</style>
