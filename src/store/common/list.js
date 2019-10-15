import {
    requestAllEduList,
    requestAllSchoolList,
    requestSchoolPeriodList,
    requestGradeListBySchoolPeriod,
    requestClassListBySchoolGrade
} from '@/api/common.js'
import {
    requestTextbookList,
    requestTextbookCatalogTreeList
} from '@/api/system'

const state = {
    edu: [],
    school: [],
    textbook: []
}

const getters = {}

const actions = {

    /**
     * 获取教育局列表
     */
    async getEduList({commit, state}, payload = {}) {
        const res = await requestAllEduList(payload)
        const datas = ((res.data.appendInfo || {}).comboxList || []).map(x => {
            return {
                id: x.id,
                name: x.eduName
            }
        })
        commit('SAVE_LIST', { model: 'edu', datas })
    },

    /**
     * 获取学校列表
     */
    async getSchoolList({commit, state}, payload = {}) {
        const res = await requestAllSchoolList(payload)
        const datas = ((res.data.appendInfo || {}).comboxList || []).map(x => {
            return Object.assign({}, x, {
                id: x.id,
                name: x.schoolName,
                schoolType: x.schoolType
            })
        })
        commit('SAVE_LIST', { model: 'school', datas })
    },

    /**
     * 获取根据学校获取学段列表
     */
    async getSchoolPeriodList({commit, state}, payload = {}) {
        const res = await requestSchoolPeriodList(payload)
        const datas = (res.data.appendInfo || {}).list || []
        return datas
    },

    /**
     * 获取根据学校学段获取年级列表
     */
    async getSchoolGradeList({commit, state}, payload = {}) {
        const res = await requestGradeListBySchoolPeriod(payload)
        const datas = ((res.data.appendInfo || {}).list || []).map(x => {
            return Object.assign({}, x, {
                id: x.id,
                name: x.gradeName
            })
        })
        return datas
    },

    /**
     * 获取根据学校学段获取年级列表
     */
    async getSchoolClassList({commit, state}, payload = {}) {
        const res = await requestClassListBySchoolGrade(payload)
        const datas = (res.data.entity || []).map(x => {
            return Object.assign({}, x, {
                id: x.id,
                name: x.className
            })
        })
        return datas
    },

    /**
     * 获取教材列表
     */
    async getTextBookList({commit, state}, payload = {}) {
        const res = await requestTextbookList(payload, { pageNum: 1, pageSize: 9999 })
        const datas = (res.data.entity || {}).resultData || []

        commit('SAVE_LIST', { model: 'textbook', datas })
        return datas
    },

    /**
     * 获取教材目录列表
     */
    async getTextBookCatalogList({commit, state}, payload = {}) {
        const res = await requestTextbookCatalogTreeList(payload)
        const datas = (res.data.appendInfo || {}).resultData || []
        return datas
    }
    
}
const mutations = {
    SAVE_LIST(state, payload = {}) {
        const { model, datas } = payload
        state[model] = datas
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
