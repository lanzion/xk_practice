<template>
    <div class="upload-list--picture">
        <!-- 文件列表 -->
        <ul class="upload-list--item clearfix">
            <template v-if="showFileList">
                <li class="upload-item--box g-cover--wrap" v-for="(item, index) in uploadList" :class="[`is-${item.status}`]" :style="{ width, height }" :key="index">
                    <default-image class="upload-item--img g-cover--item" :src="getFileUrl(item.url)" alt="" />
                    <i class="upload-item--percentage">{{item.percentage}}%</i>
                    <i class="upload-item--status">
                        <slot name="status" v-bind="{ file: item, index }"></slot>
                        <i class="upload-item--icon" :class="[icon[item.status]]"></i>
                    </i>
                    <div v-if="!disabled" class="upload-item--action table-layout">
                        <div class="table-cell">
                            <slot name="action" v-bind="{ file: item, index }"></slot>
                            <i class="upload-item-action-button el-icon-close" @click="remove(index, item)"></i>
                        </div>
                    </div>
                    <el-progress
                        class="upload-item--progress"
                        type="circle"
                        :percentage.sync="item.percentage"
                        :stroke-width="2"
                        :show-text="false"
                        :status="item.status"
                    ></el-progress>
                </li>
            </template>
            <!-- 图片上传按钮 -->
            <li v-if="!disabled && (!limit || limit && uploadList.length < limit)" class="upload-item--box upload-item--picture table-layout" :style="{ width, height }">
                <label class="upload-item--action table-cell" @click="select">
                    <i class="icon icon-add"></i>
                    <span class="txt">上传图片</span>
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            icon: {
                success: 'el-icon-circle-check',
                exception: 'el-icon-circle-close'
            }
        }
    },
    props: ['width', 'height', 'limit', 'autoUpload', 'showFileList', 'uploadList', 'disabled', 'select', 'remove'],
    inheritAttrs: false
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/base/base-variables.scss';
@import '~@/assets/css/mixin/core.scss';
    .upload-list--picture {
        .upload-list--item {
            display: flex;
            justify-content: space-between;
            align-items: stretch;
        }

        .upload-item {

            &--box {
                flex: 0 0 auto;
                background-color: #f2f2f2;
            }

            &--action {
                align-self: flex-start;
                text-align: center;
                cursor: pointer;

                .icon {
                    display: block;
                    font-size: 54px;
                    color: $--color-text-statis;
                }

                .txt {
                    display: block;
                    margin-top: 25px;
                    line-height: 1;
                    color: $--color-text-secondary;
                }
            }
        }
    }
</style>
