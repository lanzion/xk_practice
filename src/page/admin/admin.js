// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from '@/router/admin'
import store from '@/store/index'
import '@utils/lib/aliyun-upload-sdk-1.4.0.min.js'
import OSS from 'ali-oss'
import methods from '@/utils/method/index'
import Component from '@/components/admin/index'
import mixin from '@/mixin/admin-common'
import Cookies from '@utils/utility/cookies'
import Axios from 'Axios'
import Clickoutside from 'element-ui/src/utils/clickoutside'
import VueCropper from 'vue-cropper'
import echarts from 'echarts'
import '@utils/filter/index'
import '@/assets/css/index.scss'
import '@/assets/css/theme/reset-ele-admin.scss'
import '@/assets/css/common/admin-common.scss'
import { showLoading, hideLoading } from '@/assets/js/loading.js'
import Print from 'vue-print-nb'
Vue.use(ElementUI, { size: 'small', zIndex: 0 })
Vue.use(Print)
window.OSS = OSS

Vue.config.productionTip = false

Vue.mixin(mixin)

Vue.use(Component)
Vue.use(VueCropper)
Vue.use(methods)

Vue.directive('clickoutside', Clickoutside)

Vue.prototype.$http = Axios
Vue.prototype.$cookies = Cookies
Vue.prototype.page = window.page
Vue.prototype.$echarts = echarts
Vue.prototype.downloadItem = function (url, name) {
    Axios.get(url, { responseType: 'blob' })
        .then(({ data }) => {
            var blob = new Blob([data], { type: 'application/json;charset=utf-8' })
            var href = window.URL.createObjectURL(blob) // 创建下载的链接
            if (window.navigator.msSaveBlob) {
                try {
                    window.navigator.msSaveBlob(blob, name)
                } catch (e) {
                    console.log(e)
                }
            } else {
                // 谷歌浏览器 创建a标签 添加download属性下载
                var downloadElement = document.createElement('a')
                downloadElement.href = href
                downloadElement.target = '_blank'
                downloadElement.download = name // 下载后文件名
                document.body.appendChild(downloadElement)
                downloadElement.click() // 点击下载
                document.body.removeChild(downloadElement) // 下载完成移除元素
                window.URL.revokeObjectURL(href) // 释放掉blob对象
            }
        })
        .catch(error => {
            console.error(error)
        })
}
Vue.prototype.showLoading = showLoading
Vue.prototype.hideLoading = hideLoading
window.requests = []

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})
