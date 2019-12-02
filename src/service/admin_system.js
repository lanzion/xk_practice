// 后台管理- 系统管理
import xhr from 'Axios'

/** ****************************************Banner**********************************************/
// Banner列表
let requestSystemBanner = (options = {}) => xhr.post('/practice/banner/getAllBanner', options)
// 添加Banner
let addBanner = (options = {}) => xhr.post('/practice/banner/addFile', options)
// 删除Banner
let delBanner = (options = {}) => xhr.post('/practice/banner/delFile', options)
// 添加banner关系
let addBannerRelation = (options = {}) => xhr.post('/practice/banner/add', options)
// 删除banner关系
let delBannerRelation = (options = {}) => xhr.post('/practice/banner/del', options)
// 修改banner顺序
let updateBannerSort = (options = {}) => xhr.post('/practice/banner/updateSort', options)
// 设置banner轮播时间
let updateBannerTime = (options = {}) => xhr.post('/practice/banner/updateBannerTime', options)

/** *****************************************Role*******************************************/
// 角色列表
let requestSystemRole = (options = {}) => xhr.post(`/common/right/rolePager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 权限列表
let requestSystemPermission = (options = {}) => xhr.post('/common/right/list/byPid', options)
// 角色权限列表
let requestSystemRolePermission = (options = {}) => xhr.post('/common/right/roleRight/byRoleId', options)
// 保存用户权限
let addRolePermission = (options = {}) => xhr.post('/common/right/bind', options)

/** *****************************************Tag*******************************************/
// 评价标签-列表查询
const requestTagList = (options = {}) => xhr.post(`/maker/evaluateLabel/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 评价标签-列表查询
const requestAdminTagList = (options = {}) => xhr.post(`/maker/evaluateLabel/selectAdminPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 评价标签-新增
const addTag = (options = {}) => xhr.post('/maker/evaluateLabel/add', options)
// 评价标签--删除
const deleteTag = (options = {}) => xhr.post('/maker/evaluateLabel/del', options)
// 评价标签--删除(批量)
const deleteTags = (options = {}) => xhr.post('/maker/evaluateLabel/delByIds', options)
// 评价标签--修改
const queryLabelDetail = (options = {}) => xhr.post('/maker/evaluateLabel/selectDetail', options)
// 评价标签--修改
const editTag = (options = {}) => xhr.post('/maker/evaluateLabel/modify', options)

/** *****************************************Term*******************************************/
// 分页查询学期列表
const requestTermList = (options = {}) => xhr.post(`/maker/term/selectPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 新增学期
const addTerm = (options = {}) => xhr.post('/maker/term/add', options)
// 修改学期
const editTerm = (options = {}) => xhr.post('/maker/term/modify', options)
// 删除学期
const deleteTerm = (options = {}) => xhr.post('/maker/term/del', options)
// 批量删除学期
const deleteTerms = (options = {}) => xhr.post('/maker/term/delByIds', options)

/** *****************************************Tag*******************************************/
// 评论管理 - 列表
let commentList = (options = {}, pageParam = {}) => xhr.post(`/maker/comment/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 评论管理 - 禁用/启用
let commentFunc = (options = {}, pageParam = {}) => xhr.post(`/maker/comment/modify`, options)

// 举报管理 - 列表
let reportList = (options = {}, pageParam = {}) => xhr.post(`/maker/report/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 举报管理 - 属实/不属实
let reportFunc = (options = {}, pageParam = {}) => xhr.post(`/maker/report/modify`, options)

// 反馈管理 - 列表
let feedbackList = (options = {}, pageParam = {}) => xhr.post(`/maker/feedback/selectPager?pageNum=${pageParam.pageNum}&pageSize=${pageParam.pageSize}`, options)

// 反馈管理 - 新增
let addFeedback = (options = {}) => xhr.post(`/maker/feedback/add`, options)

// 反馈管理 - 后台回复
let replyFeedback = (options = {}) => xhr.post(`/maker/feedback/modify`, options)

export {
    requestSystemBanner,
    addBanner,
    delBanner,
    addBannerRelation,
    delBannerRelation,
    updateBannerSort,
    updateBannerTime,
    requestSystemRole,
    requestSystemPermission,
    requestSystemRolePermission,
    addRolePermission,
    requestTagList,
    requestAdminTagList,
    addTag,
    deleteTag,
    deleteTags,
    queryLabelDetail,
    editTag,
    requestTermList,
    addTerm,
    editTerm,
    deleteTerm,
    deleteTerms,
    commentList,
    commentFunc,
    reportList,
    reportFunc,
    feedbackList,
    addFeedback,
    replyFeedback
}
