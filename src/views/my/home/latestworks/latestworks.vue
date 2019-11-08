<template>
  <div class="conentthr">
    <div class="container">
      <div class="container_r_one">
        <ul>
          <li>最新作品</li>
        </ul>
      </div>
      <!-- <div class="container_r_two"></div> -->
      <div class="container_r_thr userImage">
        <vueSeamless
          :data="lists"
          :class-option="optionCustomer"
          :style="{'marginTop':'18px'}"
          v-if="!nomore"
        >
          <ul :style="{width:lists.length*388+'px'}">
            <li v-for="(g,index) in lists" :key="index" @click="goto(g.id)">
              <div class="container_r_thr_img">
                <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
              </div>
              <div class="container_r_thr_title">
                <h4>{{g.workName}}</h4>
              </div>
              <div class="container_r_thr_show">
                <div class="minh">
                  <i :style="{'backgroundImage':'url('+yanjing+')'}"></i>
                  <span>{{g.browseNum}}</span>
                </div>
                <div class="minh">
                  <i :style="{'backgroundImage':'url('+fenxiang+')'}"></i>
                  <span>{{g.shareNum}}</span>
                </div>
                <div class="minh">
                  <i :style="{'backgroundImage':'url('+dianzan+')'}"></i>
                  <span>{{g.praiseNum}}</span>
                </div>
              </div>
              <div class="container_r_thr_name">
                <div class="container_r_thr_name_img">
                  <!-- <img :src="g.createFace" alt /> -->
                  <el-avatar
                    :size="32"
                    style="float:left;"
                    :src="g.createFace"
                    @error="errorHandler"
                  >
                    <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                  </el-avatar>
                </div>
                <div class="container_r_thr_name_conent">
                  <span>{{g.createName}}</span>
                  <span>{{g.className}}</span>
                </div>
              </div>
            </li>
          </ul>
        </vueSeamless>
        <no-data v-if="nomore"></no-data>
      </div>
    </div>
  </div>
</template>
<script>
import vueSeamless from 'vue-seamless-scroll'
import { getlistofthelatestworks } from '@/api/frontstage'
export default {
    data() {
        return {
            lists: [],
            itactive: 0,
            isactive: -1,
            izactive: 0,
            pages: {
                pageNum: 1,
                pageSize: 8
            },
            dianzan: require('../../../../../static/img/dianzan02.png'),
            fenxiang: require('../../../../../static/img/fenxiong.png'),
            yanjing: require('../../../../../static/img/liulanhui.png'),
            nomore: false,
            optionCustomer: {
                step: 1.5,
                limitMoveNum: '',
                openTouch: false,
                waitTime: 1,
                direction: 2,
                singleWidth: 0,
                openWatch: true,
                autoPlay: ''
            }
        }
    },
    components: {
        vueSeamless
    },
    created() {
        this.getnow()
    },

    watch: {
        'lists.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomore = true
                } else {
                    this.nomore = false
                }
                if (newval <= 3) {
                    this.optionCustomer.autoPlay = false
                }
            },
            deep: true
        }
    },
    methods: {
        errorHandler() {
            return true
        },
        moveover(index) {
            this.isactive = index
        },
        moveout(index) {
            this.isactive = false
        },
        moveovers(id, index) {
            this.izactive = id
            this.itactive = id
            this.getnow(index)
        },
        moveouts(index) {
            this.izactive = false
        },
        async getnow() {
            const res = await getlistofthelatestworks({}, this.pages)
            const lists = res.data.entity.resultData
            this.lists = lists
            this.optionCustomer.limitMoveNum = this.lists.length
            let listmore = this.lists.slice(0, 3)
            sessionStorage.setItem('listmore', JSON.stringify(listmore))
        },
        goto(id) {
            this.$router.push({ path: '/community/course/textworks/workdetail', query: { id: id } })
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.container_r_one {
  margin-top: 30px;
  width: 100%;
  height: 44px;
  background: #fff;
  overflow: hidden;
  border-bottom: 2px solid #f1624d;
  box-sizing: border-box;
  ul {
    padding-left: 25px;
    padding-right: 25px;
    width: 100%;
    height: 44px;
    box-sizing: border-box;
    li {
      &:nth-child(1) {
        float: left;
        width: 132px;
        line-height: 44px;
        font-size: 18px;
        height: 44px;
        color: #ffffff;
        text-align: center;
        background: #f1624d;
        border-radius: 4px 4px 0px 0px;
      }
    }
  }
}

.container_r_thr {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  // padding: 0px 26px 0px 26px;
  overflow: hidden;
  ul {
    width: 100%;
    height: 100%;
    // background: #fff;
    overflow: hidden;
    // padding: 24px 0px;
    box-sizing: border-box;
    li {
      width: 374px;
      height: 316px;
      float: left;
      overflow: hidden;
      box-sizing: border-box;
      margin-right: 14px;
      background: #fff;
      padding: 6px 7px;
      margin-bottom: 18px;
      cursor: pointer;
      // &:nth-child(4n) {
      //   margin-right: 0px;
      // }
      &:hover {
        .container_r_thr_title {
          h4 {
            color: #008aff;
          }
        }
      }
      .container_r_thr_img {
        height: 180px;
        width: 360px;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          border-radius: 8px;
        }
      }
      .container_r_thr_title {
        // padding-left: 10px;
        box-sizing: border-box;
        height: 46px;
        h4 {
          font-size: 16px;
          color: #333333;
          width: 100%;
          height: 100%;
          text-align: left;
          line-height: 46px;
          font-weight: 500;
        }
      }
      .container_r_thr_show {
        // margin-top: 10px;
        // padding-left: 10px;
        width: 100%;
        height: 30px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        .minh {
          height: 30px;
          width: 70px;
          float: left;
          i {
            display: block;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            background-size: 16px;
            float: left;
            margin-right: 6px;
          }
          span {
            height: 20px;
            display: block;
            font-size: 14px;
            color: #cccccc;
            float: left;
            line-height: 16px;
          }
        }
      }
      .container_r_thr_name {
        height: 30px;
        // padding-left: 10px;
        margin-top: 12px;
        box-sizing: border-box;
        .container_r_thr_name_img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ccc;
          float: left;
          margin-right: 9px;
          overflow: hidden;
        }
        .container_r_thr_name_conent {
          float: left;
          width: 200px;
          height: 100%;
          span {
            display: block;
            float: left;
            color: #666666;
            font-size: 14px;
            line-height: 30px;
            &:nth-child(2) {
              float: right;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
.userImage ul {
  height: 330px;
  overflow: hidden;
}
.userImage {
  margin-bottom: 80px;
  div {
    &:nth-child(1) {
      overflow: hidden;
      // padding: 0px 26px 0px 26px;
    }
  }
}
</style>
