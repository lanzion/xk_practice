/**
 * @desc 百度文档上传
 */
function noop() {}

export default {
    data() {
        return {
            uploadList: [],
            docSupportFormat: ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'vsd', 'pot', 'pps', 'rtf', 'wps', 'et', 'dps', 'pdf', 'txt', 'epub'], // 文档支持类型
            docConfig: {
                DOC_ENDPOINT: 'https://doc.bj.baidubce.com',
                AK: 'd7b1f2b8ccdb4395873b21829a8f6843',
                SK: 'faef261d28dd4f3eb7c3e970bb1c08ad',
                BOS_ENDPOINT: 'http://bj.bcebos.com',
                BOS_BUCKET: 'maker-doc',
                DOC: null
            },
            bosUploader: null
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
        }
    },
    methods: {
        // 过滤出文档类型文件
        filterFileType(fileName) {
            const suffixName = fileName.split('.').pop()
            return this.docSupportFormat.includes(suffixName)
        },
        // 百度文档类文件上传
        // 使用文档：https://github.com/leeight/bce-bos-uploader
        getDocKey(file) {
            // source/doc-gdxink1qakahwu6k.txt
            var format = file.name.split('.').pop()
            var name = (Math.random() * Math.pow(2, 32)).toString(36)
            var object = 'source/doc-' + name + '.' + format

            file.__object = object
            file.__target = 'doc'

            return {
                bucket: this.docConfig.BOS_BUCKET,
                key: file.__object
            }
        },
        initBosUploader() {
            console.log('百度文档上传实例初始化')
            const _this = this
            this.docConfig.DOC = new baidubce.sdk.DocClient.Document({
                endpoint: this.docConfig.DOC_ENDPOINT,
                credentials: {ak: this.docConfig.AK, sk: this.docConfig.SK}
            })
            this.bosUploader = new baidubce.bos.Uploader({
                browse_button: '#file',
                multi_selection: false,
                bos_bucket: _this.docConfig.BOS_BUCKET,
                bos_endpoint: _this.docConfig.BOS_ENDPOINT,
                bos_ak: _this.docConfig.AK,
                bos_sk: _this.docConfig.SK,
                auto_start: false,
                max_retries: 2,
                bos_task_parallel: 1,
                max_file_size: '100m',
                bos_multipart_min_size: '10m',
                bos_multipart_parallel: 1,
                chunk_size: '1m',
                dir_selection: false,
                init: {
                    FilesFilter: function (_, files) {
                        // 添加更多的过滤规则，比如文件大小之类的
                        if (_this.filterFileType(files[0].name)) {
                            return files
                        } else {
                            return []
                        }
                    },
                    UploadProgress: function (_, file, progress, event) {
                        _this.$set(_this.uploadList[0], 'percentage', Math.floor(progress * 100))
                    },
                    Key: function (_, file) {
                        return _this.getDocKey(file)
                    },
                    FileUploaded: function (_, file, info) {
                        _this.docConfig.DOC.createFromBos(_this.docConfig.BOS_BUCKET, file.__object, file.name).then(function (response) {
                            _this.fileList[0].url = `${_this.docConfig.BOS_ENDPOINT}/${_this.docConfig.BOS_BUCKET}/${info.body.object}`
                            _this.uploadList[0].status = 'success'
                            _this.fileList[0].baiduDocId = response.body.documentId
                        })['catch'](function (error) {
                            console.log(error)
                            _this.$message({ type: 'error', message: '上传文档出错了' })
                        })
                    },
                    Error: function (_, error, file) {
                        _this.$message({ type: 'error', message: '上传文档出错了' })
                        console.log(error)
                    }
                }
            })
        }
    }
}
