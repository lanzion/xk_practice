<template>
  <div class="submissionofworks">
    <div class="conent_x">
      <span>课程名称</span>
      <span>{{datas.name}}</span>
    </div>
    <div class="conent_x">
      <span>学习目标</span>
      <span :style="{'width':'700px','overflow':'hidden','textOverflow':'ellipsis','whitespace': 'nowrap'}">{{datas.target}}</span>
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
        <span>{{datas.name}}</span>
      </div>
      <div class="conent_x">
        <span>课程类型</span>
        <span>{{datas.courseTypeParentName}}>{{datas.courseTypeName}}</span>
      </div>
      <div class="conent_x">
        <span>学习目标</span>
        <span
          :style="{'width':'700px','overflow':'hidden','textOverflow':'ellipsis','whitespace': 'nowrap'}"
        >{{datas.target}}</span>
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
          <li v-for="(g,index) in datas.courseResources" :key="index">
            <span>附件{{index+1}}</span>
            <span>{{g.resourceName}}</span>
            <span>
              <a :href="g.resourceId" @click.prevent="downloadItem(g.resourceId,g.resourceName)">下载</a>
            </span>
          </li>
        </ul>
      </div>

      <ul>
        <li v-for="(a,index) in datas.courseClassServers" :key="index">
          <div :style="{'height':'auto','marginBottom':'20px','overflow':'hidden'}">
            <div class="conent_t" :style="{'float':'left'}">
              <div class="conent_x">
                <span>上课年级</span>
                <span>{{a.gradeName}}</span>
              </div>
              <div class="conent_x" :style="{width:'600px'}">
                <span>上课时间</span>
                <span>{{a.startDate}}~{{a.endDate}}</span>
              </div>
            </div>

            <div class="conent_t" :style="{'float':'left'}">
              <div class="conent_x">
                <span>上课班级</span>
                <span>{{a.className}}</span>
              </div>
            </div>
          </div>
          <div class="conent_x">
            <span>活动基地</span>
            <span>{{a.baseinfoName}}</span>
          </div>
          <div class="conent_x">
            <span>基地地址</span>
            <span>{{a.baseAddress}}</span>
          </div>
          <div class="conent_x">
            <span>参与服务</span>
            <span>{{a.serverTitle}}</span>
          </div>
          <div class :style="{'paddingLeft':'40px','margin':'20px 0','overflow':'hidden'}">
            <span
              :style="{'display':'inline-block','fontSize':'16px','color':'#666','vertical-align':'top','margin-right':'20px'}"
            >服务详情</span>
            <span
              :style="{'fontSize':'16px','color':'#333','display':'inline-block','height':'160px','width':'676px','border':'1px solid #ccc','overflowY':'auto'}"
            >{{a.serverExpound}}</span>
          </div>
          <div class="conent_x" :style="{'position':'relative'}">
            <span class="conent_u">负责人</span>
            <span>{{a.serverPersonInCharge}}</span>
            <div class="conent_x" :style="{'position':'absolute','right':'-410px','top':'0px'}">
              <span class="conent_u">联系方式</span>
              <span>{{a.serverPersonInChargePhone}}</span>
            </div>
          </div>
          <div class="conent_x">
            <span class="conent_u">活动位置</span>
            <span>{{a.serverAddress}}</span>
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
        <span @click.prevent="goback()">取消</span>
      </div>
    </el-row>
  </div>
