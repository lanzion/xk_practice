<template>
  <el-form
    ref="form"
    class="g-form--wrap"
    label-width="100px"
    :model="form"
    :rules="rules"
  
  >
    <el-form-item label="帐号" prop="account">
      <el-col :span="12">
        <el-input v-model="form.account" placeholder="请输入帐号" :disabled="isReadOnly"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="用户名" prop="userName">
      <el-col :span="12">
        <el-input v-model="form.userName" maxlength="12" placeholder="请输入用户名" :disabled="isReadOnly"></el-input>
      </el-col>
    </el-form-item>
      <el-form-item label="用户头像" prop="cover">
                <ali-upload  :limit="1" :file-list.sync="cover" :before-upload="beforeUploadCover" accept=".gif,.jpg,.png,.jpeg" :on-change="uploadCover" @remove="remove">
                                   
                </ali-upload>
                 <p class="upload-list-tips">仅支持JPG、GIF、PNG、JPEG格式，文件小于 {{ imgStandardFileSize }} M。像素500 x 500比例</p>
    </el-form-item>
    <el-form-item label="所属教育局" prop="baseId" v-if="isReadOnly">
      
      <el-col :span="12">
        <el-input v-model="schoolName" :disabled="isReadOnly"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="备注">
      <el-col :span="20">
        <el-input
          type="textarea"
          placeholder="请输入备注"
          :autosize="{ minRows: 4, maxRows: 6}"
          v-model="form.remark"
          @submit.native.prevent
          class="school-input-item1"
        ></el-input>
      </el-col>
    </el-form-item>
    <el-row v-if="!isSelf">
      <el-form-item label="权限" prop="permissListChcked">
        <el-col :span="20" class="tree-box">
          <h5 class="tree-head">权限列表</h5>
          <el-tree
            :data="datas"
            show-checkbox
            node-key="permissionId"
            ref="tree"
            highlight-current
            :props="defaultProps"
            :check-strictly="isCheckStrictly"
            :filter-node-method="filterNode"
            :default-checked-keys="form.permissList"
            @check-change="getPermiss"
            v-loading="isLoading1"
          ></el-tree>
        </el-col>
        <div
          style="position:absolute;font-size:12px;bottom:-18%;color:#ff4949;"
          v-if="noPermiss"
        >请选择权限</div>
      </el-form-item>
    </el-row>
    <el-form-item label="开启状态" prop="lockStatus">
      <el-radio-group v-model="form.lockStatus">
        <el-radio v-for="(item) in lockStatus" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item class="g-operate--box">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit"  :loading="isLoading">修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

import {
  validateAccount,
  validateUserName,
  validatePwd
 
} from "@/utils/utility/validateRule";
import { addUser } from "@/api/newApi";
import { selectDetailByOrgUser,getByPid,modifyUser } from "@/api/resetApi";


import { uploadFileSize } from '@/mixin/uploadFileSize.js'
import aliUpload from '@/components/common/upload.vue'
const identiy = localStorage.getItem('xk_practice_identity');

const baseInfo = JSON.parse(localStorage.getItem("xk_practice_baseInfo"));

