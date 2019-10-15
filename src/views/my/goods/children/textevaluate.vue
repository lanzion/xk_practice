<template>
  <div class="textevaluate">
    <div class="listsdetail_fl_two">
      <div class="listsdetail_fl_two_y">
        <h4>课程评论</h4>
        <textarea name id cols="30" v-model="textareawork" rows="10"></textarea>
        <div>
          <span class="kl_q">验证码</span>
          <span class="kl_w">
            <div class="code" @click="refreshCode">
              <!-- ：fresh：父组件向子组件传送刷新验证码的信号；
              @makedCode：子组件向父组件传送验证码的值-->

              <s-identify :fresh="flag" @makedCode="getMakedCode" :style="{width:'60px'}"></s-identify>
            </div>
          </span>
          <input type="text" name id v-model="inputover" placeholder="请填写验证码" />
          <span class="kl_e" @click="quxiaoinput">取消</span>
          <span class="kl_r" @click="kechengone()">发布</span>
        </div>
      </div>
      <div class="listsdetail_fl_two_m">
        <h4>评论</h4>
        <div class="listsdetail_fl_two_m_b">
          <ul>
            <li class="listsdetail_fl_two_m_s" v-for="(g,index) in datas" :key="index">
              <div class="listsdetail_fl_two_m_s_one">
                <!-- <img :src="g.face" alt /> -->
                <el-avatar :size="80" :src="g.face" @error="errorHandler">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
              </div>
              <div class="listsdetail_fl_two_m_s_two">
                <p>
                  <span>{{g.userName}}</span>
                </p>
                <span class="textone">{{g.content}}</span>
                <span class="texttwo">{{g.createDate}}</span>
              </div>
              <div class="listsdetail_fl_two_m_s_thr">
                <i class="el-icon-warning-outline"></i>
                <span>
                  <el-button type="text" @click="dialogFormVisible = true">举报</el-button>
                  <el-dialog title="举报" :visible.sync="dialogFormVisible" style="text-align:left">
                    <el-form :model="form">
                      <el-form-item label="举报原因" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="overjubao(g.id)">确 定</el-button>
                    </div>
                  </el-dialog>
                </span>
              </div>
            </li>
          </ul>
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
        <div class="block" :style="{'float':'right','marginRight':'30px'}" v-if="!nomore">
          <pagination
            :style="{'textAlign':'right'}"
            :param="pages"
            :page-sizes="[10, 15, 20]"
            :total="totalNum"
            @change="getlist"
          ></pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SIdentify from "../../listsdetail/identify.vue";
