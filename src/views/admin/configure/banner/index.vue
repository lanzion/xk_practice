<template>
  <div class="backend-content__middle">
    <section class="option-box clearfix">
      <button
        type="button"
        class="fl bs-handle-button i-form-button is-plain"
        v-for="(btn, index) in bannerTypes"
        :class="{active: curType==index}"
        :key="index"
        @click="changeBannerType(index)"
      >{{btn.name}}</button>
      <ali-upload
        class="fl"
        list-type="file"
        :show-file-list="false"
        :before-upload="beforeUploadFile"
        :on-change="uploadFile"
      ></ali-upload>
    </section>
    <transition-group
      class="banner-list clearfix"
      v-if="items.length"
      name="banner-item"
      tag="ul"
      mode="out-in"
    >
      <!-- <ul class="banner-list clearfix"> -->
      <li class="banner-item" v-for="(item, index) in items" :key="item.id">
        <section class="banner-item-detail">
          <template v-if="item.bannerType==bannerTypes[curType].type">
            <el-input
              class="banner-item-sort"
              size="mini"
              placeholder="序号"
              v-model.number="item.sort"
              @keyup.enter.native="updateBanner(item)"
            ></el-input>
            <i class="banner-item-handle i-success-bg"></i>
            <i class="banner-item-handle el-icon-check"></i>
          </template>
          <i class="banner-item-handle el-icon-circle-close" @click="delBanner(item, index)"></i>
          <img class="banner-img" :src="getFileUrl(item.imageUrl)" @click="setRelation(item)" />
          <el-input
            placeholder="请输入链接地址"
            v-model="item.url"
            @keyup.enter.native="updateBanner(item)"
          >
            <template slot="prepend">
              <a class="banner-link" :href="item.url" target="_blank">URL地址</a>
            </template>
          </el-input>
        </section>
      </li>
      <!-- </ul> -->
    </transition-group>
  </div>
</template>

<script>
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import {
  requestSystemBanner,
  addBanner,
  delBanner,
  addBannerRelation,
  delBannerRelation,
  updateBannerSort
} from "@/service/admin_system.js";
import dataTranslation from "@/assets/js/dataTranslation.js";
import aliUpload from "@/components/common/upload.vue";
export default {
  name: "bannerManage",
  mixins: [uploadFileSize],
  components: {
    "ali-upload": aliUpload
  },
  data() {
    return {
      curType: 0,
      bannerTypes: [
        { type: 1, name: "首页" },
        { type: 2, name: "实践作品" },
        { type: 3, name: "基地/机构" },
        { type: 4, name: "参与学校" },
        { type: 5, name: "通知公告" }
      ],
      items: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 切换banner图类型
    changeBannerType(index) {
      this.curType = index;
      this.getData();
    },
    /*
     * 获取Banner列表
     * bannerType: Banner类型
     */
    getData() {
      let _curType = this.bannerTypes[this.curType].type;
      requestSystemBanner({ bannerType: _curType }).then(response => {
        if (response.data.code == 200) {
          this.items = response.data.appendInfo.list;
        }
      });
    },
    /*
     * 设置Banner关系
     * 添加Banner关系：bannerType - Banner类型, bannerFileId - 图片ID, sort - 排序序号
     * 删除Banner关系：id - 关系ID
     */
    setRelation(item) {
      let _sort = item.sort ? item.sort : 0,
        _curType = this.bannerTypes[this.curType].type,
        flag = item.bannerType == null,
        handler = flag ? addBannerRelation : delBannerRelation,
        params = flag
          ? {
              bannerType: _curType,
              bannerFileId: item.bannerFileId,
              sort: _sort
            }
          : { id: item.id };

      handler(params).then(response => {
        if (response.data.code == 200) {
          this.$message({
            message: `${flag ? "绑定" : "解绑"}成功`,
            type: "success"
          });
          this.getData();
        } else {
          this.$message.error(response.data.msg || "操作失败");
        }
      });
    },
    /*
     * 删除Banner图
     * bannerFileId: 图片ID
     */
    delBanner(item, index) {
      let _id = item.bannerFileId;
      delBanner({ bannerFileId: _id }).then(response => {
        if (response.data.code == 200) {
          this.items.splice(index, 1);
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },
    updateBanner(item) {
      updateBannerSort({ id: item.id, sort: item.sort, url: item.url }).then(
        response => {
          if (response.data.code == 200) {
            this.$message({ message: "修改成功", type: "success" });
          } else {
            this.$message.error(response.data.msg);
          }
        }
      );
    },
    uploadFile({ file } = {}) {
      if (file.url) {
        addBanner({ imageUrl: file.url }).then(response => {
          this.$message({ message: "上传成功", type: "success" });
          this.getData();
        });
      }
    }
  }
};
</script>

<style lang="scss">
.backend-content__middle {
    margin-top: 20px;
  .banner-item {
    .banner-item-sort {
      .el-input__inner {
        text-align: center;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
// 过渡动画
.banner-item-enter,
.banner-item-leave-active {
  opacity: 0;
  transform: translate(0);
}
.banner-item-enter {
  transform: scale(0.1);
}
.banner-item-leave-active {
  position: absolute;
}

.backend-content__middle {
  .i-form-button {
    height: 30px;
    line-height: 30px;
    margin: 0 10px 5px 0;
    border-color: #008aff;
    color:#008aff;
    & + .i-form-button {
      margin-left: 0;
    }

    &.btn-upload {
      margin-left: 10px;
    }
  }
  $banner-margin: 10px;
  .banner-list {
    margin-left: -$banner-margin;
    margin-top: 20px;

    .banner-item {
      float: left;
      width: 25%;
      padding: 0 0 $banner-margin $banner-margin;
      box-sizing: border-box;
      transition: opacity 0.8s, transform 0.8s;
      cursor: pointer;

      .banner-item-detail {
        position: relative;
        border-radius: 5px 5px 0 0;
        overflow: hidden;
      }

      .banner-img {
        width: 100%;
        height: 150px;
        margin-bottom: -1px;
        cursor: pointer;
      }

      .banner-link {
        color: #ccc;
      }

      &:hover {
        .banner-item-handle {
          &.i-success-bg,
          &.el-icon-check {
            display: none;
          }
          &.icon-btn-close2 {
            display: inline-block;
          }
        }
      }

      $item-content-padding: 6px;
      .banner-item-sort {
        position: absolute;
        top: $item-content-padding;
        left: $item-content-padding;
        width: 4em;
      }

      $triangle-height: 30px;
      $triangle-width: 40px;
      .banner-item-handle {
        position: absolute;
        top: 0;
        right: 0;
        color: #fff;
        line-height: $triangle-width / 2;
        // text-indent: - $triangle-height / 2;

        &.el-icon-check {
          right: $item-content-padding;
          z-index: 10000;
        }

        &.el-icon-circle-close {
          display: block;
          width: $triangle-width / 2;
          height: $triangle-width / 2;
          text-align: center;
          transition: color 0.3s ease;

          &:hover {
            color: #666;
          }
        }
      }

      .i-success-bg {
        width: 0;
        height: 0;
        border-top: 30px solid #13ce66;
        border-left: $triangle-width solid transparent;
        z-index: 10000;
      }
    }
  }
}
.active{
    background: #008aff;
    color:#fff !important;
}
</style>
