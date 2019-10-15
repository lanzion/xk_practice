<template>
    <div class="submit-form backend-content__middle" style="padding-top:50px;">
        <el-form ref="form" :model="form" label-width="100px" :rules="rules">
             <el-row>
                <el-form-item label="教育局名称" prop="eduName">
                    <el-col :span="8">
                        <el-input v-model="form.eduName" placeholder="请输入教育局名称"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
               <el-form-item label="教育局类型" prop="eduType">
                    <el-col :span="8">
                            <el-select v-model="form.eduType"   clearable placeholder="请选择教育局类型">
                                <el-option
                                v-for="item in options"
                                :key="item.type"
                                :label="item.label"
                                :value="item.type">
                                </el-option>
                            </el-select>
                    </el-col>
                </el-form-item>
            </el-row>
              <el-row>
                <el-form-item label="联系人" prop="linkName">
                    <el-col :span="8">
                        <el-input v-model="form.linkName" placeholder="请输入联系人"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
              <el-row>
                <el-form-item label="联系方式" prop="phone">
                    <el-col :span="8">
                        <el-input v-model="form.phone" placeholder="请输入联系方式" maxlength="11"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
              <el-row>
                <el-form-item label="传真" prop="fax">
                    <el-col :span="8">
                        <el-input v-model="form.fax" placeholder="请输入传真号"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
              <el-row>
                <el-form-item label="邮箱" prop="email">
                    <el-col :span="8">
                        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row >
                 <el-col :span="8" >
                        <el-form-item label="所属地区" prop="provinceId">
                            
                                <region  type="object" @change="changeRegion"  :default="cityBox"  class="regions"></region>
                        
                        </el-form-item>
                </el-col>
            </el-row>
             <el-row>
                <el-form-item label="所属街道" prop="street">
                    <el-col :span="8">
                        <el-input v-model="form.street" placeholder="请输入所属街道"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item label="详细地址" prop="address">
                    <el-col :span="8">
                        <el-input v-model="form.address" placeholder="请输入详细地址"></el-input>
                    </el-col>
                </el-form-item>
            </el-row>
            <el-row>
            <el-col :span="8">
                 <el-form-item label="LOGO" prop="cover">
                        <ali-upload  :limit="1" :file-list.sync="cover" :before-upload="beforeUploadCover" accept=".gif,.jpg,.png,.jpeg" :on-change="uploadCover" @remove="remove">
                                   
                        </ali-upload>
                         <p class="upload-list-tips">仅支持JPG、GIF、PNG、JPEG格式，文件小于 {{ imgStandardFileSize }} M。1200 x 300比例</p>
                </el-form-item>
            </el-col>
            
              <el-col :span="10">
                 <el-form-item label="空间图" prop="designSpacePage">
                        <ali-upload  :limit="1" :file-list.sync="designSpacePage" :before-upload="beforeUploadCover" accept=".gif,.jpg,.png,.jpeg" :on-change="uploadCover1" @remove="remove1">
                                   
                        </ali-upload>
                         <p class="upload-list-tips">仅支持JPG、GIF、PNG、JPEG格式，文件小于 {{ imgStandardFileSize }} M。1200 x 300比例</p>
                </el-form-item>
            </el-col>
        </el-row>
         <el-row>
            <el-col :span="8">
                 <el-form-item label="空间背景图" prop="designSpaceBackground">
                        <ali-upload  :limit="1" :file-list.sync="designSpaceBackground" :before-upload="beforeUploadCover" accept=".gif,.jpg,.png,.jpeg" :on-change="uploadCover2" @remove="remove2">
                                   
                        </ali-upload>
                         <p class="upload-list-tips">仅支持JPG、GIF、PNG、JPEG格式，文件小于 {{ imgStandardFileSize }} M。1200 x 300比例</p>
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
import { mapState, mapMutations, mapActions } from 'vuex'
import {detailEdus,editEdus} from '@/api/resetApi'
import {validatePhone, validateEmail } from '@/utils/utility/validateRule'
 import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import aliUpload from '@/components/common/upload.vue'
