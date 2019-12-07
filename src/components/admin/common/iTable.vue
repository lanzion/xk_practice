<template>
  <div>
    <el-table
      :data="data"
      :show-header="showHeader"
      :border="border"
      :max-height="maxHeight"
      :v-loading="loading"
      :class="className"
      stripe
      fit
      highlight-current-row
      tooltip-effect="dark"
      style="width: 100%"
    >
      <!-- // 使用template 顺序不乱 -->
      <template v-for="(colConfig) in colConfigs">
        <!-- // slot 添加自定义配置项 -->
        <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
        <!-- // component 特殊处理某一项 -->
        <component v-else-if="colConfig.component" :is="colConfig.component" :col-config="colConfig"></component>
        <el-table-column v-else v-bind="colConfig" align="center" :show-overflow-tooltip="true"></el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "iTable",
  props: {
    colConfigs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: [String, Number],
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ""
    }
  }
};
</script>
 
<style scoped>
</style>