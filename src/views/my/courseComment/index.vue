<template>
    <div class="m-list--wrap message-list--wrap">
        <section class="m-btn--wrap">
            <el-button class="m-item--btn" type="text" @click="read(null)">全部已读</el-button>
            <el-button class="m-item--btn" type="text" @click="del(null)">全部删除</el-button>
        </section>

        <ul class="message-list--box g-list--wrap" :class="{ 'is-empty': !datas.length }" v-loading="isLoading">
            <li class="message-item--box table-layout" v-for="(item) in datas" :key="item.id">
                <article class="table-cell">
                    <h6 class="title" :class="{ 'isn-read': !item.isRead }">系统消息</h6>
                    <p class="content">{{ item.content }}</p>
                </article>
                <div class="table-cell operate-box">
                    <time class="time">{{ item.sendDate | dateFormat('yyyy-MM-dd HH:mm') }}</time>
                    <el-button class="operate-item--btn" type="text" @click="read(item)" :disabled="!!item.isRead">标记已读</el-button>
                    <el-button class="operate-item--btn" type="text" @click="del(item)">删除</el-button>
                </div>
            </li>
        </ul>

        <pagination class="m-list--page" :param="page" :total="totalNum" />
    </div>
</template>

<script>
import { mapState } from 'vuex'

import { requestMessageList, readMessage, delMessage } from '@/api/message'

export default {
    data() {
        return {
            isLoading: false,
            page: {
                pageNum: 1,
                pageSize: 4
            },
            totalNum: 0,
            datas: [],
        }
    },
    computed: {
        ...mapState('login', {
            uid: state => (state.userInfo || {}).id || ''
        })
    },
    watch: {
        page: {
            handler: function () {
                this.getMessageData()
            },
            deep: true,
            immediate: true
        }
    },
    methods: {

        // 获取消息数据
        getMessageData() {
            this.isLoading = true

            requestMessageList({ receiveId: this.uid }, this.page).then(res => {
                const { code, entity } = res.data
                if (code === 200) {
                    this.datas = entity.resultData || []
                    this.totalNum = entity.totalNum || 0
                }
            }).finally(() => {
                this.isLoading = false
            })
        },

        // 标记已读
        read(item) {
            const items = item ? [item] : this.datas
            // console.log(items)
            if (!items.length) {
                this.$message({
                    message: '暂无消息可标记',
                    type: 'warning'
                })
                return
            }
            const params = items.map(x => {
                return {
                    id: x.messageId
                }
            })
            readMessage(params).then(res => {
                const { code, msg } = res.data
                if (code === 200) {
                    this.$message({
                        message: '标记成功',
                        type: 'success'
                    })
                    items.forEach(x => {
                        x.isRead = 1
                        return x
                    })
                } else {
                    this.$message({
                        message: msg,
                        type: 'warning'
                    })
                }
            })
        },

        // 删除
        del(item) {
            const items = item ? [item] : this.datas
            if (!items.length) {
                this.$message({
                    message: '暂无消息可删除',
                    type: 'warning'
                })
                return
            }
            const params = items.map(x => {
                return {
                    id: x.messageId
                }
            })
            delMessage(params).then(res => {
                const { code, msg } = res.data
                if (code === 200) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    this.getMessageData()
                } else {
                    this.$message({
                        message: msg,
                        type: 'warning'
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/base-variables.scss';
    @import '~@/assets/css/module/my-module-list.scss';

    .message-list--wrap {
        padding: 0 45px;
    }

    .message-item--box {
        padding: 30px 0;
        border-bottom: $--border-default;

        .title {
            font-size: 20px;

            &.isn-read {
                &::after {
                    $size: 10px;
                    content: '';
                    display: inline-block;
                    width: $size;
                    height: $size;
                    margin: 5px 0 0 20px;
                    border-radius: 100%;
                    background-color: $--color-secondary;
                    vertical-align: top;
                }
            }
        }
        .content {
            margin-top: 16px;
            font-size: 16px;
            color: $--color-text-secondary;
            line-height: 1.5;
            word-break: break-word;
        }
        .operate-box {
            width: 140px;
            font-size: $--font-size-base;
            text-align: right;
            vertical-align: top;
        }
        .time {
            display: block;
            margin-bottom: 26px;
            color: $--color-text-regular;
        }
        .operate-item--btn {
            padding: 0;
            color: #666;

            &:not(.is-disabled):hover {
                color: $--color-primary;
            }
        }
    }
</style>
