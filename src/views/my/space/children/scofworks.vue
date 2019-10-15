<template>
  <div class="scofworks" v-if="JSON.stringify(entity)!='{}'">
    <div class="conent_x">
      <span>课程名称</span>
      <span>{{entity.courseInfo.name}}</span>
    </div>
    <div class="conent_x">
      <span>学习目标</span>
      <span>{{entity.courseInfo.target}}</span>
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
        <span>{{entity.courseInfo.name}}</span>
      </div>
      <div class="conent_x">
        <span>课程类型</span>
        <span>{{entity.courseInfo.courseTypeName}}>{{entity.courseInfo.courseTypeParentName}}</span>
      </div>
      <div class="conent_x">
        <span>学习目标</span>
        <span>{{entity.courseInfo.target}}</span>
      </div>
      <div class :style="{'paddingLeft':'40px','margin':'20px 0','overflow':'hidden'}">
        <span
          :style="{'display':'inline-block','fontSize':'16px','color':'#666','vertical-align':'top','margin-right':'20px'}"
        >课程内容</span>
        <span
          :style="{'fontSize':'16px','color':'#333','display':'inline-block','height':'160px','width':'676px','border':'1px solid #ccc','overflowY':'auto'}"
        >{{entity.courseInfo.content}}</span>
      </div>

      <div class="download">
        <span class="download_one" :style="{'textAlign':'left','width':'64px'}">活动资源</span>
        <ul>
          <li v-for="(item,index) in entity.courseInfo.courseResources" :key="item.id">
            <span>附件{{index+1}}</span>
            <span>{{item.resourceName}}</span>
            <span>
              <a
                :href="item.resourceId"
                @click.prevent="downloadItem(item.resourceId,item.resourceName)"
                :style="{border:'1px solid #008aff'}"
              >下载</a>
            </span>
          </li>
        </ul>
      </div>

      <div v-for="(k,index) in entity.courseInfo.courseClassServers" :key="index">
        <div :style="{'height':'auto','overflow':'hidden'}">
          <div class="conent_t" :style="{'float':'left'}">
            <div class="conent_x">
              <span>上课年级</span>
              <span>{{k.gradeName}}</span>
            </div>
            <div class="conent_x" :style="{'width':'800px'}">
              <span>上课时间</span>
              <span>{{k.startDate}}~{{k.endDate}}</span>
            </div>
          </div>

          <div class="conent_t" :style="{'float':'left'}">
            <div class="conent_x">
              <span>上课班级</span>
              <span>{{k.className}}</span>
            </div>
          </div>
        </div>
        <div class="conent_x">
          <span>活动基地</span>
          <span>{{k.baseinfoName}}</span>
        </div>
        <div class="conent_x">
          <span>基地地址</span>
          <span>{{k.baseAddress}}</span>
        </div>
        <div class="conent_x">
          <span>参与服务</span>
          <span>{{k.serverTitle}}</span>
        </div>
        <div class :style="{'paddingLeft':'40px','margin':'20px 0','overflow':'hidden'}">
          <span
            :style="{'display':'inline-block','fontSize':'16px','color':'#666','vertical-align':'top','margin-right':'20px'}"
          >服务内容</span>
          <span
            :style="{'fontSize':'16px','color':'#333','display':'inline-block','height':'160px','width':'676px','border':'1px solid #ccc','overflowY':'auto'}"
          >{{k.serverExpound}}</span>
        </div>
        <div class="conent_x" :style="{'position':'relative'}">
          <span class="conent_u">负责人</span>
          <span>{{k.serverPersonInCharge}}</span>
          <div class="conent_x" :style="{'position':'absolute','right':'-410px','top':'0px'}">
            <span class="conent_u">联系方式</span>
            <span>{{k.serverPersonInChargePhone}}</span>
          </div>
        </div>
        <div class="conent_x">
          <span class="conent_u">活动位置</span>
          <span>{{k.serverAddress}}</span>
        </div>
      </div>
    </div>

    <div>
      <h3 class="conent_h">作品信息</h3>
    </div>
    <div class="conent_x">
      <span>作品名称</span>
      <span>{{entity.createName}}</span>
    </div>
    <div class :style="{'paddingLeft':'40px','margin':'20px 0','overflow':'hidden'}">
      <span
        :style="{'display':'inline-block','fontSize':'16px','color':'#666','vertical-align':'top','margin-right':'20px'}"
      >作品介绍</span>
      <span
        :style="{'fontSize':'16px','color':'#333','display':'inline-block','width':'676px'}"
      >{{entity.description}}</span>
    </div>
    <div class="conent_x">
      <span>作者班级</span>
      <span>{{entity.className}}</span>
    </div>
    <div class="conent_x">
      <span>姓名</span>
      <span>{{entity.createName}}</span>
    </div>
    <div class="conent_x">
      <span>上传时间</span>
      <span>{{entity.updateDate}}</span>
    </div>
    <div :style="{'borderBottom':'1px solid #ccc','width':'100%','height':'20px'}"></div>
    <div>
      <h3 class="conent_h">作品图片</h3>
    </div>
    <div :style="{'width':'100%','height':'390px'}">
      <div class="bigimg">
        <img ref="imgsrc" :src="entity.picResources[0].resourceId" alt />
      </div>
      <div class="smallimg">
        <ul>
          <li
            v-for="(item,index) in entity.picResources"
            :key="index"
            @click="giveimg(item,index)"
            :class="index === num ?'active':''"
          >
            <img :src="item.resourceId" alt />
          </li>
        </ul>
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
    <div>
      <h3 class="conent_h">作品评分</h3>
    </div>

    <div :style="{padding:'40px'}">
      <div class="scoreover">
        <ul class="u1">
          <li class="r1">评分项目</li>
          <li class="r1">评分内容</li>
          <li class="r1">评分标准</li>
          <li class="r1">评分分值</li>
          <li class="r1">评分</li>
        </ul>
      </div>
      <div class="scoretime" v-for="(g,index) in entity.eval.evalItems" :key="index">
        <div
          class="m1"
          :style="{height:50*g.defContentItems.length+'px',lineHeight:50*g.defContentItems.length+'px'}"
        >{{g.defProjectName}}</div>
        <div class="m2">
          <ul class="p1" v-for="(k,index) in g.defContentItems" :key="index">
            <li>{{k.defContentName}}</li>
            <li
              class="qwe"
              :attr="k.defStandardItems[0].id"
            >{{k.defStandardItems[0].defStandardName}}</li>
            <li class="asd">{{k.defStandardItems[0].defStandardScore}}</li>
            <li>
              <input
                :style="{'background':'#fff'}"
                type="text"
                @input="changipt(k.defStandardItems)"
                :disabled="type === 2"
                :placeholder="k.defStandardItems[0].actualScore"
                maxlength="3"
                name
                id
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="scoretotle">
        <ul>
          <li>总分</li>
          <li>
            <input
              type="text"
              :style="{'background':'#fff'}"
              :disabled="type === 2"
              v-model="totle"
              name
              id
            />
          </li>
        </ul>
      </div>
    </div>

    <div :style="{'boxSizing':'border-box'}">
      <h3 class="conent_h">评语</h3>
    </div>
    <div class="conent_g" v-if="type===1">
      <textarea type v-model="remark" placeholder="请填写本次评语" />
    </div>
    <div class="conent_g" v-if="type===2">
      <textarea
        type
        v-model="remark"
        :disabled="type === 2"
        :placeholder="placeholder"
        :style="{'background':'#fff'}"
      />
    </div>
    <div class="btngo" v-if="type == 1">
      <span @click="quxiao()">取消</span>
      <span @click="baocun()">保存</span>
    </div>
    <div class="btngo" v-else-if="type == 2">
      <span @click="quxiao()">返回</span>
    </div>
  </div>
