// 多级数据字典
import { requestMultField } from '@/api/common.js'

// 清除没有数据的子级以适用element-ui Cascader
const clearChildren = function (arr = [], child = 'children') {
    return arr.reduce((result, item) => {
        const children = item[child] || []

        if (children.length) {
            item[child] = clearChildren(children, child)
        } else {
            delete item[child]
        }
        result.push(item)
        return result
    }, [])
}

const state = {
    activity: []
}

const actions = {
    async getData({ commit, state }, payload) {
        const { model } = payload
        let datas = state[model] || []

        if (datas.length) {
            return datas
        }

        const res = await requestMultField({ model })
        datas = clearChildren(res.data.entity)

        commit('SAVE_DICTDATA', { datas, model })

        return datas
    },
}

const mutations = {
    SAVE_DICTDATA(state, payload = {}) {
        const { datas, model } = payload
        state[model] = datas
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
