<template>
    <el-form class="publish-reply--wrap is-right-angle">
        <el-input
            type="textarea"
            :rows="rows"
            :placeholder="placeholder"
            v-model="content">
        </el-input>
        <el-button class="button" type="primary" @click="submit">发表评论</el-button>
    </el-form>
</template>

<script>
export default {
    name: 'reply',
    data() {
        return {
            content: ''
        }
    },
    props: {
        rows: {
            type: Number,
            default: 2
        },
        placeholder: {
            type: String,
            default: '请发表您的评论'
        }
    },
    methods: {
        submit() {
            this.$emit('submit', this.content)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/mixin/core.scss';

    .publish-reply--wrap {
        text-align: right;
    }

    .button {
        margin-top: $--box-padding;
    }
</style>
