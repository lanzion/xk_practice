<template>
    <el-form ref="form" :model="form" label-width="110px" v-loading="isLoading">
        <el-row>
            <el-col :span="12">
                <el-form-item label="学籍号">
                    <el-input v-model="form.studentCode" placeholder="请输入学籍号" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name" placeholder="请输入姓名" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="form.phone" placeholder="请输入联系方式" :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.sex" :disabled="disabled">
                        <el-radio v-for="(item) in sexList" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="个人照片">
                    <default-image :src="form.pic" />
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
                <el-form-item label="学号">
                    <el-input v-model="form.studentNo" placeholder="请输入学号" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="就读学校">
                    <el-select v-model="form.schoolId" placeholder="请选择就读学校" @change="changeSchool" :disabled="disabled">
                        <el-option
                            v-for="(item) in schoolList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="目前学段">
                    <el-select v-model="form.studySectionId" placeholder="请选择目前学段" @change="changeSection" :disabled="disabled">
                        <el-option
                            v-for="(item) in periodList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="所在年级">
                    <el-select v-model="form.grade" placeholder="请选择所在年级" @change="changeGrade" :disabled="disabled">
                        <el-option
                            v-for="(item) in gradeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="所在班级">
                    <el-select v-model="form.classId" placeholder="请选择所在班级" :disabled="disabled">
                        <el-option
                            v-for="(item) in classList"
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
                <el-form-item label="入学日期">
                    <el-date-picker v-model="form.entranceDate" type="date" placeholder="请选择入学日期" :disabled="disabled"></el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="出生日期">
                    <el-date-picker v-model="form.birthday" type="date" placeholder="请选择出生日期" :disabled="disabled"></el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="邮箱">
                    <el-input v-model="form.mail" placeholder="请输入邮箱" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="联系地址">
                    <el-input v-model="form.addr" placeholder="请输入联系地址" :disabled="disabled"></el-input>
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
                    <el-input v-model="form.hometown" placeholder="请输入籍贯" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="证件类型">
                    <el-select v-model="form.typeId" placeholder="请选择证件类型" :disabled="disabled">
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
                    <el-input v-model="form.idNumber" placeholder="请输入证件类型" :disabled="disabled"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
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
            <el-col :span="12">
                <el-form-item label="流动人口">
                    <el-switch
                        v-model="form.isFloatHuman"
                        :disabled="disabled"
                        active-value="0"
                        inactive-value="1"
                        active-text="是"
                        inactive-text="否">
                    </el-switch>
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
                    <el-select v-model="form.health" placeholder="请选择健康状况" :disabled="disabled">
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

import { requestStudentDetail, addStudent, updateStudent } from '@/api/admin/base'

const form = {
    studentCode: '',
    name: '',
    phone: '',
    sex: '',
    pic: '',
    englishName: '',
    pinyin: '',
    formerName: '',
    studentNo: '',
    schoolId: '',
    studySectionId: '',
    grade: '',
    classId: '',
    entranceDate: '',
    birthday: '',
    mail: '',
    addr: '',
    nationality: '',
    hometown: '',
    typeId: '',
    idNumber: '',
    politVisage: '',
    isFloatHuman: '0',
    faith: '',
    nation: '',
    health: '',
    bloodType: '',
}

export default {
    data() {
        return {
            form: { ...form },
            periodList: [],
            gradeList: [],
            classList: []
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
            bloodTypeList: state => (state.DM_XX || {}).dicList || [],
            credentialTypeList: state => (state.GA_59_7 || {}).dicList || [],
            faithList: state => (state.GA_214 || {}).dicList || [],
            sexList: state => (state.sex || {}).dicList || [],
            politicalStatusList: state => (state.GB_T_4762_1984 || {}).dicList || [],
            nationList: state => (state.GB_t_3301_1991 || {}).dicList || [],
            healthList: state => (state.JY_T_1001_2012 || {}).dicList || []
        }),
        ...mapState('list', {
            schoolList: state => state.school || []
        })
    },
    mounted() {
        // 获取数据字典
        this.getDataDict({ code: 'GA_59_7,GB_T_4762_1984,GA_214,GB_t_3301_1991,JY_T_1001_2012,DM_XX' })

        // 获取学校列表
        this.getSchoolList()
    },
    watch: {
        'form.schoolId': {
            handler: function (val) {
                if (val) {
                    const { schoolNo } = this.schoolList.find(x => x.id === val)
                    this.getPeriodList(schoolNo)
                }
            },
            deep: true
        },
        'form.studySectionId': {
            handler: function (val) {
                if (val && form.schoolId) {
                    const item = this.periodList.find(x => x.id === val) || {}
                    if (item) {
                        const { schoolNo, code: studySectionCode } = item
                        this.getGradeList({ schoolNo, studySectionCode })
                    }
                }
            },
            deep: true
        },
        'form.grade': {
            handler: function (val) {
                if (val && form.schoolId && form.studySectionId) {
                    const item = this.gradeList.find(x => x.id === val) || {}
                    if (item) {
                        const { id: gradeId } = item
                        const { schoolId } = this.form
                        this.getClassList({ schoolId, gradeId })
                    }
                }
            },
            deep: true
        }
    },
    methods: {
        ...mapActions('dict', ['getDataDict']),
        ...mapActions('list', ['getSchoolList', 'getSchoolPeriodList', 'getSchoolGradeList', 'getSchoolClassList']),

        // 获取详情
        getDetailData() {
            const id = this.id || this.$route.query.id
            if (id) {
                this.isLoading = true
            
                requestStudentDetail({ id }).then(res => {
                    const { code, entity: datas } = res.data
                    if (code === 200 && datas) {
                        this.form = datas
                        return datas
                    }
                }).then(datas => {
                    const { schoolId, schoolNo, studySectionCode, grade: gradeId } = datas
                    this.getGradeList({ schoolNo, studySectionCode })
                    this.getClassList({ schoolId, gradeId })
                }).finally(() => {
                    this.isLoading = false
                })
            }
        },

        // 添加/修改表单
        submit() {
            this.isLoading = true
            const { id } = this.form
            let handler = addStudent
            let txt = '创建'
            if (id) {
                handler = updateStudent
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
        
        // 根据{ shoolNo }获取学段数据
        async getPeriodList(schoolNo) {
            const datas = await this.getSchoolPeriodList({ schoolNo })
            this.periodList = datas
        },
        
        // 根据{ schoolNo, studySectionCode }获取年级数据
        async getGradeList(params) {
            const datas = await this.getSchoolGradeList(params)
            this.gradeList = datas
        },
        
        // 根据{ schoolId, gradeId }获取年级数据
        async getClassList(params) {
            const datas = await this.getSchoolClassList(params)
            this.classList = datas
        },

        // 就读学校值改变
        changeSchool() {
            this.$set(this.form, 'studySectionId', '')
            this.$set(this.form, 'grade', '')
            this.$set(this.form, 'classId', '')
        },

        // 目前学段值改变
        changeSection() {
            this.$set(this.form, 'grade', '')
            this.$set(this.form, 'classId', '')
        },

        // 所在年级值改变
        changeGrade() {
            this.$set(this.form, 'classId', '')
        },

        // 重置详情数据关闭弹窗
        close() {
            this.$emit('close')
        },

        // 清空详情数据
        reset() {
            this.form = { ...form }
        }
    }
}
</script>
