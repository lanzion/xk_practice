<template>
  <div class="studentcoursedetails">
    <div class="conent_x">
      <span>课程名称</span>
      <span>{{datas.name}}</span>
    </div>
    <div class="conent_x">
      <span>课程类型</span>
      <span>{{datas.courseTypeParentName}}>{{datas.courseTypeName}}</span>
    </div>
    <div class="conent_x">
      <span>学习目标</span>
      <span>{{datas.target}}</span>
    </div>
    <div class :style="{'paddingLeft':'40px','margin':'20px 0','overflow':'hidden'}">
      <span
        :style="{'display':'inline-block','fontSize':'16px','color':'#666','vertical-align':'top','margin-right':'20px'}"
      >课程内容</span>
      <span
        :style="{'fontSize':'16px','color':'#333','display':'inline-block','height':'160px','width':'676px','border':'1px solid #ccc','overflowY':'auto'}"
      >{{datas.content}}</span>
    </div>

    <div class="download">
      <span class="download_one" :style="{width:'64px'}">活动资源</span>
      <ul>
        <li v-for="(item,index) in datas.courseResources" :key="index">
          <span>附件{{index+1}}</span>
          <span>{{item.resourceName}}</span>
          <span>
            <a :href="item.resourceId" @click.prevent="downloadItem(item.resourceId,item.resourceName)">下载</a>
          </span>
        </li>
      </ul>
    </div>

    <div :style="{'height':'auto','marginBottom':'20px','overflow':'hidden'}">
      <div class="conent_t" :style="{'float':'left'}">
        <div class="conent_x">
          <span>上课年级</span>
          <span>{{datas.gradeName}}</span>
        </div>
        <div class="conent_x" :style="{width:'600px'}">
          <span>上课时间</span>
          <span>{{datas.startDate}}--{{datas.endDate}}</span>
        </div>
      </div>

      <div class="conent_t" :style="{'float':'left'}">
        <div class="conent_x">
          <span>上课班级</span>
          <span>{{datas.className}}</span>
        </div>
      </div>
    </div>
    <div class="conent_x">
      <span>活动基地</span>
      <span>{{datas.baseinfoName}}</span>
    </div>
    <div class="conent_x">
      <span>基地地址</span>
      <span>{{datas.baseAddress}}</span>
    </div>
    <div class="conent_x">
      <span>参与服务</span>
      <span>{{datas.serverTitle}}</span>
    </div>
    <div class :style="{'paddingLeft':'40px','margin':'20px 0','overflow':'hidden'}">
      <span
        :style="{'display':'inline-block','fontSize':'16px','color':'#666','vertical-align':'top','margin-right':'20px'}"
      >服务详情</span>
      <span
        :style="{'fontSize':'16px','color':'#333','display':'inline-block','height':'160px','width':'676px','border':'1px solid #ccc','overflowY':'auto'}"
      >{{datas.serverExpound}}</span>
    </div>
    <div class="conent_x" :style="{'position':'relative'}">
      <span class="conent_u">负责人</span>
      <span>{{datas.serverPersonInCharge}}</span>
      <div class="conent_x" :style="{'position':'absolute','right':'-410px','top':'0px'}">
        <span class="conent_u">联系方式</span>
        <span>{{datas.serverPersonInChargePhone}}</span>
      </div>
    </div>
    <div class="conent_x">
      <span class="conent_u">活动位置</span>
      <span>{{datas.serverAddress}}</span>
    </div>
    <div :style="{'textAlign':'center','marginTop':'40px'}">
      <el-button type="primary" @click="goback()">返回列表</el-button>
    </div>
  </div>
</template>
<script>
import { getdetailsofstudentcourses } from '@/api/frontstage'
export default {
    name: 'studentcoursedetails',
    data() {
        return {
            datas: []
        }
    },
    created() {
        let gid = localStorage.getItem('gid')
        // console.log(gid);
        let courseId = this.$route.query.id
        // console.log(courseId);
        let id = ''
        if (courseId) {
            id = courseId
        } else {
            id = gid
        }
        this.getdatas(id)
    },
    methods: {
        goback() {
            this.$router.go(-1)
        },
        xiazia(id) {
            window.location.href = id
        },
        async getdatas(id) {
            let res = await getdetailsofstudentcourses({ id: id })
            // console.log(res);
            this.datas = res.data.entity
        }
    }
}
</script>
<style lang="scss" scoped>
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
          width: 40px;
          height: 40px;
          a {
            display: block;
            width: 30px;
            height: 20px;
            line-height: 20px;
            border-radius: 4px;
            border: solid 1px #008aff;
            margin-top: 5px;
            text-align: center;
            color: #008aff;
          }
        }
      }
    }
  }
}
.studentcoursedetails {
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
    text-align: left;
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
    text-align: left;
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
</style>
