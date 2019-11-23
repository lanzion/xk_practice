<template>
    <el-tree
        ref="tree"
        node-key="id"
        :default-expanded-keys="expandedKeys"
        :data.sync="datas"
        :props="{ children: 'children', label: 'name' }"
        :highlight-current="true"
        :check-strictly="checkStrictly"
        show-checkbox
    >
        <div
            class="tree-node"
            :class="{ 'is-disabled': data.status === '0' }"
            slot-scope="{ node, data }"
        >
            <span>{{ node.label }}</span>
            <slot name="operate" :node="node" :data="data"></slot>
        </div>
    </el-tree>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        datas: {
            type: Array,
            default() {
                return []
            }
        },
        // 展开项
        expandedKeys: {
            type: Array,
            default() {
                return []
            }
        },
        checkStrictly: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        // 记录树形菜单展开项
        getNode() {
            const nodes = this.$refs.tree.root.store.nodesMap
            const ids = Object.values(nodes).reduce(
                (arr, { expanded, data }) => {
                    return expanded ? arr.concat(data.id) : arr
                },
                []
            )
            return ids
        },
        // 设置树形菜单选中项
        setCheckedKeys(keys) {
            this.$refs.tree.setCheckedKeys(keys)
        },
        // 获取树形菜单选中项
        getCheckedKeys() {
            return this.$refs.tree.getCheckedKeys()
        },
    }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/css/base/base-variables.scss";

.tree-node {
    display: flex;
    flex: 1;
    align-items: baseline;
    justify-content: space-between;

    &.is-disabled {
        color: $--color-text-regular;
    }
}
</style>
