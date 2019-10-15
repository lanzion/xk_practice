
import {
    requestNavTreeList
} from '@/api/config'

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
     * 获取菜单列表
     */
    async getNavList({ commit }, payload = {}) {
        const res = await requestNavTreeList(payload)
        const datas = (res.data.appendInfo || {}).list || []
        const result = flatten(datas, 'id', 'children')

        commit('SAVE_NAVTREE', datas)
        commit('SAVE_NAVOBJ', result)
        return res
    }

}

// mutations
const mutations = {
    SAVE_NAVTREE(state, payload = []) {
        state.tree = payload
    },
    SAVE_NAVOBJ(state, payload = {}) {
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
