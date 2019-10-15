/**
 * @desc 基于element-ui form的校验规则
 */

// 验证账号
const validateAccount = (rule, value, callback) => {
    const regular = /^[a-zA-Z0-9_]{6,12}$/
    if (value !== '' && value != null && !regular.test(value)) {
        callback(new Error('用户名由 6 到 12 位的英文字母、数字、下划线组成'))
    } else {
        callback()
    }
}

// 验证用户名
const validateUserName = (rule, value, callback) => {
    const regular = /(^[\u4E00-\u9FA5]+(·[\u4E00-\u9FA5]+)*$)|(^[a-zA-Z]+((\.|\s|·|-|=)[a-zA-Z]+)*$)/
    if (!regular.test(value)) {
        callback(new Error(`您输入的真实姓名格式不正确`))
    } else {
        callback()
    }
}

// 验证密码
const validatePwd = (rule, value, callback) => {
    const regular = /^(?=.*[a-z|A-Z])(?=.*\d)[^]{6,16}$/
    if (value == null || value === '') {
        callback(new Error('请输入密码'))
    } else if (!regular.test(value)) {
        callback(new Error('密码必须由 6 到 16 位的字母、数字组成'))
    } else {
        callback()
    }
}

// 验证确认密码
const validateVerifyPwd = (pwd) => (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次确认密码'))
    } else if (value !== pwd) {
        callback(new Error('两次输入密码不一致！'))
    } else {
        callback()
    }
}

// 验证身份证
const validateIDCode = (rule, value, callback) => {
    const regular = /(^[0-9]{15}$)|(^[0-9]{18}$)|(^[0-9]{17}([0-9]|X|x)$)/
    if (!regular.test(value)) {
        callback(new Error(`您输入的身份证号格式不正确`))
    } else {
        callback()
    }
}

// 验证手机号
const validatePhone = (rule, value, callback) => {
    const regular = /^([1]([3][0-9]{1}|[5][0-35-9]{1}|[8][0-9]{1}|45|47|70|71|76|77|78)[0-9]{8})|(0\d{2,3}-\d{7,8})$/
    if (!regular.test(value)) {
        callback(new Error('请输入正确格式的手机号'))
    } else {
        callback()
    }
}

// 验证邮箱
const validateEmail = (rule, value, callback) => {
    let regular = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (!regular.test(value)) {
        callback(new Error('请输入正确格式的电子邮箱'))
    } else {
        callback()
    }
}

export {
    validateAccount,
    validateUserName,
    validatePwd,
    validateVerifyPwd,
    validateIDCode,
    validatePhone,
    validateEmail
}
