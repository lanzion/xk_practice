import xhr from 'Axios'
/* 学校专栏
-------------------------- */
// 学校专栏
const requestwebapischool = (options = {}, page) => xhr.post(`/portal/baseSchool/selectPortalPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

// 学校专栏--列表详情
const requestwebapischoolDetail = (options = {}) => xhr.post(`/portal/baseSchool/selectPortalDetail`, options)

// 学校专栏--学校相关基地
const requestwebapischoolDetailbase = (options = {}, page) => xhr.post(`/portal/baseSchool/selectSchBaseInfo?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

// 评价
const requestwebapigetSchoolevaluation = (options = {}, page) => xhr.post(`/portal/activity/eval/school/page?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

export {
    requestwebapischool,
    requestwebapischoolDetail,
    requestwebapischoolDetailbase,
    requestwebapigetSchoolevaluation
}
