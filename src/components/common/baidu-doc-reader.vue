<script>
export default {
    name: 'baidu-doc-reader', // 百度文档阅读

    data() {
        return {
        }
    },

    props: {
        width: {
            type: [Number],
            default: 1200
        },
        height: {
            type: [Number],
            default: 600
        },
        resourceId: {
            type: String
        }
    },

    render(h) {
        const { width, height } = this
        const style = {
            width: `${width}px`,
            'max-height': `${height}px`
        }
        return (
            <div id="baidu-doc-reader" style={ style }></div>
        )
    },
    
    watch: {
        resourceId: {
            handler: function (resourceId) {
                if (resourceId) {
                    this.init()
                }
            },
            immediate: true
        }
    },

    methods: {
        init() {
            const { width, resourceId: docId } = this

            try {
                const option = {
                    docId,
                    width: width - 7,
                    token: 'TOKEN',
                    host: 'BCEDOC',
                    serverHost: 'https://doc.bj.baidubce.com',
                    zoom: false,
                    zoomStepWidth: 20,
                    ready(handler) { // 设置字体大小和颜色, 背景颜色（可设置白天黑夜模式）
                        handler.setFontSize(1)
                        handler.setBackgroundColor('#000')
                        handler.setFontColor('#fff')
                    },
                    flip() {},
                    toolbarConf: {
                        page: false, // 上下翻页箭头图标
                        pagenum: false, // 几分之几页
                        full: true, // 是否显示全屏图标,点击后全屏
                        copy: false, // 是否可以复制文档内容
                        position: 'center', // 设置 toolbar中翻页和放大图标的位置(值有left/center)
                    }
                }
                /* eslint-disable no-new */
                new Document('baidu-doc-reader', option)
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>

<style lang="scss">
    #baidu-doc-reader {
        padding-right: 7px;
        overflow-y: auto;

        .wenku-api-box {
            padding-top: 0px;
            
            .wenku-toolsbar-mod {
                height: 48px;
                display: none;
            }
        }

        #wenku-loading {
            height: 100%;
        }

        #load {
            top: 50%;
            margin-top: -16px;
        }
    }
</style>
