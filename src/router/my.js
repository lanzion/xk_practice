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
// ---------------------------------------------------------------------------------------
const community = () => import('@/views/my/curriculumcenter/index') // 课程中心
const coursedetails = () => import('@/views/my/curriculumcenter/coursedetails/index') // 课程详情
const courseintroduction = () => import('@/views/my/curriculumcenter/coursedetails/courseintroduction/courseintroduction') // 课程介绍
const participatinginstitutions = () => import('@/views/my/curriculumcenter/coursedetails/participatinginstitutions/participatinginstitutions') // 参与院校
const practicalcurriculum = () => import('@/views/my/curriculumcenter/coursedetails/practicalcurriculum/practicalcurriculum') // 实践课程
const activityreview = () => import('@/views/my/curriculumcenter/coursedetails/activityreview/activityreview') // 活动点评
// ---------------------------------------------------------------------------------------
const work = () => import('@/views/my/work/index') // 基地/机构
const basedetails = () => import('@/views/my/work/basedetails/index') // 基地/机构详情
const relatedcourses = () => import('@/views/my/work/basedetails/relatedcourses/relatedcourses') // 相关课程
const relatedcoursesdetails = () => import('@/views/my/work/basedetails/relatedcourses/relatedcoursesdetails') // 相关课程--详情
const relatedinformation = () => import('@/views/my/work/basedetails/relatedinformation/relatedinformation') // 相关资讯
const relatedinformationdetails = () => import('@/views/my/work/basedetails/relatedinformation/relatedinformationdetails') // 相关资讯--详情
const baseevaluation = () => import('@/views/my/work/basedetails/baseevaluation/baseevaluation') // 基地/机构评价
// ---------------------------------------------------------------------------------------
const participation = () => import('@/views/my/participation/index') // 学校专栏
const participationdetails = () => import('@/views/my/participation/participationdetails/index') // 学校专栏--详情
const schoolhomepage = () => import('@/views/my/participation/participationdetails/schoolhomepage/schoolhomepage') // 学校专栏--详情（首页）
const schoolcurriculum = () => import('@/views/my/participation/participationdetails/schoolcurriculum/schoolcurriculum') // 学校专栏--详情（课程）
const schoolinformation = () => import('@/views/my/participation/participationdetails/schoolinformation/schoolinformation') // 学校专栏--详情（资讯）
const schoolinformationdetails = () => import('@/views/my/participation/participationdetails/schoolinformation/schoolinformationdetails') // 学校专栏--详情（资讯--详情）
// ---------------------------------------------------------------------------------------
const activity = () => import('@/views/my/activity/index') // 通知公告
const activitydetails = () => import('@/views/my/activity/activitydetails/activitydetails') // 通知公告--详情
// ---------------------------------------------------------------------------------------
const space = () => import('@/views/my/space/index') // 我的空间

const bsinfor = () => import('@/views/my/space/common/bsinfor/index') // 基本资料（公用）
const avatar = () => import('@/views/my/space/common/avatar/index') // 头像设置（公用）
const accountsecurity = () => import('@/views/my/space/common/accountsecurity/index') // 账号安全（公用）
const pswd = () => import('@/views/my/space/common/accountsecurity/pswd/index') // 账号安全（公用）--密码
const phone = () => import('@/views/my/space/common/accountsecurity/phone/index') // 账号安全（公用）--手机
const email = () => import('@/views/my/space/common/accountsecurity/email/index') // 账号安全（公用）--邮箱

const classroom = () => import('@/views/my/space/teacher/classroom/index') // 实践课堂（教师）
const curriculumdetails = () => import('@/views/my/space/teacher/classroom/curriculumdetails') // 实践课堂（教师）--课程详情
const curriculumevaluation = () => import('@/views/my/space/teacher/classroom/curriculumevaluation') // 实践课堂（教师）--课程评价
const abtd = () => import('@/views/my/space/teacher/classroom/children/abtd') // 实践课堂（教师）--未开始
const giss = () => import('@/views/my/space/teacher/classroom/children/giss') // 实践课堂（教师）--进行中
const ptba = () => import('@/views/my/space/teacher/classroom/children/ptba') // 实践课堂（教师）--已完成
const teacherstobeevaluated = () => import('@/views/my/space/teacher/classroom/children/teacherstobeevaluated') // 实践课堂（教师）--待评价

