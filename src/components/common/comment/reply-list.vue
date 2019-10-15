<template>
    <ul class="reply-list--wrap">
        <li class="reply-item--wrap" v-for="item in datas" :key="item.id">
            <div>
                <span class="name">{{ item.nickname }}</span>
                <template v-if="item.replyMember">
                    <span class="reply-txt">回复</span>
                    <span class="name">{{ item.replyMember.nickname }}</span>
                </template>
                <span class="quote">：</span>
                <p class="content">{{ item.replyContent }}</p>
                <button class="g-button button" @click="show(item)">回复</button>
            </div>
            <time class="time">{{ item.createDate | dateFormat }}</time>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'reply-list',
    data() {
        return {
        }
    },
    props: {
        datas: {
            type: Array,
            default() {
                return []
            }
        },
        index: Number
    },
    methods: {

        show(item) {
            this.$emit('show', this.index, item)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/mixin/core.scss';

    .reply-item--wrap {
        margin-top: 25px;
        font-size: 14px;

        .name {
            color: $--color-text-secondary;
        }
        .reply-txt {
            margin: 0 6px;
            color: $--color-text-regular;
        }
        .content {
            display: inline;
            margin-right: 40px;
            line-height: 24px;
        }
        .time {
            display: block;
            margin-top: 4px;
            color: $--color-text-regular;
        }
    }
</style>
