<template>
  <div class="classroom">
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
              v-model="teacherworkname"
              @change="getworks"
              data-v-89dd130e
              type="text"
              placeholder="请输入课程名称或班级名称"
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
    name: 'classroom',
    data() {
        return {
            teacherworkname: '',
            lists: [
                {
                    name: '未开始',
                    path: '/space/classroom/abtd'
                },
                {
                    name: '进行中',
                    path: '/space/classroom/giss'
                },
                {
                    name: '已完成',
                    path: '/space/classroom/ptba'
                },
                {
                    name: '待评价',
                    path: '/space/classroom/teacherstobeevaluated'
                }
            ]
        }
    },
    methods: {
        change(url) {
            this.$router.push({ path: url })
        },
        getworks() {
            this.$store.commit('teacherworkname', this.teacherworkname)
        }
    }
}
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
  color: #008aff !important;
}
</style>
