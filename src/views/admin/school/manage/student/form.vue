<template>
    <el-form ref="form" class="g-form--wrap" label-width="80px" :model="form" :rules="rules" :isloading="isLoading">
        <el-form-item label="登录账号" prop="account">
            <el-col :span="12">
                <el-input v-model="form.account" placeholder="请输入登录账号"></el-input>
            </el-col>
        </el-form-item>
         <el-form-item label="证件类型" >
            <el-col :span="12">
                <el-select v-model="form.certiType" placeholder="请选择证件类型" :disabled="true">
                    <el-option v-for="item in idTypeList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </el-col>
        </el-form-item>
             
        <el-form-item label="证件号码" prop="certiNum">
            <el-col :span="12">
                <el-input v-model="form.certiNum" placeholder="请输入证件号码"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
            <el-col :span="12">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
                <el-radio v-for="(item) in sex" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
         <!-- 所属学校 -->
            <el-row v-if="identiy==5">
                 <el-col :span="12" v-if="!isEdit">
                        <el-form-item label="所属地区" >
                            
                                <region  type="object" @change="changeRegion"  class="regions"></region>
                        
                        </el-form-item>
                </el-col>
                <el-col :span="12" v-if="!isEdit">
                    <el-form-item label="所属学校" prop="schoolId">
                             <el-select filterable
    remote v-model="form.schoolId" placeholder="请选择所属学校" :remote-method="remoteMethod" @change="getChange">
                                <el-option v-for="item in school" :label="item.schoolName" :value="item.id" :key="item.id"></el-option>
                            </el-select>
                    </el-form-item>
                 </el-col>
                 <el-form-item label="所属学校" v-if="isEdit" prop="schoolId">
                    <el-col :span="12">
                      {{schoolName}}
                    </el-col>
                </el-form-item>
            </el-row>
             <!-- 所属年级 -->
            <el-row>
                <el-form-item label="所属年级" prop="gradeId">
                    <el-col :span="12">
                        <el-select v-model="form.gradeId" placeholder="请选择年级" @change="getClassChange">
                            <el-option v-for="item in gradeList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
       
        <el-row>
                <el-form-item label="所属班级" prop="classId">
                    <el-col :span="8">
                        <el-select v-model="form.classId" placeholder="请选择班级" >
                            <el-option v-for="item in classList" :label="item.className" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
        </el-row>
        <el-form-item label="手机号" prop="phone">
            <el-col :span="12">
                <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-col :span="12">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-col>
        </el-form-item>
        <el-form-item label="联系地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入联系地址"></el-input>
        </el-form-item>
        <el-form-item label="个人简介" prop="sign">
            <el-input type="textarea" :rows="4" placeholder="请输入个人简介" v-model="form.sign" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item class="g-operate--box">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import { addStudent, editStudent } from '@/api/base'
