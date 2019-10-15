import {
    requestCourseDetailByStart,
    requestCourseDetailByEnd,
    requestForenoticeDetail,
    addForenotice,
    editForenotice,
    reSubmitForenotice
} from '@/api/course'

import translate from '@utils/utility/translateDataDict.js'

const state = {
    detail: {}
}

const getters = {}

const actions = {
    /**
     * 获取评课活动详情
     */
    async getCourseDetail({ dispatch, commit }, payload = {}) {
        const { params = {}, status = 1 } = payload
        const handler = {
            1: requestCourseDetailByStart,
            2: requestCourseDetailByEnd
        }[status]
        const res = await handler(params)
        
        const { entity: datas = {} } = res.data
        
        const { dicList: grade } = await dispatch('dict/getDataDict', { code: 'grade' }, { root: true })
        const { dicList: subject } = await dispatch('dict/getDataDict', { code: 'subject' }, { root: true })
        const { dicList: textBookVersion } = await dispatch('dict/getDataDict', { code: 'textBookVersion' }, { root: true })

        datas.tags = [
            datas.grade && translate(datas.grade, grade),
            datas.subject && translate(datas.subject, subject),
            datas.textBookVersion && translate(datas.textBookVersion, textBookVersion, { key: 'id' })
        ].filter(x => x)

        commit('SAVE_DETAIL', datas)
    },

    /**
     * 获取评课预告详情
     */
    async getForenoticeDetail({ dispatch, commit }, payload = {}) {
        const res = await requestForenoticeDetail(payload)
        
        const { entity: datas = {} } = res.data
        
        const { dicList: grade } = await dispatch('dict/getDataDict', { code: 'grade' }, { root: true })
        const { dicList: subject } = await dispatch('dict/getDataDict', { code: 'subject' }, { root: true })
        const { dicList: textBookVersion } = await dispatch('dict/getDataDict', { code: 'textBookVersion' }, { root: true })

        datas.tags = [
            datas.grade && translate(datas.grade, grade),
            datas.subject && translate(datas.subject, subject),
            datas.textbookVersion && translate(datas.textbookVersion, textBookVersion, { key: 'id' })
        ].filter(x => x)
        datas.time = [new Date(datas.startTime), new Date(datas.endTime)]

        commit('SAVE_DETAIL', datas)
        return datas
    },

    /**
     * 添加/编辑评课活动
     */
    async submitForenotice({commit, state}, payload = []) {
        const { id } = payload
        const handler = id ? editForenotice : addForenotice

        const res = await handler(payload)
        return res.data
    },

    /**
     * 删除评课活动
     */
    // async deleteForenotice({commit, state}, payload = []) {
    //     const res = await delCourse(payload)
        
    //     return res.data
    // },

    /**
     * 重新提交评课活动
     */
    async reSubmitForenotice({commit, state}, payload = []) {
        const res = await reSubmitForenotice(payload)
        
        return res.data
    }
    
}
const mutations = {
    SAVE_DETAIL(state, payload = {}) {
        state.detail = payload
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
