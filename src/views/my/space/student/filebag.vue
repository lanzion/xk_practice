<template>
    <div>档案袋</div>
</template>
<script>
export default {
    name:'filebag',
      data() {
    return {};
  },
  created() {
    this.$store.commit("changetitle", "档案袋");
  }
}
</script>
