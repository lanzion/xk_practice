<template>
    <el-form ref="form" class="g-form--wrap" label-width="80px" :model="form" :rules="rules" >
        <!-- <el-form-item label="登录账号" prop="account">
            <el-col :span="12">
                <el-input v-model="form.account" placeholder="请输入登录账号"></el-input>
            </el-col>
        </el-form-item> -->
       <el-form-item label="所属活动">
            <el-col :span="12">
                <el-select v-model="form.activityId" placeholder="请选择课程所属活动" filterable clearable remote :remote-method="remoteMethod">
                    <el-option
                        v-for="item in school"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-col>
        </el-form-item>
         <el-form-item label="课程封面" prop="cover">
           
                  
                <ali-upload  :limit="1" :file-list.sync="cover" :before-upload="beforeUploadCover" accept=".gif,.jpg,.png,.jpeg" :on-change="uploadCover" @remove="remove">
                                   
                </ali-upload>
                <div>web端实践详情页的banner图, 仅支持JPG、GIF、PNG、JPEG格式，文件小于 5 M。
建议上传的图片像素为 600 x 370</div>
            
        </el-form-item>
        <el-form-item label="课程类型" prop="values">
           <el-cascader
            v-model="form.values"
            :options="options"
            :props="{ expandTrigger: 'hover' }"></el-cascader>
             
        </el-form-item>
        <el-form-item label="课程学段" prop="fit">
             <el-radio-group v-model="form.fit">
                <el-radio v-for="(item) in schoolArr" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
         <el-form-item label="课程名称" prop="name">
            <el-input  v-model="form.name" ></el-input>
        </el-form-item> 
         <el-form-item label="学习目标" prop="target">
            <el-input type="textarea" :rows="4" placeholder="请填写课程学习内容" v-model="form.target" ></el-input>
        </el-form-item> 
        <el-form-item label="课程内容" prop="content">
           <el-input type="textarea" :rows="4" placeholder="请填写课程学习内容" v-model="form.content"  ></el-input>
        </el-form-item>
        <el-form-item label="活动资源" prop="resourceList">
            <upload listType="file" :file-list.sync="form.resourceList" :accept="fileType">
                <p class="m-upload--tip">不限数量，文件格式：doc / docx / ppt / pptx / xls / xlsx / zip / rar，单个文件大小不超过8M</p>
            </upload>
        </el-form-item>
        <el-form-item label="是否必修" prop="isCompulsory">
            <el-radio-group v-model="form.isCompulsory">
                <el-radio v-for="(item) in isMust" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item class="g-operate--box">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="submit" :loading="isLoading">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { activityList } from '@/api/newApi'
import { courseAdd,getActivityTypeParent,selectAllList} from '@/api/resetApi'

import { validateAccount, validateUserName, validateIDCode, validatePhone, validateEmail } from '@/utils/utility/validateRule'
import { upload } from '@/mixin/common'
 import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import aliUpload from '@/components/common/upload.vue'
export default {
     mixins: [upload,uploadFileSize],
     components: {
            'ali-upload': aliUpload
        },
    data() {
        return {
            fileType:'.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.rar',
            cover:[],
            options: [],
            school:[],
            isLoading: false,
            dialogVisible: false,
        
            schoolArr:[
                {
                    id:1,
                    name:'小学'
                },
                {
                    id:2,
                    name:'初中'
                },
                {
                    id:3,
                    name:'高中'
                }
            ],
            isMust:[
                {
                    id:"A",
                    name:'是'
                },
                {
                    id:"B",
                    name:'否'
                }
            ],
            form: {
                courseType: '',//课程主题
                activityId: '',//活动id
                courseTypeParent:'',//课程领域
                fit: '',
                isCompulsory:'',//是否必修
                target:'',
                content:'',
                cover:'',
                resourceList: [],
                values:[],
                name:''
            },

            rules: {
                activityId:[{
                    required: true, message: '请选择所属活动', trigger: ['blur']
                }],
                cover:[{
                    required: true, message: '请选择封面', trigger: ['change']
                }],
                target:[{
                    required: true, message: '请填写课程学习目标', trigger: ['blur']
                }],
                fit: [
                    { required: true, message: '请选择课程学段', trigger: ['change', 'blur'] }
                ],
                isCompulsory: [
                    { required: true, message: '请选择是否必修', trigger: ['change', 'blur'] }
                ],
                values:[
                      { required: true, message: '请选择所属领域', trigger: ['change', 'blur'] }
                ],
                content:[{
                    required: true, message: '请填写课程内容', trigger: ['blur']
                }],
                name:[{
                    required: true, message: '请填写课程名称', trigger: ['blur']
                }],
                resourceList:[{
                    required: true, message: '请选择资源', trigger: ['blur']
                }],
               
            },
            pages:{
                pageNum:1,
                pageSize:20
            },
            searchForm:{

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
        this.getActivityTypeParent()
    },
    methods: {
         resetPage(key) {
            this.$set(this.pages, 'pageNum', 1)
            this.$set(this.pages, 'pageSize', 50)
          
            this.getSchoolList(key);
          
         },
          remoteMethod(qurey){
           
            this.resetPage(qurey);
        },
         async getSchoolList(key){
              const formList = Object.assign({}, this.searchForm)
              if(key){
                  formList.title =key;
                 
              }
             
               const res = await activityList(formList, this.pages)
               const { entity: datas = {} } = res.data

            try {
                
                this.school =  datas.resultData||[];
               
            } catch (error) {
            } finally {
               
            }
      },
        getActivityTypeParent(){
             getActivityTypeParent({}).then(res => {
                    
                    const datas= res.data
                   
                    if (datas) {
                       let arrBox =[];
                       datas.typelist.forEach(o =>{
                          
                                    let arr = o.dicDetailList.map(k =>{
                                    return {
                                        value:k.code,
                                        label:k.name
                                    }
                                })
                                arrBox.push({
                                     value:o.code,
                                     label:o.name,
                                     children:arr
                                })
                                
                         })
                      

                         this.options =arrBox;
                              this.getSchoolList()
                      
                     

                    }
                }).finally(() => {
                    
                })
             
           
        },
         uploadCover ({ file } = {}) {
             this.form.cover = this.cover.map((item,index) =>item.url)
         
             
        },
         remove(file){
             this.form.cover = [];
        },
        submit() {
            let that = this;
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.isLoading = true
                      const formList = Object.assign({}, this.form);
                       
                    const formData ={
                            
                            activityId:formList.activityId,//活动id
                            content:formList.content,//课程内容
                            cover:this.getFileUrl(formList.cover[0]),//主题
                            target:formList.target,//目标
                            resourceList:[],//资源数组
                            isCompulsory:formList.isCompulsory,//是否必修
                            fit:formList.fit,//学段
                            courseType:formList.values[1],
                            courseTypeParent:formList.values[0],
                            name:formList.name
                        } 
                         formList.resourceList.forEach(o=>{
                            formData.resourceList.push({
                                resourceId:o.url,
                                resourceName:o.name
                            });
                        });
                       
                    courseAdd(formData).then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                message: `提交成功`,
                                type: 'success',
                                onClose(){
                                  
                                   
                                }
                            })
                             that.$router.push({path:'/practicalManage/courseManage'})
                          
                        } else {
                             this.isLoading = false
                            this.$message({
                                message: res.data.msg || `提交失败`,
                                type: 'error'
                            })
                        }
                    }).finally(() => {
                       
                    })
                  
                } else {
                    return false
                }
            })
        },

        cancel() {
            this.$router.go(-1)
        },
        
     
    }
}
</script>
<style lang="scss">
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>