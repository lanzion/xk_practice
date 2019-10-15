import {
    requestResourceDetail,
    addResource,
    editResource,
    delResource,
    reSubmitResource
} from '@/api/resource'

import translate from '@utils/utility/translateDataDict.js'

const state = {
    detail: {}
}

const getters = {}

const actions = {
    /**
     * 获取教学资源详情
     */
    async getResourceDetail({dispatch, commit, state}, payload = {}) {
        const res = await requestResourceDetail(payload)

        const { entity: datas = {} } = res.data

        const { dicList: grade } = await dispatch('dict/getDataDict', { code: 'grade' }, { root: true })
        const { dicList: subject } = await dispatch('dict/getDataDict', { code: 'subject' }, { root: true })
        const { dicList: textbookVersion } = await dispatch('dict/getDataDict', { code: 'textbookVersion' }, { root: true })

        const gradeLabel = translate(datas.grade, grade) || datas.grade
        const subjectLabel = translate(datas.subject, subject) || datas.subject
        const textbookVersionLabel = translate(datas.textbookVersion, textbookVersion, { key: 'id' }) || datas.textbookVersion

        datas.tags = [gradeLabel, subjectLabel, textbookVersionLabel].filter(x => x)
        datas.component = datas.path.startsWith('aliVideoId') && 'ali-video' ||
                          datas.path.startsWith('baiduDocId') && 'baidu-doc-reader' ||
                          'default-image'
        datas.resourceId = datas.path.split('=').pop()
        
        commit('SAVE_DETAIL', datas)
        return datas
    },

    /**
     * 添加/编辑教学资源
     */
    async submitResource({commit, state}, payload = []) {
        const { id } = payload
        const handler = id ? editResource : addResource

        const res = await handler(payload)
        return res.data
    },

    /**
     * 删除教学资源
     */
    async deleteResource({commit, state}, payload = []) {
        const res = await delResource(payload)
        
        return res.data
    },

    /**
     * 重新提交教学资源
     */
    async reSubmitResource({commit, state}, payload = []) {
        const res = await reSubmitResource(payload)
        
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
