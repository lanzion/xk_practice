<template>
    <img @load="imageLoad" @error="imageErr" :src="imageSrc" />
</template>
 
<script>
const defaultImage2 = '../../../static/img/info2.jpg'
const defaultImage = '../../../static/img/info.jpg'
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
        }
    },
    methods: {
        imageErr(e) {
            if (this.type == 2) {
                this.srcData && (this.imageSrc = defaultImage2)
            } else {
                this.srcData && (this.imageSrc = defaultImage)
            }
            // this.$forceUpdate()
        },
        imageLoad(e) {
            // console.log('加载完成---', e)
        }
    }
}
</script>
<style lang="scss" scoped>
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
