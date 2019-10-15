<template>
    <div class="g-list--wrap">
        <ul class="m-list--resource">
            <li class="m-list--box" :class="[itemClass]" v-for="(item, index) in datas" :key="index">
                <div class="m-list--item clearfix">
                    <h6 class="title">{{ item.name }}</h6>
                    <p class="info clearfix">
                        <span class="info-item name fl">{{ item.uploaderName }}</span>
                        <time class="info-item time fr">{{ item.createDate }} 发布</time>
                    </p>
                </div>
            </li>
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
        },
        /**
         * @desc 单行条目样式
         * @value is-single
         */
        itemClass: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/utils.scss';

    .m-list--resource {

        .m-list--box {

            &.is-single {
                .m-list--item {
                    padding: 15px 0;
                    line-height: 20px;
                }
                .title {
                    float: left;
                }
                .info {
                    float: right;
                    margin-top: 0;
                }
                .name {
                    display: none;
                }
            }
        }

        .m-list--item {
            position: relative;
            padding: 16px 30px 20px;
            font-size: 14px;
            cursor: pointer;

            &::before {
                $disc-size: 5px;
                position: absolute;
                display: inline-block;
                content: '';
                width: $disc-size;
                height: $disc-size;
                margin: .8em 0 0 -15px;
                background-color: $--color-primary;
                border-radius: 50%;
            }
        }

        .title {
            font-size: 20px;
            line-height: 1.2;
        }

        .info {
            margin-top: 20px;
            color: #999;
        }
    }
</style>
