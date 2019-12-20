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

/* 活动成果
-------------------------- */
// 开放式活动报名列表
const requestwebapiListofactivities = (options = {}, page) => xhr.post(`/portal/open/activity/page?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

// 开放式活动详情
const requestwebapiListofactivitiesDetail = (options = {}) => xhr.post(`/portal/open/activity/detail`, options)

// 开放式活动详情 --收藏
const requestwebapiCollectionactivities = (options = {}) => xhr.post(`/portal/open/activity/collect`, options)

// 开放式活动详情 --评价感悟
const requestwebapiEvaluation = (options = {}) => xhr.post(`/portal/eval/activity/page`, options)

// 开放式活动详情 --开放式活动报名人列表
const requestwebapiregistration = (options = {}) => xhr.post(`/portal/open/activity/enroll/stu/list`, options)

// 开放式活动推荐
const requestwebapiRecommendedactivities = (options = {}) => xhr.post(`/portal/open/activity/other-list`, options)

// 开放式活动-报名详情
const requestwebapiapply = (options = {}) => xhr.post(`/portal/open/activity/enroll/detail`, options)

// 开放式活动-报名
const requestwebapiApplyactiviey = (options = {}) => xhr.post(`/portal/actSigNup/add`, options)

export {
    requestwebapiactivityresults,
    requestwebapiactivityresultsDetail,
    requestwebapiactivityresultsOther,
    requestwebapiListofactivities,
    requestwebapiListofactivitiesDetail,
    requestwebapiCollectionactivities,
    requestwebapiEvaluation,
    requestwebapiregistration,
    requestwebapiRecommendedactivities,
    requestwebapiapply,
    requestwebapiApplyactiviey
}
