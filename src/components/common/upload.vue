<template>
    <div class="upload-list" :class="[listType ? 'upload-list--' + listType : '']">
        <div class="btn-group">
            <template v-if="listType === 'file'">
                <!-- 文件上传按钮 -->
                <label class="g-button is-inseparable" :class="{ 'is-disabled': disabled }" @click="clickFileInput">选取文件</label>
                <label class="g-button is-plain is-inseparable" v-if="!autoUpload" @click="submit">上传文件</label>
            </template>
            <slot name="trigger"></slot>
        </div>
        <slot name="tip"></slot>
        <!-- 文件列表 -->
        <ul class="upload-list-item clearfix" v-if="showFileList">
            <li class="upload-item" v-for="(item, index) in uploadList" :class="[`is-${item.status}`]" :key="index">
                <span class="upload-item-name" v-if="listType === 'file'">
                    <i class="el-icon-document"></i>
                    {{item.name}}
                </span>
                <img class="upload-item-img" :src="getFileUrl(item.url)" v-else>
                <i class="upload-item-percentage">{{item.percentage}}%</i>
                <i class="upload-item-status">
                    <slot name="status" v-bind="{ file: item, index }"></slot>
                    <i class="upload-item-icon" :class="[icon[listType][item.status]]"></i>
                </i>
                <div class="upload-item-action" :class="{ 'table-layout': listType === 'picture' }" v-if="!disabled">
                    <div :class="{ 'table-cell': listType === 'picture' }">
                        <slot name="action" v-bind="{ file: item, index }"></slot>
                        <i class="upload-item-action-button el-icon-close" @click="removeHandler(index, item)"></i>
                    </div>
                </div>
                <!-- <el-progress v-if="listType === 'file' || (item.status !== 'success' && item.status !== 'exception')" class="upload-item-progress" :type="listType === 'file' ? 'line' : 'circle'" :percentage.sync="item.percentage" :stroke-width="2" :show-text="false" :status="item.status"></el-progress> -->
            </li>
            <!-- 图片上传按钮 -->
            <li class="upload-item upload-item-picture" v-if="!disabled && listType === 'picture' && (!limit || uploadList.length < limit)">
                <label class="upload-action" @click="clickFileInput">
                    <i class="btn-group el-icon-plus"></i>
                </label>
            </li>
        </ul>
        <slot></slot>
        <input ref="uploader" class="uploader-input" type="file" :disabled="disabled" :accept="accept" @change="changeHandler" @click="checkLimit" />
    </div>
</template>

