<template>
    <el-form ref="form" class="is-line" label-position="top" :model="form" :rules="rules" :status-icon="true">
        <el-form-item label="用户名" prop="account">
            <!-- <span class="el-form-item__label tip">6-12位字母数字组合</span> -->
            <el-input v-model="form.account" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
            <!-- <span class="el-form-item__label tip">6-16位字母数字组合</span> -->
            <el-input v-model="form.pwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePwd">
            <!-- <span class="el-form-item__label tip">6-16位字母数字组合</span> -->
            <el-input v-model="form.rePwd" type="password" placeholder="请再次输入密码"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="userName">
            <el-input v-model="form.userName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="证件号" prop="idCode">
            <el-input v-model="form.idCode" placeholder="请输入证件号"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="省份">
            <el-select v-model="region.provinceId" placeholder="请选择学校所在省份">
                <el-option
                    v-for="item in provinces"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="城市">
            <el-select v-model="region.cityId" placeholder="请选择学校所在城市">
                <el-option
                    v-for="item in citys"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="区/县">
            <el-select v-model="region.areaId" placeholder="请选择学校所在区/县">
                <el-option
                    v-for="item in areas"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="学校">
            <el-select v-model="form.schoolId" placeholder="请选择所在学校" filterable>
                <el-option
                    v-for="item in school"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="班级">
            <el-select v-model="form.classId" placeholder="请选择所在班级" filterable>
                <el-option
                    v-for="item in clasz"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <div class="button-group">
            <el-checkbox class="agree-wrap" v-model="checked">
                <span class="agree-txt">阅读并同意</span>
                <router-link class="agree-link" to="">平台服务条款</router-link>
            </el-checkbox>
        </div>
        <div class="m-content--button">
            <el-button class="m-button--item" type="primary" @click="submit('student')" :loading="isLoading">确认注册</el-button>
        </div>
    </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import register from '@/mixin/register'
import { validateAccount, validateUserName, validatePwd, validateVerifyPwd, validateIDCode, validatePhone } from '@/utils/utility/validateRule'

export default {
    mixins: [register],
    data() {
        const validateRePwd = (rule, value, callback) => {
            validateVerifyPwd(this.form.pwd)(rule, value, callback)
        }
        return {
            form: {
                account: '',
                pwd: '',
                rePwd: '',
                userName: '',
                idCode: '',
                phone: '',
                schoolId: '',
                classId: ''
            },
            rules: {
                account: [
                    { required: true, message: '请输入用户名', trigger: ['change', 'blur'] },
                    { validator: validateAccount, trigger: ['change', 'blur'] }
                ],
                pwd: [
                    { validator: validatePwd, trigger: ['change', 'blur'] }
                ],
                rePwd: [
                    { validator: validateRePwd, trigger: ['change', 'blur'] }
                ],
                userName: [
                    { required: true, message: '请输入真实姓名', trigger: ['change', 'blur'] },
                    { validator: validateUserName, trigger: ['change', 'blur'] }
                ],
                idCode: [
                    { required: true, message: '请输入身份证号', trigger: ['change', 'blur'] },
                    { validator: validateIDCode, trigger: ['change', 'blur'] }
                ],
                phone: [
                    { required: true, message: '请输入手机号', trigger: ['change', 'blur'] },
                    { validator: validatePhone, trigger: ['change', 'blur'] }
                ],
                schoolId: [
                    { required: true, message: '请选择所在学校', trigger: 'change' }
                ],
                classId: [
                    { required: true, message: '请选择所在班级', trigger: 'change' }
                ]
            },
            region: {
                provinceId: '',
                cityId: '',
                areaId: ''
            },
            provinces: [],
            citys: [],
            areas: [],
            clasz: []
        }
    },
    computed: {
        ...mapState('list', {
            school: state => state.school || []
        })
    },
    watch: {
        'region.provinceId': {
            handler: function (pcode) {
                this.$set(this.region, 'cityId', '')
                this.$set(this.region, 'areaId', '')
                this.citys = []
                this.areas = []
                this.getRegionData('citys', { pcode })
            }
        },
        'region.cityId': {
            handler: function (pcode) {
                this.$set(this.region, 'areaId', '')
                this.areas = []
                this.getRegionData('areas', { pcode })
            }
        },
        region: {
            handler: function (region) {
                this.getSchoolList(region)
            },
            deep: true,
            immediate: true
        },
        'form.schoolId': {
            handler: function (schoolId) {
                this.clasz = []
                this.getSchoolClassList({ schoolId }).then(res => {
                    this.clasz = res
                })
            }
        }
    },
    created() {
        this.getRegionData('provinces')
    },
    methods: {
        ...mapActions('region', ['getRegionList']),
        ...mapActions('list', ['getSchoolList', 'getSchoolClassList']),

        getRegionData(key, params = {}) {
            this.getRegionList(params).then(datas => {
                this[key] = datas
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '~@/assets/css/module/login.scss';
</style>
