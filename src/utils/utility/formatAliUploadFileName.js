/*
 * 上传文件名格式化
 */

function formatAliUploadFileName(name, status = 'success', separator = '__') {
    const namePrefixLen = name.split(separator)[0].length + separator.length
    if (namePrefixLen > separator.length) {
        const fileName = status === 'success' ? decodeURIComponent(name.slice(namePrefixLen).split('?')[0]) : decodeURIComponent(name)
        return fileName || name
    } else {
        return name
    }
}

export default formatAliUploadFileName
