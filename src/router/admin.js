import Vue from 'vue'
import Router from 'vue-router'

import sortCourse from './admin/sortCourse'

const container = () => import('@/views/admin/container')

// 首页
const home = () => import('@/views/admin/home/index')

// 系统管理
const permiss = () => import('@/views/admin/system/permiss/index')
const role = () => import('@/views/admin/system/role/index')
const datadict = () => import('@/views/admin/system/datadict/index')
// 学年学期
const term = () => import('@/views/admin/system/term/index')

// 配置管理
const link = () => import('@/views/admin/configure/link/index')
const nav = () => import('@/views/admin/configure/nav/index')
const banner = () => import('@/views/admin/configure/banner/index')
const bannerList = () => import('@/views/admin/configure/banner/list')
const bannerAdd = () => import('@/views/admin/configure/banner/add')
const bannerEdit = () => import('@/views/admin/configure/banner/edit')

// 学校2.0
const schoolList = () => import('@/views/admin/school/manage/list/index')
const schoolListDetail = () => import('@/views/admin/school/manage/list/detail')
const schoolAdd = () => import('@/views/admin/school/manage/list/add')
const schoolEdit = () => import('@/views/admin/school/manage/list/edit')
const schoolGrade = () => import('@/views/admin/school/manage/grade/index')
const schoolGradeAdd = () => import('@/views/admin/school/manage/grade/add')
const schoolGradeEdit = () => import('@/views/admin/school/manage/grade/edit')
const schoolGradeDetail = () => import('@/views/admin/school/manage/grade/detail')

const schoolinfo = () => import('@/views/admin/school/schoolinfo/index')

// 学生管理
const schoolStudent = () => import('@/views/admin/school/manage/student/index')
const schoolStudentAdd = () => import('@/views/admin/school/manage/student/form')
const schoolTeacher = () => import('@/views/admin/school/manage/teacher/index')
const schoolTeacherAdd = () => import('@/views/admin/school/manage/teacher/form')
// 实践管理2.0
const createActivity = () => import('@/views/admin/practicalManage/create/index')
const courseManage = () => import('@/views/admin/practicalManage/courseManage/index')
const courseRecord = () => import('@/views/admin/practicalManage/courseManage/record')
const courseDetail = () => import('@/views/admin/practicalManage/courseManage/detail')
const courseEdit = () => import('@/views/admin/practicalManage/create/eidt')
const courseSchedule = () => import('@/views/admin/practicalManage/courseManage/schedule')

// -----------------------------------------------------------------------------------------------
const practicalStart = () => import('@/views/admin/practicalManage/start/index')
const practicalList = () => import('@/views/admin/practicalManage/list/index')
const practicalSure = () => import('@/views/admin/practicalManage/sure/index')
const activityCalendar = () => import('@/views/admin/practicalManage/calendar/index')
// 开放式活动
const startOpenActivity = () => import('@/views/admin/practicalManage/openActivity/startOpenActivity')
const openActivityList = () => import('@/views/admin/practicalManage/openActivity/openActivityList')
const openActivityInfo = () => import('@/views/admin/practicalManage/openActivity/openActivityInfo')
const openActivityPartake = () => import('@/views/admin/practicalManage/openActivity/openActivityPartake')
// ------------------------------------------------------------------------------------------------

// 账号管理2.0
const accountSchool = () => import('@/views/admin/account/school/index')
const accountSchoolAdd = () => import('@/views/admin/account/school/add')
const accountSchoolEdit = () => import('@/views/admin/account/school/edit')
const accountAdmin = () => import('@/views/admin/account/admin/index')
const accountAdminAdd = () => import('@/views/admin/account/admin/add')
const accountAdminEdit = () => import('@/views/admin/account/admin/edit')
const accountBase = () => import('@/views/admin/account/base/index')
const accountBaseAdd = () => import('@/views/admin/account/base/add')
const accountBaseEdit = () => import('@/views/admin/account/base/edit')
const accountEducation = () => import('@/views/admin/account/education/index')
const accountEducationAdd = () => import('@/views/admin/account/education/add')
const accountEducationEdit = () => import('@/views/admin/account/education/edit')

// 基地管理2.0
const baseManageList = () => import('@/views/admin/baseManage/baseList/index')// 基地列表
const baseManageListAdd = () => import('@/views/admin/baseManage/baseList/add')
const baseManageListDetail = () => import('@/views/admin/baseManage/baseList/detail')
const baseManageListEdit = () => import('@/views/admin/baseManage/baseList/edit')