export default {
    name: 'edutionEdit',
     mixins: [uploadFileSize],
     components: {
            'ali-upload': aliUpload
        },
    data() {
        return {
            isLoading:false,
            location:'',
            cover:[],
            designSpacePage:[],
            designSpaceBackground:[],
            cityBox:[],
            form: {
              eduName:'',
              linkName:'',
              phone:'',
              fax:'',
              email:'',
              provinceId:'',
              cityId:'',
              areaId:'',
              cover:'',
              eduType:'',
              designSpacePage:'',
              designSpaceBackground:'',
              street:'',
              address:'',//详细地址
            },
            
            options:[{
                type:'1',
                label:'省教育厅'
            },{
                type:'2',
                label:'市教育局'
            },{
                type:'3',
                label:'县教育局'
            }],
            // 表单校验提示
            rules: {
                 eduType:[{
                     required: true, message: '请选择教育局类型', trigger: ['change','blur']
                }],
                designSpacePage:[{
                     required: true, message: '请选择空间图', trigger: ['change','blur']
                }],
                cover:[{
                     required: true, message:'请选择LOGO', trigger: ['change','blur']
                }],
                designSpaceBackground:[{
                     required: true, message:'请选择空间背景图', trigger: ['change','blur']
                }],
                eduName: [
                    { required: true, message: '请输入教育局名称', trigger: ['change','blur'] }
                ],
                 linkName: [
                    { required: true, message: '请输入联系人', trigger: ['change','blur'] }
                ],
                 phone: [
                    { required: true, message: '请输入联系方式', trigger: ['change','blur'] },
                    { validator:  validatePhone, trigger: ['change', 'blur'] }
                ],
                 fax: [
                    { required: true, message: '请输入传真', trigger: ['change','blur'] }
                ],
                 email: [
                    { required: true, message: '请输入邮箱', trigger: ['change','blur'] },
                     { validator:  validateEmail, trigger: ['change', 'blur'] }
                ],
                provinceId: [
                    { required: true, message: '请选择所属地区', trigger: ['blur']  }
                ],
                street: [
                    { required: true, message: '请输入所属街道', trigger: ['change','blur'] }
                ],
                address: [
                    { required: true, message: '请输入详细地址', trigger: ['change','blur'] }
                ],
            },
          
        }
    },
    computed: {

       
    },
    watch: {
        
    },
    methods: {
         // 获取详情
        getDetailData() {
            const id = this.$route.query.id;
            if (id) {
           

                detailEdus({ id }).then(res => {
                    const { code, entity: datas } = res.data
                    if (code === 200 && datas) {
                        if(!datas.cover){
                             this.cover = [];
                             this.form.cover =  [];
                        }else{
                                 this.cover = [{
                                    name: "2.png",
                                    size: 63600,
                                    status: "success",
                                    uploadName: "d77e555877554abab3394032b5922988-1566870608494__2.png",
                                    url: datas.cover
                                }];
                                this.form.cover =  [datas.cover];
                        }

                         if(!datas.designSpacePage){
                             this.designSpacePage = [];
                             this.form.designSpacePage = [];
                             
                        }else{
                                 this.designSpacePage = [{
                                    name: "2.png",
                                    size: 63600,
                                    status: "success",
                                    uploadName: "d77e555877554abab3394032b5922988-1566870608494__2.png",
                                    url: datas.designSpacePage
                                }];
                                 this.form.designSpacePage = [datas.designSpacePage];
                        }
                        if(!datas.designSpaceBackground){
                             this.designSpaceBackground = [];
                             this.form.designSpaceBackground = [];
                        }else{
                                 this.designSpaceBackground = [{
                                    name: "2.png",
                                    size: 63600,
                                    status: "success",
                                    uploadName: "d77e555877554abab3394032b5922988-1566870608494__2.png",
                                    url: datas.designSpaceBackground
                                }];
                                this.form.designSpaceBackground = [datas.designSpaceBackground];
                        }
                        this.form.id=datas.id;
                        this.form.eduName=datas.eduName;
                        this.form.linkName=datas.linkName;
                        this.form.phone=datas.phone;
                        this.form.fax=datas.fax;
                        this.form.email=datas.email;
                        this.form.provinceId=datas.provinceId;
                        this.form.cityId=datas.cityId;
                        this.form.areaId=datas.areaId;
                        this.form.address=datas.address;
                        this.form.street = datas.street;
                        this.form.eduType = datas.eduType;
                        this.cityBox =[datas.provinceId,datas.cityId,datas.areaId]
                              
                          
                         
                           
                    }
                }).finally(() => {
                  
                })
            }
        },
         uploadCover ({ file } = {}) {
              
           this.form.cover = this.cover.map((item,index) =>item.url)
             
        },
        uploadCover1 ({ file } = {}) {
           this.form.designSpacePage = this.designSpacePage.map((item,index) =>item.url)
        },
        remove(file){
             this.form.cover = this.cover.map((item,index) =>item.url)
        },
        remove1(file){
             this.form.designSpacePage = this.designSpacePage.map((item,index) =>item.url)
        },
        uploadCover2 ({ file } = {}) {
           this.form.designSpaceBackground = this.designSpaceBackground.map((item,index) =>item.url)
        },
        remove2(file){
             this.form.designSpaceBackground = this.designSpaceBackground.map((item,index) =>item.url)
        },
    
       changeRegion(region) {
             this.form.provinceId =region[0].code||'';
             this.form.cityId =region[1].code||'';
             this.form.areaId =region[2].code||'';
            
            
           
        },
        
        
        // 提交表单
        onSubmit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                   this.isLoading = true;
                    let txt = '修改'
                    const formList = Object.assign({}, this.form);
                    formList.cover = this.getFileUrl(this.form.cover[0]);
                    formList.designSpacePage = this.getFileUrl(this.form.designSpacePage[0]);
                    formList.designSpaceBackground = this.getFileUrl(this.form.designSpaceBackground[0]);
                    // console.log(formList);           
                    editEdus(formList).then( response => {
                        if (response.data.code == 200) {
                            this.$message({
                                message: `${txt}成功`,
                                type: 'success'
                            })
                            this.$router.go(-1)
                        } else {
                            this.$message.error(response.data.msg)
                            this.isLoading = false;
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
     this.getDetailData()
       
    },
   
}
</script>
<style lang="scss" scoped>
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
