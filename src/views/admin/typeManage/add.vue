<template>
    <div class="submit-form backend-content__middle" style="padding-top:50px;">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <el-form-item label="领域名称" prop="name">
                <el-col :span="14">
                    <el-input v-model="form.name" placeholder="请输入领域名称(20字以内)" maxlength="20"></el-input>
                </el-col>
           </el-form-item>
            <el-form-item label="code" prop="code">
                <el-col :span="14">
                    <el-input v-model="form.code" placeholder="请输入code(大写或者_)" @input="checkCode" maxlength="50"></el-input>
                </el-col>
           </el-form-item>
            <el-row>
                <el-col :span="16">
                    <el-form-item label="领域备注" prop="remark">
                        <el-input type="textarea" :rows="4" placeholder="请输入备注" show-word-limit maxlength="100" v-model="form.remark" ></el-input>
                    </el-form-item> 
                </el-col>
            </el-row>
            <el-form-item >

                <el-button type="primary" style="marginRight:10px" @click="onSubmit" :loading="isLoading">保存</el-button>
                <el-button plain  @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {activityTypeAdd} from '@/api/resetApi'
export default {
    name: 'typeAdd',
    data() {
        return {
            isLoading:false,
            form: {
                name:'',
                code:'',
                remark:''
            },
            
           
            // 表单校验提示
            rules: {
                 name:[{
                     required: true, message: '请输入领域名称', trigger: ['change','blur']
                }],
                code:[{
                     required: true, message: '请输入code', trigger: ['change','blur']
                }],
                 remark:[{
                     required: true, message: '请输入领域备注', trigger: ['change','blur']
                }],
               
                
            },
          
        }
    },
    computed: {

       
    },
    watch: {
        
    },
    methods: {
        
    
        checkCode(){
                let str = this.form.code||'';
                str =str.replace(/[^\w]/g, '');
                str = str.replace(/[0-9.a-z]/g,'')
                this.form.code = str;
        },
        // 提交表单
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                   this.isLoading = true;
                     const formList = Object.assign({}, this.form);
                     
                       activityTypeAdd(formList).then( response => {
                        if (response.data.code == 200) {
                            this.$message({
                                message: `添加成功`,
                                type: 'success'
                            })
                            this.$router.go(-1)
                        } else {
                            this.isLoading =false;
                            this.$message.error(response.data.msg)
                        }
                    })
                } else {
                  
                    return false;
                }
            });
        },
        cancel(){
            this.$router.go(-1);
        }
    },
    created() {
     
       
    },
   
}
</script>
<style lang="scss" scoped>
.backend-content__middle{
  max-width: 1000px;
}
    
</style>
