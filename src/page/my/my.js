// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from '@/router/my'
import store from '@/store/index'
import '@utils/lib/aliyun-upload-sdk-1.4.0.min'
import OSS from 'ali-oss'

import '@utils/filter/index'
import methods from '@utils/method/index'
import Component from '@/components/common/index'
import Cookies from '@utils/utility/cookies'
import Axios from 'Axios'
import mixin from '@/mixin/admin-common.js'
import ElementUI from 'element-ui'
import Clickoutside from 'element-ui/src/utils/clickoutside'
import VueCropper from 'vue-cropper'

import '@/assets/css/index.scss'
import '@/assets/css/theme/reset-ele-my.scss'
import '@/assets/css/common/my-common.scss'

import VueClipboard from 'vue-clipboard2'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

window.OSS = OSS
Vue.mixin(mixin)
Vue.use(methods)
Vue.use(ElementUI, { zIndex: 0 })
Vue.use(VueCropper)
Vue.use(Component)
Vue.use(VueClipboard)

Vue.directive('clickoutside', Clickoutside)

Vue.config.productionTip = false

Vue.prototype.$http = Axios
Vue.prototype.$cookies = Cookies
Vue.prototype.page = window.page
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

router.beforeEach((to, from, next) => {
    window.requests.forEach((x) => {
        x.cancel('Operation canceled by router change')
    })
    window.requests = []

    next()
})
router.beforeEach((to, from, next) => {
    const nextrouter = 'space'
    if (to.name === nextrouter) {
        if (store.state.login.identity === '') {
            next('/login')
        }
    } else {
        next()
    }
    next()
})
router.beforeEach((to, from, next) => {
    const nextrouter = 'space'
    if (to.name === nextrouter) {
        if (store.state.login.identity === '1') {
            next('/classroom')
        }
        if (store.state.login.identity === '0') {
            next('/mycourse')
        }
        return
    }
    next()
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>',

})