// 基地基本信息
const baseInfo = () => import('@/views/admin/baseManage/baseInfo/index')

// 机构/基地权限2.0
const baseAuthortySchedule = () => import('@/views/admin/baseManage/schedule/index')
const baseAuthortyScheduleDetail = () => import('@/views/admin/baseManage/schedule/scheduleDetail')

// 教育局管理2.0
const educationList = () => import('@/views/admin/educationBorad/educationList')
const educationDetail = () => import('@/views/admin/educationBorad/detail')
const educationAdd = () => import('@/views/admin/educationBorad/add')
const educationEdit = () => import('@/views/admin/educationBorad/edit')
const educationInfo = () => import('@/views/admin/educationBorad/EducationInfo')

// 类型管理
const typeManage = () => import('@/views/admin/typeManage/list')
const typeManageAdd = () => import('@/views/admin/typeManage/add')
const typeManageEdit = () => import('@/views/admin/typeManage/edit')
const typeManageAddType = () => import('@/views/admin/typeManage/addType')
const typeManageTypeEdit = () => import('@/views/admin/typeManage/typeEdit')

// 活动成果管理
const publishActivityfruit = () => import('@/views/admin/activityfruit/publishActivityfruit.vue')
const activityfruitList = () => import('@/views/admin/activityfruit/activityfruitList.vue')
const wtAuditList = () => import('@/views/admin/activityfruit/wtAuditList.vue')
const activityfruitdraft = () => import('@/views/admin/activityfruit/activityfruitdraft.vue')

Vue.use(Router)

