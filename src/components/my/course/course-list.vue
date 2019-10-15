<template>
    <ul class="g-list--wrap m-list--course">
        <li class="m-list--item table-layout" v-for="(item, index) in datas" :key="index">
            <div class="g-cover--wrap table-cell">
                <default-image class="g-cover--item" :src="item.previewPicture" alt="" />
                <slot name="cover" :data="item"></slot>
            </div>
            <div class="m-list--info table-cell">
                <h6 class="title">
                    <span>{{ item.theme }}</span>
                    <span class="g-tag tag">录播评课</span>
                </h6>
                <div class="info">
                    <ul class="tags">
                        <li class="tag-item" v-for="(tag, t) in item.tags" :key="t">{{ tag }}</li>
                    </ul>
                    <p class="catalog">
                        <span class="m-dl--title">教材目录</span>
                        <span class="m-dl--content">{{ item.catalogueNames }}</span>
                    </p>
                </div>
                <div class="other">
                    <p class="m-dl--item">
                        <span class="m-dl--title">开始时间</span>
                        <time class="m-dl--content">{{ item.startTime | dateFormat('yyyy-MM-dd HH:mm') }}</time>
                        <span class="m-dl--title">结束时间</span>
                        <time class="m-dl--content">{{ item.endTime | dateFormat('yyyy-MM-dd HH:mm') }}</time>
                    </p>
                    <p class="m-dl--item">
                        <span class="m-dl--title">授课地点</span>
                        <span class="m-dl--content">{{ item.place }}</span>
                    </p>
                </div>
            </div>
            <slot name="operate" :data="item"></slot>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: {
        // 列表数据
        datas: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/utils.scss';
    @import '~@/assets/css/mixin/core.scss';

    .m-list--course {
        
        $cover-width: 240px;
        .m-list--item {
            height: $cover-width / $--course-cover-ratio;
            padding: 30px 0;
            overflow: hidden;
            cursor: pointer;

            & + .m-list--item {
                border-top: $--border-default;
            }

            &:hover {
                .title {
                    color: $--color-primary;
                }
            }
        }

        .g-cover--wrap {
            position: relative;
            width: $cover-width;
            height: inherit;
        }

        .m-list--info {
            position: relative;
            padding-left: 22px;
            font-size: 14px;
            color: #666;
            vertical-align: top;

            .title {
                font-size: 18px;
                line-height: 1;
                color: $--color-text-primary;
                @include text-ellipsis;
            }

            .tag {
                margin-left: 12px;
            }

            .info {
                margin-top: 8px;
                line-height: 1.3;
            }

            .tags {
                .tag-item {
                    display: inline;
                    color: $--color-primary;

                    & + .tag-item {
                        &::before {
                            content: '/';
                            display: inline-block;
                            margin: 0 1.2em;
                        }
                    }
                }
            }

            .other {
                position: absolute;
                bottom: 0;
            }
            
            .m-dl {
                &--item {
                    line-height: 1.3;
                }
                &--title,
                &--content {
                    font-size: inherit;
                }
                &--title {
                    margin-right: .5em;
                }
                &--content {
                    & + .m-dl--title {
                        margin-left: 40px;
                    }
                }
            }
        }
    }
</style>
