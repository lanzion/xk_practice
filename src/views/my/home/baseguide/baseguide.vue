<template>
  <div class="conenttwo">
    <div class="container">
      <div class="aggregate_one">
        <div class="aggregate_one_t">
          <ul class="aggregate_one_t_u">
            <li>基地名称</li>
            <li>访问人数</li>
          </ul>
        </div>
        <div class="aggregate_one_q">
          <ul class="aggregate_one_t_w">
            <li v-for="(a,index) in goodeover" :key="index" @click="goto(a.id)">
              <span>{{a.name}}</span>
              <span>{{a.browseNum}}</span>
            </li>
          </ul>
          <no-data v-if="nomoretwo"></no-data>
        </div>
        <!-- <div :style="{'width':'100%','height':'317px','cursor': 'pointer'}" @click="changes()">
          <img :src="imgurl" alt />
        </div> -->
      </div>
      <div class="aggregate_two">
        <!-- 1 -->

        <!-- 2 -->
        <div class="aggregate_two_z">
          <div class="aggregate_two_z_l">
            <span @click="changeone()">基地指南</span>
          </div>
          <div class="aggregate_two_z_r">
            <!-- <span
              v-for="(t,index) in datas"
              :key="index"
              @click="getlist(index,t.code)"
              :class="num === index ? 'active' : ''"
            >{{t.name}}</span> -->
            <ul>
              <li
                v-for="(t,index) in datas"
                :key="index"
                @click="getlist(index,t.code)"
                :class="num === index ? 'active' : ''"
              >{{t.name}}</li>
            </ul>
            <!-- <swiper class="Hcontainer" :options="HeaderSwiperOption" ref="mySwiper">
              <swiper-slide :class="num === index ? 'active' : ''" @click.native="getlist(index,item.code)"  v-for="(item,index) in datas" :key="index">
                <span>{{item.name}}</span>
              </swiper-slide>
            </swiper>-->
          </div>
        </div>

        <!-- 3 -->

        <div class="aggregate_two_s" v-show="isok">
          <ul class="aggregate_two_s_u">
            <li
              class="aggregate_two_s_l"
              v-for="(g,index) in goods"
              :key="index"
              @click="goto(g.id)"
            >
              <div class="aggregate_two_s_l_top">
                <!-- <el-image :src="getFileUrl(g.cover)" fit="cover" style="width: 204px;height:278px">
                  <div
                    slot="error"
                    class="image-slot"
                    style="font-size: 30px;line-height: 278px;text-align: center;"
                  >
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image> -->
                 <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
              </div>
              <div class="aggregate_two_s_l_box"></div>
              <div class="aggregate_two_s_l_bot">
                <i>>></i>
                <span>{{g.name}}</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="aggregate_two_s" v-show="!isok">
          <ul class="aggregate_two_s_u">
            <li
              class="aggregate_two_s_l"
              v-for="(g,index) in lists"
              :key="index"
              @click="goto(g.id)"
            >
              <div class="aggregate_two_s_l_top">
                <!-- <el-image :src="getFileUrl(g.cover)" fit="cover" style="width: 202px;height:278px">
                  <div
                    slot="error"
                    class="image-slot"
                    style="font-size: 30px;line-height: 278px;text-align: center;"
                  >
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image> -->
                 <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
              </div>
              <div class="aggregate_two_s_l_box"></div>
              <div class="aggregate_two_s_l_bot">
                <i>>></i>
                <span>{{g.name}}</span>
              </div>
            </li>
          </ul>
        </div>
        <!-- <div
          v-if="nomore"
          :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
        >
          <img src="~@assets/image/nothingData.svg" alt />
          <div :style="{'lineHeight':'0'}">
            <i :style="{'fontSize':'18px'}">暂无数据...</i>
          </div>
        </div> -->
        <no-data v-if="nomore"></no-data>
      </div>
    </div>
  </div>
