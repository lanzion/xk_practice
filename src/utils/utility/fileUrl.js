
/*
* 补足文件路径
*/
function fileUrl(url, {filetype = 'image'} = {}) {
    const isFullpath = /(http(s)?:\/\/)/i.test(url)

    if (url) {
        url = isFullpath ? url : (configs.fileBaseUrl + url)
    }

    switch (filetype) {
        case 'image':
            const reg = /\.jp(e)?g|gif|png|bmp$/i // 过滤文件类型
            return !reg.test(url) ? null : url.split('?')[0]
        default:
            return url.split('?')[0] || null
    }
}

// 检测图片路径是否存在
// function checkImgExists(imgUrl) {
//     var ImgObj = new Image() // 判断图片是否存在
//     ImgObj.src = imgUrl
//     // 没有图片，则返回-1
//     if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
//         return true
//     } else {
//         return false
//     }
// }
export default fileUrl