const agment = () => import('@/views/my/space/teacher/agment/index') // 作品管理（教师）
const tbuploaded = () => import('@/views/my/space/teacher/agment/children/tbuploaded') // 作品管理（教师）--待上传
const noaudited = () => import('@/views/my/space/teacher/agment/children/noaudited') // 作品管理（教师）--未审核
const audited = () => import('@/views/my/space/teacher/agment/children/audited') // 作品管理（教师）--已审核

const wscoring = () => import('@/views/my/space/teacher/wscoring/index') // 作品评分（教师）
const origs = () => import('@/views/my/space/teacher/wscoring/children/origs') // 作品评分（教师）--未评分
const heorigs = () => import('@/views/my/space/teacher/wscoring/children/heorigs') // 作品评分（教师）--已评分

const mgtudent = () => import('@/views/my/space/teacher/mgtudent/index') // 学生管理（教师）

// ---------------------------------------------------------------------------------------

const mycourse = () => import('@/views/my/space/student/mycourse/index') // 我的课程（学生）
const notstarted = () => import('@/views/my/space/student/mycourse/children/notstarted') // 我的课程（学生）--未开始
const haveinhand = () => import('@/views/my/space/student/mycourse/children/haveinhand') // 我的课程（学生）--进行中
const completed = () => import('@/views/my/space/student/mycourse/children/completed') // 我的课程（学生）--已完成
const coursestobeevaluated = () => import('@/views/my/space/student/mycourse/children/coursestobeevaluated') // 我的课程（学生）--待评价

const mywork = () => import('@/views/my/space/student/mywork/index') // 我的作品（学生）
const uploadworks = () => import('@/views/my/space/student/mywork/children/uploadworks') // 我的作品（学生）--上传作品
const beaudited = () => import('@/views/my/space/student/mywork/children/beaudited') // 我的作品（学生）--待审核
const adopteder = () => import('@/views/my/space/student/mywork/children/adopteder') // 我的作品（学生）--已通过

const selfevaluation = () => import('@/views/my/space/student/selfevaluation/index') // 自我评价（学生）
const ungradedstudents = () => import('@/views/my/space/student/selfevaluation/children/ungradedstudents') // 自我评价（学生）--未评分
const studentshavebeengraded = () => import('@/views/my/space/student/selfevaluation/children/studentshavebeengraded') // 自我评价（学生）--已评分

const evaluatingothers = () => import('@/views/my/space/student/evaluatingothers/index') // 评价他人（学生）
const evaluateotherswithoutscoring = () => import('@/views/my/space/student/evaluatingothers/children/evaluateotherswithoutscoring') // 自我评价（学生）--未评分
const evaluateothersiscores = () => import('@/views/my/space/student/evaluatingothers/children/evaluateothersiscores') // 自我评价（学生）--已评分

