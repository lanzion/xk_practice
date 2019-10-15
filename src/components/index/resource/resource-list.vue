<template>
    <div class="g-list--wrap">
        <ul class="m-list--resource">
            <router-link tag="li" :to="{ path: '/resource/detail', query: { id: item.id }}" class="m-list--box" v-for="(item, index) in datas" :key="index">
                <div class="m-list--item">
                    <h6 class="title clearfix">
                        <span class="fl">{{ item.name }}</span>
                        <time class="time fr">{{ item.uploadDate }}</time>
                    </h6>
                    <div class="table-layout">
                        <div class="table-cell">
                            <p class="content">
                                {{ item.remark }}
                            </p>
                            <dl class="info clearfix">
                                <li class="info-item">
                                    <dd class="info-title">贡献者</dd>
                                    <dt class="info-content">{{ item.uploaderName }}</dt>
                                </li>
                                <li class="info-item">
                                    <dd class="info-title">浏览</dd>
                                    <dt class="info-content">{{ item.browseNum }}</dt>
                                </li>
                                <li class="info-item">
                                    <dd class="info-title">大小</dd>
                                    <dt class="info-content">{{ item.size | sizeFormat }}</dt>
                                </li>
                                <li class="info-item">
                                    <dd class="info-title">下载</dd>
                                    <dt class="info-content">{{ item.downloadNum }}</dt>
                                </li>
                            </dl>
                        </div>
                        <slot name="operate" :data="item"></slot>
                    </div>
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

    .m-list--resource {

        .m-list--box {
            background-color: #fff;

            & + .m-list--box {
                .m-list--item {
                    border-top: $--border-default;
                }
            }
        }

        .m-list--item {
            position: relative;
            padding: 30px 0;
            font-size: 14px;
            cursor: pointer;
        }

        .title {
            font-size: 20px;
            line-height: 24px;

            .time {
                font-size: 14px;
                color: #999;
            }
        }

        .content {
            margin-top: 20px;
            font-size: 16px;
            color: #666;
        }

        .info {
            margin-top: 20px;
            color: #999;

            &-item,
            &-title,
            &-content {
                display: inline-block;
            }
            &-item {
                margin-right: 60px;
            }
            &-title {
                &::before {
                    content: '[';
                }
                &::after {
                    content: ']';
                }
            }
        }
    }
</style>
