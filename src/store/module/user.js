import {
    requestTeacherList,
    requestTeacherDetail,
    requestStudentDetail,
    requestParentDetail,
    requestSchoolerDetail
} from '@/api/base'

const state = {
}

const getters = {}

const actions = {
    /**
     * 获取教师列表
     */
    async getTeacherList({commit, state}, payload = {}) {
        const { params = {}, page = {} } = payload
        const res = await requestTeacherList(params, page)

        let { entity: datas = {} } = res.data
        datas = datas || {}
        datas.resultData = (datas.resultData || []).map(x => {
            const item = Object.assign({}, x)
            item.teach = (x.teach || '').split(',').filter(t => t)
            item.course = x.mCourseList
            delete item.mCourseList

            return item
        })
        return datas
    },

    /**
     * 获取教师详情
     */
    async getTeacherDetail({commit, state}, payload = {}) {
        const res = await requestTeacherDetail(payload)

        const { entity: datas = {} } = res.data
        datas.teach = (datas.teach || '').split(',').filter(t => t)

        return datas
    },

    /**
     * 获取学生详情
     */
    async getStudentDetail({commit, state}, payload = {}) {
        const res = await requestStudentDetail(payload)

        const { entity: datas = {} } = res.data

        return datas
    },

    /**
     * 获取学生详情
     */
    async getParentDetail({commit, state}, payload = {}) {
        const res = await requestParentDetail(payload)

        const { entity: datas = {} } = res.data

        return datas
    },

    /**
     * 获取学校管理员详情
     */
    async getSchoolerDetail({commit, state}, payload = {}) {
        const res = await requestSchoolerDetail(payload)

        const { entity: datas = {} } = res.data

        return datas
    }
    
}
const mutations = {
    SAVE_DETAIL(state, payload = {}) {
        state.teacherDetail = payload
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
