<template>
  <div class="newgrounds">
    <baseinfo :operation="false"></baseinfo>
  </div>
</template>
<script>
import baseInfo from './children/baseInfo'
export default {
  name: "newgrounds",
  components: {
    'baseinfo':baseInfo
  },
  data() {

    return {
     
    };
  },
  watch: {},
  methods: {
    
  },
  created() {
  }
};
</script>
<style lang="scss" scoped>

</style>
