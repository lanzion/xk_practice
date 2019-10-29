<template>
  <div class="curriculum">
    <!-- <div class="curriculum_top">
      <label for>参与学校:</label>
      <el-select v-model="value8" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <label for>代课老师:</label>
      <el-select v-model="value9" filterable placeholder="请选择">
        <el-option
          v-for="item in optionslist"
          :key="item.id"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>-->

    <div class="hiddendover">
      <ul class="overtab">
        <li
          v-for="(item,index) in datas"
          :key="index"
          v-text="item.name"
          @click="change(index,item.code)"
          :class="isok === index ? 'active' : '' "
          :style="{'color':isok === index ? '#fff':'#000'}"
        ></li>
      </ul>
      <!-- <div class="overtab">
        <swiper class="Hcontainer" :options="HeaderSwiperOption" ref="mySwiper">
          <swiper-slide
            :class="isok === index ? 'active' : ''"
            @click.native="change(index,item.code)"
            v-for="(item,index) in datas"
            :key="index"
          >
            <span>{{item.name}}</span>
          </swiper-slide>
        </swiper>
      </div>-->

      <div class="curriculum_top_r">
        <el-input
          placeholder="请输入课程名称"
          v-model="value10"
          @keyup.native.enter="resetPage"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="resetPage"></el-button>
        </el-input>
      </div>
    </div>
    <div class="titleshow">
      <ul>
        <li
          v-for="(item,index) in arr"
          :key="index"
          :class="isactive === index ? 'addclass' : '' "
          @mouseenter="moveover(index)"
          @mouseleave="moveout(index)"
          @click="letsgo(item.id)"
        >
          <div>
            <!-- <el-image :src="item.cover" fit="cover" style="width: 280px;height:190px">
              <div
                slot="error"
                class="image-slot"
                style="font-size: 30px;line-height: 190px;text-align: center;"
              >
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image> -->
             <ov-image :src-data="getFileUrl(item.cover)"></ov-image>
          </div>
          <p :class="isactive === index ? 'assclass' : '' ">{{item.name}}</p>
          <span class="flcode">
            <span v-for="(g,index) in item.fit" :key="index">{{goods[g-1]}}</span>
          </span>
          <span class="frcode">参与学生{{item.stuNum}}人</span>
        </li>
      </ul>
    </div>
    <div class="pageblock" v-if="!nomore">
      <div class="block">
        <pagination :param="pages" :page-sizes="[12, 24, 36]" :total="totalNum" @change="getlist"></pagination>
      </div>
    </div>
    <!-- <div
      v-if="nomore"
      :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
    >
      <img :style="{'marginTop':'65px'}" src="~@assets/image/nothingData.svg" alt />
      <div :style="{'lineHeight':'0'}">
        <i :style="{'fontSize':'18px'}">暂无数据...</i>
      </div>
    </div> -->
     <no-data v-if="nomore"></no-data>
  </div>