const archives = () => import('@/views/my/space/student/archives/index') // 档案袋（学生）

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
        path: '/index', // 首页
        name: 'index',
        component: home,
    },

        // ------------------------------------------------------------
   
    {
        path: '/community', // 课程中心
        name: 'community',
        component: community,
    },
    {
        path: '/community/coursedetails', // 课程详情
        name: 'coursedetails',
        component: coursedetails,
        redirect: '/community/coursedetails/courseintroduction',
        children: [{
            path: '/community/coursedetails/courseintroduction', // 课程介绍
            name: 'courseintroduction',
            component: courseintroduction,
        }, {
            path: '/community/coursedetails/participatinginstitutions', // 参与院校
            name: 'participatinginstitutions',
            component: participatinginstitutions,
        }, {
            path: '/community/coursedetails/practicalcurriculum', // 实践课程
            name: 'practicalcurriculum',
            component: practicalcurriculum,
        }, {
            path: '/community/coursedetails/activityreview', // 活动点评
            name: 'activityreview',
            component: activityreview,
        }]
    },
        // ------------------------------------------------------------
    {
        path: '/work', // 基地/机构
        name: 'work',
        component: work,
    },
    {
        path: '/work/basedetails', // 基地/机构--详情
        name: 'basedetails',
        component: basedetails,
        redirect: '/work/basedetails/relatedcourses',
        children: [{
            path: '/work/basedetails/relatedcourses', // 相关课程
            name: 'relatedcourses',
            component: relatedcourses,
        }, {
            path: '/work/basedetails/relatedinformation', // 相关资讯
            name: 'relatedinformation',
            component: relatedinformation,
        }, {
            path: '/work/basedetails/baseevaluation', // 基地/机构评价
            name: 'baseevaluation',
            component: baseevaluation,
        }]
    },
    {
        path: '/work/basedetails/relatedcourses/relatedcoursesdetails', // 相关课程--详情
        name: 'relatedcoursesdetails',
        component: relatedcoursesdetails,
    },
    {
        path: '/work/basedetails/relatedinformation/relatedinformationdetails', // 相关资讯--详情
        name: 'relatedinformationdetails',
        component: relatedinformationdetails,
    },
        // ------------------------------------------------------------
    {
        path: '/participation', // 学校专栏
        name: 'participation',
        component: participation,
    },
    {
        path: '/participation/participationdetails', // 学校专栏--详情
        name: 'participationdetails',
        component: participationdetails,
        redirect: '/participation/participationdetails/schoolhomepage',
        children: [{
            path: '/participation/participationdetails/schoolhomepage', // 学校专栏--详情（首页）
            name: 'schoolhomepage',
            component: schoolhomepage,
        }, {
            path: '/participation/participationdetails/schoolcurriculum', // 学校专栏--详情（课程）
            name: 'schoolcurriculum',
            component: schoolcurriculum,
        }, {
            path: '/participation/participationdetails/schoolinformation', // 学校专栏--详情（资讯）
            name: 'schoolinformation',
            component: schoolinformation,
        }],
        
    },
    {
        path: '/participation/participationdetails/schoolinformation/schoolinformationdetails', // 学校专栏--详情（资讯--详情）
        name: 'schoolinformationdetails',
        component: schoolinformationdetails,
    },
        // ------------------------------------------------------------
    {
        path: '/activity', // 通知公告
        name: 'activity',
        component: activity,
    },
    {
        path: '/activity/activitydetails', // 通知公告--详情
        name: 'activitydetails',
        component: activitydetails,
    },
        // ------------------------------------------------------------

        // ------------------------------------------------------------

    {
        path: '/space', // 我的空间
        name: 'space',
        component: space,
        children: [
            {
                path: '/space/classroom', // 实践课堂（教师）
                name: 'classroom',
                component: classroom,
                redirect: '/space/classroom/abtd',
                children: [
                    {
                        path: '/space/classroom/abtd', //  实践课堂（教师）--未开始
                        name: 'abtd',
                        component: abtd,
                    },
                    {
                        path: '/space/classroom/giss', // 实践课堂（教师）--进行中
                        name: 'giss',
                        component: giss,
                    },
                    {
                        path: '/space/classroom/ptba', // 实践课堂（教师）--已完成
                        name: 'ptba',
                        component: ptba,
                    },
                    {
                        path: '/space/classroom/teacherstobeevaluated', // 实践课堂（教师）--待评价
                        name: 'teacherstobeevaluated',
                        component: teacherstobeevaluated,
                    },
                ]
            },
            {
                path: '/space/classroom/curriculumdetails', // 实践课堂（教师）--课程详情
                name: 'curriculumdetails',
                component: curriculumdetails,
            },
            {
                path: '/space/classroom/curriculumevaluation', // 实践课堂（教师）--课程评价
                name: 'curriculumevaluation',
                component: curriculumevaluation,
            },
            {
                path: '/space/agment', // 作品管理（教师）
                name: 'agment',
                component: agment,
                redirect: '/space/agment/tbuploaded',
                children: [
                    {
                        path: '/space/agment/tbuploaded', // 作品管理（教师）--待上传
                        name: 'tbuploaded',
                        component: tbuploaded,
                    },
                    {
                        path: '/space/agment/noaudited', // 作品管理（教师）--未审核
                        name: 'noaudited',
                        component: noaudited,
                    },
                    {
                        path: '/space/agment/audited', // 作品管理（教师）--已审核
                        name: 'audited',
                        component: audited,
                    },
                ]
            },
            {
                path: '/space/wscoring', // 作品评分（教师）
                name: 'wscoring',
                component: wscoring,
                redirect: '/space/wscoring/origs',
                children: [
                    {
                        path: '/space/wscoring/origs', // 作品评分（教师）--未评分
                        name: 'origs',
                        component: origs,
                    },
                    {
                        path: '/space/wscoring/heorigs', // 作品评分（教师）--已评分
                        name: 'heorigs',
                        component: heorigs,
                    },
                ]
            },
            {
                path: '/space/mgtudent', // 学生管理（教师）
                name: 'mgtudent',
                component: mgtudent,
            },

            // ------------------------------------------------------------
        
            {
                path: '/space/mycourse', // 我的课程（学生）
                name: 'mycourse',
                component: mycourse,
                redirect: '/space/mycourse/notstarted',
                children: [
                    {
                        path: '/space/mycourse/notstarted', // 我的课程（学生）--未开始
                        name: 'notstarted',
                        component: notstarted,
                    },
                    {
                        path: '/space/mycourse/haveinhand', // 我的课程（学生）--进行中
                        name: 'haveinhand',
                        component: haveinhand,
                    },
                    {
                        path: '/space/mycourse/completed', // 我的课程（学生）--已完成
                        name: 'completed',
                        component: completed,
                    },
                    {
                        path: '/space/mycourse/coursestobeevaluated', // 我的课程（学生）--待评价
                        name: 'coursestobeevaluated',
                        component: coursestobeevaluated,
                    },
                ]
            },
            {
                path: '/space/mywork', // 我的作品（学生）
                name: 'mywork',
                component: mywork,
                redirect: '/space/mywork/uploadworks',
                children: [
                    {
                        path: '/space/mywork/uploadworks', // 我的作品（学生）--上传作品
                        name: 'uploadworks',
                        component: uploadworks,
                    },
                    {
                        path: '/space/mywork/beaudited', // 我的作品（学生）--待审核
                        name: 'beaudited',
                        component: beaudited,
                    },
                    {
                        path: '/space/mywork/adopteder', // 我的作品（学生）--已通过
                        name: 'adopteder',
                        component: adopteder,
                    },
                ]
            },
            {
                path: '/space/selfevaluation', // 自我评价（学生）
                name: 'selfevaluation',
                component: selfevaluation,
                redirect: '/space/selfevaluation/ungradedstudents',
                children: [
                    {
                        path: '/space/selfevaluation/ungradedstudents', // 自我评价（学生）--未评分
                        name: 'ungradedstudents',
                        component: ungradedstudents,
                    },
                    {
                        path: '/space/selfevaluation/studentshavebeengraded', // 自我评价（学生）--已评分
                        name: 'studentshavebeengraded',
                        component: studentshavebeengraded,
                    },
                ]
            },
            {
                path: '/space/evaluatingothers', // 评价他人（学生）
                name: 'evaluatingothers',
                component: evaluatingothers,
                redirect: '/space/evaluatingothers/evaluateotherswithoutscoring',
                children: [
                    {
                        path: '/space/evaluatingothers/evaluateotherswithoutscoring', // 评价他人（学生）--未评分
                        name: 'evaluateotherswithoutscoring',
                        component: evaluateotherswithoutscoring,
                    },
                    {
                        path: '/space/evaluatingothers/evaluateothersiscores', // 评价他人（学生）--已评分
                        name: 'evaluateothersiscores',
                        component: evaluateothersiscores,
                    },
                ]
            },
            {
                path: '/space/archives', // 档案袋（学生）
                name: 'archives',
                component: archives,
            },

            // ------------------------------------------------------------

            {
                path: '/space/bsinfor', // 基本资料（公用）
                name: 'bsinfor',
                component: bsinfor,
            },
            {
                path: '/space/avatar', // 头像设置（公用）
                name: 'avatar',
                component: avatar,
            },
            {
                path: '/space/accountsecurity', // 账号安全（公用）
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
