<template>
    <ul class="comment-list--wrap">
        <li class="comment-item--wrap clearfix" v-for="(item, index) in datas" :key="index">
            <div class="avatar-wrap fl">
                <default-image class="g-cover--item" :src="item.thumbImg" alt="" />
            </div>
            <section class="fl">
                <div class="user">
                    <span>{{ item.nickname }}</span>
                    <time class="time">{{ item.createDate | dateFormat }}</time>
                </div>
                <div class="content-wrap clearfix">
                    <button class="fr button" @click="show(index, item)">回复</button>
                    <article class="content">{{ item.content }}</article>
                </div>
                <reply-list :datas="item.replyDtoList" :index="index" @show="show" />
                <reply v-show="visible === index" class="reply-wrap" @submit="doReply" :placeholder="placeholder" />
            </section>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'comment-list',
    data() {
        return {
            visible: -1,
            curId: '',
            placeholder: ''
        }
    },
    props: {
        datas: Array
    },
    components: {
        'reply-list': resolve => require(['./reply-list'], resolve),
        'reply': resolve => require(['./publish-reply'], resolve)
    },
    methods: {

        show(index, item) {
            this.visible = index
            this.curId = item.fromId
            this.placeholder = `回复 @${item.nickname}`
        },

        doReply(content) {
            this.$emit('submit', this.curId, content)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/mixin/core.scss';

    .comment-item--wrap {
        $avatar-size: 50px;
        $avatar-padding: 30px;
        padding: #{$avatar-padding} 0;

        & + .comment-item--wrap {
            border-top: $--border-default;
        }

        .avatar-wrap {
            @include avatar($avatar-size);
            margin-right: $--box-margin;
            overflow: hidden;
        }

        .content-wrap {
            width: 1200px - $avatar-size - $avatar-padding - 40 * 2;
        }

        .reply-wrap {
            margin-top: $--box-margin;
        }

        .user {
            font-size:$--font-size-base;
            line-height: $avatar-size;
        }
        .time {
            margin-left: 20px;
            color: $--color-text-regular;
        }
        .content {
            margin-right: 60px;
            font-size: 16px;
            line-height: 24px;
        }
        .button {
            padding: 0;
            border: 0;
            font-size: 16px;

            &:hover {
                color: $--color-primary;
            }
        }
    }
</style>
