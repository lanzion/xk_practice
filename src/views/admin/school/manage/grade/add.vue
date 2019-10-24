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
            <!-- 所属学校 -->
            <el-row v-if="identiy==5">
                 <el-col :span="5">
                        <el-form-item label="所属地区" >
                            
                                <region  type="object" @change="changeRegion"  class="regions"></region>
                        
                        </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="所属学校">
                             <el-select filterable
    remote v-model="form.schoolId" placeholder="请所属学校" :remote-method="remoteMethod" @change="getChange">
                                <el-option v-for="item in school" :label="item.schoolName" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                    </el-form-item>
                 </el-col>
            </el-row>
             <!-- 班号 -->
            <el-row v-if="identiy==9">
                <el-form-item label="所属学校" prop="schoolId" >
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
                            <el-option v-for="(item,index) in teacherList" :label="item.name"  :value="item.id" :key="index"></el-option>
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
import { getGradeList,baseTeacherList,classAdd,schoolList} from '@/api/resetApi'


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
                teacherId: null,      // 班主任
                remark: ''          // 班级简介
            },
            searchForm:{
                provinceId:'',
                cityId:'',
                areaId:'',
                schoolName:''
            },
            list:[],
            school:[],
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
         resetPage(key) {
            this.$set(this.pages, 'pageNum', 1)
            this.$set(this.pages, 'pageSize', 100)
            this.getSchoolList(key)
        },
        remoteMethod(qurey){
           
            this.resetPage(qurey);
        },
        async getSchoolList(key){
              const formList = Object.assign({}, this.searchForm)
              if(key){
                  formList.schoolName =key;
                 
              }
               const res = await schoolList(formList, this.pages)
               const { entity: datas = {} } = res.data

            try {
                
                this.school = [...datas.resultData];
            } catch (error) {
            } finally {
               
            }
        },
       changeRegion(region) {
             this.searchForm.provinceId =region[0].code||'';
             this.searchForm.cityId =region[1].code||'';
             this.searchForm.areaId =region[2].code||'';
             this.form.schoolId ="";
             this.resetPage();
           
        },
        getChange(){
            this.baseTeacherList(1);
            this.getGradeList(this.form.schoolId)
        },
        async baseTeacherList(id){//获取老师
            let formData ={};
            if(id){
                formData.schoolId = this.form.schoolId;
                this.form.teacherId ='';
            }
             const res = await baseTeacherList(formData);

            const { entity: datas = {} } = res.data
            try {
                 this.teacherList = datas.list || []
            } catch (error) {
                 this.teacherList = [];
            } 
            
        },
       async getGradeList(id){
           const formData = {}
           if(id){
               formData.schoolId = id;
           }else{
               formData.identiy = this.identiy;
           }
                 
            const res = await getGradeList(formData);

            const { entity: datas = {} } = res.data
            try {
                 this.gradeList = datas || []
                
            } catch (error) {
                 this.gradeList  =[]
            } 
          
           
        },
        // 提交表单
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                   
                    let txt = '保存'
                     const formList = Object.assign({}, this.form);
                  
                     const formData ={
                        schoolId:formList.schoolId,
                        gradeId:formList.gradeId,//
                        className:this.className,
                        enrollmentYear:formList.enrollmentYear.getFullYear(),
                        teacherId:formList.teacherId,//
                        remark:formList.remark,//
                    } 
                 
                    classAdd(formData).then( response => {
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
     
       
       if(this.identiy==9){
           
          
            let baseInfo =JSON.parse(localStorage.getItem('xk_practice_baseInfo'));
            this.schoolName =baseInfo.baseInfo.schoolName;
            this.form.schoolId = baseInfo.baseInfo.id;
            this.getGradeList(this.form.schoolId);
            this.baseTeacherList()

       }else if(this.identiy==5){
             this.getGradeList();
       }
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
