/**
 * @desc 去重并合并字段
 * @param [array] arr: 数组
 * @param [string] field: 判断对象唯一值的字段名
 * @param [array | string] properties: 需要合并的字段名
 */
const merge = (arr = [], field, properties = []) => {
    const map = {}
    const __properties = Array.isArray(properties) ? properties : properties.split(',').map(x => x.trim())

    arr.forEach(item => {
        __properties.forEach(key => {
            const id = item[field]
            item[`${key}Arr`] = map[id] && map[id][`${key}Arr`] || []
            if (item[key]) {
                item[`${key}Arr`].push(item[key])
            }
        })

        map[item[field]] = item
    })

    return Object.values(map)
}

export default merge