</template>
<script>
import {
    gettingnavigation,
    listofpractical,
    collectionofsubstituteteachers
} from '@/api/frontstage'
// import "swiper/dist/css/swiper.css";
// import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    // components: {
    //   swiper,
    //   swiperSlide
    // },
    // 课程
    data() {
        return {
            options: [],
            optionslist: [],
            value10: '',
            isactive: -1,
            isok: 0,
            datas: '',
            lists: '',
            rid: '',
            arr: [],
            goods: ['小学', '初中', '高中'],
            code: '',
            nomore: false,
            pages: {
                pageNum: 1,
                pageSize: 12
            }
            // HeaderSwiperOption: {
            //   freeMode: true,
            //   slidesPerView: "auto",
            //   observer: true,
            //   observeParents: true,
            //   freeModeMomentum:false,
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
        this.getteachers()
    },
    watch: {
        'arr.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomore = true
                } else {
                    this.nomore = false
                }
            },
            deep: true
        }
    },
    methods: {
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.getlist()
        },
        async getteachers() {
            let id = localStorage.getItem('activeid')
            let res = await collectionofsubstituteteachers({ activityId: id })
            this.optionslist = res.data.entity.resultData
        },
        // async workcx() {
        //   let id = localStorage.getItem("activeid");
        //   let res = await listofpracticalcourses(
        //     {
        //       activeid: id,
        //       courseTypeParent: this.code,
        //       name: this.value10
        //     },
        //     this.pages
        //   );
        //   this.arr = res.data.entity.resultData;
        //   this.totalNum = res.data.entity.totalNum;
        //   this.arr.forEach(x => {
        //     let sum = x.fit.split(",");
        //     x.fit = sum;
        //   });
        // },
        async getlist() {
            let id = localStorage.getItem('activeid')
            let res = await listofpractical(
                {
                    activityId: id,
                    courseTypeParent: this.code,
                    name: this.value10
                },
                this.pages
            )
            this.arr = res.data.entity.resultData
            this.totalNum = res.data.entity.totalNum
            this.arr.forEach(x => {
                let sum = x.fit.split(',')
                x.fit = sum
            })
        },
        change(index, code) {
            this.isok = index
            this.code = code
            this.value10 = ''
            this.getlist()
        },
        moveover(index) {
            this.isactive = index
        },
        moveout() {
            this.isactive = false
        },
        async getnav() {
            const res = await gettingnavigation()
            const data = res.data.list
            this.datas = data
            let over = {
                name: '全部',
                code: ''
            }
            this.datas.unshift(over)
            this.code = this.datas[0].code || ''
            this.getlist()
        },
        // async getlist(code) {
        //     const lists = await gettinglists({ code: code })
        //     this.lists = lists.data.list
        //     console.log(this.lists)
        // },
        letsgo(id) {
            localStorage.setItem('mid', id)
            this.$router.push({ path: '/goods', query: { id: id } })
        }
    }
}
</script>
<style lang="scss" scoped>
.curriculum {
  margin-top: 10px;
  min-height: 600px;
  .curriculum_top {
    height: 60px;
    line-height: 60px;
    background: #fff;
    padding-left: 40px;
    margin-bottom: 15px;
  }
  .el-select {
    width: 200px;
    margin-right: 50px;
  }
  label {
    display: inline-block;
    height: 100%;
    font-size: 16px;
    color: #333333;
    margin-right: 20px;
  }
}
.curriculum_top_r {
  width: 226px;
  float: right;
  margin-right: 30px;
  margin-top: 10px;
}
.curriculum_down {
  height: 850px;
  ul {
    width: 100%;
    li {
      display: inline-block;
      margin-right: 36px;
      margin-bottom: 22px;
      width: 270px;
      height: 260px;
      background: #fff;
      &:nth-child(4n) {
        margin-right: 0;
      }
      .mgnews {
        width: 100%;
        height: 180px;
        img {
          width: 100%;
        }
      }
      h5 {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #333333;
        padding-left: 10px;
      }
      .txnews {
        height: 34px;
        line-height: 34px;
        padding: 2px 10px;
        span {
          font-size: 14px;
          color: #cccccc;
        }
        .krfl {
          float: left;
        }
        .krfr {
          float: right;
        }
        i {
          font-size: 16px;
          color: #333;
        }
      }
    }
  }
}
.pageblock {
  height: 32px;
  margin-top: 25px;
  margin-bottom: 100px;
}
.block {
  float: right;
}

.conentfrist {
  margin-top: 30px;
}
.showtitlte {
  text-align: center;
  height: 75px;
  line-height: 75px;
  span {
    width: 105px;
    height: 6px;
    margin-bottom: 6px;
  }
  .toleft {
    display: inline-block;
  }
  h3 {
    display: inline-block;
    height: 30px;
    font-family: MicrosoftYaHei;
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #333333;
    line-height: 20px;
    margin-left: 32px;
    margin-right: 32px;
  }
  .toright {
    display: inline-block;
  }
}
.hiddendover {
  width: auto;
  height: 60px;
  // overflow: hidden;
  border-bottom: 2px solid #ccc;
  background: #fff;
}
.overtab {
  width: 900px;
  overflow: hidden;
  float: left;
  position: relative;
  height: 100%;
  li {
    width: 96px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 16px;
    display: inline-block;
    margin-right: 18px;
    color: #000;
    cursor: pointer;
    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
}
.titleshow {
  width: 100%;
  height: auto;
  background: #fff;
  padding-top: 30px;
  ul {
    width: 100%;
    height: 100%;
    background: transparent;
    li {
      width: 282px;
      height: 278px;
      display: inline-block;
      margin-right: 24px;
      margin-bottom: 22px;
      background: #fff;
      cursor: pointer;
      &:nth-child(4n) {
        margin-right: 0;
      }
      div {
        width: 282px;
        height: 190px;
        img {
          width: 282px;
          height: 190px;
        }
      }
      p {
        height: 17px;
        font-family: MicrosoftYaHeiLight;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 17px;
        letter-spacing: 0px;
        color: #333333;
        padding-left: 13px;
        margin-top: 12px;
        margin-bottom: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .flcode {
        margin-left: 13px;
        display: block;
        height: 20px;
        width: 64px;
        line-height: 20px;
        text-align: center;
        float: left;
        background: #00adff;
        border-radius: 4px;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
      .frcode {
        display: block;
        float: right;
        width: 100px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999999;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
      }
    }
  }
}
.listgo {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  span {
    display: inline-block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: solid 1px #cccccc;
    font-family: AdobeHeitiStd-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
    cursor: pointer;
  }
}
.addclass {
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);
}
.assclass {
  color: #008aff !important;
}
.active {
  border: 2px solid #008aff;
  background: #008aff;
  span {
    color: #fff;
  }
}
// .Hcontainer {
//   color: #666;
//   height: 100%;
//   line-height: 36px;
//   width: auto;
//   .swiper-slide {
//     width: auto;
//     font-size: 18px;
//     // padding-left: 12px;
//     text-align: center;
//     span {
//       display: inline-block;
//       height: 70%;
//       line-height: 28px;
//       overflow: hidden;
//       margin-top: 10px;
//       padding-bottom: 5px;
//       padding-left: 10px;
//       padding: 10px;
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
