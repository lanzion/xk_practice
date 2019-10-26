<template>
  <div class="conentfrist">
    <div class="container">
      <div class="container_r">
        <div class="container_r_one">
          <ul>
            <li>最新活动</li>
            <li @click="gomoretwo()">更多></li>
          </ul>
        </div>
        <!-- <div
          class="container_r_two"
          :style="{'width':'100%','height':'10px','background':'#fff','marginBottom':'5px'}"
        ></div>-->
        <div class="container_r_thr">
          <ul class="container_r_thr_ul">
            <li
              class="container_r_thr_li"
              v-for="(f,index) in lists"
              :key="index"
              @click="letsgo(f.id,f.playbillPage)"
            >
              <div class="container_r_thr_li_img">
                <!-- <el-image :src="getFileUrl(f.cover)" fit="cover" style="width: 420px;height:190px">
                  <div
                    slot="error"
                    class="image-slot"
                    style="font-size: 30px;line-height: 180px;text-align: center;"
                  >
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image> -->
                <ov-image :src-data="getFileUrl(f.cover)"></ov-image>

                <span
                  :class="f.activityStatus=='进行中'?'active':''"
                  :style="f.activityStatus == '已结束'? {'background':'#ccc'}:''"
                >{{f.activityStatus}}</span>
              </div>
              <div class="container_r_thr_li_conent">
                <div class="container_r_thr_li_title">
                  <p>{{f.title}}</p>
                </div>
                <div class="container_r_thr_li_over">
                  <div class="container_r_thr_li_over_img">
                    <el-avatar
                      :size="32"
                      style="float:left;"
                      :src="f.orgCover"
                      @error="errorHandler"
                    >
                      <img
                        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                      />
                    </el-avatar>
                  </div>
                  <div class="container_r_thr_li_over_conent">
                    <div class="container_r_thr_li_over_conent_one">
                      <p>{{f.orgName}}</p>
                    </div>
                    <div class="container_r_thr_li_over_conent_two">
                      <span>活动时间:</span>
                      <span>{{f.startDate.slice(0,10)}} 至 {{f.endDate.slice(0,10)}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div
            v-if="nomoretwo"
            :style="{'width':'100%','height':'390px','background':'#fff','textAlign':'center'}"
          >
            <img src="~@assets/image/nothingData.svg" alt />
            <div :style="{'lineHeight':'0'}">
              <i :style="{'fontSize':'18px'}">暂无数据...</i>
            </div>
          </div>
        </div>
      </div>
      <div class="container_l">
        <div class="container_l_one">
          <ul>
            <li>通知公告</li>
            <li @click="gomoreone()">更多></li>
          </ul>
        </div>
        <div class="container_l_two">
          <ul>
            <li v-for="g in datas" :key="g.id" @click="goshow(g.id)">{{g.title}}</li>
          </ul>
          <div
            v-if="nomore"
            :style="{'width':'100%','height':'380px','background':'#fff','textAlign':'center'}"
          >
            <img src="~@assets/image/nothingData.svg" alt />
            <div :style="{'lineHeight':'0'}">
              <i :style="{'fontSize':'18px'}">暂无数据...</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { gettingshow, getlatestannouncement } from '@/api/frontstage'
const img = require('@/assets/image/wechat.png')
export default {
    data() {
        return {
            datas: [],
            lists: [],
            morenImage: 'this.src="static/img/jiditubiao22.png"', // 默认头像
            isactive: -1,
            istrue: 0,
            nomore: false,
            nomoretwo: false,
            pages: {
                pageSize: 20,
                pageNum: 1
            }
        }
    },
    created() {
        this.getnav()
        this.getlist()
    },
    watch: {
        'datas.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomore = true
                } else {
                    this.nomore = false
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
        errorHandler() {
            return true
        },
        change(code) {
            this.getlist(code)
        },
        moveover(index) {
            this.isactive = index
        },
        moveout() {
            this.isactive = false
        },
        async getnav() {
            const res = await getlatestannouncement({}, this.pages)
            this.datas = res.data.entity.resultData.slice(0, 17)
            // console.log(this.datas)
        },
        async getlist() {
            const lists = await gettingshow({}, this.pages)
            this.lists = lists.data.entity.resultData.slice(0, 4)
            // console.log(this.lists);
        },
        letsgo(id, playbillPage) {
            this.$store.commit('changesurl', playbillPage)
            localStorage.setItem('activeid', id)
            this.$router.push({ path: '/dlest', query: { id: id } })
        },
        gomoretwo() {
            sessionStorage.setItem('xk_headerNav', 1)
            this.$router.push({ path: '/community' })
        },
        gomoreone() {
            this.$router.push({ path: '/activity' })
        },
        goshow(id) {
            localStorage.setItem('eid', id)
            this.$router.push({ path: '/detailsofannouncement', query: { id: id } })
        }
    }
}
</script>
<style lang="scss" scoped>
.conentfrist {
  margin-top: 30px;
  width: 100%;

  overflow: hidden;
  .container_l {
    float: right;
    width: 240px;
    // height: 100%;
    overflow: hidden;
    .container_l_one {
      width: 100%;
      height: 44px;
      background: #009944;
      ul {
        width: 100%;
        height: 40px;
        li {
          width: 50%;
          height: 100%;
          float: left;
          font-size: 16px;
          line-height: 40px;
          text-align: center;
          color: #ffffff;
          box-sizing: border-box;
          &:nth-child(1) {
            text-align: left;
            padding-left: 10px;
          }
          &:nth-child(2) {
            text-align: right;
            padding-right: 10px;
          }
        }
      }
    }
    .container_l_two {
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      padding: 10px 7px 20px 7px;
      background: #ffffff;
      ul {
        width: 100%;
        li {
          height: 38px;
          width: 100%;
          border-bottom: 1px solid #ccc;
          font-size: 14px;
          color: #666666;
          line-height: 38px;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &::before {
            content: "*";
            color: #666;
            font-size: 14px;
            margin-right: 10px;
            vertical-align: middle;
          }
          &:hover {
            color: #008aff;
            &::before {
              color: #008aff;
            }
          }
        }
      }
    }
  }
  .container_r {
    float: left;
    width: 930px;
    // height: 100%;
    min-height: 464px;
    background: #fff;
    .container_r_one {
      width: 100%;
      height: 42px;
      background: #fff;
      overflow: hidden;
      border-bottom: 2px solid #009944;
      ul {
        margin-left: 25px;
        // margin-top: 10px;
        width: 880px;
        height: 42px;
        li {
          height: 100%;
          &:nth-child(1) {
            float: left;
            width: 132px;
            height: 42px;
            line-height: 42px;
            font-size: 18px;
            color: #ffffff;
            text-align: center;
            background: #009944;
            border-radius: 4px 4px 0px 0px;
          }
          &:nth-child(2) {
            float: right;
            line-height: 42px;
            color: #666666;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
    .container_r_thr {
      padding: 20px 16px;
      box-sizing: border-box;
      background: #fff;
      overflow: hidden;
      .container_r_thr_ul {
        width: 100%;
        height: 100%;
        .container_r_thr_li {
          height: 296px;
          width: 420px;
          margin-right: 37px;
          margin-bottom: 30px;
          float: left;
          z-index: 1;
          box-sizing: border-box;
          box-sizing: border-box;
          transition: transform 0.2s;
          cursor: pointer;
          &:nth-child(2n) {
            margin-right: 0;
          }
          &:hover {
            box-shadow: 0 10px 10px 0 #ccc;
            transform: translate(0, -10px);
          }
          .container_r_thr_li_img {
            width: 420px;
            height: 190px;
            position: relative;
            img {
              width: 420px;
              height: 190px;
            }
            span {
              width: 70px;
              height: 30px;
              display: block;
              text-align: center;
              line-height: 30px;
              font-size: 14px;
              color: #ffffff;
              position: absolute;
              background: #008aff;
              top: 25px;
              right: 0;
              border-radius: 15px 0 0 15px;
            }
            .active {
              background: #ff9900;
            }
          }
          .container_r_thr_li_conent {
            width: 100%;
            height: 106px;
            .container_r_thr_li_title {
              width: 100%;
              height: 40px;
              box-sizing: border-box;
              padding-top: 2px;
              p {
                font-size: 18px;
                color: #333333;
                padding: 0 10px;
                width: 100%;
                height: 100%;
                line-height: 40px;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                box-sizing: border-box;
              }
            }
            .container_r_thr_li_over {
              width: 100%;
              height: 40px;
              margin-top: 20px;
              padding-left: 10px;
              box-sizing: border-box;
              overflow: hidden;
              .container_r_thr_li_over_img {
                float: left;
                height: 32px;
                width: 32px;
                border-radius: 50%;
                margin-right: 10px;
                overflow: hidden;
                // img {
                //   float: left;
                //   height: 30px;
                //   width: 30px;
                // }
              }
              .container_r_thr_li_over_conent {
                float: left;
                width: 350px;
                height: 50px;
                .container_r_thr_li_over_conent_one {
                  width: 100%;
                  height: 20px;
                  line-height: 20px;
                  p {
                    font-size: 14px;
                    color: #333333;
                  }
                }
                .container_r_thr_li_over_conent_two {
                  width: 100%;
                  height: 20px;
                  position: relative;
                  span {
                    color: #999999;
                    font-size: 12px;
                    display: inline-block;
                    &:nth-child(1) {
                      position: absolute;
                      top: 0;
                      left: 0;
                    }
                    &:nth-child(2) {
                      position: absolute;
                      top: 0;
                      left: 50px;
                      text-indent: 10px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
