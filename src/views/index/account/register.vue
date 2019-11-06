<template>
  <div class="conent">
    <div class="headerone">
      <h2>
        <!-- <img class="logo" src="~@/assets/image/logo-white.svg"> -->
        <!-- <span class="title">社会实践大课堂</span> -->
        基地/机构注册
      </h2>
      <!-- <router-link class="link table-cell" to="/login">登录</router-link> -->
      <el-steps :active="active" align-center finish-status="success">
        <el-step title="填写注册信息"></el-step>
        <el-step title="信息认证"></el-step>
        <el-step title="注册完成" description></el-step>
      </el-steps>
    </div>
    <!-- <div class="m-content--box">
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
    </div>-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    components: {
    // "teacher-form": resolve =>
    //   require(["@/components/index/account/teacher-form"], resolve),
    // "student-form": resolve =>
    //   require(["@/components/index/account/student-form"], resolve)
    },
    data() {
        return {
            //   tabs: [
            //     { name: "teacher", label: "教师", component: "teacher-form" },
            //     { name: "student", label: "学生", component: "student-form" }
            //   ],
            //   active: "teacher",
            //   component: "teacher-form"
        }
    },
    computed: {
        active() {
            return this.$store.state.test.active
        }
    },
    methods: {
        changeTab(item) {
            this.active = item.name
            this.component = item.component
        },
        next() {
            if (this.active++ > 2) this.active = 0
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/base/utils.scss";
@import "~@/assets/css/mixin/core.scss";
@import "~@/assets/css/module/login.scss";

.headerone {
  background: #fff;
  padding: 0 100px 50px 100px;
  box-sizing: border-box;
  h2 {
    width: 100%;
    height: 120px;
    line-height: 120px;
    text-align: center;
    color: #000000;
    font-size: 32px;
    margin-bottom: 20px;
  }
  /deep/ .is-wait .el-step__icon {
    color: #000;
    border-color: #000;
  }
  /deep/ .el-step__title.is-wait{
    font-weight: bold;
    color: #000;
  }
}
.conent {
  width: 1200px;
  overflow: hidden;
  margin: 0 auto;
  background: #fff;
  padding-bottom: 100px;
}
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
