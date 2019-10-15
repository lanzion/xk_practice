<template>
  <div class="goodscard">
    <div>
      <div class="goodscard_fl">
        <el-image :src="list.cover" fit="cover" style="width: 600px;height:404px">
          <div
            slot="error"
            class="image-slot"
            style="font-size: 30px;line-height: 404px;text-align: center;"
          >
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div class="goodscard_fr">
        <div class="goodscard_fr_title">
          <h4>{{list.name}}</h4>
          <!--   <div>
            <span>9</span>
            <span>
              <img :src="imgiconw" alt />9
            </span>
            <span>
              <img :src="imgiconq" alt />9
            </span>
          </div>-->
        </div>
        <!-- <div class="goodscard_fine">
          <div>
            <img :src="imgiconwz" alt />
            <span>班级:</span>
            <span v-for="(item, index) in classname" :key="index">{{item.className}}</span>
             <span v-for="(item, index) in classname" :key="index">{{item.className}}</span>
              <span v-for="(item, index) in classname" :key="index">{{item.className}}</span>
          </div> -->
          <!-- <div>
                    <img :src="imgiconwx" alt />
                    <span>代课老师：李菲菲</span>
          </div>-->
        <!-- </div> -->
        <div class="goodscard_cli">
          <div>
            <img :src="imgiconws" alt />
            <span>课程类型:{{list.courseTypeParentName}}>{{list.courseTypeName}}</span>
          </div>
        </div>
        <div class="goodscard_btn">
          <div>
            <img :src="imgiconwt" alt />
            <span>课程目标：</span>
          </div>
          <div>{{list.target}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getcoursedetails } from "@/api/frontstage";
export default {
  data() {
    return {
      list: [],
      content: "",
      classname: [],
      imgiconw: require("../../../../../static/img/shoucang.png"),
      imgiconwz: require("../../../../../static/img/banji.png"),
      imgiconwx: require("../../../../../static/img/ren.png"),
      imgiconws: require("../../../../../static/img/leixing.png"),
      imgiconwt: require("../../../../../static/img/mubiao.png")
    };
  },
  created() {
    this.getgoods();
  },
  computed: {
    courseId() {
      return this.$store.state.test.courseId;
    }
  },
  methods: {
    async getgoods() {
      let mid = localStorage.getItem("mid");
      // let schoolId = sessionStorage.getItem("schoolid") || "";
      let bid = this.$route.query.id;
      let id = "";
      if (bid) {
        id = bid;
      } else {
        id = mid;
      }
      const data = await getcoursedetails({ id: id });
      // console.log(data);
      this.list = data.data.entity;
      this.content = this.list.content;
      this.classname = this.list.classDtoList;
      this.$store.commit("changeconent", this.content);
    }
  }
};
</script>
<style lang="scss" scoped>
.goodscard {
  height: 400px;
  background: #fff;
  padding: 28px 24px;
  .goodscard_fl {
    float: left;
    width: 600px;
    margin-right: 30px;
    img {
      width: 100%;
    }
  }
  .goodscard_fr {
    width: 514px;
    height: 100%;
    float: left;
    .goodscard_fr_title {
      margin-bottom: 34px;
      height: 42px;
      h4 {
        float: left;
        width: 220px;
        height: 42px;
        font-size: 22px;
        line-height: 42px;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      div {
        float: right;
        font-size: 16px;
        color: #cccccc;
        line-height: 42px;
        span {
          img {
            display: inline;
          }
          margin-left: 50px;
        }
      }
    }
    .goodscard_fine {
      height: 40px;
      div {
        height: 40px;
        img {
          display: inline;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          font-size: 14px;
          color: #333333;
        }
        &:nth-child(1) {
          float: left;
        }
        &:nth-child(2) {
          float: right;
          span {
            margin-right: 82px;
          }
        }
      }
    }
    .goodscard_cli {
      height: 40px;
      div {
        height: 40px;
        img {
          display: inline;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          font-size: 14px;
          color: #333333;
        }
      }
    }
    .goodscard_btn {
      height: 40px;
      div {
        height: 40px;
        img {
          display: inline;
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
          font-size: 14px;
          color: #333333;
        }
        &:nth-child(1) {
          width: 100px;
          float: left;
        }
        &:nth-child(2) {
          width: 400px;
          height: 126px;
          border: 1px solid #ccc;
          border-radius: 5px;
          float: left;
          padding: 10px;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
