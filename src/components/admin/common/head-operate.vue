<template>
    <section>
        <slot></slot>
        <el-button type="primary" class="operate-btn-item"
            v-for="(item) in items" :key="item.id"
            @click="doOperate(item)">{{ item.name }}</el-button>
    </section>
</template>
<script>
export default {
    name: 'head-operate',
    inheritAttrs: false,
    props: {
        // 按钮数据
        items: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        // 运行父组件方法
        doOperate(item) {
            const { menuId: model, url } = item

            if (url) {
                this.$router.push(url)
                return
            }

            let handler = this.$attrs[model]
            if (typeof handler === 'object') {
                handler = handler.callback
            }
            const defHandler = () => {
                console.warn(`父组件没有传与该操作对应的回调函数！对应this.$attrs键名是：${model}`)
            }
            handler = handler || defHandler
            let options = { model }
            handler(options)
        }
    }
}
</script>

<style lang='scss' scoped>
    .operate-btn-item {
        margin-bottom: 10px;
    }
</style>
