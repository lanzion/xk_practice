import axios from 'axios'
import qs from 'Qs'
import Cookies from '@utils/utility/cookies'
import { redirectCallback as redirect } from '@utils/utility/redirect'
import store from '@/store/index.js'

axios.defaults.baseURL = configs.http.baseURL + configs.http.path
axios.defaults.method = 'post'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 2000000

if (Cookies.has('token')) {
    axios.defaults.headers.token = Cookies.get('token')
}

axios.defaults.paramsSerializer = function (params) {
    return qs.stringify(params)
}

const removeRequest = (config) => {
    const requests = window.requests || []
    requests.forEach(r => {
        if (r.url === config.url) { // 当前请求在数组中存在时执行函数体
            r.cancel('same request') // 执行取消操作
            requests.splice(r, 1) // 把这条记录从数组中移除
        }
    })
}

// 请求拦截
axios.interceptors.request.use((config) => {
    removeRequest(config)

    if (!config.cancelToken) {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        config.cancelToken = source.token
        window.requests.push(source)
    }

    return config
}, error => {
    // 请求失败的处理
    return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
    if (response.data.code === 999) {
        store.commit('login/DEL_USERINFO')
        redirect(window.page.login.url)
    }
    return response
}, error => {
    console.log({ error })

    if (error.response === undefined || error.response.status === undefined) {
        return Promise.reject(error)
    }
    switch (error.response.status) {
        case 504:
            // axios({
            //  method: error.config.method,
            //  url: error.config.url,
            //  data: error.config.data
            // });
            console.log('请求超时：' + error.config.url)
            break
        case 403:
            // =======================================
            // removeUserInfo()
            return Promise.reject(error.response.data.msg)
        default:
            return Promise.reject(error) // 返回接口返回的错误信息
    }
})

export default axios
