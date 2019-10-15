<template>
    <!-- <component :is="component" class="m-form--wrap" :form="form" /> -->
    <div class="forms">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-col :span="10">
                    <!-- <el-input v-model="ruleForm.name" :disabled="true"></el-input> -->
                </el-col>
            </el-form-item>
            <el-form-item label="姓名" prop="names">
                <el-col :span="10">
                    <!-- <el-input v-model="ruleForm.names" placeholder="请输入姓名"></el-input>                 -->
                </el-col>
            </el-form-item>
            <el-form-item label="性别" required>
                <el-col :span="10">
                    <!-- <el-radio v-model="ruleForm.radio" label="1">男</el-radio>
                    <el-radio v-model="ruleForm.radio" label="2">女</el-radio>             -->
                </el-col>
            </el-form-item>
            <el-form-item label="证件类型" prop="idType">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <!-- <el-input v-model="ruleForm.idType" :disabled="true"></el-input>                -->
                    </el-col>
                    <el-col :span="6">
                        <el-button type="danger" plain size="medium">修改绑定</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="证件号码" prop="ids">
                <el-row :gutter="10">
                    <el-col :span="10">
                        <!-- <el-input v-model="ruleForm.ids" :disabled="true"></el-input>  -->
                    </el-col>
                    <el-col :span="6">
                        <el-button type="danger" plain size="medium">修改绑定</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="所属学校" prop="school">
                <el-col :span="10">
                    <!-- <el-input v-model="ruleForm.school" :disabled="true"></el-input>   -->
                </el-col>
            </el-form-item>
             <el-form-item label="手机号码" prop="phone">
                <el-col :span="10">
                    <!-- <el-input v-model="ruleForm.phone" :disabled="true"></el-input>    -->
                </el-col>
            </el-form-item>
             <el-form-item label="电子邮箱" prop="emails">
                <el-col :span="10">
                   <!-- <el-input v-model="ruleForm.emails" :disabled="true"></el-input>     -->
                </el-col>
            </el-form-item>
            <el-form-item label="联系地址" prop="address">
                <el-col :span="18">
                    <el-input v-model="ruleForm.address"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="个性签名" prop="desc">
                <el-col :span="18">
                   <!-- <el-input type="textarea" v-model="ruleForm.desc" :rows="5" maxlength="100" placeholder="请输入内容"></el-input> -->
                   <el-input v-model="ruleForm.emails" :disabled="true"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button class="submitBtn" type="primary" @click="submitForm('ruleForm')" size="small">保存</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
    data() {
        return {
            ruleForm: {
                name: 'mengyidong',
                names: '张婷',
                radio: '2',
                idType: '居民身份证',
                ids: '45210011000000000',
                school: '天河中学',
                phone: '15024112002',
                emails: '15415@163.com',
                address: '广州市天河区',
                desc: '努力继续努力'
            },
            // rules: {
            //     name: [
            //         { required: true, message: '请输入活动名称', trigger: 'blur' },
            //         { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            //     ],
            //     region: [
            //         { required: true, message: '请选择活动区域', trigger: 'change' }
            //     ],
            //     date1: [
            //         { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            //     ],
            //     date2: [
            //         { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            //     ],
            //     type: [
            //         { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            //     ],
            //     resource: [
            //         { required: true, message: '请选择活动资源', trigger: 'change' }
            //     ],
            //     desc: [
            //         { required: true, message: '请填写活动形式', trigger: 'blur' }
            //     ]
            // }
        }
    },
    computed: {
        ...mapState('login', {
            form: state => (state.baseInfo || {}).baseInfo || {}
        }),
        ...mapGetters('login', {
            identity: 'identityCode'
        }),
        component: function () {
            return this.identity && `${this.identity}-form` || 'student-form'
        }
    },
    components: {
        'teacher-form': resolve => require(['@/components/my/profile/teacher-form'], resolve),
        'student-form': resolve => require(['@/components/my/profile/student-form'], resolve),
        'parent-form': resolve => require(['@/components/my/profile/parent-form'], resolve)
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    })
                } else {
                    // console.log('error submit!!')
                    return false
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
    @import '~@/assets/css/mixin/core.scss';
    .forms {
        padding: 30px 0 060px 0;
        .submitBtn {
            margin-left: 69%;
        }
    }
</style>
