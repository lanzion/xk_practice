import xhr from 'Axios'
/* 个人中心
-------------------------- */
/* 学生
-------------------------- */

// 我参加的活动列表
const requestwebapiStudentactivitylist = (options = {}, page) => xhr.post(`/practice/personalCenter/selectActivityPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

// 活动评价 新增
const requestwebapiActivityevaluation = (options = {}) => xhr.post(`/portal/eval/activity/add`, options)

// 活动评价 详情
const requestwebapiActivityevaluationDetail = (options = {}) => xhr.post(`/portal/eval/activity/selectDetail`, options)

// 我参加的活动列表 数量
const requestwebapiActivityNum = (options = {}) => xhr.post(`/practice/personalCenter/selectActivityCount`, options)

export {
    requestwebapiStudentactivitylist,
    requestwebapiActivityevaluation,
    requestwebapiActivityevaluationDetail,
    requestwebapiActivityNum
}
