<template>
    <ul class="side-tool-wrap">
        <li class="side-tool-item table-layout" @click="scrollTop">
            <span class="icon-top table-cell"></span>
        </li>
        <li class="side-tool-item table-layout" slot="reference">
            <span class="icon-qrcode table-cell"></span>
            <div class="side-tool-hover wechat-wrap">
                <img class="wechat-image" src="~@/assets/image/wechat.png">
                <span>关注公众号</span>
            </div>
        </li>
        <!-- <li class="side-tool-item table-layout">
            <span class="icon-feedback table-cell"></span>
        </li> -->
    </ul>
</template>

<script>
export default {
    data() {
        return {
            timer: null
        }
    },
    beforeDestroy() {
        this.clearTimer()
    },
    methods: {
        scrollTop() {
            let distance = document.documentElement.scrollTop || document.body.scrollTop // 获得当前高度
            let step = distance / 20 // 每步的距离

            const jump = () => {
                if (distance > 0) {
                    distance -= step
                    window.scrollTo(0, distance)
                    this.timer = setTimeout(jump, 10)
                }
            }
            jump()
        },

        clearTimer() {
            clearTimeout(this.timer)
            this.timer = null
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/base/utils.scss';

    .side-tool-wrap {
        position: fixed;
        bottom: 100px;
        right: 30px;
        border-radius: $--box-radius;
        background-color: #fff;
        box-shadow: 0px 0px 6px 0px rgba(154, 154, 154, .27);
    }

    $side-tool-item-size: 60px;
    .side-tool-item {
        position: relative;
        width: $side-tool-item-size;
        height: $side-tool-item-size;
        line-height: $side-tool-item-size;
        font-size: 22px;
        color: #666;
        text-align: center;
        cursor: pointer;

        &:hover {
            color: $--color-primary;

            .side-tool-hover {
                display: block;
            }
        }

        & + .side-tool-item {
            &::after {
                $border-width: 30px;
                content: '';
                position: absolute;
                display: inline-block;
                left: ($side-tool-item-size - $border-width) / 2;
                width: 30px;
                height: 1px;
                background-color: $--border-color-base;
            }
        }

        .side-tool-hover {
            display: none;
            position: absolute;
            top: 50%;
            right: $side-tool-item-size + 20;
            transform: translateY(-50%);
            padding: 10px 10px 0;
            font-size: 14px;
            line-height: 2.5;
            color: #333;
            background-color: #fff;
            box-shadow: 0px 0px 6px 0px rgba(154, 154, 154, .27);
            &::after {
                content: '';
                position: absolute;
                display: inline-block;
                top: 50%;
                right: 0;
                width: 10px;
                height: 10px;
                transform: rotate(45deg) translate(0, -50%);
                box-shadow: 2px -2px 6px 0 rgba(154, 154, 154, .1);
                background-color: #fff;
            }
        }
    }

    .icon {
        &-top,
        &-feedback {
            &:hover {
                font-size: 14px;
                line-height: 1;
                white-space: pre;
            }
        }
        &-top {
            &:hover {
                &::before {
                    content: '回到\A顶部';
                }
            }
        }
        &-feedback {
            &:hover {
                &::before {
                    content: '意见\A反馈';
                }
            }
        }
    }

    .wechat-wrap {
        text-align: center;

        .wechat-image {
            width: 120px;
            display: block;
        }
    }
</style>
