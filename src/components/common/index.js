import Pagination from '@/components/common/pagination'
import Region from '@/components/common/region'
import Image from '@/components/common/image'
import Cropper from '@/components/common/cropper'
import Upload from '@/components/common/upload/upload'
import Player from '@/components/common/ali-video'
import Reader from '@/components/common/baidu-doc-reader'
import Comment from '@/components/common/comment/comment'
import defaultImage from '@/components/my/common/image'

const components = [
    Pagination,
    Region,
    Image,
    Cropper,
    Upload,
    Player,
    Reader,
    Comment,
    defaultImage
]

const install = function (Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install
}
