import xhr from 'Axios'

/* 前台
-------------------------- */
// 首页最新作品列表
const getlistofthelatestworks = (options = {}, page) => xhr.post(`/maker/nw/work/portal/list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 首页最新公告
const getlatestannouncement = (options = {}, page) => xhr.post(`/maker/announcement/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 最新实践课NAV
const gettingnavigation = (options = {}) => xhr.post(`/maker/activityType/getActivityTypeParent`, options)
// 根据项目类型获得课程信息
const gettinglists = (options = {}) => xhr.post(`/maker/courseClass/selectCourseByProjectType`, options)
// 查询活动列表
const gettingshow = (options = {}, page) => xhr.post(`/maker/activity/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【首页--实践活动--实践课程】
const listofpractical = (options = {}, page) => xhr.post(`/maker/course/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【参与学校--实践活动--实践课程】
const listofpracticalcourses = (options = {}, page) => xhr.post(`/maker/courseClass/disCoursePager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 获取资讯列表
const gettingnows = (options = {}) => xhr.post(`/maker/information/selectPager`, options)
// 根据活动id获取学校参与记录
const gettingschoollist = (options = {}, page) => xhr.post(`/maker/schActivityDetail/distributionPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 推荐空间-教育局
const gettingBureauofEducation = (options = {}, page) => xhr.post(`/maker/baseEducation/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 推荐空间-基地
const gettingbase = (options = {}, page) => xhr.post(`/maker/adminBaseInfo/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 推荐空间-学校
const gettingcshool = (options = {}, page) => xhr.post(`/maker/baseSchool/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 课程详情
const getcoursedetails = (options = {}) => xhr.post(`/maker/courseClass/distributionDetail`, options)
// 课程作品列表
const getdetailsofworks = (options = {}, page) => xhr.post(`/maker/nw/work/portal/course/list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【实践课程详情】-作品详情
const getlistofcoursedetails = (options = {}) => xhr.post(`/maker/nw/work/portal/detail`, options)
// 【实践课程详情】-作品评论列表
const getworkreviewlist = (options = {}, page) => xhr.post(`/maker/comment/list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【实践课程详情】-评论回复列表
const getworkresponse = (options = {}, page) => xhr.post(`/maker/comment/reply-list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【实践课程详情】-作品点赞
const getcommentsontheworks = (options = {}) => xhr.post(`/maker/work/praise/add`, options)
// 【实践课程详情】-作品分享
const getworksharing = (options = {}) => xhr.post(`/maker/nw/work/portal/share`, options)
// 【实践课程详情】-作品评论
const getworksreview = (options = {}) => xhr.post(`/maker/comment/add`, options)
// 【实践课程详情】-作品举报
const workreviewreport = (options = {}) => xhr.post(`/maker/comment/report/add`, options)
// 【实践课程详情】-评论回复
const getcommentreply = (options = {}) => xhr.post(`/maker/comment/reply`, options)
// 【实践课程详情】-评论点赞
const getcomments = (options = {}) => xhr.post(`/maker/comment/praise`, options)
// 【实践课程详情】-课程评论列表
const alistofcoursereviews = (options = {}, page) => xhr.post(`/maker/course/comment/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【实践课程详情】-课程评论
const responsestocoursecomments = (options = {}) => xhr.post(`/maker/course/comment/add`, options)
// 活动详情
const getcontents = (options = {}) => xhr.post(`/maker/activity/selectDetail`, options)
// 实践统计
const getpracticalstatistics = (options = {}) => xhr.post(`/maker/activityCount/getActivityCount`, options)
// 活动点评
const getcommentsonactivities = (options = {}, page) => xhr.post(`/maker/activity/comment/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 活动排课日程
const getactivityscheduling = (options = {}) => xhr.post(`/maker/activityCount/selectClassArrange`, options)
// 【机构/基地】 --根据类型id查找基地集合
const getjidi = (options = {}, page) => xhr.post(`/maker/adminBaseInfo/selectBaseInfoListByTypeId?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【机构/基地 --获取基地详情】
const getaccesstobasedetails = (options = {}) => xhr.post(`/maker/adminBaseInfo/selectDetail`, options)
// 【机构/基地 --获取基地服务详情】
const accesstobaseservicesdetails = (options = {}, page) => xhr.post(`/maker/baseinfoProject/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 参与学校
const getparticipationinschools = (options = {}, page) => xhr.post(`/maker/schActivityDetail/distributionPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【参与学校--学校详情】
const participationschooldetails = (options = {}) => xhr.post(`/maker/baseSchool/selectDetail`, options)
// 【获取基地资讯-(学校、基地公用)】
const getalistofinformation = (options = {}, page) => xhr.post(`/maker/information/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【学校首页】-学校作品列表
const getlistofschoolworks = (options = {}, page) => xhr.post(`/maker/nw/work/portal/school/list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【基地资讯--资讯详情】-公用
const detailsofpublicinformation = (options = {}) => xhr.post(`/maker/information/selectDetail`, options)
// 【活动基地服务详情】
const detailsofbaseservice = (options = {}) => xhr.post(`/maker/baseinfoProject/selectDetail`, options)
// 【基地服务】- 服务评价列表
const baseserviceevaluationlist = (options = {}, page) => xhr.post(`/maker/servereval/portal/list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【基地服务】- 基地评价列表
const getbaseevaluationlist = (options = {}, page) => xhr.post(`/maker/servereval/portal/bsinfo/list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【公告详情】
const getdetailsofannouncement = (options = {}) => xhr.post(`/maker/announcement/selectDetail`, options)
// 根据活动id获取代课老师集合额
const collectionofsubstituteteachers = (options = {}) => xhr.post(`/maker/courseClass/selectCourseTeacher`, options)
// 获取地区接口
const gettingareainterface = (options = {}) => xhr.post(`/maker/sysArea/currentLocal`, options)
// 【课程实践详情】-作品评论举报
const detailsofcoursepracticereportonworksreview = (options = {}) => xhr.post(`/maker/comment/report/add`, options)
/* 学生
-------------------------- */
// 【我的课程】-未开始列表
const studentsoursesnotstartedlist = (options = {}, page) => xhr.post(`/maker/student/course/nost-list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【我的课程】-进行中列表
const inprogresslistofstudentcourses = (options = {}, page) => xhr.post(`/maker/student/course/inpro-list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【我的课程】-已完成列表
const studentcoursecompletedlist = (options = {}, page) => xhr.post(`/maker/student/course/end-list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【我的课程】-待评价列表
const listlofstudentscoursestobeevaluated = (options = {}, page) => xhr.post(`/maker/servereval/stucourse/noeval-list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【我的课程】-课程详情
const getdetailsofstudentcourses = (options = {}) => xhr.post(`/maker/student/course/detail`, options)
// 【我的课程】-服务评价详情
const detailsofstudentserviceevaluation = (options = {}) => xhr.post(`/maker/servereval/server/noeval-detail`, options)
// 【我的作品】-未上传作品课程列表
// const listofunuploadedworkscourses = (options = {}) => xhr.post(`/maker/student/course/nowork-list`, options)
// 【我的作品】-待审核作品课程列表
const getcourselistofworkstobeaudited = (options = {}) => xhr.post(`/maker/nw/work/wt-rv-list`, options)
// 【我的作品】-未上传作品课程列表
const listofUnuploadedCourseWorks = (options = {}, page) => xhr.post(`/maker/student/course/nowork-list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【我的作品】-待审核作品课程列表
const detailsofcourselistofworkstobeaudited = (options = {}) => xhr.post(`/maker/student/course/course/detail`, options)
// 【我的作品】-待审核作品列表
const listofcourseworkstobeaudited = (options = {}, page) => xhr.post(`/maker/nw/work/wt-rv-list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【我的作品】-已通过作品列表
const listofpassedcourseworks = (options = {}, page) => xhr.post(`/maker/nw/work/pass-list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【我的作品】-作品详情
const myworksdetailsoftheworks = (options = {}) => xhr.post(`/maker/nw/work/detail`, options)
// 【我的作品】-提交
const studentsubmissionofmywork = (options = {}) => xhr.post(`/maker/nw/work/commit`, options)
// 【我的作品】-删除
const studentsdeletemyworks = (options = {}) => xhr.post(`/maker/nw/work/delete`, options)
// 【我的作品】-审核记录
const studentisauditrecordofmyworks = (options = {}) => xhr.post(`/maker/nw/work/review/list`, options)
// 【自我评价】-未点评作品列表
const listofuncommentedworksbystudents = (options = {}, page) => xhr.post(`/maker/selfeval/work/noeval-list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【自我评价】-已点评作品列表
const listofworkscommentedbystudents = (options = {}, page) => xhr.post(`/maker/selfeval/work/eval-list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【自我评价】-未评价详情
const getdetailsofnoselfevaluation = (options = {}) => xhr.post(`/maker/selfeval/work/noeval-detail`, options)
// 【自我评价】-已评价详情
const getdetailsofselfevaluation = (options = {}) => xhr.post(`/maker/selfeval/work/eval-detail`, options)
// 【评价他人】-未评分作品列表
const unevaluatedlistforevaluatingothers = (options = {}) => xhr.post(`/maker/otheval/work/noeval-list`, options)
// 【评价他人】-已评分作品列表
const evaluateothersevaluatedlist = (options = {}) => xhr.post(`/maker/otheval/work/eval-list`, options)
// 【评价他人】-未评价详情
const detailsofnotevaluatingothers = (options = {}) => xhr.post(`/maker/otheval/work/noeval-detail`, options)
// 【评价他人】-已评价详情
const detailsofevaluatingothers = (options = {}) => xhr.post(`/maker/otheval/work/eval-detail`, options)
// 【档案袋】-查看
const getportfolioview = (options = {}) => xhr.post(`/maker/portfolio/view`, options)
// 【档案袋】-班级课程归档
const archivesclasscoursearchives = (options = {}) => xhr.post(`/maker/portfolio/add`, options)
// 【我的作品】-上传作品
const myworksuploadworks = (options = {}) => xhr.post(`/maker/nw/work/add`, options)
// 【我的作品】-修改 保存
const modificationandpreservation = (options = {}) => xhr.post(`/maker/nw/work/modify`, options)
// 【我的课程】-服务评价提交
const mycourseserviceevaluationsubmission = (options = {}) => xhr.post(`/maker/servereval/add`, options)
// 【自我评价】-提交
const selfevaluationsubmission = (options = {}) => xhr.post(`/maker/selfeval/add`, options)
// 【评价他人】-提交
const evaluatingotherssubmit = (options = {}) => xhr.post(`/maker/otheval/add`, options)
// 头像设置
let modifyUserFace = (options = {}) => xhr.post('/portal/user/setUserFace', options)
// 学生详情
let studentdetailscheck = (options = {}) => xhr.post('/admin/baseStudent/selectDetail', options)
// 学生新增
let studentdetailsrevision = (options = {}) => xhr.post('/maker/baseStudent/add', options)
// 学生修改
let studentmodification = (options = {}) => xhr.post('/maker/baseStudent/modify', options)

/* 教师
-------------------------- */
// 课程列表
const listofteacherscourses = (options = {}, page) => xhr.post(`/maker/courseClass/selectClassCourseList?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 作品管理-待上传
const getstudentstoupload = (options = {}, page) => xhr.post(`/maker/courseClass/selectUnUploadStudentList?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【实践课程】-待评价列表
const practicalcoursestobeevaluatedlist = (options = {}, page) => xhr.post(`/maker/servereval/teacourse/noeval-list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 课程详情
const getteachcoursedetails = (options = {}) => xhr.post(`/maker/nw/work/detail`, options)
// 课程详情教师
const coursedetailsteacher = (options = {}) => xhr.post(`/maker/courseClass/selectClassCourseDetail`, options)
// 作品列表（审核与未审核）
const getlistofteachersworks = (options = {}, page) => xhr.post(`/maker/courseClass/selectStudentWorkList?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【教师评价】-未评价作品列表
const listofteachersunevaluatedworks = (options = {}, page) => xhr.post(`/maker/teachereval/work/noeval-list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【教师评价】-已评价作品列表
const listofworkevaluatedbyteachers = (options = {}, page) => xhr.post(`/maker/teachereval/work/eval-list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【教师评价】-未评价详情
const detailsofteacherevaluationnotevaluated = (options = {}) => xhr.post(`/maker/teachereval/work/noeval-detail`, options)
// 【教师评价】-已评价详情
const detailsofteacherevaluationevaluated = (options = {}) => xhr.post(`/maker/teachereval/work/eval-detail`, options)
// 教师id查看班级列表
const teacherscheckclasslist = (options = {}, page) => xhr.post(`/maker/base/class/selectTeacherClassList?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 班级id查看学生列表
const classviewstudentlist = (options = {}, page) => xhr.post(`/maker/baseStudent/selectAllStudentPagerByClassId?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 教师修改密码
const teachersmodifypasswords = (options = {}) => xhr.post(`/portal/user/resetPswByOldPsw`, options)
// 教师修改基本信息
const baseTeacher = (options = {}) => xhr.post(`/maker/baseTeacher/modify`, options)
// 教师添加基本信息
const teachersaddbasicinformation = (options = {}) => xhr.post(`/maker/baseTeacher/add`, options)
// 教师评价提交
const teacherevaluationsubmission = (options = {}) => xhr.post(`/maker/teachereval/add`, options)
// 【学生管理】-学生作品列表
const sudentmanagementlistofstudentworks = (options = {}) => xhr.post(`/maker/nw/work/hascmmt-list`, options)
// 【作品管理】查看学生未上传作品列表
const viewthelistofstudentsnonuploadedworks = (options = {}, page) => xhr.post(`/maker/courseClass/selectStudentUnUploadList?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 【学生管理】-学生档案查看
const studentmanagementstudentarchivesview = (options = {}) => xhr.post(`/maker/portfolio/teacher/student/view`, options)
// 学生详情
let teacherdetailscheck = (options = {}) => xhr.post('/maker/baseTeacher/selectDetail', options)
// 学生管理--查看作品
let studentmanagementviewingworks = (options = {}, page) => xhr.post(`/maker/courseClass/selectWorkList?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options)
// 基地注册 账号验证
let verificationofbaseregistrationaccount = (options = {}) => xhr.post('/portal/user/validateInfo', options)
// 【作品管理】作品审核记录
let workmanagementworkauditrecords = (options = {}) => xhr.post('/maker/work/auditRecord/selectPager', options)
// 【作品管理】作品审核
let workmanagementworkaudit = (options = {}) => xhr.post('/maker/work/audit/check', options)
export {
    gettingnavigation,
    listofpracticalcourses,
    gettingshow,
    gettingnows,
    gettingBureauofEducation,
    gettingbase,
    gettingcshool,
    gettinglists,
    getcontents,
    getcoursedetails,
    getlistofcoursedetails,
    getworkreviewlist,
    getdetailsofworks,
    getworkresponse,
    getcommentsontheworks,
    getworksharing,
    getworksreview,
    getcommentreply,
    getcomments,
    gettingschoollist,
    getpracticalstatistics,
    getcommentsonactivities,
    getactivityscheduling,
    getjidi,
    getlistofthelatestworks,
    getlatestannouncement,
    alistofcoursereviews,
    getparticipationinschools,
    getaccesstobasedetails,
    participationschooldetails,
    getalistofinformation,
    getlistofschoolworks,
    detailsofpublicinformation,
    detailsofbaseservice,
    baseserviceevaluationlist,
    getbaseevaluationlist,
    getdetailsofannouncement,
    responsestocoursecomments,
    workreviewreport,
    collectionofsubstituteteachers,
    gettingareainterface,
    detailsofcoursepracticereportonworksreview,
    accesstobaseservicesdetails,
    listofpractical,
    // 学生
    // listofunuploadedworkscourses,
    getcourselistofworkstobeaudited,
    studentsoursesnotstartedlist,
    inprogresslistofstudentcourses,
    studentcoursecompletedlist,
    listlofstudentscoursestobeevaluated,
    getdetailsofstudentcourses,
    detailsofstudentserviceevaluation,
    listofUnuploadedCourseWorks,
    listofcourseworkstobeaudited,
    listofpassedcourseworks,
    studentsubmissionofmywork,
    studentsdeletemyworks,
    studentisauditrecordofmyworks,
    listofuncommentedworksbystudents,
    listofworkscommentedbystudents,
    getdetailsofnoselfevaluation,
    unevaluatedlistforevaluatingothers,
    evaluateothersevaluatedlist,
    detailsofnotevaluatingothers,
    detailsofevaluatingothers,
    getdetailsofselfevaluation,
    getportfolioview,
    detailsofcourselistofworkstobeaudited,
    myworksdetailsoftheworks,
    archivesclasscoursearchives,
    myworksuploadworks,
    mycourseserviceevaluationsubmission,
    selfevaluationsubmission,
    evaluatingotherssubmit,
    modifyUserFace,
    modificationandpreservation,
    studentdetailscheck,
    studentdetailsrevision,
    studentmodification,

    // 教师
    getstudentstoupload,
    coursedetailsteacher,
    listofteacherscourses,
    getteachcoursedetails,
    getlistofteachersworks,
    listofteachersunevaluatedworks,
    listofworkevaluatedbyteachers,
    detailsofteacherevaluationnotevaluated,
    detailsofteacherevaluationevaluated,
    teacherscheckclasslist,
    classviewstudentlist,
    teachersmodifypasswords,
    baseTeacher,
    practicalcoursestobeevaluatedlist,
    teacherevaluationsubmission,
    sudentmanagementlistofstudentworks,
    viewthelistofstudentsnonuploadedworks,
    studentmanagementstudentarchivesview,
    teacherdetailscheck,
    teachersaddbasicinformation,
    studentmanagementviewingworks,
    workmanagementworkauditrecords,
    workmanagementworkaudit,
    // 基地注册验证
    verificationofbaseregistrationaccount
}
