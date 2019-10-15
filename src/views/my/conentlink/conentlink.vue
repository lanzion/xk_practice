<template>
  <div class="conentlink">
    <div class="showtitlte">
      <span class="toleft" :style="{backgroundImage:'url('+tolfurl+')'}"></span>
      <h3 class="titlename">友情链接</h3>
      <span
        class="toright"
        :style="{backgroundImage:'url('+tolfurl+')',backgroundPositionX:'-310px'}"
      ></span>
    </div>
    <div class="newlinks">
         <span class="toback" @click="goback" :style="{'display':'none'}">
              <i class="el-icon-arrow-left"></i>
          </span>
           <span class="togo" @click="goto"  :style="{'display':'none'}">
            <i class="el-icon-arrow-right"></i>
        </span>
      <div class="goswriper">
        <ul class="ulswpr">
          <li ref="showname">
            <div>
              <img :src="tolink" alt />
            </div>
            <p>广州博物馆</p>
          </li>
          <li>
            <div>
              <img :src="tolink" alt />
            </div>
            <p>广州博物馆</p>
          </li>
          <li>
            <div>
              <img :src="tolink" alt />
            </div>
            <p>广州博物馆</p>
          </li>
          <li>
            <div>
              <img :src="tolink" alt />
            </div>
            <p>广州博物馆</p>
          </li>
          <li>
            <div>
              <img :src="tolink" alt />
            </div>
            <p>广州博物馆</p>
          </li>
          <li>
            <div>
              <img :src="tolink" alt />
            </div>
            <p>广州博物馆</p>
          </li>
           <li>
            <div>
              <img :src="tolink" alt />
            </div>
            <p>广州博物馆</p>
          </li>
           <li>
            <div>
              <img :src="tolink" alt />
            </div>
            <p>广州博物馆</p>
          </li>
           <li>
            <div>
              <img :src="tolink" alt />
            </div>
            <p>广州博物馆</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      counum:0,
      istrue:true,
      tolfurl: require("../../../../static/img/biaoqiamchen.png"),
      tolink: require("../../../../static/img/bowuguan.png"),
    };
  },
  methods:{
      goback(){
        let num = ++this.counum
        //  console.log(num)
        //  if(num == 0){ 
        //     this.istrue = false;
        // }
        let width = this.$refs.showname.clientWidth + 18
        $('.ulswpr').animate({'left' : -(num * width)+'px'},400);
      },
      goto(){
        // this.istrue = true;
        let num = --this.counum
        // if(num == 0){  //根据条件出现  判断是否小于6的情况
        //     this.istrue = false;
        // }
        let width = this.$refs.showname.clientWidth + 18
        $('.ulswpr').animate({'left' : -(num * width)+'px'},400);
      },
  }
};
</script>
<style lang="scss" scoped>
.conentlink {
  margin-top: 50px;
  width: 100%;
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
  .newlinks {
    position: relative;
    background: #fff;
    width: 1128px;
    height: 246px;
    padding: 36px;
    .toback{
          position: absolute;
          left: 0;
          top: 50%;
          margin-left: 10px;
          transform: translateY(-100%);
          z-index: 1000;
      }
      .togo{
          position: absolute;
          right: 0;
          top: 50%;
          margin-right: 10px;
          transform: translateY(-100%);
      }
    .goswriper {
        position: relative;
        overflow: hidden;
        height: 246px;
      ul {
        position: absolute;
        width: 3000px;
        height: 246px;
        li {
          margin-right: 6px;
          display: inline-block;
          width: 170px;
          height: 220px;
          div {
            text-align: center;
            background: yellowgreen;
            width: 158px;
            height: 175px;
            padding: 6px;
            img {
              width: 100%;
            }
          }
          p {
            width: 170px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 14px;
            color: #666666;
            background-color: #f2f2f2;
            border-radius: 0px 0px 4px 4px;
          }
        }
      }
    }
  }
}
</style>