export default {
   mixins: [uploadFileSize],
     components: {
            'ali-upload': aliUpload
        },
  data() {
    return {
      schoolName:'',//学校名称
      isSelf: false,
      identiy:identiy,
      noPermiss: false,
      isCheckStrictly: false,
      datas: [],
      isLoading1:false,
      isReadOnly: true,
      cover:[],
      defaultProps: {
        children: "children",
        label: "permissionName"
      },
      lockStatus: [
       
        {
          id: "0",
          name: "开启"
        } ,{
          id: "1",
          name: "关闭"
        },
      ],
      form: {
        permissListChcked:[],
        cover:[],
        account: "",
        userName: "",
        remark: "",
        baseId: "",
        lockStatus:'',
        permissList: [] //权限列表
      },
      rules: {

        lockStatus: [
          {
            required: true,
            message: "请选择开启状态",
            trigger: ["change", "blur"]
          }
        ],
        permissListChcked: [
          { required: true, message: "请选择权限", trigger: "blur" }
        ],
        cover:[{
             required: true, message: '请选择头像', trigger: ['change','blur']
        }],
      }
    };
  },
  computed: {},
  watch: {
    form: {
      handler: function(val, oldVal) {
        if (val.permissList.length > 0) {
          this.noPermiss = false;
        }
      },
      deep: true
    }
  },
  mounted() {
   
   
  },
  created() {
    //this.getUpdateRight()
    this.getDetail()
    
  },
  methods: {
    getDetail(){
       const id = this.$route.query.id;
            if (id) {
               selectDetailByOrgUser({ id,identity:10}).then(res => {
                    const { code, entity: datas } = res.data
                    if (code === 200 && datas) {
                      
                      
                       this.schoolName =datas.orgName;
                      const formData = {
                        id:datas.id,
                        account: datas.account,
                        userName: datas.userName,
                        remark: datas.remark,
                        baseId: datas.baseId,
                        lockStatus:datas.lockStatus,
                        permissListChcked:datas.permissList||[],
                        permissList: datas.permissList||[]//权限列表
                      };
                      !datas.face?formData.cover =[]:formData.cover = [datas.face];
                       this.cover = [{
                            name: "2.png",
                            size: 63600,
                            status: "success",
                            uploadName: "d77e555877554abab3394032b5922988-1566870608494__2.png",
                            url: datas.face
                        }]
                      this.form = formData;
                      this.getUpdateRight()
                        
                    }
                }).finally(() => {
                  
                })
            }
       
    },
     uploadCover ({ file } = {}) {
             this.form.cover = this.cover.map((item,index) =>item.url)
      },
      remove(file){
             this.form.cover = [];
      },
    getUpdateRight(){
        this.isLoading1 = true;
        const formData ={
            type:'A',
            baseId:this.form.baseId
        }
      
        getByPid(formData).then(res => {
                    
                    const { code, entity: datas } = res.data
                    if (code === 200 && datas) {
                     
                      
                        this.datas = datas[0].children;
                       
                    }
                 
                }).finally(() => {
                      this.isLoading1 = false;
                })
    },
    //权限勾选
    getPermiss() {
      let arr = [];
      let _data = this.$refs.tree.getCheckedNodes();
      for (let i = 0; i < _data.length; i++) {
        arr.push(_data[i].pid);
        arr.push(_data[i].permissionId);
      }
      this.form.permissListChcked = [...new Set(arr)];
    },
    filterNode(value, data) {
      if (!value) return true;
      return !(data.account.indexOf(value) === "cloud_admin");
    },
    submit() {
     
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true;

       
           const formList = Object.assign({}, this.form);
           const  formData={
              id:formList.id,
              remark: formList.remark,
              lockStatus:formList.lockStatus,
              permissList: formList.permissListChcked,
              face:this.getFileUrl(formList.cover[0])
           }
         
          modifyUser(formData).then(
            res => {
              // console.log(res);
              if (res.data.code == 200) {
                  this.$message({
                        message: `修改成功`,
                        type: 'success'
                  })
                  this.$router.go(-1)
              }else if(res.data.code == 206){
                  this.$message.error(response.data.msg)
              }
              this.isLoading = false;
            },
            err => {
              console.log(err);
            }
          );
        } else {
          return false;
        }
      });
    },

    cancel() {
      this.$router.go(-1)
    }
  }
};
</script>
<style lang="scss">
.school-input-item1 {
  max-width: 970px;
}
.tree-box {
  .tree-head {
    border: 1px solid #c9c9c9;
    border-bottom: none;
    background-color: #f6f6f6;
    padding-left: 10px;
  }
  .el-tree {
    cursor: default;
    background: #fff;
    border: 1px solid #d1dbe5;
  }
}
</style>