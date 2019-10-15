/**
 * @desc 将树形结构数组扁平化处理为对象
 * @param [array] arr: 树形数组
 * @param [string] key: 处理为对象的KEY的字段名
 * @param [string] key: 子级字段名
 */
const flatten = (arr, key, param) => {
    return arr.reduce((result, item) => {
        const __item = item[param] || item
        result[item[key]] = item

        if (Array.isArray(__item) && __item.length) {
            const children = flatten(__item, key, param)
            for (let i in children) {
                result[i] = children[i]
            }
        }
        return result
    }, {})
}

export default flatten
