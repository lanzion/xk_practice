<template>
  <div class="information">
    <information-info :orgType="'c'"></information-info>
  </div>
</template>

<script>
import informationInfo from "@/components/admin/information/informationInfo";
export default {
  components: {
    "information-info": informationInfo
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.g-form--wrap {
  max-width: 1000px;
}
.wangEditor-container .wangEditor-txt {
  height: 200px !important;
}
</style>