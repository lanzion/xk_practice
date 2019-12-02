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
    </div>
</template>
 
<script>
const defaultImage2 = '../../../../static/img/info2.jpg'
const defaultImage = '../../../../static/img/info.jpg'
export default {
    name: 'ov-image',
    data() {
        return {
            imageSrc: this.srcData
        }
    },
    watch: {
        srcData(newVal) {
            this.imageSrc = newVal
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
            } else {
                this.srcData && (this.imageSrc = defaultImage)
            }
            this.$forceUpdate()
        },
        imageLoad(e) {
            // console.log('加载完成---', e)
        }
    }
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