export default new Router({
    routes: [
        // 首页
        {
            path: '/',
            name: 'home',
            component: home
        },
        // 系统管理
        {
            path: '/system',
            name: 'system',
            component: container,
            children: [
                // 菜单管理
                {
                    path: 'permiss',
                    component: permiss
                },
                // 角色管理
                {
                    path: 'role',
                    component: role
                },
                // 数据字典
                {
                    path: 'datadict',
                    component: datadict
                },
                // 学年学期
                {
                    path: 'term',
                    component: term
                }
            ]
        },
        // 配置管理
        {
            path: '/configure',
            name: 'configure',
            component: container,
            children: [
                // 友情链接
                {
                    path: 'link',
                    component: link
                },
                // 导航管理
                {
                    path: 'nav',
                    component: nav
                },
                // Banner图管理
                {
                    path: 'banner',
                    component: banner
                },
                {
                    path: 'bannerList',
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: bannerList,
                        },
                        {
                            path: 'add',
                            component: bannerAdd,
                        },
                        {
                            path: 'edit',
                            component: bannerEdit,
                        },
                    ]
                }
            ]
        },
        // 学校管理
        {
            name: 'xuexiao',
            path: '/xuexiao',
            component: container,
            children: [
                // 学校管理
                {
                    path: 'schoolList',
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: schoolList,

                        }, {
                            path: 'schoolListDetail',
                            component: schoolListDetail
                        },
                        {
                            path: 'add',
                            component: schoolAdd
                        },
                        {
                            path: 'edit',
                            component: schoolEdit
                        },

                    ]
                },
                {
                    path: 'schoolGrade',
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: schoolGrade,

                        }, {
                            path: 'schoolGradeAdd',
                            component: schoolGradeAdd
                        },
                        {
                            path: 'edit',
                            component: schoolGradeEdit
                        },
                        {
                            path: 'detail',
                            component: schoolGradeDetail
                        }

                    ]
                },
                // 学生管理
                {
                    path: 'schoolStudent',
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: schoolStudent,

                        }, {
                            path: 'schoolStudentAdd',
                            component: schoolStudentAdd
                        }, {
                            path: 'schoolStudentEdit',
                            component: schoolStudentAdd
                        }

                    ]
                },
                // 教师管理
                {
                    path: 'schoolTeacher',
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: schoolTeacher,

                        }, {
                            path: 'schoolTeacherAdd',
                            component: schoolTeacherAdd
                        }, {
                            path: 'schoolTeacherEdit',
                            component: schoolTeacherAdd
                        }

                    ]
                },
                {
                    path: 'schoolinfo',
                    component: schoolinfo
                }

            ]
        },
        // 实践管理2.0
        {
            name: 'practicalManage',
            path: '/practicalManage',
            component: container,
            children: [
                {
                    path: 'createActivity',
                    component: createActivity,
                },
                {
                    path: 'courseManage',
                    component: courseManage,
                },
                {
                    path: 'courseRecord',
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: courseRecord,

                        },
                        {
                            path: 'courseSchedule',
                            component: courseSchedule,

                        },
                    ]

                },
                {
                    path: 'courseDetail',
                    component: courseDetail,
                },
                {
                    path: 'courseEdit',
                    component: courseEdit,
                },
                // ------------------------------------------
                {
                    path: 'practicalStart',
                    component: practicalStart,
                },
                {
                    path: 'practicalList',
                    component: practicalList,

                },
                {
                    path: 'practicalSure',
                    component: practicalSure,
                },
                {
                    path: 'activityCalendar',
                    component: activityCalendar,
                },
                {
                    path: 'startOpenActivity',
                    component: startOpenActivity,
                },
                {
                    path: 'openActivityList',
                    component: openActivityList,
                },
                {
                    path: 'openActivityInfo',
                    component: openActivityInfo,
                },
                {
                    path: 'openActivityPartake',
                    component: openActivityPartake,
                },
                // ------------------------------------------
                {
                    path: 'baseAuthortySchedule',
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: baseAuthortySchedule
                        },
                        {
                            path: 'baseAuthortyScheduleDetail',
                            component: baseAuthortyScheduleDetail
                        },

                    ]
                },
            ]
        },

        // 账号管理2.0
        {
            name: 'accoutManage',
            path: '/accoutManage',
            component: container,
            children: [{
                path: 'school',
                component: container,
                children: [
                    {
                        path: '/',
                        component: accountSchool,

                    }, {
                        path: 'add',
                        component: accountSchoolAdd,
                    }, {
                        path: 'edit',
                        component: accountSchoolEdit
                    }
                ]
            }, {
                path: 'admin',
                component: container,
                children: [
                    {
                        path: '/',
                        component: accountAdmin,

                    }, {
                        path: 'add',
                        component: accountAdminAdd,
                    }, {
                        path: 'edit',
                        component: accountAdminEdit,
                    }
                ]
            }, {
                path: 'base',
                component: container,
                children: [
                    {
                        path: '/',
                        component: accountBase,

                    }, {
                        path: 'add',
                        component: accountBaseAdd,
                    }, {
                        path: 'edit',
                        component: accountBaseEdit,
                    }
                ]
            }, {
                path: 'education',
                component: container,
                children: [
                    {
                        path: '/',
                        component: accountEducation,

                    }, {
                        path: 'add',
                        component: accountEducationAdd,
                    }, {
                        path: 'edit',
                        component: accountEducationEdit,
                    }
                ]
            },

            ]

        },
        // 基地/机构
        {
            name: 'baseManage',
            path: '/baseManage',
            component: container,
            children: [{
                path: 'baseList',
                component: container,
                children: [
                    {
                        path: '/',
                        component: baseManageList,

                    }, {
                        path: 'add',
                        component: baseManageListAdd,
                    }, {
                        path: 'detail',
                        component: baseManageListDetail,
                    }, {
                        path: 'edit',
                        component: baseManageListEdit,
                    }
                ]
            },
            {
                path: 'baseInfo',
                component: baseInfo,
            }

            ]

        },
        // 教育局管理2.0
        {
            name: 'educationBorad',
            path: '/educationBorad',
            component: container,
            children: [{
                path: 'list',
                component: educationList,
            },
            {
                path: 'detail',
                component: educationDetail
            },
            {
                path: 'add',
                component: educationAdd
            },
            {
                path: 'edit',
                component: educationEdit
            },
            {
                path: 'educationInfo',
                component: educationInfo
            }]
        },
        // 类型管理
        {
            name: 'typeManage',
            path: '/typeManage',
            component: container,

            children: [{
                path: 'list',
                component: typeManage,
            },
            {
                path: 'add',
                component: typeManageAdd
            },
            {
                path: 'addType',
                component: typeManageAddType
            },
            {
                path: 'edit',
                component: typeManageEdit
            },
            {
                path: 'typeEdit',
                component: typeManageTypeEdit
            }]

        },
        // 活动成果
        {
            name: 'activityfruit',
            path: '/activityfruit',
            component: container,
            children: [
                {
                    path: 'publishActivityfruit',
                    component: publishActivityfruit
                },
                {
                    path: 'activityfruitList',
                    component: activityfruitList
                },
                {
                    path: 'wtAuditList',
                    component: wtAuditList
                },
                {
                    path: 'activityfruitdraft',
                    component: activityfruitdraft
                },
            ]
        },
        // 排课
        ...sortCourse
    ]
})