</template>
<script>
import {
  detailsofteacherevaluationnotevaluated,
  teacherevaluationsubmission,
  detailsofteacherevaluationevaluated
} from "@/api/frontstage";
export default {
  name: "scofworks",
  data() {
    return {
      totle: "",
      busId: "",
      remark: "",
      evaluationTemplateId: "",
      placeholder: "",
      cmmtEvalItems: [],
      type: "",
      from: {
        kda: "",
        id: ""
      },
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
      istrue: 0,
      num: 0,
      sum: false,
      imgurl01: require("../../../../../static/img/kechen1.png"),
      imgurl02: require("../../../../../static/img/kechen2.png"),
      entity: {}
    };
  },
  watch: {},
  created() {
    let rid = localStorage.getItem("busId");
    let busId = this.$route.params.busId;
    let type = this.$route.params.type;
    let id = "";
    if (busId) {
      id = busId;
    } else {
      id = rid;
    }
    this.busId = id;
    this.getlist(id, type);
  },
  computed: {},
  methods: {
    async baocun() {
      let res = await teacherevaluationsubmission({
        evaluationTemplateId: this.evaluationTemplateId,
        busId: this.busId,
        busName: this.busName,
        totalScore: this.totle,
        remark: this.remark,
        cmmtEvalItems: this.cmmtEvalItems
      });
      // console.log(res);
      if (res.data.code === 201) {
        this.$message({
          message: "评语不能为空或分数不能为空",
          type: "warning"
        });
      } else if (res.data.code === 200) {
        this.$message({
          message: "提交成功",
          type: "success"
        });
        this.$router.push({ path: "/wscoring/origs" });
      }
    },
    changipt() {
      let res = document.getElementsByTagName("input");
      let sum = new Number();
      this.cmmtEvalItems = [];
      let qwe = document.getElementsByClassName("qwe");
      let poi = document.getElementsByClassName("asd");
      for (let i = 0; i < res.length - 1; i++) {
        let asd = qwe[i].attributes.attr.value;

        let lkj = poi[i].innerText;

        let zxc = res[i].value;

        if (parseInt(zxc) > parseInt(lkj)) {
          zxc = lkj;
          res[i].value = lkj;
        }
        if (zxc < 0) {
          res[i].value = 0;
        }
        this.from = {
          definiionItemId: asd,
          score: zxc
        };
        this.cmmtEvalItems.push(this.from);
        sum += Number(res[i].value);
      }
      this.totle = sum;
    },
    async getlist(id, type) {
      let res = "";
      // console.log(type);
      if (type == 1) {
        this.type = 1;
        res = await detailsofteacherevaluationnotevaluated({ busId: id });
        this.entity = res.data.entity || {};
      }
      if (type == 2) {
        this.type = 2;
        res = await detailsofteacherevaluationevaluated({ busId: id });
        // console.log(res);
        if (res.data.entity.eval) {
          this.totle = res.data.entity.eval.totalScore;
          this.placeholder = res.data.entity.eval.remark || "";
        }

        this.entity = res.data.entity || {};
      }
      this.busName = this.entity.createName;
      if (this.entity.accResources) {
         if( res.data.entity.accResources[0]){
           this.playerOptions.sources[0].src = res.data.entity.accResources[0].resourceId || "";
         }
      }else{
        this.playerOptions.sources[0].src = ''
      }
      if (this.entity.eval) {
        this.evaluationTemplateId = this.entity.eval.evaluationTemplateId || "";
      } else {
        this.evaluationTemplateId = "";
      }
    },
    changes() {
      this.istrue = !this.istrue;
    },
    giveimg(item, index) {
      this.$refs.imgsrc.src = item.resourceId;
      this.num = index;
    },
    passto() {
      this.sum = !this.sum;
    },
    quxiao() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.scoretotle {
  width: 800px;
  height: 50px;
  overflow: hidden;
  border: 1px solid #ccc;
  border-top: none;
  ul {
    overflow: hidden;
    li {
      height: 50px;
      float: left;
      line-height: 50px;
      text-align: center;
      &:nth-child(1) {
        width: 100px;
        border-right: 1px solid #ccc;
      }
      &:nth-child(2) {
        width: 699px;
        input {
          width: 100%;
          height: 50px;
          border: none;
          text-align: center;
        }
      }
    }
  }
}
.scoreover {
  width: 800px;
  height: 50px;
  border: 1px solid #ccc;
  ul {
    overflow: hidden;
    li {
      width: 170px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-right: 1px solid #ccc;
      float: left;
      &:nth-child(1) {
        width: 100px;
        border-right: 1px solid #ccc;
      }
      &:nth-last-child(1) {
        border-right: none;
      }
    }
  }
}
.scoretime {
  width: 800px;
  height: 100%;
  overflow: hidden;
  border: 1px solid #ccc;
  border-top: none;
  .m1 {
    float: left;
    width: 100px;
    text-align: center;
    // border-right: 1px solid #ccc;
  }
  .m2 {
    float: left;
    width: 696px;
    height: 100%;
    .p1 {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border: 1px solid #ccc;
      border-bottom: none;
      border-right: none;
      font-style: 0;
      &:nth-child(1) {
        border-top: none;
      }
      li {
        list-style: none;
        display: block;
        float: left;
        width: 170px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-right: 1px solid #ccc;
        &:nth-last-child(1) {
          border-right: none;
          width: 180px;
        }
        input {
          width: 100%;
          height: 50px;
          border: none;
          text-align: center;
          -moz-appearance: textfield;
        }
      }
    }
  }
}
.download {
  width: 100%;
  overflow: hidden;
  padding-left: 40px;
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
      height: 40px;
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
          color: #999999;
          width: 40px;
          height: 24px;
          border-radius: 4px;
          a {
            display: block;
            width: 30px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border: 1px solid #008aff;
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
  width: 420px;
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
.video-js .vjs-icon-placeholder {
  width: 100%;
  height: 100%;
  display: block;
}
.scofworks {
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
  width: 420px;
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
    width: 100%;
    height: 390px;
  }
}
.smallimg {
  margin-left: 30px;
  float: left;
  width: 120px;
  height: 100%;
  ul {
    width: 100%;
    li {
      width: 100%;
      height: 69px;
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
  video {
    width: 898px;
  }
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
.inpover {
  border: none;
  text-align: center;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
}
.pos {
  width: 100%;
  height: 48px;
  border: 1px solid #ebeef5;
  border-top: none;
  div {
    &:nth-child(1) {
      float: left;
      height: 48px;
      width: 226px;
      border-right: 1px solid #ebeef5;
    }
    &:nth-child(2) {
      float: left;
      width: 100%;
      height: 48px;
    }
  }
}
.tables {
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  ul {
    position: relative;
    width: 100%;
    height: 300px;
    font-size: 0px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-left: none;
    border-bottom: none;
    border-right: none;
    li {
      border-left: 1px solid #ccc;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      width: 25%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 14px;
      color: #333;
      display: inline-block;
      &:nth-last-child(1) {
        position: absolute;
        right: 0;
        bottom: 11px;
        width: 75%;
        border-right: 1px solid #ccc;
      }
      &:nth-last-child(2) {
        position: absolute;
        left: 0;
        bottom: 11px;
      }
      &:nth-child(4n) {
        border-right: 1px solid #ccc;
      }
    }
  }
}
.btngo {
  margin: 40px 0;
  padding: 0 40px;
  height: 40px;
  width: 100%;
  text-align: right;
  box-sizing: border-box;
  span {
    display: inline-block;
    font-size: 16px;
    width: 75px;
    height: 35px;
    border-radius: 10px;
    text-align: center;
    line-height: 35px;
    color: #fff;
    cursor: pointer;
    &:nth-child(1) {
      background: #cccccc;
    }
    &:nth-child(2) {
      background: #008aff;
      margin-left: 20px;
    }
  }
}
</style>