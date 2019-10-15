/**
 * @desc 根据路由获取权限并分类
 */
import { mapState } from 'vuex'

export default {
    data() {
        return {
            tabsBtnGroup: [], // 标签页
            headBtnGroup: [], // 表头按钮
            listBtnGroup: [], // 表格内按钮
            typeBtnGroup: [], // 分类按钮
            switchBtnGroup: [] // 开关按钮
        }
    },
    computed: {
        ...mapState('login', {
            nav: state => ((state.permission || [])[0] || {}).children || []
        }),
        permission() {
            const __obj = this.flatten(this.nav, 'id', 'children')
            return __obj && Object.values(__obj).map(x => {
                const item = Object.assign({}, x)
                delete item.children
                return item
            }) || []
        },
        // 操作栏宽度
        operateWidth() {
            const fontSize = 14 // 表格内字体大小
            const margin = 12 // 操作项间距(含边框)
            const cellPadding = 40 // 表格内左右填充(含边框)
            const minCellWidth = fontSize * 2 + cellPadding

            let result = 0
            if (this.listBtnGroup.length) {
                this.listBtnGroup.forEach(x => {
                    result += x.name.length * fontSize
                })
                result += (this.listBtnGroup.length - 1) * margin + cellPadding
            }
            return result > minCellWidth ? result : minCellWidth
        }
    },
    mounted() {
        this.getButtons()
    },
    methods: {

        // 根据路由(url)过滤其子类各个按钮类型
        getButtons(path = this.$route.path) {
            const item = this.permission.find(x => x.url === path)

            let __head = []//
            let __list = []
            let __tabs = []
            let __type = []
            let __switch = []
            if (item) {
                const children = this.permission.filter(x => x.pid === item.id)
                children.forEach(x => {
                    const { permissType: type } = x
                    // const { position, permissType: type } = x
                    // const pos = position && position.split(',') || []
                    /** 
                     * @type 判断类型例如按钮，菜单
                     * @position 判断位置 1头部按钮2列表按钮3全部（两者都有）
                     * 
                    */
                    if (type === '5') {//判断类型例如按钮，菜单
                        __tabs.push(x)
                    }
                    if (type === '4') {
                        __switch.push(x)
                    }
                    if (type === '3') {
                        __type.push(x)
                    }
                    /* ---- */
                    if (type !== '3') {
                        if(x.position==1){
                            __head.push(x)
                        }else if(x.position==2){
                            __list.push(x)
                        }else if(x.position==''){
                            __head.push(x)
                            __list.push(x)
                        }
                       
                       
                    }
                    // if (type !== '3' && pos.includes('1')) {
                    //     __head.push(x)
                    // }
                    // if (type !== '3' && pos.includes('2')) {
                    //     __list.push(x)
                    // }
                })
                console.log('children', children)
            }
            this.tabsBtnGroup = __tabs
            this.headBtnGroup = __head
            this.listBtnGroup = __list
            this.typeBtnGroup = __type
            this.switchBtnGroup = __switch
            console.log('__tabs', __tabs)
            console.log('__head', __head)
            console.log('__list', __list)
            console.log('__type', __type)
            console.log('__switch', __switch)
        }
    }
}
