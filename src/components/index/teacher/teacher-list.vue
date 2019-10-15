<template>
    <div class="g-list--wrap">
        <el-row tag="ul" class="m-list--teacher" :gutter="gutter">
            <el-col tag="li" :style="{ width: `${100 / col}%` }" class="m-list--box" :class="{ 'isn-empty': datas.length }" v-for="(item, index) in datas" :key="index">
                <section class="g-bg--white g-list--item is-shadow m-list--item table-layout">
                    <router-link tag="div" :to="{ path: '/teacher/detail', query: { id: item.id }}" class="user table-cell">
                        <div class="avatar-wrap">
                            <default-image class="g-cover--item" :src="item.face" :default-image="null" alt="" />
                        </div>
                        <span class="name">{{ item.name }}</span>
                    </router-link>
                    <div class="info clearfix">
                        <p class="school">{{ item.schoolName }}</p>
                        <div class="table-layout">
                            <h6 class="course-title table-cell">热门评课</h6>
                            <ul class="subject-wrap table-cell">
                                <h6 class="subject-title">任教学科</h6>
                                <li class="subject-item" v-for="(teach, t) in item.teach" :key="t">{{ teach | translate(subject) }}</li>
                            </ul>
                        </div>
                        <el-row tag="ul" class="course-wrap" :gutter="15">
                            <el-col tag="li" :span="8" v-for="(course, c) in item.course" :key="c">
                                <router-link :to="{ name: 'courseDetail', params: { status: course.evaluateStatus }, query: { id: course.id }}" class="g-cover--wrap">
                                    <default-image class="g-cover--item" :src="course.previewPicture" alt="" />
                                </router-link>
                            </el-col>
                        </el-row>
                    </div>
                </section>
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
            subject: state => (state.subject || {}).dicList || []
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
            default: 2
        }
    },
    beforeUpdate() {
        this.getDataDict({ code: 'subject' })
    },
    methods: {
        ...mapActions('dict', ['getDataDict'])
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/utils.scss';
    @import '~@/assets/css/mixin/core.scss';

    $--item-bottom-margin: 30px;

    .m-list--teacher {
        &.isn-empty {
            margin-bottom: - $--item-bottom-margin;
        }

        .m-list--box {
            margin-top: 0;
            margin-bottom: $--item-bottom-margin;
        }

        .m-list--item {
            padding: 25px;
            padding-left: 0;
            box-sizing: border-box;
            font-size: 14px;
        }

        $avatar-size: 80px;
        .user {
            width: $avatar-size;
            padding: 0 30px;
            border-right: $--border-default;
            text-align: center;
            cursor: pointer;
        }

        .avatar-wrap {
            @include avatar($avatar-size);
            text-align: initial;
            overflow: hidden;
        }

        .name {
            display: inline-block;
            margin-top: 20px;
            font-size: 20px;
        }

        .school {
            margin-bottom: 30px;
            font-size: 18px;
            color: #666;
        }

        .info {
            padding-left: 30px;
        }

        .course-title,
        .subject-wrap {
            vertical-align: bottom;
        }

        .course-title {
            width: 4em;
            color: #999;
        }

        .course-wrap {
            margin-top: 10px;

            .g-cover--wrap {
                display: block;
                @include ratio(1.6);
            }
            .g-cover--item {
                position: absolute;
            }
        }

        .subject-wrap {
            text-align: right;
            font-size: 16px;
            color: #666;

            .subject-title,
            .subject-item {
                display: inline-block;
            }
            .subject-title {
                margin-right: 4px;
            }
            .subject-item {
                color: $--color-primary;

                & + .subject-item {
                    &::before {
                        content: '/';
                        display: inline-block;
                        margin: 0 4px;
                        color: #666;
                    }
                }
            }
        }
    }
</style>
