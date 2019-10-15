<template>
    <el-dropdown class="el-dropdown--wrap" @command="selected" trigger="click">
        <span class="el-dropdown--link" :class="{ 'is-selected': label }">
            {{ label || title }}
            <i class="arrow el-icon-arrow-down el-icon--right"></i>
            <i class="close el-icon-circle-close el-icon--right" @click.stop="reset"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in options" :command="item[props.value]" :key="index">{{ item[props.label] }}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
export default {
    name: 'th-select',

    inheritAttrs: false,

    data() {
        return {
            label: ''
        }
    },

    props: {
        title: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default() {
                return []
            }
        },
        props: {
            type: Object,
            default() {
                return {
                    label: 'name',
                    value: 'id'
                }
            }
        },
        value: [String, Array, Object]
    },

    watch: {
        value: {
            handler: function (value) {
                this.setLabel(value)
            },
            deep: true,
            immediate: true
        }
    },
    
    methods: {
        setLabel(value) {
            const item = this.options.find(x => x[this.props.value] === value)
            this.label = item && item[this.props.label]
        },

        selected(value = '') {
            this.$emit('update:value', value)
        },

        reset() {
            this.selected()
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/base/base-variables.scss";
    @import "~@/assets/css/base/utils.scss";

    .el-dropdown {
        &--wrap {
            padding: 0;
            line-height: 1;
            color: inherit;
            vertical-align: middle;
            cursor: pointer;
        }

        &--link {
            .close {
                display: none;
                &:hover {
                    color: $--color-primary;
                }
            }
            &.is-selected {
                color: $--color-primary;
            }
            &:hover {
                .arrow {
                    display: none;
                }
                .close {
                    display: inline-block;
                }
            }
        }
    }
</style>