import { getClassAll,getGradeList,schoolList} from '@/api/resetApi'
import { validateAccount, validateUserName, validateIDCode, validatePhone, validateEmail } from '@/utils/utility/validateRule'
let identiy = localStorage.getItem('xk_practice_identity');
export default {
    data() {
        return {
            classList:[],
            school:[],
            isLoading: false,
            identiy:identiy,
            isEdit:false,
            searchForm:{//查询班级条件
                gradeId:'',
                classId:'',
                className:'',
                schoolId:''
            },
            idTypeList:[{
                name:'居民身份证',
                id:'26',
            }],
            schoolName:'',
            searchForm1:{//查询学校条件
                provinceId:'',
                cityId:'',
                areaId:'',
                schoolName:''
            },
            gradeList: [],          // 所属年级列表
            form: {
                certiType:'26',
                account: '',
                certiNum: '',
                name: '',
                sex: '',
                schoolId:'',
                phone: '',
                email: '',
                address: '',
                sign: '',
                gradeId:'',//年级id
                classId: '',//班级id

            },
            rules: {
                gradeId: [
                    { required: true, message: '请选择年级', trigger: ['blur'] },
                ],
                classId: [
                    { required: true, message: '请选择班级', trigger: ['blur'] },
                ],
                account: [
                    { required: true, message: '请输入登录账号', trigger: ['change', 'blur'] },
                    { validator: validateAccount, trigger: ['change', 'blur'] }
                ],
                certiNum: [
                    { required: true, message: '请输入身份证号', trigger: ['change', 'blur'] },
                    // { validator: validateIDCode, trigger: ['change', 'blur'] }
                ],
                name: [
                    { required: true, message: '请输入真实姓名', trigger: ['change', 'blur'] },
                    { validator: validateUserName, trigger: ['change', 'blur'] }
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: ['change', 'blur'] }
                ],
                schoolId: [
                    { required: true, message: '请选择所属学校', trigger: ['change', 'blur'] }
                ],
                // phone: [
                //     { required: true, message: '请输入手机号', trigger: ['change', 'blur'] },
                //     { validator: validatePhone, trigger: ['change', 'blur'] }
                // ],
                // email: [
                //     { required: true, message: '请输入电子邮箱', trigger: ['change', 'blur'] },
                //     { validator: validateEmail, trigger: ['change', 'blur'] }
                // ]
            }
        }
    },
    computed: {
        ...mapState('dict', {
            
            sex: state => ((state.sex || {}).dicList || []).filter(x => x.option)
        }),
    },
    watch: {
        
    },
    created() {
       
         if(identiy==9){
            let baseInfo =JSON.parse(localStorage.getItem('xk_practice_baseInfo'));
            this.form.schoolId = baseInfo.baseInfo.id;
            this.searchForm.schoolId = baseInfo.baseInfo.id;
         }
        const id = this.$route.query.id;
         if(id){
                    this.isEdit = true;
                    this.getStudentDetail({ id }).then(datas => {
                        this.schoolName = datas.schoolName;
                        this.getGradeList(datas.schoolId)
                        this.searchForm.gradeId = datas.gradeId;
                        this.searchForm.schoolId = datas.schoolId;
                        // this.searchForm.classId = datas.classId;
                        this.getClass(datas);
                        this.$refs.form.resetFields()
                    })
         }else{
               this.getGradeList()
         }
       
      
    },
    methods: {
        ...mapActions('user', ['getStudentDetail']),
        getClassChange(){
            this.searchForm.gradeId = this.form.gradeId;
            this.form.classId ='';
            this.getClass();
        },
         resetPage(key) {
            this.$set(this.pages, 'pageNum', 1)
            this.$set(this.pages, 'pageSize', 100)
             this.form.schoolId ="";
             this.form.classId = '';
             this.searchForm.schoolId = this.form.schoolId;
             this.searchForm.classId = this.form.classId;
             this.classList= [];
             this.gradeList =[];
             this.form.gradeId ='';
            this.getSchoolList(key)
        },
        remoteMethod(qurey){
           
            this.resetPage(qurey);
        },
         changeRegion(region) {
             this.searchForm1.provinceId =region[0].code||'';
             this.searchForm1.cityId =region[1].code||'';
             this.searchForm1.areaId =region[2].code||'';
             this.resetPage();
           
        },
         async getGradeList(id){//查询年级
           const formData = {}
            if(id){
                formData.schoolId = id;
            }else{
                formData.schoolId = this.form.schoolId;
            }
                 
            const res = await getGradeList(formData);

            const { entity: datas = {} } = res.data
            try {
                 this.gradeList = datas || []
                
            } catch (error) {
                 this.gradeList  =[]
            } 
          
           
        },
        getChange(){
             this.searchForm.schoolId = this.form.schoolId;
             this.form.classId = '';
             this.searchForm.schoolId = this.form.schoolId;
             this.searchForm.classId = this.form.classId;
             this.classList= [];
             this.form.gradeId ='';
          this.getGradeList();
        },
      async getSchoolList(key){//获取学校
              const formList = Object.assign({}, this.searchForm1)
              if(key){
                  formList.schoolName =key;
                 
              }
               const res = await schoolList(formList, this.pages)
               const { entity: datas = {} } = res.data

            try {
                
                this.school = [...datas.resultData];
            } catch (error) {
               console.log(error)
            } finally {
               
            }
        },
        async getClass(data){
            const formData = Object.assign({},this.searchForm);
            
             const res = await getClassAll(this.searchForm, {pageNum:1,pageSize:100})
              const { entity: datas = {} } = res.data
              this.classList = datas.resultData;
            
              if(data){
                   this.form = data
              }
             
        },
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.isLoading = true
                    if(this.form.id&&!this.form.certiType) this.form.certiType = 26;
                    const handler = this.form.id ? editStudent : addStudent
                    handler(this.form).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.$message({
                                message: this.form.id ? '编辑成功' : '添加成功',
                                type: 'success'
                            })
                            this.cancel()
                        } else {
                            this.$message({
                                message: msg,
                                type: 'warning'
                            })
                        }
                    }).finally(() => {
                        this.isLoading = false
                    })
                } else {
                    return false
                }
            })
        },

        cancel() {

            this.$router.push({ path: '/xuexiao/schoolStudent' })

        }
    }
}
</script>
