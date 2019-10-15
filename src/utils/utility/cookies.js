const cookies = document.cookie
const defaults = {
    path: '/',
    expires: getExpires(),
    domain: location.hostname,
    allDomain: true
}
const setting = ['expires', 'max-age', 'domain', 'path', 'secure']

Object.defineProperty(defaults, 'max-age', {
    get: function (val) {
        return val || 86400
    },
    set: function (val) {
        let timeout = Number(val) * 1000
        this.domain = getExpires({ timeout })
    },
    configurable: true,
    enumerable: true
})

Object.defineProperty(defaults, 'expires', {
    get: function (val) {
        let _expires = val
        if (_expires === undefined) {
            _expires = (new Date()).getTime() + Number(this['max-age']) * 1000
            _expires = new Date(_expires).toUTCString()
        }
        return _expires
    },
    set: function (val) {
        this.expires = getExpires({ date: val })
    },
    configurable: true,
    enumerable: true
})

Object.defineProperty(defaults, 'domain', {
    get: function (val) {
        let domain = val || location.hostname
        return getDomain(domain, this.allDomain)
    },
    set: function (val) {
        this.domain = val || location.hostname
    },
    configurable: true,
    enumerable: true
})

Object.defineProperty(defaults, 'allDomain', {
    get: function (val) {
        return val || true
    },
    set: function (val) {
        let domain = location.hostname

        this.domain = getDomain(domain, val)
        this.allDomain = val
    },
    configurable: true,
    enumerable: true
})

function getExpires({ date = new Date(), timeout = 0 } = {}) {
    return new Date(date.getTime() + timeout).toUTCString()
}

function getDomain(domain, isAll) {
    // check domain is IP
    let exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    let reg = domain.match(exp)

    // if domain string isn't IP Address && subdomains are always included
    if (!reg && isAll) {
        // check domain is pure string
        let _index = domain.indexOf('.')
        domain = ~_index ? domain.substr(_index) : domain
    }
    return domain
}

const cookie = new class Cookies {
    constructor(name) {
        this.name = name || Cookies.name
        this.defaults = defaults
    }

    /*
     * 定义Cookie
     * options: { domain, expires, max-age, path, secure }
     * expires / max-age 设置其中一项即可
     * allDomain: 是否包含子域名
     */
    set(data, options = {}) {
        let keys = Object.keys(data).filter(x => x && x !== '' && !setting.includes(x))
        if (!keys.length) return

        let _opt = Object.assign({}, defaults, options)
        let _optValue = []

        setting.forEach(k => {
            if (_opt[k] !== undefined) {
                _optValue.push(`${k}=${_opt[k]}`)
            }
        })

        keys.forEach((key) => {
            let value = data[key]
            // if (value && typeof value === 'object') {
            //     value = JSON.stringify(value)
            // }
            document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)};` + _optValue.join(';')
        })
    }

    /*
     * 通过key获取Cookie的值
     */
    get(key) {
        const sKey = encodeURIComponent(key).replace(/[-.+*]/g, '\\$&')
        const reg = new RegExp(`(?:(?:^|.*;\\s*)${sKey}\\s*\\=\\s*([^;]*).*$)|^.*$`)

        const result = decodeURIComponent(cookies.replace(reg, '$1')) || null

        return result
    }

    /*
     * 判断是否存储某个Cookie
     */
    has(key) {
        const sKey = encodeURIComponent(key).replace(/[-.+*]/g, '\\$&')
        const reg = new RegExp(`(?:^|;\\s*)${sKey}\\s*\\=`)

        return reg.test(cookies)
    }

    /*
     * 删除某个Cookie
     */
    remove(key, options) {
        if (!key || !this.has(key)) return

        let _opt = Object.assign({}, defaults, options)
        let _optValue = []

        _optValue.unshift(`${encodeURIComponent(key)}=`)
        setting.filter(x => x !== 'max-age').forEach(k => {
            if (k === 'expires') {
                _optValue.push(`expires=${new Date(0).toUTCString()}`)
            } else if (_opt[k] !== undefined) {
                _optValue.push(`${k}=${_opt[k]}`)
            }
        })

        let result = _optValue.join(';')
        document.cookie = result
    }

    /*
     * 获取Cookie的key的合集
     */
    get keys() {
        let result = cookies.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, '')
        result = result.split(/\s*(?:=[^;]*)?;\s*/)

        result = result.map(x => decodeURIComponent(x))

        return result
    }
}()

export default cookie
