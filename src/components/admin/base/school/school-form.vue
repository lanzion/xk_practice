<template>
    <el-form ref="form" :model="form" label-width="100px" v-loading="isLoading">
        <el-form-item label="学校编码">
            <el-input v-model="form.schoolNo" placeholder="请输入学校编码" :disabled="disabled || !!form.id"></el-input>
        </el-form-item>
        <el-form-item label="学校名称">
            <el-input v-model="form.schoolName" placeholder="请输入学校名称" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="学校类型">
            <el-col :span="4">
            <el-checkbox-group v-model="form.schoolType" :disabled="disabled">
                <el-checkbox class="is-block" v-for="(item) in schoolType" :label="item.id" :key="item.id">{{ item.name }}</el-checkbox>
            </el-checkbox-group>
            </el-col>
            <el-col :span="12">
                <ul class="school-system-wrap">
                    <li class="school-system-item el-checkbox is-block el-checkbox__label" v-for="(item) in schoolType" :key="item.id">
                        <span>{{ item.name }}学制</span>
                        <el-input-number v-model="form[item.param]" :min="1" :max="10" :label="`请输入${item.name}学制`" :disabled="disabled || !form.schoolType.includes(item.id)"></el-input-number>
                        <span>年</span>
                    </li>
                </ul>
            </el-col>
        </el-form-item>
        <el-form-item label="学校简介">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.intro" placeholder="请输入学校简介" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="主管部门">
            <el-select v-model="form.competentDepart" placeholder="请选择主管部门" :disabled="disabled">
                <el-option
                    v-for="(item) in eduList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="联系人">
            <el-input v-model="form.headmasters" placeholder="请输入联系人" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
            <el-input v-model="form.phone" placeholder="请输入联系电话" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="传真电话">
            <el-input v-model="form.fax" placeholder="请输入传真电话" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="所在地">
            <region :default="region" type="code" @change="changeRegion" :disabled="disabled"></region>
        </el-form-item>
        <el-form-item label="详细地址">
            <el-input v-model="form.street" placeholder="请输入详细地址" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item class="g-form-footer">
            <el-button v-if="!disabled" type="primary" @click="submit" :loading="isLoading">{{ id ? '保存' : '立即创建' }}</el-button>
            <el-button @click="close">关闭</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { addSchool, updateSchool } from '@/api/admin/base'

const form = {
    schoolNo: '',
    schoolName: '',
    schoolType: [],
    xiaoxSystem: '',
    chuzSystem: '',
    gaozSystem: '',
    intro: '',
    competentDepart: '',
    headmasters: '',
    phone: '',
    fax: '',
    province: '',
    city: '',
    sanjak: '',
    street: ''
}

export default {
    data() {
        return {
            form: { ...form },
            region: []
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
            schoolType: state => ((state.schoolType || {}).dicList || []).map(x => {
                x.param = {
                    0: 'xiaoxSystem',
                    1: 'chuzSystem',
                    2: 'gaozSystem'
                }[x.id]
                return x
            })
        }),
        ...mapState('list', {
            eduList: state => state.edu || []
        })
    },
    mounted() {
        // 获取教育局列表
        this.getEduList()
    },
    methods: {
        ...mapActions('school', ['getSchoolDetail']),
        ...mapActions('list', ['getEduList']),

        // 获取详情
        getDetailData() {
            const id = this.id || this.$route.query.id
            if (id) {
                this.isLoading = true
            
                this.getSchoolDetail({ id }).then(res => {
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
            const __form = Object.assign({}, this.form)
            __form.schoolType = __form.schoolType.toString()
            
            let handler = addSchool
            let txt = '创建'
            if (id) {
                handler = updateSchool
                txt = '保存'
            }
            handler(__form).then(res => {
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

<style lang="scss" scoped>
    .school-system-wrap {
        .school-system-item {
            color: #c0c4cc;
        }
    }
</style>
