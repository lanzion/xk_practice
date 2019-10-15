<template>
  <div class="noaudited">
    <ul v-if="studentWorkList.length">
      <li v-for="item in studentWorkList" :key="item.classId">
        <div :style="{'width':'240px','marginRight':'22px'}">
          <!-- <el-avatar
            icon="el-icon-user-solid"
            :src="item.face"
            :style="{'width':'100px','fontSize':'50px','lineHeight':'92px','height':'100px','margin':'12px 40px'}"
            class="tocenter"
          ></el-avatar> -->
          <el-image :src="item.cover" fit="cover" style="width: 240px;height:125px">
            <div
              slot="error"
              class="image-slot"
              style="font-size: 30px;line-height: 125px;text-align: center;"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <div class="center">
          <h4>{{item.workName}}</h4>
          <p>{{item.className}}</p>
          <span :style="{'display':'block','fontSize':'14px','color':'#666666'}">{{item.userName}}</span>
          <div class="center_t">
            <span>上传时间</span>
            <span>{{item.createDate}}</span>
          </div>
        </div>
        <div class="center_r">
          <span @click="todetils(item.id)">查看详情</span>
        </div>
      </li>
    </ul>
    <div
      v-if="nomore"
      :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
    >
      <img src="~@assets/image/nothingData.svg" alt />
      <div :style="{'lineHeight':'0'}">
        <i :style="{'fontSize':'18px'}">暂无数据...</i>
      </div>
    </div>
    <pagination
      v-if="!nomore"
      :param="pages"
      :total="totalNum"
      @change="getlists"
      style="    text-align: right;"
    ></pagination>
  </div>
</template>
<script>
import { getlistofteachersworks } from "@/api/frontstage";
export default {
  //未审核
  name: "noaudited",
  data() {
    return {
      nomore: false,
      studentWorkList: [],
      pages: {
        pageNum: 1,
        pageSize: 10
      },
    };
  },
  computed: {
    teachernewworks() {
      return this.$store.state.test.teachernewworks;
    }
  },
  created() {
    this.getlists();
  },
  watch: {
    teachernewworks: {
      handler: function() {
        this.getlists();
      }
    },
    "studentWorkList.length": {
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
    todetils(id) {
      this.$router.push({
        name: "atdetails",
        query: { id: id,type:1 }
      });
    },
    async getlists() {
      let res = await getlistofteachersworks(
        { auditStatus: "0", name: this.teachernewworks },
        this.pages
      );
      try {
        let data = res.data.entity;
        this.studentWorkList = data.resultData || [];
        this.totalNum = data.totalNum || 0;
      } catch (err) {
        this.studentWorkList = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.noaudited {
  width: 100%;
  height: 100%;
  min-height: 500px;
  padding: 30px 25px;
  box-sizing: border-box;
  background: #fff;
  ul {
    width: 100%;
    height: 100%;
    li {
      width: 100%;
      height: 168px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 30px;
      &:nth-last-child(1) {
        border-bottom: none;
      }
      div {
        float: left;
        &:nth-last-child(1) {
          float: right;
        }
      }
      .center {
        h4 {
          font-size: 20px;
          color: #333333;
          margin-bottom: 12px;
        }
        p {
          margin-bottom: 12px;
          span {
            font-size: 14px;
            color: #008aff;
            margin-right: 16px;
          }
        }
      }
      .center_t {
        margin-top: 36px;
        span {
          font-size: 14px;
          color: #666666;
          margin-right: 12px;
        }
      }
    }
  }
}
.center_r {
  width: 108px;
  height: 100%;
  span {
    margin-top: 50px;
    display: block;
    height: 38px;
    width: 106px;
    border: solid 1px #008aff;
    border-radius: 4px;
    font-size: 16px;
    color: #008aff;
    line-height: 38px;
    text-align: center;
  }
}
</style>
