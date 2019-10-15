import xhr from 'Axios'

/* 角色管理
-------------------------- */
// 角色管理 - 列表
const requestRoleList = (options = {}, page = {}) => xhr.post(`/common/right/rolePager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 角色管理 - 根据角色获取权限列表
const requestMenuByRole = (options = {}) => xhr.post('/common/right/roleRight/byRoleId', options)
// 角色管理 - 配置权限
const configRoleMenu = (options = {}) => xhr.post('/common/right/bind', options)

/* 权限管理
-------------------------- */
// 权限管理 - 列表
const requestPermissList = (options = {}) => xhr.post('/common/right/list/byPid', options)
// 权限管理 - 添加
const addPermiss = (options = {}) => xhr.post('/common/right/addRight', options)
// 权限管理 - 修改
const editPermiss = (options = {}) => xhr.post('/common/right/updateRight', options)
// 权限管理 - 删除
const delPermiss = (options = {}) => xhr.post('/common/right/deleteRight', options)

/* 数据字典
-------------------------- */
// 数据字典 - 主类 - 列表
const requestDictTypeList = (options = {}) => xhr.post('/admin/dict/specialtype/list', options)
// 数据字典 - 主类 - 添加
const addDictType = (options = {}) => xhr.post('/admin/dict/specialtype/add', options)
// 数据字典 - 主类 - 修改
const editDictType = (options = {}) => xhr.post('/admin/dict/specialtype/modify', options)
// 数据字典 - 主类 - 删除
const delDictType = (options = {}) => xhr.post('/admin/dict/specialtype/del', options)
// 数据字典 - 子类 - 列表
const requestDictList = (options = {}, page = {}) => xhr.post(`/admin/baseData/dicSpecial/list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 数据字典 - 子类 - 添加
const addDict = (options = {}) => xhr.post('/admin/baseData/dicSpecial/insert', options)
// 数据字典 - 子类 - 修改
const editDict = (options = {}) => xhr.post('/admin/baseData/dicSpecial/update', options)
// 数据字典 - 子类 - 删除
const delDict = (options = {}) => xhr.post('/admin/baseData/dicSpecial/delete', options)

export {
    requestRoleList,
    requestMenuByRole,
    configRoleMenu,
    requestPermissList,
    addPermiss,
    editPermiss,
    delPermiss,
    requestDictTypeList,
    addDictType,
    editDictType,
    delDictType,
    requestDictList,
    addDict,
    editDict,
    delDict
}
