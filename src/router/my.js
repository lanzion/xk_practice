import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const login = () => import('@/views/index/account/login')
const register = () => import('@/views/index/account/register')
const registertwo = () => import('@/views/index/account/registertwo')
const registrationinformation = () => import('@/components/index/account/registrationinformation')
const informationauthentication = () => import('@/components/index/account/informationauthentication')
const completionofregistration = () => import('@/components/index/account/completionofregistration')

const findpwd = () => import('@/views/index/account/findpwd')
// ---------------------------------------------------------------------------------------
const home = () => import('@/views/my/home/index')
const bmap = () => import('@/views/my/bmap/index')
// ---------------------------------------------------------------------------------------
// 课程中心
const course = () => import('@/views/my/course/index')
// 课程详情
const coursedetails = () => import('@/views/my/course/coursedetails/index')

// ---------------------------------------------------------------------------------------

// 基地/机构
const base = () => import('@/views/my/base/index')

// 基地/机构--详情
const basedetail = () => import('@/views/my/base/basedetail/index')

// 基地/机构--详情 --主页
const basedetailpage = () => import('@/views/my/base/basedetail/children/page')
// 基地/机构--详情 --简介
const basedetailbrief = () => import('@/views/my/base/basedetail/children/brief')
// 基地/机构--详情 --课程活动
const basedetailcurriculum = () => import('@/views/my/base/basedetail/children/curriculum')
// 基地/机构--详情 --参与学校
const basedetailschools = () => import('@/views/my/base/basedetail/children/schools')
// 基地/机构--详情 --评价反馈
const basedetailfeedback = () => import('@/views/my/base/basedetail/children/feedback')

// ---------------------------------------------------------------------------------------

// 学校专栏
const school = () => import('@/views/my/school/index')

// 学校专栏--详情
const schooldetail = () => import('@/views/my/school/schooldetail/index')

// 学校专栏--详情 --主页
const schooldetailpage = () => import('@/views/my/school/schooldetail/children/page')
// 学校专栏--详情 --简介
const schooldetailbrief = () => import('@/views/my/school/schooldetail/children/brief')
// 学校专栏--详情 --课程活动
const schooldetailcurriculum = () => import('@/views/my/school/schooldetail/children/curriculum')
// 学校专栏--详情 --参与学校
const schooldetailbases = () => import('@/views/my/school/schooldetail/children/bases')
// 学校专栏--详情 --评价反馈
const schooldetailfeedback = () => import('@/views/my/school/schooldetail/children/feedback')

// ---------------------------------------------------------------------------------------

// 活动中心
const activity = () => import('@/views/my/activity/index')

// 活动中心--活动成果
const activityresults = () => import('@/views/my/activity/activityresults/index')

// 活动中心--活动成果 --详情
const activityresultdetail = () => import('@/views/my/activity/activityresults/activityresultdetail')

// 活动中心--活动报名
const activityregistration = () => import('@/views/my/activity/activityregistration/index')

// 活动中心--活动报名--详情
const activityregistrationdetail = () => import('@/views/my/activity/activityregistration/activityregistrationdetail')

// ---------------------------------------------------------------------------------------

// 通知公告
const notice = () => import('@/views/my/notice/index')
// ---------------------------------------------------------------------------------------

// 我的空间
const space = () => import('@/views/my/space/index')

// 我的空间--学生

// 学生--我的活动
const myactivities = () => import('@/views/my/space/student/myactivities/index')
const registrationactivities = () => import('@/views/my/space/student/myactivities/children/registrationactivities')
const schoolactivity = () => import('@/views/my/space/student/myactivities/children/schoolactivity')

// 学生--我的活动--活动详情
const activityDetail = () => import('@/views/my/space/student/myactivities/activityDetail')

// 学生--我的活动--活动评价
const activityEvaluation = () => import('@/views/my/space/student/myactivities/activityEvaluation')

// 学生--我的活动--活动评价
const lookactivityEvaluation = () => import('@/views/my/space/student/myactivities/lookactivityEvaluation')

