// 权限管理(用户后台管理)
import {
    requestPermissList
} from '@/api/system'

import flatten from '@utils/utility/flatten'

// state
const state = {
    tree: [],
    obj: {}
}

// getter
const getters = {
    list(state) {
        return Object.values(state.obj)
    }
}

// actions
const actions = {
    /*
     * 获取权限列表
     */
    async getPermissList({ commit }, payload = {}) {
        const res = await requestPermissList(payload)
        const datas = res.data.entity || []
        const result = flatten(datas, 'id', 'children')

        commit('SAVE_PERMISSTREE', datas)
        commit('SAVE_PERMISSOBJ', result)
        return res
    }

}

// mutations
const mutations = {
    SAVE_PERMISSTREE(state, payload = []) {
        state.tree = payload
    },
    SAVE_PERMISSOBJ(state, payload = {}) {
        state.obj = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
