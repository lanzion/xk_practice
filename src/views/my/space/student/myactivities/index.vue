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
      <div class="fr">
        <el-select v-model="value" placeholder="活动状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
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
          name: "学校组织的活动",
          path: "/space/myactivities/schoolactivity"
        },
        {
          name: "我的报名活动",
          path: "/space/myactivities/registrationactivities"
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
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
      console.log(this.$route.path);
      this.$router.push({
        path: url
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.myactivities {
  width: 980px;
  ul {
    width: 100%;
    height: 44px;
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
    .active {
      color: #ffffff;
      background-color: #42a6fe;
      border-radius: 4px 4px 0px 0px;
    }
  }
}
</style>
