<template>
    <el-form ref="form" class="m-form--wrap" label-width="120px" :model="form" :rules="rules" :isloading="isLoading">
        <el-form-item label="评课主题" prop="theme">
            <el-col :span="18">
                <el-input v-model="form.theme" placeholder="请输入评课主题"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="授课教师" prop="teacherId">
            <el-col :span="9">
                <el-input v-model="userName" placeholder="请输入授课教师" :disabled="!isAdmin"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="评课时间" prop="time">
            <el-col :span="9">
                <el-date-picker
                    v-model="form.time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    value-format="timestamp"
                    :picker-options="{
                        disabledDate(time) {
                            return time.getTime() + 86400000 < Date.now()
                        }
                    }"
                    :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="授课年级" prop="grade">
            <el-col :span="9">
                <el-select v-model="form.grade" placeholder="请选择授课年级" clearable>
                    <el-option
                        v-for="item in grade"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="授课学科" prop="subject">
            <el-col :span="9">
                <el-select v-model="form.subject" placeholder="请选择授课学科" clearable>
                    <el-option
                        v-for="item in subject"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="教材版本" prop="textbookVersion">
            <el-col :span="9">
                <el-select v-model="form.textbookVersion" placeholder="请选择教材版本" clearable>
                    <el-option
                        v-for="item in textbookVersion"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item class="is-text" label="教材目录" required>
            <el-col :span="18">
                <el-col :span="10">
                    <el-form-item prop="textbookId">
                        <el-select v-model="form.textbookId" placeholder="请选择教材">
                            <el-option
                                v-for="item in textbook"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="13" :offset="1">
                    <el-form-item prop="textbookCatalogueId" label-width="0">
                        <el-cascader
                            v-model="form.textbookCatalogueId"
                            :options="catalog"
                            :props="{ value: 'id', label: 'name', children: 'textbookCatalogDtoList' }"
                            change-on-select
                            placeholder="请选择目录">
                        </el-cascader>
                    </el-form-item>
                </el-col>
            </el-col>
        </el-form-item>
        <el-form-item label="授课地点" prop="place">
            <el-col :span="18">
                <el-input v-model="form.place" placeholder="请输入授课地点"></el-input>
            </el-col>
        </el-form-item>
        <hr class="separation-line">
        <el-form-item label="评课类型" prop="evaluateType">
            <el-radio-group v-model="form.evaluateType">
                <el-radio-button v-for="(item) in evaluateType" :label="item.code" :key="item.code" :disabled="item.disabled">{{ item.name }}</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="评课视频" prop="content" v-show="form.evaluateType === 2">
            <el-col :span="23">
                <upload listType="file" :limit="1" :file-list.sync="videoList" :accept="videoAccept" :isCovered="true">
                    <p class="m-upload--tip">请上传您的录播评课视频</p>
                </upload>
            </el-col>
        </el-form-item>
        <el-form-item label="预告图片" prop="previewPicture">
            <el-col :span="23">
                <button class="picture-upload--box g-cover--wrap" :class="{ 'is-upload': form.previewPicture }" type="button" @click.prevent="select">
                    <label class="picture-upload--action">
                        <i class="icon icon-add"></i>
                        <span class="txt">上传图片</span>
                    </label>
                    <default-image v-show="form.previewPicture" class="picture-upload--img g-cover--item" :src="form.previewPicture" alt="" />
                </button>
                <input ref="uploader" id="file" class="picture-upload--input" type="file" :accept="imageAccept" @change="changeFile">
                <p class="m-upload--tip picture-upload--tip">图片规格：{{ imageSupportFormat.join(' / ') }}格式，大小不超过{{ pictureSize }}M</p>
            </el-col>
        </el-form-item>
        <el-form-item label="内容简介" prop="content">
            <el-col :span="18">
                <el-input type="textarea" :rows="10" placeholder="请输入内容简介" v-model="form.content" maxlength="1000" show-word-limit></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="教学资源" prop="ecResourseList">
            <el-col :span="23">
                <upload listType="file" :file-list.sync="resourseList" :accept="resourceAccept">
                    <p class="m-upload--tip">不限数量，文件格式：doc / docx / ppt / pptx / xls / xlsx / zip / rar，单个文件大小不超过8M</p>
                </upload>
            </el-col>
        </el-form-item>
        <el-form-item class="m-operate--box">
            <el-col :span="18">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="submit">提交审核</el-button>
            </el-col>
        </el-form-item>

        <el-dialog
            title="编辑图片"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :width="$style.dialogWidth"
            @opened="loadImage"
            @close="resetInputFile">
            <cropper
                ref="cropper"
                class="image-copper--wrap"
                outputType="png"
                :buttons="['cover, contain, refresh', 'large, small', 'left, right']"
                :img.sync="previewPictureFile"
                :autoCrop="true"
                :fixed="true"
                :fixedNumber="[$style.width, $style.height]"
                :height="$style.boxHeight"
                :centerBox="true"
                :infoTrue="true"
                @success="changePictureUrl"
            />
            <span slot="footer" class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="upload">确定</el-button>
            </span>
        </el-dialog>
    </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { upload } from '@/mixin/common'

