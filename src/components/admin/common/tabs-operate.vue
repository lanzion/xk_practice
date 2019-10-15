<template>
    <el-menu
        class="g-tab--wrap"
        :default-active="$route.path"
        mode="horizontal">
        <el-menu-item v-for="item in items" :index="item.url" :key="item.id" @click="redirectTo(item)">{{ item.name }}</el-menu-item>
    </el-menu>
</template>
<script>
export default {
    name: 'tabs-operate',
    inheritAttrs: false,
    props: {
        // 标签页数据
        items: {
            type: Array,
            default() {
                return []
            }
        }
    },
    watch: {
        items: {
            handler: function (items) {
                if (items.length && !~items.findIndex(x => x.url === this.$route.path)) {
                    this.redirectTo(items[0])
                }
            },
            deep: true
        }
    },
    methods: {
        redirectTo(item) {
            if (item.url) {
                this.$router.replace(item.url)
            }
        }
    }
}
</script>
