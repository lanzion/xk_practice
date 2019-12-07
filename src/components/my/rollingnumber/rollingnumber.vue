<template>
    <div class="number-grow-warp">
        <span ref="numberGrow" class="number-grow" :style="{color:numColor}">0</span>
    </div>
</template>

<script>
export default {
    name: 'r-number',
    props: {
        time: {
            type: Number,
            default: 2
        },
        value: {
            type: Number,
            default: 1
        },
        numColor: {
            type: String,
            default: '#fff'
        }
    },
    methods: {
        numberGrow(ele) {
            let _this = this
            let step = Math.ceil((_this.value * 10) / (_this.time * 1000))
            let current = 0
            let start = 0
            let t = setInterval(function () {
                start += step
                if (start > _this.value) {
                    clearInterval(t)
                    start = _this.value
                    t = null
                }
                if (current === start) {
                    return
                }
                current = start
                ele.innerHTML = current.toString()
            }, 10)
        }
    },
    mounted() {
        this.numberGrow(this.$refs.numberGrow)
    }
}
</script>

<style lang="scss" scoped>
.number-grow-warp {
    transform: translateZ(0);
    .number-grow {
        font-size: 24px;
        line-height: 29.5px;
        letter-spacing: 1px;
    }
}
</style>
