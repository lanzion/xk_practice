<template>
    <el-form ref="form" class="g-form--wrap" label-width="80px" :model="form" :rules="rules" :isloading="isLoading">
        <el-form-item label="登录账号" prop="account">
            <el-col :span="12">
                <el-input v-model="form.account" placeholder="请输入登录账号"></el-input>
            </el-col>
        </el-form-item>
         <el-form-item label="证件类型" >
            <el-col :span="12">
                <el-select v-model="form.certiType" placeholder="请选择证件类型" :disabled="true">
                    <el-option v-for="item in idTypeList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="证件号码" prop="certiNum">
            <el-col :span="12">
                <el-input v-model="form.certiNum" placeholder="请输入证件号码"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
            <el-col :span="12">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
                <el-radio v-for="(item) in sex" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="所属学校" prop="schoolId">
            <el-col :span="12">
                <el-select v-model="form.schoolId" placeholder="请选择所属学校" filterable clearable :disabled="identiy=='9'&&form.schoolId!=''">
                    <el-option
                        v-for="item in school"
                        :key="item.id"
                        :label="item.schoolName"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="最高学历" prop="education">
            <el-col :span="12">
                <el-select v-model="form.education" placeholder="请选择最高学历" clearable>
                    <el-option
                        v-for="item in education"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="职称" prop="title">
            <el-col :span="12">
                <el-select v-model="form.title" placeholder="请选择职称" clearable>
                    <el-option
                        v-for="item in title"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="编制类型" prop="compileType">
            <el-col :span="12">
                <el-select v-model="form.compileType" placeholder="请选择编制类型" clearable>
                    <el-option
                        v-for="item in compileType"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code">
                    </el-option>
                </el-select>
            </el-col>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-col :span="12">
                <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-col :span="12">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入联系地址"></el-input>
        </el-form-item>
        <el-form-item label="任教学科" prop="teach">
            <el-select v-model="form.teach" placeholder="请选择任教学科" :multiple="true" clearable>
                <el-option
                    v-for="item in technicalClassification"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="个人简介" prop="sign">
            <el-input type="textarea" :rows="4" placeholder="请输入个人简介" v-model="form.sign"></el-input>
        </el-form-item>
        <el-form-item label="教学特长" prop="speciality">
            <el-input type="textarea" :rows="4" placeholder="请输入教学特长" v-model="form.speciality"></el-input>
        </el-form-item>
        <el-form-item label="研究成果" prop="achievement">
            <el-input type="textarea" :rows="4" placeholder="请输入研究成果" v-model="form.achievement"></el-input>
        </el-form-item>
        <el-form-item class="g-operate--box">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { addTeacher, editTeacher } from '@/api/base'

import { validateAccount, validateUserName, validateIDCode, validatePhone, validateEmail } from '@/utils/utility/validateRule'
let identiy = localStorage.getItem('xk_practice_identity');
export default {
    data() {
        return {
            identiy:identiy,
            isLoading: false,
             idTypeList:[{
                name:'居民身份证',
                id:'26',
            }],
            form: {
                certiType:'26',
                account: '',
                certiNum: '',
                name: '',
                sex: '',
                schoolId: '',
                teach: [],
                education: '',
                title: '',
                compileType: '',
                phone: '',
                email: '',
                address: '',
                sign: '',
                speciality: '',
                achievement: ''
            },
            rules: {
                account: [
                    { required: true, message: '请输入登录账号', trigger: ['change', 'blur'] },
                    { validator: validateAccount, trigger: ['change', 'blur'] }
                ],
                certiNum: [
                    { required: true, message: '请输入身份证号', trigger: ['change', 'blur'] },
                    { validator: validateIDCode, trigger: ['change', 'blur'] }
                ],
                name: [
                    { required: true, message: '请输入真实姓名', trigger: ['change', 'blur'] },
                    { validator: validateUserName, trigger: ['change', 'blur'] }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: ['change', 'blur'] }
                ],
                schoolId: [
                    { required: true, message: '请选择所属学校', trigger: ['change', 'blur'] }
                ],
                // phone: [
                //     { required: true, message: '请输入手机号', trigger: ['change', 'blur'] },
                //     { validator: validatePhone, trigger: ['change', 'blur'] }
                // ],
                // email: [
                //     { required: true, message: '请输入电子邮箱', trigger: ['change', 'blur'] },
                //     { validator: validateEmail, trigger: ['change', 'blur'] }
                // ],
                teach: [
                    { required: true, message: '请选择任教学科', trigger: ['change', 'blur'] }
                ]
            }
        }
    },
    computed: {
        ...mapState('dict', {
            sex: state => ((state.sex || {}).dicList || []).filter(x => x.option),
            subject: state => (state.subject || {}).dicList || [],
            education: state => (state.education || {}).dicList || [],
            title: state => (state.title || {}).dicList || [],
            compileType: state => (state.compileType || {}).dicList || [],
            technicalClassification:state =>(state.technicalClassification||{}).dicList || [],
        }),
        ...mapState('list', {
            school: state => state.school || []
        })
    },
    watch: {
        '$route.query.id': {
            handler: function (id) {
                if (id) {
                    this.getTeacherDetail({ id }).then(datas => {
                        this.form = datas
                        this.$refs.form.resetFields()
                    })
                }
            },
            immediate: true
        },
    },
    created() {
        this.getSchoolList();
         if(identiy==9){
             let baseInfo =JSON.parse(localStorage.getItem('xk_practice_baseInfo'));
            this.form.schoolId = baseInfo.baseInfo.id;
         }
        this.getDataDict({ code: 'subject' })
        this.getDataDict({ code: 'education' })
        this.getDataDict({ code: 'title' })
        this.getDataDict({ code: 'compileType' })
        this.getDataDict({ code: 'technicalClassification' })
    },
    methods: {
        ...mapActions('dict', ['getDataDict']),
        ...mapActions('user', ['getTeacherDetail']),
        ...mapActions('list', ['getSchoolList']),

        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.isLoading = true

                    const handler = this.form.id ? editTeacher : addTeacher
                    const params = Object.assign({}, this.form, {
                        teach: this.form.teach.toString()
                    })
                    handler(params).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.$message({
                                message: this.form.id ? '编辑成功' : '添加成功',
                                type: 'success'
                            })
                            this.cancel()
                        } else {
                            this.$message({
                                message: msg,
                                type: 'warning'
                            })
                        }
                    }).finally(() => {
                        this.isLoading = false
                    })
                } else {
                    return false
                }
            })
        },

        cancel() {
            
            this.$router.go(-1)
        }
    }
}
</script>
