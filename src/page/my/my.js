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
import InfiniteLoading from 'vue-infinite-loading'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

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
Vue.use(ElementUI, {
    zIndex: 0
})
Vue.use(Viewer)
Viewer.setDefaults({
    Options: {
        'inline': true,
        'button': true,
        'navbar': true,
        'title': true,
        'toolbar': true,
        'tooltip': true,
        'movable': true,
        'zoomable': true,
        'rotatable': true,
        'scalable': true,
        'transition': true,
        'fullscreen': true,
        'keyboard': true,
        'url': 'data-source'
    }
})
Vue.use(VueCropper)
Vue.use(Component)
Vue.use(VueClipboard)
Vue.use(InfiniteLoading)

Vue.directive('clickoutside', Clickoutside)

Vue.config.productionTip = false

Vue.prototype.$http = Axios
Vue.prototype.$cookies = Cookies
Vue.prototype.page = window.page
Vue.prototype.downloadItem = function (url, name) {
    Axios.get(url, {
            responseType: 'blob'
        })
        .then(({
            data
        }) => {
            var blob = new Blob([data], {
                type: 'application/json;charset=utf-8'
            })
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
            next('/space/classroom')
        }
        if (store.state.login.identity === '0') {
            next('/space/myactivities')
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
    components: {
        App
    },
    template: '<App/>',

})