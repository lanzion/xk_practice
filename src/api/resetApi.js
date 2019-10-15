import xhr from 'Axios'

//课程管理2.0
const courseList = (options = {}, page) => xhr.post(`/admin/course/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);
const courseAdd = (options = {}) => xhr.post("/admin/course/add", options);
const courseEdit = (options = {}) => xhr.post("/admin/course/modify", options);
const commentList = (options = {}, page) => xhr.post(`/admin/schActivityDetail/distributionPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);
const courseDetail = (options = {}) => xhr.post("/admin/course/selectDetail", options);
//排课
const selectCourse = (options = {}) => xhr.post("/admin/course/selectCourseBaseinfo", options);
const comfirCourse = (options = {}) => xhr.post("/admin/courseClass/distributionClass", options);
//获取基地服务时间
const baseprojectCourseTime = (options = {}) => xhr.post("/admin/baseprojectCourseTime/selectAllList", options);

//排课记录
const distributionClass = (options = {}, page) => xhr.post(`/admin/courseClass/distributionClassPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);

//基地服务列表
const baseinfoProject =(options = {}) => xhr.post("/admin/baseinfoProject/selectAllList", options);

//活动点评
const commentDetail = (options = {}) => xhr.post("/admin/activity/comment/commentDetail", options);
const commentAdd =(options = {}) => xhr.post("/admin/activity/comment/add", options);

//活动通知
//发起活动
const activityAdd =(options = {}) => xhr.post("/admin/activity/add", options);
const activityDel =(options = {}) => xhr.post("/admin/activity/delete", options);
const activityEdit =(options = {}) => xhr.post("/admin/activity/modify", options);

//通知公告
const announcementList = (options = {}, page) => xhr.post(`/admin/announcement/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);
const announcementDel =(options = {}) => xhr.post("/admin/announcement/del", options);
const announcementAdd =(options = {}) => xhr.post("/admin/announcement/add", options);
const announcementEdit =(options = {}) => xhr.post("/admin/announcement/modify", options);
const announcementDetai =(options = {}) => xhr.post("/admin/announcement/detail", options);
const announcementSelectDet =(options = {}) => xhr.post("/admin/announcement/selectDetail", options);


//评分管理
const recordList =(options = {}, page) => xhr.post(`/admin/eval/record/list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);
const recordDelete = (options = {}) => xhr.post("/admin/eval/record/delete", options);

//添加班级
const classAdd = (options = {}) => xhr.post("/admin/base/class/add", options);
const classEdit = (options = {}) => xhr.post("/admin/base/class/modify", options);
const classDeatil = (options = {}) => xhr.post("/admin/base/class/detail", options);

//添加模板
const templateAdd = (options = {}) => xhr.post("/admin/template/add", options);
const templateList = (options = {}, page) => xhr.post(`/admin/template/list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);
const templateDel= (options = {}) => xhr.post("/admin/template/delete", options); 
const templateDetail= (options = {}) => xhr.post("/admin/template/detail", options); 
const templateEdit= (options = {}) => xhr.post("/admin/template/modify", options); 


//通用
//学校列表查询
const schoolList =(options = {},page) => xhr.post(`/admin/baseSchool/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);
//学校详情
const schoolDetail =(options = {}) => xhr.post("/admin/baseSchool/selectDetail", options);
//新增学校
const schoolAdd =(options = {}) => xhr.post("/admin/baseSchool/add", options);
const schoolEdit =(options = {}) => xhr.post("/admin/baseSchool/modify", options);
const schoolDel =(options = {}) => xhr.post("/baseSchool/del", options);


//获取领域模块
const getActivityTypeParent =(options = {}) => xhr.post("/admin/activityType/getActivityTypeParent", options);
//获取活动列表
const selectAllList =(options = {}) => xhr.post("/admin/activity/selectAllList", options);
//获取班级和人数
const getClassAndNum = (options = {}) => xhr.post("/admin/courseClass/getClassAndNum", options);
//获取
const getClassAll = (options = {},page) => xhr.post(`/admin/base/class/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);
//删除学校
const  delClass = (options = {}) => xhr.post("/admin/base/class/del", options);
//获取年级
const getGradeList =  (options = {}) => xhr.post("/admin/base/class/getGradeList", options);
//获取当前学校老师
const baseTeacherList = (options = {}) => xhr.post("/admin/baseTeacher/selectAllList", options);
//推荐
const recommendAdd = (options = {}) => xhr.post("/admin/recommend/add", options);
const recommendCancel = (options = {}) => xhr.post("/admin/recommend/cancel", options);
//获取角色权限
// const getByPid = (options = {}) => xhr.post("/common/right/list/findByIdentityType", options);
const getByPid = (options = {}) => xhr.post("/admin/baseUser/list/findByIdentityType", options);
//获取账号详情
const  selectDetailByOrgUser = (options = {}) => xhr.post("/admin/baseUser/selectDetailByOrgUser", options);
const modifyUser = (options = {}) => xhr.post("/admin/baseUser/modifyUser", options); 
//添加账号
const addUser = (options = {}) => xhr.post("/admin/baseUser/addUser", options); 
const delUser = (options = {}) => xhr.post("/admin/baseUser/delUser", options); 
//获取教育局列表
const baseEducationList = (options = {},page) => xhr.post(`/admin/baseEducation/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);
const addEdus = (options = {}) => xhr.post("/admin/baseEducation/addEdus", options); 
const delEdus = (options = {}) => xhr.post("/admin/baseEducation/del", options);
const editEdus = (options = {}) => xhr.post("/admin/baseEducation/modify", options);
const detailEdus = (options = {}) => xhr.post("/admin/baseEducation/selectDetail", options);



const adminBaseInfoList =  (options = {},page) => xhr.post(`/admin/adminBaseInfo/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);
//活动统计
const getActivityCount = (options = {},page) => xhr.post(`/admin/activityCount/getActivityCount?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);
const selectExpert = (options = {}) => xhr.post("/admin/activityCount/getDetailData", options); 
const getCourseCount = (options = {},page) => xhr.post(`/admin/courseCount/getCourseCount?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);

