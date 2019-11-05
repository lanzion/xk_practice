<template>
    <!-- <div class="map">
    <div id="map-core"></div>
    <div class="search">
      <div id="r-result">
        <p>搜索定位:</p>
        <input type="text" id="suggestId" value="百度"/>
      </div>
      <div class="lng-lat">
        <div class="item">
          <p>当前经度:</p>
          <input type="text" v-model="location.lng"/>
        </div>
        <div class="item">
          <p>当前纬度:</p>
          <input type="text" v-model="location.lat"/>
        </div>
        <div class="item btn"><button @click="selectLocation">确定</button></div>
      </div>
    </div>
    </div>-->
    <div id="allmap" class="Map"></div>
</template>

<script>
import BMap from 'BMap'
export default {
    data() {
        return {
            // location: {
            //     lng: '',
            //     lat: ''
            // },
            // map: {},
            // ac: {}
        }
    },
    mounted() {
        // this.setMap()
        // this.setSearch()
        this.$nextTick(() => {
            var map = new BMap.Map('allmap') // 初始化map, 绑定id=allmap
            var point = new BMap.Point(113.23, 23.16) // 初始化point, 给定一个默认x,y值
            map.centerAndZoom(point, 10) // 将point点放入map中，展示在页面中心展示，10=缩放程度
            map.enableScrollWheelZoom() // 开启滚动鼠标滑轮
 
            // 如有多个point去展示，可根据后端接口传入为主
            let data = [
                { x: 113.297047, y: 23.16, name: '张三' },
                { x: 113.321768, y: 23.17, name: '李四' },
                { x: 113.494243, y: 23.18, name: '王五' }
            ]
 
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
                    map.openInfoWindow(infoWindows, points)// 参数：窗口、点  根据点击的点出现对应的窗口
                })
            }
 
            // 获取当前地理位置
            var geolocation = new BMap.Geolocation()
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var mk = new BMap.Marker(r.point)
                    map.addOverlay(mk)
                    map.panTo(r.point)
                    // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
                } else {
                    // alert('failed' + this.getStatus());
                }
            })
        })
    },
    methods: {
        // ready: function () {
        //     var map = new BMap.Map('allmap')
        //     var point = new BMap.Point(this.longitude, this.latitude)
        //     var marker = new BMap.Marker(point)
        //     map.addOverlay(marker)
        //     map.centerAndZoom(point, 15)
        //     map.enableScrollWheelZoom(true)

        //     var content =
        //         '<div style="margin:0;line-height:16px;padding:2px;font-size:12px;">' +
        //         /* '<img :src="s1.jpg" style="float:right;zoom:1;overflow:hidden;width:100px;height:66px;margin-left:3px;"/>'+ */
        //         '地址：北京市丰台区丰台科技园汉威国际广场3区5号楼2M<br/>电话：022-3344563' +
        //         '</div>'
        //     // 信息窗的配置信息
        //     /* var opts ={
        //       width :200,
        //       height:50,
        //       title :"地址：",
        //     } */
        //     /* var infoWindow =new BMap.InfoWindow(this.description, opts);// 创建信息窗口对象
        //     marker.addEventListener("click",function(){
        //       map.openInfoWindow(infoWindow,point);
        //     });
        //     map.enableScrollWheelZoom(true);
        //     map.openInfoWindow(infoWindow,point);//开启信息窗口 */
        //     var searchInfoWindow = null
        //     searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
        //         title: '北京中厚明德', // 标题
        //         width: 200, // 宽度
        //         height: 70, // 高度
        //         panel: 'panel', // 检索结果面板
        //         enableAutoPan: true, // 自动平移
        //         searchTypes: [
        //             BMAPLIB_TAB_SEARCH, // 周边检索
        //             BMAPLIB_TAB_TO_HERE, // 到这里去
        //             BMAPLIB_TAB_FROM_HERE // 从这里出发
        //         ]
        //     })
        //     var marker = new BMap.Marker(point) // 创建标注
        //     marker.addEventListener('click', function (e) {
        //         searchInfoWindow.open(marker)
        //     })
        //     map.addOverlay(marker) // 将标注添加到地图中
        // }

        // 初始化地图
        // setMap() {
        //     this.map = new BMap.Map('map-core')
        //     this.map.centerAndZoom(new BMap.Point(113.275, 23.117), 10)
        //     // 地图缩放控件
        //     const topLeftControl = new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT})
        //     // 城市选择控件
        //     const cityListControl = new BMap.CityListControl({anchor: BMAP_ANCHOR_TOP_RIGHT})
        //     // 比例尺控件
        //     const topLeftNavigation = new BMap.NavigationControl()
        //     this.map.addControl(topLeftControl)
        //     this.map.addControl(topLeftNavigation)
        //     this.map.addControl(cityListControl)
        //     const _this = this
        //     // 鼠标缩放
        //     setTimeout(function () {
        //         _this.map.setZoom(11)
        //     }, 2000) // 2秒后放大到11级
        //     this.map.enableScrollWheelZoom(true)
        //     // 点击获取经纬度
        //     this.map.addEventListener('click', function (e) {
        //         _this.location.lng = parseFloat(e.point.lng).toFixed(3)
        //         _this.location.lat = parseFloat(e.point.lat).toFixed(3)
        //     })
        // },
        // // 根据经纬度绘制地图中的坐标点
        // drawLocation() {
        //     if (this.location.lng !== '' && this.location.lat !== '') {
        //         this.map.clearOverlays()
        //         const new_point = new BMap.Point(this.location.lng, this.location.lat)
        //         const marker = new BMap.Marker(new_point)
        //         this.map.addOverlay(marker)
        //         this.map.panTo(new_point)
        //     }
        // },
        // // 搜索位置功能实现
        // setSearch() {
        //     const _this = this
        //     // 建立一个自动完成的对象
        //     this.ac = new BMap.Autocomplete({'input': 'suggestId', 'location': _this.map})
        //     // 鼠标放在下拉列表上的事件
        //     this.ac.addEventListener('onhighlight', function (e) {
        //         let str = ''
        //         let _value = e.fromitem.value
        //         let value = ''
        //         if (e.fromitem.index > -1) {
        //             value = _value.province + _value.city + _value.district + _value.street + _value.business
        //         }
        //         value = ''
        //         if (e.toitem.index > -1) {
        //             _value = e.toitem.value
        //             value = _value.province + _value.city + _value.district + _value.street + _value.business
        //         }
        //     })
        //     let myValue
        //     // 鼠标点击下拉列表后的事件
        //     this.ac.addEventListener('onconfirm', function (e) {
        //         let _value = e.item.value
        //         myValue = _value.province + _value.city + _value.district + _value.street + _value.business
        //         _this.setPlace(myValue)
        //     })
        // },
        // setPlace(myValue) {
        //     const _this = this
        //     // 清除地图上所有覆盖物
        //     this.map.clearOverlays()
        //     // 智能搜索
        //     this.local = new BMap.LocalSearch(_this.map, {
        //         onSearchComplete: _this.onSearchComplete
        //     })
        //     this.local.search(myValue)
        // },
        // onSearchComplete() {
        //     // 获取第一个智能搜索的结果
        //     let pp = this.local.getResults().getPoi(0).point
        //     this.location.lng = parseFloat(pp.lng).toFixed(3)
        //     this.location.lat = parseFloat(pp.lat).toFixed(3)
        //     this.map.centerAndZoom(pp, 18)
        //     // 添加标注
        //     this.map.addOverlay(new BMap.Marker(pp))
        // },
        // // 向父组件传递经纬度
        // selectLocation() {
        //     this.$emit('selectLocation', this.location)
        // }
    },
    watch: {
        // 'location': {
        //     handler() {
        //         this.drawLocation()
        //     },
        //     deep: true
        // },
    }
}
</script>

<style lang="scss" scoped>
.Map {
  height:600px;
  width: 100%;
}
//   .map {
//     width: 1200px;
//     height: 600px;
//     font-size: 14px;
//     #map-core {
//       width: 100%;
//       height: 90%;
//     }
//     .search {
//       display: flex;
//       margin-top: 10px;
//       height: 40px;
//       #r-result {
//         display: flex;
//         height: 20px;
//         line-height: 20px;
//         p {
//           height: 20px;
//           padding-right: 10px;
//         }
//         input {
//           width: 180px;
//           height: 20px;
//         }
//       }
//       .lng-lat {
//         display: flex;
//         .item {
//           display: flex;
//           padding-left: 10px;
//           height: 20px;
//           line-height: 20px;
//           p {
//             height: 20px;
//             padding-right: 10px;
//           }
//           input {
//             width: 100px;
//             height: 20px;
//           }
//           button {
//             color: #fff;
//             height: 28px;
//             width: 60px;
//             background: #40B0FF;
//             border: 1px solid #40B0FF;
//             border-radius: 2px;
//             &:hover {
//               background: #10B0FF;
//               border: 1px solid #10B0FF;
//               cursor: pointer;
//             }
//           }
//         }
//       }
//     }
//   }
</style>
