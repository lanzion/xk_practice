/**
 * @desc 阿里oss上传
 */
import 'ali-oss'
import co from 'co'
import { requestAliVodTicket, requestAliVodApi } from '@/api/common.js'

function noop() {}

export default {
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
            videoUploader: null,
            uploadList: []
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
    mounted() {
        const client = new OSS(this.ossConfig)
        this.client = client
    },
    methods: {
        // 获取SecurityToken
        getAliVodTicket() {
            return requestAliVodTicket().then(response => {
                if (response.data.code === 200) {
                    const securityToken = response.data.entity
                    this.$set(this.ossConfig, 'securityToken', securityToken)
                    return securityToken
                }
                return null
            })
        },
        // 获取公共返回参数
        // action参见：https://help.aliyun.com/document_detail/60574.html?spm=5176.10609282.905295..62e57cbfDIwSGU
        getAliVodRes({ videoId, action } = {}) {
            return requestAliVodApi({ videoId: videoId, action: action }).then(
                res => {
                    if (res.data.code === 200) {
                        const data = res.data.entity
                        return JSON.parse(data)
                    }
                }
            )
        },
        // 初始化视频上传
        // https://help.aliyun.com/document_detail/52204.html?spm=a2c4g.11186623.6.796.478834f1rb5Oo2
        async initVideoUploader() {
            const _this = this
            const securityToken = await this.getAliVodTicket()
            const uploader = new AliyunUpload.Vod({
                // 分片大小默认1M，不能小于100K
                partSize: 1048576,
                // 并行上传分片个数，默认5
                parallel: 5,
                // 网络原因失败时，重新上传次数，默认为3
                retryCount: 3,
                // 网络原因失败时，重新上传间隔时间，默认为2秒
                retryDuration: 2,
                // 开始上传
                onUploadstarted: function (uploadInfo) {
                    const file = _this.findFile(uploadInfo.file)
                    Object.assign(uploadInfo, _this.ossConfig)

                    _this.$set(file, 'aliVideoId', uploadInfo.videoId)
                    _this.$set(file, 'status', 'uploading')

                    // 上传方式1, 需要根据uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress，如果videoId有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
                    // uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)
                    // 上传方式2ossConfig
                    uploader.setSTSToken(
                        uploadInfo,
                        uploadInfo.accessKeyId,
                        uploadInfo.accessKeySecret,
                        securityToken
                    )
                },
                // 文件上传成功
                onUploadSucceed: function (uploadInfo) {
                    const file = _this.findFile(uploadInfo.file)
                    console.log(uploadInfo, file)

                    // delete file.file
                    _this.$set(file, 'aliVideoId', uploadInfo.videoId)
                    _this.$set(file, 'url', `aliVideoId=${uploadInfo.videoId}`)
                    _this.$set(file, 'status', 'success')
                },
                // 文件上传失败
                onUploadFailed: function (uploadInfo, code, message) {
                    const file = _this.findFile(uploadInfo.file)
                    _this.$set(file, 'aliVideoId', uploadInfo.videoId)
                    _this.$set(file, 'status', 'exception')
                },
                // 文件上传进度
                onUploadProgress: function (
                    uploadInfo,
                    totalSize,
                    loadedPercent
                ) {
                    const file = _this.findFile(uploadInfo.file)
                    _this.$set(file, 'aliVideoId', uploadInfo.videoId)
                    _this.$set(
                        file,
                        'percentage',
                        Math.floor(loadedPercent * 100)
                    )
                },
                // 上传凭证超时
                onUploadTokenExpired: function (uploadInfo) {
                    // 上传方式1  实现时，根据uploadInfo.videoId调用刷新视频上传凭证接口重新获取UploadAuth
                    // uploader.resumeUploadWithAuth(uploadAuth);
                    // 上传方式2 实现时，从新获取STS临时账号用于恢复上传
                    uploader.resumeUploadWithSTSToken(
                        _this.ossConfig.accessKeyId,
                        _this.ossConfig.accessKeySecret,
                        securityToken,
                        108000
                    )
                },
                // 全部文件上传结束
                onUploadEnd: function (uploadInfo) {
                    console.log('onUploadEnd: uploaded all the files')
                }
            })
            this.videoUploader = uploader
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
                    const uploadName = `${this.$cookies.get('uid')}-${new Date().getTime()}__${file.name}`
                    let fileItem = {
                        name: file.name,
                        size: file.size,
                        file: _file,
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
            if (fileType !== '[object File]') {
                const { processed, option } = file.file
                _file = new File([processed], file.uploadName, option)
                file.file = _file
            }

            if (file.isVideo) {
                this.uploadVideo(_file)
                this.videoUploader.startUpload()
            } else if (file.isFilePrev) {
                this.bosUploadStart()
            } else {
                this.uploadFile(file)
            }
        },
        // 上传视频
        uploadVideo(file) {
            const userData = {
                Vod: {
                    StorageLocation: '',
                    Title: file.name,
                    Description: file.name
                    // UserData: this.$cookies.get('uid')
                }
            }
            this.videoUploader.addFile(
                file,
                null,
                null,
                null,
                JSON.stringify(userData)
            )
        },
        // 上传文件
        uploadFile(file) {
            console.log(file)
            const _this = this
            co(function*() {
                const result = yield _this.client.multipartUpload(
                    _this.dir + file.uploadName,
                    file.file,
                    {
                        progress: function*(p) {
                            // 记录进度
                            _this.$set(file, 'percentage', Math.floor(p * 100))
                        },
                        ..._this.datas
                    }
                )

                if (
                    result.res.status === 200 &&
                    result.res.statusCode === 200
                ) {
                    file.url = result.res.requestUrls[0]
                    file.status = 'success'
                    file.url = file.url.split('?')[0]
                    console.log(file)
                    delete file.percentage
                    delete file.file
                    _this.change({ file, fileList: _this.uploadList })
                    _this.onSuccess({
                        response: result,
                        file,
                        fileList: _this.uploadList
                    })
                } else {
                    file.status = 'exception'
                    _this.change({ file, fileList: _this.uploadList })
                    _this.onError({
                        error: result,
                        file,
                        fileList: _this.uploadList
                    })
                }
            }).catch(function (err) {
                console.log(err)
                file.status = 'exception'
                _this.change({ file, fileList: _this.uploadList })
                _this.onError({ error: err, file, fileList: _this.uploadList })
            })
        },
        // 删除
        remove(file) {
            if (file.isVideo) {
                this.removeVideo(file)
            } else {
                this.removeFile(file)
            }
        },
        // 删除视频
        async removeVideo(file) {
            const videoId = file.aliVideoId || file.url.split('aliVideoId=')[1]
            const listFiles = this.videoUploader.listFiles()
            const index = listFiles.findIndex(
                x => x.aliVideoId === videoId || x.url === `aliVideoId=${videoId}`
            )

            // 取消分片上传
            if (file.status === 'uploading') {
                this.videoUploader.cancelFile(index)
                this.videoUploader.deleteFile(index)
            }

            // 删除文件
            await this.getAliVodRes({
                videoId,
                action: 'DeleteVideo'
            })
        },
        // 删除文件
        removeFile(file) {
            const _this = this
            // 取消分片上传
            if (file.status === 'uploading') {
                this.client.cancel()
            }
            // 删除文件
            co(function*() {
                yield _this.client.delete(file.uploadName)
            }).catch(function (err) {
                console.log(err)
            })
        },
        findFile(file) {
            console.log(this.uploadList)
            return this.uploadList.find(x => x.uploadName === file.name)
        },
        change({ file, fileList } = {}) {
            this.onChange({ file, fileList })
            this.$emit('update:fileList', fileList)
        }
    }
}
