import xhr from 'Axios'

// 活动通知列表
const activityList = (options = {}, page) => xhr.post(`/admin/activity/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
const activityDetail = (options = {}, page) => xhr.post('/admin/activity/selectDetail', options)

// 排课记录
const istributionSchoolPager = (options = {}, page) => xhr.post(`/admin/courseClass/distributionSchoolPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
const istributionSchoolDetail = (options = {}, page) => xhr.post(`/admin/courseClass/distribution`, options)

// 账号管理
const selectUserList = (options = {}, page) => xhr.post(`/admin/baseUser/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 添加管理员账号
const addUser = (options = {}) => xhr.post('/admin/baseEducation/addUser', options)
// 基地列表
const BaseList = (options = {}, page) => xhr.post(`/admin/adminBaseInfo/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 基地服务列表
const baseinfoList = (options = {}, page) => xhr.post(`/admin/baseinfoProject/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 基地详情
const adminBaseInfoDetail = (options = {}) => xhr.post('/admin/adminBaseInfo/selectDetail', options)
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

export {
    activityList,
    istributionSchoolPager,
    istributionSchoolDetail,
    activityDetail,
    selectUserList,
    addUser,
    BaseList,
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
    baseinfoAudit
}
