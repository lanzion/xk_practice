<template>
  <div class="baseevaluation">
    <div class="conent_for">
      <div class="listsdetail_fl_two_m">
        <h4>评论</h4>
        <div class="listsdetail_fl_two_m_b">
          <ul>
            <li class="listsdetail_fl_two_m_s" v-for="(g,index) in datas" :key="index">
              <div class="listsdetail_fl_two_m_s_one">
                <el-avatar :size="80" :src="g.reviewerCover" @error="errorHandler">
                  <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                </el-avatar>
              </div>
              <div class="listsdetail_fl_two_m_s_two">
                <p>
                  <span>{{g.reviewerName}}</span>
                  <span>({{g.reviewerIdentity}})</span>
                  <span>{{g.reviewerSchool}}</span>
                </p>
                <span class="textone">{{g.remark}}</span>
                <div class="textimg">
                  <img :src="f.resourceId" alt v-for="(f,index) in g.resources" :key="index" />
                </div>
                <span class="texttwo" :style="{'fontSize':'12px'}">{{g.createDate}}</span>
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

          <div v-if="!nomore" class="block" :style="{'float':'right','margin':'30px 0'}">
            <pagination
              :param="pages"
              :page-sizes="[10, 15, 20]"
              :total="totalNum"
              @change="getlist"
            ></pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getbaseevaluationlist } from "@/api/frontstage";
export default {
  name: "baseevaluation",
  data() {
    return {
      datas: [],
      nomore: false,
      pages: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.getlist();
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
    errorHandler() {
      return true;
    },
    async getlist() {
      let kid = localStorage.getItem("zid");
      let oid = this.$route.query.id;
      let id = "";
      if (oid) {
        id = oid;
      } else {
        id = kid;
      }
      let res = await getbaseevaluationlist(
        {
          serverBsinfoId: id
        },
        this.pages
      );
      this.datas = res.data.entity.resultData;
      this.totalNum = res.data.entity.totalNum;
    }
  }
};
</script>
<style lang="scss" scoped>
.conent_for {
  width: 1200px;
  overflow: hidden;
  margin: 20px auto;
  margin-bottom: 150px;
  background: #fff;
  padding: 20px;
  padding-top: 0px;
  box-sizing: border-box;
  .listsdetail_fl_two_m {
    padding: 20px 30px;
    width: 100%;
    box-sizing: border-box;
    h4 {
      font-size: 20px;
      color: #333;
      margin-bottom: 30px;
    }
    .listsdetail_fl_two_m_b {
      width: 100%;
      ul {
        height: 100%;
        width: 100%;
        .listsdetail_fl_two_m_s {
          height: auto;
          width: 100%;
          overflow: hidden;
          padding-bottom: 15px;
          margin-bottom: 15px;
          border-bottom: 1px solid #ccc;
          &:hover {
            .listsdetail_fl_two_m_s_two {
              p {
                span {
                  &:nth-child(1) {
                    color: #008aff;
                  }
                  &:nth-child(2) {
                    color: #008aff;
                  }
                }
              }
            }
          }
          .listsdetail_fl_two_m_s_one {
            float: left;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 1px solid #ccc;
            margin-right: 27px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .listsdetail_fl_two_m_s_two {
            float: left;
            width: 900px;
            height: 100%;
            p {
              display: block;
              margin-bottom: 12px;
              span {
                color: #333333;
                &:nth-child(1) {
                  display: inline-block;
                  font-size: 16px;
                }
                &:nth-child(2) {
                  display: inline-block;
                  font-size: 12px;
                  margin-left: 5px;
                  margin-right: 30px;
                }
                &:nth-child(3) {
                  display: inline-block;
                  font-size: 12px;
                }
              }
            }
            .textone {
              display: block;
              font-size: 16px;
              color: #333333;
              line-height: 18px;
            }
            .textimg {
              width: 100%;
              height: auto;
              img {
                margin: 10px 0;
                margin-right: 10px;
                height: 140px;
                max-width: 140px;
              }
            }
            .texttwo {
              display: block;
              font-size: 14px;
              color: #cccccc;
            }
          }
        }
      }
    }
  }
}
</style>