import Pagination from '@/components/common/pagination'
import Region from '@/components/common/region'
import Image from '@/components/common/image'
import Cropper from '@/components/common/cropper'
import Upload from '@/components/common/upload/upload'
import TabsOperate from './common/tabs-operate'
import HeadOperate from './common/head-operate'
import ListOperate from './common/list-operate'
import statisList from './common/statis-list'
import thSelect from './common/th-select'

const components = [
    Pagination,
    Region,
    Image,
    Cropper,
    Upload,
    TabsOperate,
    HeadOperate,
    ListOperate,
    statisList,
    thSelect
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
