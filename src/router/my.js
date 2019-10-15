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

// const course = () => import('@/views/my/course/index')
// const courseCreate = () => import('@/views/my/course/create')

const home = () => import('@/views/my/home/index')

const community = () => import('@/views/my/community/community')
const dlest = () => import('@/views/my/dlest/dlest')
const cbase = () => import('@/views/my/dlest/children/cbase')
const colleges = () => import('@/views/my/dlest/children/colleges')
const serviceevaluation = () => import('@/views/my/dlest/children/serviceevaluation')
const introduce = () => import('@/views/my/dlest/children/introduce')
const curriculum = () => import('@/views/my/dlest/children/curriculum')
const comment = () => import('@/views/my/dlest/children/comment')

const goods = () => import('@/views/my/goods/goods')
const textworks = () => import('@/views/my/goods/children/textworks')
const textdetail = () => import('@/views/my/goods/children/textdetail')
const textevaluate = () => import('@/views/my/goods/children/textevaluate')
// 作品详情
const listsdetail = () => import('@/views/my/listsdetail/listsdetail')
// 通知公告
const activity = () => import('@/views/my/activity/activity')
// 通知详情
const detailsofannouncement = () => import('@/views/my/activity/detailsofannouncement')
// 活动基地
const work = () => import('@/views/my/work/work')
// 活动基地首页
const workshow = () => import('@/views/my/work/workshow')
// 活动基地详情
const basedetails = () => import('@/views/my/work/basedetails')
// 活动资讯详情
const baseinformationdetails = () => import('@/views/my/work/baseinformationdetails')
// 活动服务
const baseservices = () => import('@/views/my/work/children/baseservices')
// 活动资讯
const baseinformation = () => import('@/views/my/work/children/baseinformation')
// 活动评价
const baseevaluation = () => import('@/views/my/work/children/baseevaluation')

// 参与学校
const participation = () => import('@/views/my/participation/participation')
// 校园资讯详情
const schoolinformationdetails = () => import('@/views/my/participation/schoolinformationdetails')
// 学校首页
const schoolhomepage = () => import('@/views/my/participation/schoolhomepage')
// 首页
const schoolfirst = () => import('@/views/my/participation/children/schoolfirst')
// 实践课程
const schoolpracticecourse = () => import('@/views/my/participation/children/schoolpracticecourse')
// 校园资讯
const campusinformation = () => import('@/views/my/participation/children/campusinformation')

// 我的空间
const space = () => import('@/views/my/space/space')
// 教师
// 实践课堂
const classroom = () => import('@/views/my/space/children/classroom')
const sdetails = () => import('@/views/my/space/children/sdetails')
// 活动评价
const activitytimate = () => import('@/views/my/space/children/activitytimate')
const abtd = () => import('@/views/my/space/children/child/abtd')
const giss = () => import('@/views/my/space/children/child/giss')
const ptba = () => import('@/views/my/space/children/child/ptba')
const teacherstobeevaluated = () => import('@/views/my/space/children/child/teacherstobeevaluated')

// 作品管理
const agment = () => import('@/views/my/space/children/agment')
const tbuploaded = () => import('@/views/my/space/children/child/tbuploaded')
const noaudited = () => import('@/views/my/space/children/child/noaudited')
const audited = () => import('@/views/my/space/children/child/audited')
const atdetails = () => import('@/views/my/space/children/atdetails')

// 作品评分
const wscoring = () => import('@/views/my/space/children/wscoring')
const origs = () => import('@/views/my/space/children/child/origs')
const heorigs = () => import('@/views/my/space/children/child/heorigs')
const scofworks = () => import('@/views/my/space/children/scofworks')

// 学生管理
const mgtudent = () => import('@/views/my/space/children/mgtudent')
const archives = () => import('@/views/my/space/children/archives')
const viewworks = () => import('@/views/my/space/children/viewworks')

const bsinfor = () => import('@/views/my/space/children/bsinfor')
// const hdsettings = () => import('@/views/my/space/children/hdsettings')

// 账号安全
const atsecuritys = () => import('@/views/my/space/children/atsecuritys')
const imrevision = () => import('@/views/my/space/children/imrevision')
const imbinding = () => import('@/views/my/space/children/imbinding')
const momailbox = () => import('@/views/my/space/children/momailbox')
const binmomailbox = () => import('@/views/my/space/children/binmomailbox')

