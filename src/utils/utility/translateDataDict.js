/**
 * @param [string] data: 需要翻译的数据
 * @param [array] dict: 数据字典
 * @param [string] sep: 待翻译的数据分隔符
 * @param [string] con: 返回的数据连接符(仅在returnType为String有效)
 * @param [string] key: 待翻译数据匹配的键值
 * @param [string] returnType: 返回的数据类型(String/Array/Object)
 * @desc 翻译数据字典
 */
function translateDataDic(data, dict, { sep = ',', con = '、', key = 'code', returnType = 'String' } = {}) {
    let result = {}
    if (data !== undefined && data !== null && data !== '') {
        data = data.toString().split(sep)
        Array.from(dict).forEach(function (i) {
            if (data.includes(i[key].toString())) {
                result[i[key]] = i.name
            }
        })
    }
    switch (returnType) {
        case 'Object':
            break
        case 'Array':
            result = Object.values(result)
            break
        default:
            result = Object.values(result).join(con)
    }
    return result
}

export default translateDataDic
