<template>
  <div class="mywork">
    <div class="classroom_h">
      <ul>
        <li
          v-for="(item,index) in lists"
          :key="index"
          v-text="item.name"
          @click="change(item.path)"
          :class="item.path === $route.path ? 'active': ''"
        ></li>
        <div class="search-wrap fl tab-search" :style="{'marginTop':'10px','marginRight':'14px'}">
          <section data-v-89dd130e class="search clearfix">
            <input
              data-v-89dd130e
              type="text"
              @change="changelists"
              v-model="listname"
              placeholder="请输入作品名称"
              class="search-text"
            />
            <div data-v-89dd130e class="el-icon-search icon-search"></div>
          </section>
        </div>
      </ul>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "mywork",
  data() {
    return {
      listname: "",
      lists: [
        {
          name: "上传作品",
          path: "/mywork/uploadworks"
        },
        {
          name: "待审核",
          path: "/mywork/beaudited"
        },
        {
          name: "已通过",
          path: "/mywork/adopteder"
        }
      ]
    };
  },
  created() {
    this.$store.commit("changetitle", "我的作品");
  },
  methods: {
    change(url) {
      this.$router.push({ path: url });
    },
    changelists() {
       this.$store.commit('changelist',this.listname)
    }
  }
};
</script>
<style lang="scss" scoped>
.classroom_h {
  border-bottom: 2px solid #eaeaea;
  ul {
    height: 60px;
    li {
      float: left;
      width: 70px;
      height: 100%;
      font-size: 18px;
      color: #666;
      margin-left: 38px;
      line-height: 60px;
      text-align: center;
      cursor: pointer;
      &:nth-child(1) {
        width: 80px;
      }
    }
  }
}
.fl {
  float: right;
}
.search {
  position: relative;
  display: inline-block;
  width: 226px;
  height: 40px;
  box-sizing: border-box;
  font-size: 14px;
}
.search .search-text[data-v-89dd130e] {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 40px;
  text-indent: 20px;
  box-sizing: border-box;
  vertical-align: top;
}
.search .el-icon-search[data-v-89dd130e] {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  font-size: 20px;
  text-align: center;
  color: #ccc;
  cursor: pointer;
}
input::placeholder {
  font-size: 14px;
  color: #cccccc;
}
.active {
  border-bottom: 2px solid #008aff;
  color: #008aff!important;
}
</style>
