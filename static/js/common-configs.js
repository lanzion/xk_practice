(function () {
    window.configs = (window.configs || {})
    window.page = (window.page || {})

    // var host = apiHost = location.protocol + '//' + location.host
    // var apiHost
    var host = apiHost = location.protocol + '//' + location.host
    var __index = host + '/index.html#/'
    var __my = host + '/my.html#/'
    var __admin = host + '/admin.html#/'
    // var domain = '.maker.com';
    var exp = /^\d+\.\d+\.\d+\.\d+$/
    var domain = location.hostname
    domain = domain.match(exp) || domain === 'localhost' ? domain : '.sgedu.gov.cn'

    window.configs = {
        http: {
            baseURL: apiHost,
            path: '/practiceApi/',
            domain: domain
        }
    }

    window.page = {
        index: {
            url: __index
        },
        login: {
            url: __my + 'login'
        },
        my: {
            url: __my
        },
        admin: {
            url: __admin
        },
    }
})()