import {
  alistofcoursereviews,
  responsestocoursecomments,
  detailsofcoursepracticereportonworksreview
} from "@/api/frontstage";
export default {
  name: "textevaluate",
  data() {
    return {
      flag: true, //该值变化，就会触发刷新
      code: "", //刷新后的验证码
      datas: [],
      inputover: "",
      textareawork: "",
      nomore: false,
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        name: ""
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
  mounted() {
    this.flag = !this.flag;
  },
  components: {
    SIdentify
  }, // 验证码初始化
  methods: {
    errorHandler() {
      return true;
    },
    async overjubao(id) {
      this.dialogFormVisible = false;
      let res = await detailsofcoursepracticereportonworksreview({
        commentId: id,
        content: this.form.name
      });
      if (res.data.code === 200) {
        this.$alert("举报成功", "举报", {
          confirmButtonText: "确定"
        });
      } else {
        this.$alert("举报失败", "举报", {
          confirmButtonText: "确定"
        });
      }
    },
    quxiaoinput() {
      this.textareawork = "";
    },
    async kechengone() {
      let id = localStorage.getItem("mid");
      if (this.textareawork) {
        if (this.inputover == this.code) {
          let res = await responsestocoursecomments({
            courseId: id,
            content: this.textareawork
          });
          if (res.data.code === 200) {
            this.$alert("评论成功", "评论", {
              confirmButtonText: "确定"
            });
            this.getlist();
            this.textareawork = "";
            this.inputover = "";
            this.refreshCode();
          }
        } else {
          this.$alert("验证码不正确", "验证码", {
            confirmButtonText: "确定"
          });
        }
      } else {
        this.$alert("评论不能为空", "评论", {
          confirmButtonText: "确定"
        });
      }
    },
    refreshCode() {
      this.flag = !this.flag;
    },
    getMakedCode(code) {
      this.code = code;
    },
    async getlist() {
      let id = localStorage.getItem("mid");
      let res = await alistofcoursereviews(
        {
          courseId: id
        },
        this.pages
      );
      console.log(res);
      this.datas = res.data.entity.resultData;
      this.totalNum = res.data.entity.totalNum;
    }
  }
};
</script>
<style lang="scss" scoped>
.code {
  width: 60px;
  height: 30px;
}
.textevaluate {
  padding: 15px 25px;
  box-sizing: border-box;
  background: #fff;
}
.listsdetail_fl_two {
  background-color: #fff;
  min-height: 600px;
  width: 100%;
  height: 100%;
  padding: 0 25px;
  box-sizing: border-box;
  margin-top: 20px;
  margin-bottom: 30px;
  .listsdetail_fl_two_u {
    margin-top: 30px;
    height: 100%;
    border-top: 1px solid #ccc;
    padding: 20px 0;
    div {
      height: 100%;
      ul {
        height: 100%;
        li {
          height: 100%;
          .listsdetail_fl_two_u_one {
            width: 80px;
            height: 80px;
            float: left;
            border: 1px solid #ccc;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 28px;
            img {
              height: 80px;
            }
          }
          .listsdetail_fl_two_u_two {
            position: relative;
            float: left;
            width: 720px;
            overflow: hidden;
            height: 100%;
            div {
              &:nth-child(1) {
                margin-bottom: 10px;
                span {
                  color: #c90a09;
                  &:nth-child(1) {
                    font-size: 16px;
                  }
                  &:nth-child(2) {
                    font-size: 12px;
                  }
                }
              }
              &:nth-child(2) {
                span {
                  font-size: 16px;
                  color: #333333;
                }
              }
              &:nth-child(3) {
                margin-top: 20px;
                span {
                  font-size: 14px;
                  color: #cccccc;
                }
              }
            }
          }
        }
      }
    }
  }
  .listsdetail_fl_two_y {
    width: 100%;
    height: 100%;
    padding-bottom: 30px;
    border-bottom: 1px solid #ccc;
    h4 {
      font-size: 20px;
      color: #333333;
      height: 60px;
      line-height: 60px;
    }
    textarea {
      box-sizing: border-box;
      padding: 10px;
      height: 162px;
      width: 99%;
      margin-bottom: 20px;
      &:focus {
        border-color: #008aff;
      }
    }
    div {
      text-align: right;
      span {
        display: inline-block;
        width: 60px;
        text-align: center;
        line-height: 30px;
        margin-left: 20px;
        vertical-align: middle;
      }
      .kl_q {
        color: #333333;
        font-size: 16px;
      }
      .kl_w {
        width: 60px;
        height: 30px;
        border: 1px solid #ccc;
        vertical-align: middle;
      }
      input {
        width: 80px;
        height: 26px;
        margin-left: 20px;
        vertical-align: middle;
        &::-webkit-input-placeholder {
          font-size: 8px;
          color: #ccc;
        }
      }
      .kl_e {
        width: 60px;
        height: 30px;
        background-color: #cccccc;
        border-radius: 4px;
        color: #ffffff;
      }
      .kl_r {
        width: 60px;
        height: 30px;
        background-color: #008aff;
        border-radius: 4px;
        color: #ffffff;
      }
    }
  }
}
.listsdetail_fl_two_m {
  padding: 20px 0;
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
        height: 81px;
        width: 100%;
        overflow: hidden;
        margin-bottom: 30px;
        .listsdetail_fl_two_m_s_one {
          float: left;
          width: 80px;
          height: 78px;
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
              color: #008aff;
              &:nth-child(1) {
                display: inline-block;
                font-size: 16px;
              }
              &:nth-child(2) {
                display: inline-block;
                font-size: 12px;
              }
            }
          }
          .textone {
            height: 40px;
            display: block;
            font-size: 16px;
            color: #333333;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            line-height: 18px;
          }
          .texttwo {
            display: block;
            font-size: 14px;
            color: #cccccc;
          }
        }
        .listsdetail_fl_two_m_s_thr {
          float: right;
          text-align: right;
          cursor: pointer;
          &:hover {
            i {
              color: #008aff;
            }
            span {
              color: #008aff;
            }
          }
          i {
            display: inline-block;
            width: 18px;
            font-size: 12px;
            color: #cccccc;
          }
          span {
            font-size: 12px;
            color: #cccccc;
          }
        }
      }
    }
  }
}
</style>
