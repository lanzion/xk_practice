// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from '@/router/admin'
import store from '@/store/index'
import '@utils/lib/aliyun-upload-sdk-1.4.0.min.js'
import OSS from 'ali-oss'

import '@utils/filter/index'
import methods from '@/utils/method/index'
import Component from '@/components/admin/index'
import mixin from '@/mixin/admin-common'
import Cookies from '@utils/utility/cookies'
import Axios from 'Axios'
import ElementUI from 'element-ui'
import Clickoutside from 'element-ui/src/utils/clickoutside'
import VueCropper from 'vue-cropper'

import echarts from 'echarts'

import '@/assets/css/index.scss'
import '@/assets/css/theme/reset-ele-admin.scss'
import '@/assets/css/common/admin-common.scss'

window.OSS = OSS

Vue.config.productionTip = false

Vue.mixin(mixin)
Vue.use(ElementUI, { size: 'small', zIndex: 0 })
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
            // 为了简单起见这里blob的mime类型 固定写死了
            let blob = new Blob([data], { type: 'application/vnd.ms-excel' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = name
            link.click()
        })
        .catch(error => {
            console.error(error)
        })
}

window.requests = []

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})
