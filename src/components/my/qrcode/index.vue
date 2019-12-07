<template>
    <div class="qrcode">
        <div class="qrcode-img" @mouseenter="useqrcode()" @mouseleave="outqrcode()">
            <img :src="weixin" alt />
            <div class="qrcode-center" v-show="num === true">
                <h3>扫描二维码分享</h3>
                <canvas id="canvas"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
    name: 'qrcode',
    data() {
        return {
            QueryDetail: '',
            num: false,
            weixin: require('../../../../static/img/weixin.png'),
        }
    },
    methods: {
        useqrcode() {
            this.num = true
            let myUrl = window.location.href
            // 生成的二维码内容，可以添加变量
            this.QueryDetail = myUrl
            let canvas = document.getElementById('canvas')
            QRCode.toCanvas(canvas, this.QueryDetail, function (error) {
                if (error) console.error(error)
                console.log('success!')
            })
        },
        outqrcode() {
            this.num = false
        }
    }
}
</script>
<style lang='scss' scoped>
.qrcode {
    width: 100%;
    height: auto;
     z-index: 100000;
    .qrcode-img {
        width: 16px;
        height: 16px;
        position: relative;
        img {
            width: 100%;
            height: 100%;
        }
        .qrcode-center {
            background: #fff;
            width: 200px;
            height: 200px;
            margin: 20px auto;
            border: 1px solid #ccc;
            position: absolute;
            top: 100%;
            left: -100px;
            padding:20px 0;
            h3 {
                font-size: 14px;
                text-align: center;
            }
            #canvas {
                width: 100% !important;
                height: auto !important;
                z-index: 100000;
            }
        }
    }
}
</style>
