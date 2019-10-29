<template>
    <div class="toevaluationofstudentactivities">
        <div class="conent_tx">
            <div class="conent_tx_one">
                <span>活动基地</span>
            </div>
            <div class="conent_tx_two">
                <el-input v-model="input1" disabled placeholder></el-input>
            </div>
        </div>
        <div class="conent_tx">
            <div class="conent_tx_one">
                <span>基地地址</span>
            </div>
            <div class="conent_tx_two">
                <el-input v-model="input2" disabled placeholder="请输入地址"></el-input>
            </div>
        </div>
        <div class="conent_tx">
            <div class="conent_tx_one">
                <span>活动课程</span>
            </div>
            <div class="conent_tx_two">
                <el-input v-model="input3" disabled placeholder="请输入活动课程名称"></el-input>
            </div>
        </div>
        <div class="conent_tx">
            <div class="conent_tx_one">
                <span>参与服务</span>
            </div>
            <div class="conent_tx_two">
                <el-input v-model="input4" disabled placeholder="请输入参与服务的名称"></el-input>
            </div>
        </div>
        <div class="conent_tx" :style="{'height':'auto'}">
            <div class="conent_tx_one">
                <span>服务评价</span>
            </div>
            <div class="conent_tx_two conent_tx_two_r">
                <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入对本次课程的服务基地进行评价..."
                    v-model="textarea"
                ></el-input>
            </div>
        </div>

        <div class="conent_tx">
            <div class="conent_tx_one">
                <span>上传图片</span>
            </div>
            <div class="conent_tx_two" :style="{'height':'auto'}">
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
            </div>
        </div>

        <div class="btn">
            <el-button round @click="goback">返回列表</el-button>
            <el-button type="primary" round @click="onSubmit">保存提交</el-button>
        </div>
    </div>
</template>
<script>
import { upload } from '@/mixin/common'
import aliUpload from '@/components/common/upload.vue'
import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import {
    detailsofstudentserviceevaluation,
    mycourseserviceevaluationsubmission
} from '@/api/frontstage'
export default {
    mixins: [upload, uploadFileSize],
    name: 'toevaluationofstudentactivities',
    components: {
        'ali-upload': aliUpload
    },
    data() {
        return {
            reviewerClassId: '',
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            textarea: '',
            dialogImageUrl: '',
            dialogVisible: false,
            datas: '',
            goods: '',
            imgList: [],
            serverType: '',
            serverField: '',
            rules: {
                imgList: {
                    required: true,
                    message: '请上传作品图片',
                    type: 'array'
                }
            }
        }
    },
    created() {
        this.getlist()
    },
    methods: {
        async getlist() {
            let qts = JSON.parse(localStorage.getItem('goods'))
            let qid = localStorage.getItem('fid')
            let pid = this.$route.params.id
            let id = ''
            if (pid) {
                id = pid
            } else {
                id = qid
            }
            let reviewerClassIds = this.$route.params.reviewerClassId
            let reclassId = sessionStorage.getItem('reviewerClassId')
            let reviewerClassId = ''
            if (reviewerClassIds) {
                reviewerClassId = reviewerClassIds
            } else {
                reviewerClassId = reclassId || ''
            }
            this.reviewerClassId = reviewerClassId
            let res = await detailsofstudentserviceevaluation({
                id: id
            })
            this.datas = res.data.entity
            this.input1 = this.datas.baseInfoName
            this.input2 = this.datas.baseInfoAddress
            this.input3 = this.datas.courseName
            this.input4 = this.datas.title

            this.serverId = this.datas.id
            this.serverBsinfoId = this.datas.baseInfoId
            this.serverTitle = this.datas.title
            this.courseClassId = this.datas.courseClassId
            this.serverField = qts.courseTypeParent
            this.serverType = qts.courseType
        },
        uploadCover({ fileList } = {}) {
            this.checkCover({ fileList })
        },
        goback() {
            this.$router.go(-1)
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

            const imgList = this.imgList
                .filter(x => x.url)
                .map(i => ({
                    name: i.name,
                    resourceId: i.url,
                    isFlag: i.isFlag || 'n'
                }))
            const data = {
                reviewerClassId: this.reviewerClassId,
                serverId: this.serverId,
                serverBsinfoId: this.serverBsinfoId,
                serverField: this.serverField,
                serverType: this.serverType,
                serverTitle: this.serverTitle,
                courseClassId: this.courseClassId,
                remark: this.textarea,
                resources: imgList
            }
            mycourseserviceevaluationsubmission(data).then(res => {
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
        }
    }
}
</script>
<style lang="scss" scoped>
.toevaluationofstudentactivities {
    width: 100%;
    padding: 30px 0;
    box-sizing: border-box;
    overflow: hidden;
}
.conent_tx {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    overflow: hidden;
    margin-bottom: 30px;
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
.conent_tx_two_sp {
    display: block;
    height: 40px;
    line-height: 40px;
    color: #999999;
    font-size: 12px;
}
.btn {
    text-align: right;
    padding: 0 30px;
    box-sizing: border-box;
}
</style>