<script>
    import co from 'co'
    import OSS from 'ali-oss'

    function noop() {}

    export default {
        name: 'ali-upload',
        data() {
            return {
                ossConfig: {
                    endpoint: 'http://oss.xk100.com',
                    region: 'oss-cn-shenzhen',
                    accessKeyId: 'LTAIrKoK00opmL49',
                    accessKeySecret: '3ug7PFSKr4SJ02vSKOAQtr7jVtr45O',
                    bucket: 'xk100-com-maker',
                    cname: true
                },
                client: null,
                /**
                 * @desc 上传的文件列表
                 * @param {string} name: 文件名
                 * @param {string} url: 文件地址
                 * @param {object} file: 文件
                 * @param {number} percentage: 上传进度
                 */
                uploadList: [],
                icon: {
                    file: {
                        success: 'el-icon-circle-check',
                        exception: 'el-icon-circle-close'
                    },
                    picture: {
                        success: 'el-icon-check',
                        exception: 'el-icon-close'
                    }
                }
            }
        },
        props: {
            /**
             * @desc 文件上传成功时的钩子
             * @param {object} response
             * @param {object} file
             * @param {array} fileList
             */
            onSuccess: {
                type: Function,
                default: noop
            },
            /**
             * @desc 文件上传失败时的钩子
             * @param {object | string} error
             * @param {object} file
             * @param {array} fileList
             */
            onError: {
                type: Function,
                default: noop
            },
            /**
             * @desc 文件列表移除文件时的钩子
             * @param {object} file
             * @param {array} fileList
             */
            onRemove: {
                type: Function,
                default: noop
            },
            /**
             * @desc 文件状态改变时的钩子，添加文件、删除文件、上传成功和上传失败时都会被调用
             * @param {object} file
             * @param {array} fileList
             */
            onChange: {
                type: Function,
                default: noop
            },
            /**
             * @desc 文件超出个数限制时的钩子
             * @param {array} fileList
             */
            onExceed: Function,
            /**
             * @desc 上传文件之前的钩子，参数为上传的文件，若返回 false 则不上传
             * @param {object} file
             * @param {array} fileList
             */
            beforeUpload: Function,
            // 上传的文件列表
            fileList: {
                type: Array,
                default() {
                    return []
                }
            },
            /**
             * @desc 文件列表的类型
             * @value 'picture' 图片列表
             * @value 'file' 文件列表
             */
            listType: {
                type: String,
                default: 'picture'
            },
            /**
             * @desc 最大允许上传个数
             * @value 0 不限
             */
            limit: {
                type: Number,
                default: 0
            },
            // 是否自动上传
            autoUpload: {
                type: Boolean,
                default: true
            },
            // 上传目录
            dir: {
                type: String,
                default: ''
            },
            // 上传时附带的额外参数
            datas: {
                type: Object,
                default() {
                    return {}
                }
            },
            // 是否禁用
            disabled: {
                type: Boolean,
                default: false
            },
            // 是否显示已上传文件列表
            showFileList: {
                type: Boolean,
                default: true
            },
            accept: String
        },
        watch: {
            fileList: {
                handler(val) {
                    this.uploadList = val.map((x, i) => {
                        const url = x.url
                        let status = 'exception'

                        if (url) {
                            const name = url.substr(url.lastIndexOf('/') + 1) || i
                            status = 'success'
                            x.name = this.formatFileName(name)
                            x.url = url.split('?')[0]
                            if (url.includes(this.ossConfig.endpoint)) {
                                x.uploadName = name
                            }
                        }
                        x.status = x.status || status
                        return x
                    })
                },
                immediate: true
            }
        },
        mounted() {
            const client = new OSS(this.ossConfig)
            this.client = client
        },
        methods: {
            clickFileInput() {
                if (this.disabled) {
                    return
                }
                this.$refs.uploader.click()
            },
            // 点击文件按钮检测文件数是否超过最大允许上传个数
            checkLimit() {
                if (this.limit && this.uploadList.length >= this.limit) {
                    event.preventDefault()
                    if (this.onExceed) {
                        this.onExceed({ fileList: this.uploadList })
                    } else {
                        this.$message({
                            message: `最多只能上传 ${this.limit} 个文件，请先删除其他文件`,
                            type: 'error'
                        })
                    }
                    return
                }
            },
            // 选择文件值改变
            changeHandler(event) {
                let _this = this;
                const file = event.target.files[0]
                if (!file) {
                    return
                }
                // 上传前回调函数检测文件
                if (_this.beforeUpload && !_this.beforeUpload({ file, fileList: _this.uploadList })) {
                    return
                }

                file.status = 'ready'

                // 读取并存储文件内容
                const reader = new FileReader()
                reader.readAsArrayBuffer(file)
                reader.addEventListener('loadend', () => {
                    const _file = {
                        processed: reader.result,
                        option: {
                            type: file.type,
                            lastModified: file.lastModified
                        }
                    }
                    const uploadName = `${_this.$cookies.get('uid')}-${new Date().getTime()}__${file.name}`
                    const fileItem = { name: file.name, size: file.size, file: file, status: 'ready', uploadName: uploadName }
                    _this.uploadList.push(fileItem)

                    if (_this.autoUpload) {
                        _this.upload(fileItem)
                    }
                    _this.change({ file: fileItem, fileList: _this.uploadList })
                    _this.$refs.uploader.value = ''
                }, { once: true })
            },
            // 删除列表文件
            removeHandler(index, item) {
                this.uploadList.splice(index, 1)
                this.change({ file: item, fileList: this.uploadList })
                this.onRemove({ file: item, fileList: this.uploadList })
                if (item.url && item.url.includes(this.ossConfig.endpoint)) {
                    this.remove(item)
                }
            },
            // 提交上传
            submit() {
                if (this.disabled) {
                    return
                }
                this.uploadList.forEach(file => {
                    if (file.file) {
                        this.upload(file)
                    }
                })
            },
            // 上传文件
            upload(file) {
                file.status = 'uploading'

                const _this = this
                let _file = file
                console.log(1,file.file);
                console.log(1,file);

                const fileType = Object.prototype.toString.call(file.file)
                // if (fileType !== '[object File]') {
                //     const { processed, option } = file.file
                //     _file = new File([processed], file.uploadName, option)
                // }
                co(function* () {
                    const result = yield _this.client.multipartUpload(_this.dir + file.uploadName, file.file, {
                        progress: function* (p) {
                            // 记录进度
                            _this.$set(file, 'percentage', Math.floor(p * 100))
                        },
                        ..._this.datas
                    })

                    if (result.res.status === 200 && result.res.statusCode === 200) {
                        file.url = result.res.requestUrls[0]
                        file.status = 'success'
                        delete file.percentage
                        delete file.file
                        _this.change({ file, fileList: _this.uploadList })
                        _this.onSuccess({ response: result, file, fileList: _this.uploadList })
                    } else {
                        file.status = 'exception'
                        _this.change({ file, fileList: _this.uploadList })
                        _this.onError({ error: result, file, fileList: _this.uploadList })
                    }
                }).catch(function (err) {
                    file.status = 'exception'
                    _this.change({ file, fileList: _this.uploadList })
                    _this.onError({ error: err, file, fileList: _this.uploadList })
                    console.log(err)
                })
            },
            // 删除文件
            remove(file) {
                const _this = this
                // 取消分片上传
                if (file.status === 'uploading') {
                    this.client.cancel()
                }
                // 取消分片上传
                co(function* () {
                    const result = yield _this.client.delete(file.uploadName)
                    // console.log(result)
                     _this.$emit('remove', file)
                }).catch(function (err) {
                    console.log(err);
                });
            },
            change({ file, fileList } = {}) {
                this.onChange({ file, fileList })
                this.$emit('update:fileList', fileList)
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/base-variables.scss';
    @import '~@/assets/css/mixin/core.scss';

    .btn-group {
        .g-button {
            & + .g-button {
                margin-left: 10px;
            }
        }
    }
    .g-button {
        display: inline-block;
        padding: 0;
        border: 1px solid;
        border-radius: 4px;
        box-sizing: border-box;
        color: #fff;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        width: 80px;
        height: 30px;
        line-height: 28px;
        background-color: #2797ed;
        border-color: #2797ed;
    }
    .upload-list {
        position: relative;

        .upload-list-tips {
            color: $--color-text-regular;
            font-size: $--font-size-small;
            line-height: 2;
        }

        &--picture .upload-item,
        .upload-item-picture,
        .upload-action {
            position: relative;
            display: inline-block;
            width: 225px;
            height: 150px;
            border-radius: $--border-radius-base;
            cursor: pointer;
            .btn-group {
                @include center;
            }
        }
        &--picture .upload-item,
        .upload-item-picture {
            border: 1px dashed $--border-color-base;
            font-size: 30px;
            color: $--color-text-statis;
            // background-color: mix($--color-primary, #fff, 6%);
            background-color: #fafafa;
            &:hover {
                border-color: $--color-primary;
            }
        }
        .uploader-input {
            display: none;
        }
        .upload-item {
            position: relative;

            .upload-item-progress {
                display: none;
                position: absolute;
            }
            .upload-item-action-button {
                cursor: pointer;
            }
            .upload-item-percentage {
                display: none;
            }

            &.is-uploading,
            &.is-exception {
                .upload-item-progress {
                    display: block;
                }
            }
        }
        &--file {

            .upload-list-item {
                margin-bottom: 10px;
            }

            .upload-item {
                $h: 24px;
                $mr: 40px;
                $pd: 4px;
                width: 100%;
                margin-bottom: 2px;
                line-height: $h;
                transition: background-color .25s;

                &:hover {
                    background-color: $--background-color-base;
                    .upload-item-action {
                        display: inline-block;
                    }
                    .upload-item-status {
                        display: none;
                    }
                }

                .upload-item-name {
                    @include text-ellipsis;
                    display: block;
                    margin-right: $mr;
                    text-indent: $pd;
                }
                .upload-item-status,
                .upload-item-percentage,
                .upload-item-action {
                    position: absolute;
                    top: 0;
                    right: $pd;
                    width: $h;
                    line-height: $h;
                    text-align: right;
                }
                .upload-item-action {
                    display: none;
                    width: auto;
                }
                .upload-item-percentage {
                    width: $mr;
                    font-size: 12px;
                    color: $--color-text-statis;
                    text-align: right;
                }
                .upload-item-progress {
                    width: 100%;
                }
                &.is-uploading {
                    .upload-item-percentage {
                        display: inline-block;
                    }
                }
                &.is-exception {
                    .upload-item-status {
                        color: $--color-status-exception;
                    }
                }
                &.is-success {
                    .upload-item-status {
                        color: $--color-status-success;
                    }
                }
            }
        }
        &--picture {
            .upload-item {
                float: left;
                margin-right: 10px;
                margin-bottom: 10px;
                overflow: hidden;


                &:hover {
                    .upload-item-action {
                        visibility: visible;
                    }
                }

                .upload-item-img {
                    width: 100%;
                    height: 100%;
                }
                .upload-item-status {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 20px;
                    height: 20px;
                    color: $--color-white;

                    &::before {
                        content: "";
                        position: absolute;
                        right: 0;
                        width: 0;
                        height: 0;
                        border-top: 30px solid transparent;
                        border-left: 30px solid transparent;
                    }
                }
                .upload-item-icon {
                    $size: 18px;
                    position: absolute;
                    display: inline-block;
                    top: 0;
                    right: 0;
                    width: $size;
                    height: $size;
                    vertical-align: top;
                    font-size: 10px;
                    line-height: $size;
                    text-align: center;
                }
                .upload-item-action {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, .2);
                    color: $--color-white;
                    text-align: center;
                    visibility: hidden;
                    cursor: default;

                    .el-icon-close {
                        $size : 22px;
                        width: $size;
                        height: $size;
                        line-height: $size;
                        border: 2px solid $--color-white;
                        border-radius: 100%;
                        vertical-align: top;
                        font-size: 12px;
                        text-align: center;
                    }
                }
                .upload-item-icon,
                // .el-icon-close {
                //     &:before {
                //     }
                // }
                .upload-item-progress {
                    @include center;
                }
                &.is-uploading {
                    .upload-item-progress {
                        display: inline-block;
                    }
                }
                &.is-exception {
                    .upload-item-status::before {
                        border-top-color: $--color-status-exception;
                    }
                }
                &.is-success {
                    .upload-item-status::before {
                        border-top-color: $--color-status-success;
                    }
                }
            }
        }
    }

</style>
