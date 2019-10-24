<template>
  <div class="submit-form backend-content__middle" style="padding-top:50px;">
      <school-info></school-info>
  </div>
</template>

<script>
import schoolInfo from "./children/schoolInfo";
export default {
  name: "schoolAdd",
  components: {
    "school-info": schoolInfo
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {}
};
</script>
<style lang="scss" scoped>
.el-input-number {
  display: inline-block;
  width: 100%;
  position: relative;
  line-height: normal;
  vertical-align: top;
}
.el-input-number__decrease {
  right: 37px;
}
.el-input-number__decrease,
.el-input-number__increase {
  height: auto;
  border-left: 1px solid #dfdfdf;
  width: 36px;
  line-height: 30px;
  top: 1px;
  text-align: center;
  color: #ccc;
  cursor: pointer;
  position: absolute;
  z-index: 1;
}
</style>
