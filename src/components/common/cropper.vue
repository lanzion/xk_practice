<template>
    <div class="cropper-wrap">
        <vue-cropper
            :style="{ height }"
            ref="cropper"
            :img.sync="img"
            :mode="mode"
            v-bind="$attrs"
            @realTime="previewImage"
        />
        <button-group />
    </div>
</template>

<script>
import aliUpload from '@/mixin/ali-upload'

export default {
    name: 'cropper',
    mixins: [aliUpload],
    data() {
        return {
            filename: '' // 文件名
        }
    },
    inheritAttrs: false,
    props: {
        img: null,
        // 图片布局方式
        mode: {
            type: String,
            default: 'contain'
        },
        height: null,
        /**
         * @desc 按钮组 每组为一项 每项用','分隔
         * @example ['cover, contain', 'large, small']
         * @value cover: 布局cover
         * @value contain: 布局contain
         * @value refresh: 图片刷新重置
         * @value large: 图片放大
         * @value small: 图片缩小
         * @value left: 图片向左旋转90度
         * @value right: 图片向右旋转90度
         */
        buttons: {
            type: Array,
            default() {
                return []
            }
        }
    },
    watch: {
        img: {
            handler: function (file) {
                // 记录文件名
                if (file && file.name) {
                    this.filename = file.name
                }
            },
            deep: true,
            immediate: true
        }
    },
    components: {
        buttonGroup: {
            render(h) {
                const $parent = this.$parent
                let buttons = $parent.buttons || []

                if (!buttons.length) return null

                const TEMPLATE_MAP = {
                    cover: <el-button icon="el-icon-full-screen" on-click={ $parent.changeModeCover }></el-button>,
                    contain: <el-button icon="el-icon-rank" on-click={ $parent.changeModeContain }></el-button>,
                    refresh: <el-button icon="el-icon-refresh" on-click={ $parent.refresh }></el-button>,
                    large: <el-button icon="el-icon-zoom-in" on-click={ $parent.scaleLarge }></el-button>,
                    small: <el-button icon="el-icon-zoom-out" on-click={ $parent.scaleSmall }></el-button>,
                    left: <el-button icon="el-icon-refresh-left" on-click={ $parent.rotateLeft }></el-button>,
                    right: <el-button icon="el-icon-refresh-left" on-click={ $parent.rotateRight }></el-button>
                }
                const __button = []

                return (
                    <section class="button-group--wrap">
                        {
                            buttons.map((comps, i) => {
                                __button[i] = comps.split(',').map(x => x.trim()).filter(x => x).map(comp => {
                                    return TEMPLATE_MAP[comp]
                                })
                                if (!buttons.length) return null

                                return (
                                    <el-button-group key={ i }>
                                        { __button[i] }
                                    </el-button-group>
                                )
                            })
                        }
                    </section>
                )
            }
        }
    },
    methods: {

        // 修改vue-cropper插件图片默认渲染方式
        changeMode(mode) {
            this.$emit('update:mode', mode)
        },

        changeModeCover() {
            this.changeMode('cover')
        },

        changeModeContain() {
            this.changeMode('cantain')
        },
        
        // 重置vue-cropper插件内图片
        refresh() {
            this.$refs.cropper.refresh()
        },

        // 修改vue-cropper插件内图片大小 正数为变大 负数变小
        scale(num) {
            this.$refs.cropper.changeScale(num)
        },

        // 图片放大
        scaleLarge() {
            this.scale(1)
        },

        // 图片缩小
        scaleSmall() {
            this.scale(-1)
        },

        // 修改vue-cropper插件内图片 向左边旋转90度
        rotateLeft() {
            this.$refs.cropper.rotateLeft()
        },

        // 修改vue-cropper插件内图片 向右边旋转90度
        rotateRight() {
            this.$refs.cropper.rotateRight()
        },

        // 实时预览vue-cropper插件的事件
        previewImage(item) {
            this.$emit('crop', {
                url: item.url,
                style: item.img
            })
        },
        
        // 选择文件值改变
        changeFile(file) {
            // 读取并存储文件内容
            const reader = new FileReader()
            reader.onload = e => {
                let data
                if (typeof e.target.result === 'object') {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                this.$emit('update:img', data)
            }

            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blob
            reader.readAsArrayBuffer(file)
        },

        upload(filename = this.filename) {
            this.$refs.cropper.getCropBlob((file) => {
                const reader = new FileReader()
                reader.readAsBinaryString(file)
                reader.addEventListener(
                    'loadend',
                    () => {
                        const uploadName = filename
                            ? `${this.$cookies.get('uid')}__${filename}.${file.type.split('/')[1]}`
                            : `${this.$cookies.get('uid')}-${new Date().getTime()}__${file.name}`
                        const fileItem = {
                            name: uploadName,
                            size: file.size,
                            file,
                            status: 'ready',
                            uploadName: uploadName,
                            isVideo: false
                        }
                        
                        this.uploadFile(fileItem)
                    },
                    { once: true }
                )
            })
        },

        // 图片上传成功
        change({ file }) {
            this.$emit('success', file)
        }
    }
}
</script>

<style scoped>
    .button-group--wrap >>> .el-button-group + .el-button-group {
        margin-left: 10px;
    }
</style>
<style lang="scss" scoped>
    .button-group--wrap {
        margin-top: 10px;
    }
</style>
