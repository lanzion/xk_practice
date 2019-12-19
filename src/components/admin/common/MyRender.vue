<template>
  <div ref='renderContent' :class="classTxt">

  </div>
</template>

<script>
export default {
    props:{
        row: Object,
        render:'',
        classTxt:''
    },
    mounted(){
        this.$refs.renderContent.innerHTML = this.render
    }
}
</script>

<style>

</style>