const getCourseDetail = (options = {},page) => xhr.post(`/admin/courseCount/getDetailData?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);
const getevalList = (options = {},page) => xhr.post(`/admin/statistics/eval/list?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);
//活动日程
const selectCountArrange =(options = {}) => xhr.post("/admin/activityCount/selectCountArrange", options);
const selectCountArrangeDetail =(options = {}) => xhr.post("/admin/activityCount/selectClassArrangeDetail", options);


const activityType =  (options = {},page) => xhr.post(`/admin/activityType/selectPager?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);

const activityTypeAdd =(options = {}) => xhr.post("/admin/activityType/addDicType", options);
const activityTypeAddType =(options = {}) => xhr.post("/admin/activityType/addDicDetail", options);
const activityTypeEdit =(options = {}) => xhr.post("/admin/activityType/modifyDicType", options);
const activityTypeDetailEdit =(options = {}) => xhr.post("/admin/activityType/modifyDetail", options);
//修改领域状态
const activityTypUpdate =(options = {}) => xhr.post("/admin/activityType/updateTypeStatus", options);
//修改主题状态
const activityTypeDetailUpdate =(options = {}) => xhr.post("/admin/activityType/updateDetailStatus", options);

//活动领域详情
const activityTypeDetail =(options = {}) => xhr.post("/admin/activityType/selectTypeData", options);
//活动主题详情
const activityTypeDetailData =(options = {}) => xhr.post("/admin/activityType/selectDetailData", options);
//根据地区查基地
const adminBaseInfo =  (options = {},page) => xhr.post(`/admin/adminBaseInfo/selectAll?pageNum=${page.pageNum}&pageSize=${page.pageSize}`, options);


export {
    courseList,
    courseAdd,
    commentList,
    courseDetail,
    schoolList,
    activityAdd,
    activityDel,
    commentDetail,
    activityEdit,
    getActivityTypeParent,
    courseEdit,
    commentAdd,
    selectAllList,
    announcementList,
    announcementDel,
    announcementAdd,
    announcementEdit,
    announcementDetai,
    recordList,
    selectCourse,
    baseinfoProject,
    getClassAndNum,
    comfirCourse,
    distributionClass,
    announcementSelectDet,
    schoolDetail,
    getClassAll,
    delClass,
    getGradeList,
    baseTeacherList,
    classAdd,
    recordDelete,
    classEdit,
    templateAdd,
    templateList,
    templateDel,
    templateDetail,
    templateEdit,
    classDeatil,
    recommendAdd,
    recommendCancel,
    getByPid,
    selectDetailByOrgUser,
    modifyUser,
    addUser,
    baseEducationList,
    schoolAdd,
    schoolEdit,
    schoolDel,
    adminBaseInfoList,
    getActivityCount,
    selectExpert,
    getCourseCount,
    delUser,
    baseprojectCourseTime,
    addEdus,
    delEdus,
    editEdus,
    detailEdus,
    getCourseDetail,
    getevalList,
    selectCountArrange,
    selectCountArrangeDetail,
    activityType,
    activityTypeEdit,
    activityTypeDetailEdit,
    activityTypeAdd,
    activityTypeAddType,
    activityTypeDetail,
    activityTypeDetailData,
    activityTypeDetailUpdate,
    activityTypUpdate,
    adminBaseInfo,


}
