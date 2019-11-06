<template>
  <div class="m-page--wrap">
    <div class="m-content--wrap container">
      <header class="m-header--wrap table-layout">
        <!-- <h1 class="table-cell">
          <img class="logo" src="~@/assets/image/logo-white.svg" />
          <span class="title">社会实践大课堂</span>
        </h1>-->
        <router-link class="link table-cell" to="/login">登录</router-link>
      </header>
      <div class="m-content--box">
        <section class="m-content--form">
          <el-row tag="ul" class="m-tab--wrap">
            <el-col
              tag="li"
              v-for="(item, index) in tabs"
              class="m-tab--item"
              :class="{ 'is-active': item.name === active }"
              @click.native="changeTab(item)"
              :span="24 / tabs.length"
              :key="index"
            >{{ item.label }}</el-col>
          </el-row>
          <component :is="component"></component>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    components: {
        'teacher-form': resolve =>
            require(['@/components/index/account/teacher-form'], resolve),
        'student-form': resolve =>
            require(['@/components/index/account/student-form'], resolve)
    },
    data() {
        return {
            tabs: [
                { name: 'teacher', label: '教师', component: 'teacher-form' },
                { name: 'student', label: '学生', component: 'student-form' }
            ],
            active: 'teacher',
            component: 'teacher-form'
        }
    },
    methods: {
        changeTab(item) {
            this.active = item.name
            this.component = item.component
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base/utils.scss";
@import "~@/assets/css/mixin/core.scss";
@import "~@/assets/css/module/login.scss";

.m-tab {
  &--wrap {
    margin-bottom: 30px;
    border-bottom: $--border-default;
    font-size: 24px;
    text-align: center;
  }

  &--item {
    $active-border-width: 4px;
    padding-bottom: 20px - $active-border-width;
    border-bottom: $active-border-width solid transparent;
    cursor: pointer;

    &.is-active {
      color: $--color-primary;
      border-color: $--color-primary;
    }
  }
}

.m-page--wrap {
  padding-bottom: 164px;
}

.m-content {
  &--form {
    width: 400px;
    padding: 72px 0;
    margin: 0 auto;
  }
}
</style>
