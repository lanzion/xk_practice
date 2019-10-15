<template>
    <section class="resource-detail--intro">
        <div class="clearfix">
            <div class="fl">
                <h3 class="title">
                    <span>{{ detail.name }}</span>
                    <time class="time">{{ detail.uploadDate | dateFormat('yyyy-MM-dd HH:mm') }}</time>
                    <span class="browse">浏览 {{ detail.browseNum || 0 }}</span>
                </h3>
                <span class="user">{{ detail.uploaderName }}</span>
            </div>
            <div class="fr info">
                <ul class="tags">
                    <li class="tag-item" v-for="(tag, t) in detail.tags" :key="t">{{ tag }}</li>
                </ul>
                <p class="catalog">
                    <span class="m-dl--title">教材目录</span>
                    <span class="m-dl--content">{{ detail.textBookCatalog }}</span>
                </p>
            </div>
        </div>

        <component :is="detail.component" class="resource-detail--result" :resourceId="detail.resourceId" :src="detail.path"></component>
        
        <article class="resource-detail--content">
            <h6 class="m-module--title">资源说明</h6>
            <p class="content">{{ detail.remark }}</p>
        </article>
    </section>
</template>

<script>
export default {
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
    .resource-detail {
        &--intro {
            position: relative;
            vertical-align: top;
            font-size: 14px;

            .title {
                font-size: 24px;
            }
            .time {
                margin-left: $--box-margin;
                font-size: 14px;
                color: #666;
            }
            .browse {
                margin-left: 20px;
                font-size: 14px;
                color: #666;
            }
            .user {
                display: block;
                margin-top: 12px;
                font-size: 18px;
            }
            .tags {
                .tag-item {
                    display: inline;
                    font-size: 18px;
                    color: $--color-primary;

                    & + .tag-item {
                        &::before {
                            content: '/';
                            display: inline-block;
                            margin: 0 1.5em;
                            color: #666;
                        }
                    }
                }
            }
            .catalog {
                margin-top: 12px;
                font-size: 18px;
                color: #666;
            }
        }
        &--result {
            display: block;
            min-width: 80%;
            max-width: 100%;
            margin: $--box-margin auto 0;
            clear: both;
        }
        &--content {
            margin-top: $--box-margin;
            .content {
                padding-right: 140px;
                margin-top: 10px;
                font-size: 14px;
                line-height: 2;
                color: #666;
                text-align: justify;
            }
        }
    }
</style>
