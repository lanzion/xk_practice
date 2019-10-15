<template>
    <div class="upload-list--file">
        <div class="upload-list--button">
            <!-- 文件上传按钮 -->
            <el-button type="primary" @click="select">{{ autoUpload ? '上传' : '选取文件' }}</el-button>
            <el-button v-if="!autoUpload" @click="upload">上传文件</el-button>
            <slot></slot>
        </div>
        <!-- 文件列表 -->
        <ul class="upload-list--item clearfix" v-if="showFileList">
            <li class="upload-item--box" v-for="(item, index) in uploadList" :class="[`is-${item.status}`]" :key="index">
                <h6 class="upload-item--name">{{ item.name }}</h6>
                <i class="upload-item--status">
                    {{ item.status | translate(uploadStatus) }}
                </i>
                <!-- <el-progress
                    class="upload-item--progress"
                    :percentage.sync="item.percentage"
                    :stroke-width="6"
                    :show-text="false"
                    :status="item.status"
                ></el-progress> -->
                <i class="upload-item--percentage">{{item.percentage}}%</i>
                <el-button v-if="!disabled" type="text" class="upload-item--action" @click="remove(index, item)">删除</el-button>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            icon: {
                success: 'el-icon-circle-check',
                exception: 'el-icon-circle-close'
            }
        }
    },
    computed: {
        ...mapState('dict', {
            uploadStatus: state => (state.uploadStatus || {}).dicList || []
        })
    },
    props: ['autoUpload', 'showFileList', 'uploadList', 'disabled', 'select', 'submit', 'remove'],
    inheritAttrs: false
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/base/base-variables.scss';
@import '~@/assets/css/mixin/core.scss';
.upload-list--file {

    .upload-list--item {
        margin-bottom: 10px;
    }

    .upload-item {

        &--box {
            display: flex;
            align-content: center;
            margin-bottom: 2px;
            font-size: 16px;

            &.is-exception {
                .upload-item--status {
                    color: $--color-status-exception;
                }
            }
            &.is-success {
                .upload-item--progress,
                .upload-item--percentage {
                    visibility: hidden;
                }
            }
        }

        &--name {
            flex: 1 1 auto;
            @include text-ellipsis;
        }
        &--status {
            flex: 0 0 4.5em;
            padding-left: $--box-padding;
        }
        &--progress {
            flex: 0 0 300px;
            align-self: center;
        }
        &--action {
            flex: 0 0 3em;
            font-size: inherit;
            color: $--color-text-secondary
        }
        &--percentage {
            flex: 0 0 50px;
            color: $--color-text-secondary;
            text-align: right;
        }
    }
}
</style>
