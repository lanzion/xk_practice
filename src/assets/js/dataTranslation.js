import store from '@/store/index.js'
/*
 * data: 需要翻译的数据
 * model: 数据字典的字段
 * sep: 数据分隔符
 * con: 数据连接符
 * key: 返回数据的键值
 */
async function dataTranslation(data, model, { sep = ',', con = '、', key = 'code', isArray = false } = {}) {
    let arr = []
    if (data && data.length) {
        data = data.split(sep)
        let result = await store.dispatch('dictionaryCommon/getDictComb', model)
        result = result.dicList || []
        result.forEach(function (i) {
            if (data.includes(i[key])) arr.push(i.name)
        })
    }
    if (isArray) {
        return arr
    } else {
        return arr.join(con)
    }
}

export default dataTranslation
