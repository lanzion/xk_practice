import Vue from 'vue'
import Router from 'vue-router'

const container = () => import('@/views/admin/container')

// 首页
const home = () => import('@/views/admin/home/index')
const schedule = () => import('@/views/admin/home/children/schedule')

// 活动审核记录
const records = () => import('@/views/admin/records/records')
const relist = () => import('@/views/admin/records/children/relist')
// 活动排课记录
const workout = () => import('@/views/admin/workout/workout')
const worklist = () => import('@/views/admin/workout/children/worklist')
// 基地项目管理
const management = () => import('@/views/admin/management/management')
const managelist = () => import('@/views/admin/management/children/managelist')
// 基地管理
const newgrounds = () => import('@/views/admin/newgrounds/newgrounds')
// 基础管理

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
// ------------------------------------------------------------------------------------------------

// 评分管理2.0
const evaluteManage = () => import('@/views/admin/evaluteManage/record/index')
const evaluteModel = () => import('@/views/admin/evaluteManage/model/index')
const evaluteModelDetail = () => import('@/views/admin/evaluteManage/model/detail')
const evaluteModelAdd = () => import('@/views/admin/evaluteManage/model/add')
const evaluteModeledit = () => import('@/views/admin/evaluteManage/model/edit')

// 校园资讯2.0
const informationManage = () => import('@/views/admin/information/index')
const informationCreate = () => import('@/views/admin/information/add')
const informationEdit = () => import('@/views/admin/information/edit')
// 数据统计2.0
const statisticsActive = () => import('@/views/admin/statistics/activty')
const statisticsCourse = () => import('@/views/admin/statistics/course')
const statisticsDetail = () => import('@/views/admin/statistics/courseDetail')
const statisticsGrade = () => import('@/views/admin/statistics/grade')

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

// 通知公告
const noticeManage = () => import('@/views/admin/noticeManage/index')
const noticeManageCreate = () => import('@/views/admin/noticeManage/add')
const noticeManageEdit = () => import('@/views/admin/noticeManage/edit')
// 基地资讯2.0
const informationBase = () => import('@/views/admin/informationBase/index')
const informationBaseCreate = () => import('@/views/admin/informationBase/add')
const informationBaseEdit = () => import('@/views/admin/informationBase/edit')

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

Vue.use(Router)

export default new Router({
    routes: [
        // 首页
        {
            path: '/',
            name: 'home',
            component: home
        },
        // 课程详情
        {
            path: '/schedule',
            name: 'schedule',
            component: schedule
        },
        // 实践系统
        {
            path: '/practice',
            name: 'practice',
            component: container,
            children: [
                // 活动审核记录
                {
                    path: 'records',
                    component: records,
                },
                {
                    path: 'records/relist',
                    name: 'relist',
                    component: relist,
                },
                // 活动排课记录
                {
                    path: 'workout',
                    name: 'workout',
                    component: workout,
                },
                {
                    path: 'workout/worklist',
                    name: 'worklist',
                    component: worklist,
                },
                // 基地项目管理
                {
                    path: 'management',
                    name: 'management',
                    component: management,
                },
                {
                    path: 'management/managelist',
                    name: 'managelist',
                    component: managelist,
                },
                // 基地管理
                {
                    path: 'newgrounds',
                    name: 'newgrounds',
                    component: newgrounds,
                },
            ]
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
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: createActivity,

                        }
                    ]
                },
                {
                    path: 'courseManage',
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: courseManage,

                        }
                    ]

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
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: courseDetail,

                        }
                    ]

                },
                {
                    path: 'courseEdit',
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: courseEdit,

                        }
                    ]

                },
                // ------------------------------------------
                {
                    path: 'practicalStart',
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: practicalStart
                        }
                    ]

                },
                {
                    path: 'practicalList',
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: practicalList
                        }
                    ]

                },
                {
                    path: 'practicalSure',
                    component: container,
                    children: [
                        {
                            path: '/',
                            component: practicalSure
                        }
                    ]

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
        // 评分管理2.0
        {
            name: 'evaluteManage',
            path: '/evaluteManage',
            component: container,
            children: [{
                path: 'record',
                component: container,
                children: [
                    {
                        path: '/',
                        component: evaluteManage,

                    }
                ]
            }, {
                path: 'evaluteModel',
                component: container,
                children: [
                    {
                        path: '/',
                        component: evaluteModel,

                    }, {
                        path: 'detail',
                        component: evaluteModelDetail,
                    }, {
                        path: 'add',
                        component: evaluteModelAdd,
                    }, {
                        path: 'edit',
                        component: evaluteModeledit,
                    }
                ]
            }]

        },
        // 校园资讯2.0
        {
            name: 'informationManage',
            path: '/informationManage',
            component: container,
            children: [{
                path: 'informationList',
                component: container,
                children: [
                    {
                        path: '/',
                        component: informationManage,

                    }, {
                        path: 'informationCreate',
                        component: informationCreate
                    }, {
                        path: 'edit',
                        component: informationEdit
                    }
                ]
            }]
        },
        // 数据统计2.0
        {
            name: 'statistics',
            path: '/statistics',
            component: container,
            children: [{
                path: 'activty',
                component: container,
                children: [
                    {
                        path: '/',
                        component: statisticsActive,

                    }
                ]
            }, {
                path: 'course',
                component: container,
                children: [
                    {
                        path: '/',
                        component: statisticsCourse,

                    }, {
                        path: 'detail',
                        component: statisticsDetail,
                    }
                ]
            }, {
                path: 'grade',
                component: container,
                children: [
                    {
                        path: '/',
                        component: statisticsGrade,

                    }
                ]
            }]

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

        }, {
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
        // 通知公告
        {
            name: 'noticeManage',
            path: '/noticeManage',
            component: container,
            children: [{
                path: 'index',
                component: noticeManage,
            },
            {
                path: 'create',
                component: noticeManageCreate
            },
            {
                path: 'edit',
                component: noticeManageEdit
            }]
        },
        // 基地资讯.0
        {
            name: 'informationBase',
            path: '/informationBase',
            component: container,
            children: [{
                path: 'list',
                component: informationBase,
            },
            {
                path: 'create',
                component: informationBaseCreate
            },
            {
                path: 'edit',
                component: informationBaseEdit
            }]
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
            ]
        }

    ]
})
