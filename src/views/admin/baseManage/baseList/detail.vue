<template>
  <div class="newgrounds">
    <baseinfo :operation="true"></baseinfo>
  </div>
</template>
<script>
const cityOptions = ["1", "2", "3", "4", "5", "6", "7"];
import baseInfo from "./children/baseInfo";
export default {
  name: "newgrounds",
  mixins: [],
  components: {
    baseinfo: baseInfo
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
  created() {}
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #ccc;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  //   width: 178px;
  //   height: 178px;
  //   line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
