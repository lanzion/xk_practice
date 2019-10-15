<template>
  <div class="listsdetail">
    <div class="container">
      <div class="taber">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/community' }">主题活动</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/curriculum' }">实践课程</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/textworks' }">课程详情</el-breadcrumb-item>
          <el-breadcrumb-item>作品详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="listsdetail_fl fl" :style="{'background':'#fff'}">
        <div class="listsdetail_fl_one">
          <div class="listsdetail_fl_one_q">
            <ul>
              <li class="fl" @click="imgover()" :class=" issgow ?'active':''">图片</li>
              <li class="fl" @click="videoover()" :class=" issgow ?'':'active'">视频</li>
            </ul>
          </div>

          <div class="listsdetail_fl_one_w" v-show="issgow" v-if="!nomore">
            <div class="bigimg">
              <img ref="imgsrc" :src="imgurls" alt />
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
            v-show="issgow"
            :style="{'width':'100%','height':'420px','background':'#fff','textAlign':'center'}"
          >
            <img src="~@assets/image/nothingData.svg" alt />
            <div :style="{'lineHeight':'0'}">
              <i :style="{'fontSize':'18px'}">暂无数据...</i>
            </div>
          </div>

          <div class="listsdetail_fl_one_w" v-show="!issgow">
            <div class="tovideos">
              <video controls :src="videourls"></video>
            </div>
          </div>

          <div class="listsdetail_fl_one_e">
            <div>
              <h4>{{datas.workName}}</h4>
            </div>

            <div>
              <el-button type="text" @click="fenxiang(datas.id)" :style="{'border':'none'}">
                <i :style="{color: datas.hasPraise ? '#008aff':'#ccc'}" class="el-icon-share"></i>
                <span>{{datas.shareNum}}</span>
              </el-button>
            </div>
            <el-dialog title="分享" :visible.sync="centerDialogVisible" width="30%" center>
              <span :style="{'color':'#008aff'}">{{myurl}}</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="centerDialogVisible = false"
                  :style="{'borderColor':'#008aff','background':'#008aff'}"
                >
                  <button
                    :style="{'border':'none','color':'#fff'}"
                    v-clipboard:copy="myurl"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制链接</button>
                </el-button>
              </span>
            </el-dialog>

            <div>
              <el-button
                type="text"
                @click="dianzanone(datas.hasPraise,datas.id)"
                :style="{'border':'none'}"
              >
                <i class="el-icon-thumb" :style="{color: datas.hasPraise ? '#008aff':'#ccc'}"></i>
                <span>{{datas.praiseNum}}</span>
              </el-button>
            </div>
          </div>
          <div class="listsdetail_fl_one_r">
            <div>
              <i class="el-icon-view"></i>
              <span>浏览:</span>
              <span>{{datas.browseNum}}</span>
            </div>
            <div>
              <i class="el-icon-time"></i>
              <span>上传时间</span>
              <span>{{datas.createDate}}</span>
            </div>
          </div>
          <div class="listsdetail_fl_one_t">
            <p>作品简介:{{datas.description}}</p>
          </div>
        </div>

        <div class="listsdetail_fl_two">
          <div class="listsdetail_fl_two_y">
            <h4>评论</h4>
            <textarea
              name
              id
              cols="30"
              rows="10"
              maxlength="500"
              placeholder="我来说两句(最多500字)"
              v-model="textareawork"
            ></textarea>
            <div>
              <span class="kl_q">验证码</span>
              <span class="kl_w">
                <div class="code" @click="refreshCode">
                  <s-identify :fresh="flag" @makedCode="getMakedCode"></s-identify>
                </div>
              </span>
              <input type="text" name id v-model="inputover" placeholder="请填写验证码" />
              <span class="kl_e">取消</span>
              <span class="kl_r">
                <el-button
                  type="text"
                  @click="open(datas.id)"
                  :style="{'width':'60px','height':'30px','color':'#fff','lineHeight':'6px'}"
                >发布</el-button>
              </span>
            </div>
          </div>
          <div class="listsdetail_fl_two_u">
            <div>
              <ul>
                <li v-for="(g,index) in commentlist" :key="index">
                  <div class="listsdetail_fl_two_u_one">
                    <img :src="g.face" alt />
                  </div>
                  <div class="listsdetail_fl_two_u_two">
                    <div class="listsdetail_fl_two_u_two_cq">
                      <span>{{g.userName}}</span>
                    </div>
                    <div class="listsdetail_fl_two_u_two_cw">
                      <span>{{g.content}}</span>
                    </div>
                    <div>
                      <span>{{g.updateDate}}</span>
                    </div>
                    <div class="huifu" :style="{'height':'25px'}">
                      <div class="fx">
                        <el-button
                          type="text"
                          @click="dianzantwo(g.hasPraise,g.id)"
                          :style="{'border':'none'}"
                        >
                          <i
                            :style="{'backgroundImage':g.hasPraise?'url('+ dianzan +')':'url('+ dianzan02 +')','backgroundSize':'16px'}"
                          ></i>
                          <span :style="{'fontSize':'14px','color':'#ccc'}">{{g.praiseTotal}}</span>
                        </el-button>
                      </div>
                      <div class="fx" @click="change(index,g.userName)">
                        <i :style="{'backgroundImage':'url('+huifu +')'}"></i>
                        <span :style="{'fontSize':'14px','color':'#ccc'}">{{g.replyTotal}}</span>
                      </div>

                      <div class="fx" :style="{'marginTop':'0'}">
                        <el-button
                          type="text"
                          @click="dialogFormVisible = true"
                          :style="{'border':'none'}"
                        >
                          <i :style="{'backgroundImage':'url('+jubao +')'}"></i>
                          <span :style="{'fontSize':'14px','color':'#ccc'}">举报</span>
                        </el-button>

                        <el-dialog
                          title="举报"
                          :visible.sync="dialogFormVisible"
                          :style="{'textAlign':'left'}"
                        >
                          <el-form>
                            <el-form-item label="举报原因" :label-width="formLabelWidth">
                              <el-input v-model="conent" auto-complete="off"></el-input>
                            </el-form-item>
                          </el-form>
                          <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button
                              type="primary"
                              @click="letgo(g.id)"
                              :style="{'borderColor':'#008aff','background':'#008aff'}"
                            >确 定</el-button>
                          </div>
                        </el-dialog>
                      </div>
                    </div>

                    <div
                      class="listsdetail_fl_two_y"
                      :style="{'display': svn === index ?'block':'none'}"
                    >
                      <textarea
                        :style="{'height':'100px'}"
                        name
                        id
                        cols="30"
                        rows="10"
                        :placeholder="placeholder"
                        v-model="conentover"
                      ></textarea>
                      <div>
                        <span class="kl_e" @click="changesno()">取消</span>
                        <span class="kl_r" @click="huifulist(g.id)">发布</span>
                      </div>
                    </div>

                    <div class="pllist">
                      <ul :style="{'background':'#fff'}">
                        <li
                          v-for="(j,index) in g.children"
                          :key="index + 'j'"
                          :style="{'height':'100%','padding':'19px 0 0 20px',}"
                        >
                          <div :style="{'height':'20px'}">
                            <span>{{j.userName}}</span>
                            <span :style="{'fontSize':'16px','color':'#999'}">回复</span>

                            <span>{{j.replyName}}</span>
                          </div>
                          <div>
                            <p>{{j.content}}</p>
                          </div>
                          <div
                            class="tyu"
                            :style="{'height':'30px','position':'relative','bottom':'0','left':'0'}"
                          >
                            <span :style="{'width':'200px','marginRight':'420px'}">{{j.createDate}}</span>

                            <el-button
                              type="text"
                              @click="dianzanthrwo(j.hasPraise,j.id)"
                              :style="{'border':'none','marginRight':'10px'}"
                            >
                              <i :style="{'backgroundImage':'url('+dianzan +')'}"></i>
                              <span :style="{'fontSize':'14px','color':'#ccc'}">{{j.praiseTotal}}</span>
                            </el-button>

                            <i
                              @click="overmove(index,j.userName)"
                              :style="{'backgroundImage':'url('+huifu+')',}"
                            ></i>
                          </div>
                          <div
                            class="listsdetail_fl_two_y"
                            :style="{'display': gith === index ?'block':'none'}"
                          >
                            <textarea
                              :style="{'height':'100px'}"
                              name
                              id
                              cols="30"
                              rows="10"
                              :placeholder="placeholdertwo"
                              v-model="conentthr"
                            ></textarea>
                            <div class="test" :style="{'height':'34px'}">
                              <span class="kl_e" @click="overmoveno()">取消</span>
                              <span class="kl_r" @click="huifuthr(g.id,j.id)">发布</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

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
        </div>
      </div>
      <div class="listsdetail_fr fr">
        <div data-v-99598106 data-v-7849ce59 id="authorMsg" class="mb24 g-bg-white">
          <div data-v-99598106 class="author-msg">
            <div :style="{'marginBottom':'10px'}">
              <img :style="{'width':'75px'}" :src="datas.face" alt />
            </div>
            <div data-v-99598106 class="name-school">
              <p data-v-99598106 class="author-name ellipsis">{{datas.createName}}</p>
              <p data-v-99598106 class="author-school">{{datas.schoolName}}</p>
            </div>
          </div>
          <div data-v-99598106 class="author-sign">{{datas.sign}}</div>
        </div>
        <div data-v-7849ce59 class="related-list-wrap g-bg-white">
          <h4 data-v-7849ce59 class="related-list-head clearfix">
            <span data-v-7849ce59 class="title fl">更多作品</span>
            <span data-v-7849ce59 class="more fr">
              <i data-v-7849ce59 @click="gomore()">更多&gt;</i>
            </span>
          </h4>
          <ul data-v-7849ce59 class="related-list clearfix">
            <li
              data-v-7849ce59
              class="related-list-item"
              v-for="(a,index) in goods"
              :key="index"
              @click="getchange(a.id)"
            >
              <div data-v-7849ce59 class="related-item-cover" lazy="loaded">
                <el-image :src="a.cover" fit="cover" style="height:130px">
                  <div
                    slot="error"
                    class="image-slot"
                    style="font-size: 30px;line-height: 404px;text-align: center;"
                  >
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
              <p data-v-7849ce59 class="related-item-name ellipsis">{{a.workName}}</p>
            </li>
          </ul>
          <div
            v-if="nomorethr"
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
  </div>
