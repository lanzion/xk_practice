<template>
  <div class="newgrounds">
    <baseserveinfo :operation="true"></baseserveinfo>
  </div>
</template>
<script>
import baseserveinfo from './addSetvice';
export default {
  name: "newgrounds",
  components:{
    baseserveinfo:baseserveinfo
  },
  
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  created() {
  }
};
</script>
<style lang="scss" scoped>

</style>