// 学生
// 我的课程
const mycourse = () => import('@/views/my/space/student/mycourse')
const toevaluationofstudentactivities = () => import('@/views/my/space/student/toevaluationofstudentactivities')
const detailsofstudentcourses = () => import('@/views/my/space/student/detailsofstudentcourses')
const notstarted = () => import('@/views/my/space/student/children/notstarted')
const haveinhand = () => import('@/views/my/space/student/children/haveinhand')
const completed = () => import('@/views/my/space/student/children/completed')
const coursestobeevaluated = () => import('@/views/my/space/student/children/coursestobeevaluated')
const submissionofworks = () => import('@/views/my/space/student/children/submissionofworks')
// 我的作品
const mywork = () => import('@/views/my/space/student/mywork')
const detailsofstudentworks = () => import('@/views/my/space/student/detailsofstudentworks')
const uploadworks = () => import('@/views/my/space/student/children/uploadworks')
const beaudited = () => import('@/views/my/space/student/children/beaudited')
const adopteder = () => import('@/views/my/space/student/children/adopteder')
const revisionworks = () => import('@/views/my/space/student/revisionworks')
// 学生自我评价
const selfevaluation = () => import('@/views/my/space/student/selfevaluation')
const detailsofselfevaluation = () => import('@/views/my/space/student/detailsofselfevaluation')
const ungradedstudents = () => import('@/views/my/space/student/children/ungradedstudents')
const studentshavebeengraded = () => import('@/views/my/space/student/children/studentshavebeengraded')
const evaluatingothers = () => import('@/views/my/space/student/evaluatingothers')
const evaluateotherswithoutscoring = () => import('@/views/my/space/student/children/evaluateotherswithoutscoring')
const evaluateothersiscores = () => import('@/views/my/space/student/children/evaluateothersiscores')
const filebag = () => import('@/views/my/space/student/filebag')
const basedata = () => import('@/views/my/space/student/basedata')
const headimagesettings = () => import('@/views/my/space/student/headimagesettings')
const accountsecurity = () => import('@/views/my/space/student/accountsecurity')

const profile = () => import('@/views/my/profile/index')

const security = () => import('@/views/my/security/index')
const password = () => import('@/views/my/security/children/password')
const phone = () => import('@/views/my/security/children/phone')
const email = () => import('@/views/my/security/children/email')

const avatar = () => import('@/views/my/avatar/index')

// const message = () => import('@/views/my/message/index')

const works = () => import('@/views/my/works/index')
const workDetails = () => import('@/views/my/works/children/detail')

const workScore = () => import('@/views/my/workScore/index')
const scoreDetail = () => import('@/views/my/workScore/children/detail')

const courses = () => import('@/views/my/courses/index')
const coursesDetail = () => import('@/views/my/courses/children/detail')

const courseComment = () => import('@/views/my/courseComment/index')

const student = () => import('@/views/my/student/index')

Vue.use(Router)

