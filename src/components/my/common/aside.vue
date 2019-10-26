<template>
    <ul class="aside-list--wrap" :style="{backgroundImage:'url('+groundimg+')'}">
        <li class="aside-group--box" v-for="(group, g) in datas" :key="g">
            <router-link class="aside-item--box" v-for="(item, index) in group" :to="item.url" :key="index">
                <span class="name">{{ item.name }}</span>
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'aside-menu',
    data() {
        return {
            groundimg: require('../../../../static/img/daohang.png')
        }
    },
    props: {
        datas: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/base-variables.scss';

    .aside-list--wrap {
        position: fixed;
        bottom: 50px;
        left: 180px;
        // padding-bottom: 20px;
        width: 170px;
        height: 391px;
    }

    .aside-group--box {
         margin-top: 160px;
        & + .aside-group--box {
            &::before {
                content: '';
                display: block;
                width: 160px;
                height: 1px;
                margin: 15px auto;
                margin-top: 30px;
                background-color: $--border-color-base;
            }
        }

        $menu-item-height: 50px;
        $menu-item-active-height: 30px;
        .aside-item--box {
            display: block;
            padding: #{($menu-item-height - $menu-item-active-height) / 2} 0;
            color: #5b490c;
            &:nth-child(2){
                margin-top: 2px;
            }
            &:nth-child(3){
                margin-top: 3px;
            }
            &:nth-child(4){
                margin-top: 3px;
            }

            &:hover {
                // background-color: $--color-primary;
                color: #008aff;
            }

            &.is-nactive {
                background-color: transparent;
                color: $--color-primary;

                .name {
                    border-color: $--color-primary;
                    font-size: 32px;
                    color: #5b490c;
                }
            }

            .name {
                display: block;
                height: $menu-item-active-height;
                line-height: $menu-item-active-height;
                padding-left: 32px;
                border-left: 4px solid transparent;
                font-size: 18px;
            }
        }
    }
</style>
