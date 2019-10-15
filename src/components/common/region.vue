<template>
    <div class="region-list--wrap el-select" v-clickoutside="hide">
        <el-input
            class="region-input--wrap"
            :class="{ 'is-checked': input }"
            v-model="input"
            :placeholder="placeholder"
            :disabled="disabled"
            @click.native="visible = true"
            @blur="getCheckedLabel"
            readonly>
            <template slot="suffix">
                <i class="el-select__caret el-input__icon el-icon-arrow-up" :class="{ 'is-reverse': visible }"></i>
                <i v-show="clearable && input" class="el-select__caret el-input__icon el-icon-circle-close" @click.stop="clear"></i>
            </template>
        </el-input>
        <section class="region-popover--wrap el-popper" v-show="visible">
            <ul class="tab-list--wrap">
                <li class="tab-item--box" :class="{ 'is-active': activeIndex === i }"
                    v-for="(tab, i) in tabs" :key="i"
                    @click.stop="clickTabsItem(i)">{{ tab.label }}</li>
            </ul>
            <ul class="region-list--box">
                <ul class="region-item--box" :class="{ 'is-active': activeIndex === j }"
                    v-for="(list, j) in region" :key="j">
                    <template v-if="list.length">
                        <li class="region-item" :class="{ 'is-active': checked[j] === item.code }"
                            v-for="(item, k) in list"
                            @click.stop="clickListItem(item, j)"
                            :key="k">{{ item.name }}</li>
                    </template>
                    <span v-else class="prompt">请选择{{ ~(j - 1) ? tabs[j - 1].label : '' }}选项</span>
                </ul>
            </ul>
            <div class="popper__arrow"></div>
        </section>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'region',
    data() {
        return {
            visible: false,
            activeIndex: 0,
            tabs: [
                { label: '省级', pcode: '-1' },
                { label: '市级', pcode: '' },
                { label: '区县', pcode: '' }
            ],
            checked: [],
            input: ''
        }
    },

    props: {
        // 默认值，字段为列表项中的code
        default: {
            type: Array,
            default() {
                return []
            }
        },
        /**
         * @desc 返回的类型
         * object - 表示返回对象数组
         * 其他任意字符串 - 表示返回对象的字段数组
         */
        type: {
            type: String,
            default: 'code'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '请选择所在区域'
        },
        clearable: {
            type: Boolean,
            default: false
        }
    },
    
    computed: {
        ...mapState('region', {
            list: state => state.region || []
        }),
        region: function () {
            const region = this.tabs.reduce((arr, tab, index) => {
                const list = tab.pcode ? this.list.filter(x => x.pcode === tab.pcode) : []
                arr.push(list)
                return arr
            }, [])
            return region
        },
        checkedItem: function () {
            const items = this.checked.map(code => {
                const item = this.list.find(x => x.code === code) || {}
                return item
            })
            return items
        }
    },
    
    watch: {
        default: {
            handler: function (value) {
                value.forEach((item, index) => {
                    const code = Number(item && item.code || item)
                    this.clickListItem({ code }, index)
                })
            },
            deep: true,
            immediate: true
        },
        checkedItem: 'changeCkeckedItem'
    },

    mounted() {
        this.getRegionList()
    },

    methods: {
        ...mapActions('region', ['getRegionList']),

        // 隐藏弹窗
        hide() {
            this.visible = false
        },

        // 清空选择项
        clear() {
            this.checked = []
            this.$set(this.region, 1, [])
            this.$set(this.region, 2, [])
            this.clickTabsItem(0)
        },

        // 获取选中项显示字段
        getCheckedLabel() {
            const names = []
            this.checkedItem.forEach(item => {
                const { name } = item
                name && names.push(name)
            })
            this.input = names.join(' / ')
        },

        // 选中项改变操作
        changeCkeckedItem() {
         
            this.getCheckedLabel()
            this.$emit('change', (this.type && this.type !== 'object') ? this.checkedItem.map(x => x && x[this.type] || '') : this.checkedItem)
        },
        
        // 点击分类切换
        clickTabsItem(index) {
            this.activeIndex = index
        },

        // 选中列表项
        clickListItem(item, idx) {
            const { code } = item
            const tabs = this.tabs
            let index = idx + 1

            this.$set(this.checked, idx, code)
            
            for (let i = index; i < tabs.length; i++) {
                this.$set(this.checked, i, null)
                if (i === index) {
                    this.$set(tabs[i], 'pcode', code)
                } else {
                    this.$set(tabs[i], 'pcode', '')
                }
            }

            if (index < tabs.length) {
                this.activeIndex = index
                this.getRegionList({ pcode: code })
            } else {
                this.visible = false
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/base/base-variables.scss';
    @import '~@/assets/css/base/element-variables.scss';
    @import '~@/assets/css/base/utils.scss';

    $--border-default: $--border-base $--border-color-light;

    .region-list--wrap {
        position: relative;

        .region-input--wrap {
            z-index: 0;

            &.is-checked:hover {
                .el-icon-arrow-up {
                    display: none;
                }
                .el-icon-circle-close {
                    display: inline-block;
                }
            }

            .el-icon-circle-close {
                display: none;
            }
        }

        .region-popover--wrap {
            position: absolute;
            width: 100%;
            min-width: 300px;
            margin-top: 12px;
            border: $--border-default;
            border-radius: $--box-border-radius;
            box-sizing: border-box;
            background-color: #fff;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
            z-index: 999;
        }

        .popper__arrow {
            top: -6px;
            left: 35px;
            margin-right: 3px;
            border-top-width: 0;
            border-bottom-color: #ebeef5;

            &::after {
                top: 1px;
                margin-left: -6px;
                border-top-width: 0;
                border-bottom-color: #fff;
            }
        }

        $--list-padding: 12px;
        .tab-list--wrap {
            display: flex;
            padding: 0 $--list-padding;
            border-bottom: $--border-default;

            .tab-item--box {
                flex: 1;
                padding: 0 $--list-padding;
                cursor: pointer;

                &.is-active {
                    color: $--color-primary;
                }
            }
        }

        .region-list--box {
            padding: 6px 0;
            line-height: 1;

            .region-item--box {
                display: none;
                padding: 0 $--list-padding;

                &.is-active {
                    display: block;
                }

                .prompt {
                    display: block;
                    padding: 15px 0;
                    text-align: center;
                    color: $--color-text-statis;
                }
            }

            .region-item {
                display: inline-block;
                padding: 6px 10px;
                margin: 0 4px 4px 0;
                border-radius: $--box-border-radius;
                cursor: pointer;

                &:hover {
                    background-color: #f5f7fa;
                }
                &.is-active {
                    background-color: #f5f7fa;
                    color: $--color-primary;
                }
            }
        }
    }
</style>