// 学生--我的作品
const mywork = () => import('@/views/my/space/student/mywork/index')

// 学生--我的作品
const publishedWorks = () => import('@/views/my/space/student/mywork/publishedWorks')

// 学生--我的作品 --已提交
const submitted = () => import('@/views/my/space/student/mywork/children/submitted')

// 学生--我的作品 -- 草稿
const drafts = () => import('@/views/my/space/student/mywork/children/drafts')

// 学生--我的收藏
const mycollection = () => import('@/views/my/space/student/mycollection/index')
// ---------------------------------------------------------------------------------------

// 基本资料
const bsinfor = () => import('@/views/my/space/common/bsinfor/index')

// 头像设置
const avatar = () => import('@/views/my/space/common/avatar/index')

// 账号安全
const accountsecurity = () => import('@/views/my/space/common/accountsecurity/index')

// 修改邮箱
const email = () => import('@/views/my/space/common/accountsecurity/email/index')

// 修改手机
const phone = () => import('@/views/my/space/common/accountsecurity/phone/index')

// 修改密码
const pswd = () => import('@/views/my/space/common/accountsecurity/pswd/index')
// ---------------------------------------------------------------------------------------

export default new Router({
    linkActiveClass: 'is-nactive',
    // linkExactActiveClass: 'is-eactive',
    routes: [{
        path: '/',
        redirect: '/index'
    },
    {
        path: '/login', //  登录
        name: 'login',
        component: login
    },
    {
        path: '/registertwo',
        name: 'registertwo',
        component: registertwo
    },
    {
        path: '/register', // 注册
        name: 'register',
        component: register,
        redirect: '/registrationinformation',
        children: [{
            path: '/registrationinformation',
            name: 'registrationinformation',
            component: registrationinformation
        }, {
            path: '/informationauthentication',
            name: 'informationauthentication',
            component: informationauthentication
        }, {
            path: '/completionofregistration',
            name: 'completionofregistration',
            component: completionofregistration
        }]
    },
    {
        path: '/findpwd', // 找回密码
        name: 'findpwd',
        component: findpwd
    },
        // ------------------------------------------------------------
    {
        path: '/bmap', // 百度地图
        name: 'bmap',
        component: bmap,
    },
        // ------------------------------------------------------------

    {
        path: '/index', // 首页
        name: 'index',
        component: home,
    },

        // ------------------------------------------------------------

    {
        path: '/course', // 课程中心
        name: 'course',
        component: course,
    },
    {
        path: '/course/coursedetails', // 课程详情
        name: 'coursedetails',
        component: coursedetails,
    },
        // ------------------------------------------------------------

    {
        path: '/base', // 基地机构
        name: 'base',
        component: base,
    },
    {
        path: '/base/basedetail', // 基地详情
        name: 'basedetail',
        component: basedetail,
        redirect: '/base/basedetail/page',
        children: [{
            path: '/base/basedetail/page', // 基地详情--主页
            name: 'page',
            component: basedetailpage,
        }, {
            path: '/base/basedetail/brief', // 基地详情--简介
            name: 'brief',
            component: basedetailbrief,
        }, {
            path: '/base/basedetail/curriculum', // 基地详情--课程活动
            name: 'curriculum',
            component: basedetailcurriculum,
        }, {
            path: '/base/basedetail/schools', // 基地详情--参与学校
            name: 'schools',
            component: basedetailschools,
        }, {
            path: '/base/basedetail/feedback', // 基地详情--评价反馈
            name: 'feedback',
            component: basedetailfeedback,
        }]
    },
        // ------------------------------------------------------------

    {
        path: '/school', // 学校专栏
        name: 'school',
        component: school,
    },

    {
        path: '/school/schooldetail', // 学校详情
        name: 'schooletail',
        component: schooldetail,
        redirect: '/school/schooldetail/page',
        children: [{
            path: '/school/schooldetail/page', // 学校详情--主页
            name: 'schooldetailpage',
            component: schooldetailpage,
        }, {
            path: '/school/schooldetail/brief', // 学校详情--简介
            name: 'schooldetailbrief',
            component: schooldetailbrief,
        }, {
            path: '/school/schooldetail/curriculum', // 学校详情--课程活动
            name: 'schooldetailcurriculum',
            component: schooldetailcurriculum,
        }, {
            path: '/school/schooldetail/bases', // 学校详情--参与学校
            name: 'schooldetailbases',
            component: schooldetailbases,
        }, {
            path: '/school/schooldetail/feedback', // 学校详情--评价反馈
            name: 'schooldetailfeedback',
            component: schooldetailfeedback,
        }]
    },
        // ------------------------------------------------------------

    {
        path: '/activity', // 活动中心
        name: 'activity',
        component: activity,
    },
    {
        path: '/activity/activityresults', // 活动成果
        name: 'activityresults',
        component: activityresults,
    },
    {
        path: '/activity/activityresult/activityresultdetail', // 活动成果--详情
        name: 'activityresultdetail',
        component: activityresultdetail,
    },
    {
        path: '/activity/activityregistration', // 活动报名
        name: 'activityregistration',
        component: activityregistration,
    },
    {
        path: '/activity/activityregistration/activityregistrationdetail', // 活动报名--详情
        name: 'activityregistrationdetail',
        component: activityregistrationdetail,
    },
        // ------------------------------------------------------------

    {
        path: '/notice', // 通知公告
        name: 'notice',
        component: notice,
    },
        // ------------------------------------------------------------

    {
        path: '/space', // 我的空间
        name: 'space',
        component: space,
        children: [
            {
                path: '/space/myactivities', // 我的活动
                name: 'myactivities',
                component: myactivities,
                redirect: '/space/myactivities/schoolactivity',
                children: [{
                    path: '/space/myactivities/schoolactivity', // 我的活动-学校活动
                    name: 'schoolactivity',
                    component: schoolactivity,
                },
                {
                    path: '/space/myactivities/registrationactivities', // 我的活动-报名活动
                    name: 'registrationactivities',
                    component: registrationactivities,
                }]
            },
            {
                path: '/space/myactivities/activityDetail', // 我的活动--活动详情
                name: 'activityDetail',
                component: activityDetail,
            },
            {
                path: '/space/myactivities/activityEvaluation', // 我的活动--活动评价
                name: 'activityEvaluation',
                component: activityEvaluation,
            },
            {
                path: '/space/myactivities/lookactivityEvaluation', // 我的活动--查看活动评价
                name: 'lookactivityEvaluation',
                component: lookactivityEvaluation,
            },
            {
                path: '/space/mywork', // 我的作品
                name: 'mywork',
                component: mywork,
                redirect: '/space/mywork/submitted',
                children: [{
                    path: '/space/mywork/submitted', // 我的作品-已提交
                    name: 'submitted',
                    component: submitted,
                },
                {
                    path: '/space/mywork/drafts', // 我的作品-草稿
                    name: 'drafts',
                    component: drafts,
                }]
            },
            {
                path: '/space/mywork/publishedWorks', // 发布作品
                name: 'publishedWorks',
                component: publishedWorks,
            },
            {
                path: '/space/mycollection', // 我的收藏
                name: 'mycollection',
                component: mycollection,
            },
            {
                path: '/space/bsinfor', // 基本资料
                name: 'bsinfor',
                component: bsinfor,
            },
            {
                path: '/space/avatar', // 头像设置
                name: 'avatar',
                component: avatar,
            },
            {
                path: '/space/accountsecurity', // 账号安全
                name: 'accountsecurity',
                component: accountsecurity,
            },
            {
                path: '/space/accountsecurity/pswd', // 账号安全（公用）--密码
                name: 'pswd',
                component: pswd,
            },
            {
                path: '/space/accountsecurity/phone', // 账号安全（公用）--手机
                name: 'phone',
                component: phone,
            },
            {
                path: '/space/accountsecurity/email', // 账号安全（公用）--邮箱
                name: 'email',
                component: email,
            },

        ]
    },
        // ------------------------------------------------------------

        // {
        //     path: '/course/course', // 课程中心--课程
        //     name: 'course',
        //     component: course,
        //     redirect: '/course/course/textdetail',
        //     children: [{
        //         path: '/course/course/textdetail', // 课程详情
        //         name: 'textdetail',
        //         component: textdetail,
        //     }, {
        //         path: '/course/course/textworks', // 实践作品
        //         name: 'textworks',
        //         component: textworks,
        //     }, {
        //         path: '/course/course/textevaluate', // 课程评论
        //         name: 'textevaluate',
        //         component: textevaluate,
        //     }]
        // },
        // {
        //     path: '/course/course/textworks/workdetail', // 活动详情
        //     name: 'workdetail',
        //     component: workdetail,
        // },
        // ------------------------------------------------------------
        // {
        //     path: '/work', // 基地/机构
        //     name: 'work',
        //     component: work,
        // },
        // {
        //     path: '/work/basedetails', // 基地/机构--详情
        //     name: 'basedetails',
        //     component: basedetails,
        //     redirect: '/work/basedetails/relatedcourses',
        //     children: [{
        //         path: '/work/basedetails/relatedcourses', // 相关课程
        //         name: 'relatedcourses',
        //         component: relatedcourses,
        //     }, {
        //         path: '/work/basedetails/relatedinformation', // 相关资讯
        //         name: 'relatedinformation',
        //         component: relatedinformation,
        //     }, {
        //         path: '/work/basedetails/baseevaluation', // 基地/机构评价
        //         name: 'baseevaluation',
        //         component: baseevaluation,
        //     }]
        // },
        // {
        //     path: '/work/basedetails/relatedcourses/relatedcoursesdetails', // 相关课程--详情
        //     name: 'relatedcoursesdetails',
        //     component: relatedcoursesdetails,
        // },
        // {
        //     path: '/work/basedetails/relatedinformation/relatedinformationdetails', // 相关资讯--详情
        //     name: 'relatedinformationdetails',
        //     component: relatedinformationdetails,
        // },
        // ------------------------------------------------------------
        // {
        //     path: '/participation', // 学校专栏
        //     name: 'participation',
        //     component: participation,
        // },
        // {
        //     path: '/participation/participationdetails', // 学校专栏--详情
        //     name: 'participationdetails',
        //     component: participationdetails,
        //     redirect: '/participation/participationdetails/schoolhomepage',
        //     children: [{
        //         path: '/participation/participationdetails/schoolhomepage', // 学校专栏--详情（首页）
        //         name: 'schoolhomepage',
        //         component: schoolhomepage,
        //     }, {
        //         path: '/participation/participationdetails/schoolcurriculum', // 学校专栏--详情（课程）
        //         name: 'schoolcurriculum',
        //         component: schoolcurriculum,
        //     }, {
        //         path: '/participation/participationdetails/schoolinformation', // 学校专栏--详情（资讯）
        //         name: 'schoolinformation',
        //         component: schoolinformation,
        //     }],

        // },
        // {
        //     path: '/participation/participationdetails/schoolinformation/schoolinformationdetails', // 学校专栏--详情（资讯--详情）
        //     name: 'schoolinformationdetails',
        //     component: schoolinformationdetails,
        // },
        // ------------------------------------------------------------
        // {
        //     path: '/activity', // 通知公告
        //     name: 'activity',
        //     component: activity,
        // },
        // {
        //     path: '/activity/activitydetails', // 通知公告--详情
        //     name: 'activitydetails',
        //     component: activitydetails,
        // },
        // ------------------------------------------------------------

        // ------------------------------------------------------------

        // {
        //     path: '/space', // 我的空间
        //     name: 'space',
        //     component: space,
        //     children: [{
        //         path: '/space/classroom', // 实践课堂（教师）
        //         name: 'classroom',
        //         component: classroom,
        //         redirect: '/space/classroom/abtd',
        //         children: [{
        //             path: '/space/classroom/abtd', //  实践课堂（教师）--未开始
        //             name: 'abtd',
        //             component: abtd,
        //         },
        //         {
        //             path: '/space/classroom/giss', // 实践课堂（教师）--进行中
        //             name: 'giss',
        //             component: giss,
        //         },
        //         {
        //             path: '/space/classroom/ptba', // 实践课堂（教师）--已完成
        //             name: 'ptba',
        //             component: ptba,
        //         },
        //         {
        //             path: '/space/classroom/teacherstobeevaluated', // 实践课堂（教师）--待评价
        //             name: 'teacherstobeevaluated',
        //             component: teacherstobeevaluated,
        //         },
        //         ]
        //     },
        //     {
        //         path: '/space/classroom/curriculumdetails', // 实践课堂（教师）--课程详情
        //         name: 'curriculumdetails',
        //         component: curriculumdetails,
        //     },
        //     {
        //         path: '/space/classroom/curriculumevaluation', // 实践课堂（教师）--课程评价
        //         name: 'curriculumevaluation',
        //         component: curriculumevaluation,
        //     },
        //     {
        //         path: '/space/agment', // 作品管理（教师）
        //         name: 'agment',
        //         component: agment,
        //         redirect: '/space/agment/tbuploaded',
        //         children: [{
        //             path: '/space/agment/tbuploaded', // 作品管理（教师）--待上传
        //             name: 'tbuploaded',
        //             component: tbuploaded,
        //         },
        //         {
        //             path: '/space/agment/noaudited', // 作品管理（教师）--未审核
        //             name: 'noaudited',
        //             component: noaudited,
        //         },
        //         {
        //             path: '/space/agment/audited', // 作品管理（教师）--已审核
        //             name: 'audited',
        //             component: audited,
        //         },
        //         ]
        //     },
        //     {
        //         path: '/space/agment/workdetails', // 作品管理（教师）--作品详情
        //         name: 'workdetails',
        //         component: workdetails,
        //     },
        //     {
        //         path: '/space/wscoring', // 作品评分（教师）
        //         name: 'wscoring',
        //         component: wscoring,
        //         redirect: '/space/wscoring/origs',
        //         children: [{
        //             path: '/space/wscoring/origs', // 作品评分（教师）--未评分
        //             name: 'origs',
        //             component: origs,
        //         },
        //         {
        //             path: '/space/wscoring/heorigs', // 作品评分（教师）--已评分
        //             name: 'heorigs',
        //             component: heorigs,
        //         },
        //         ]
        //     },
        //     {
        //         path: '/space/wscoring/evaluationdetails', // 作品评分（教师）--评分详情
        //         name: 'evaluationdetails',
        //         component: evaluationdetails,
        //     },
        //     {
        //         path: '/space/mgtudent', // 学生管理（教师）
        //         name: 'mgtudent',
        //         component: mgtudent,
        //     },
        //     {
        //         path: '/space/mgtudent/viewworks', // 学生管理--查看作品（教师）
        //         name: 'viewworks',
        //         component: viewworks,
        //     },

        //         // ------------------------------------------------------------

        //     {
        //         path: '/space/mycourse', // 我的课程（学生）
        //         name: 'mycourse',
        //         component: mycourse,
        //         redirect: '/space/mycourse/notstarted',
        //         children: [{
        //             path: '/space/mycourse/notstarted', // 我的课程（学生）--未开始
        //             name: 'notstarted',
        //             component: notstarted,
        //         },
        //         {
        //             path: '/space/mycourse/haveinhand', // 我的课程（学生）--进行中
        //             name: 'haveinhand',
        //             component: haveinhand,
        //         },
        //         {
        //             path: '/space/mycourse/completed', // 我的课程（学生）--已完成
        //             name: 'completed',
        //             component: completed,
        //         },
        //         {
        //             path: '/space/mycourse/coursestobeevaluated', // 我的课程（学生）--待评价
        //             name: 'coursestobeevaluated',
        //             component: coursestobeevaluated,
        //         },
        //         ]
        //     },
        //     {
        //         path: '/space/mycourse/studentcoursedetails', // 我的课程（学生）--课程详情
        //         name: 'studentcoursedetails',
        //         component: studentcoursedetails,
        //     },
        //     {
        //         path: '/space/mycourse/activityevaluation', // 我的课程（学生）--活动评价
        //         name: 'activityevaluation',
        //         component: activityevaluation,
        //     },
        //     {
        //         path: '/space/mywork', // 我的作品（学生）
        //         name: 'mywork',
        //         component: mywork,
        //         redirect: '/space/mywork/uploadworks',
        //         children: [{
        //             path: '/space/mywork/uploadworks', // 我的作品（学生）--上传作品
        //             name: 'uploadworks',
        //             component: uploadworks,
        //         },
        //         {
        //             path: '/space/mywork/beaudited', // 我的作品（学生）--待审核
        //             name: 'beaudited',
        //             component: beaudited,
        //         },
        //         {
        //             path: '/space/mywork/adopteder', // 我的作品（学生）--已通过
        //             name: 'adopteder',
        //             component: adopteder,
        //         },
        //         ]
        //     },
        //     {
        //         path: '/space/mywork/submissionofworks', // 我的作品（学生）--上传作品--详情
        //         name: 'submissionofworks',
        //         component: submissionofworks,
        //     },
        //     {
        //         path: '/space/mywork/studentworkdetails', // 我的作品（学生）--作品详情
        //         name: 'studentworkdetails',
        //         component: studentworkdetails,
        //     },
        //     {
        //         path: '/space/selfevaluation', // 自我评价（学生）
        //         name: 'selfevaluation',
        //         component: selfevaluation,
        //         redirect: '/space/selfevaluation/ungradedstudents',
        //         children: [{
        //             path: '/space/selfevaluation/ungradedstudents', // 自我评价（学生）--未评分
        //             name: 'ungradedstudents',
        //             component: ungradedstudents,
        //         },
        //         {
        //             path: '/space/selfevaluation/studentshavebeengraded', // 自我评价（学生）--已评分
        //             name: 'studentshavebeengraded',
        //             component: studentshavebeengraded,
        //         },
        //         ]
        //     },
        //     {
        //         path: '/space/selfevaluation/detailsofselfevaluation', // 自我评价（学生）--评价详情
        //         name: 'detailsofselfevaluation',
        //         component: detailsofselfevaluation,
        //     },
        //     {
        //         path: '/space/evaluatingothers', // 评价他人（学生）
        //         name: 'evaluatingothers',
        //         component: evaluatingothers,
        //         redirect: '/space/evaluatingothers/evaluateotherswithoutscoring',
        //         children: [{
        //             path: '/space/evaluatingothers/evaluateotherswithoutscoring', // 评价他人（学生）--未评分
        //             name: 'evaluateotherswithoutscoring',
        //             component: evaluateotherswithoutscoring,
        //         },
        //         {
        //             path: '/space/evaluatingothers/evaluateothersiscores', // 评价他人（学生）--已评分
        //             name: 'evaluateothersiscores',
        //             component: evaluateothersiscores,
        //         },
        //         ]
        //     },
        //     {
        //         path: '/space/archives', // 档案袋（学生）
        //         name: 'archives',
        //         component: archives,
        //     },

        //         // ------------------------------------------------------------

        //     {
        //         path: '/space/bsinfor', // 基本资料（公用）
        //         name: 'bsinfor',
        //         component: bsinfor,
        //     },
        //     {
        //         path: '/space/avatar', // 头像设置（公用）
        //         name: 'avatar',
        //         component: avatar,
        //     },
        //     {
        //         path: '/space/accountsecurity', // 账号安全（公用）
        //         name: 'accountsecurity',
        //         component: accountsecurity,
        //     },
        //     {
        //         path: '/space/accountsecurity/pswd', // 账号安全（公用）--密码
        //         name: 'pswd',
        //         component: pswd,
        //     },
        //     {
        //         path: '/space/accountsecurity/phone', // 账号安全（公用）--手机
        //         name: 'phone',
        //         component: phone,
        //     },
        //     {
        //         path: '/space/accountsecurity/email', // 账号安全（公用）--邮箱
        //         name: 'email',
        //         component: email,
        //     },
        //     ]
        // },
        // ------------------------------------------------------------

    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})
