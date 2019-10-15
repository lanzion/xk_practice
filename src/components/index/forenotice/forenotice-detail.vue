<template>
    <div>
        <article class="forenotice-detail--content">
            <h6 class="m-module--title">内容简介</h6>
            <p class="content">{{ detail.content }}</p>
        </article>

        <ul class="forenotice-detail--resource">
            <h6 class="m-module--title">教案资源</h6>
            <li class="resource-item" v-for="(resource, r) in detail.ecResourseList" :key="r">
                <span class="name">{{ resource.resourseName }}</span>
                <a class="g-button" href="">下载</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    inheritAttrs: false,
    data() {
        return {
        }
    },
    props: {
        detail: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/module/module-detail.scss';

    .forenotice-detail {
        &--content {
            .content {
                padding-right: 60px;
                margin-top: 10px;
                font-size: 14px;
                line-height: 2;
                color: #666;
                text-align: justify;
            }
        }
        &--resource {
            padding-top: $--box-margin;
            margin-top: $--box-margin;
            border-top: $--border-default;

            .resource-item {
                margin-top: 16px;
                font-size: 14px;
                line-height: 24px;

                .name {
                    margin-right: 40px;
                }
            }
        }
    }
</style>