export default {
    mixins: [upload],
    data() {
        return {
            isLoading: false,
            catalog: [], // 目录
            dialogVisible: false, // 预览图弹窗是否可见
            pictureSize: 1, // 预览图限制大小(单位：M)
            previewPictureFile: '', // 预览图文件
            videoList: [], // 视频文件列表
            resourseList: [], // 资源文件列表
            form: {
                theme: '',
                teacherId: '',
                time: [],
                startTime: '',
                endTime: '',
                grade: '',
                subject: '',
                textbookVersion: '',
                textbookId: '',
                textbookCatalogueId: [],
                place: '',
                evaluateType: 2,
                previewPicture: '',
                ecResourseList: [],
                content: ''
            },
            rules: {
                theme: [
                    { required: true, message: '请输入评课主题', trigger: ['change', 'blur'] }
                ],
                teacherId: [
                    { required: true, message: '请选择授课教师', trigger: ['change', 'blur'] }
                ],
                time: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: ['change', 'blur'] }
                ],
                grade: [
                    { required: true, message: '请选择授课年级', trigger: ['change', 'blur'] }
                ],
                subject: [
                    { required: true, message: '请选择授课学科', trigger: ['change', 'blur'] }
                ],
                textbookVersion: [
                    { required: true, message: '请选择教学版本', trigger: ['change', 'blur'] }
                ],
                textbookId: [
                    { required: true, message: '请选择教材', trigger: ['change', 'blur'] }
                ],
                textbookCatalogueId: [
                    { type: 'array', required: true, message: '请选择教材目录', trigger: ['change', 'blur'] }
                ],
                place: [
                    { required: true, message: '请输入授课地点', trigger: ['change', 'blur'] }
                ],
                evaluateType: [
                    { type: 'number', required: true, message: '请选择评课类型', trigger: ['change', 'blur'] }
                ],
                previewPicture: [
                    { required: true, message: '请上传预告图片', trigger: ['change', 'blur'] }
                ],
                content: [
                    { required: true, message: '请输入内容简介', trigger: ['change', 'blur'] },
                    { max: 1000, message: '长度在 1000 个字符以内', trigger: ['change', 'blur'] }
                ]
            }
        }
    },
    props: {
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState('login', {
            tid: state => ((state.baseInfo || {}).baseInfo || {}).id || '',
            userName: state => ((state.baseInfo || {}).baseInfo || {}).name || ''
        }),
        ...mapState('dict', {
            grade: state => (state.grade || {}).dicList || [],
            subject: state => (state.subject || {}).dicList || [],
            textbookVersion: state => (state.textBookVersion || {}).dicList || [],
            evaluateType: state => (state.evaluateType || {}).dicList || []
        }),
        ...mapState('list', {
            textbookList: state => state.textbook || []
        }),
        videoAccept: function () {
            return this.videoSupportFormat.map(type => `.${type}`).join(',')
        },
        imageAccept: function () {
            return this.imageSupportFormat.map(type => `.${type}`).join(',')
        },
        resourceAccept: function () {
            return [
                ...this.docSupportFormat,
                ...this.winrarSupportFormat
            ].map(type => `.${type}`).join(',')
        },
        textbook: function () {
            const { grade, subject, textbookVersion: version } = this.form
            const condition = Object.fromEntries(Object.entries({ grade, subject, version }).filter(item => item[1]))

            return this.textbookList.filter(x => {
                return Object.keys(condition).every(key => {
                    return x[key] === condition[key]
                })
            })
        }
    },
    watch: {
        '$route.query.id': {
            handler: function (id) {
                if (id) {
                    this.getForenoticeDetail({ id }).then(datas => {
                        this.form = datas
                        this.videoList = [{

                        }]
                        this.resourseList = datas.ecResourseList.map(x => {
                            return {
                                name: x.resourseName,
                                url: x.resoursePath,
                                status: 'success'
                            }
                        })
                        this.$refs.form.resetFields()
                    })
                }
            },
            immediate: true
        },
        textbook: {
            handler: function (textbook) {
                if (this.form.textbookId && !textbook.some(x => x.id === this.form.textbookId)) {
                    this.$set(this.form, 'textbookId', '')
                }
            },
            deep: true
        },
        'form.textbookId': {
            handler: function (textbookId) {
                if (textbookId) {
                    const item = this.textbook.find(x => x.id === textbookId)
                    this.$set(this.form, 'grade', item.grade)
                    this.$set(this.form, 'subject', item.subject)
                    this.$set(this.form, 'textbookVersion', item.version)

                    this.getTextBookCatalogList({ textbookId }).then(datas => {
                        this.catalog = datas
                    })
                }
            }
        },
        'form.time': {
            handler: function (time) {
                const [startTime = '', endTime = ''] = time || []
                this.$set(this.form, 'startTime', startTime)
                this.$set(this.form, 'endTime', endTime)
            }
        }
    },
    created() {
        this.getDataDict({ code: 'grade' })
        this.getDataDict({ code: 'subject' })
        this.getDataDict({ code: 'textBookVersion' })
        this.getTextBookList()
    },
    methods: {
        ...mapActions('dict', ['getDataDict']),
        ...mapActions('list', ['getTextBookList', 'getTextBookCatalogList']),
        ...mapActions('course', ['getForenoticeDetail', 'submitCourse']),

        // 点击选取预览图操作
        select() {
            this.$refs.uploader.click()
        },
        
        // 选择文件值改变
        changeFile(event) {
            const file = event.target.files[0]
            const limitSize = this.pictureSize

            if (limitSize && file.size > limitSize * 1024 * 1024) {
                this.$message({
                    message: `图片大小不能超过${limitSize}M`,
                    type: 'warning'
                })
                return
            }

            this.dialogVisible = true
            this.previewPictureFile = file
        },

        // 选取预览图
        loadImage() {
            this.$refs.cropper.changeFile(this.previewPictureFile)
        },

        // 重置预览图表单
        resetInputFile() {
            const $el = this.$refs.uploader
            $el.value = ''
        },

        // 上传预览图
        upload() {
            this.$refs.cropper.upload()
            this.close()
        },

        // 预览图上传成功回调
        changePictureUrl(file) {
            this.$set(this.form, 'previewPicture', file && file.url || '')
        },

        // 提交表单
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.isLoading = true

                    const { textbookCatalogueId: textbookCatalogueArrId } = this.form
                    const params = Object.assign({}, this.form, {
                        teacherId: this.tid,
                        ecResourseList: this.resourseList.map(x => {
                            return {
                                resourseName: x.name,
                                resoursePath: x.url,
                                type: 1
                            }
                        }),
                        textbookCatalogueId: textbookCatalogueArrId.length && textbookCatalogueArrId[textbookCatalogueArrId.length - 1] || ''
                    })

                    this.submitCourse(params).then(res => {
                        const { code, msg } = res
                        if (code === 200) {
                            this.$message({
                                message: this.form.id ? '编辑成功' : '添加成功',
                                type: 'success'
                            })
                            this.$router.go(-1)
                        } else {
                            this.$message({
                                message: msg,
                                type: 'warning'
                            })
                        }
                    })
                } else {
                    return false
                }
            })
        },

        // 取消
        cancel() {
            this.$router.go(-1)
        },

        // 关闭预览图编辑弹窗
        close() {
            this.dialogVisible = false
        }
    }
}
</script>

