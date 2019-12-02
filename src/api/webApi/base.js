import xhr from 'Axios'
/* 基地/机构
-------------------------- */
// 基地/机构--列表
const requestwebapibase = (options = {}, page) => xhr.post(`portal/baseInfo/selectPortalPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

// 基地/机构--列表详情
const requestwebapibaseDetail = (options = {}) => xhr.post(`portal/baseInfo/selectPortalDetail`, options)

// 根据地址获取经纬度
const requestwebapiLongitudeAndlatitude = (options = {}) => xhr.post(`common/getMapLngLat`, options)

// 基地课程
const requestwebapibaseDetailcourse = (options = {}, page) => xhr.post(`portal/course/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

// 基地参与学校
const requestwebapibaseDetailschool = (options = {}, page) => xhr.post(`portal/baseInfo/selectPartakeSchool?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

// 评价列表
const requestwebapigetBaseevaluation = (options = {}, page) => xhr.post(`/portal/activity/eval/school/page?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

export {
    requestwebapibase,
    requestwebapibaseDetail,
    requestwebapiLongitudeAndlatitude,
    requestwebapibaseDetailcourse,
    requestwebapibaseDetailschool,
    requestwebapigetBaseevaluation
}
