<template>
  <div class="activityEvaluation">
    <ul class="activityEvaluation-conent-ul">
      <li class="activityEvaluation-conent-li">
        <div class="activityEvaluation-conent-li-title">
          <div>
            <span>基地名称:</span>
            <span>{{datas.baseName}}</span>
          </div>
          <div>
            <span>活动地点:</span>
            <span>{{datas.activityAddr}}</span>
          </div>
        </div>
        <div class="activityEvaluation-conent-li-one">
          <div @click="goactivityDetail()">
            <ov-image :src-data="datas.cover" :type="3" :img-height="'98px'"></ov-image>
          </div>
          <div @click="goactivityDetail()">
            <h3>{{datas.activityName}}</h3>
            <p>{{datas.typeParent}}>>{{datas.typeChild}}</p>
          </div>
        </div>
        <!-- <div class="activityEvaluation-conent-li-fiv">{{datas.activityStartTime.slice(0,10)}}</div> -->
        <div v-if="type == 1">
          <div>
            <span>{{datas.activityStartTime.slice(0,10)}}</span>
            <span>{{datas.activityStartTime.slice(10,16)}}</span>
          </div>
          <p v-if="datas.courseDuration == 'A'">(半天)</p>
          <p v-else-if="datas.courseDuration == 'B'">(一天)</p>
          <p v-else-if="datas.courseDuration == 'C'">(一天半)</p>
          <p v-else-if="datas.courseDuration == 'D'">(两天)</p>
          <p v-else-if="datas.courseDuration == 'E'">(两天半)</p>
          <p v-else-if="datas.courseDuration == 'F'">(三天)</p>
        </div>
        <div
          v-else-if="type == 2"
        >{{datas.activityStartTime.slice(0,16)}}--{{datas.activityEndTime.slice(0,16)}}</div>
      </li>
    </ul>
    <el-form ref="form" class="g-form--wrap" label-width="100px" :model="form" :rules="rules">
      <el-form-item label="总体评分" prop="value">
        <el-rate
          class="activityEvaluation-rate-show"
          v-model="form.value"
          show-score
          text-color="#ff9900"
          score-template="{value}分"
        ></el-rate>
      </el-form-item>

      <el-form-item label="总体感悟" prop="textarea">
        <el-input
          class="activityEvaluation-two-tea"
          type="textarea"
          :autosize="{ minRows: 4,}"
          placeholder="活动是否给您来收获，快来分享评价吧~~"
          v-model="form.textarea"
        ></el-input>
      </el-form-item>

      <el-form-item label="晒图">
        <ali-upload
          :limit="5"
          :file-list.sync="imgList"
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
      </el-form-item>
    </el-form>
    <div :style="{textAlign:'center'}">
      <el-button type="primary">提交评价</el-button>
    </div>
  </div>
</template>

<script>
import {
  requestwebapiActivityevaluation,
  requestwebapiActivityevaluationDetail
} from "@/api/webApi/space";
import { upload } from "@/mixin/common";
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import aliUpload from "@/components/common/upload.vue";
export default {
  mixins: [upload, uploadFileSize],
  props: {},
  data() {
    return {
      datas: {},
      imgList: [],
      type: "",
      form: {
        value: 5,
        textarea: ""
      },
      rules: {
        value: {
          required: true,
          message: "请填写评分",
          type: "number"
        },
        textarea: {
          required: true,
          message: "请填写感悟",
          type: "string"
        }
      }
    };
  },
  computed: {},
  created() {
    this.type = this.$route.query.type;
    this.datas =
      JSON.parse(sessionStorage.getItem("xk_registrationactivitiesDetail")) ||
      {};
  },
  mounted() {},
  watch: {},
  methods: {
    uploadCover({ fileList } = {}) {
      this.checkCover({ fileList });
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
    }
  },
  components: {
    "ali-upload": aliUpload
  }
};
</script>

<style scoped lang="scss">
.activityEvaluation {
  width: 978px;
  margin-bottom: 50px;
  .activityEvaluation-conent-ul {
    width: 100%;
    margin-top: 16px;
    .activityEvaluation-conent-li {
      width: 100%;
      height: 192px;
      margin-bottom: 24px;
      box-shadow: 0px 1px 2px 0px rgba(25, 25, 25, 0.19);
      .activityEvaluation-conent-li-title {
        height: 48px;
        line-height: 48px;
        background-color: #f5f8ff;
        div {
          span {
            &:nth-child(1) {
              font-size: 12px;
              letter-spacing: 0px;
              color: #666666;
            }
            &:nth-child(2) {
              font-size: 12px;
              letter-spacing: 0px;
              color: #333333;
            }
          }
          &:nth-child(1) {
            float: left;
            margin-left: 10px;
            margin-right: 60px;
          }
          &:nth-child(2) {
            float: left;
          }
          &:nth-child(3) {
            float: right;
            margin-right: 30px;
          }
        }
      }
      .activityEvaluation-conent-li-one {
        width: 764px;
        height: 142px;
        float: left;
        padding: 20px 0 0 10px;
        border-right: 1px solid #e2e2e4;
        box-sizing: border-box;
        div {
          float: left;
          &:nth-child(1) {
            width: 160px;
            height: 98px;
            // margin-left: 10px;
            // margin-top: 20px;
          }
          &:nth-child(2) {
            width: 500px;
            margin-left: 10px;
            h3 {
              width: 100%;
              font-size: 16px;
              line-height: 27px;
              letter-spacing: 0px;
              color: #333333;
              margin-bottom: 40px;
              word-break: break-all;
            }
            p {
              width: 100%;
              font-size: 14px;
              line-height: 24px;
              letter-spacing: 0px;
              color: #666666;
              word-break: break-all;
            }
          }
        }
      }

      .activityEvaluation-conent-li-fiv {
        width: 180px;
        height: 142px;
        line-height: 142px;
        text-align: center;
        float: left;
        font-size: 14px;
        color: #666666;
      }
    }
  }
  .activityEvaluation-rate {
    span {
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0px;
      color: #666666;
      vertical-align: middle;
    }
    .activityEvaluation-rate-show {
      display: inline-block;
      vertical-align: middle;
    }
  }
  .activityEvaluation-two {
    margin-top: 30px;
    span {
      font-size: 14px;
      line-height: 18px;
      letter-spacing: 0px;
      color: #666666;
      vertical-align: top;
    }
    .activityEvaluation-two-tea {
      display: inline-block;
      width: 680px;
      vertical-align: top;
    }
    .conent_tx {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      overflow: hidden;
      margin-bottom: 30px;
      overflow: hidden;
      .conent_tx_one {
        width: 80px;
        height: 40px;
        float: left;
        margin-right: 30px;
        span {
          display: block;
          width: 100%;
          height: 100%;
          line-height: 40px;
          text-align: left;
          color: #666666;
          font-size: 16px;
        }
      }
      .conent_tx_two {
        width: 680px;
        height: 40px;
        float: left;
      }
      .conent_tx_two_r {
        height: 128px;
      }
    }
  }
}
/deep/.el-rate {
  line-height: 2.5;
}
</style>
