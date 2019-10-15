<template>
    <ul class="dict-type--box">
        <li class="type-item--box el-tree-node__content list-node" :class="{ 'is-active': item.id === curId }" v-for="(item) in datas" :key="item.id" @click="checkedNode(item)">
            <span>{{ item.name }}</span>
            <slot name="operate" :data="item"></slot>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            curId: ''
        }
    },
    props: {
        datas: {
            type: Array,
            default() {
                return []
            }
        }
    },
    methods: {
        checkedNode(item) {
            this.curId = item.id
            this.$emit('checked', item)
        }
    }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/css/base/base-variables.scss";

.list-node {
    display: flex;
    flex: 1;
    align-items: baseline;
    justify-content: space-between;
    padding-right: 10px;
    font-size: $--font-size-base;

    &.is-active {
        background-color: $--color-background;
    }

    &.is-disabled {
        color: $--color-text-regular;
    }
}
</style>
