
function ellipsisHtmlDesc(txt = '', len = 80, sep = '...') {
    const reg = new RegExp('(.{' + len + '}).+')
    return txt.replace(/<[^>]+>|\n|&nbsp;/gi, '').replace(reg, '$1' + sep) || '暂无内容'
}

export default ellipsisHtmlDesc