export default new Router({
    linkActiveClass: 'is-nactive',
    // linkExactActiveClass: 'is-eactive',
    routes: [
        { path: '/', redirect: '/index' },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/registertwo',
            name: 'registertwo',
            component: registertwo
        },
        {
            path: '/register',
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
            path: '/findpwd',
            name: 'findpwd',
            component: findpwd
        },
        {
            path: '/index',
            name: 'index',
            component: home,
            meta: {
                activeIndex: 0
            }
        },
        {
            path: '/community',
            name: 'community',
            component: community,
            meta: {
                activeIndex: 1
            }

        },
        {
            path: '/participation', // 参与学校
            name: 'participation',
            component: participation,
            meta: {
                activeIndex: 3
            }

        },
        {
            path: '/schoolinformationdetails', // 校园资讯详情
            name: 'schoolinformationdetails',
            component: schoolinformationdetails,
            meta: {
                activeIndex: 3
            }

        },
        {
            path: '/schoolhomepage', // 参与首页
            name: 'schoolhomepage',
            component: schoolhomepage,
            meta: {
                activeIndex: 3
            },
            redirect: '/schoolfirst',
            children: [{
                path: '/schoolfirst', // 首页
                name: 'schoolfirst',
                component: schoolfirst,
                meta: {
                    activeIndex: 3
                },
            }, {
                path: '/schoolpracticecourse', // 实践课程
                name: 'schoolpracticecourse',
                component: schoolpracticecourse,
                meta: {
                    activeIndex: 3
                },
            }, {
                path: '/campusinformation', // 校园资讯
                name: 'campusinformation',
                component: campusinformation,
                meta: {
                    activeIndex: 3
                },
            }]
        },
        {
            path: '/goods', // 课程详情
            name: 'goods',
            component: goods,
            meta: {
                activeIndex: 1
            },
            redirect: '/textdetail',
            children: [{
                path: '/textworks', // 实践作品
                name: 'textworks',
                component: textworks,
                meta: {
                    activeIndex: 1
                },
            },
            {
                path: '/textdetail', // 课程详情
                name: 'textdetail',
                component: textdetail,
                meta: {
                    activeIndex: 1
                },
            },
            {
                path: '/textevaluate', // 课程评论
                name: 'textevaluate',
                component: textevaluate,
                meta: {
                    activeIndex: 1
                },
            },
            ]
        },
        {
            path: '/listsdetail', // 作品详情
            name: 'listsdetail',
            component: listsdetail,
            meta: {
                activeIndex: 1
            },
        },
        {
            path: '/dlest',
            name: 'dlest',
            component: dlest,
            meta: {
                activeIndex: 1
            },
            redirect: '/colleges',
            children: [{
                path: '/colleges',
                name: 'colleges',
                component: colleges,
                meta: {
                    activeIndex: 1
                },
            },
            {
                path: '/introduce',
                name: 'introduce',
                component: introduce,
                meta: {
                    activeIndex: 1
                },
            },
            {
                path: '/curriculum',
                name: 'curriculum',
                component: curriculum,
                meta: {
                    activeIndex: 1
                },
            },
            {
                path: '/comment',
                name: 'comment',
                component: comment,
                meta: {
                    activeIndex: 1
                },
            },
            {
                path: '/cbase',
                name: 'cbase',
                component: cbase,
                meta: {
                    activeIndex: 1
                },
            },
            {
                path: '/serviceevaluation',
                name: 'serviceevaluation',
                component: serviceevaluation,
                meta: {
                    activeIndex: 1
                },
            }]
        },
        {
            path: '/work', // 基地机构
            name: 'work',
            component: work,
            meta: {
                activeIndex: 2
            },
        },
        {
            path: '/workshow', // 基地首页
            name: 'workshow',
            component: workshow,
            meta: {
                activeIndex: 2
            },
            redirect: '/baseservices',
            children: [{
                path: '/baseservices', // 基地服务
                name: 'baseservices',
                component: baseservices,
                meta: {
                    activeIndex: 2
                },
            }, {
                path: '/baseinformation', // 基地资讯
                name: 'baseinformation',
                component: baseinformation,
                meta: {
                    activeIndex: 2
                },
            }, {
                path: '/baseevaluation', // 基地评价
                name: 'baseevaluation',
                component: baseevaluation,
                meta: {
                    activeIndex: 2
                },
            }]
        },
        {
            path: '/basedetails', // 基地详情、校园资讯详情
            name: 'basedetails',
            component: basedetails,
            meta: {
                activeIndex: 2
            },
        },
        {
            path: '/baseinformationdetails', // 基地资讯详情
            name: 'baseinformationdetails',
            component: baseinformationdetails,
            meta: {
                activeIndex: 2
            },
        },
        {
            path: '/activity', // 通知公告
            name: 'activity',
            component: activity,
            meta: {
                activeIndex: 4
            }
        },
        {
            path: '/detailsofannouncement', // 公告详情
            name: 'detailsofannouncement',
            component: detailsofannouncement,
            meta: {
                activeIndex: 4
            }
        },
        // 我的空间
        {
            path: '/space',
            name: 'space',
            component: space,
            meta: {
                activeIndex: 5
            },
            // redirect: '/classroom',
            children: [{
                path: '/classroom', // 实践课堂
                name: 'classroom',
                component: classroom,
                meta: {
                    activeIndex: 5
                },
                redirect: '/classroom/abtd',
                children: [{
                    path: '/classroom/abtd',
                    name: 'abtd',
                    component: abtd,
                    meta: {
                        activeIndex: 5
                    },
                },
                {
                    path: '/classroom/giss',
                    name: 'giss',
                    component: giss,
                    meta: {
                        activeIndex: 5
                    },
                },
                {
                    path: '/classroom/ptba',
                    name: 'ptba',
                    component: ptba,
                    meta: {
                        activeIndex: 5
                    },
                },
                {
                    path: '/classroom/teacherstobeevaluated', // 教师待评价
                    name: 'teacherstobeevaluated',
                    component: teacherstobeevaluated,
                    meta: {
                        activeIndex: 5
                    },
                }]
            },
            {
                path: '/sdetails', // 课程详情
                name: 'sdetails',
                component: sdetails,
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/activitytimate', // 评价详情
                name: 'activitytimate',
                component: activitytimate,
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/agment', // 作品管理
                name: 'agment',
                component: agment,
                redirect: '/agment/tbuploaded',
                meta: {
                    activeIndex: 5
                },
                children: [{
                    path: '/agment/tbuploaded',
                    name: 'tbuploaded',
                    component: tbuploaded,
                    meta: {
                        activeIndex: 5
                    },
                },
                {
                    path: '/agment/noaudited',
                    name: 'noaudited',
                    component: noaudited,
                    meta: {
                        activeIndex: 5
                    },
                },
                {
                    path: '/agment/audited',
                    name: 'audited',
                    component: audited,
                    meta: {
                        activeIndex: 5
                    },
                }],
            },
            {
                path: '/atdetails', // 作品详情
                name: 'atdetails',
                component: atdetails,
                meta: {
                    activeIndex: 5
                },
            }, {
                path: '/wscoring', // 作品评分
                name: 'wscoring',
                component: wscoring,
                meta: {
                    activeIndex: 5
                },
                redirect: '/wscoring/origs',
                children: [{
                    path: '/wscoring/origs',
                    name: 'origs',
                    component: origs, // 未评分
                    meta: {
                        activeIndex: 5
                    },
                },
                {
                    path: '/wscoring/heorigs',
                    name: 'heorigs',
                    component: heorigs, // 已评分
                    meta: {
                        activeIndex: 5
                    },
                }]
            }, {
                path: '/scofworks', // 评分详情
                name: 'scofworks',
                component: scofworks,
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/mgtudent',
                name: 'mgtudent',
                component: mgtudent, // 学生管理
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/archives',
                name: 'archives',
                component: archives, // 学生档案
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/viewworks',
                name: 'viewworks',
                component: viewworks, // 查看作品
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/bsinfor',
                name: 'bsinfor',
                component: bsinfor, // 基本资料
                meta: {
                    activeIndex: 5
                },
            },
            // }, {
            //     path: '/hdsettings',
            //     name: 'hdsettings',
            //     component: hdsettings // 头像设置 avatar
            // },
            {
                path: '/avatar',
                name: 'avatar',
                component: avatar, // 头像设置 avatar
                meta: {
                    activeIndex: 5
                },
            }, {
                path: '/atsecurity',
                name: 'atsecurity',
                component: atsecuritys, // 账号安全
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/imrevision',
                name: 'imrevision',
                component: imrevision, // 立即修改
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/imbinding',
                name: 'imbinding',
                component: imbinding, // 账号安全
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/momailbox',
                name: 'momailbox',
                component: momailbox,// 账号安全
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/binmomailbox',
                name: 'binmomailbox',
                component: binmomailbox, // 账号安全
                meta: {
                    activeIndex: 5
                },
            },

            // 学生端
            {
                path: '/mycourse', // 我的课程
                name: 'mycourse',
                component: mycourse,
                meta: {
                    activeIndex: 5
                },
                redirect: '/mycourse/notstarted',
                children: [{
                    path: '/mycourse/notstarted', // 未开始
                    name: 'notstarted',
                    component: notstarted,
                    meta: {
                        activeIndex: 5
                    },
                },
                {
                    path: '/mycourse/haveinhand', // 进行中
                    name: 'haveinhand',
                    component: haveinhand,
                    meta: {
                        activeIndex: 5
                    },
                },
                {
                    path: '/mycourse/completed', // 已完成
                    name: 'completed',
                    component: completed,
                    meta: {
                        activeIndex: 5
                    },
                },
                {
                    path: '/mycourse/coursestobeevaluated', // 待评价
                    name: 'coursestobeevaluated',
                    component: coursestobeevaluated,
                    meta: {
                        activeIndex: 5
                    },
                }]
            },
            {
                path: '/detailsofstudentcourses', // 课程详情
                name: 'detailsofstudentcourses',
                component: detailsofstudentcourses,
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/toevaluationofstudentactivities', // 作品评价
                name: 'toevaluationofstudentactivities',
                component: toevaluationofstudentactivities,
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/submissionofworks', // 提交作品
                name: 'submissionofworks',
                component: submissionofworks,
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/mywork', // 我的作品
                name: 'mywork',
                component: mywork,
                meta: {
                    activeIndex: 5
                },
                redirect: '/mywork/uploadworks',
                children: [{
                    path: '/mywork/uploadworks', // 上传作品
                    name: 'uploadworks',
                    component: uploadworks,
                    meta: {
                        activeIndex: 5
                    },
                },
                {
                    path: '/mywork/beaudited', // 待审核
                    name: 'beaudited',
                    component: beaudited,
                    meta: {
                        activeIndex: 5
                    },
                },
                {
                    path: '/mywork/adopteder', // 已通过
                    name: 'adopteder',
                    component: adopteder,
                    meta: {
                        activeIndex: 5
                    },
                }]
            },
            {
                path: '/revisionworks', // 修改作品
                name: 'revisionworks',
                component: revisionworks,
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/detailsofstudentworks', // 作品详情
                name: 'detailsofstudentworks',
                component: detailsofstudentworks,
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/selfevaluation', // 自我评价
                name: 'selfevaluation',
                component: selfevaluation,
                meta: {
                    activeIndex: 5
                },
                redirect: '/selfevaluation/ungradedstudents',
                children: [{
                    path: '/selfevaluation/ungradedstudents', // 未评分
                    name: 'ungradedstudents',
                    component: ungradedstudents,
                    meta: {
                        activeIndex: 5
                    },
                },
                {
                    path: '/selfevaluation/studentshavebeengraded', // 已评分
                    name: 'studentshavebeengraded',
                    component: studentshavebeengraded,
                    meta: {
                        activeIndex: 5
                    },
                }]
            },
            {
                path: '/detailsofselfevaluation', // 自我评价详情
                name: 'detailsofselfevaluation',
                component: detailsofselfevaluation,
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/evaluatingothers', // 评价他人
                name: 'evaluatingothers',
                component: evaluatingothers,
                meta: {
                    activeIndex: 5
                },
                redirect: '/evaluatingothers/evaluateotherswithoutscoring',
                children: [{
                    path: '/evaluatingothers/evaluateotherswithoutscoring', // 评价他人未评分
                    name: 'evaluateotherswithoutscoring',
                    component: evaluateotherswithoutscoring,
                    meta: {
                        activeIndex: 5
                    },
                },
                {
                    path: '/evaluatingothers/evaluateothersiscores', // 评价他人已评分
                    name: 'evaluateothersiscores',
                    component: evaluateothersiscores,
                    meta: {
                        activeIndex: 5
                    },
                }]
            },
            {
                path: '/filebag', // 档案袋
                name: 'filebag',
                component: filebag,
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/basedata', // 基本资料
                name: 'basedata',
                component: basedata,
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/headimagesettings', // 头像设置
                name: 'headimagesettings',
                component: headimagesettings,
                meta: {
                    activeIndex: 5
                },
            },
            {
                path: '/accountsecurity', // 账号安全
                name: 'accountsecurity',
                component: accountsecurity,
                meta: {
                    activeIndex: 5
                },
            }]
        },

        // 评课活动
        // { path: '/course', redirect: '/course/pass' },
        // {
        //     path: '/course/create',
        //     component: courseCreate
        // },
        // {
        //     path: '/course/edit',
        //     component: courseCreate
        // },
        // { path: '/course', redirect: '/course/pass' },
        // {
        //     path: '/course/:status',
        //     component: course
        // },
        // 个人资料
        {
            path: '/profile',
            component: profile,
        },
        // 账号安全
        {
            path: '/security',
            component: security,
            meta: {
                activeIndex: 5
            },
        },
        {
            path: '/security/password',
            component: password,
            meta: {
                activeIndex: 5
            },
        },
        {
            path: '/security/phone',
            component: phone,
            meta: {
                activeIndex: 5
            },
        },
        {
            path: '/security/email',
            component: email,
            meta: {
                activeIndex: 5
            },
        },
        // 头像设置
        {
            path: '/avatar',
            component: avatar,
            meta: {
                activeIndex: 5
            },
        },
        // 消息中心
        // {
        //     path: '/message',
        //     component: message
        // },

        // 作品详情
        {
            path: '/works/detail/:id',
            component: workDetails,
        },
        // 作品管理
        {
            path: '/works',
            component: works,
            // redirect: '/admin/works/audited',
            // children: [
            //     {
            //         path: 'detail/:id',
            //         component: workDetails
            //     }
            // ]
        },
        // 评分详情
        {
            path: '/workScore/detail/:id',
            component: scoreDetail
        },
        // 作品评分
        {
            path: '/workScore',
            component: workScore
        },
        // 实践课程
        {
            path: '/courses',
            component: courses
        },
        // 实践课程详情
        {
            path: '/courses/detail/:id',
            component: coursesDetail,
        },
        // 课程点评
        {
            path: '/courseComment',
            component: courseComment
        },
        // 学生管理
        {
            path: '/student',
            component: student
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
