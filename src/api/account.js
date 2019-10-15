import xhr from 'Axios'

/* 登录
-------------------------- */
// 获取公钥
const requestPublishKey = () => xhr.post('/common/publicKey')
// 登录
const login = (options = {}) => xhr.post('/portal/user/login', options)
// 获取登录用户基础信息
const requestUserBaseInfo = (options = {}) => xhr.post('/portal/user/getBaseInfo', options)
// 获取权限
const requestPermission = (options = {}) => xhr.post('/common/right/userRightMg', options)
// 获取后台管理权限
const requestAdminPermission = (options = {}) => xhr.post('/common/right/userRightTree', options)
// 登出
const loginout = (options = {}) => xhr.post('/portal/user/logout', options)

/* 用户注册
-------------------------- */
// 用户注册 - 教师注册
const registerTeacher = (options = {}) => xhr.post(`/portal/user/registTeacher`, options)
// 用户注册 - 学生注册
const registerStudent = (options = {}) => xhr.post(`/portal/user/registStudent`, options)
// 用户注册 - 家长注册
const registerParent = (options = {}) => xhr.post(`/portal/user/registParent`, options)

/* 头像设置
-------------------------- */
// 头像设置 - 修改头像
const updateAvatar = (options = {}) => xhr.post(`/portal/user/setUserFace`, options)

/* 账号安全
-------------------------- */
// 账号安全 - 修改密码
const updatePassword = (options = {}) => xhr.post(`/portal/user/resetPsw`, options)
// 账号安全 - 获取手机验证码
const requestPhoneCode = (options = {}) => xhr.post(`/portal/user/sendMobileCode`, options)
// 账号安全 - 验证手机验证码
const validPhone = (options = {}) => xhr.post(`/portal/user/bindMobile`, options)
// 账号安全 - 获取邮箱验证码
const requestEmailCode = (options = {}) => xhr.post(`/portal/user/getEmailCode`, options)
// 账号安全 - 验证邮箱验证码
const validEmail = (options = {}) => xhr.post(`/portal/user/validEmailCode`, options)
// 账号安全 - 验证邮箱验证码
const requestEmailCodeMod = (options = {}) => xhr.post(`/portal/user/getEmailCodeOfMod`, options)

/* 找回密码
-------------------------- */
// 找回密码 - 手机找回
const resetPwdByPhone = (options = {}) => xhr.post(`/portal/user/resetPswByMobile`, options)
// 找回密码 - 邮箱找回
const resetPwdByEmail = (options = {}) => xhr.post(`/portal/user/resetPswByEmail`, options)

// 基地注册
const registBaseInfo = (options = {}) => xhr.post(`/portal/user/registBaseInfo`, options)

export {
    requestPublishKey,
    login,
    requestUserBaseInfo,
    requestPermission,
    requestAdminPermission,
    loginout,
    registerTeacher,
    registerStudent,
    registerParent,
    updateAvatar,
    updatePassword,
    requestPhoneCode,
    validPhone,
    requestEmailCode,
    validEmail,
    resetPwdByPhone,
    resetPwdByEmail,
    registBaseInfo,
    requestEmailCodeMod
}
