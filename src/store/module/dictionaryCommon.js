// 单级数据字典
import { requestDictComb } from '@/service/common.js'

const state = {
    activityRegisterDicList: {}, // 活动报名
    activeStateDicList: {}, // 活动状态
    // 活动报名状态
    activityRegisterDicList: {
        groupName: '活动报名',
        model: 'activityRegister',
        dicList: [
            { id: '1', code: '1', name: '进行中' },
            { id: '2', code: '2', name: '已截止' }
        ]
    },
    // 活动状态
    activeStateDicList: {
        groupName: '活动状态',
        model: 'activeState',
        dicList: [
            { id: '0', code: '0', name: '未开始' },
            { id: '1', code: '1', name: '进行中' },
            { id: '2', code: '2', name: '已结束' }
        ]
    },
    // 审核状态
    auditStatusDicList: {
        groupName: '审核状态',
        model: 'auditStatus',
        dicList: [
            { id: '-1', code: '-1', name: '待提交' },
            { id: '0', code: '0', name: '待审核', studio: true, person: true },
            { id: '1', code: '1', name: '通过', studio: true, person: true, option: true },
            { id: '2', code: '2', name: '不通过', studio: true, person: true, option: true },
            { id: '3', code: '3', name: '审核中', studio: true }
        ]
    },
    auditTypeDicList: {
        groupName: '流程类型',
        model: 'auditType',
        dicList: [
            { id: '1', code: '1', name: '项目' },
            { id: '2', code: '2', name: '课程' },
            { id: '3', code: '3', name: '活动' },
            { id: '4', code: '4', name: '作品' },
            { id: '5', code: '5', name: '资源' },
            { id: '6', code: '6', name: '兴趣组' },
            { id: '7', code: '7', name: '导师工作室' },
            { id: '8', code: '8', name: '案例' },
            { id: '9', code: '9', name: '校级课题' },
            { id: '10', code: '10', name: '县级课题' },
            { id: '11', code: '11', name: '市级课题' },
            { id: '12', code: '12', name: '省级课题' },
            { id: '13', code: '13', name: '国家级课题' },
            { id: '14', code: '14', name: '服务' },
            { id: '15', code: '15', name: '需求' },
            { id: '16', code: '16', name: '故事' },
            { id: '17', code: '17', name: '商业策划' },
        ]
    },
    auditProcessNodeDicList: {
        groupName: '流程类型',
        model: 'auditProcessNode',
        dicList: [
            { id: '6', code: '6', name: '市级教育局' },
            { id: '7', code: '7', name: '区县教育局' },
            { id: '9', code: '9', name: '学校' },
            { id: '10', code: '10', name: '省级教育局' }
        ]
    },
    // 证件类型
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
    // 课程级别
    courseGradeDicList: {
        groupName: '级别',
        model: 'courseGrade',
        dicList: [
            { id: '55a0ecfaa38a44998ddb393adae97786', code: '1', name: '入门级' },
            { id: '3f8eb5f2e84544f0b7e6251d7f8aabac', code: '2', name: '初级' },
            { id: 'c774fb76f10f4694a01bf8622166aeb3', code: '3', name: '中级' },
            { id: 'e135b1d5ebd547c68d4399370844c508', code: '3', name: '高级' },
            { id: '2cbbd6dee9ff485486502fe2514443cc', code: '3', name: '专家级' }
        ]
    },
    // 身份
    identityDicList: {
        groupName: '身份',
        model: 'identity',
        dicList: [
            { id: '1', code: '1', name: '教师' },
            { id: '0', code: '0', name: '学生' },
            { id: '9', code: '9', name: '学校管理员' },
            { id: '7', code: '7', name: '区县管理员' },
            { id: '6', code: '6', name: '市级管理员' },
            { id: '10', code: '10', name: '省厅管理员' },
            { id: '2', code: '2', name: '投资人' },
            { id: '3', code: '3', name: '投资机构' },
            { id: '4', code: '4', name: '企业' },
            { id: '5', code: '5', name: '云后台管理员' },
            { id: '11', code: '11', name: '众创空间' }
        ]
    },
    // 锁定状态
    lockStatusDicList: {
        groupName: '锁定状态',
        model: 'lockStatus',
        dicList: [
            { id: '0', code: '0', name: '正常' },
            { id: '1', code: '1', name: '已锁定' }
        ]
    },
    // 学段(后台管理用)
    periodKeyDicList: {
        groupName: '学段',
        model: 'periodKey',
        dicList: [
            { id: 'primarySchool', name: '小学', code: '1' },
            { id: 'middleSchool', name: '初中', code: '2' },
            { id: 'highSchool', name: '高中', code: '3' }
        ]
    },
    // 性别
    sexDicList: {
        groupName: '性别',
        model: 'sex',
        dicList: [
            { id: '6', code: '6', name: '未知' },
            { id: '7', code: '7', name: '男', option: true },
            { id: '8', code: '8', name: '女', option: true },
            { id: '9', code: '9', name: '未说明' }
        ]
    },
    // 状态
    statusDicList: {
        groupName: '状态',
        model: 'status',
        dicList: [
            { id: '0', code: '0', name: '停用' },
            { id: '1', code: '1', name: '启用' }
        ]
    },
    // 共享类型
    sharedTypeDicList: {
        groupName: '共享类型',
        model: 'sharedType',
        dicList: [
            { id: '1', code: '1', name: '私有' },
            { id: '2', code: '2', name: '个人共享' },
            { id: '3', code: '3', name: '本校共享' },
            { id: '4', code: '4', name: '本区县共享' },
            { id: '5', code: '5', name: '本市共享' },
            { id: '6', code: '6', name: '本省共享' },
            { id: '7', code: '7', name: '所有共享' }
        ]
    },
    // 课题级别
    subjectLevelDicList: {
        groupName: '课题级别',
        model: 'subjectLevel',
        dicList: [
            { id: '1', code: '1', name: '国家级' },
            { id: '2', code: '2', name: '省级' },
            { id: '3', code: '3', name: '市级' },
            { id: '4', code: '4', name: '区县级' },
            { id: '5', code: '5', name: '学校级' }
        ]
    },
    subjectStageDicList: {
        groupName: '课题阶段',
        model: 'subjectStage',
        dicList: [
            { id: '1', code: '1', name: '立项' },
            { id: '2', code: '2', name: '开题' },
            { id: '3', code: '3', name: '中期评估' },
            { id: '4', code: '4', name: '结题验收' },
            { id: '5', code: '5', name: '已结束' }
        ]
    },
    subjectGuideStageDicList: {
        groupName: '课题申报状态',
        model: 'subjectGuideStage',
        dicList: [
            { id: '1', code: '1', name: '申报中' },
            { id: '2', code: '2', name: '已截止' }
        ]
    },
    // 课题预期成果
    resultTypeDicList: {
        groupName: '预期成果',
        model: 'resultType',
        dicList: [
            { id: '1', code: '1', name: '专著' },
            { id: '2', code: '2', name: '论文' },
            { id: '3', code: '3', name: '研究报告' },
            { id: '4', code: '4', name: '工具书' },
            { id: '5', code: '5', name: '其他' }
        ]
    },
    // 资源格式
    resourceFormatsDicList: {
        groupName: '资源格式',
        model: 'resourceFormats',
        dicList: [
            { id: '1', code: '1', name: '文档' },
            { id: '2', code: '2', name: '视频' },
            { id: '3', code: '3', name: '音频' },
            { id: '4', code: '4', name: '图片' },
            { id: '5', code: '5', name: '其他' }
        ]
    },
    reportStatusDicList: {
        groupName: '举报状态',
        model: 'reportStatus',
        dicList: [
            { id: '1', code: '1', name: '文档' },
            { id: '2', code: '2', name: '视频' },
            { id: '3', code: '3', name: '音频' },
            { id: '4', code: '4', name: '图片' },
            { id: '5', code: '5', name: '其他' }
        ]
    },
    commentStatusDicList: {
        groupName: '评论状态',
        model: 'commentStatus',
        dicList: [
            { id: '0', code: '0', name: '禁用' },
            { id: '1', code: '1', name: '启用' }
        ]
    },
    handleStatusDicList: {
        groupName: '处理状态',
        model: 'handleStatus',
        dicList: [
            { id: '0', code: '0', name: '未处理' },
            { id: '1', code: '1', name: '已处理' }
        ]
    },
    hookUpWithStatusDicList: {
        groupName: '勾搭状态',
        model: 'hookUpWithStatus',
        dicList: [
            { id: '1', code: '1', name: '勾搭中' },
            { id: '2', code: '2', name: '洽谈中' },
            { id: '3', code: '3', name: '勾搭成功' },
            { id: '4', code: '4', name: '勾搭失败' }
        ]
    },
    resultStatusDicList: {
        groupName: '处理结果',
        model: 'resultStatus',
        dicList: [
            { id: '0', code: '0', name: '属实' },
            { id: '1', code: '1', name: '不属实' }
        ]
    },
    studyTypeDicList: {
        groupName: '学习类型',
        model: 'studyType',
        dicList: [
            { id: '1', code: '1', name: '课程' },
            { id: '2', code: '2', name: '项目' },
            { id: '3', code: '3', name: '实训' }
        ]
    },
    matchGradeDicList: {
        groupName: '竞赛级别',
        model: 'matchGrade',
        dicList: [
            { id: '5', code: '5', name: '国家级' },
            { id: '10', code: '10', name: '省级' },
            { id: '6', code: '6', name: '市级' },
            { id: '7', code: '7', name: '县级' }
        ]
    },
    actorTypeDicList: {
        groupName: '参赛人群',
        model: 'actorType',
        dicList: [
            { id: '1', code: '1', name: '学生' },
            { id: '2', code: '2', name: '老师' }
        ]
    },
    actorWayDicList: {
        groupName: '参赛形式',
        model: 'actorWay',
        dicList: [
            { id: '1', code: '1', name: '个人' },
            { id: '2', code: '2', name: '团体' }
        ]
    },
    topicTypeDicList: {
        groupName: '话题类型',
        model: 'topicType',
        dicList: [
            { id: '1', code: 'class', name: '班级话题圈', student: true },
            { id: '2', code: 'interest', name: '兴趣组', student: true, teacher: true },
            { id: '3', code: 'studio', name: '导师工作室', teacher: true }
        ]
    },
    // 写实类型
    realismTypeDicList: {
        groupName: '写实类型',
        model: 'realismType',
        dicList: [
            { id: '1', code: '1', name: '活动' },
            { id: '2', code: '2', name: '竞赛' }
        ]
    },
    activityRangeDicList: {}, // 活动范围
    fitDicList: {}, // 适合学生
    storyCategoryDicList: {}, // 故事类型
    demandCategory: {}, // 需求类型
    demandCategoryDicList: {},
    gradeDicList: {}, // 年级
    learningStagesDicList: {}, // 学段
    levelDicList: {}, // 级别
    technicalClassificationDicList: {}, // 相关技术
    linkTypeDicList: {}, // 友情链接
    noticeTypeDicList: {}, // 资讯类型
    serveCategoryDicList: {}, // 服务类型
    businessPlanCategoryDicList: {}, // 商业策划类型
    newsCenter: {}, // 资讯公告
    educationDicList: {}, // 学历
    titleDicList: {} // 职称
}

const mutations = {
    saveDictComb(state, payload) {
        state[`${payload.model}DicList`] = payload
    }
}

const actions = {
    async getDictComb({ commit, state }, model) {
        const dicComb = state[`${model}DicList`] || {}
        if (dicComb.model === undefined || dicComb.model === null) {
            const response = await requestDictComb({ groupCode: model })
            const data = Object.assign({}, response.data.entity, { model: model })
            commit('saveDictComb', data)
            return data
        } else {
            return dicComb
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
