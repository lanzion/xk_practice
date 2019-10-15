<template>
  <div class="atdetails">
    <div class="conent_x">
      <span>课程名称</span>
      <span>{{lists.name}}</span>
    </div>
    <div class="conent_x">
      <span :style="{'float':'left'}">学习目标</span>
      <span :style="{'float':'left','width':'700px','overflow':'hidden','textOverflow':'ellipsis','whiteSpace': 'nowrap'}">{{lists.target}}</span>
    </div>
    <div class="conent_e">
      <span
        @click="changes()"
        :style="{'backgroundImage': istrue ?'url('+imgurl02+')':'url('+imgurl01+')'}"
      >课程详情</span>
    </div>

    <div class="sdetails" v-show="istrue">
      <div class="conent_x">
        <span>课程名称</span>
        <span>{{lists.name}}</span>
      </div>
      <div class="conent_x">
        <span>课程类型</span>
        <span>{{lists.courseTypeParentName}}>{{lists.courseTypeName}}</span>
      </div>
      <div class="conent_x">
        <span :style="{'float':'left'}">学习目标</span>
        <span
          :style="{'width':'700px','overflow':'hidden','textOverflow':'ellipsis','whiteSpace': 'nowrap'}"
        >{{lists.target}}</span>
      </div>
      <div class :style="{'paddingLeft':'49px','margin':'20px 0','overflow':'hidden'}">
        <span
          :style="{'display':'inline-block','fontSize':'16px','color':'#666','vertical-align':'top','margin-right':'29px'}"
        >课程内容</span>
        <span
          :style="{'fontSize':'16px','color':'#333','display':'inline-block','height':'160px','width':'676px','border':'1px solid #ccc','overflowY':'auto'}"
        >{{lists.content}}</span>
      </div>

      <div class="download">
        <span class="download_one" :style="{width:'64px'}">活动资源</span>
        <ul :style="{'over-flow':'hidden'}">
          <li
            v-for="(t,index) in lists.courseResources"
            :key="index"
            :style="{'over-flow':'hidden'}"
          >
            <span>附件{{index+1}}</span>
            <span>{{t.resourceName}}</span>
            <span>
              <a :href="t.resourceId" @click.prevent="downloadItem(t.resourceId,t.name)">下载</a>
            </span>
          </li>
        </ul>
      </div>

      <div :style="{'over-flow':'hidden','height':'100%'}">
        <ul :style="{'over-flow':'hidden'}">
          <li
            v-for="(q,index) in lists.courseClassServers"
            :key="index"
            :style="{'over-flow':'hidden'}"
          >
            <div :style="{'height':'auto','marginBottom':'20px','overflow':'hidden'}">
              <div class="conent_t" :style="{'float':'left','overflow':'hidden'}">
                <div class="conent_x">
                  <span>上课年级</span>
                  <span>{{q.gradeName}}</span>
                </div>
                <div class="conent_x" :style="{'width':'800px'}">
                  <span>上课时间</span>
                  <span>{{q.startDate}}~{{q.endDate}}</span>
                </div>
              </div>

              <div class="conent_t" :style="{'float':'left'}">
                <div class="conent_x">
                  <span>上课班级</span>
                  <span>{{q.className}}</span>
                </div>
              </div>
            </div>
            <div class="conent_x">
              <span>活动基地</span>
              <span>{{q.baseinfoName}}</span>
            </div>
            <div class="conent_x">
              <span>基地地址</span>
              <span>{{q.baseAddress}}</span>
            </div>
            <div class="conent_x">
              <span>参与服务</span>
              <span>{{q.serverTitle}}</span>
            </div>
            <div class :style="{'paddingLeft':'49px','margin':'20px 0','overflow':'hidden'}">
              <span
                :style="{'display':'inline-block','fontSize':'16px','color':'#666','vertical-align':'top','margin-right':'20px'}"
              >服务内容</span>
              <span
                :style="{'fontSize':'16px','color':'#333','display':'inline-block','height':'160px','width':'676px','border':'1px solid #ccc','overflowY':'auto'}"
              >{{q.serverExpound}}</span>
            </div>
            <div class="conent_x" :style="{'position':'relative'}">
              <span class="conent_u">负责人</span>
              <span>{{q.serverPersonInCharge}}</span>
              <div class="conent_x" :style="{'position':'absolute','right':'-410px','top':'0px'}">
                <span class="conent_u">联系方式</span>
                <span>{{q.serverPersonInChargePhone}}</span>
              </div>
            </div>
            <div class="conent_x">
              <span class="conent_u">活动位置</span>
              <span>{{q.serverAddress}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div>
      <h3 class="conent_h">作品信息</h3>
    </div>
    <div class="conent_x">
      <span>作品名称</span>
      <span>{{datas.workName}}</span>
    </div>
    <div class :style="{'paddingLeft':'49px','margin':'20px 0','overflow':'hidden'}">
      <span
        :style="{'display':'inline-block','fontSize':'16px','color':'#666','vertical-align':'top','margin-right':'29px'}"
      >作品介绍</span>
      <span
        :style="{'fontSize':'16px','color':'#333','display':'inline-block','width':'676px'}"
      >{{datas.description}}</span>
    </div>
    <div class="conent_x">
      <span>作者班级</span>
      <span>{{datas.className}}/{{datas.gradeName}}</span>
    </div>
    <div class="conent_x">
      <span>姓名</span>
      <span>{{datas.createName}}</span>
    </div>
    <div class="conent_x">
      <span>上传时间</span>
      <span>{{datas.createDate}}</span>
    </div>
    <div :style="{'borderBottom':'1px solid #ccc','width':'100%','height':'20px'}"></div>
    <div>
      <h3 class="conent_h">作品图片</h3>
    </div>
    <div :style="{'width':'100%','height':'390px'}" v-if="!nomore">
      <div class="bigimg">
        <img ref="imgsrc" :src="oneimg.resourceId" alt />
      </div>
      <div class="smallimg">
        <ul>
          <li
            v-for="(item,index) in datas.picResources"
            :key="index"
            @click="giveimg(item,index)"
            :class="index === num ?'active':''"
          >
            <img :src="item.resourceId" alt />
          </li>
        </ul>
      </div>
    </div>
    <div
      v-if="nomore"
      :style="{'width':'100%','height':'300px','background':'#fff','textAlign':'center'}"
    >
      <img src="~@assets/image/nothingData.svg" alt />
      <div :style="{'lineHeight':'0'}">
        <i :style="{'fontSize':'18px'}">暂无数据...</i>
      </div>
    </div>
    <div>
      <h3 class="conent_h">作品视频</h3>
    </div>
    <div class="tovideos">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :style="{'width':'898px'}"
        :playsinline="true"
        :options="playerOptions"
      ></video-player>
    </div>
    <div v-if="type === 1">
      <h3 class="conent_h">作品评语</h3>
    </div>
    <div v-if="type === 1" class="conent_g">
      <textarea type v-model="teachershow" placeholder="请填写本次评语" />
    </div>
    <div v-if="type === 1" :style="{'marginBottom':'60px'}">
      <div class="ifgo">
        <span @click="passto()">审核通过</span>
        <span @click="passout()">驳回</span>
      </div>
      <div
        class="showorhidden"
        :style="{'height':sum?auto:'0px','border':sum?'solid 1px #008aff':'none'}"
      >
        <p>提示</p>
        <p>是否立即对该作品进行评分</p>
        <div>
          <span @click="moveto()">是,去评分</span>
          <span @click="movego()">否,继续审核</span>
        </div>
      </div>
    </div>
    <div class="conent_j">
      <div>
        <h3 class="conent_h">审核记录</h3>
      </div>
      <div class="conent_v" v-for="(f,index) in arr" :key="index">
        <div class="conent_l">
          <span>审核人</span>
          <span>{{f.auditName}}</span>
          <span>审核结果</span>
        </div>
        <div class="conent_l">
          <span>审核意见</span>
          <span>{{f.auditComment}}</span>
          <span>{{f.auditStatus}}</span>
        </div>
        <div class="conent_l">
          <span>上传时间</span>
          <span>{{f.createDate}}</span>
          <span>审核时间{{f.updateDate}}</span>
        </div>
      </div>
      <div
        v-if="nomorethr"
        :style="{'width':'100%','height':'200px','background':'#fff','textAlign':'center'}"
      >
        <img src="~@assets/image/nothingData.svg" alt />
        <div :style="{'lineHeight':'0'}">
          <i :style="{'fontSize':'18px'}">暂无数据...</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getteachcoursedetails,
  workmanagementworkauditrecords,
  workmanagementworkaudit
} from "@/api/frontstage";
export default {
  name: "atdetails",
  data() {
    return {
      arr: [],
      nomorethr: false,
      nomore: false,
      nomoretwo: false,
      lists: [],
      oneimg: "",
      type: "",
      teachershow: "",
      datas: "",
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "" //url地址
          }
        ],
        poster: "../../../../static/img/shipbj.jpg", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      },
      auditRecords: [],
      picResources: [],
      istrue: 0,
      num: 0,
      sum: false,
      imgurl01: require("../../../../../static/img/kechen1.png"),
      imgurl02: require("../../../../../static/img/kechen2.png")
    };
  },
  created() {
    this.type = this.$route.query.type;
    this.getdatas();
    this.getlists();
  },
  watch: {
    "picResources.length": {
      handler(newval, oldval) {
        if (newval === 0 || newval == undefined) {
          this.nomore = true;
        } else {
          this.nomore = false;
        }
      },
      deep: true
    },
    "arr.length": {
      handler(newval, oldval) {
        if (newval === 0 || newval == undefined) {
          this.nomorethr = true;
        } else {
          this.nomorethr = false;
        }
      },
      deep: true
    },
    "auditRecords.length": {
      handler(newval, oldval) {
        if (newval === 0) {
          this.nomoretwo = true;
        } else {
          this.nomoretwo = false;
        }
      },
      deep: true
    }
  },
  methods: {
    async getdatas() {
      let id = this.$route.query.id;
      let res = await getteachcoursedetails({ id: id });
      this.datas = res.data.entity;
      this.lists = this.datas.courseInfo || {};
      if (this.datas.picResources) {
        this.oneimg = this.datas.picResources[0];
      }
      if (res.data.entity.accResources) {
        this.playerOptions.sources[0].src =
          res.data.entity.accResources[0].resourceId || "";
      }
      this.tableData = this.datas.evalInfos;
      this.picResources = this.datas.picResources;
      this.auditRecords = this.datas.auditRecords;
    },
    async getlists() {
      let id = this.$route.query.id;
      let res = await workmanagementworkauditrecords({ workId: id });
      let arr = res.data.entity.resultData;
      arr.forEach(x => {
        if (x.auditStatus == 0) {
          x.auditStatus = "待审核";
        }
        if (x.auditStatus == 1) {
          x.auditStatus = "审核通过";
        }
        if (x.auditStatus == 2) {
          x.auditStatus = "驳回";
        }
      });
      this.arr = arr;
    },
    changes() {
      this.istrue = !this.istrue;
    },
    giveimg(item, index) {
      this.$refs.imgsrc.src = item.resourceId || "";
      this.num = index;
    },
    async passto() {
      let id = this.$route.query.id;
      let res = await workmanagementworkaudit({
        auditStatus: "1",
        auditComment: this.teachershow,
        workId: id
      });
      if (res.data.code === 200) {
        this.$message({
          showClose: true,
          message: "审核成功,已通过",
          type: "success"
        });
        this.sum = !this.sum;
      }
    },
    async passout() {
      let id = this.$route.query.id;
      let res = await workmanagementworkaudit({
        auditStatus: "2",
        auditComment: this.teachershow,
        workId: id
      });
    },
    moveto() {
      this.$router.push({ path: "/wscoring/origs" });
    },
    movego() {
      this.$router.push({ path: "/agment/noaudited" });
    }
  }
};
</script>
<style lang="scss" scoped>
.download {
  width: 100%;
  overflow: hidden;
  padding-left: 49px;
  box-sizing: border-box;
  line-height: 40px;
  .download_one {
    display: block;
    width: 80px;
    height: 40px;
    float: left;
    font-size: 16px;
    color: #666666;
    line-height: 40px;
    text-align: center;
    margin-right: 20px;
  }
  ul {
    float: left;
    width: 500px;
    li {
      width: 100%;
      // height: 40px;
      overflow: hidden;
      span {
        line-height: 40px;
        text-align: left;
        margin-right: 20px;
        display: block;
        float: left;
        &:nth-child(1) {
          font-size: 16px;
          color: #666666;
        }
        &:nth-child(2) {
          font-size: 16px;
          color: #333333;
        }
        &:nth-child(3) {
          font-size: 12px;
          color: #999999;
          width: 40px;
          height: 24px;
          border-radius: 4px;
          a {
            display: block;
            width: 30px;
            height: 24px;
            line-height: 24px;
            font-size: 14px;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
.sdetails {
  padding-top: 20px;
  padding-bottom: 30px;
  box-sizing: border-box;
  overflow: hidden;
}
.conent_x {
  height: 40px;
  width: 100%;
  padding-left: 40px;
  box-sizing: border-box;
  span {
    display: inline-block;
    height: 100%;
    font-size: 16px;
    min-width: 80px;
    text-align: center;
    line-height: 40px;
    &:nth-child(1) {
      color: #666666;
      margin-right: 20px;
      min-width: 80px;
    }
    &:nth-child(2) {
      color: #333333;
    }
  }
}
.conent_t {
  width: 420px;
  box-sizing: border-box;
  overflow: hidden;
}
.conent_x {
  height: 40px;
  width: 100%;
  padding-left: 40px;
  span {
    display: inline-block;
    height: 100%;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    min-width: 64px;
    &:nth-child(1) {
      color: #666666;
      margin-right: 20px;
    }
    &:nth-child(2) {
      color: #333333;
      text-align: left;
    }
  }
}

.conent_y {
  box-sizing: border-box;
  width: 100%;
  height: 84px;
  border-top: 1px solid #ccc;
  text-align: center;
  line-height: 84px;
  color: #333333;
  font-size: 18px;
}

.conent_i {
  margin-left: 27px;
  border: 1px solid #008aff;
  border-radius: 4px;
  width: 40px;
  height: 24px;
  background-color: #77aaf9;
  opacity: 0.9;
  color: #008aff;
  font-size: 12px;
  cursor: pointer;
}
.atdetails {
  padding: 20px 0 40px 0;
}
.conent_x {
  height: 40px;
  width: 100%;
  padding-left: 40px;
  span {
    display: inline-block;
    height: 100%;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    &:nth-child(1) {
      color: #666666;
      margin-right: 20px;
    }
    &:nth-child(2) {
      color: #333333;
    }
  }
}
.conent_e {
  margin-top: 26px;
  text-align: center;
  border-bottom: 2px solid #5bcae7;
  span {
    display: inline-block;
    width: 135px;
    height: 32px;
    line-height: 32px;
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
  }
}
.sdetails {
  padding-top: 20px;
  padding-bottom: 30px;
  box-sizing: border-box;
}
.conent_x {
  height: 40px;
  width: 100%;
  padding-left: 40px;
  box-sizing: border-box;
  span {
    display: inline-block;
    height: 100%;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    &:nth-child(1) {
      color: #666666;
      margin-right: 20px;
    }
    &:nth-child(2) {
      color: #333333;
    }
  }
}
.conent_t {
  width: 410px;
  box-sizing: border-box;
}
.conent_x {
  height: 40px;
  width: 100%;
  padding-left: 40px;
  span {
    display: inline-block;
    height: 100%;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
    min-width: 64px;
    &:nth-child(1) {
      color: #666666;
      margin-right: 20px;
    }
    &:nth-child(2) {
      color: #333333;
      text-align: left;
    }
  }
}

.conent_y {
  box-sizing: border-box;
  width: 100%;
  height: 84px;
  border-top: 1px solid #ccc;
  text-align: center;
  line-height: 84px;
  color: #333333;
  font-size: 18px;
}
.conent_u {
  span {
    min-width: 80px;
  }
  &::before {
    content: "*";
    color: #f56c6c;
  }
}
.conent_i {
  margin-left: 27px;
  border: 1px solid #008aff;
  border-radius: 4px;
  width: 40px;
  height: 24px;
  background-color: #77aaf9;
  opacity: 0.9;
  color: #008aff;
  font-size: 12px;
  cursor: pointer;
}
.conent_h {
  color: #333333;
  font-size: 22px;
  margin: 40px 0 20px 40px;
}
.bigimg {
  margin-left: 43px;
  float: left;
  width: 680px;
  height: 100%;
  img {
    width: 680px;
    height: 390px;
  }
}
.smallimg {
  margin-left: 30px;
  float: left;
  width: 120px;
  height: 100%;
  overflow: hidden;
  ul {
    width: 100%;
    overflow: hidden;
    li {
      width: 100%;
      overflow: hidden;
      height: 100%;
      margin-bottom: 10px;
      &:nth-last-child(1) {
        margin-bottom: 0px;
      }
      img {
        width: 100%;
        height: 69px;
      }
    }
  }
}
.active {
  border: 1px solid #fff;
}
.tovideos {
  padding: 20px 44px;
}
.conent_g {
  margin-top: 20px;
  margin-left: 40px;
  width: 830px;
  height: 129px;
  border: 1px solid #ccc;
  padding: 20px;
  textarea {
    border: none;
    width: 100%;
    height: 129px;
    word-break: normal;
  }
}
.ifgo {
  margin-top: 45px;
  width: 100%;
  padding-left: 40px;
  box-sizing: border-box;
  height: 30px;
  span {
    display: inline-block;
    margin-right: 18px;
    height: 28px;
    width: 80px;
    color: #008aff;
    font-size: 14px;
    text-align: center;
    line-height: 28px;
    border: 1px solid #008aff;
    cursor: pointer;
  }
}
.showorhidden {
  width: 826px;
  height: 126px;
  margin-left: 40px;
  border: solid 1px #008aff;
  overflow: hidden;
  p {
    width: 100%;
    color: #333333;
    font-size: 18px;
    text-align: center;
    margin-top: 15px;
    &:nth-child(2) {
      font-size: 16px;
    }
  }
  div {
    width: 100%;
    margin-top: 20px;
    text-align: center;
    height: 30px;
    span {
      display: inline-block;
      border: 1px solid #008aff;
      text-align: center;
      font-size: 16px;
      height: 28px;
      line-height: 28px;
      width: 96px;
      margin-right: 30px;
      vertical-align: middle;
      color: #008aff;
      cursor: pointer;
    }
  }
}
.conent_j {
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
}
.conent_v {
  border-bottom: 1px solid #ccc;
  margin: 0 40px;
  box-sizing: border-box;
  padding-bottom: 18px;
  margin-bottom: 30px;
}
.conent_l {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 12px;
  span {
    display: inline-block;
    font-size: 16px;
    color: #666666;
    text-align: center;
    min-width: 64px;
    text-align: left;
    &:nth-child(1) {
      margin-right: 20px;
    }
    &:nth-child(2) {
      color: #333333;
    }
    &:nth-child(3) {
      float: right;
      text-align: right;
    }
  }
}
.video-js .vjs-icon-placeholder {
  width: 100%;
  height: 100%;
  display: block;
}
.download_one {
  display: block;
  width: 80px;
  height: 40px;
  float: left;
  font-size: 16px;
  color: #666666;
  line-height: 40px;
  text-align: center;
  margin-right: 20px;
}
ul {
  float: left;
  width: 900px;
  overflow: hidden;
  li {
    width: 100%;
    // height: 40px;
    border-bottom: 2px solid #ccc;
    span {
      display: inline-block;
      line-height: 40px;
      text-align: left;
      margin-right: 20px;
      &:nth-child(1) {
        font-size: 16px;
        color: #666666;
      }
      &:nth-child(2) {
        font-size: 16px;
        color: #333333;
      }
      &:nth-child(3) {
        font-size: 12px;
        width: 40px;
        height: 24px;
        a {
          height: 24px;
          margin-top: 5px;
          line-height: 24px;
          width: 30px;
          border-radius: 4px;
          border: solid 1px #008aff;
          color: #008aff;
          display: block;
          text-align: center;
        }
      }
    }
  }
}
</style>

