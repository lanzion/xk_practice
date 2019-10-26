<template>
  <div class="baseinformationdetails">
    <div class="workshow">
      <div class="imgshow">
        <img :src="imgurl" alt />
      </div>
      <div class="container">
        <div class="container_one">
          <div class="container_one_l">
            <!-- <el-image :src="lists.imgurl" style="width: 400px;height:240px">
              <div
                slot="error"
                class="image-slot"
                style="font-size: 30px;line-height: 240px;text-align: center;"
              >
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image> -->
            <ov-image :src-data="lists.imgurl"></ov-image>
          </div>
          <div class="container_one_r">
            <div class="container_one_r_header">{{lists.name}}</div>
            <div class="container_one_r_drss">
              <i>
                <img :src="dizhi" alt />
              </i>
              <span>{{lists.address}}</span>
            </div>
            <div class="container_one_r_show">
              <div class="container_one_r_name">
                <i>
                  <img :src="renhei" alt />
                </i>
                <span>{{lists.liaisonMan}}</span>
              </div>
              <div class="container_one_r_phone">
                <i>
                  <img :src="phone" alt />
                </i>
                <span>{{lists.liaisonWay}}</span>
              </div>
              <div class="container_one_r_eye">
                <i>
                  <img :src="eye" alt />
                </i>
                <span>{{lists.browseNum}}</span>
              </div>
            </div>
            <div class="container_one_r_min">
              <p>{{lists.remark}}</p>
            </div>
            <!-- <div class="container_one_r_eye">
              <i>
                <img :src="eye" alt />
              </i>
              <span>{{lists.browseNum}}</span>
            </div>-->
          </div>
        </div>
      </div>
      <div class="conent_thr">
        <div class="conent_thr_title">
          <h4>{{datas.title}}</h4>
        </div>
        <div class="conent_thr_name">
          <span>发布时间:</span>
          <span>{{datas.createDate}}</span>
          <span>发布人:</span>
          <span>{{datas.createName}}</span>
          <span>浏览量:</span>
          <span>{{datas.browseNum}}</span>
        </div>
        <div class="conent_thr_connet">
          <p>{{datas.remark}}</p>
        </div>
      </div>

      <div class="conent_for">
        <div class="showtitlte">
          <span class="toleft" :style="{backgroundImage:'url('+tolfurl+')'}"></span>
          <h3 class="titlename">相关推荐</h3>
          <span
            class="toright"
            :style="{backgroundImage:'url('+tolfurl+')',backgroundPositionX:'-310px'}"
          ></span>
        </div>
        <div class="conent_for_one">
          <ul class="conent_for_one_ul">
            <li
              class="conent_for_one_li"
              v-for="(i,index) in goods"
              :key="index"
              @click="changesid(i.id)"
            >
              <span>{{i.title}}</span>
              <span>{{i.createDate.slice(0,10)}}</span>
            </li>
          </ul>
          <div class="conent_for_one_pos" v-if="!nomore"></div>
          <div
            v-if="nomore"
            :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
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
import {
    detailsofpublicinformation,
    getalistofinformation
} from '@/api/frontstage'
export default {
    name: 'schoolinformationdetails',
    data() {
        return {
            imgurl: require('../../../../static/img/xuexiaobeijng4.png'),
            dizhi: require('../../../../static/img/dizhi.png'),
            renhei: require('../../../../static/img/renhei.png'),
            phone: require('../../../../static/img/shouji.png'),
            eye: require('../../../../static/img/liulanhui.png'),
            tolfurl: require('../../../../static/img/biaoqiamchen.png'),
            lists: '',
            datas: '',
            goods: [],
            nomore: false
        }
    },
    created() {
        this.getlist()
        this.getdatas()
    },
    watch: {
        pages: {
            handler: function () {
                this.getlist()
            },
            deep: true
        },
        'goods.length': {
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
        changesid(gid) {
            this.getlist(gid)
            window.scrollTo(0, 0)
        },
        async getlist(gid) {
            let res = ''
            if (gid) {
                res = await detailsofpublicinformation({ id: gid })
            } else {
                let uid = localStorage.getItem('xid')
                let hid = this.$route.query.id
                let id = ''
                if (hid) {
                    id = hid
                } else {
                    id = uid
                }
                res = await detailsofpublicinformation({ id: id })
            }

            this.datas = res.data.entity
            this.lists = JSON.parse(sessionStorage.getItem('schoollist'))
        },
        async getdatas() {
            let res = await getalistofinformation(
                { orgType: 'C', isrecommend: 'A' },
                this.pages
            )
            this.goods = res.data.entity.resultData
        }
    }
}
</script>
<style lang="scss" scoped>
.workshow {
  width: 100%;
  height: 100%;
  .imgshow {
    height: 276px;
    width: 100%;
    img {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  }
  .container {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 170px;
    overflow: hidden;
    .container_one {
      width: 100%;
      height: 288px;
      padding: 22px 24px;
      background: #fff;
      box-sizing: border-box;
      z-index: 1000;
      .container_one_l {
        width: 400px;
        height: 240px;
        overflow: hidden;
        margin-right: 50px;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .container_one_r {
        float: left;
        height: 240px;
        width: 686px;
        padding-left: 30px;
        border-left: 1px solid #ccc;
        box-sizing: border-box;
        .container_one_r_header {
          font-size: 22px;
          color: #333;
          height: 30px;
          line-height: 30px;
          text-align: left;
        }
        .container_one_r_drss {
          margin-top: 10px;
          height: 30px;
          width: 100%;
          i {
            float: left;
            img{
                width: 16px;
            }
          }
          span {
            float: left;
            color: #666;
            font-size: 12px;
          }
        }
        .container_one_r_show {
          width: 100%;
          height: 30px;
          overflow: hidden;
          img{
                width: 16px;
            }
          .container_one_r_name {
            float: left;
            margin-right: 10px;
            i {
              float: left;
              margin-right: 10px;
            }
            span {
              float: left;
            }
          }
          .container_one_r_phone {
            margin-right: 10px;
            float: left;
            i {
              float: left;
              margin-right: 10px;
            }
            span {
              float: left;
            }
          }
          .container_one_r_eye {
            margin-right: 10px;
            float: left;
            i {
              float: left;
              margin-right: 10px;
            }
            span {
              float: left;
            }
          }
        }
        .container_one_r_min {
          margin-top: 16px;
          width: 100%;
          height: 100px;
          p {
            text-indent: 20px;
            line-height: 22px;
            width: 100%;
            height: 100px;
            text-align: left;
            font-size: 14px;
            color: #666;
            // display: -webkit-box;
            // -webkit-box-orient: vertical;
            // -webkit-line-clamp: 3;
            // overflow: hidden;
            // line-height: 2;
            overflow: hidden;
            overflow-y: auto;
          }
        }
        // .container_one_r_eye {
        //   margin-top: 30px;
        //   height: 30px;
        //   width: 100%;
        //   i {
        //     float: left;
        //     margin-right: 10px;
        //   }
        //   span {
        //     float: left;
        //     color: #ccc;
        //     font-size: 14px;
        //   }
        // }
      }
    }
  }
  .container_two {
    overflow: hidden;
    width: 1200px;
    margin: 100px auto;
    height: 60px;
    background: #fff;
    margin-bottom: 0;
    ul {
      width: 100%;
      height: 60px;
      li {
        float: left;
        width: 100px;
        height: 30px;
        border-radius: 15px;
        margin-left: 48px;
        margin-top: 15px;
        font-size: 16px;
        color: #333333;
        line-height: 30px;
      }
    }
  }
}
.conent_thr {
  width: 1200px;
  overflow: hidden;
  margin: 100px auto;
  margin-bottom: 50px;
  background: #fff;
  padding: 20px;
  padding-top: 0px;
  box-sizing: border-box;
  .conent_thr_title {
    h4 {
      font-size: 28px;
      color: #333333;
      width: 100%;
      height: 90px;
      line-height: 90px;
      text-align: center;
    }
  }
  .conent_thr_name {
    width: 100%;
    height: 30px;
    text-align: center;
    line-height: 30px;
    letter-spacing: 2px;
    span {
      color: #666666;
      font-size: 14px;
    }
  }
  .conent_thr_connet {
    width: 100%;
    min-height: 500px;
    margin-top: 58px;
    p {
      text-indent: 20px;
      font-size: 14px;
      color: #333333;
      line-height: 26px;
      letter-spacing: 1px;
    }
  }
}
.conent_for {
  width: 1200px;
  overflow: hidden;
  margin: 0px auto;
  margin-bottom: 90px;
  .showtitlte {
    text-align: center;
    height: 75px;
    line-height: 75px;
    margin-bottom: 10px;
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
  .conent_for_one {
    width: 100%;
    height: 280px;
    padding: 27px 25px;
    box-sizing: border-box;
    position: relative;
    background: #fff;
    .conent_for_one_li {
      width: 540px;
      float: left;
      margin-bottom: 20px;
      margin-right: 70px;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        span {
          &:nth-child(1) {
            color: #008aff;
          }
        }
      }
      &:nth-child(2n) {
        margin-right: 0px;
      }
      span {
        display: block;
        &:nth-child(1) {
          float: left;
          width: 368px;
          font-size: 16px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:nth-child(2) {
          float: right;
          width: 85px;
          color: #999999;
          font-size: 12px;
        }
      }
    }
  }
}
.conent_for_one_pos {
  position: absolute;
  width: 2px;
  height: 206px;
  background: #ccc;
  left: 600px;
  top: 27px;
}
</style>
