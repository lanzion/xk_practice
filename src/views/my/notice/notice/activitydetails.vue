<template>
  <div class="detailsofannouncement">
    <swriper :type="numimg" />
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
      <div class="conent_thr_connet" v-html="datas.content"></div>
    </div>
    <div class="conent_for">
      <div class="showtitlte">
        <span class="toleft" :style="{backgroundImage:'url('+tolfurl+')'}"></span>
        <h3 class="titlename">相关推荐</h3>
        <span
          class="toright"
          :style="{backgroundImage:'url('+tolfurl+')'}"
        ></span>
      </div>
      <div class="conent_for_one">
        <ul class="conent_for_one_ul">
          <li
            class="conent_for_one_li"
            v-for="(k,index) in lists"
            :key="index"
            @click="letgo(k.id)"
          >
            <span>{{k.title}}</span>
            <span>{{k.createDate}}</span>
          </li>
        </ul>
        <div class="conent_for_one_pos" v-if="!nomore"></div>
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
    getdetailsofannouncement,
    getlatestannouncement
} from '@/api/frontstage'
export default {
    name: 'detailsofannouncement',
    data() {
        return {
            numimg: '5',
            datas: '',
            lists: [],
            nomore: false,
            tolfurl: require('../../../../../static/img/biaoqiamchen.png')
        }
    },
    created() {
        this.getlist()
        this.getgoods()
    },
    components: {
        swriper: resolve => require(['@/components/my/swriper/swriper'], resolve)
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
        }
    },
    methods: {
        async getlist() {
            let rid = localStorage.getItem('eid')
            let tid = this.$route.query.id
            let id = ''
            if (tid) {
                id = tid
            } else {
                id = rid
            }
            let res = await getdetailsofannouncement({ id: id })
            // console.log(res.data.entity);
            this.datas = res.data.entity
        },
        async getgoods() {
            let res = await getlatestannouncement({ isrecommend: 'A' }, this.pages)
            // console.log(res);
            this.lists = res.data.entity.resultData
        },
        async letgo(id) {
            let res = await getdetailsofannouncement({ id: id })
            this.datas = res.data.entity
            document.documentElement.scrollTop = 0
        }
    }
}
</script>
<style lang="scss" scoped>
.detailsofannouncement {
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
.conent_thr {
  width: 1200px;
  overflow: hidden;
  margin: 20px auto;
  margin-bottom: 50px;
  background: #fff;
  padding: 20px;
  padding-top: 0px;
  box-sizing: border-box;
  // font-size: 20px;
  // line-height: 32px;
  // letter-spacing: 4px;
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
    font-size: 14px;
    line-height: 26px;
    letter-spacing: 1px;
    /deep/ p{
      position: relative;
      img{
        display: block;
        margin: 0 auto;
        margin-bottom: 5px;
      }
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
      background-position-x: -310px;
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
          width: 120px;
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