</template>
<script>
import {
    gettingnavigation,
    gettingbase,
    getjidi
} from '@/api/frontstage'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            datas: [],
            imgurl: require('../../../../../static/img/jidiruzhu.png'),
            lists: [],
            goods: [],
            goodeover: [],
            num: -1,
            isok: true,
            nomore: false,
            nomoretwo: false,
            pages: {
                pageNum: 1,
                pageSize: 19
            },
            HeaderSwiperOption: {
                freeMode: true,
                slidesPerView: 'auto',
                observer: true,
                observeParents: true,
                on: {
                    init() {},
                    click(e) {
                        var navWidth = 0
                        for (var i = 0; i < this.slides.length; i++) {
                            navWidth += parseInt(this.slides.eq(i).outerWidth(true))
                        }
                        var clientWidth = parseInt(this.$wrapperEl.outerWidth(true))
                        var clickIndex = this.clickedIndex
                        var activeSlidePosition = this.slides[clickIndex].offsetLeft
                        var tSpeed = 300
                        var navSlideWidth = this.slides.eq(clickIndex).outerWidth(true)
                        this.slides
                            .eq(clickIndex)
                            .find('span')
                            .transition(tSpeed)
                        if (clickIndex > 0) {
                            this.slides.eq(clickIndex - 1).transition(tSpeed)
                        }
                        if (clickIndex < this.slides.length) {
                            this.slides.eq(clickIndex + 1).transition(tSpeed)
                        }
                        var navActiveSlideLeft = this.slides[clickIndex].offsetLeft
                        this.setTransition(tSpeed)
                        if (
                            navActiveSlideLeft <
              (clientWidth - parseInt(navSlideWidth)) / 2
                        ) {
                            this.setTranslate(0)
                        } else if (
                            navActiveSlideLeft >
              navWidth - (parseInt(navSlideWidth) + clientWidth) / 2
                        ) {
                            this.setTranslate(clientWidth - navWidth)
                        } else {
                            this.setTranslate(
                                (clientWidth - parseInt(navSlideWidth)) / 2 - navActiveSlideLeft
                            )
                        }
                    }
                }
            }
        }
    },
    created() {
        this.getnav()
        this.getconent()
    },
    watch: {
        'lists.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomore = true
                } else {
                    this.nomore = false
                }
            },
            deep: true
        },
        'goods.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomoretwo = true
                } else {
                    this.nomoretwo = false
                }
            },
            deep: true
        }
    },
    methods: {
        changes() {
            this.$router.push({ path: '/registrationinformation' })
        },
        changeone() {
            this.isok = true
            if (this.goods.length) this.nomore = false
            this.num = -1
        },
        async getnav() {
            const res = await gettingnavigation()
            const data = res.data.list
            this.datas = data
            // console.log(data);
        },
        async getlist(index, code) {
            this.isok = false
            this.num = index
            const list = await getjidi({ specialTypeId: code }, this.pages)
            this.lists = list.data.entity.resultData.splice(0, 8)
            // console.log(this.lists);
        },
        async getconent() {
            const good = await gettingbase({}, this.pages)
            let goods = good.data.entity.resultData
            this.goodeover = JSON.parse(JSON.stringify(goods))
            this.goods = goods.splice(0, 8)
        },
        goto(id) {
            localStorage.setItem('nid', id)
            this.$router.push({ path: '/work/basedetails/relatedcourses', query: { id: id } })
        }
    }
}
</script>
<style lang="scss" scoped>
.conenttwo {
  margin-top: 30px;
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .diyt {
    min-height: 500px;
    .banner {
      width: 100%;
      height: 400px;
      img {
        font-size: 0;
        border: none;
        height: 400px;
      }
    }
  }
  .container {
    height: 100%;
    overflow: hidden;
    .aggregate_one {
      float: right;
      width: 240px;
      background: #fff;
      min-height: 360px;
      .aggregate_one_t {
        width: 100%;
        height: 44px;
        background-color: #fc8230;
        .aggregate_one_t_u {
          width: 100%;
          overflow: hidden;
          li {
            width: 50%;
            float: left;
            text-align: center;
            line-height: 44px;
            color: #ffffff;
            font-size: 16px;
          }
        }
      }
      .aggregate_one_q {
        width: 100%;
        .aggregate_one_t_w {
          width: 100%;
          padding: 14px 7px;
          box-sizing: border-box;
          li {
            width: 100%;
            height: 32px;
            cursor: pointer;
            &:hover {
              span {
                &:nth-child(1) {
                  color: #008aff;
                }
              }
            }
            span {
              display: block;
              float: left;
              height: 32px;
              line-height: 32px;
              font-size: 14px;
              color: #666666;
              &:nth-child(1) {
                width: 80%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                box-sizing: border-box;
                padding-right: 10px;
                &::before {
                  content: "*";
                  width: 3px;
                  height: 3px;
                  margin-right: 10px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  vertical-align: middle;
                }
              }
              &:nth-child(2) {
                width: 20%;
              }
            }
          }
        }
      }
    }
    .aggregate_two {
      float: left;
      width: 930px;
      min-height: 453px;
      background: #fff;
      .aggregate_two_q {
        width: 100%;
        height: 60px;
        margin-bottom: 18px;
        background: #fff;
        .aggregate_two_q_l {
          float: left;
          height: 60px;
          span {
            display: block;
            float: left;
            line-height: 60px;
            text-align: center;
            &:nth-child(1) {
              width: 100px;
              height: 100%;
              color: #333333;
              font-size: 16px;
              line-height: 60px;
            }
            &:nth-child(2) {
              width: 200px;
              height: 32px;
            }
          }
        }
        .aggregate_two_q_r {
          float: right;
          height: 60px;
          line-height: 60px;
          width: 230px;
          margin-right: 10px;
        }
      }
      .aggregate_two_z {
        position: relative;
        width: 100%;
        height: 40px;
        background: #fff;
        overflow: hidden;
        border-bottom: 2px solid #fc8230;
        .aggregate_two_z_l {
          height: 100%;
          width: 110px;
          height: 44px;
          margin-left: 25px;
          float: left;
          position: relative;
          span {
            position: absolute;
            top: 0;
            left: 0;
            display: inline-block;
            width: 100%;
            height: 100%;
            background: #fc8230;
            border-radius: 4px 4px 0px 0px;
            color: #fff;
            font-size: 18px;
            text-align: center;
            line-height: 44px;
            cursor: pointer;
          }
        }
        .aggregate_two_z_r {
          // position: absolute;
          // top: 0;
          // left: 200px;
          // height: 44px;
          // width: 580px;
          overflow: hidden;
          float: right;
          // overflow-x: auto;
          // overflow-y: hidden;
          // -webkit-overflow-scrolling: touch;
          // overflow: -moz-scrollbars-none;
          // overflow: -moz-scrollbars-none;
          // display: -webkit-box;
          // position: relative;
          ul {
            overflow: hidden;
            
            li {
              width: 88px;
              text-align: center;
              line-height: 44px;

              // display: inline-block;
              float: left;
              font-size: 14px;
              cursor: pointer;
            }
          }
        }
        // .aggregate_two_z_r::-webkit-scrollbar {
        //   // width: 0;
        //   // height: 0;
        //   display: none;
        // }
      }
      .aggregate_two_s {
        box-sizing: border-box;
        padding: 22px 18px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #fff;
        .aggregate_two_s_u {
          width: 100%;
          height: 100%;
          font-size: 0;
          overflow: hidden;
          .aggregate_two_s_l {
            width: 202px;
            height: 278px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            float: left;
            margin-right: 28px;
            margin-bottom: 22px;
            position: relative;
            cursor: pointer;
            &:nth-child(4n) {
              margin-right: 0;
            }
            &:hover {
              // .aggregate_two_s_l_top {
              //   -webkit-filter: blur(5px); /* Chrome, Opera */
              //   -moz-filter: blur(5px);
              //   -ms-filter: blur(5px);
              //   filter: blur(5px);
              // }
              .aggregate_two_s_l_box {
                display: block;
              }
              .aggregate_two_s_l_bot {
                display: block;
              }
            }
            .aggregate_two_s_l_top {
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              overflow: hidden;
              // &:hover {
              //   -webkit-filter: blur(5px); /* Chrome, Opera */
              //   -moz-filter: blur(5px);
              //   -ms-filter: blur(5px);
              //   filter: blur(5px);
              //   .aggregate_two_s_l_bot {
              //     display: block;
              //   }
              // }
              img {
                width: 202px;
                height: 278px;
              }
            }
            .aggregate_two_s_l_box {
              width: 100%;
              height: 100%;
              position: absolute;
              right: 0;
              bottom: 0;
              top: 0;
              left: 0;
              margin: auto;
              box-sizing: border-box;
              display: none;
              background-color: #008aff;
              opacity: 0.6;
            }
            .aggregate_two_s_l_bot {
              width: 100%;
              height: 100%;
              position: absolute;
              right: 0;
              bottom: 0;
              top: 0;
              left: 0;
              margin: auto;
              box-sizing: border-box;
              display: none;
              i {
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
                height: 30px;
                text-align: center;
                line-height: 38px;
                color: #ffffff;
                font-size: 18px;
                box-sizing: border-box;
                position: absolute;
                bottom: 40px;
              }
              span {
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 100%;
                height: 30px;
                text-align: center;
                line-height: 38px;
                color: #ffffff;
                font-size: 20px;
                font-weight: 800;
                box-sizing: border-box;
                position: absolute;
                bottom: 20px;
              }
            }
          }
        }
      }
    }
  }
  .aggregate_two_h {
    width: 100%;
    overflow: hidden;
    background: #fff;
  }
  .block {
    padding-bottom: 50px;
  }
  .active {
    color: #008aff;
  }
}
.Hcontainer {
  color: #666;
  height: 44px;
  line-height: 44px;
  width: auto;
  .swiper-slide {
    width: auto;
    font-size: 18px;
    padding-left: 12px;
    text-align: center;
    span {
      display: inline-block;
      height: 70%;
      line-height: 18px;
      overflow: hidden;
      margin-top: 10px;
      padding-bottom: 5px;
      padding-left: 5px;
      padding: 5px;
      img {
        width: 100%;
      }
    }
  }
  .recom {
    width: 80px;
  }
  .router-link-active {
    border-bottom: 2px solid #b4282d;
    // border-bottom: 2px solid #fff;
    color: #b4282d;
    font-weight: 580;
  }
}
</style>
