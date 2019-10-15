<template>
    <div class="g-list--wrap">
        <ul class="m-list--experience">
            <li class="m-list--box table-layout" v-for="(item, index) in datas" :key="index">
                <div class="m-list--item table-cell">
                    <h6 class="title">{{ item.title }}</h6>
                    <p class="info">
                        <span class="info-item name">{{ item.teacherName }}</span>
                        <time class="info-item time">{{ item.createDate }} 发布</time>
                        <span class="info-item browse">{{ item.browseNum }} 浏览</span>
                    </p>
                    <article class="content">{{ item.content | ellipsis(word) }}</article>
                </div>
                <slot name="operate" :data="item"></slot>
            </li>
        </ul>
    </div>
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
        },
        // 内容字数
        word: {
            type: Number,
            default: 120
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/utils.scss';

    .m-list--experience {

        .m-list--box {
            & + .m-list--box {
                border-top: $--border-default;
            }
        }

        .m-list--item {
            padding: 30px 0;
            font-size: 14px;
            cursor: pointer;
        }

        .title {
            font-size: 20px;
            font-weight: bold;
        }

        .info {
            margin-top: 20px;
            color: #999;

            &-item {
                display: inline-block;
                margin-right: 3em
            }
            .name {
                width: 5em;
            }
        }

        .content {
            margin-top: 14px;
            line-height: 1.5;
            text-align: justify;
        }
    }
</style>
