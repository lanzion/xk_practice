/**
 * @param [string] date: 时间戳
 * @param [string] format: 转换格式
 *
 * @desc 时间格式化
 *
 * @example
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * yyyy-MM-dd hh:mm:ss.S => 2017-07-02 08:09:04.423
 * yyyy-MM-dd E HH:mm:ss => 2017-03-10 二 20:09:04
 * yyyy-MM-dd EE hh:mm:ss => 2017-03-10 周二 08:09:04
 * yyyy-MM-dd EEE hh:mm:ss => 2017-03-10 星期二 08:09:04
 * yyyy-M-d h:m:s.S => 2017-7-2 8:9:4.18
 */
function dateFormatByDate(date, format) {
    date = new Date(date)
    
    var map = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    }
    var week = {
        '0': '/u65e5',
        '1': '/u4e00',
        '2': '/u4e8c',
        '3': '/u4e09',
        '4': '/u56db',
        '5': '/u4e94',
        '6': '/u516d'
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(format)) {
        format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + ''])
    }
    for (var k in map) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (map[k]) : (('00' + map[k]).substr(('' + map[k]).length)))
        }
    }
    return format
}
function dateFormatByReg(date, format) {
    const reg = /\d+/g
    const dates = date.match(reg).map((x, i) => {
        return i && i > 5 ? x : Number(x)
    })
    
    const map = {
        'M+': dates[1], // 月份
        'd+': dates[2], // 日
        'h+': dates[3] >= 12 ? dates[3] - 12 : dates[3], // 小时
        'H+': dates[3], // 小时
        'm+': dates[4], // 分
        's+': dates[5], // 秒
        'q+': Math.floor((dates[1] - 0 + 3) / 3), // 季度
        S: dates[6] // 毫秒
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (dates[0].toString()).substr(4 - RegExp.$1.length))
    }
    for (var k in map) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (map[k]) : (('00' + map[k]).substr(('' + map[k]).length)))
        }
    }
    return format
}

function dateFormat(date, format = 'yyyy-MM-dd HH:mm:ss') {
    if (date !== undefined && date !== null && date !== '') {
        if (date.constructor === Date || new Date(date) !== 'Invalid Date') {
            format = dateFormatByDate(date, format)
        } else {
            format = dateFormatByReg(date, format)
        }
    } else {
        format = ''
    }
    return format
}

export default dateFormat
