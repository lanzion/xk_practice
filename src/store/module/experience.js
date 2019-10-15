import {
    requestExperienceDetail,
    addExperience,
    editExperience,
    delExperience
} from '@/api/base'
// import { studentdetailsrevision, studentmodification } from "@/api/base";
const state = {
    detail: {}
}

const getters = {}

const actions = {
    /**
     * 获取教学心得详情
     */
    async getExperienceDetail({ commit, state }, payload = {}) {
        const res = await requestExperienceDetail(payload)
        const { entity: datas = {} } = res.data

        commit('SAVE_DETAIL', datas)
        return datas
    },

    /**
     * 添加/编辑教学心得详情
     */
    async submitExperience({ commit, state }, payload = {}) {
        const { id } = payload
        const handler = id ? addExperience : editExperience

        const res = await handler(payload)
        return res.data
    },

    /**
     * 删除教学心得
     */
    async deleteExperience({ commit, state }, payload = []) {
        const res = await delExperience(payload)

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
