// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from '@/router/index'
import store from '@/store/index'
// eslint-disable-next-line
import filters from '@utils/filter/index'
import methods from '@utils/method/index'
import Component from '@/components/common/index'
import Cookies from '@utils/utility/cookies'
import Axios from 'Axios'
import ElementUI from 'element-ui'
import Clickoutside from '@element-ui/src/utils/clickoutside'

import '@/assets/css/index.scss'
import '@/assets/css/theme/reset-ele-index.scss'
import '@/assets/css/common/index-common.scss'

Vue.use(methods)
Vue.use(ElementUI, { zIndex: 0 })
Vue.use(Component)

Vue.directive('clickoutside', Clickoutside)

Vue.config.productionTip = false

Vue.prototype.$http = Axios
Vue.prototype.$cookies = Cookies
Vue.prototype.HTTPLOCAT = window.configs.http.baseUrl
Vue.prototype.page = window.page

window.requests = []

// router.beforeEach((to, from, next) => {
//     window.requests.forEach((x) => {
//         x.cancel('Operation canceled by router change')
//     })
//     window.requests = []

//     next()
// })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>'
})
