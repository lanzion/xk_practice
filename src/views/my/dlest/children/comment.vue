<template>
  <div class="timeer">
    <div class="comment" v-for="(g,index) in datas" :key="index">
      <div class="lintest">
        <p>{{g.content}}</p>
      </div>
      <div class="comment_down">
        <!-- <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 3" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>-->
        <img v-for="(j,index) in g.resourceVoList" :key="index" :src="j.resourceId" alt />
      </div>
      <div class="comment_time">
        <span>{{g.createDate}}</span>
      </div>
      <div class="comment_min">
        <div>
          <img :src="g.baseSchoolVo.cover" alt />
        </div>
        <div>
          <p>{{g.baseSchoolVo.schoolName}}</p>
          <p>{{g.baseSchoolVo.address}}</p>
          <p>{{g.baseSchoolVo.remark}}</p>
        </div>
      </div>
    </div>
    <div
      v-if="nomore"
      :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
    >
      <img src="~@assets/image/nothingData.svg" alt />
      <div :style="{'lineHeight':'0'}">
        <i :style="{'fontSize':'18px'}">暂无数据...</i>
      </div>
    </div>
    <div class="block" :style="{'float':'right','overflow':'hidden'}" v-if="!nomore">
      <pagination :param="pages" :page-sizes="[10, 15, 20]" :total="totalNum" @change="getcomment"></pagination>
    </div>
  </div>
</template>
<script>
import { getcommentsonactivities } from "@/api/frontstage";
export default {
  // 点评
  name: "comment",
  data() {
    return {
      datas: "",
      nomore: false
    };
  },
  created() {
    this.getcomment();
  },
  watch: {
    "datas.length": {
      handler(newval, oldval) {
        if (newval === 0) {
          this.nomore = true;
        } else {
          this.nomore = false;
        }
      },
      deep: true
    }
  },
  methods: {
    async getcomment() {
      let id = localStorage.getItem("activeid");
      let datas = await getcommentsonactivities({ activityId: id }, this.pages);
      this.datas = datas.data.entity.resultData || [];
      this.totalNum = datas.data.entity.totalNum || 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.timeer {
  min-height: 600px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.comment {
  width: 100%;
  min-height: 600px;
  background: #fff;

  .lintest {
    width: 100%;
    padding: 30px 40px 25px 40px;
    p {
      font-size: 16px;
      color: #0f151e;
      width: 100%;
      overflow: hidden;
    }
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.comment_down {
  width: 100%;
  overflow: hidden;
  padding: 0 40px;
  box-sizing: border-box;
  margin-bottom: 20px;
  img {
    width: 200px;
    height: 200px;
    margin-right: 5px;
    display: inline-block;
  }
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.comment_time {
  margin-top: 10px;
  padding: 10px 50px;
  margin-bottom: 10px;
  span {
    font-size: 14px;
    color: #cccccc;
  }
}
.comment_min {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 40px;
  height: 90px;
  div {
    &:nth-child(1) {
      // background: #d6d6d6;
      width: 120px;
      height: 120px;
      // border-radius: 50%;
      float: left;
      margin-right: 30px;
      img {
        width: 120px;
        height: 120px;
      }
    }
    &:nth-child(2) {
      float: left;
      width: 300px;
      p {
        font-size: 16px;
        color: #333333;
        margin-bottom: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:nth-child(2){
          font-size: 14px;
          color:#666;
        }
        &:nth-child(3){
          font-size: 14px;
          color:#666;
        }
      }
    }
  }
}
</style>
