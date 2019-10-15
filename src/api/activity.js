import xhr from 'Axios'

/* 活动管理
-------------------------- */
// 活动管理 - 列表(后台)
const requestAdminActivityList = (options = {}, page) => xhr.post(`/admin/maker/activity/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 活动管理 - 列表(我的)
const requestMyActivityList = (options = {}, page) => xhr.post(`/pk/teachActivity/selectMyActivityPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 活动管理 - 详情
const requestActivityDetail = (options = {}) => xhr.post(`/pk/teachActivity/selectDetail`, options)
// 活动管理 - 添加
const addActivity = (options = {}) => xhr.post(`/pk/teachActivity/add`, options)
// 活动管理 - 编辑
const editActivity = (options = {}) => xhr.post(`/pk/teachActivity/modify`, options)
// 活动管理 - 删除
const delActivity = (options = {}) => xhr.post(`/pk/teachActivity/delByIds`, options)

export {
    requestAdminActivityList,
    requestMyActivityList,
    requestActivityDetail,
    addActivity,
    editActivity,
    delActivity,
}
