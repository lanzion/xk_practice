<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <!-- <div ref="editor" class="text">
    </div> -->
  </div>
</template>

<script>
import co from 'co'
import OSS from 'ali-oss'
import wangEditor from 'wangEditor'
const ossConfig = {
    endpoint: 'http://oss.xk100.com',
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAIrKoK00opmL49',
    accessKeySecret: '3ug7PFSKr4SJ02vSKOAQtr7jVtr45O',
    bucket: 'xk100-com-maker',
    cname: true
}
export default {
  name: "editoritem",
  data() {
    return {
      // uploadPath,
      editor: null,
      info_: null,
      client: new OSS(ossConfig)
    };
  },
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.$txt.clear();
        this.info_ = null;
      }
    },
    value: function(value) {
      if (value !== this.editor.$txt.html()) {
        this.editor.$txt.html(this.value);
      }
    }
    //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.initEditor();
    this.editor.$txt.html(this.value);
    let _this = this
    this.editor.onchange = function() {
      _this.$emit('change', _this.editor.$txt.html())
    };
  },
  methods: {
        // 初始化
        uploadInit() {
            // eslint-disable-next-line no-shadow
            const editor = this.editor
            // 编辑器中，触发选择图片的按钮的id
            const btnId = editor.customUploadBtnId
            // 编辑器中，触发选择图片的按钮的父元素的id
            const containerId = editor.customUploadContainerId

            const accept = ['jpg', 'jpeg', 'gif', 'png', 'bmp']

            const $btn = document.getElementById(btnId)
            const $container = document.getElementById(containerId)

            const $file = document.createElement('input')
            $file.id = `input_${btnId}`
            $file.type = 'file'
            $file.accept = accept.map(x => `.${x}`).join()
            $file.style = 'display: none'

            $container.appendChild($file)

            $btn.addEventListener('click', () => {
                $file.click()
            })

            $file.addEventListener('change', (event) => {
                const file = event.target.files[0]
                const fileType = file.type.split('/')[1]
                if (!file) {
                    return
                }
                if (!accept.includes(fileType)) {
                    this.$message({
                        message: '请上传图片文件',
                        type: 'warning'
                    })
                    return
                }
                this.uploadFile(file)
            })
        },
        // 插入图片
        insertImage(src) {
            let $img = document.createElement('img')
            const idx = src.lastIndexOf('?')
            if (~idx) {
                src = src.slice(0, idx)
            }

            $img.onload = () => {
                const html = '<img src="' + src + '" style="max-width:100%;"/>'
                this.editor.command(null, 'insertHtml', html)

                wangEditor.log('已插入图片，地址 ' + src)
                $img = null
            }
            $img.onerror = () => {
                wangEditor.error('使用返回的结果获取图片，发生错误。请确认以下结果是否正确：' + src)
                $img = null
            }
            $img.src = src
        },
        // 上传
        uploadFile(file) {
            const _this = this
            const filename = `uid#${this.$cookies.get('uid')}-t#${new Date().getTime()}##__${file.name}`

            co(function* () {
                const result = yield _this.client.multipartUpload(filename, file, {
                    progress: function* (p) {
                        // 记录进度
                        _this.$set(file, 'percentage', Math.floor(p * 100))
                    },
                })

                if (result.res.status === 200 && result.res.statusCode === 200) {
                    _this.insertImage(result.res.requestUrls[0])
                } else {
                    console.log(result)
                }
            }).catch(function (err) {
                console.log(err)
            })
        },
        initEditor(param) {
            // eslint-disable-next-line new-cap
            this.editor = new wangEditor(this.$refs.toolbar, this.$refs.editor)
            // 配置自定义上传的开关
            this.editor.config.customUpload = true
            // 配置上传事件，uploadInit方法已经在上面定义了
            this.editor.config.customUploadInit = this.uploadInit
            // 富文本配置
            this.editor.config.menus = [
                'bold',
                'underline',
                'italic',
                'strikethrough',
                'eraser',
                'forecolor',
                'bgcolor',
                'quote',
                'fontfamily',
                'fontsize',
                'head',
                'unorderlist',
                'orderlist',
                'alignleft',
                'aligncenter',
                'alignright',
                'link',
                'unlink',
                'table',
                'img',
                'undo',
                'redo'
            ]
            // 实例
            this.editor.create()
        }
    }
};
</script>

<style lang="css">
.editor {
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}
.toolbar{
    min-height: 200px;
    height: auto !important;
}
.text {
  border: 1px solid #ccc;
  min-height: 500px;
}
</style>