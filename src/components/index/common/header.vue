<template>
  <header class="header" :class="[`header--${theme}`]">
    <div class="container">
      <div class="table-layout" :style="{'height':'68px'}">
        <!-- LOGO -->
        <h1 class="logo-wrap table-cell">
          <img class="logo" :src="logourl" alt="社会实践大课堂" />
        </h1>
        <!-- <h3 class="nametitle">社会实践大课堂</h3> -->
        <!-- 导航 -->
        <ul class="nav-list-wrap table-cell">
          <li
            class="nav-item"
            :class="{ 'is-active': active(item) }"
            v-for="(item, index) in nav"
            :key="index"
          >
            <a
              class="link-item"
              :class="item.url.slice(9) == $route.path.slice(0,item.url.length - 9) ? 'actives':''"
              :href="item.url"
            >{{ item.name }}</a>
          </li>
        </ul>
        <template v-if="user.id">
          <div class="avatar_box">
            <!-- <a href="/my.html#/message" class="icon-wrap table-cell">
            <i class="icon icon-message link-item">
              <span class="count" v-show="messageCount">{{ messageCount }}</span>
            </i>
            </a>-->
            <!-- <div class="avatar_name">
              <span>{{ user.userName }}</span>
            </div>-->
            <user-avatar class="table-cell" :menu="menu" />
          </div>
        </template>
        <!-- 链接 -->
        <ul class="user-wrap table-cell user-wrap-login" v-if="!user.id">
          <li class="user-item">
            <a class="link-item login" href="/my.html#/login">登录</a>
          </li>
          <li class="user-item">
            <a class="link-item" href="/my.html#/registertwo">注册</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { requestNavList } from '@/api/common'
// import { countMessage } from "@/api/message";

