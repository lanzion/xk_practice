<template>
  <div class="revisionworks">
    <div class="submissionofworks">
      <div class="conent_x">
        <span>课程名称</span>
        <span>{{lists.name}}</span>
      </div>
      <div class="conent_x">
        <span :style="{'float':'left'}">学习目标</span>
        <span :style="{'float':'left','width':'700px','overflow':'hidden','textOverflow':'ellipsis','whiteSpace': 'nowrap'}">{{lists.target}}</span>
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
          <span>{{lists.name}}</span>
        </div>
        <div class="conent_x">
          <span>课程类型</span>
          <span>{{lists.courseTypeParentName}}>{{lists.courseTypeName}}</span>
        </div>
        <div class="conent_x">
          <span :style="{'float':'left'}">学习目标</span>
          <span :style="{'float':'left','width':'700px','overflow':'hidden','textOverflow':'ellipsis','whiteSpace': 'nowrap'}">{{lists.target}}</span>
        </div>
        <div class :style="{'paddingLeft':'40px','margin':'20px 0','overflow':'hidden'}">
          <span
            :style="{'display':'inline-block','fontSize':'16px','color':'#666','vertical-align':'top','margin-right':'20px'}"
          >{{lists.content}}</span>
          <span
            :style="{'fontSize':'16px','color':'#333','display':'inline-block','height':'160px','width':'676px','border':'1px solid #ccc','overflowY':'auto'}"
          ></span>
        </div>

        <div class="download">
          <span class="download_one" :style="{'width':'64px'}">活动资源</span>
          <ul>
            <li v-for="(t,index) in lists.courseResources" :key="index">
              <span>附件{{index+1}}</span>
              <span>{{t.resourceName}}</span>
              <span>
                <a
                  :href="t.resourceId"
                  @click.prevent="downloadItem(item.resourceId,item.name)"
                  class="school-detail-download-btn"
                >下载</a>
              </span>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li v-for="(q,index) in lists.courseClassServers" :key="index">
              <div :style="{'height':'auto','marginBottom':'20px','overflow':'hidden'}">
                <div class="conent_t" :style="{'float':'left'}">
                  <div class="conent_x">
                    <span>上课年级</span>
                    <span>{{q.gradeName}}</span>
                  </div>
                  <div class="conent_x">
                    <span>上课时间</span>
                    <span>{{q.startDate}}~{{q.endDate}}</span>
                  </div>
                </div>

                <div class="conent_t" :style="{'float':'left'}">
                  <div class="conent_x">
                    <span>上课班级</span>
                    <span>{{q.className}}</span>
                  </div>
                </div>
              </div>
              <div class="conent_x">
                <span>活动基地</span>
                <span>{{q.baseinfoName}}</span>
              </div>
              <div class="conent_x">
                <span>基地地址</span>
                <span>{{q.baseAddress}}</span>
              </div>
              <div class="conent_x">
                <span>参与服务</span>
                <span>{{q.serverTitle}}</span>
              </div>
              <div class :style="{'paddingLeft':'40px','margin':'20px 0','overflow':'hidden'}">
                <span
                  :style="{'display':'inline-block','fontSize':'16px','color':'#666','vertical-align':'top','margin-right':'20px'}"
                >课程内容</span>
                <span
                  :style="{'fontSize':'16px','color':'#333','display':'inline-block','height':'160px','width':'676px','border':'1px solid #ccc','overflowY':'auto'}"
                ></span>
              </div>
              <div class="conent_x" :style="{'position':'relative'}">
                <span class="conent_u">负责人</span>
                <span>{{q.serverPersonInCharge}}</span>
                <div class="conent_x" :style="{'position':'absolute','right':'-410px','top':'0px'}">
                  <span class="conent_u">联系方式</span>
                  <span>{{q.serverPersonInChargePhone}}</span>
                </div>
              </div>
              <div class="conent_x">
                <span class="conent_u">活动位置</span>
                <span>{{q.serverAddress}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="auditrecords_title">审核记录</div>
      <div class="auditrecords">
        <ul class="auditrecords_ul">
          <li class="auditrecords_li" v-for="(k,index) in datas.auditRecords" :key="index">
            <div class="auditrecords_li_l">
              <div class="conent_m">
                <span>审核人</span>
                <span>{{k.auditName}}</span>
                <span>审核结果</span>
              </div>
              <div class="conent_m">
                <span>审核意见</span>
                <span>{{k.auditComment}}</span>、
                <span>{{k.auditStatus}}</span>
              </div>
              <div class="conent_m">
                <span>上传时间</span>
                <span>{{k.createDate}}</span>
                <span>{{k.createTime}}</span>
                <span>审核时间</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="worksPublish backend-content__middle" :style="{'marginTop':'30px'}">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
          <el-row>
            <el-form-item label="作品名称" prop="name">
              <el-col :span="9">
                <el-input placeholder="请输入作品名称，不超过30字" v-model.trim="form.name" :maxlength="30"></el-input>
              </el-col>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="作品介绍" prop="introduction">
              <el-col :span="23">
                <el-input
                  v-model="form.introduction"
                  placeholder="请输入作品介绍"
                  type="textarea"
                  :rows="7"
                  resize="none"
                  :maxlength="500"
                ></el-input>
                <!-- <div id="editor-trigger" style="height: 200px"></div> -->
              </el-col>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="作品图片" prop="imgList">
              <el-row>
                <ali-upload
                  :limit="5"
                  :file-list.sync="form.imgList"
                  :before-upload="beforeUploadCover"
                  accept=".gif, .jpg, .png, .jpeg"
                  :on-change="uploadCover"
                  ref="uploadPicture"
                >
                  <i
                    slot="action"
                    slot-scope="{ file }"
                    class="upload-item-action-button el-icon-edit-outline"
                    @click="setCover(file)"
                    title="设为封面"
                  ></i>
                  <div
                    slot="status"
                    slot-scope="{ file, index }"
                    class="works-img-cover"
                    v-show="file.isFlag === 'y'"
                  >
                    <i class="icon el-icon-document"></i>
                  </div>
                  <p class="upload-list-tips">
                    最多 5 张，仅支持JPG、GIF、PNG、JPEG格式，文件小于 {{imgStandardFileSize}} M。
                    <br />建议上传的图片像素为 680 x 390
                  </p>
                </ali-upload>
              </el-row>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item label="作品视频">
              <el-col :span="15">
                <ali-upload
                  list-type="file"
                  :limit="1"
                  :file-list.sync="form.videoList"
                  :before-upload="beforeUploadVideo"
                >
                  <p slot="tip" class="upload-list-tips">上传单个视频，大小在 {{standardFileSize}}M 以内</p>
                </ali-upload>
              </el-col>
            </el-form-item>
          </el-row>
        </el-form>
      </div>

      <el-row>
        <div class="btngo">
          <span @click.prevent="onSubmit(1)">保存</span>
          <span @click.prevent="onSubmit(0)">提交</span>
          <span>取消</span>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
import {
  getdetailsofstudentcourses,
  myworksuploadworks,
  studentsubmissionofmywork,
  listofUnuploadedCourseWorks,
  detailsofcourselistofworkstobeaudited,
  modificationandpreservation,
  myworksdetailsoftheworks
} from "@/api/frontstage";
import { mapState, mapActions } from "vuex";
import { upload } from "@/mixin/common";
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import aliUpload from "@/components/common/upload.vue";
import { commentAdd } from "@/api/resetApi";
import {
  validateAccount,
  validateUserName,
  validateIDCode,
  validatePhone,
  validateEmail
} from "@/utils/utility/validateRule";

export default {
  mixins: [upload, uploadFileSize],
  name: "revisionworks",
  components: {
    "ali-upload": aliUpload
  },
  data() {
    return {
      id: "",
      datas: "",
      courseId: "",
      fileList: [],
      input: "",
      textarea: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      form: {
        // 作品名称
        name: "",
        // 作品介绍
        introduction: "",
        imgList: [],
        videoList: []
      },
      dialogImageUrl: "",
      dialogVisible: false,
      isLoading: false,
      dialogVisible: false,
      picResources: [],
      fileList: [],
      input: "",
      textarea: "",
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      dialogImageUrl: "",
      dialogVisible: false,
      datas: "",
      lists: "",
      istrue: 0,
      num: 0,
      sum: false,
      rules: {
        name: [
          { required: true, message: "请输入作品名称", trigger: "change" },
          { max: 29, message: "不超过30字", trigger: "change" }
        ],
        introduction: [
          { required: true, message: "请输入作品介绍", trigger: "change" }
        ],
        imgList: { required: true, message: "请上传作品图片", type: "array" }
      },
      imgurl01: require("../../../../../static/img/kechen1.png"),
      imgurl02: require("../../../../../static/img/kechen2.png")
    };
  },
  computed: {},
  created() {
    this.getlist();
  },
  methods: {
    async getlist() {
      let id = this.$route.query.id;
      this.id = id;
      let res = await myworksdetailsoftheworks({ id: id });
      this.datas = res.data.entity;
      this.datas.auditRecords.forEach(x => {
        if (x.auditStatus == 0) {
          x.auditStatus = "待审核";
        }
        if (x.auditStatus == 1) {
          x.auditStatus = "审核通过";
        }
        if (x.auditStatus == 2) {
          x.auditStatus = "驳回";
        }
      });
      this.lists = this.datas.courseInfo || {};
      this.courseId = res.data.entity.id;
      this.form.name = res.data.entity.workName || "";
       this.datas.picResources.forEach(x => {
        let data = {
          url: x.resourceId
        };
        this.form.imgList.push(data);
      });
      // this.fileList.push({
      //   url:res.data.entitypicResources
      // })
      this.form.introduction = res.data.entity.description;
    },

    changes() {
      this.istrue = !this.istrue;
    },
    giveimg(item, index) {
      this.$refs.imgsrc.src = item;
      this.num = index;
    },
    passto() {
      this.sum = !this.sum;
    },

    movego() {
      this.$router.push({ path: "/agment/tbuploaded" });
    },
    uploadCover({ fileList } = {}) {
      this.checkCover({ fileList });
      console.log(fileList);
    },
    setCover(file) {
      if (file.isFlag === 1) {
        return;
      }

      if (file.url) {
        this.$refs.uploadPicture.uploadList.forEach(x => {
          x.isFlag = "y";
        });
        this.$set(file, "isFlag", "y");
      } else {
        this.$message({
          message: "该图片未上传成功",
          type: "warning"
        });
      }
    },
    checkCover({ fileList } = {}) {
      if (fileList.length) {
        const _idx = fileList.findIndex(x => Number(x.isFlag) === "y");
        if (!~_idx) {
          fileList[0].isFlag = "y";
        }
      }
    },
    onSubmit(isSubmit) {
      this.$set(this.rules, "imgList", {
        required: true,
        message: "请上传作品图片",
        type: "array"
      });
      this.$refs.form.validate(valid => {
        if (valid) {
          const form = this.form;
          const imgList = form.imgList
            .filter(x => x.url)
            .map(i => ({
              name: i.name,
              // resourceType: "1",
              resourceId: i.url,
              isFlag: i.isFlag || "n"
            }));
          imgList[0].isFlag = 'y'
          const videoList = form.videoList
            .filter(x => x.url)
            .map(i => ({
              name: i.name,
              // resourceType: "2",
              resourceId: i.url,
              isFlag: "y"
            }));
          // const resourceList = [...imgList, ...videoList];
          const data = {
            workName: form.name,
            description: form.introduction,
            picResources: imgList,
            accResources: videoList,
            openRange: form.openRange
          };
          if (isSubmit === 1) {
            data.id = this.id;
            // data.courseId = this.courseId;
            modificationandpreservation(data).then(res => {
              // console.log(res);
              if (res.data.code === 200) {
                this.$message({
                  showClose: true,
                  message: "保存成功",
                  type: "success"
                });
                this.id = res.data.appendInfo.id || "";
              } else {
                this.$message({ message: res.data.msg });
              }
            });
          }
          if (isSubmit === 0) {
            if (this.id) {
              data.id = this.id;
              data.courseId = this.$route.query.courseId;
              // console.log(data.courseId);
              // data.courseId = this.courseId;
              // data.courseId = this.courseId;
              studentsubmissionofmywork(data).then(res => {
                // console.log(res);
                if (res.data.code === 200) {
                  this.$message({
                    showClose: true,
                    message: "提交成功",
                    type: "success"
                  });
                  this.$router.go(-1);
                } else {
                  this.$message({ message: res.data.msg });
                }
              });
            }
          }

          // else {
          //   requestWorksPublish(data).then(res => {
          //     if (res.data.code === 200) {
          //       this.$message({
          //         showClose: true,
          //         message: "发布成功",
          //         type: "success"
          //       });
          //       // this.$router.push({ path: "/admin/works/audited" });
          //     } else {
          //       this.$message({ message: res.data.msg });
          //     }
          //   });
          // }
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.auditrecords_title {
  width: 100%;
  line-height: 48px;
  height: 48px;
  text-align: left;
  font-size: 22px;
  color: #333333;
  padding: 0 40px;
  box-sizing: border-box;
}
.auditrecords {
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  overflow: hidden;
  .auditrecords_ul {
    .auditrecords_li {
      height: 128px;
      width: 100%;
      border-bottom: 1px solid #ccc;
      overflow: hidden;
      .auditrecords_li_l {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .conent_m {
          width: 100%;
          height: 40px;
          span {
            display: block;
            line-height: 40px;
            font-size: 16px;
            color: #666666;
            float: left;
            height: 100%;
            &:nth-child(1) {
              width: 80px;
            }
            &:nth-child(2) {
            }
            &:nth-child(4) {
              width: 160px;
              float: right;
              text-align: right;
            }
            &:nth-child(3) {
              width: 160px;
              float: right;
              text-align: right;
            }
          }
        }
      }
    }
  }
}
.submissionofworks {
  padding: 40px 0 40px 0;
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
.conent_q {
  &::before {
    content: "*";
    color: red;
    margin-right: 2px;
    line-height: 5px;
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
    &:nth-child(2) {
      background: #fff;
      border: 1px solid #008aff;
      margin-left: 20px;
      color: #008aff;
    }
    &:nth-child(1) {
      background: #008aff;
      margin-left: 20px;
    }
    &:nth-child(3) {
      background: #ccc;
      font-size: #999;
      margin-left: 20px;
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
          border: solid 1px #cccccc;
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
.school-detail-download-btn {
  display: inline-block;
  vertical-align: middle;
  width: 40px;
  height: 20px;
  background-color: #e4eefe;
  border-radius: 4px;
  border: solid 1px #008aff;
  line-height: 20px;
  color: #008aff;
  text-align: center;
  font-size: 12px;
}
</style>
