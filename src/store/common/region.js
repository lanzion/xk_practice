
import {
    requestRegion
} from '@/api/common'

// state
const state = {
    region: []
}

// getter
const getters = {}

// actions
const actions = {
    /*
     * 获取地区数据
     */
    async getRegionList({ state, commit }, payload = {}) {
        const { pcode = '-1' } = payload
        const items = state.region.filter(x => x.pcode === pcode)
        if (items.length) {
            return items
        }

        const res = await requestRegion({ pcode })
        const datas = ((res.data.appendInfo || {}).list || []).map(x => {
            const item = Object.assign({}, x)
            item.pcode = pcode
            return item
        })

        commit('SAVE_REGIONLIST', datas)
        return datas
    }

}

// mutations
const mutations = {
    SAVE_REGIONLIST(state, payload = []) {
        state.region.push(...payload)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
