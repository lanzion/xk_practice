<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="权限名称">
            <el-input v-model="form.name" placeholder="请输入权限名称"></el-input>
        </el-form-item>
        <el-form-item label="模块">
            <el-select v-model="form.model" placeholder="请选择用户类型">
                <el-option v-for="item in modelList" :key="item.id" :label="item.label" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="父级菜单">
            <el-cascader
                v-model="pid"
                :options.sync="menu"
                :props="{ label: 'name', children: 'children', value: 'id' }"
                placeholder="请选择父级菜单"
                @change="changePId"
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
        <el-form-item label="MenuID">
            <el-input v-model="form.menuId" placeholder="请输入MenuID"></el-input>
        </el-form-item>
        <el-form-item label="分组" prop="groupPermiss">
            <el-input v-model="form.groupPermiss" placeholder="请输入分组名称"></el-input>
        </el-form-item>
        <el-form-item label="权限类型">
            <el-select v-model="form.permissType" placeholder="请选择权限类型" clearable>
                <el-option v-for="item in permissTypeList" :label="item.label" :value="item.id" :key="item.label"></el-option>
             </el-select>
        </el-form-item>
        <el-form-item label="权限位置" v-show="permissTypeList.some(x => x.position && x.id==form.permissType)">
             <el-radio-group v-model="form.position">
                        <el-radio v-for="item in rmissPosition" :label="item.code" :key="item.code">{{ item.name }}</el-radio>
               </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit" :loading="isLoading">{{ form.id ? '保存' : '立即创建' }}</el-button>
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { addPermiss, editPermiss } from '@/api/system'

export default {
    data() {
        return {
            tmpForm: {}, // 备份原始表单数据
            pid: [],
            modelList: [
                { id: 'makeradmin', label: '后台管理' },
                { id: 'makermanage', label: '个人后台' }
            ],
            permissTypeList: [
                   { id: '1', label: '菜单' , position: true},
                   { id: '2', label: '按钮', position: true },
                   { id: '3', label: '分类', position: true },
                   { id: '4', label: '开关'},
                   { id: '5', label: '标签页'},
                  
            ],
            rmissPosition: [
                { code: '', name: '全部' },
                { code: '1', name: '头部' },
                { code: '2', name: '列表' }
            ]
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

        // 改变父级权限设置表单pid
        changePId(values) {
            this.$set(this.form, 'pid', values[values.length - 1])
        },

        // 提交表单
        submit() {
            this.isLoading = true
            const { id, position } = this.form
            const form = Object.assign({}, this.form)
            let handler = addPermiss
            let txt = '创建'
            if (id) {
                handler = editPermiss
                txt = '保存'
            }
            form.position = position.toString()
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

        // 重置表单数据
        reset() {
            this.pid = JSON.parse(JSON.stringify(this.pids)) || []
            this.$emit('update:form', this.tmpForm)
        }
    }
}
</script>