</template>
<script>
import SIdentify from "./identify.vue";
import yanzhengma from "./yanzhengma.vue";
import { mapState, mapGetters } from "vuex";
import {
  getlistofcoursedetails,
  getworkreviewlist,
  getworkresponse,
  getcommentsontheworks,
  getworksharing,
  getworksreview,
  getcomments,
  workreviewreport,
  getcommentreply
} from "@/api/frontstage";
export default {
  name: "listsdetail",
  data() {
    return {
      flag: true, //该值变化，就会触发刷新
      code: "", //刷新后的验证码
      flagtwo: true, //该值变化，就会触发刷新
      codetwo: "", //刷新后的验证码
      content: "",
      arr: ["学生", "教师"],
      svn: "",
      gith: "",
      datas: "",
      goods: "",
      imgurls: "",
      videourls: "",
      inputover: "",
      isok: false,
      issgow: true,
      num: 0,
      placeholder: "",
      placeholdertwo: "",
      commentlist: [],
      responselist: [],
      textareawork: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      dianzan: require("../../../../static/img/dianzan.png"),
      dianzan02: require("../../../../static/img/dianzan02.png"),
      huifu: require("../../../../static/img/pingjiahui.png"),
      jubao: require("../../../../static/img/tpusu.png"),
      input1: "",
      dialogFormVisible: false,
      conent: "",
      formLabelWidth: "120px",
      conentover: "",
      workId: "",
      conentthr: "",
      centerDialogVisible: false,
      myurl: "",
      nomore: false,
      nomoretwo: false,
      nomorethr: false,
      userId: ""
    };
  },
  components: {
    SIdentify,
    yanzhengma
  }, // 验证码初始化
  mounted() {
    this.flag = !this.flag;
    this.flagtwo = !this.flagtwo;
  },
  computed: {
    ...mapState("login", {
      form: state => (state.baseInfo || {}).baseInfo || {}
    })
  },
  created() {
    this.getlist();
    this.getcommentlist();
    this.userId = localStorage.getItem("xk_practice_uid") || "";
  },
  watch: {
    "datas.picResources": {
      handler(newval, oldval) {
        if (newval === null) {
          this.nomore = true;
        } else {
          this.nomore = false;
        }
      },
      deep: true
    },
    commentlist: {
      handler(newval, oldval) {
        // console.log(newval);
        if (newval === null) {
          this.nomoretwo = true;
        } else {
          this.nomoretwo = false;
        }
      },
      deep: true
    },
    "goods.length": {
      handler(newval, oldval) {
        if (newval == 0 || newval == null) {
          this.nomorethr = true;
        } else {
          this.nomorethr = false;
        }
      },
      deep: true
    }
  },
  methods: {
    refreshCode() {
      this.flag = !this.flag;
    },
    refreshCodetwo() {
      this.flagtwo = !this.flagtwo;
    },
    getMakedCode(code) {
      this.code = code;
    },
    getMakedCodetwo(codetwo) {
      this.codetwo = codetwo;
    },
    change(index, name) {
      this.svn = index;
      this.placeholder = `回复 @${name}`;
    },
    changesno() {
      this.svn = "";
    },
    overmove(index, name) {
      this.gith = index;
      this.placeholdertwo = `回复 @${name}`;
    },
    overmoveno() {
      this.gith = "";
    },
    imgover() {
      this.issgow = true;
    },
    videoover() {
      this.issgow = false;
    },
    giveimg(item, index) {
      this.$refs.imgsrc.src = item.resourceId;
      this.num = index;
    },
    async getlist() {
      let uid = this.$route.query.id;
      let kid = localStorage.getItem("did");
      let id = "";
      if (uid) {
        id = uid;
      } else {
        id = kid;
      }
      this.workId = id;
      let res = await getlistofcoursedetails({ id: id });
      this.datas = res.data.entity;

      if (this.datas.picResources) {
        this.imgurls = this.datas.picResources[0].resourceId;
      }
      if (this.datas.accResources) {
        this.videourls = this.datas.accResources[0].resourceId;
      }
      this.goods = JSON.parse(sessionStorage.getItem("listmore"));
    },
    async getcommentlist() {
      let uid = this.$route.query.id;
      let kid = localStorage.getItem("did");
      let id = "";
      if (uid) {
        id = uid;
      } else {
        id = kid;
      }
      let commentlists = await getworkreviewlist(
        {
          workId: id
        },
        this.pages
      );
      let aArr = commentlists.data.entity.resultData;
      this.commentlist = aArr;
      let bArr = [];
      aArr.forEach(async item => {
        let data = {
          pId: item.id
        };
        let res = await getworkresponse(data, this.pages);
        if (res.data.code !== 200) {
        } else {
          bArr = res.data.entity.resultData;
          item.children = bArr;
          this.$set(this.commentlist, item.children, bArr);
        }
      });
    },
    gomore() {
      this.$router.push({ path: "/textworks" });
    },
    async dianzanone(hasPraise, id) {
      if (this.userId) {
        // if (hasPraise === false) {
        //   let res = await getcommentsontheworks({ workId: id });
        //   if (res.data.code === 200) {
        //     this.getlist(id);
        //     this.$alert("点赞成功", "点赞", {
        //       confirmButtonText: "确定"
        //     });
        //   } else {
        //   }
        // } else {
        //   this.$alert("您已经点过赞了！", "点赞", {
        //     confirmButtonText: "确定"
        //   });
        // }
        let res = await getcommentsontheworks({ workId: id });
        if (res.data.code === 200) {
          this.getlist();
        }
      } else {
        this.$confirm("您还没有登录，请先登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "请登录"
            });
            this.$router.push({ path: "/login" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消登录"
            });
          });
      }
    },
    async fenxiang(id) {
      if (this.userId) {
        this.myurl = window.location.href;
        this.centerDialogVisible = true;
        let res = await getworksharing({ id: id });
        this.getlist();
      } else {
        this.$confirm("您还没有登录，请先登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "请登录"
            });
            this.$router.push({ path: "/login" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消登录"
            });
          });
      }
    },
    async dianzantwo(sum, id) {
      if (this.userId) {
        // if (sum === false) {
        //   let res = await getcomments({ commentId: id });
        //   if (res.data.code === 200) {
        //     this.getlist();
        //     this.getcommentlist();
        //     this.$alert("点赞成功", "点赞", {
        //       confirmButtonText: "确定"
        //     });
        //   } else {
        //   }
        // } else {
        //   this.$alert("您已经点过赞了！", "点赞", {
        //     confirmButtonText: "确定"
        //   });
        // }
        let res = await getcomments({ commentId: id });
        if (res.data.code === 200) {
          this.getlist();
          this.getcommentlist();
        }
      } else {
        this.$confirm("您还没有登录，请先登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "请登录"
            });
            this.$router.push({ path: "/login" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消登录"
            });
          });
      }
    },
    async getchange(id) {
      let res = await getlistofcoursedetails({ id: id });
      this.datas = res.data.entity;
      let commentlists = await getworkreviewlist(
        {
          workId: id
        },
        this.pages
      );
      let aArr = commentlists.data.entity.resultData;
      this.commentlist = aArr;
      let bArr = [];
      aArr.forEach(async item => {
        let data = {
          pId: item.id
        };
        let res = await getworkresponse(data, this.pages);

        bArr = res.data.entity.resultData;
        item.children = bArr;
        this.$set(this.commentlist, item.children, bArr);
      });
    },
    async open(id) {
      if (this.userId) {
        if (this.textareawork) {
          if (this.inputover == this.code) {
            let res = await getworksreview({
              workId: id,
              content: this.textareawork
            });
            if (res.data.code === 200) {
              this.$alert("评论成功", "评论", {
                confirmButtonText: "确定"
              });
              this.textareawork = "";
              this.inputover = "";
              this.refreshCode();
              this.getcommentlist();
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
      } else {
        this.$confirm("您还没有登录，请先登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "请登录"
            });
            this.$router.push({ path: "/login" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消登录"
            });
          });
      }
    },
    async letgo(id) {
      if (this.userId) {
        if (this.conent) {
          this.dialogFormVisible = false;
          let res = await workreviewreport({
            commentId: id,
            content: this.conent
          });
          if (res.data.code === 200) {
            this.$message({
              message: "举报成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "举报失败",
              type: "warning"
            });
          }
        }
      } else {
        this.$confirm("您还没有登录，请先登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "请登录"
            });
            this.$router.push({ path: "/login" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消登录"
            });
          });
      }
    },
    async huifulist(id) {
      if (this.userId) {
        if (this.conentover) {
          let res = await getcommentreply({
            workId: this.workId,
            pId: id,
            replyCommentId: id,
            content: this.conentover
          });

          if (res.data.code === 200) {
            this.$message({
              message: "回复成功",
              type: "success"
            });
          }
          this.getcommentlist(id);
          this.conentover = "";
        }
      } else {
        this.$confirm("您还没有登录，请先登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "请登录"
            });
            this.$router.push({ path: "/login" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消登录"
            });
          });
      }
    },
    async huifuthr(pId, replyCommentId) {
      if (this.userId) {
        let res = await getcommentreply({
          workId: this.workId,
          pId: pId,
          replyCommentId: replyCommentId,
          content: this.conentthr
        });
        if (res.data.code === 200) {
          this.$message({
            message: "回复成功",
            type: "success"
          });
          this.getcommentlist();
          this.conentthr = "";
        }
      } else {
        this.$confirm("您还没有登录，请先登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "请登录"
            });
            this.$router.push({ path: "/login" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消登录"
            });
          });
      }
    },
    async dianzanthrwo(hasPraise, id) {
      if (this.userId) {
        if (hasPraise === false) {
          let res = await getcomments({ commentId: id });
          if (res.data.code === 200) {
            this.getcommentlist();
            this.$alert("点赞成功", "点赞", {
              confirmButtonText: "确定"
            });
          } else {
          }
        } else {
          this.$alert("您已经点过赞了！", "点赞", {
            confirmButtonText: "确定"
          });
        }
      } else {
        this.$confirm("您还没有登录，请先登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "请登录"
            });
            this.$router.push({ path: "/login" });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消登录"
            });
          });
      }
    },
    onCopy() {
      this.$message({
        message: `复制成功！`,
        type: "success"
      });
    },
    onError() {}
  }
};
</script>
<style lang="scss" scoped>
img{
      object-fit: cover;
}
.taber {
  margin: 18px 0;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.listsdetail {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.listsdetail_fl {
  width: 900px;
  height: 100%;
  overflow: hidden;
  padding-bottom: 50px;
  .listsdetail_fl_one {
    background: #fff;
    width: 100%;
    height: 676px;
    .listsdetail_fl_one_q {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #ccc;
      ul {
        width: 100%;
        height: 40px;
        li {
          width: 60px;
          height: 100%;
          color: #333333;
          font-size: 16px;
          text-align: center;
          line-height: 40px;
        }
      }
    }
    .listsdetail_fl_one_w {
      width: 100%;
      height: 420px;
      border-bottom: 2px solid #ccc;
      margin-bottom: 20px;
    }
    .listsdetail_fl_one_e {
      width: 100%;
      height: 40px;
      padding: 0 20px;
      box-sizing: border-box;
      div {
        &:nth-child(1) {
          width: 420px;
          float: left;
          h4 {
            color: #333333;
            font-size: 20px;
          }
        }
        &:nth-child(2) {
          width: 80px;
          float: right;
          cursor: pointer;
          i {
          }
          span {
            color: #cccccc;
            font-size: 14px;
          }
        }
        &:nth-child(3) {
          cursor: pointer;
          // width: 80px;
          float: right;
          i {
          }
          span {
            color: #cccccc;
            font-size: 14px;
          }
        }
        &:nth-child(4) {
          cursor: pointer;
          width: 80px;
          float: right;
          i {
          }
          span {
            color: #cccccc;
            font-size: 14px;
          }
        }
      }
    }
    .listsdetail_fl_one_r {
      margin-top: 20px;
      padding: 0 20px;
      box-sizing: border-box;
      width: 100%;
      height: 30px;
      div {
        &:nth-child(1) {
          float: left;
          width: 300px;
          i {
          }
          span {
            font-size: 14px;
            color: #333333;
            &:nth-child(1) {
            }
            &:nth-child(2) {
            }
          }
        }
        &:nth-child(2) {
          float: left;
          width: 300px;
          i {
          }
          span {
            font-size: 14px;
            color: #333333;
            &:nth-child(1) {
            }
            &:nth-child(2) {
            }
          }
        }
      }
    }
    .listsdetail_fl_one_t {
      padding: 0 20px;
      box-sizing: border-box;
      width: 100%;
      p {
        font-size: 16px;
        line-height: 30px;
        color: #333333;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
  .listsdetail_fl_two {
    background-color: #fff;
    overflow: hidden;
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
            overflow: hidden;
            margin-bottom: 10px;
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
              .listsdetail_fl_two_u_two_cq {
                width: 100%;
                height: 20px;
              }
              .listsdetail_fl_two_u_two_cw {
                width: 100%;
                span {
                  width: 720px;
                  display: block;
                  word-break: break-all;
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
      h4 {
        font-size: 20px;
        color: #333333;
        height: 60px;
        line-height: 60px;
      }
      textarea {
        height: 162px;
        width: 99%;
        margin-bottom: 20px;
        padding: 8px;
        box-sizing: border-box;
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
}
.huifu {
  position: absolute;
  right: 0;
  top: -8px;
  text-align: right;
  height: 30px;
  .fx {
    display: inline-block;
    width: 60px;
    height: 20px;
    i {
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
    span {
      display: inline-block;
      color: #cccccc;
      font-size: 14px;
      vertical-align: middle;
    }
  }
}
.pllist {
  width: 720px;
  margin-top: 20px;
  ul {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    li {
      width: 100%;
      overflow: hidden;
      background: #f8f8f8;
      margin-bottom: 5px;
      position: relative;
      box-sizing: border-box;
      div {
        &:nth-child(1) {
          // position: absolute;
          // top: 21;
          // left: 20;
          span {
            font-size: 16px;
            &:nth-child(1) {
              color: #c90a09;
            }
            &:nth-child(2) {
              color: #999999;
            }
            &:nth-child(3) {
              color: #c90a09;
            }
          }
        }
        &:nth-child(2) {
          text-indent: 20px;
          font-size: 16px;
          color: #333333;
          box-sizing: border-box;
          padding: 5px;
          p {
            line-height: 20px;
            word-break: break-all;
          }
        }
      }
      .tyu {
        width: 100%;
        position: absolute;
        bottom: -15px;
        left: 20px;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: middle;
        }
      }
    }
  }
}
.test {
  span {
    width: 80px;
    text-indent: 0px;
  }
}
.worksDetails .details-content .details-right[data-v-7849ce59] {
  width: 276px;
}
#authorMsg[data-v-99598106] {
  width: 276px;
  box-sizing: border-box;
  padding: 30px;
}
.mb24[data-v-7849ce59] {
  margin-bottom: 24px;
}
.g-bg-white {
  background-color: #fff;
}
#authorMsg .author-msg[data-v-99598106] {
  margin-bottom: 24px;
  box-sizing: border-box;
  text-align: center;
}
#authorMsg .author-msg .author-face[data-v-99598106] {
  margin-bottom: 15px;
  display: inline-block;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  background-position: 50%;
  background-size: cover;
  overflow: hidden;
}
a {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  text-decoration: none;
  color: #3e3e3e;
  cursor: pointer;
}
#authorMsg .author-msg .name-school .author-name[data-v-99598106] {
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#authorMsg
  .author-msg
  .name-school
  .author-name
  .author-identity[data-v-99598106] {
  margin-left: 8px;
  font-size: 12px;
  color: #999;
}
#authorMsg .author-msg .name-school .author-school[data-v-99598106] {
  font-size: 12px;
  color: #ccc;
}
#authorMsg .author-sign[data-v-99598106] {
  padding: 0 10px 24px;
  font-size: 14px;
  word-wrap: break-word;
  color: #333;
  line-height: 1.5em;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
#authorMsg .author-statis[data-v-99598106] {
  text-align: center;
  font-size: 12px;
  color: #999;
}
.table-layout {
  display: table;
  width: 100%;
}
#authorMsg .author-statis .statis-item[data-v-99598106] {
  display: inline-block;
  height: 30px;
  width: 3.5em;
}
.table-cell {
  display: table-cell;
  vertical-align: middle;
}
li {
  cursor: default;
}
#authorMsg .author-statis .statis-item .statis-num[data-v-99598106] {
  margin: -3.5px 0 10px;
}
#authorMsg .btn-box[data-v-99598106] {
  text-align: center;
}
#authorMsg .btn-box .g-button[data-v-99598106] {
  border-radius: 100px;
}
.g-button {
  display: inline-block;
  padding: 0;
  border: 1px solid;
  border-radius: 4px;
  box-sizing: border-box;
  color: #fff;
  letter-spacing: 1px;
  text-indent: 1px;
  text-align: center;
  width: 80px;
  height: 30px;
  font-size: 14px;
  line-height: 28px;
  background-color: #de1601;
  border-color: #de1601;
}
button {
  border: 1px solid;
  background-color: transparent;
  cursor: pointer;
}
#authorMsg .btn-box .g-button[data-v-99598106] {
  border-radius: 100px;
}
.g-button + .g-button {
  margin-left: 20px;
}
.g-button.is-plain {
  color: #de1601;
  background-color: #fff;
}
.g-button {
  display: inline-block;
  padding: 0;
  border: 1px solid;
  border-radius: 4px;
  box-sizing: border-box;
  color: #fff;
  letter-spacing: 1px;
  text-indent: 1px;
  text-align: center;
  width: 80px;
  height: 30px;
  font-size: 14px;
  line-height: 28px;
  background-color: #de1601;
  border-color: #de1601;
}
.related-list-wrap[data-v-7849ce59] {
  padding: 20px;

  box-sizing: border-box;
}
.g-bg-white {
  background-color: #fff;
}
.related-list-wrap .related-list-head[data-v-7849ce59] {
  margin-bottom: 20px;
}
.related-list-wrap .related-list-head .title[data-v-7849ce59] {
  font-size: 18px;
  color: #333;
}
.related-list-wrap .related-list-head .more[data-v-7849ce59] {
  position: relative;
  width: 36px;
  height: 18px;
  color: #ccc;
  cursor: pointer;
}
.related-list-wrap .related-list-head .more i[data-v-7849ce59] {
  position: absolute;
  bottom: 0;
}
i,
em {
  font-style: normal;
}
.clearfix:after {
  content: "";
  height: 0;
  display: block;
  clear: both;
  visibility: hidden;
}
.related-list-wrap .related-list .related-list-item[data-v-7849ce59] {
  margin-bottom: 20px;
  cursor: pointer;
}
.related-list-wrap
  .related-list
  .related-list-item
  .related-item-cover[data-v-7849ce59] {
  width: 100%;
  height: 130px;
  background-position: 50%;
  background-size: cover;
  overflow: hidden;
}
.related-list-wrap
  .related-list
  .related-list-item
  .related-item-name[data-v-7849ce59] {
  margin: 10px 0 5px;
  font-size: 14px;
  line-height: 1.2;
  color: #333;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.related-list-wrap
  .related-list
  .related-list-item
  .related-item-submsg[data-v-7849ce59] {
  font-size: 12px;
  color: #999;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.related-list-wrap .related-list .related-list-item[data-v-7849ce59] {
  margin-bottom: 20px;
  cursor: pointer;
}
.active {
  border-bottom: 1px solid #008aff;
}
.bigimg {
  padding: 20px 20px;
  box-sizing: border-box;
  float: left;
  width: 680px;
  height: 100%;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
  }
}
.smallimg {
  margin-left: 30px;
  float: left;
  width: 120px;
  height: 100%;
  padding: 20px 0px;
  box-sizing: border-box;
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
.tovideos {
  padding: 20px 20px;
  box-sizing: border-box;
  height: 100%;
  video {
    width: 100%;
    height: 100%;
  }
}
.code {
  width: 60px;
  height: 30px;
}
.listsdetail_fr fr {
  width: 270px;
}
.related-list-wrap {
  width: 270px;
}
.g-bg-white {
  width: 270px;
}
</style>