</template>
<script>
import {
    getdetailsofstudentcourses,
    myworksuploadworks,
    studentsubmissionofmywork,
    detailsofcourselistofworkstobeaudited
} from '@/api/frontstage'
import { upload } from '@/mixin/common'
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import aliUpload from '@/components/common/upload.vue'
export default {
    mixins: [upload, uploadFileSize],
    name: 'submissionofworks',
    components: {
        'ali-upload': aliUpload
    },
    data() {
        return {
            id: '',
            datas: '',
            courseId: '',
            fileList: [],
            input: '',
            textarea: '',
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            dialogImageUrl: '',
            dialogVisible: false,
            isLoading: false,
            picResources: [],
            // 图片
            imgSize: 2,
            // 视频
            videoSize: 10,
            // 表单
            form: {
                // 作品名称
                name: '',
                // 作品介绍
                introduction: '',
                imgList: [],
                videoList: []
            },
            rules: {
                name: [
                    { required: true, message: '请输入作品名称', trigger: 'change' },
                    { max: 29, message: '不超过30字', trigger: 'change' }
                ],
                introduction: [
                    { required: true, message: '请输入作品介绍', trigger: 'change' }
                ],
                imgList: { required: true, message: '请上传作品图片', type: 'array' }
            },
            istrue: 0,
            num: 0,
            sum: false,
            imgurl01: require('../../../../../../static/img/kechen1.png'),
            imgurl02: require('../../../../../../static/img/kechen2.png')
        }
    },
    computed: {},
    created() {
        this.gettlist()
    },
    methods: {
        async gettlist() {
            let type = this.$route.query.type
            let id = this.$route.query.id
            if (type === 1) {
                let res = await getdetailsofstudentcourses({ id: id })
                // console.log(res);
                this.datas = res.data.entity
                this.courseId = res.data.entity.id
                // console.log(this.courseId);
            }
            if (type === 2) {
                let res = await detailsofcourselistofworkstobeaudited({ id: id })
                // console.log(res);
                this.datas = res.data.entity
                this.courseId = res.data.entity.id
                // console.log(this.courseId);
            }
        },
        changes() {
            this.istrue = !this.istrue
        },
        giveimg(item, index) {
            this.$refs.imgsrc.src = item
            this.num = index
        },
        passto() {
            this.sum = !this.sum
        },
        movego() {
            this.$router.push({ path: '/agment/tbuploaded' })
        },

        uploadCover({ fileList } = {}) {
            this.checkCover({ fileList })
            // console.log(fileList);
        },
        setCover(file) {
            if (file.isFlag === 1) {
                return
            }

            if (file.url) {
                this.$refs.uploadPicture.uploadList.forEach(x => {
                    x.isFlag = 'y'
                })
                this.$set(file, 'isFlag', 'y')
            } else {
                this.$message({
                    message: '该图片未上传成功',
                    type: 'warning'
                })
            }
        },
        checkCover({ fileList } = {}) {
            if (fileList.length) {
                const _idx = fileList.findIndex(x => Number(x.isFlag) === 'y')
                if (!~_idx) {
                    fileList[0].isFlag = 'y'
                }
            }
        },
        onSubmit(isSubmit) {
            this.$set(this.rules, 'imgList', {
                required: true,
                message: '请上传作品图片',
                type: 'array'
            })
            this.$refs.form.validate(valid => {
                if (valid) {
                    const form = this.form
                    const imgList = form.imgList
                        .filter(x => x.url)
                        .map(i => ({
                            name: i.name,
                            // resourceType: "1",
                            resourceId: i.url,
                            isFlag: i.isFlag || 'n'
                        }))
                    const videoList = form.videoList
                        .filter(x => x.url)
                        .map(i => ({
                            name: i.name,
                            // resourceType: "2",
                            resourceId: i.url,
                            isFlag: 'y'
                        }))
                    // const resourceList = [...imgList, ...videoList];
                    const data = {
                        workName: form.name,
                        description: form.introduction,
                        picResources: imgList,
                        accResources: videoList,
                        openRange: form.openRange
                    }
                    if (isSubmit === 1) {
                        data.courseId = this.courseId
                        myworksuploadworks(data).then(res => {
                            // console.log(res);
                            if (res.data.code === 200) {
                                this.$message({
                                    showClose: true,
                                    message: '保存成功',
                                    type: 'success'
                                })
                                this.id = res.data.appendInfo.id || ''
                            } else {
                                this.$message({ message: res.data.msg })
                            }
                        })
                    }
                    if (isSubmit === 0) {
                        if (this.id) {
                            data.id = this.id
                            data.courseId = this.courseId || this.$route.query.id
                            studentsubmissionofmywork(data).then(res => {
                                // console.log(res);
                                if (res.data.code === 200) {
                                    this.$message({
                                        showClose: true,
                                        message: '提交成功',
                                        type: 'success'
                                    })
                                    this.$router.go(-1)
                                } else {
                                    this.$message({ message: res.data.msg })
                                }
                            })
                        } else {
                            this.$message({
                                showClose: true,
                                message: '请先保存!',
                                type: 'warning'
                            })
                        }
                    }
                }
            })
        },
        goback() {
            this.$router.push({path: '/space/mywork/uploadworks'})
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/css/scss/vars.scss";
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
    display: block;
    float: left;
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
            border-radius: 4px;
            border: solid 1px #008aff;
            display: block;
            width: 30px;
            height: 24px;
            line-height: 24px;
            margin-top: 5px;
            text-align: center;
            color: #008aff;
          }
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
.worksPublish {
  min-height: 550px;
  font-size: 14px;
  .works-img-cover {
    position: absolute;
    bottom: 0;
    font-size: 14px;
    line-height: 1;

    &:before {
      content: "";
      display: inline-block;
      position: absolute;
      bottom: 0;
      width: 0;
      height: 0;
      border-bottom: 30px solid #ffc000;
      border-right: 30px solid transparent;
    }
    .icon {
      position: absolute;
      bottom: 2px;
      left: 2px;
    }
  }
  // 上传按钮
  .upload-btn {
    width: 90px;
    height: 38px;
    border: 1px solid #c9c9c9;
    border-radius: 2px;
    display: inline-block;
    margin-right: 10px;
    i {
      color: $theme_color;
    }
  }
  // 发布、取消按钮
  .publish-btn {
    background-color: $theme_color;
    color: #fff;
    margin-left: 5px;
  }
  .upload-tip {
    font-size: 12px;
  }
  .publish-btn:hover {
    opacity: 0.75;
  }
  .btn {
    margin-left: 5px;
    border: 1px solid $theme_color;
    box-sizing: border-box;
    background-color: #fff;
    color: $theme_color;
  }
  .btn:hover {
    background-color: $theme_color;
    color: #fff;
  }
  .el-textarea__inner {
    height: 100px;
  }
  .el-input__inner {
    height: 38px;
  }
  .el-input__icon {
    width: 10%;
  }
  .el-tag .el-icon-close:hover {
    background-color: $theme_color;
  }
  .el-select .el-tag {
    margin-left: 5px;
  }
  .el-upload-list__item.is-success .el-icon-close,
  .el-upload__input {
    position: absolute;
    top: 5px;
    right: 10px;
  }
  .el-cascader {
    width: 100%;
  }
}
</style>
