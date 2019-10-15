<template>
    <div class="g-list--wrap">
        <el-row tag="ul" class="m-list--course" :class="listClass" :gutter="gutter">
            <el-col tag="li" :style="{
                    width: `${100 / col}%`,
                }" class="m-list--box" v-for="(item, index) in datas" :key="index">
                <router-link tag="div" :to="{ name: 'courseDetail', params: { status: item.evaluateStatus }, query: { id: item.id }}" class="g-list--item is-shadow m-list--item">
                    <div class="g-cover--wrap">
                        <default-image class="g-cover--item" :src="item.previewPicture" alt="" />
                    </div>
                    <div class="m-list--info">
                        <h6 class="title">{{ item.theme }}</h6>
                        <p class="info clearfix">
                            <span class="fl tag">
                                <span class="score">{{ item.score }}分</span>
                                <span class="separate">|</span>
                                <span class="level">{{ item.rank }}级</span>
                            </span>
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
            grade: state => (state.grade || {}).dicList || []
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
            default: 50
        },
        // 列数
        col: {
            type: Number,
            default: 3
        },
        // 列表样式名
        listClass: {
            type: String,
            default: ''
        }
    },
    beforeMount() {
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

    $--item-bottom-margin: 33px;

    .m-list--course {
        margin-bottom: - $--item-bottom-margin;
        .m-list--box {
            margin-bottom: $--item-bottom-margin;
        }

        .m-list--item {
            height: 100%;
            border-radius: $--box-radius;
            overflow: hidden;
            cursor: pointer;

            &:hover {
                .title {
                    color: $--color-primary;
                }
            }
        }

        .g-cover--wrap {
            @include ratio($--course-cover-ratio);

            .g-cover--item {
                position: absolute;
            }
        }

        .m-list--info {
            $tag-width: 80px;
            $tag-height: 28px;
            padding: 20px 8px 22px;
            font-size: 14px;
            line-height: $tag-height;

            .title {
                font-size: 18px;
                line-height: 1;
                @include text-ellipsis;
            }

            .info {
                margin-top: 20px;
                color: #999;
            }

            .tag {
                display: inline-block;
                width: $tag-width;
                height: $tag-height;
                border-radius: $tag-height;
                background-color: $--color-primary;
                font-size: 12px;
                color: #fff;
                text-align: center;
            }

            .subject {
                margin-left: 10px;
                color: $--color-primary;
            }

            .grade {
                margin-left: 10px;
            }

            .name {
                color: #666;
            }
        }

        &.is-small {
            .m-list--course {
                margin-bottom: 0;
                .m-list--box {
                    margin-bottom: 0;
                }
            }
            .m-list--info {
                padding: 14px 12px;
                .title {
                    font-size: 16px;
                }
                .info {
                    margin-top: 12px;
                }
                .tag,
                .subject,
                .grade,
                .name {
                    margin: 0 2px;
                    transform: scale(.8);
                    transform-origin: left;
                }
                .tag {
                    margin-right: -10px;
                }
                .name {
                    margin: 0;
                    transform-origin: right;
                }
            }
        }
    }
</style>
