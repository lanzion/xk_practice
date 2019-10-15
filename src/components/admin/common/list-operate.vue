<template>
    <section>
        <el-button class="g-table--link" type="text"
            v-for="(item) in items" :key="item.id"
            v-show="checkIsActive(item.menuId, 'visible')"
            :disabled="!checkIsActive(item.menuId)"
            @click="doOperate(item)">{{ item.name }}</el-button>
    </section>
</template>
<script>
export default {
    name: 'list-operate',
    inheritAttrs: false,
    props: {
        // 按钮数据
        items: {
            type: Array,
            default() {
                return []
            }
        },
        // 列表行数
        index: {
            type: Number,
            default: null
        },
        // 列表数据
        data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    methods: {
        doLink(item) {
            const { menuId: model, url: path } = item
            const params = (this.$attrs[model] || {}).query || {}
            const query = Object.keys(params).reduce((obj, key) => {
                obj[key] = this.data[params[key]]
                return obj
            }, {})
            this.$router.push({ path, query })
        },
        // 运行父组件方法
        doOperate(item) {
            const { menuId: model, url } = item

            if (url) {
                this.doLink(item)
                return
            }

            const defHandler = function () {
                console.warn(`父组件没有传与该操作对应的回调函数！对应this.$attrs键名是：${model}`)
            }
            let handler = this.$attrs[model]
            if (typeof handler === 'object') {
                handler = handler.callback
            }
            handler = handler || defHandler
            let options = { data: this.data, model }
            handler({ ...options, index: this.index })
        },
        // 判断按钮是否可用(active)/可见(visible)
        checkIsActive(model, key = 'active') {
            let callback = (this.$attrs[model] || {})[key]
            let flag = callback === undefined
            if (!flag) {
                if (typeof callback === 'function') {
                    flag = this.$attrs[model][key](this.data, { model: model })
                } else {
                    flag = !!callback
                }
            }
            return flag
        }
    }
}
</script>
