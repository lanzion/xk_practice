<template>
  <div class="conentfor">
    <div class="showtitlte">
      <span class="toleft" :style="{backgroundImage:'url('+tolfurl+')'}"></span>
      <h3 class="titlename">推荐空间</h3>
      <span
        class="toright"
        :style="{backgroundImage:'url('+tolfurl+')',backgroundPositionX:'-310px'}"
      ></span>
    </div>
    <div class="lspace">
      <ul>
        <li>
          <div class="titlego">
            <img :src="gimurl01" alt />
          </div>
          <ul class="titleto">
            <li v-for="gi in limonesone" :key="gi.id">
              <div class="titleto_s">
                <div class="trademark">
                  <img :src="gi.url" alt />
                </div>
                <div class="trademarkname">
                  <p>{{gi.eduName}}</p>
                </div>
              </div>
              <div class="trademarktext">
                <p>{{gi.remark}}</p>
              </div>
              <div class="trademarknum">
                <i :style="{backgroundImage:'url('+foreyes+')'}"></i>
                <span>{{gi.browseNum}}</span>
              </div>
            </li>
          </ul>
        </li>


        <li>
          <div class="titlego">
            <img :src="gimurl02" alt />
          </div>
          <ul class="titleto">
            <li v-for="gi in limonesthr" :key="gi.id">
              <div class="titleto_s">
                <div class="trademark">
                  <img :src="gi.url" alt />
                </div>
                <div class="trademarkname">
                  <p>{{gi.name}}</p>
                </div>
              </div>
              <div class="trademarktext">
                <p>{{gi.remark}}</p>
              </div>
              <div class="trademarknum">
                <i :style="{backgroundImage:'url('+foreyes+')'}"></i>
                <span>{{gi.browseNum}}</span>
              </div>
            </li>
          </ul>
        </li>


        <li>
          <div class="titlego">
            <img :src="gimurl03" alt />
          </div>
          <ul class="titleto">
            <li v-for="gi in limonestwo" :key="gi.id">
              <div class="titleto_s">
                <div class="trademark">
                  <img :src="gi.url" alt />
                </div>
                <div class="trademarkname">
                  <p>{{gi.schoolName}}</p>
                </div>
              </div>
              <div class="trademarktext">
                <p>{{gi.remark}}</p>
              </div>
              <div class="trademarknum">
                <i :style="{backgroundImage:'url('+foreyes+')'}"></i>
                <span>{{gi.browseNum}}</span>
              </div>
            </li>
          </ul>
        </li>
        <span class="goeducation gohere" :style="{backgroundImage:'url('+forducation+')'}">查看更多</span>
        <span class="goactivity gohere" :style="{backgroundImage:'url('+foractivity+')'}">查看更多</span>
        <span class="goschool gohere" :style="{backgroundImage:'url('+forschool+')'}">查看更多</span>
      </ul>
    </div>
  </div>
</template>
<script>
import { gettingBureauofEducation ,gettingbase,gettingcshool } from "@/api/frontstage";
export default {
  data() {
    return {
      limonesone:'',
      limonestwo:'',
      limonesthr:'',
      tolfurl: require("../../../../static/img/biaoqiamchen.png"),
      foreyes: require("../../../../static/img/liulanhui.png"),
      forducation: require("../../../../static/img/yuanju1.png"),
      foractivity: require("../../../../static/img/yuanju2.png"),
      forschool: require("../../../../static/img/yuanju3.png"),
      gimurl01: require("../../../../static/img/jiaoyu.png"),
      gimurl02: require("../../../../static/img/huodong.png"),
       gimurl03: require("../../../../static/img/xuexiao.png"),
    };
  },
  created(){
    this.gettingBur()
    this.gettingcs()
    this.gettingba()
  },
  methods:{
     async gettingBur(){
       const limone = await gettingBureauofEducation({},this.pages)
       let limones = limone.data.entity.resultData.slice(0,3)
       this.limonesone = limones
     },
     async gettingcs(){
       const limtwo = await gettingcshool()
       let limtwos = limtwo.data.entity.resultData.slice(0,3)
       this.limonestwo = limtwos
     },
     async gettingba(){
       const limthr = await gettingbase()
       let limthrs = limthr.data.entity.resultData.slice(0,3)
       this.limonesthr = limthrs
     }
  }
};
</script>
<style lang="scss" scoped>
.conentfor {
  background: #f8f8f8;
  margin-top: 50px;
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
  .lspace {
      padding-top: 20px;
      background: #fff;
    width: 1200px;
    height: 925px;
    ul {
      width: 100%;
      height: 100%;
      position: relative;
      li {
        padding-left: 28px;
        height: 260px;
        margin-bottom: 38px;
        .titlego {
          float: left;
          img {
            width: 160px;
            height: 260px;
          }
        }
        .titleto {
          width: 960px;
          float: left;
          li {
            width: 216px;
            height: 220px;
            padding: 30px 30px 10px 30px;
            border: 1px solid #ccc;
            margin-left: 18px;
            float: left;
            .titleto_s {
              height: 60px;
              margin-bottom: 14px;
              .trademark {
                float: left;
                margin-right: 10px;
                width: 60px;
                height: 65px;
              }
              .trademarkname {
                float: left;
                height: 60px;
                width: 146px;
                p {
                  font-size: 16px;
                  font-weight: normal;
                  font-stretch: normal;
                  line-height: 45px;
                  letter-spacing: 0px;
                  color: #333333;
                  height: 60px;
                  line-height: 60px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
            .trademarktext {
              margin-bottom: 10px;
              p {
                height: 86px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
                overflow: hidden;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #666666;
              }
            }
            .trademarknum {
              width: 100%;
              height: 30px;
              text-align: center;
              i {
                display: inline-block;
                width: 16px;
                height: 30px;
                background-repeat: no-repeat;
                vertical-align: middle;
              }
              span {
                font-size: 16px;
                width: 25px;
                height: 30px;
                display: inline-block;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .gohere{
           width: 45px;
          height: 160px;
          font-size: 14px;
          writing-mode:tb-rl;
          text-align: center;
          line-height: 45px;
          cursor:pointer;
      }
      .goeducation{
          position: absolute;
          right: 0;
          top: 50px;
          color: #23ac38;
      }
      .goactivity{
          position: absolute;
          right: 0;
          top: 360px;
          color: #fc8230;
      }
      .goschool{
          position: absolute;
          right: 0;
          top: 650px;
          color: #ed3e6c;
      }
    }
  }
}
</style>