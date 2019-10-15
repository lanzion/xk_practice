<template>
    <div class="g-list--wrap">
        <ul class="m-list--experience">
            <router-link tag="li" :to="{ path: '/experience/detail', query: { id: item.id }}" class="m-list--box" v-for="(item, index) in datas" :key="index">
                <div class="m-list--item">
                    <h6 class="title clearfix">
                        <span class="fl">{{ item.title }}</span>
                        <span class="fr browse">{{ item.browseNum || 0 }} 浏览</span>
                    </h6>
                    <p class="info">
                        <span class="info-item name">{{ item.teacherName }}</span>
                        <time class="info-item time">{{ item.createDate }} 发布</time>
                    </p>
                    <article class="content">{{ item.content }}</article>
                </div>
            </router-link>
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
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/utils.scss';

    .m-list--experience {

        .m-list--box {
            background-color: #fff;
            & + .m-list--box {
                margin-top: $--box-padding;
            }
        }

        .m-list--item {
            padding: 30px;
            font-size: 14px;
            cursor: pointer;
        }

        .title {
            font-size: 20px;
            font-weight: bold;
            line-height: 24px;

            .browse {
                font-size: 14px;
                font-weight: normal;
                color: #999;
            }
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
