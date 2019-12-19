// 数据字典(用于前台数据使用)
import { requestDataDict } from '@/api/common.js'

const state = {
    sex: {
        groupName: '性别',
        model: 'sex',
        dicList: [
            { id: '6', code: 6, name: '未知' },
            { id: '7', code: 7, name: '男', option: true },
            { id: '8', code: 8, name: '女', option: true },
            { id: '9', code: 9, name: '未说明' }
        ]
    },
    lockStatus: {
        groupName: '锁定状态',
        model: 'sex',
        dicList: [
            { id: '0', code: 0, name: '正常' },
            { id: '1', code: 1, name: '锁定' }
        ]
    },
    auditStatus: {
        groupName: '活动状态',
        model: 'examineStatus',
        dicList: [
            { id: '0', code: 0, name: '待审核' },
            { id: '1', code: 1, name: '通过' },
            { id: '2', code: 2, name: '不通过' }
        ]
    },
    linkTargetType: {
        groupName: '链接打开方式',
        model: 'linkTargetType',
        dicList: [
            { id: '0', code: 0, name: '新页面打开' },
            { id: '1', code: 1, name: '当前页面打开' }
        ]
    },
    status: {
        groupName: '状态',
        model: 'status',
        dicList: [
            { id: '0', code: 0, name: '停用' },
            { id: '1', code: 1, name: '启用' }
        ]
    },
    bannerType: {
        groupName: 'Banner图类型页面',
        model: 'bannerType',
        dicList: [
            { id: '1', code: 1, name: '首页' }
        ]
    },
    uploadStatus: {
        groupName: '上传状态',
        model: 'uploadStatus',
        dicList: [
            { id: '0', code: 'ready', name: '准备中' },
            { id: '1', code: 'uploading', name: '上传中' },
            { id: '2', code: 'success', name: '上传成功' },
            { id: '3', code: 'exception', name: '上传失败' },
        ]
    },
    certiTypeDicList: {
        groupName: '证件类型',
        model: 'certiType',
        dicList: [
            { id: '26', code: '26', name: '居民身份证' },
            { id: '27', code: '27', name: '中华人民共和国旅行证' },
            { id: '28', code: '28', name: '中华人民共和国人出境通行证' },
            { id: '29', code: '29', name: '暂住证' }
        ]
    },
    grade: {}, // 年级
    learningStages: {}, // 学段
    subject: {}, // 学科
    education: {}, // 学历
    title: {}, // 职称
    compileType: {}, // 编制类型
    GB_T_4761_2008: {}, // 学生家长关系
    technicalClassification: {}
}

const getters = {}

const actions = {

    /**
     * @param {String} payload.code 数据字典code，多个用','连接
     * @desc 获取数据字典列表
     */
    async getDataDict({ commit, state }, payload) {
        const { code: groupCode } = payload
        const { dicList = [] } = state[groupCode] || {}

        if (dicList.length) {
            return state[groupCode]
        }

        const res = await requestDataDict({ groupCode })
        const datas = res.data.entity || {}

        commit('SAVE_DICTDATA', { model: groupCode, ...datas })
        return datas
    }

}

const mutations = {
    SAVE_DICTDATA(state, payload = {}) {
        const { model } = payload
        state[model] = payload
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
