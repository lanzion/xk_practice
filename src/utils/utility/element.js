/**
 * @desc 验证表单多个字段
 * @param {object} form vue.refs[form]对象
 * @param {array} fields 规则对应字段名列表
 */
function validateFields(form, fields = []) {
    const p = []
    fields.forEach(key => {
        p.push(
            new Promise(resolve => {
                form.validateField(key, v => resolve(v))
            })
        )
    })
 
    return Promise.all(p)
}

export {
    validateFields
}
