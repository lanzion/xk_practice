import xhr from 'Axios'

// 账号管理
const selectUserList = (options = {}, page) => xhr.post(`/practice/baseUser/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 添加管理员账号
const addUser = (options = {}) => xhr.post('/admin/baseEducation/addUser', options)
// 修改账号状态
const modifyUserStatus = (options = {}) => xhr.post('/practice/baseUser/modifyUserStatus', options)
// 基地列表
const BaseList = (options = {}, page) => xhr.post(`/practice/baseInfo/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 根据名称搜索基地
const searchBaselist = (options = {}, page) => xhr.post(`/practice/activity/search-baseinst`, options)
// 基地服务列表
const baseinfoList = (options = {}, page) => xhr.post(`/admin/baseinfoProject/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 基地详情
const adminBaseInfoDetail = (options = {}) => xhr.post('/practice/adminBaseInfo/selectDetail', options)
// 修改基地详情
const adminBaseInfoEdit = (options = {}) => xhr.post('/admin/adminBaseInfo/modify', options)
// 新增基地详情
const adminBaseInfoAdd = (options = {}) => xhr.post('/admin/adminBaseInfo/add', options)
// 添加基地服务
const baseInfoAdd = (options = {}) => xhr.post('/admin/baseinfoProject/add', options)
// 删除基地服务
const delBaseInfo = (options = {}) => xhr.post('/admin/baseinfoProject/del', options)
// 基地服务详情
const baseinfoDetail = (options = {}) => xhr.post('/admin/baseinfoProject/selectDetail', options)
// 修改基地服务
const baseinfoEdit = (options = {}) => xhr.post('/admin/baseinfoProject/modify', options)
// 审核服务
const baseinfoprojectAudit = (options = {}) => xhr.post('admin/baseinfoprojectAudit/modify', options)
// 基地注册审核
const baseinfoAudit = (options = {}) => xhr.post('/admin/baseinfoAudit/modify', options)
// 获取基地信息
const baseDetail = (options = {}) => xhr.post('/practice/baseInfo/selectDetail', options)
// 保存基地信息
const baseModify = (options = {}) => xhr.post('practice/baseInfo/modify', options)

/**
 * 资讯管理
 * orgTypeBODY  -- A 教育局 B 基地 C 学校 D 平台资讯
 *
 */

const informationList = (options = {}, page) => xhr.post(`/admin/information/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 新增资讯
const informationAdd = (options = {}) => xhr.post('/admin/information/add', options)
// 新增资讯
const informationDel = (options = {}) => xhr.post('/admin/information/del', options)
// 资讯详情
const informationDetail = (options = {}) => xhr.post('/admin/information/selectDetail', options)
// 修改资讯
const informationEdit = (options = {}) => xhr.post('/admin/information/modify', options)
// 获取领域和主题模块
const getActivityTypeParent = (options = {}) => xhr.post('/admin/activityType/getActivityTypeParent', options)
// 活动审核记录
const activityAudit = (options = {}) => xhr.post('/admin/activity/audit', options)

// 活动列表
const activityList = (options = {}, page) => xhr.post(`/practice/activity/page?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 发起活动课程列表
const activityCourseList = (options = {}, page) => xhr.post(`/practice/activity/course/page?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 发起活动课程详情
const activityCourseDetail = (options = {}) => xhr.post('/practice/activity/course/publish/detail', options)

// 年级列表
const gradeList = (options = {}) => xhr.post('/practice/activity/school/grade/list', options)
// 班级列表
const classList = (options = {}) => xhr.post('/practice/activity/school/class/list', options)
// 学生列表
const studentList = (options = {}) => xhr.post('/practice/activity/school/student/list', options)
// 获取学校信息
const schoolDetail = (options = {}) => xhr.post('/practice/baseSchool/selectDetail', options)
// 修改学校信息
const schoolModify = (options = {}) => xhr.post('/practice/baseSchool/modify', options)
// 根据名称搜索学校
const searchSchoollist = (options = {}, page) => xhr.post(`/practice/activity/search-school`, options)

// 发起活动
const activityPublish = (options = {}) => xhr.post('/practice/activity/school/publish', options)
// 发起活动 - 课程基地剩余人数
const activityLeftNum = (options = {}) => xhr.post('/practice/activity/course/left-num', options)
// 查看确认书
const cbookView = (options = {}) => xhr.post('/practice/activity/cbook/view', options)
// 删除活动
const delActivity = (options = {}) => xhr.post('/practice/activity/delete', options)
// 活动详情
const activityDetail = (options = {}) => xhr.post('/practice/activity/eval/act-detail', options)
// 活动评价
const addActivityEval = (options = {}) => xhr.post('/practice/activity/eval/add', options)
// 活动评价
const evalActivityView = (options = {}) => xhr.post('/practice/activity/eval/view', options)
// 待确认活动列表
const activityWtAudit = (options = {}, page) => xhr.post(`/practice/activity/wt-audit-page?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 确认活动
const confirmActivity = (options = {}) => xhr.post('/practice/activity/confirm', options)
// 关联活动
const resultActivityList = (options = {}) => xhr.post('/practice/activity/result/activity-list', options)
// 发布成果-存草稿
const resultActivityDraft = (options = {}) => xhr.post('/practice/activity/result/add', options)
// 提交审核(单)
const resultActivityCommit = (options = {}) => xhr.post('/practice/activity/result/commit', options)
// 活动成果列表
const activityResultList = (options = {}, page) => xhr.post(`/practice/activity/result/page?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 待审核成果列表
const activityResultWtAuditList = (options = {}, page) => xhr.post(`/practice/activity/result/wt-audit-page?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 草稿成果列表
const activityResultDraftUnPassList = (options = {}, page) => xhr.post(`/practice/activity/result/draft-unpass-page?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 成果列表-已发布、已屏蔽
const activityResultPublishLockList = (options = {}, page) => xhr.post(`/practice/activity/result/publish-lock-page?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 成果删除
const resultActivityDelete = (options = {}) => xhr.post('/practice/activity/result/delete', options)
// 成果详情
const resultActivityDetail = (options = {}) => xhr.post('/practice/activity/result/detail', options)
// 成果编辑
const resultActivityUpdate = (options = {}) => xhr.post('/practice/activity/result/update', options)
// 成果审核通过(单)
const resultAuditPass = (options = {}) => xhr.post('/practice/activity/result/audit/pass', options)
// 成果审核通过(批量)
const resultAuditBatchPass = (options = {}) => xhr.post('/practice/activity/result/audit/batch-pass', options)
// 成果提交审核(批量)
const resultAuditBatchCommit = (options = {}) => xhr.post('/practice/activity/result/batch-commit', options)
// 成果审核不通过(单)
const resultAuditUnPass = (options = {}) => xhr.post('/practice/activity/result/audit/un-pass', options)
// 成果审核不通过(批量)
const resultAuditBatchUnPass = (options = {}) => xhr.post('/practice/activity/result/audit/batch-un-pass', options)
// 成果屏蔽或启用
const resultLockChange = (options = {}) => xhr.post('/practice/activity/result/lock/change', options)
// [活动日历]-月-场次列表-学校
const schoolActivityDayTimes = (options = {}) => xhr.post('/practice/activity/calendar/school/day-times', options)
// [活动日历]-日-活动统计-学校
const schoolActivityDayDetail = (options = {}) => xhr.post('/practice/activity/calendar/school/day-detail', options)
// [活动日历]-月-场次列表-基地
const baseinstActivityDayTimes = (options = {}) => xhr.post('/practice/activity/calendar/baseinst/day-times', options)
// [活动日历]-日-活动统计-基地
const baseinstActivityDayDetail = (options = {}) => xhr.post('/practice/activity/calendar/baseinst/day-detail', options)
// [活动日历]-月-场次列表-教育局
const areaActivityDayTimes = (options = {}) => xhr.post('/practice/activity/calendar/area/day-times', options)
// [活动日历]-日-活动统计-教育局
const areatActivityDayDetail = (options = {}) => xhr.post('/practice/activity/calendar/area/day-detail', options)
// [活动日历]-区域列表
const areatActivityAreaList = (options = {}) => xhr.post('/practice/activity/calendar/area/list', options)
// 获取开放式活动列表 - 基地
const openActivityPager = (options = {}, page) => xhr.post(`/practice/openActivity/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 获取开放式活动待确认列表
const openActivityStayPager = (options = {}, page) => xhr.post(`/practice/openActivity/selectAffirmPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 参与情况
const openActivitySignupPager = (options = {}, page) => xhr.post(`/practice/openActivitySignup/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 查看确认书
const openActivityCheckConfirmationById = (options = {}) => xhr.post(`/practice/openActivity/CheckConfirmationById`, options)
// 发起开放式活动
const openActivityAdd = (options = {}) => xhr.post(`/practice/openActivity/add`, options)
// 获取开放式活动详情
const openActivityDetail = (options = {}) => xhr.post(`/practice/openActivity/selectDetail`, options)
// 编辑开放式活动
const openActivityModify = (options = {}) => xhr.post(`/practice/openActivity/modify`, options)
// 开放式活动确认
const openActivityAudit = (options = {}) => xhr.post(`/practice/openActivityAudit/add`, options)
// 开放式活动批量审批
const openActivityAuditBatchAdd = (options = {}) => xhr.post(`/practice/openActivityAudit/batchAdd`, options)

export {
    selectUserList,
    addUser,
    modifyUserStatus,
    BaseList,
    searchBaselist,
    informationList,
    baseinfoList,
    adminBaseInfoDetail,
    baseInfoAdd,
    adminBaseInfoEdit,
    informationAdd,
    informationDel,
    informationDetail,
    informationEdit,
    delBaseInfo,
    getActivityTypeParent,
    adminBaseInfoAdd,
    baseinfoDetail,
    baseinfoEdit,
    activityAudit,
    baseinfoprojectAudit,
    baseinfoAudit,
    activityList,
    activityCourseList,
    activityCourseDetail,
    gradeList,
    classList,
    studentList,
    activityPublish,
    activityLeftNum,
    cbookView,
    delActivity,
    activityDetail,
    addActivityEval,
    evalActivityView,
    activityWtAudit,
    confirmActivity,
    baseDetail,
    baseModify,
    schoolDetail,
    schoolModify,
    searchSchoollist,
    resultActivityList,
    resultActivityDraft,
    resultActivityCommit,
    activityResultList,
    resultActivityDelete,
    resultActivityDetail,
    resultActivityUpdate,
    activityResultWtAuditList,
    activityResultDraftUnPassList,
    resultAuditBatchCommit,
    resultAuditPass,
    resultAuditBatchPass,
    resultAuditUnPass,
    resultAuditBatchUnPass,
    activityResultPublishLockList,
    resultLockChange,
    schoolActivityDayTimes,
    schoolActivityDayDetail,
    baseinstActivityDayTimes,
    baseinstActivityDayDetail,
    areaActivityDayTimes,
    areatActivityDayDetail,
    areatActivityAreaList,
    openActivityPager,
    openActivityStayPager,
    openActivitySignupPager,
    openActivityCheckConfirmationById,
    openActivityAdd,
    openActivityDetail,
    openActivityModify,
    openActivityAudit,
    openActivityAuditBatchAdd
}
