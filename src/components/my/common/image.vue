<template>
    <div>
        <div :style="{height: imgHeight}" v-if="type === 1" class="one">
            <img @load="imageLoad" @error="imageErr" :src="imageSrc" />
        </div>
        <div :style="{height: imgHeight}" v-if="type === 2" class="two">
            <img @load="imageLoad" @error="imageErr" :src="imageSrc" />
        </div>
        <div :style="{height: imgHeight}" v-if="type === 3" class="thr">
            <img @load="imageLoad" @error="imageErr" :src="imageSrc" />
        </div>
        <div :style="{height: imgHeight}" v-if="type === 4 " class="thr">
            <img @load="imageLoad" @error="imageErr" :src="imageSrc" />
            <slot v-if="istrue" name="spans" />
        </div>
        <div :style="{height: imgHeight}" v-if="type === 5" class="thr">
            <img @load="imageLoad" @error="imageErr" :src="imageSrc" />
            <slot v-if="istrue" name="spans" />
        </div>
        <div :style="{height: imgHeight}" v-if="type === 10" class="thr">
            <img @load="imageLoad" @error="imageErr" :src="imageSrc" />
        </div>
    </div>
</template>
 
<script>
const defaultImage2 = '../../../../static/img/info2.jpg'
const defaultImage = '../../../../static/img/info.jpg'
const defaultImage3 = '../../../../static/img/basepage.jpg' // 基地主页图
const defaultImage4 = '../../../../static/img/schoolpage.jpg' // 学校主页图 renwumoren
const defaultImage10 = '../../../../static/img/renwumoren.png'
export default {
    name: 'ov-image',
    data() {
        return {
            imageSrc: this.srcData,
            istrue: false
        }
    },
    watch: {
        srcData: {
            handler(newVal) {
                this.imageSrc = newVal
                this.istrue = false
                if (newVal === null) {
                    if (this.type === 4) {
                        this.imageSrc = defaultImage3
                        this.istrue = true
                    }
                    if (this.type === 5) {
                        this.imageSrc = defaultImage4
                        this.istrue = true
                    }
                }
            },
            deep: true
        }
    },
    props: {
        srcData: {
            default: '',
            type: String
        },
        type: {
            default: 1,
            type: Number
        },
        imgHeight: {
            default: '',
            type: String
        }
    },
    methods: {
        imageErr(e) {
            if (this.type === 2) {
                this.srcData && (this.imageSrc = defaultImage2)
            } else if (this.type === 4) {
                this.srcData && (this.imageSrc = defaultImage3)
                this.istrue = true
            } else if (this.type === 5) {
                this.srcData && (this.imageSrc = defaultImage4)
                this.istrue = true
            } else if (this.type === 10) {
                this.srcData && (this.imageSrc = defaultImage10)
            } else {
                this.srcData && (this.imageSrc = defaultImage)
            }
            this.$forceUpdate()
        },
        imageLoad(e) {
            // console.log('加载完成---', e)
        }
    },
    created() {}
}
</script>
<style lang="scss" scoped>
.one {
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: none;
        transition: all 1s;
        &:hover {
            transform: scale(1.2);
        }
    }
}
.two {
    overflow: hidden;
    img {
        width: 100%;
        border: none;
        height: 100%;
        object-fit: cover;
    }
}
.thr {
    img {
        width: 100%;
        border: none;
        height: 100%;
        object-fit: cover;
    }
}
</style>
