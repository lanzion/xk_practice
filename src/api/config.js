import xhr from 'Axios'

/* 友情链接
-------------------------- */
// 友情链接 - 列表
const requestLinkList = (options = {}, page = {}) => xhr.post(`/maker/link/list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 友情链接 - 添加
const addLink = (options = {}) => xhr.post('/maker/link/add', options)
// 友情链接 - 修改
const editLink = (options = {}) => xhr.post('/maker/link/modify', options)
// 友情链接 - 删除
const delLink = (options = {}) => xhr.post('/maker/link/delByIds', options)

/* 导航管理
-------------------------- */
// 导航管理 - 树形列表
const requestNavTreeList = (options = {}, page = {}) => xhr.post(`/practice/portalNavigation/selectTreeList`, options)
// 导航管理 - 添加
const addNav = (options = {}) => xhr.post('/practice/portalNavigation/add', options)
// 导航管理 - 修改
const editNav = (options = {}) => xhr.post('/practice/portalNavigation/modify', options)
// 导航管理 - 删除
const delNav = (options = {}) => xhr.post('/practice/portalNavigation/delByIds', options)

/* Banner图管理
-------------------------- */
// Banner图管理 - 列表
const requestBannerList = (options = {}, page = {}) => xhr.post(`/maker/banner/getAllBanner`, options)
// Banner图管理 - 详情
const requestBannerDetail = (options = {}, page = {}) => xhr.post(`/maker/portalNavigation/selectTreeList`, options)
// Banner图管理 - 添加
const addBanner = (options = {}) => xhr.post('/maker/banner/addFile', options)
// Banner图管理 - 修改排序
const editBannerSort = (options = {}) => xhr.post('/maker/banner/updateSort', options)
// Banner图管理 - 删除
const delBanner = (options = {}) => xhr.post('/maker/banner/delFile', options)
// Banner图管理 - 添加关系
const addBannerRelation = (options = {}) => xhr.post('/maker/banner/add', options)
// Banner图管理 - 删除关系
const delBannerRelation = (options = {}) => xhr.post('/maker/banner/del', options)

export {
    requestLinkList,
    addLink,
    editLink,
    delLink,
    requestNavTreeList,
    addNav,
    editNav,
    delNav,
    requestBannerList,
    requestBannerDetail,
    addBanner,
    editBannerSort,
    delBanner,
    addBannerRelation,
    delBannerRelation
}
