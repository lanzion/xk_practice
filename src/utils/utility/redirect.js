
/*
 * type: 1 (列表 -> 详情)
 *       2 (详情 -> 列表)
 *       3 (更多/相关 -> 详情)
 *       4 (公共[头部/尾部] -> )
 *       5 (-> 个人空间)
 *       6 (顶部面包屑 -> )
 */
function redirect(link, { path = '', query = {}, type = 1 } = {}) {
    let _link = link.url || link || '#/'
    const tmpLink = _link.split('?')
    _link = tmpLink[0]
    const __query = tmpLink[1] ? tmpLink[1].split('&').reduce((obj, str) => {
        if (str) {
            const __str = str.split('=')
            obj[__str[0]] = __str[1]
        }
        return obj
    }, {}) : {}
    query = Object.assign(__query, query)
    const params = Object.entries(query)
    
    let url = /(ht|f)tp(s?)|(.htm)/.test(_link) ? `${_link}${path}` : `${location.protocol}//${location.host}${_link}${path}`
    url = url.split(':/').map(x => x.replace(/\/\/+/g, '/')).join(':/')
    url += params.length ? `?${params.map(x => x.join('=')).join('&')}` : ''
    type = type ? Number(type) : Number(link.type)

    window.location.href = url
}

const redirectCallback = (path) => {
    window.location.href = `${path}?callback=${encodeURIComponent(window.location.href)}`
}

export {
    redirect,
    redirectCallback
}