export default {
    data() {
        return {
            logourl: require('../../../../static/img/logo2-01.png'),
            logo: {
                dark: require('@/assets/image/logo-white.svg'),
                light: require('@/assets/image/logo.svg')
            },
            nav: [],
            usercode: -1,
            menu: [],
            messageCount: 0,
            timer: null,
            istrue: true,
            numNav: '0'
        }
    },
    computed: {
        ...mapState('login', {
            user: state => state.userInfo || {}
        }),
        ...mapGetters('login', {
            identity: 'identityCode'
        })
    },
    props: {
    /**
     * @desc 主题颜色
     * @value light: 白色
     * @value dark: 黑色
     */
        theme: {
            type: String,
            default: 'dark'
        },
        active: {
            type: Function,
            default() {
                return false
            }
        }
    },
    watch: {
        // '$route.meta.activeIndex': {
        //     handler(newval) {
        //         this.numNav = newval || 0
        //     },
        //     deep: true
        // },
        // "user.id": {
        //   handler: function(user) {
        //     const token = this.$cookies.get("token");
        //     // 判断用户是否登录，登录则定时获取消息提示，否则清除该定时器
        //     if (user && token) {
        //       this.timer = setInterval(this.getMessageCount(), 1000 * 60 * 5);
        //       this.istrue = false;
        //     } else {
        //       this.clearTimer();
        //     }
        //   },
        //   deep: true,
        //   immediate: true
        // },
        identity: {
            handler: function (identity) {
                this.menu =
          {
              teacher: [
              // { name: "我的授课", url: "/my.html#/course" },
              // { name: "我的教学资源 ", url: "/my.html#/resource" },
              // { name: "我的教学心得", url: "/my.html#/experience" },
              //  13: {code: 'baseInfo', name: '基地管理员'},
                  { name: '我的空间', url: '/my.html#/space' }
              ],
              student: [
              // { name: '我的评课', url: '/my.html#/course' },
                  { name: '我的空间', url: '/my.html#/space' }
              ],
              school: [{ name: '后台管理', url: '/admin.html#/' }],
              education: [{ name: '后台管理', url: '/admin.html#/' }],
              baseInfo: [{ name: '后台管理', url: '/admin.html#/' }],
              admin: [{ name: '后台管理', url: '/admin.html#/' }]
          }[identity] || []
                this.getNavDatas()
            },
            immediate: true,
            deep: true
        }
    },
    created() {
        // this.numNav = this.$route.meta.activeIndex
    },
    components: {
        'user-avatar': resolve =>
            require(['@/components/common/header-user'], resolve)
    },
    mounted() {
        this.getNavDatas()
    },
    beforeDestroy() {
        this.clearTimer()
    },
    methods: {
    // 获取导航列表
        getNavDatas() {
            requestNavList().then(res => {
                const { code, appendInfo = {} } = res.data
                // console.log("导航栏", appendInfo);
                appendInfo.list[0].children = [
                    {
                        name: '首页',
                        url: '/my.html#/index'
                    },
                    {
                        name: '课程中心',
                        url: '/my.html#/community'
                    },
                    {
                        name: '基地/机构',
                        url: '/my.html#/work'
                    },
                    {
                        name: '学校专栏',
                        url: '/my.html#/participation'
                    },
                    {
                        name: '活动中心',
                        url: '/my.html#/actioncenter'
                    },
                    {
                        name: '通知公告',
                        url: '/my.html#/activity'
                    },
                    {
                        name: '我的大课堂',
                        url: '/my.html#/space'
                    },
                ]
                if (code === 200) {
                    if (
                        this.identity !== 'baseInfo' &&
            this.identity !== 'admin' &&
            this.identity !== 'school' &&
            this.identity !== 'education'
                    ) {
                        this.nav = appendInfo.list[0].children || []
                    } else {
                        this.nav = appendInfo.list[0].children.slice(0, -1) || []
                    }
                } else {
                }
            })
        },

        // 获取消息提示
        // getMessageCount() {
        //   countMessage({ messageType: 1 }).then(res => {
        //     const { code, appendInfo: datas } = res.data;
        //     if (code === 200) {
        //       this.messageCount = Object.values(datas.systemMessage).reduce(
        //         (total, item) => {
        //           total += item;
        //           return total;
        //         },
        //         0
        //       );
        //     }
        //   });
        // },

        // 清除消息提示定时器
        clearTimer() {
            clearInterval(this.timer)
            this.timer = null
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base/utils.scss";
@import "~@/assets/css/mixin/core.scss";
.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: $--header-height;
  border-bottom: $--border-default;
  z-index: 999;
  height: 68px;

  &--light {
    background-color: #fff;
  }
  &--dark {
    background-color: #212121;
    color: #fff;

    .link-item {
      color: #fff;
    }
  }
}

.logo-wrap {
  width: 196px;
  height: 27px;
  .logo {
    width: 100%;
    height: 27px;
    line-height: 27px;
    float: left;
    vertical-align: middle;
  }
  .nametitle {
    float: right;
    width: 144px;
    height: 27px;
    line-height: 27px;
    font-family: TRENDS;
    font-size: 20px;
    font-weight: 800;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #252626;
  }
}
.container{
  height: 68px;
}
.nav-list-wrap {
  height: 68px;
  line-height: 68px;
  padding-left: 100px;
  .nav-item {
    display: inline-block;
    margin-right: 32px;
    font-size: $--nav-font-size;
    line-height: $--header-height;
    cursor: pointer;

    &:hover,
    &.is-active {
      .link-item {
        color: $--color-primary;
      }
    }
  }
  .link-item {
    display: block;
  }
}

.user-wrap {
  font-size: 0;
  text-align: right;

  .user-item {
    display: inline-block;
    font-size: 16px;
    line-height: 68px;

    & + .user-item a{
      $margin: 10px;
      padding-left: $margin;
      margin-left: $margin;
      border-left: $--border-default;
    }
  }

  .link-item {
    cursor: pointer;

    &.login {
      color: $--color-primary;
    }
  }
}

.icon-wrap {
  width: 40px;
  font-size: 20px;
  cursor: default;

  .icon {
    display: block;
    position: relative;
    width: 20px;
    cursor: pointer;
  }
  .count {
    position: absolute;
    top: -5px;
    right: -40%;
    min-width: 2em;
    height: 2em;
    padding: 0 6px;
    transform: scale(0.5);
    transform-origin: top right;
    border-radius: 50%;
    box-sizing: border-box;
    font-size: 20px;
    line-height: 2;
    text-align: center;
    color: #fff;
    background-color: $--color-secondary;
  }
}
.actives {
  color: $--color-primary;
}
// .avatar_name {
//   width: 45px;
//   height: 98px;
//   position: relative;
//   color: #333333;
//   font-size: 14px;
//   float: right;
//   span {
//     position: absolute;
//     width: 140px;
//     top: 50%;
//     transform: translate(0, -50%);
//     white-space: nowrap;
//     overflow: hidden;
//     text-overflow: ellipsis;
//   }
// }
.table-layout{
  display: inline-block;
  position: relative;
}
.avatar_box{
  position: absolute;
  height: 68px;
  top: 0;
  right: 0;
}
.user-wrap-login{
  position: absolute;
  top: 0;
  right: 0;
  height: 68px;
}
</style>
