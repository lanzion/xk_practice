import xhr from 'Axios'
/* 课程中心
-------------------------- */

// 课程分类模块
const requestnavigation = (options = {}) => xhr.post(`/portal/course/getPortalParent`, options)

// 课程中心--列表
const requestwebapicurriculumCenter = (options = {}, page) => xhr.post(`/portal/course/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

// 课程中心--课程详情
const requestwebapicurriculumDetail = (options = {}) => xhr.post(`/portal/course/selectPortalDetail`, options)

// 参与学校
const requestParticipatingSchools = (options = {}, page) => xhr.post(`/portal/course/selectPartakeSchool?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

// 课程中心--推荐课程
const requestRecommendedCourses = (options = {}, page) => xhr.post(`/portal/course/randSelectCourse`, options)

export {
    requestnavigation,
    requestwebapicurriculumCenter,
    requestwebapicurriculumDetail,
    requestParticipatingSchools,
    requestRecommendedCourses
}
