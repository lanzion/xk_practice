export const uploadFileSize = {
    data() {
        return {
            standardFileSize: 500, // 单位 M
            imgStandardFileSize: 5 // 单位 M
        }
    },
    methods: {
        beforeUploadFile({ file } = {}) {
            return this.beforeUpload({
                file,
                size: this.standardFileSize
            })
        },
        beforeUploadVideo({ file } = {}) {
            return this.beforeUpload({
                file,
                format: {
                    regexp: new RegExp(/(mp4)$/i),
                    message: '请上传支持格式的视频'
                },
                size: this.standardFileSize
            })
        },
        beforeUploadCover({ file } = {}) {
            return this.beforeUpload({
                file,
                format: {
                    regexp: new RegExp(/(jpe?g|gif|png|bmp)$/i),
                    message: '请上传支持格式的图片'
                },
                size: this.imgStandardFileSize
            })
        },
        beforeUpload({ file, format, size } = {}) {
            const fileName = file.name
            const expandName = fileName.substr(fileName.lastIndexOf('.') + 1)

            if (format && !format.regexp.test(expandName)) {
                this.$message.error({
                    message: '请上传支持格式的文件',
                })
                return false
            }
            if (file.size > (size * 1024 * 1024)) {
                this.$message.error({
                    message: `文件大小不超过 ${size} M`
                })
                return false
            }
            return true
        }
    }
}
