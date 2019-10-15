<template>
    <section class="experience-content--wrap">
        <h3 class="title">
            <span>{{ detail.title || '标题' }}</span>
        </h3>
        <p class="info">
            <span class="user">发表者 {{ detail.teacherName || '匿名' }}</span>
            <time class="time">{{ detail.createDate | dateFormat }}</time>
            <span class="browse">浏览 {{ detail.browseNum || 0 }}</span>
        </p>
        <article class="content">{{ detail.content }}</article>
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
    },
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/module/module-detail.scss';
    .experience-content--wrap {
        position: relative;
        font-size: 14px;

        .title {
            font-size: 24px;
            text-align: center;
        }
        .info {
            margin-top: 20px;
            font-size: 18px;
            text-align: center;
            color: #999;
        }
        .time {
            margin-left: 50px;
        }
        .browse {
            margin-left: 80px;
        }
        .content {
            margin-top: 30px;
            font-size: 14px;
            line-height: 2;
            color: #666;
            text-align: justify;
            word-wrap: break-word;
        }
    }
</style>
