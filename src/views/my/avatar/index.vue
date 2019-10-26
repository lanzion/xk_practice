<template>
  <div>
    <div class="titlego">
      <h4>头像设置</h4>
    </div>
    <section class="avatar-setting--wrap m-form--wrap">
      <div class="btn-group--wrap clearfix">
        <el-button class="fl" type="primary" plain @click="select">选取文件</el-button>
        <input
          ref="uploader"
          id="file"
          class="upload-action--input"
          type="file"
          :accept="pictureAccept"
          @change="changeFile"
        />
        <p class="fl tip">图片大小不能超过{{ size }}M，支持格式为：{{ imageSupportFormat.join(' / ') }}</p>
      </div>
      <dl class="setting-hint--wrap">
        <dd class="title">调整照片</dd>
        <dt class="content">拖拽照片，调整至合适的位置；滑动滚轮，缩放至合适的尺寸</dt>
      </dl>
      <div class="avatar-setting--box table-layout">
        <div class="avatar-cropper--wrap table-cell">
          <!-- 截图框 -->
          <cropper
            ref="cropper"
            class="isn-canmovebox avatar-item"
            height="100%"
            :img.sync="face"
            :autoCrop="true"
            :autoCropWidth="300"
            :autoCropHeight="300"
            :canMoveBox="false"
            @crop="previewImage"
            @success="submit"
          />
          <div class="face-item" :class="{ 'has-avatar': face }">
            <default-image class="g-cover--item" :src="cover" alt />
          </div>
        </div>
        <div class="avatar-preview--wrap table-cell">
          <p class="tip">---------------您上传的图片将自动生成三种尺寸的头像---------------</p>
          <ul>
            <li
              class="avatar-preview--item g-cover--wrap"
              :class="`preview-item--${size}`"
              v-for="(size, index) in ['large','medium','small']"
              :key="index"
            >
            <default-image class="avatar-item g-cover--item" :src="preview" alt />
              <!-- <img class="avatar-item g-cover--item" :src="preview" :style="style" /> -->
              <!-- <el-image :src="preview" :style="style" style="width: 188px;height:188px">
                <div style="font-size: 30px;line-height: 180px;text-align: center;color:#ccc;">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image> -->
            </li>
          </ul>
        </div>
      </div>
      <div class="m-operate--box">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="uploadPicture">保存</el-button>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { updateAvatar } from '@/api/account'

import { upload } from '@/mixin/common'

export default {
    mixins: [upload],
    data() {
        return {
            face: '',
            preview: '', // 预览图
            style: {}, // 预览图样式
            size: 2 // 图片限制大小, 单位M
        }
    },
    computed: {
        ...mapState('login', {
            cover: state => (state.userInfo || {}).face || null
        }),
        pictureAccept: function () {
            return this.imageSupportFormat.map(type => `.${type}`).join(',')
        }
    },
    watch: {
        cover: {
            handler: function (cover) {
                this.preview = cover
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        ...mapMutations('login', {
            saveAvatar: 'SAVE_USERINFOPARAM'
        }),

        previewImage(item) {
            if (item.url) {
                this.preview = item.url
                this.style = item.style
            }
        },

        select() {
            this.$refs.uploader.click()
        },

        // 选择文件值改变
        changeFile(event) {
            const file = event.target.files[0]

            if (this.size && file.size > this.size * 1024 * 1024) {
                this.$message({
                    message: `图片大小不能超过${this.size}M`,
                    type: 'warning'
                })
                return
            }

            this.$refs.cropper.changeFile(file)
        },

        uploadPicture() {
            this.$refs.cropper.upload('avatar')
        },

        // 图片上传成功
        submit(file) {
            let that = this
            const face = file.url
            updateAvatar({ face }).then(res => {
                const { code, msg } = res.data
                if (code === 200) {
                    this.saveAvatar({ key: 'face', val: file.url })
                    this.$store.state.login.userInfo.face = face
                    this.$message({
                        message: '保存成功',
                        type: 'success',
                        onClose() {
                            // that.$router.push({path:'/bsinfor'});
                        }
                    })
                } else {
                    this.$message({
                        message: msg,
                        type: 'warning'
                    })
                }
            })
        },

        cancel() {
            this.face = ''
            this.preview = this.cover
            this.style = {}
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin/core.scss";
@import "~@/assets/css/module/my-module-form.scss";

$avatar-setting-size: 300px;
$avatar-between-margin: 30px;
.titlego {
  width: 100%;
  height: 75px;
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
  h4 {
    font-size: 18px;
    font-size: #333;
    height: 100%;
    line-height: 75px;
    text-indent: 45px;
  }
}
.avatar-setting--wrap {
  padding-left: 46px;
  padding-right: 46px;
}
.btn-group--wrap {
  .upload-action--input {
    display: none;
  }
  .tip {
    margin-left: 20px;
    line-height: 32px;
    color: $--color-text-regular;
  }
}
.setting-hint--wrap {
  margin: 43px 0 18px;
  font-size: 14px;
  color: $--color-text-regular;

  .title,
  .content {
    display: inline;
  }
  .content {
    margin-left: 4px;
    font-size: 12px;
    color: #3e3e3e;
  }
}
.avatar-setting--box {
  width: auto;
}
.avatar-item {
  height: 100%;
  background: #f2f2f2;
}
.avatar-cropper--wrap {
  position: relative;
  width: $avatar-setting-size;
  height: $avatar-setting-size;
  vertical-align: bottom;

  .face-item {
    @include avatar($size: 100%, $border-radius: 0);
    position: absolute;
    top: 0;

    &.has-avatar {
      z-index: -1;
    }
  }
}
.avatar-preview--wrap {
  text-align: center;
  vertical-align: bottom;

  .tip {
    margin-bottom: 75px;
    color: $--color-text-regular;
    text-indent: $avatar-between-margin;
  }
}
.avatar-preview--item {
  display: inline-block;
  margin-left: $avatar-between-margin;
  background-color: #f2f2f2;
  @include avatar($size: 100%, $border-radius: 0);
}
$preview-item-size: (
  large: 180px,
  medium: 140px,
  small: 50px
);
.preview-item {
  @each $size, $value in $preview-item-size {
    &--#{$size} {
      width: $value;
      height: $value;
      .avatar-item {
        zoom: $value / $avatar-setting-size;
      }
    }
  }
}
</style>
