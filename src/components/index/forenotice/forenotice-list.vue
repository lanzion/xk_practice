<template>
    <div class="g-list--wrap">
        <el-row tag="ul" class="m-list--forenotice" :gutter="gutter" type="flex">
            <el-col tag="li" :style="{ width: `${100 / col}%` }" class="m-list--box" v-for="(item, index) in datas" :key="index">
                <router-link tag="div" :to="{ path: '/forenotice/detail', query: { id: item.id }}" class="m-list--item g-list--item is-shadow">
                    <div class="g-cover--wrap">
                        <default-image class="g-cover--item" :src="item.previewPicture" alt="" />
                        <span v-if="isStatus" class="status" :class="[`status-${item.evaluateStatus}`]">{{ item.evaluateStatus | translate(evaluateStatus) }}</span>
                    </div>
                    <div class="m-list--info">
                        <h6 class="title">{{ item.theme }}</h6>
                        <p class="info clearfix">
                            <span class="fl subject">{{ item.subject | translate(subject) }}</span>
                            <span class="fl grade">{{ item.grade | translate(grade) }}</span>
                            <span class="fr name">{{ item.nickname }}</span>
                        </p>
                    </div>
                </router-link>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState('dict', {
            subject: state => (state.subject || {}).dicList || [],
            grade: state => (state.grade || {}).dicList || [],
            evaluateStatus: state => (state.evaluateStatus || {}).dicList || []
        })
    },
    props: {
        // 列表数据
        datas: {
            type: Array,
            default() {
                return []
            }
        },
        // 列表间隔, 单位px
        gutter: {
            type: Number,
            default: 30
        },
        // 列数
        col: {
            type: Number,
            default: 5
        },
        isStatus: {
            type: Boolean,
            default: false
        }
    },
    beforeUpdate() {
        this.getDataDict({ code: 'subject' })
        this.getDataDict({ code: 'grade' })
    },
    methods: {
        ...mapActions('dict', ['getDataDict'])
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/utils.scss';
    @import '~@/assets/css/mixin/core.scss';

    $--item-bottom-margin: 20px;

    .m-list--forenotice {
        flex-flow: row wrap;
        margin-bottom: - $--item-bottom-margin;

        .m-list--box {
            margin-bottom: $--item-bottom-margin;
        }

        .m-list--item {
            display: flex;
            flex-direction: column;
            height: 100%;
            cursor: pointer;

            &:hover {
                .title {
                    color: $--color-primary;
                }
            }
        }

        .g-cover--wrap {
            @include ratio($--activity-cover-ratio);

            .g-cover--item {
                position: absolute;
            }

            .status {
                $h: 28px;
                position: absolute;
                right: 10px;
                bottom: 10px;
                width: 50px;
                height: $h;
                line-height: $h;
                border-radius: $h;
                color: #fff;
                text-align: center;

                &-1 {
                    background-color: $--color-secondary;
                }

                &-2 {
                    background-color: rgba(0, 0, 0, .4);
                }
            }
        }

        .m-list--info {
            display: flex;
            flex-direction: column;
            flex: 1;
            padding: 4px 10px;

            .title {
                flex: 1;
                font-size: 16px;
                line-height: 1.5;
            }

            .info {
                margin-top: 12px;
                color: #999;
            }

            .grade {
                margin-left: 10px;
            }

            .name {
                font-size: 14px;
                color: #666;
            }
        }
    }

    .is-empty {
        .m-list--forenotice {
            margin-bottom: 0;

            .m-list--box {
                margin-bottom: 0;
            }
        }
    }

    .is-wide {
        .m-list--item {
            flex-direction: row;
            background-color: #fff;
        }
        .g-cover--wrap {
            $--cover-width: 216px;
            @include picture($width: $--cover-width, $height: $--cover-width / $--activity-cover-ratio);
            padding: 0;
        }
        .m-list--info {
            padding: 16px 20px 20px;

            .title {
                font-size: 20px;
                line-height: 1.2;
            }
        }
    }
</style>
