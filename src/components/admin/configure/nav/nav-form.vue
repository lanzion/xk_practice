<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="导航名称">
            <el-input v-model="form.name" placeholder="请输入导航名称"></el-input>
        </el-form-item>
        <el-form-item label="父级导航">
            <el-cascader
                v-model="pid"
                :options.sync="menu"
                :props="{ label: 'name', children: 'children', value: 'id' }"
                placeholder="请选择父级导航"
                @change="changePId"
                clearable
                change-on-select>
            </el-cascader>
        </el-form-item>
        <el-form-item label="URL">
            <el-input v-model="form.url" placeholder="请输入URL"></el-input>
        </el-form-item>
        <el-form-item label="状态">
            <el-switch v-model="form.status" active-value="1" inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="序号">
            <el-input-number v-model="form.sort"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit" :loading="isLoading">{{ form.id ? '保存' : '立即创建' }}</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { addNav, editNav } from '@/api/config'

export default {
    data() {
        return {
            tmpForm: {},
            pid: []
        }
    },
    props: {
        menu: {
            type: Array,
            default() {
                return []
            }
        },
        // 父级菜单列表项
        pids: {
            type: Array,
            default() {
                return []
            }
        },
        form: Object
    },
    watch: {
        pids: {
            handler: function (val) {
                this.pid = val && JSON.parse(JSON.stringify(val)) || []
                this.changePId(val)
            },
            deep: true
        },
        form: {
            handler: function (val) {
                this.tmpForm = { ...val }
            }
        }
    },
    methods: {

        changePId(values) {
            this.$set(this.form, 'pid', values[values.length - 1] || -1)
        },

        submit() {
            this.isLoading = true
            const { id } = this.form
            const form = Object.assign({}, this.form)
            let handler = addNav
            let txt = '创建'
            if (id) {
                handler = editNav
                txt = '保存'
            }
            handler(form).then(res => {
                if (res.data.code === 200) {
                    this.$message({
                        message: `${txt}成功`,
                        type: 'success'
                    })
                    this.$emit('callback')
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

        reset() {
            this.pid = JSON.parse(JSON.stringify(this.pids)) || []
            this.$emit('update:form', this.tmpForm)
        }
    }
}
</script>
