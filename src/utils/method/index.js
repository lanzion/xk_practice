// vue公共方法池
import fileUrl from '@utils/utility/fileUrl.js'
import dateFormat from '@utils/utility/dateFormat.js'
// import ellipsis from '@utils/utility/textOverflow.js'
import translate from '@utils/utility/translateDataDict.js'
import flatten from '@utils/utility/flatten.js'
import merge from '@utils/utility/merge.js'
import formatAliUploadFileName from '@utils/utility/formatAliUploadFileName.js'
import { validateFields } from '@utils/utility/element.js'
import { redirectCallback } from '@utils/utility/redirect.js'

export default {
    install(Vue, options) {
        Vue.prototype.getFileUrl = fileUrl
        Vue.prototype.dateFormat = dateFormat
        // Vue.prototype.ellipsis = ellipsis
        Vue.prototype.translate = translate
        Vue.prototype.validateFields = validateFields
        Vue.prototype.redirectCallback = redirectCallback
        Vue.prototype.flatten = flatten
        Vue.prototype.merge = merge
        Vue.prototype.formatFileName = formatAliUploadFileName
    }
}
