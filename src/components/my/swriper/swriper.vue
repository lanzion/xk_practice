<template>
  <!-- <el-carousel :interval="5000" arrow="always" class="testshow" id="el-carousel">
    <el-carousel-item v-for="(item,index) in imgUrl" :key="index" class="testshow">
  <h3>-->
  <!-- <img class="swripershow" :src="getFileUrl(item.imageUrl)" alt /> -->
  <!-- <el-image :src="getFileUrl(item.imageUrl)" :fit="scale-down"></el-image>
      </h3>
    </el-carousel-item>
  </el-carousel>-->
  <div>
    <div class="xk_swriper" v-if="imgUrl.length>1">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in imgUrl" :key="index" class="testshow">
          <!-- <img :src="getFileUrl(item.imageUrl)" /> -->
          <ov-image :type = 2 :src-data="getFileUrl(item.imageUrl)"></ov-image>
        </swiper-slide>
      </swiper>
      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="xk_swriper" v-if="imgUrl.length==1">
      <!-- <img :src="getFileUrl(imgUrl[0].imageUrl)" alt /> -->
      <ov-image :type = 2 :src-data="getFileUrl(imgUrl[0].imageUrl)"></ov-image>
    </div>
  </div>
</template>
<script>
import { requestBannerList } from '@/api/common'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components: {
        swiper,
        swiperSlide
    },
    props: {
        type: {
            type: String,
            default() {
                return ''
            }
        }
    },
    data() {
        return {
            imgUrl: [],
            bannerHeight: 400,
            // screenWidth: 1920,
            swiperOption: {
                observer: true, // 修改swiper自己或子元素时，自动初始化swiper
                observeParents: true, // 修改swiper的父元素时，自动初始化swiper
                loop: true,
                loopAdditionalSlides: 1,
                autoHeight: true,
                autoplay: {
                    delay: 3000,
                    speed: 500,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        }
    },
    created() {
        this.getbanner()
    },
    mounted() {
    // this.setSize1();
        // const that = this
    // 监听浏览器窗口大小改变
    // window.addEventListener(
    //   "resize",
    //   function() {
    //     var width =
    //       window.innerWidth ||
    //       document.documentElement.clientWidth ||
    //       document.body.clientWidth;
    //     that.screenWidth = width;
    //     // that.setSize();
    //   },
    //   false
    // );
    },
    methods: {
        async getbanner() {
            let res = await requestBannerList({ bannerType: this.type })
            this.imgUrl = res.data.appendInfo.list
        },
    // setSize1: function() {
    //   var width =
    //     window.innerWidth ||
    //     document.documentElement.clientWidth ||
    //     document.body.clientWidth;
    //   this.screenWidth = width;
    //   //图片                高 / 宽  700 / 1920
    //   this.bannerHeight = (400 / 1920) * this.screenWidth - 20;
    //   if (!document.getElementById("el-carousel")) return;
    //   document.getElementById("el-carousel").style.height =
    //     this.bannerHeight + "px";
    // },

    // setSize: function() {
    //   this.bannerHeight = (400 / 1920) * this.screenWidth - 20;
    //   if (!document.getElementById("el-carousel")) return;
    //   document.getElementById("el-carousel").style.height =
    //     this.bannerHeight + "px";
    // }
    }
}
</script>
<style lang='scss' scoped>
#el-carousel {
  overflow: hidden;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
  /* height: 400px;\
}
.el-carousel__item h3 img {
  display: inline-block;
  height: auto;
  max-width: 100%;
  min-width: 1200px;
  margin: 0 auto;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.swripershow {
  /* height: 400px; */
}
.el-carousel__container {
  /* height: 400px; */
  height: 100% !important;
}
.el-carousel__arrow {
  width: 60px;
  height: 60px;
}
.el-carousel__arrow--left {
  left: 262px;
}
.el-carousel__arrow--right {
  right: 262px;
}
.el-icon-arrow-left,
.el-icon-arrow-right {
  font-size: 21px;
}
.testshow {
  /* height: 400px; */
}
.el-carousel__button {
  padding: 4px;
  width: 10px;
  border-radius: 100%;
}
.xk_swriper {
  position: relative;
  // height: 400px;
  overflow: hidden;
  img {
    width: 100%;
    min-width: 1200px;
  }
  .swiper-button-prev {
    left: 60px;
  }
  .swiper-button-next {
    right: 60px;
  }
  .swiper-pagination {
    left: 50%;
    transform: translateX(-50%);
    bottom: 30px;
    /deep/ .swiper-pagination-bullet {
      margin-right: 4px;
    }
  }
}
</style>
