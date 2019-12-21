<template>
    <div class="avatar-wrap" :style="{'height':height}">
        <div class="avatar-box">
            <div class="avatar_img">
                <default-image class="g-cover--item" :src="user.face" />
            </div>
            <span class="user-name-box table-cel">{{user.userName}}</span>
        </div>
        <ul class="menu-list--wrap">
            <li class="menu-item" v-for="(item, index) in menu" :key="index">
                <a class="menu-link" :href="item.url">{{ item.name }}</a>
            </li>
            <li class="menu-item is-divided" @click="doLogout">
                <span class="menu-link">退出</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: {
        menu: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            height: '70px'
        }
    },
    computed: {
        ...mapState('login', {
            user: state => state.userInfo || {}
        })
    },
    methods: {
        ...mapActions('login', ['logout']),

        doLogout() {
            this.logout()
            window.location.href = this.page.my.url
        }
    },
    created() {
        let url = location.href
        if (url.indexOf('my.html') > 0) this.height = '98px'
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/base/utils.scss';
@import '~@/assets/css/mixin/core.scss';

.avatar-wrap {
    position: relative;
    // width: 80px;
    // height: $--header-height;
    color: $--color-text-primary;
    cursor: pointer;
    display: block;
    float: right;
    z-index: 1000;
    margin-right: 82px;
    &:hover {
        // background-color: $--color-primary;

        .menu-list--wrap {
            display: block;
            position: absolute;
            top: 70px;
            right: 0;
        }
    }

    .avatar-box {
        position: relative;
        .avatar_img {
            $avatar-size: 30px;
            @include avatar($avatar-size);
            margin-right: 10px;
            display: inline-block;
            font-size: 16px;
            line-height: 68px;
            vertical-align: middle;
        }
        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            // display: inline-block;
            // vertical-align: middle;
        }
    }
}

.menu-list--wrap {
    display: none;
    position: absolute;
    top: 100%;
    right: -50px;
    width: 180px;
    font-size: 16px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 1;

    .menu-item {
        line-height: 40px;
        cursor: pointer;

        &.is-divided {
            border-top: $--border-default;
        }

        &:hover {
            .menu-link {
                background-color: $--color-primary;
                color: #fff;
            }
        }
    }

    .menu-link {
        display: block;
    }
}
</style>
