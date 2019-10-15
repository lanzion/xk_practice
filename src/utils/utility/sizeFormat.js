/**
 * @desc 文件大小格式化
 * @param [number] value: 文件大小值
 * @param [number] decimal: 保留的小数位数
 */
function sizeFormat(value, decimal = 0) {
    if (value === null || value === '') {
        return '0 Bytes'
    } else if (isNaN(value)) {
        return value
    }
    const unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const __value = parseFloat(value)
    const index = Math.floor(Math.log(__value) / Math.log(1024))
    let result = __value / Math.pow(1024, index)
    result = result.toFixed(decimal) // 保留的小数位数
    return result + unit[index]
}

export default sizeFormat
