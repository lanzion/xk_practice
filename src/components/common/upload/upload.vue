<template>
    <div class="upload-list--wrap">
        <component :is="component" v-bind="$props" v-on="$listeners" :uploadList="uploadList" :select="clickFileInput" :upload="submit" :remove="removeHandler">
            <slot></slot>
        </component>
        <input ref="uploader" id="file" class="upload-action--input" type="file" :disabled="disabled" :accept="accept" @change="changeHandler" @click="checkLimit">
    </div>
</template>

<script>
import aliUpload from '@/mixin/ali-upload'
import baiduUpload from '@/mixin/baidu-upload'

function noop() {}

export default {
    name: 'upload',
    mixins: [aliUpload, baiduUpload],
    components: {
        'upload-file': resolve => require(['./upload-file'], resolve),
        'upload-picture': resolve => require(['./upload-picture'], resolve)
    },
    data() {
        return {
            /**
             * @desc 上传的文件列表
             * @param {string} name: 文件名
             * @param {string} url: 文件地址
             * @param {object} file: 文件
             * @param {number} percentage: 上传进度
             */
            uploadList: []
        }
    },
    computed: {
        component: function () {
            return `upload-${this.listType}`
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
        // 文件列表项(图片)盒子宽度
        width: {
            type: String,
            default: 'auto'
        },
        // 文件列表项(图片)盒子高度
        height: {
            type: String,
            default: 'auto'
        },
        // 文件是否可被覆盖(当limit为1时起效)
        isCovered: {
            type: Boolean,
            default: false
        },
        accept: String,
        /**
         * @desc 是否文件预览
         * @value [boolean] true: 上传到百度文档
         */
        isFilePrev: false
    },
    watch: {
        fileList: {
            handler(val) {
                this.uploadList = val.map((x, i) => {
                    const url = x.url
                    const __name = x.uploadName || x.name
                    let status = 'exception'

                    if (url) {
                        const name = __name.substr(__name.lastIndexOf('/') + 1) || i
                        const isVideo = !!(
                            x.isVideo ||
                            x.aliVideoId && x.url.split('aliVideoId=')[1]
                        )

                        status = 'success'
                        x.url = url.split('?')[0]
                        x.isVideo = isVideo
                        x.name = this.formatFileName(name)

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
        if (this.listType === 'file') {
            this.initVideoUploader()
        }
        if (this.isFilePrev) {
            this.initBosUploader()
        }
    },
    beforeDestroy() {
        this.fileList.forEach((x, i) => {
            if (x.status !== 'success') {
                this.removeHandler(i, x)
            }
        })
    },
    methods: {
        // 过滤出百度文档支持类型文件
        // doc, docx, ppt, pptx, xls, xlsx, vsd, pot, pps, rtf, wps, et, dps, pdf, txt, epub
        filterFileType(fileName) {
            const docTypeGroup = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'vsd', 'pot', 'pps', 'rtf', 'wps', 'et', 'dps', 'pdf', 'txt', 'epub']
            const suffixName = fileName.split('.').pop()

            return docTypeGroup.includes(suffixName)
        },
        bosUploadStart() {
            this.bosUploader.start()
            return false
        },
        // 点击选择文件
        clickFileInput() {
            this.$refs.uploader.click()
        },
        // 点击文件按钮检测文件数是否超过最大允许上传个数
        checkLimit() {
            if (this.limit === 1 && this.isCovered) {
                this.fileList.forEach((x, i) => {
                    this.removeHandler(i, x)
                })
            } else if (this.limit && this.uploadList.length >= this.limit) {
                event.preventDefault()
                if (this.onExceed) {
                    this.onExceed({ fileList: this.uploadList })
                } else {
                    this.$message({
                        message: `最多只能上传 ${
                            this.limit
                        } 个文件，请先删除其他文件`,
                        type: 'error'
                    })
                }
                return
            }
        },
        // 选择文件值改变
        changeHandler(event) {
            const file = event.target.files[0]
            if (!file) {
                return
            }
            // 上传前回调函数检测文件
            if (
                this.beforeUpload &&
                !this.beforeUpload({ file, fileList: this.uploadList })
            ) {
                return
            }

            file.status = 'ready'

            // 读取并存储文件内容
            const reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.addEventListener(
                'loadend',
                () => {
                    const _file = {
                        processed: reader.result,
                        option: {
                            type: file.type,
                            lastModified: file.lastModified
                        }
                    }
                    const fileType = file.type.split('/')[0]
                    const isVideo = fileType === 'video'
                    const uploadName = `${this.$cookies.get(
                        'uid'
                    )}-${new Date().getTime()}__${file.name}`
                    let fileItem = {
                        name: file.name,
                        size: file.size,
                        file: file,
                        status: 'ready',
                        uploadName: uploadName,
                        isVideo
                    }
                    if (this.isFilePrev && !isVideo) {
                        // 判断文件类型能否预览
                        const flag = true

                        if (this.filterFileType(file.name)) {
                            fileItem = Object.assign({}, fileItem, {
                                isFilePrev: flag
                            })
                        }
                    }
                    this.uploadList.push(fileItem)

                    if (this.autoUpload) {
                        this.upload(fileItem)
                    }
                    this.change({ file: fileItem, fileList: this.uploadList })
                    this.$refs.uploader.value = ''
                },
                { once: true }
            )
        },
        // 删除列表文件
        removeHandler(index, item) {
            this.uploadList.splice(index, 1)
            this.change({ file: item, fileList: this.uploadList })
            this.onRemove({ file: item, fileList: this.uploadList })
            if (
                (item.url && item.url.includes(this.ossConfig.endpoint)) ||
                item.isVideo
            ) {
                this.remove(item)
            }
        },
        clear() {},
        // 提交上传
        submit() {
            this.uploadList.forEach(file => {
                if (file.file) {
                    this.upload(file)
                }
            })
        },
        // 上传
        upload(file) {
            file.status = 'uploading'

            let _file = file

            const fileType = Object.prototype.toString.call(file.file)
            // if (fileType !== '[object File]') {
            //     const { processed, option } = file.file
            //     _file = new File([processed], file.uploadName, option)
            //     file.file = _file
            // }

            if (file.isVideo) {
                this.uploadVideo(file.file)
                this.videoUploader.startUpload()
            } else if (file.isFilePrev) {
                this.bosUploadStart()
            } else {
                this.uploadFile(file)
            }
        },
        change({ file, fileList } = {}) {
            this.onChange({ file, fileList })
            this.$emit('update:fileList', fileList)
        }
    }
}
</script>

<style lang="scss" scoped>
    .upload-action--input {
        display: none;
    }
</style>
