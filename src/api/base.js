import xhr from 'Axios'

/* 学校管理
-------------------------- */
// 学校管理 - 列表
const requestSchoolList = (options = {}, page) => xhr.post(`/maker/baseSchool/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 学校管理 - 详情
const requestSchoolDetail = (options = {}) => xhr.post('/maker/baseSchool/selectDetail', options)
// 学校管理 - 添加
const addSchool = (options = {}) => xhr.post('/maker/baseSchool/add', options)
// 学校管理 - 修改
const editSchool = (options = {}) => xhr.post('/maker/baseSchool/modify', options)
// 学校管理 - 删除
// const delSchool = (options = {}) => xhr.post('/maker/link/delByIds', options)

/* 教育局管理
-------------------------- */
// 教育局管理 - 列表
const requestEduList = (options = {}, page) => xhr.post(`/maker/baseEducation/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 教育局管理 - 详情
const requestEduDetail = (options = {}) => xhr.post('/maker/baseEducation/selectDetail', options)
// 教育局管理 - 修改
const editEdu = (options = {}) => xhr.post('/maker/baseEducation/modify', options)
// 教育局管理 - 修改
const lockEdu = (options = {}) => xhr.post('/maker/baseEducation/modifyStatus', options)

/* 班级管理
-------------------------- */
// 班级管理 - 列表
const requestClaszList = (options = {}) => xhr.post(`/maker/base/class/list?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 班级管理 - 删除
const delClasz = (options = {}) => xhr.post('/maker/base/class/delByIds', options)

/* 用户管理
-------------------------- */
// 用户管理 - 公共 - 重置密码
const resetPassword = (options = {}) => xhr.post('/portal/user/resetPswByAccout', options)
// 用户管理 - 公共 - 审核
const auditUser = (options = {}) => xhr.post('/common/batchAuditStatus', options)
// 用户管理 - 公共 - 锁定/解锁
const lockUser = (options = {}) => xhr.post('/common/batchLockStatus', options)

/* 教师
-------------------------- */
// 教师 - 列表
const requestTeacherList = (options = {}, page) => xhr.post(`/maker/baseTeacher/selectFamousTeacherList?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 教师 - 列表(后台)
const requestAdminTeacherList = (options = {}, page) => xhr.post(`/maker/baseTeacher/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 教师 - 详情
const requestTeacherDetail = (options = {}) => xhr.post(`/maker/baseTeacher/selectDetail`, options)
// 教师 - 添加
const addTeacher = (options = {}) => xhr.post(`/maker/baseTeacher/add`, options)
// 教师 - 修改
const editTeacher = (options = {}) => xhr.post(`/maker/baseTeacher/modify`, options)
// 教师 - 删除
const delTeacher = (options = {}) => xhr.post(`/maker/baseParent/delByIds`, options)

/* 学生
-------------------------- */
// 学生 - 列表(后台)
const requestAdminStudentList = (options = {}, page) => xhr.post(`/maker/baseStudent/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 学生 - 详情
const requestStudentDetail = (options = {}) => xhr.post(`/maker/baseStudent/selectDetail`, options)
// 学生 - 添加
const addStudent = (options = {}) => xhr.post(`/maker/baseStudent/add`, options)
// 学生 - 修改
const editStudent = (options = {}) => xhr.post(`/maker/baseStudent/modify`, options)
// 学生 - 删除
const delStudent = (options = {}) => xhr.post(`/maker/baseStudent/delByIds`, options)

/* 家长
-------------------------- */
// 家长 - 列表(后台)
const requestAdminParentList = (options = {}, page) => xhr.post(`/maker/baseParent/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 家长 - 详情
const requestParentDetail = (options = {}) => xhr.post(`/maker/baseParent/selectDetail`, options)
// 家长 - 添加
const addParent = (options = {}) => xhr.post(`/maker/baseParent/add`, options)
// 家长 - 修改
const editParent = (options = {}) => xhr.post(`/maker/baseParent/modify`, options)
// 家长 - 删除
const delParent = (options = {}) => xhr.post(`/maker/baseParent/delByIds`, options)

/* 学校管理员
-------------------------- */
// 学校管理员 - 列表(后台)
const requestAdminSchoolerList = (options = {}, page) => xhr.post(`/maker/baseSchool/selectAdminPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 学校管理员 - 详情
const requestSchoolerDetail = (options = {}) => xhr.post(`/maker/baseSchool/selectDetailByOrgUser`, options)
// 学校管理员 - 添加
const addSchooler = (options = {}) => xhr.post(`/maker/baseSchool/addUser`, options)
// 学校管理员 - 修改
const editSchooler = (options = {}) => xhr.post(`/maker/baseSchool/modifyAdminUser`, options)

/* 机构管理员
-------------------------- */
// 机构管理员 - 列表(后台)
const requestAdminEducationList = (options = {}, page) => xhr.post(`/maker/baseEducation/selectAdminPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)

/* 平台管理员
-------------------------- */
// 平台管理员 - 列表
const requestAdminList = (options = {}) => xhr.post(`/common/selectAdminPager?pageNum=${options.pageNum}&pageSize=${options.pageSize}`, options)
// 平台管理员 - 删除
const delAdmin = (options = {}) => xhr.post(`/common/delOrgAdminByIds`, options)

export {
    requestSchoolList,
    requestSchoolDetail,
    addSchool,
    editSchool,
    requestEduList,
    requestEduDetail,
    editEdu,
    lockEdu,
    requestClaszList,
    delClasz,
    resetPassword,
    auditUser,
    lockUser,
    requestTeacherList,
    requestAdminTeacherList,
    requestTeacherDetail,
    addTeacher,
    editTeacher,
    delTeacher,
    requestAdminStudentList,
    requestStudentDetail,
    addStudent,
    editStudent,
    delStudent,
    requestAdminParentList,
    requestParentDetail,
    addParent,
    editParent,
    delParent,
    requestAdminSchoolerList,
    requestSchoolerDetail,
    addSchooler,
    editSchooler,
    requestAdminEducationList,
    requestAdminList,
    delAdmin
}
