<template>
  <div class="information">
    <information-info :orgType="'B'"></information-info>
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
</style>