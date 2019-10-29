<template>
  <div class="archives">
    <div class="misheader">
      <div>
        <p>
          <span>姓名</span>
          <span>{{datas.name}}</span>
        </p>
        <p>
          <span>证件类型</span>
          <span>{{kis}}</span>
        </p>
        <p>
          <span>学校</span>
          <span>{{datas.schoolName}}</span>
        </p>
      </div>
      <div>
        <p>
          <span>性别</span>
          <span>{{sex}}</span>
        </p>
        <p>
          <span>{{kis}}</span>
          <span>{{datas.certiNum}}</span>
        </p>
        <p>
          <span>手机号</span>
          <span>{{datas.phone}}</span>
        </p>
      </div>
      <div>
        <img :src="datas.face" alt />
      </div>
    </div>
    <div class="misnlist">
      <span class="span1" :style="{'backgroundImage':'url('+imgs+')'}"></span>
      <span class="span2">社会实践</span>
      <span class="span3" :style="{'backgroundImage':'url('+imgs+')',backgroundPositionX:'-310px'}"></span>
    </div>
    <div class="conent_k" v-for="(g,index) in oklist" :key="index">
      <div class="conent_one">
        <div class="conent_fl">
          <div :style="{'margin':'22px 0 0 68px'}">
            <span>实践活动主题名称:</span>
            <span :style="{'color':'#000'}">{{g.activityName}}</span>
          </div>
        </div>
        <div class="conent_fr">
          <div :style="{'margin':'22px 0 0 68px'}">
            <span>实践时间:</span>
            <span>{{g.activityStTime}}~{{g.activityEndTime}}</span>
          </div>
        </div>
      </div>
      <div class="conent_a" v-for="(f,index) in g.works" :key="index">
        <div class="conent_a_l">
          <h5>课程信息</h5>
          <span>课程名称</span>
          <span :style="{'color':'#000'}">{{f.courseName}}</span>
          <span>课程类型</span>
          <span :style="{'color':'#000'}">{{f.courseField}}>{{f.courseType}}</span>
          <span>学习目标</span>
          <span
            class="conent_a_l_txt"
            :style="{'width':'100%','height':'240px','border':'1px solid #ccc','color':'#000','fontSize':'14px','lineHeight':'22px'}"
          >{{f.courseTarget}}</span>
        </div>
        <div class="conent_a_r">
          <h5 :style="{'color':'#000'}">{{f.workName}}</h5>
          <div class="show">
            <div class="showimg">
              <p>作品图片</p>
              <div>
                <img
                  v-for="(d,index) in f.workPicResources"
                  :key="index"
                  :src="d.isFlag == 'y'?d.resourceId:''"
                  alt
                />
              </div>
            </div>
            <div class="showdio">
              <p>作品视频</p>
              <div>
                <video-player
                  v-for="(s,index) in f.workAccResources"
                  :key="index"
                  class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :style="{'width':'256px','marginTop':'22px'}"
                  :playsinline="true"
                  :options="playerOptions"
                ></video-player>
              </div>
            </div>
          </div>
          <div class="overmen">
            <div :style="{'marginLeft':'0'}">
              <span>教师评分:</span>
              <span>{{f.teacherEvalScore}}</span>
            </div>
            <div>
              <span>自我评分:</span>
              <span>{{f.selfEvalScore}}</span>
            </div>
            <div>
              <span>同学评分:</span>
              <span>{{f.othEvalAvgScore}}</span>
            </div>
          </div>
          <div class="teacher_l">
            <span>教师点评:</span>
            <p>{{f.teacherEvalRemark}}</p>
          </div>
          <div class="teacher_l">
            <span>自我点评:</span>
            <p>{{f.selfEvalRemark}}</p>
          </div>
        </div>
        <div class="psto">
          <span>课程{{index+1}}</span>
        </div>
      </div>
    </div>
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
</template>
<script>
import {
    getportfolioview,
    studentmanagementstudentarchivesview
} from '@/api/frontstage'
export default {
    name: 'archives',
    data() {
        return {
            sex: '',
            datas: '',
            kis: '',
            oklist: [],
            nomore: false,
            playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
                autoplay: false, // 如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                        type: '', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src:
              '' // url地址
                    }
                ],
                poster: '../../../../static/img/shipbj.jpg', // 你的封面地址
                // width: document.documentElement.clientWidth, //播放器宽度
                notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true // 全屏按钮
                }
            },
            imgs: require('../../../../../../static/img/biaoqiamchen.png'),
        }
    },
    created() {
        this.$store.commit('changetitle', '档案袋')
        this.getlist()
    },
    watch: {
        'oklist.length': {
            handler(newval, oldval) {
                if (newval == 0 || newval == null || newval == '') {
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
            let id = this.$route.query.studentId
            let res = ''
            if (id) {
                res = await studentmanagementstudentarchivesview({ studentId: id })
            } else {
                res = await getportfolioview()
            }
            if (res.data.entity) {
                this.datas = res.data.entity
                if (this.datas.sex == '6') {
                    this.sex = '未知'
                } else if (this.datas.sex == '7') {
                    this.sex = '男'
                } else if (this.datas.sex == '8') {
                    this.sex = '女'
                } else if (this.datas.sex == '9') {
                    this.sex = '未说明'
                }
                if (this.datas.certiType == '26') {
                    this.kis = '身份证'
                } else if (this.datas.certiType == '27') {
                    this.kis = '中华人民共和国旅行证'
                } else if (this.datas.certiType == '28') {
                    this.kis = '中华人民共和国人出境通行证'
                } else if (this.datas.certiType == '29') {
                    this.kis = '暂住证'
                }
                if (res.data.entity.portfolioInfo) {
                    this.oklist = res.data.entity.portfolioInfo.activities
                } else {
                    this.oklist = []
                }
            } else {
                this.datas = []
            }
            if (res.data.entity.accResources) {
                this.playerOptions.sources[0].src =
          res.data.entity.accResources[0].resourceId || ''
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.vjs-control-bar {
  width: 256px;
}
.video-js .vjs-icon-placeholder {
  width: 100%;
  height: 100%;
  display: block;
}
.archives {
  .misheader {
    height: 202px;
    padding: 17px 20px 0 42px;
    box-sizing: border-box;
    overflow: hidden;
    margin-top: 28px;
    div {
      float: left;
      &:nth-child(1) {
        width: 360px;
        height: 100%;
        margin-right: 60px;
        // margin-top: 22px;
      }
      &:nth-child(2) {
        width: 260px;
        height: 100%;
        margin-right: 86px;
        overflow: hidden;
      }
      &:nth-child(3) {
        width: 121px;
        height: 170px;
        img {
          width: 100%;
        }
      }
      p {
        width: 100%;
        height: 34px;
        overflow: hidden;
        span {
          display: block;
          float: left;
          min-width: 64px;
          font-size: 16px;
          height: 34px;
          line-height: 34px;
          text-align: justify;
        }
        :nth-child(1) {
          color: #666666;
          margin-right: 20px;
          display: inline-block;
          text-align: justify;
          text-justify: distribute-all-lines; /*ie6-8*/
          text-align-last: justify; /* ie9*/
          -moz-text-align-last: justify; /*ff*/
          -webkit-text-align-last: justify; /*chrome 20+*/
          &:after {
            content: "";
            display: inline-block;
            width: 100%;
          }
        }
        :nth-child(2) {
          color: #333333;
          min-width: 80px;
        }
      }
    }
  }
  .misnlist {
    width: 100%;
    height: 75px;
    border-top: 1px solid #e8e8e8;
    border-bottom: 1px solid #e8e8e8;
    text-align: center;
    line-height: 75px;
    margin-bottom: 12px;
    span {
      display: inline-block;
      &:nth-child(1) {
        width: 110px;
        height: 5px;
      }
      &:nth-child(2) {
        font-size: 24px;
        color: #333333;
        margin: 0 20px;
      }
      &:nth-child(3) {
        width: 110px;
        height: 5px;
      }
    }
    .span2 {
      margin: 0 20px;
    }
  }
  .conent_k {
    background: #ebf6ff;
    padding: 0 10px 30px 0;
    margin: 10px;
    .conent_one {
      width: 100%;
      height: 60px;
      overflow: hidden;
      .conent_fl,
      .conent_fr {
        float: left;
        width: 380px;
        height: 100%;
        &:nth-child(1) {
          margin-bottom: 20px;
          &:nth-child(1) {
            font-size: 16px;
            color: #666666;
            margin-right: 20px;
          }
          &:nth-child(2) {
            font-size: 16px;
            color: #333;
          }
        }
        &:nth-child(2) {
          width: 468px;
          &:nth-child(1) {
            font-size: 16px;
            color: #666666;
            margin-right: 20px;
          }
          &:nth-child(2) {
            font-size: 16px;
            color: #333;
          }
        }
      }
    }
    .conent_a {
      position: relative;
      width: 918px;
      height: 538px;
      background: #fff;
      margin-left: 40px;
      padding-bottom: 20px;
      margin-bottom: 20px;
      .conent_a_l {
        height: 100%;
        width: 252px;
        float: left;
        margin-left: 36px;
        h5 {
          height: 42px;
          font-size: 16px;
          text-align: center;
          line-height: 42px;
          border-bottom: 1px solid #ccc;
        }
        span {
          display: block;
          color: #666666;
          font-size: 16px;
          height: 42px;
          font-size: 16px;
          text-align: left;
          line-height: 42px;
          border-bottom: 1px solid #ccc;
        }
      }
      .conent_a_r {
        float: left;
        width: 576px;
        margin-left: 40px;
        h5 {
          height: 42px;
          font-size: 16px;
          text-align: center;
          line-height: 42px;
          border-bottom: 1px solid #ccc;
        }
        .show {
          height: 230px;
          overflow: hidden;
          padding-top: 10px;
          .showimg {
            float: left;
            p {
              width: 20px;
              color: #666666;
              font-size: 16px;
              float: left;
              margin: 85px 7px 0 4px;
            }
            div {
              width: 256px;
              height: 230px;
              float: left;
              img {
                width: 256px;
                height: 230px;
              }
            }
          }
          .showdio {
            float: left;
            p {
              width: 20px;
              color: #666666;
              font-size: 16px;
              float: left;
              margin: 85px 7px 0 4px;
            }
            div {
              width: 256px;
              height: 230px;
              float: left;
            }
          }
        }
      }
    }
  }
}
.overmen {
  height: 58px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  div {
    width: 100px;
    float: left;
    margin-left: 0;
    span {
      display: inline-block;
      height: 100%;
      line-height: 58px;
      &:nth-child(1) {
        font-size: 16px;
        color: #666666;
        margin-right: 5px;
      }
      &:nth-child(2) {
        font-size: 16px;
        color: #666666;
      }
    }
    &:nth-child(1) {
      margin-left: 24px;
      margin-right: 64px;
    }
    &:nth-child(2) {
      margin-right: 64px;
    }
  }
}
.teacher_l {
  width: 100%;
  height: 72px;
  margin-top: 20px;
  span {
    display: block;
    float: left;
    font-size: 16px;
    color: #666666;
    height: 72px;
    width: 74px;
    line-height: 64px;
    margin-right: 20px;
  }
  p {
    float: left;
    font-size: 14px;
    color: #333333;
    width: 458px;
    height: 70px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding: 5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
.psto {
  position: absolute;
  width: 60px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  left: -40px;
  top: 0;
  background-color: #008aff;
  border-radius: 2px;
  span {
    color: #fff;
    font-size: 14px;
  }
}
</style>
