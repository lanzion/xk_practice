<template>
  <div class="avatar-wrap" :style="{'height':height}">
    <div class="avatar-box">
      <default-image class="g-cover--item" :src="user.face" />
    </div>
    <div class="avatar_name">
      <span>{{ user.userName }}</span>
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
        if (url.indexOf('my.html') > 0) this.height = '68px'
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base/utils.scss";
@import "~@/assets/css/mixin/core.scss";

.avatar-wrap {
  position: relative;
  // width: 80px;
  line-height: 68px;
  height: $--header-height;
  color: $--color-text-primary;
  cursor: pointer;
  display: block;
  float: right;
  z-index: 1000;
  &:hover {
    // background-color: $--color-primary;

    .menu-list--wrap {
      display: block;
    }
  }

  .avatar-box {
    $avatar-size: 30px;
    @include avatar($avatar-size);
    margin-right: 10px;
    // margin: 0 auto;
    // overflow: hidden;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    display: inline-block;
    font-size: 16px;
    line-height: 68px;
    vertical-align: middle;
    img {
      border-radius: 50%;
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
.avatar_name {
  // width: 45px;
  // height: 68px;
  // position: relative;
  color: #333333;
  font-size: 14px;
  vertical-align: middle;
  // right: -30px;
  display: inline-block;
  span {
    // position: absolute;
    // width: 140px;
    // top: 50%;
    // transform: translate(0, -50%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
