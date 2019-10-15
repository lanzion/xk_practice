import xhr from 'Axios'

// 获取Banner图
const requestBannerList = (options = {}) => xhr.post('/maker/banner/getBannerImg', options)

// 获取省/市/区县
// const requestRegion = (options = {}) => xhr.post('/admin/sysArea/currentLocal', options)
const requestRegion = (options = {}) => xhr.post('/maker/sysArea/currentLocal', options)

// 获取数据字典
const requestDataDict = (options = {}) => xhr.post('/common/getDictComb', options)

// 获取领域级联数据
const requestMultField = (options = {}) => xhr.post('/common/getPubSearch', options)

// 获取教育局列表
const requestAllEduList = (options = {}) => xhr.post('/maker/baseEducation/getComboxByArea', options)

// 获取学校列表
const requestAllSchoolList = (options = {}) => xhr.post('/maker/baseSchool/getComboxByArea', options)

// 根据学校获取学段列表
const requestSchoolPeriodList = (options = {}) => xhr.post('/admin/baseData/studySection/getList', options)

// 根据学校学段获取年级列表
const requestGradeListBySchoolPeriod = (options = {}) => xhr.post('/admin/baseData/grade/getList', options)

// 根据学校年级获取班级列表
const requestClassListBySchoolGrade = (options = {}) => xhr.post('/maker/base/class/all', options)

// 获取学期列表
const requestTermList = (options = {}) => xhr.post('/maker/term/selectTermList', options)

// 获取评论列表
const requestCommentList = (options = {}, page) => xhr.post(`/maker/web/comment/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

// 发表评论
const addComment = (options = {}) => xhr.post('/maker/web/comment/insertComment', options)

// 发表回复
const addReply = (options = {}) => xhr.post('/maker/web/reply/insertReply', options)

// 阿里云 - 点播 - 获取凭证
const requestAliVodTicket = (options = {}) => xhr.post('/aliyun/vod/getTicket', options)

// 阿里云 - 点播 - 公共接口
const requestAliVodApi = (options = {}) => xhr.post('/aliyun/vedio/signature', options)

// 获取导航菜单
const requestNavList = (options = {}) => xhr.post(`/common/right/permissList`, options)

// 获取友情链接
const requestLinkList = (options = {}, page) => xhr.post(`/maker/link/linkList?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

export {
    requestBannerList,
    requestRegion,
    requestDataDict,
    requestMultField,
    requestAllEduList,
    requestAllSchoolList,
    requestSchoolPeriodList,
    requestGradeListBySchoolPeriod,
    requestClassListBySchoolGrade,
    requestTermList,
    requestCommentList,
    addComment,
    addReply,
    requestAliVodTicket,
    requestAliVodApi,
    requestNavList,
    requestLinkList
}