<style lang='scss' module>
    @import '~@/assets/css/base/utils.scss';
    @import '~@/assets/css/base/element-variables.scss';
    $--magnification: 20;
    $--dialog-width: 740px;
    $--cover-width: $--activity-cover-ratio-width * $--magnification;
    $--cover-height: $--activity-cover-ratio-height * $--magnification;
    $--copper-height: ($--dialog-width - $--dialog-padding-primary * 2) / $--activity-cover-ratio;

    :export {
        width: $--cover-width;
        height: $--cover-height;
        dialogWidth: $--dialog-width;
        boxHeight: $--copper-height;
    }
</style>

<style lang="scss" scoped>
    @import '~@/assets/css/base/utils.scss';
    @import '~@/assets/css/base/element-variables.scss';
    @import '~@/assets/css/module/my-module-form.scss';

    .m-upload--tip {
        display: inline-block;
        margin-left: $--box-padding;
        font-size: 12px;
        color: $--color-text-regular;
    }

    .picture-upload {
        &--box {
            position: relative;
            width: 340px;
            height: 192px;
            padding: 0;
            border: 0;
            background-color: #f2f2f2;
            text-align: center;
            cursor: pointer;

            &.is-upload {
                .picture-upload--action {
                    display: none;
                }
                .picture-upload--img {
                    display: block;
                }
            }
        }

        &--action {
            display: block;
            cursor: inherit;

            .icon {
                display: block;
                font-size: 54px;
                color: $--color-text-statis;
            }

            .txt {
                display: block;
                margin-top: 25px;
                line-height: 1;
                color: $--color-text-secondary;
            }
        }

        &--input {
            display: none;
        }

        &--tip {
            line-height: 1;
            vertical-align: bottom;
        }
    }

    .image-copper--wrap {
        margin-bottom: -40px - $--input-small-height;
    }
</style>
