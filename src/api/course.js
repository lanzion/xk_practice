import xhr from 'Axios'

/* 课程管理
-------------------------- */
// 课程管理 - 列表(后台)
const requestAdminCourseList = (options = {}, page) => xhr.post(`/maker/course/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 评课活动 - 列表(前台)
const requestCourseList = (options = {}, page) => xhr.post(`/pk/back/evaluateCourse/selectPage?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 评课活动 - 列表(我的)
const requestMyCourseList = (options = {}, page) => xhr.post(`/pk/web/evaluateCourse/selectMyEC?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 评课活动 - 列表(根据教师ID查询)
const requestCourseListByTid = (options = {}, page) => xhr.post(`/pk/back/evaluateCourse/selectCoursePager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 评课活动 - 详情(进行中)
const requestCourseDetailByStart = (options = {}) => xhr.post(`/pk/web/evaluateCourse/selectDetailByStart`, options)
// 评课活动 - 详情(已结束)
const requestCourseDetailByEnd = (options = {}) => xhr.post(`/pk/web/evaluateCourse/selectDetailByEnd`, options)
// 评课活动 - 删除
const delCourse = (options = {}) => xhr.post(`/pk/back/evaluateCourse/delByIdList`, options)
// 评课活动 - 查看精品课设置
const requestExcelledCourse = (options = {}) => xhr.post(`/pk/goodCourseStandard/selectDetail`, options)
// 评课活动 - 设置精品课
const excelledCourse = (options = {}) => xhr.post(`/pk/goodCourseStandard/modify`, options)

export {
    requestAdminCourseList,
    requestCourseList,
    requestMyCourseList,
    requestCourseListByTid,
    requestCourseDetailByStart,
    requestCourseDetailByEnd,
    delCourse,
    requestExcelledCourse,
    excelledCourse
}
