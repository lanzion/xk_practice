<template>
  <div class="myactivities">
    <ul>
      <!-- <li
        v-for="(item,index) in list"
        :class="item.path == $route.path ? 'active' :''"
        :key="index"
        @click="change(item.path)"
      >
        <el-badge :value="item.num+'场'" :max="99" class="item">{{item.name}}</el-badge>
      </li>-->

      <li
        :class="'/space/myactivities/schoolactivity' == $route.path ? 'active' :''"
        @click="changeone()"
      >
        <el-badge :value="datas.activityCount+'场'" :max="99" class="item">学校组织的活动</el-badge>
      </li>

      <li
        :class="'/space/myactivities/registrationactivities' == $route.path ? 'active' :''"
        @click="changetwo()"
      >
        <el-badge :value="datas.openActivityCount+'场'" :max="99" class="item">我的报名活动</el-badge>
      </li>

      <div class="fr">
        <el-select @change="changestudentStatus()" v-model="status" placeholder="活动状态" clearable>
          <el-option
            v-for="item in studentStatus"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          ></el-option>
        </el-select>
      </div>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import { studentStatus } from "@/utils/utility/dict.js";
import { requestwebapiActivityNum } from "@/api/webApi/space";
export default {
  props: {},
  data() {
    return {
      studentStatus: studentStatus,
      datas: {},
      // list: [
      //   {
      //     name: "学校组织的活动",
      //     path: "/space/myactivities/schoolactivity",
      //     num: ""
      //   },
      //   {
      //     name: "我的报名活动",
      //     path: "/space/myactivities/registrationactivities",
      //     num: ""
      //   }
      // ],
      status: ""
    };
  },
  computed: {},
  created() {
    this.$store.commit("changetitle", "我的活动");
    this.getlists();
  },
  mounted() {},
  watch: {},
  methods: {
    async getlists() {
      const res = await requestwebapiActivityNum();
      const { appendInfo: datas = {} } = res.data;
      try {
        this.datas = datas || {};
        console.log(this.datas);
      } catch (error) {
        this.datas = {};
      } finally {
        this.isLoading = false;
      }
    },
    changestudentStatus() {
      this.$store.commit("changestudentStatus", this.status);
    },
    changeone() {
      this.$router.push({
        path: "/space/myactivities/schoolactivity"
      });
    },
    changetwo() {
      this.$router.push({
        path: "/space/myactivities/registrationactivities"
      });
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
