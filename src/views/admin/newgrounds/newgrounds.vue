<template>
    <div class="newgrounds">
        <div class="g-search--wrap clearfix">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                :style="{'marginBottm':'20px'}"
            >
                <el-form-item label="基地名称" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="活动形式">
                    <el-input type="textarea" v-model="form.desc" @submit.native.prevent></el-input>
                </el-form-item>

                <el-form-item label="联系人" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="传真" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>

                <el-form-item label="所在地区" prop="name">
                    <el-select
                        v-model="value6"
                        placeholder="省/市"
                        :style="{'width':'120px','marginRight':'20px'}"
                    >
                        <el-option
                            v-for="item in cities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                            <span style="float: left">{{ item.label }}</span>
                            <span
                                style="float: right; color: #8492a6; font-size: 13px"
                            >{{ item.value }}</span>
                        </el-option>
                    </el-select>
                    <el-select
                        v-model="value6"
                        placeholder="市/区"
                        :style="{'width':'120px','marginRight':'20px'}"
                    >
                        <el-option
                            v-for="item in cities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                            <span style="float: left">{{ item.label }}</span>
                            <span
                                style="float: right; color: #8492a6; font-size: 13px"
                            >{{ item.value }}</span>
                        </el-option>
                    </el-select>

                    <el-select
                        v-model="value6"
                        placeholder="区/县"
                        :style="{'width':'120px','marginRight':'20px'}"
                    >
                        <el-option
                            v-for="item in cities"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                            <span style="float: left">{{ item.label }}</span>
                            <span
                                style="float: right; color: #8492a6; font-size: 13px"
                            >{{ item.value }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="所属街道" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="详细地址" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
            </el-form>

            <div :style="{'height':'40px'}">
                <div :style="{'float':'left','width':'600px','height':'40px'}">
                    <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                        :style="{'marginBottm':'20px'}"
                    >
                        <el-form-item label="工作周期" prop="name">
                            <el-checkbox-group v-model="checkboxGroup1">
                                <el-checkbox-button
                                    v-for="city in cities"
                                    :label="city"
                                    :key="city"
                                >{{city}}</el-checkbox-button>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </div>
                <div :style="{'float':'left','width':'300px'}">
                    <span :style="{'fontSize':'14px','lineHeight':'30px'}">未选择的时间不可以预约活动课程</span>
                </div>
            </div>

            <div :style="{'height':'40px','width':'100%','marginTop':'20px'}">
                <div :style="{'width':'300px','float':'left'}">
                    <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="上班时间" prop="name">
                            <el-time-select
                                v-model="value"
                                :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '18:30'
                                }"
                                placeholder="选择时间"
                            ></el-time-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div :style="{'width':'600px','float':'left'}">
                    <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="午休时间" prop="name">
                            <div :style="{'width':'200px','float':'left','marginRight':'20px'}">
                                <el-time-select
                                    placeholder="起始时间"
                                    v-model="startTime"
                                    :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '18:30',
                                    }"
                                ></el-time-select>
                            </div>
                            <div :style="{'width':'200px','float':'left'}">
                                <el-time-select
                                    placeholder="起始时间"
                                    v-model="startTime"
                                    :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '18:30',
                                    }"
                                ></el-time-select>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div :style="{'width':'300px','float':'left'}">
                    <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                    >
                        <el-form-item label="下班时间" prop="name">
                            <el-time-select
                                v-model="value2"
                                :picker-options="{
                                    start: '08:30',
                                    step: '00:15',
                                    end: '18:30'
                                }"
                                placeholder="选择时间"
                            ></el-time-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div :style="{'width':'100%','height':'40px','float':'left'}">
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="170px"
                    class="demo-ruleForm"
                    :style="{'marginBottm':'20px'}"
                >
                    <el-form-item label="每日可举办活动次数" prop="name">
                        <el-input
                            placeholder="请输入内容"
                            v-model="input"
                            clearable
                            :style="{'width':'100px'}"
                        ></el-input>
                        <span>次</span>
                    </el-form-item>
                </el-form>
            </div>

            <div :style="{'float':'left','width':'100%','marginTop':'20px'}">
                <span
                    :style="{'dispalay':'block','float':'left','fontSize':'14px','margin':'0 20px 0 30px'}"
                >LOGO</span>

                <div :style="{'border':'1px solid #000','width':'180px','float':'left'}">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>
            <div :style="{'float':'left','width':'100%','marginTop':'20px','fontSize':'14px'}">
                <span :style="{'marginLeft':'90px'}">仅支持JPG、GIF、PNG、JPEG格式，文件小于 5 M。</span>
            </div>

            <div :style="{'float':'left','width':'100%','marginTop':'20px'}">
                <span
                    :style="{'dispalay':'block','float':'left','fontSize':'14px','margin':'0 20px 0 0px'}"
                >创客空间图</span>

                <div :style="{'border':'1px solid #000','width':'180px','float':'left'}">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>
            <div :style="{'float':'left','width':'100%','marginTop':'20px','fontSize':'14px'}">
                <span :style="{'marginLeft':'90px'}">仅支持JPG、GIF、PNG、JPEG格式，文件小于 5 M。</span>
            </div>

            <div :style="{'float':'left','width':'100%','marginTop':'20px'}">
                <span
                    :style="{'dispalay':'block','float':'left','fontSize':'14px','margin':'0 20px 0 0px','width':'70px'}"
                >创客空间背景图</span>

                <div :style="{'border':'1px solid #000','width':'180px','float':'left'}">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>
            <div :style="{'float':'left','width':'100%','marginTop':'20px','fontSize':'14px'}">
                <span :style="{'marginLeft':'90px','dispalay':'block'}">仅支持JPG、GIF、PNG、JPEG格式，文件小于 5 M。</span>
            </div>
            <div :style="{'float':'left','width':'100%','marginTop':'20px','fontSize':'14px'}">
                <span :style="{'marginLeft':'90px','dispalay':'block'}">建议上传的图片像素为 1200 x 300</span>
            </div>

            <div :style="{'width':'100%','textAlign':'center','marginTop':'20px'}">
                <el-button disabled>提交保存</el-button>
            </div>
        </div>
    </div>
</template>
<script>
const cityOptions = [
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
    '星期日'
]
export default {
    name: 'newgrounds',
    data() {
        return {
            imageUrl: '',
            checkboxGroup1: [''],
            cities: cityOptions,
            input: '',
            dialogImageUrl: '',
            dialogVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            value: '',
            startTime: '',
            endTime: '',
            value2: '',
            ruleForm: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
                region: [
                    {
                        required: true,
                        message: '请选择活动区域',
                        trigger: 'change'
                    }
                ],
                date1: [
                    {
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }
                ],
                date2: [
                    {
                        type: 'date',
                        required: true,
                        message: '请选择时间',
                        trigger: 'change'
                    }
                ],
                type: [
                    {
                        type: 'array',
                        required: true,
                        message: '请至少选择一个活动性质',
                        trigger: 'change'
                    }
                ],
                resource: [
                    {
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }
                ],
                desc: [
                    {
                        required: true,
                        message: '请填写活动形式',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        }
    }
}
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #ccc;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
