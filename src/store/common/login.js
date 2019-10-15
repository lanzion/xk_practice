import Axios from 'Axios'
import encrypt from 'jsencrypt'

import {
    requestPublishKey,
    login,
    requestUserBaseInfo,
    requestPermission,
    requestAdminPermission,
    loginout,
} from '@/api/account'
import Cookies from '@utils/utility/cookies'

const JSEncrypt = encrypt.JSEncrypt.prototype

const userInfoStore = localStorage.getItem('xk_practice_userInfo')
const baseInfoStore = localStorage.getItem('xk_practice_baseInfo')
const permissionStore = localStorage.getItem('xk_practice_permission')
// state
const state = {
    identities: {
        0: { code: 'student', name: '学生' },
        1: { code: 'teacher', name: '教师' },
        5: { code: 'admin', name: '云后台管理员' },
        6: { code: 'education', name: '市教育局管理员' },
        7: { code: 'education', name: '县教育局管理员' },
        9: { code: 'school', name: '学校管理员' },
        10: { code: 'education', name: '省厅管理员' },
        13: {code: 'baseInfo', name: '基地管理员'},
    },
    identity: localStorage.getItem('xk_practice_identity') || '',
    userInfo: userInfoStore && JSON.parse(userInfoStore) || {},
    baseInfo: baseInfoStore && JSON.parse(baseInfoStore) || {},
    permission: permissionStore && JSON.parse(permissionStore) || []
}

// getter
const getters = {
    identityCode(state) {
        const { identities, identity } = state
        return (identity && identities[identity] || {}).code || ''
    }
}

// actions
const actions = {
    /**
     * 获取公钥加密
     */
    async getPublishKey() {
        return requestPublishKey().then(response => {
            return response.data.entity
        })
    },

    /**
     * 登录
     */
    async login({ dispatch, commit, state }, payload) {
        const params = Object.assign({}, payload)
        // 密码加密处理
        const publicKey = await dispatch('getPublishKey')
        JSEncrypt.setPublicKey(publicKey)
        params.pwd = JSEncrypt.encrypt(payload.pwd)

        return login(params).then((response) => {
            const { code, appendInfo: datas, msg } = response.data

            const { userInfo = {}, token } = datas || {}
            const { id, identity } = userInfo
            
            if (code === 200 || code === 209) {
                // 存储登录信息
                // Cookies.set({ token: token }, { 'max-age': timeOut, domain: configs.http.domain })
                // Cookies.set({ uid: id }, { 'max-age': timeOut, domain: configs.http.domain })
                Cookies.set({ token: token }, { domain: configs.http.domain })
                Cookies.set({ uid: id }, { domain: configs.http.domain })
                // alert(Cookies.get('token'))
                // 登录成功设置默认请求头添加token
                Axios.defaults.headers.token = token
            }
            if (code === 200) {
                localStorage.setItem('xk_practice_userInfo', JSON.stringify(userInfo))
                localStorage.setItem('xk_practice_identity', identity)
                localStorage.setItem('xk_practice_uid', id)

                commit('SAVE_USERINFO', { key: 'userInfo', val: datas.userInfo })
                commit('SAVE_USERINFO', { key: 'identity', val: identity })
            }
            return {
                datas: (datas || {}).userInfo || {},
                identity,
                code,
                msg
            }
        })
    },

    /**
     * 获取个人基础信息
     */
    async getUserBaseInfo({ commit }) {
        return requestUserBaseInfo().then((response) => {
            const { code, appendInfo: datas } = response.data
            if (code === 200) {
                localStorage.setItem('xk_practice_baseInfo', JSON.stringify(datas))
                commit('SAVE_USERINFO', { key: 'baseInfo', val: datas })
                return true
            }
            return false
        })
    },

    /**
     * 获取权限
     */
    async getPermission({ commit, state }, payload) {
        let handler = requestPermission
        const { identity: icode } = payload
        
        const identity = state.identities[icode].code
        
        if (identity === 'school' || identity === 'education' || identity === 'admin' || identity === 'baseInfo') {
            handler = requestAdminPermission
        }
        return handler().then((response) => {
            const { code, appendInfo: datas } = response.data
            if (code === 200) {
                localStorage.setItem('xk_practice_permission', JSON.stringify(datas.userRight))
                commit('SAVE_PERMISSION', datas.userRight || [])
                return true
            }
            return false
        })
    },

    /**
     * 登出
     */
    logout({ commit }) {
        commit('DEL_USERINFO')
        return loginout()
    }
}

// mutations
const mutations = {
    SAVE_PERMISSION(state, payload = []) {
        state.permission = payload
    },
    SAVE_USERINFO(state, payload) {
        state[payload.key] = payload.val
    },
    SAVE_USERINFOPARAM(state, payload) {
        state.userInfo[payload.key] = payload.val
        localStorage.setItem('xk_practice_userInfo', JSON.stringify(state.userInfo))
    },
    SAVE_USERINFOPARAM_SIGN(state, payload = {}) {
        state.baseInfo.baseInfo.sign = payload
    },
    SAVE_USERINFOPARAM_NAME(state, payload = {}) {
        state.baseInfo.baseInfo.name = payload
    },
    SAVE_USERINFOPARAM_ADDRESS(state, payload = {}) {
        state.baseInfo.baseInfo.address = payload
    },
    DEL_USERINFO(state) {
        localStorage.removeItem('xk_practice_userInfo')
        localStorage.removeItem('xk_practice_baseInfo')
        localStorage.removeItem('xk_practice_identity')
        localStorage.removeItem('xk_practice_uid')
        localStorage.removeItem('xk_practice_permission')
        Cookies.remove('token')
        Cookies.remove('uid')
        state.userInfo = {}
        state.baseInfo = {}
        state.identity = ''
        state.permission = []
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
