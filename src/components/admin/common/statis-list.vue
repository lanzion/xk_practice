<template>
    <ul class="statis-list">
        <li v-for="(item, index) in items" class="statis-item" :key="index">
            {{ item.title || '' }}
            <strong class="count">{{ item.value || 0 }}</strong>
            {{item.unit || ''}}
        </li>
    </ul>
</template>

<script>
export default {
    name: 'statis-list',
    inheritAttrs: false,
    props: {
        /**
         * @param {String} items.title: 名称
         * @param {String} items.value: 值
         * @param {String} items.unit: 单位
         */
        items: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "~@/assets/css/base/base-variables.scss";
    @import "~@/assets/css/base/utils.scss";

    .statis-list {
        font-size: $--font-size-base;

        .statis-item {
            display: inline;

            & + .statis-item {
                &::before {
                    content: '|';
                    margin: 0 10px;
                }
            }
        }

        .count {
            font-weight: normal;
            color: $--color-primary;
        }
    }
</style>
