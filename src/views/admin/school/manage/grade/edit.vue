<template>
    <div class="submit-form backend-content__middle" style="padding-top:50px;">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
            <!-- 入学年份 -->
            <el-row>
                <el-form-item label="入学年份" prop="enrollmentYear">
                    <el-col :span="8">
                        <el-date-picker v-model="form.enrollmentYear" type="year" placeholder="请选择入学年份" :picker-options="enrollmentYearOptions"></el-date-picker>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="所属学校">
                    <el-col :span="8">
                      {{schoolName}}
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 所属年级 -->
            <el-row>
                <el-form-item label="所属年级" prop="gradeId" required>
                    <el-col :span="8">
                        <el-select v-model="form.gradeId" placeholder="请选择年级" :disabled="isReadOnly">
                            <el-option v-for="item in gradeList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 班号 -->
            <el-row>
                <el-form-item label="班号" prop="classNum" required>
                    <el-col :span="8">
                        <el-input-number v-model="form.classNum" :min="1"></el-input-number>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 班级名称 -->
            <el-row>
                <el-form-item label="班级名称" prop="className">
                    <el-col :span="8">
                        <el-input v-model="className" placeholder="请输入班级名称" disabled></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 班主任 -->
            <el-row>
                <el-form-item label="班主任" prop="teacherId">
                    <el-col :span="8">
                        <el-select v-model="form.teacherId" placeholder="请选择班主任" :disabled="isReadOnly"  filterable>
                            <el-option v-for="(item,index) in teacherList" :label="item.name" :value="item.id" :key="index"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
            <!-- 班级简介 -->
            <el-row>
                <el-form-item label="班级简介" prop="remark">
                    <el-col :span="10">
                        <el-input type="textarea" v-model="form.remark" placeholder="请填写班级简介" :disabled="isReadOnly"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-form-item v-if="isReadOnly">
                 <el-button plain @click="$router.go(-1)">返回</el-button>
            </el-form-item>
            <el-form-item v-else>
                <el-button type="primary" style="marginRight:10px" @click="onSubmit">保存</el-button>
                <el-button plain  @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { getGradeList,baseTeacherList,classEdit,schoolList,classDeatil} from '@/api/resetApi'


  let identiy = localStorage.getItem('xk_practice_identity');
export default {
    name: 'gradeAdd',
    data() {
        return {
            value:[],
            identiy:identiy,
            schoolName:'',
            checkedItemsFull: [null, null, null],
            form: {
                enrollmentYear: '', // 入学年份
                gradeId: '',        // 所属年级
                schoolId:'',
                className: '',      // 班级名称
                classNum: '',
                teacherId: '',      // 班主任
                remark: ''          // 班级简介
            },
            gradeList: [],          // 所属年级列表
            teacherList: [],        // 班主任列表
            // 表单校验提示
            rules: {
                enrollmentYear: [
                    { type: 'date', required: true, message: '请选择入学年份', trigger: ['change','blur'] }
                ],
                teacherId: [
                    { required: true, message: '请选择班主任', trigger: ['change','blur'] }
                ],
                gradeId: [
                    { required: true, message: '请选择所属年级', trigger: ['change','blur'] }
                ],
                schoolId:[
                    { required: true, message: '请选择所属学校', trigger: ['change','blur'] }
                ],
                classNum: [
                    { type: 'number', required: true, message: '请输入班号', trigger: ['change','blur'] }
                ],
                remark: [
                    { required: true, message: '请输入班级简介', trigger: ['blur'] }
                ],
            },
            isReadOnly: false,
            enrollmentYearOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
        }
    },
    computed: {

        className: function() {
            let result = ''
            let grade = Number(this.form.gradeId.split('grade')[1])
            if (grade >= 10) {
                result += '高中'
            } else if (grade >= 7) {
                result += '初中'
            } else {
                result += '小学'
            }
            this.form.enrollmentYear && (result += `${this.form.enrollmentYear.getFullYear()}级`)
            result += `${this.form.classNum}班`
            return result
        }
    },
    watch: {
        
    },
    methods: {
        
        // 获取详情
        getDetailData() {
            const id = this.$route.query.id;
            if (id) {
           

                classDeatil({ id }).then(res => {
                    const { code, entity: datas } = res.data
                    if (code === 200 && datas) {
                      
                        this.schoolName = datas.schoolName;
                        this.form.id=id;
                        this.form.enrollmentYear=new Date(datas.enrollmentYear), // 入学年份
                        this.form.schoolName=datas.schoolName;
                        this.form.className= datas.className;    // 班级名称
                        this.form.schoolId=datas.schoolId;
                        this.form.classNum= datas.className.replace(/[^\d]/g,'').slice(4,datas.className.length-1);  
                        this.form.remark=datas.remark;         // 班级简介 
                        this.getGradeList(datas.gradeId)
                        this.baseTeacherList(datas.teacherId)
                    }
                }).finally(() => {
                  
                })
            }
        },
        async baseTeacherList(teacherId){//获取老师
            let formData ={};
            formData.schoolId = this.form.schoolId;
             const res = await baseTeacherList(formData);

            const { entity: datas = {} } = res.data
            try {
                 this.teacherList = datas.list || []
                  this.form.teacherId = teacherId;
            } catch (error) {
                 this.teacherList = [];
            } 
            
        },
       async getGradeList(id){
          
             const res = await getGradeList({schoolId: this.form.schoolId});

            const { entity: datas = {} } = res.data
            try {
                 this.gradeList = datas || []
                 this.form.gradeId =id;
                 
            } catch (error) {
                 this.gradeList  =[]
            } 
           
           
        },
        // 提交表单
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                   
                    let txt = '修改'
                     const formList = Object.assign({}, this.form);
                     const formData ={
                        schoolId:formList.schoolId,
                        gradeId:formList.gradeId,//
                        className:this.className,
                        enrollmentYear:formList.enrollmentYear.getFullYear(),//主题
                        teacherId:formList.teacherId,//
                        remark:formList.remark,//
                        id:formList.id
                    } 
                 
                    classEdit(formData).then( response => {
                        if (response.data.code == 200) {
                            this.$message({
                                message: `${txt}成功`,
                                type: 'success'
                            })
                            this.$router.go(-1)
                        } else {
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
      
       this.getDetailData();
    },
   
}
</script>
<style lang="scss">
    .el-input-number {
        display: inline-block;
        width: 100%;
        position: relative;
        line-height: normal;
        vertical-align: top;
    }
    .el-input-number__decrease {
        right: 37px;
    }
    .el-input-number__decrease, .el-input-number__increase {
        height: auto;
        border-left: 1px solid #dfdfdf;
        width: 36px;
        line-height: 30px;
        top: 1px;
        text-align: center;
        color: #ccc;
        cursor: pointer;
        position: absolute;
        z-index: 1;
    }
</style>
