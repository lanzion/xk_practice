import {
    requestCommentList,
    addComment,
    addReply
} from '@/api/common'

import flatten from '@utils/utility/flatten'

const getParentsReplyInfo = (result) => {
    return Object.values(result).map((item) => {
        const __pItem = result[item.fromId]
        
        item.replyMember = __pItem ? {
            createId: __pItem.createId,
            nickname: __pItem.nickname,
            thumbImg: __pItem.thumbImg
        } : null

        return item
    })
}

const state = {
    list: []
}

const getters = {}

const actions = {
    /**
     * 获取评论列表
     */
    async getCommentList({commit, state}, payload = {}) {
        const { params, page } = payload

        const res = await requestCommentList(params, page)

        const { entity: datas = {} } = res.data
        datas.resultData = (datas.resultData || []).map(x => {
            const __tree = flatten(x.replyDtoList, 'id', 'replyDtoList')
            x.replyDtoList = getParentsReplyInfo(__tree).sort((a, b) => a.createDate > b.createDate ? 1 : -1)
            return x
        })
        commit('SAVE_LIST', datas)
        return datas
    },
    /**
     * 发表评论
     */
    async addCommentData({commit, state}, payload = {}) {
        const res = await addComment(payload)
        return res
    },
    
    /**
     * 发表回复
     */
    async addReplyData({commit, state}, payload = {}) {
        const res = await addReply(payload)
        return res
    }
}
const mutations = {
    SAVE_LIST(state, payload = {}) {
        const { resultData: datas } = payload
        state.list = datas
    },
    RESET_LIST(state) {
        state.list = []
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
