import xhr from 'Axios'
/* 活动成果
-------------------------- */
// 成果列表
const requestwebapiactivityresults = (options = {}, page) => xhr.post(`/portal/activity/result/page?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

// 成果列表--详情
const requestwebapiactivityresultsDetail = (options = {}) => xhr.post(`/portal/activity/result/detail`, options)

// 其他成果列表
const requestwebapiactivityresultsOther = (options = {}) => xhr.post(`/portal/activity/result/other-list`, options)

// 学校专栏--学校相关基地
// const requestwebapischoolDetailbase = (options = {}, page) => xhr.post(`/portal/baseSchool/selectSchBaseInfo?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

export {
    requestwebapiactivityresults,
    requestwebapiactivityresultsDetail,
    requestwebapiactivityresultsOther
}
