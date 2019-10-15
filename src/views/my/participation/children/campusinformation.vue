<template>
  <div class="campusinformation">
    <div class="container">
      <div class="container_l">
        <div class="aggregate_one">
          <div class="aggregate_one_t">
            <ul class="aggregate_one_t_u">
              <li>最新资讯</li>
            </ul>
          </div>
          <div class="aggregate_one_q">
            <ul class="aggregate_one_t_w">
              <li @click="letgo(j.id)" v-for="(j,index) in goods" :key="index">
                <span>{{j.title}}</span>
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
          </div>
        </div>
      </div>
      <div class="container_r">
        <div class="aggregate_two">
          <!-- 1 -->
          <div class="aggregate_two_q">
            <div class="aggregate_two_q_l">
              <span>校园资讯</span>
            </div>
            <div class="aggregate_two_q_r">
              <el-input
                placeholder="请输入资讯标题"
                v-model="input3"
                @keyup.native.enter="resetPage"
                class="input-with-select"
              >
                <el-button slot="append" icon="el-icon-search" @click="resetPage"></el-button>
              </el-input>
            </div>
          </div>
          <div class="container_margin">
            <ul>
              <li
                class="container_margin_li"
                @click="letgo(a.id)"
                v-for="(a,index) in datas"
                :key="index"
              >
                <div class="container_conent">
                  <div class="container_conent_title">
                    <span>{{a.title}}</span>
                  </div>
                  <div class="container_conent_time">
                    <span>{{a.createDate}}</span>
                  </div>
                  <div class="container_conent_show">{{a.remark}}</div>
                </div>
              </li>
            </ul>
            <div
              v-if="nomoretwo"
              :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
            >
              <img src="~@assets/image/nothingData.svg" alt />
              <div :style="{'lineHeight':'0'}">
                <i :style="{'fontSize':'18px'}">暂无数据...</i>
              </div>
            </div>
          </div>
          <div class="aggregate_two_h" v-if="!nomoretwo">
            <div class="block" :style="{'float':'right','paddingRight':'20px'}">
              <pagination
                :param="pages"
                :page-sizes="[16, 24, 32]"
                :total="totalNum"
                @change="getlists"
              ></pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getalistofinformation } from "@/api/frontstage";
export default {
  name: "campusinformation",
  data() {
    return {
      input3: "",
      datas: [],
      goods: [],
      nomore: false,
      nomoretwo: false,
      pages: {
        pageNum: 1,
        pageSize: 16
      }
    };
  },
  watch: {
    "goods.length": {
      handler(newval, oldval) {
        if (newval === 0) {
          this.nomore = true;
        } else {
          this.nomore = false;
        }
      },
      deep: true
    },
    "datas.length": {
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
  created() {
    this.getlists();
  },
  methods: {
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getlists();
    },
    async getlists() {
      let nid = localStorage.getItem("sid");
      let oid = this.$route.query.id;
      let id = "";
      if (oid) {
        id = oid;
      } else {
        id = nid;
      }
      let res = await getalistofinformation(
        { orgId: id, orgType: "C", title: this.input3 },
        this.pages
      );
      this.datas = res.data.entity.resultData;
      this.totalNum = res.data.entity.totalNum;
      let goods = await getalistofinformation(
        {
          orgId: id,
          orgType: "C",
          isrecommend: "A"
        },
        this.pages
      );
      this.goods = goods.data.entity.resultData;
    },
    letgo(id) {
      localStorage.setItem("xid", id);
      this.$router.push({
        path: "/schoolinformationdetails",
        query: { id: id }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.diyt {
  min-height: 500px;
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
.container {
  height: 100%;
  overflow: hidden;
  margin-bottom: 64px;
  margin-top: 20px;
  .aggregate_one {
    float: left;
    width: 240px;
    background: #fff;
    .aggregate_one_t {
      width: 100%;
      height: 40px;
      background-color: #fc8230;
      .aggregate_one_t_u {
        width: 100%;
        li {
          width: 50%;
          float: left;
          text-align: center;
          line-height: 40px;
          color: #ffffff;
          font-size: 16px;
        }
      }
    }
    .aggregate_one_q {
      width: 100%;
      .aggregate_one_t_w {
        width: 100%;
        padding: 14px 7px;
        box-sizing: border-box;
        li {
          width: 100%;
          height: 30px;
          cursor: pointer;
          &:hover {
            span {
              color: #008aff;
            }
          }
          span {
            display: block;
            float: left;
            height: 30px;
            line-height: 30px;
            font-size: 12px;
            color: #666666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:nth-child(1) {
              width: 75%;
              &::before {
                content: "*";
                width: 3px;
                height: 3px;
                margin-right: 10px;
              }
            }
            &:nth-child(2) {
              width: 25%;
            }
          }
        }
      }
    }
  }
  .aggregate_two {
    float: right;
    width: 930px;
    min-height: 800px;
    .aggregate_two_q {
      width: 100%;
      height: 60px;
      background: #fff;
      border-bottom: 1px solid #ccc;
      .aggregate_two_q_l {
        float: left;
        height: 60px;
        span {
          display: block;
          float: left;
          line-height: 60px;
          text-align: center;
          &:nth-child(1) {
            width: 100px;
            height: 100%;
            color: #333333;
            font-size: 16px;
            line-height: 60px;
          }
          &:nth-child(2) {
            width: 200px;
            height: 32px;
          }
        }
      }
      .aggregate_two_q_r {
        float: right;
        height: 60px;
        line-height: 60px;
        width: 230px;
        margin-right: 10px;
      }
    }
    .aggregate_two_z {
      width: 100%;
      height: 40px;
      background: #fff;
      overflow: hidden;
      border-bottom: 4px solid #fc8230;
      .aggregate_two_z_l {
        height: 100%;
        width: 110px;
        height: 34px;
        margin-top: 8px;
        margin-left: 25px;
        float: left;
        span {
          display: inline-block;
          width: 100%;
          height: 100%;
          background: #fc8230;
          border-radius: 4px 4px 0px 0px;
          color: #fff;
          font-size: 18px;
          text-align: center;
          line-height: 34px;
          cursor: pointer;
        }
      }
      .aggregate_two_z_r {
        float: right;
        height: 34px;
        margin-top: 8px;
        span {
          width: 100px;
          text-align: center;
          line-height: 34px;
          display: block;
          float: left;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
}
.aggregate_two_h {
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.block {
  padding-bottom: 50px;
}
.active {
  color: #008aff;
}
.container_margin {
  padding-bottom: 30px;
  background: #fff;
  padding: 20px;
  padding-top: 0px;
  box-sizing: border-box;
  .container_margin_li {
    border-bottom: 1px solid #ccc;
    padding-bottom: 20px;
    cursor: pointer;
    &:hover {
      .container_conent {
        .container_conent_title {
          span {
            color: #008aff;
          }
        }
      }
    }
  }
}
.container_conent {
  overflow: hidden;
  width: 100%;
  .container_conent_title {
    width: 100%;
    height: 54px;
    span {
      display: inline-block;
      line-height: 54px;
      width: 100%;
      height: 54px;
      font-size: 16px;
      color: #333333;
    }
  }
  .container_conent_time {
    width: 100%;
    height: 30px;
    span {
      display: inline-block;
      width: 100%;
      height: 30px;
      line-height: 8px;
      font-size: 12px;
      color: #999999;
    }
  }
  .container_conent_show {
    width: 100%;
    color: #666666;
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    line-height: 24px;
  }
}
</style>