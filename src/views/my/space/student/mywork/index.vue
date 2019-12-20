<template>
  <div class="myactivities">
    <ul>
      <li
        v-for="(item,index) in list"
        :class="item.path == $route.path ? 'active' :''"
        :key="index"
        @click="change(item.path)"
      >
        <el-badge :value="`10`+'场'" :max="99" class="item">{{item.name}}</el-badge>
      </li>
      <div class="btn fr">
        <span @click="gopublishedWorks()">发表活动作品</span>
      </div>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      list: [
        {
          name: "已提交",
          path: "/space/mywork/submitted"
        },
        {
          name: "草稿",
          path: "/space/mywork/drafts"
        }
      ],
      value: ""
    };
  },
  computed: {},
  created() {
    this.$store.commit("changetitle", "我的活动");
  },
  mounted() {},
  watch: {},
  methods: {
    change(url) {
      this.$router.push({
        path: url
      });
    },
    gopublishedWorks(){
        this.$router.push({
            path:'/space/mywork/publishedWorks'
        })
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.myactivities {
  width: 978px;
  ul {
    width: 100%;
    height: 44px;
    margin-bottom: 20px;
    border-bottom: 2px solid #eaeaea;
    li {
      padding: 0 8px;
      height: 35px;
      font-size: 18px;
      float: left;
      margin-right: 50px;
      line-height: 29px;
      letter-spacing: 0px;
      color: #333333;
      text-align: center;
      line-height: 32px;
      margin-top: 9px;
      cursor: pointer;
    }
    .btn {
      margin-top: 10px;
      width: 114px;
      height: 32px;
      background-color: #42a6fe;
      border-radius: 4px;
      text-align: center;
      line-height: 32px;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
    }
    .active {
      color: #ffffff;
      background-color: #42a6fe;
      border-radius: 4px 4px 0px 0px;
    }
  }
}
</style>
