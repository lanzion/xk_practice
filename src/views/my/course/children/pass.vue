<template>
    <div>
        <ul class="status-list--wrap">
            <span class="total">共{{ total }}条数据</span>
            <li class="status-item" :class="{ 'is-active': evaluate === status.code }" v-for="(status) in evaluateStatus" :key="status.code" @click="changeStatus(status)">{{ status.name }}</li>
        </ul>
        <course-list :class="{ 'is-empty': !datas.length }" :datas="datas" v-loading="isLoading">
            <template slot="cover" slot-scope="{ data }">
                <span class="status" :class="[`__status-${data.evaluateStatus}`]">{{ data.evaluateStatus | translate(evaluateStatus) }}</span>
            </template>
            <template slot="operate" slot-scope="{ data }">
                <section class="table-cell operate-box" :class="{ 'is-vt': data.evaluateStatus === 2 }">
                    <div v-if="data.evaluateStatus === 2" class="tag g-tag is-circle">
                        <span class="score">{{ data.score }}分</span>
                        <span class="separate">|</span>
                        <span class="level">{{ data.rank }}级</span>
                    </div>
                    <div v-else>
                    </div>
                </section>
            </template>
        </course-list>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            status: ''
        }
    },
    props: {
        datas: {
            type: Array,
            default() {
                return []
            }
        },
        total: {
            type: Number,
            default: 0
        },
        evaluate: {
            type: Number,
            default: null
        },
        isLoading: {
            type: Boolean,
            default() {
                return false
            }
        }
    },
    components: {
        'course-list': resolve => require(['@/components/my/course/course-list'], resolve)
    },
    computed: {
        ...mapState('dict', {
            evaluateStatus: state => (state.evaluateStatus || {}).dicList || []
        })
    },
    methods: {
        changeStatus(item) {
            let { code } = item
            if (this.status === code) {
                code = null
            }
            this.status = code
            this.$emit('update:evaluate', code)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/utils.scss';
    @import '~@/assets/css/mixin/core.scss';

    .status-list--wrap {
        margin-top: $--box-margin;

        .total {
            font-size: 18px;
        }
        .status-item {
            display: inline-block;
            margin-left: 36px;
            font-size: $--font-size-base;
            cursor: pointer;

            &.is-active {
                color: $--color-primary;
            }
        }
    }

    .status {
        $h: 30px;
        position: absolute;
        display: inline-block;
        top: 0;
        width: 60px;
        height: $h;
        line-height: $h;
        border-radius: 0 0 20px 0;
        text-align: center;
        color: #fff;

        @each $color-key, $color-value in $--evaluate-status-color {
            &.__status-#{$color-key} {
                background-color: $color-value;
            }
        }
    }
    .operate-box {
        width: 100px;
        text-align: right;

        &.is-vt {
            vertical-align: top;
        }

        .tag {
            $h: 28px;
            @include tag($width: 80px, $height: $h, $border-radius: $h);
            padding: 0;
        }
    }
</style>
