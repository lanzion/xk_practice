<template>
    <div class="work">
        <xswriper :type="imgnum" />
        <div class="container">
            <div class="work_header"></div>
            <div class="aggregate_one">
                <div class="aggregate_one_header">
                    <div class="aggregate_one_t">
                        <ul class="aggregate_one_t_u">
                            <li>基地名称</li>
                            <li>访问人数</li>
                        </ul>
                    </div>
                    <div class="aggregate_one_q">
                        <ul class="aggregate_one_t_w">
                            <li
                                @click="goshowone(l.id)"
                                v-for="(l,index) in goodsover"
                                :key="index"
                            >
                                <span>{{l.name}}</span>
                                <span>{{l.browseNum}}</span>
                            </li>
                        </ul>
                        <!-- <div
              v-if="nomorethr"
              :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
            >
              <img src="~@assets/image/nothingData.svg" alt />
              <div :style="{'lineHeight':'0'}">
                <i :style="{'fontSize':'18px'}">暂无数据...</i>
              </div>
                        </div>-->
                        <no-data v-if="nomorethr"></no-data>
                    </div>
                </div>
                <div class="aggregate_one_header">
                    <div class="aggregate_one_t">
                        <ul class="aggregate_one_t_u">
                            <li>基地评价</li>
                            <li>星级评价</li>
                        </ul>
                    </div>
                    <div class="aggregate_one_q">
                        <ul class="aggregate_one_t_w">
                            <li
                                @click="goshowone(l.id)"
                                v-for="(l,index) in goodsover"
                                :key="index"
                            >
                                <span>{{l.name}}</span>
                                <span>{{l.browseNum}}</span>
                            </li>
                        </ul>
                        <!-- <div
              v-if="nomorethr"
              :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
            >
              <img src="~@assets/image/nothingData.svg" alt />
              <div :style="{'lineHeight':'0'}">
                <i :style="{'fontSize':'18px'}">暂无数据...</i>
              </div>
                        </div>-->
                        <no-data v-if="nomorethr"></no-data>
                    </div>
                </div>
                <!-- <div :style="{'width':'100%','height':'317px','cursor': 'pointer'}" @click="changes()">
          <img :src="imgurl" alt />
                </div>-->
            </div>
            <div class="aggregate_two">
                <!-- 1 -->
                <div class="aggregate_two_q">
                    <!-- <div class="aggregate_two_q_l">
            <span>地区:</span>
            <span>
              <el-select v-model="value08" placeholder="请选择">
                <el-option
                  v-for="item in addres"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </span>
                    </div>-->
                    <div class="aggregate_two_q_l">
                        <span>地区:</span>
                        <span>
                            <!-- <el-select v-model="value" @change="getaddres" placeholder="请选择地区">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
                            </el-select>-->
                            <region type="object" @change="getaddres" class="regions"></region>
                        </span>
                    </div>
                    <div class="aggregate_two_q_r">
                        <el-input
                            placeholder="请输入基地名称"
                            @keyup.native.enter="resetPage"
                            v-model="input3"
                            class="input-with-select"
                        >
                            <el-button slot="append" icon="el-icon-search" @click="resetPage"></el-button>
                        </el-input>
                    </div>
                </div>

                <!-- 2 -->
                <div class="aggregate_two_z">
                    <div class="aggregate_two_z_l">
                        <span @click="changeone()">基地指南</span>
                    </div>
                    <div class="aggregate_two_z_r">
                        <span
                            v-for="(t,index) in addlists"
                            :key="index"
                            @click="changeisok(index,t.code)"
                            :class="num === index ? 'active' : ''"
                        >{{t.name}}</span>
                        <!-- <swiper class="Hcontainer" :options="HeaderSwiperOption" ref="mySwiper">
              <swiper-slide
                :class="num === index ? 'active' : ''"
                @click.native="changeisok(index,item.code)"
                v-for="(item,index) in datas"
                :key="index"
              >
                <span>{{item.name}}</span>
              </swiper-slide>
                        </swiper>-->
                    </div>
                </div>

                <!-- 3 -->

                <div class="aggregate_two_s" v-if="isok">
                    <ul class="aggregate_two_s_u">
                        <li
                            class="aggregate_two_s_l"
                            v-for="(g,index) in goods"
                            :key="index"
                            @click="goshow(g.id)"
                        >
                            <div class="aggregate_two_s_l_top">
                                <!-- <el-image :src="g.cover" fit="cover" style="width: 188px;height:188px">
                  <div
                    slot="error"
                    class="image-slot"
                    style="font-size: 30px;line-height: 180px;text-align: center;"
                  >
                    <i class="el-icon-picture-outline"></i>
                  </div>
                                </el-image>-->
                                <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
                            </div>
                            <div class="aggregate_two_s_l_bot">
                                <span>{{g.name}}</span>
                            </div>
                        </li>
                    </ul>
                    <!-- <div
            v-if="nomore"
            :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
          >
            <img src="~@assets/image/nothingData.svg" alt />
            <div :style="{'lineHeight':'0'}">
              <i :style="{'fontSize':'18px'}">暂无数据...</i>
            </div>
                    </div>-->
                    <no-data v-if="nomore"></no-data>
                </div>

                <div class="aggregate_two_s" v-if="!isok">
                    <ul class="aggregate_two_s_u">
                        <li
                            class="aggregate_two_s_l"
                            v-for="(g,index) in lists"
                            :key="index"
                            @click="goshow(g.id)"
                        >
                            <div class="aggregate_two_s_l_top">
                                <!-- <el-image :src="g.cover" fit="cover" style="width: 188px;height:188px">
                  <div
                    slot="error"
                    class="image-slot"
                    style="font-size: 30px;line-height: 180px;text-align: center;"
                  >
                    <i class="el-icon-picture-outline"></i>
                  </div>
                                </el-image>-->
                                <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
                            </div>
                            <div class="aggregate_two_s_l_bot">
                                <span>{{g.name}}</span>
                            </div>
                        </li>
                    </ul>
                    <!-- <div
            v-if="nomoretwo"
            :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
          >
            <img src="~@assets/image/nothingData.svg" alt />
            <div :style="{'lineHeight':'0'}">
              <i :style="{'fontSize':'18px'}">暂无数据...</i>
            </div>
                    </div>-->
                    <no-data v-if="nomoretwo"></no-data>
                </div>

                <div class="aggregate_two_h" v-if="!nomoretwo">
                    <div class="block" :style="{'float':'right'}">
                        <pagination
                            :param="pages"
                            :page-sizes="[16, 24, 32]"
                            :total="totalNum"
                            @change="xuanzechange"
                        ></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    gettingnavigation,
    gettingbase,
    getjidi,
    gettingareainterface
} from '@/api/frontstage'
// import "swiper/dist/css/swiper.css";
// import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
    name: 'work',
    components: {
        // swiper,
        // swiperSlide,
        xswriper: resolve =>
            require(['@/components/my/swriper/swriper'], resolve)
    },
    data() {
        return {
            imgnum: '3',
            code: '',
            pages: {
                pageNum: 1,
                pageSize: 16
            },
            addlists: [
                {
                    name: '革命军事类',
                    code: ''
                },
                {
                    name: '博物馆类',
                    code: ''
                },
                {
                    name: '文史艺术类',
                    code: ''
                },
                {
                    name: '科普环保农业类',
                    code: ''
                },
                {
                    name: '城市工业质量类',
                    code: ''
                },
                {
                    name: '城市工业质量类',
                    code: ''
                }
            ],
            addres: [
                {
                    value: '选项1',
                    label: '全部'
                },
                {
                    value: '选项2',
                    label: '省级'
                },
                {
                    value: '选项3',
                    label: '市级'
                },
                {
                    value: '选项4',
                    label: '区级'
                }
            ],
            value08: '',

            options: [],
            value: '',
            value1: '',
            value2: '',
            input3: '',
            datas: [],
            lists: [],
            goods: [],
            num: -1,
            isok: true,
            nomore: false,
            nomoretwo: false,
            goodsover: [],
            nomorethr: false
            // HeaderSwiperOption: {
            //   freeMode: true,
            //   slidesPerView: "auto",
            //   observer: true,
            //   observeParents: true,
            //   on: {
            //     init() {},
            //     click(e) {
            //       var navWidth = 0;
            //       for (var i = 0; i < this.slides.length; i++) {
            //         navWidth += parseInt(this.slides.eq(i).outerWidth(true));
            //       }
            //       var clientWidth = parseInt(this.$wrapperEl.outerWidth(true));
            //       var clickIndex = this.clickedIndex;
            //       var activeSlidePosition = this.slides[clickIndex].offsetLeft;
            //       var tSpeed = 300;
            //       var navSlideWidth = this.slides.eq(clickIndex).outerWidth(true);
            //       this.slides
            //         .eq(clickIndex)
            //         .find("span")
            //         .transition(tSpeed);
            //       if (clickIndex > 0) {
            //         this.slides.eq(clickIndex - 1).transition(tSpeed);
            //       }
            //       if (clickIndex < this.slides.length) {
            //         this.slides.eq(clickIndex + 1).transition(tSpeed);
            //       }
            //       var navActiveSlideLeft = this.slides[clickIndex].offsetLeft;
            //       this.setTransition(tSpeed);
            //       if (
            //         navActiveSlideLeft <
            //         (clientWidth - parseInt(navSlideWidth)) / 2
            //       ) {
            //         this.setTranslate(0);
            //       } else if (
            //         navActiveSlideLeft >
            //         navWidth - (parseInt(navSlideWidth) + clientWidth) / 2
            //       ) {
            //         this.setTranslate(clientWidth - navWidth);
            //       } else {
            //         this.setTranslate(
            //           (clientWidth - parseInt(navSlideWidth)) / 2 - navActiveSlideLeft
            //         );
            //       }
            //     }
            //   }
            // }
        }
    },
    created() {
        this.getnav()
        this.getconent()
        this.getadders()
        this.getconents()
    },
    watch: {
        'goods.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomore = true
                } else {
                    this.nomore = false
                }
            },
            deep: true
        },
        'goodsover.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomorethr = true
                } else {
                    this.nomorethr = false
                }
            },
            deep: true
        },
        'lists.length': {
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
        getaddres(value) {
            this.value = value[0].code
            this.value1 = value[1].code
            this.value2 = value[2].code
            if (this.isok) {
                this.getconent()
            } else {
                this.getlist()
            }
        },
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            if (this.isok) {
                this.getconent()
            } else {
                this.getlist()
            }
        },
        async getadders() {
            let res = await gettingareainterface()
            let qts = {
                label: '全部',
                value: '-1'
            }
            this.options = res.data.appendInfo.list.map(v => {
                return {
                    value: v.code,
                    label: v.name
                }
            })
            this.options.unshift(qts)
        },
        xuanzechange() {
            if (this.isok) {
                this.getconent()
            } else {
                this.getlist()
            }
        },
        goshowone(id) {
            localStorage.setItem('nid', id)
            this.$router.push({ path: '/work/basedetails', query: { id: id } })
        },
        changes() {
            this.$router.push({ path: '/registrationinformation' })
        },
        goshow(id) {
            localStorage.setItem('nid', id)
            this.$router.push({ path: '/work/basedetails', query: { id: id } })
        },
        changeone() {
            this.isok = true
            this.input3 = ''
            this.num = -1
            this.getconent()
        },
        async getnav() {
            const res = await gettingnavigation()
            const data = res.data.list
            this.datas = data
        },
        changeisok(index, code) {
            this.isok = false
            this.input3 = ''
            this.num = index
            this.code = code
            this.pages.pageNum = 1
            this.getlist()
        },
        async getlist() {
            this.isLoading = true
            const list = await getjidi(
                {
                    specialTypeId: this.code,
                    name: this.input3,
                    provinceId: this.value,
                    cityId: this.value1,
                    areaId: this.value2
                },
                this.pages
            )
            this.lists = list.data.entity.resultData
            this.totalNum = list.data.entity.totalNum
        },
        async getconents() {
            const good = await gettingbase({}, this.pages)
            let goods = good.data.entity.resultData
            this.goodsover = goods
        },
        async getconent() {
            const good = await gettingbase(
                {
                    name: this.input3,
                    provinceId: this.value,
                    cityId: this.value1,
                    areaId: this.value2
                },
                this.pages
            )
            let goods = good.data.entity.resultData
            this.goods = goods
            this.totalNum = good.data.entity.totalNum
        }
    }
}
</script>
<style lang="scss" scoped>
.el-select .el-input {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
.work {
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
    .work_header {
        width: 100%;
        height: 40px;
        line-height: 40px;
    }
}
.container {
    height: 100%;
    overflow: hidden;
    margin-bottom: 150px;
    .aggregate_one {
        float: left;
        width: 240px;
        .aggregate_one_header {
            margin-bottom: 30px;
            background: #fff;
            .aggregate_one_t {
                width: 100%;
                height: 40px;
                background-color: #fc8230;
                .aggregate_one_t_u {
                    width: 100%;
                    li {
                        width: 50%;
                        float: left;
                        text-align: center;
                        line-height: 40px;
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
        // background: #fff;
    }
    .aggregate_two {
        float: right;
        width: 930px;
        min-height: 800px;
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
            width: 100%;
            height: 40px;
            background: #fff;
            overflow: hidden;
            border-bottom: 4px solid #fc8230;
            .aggregate_two_z_l {
                height: 100%;
                width: 110px;
                height: 34px;
                margin-top: 8px;
                margin-left: 25px;
                float: left;
                span {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    background: #fc8230;
                    border-radius: 4px 4px 0px 0px;
                    color: #fff;
                    font-size: 18px;
                    text-align: center;
                    line-height: 34px;
                    cursor: pointer;
                }
            }
            .aggregate_two_z_r {
                float: right;
                margin-right: 18px;
                text-align: right;
                height: 34px;
                margin-top: 8px;
                width: 720px;
                span {
                    // width: 100px;
                    // text-align: right;
                    // line-height: 34px;
                    padding: 10px;
                    display: inline-block;
                    // float: right;
                    font-size: 14px;
                    cursor: pointer;
                }
            }
        }
        .aggregate_two_s {
            box-sizing: border-box;
            padding: 24px 24px 24px 24px;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: #fff;
            .aggregate_two_s_u {
                width: 100%;
                height: 100%;
                font-size: 0;
                .aggregate_two_s_l {
                    width: 204px;
                    height: 228px;
                    border: 1px solid #ccc;
                    box-sizing: border-box;
                    float: left;
                    margin-right: 22px;
                    margin-bottom: 22px;
                    &:nth-child(4n) {
                        margin-right: 0;
                    }
                    .aggregate_two_s_l_top {
                        padding: 7px;
                        width: 100%;
                        height: 188px;
                        box-sizing: border-box;
                        overflow: hidden;
                        img {
                            width: 186px;
                            height: 175px;
                        }
                    }
                    .aggregate_two_s_l_bot {
                        width: 100%;
                        height: 38px;
                        box-sizing: border-box;
                        span {
                            display: inline-block;
                            width: 100%;
                            height: 100%;
                            line-height: 38px;
                            text-align: left;
                            padding: 0 10px;
                            padding-right: 10px;
                            color: #333333;
                            font-size: 16px;
                            box-sizing: border-box;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
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
// .Hcontainer {
//   color: #666;
//   height: 36px;
//   line-height: 36px;
//   width: auto;
//   .swiper-slide {
//     width: auto;
//     font-size: 18px;
//     padding-left: 12px;
//     text-align: center;
//     span {
//       display: inline-block;
//       height: 70%;
//       line-height: 14px;
//       overflow: hidden;
//       margin-top: 10px;
//       padding-bottom: 5px;
//       padding-left: 5px;
//       padding: 5px;
//       img {
//         width: 100%;
//       }
//     }
//   }
//   .recom {
//     width: 80px;
//   }
//   .router-link-active {
//     border-bottom: 2px solid #b4282d;
//     // border-bottom: 2px solid #fff;
//     color: #b4282d;
//     font-weight: 580;
//   }
// }
</style>
