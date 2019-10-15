<template>
    <el-form ref="form" :model="form" label-width="110px" v-loading="isLoading">
        <el-row>
            <el-col :span="12">
                <el-form-item label="工号">
                    <el-input v-model="form.jobNum" placeholder="请输入工号" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name" placeholder="请输入姓名" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.tel" placeholder="请输入联系方式" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.sex" :disabled="disabled">
                        <el-radio v-for="(item) in sexList" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="个人照片">
                    <default-image :src="form.igeUrl" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="英文名">
                    <el-input v-model="form.englishName" placeholder="请输入英文名" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="姓名拼音">
                    <el-input v-model="form.pinyin" placeholder="请输入姓名拼音" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="曾用名">
                    <el-input v-model="form.formerName" placeholder="请输入曾用名" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="出生日期">
                    <el-date-picker v-model="form.birthDate" type="date" placeholder="请选择出生日期" :disabled="disabled"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="证件类型">
                    <el-select v-model="form.certiType" placeholder="请选择证件类型" :disabled="disabled">
                        <el-option
                            v-for="(item) in credentialTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="证件号">
                    <el-input v-model="form.certiNum" placeholder="请输入证件类型" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="隶属单位类型">
                    <el-select v-model="form.compileType" placeholder="请选择隶属单位类型" :disabled="disabled">
                        <el-option
                            v-for="(item) in compileTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="隶属单位名称">
                    <el-select v-model="form.orgId" placeholder="请选择隶属单位" :disabled="disabled">
                        <el-option
                            v-for="(item) in orgList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="国籍/地区">
                    <el-input v-model="form.nationality" placeholder="请输入国籍/地区" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="籍贯">
                    <el-input v-model="form.nativePlace" placeholder="请输入籍贯" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="所在地">
                    <region :default="region" type="code" @change="changeRegion" :disabled="disabled"></region>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="所在街道">
                    <el-input v-model="form.street" placeholder="请输入所在街道" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="婚姻状况">
                    <el-select v-model="form.maritalSta" placeholder="请选择婚姻状况" :disabled="disabled">
                        <el-option
                            v-for="(item) in marriageList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="政治面貌">
                    <el-select v-model="form.politVisage" placeholder="请选择政治面貌" :disabled="disabled">
                        <el-option
                            v-for="(item) in politicalStatusList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="信仰宗教">
                    <el-select v-model="form.faith" placeholder="请选择信仰宗教" :disabled="disabled">
                        <el-option
                            v-for="(item) in faithList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="民族">
                    <el-select v-model="form.nation" placeholder="请选择民族" :disabled="disabled">
                        <el-option
                            v-for="(item) in nationList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="健康状况">
                    <el-select v-model="form.healthSta" placeholder="请选择健康状况" :disabled="disabled">
                        <el-option
                            v-for="(item) in healthList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="血型">
                    <el-select v-model="form.bloodType" placeholder="请选择血型" :disabled="disabled">
                        <el-option
                            v-for="(item) in bloodTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item class="g-form-footer">
            <el-button v-if="!disabled" type="primary" @click="submit" :loading="isLoading">{{ id ? '保存' : '立即创建' }}</el-button>
            <el-button @click="close">关闭</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { requestTeacherDetail, addTeacher, updateTeacher } from '@/api/admin/base'

const form = {
    jobNum: '',
    name: '',
    pinyin: '',
    englishName: '',
    formerName: '',
    sex: '',
    tel: '',
    birthDate: '',
    nativePlace: '',
    certiType: '',
    certiNum: '',
    maritalSta: '',
    politVisage: '',
    faith: '',
    nation: '',
    compileType: '',
    orgId: '',
    province: '',
    city: '',
    sanjak: '',
    street: '',
    nationality: '',
    healthSta: '',
    bloodType: '',
    igeUrl: ''
}

export default {
    data() {
        return {
            form: { ...form },
            region: [] // 所在地
        }
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        id: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState('dict', {
            compileTypeList: state => (state.compileType || {}).dicList || [],
            bloodTypeList: state => (state.DM_XX || {}).dicList || [],
            credentialTypeList: state => (state.GA_59_7 || {}).dicList || [],
            faithList: state => (state.GA_214 || {}).dicList || [],
            sexList: state => (state.sex || {}).dicList || [],
            marriageList: state => (state.GB_T_2261_2_2003 || {}).dicList || [],
            politicalStatusList: state => (state.GB_T_4762_1984 || {}).dicList || [],
            nationList: state => (state.GB_t_3301_1991 || {}).dicList || [],
            healthList: state => (state.JY_T_1001_2012 || {}).dicList || []
        }),
        ...mapState('list', {
            eduList: state => state.edu || [],
            schoolList: state => state.school || []
        }),
        orgList: function () {
            return {
                0: this.eduList,
                1: this.schoolList
            }[this.form.compileType] || []
        } // 隶属单位列表
    },
    mounted() {
        // 获取数据字典
        this.getDataDict({ code: 'GA_59_7,GB_T_2261_2_2003,GB_T_4762_1984,GA_214,GB_t_3301_1991,JY_T_1001_2012,DM_XX' })
    },
    watch: {
        'form.compileType': {
            handler: function (val) {
                const handler = {
                    0: this.getEduList,
                    1: this.getSchoolList
                }[val]
                handler && handler()
            },
            deep: true
        }
    },
    methods: {
        ...mapActions('dict', ['getDataDict']),
        ...mapActions('list', ['getEduList', 'getSchoolList']),

        // 获取详情
        getDetailData() {
            const id = this.id || this.$route.query.id
            if (id) {
                this.isLoading = true
            
                requestTeacherDetail({ id }).then(res => {
                    const { code, entity: datas } = res.data
                    if (code === 200 && datas) {
                        this.form = datas
                        this.region = [datas.province, datas.city, datas.sanjak]
                    }
                }).finally(() => {
                    this.isLoading = false
                })
            }
        },

        // 添加/修改表单
        submit() {
            this.isLoading = true
            const { id } = this.form
            let handler = addTeacher
            let txt = '创建'
            if (id) {
                handler = updateTeacher
                txt = '保存'
            }
            handler(this.form).then(res => {
                if (res.data.code === 200) {
                    this.$message({
                        message: `${txt}成功`,
                        type: 'success'
                    })
                    this.$emit('change')
                    this.close()
                } else {
                    this.$message({
                        message: res.data.msg || `${txt}失败`,
                        type: 'error'
                    })
                }
            }).finally(() => {
                this.isLoading = false
            })
        },

        // 地区改变
        changeRegion(items) {
            const [province, city, sanjak] = items
            
            this.$set(this.form, 'province', province)
            this.$set(this.form, 'city', city)
            this.$set(this.form, 'sanjak', sanjak)
        },

        // 重置详情数据关闭弹窗
        close() {
            this.$emit('close')
        },

        // 清空详情数据
        reset() {
            this.form = { ...form }
            this.region = []
        }
    }
}
</script>
