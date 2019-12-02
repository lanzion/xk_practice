<template>
    <div id="allmap" class="Map"></div>
</template>

<script>
import BMap from 'BMap'
export default {
    data() {
        return {}
    },
    props: {
        x: {
            default: 113.262337,
            type: Number
        },
        y: {
            default: 23.16,
            type: Number
        },
        name: {
            default: '黄埔军校',
            type: String
        }
    },
    mounted() {
        this.$nextTick(() => {
            var map = new BMap.Map('allmap') // 初始化map, 绑定id=allmap
            var point = new BMap.Point(this.x, this.y) // 初始化point, 给定一个默认x,y值
            map.centerAndZoom(point, 25) // 将point点放入map中，展示在页面中心展示，10=缩放程度
            map.enableScrollWheelZoom() // 开启滚动鼠标滑轮

            // 如有多个point去展示，可根据后端接口传入为主
            let data = [{ x: this.x, y: this.y, name: this.name }]

            data.forEach((e, i) => {
                // 创建point, 将x,y值传入
                let pointNumber = new BMap.Point(e.x, e.y)

                // 创建信息窗口对象
                let infoWindow = new BMap.InfoWindow('World', {
                    width: 150, // 信息窗口宽度
                    height: 100, // 信息窗口高度
                    title: 'Hello' + i // 信息窗口标题
                })
                // 将data中的name加入地图中
                var label = new BMap.Label(e.name, {
                    offset: new BMap.Size(25, 5)
                })
                markerFun(pointNumber, infoWindow, label)
            })

            function markerFun(points, infoWindows, label) {
                let markers = new BMap.Marker(points)
                map.addOverlay(markers) // 将标注添加到地图中
                markers.setLabel(label) // 将data中的name添加到地图中
                // 标注的点击事件
                markers.addEventListener('click', function (event) {
                    map.openInfoWindow(infoWindows, points) // 参数：窗口、点  根据点击的点出现对应的窗口
                })
            }

            // 获取当前地理位置
            // var geolocation = new BMap.Geolocation()
            // geolocation.getCurrentPosition(function (r) {
            //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            //         var mk = new BMap.Marker(r.point)
            //         map.addOverlay(mk)
            //         map.panTo(r.point)
            //         // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
            //     } else {
            //         // alert('failed' + this.getStatus());
            //     }
            // })
        })
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
.Map {
    height: 600px;
    width: 100%;
}
</style>
