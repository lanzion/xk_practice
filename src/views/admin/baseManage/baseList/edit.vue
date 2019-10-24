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
