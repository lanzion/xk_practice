<template>
  <div class="list">
    <div class="nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          :index="index.toString()"
          v-for="(item,index) in intellectSortActivityNav"
          :key="index"
        >{{item.name}}</el-menu-item>
      </el-menu>
    </div>
    <component :is="isComponents"></component>
  </div>
</template>

<script>
import allActive from "./allActive";
export default {
  components: {
    allActive,
  },
  data() {
    return {
      activeIndex: "0",
      intellectSortActivityNav: [
        {
          name: "全部活动",
          components: "allActive"
        },
        {
          name: "基地/机构活动表",
          components: "allActive"
        },
        {
          name: "课程活动表",
          components: "allActive"
        },
        {
          name: "带队教师活动表",
          components: "allActive"
        },
        {
          name: "班级活动表",
          components: "allActive"
        },
        {
          name: "学生活动表",
          components: "allActive"
        }
      ],
    };
  },
  computed:{
      isComponents(){
          return this.intellectSortActivityNav[new Number(this.activeIndex)].components
      }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.activeIndex = key
    }
  }
};
</script>

<style lang="scss" scoped>
.list{
    .nav{
        padding-top: 20px;
    }
}
</style>