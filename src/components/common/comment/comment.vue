<template>
    <div>
        <section class="comment-wrap">
            <h6 class="comment-title">发表评论</h6>
            <reply @submit="doComment" :rows="4" />
        </section>

        <comment-list @submit="doReply" :datas="comments" :type="type" />
        <pagination v-if="comments.length" class="m-list--page" :param="page" :total="totalNum"></pagination>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'comment',
    inheritAttrs: false,
    data() {
        return {
        }
    },
    props: {
        comments: {
            type: Array,
            default() {
                return []
            }
        },
        page: Object,
        totalNum: Number,
        /**
         * @desc 评论类别
         * @values 1:教学资源评论, 2:心得评论, 3:评课评论
         */
        type: Number
    },
    components: {
        'reply': resolve => require(['./publish-reply'], resolve),
        'comment-list': resolve => require(['./comment-list'], resolve)
    },
    methods: {
        ...mapActions('comment', ['addCommentData', 'addReplyData']),

        // 评论
        doComment(content) {
            const params = {
                fromId: this.$route.query.id,
                type: this.type,
                content
            }
            this.addCommentData(params).then(res => {
                const { code } = res.data
                if (code === 200) {
                    this.commentSuccess({ type: 'comment', params })
                }
            })
        },

        // 回复
        doReply(fromId, replyContent) {
            const params = {
                fromId,
                replyType: this.type,
                replyContent
            }
            this.addReplyData(params).then(res => {
                const { code } = res.data
                if (code === 200) {
                    this.commentSuccess({ type: 'reply', params })
                }
            })
        },

        commentSuccess(data) {
            this.emit('success', data)
        }
    }
}
</script>

<style lang="scss" scoped>
    .comment-wrap {
        .comment-title {
            font-size: 20px;
            margin-bottom: 20px;
        }
    }
</style>
