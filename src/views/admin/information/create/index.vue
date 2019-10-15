<template>
  <el-form
    ref="form"
    class="g-form--wrap"
    label-width="80px"
    :model="form"
    :rules="rules"
  
  >
    <el-form-item label="资讯标题" prop="title">
      <el-col :span="12">
        <el-input v-model="form.title" placeholder="请输入资讯标题" maxlength="50"></el-input>
      </el-col>
    </el-form-item>
     <el-form-item label="资讯封面" prop="cover">
                <ali-upload  :limit="1" :file-list.sync="cover" :before-upload="beforeUploadCover" accept=".gif,.jpg,.png,.jpeg" :on-change="uploadCover" @remove="remove">
                                   
                </ali-upload>
                 <p class="upload-list-tips">仅支持JPG、GIF、PNG、JPEG格式，文件小于 {{ imgStandardFileSize }} M。590 x 300比例</p>
    </el-form-item>
     <el-form-item label="资讯描述" prop="remark">
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入资讯描述"
        v-model="form.remark">
      </el-input>
    </el-form-item>
    <el-form-item label="资讯内容" prop="content">
      <div id="editor-trigger" style="height: 200px"></div>
    </el-form-item>
    <el-form-item label="是否推荐" prop="isrecommend">
      <el-radio-group v-model="form.isrecommend">
        <el-radio v-for="(item) in isMust" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否开启" prop="status">
      <el-radio-group v-model="form.status">
        <el-radio v-for="(item) in isOpen" :label="item.id" :key="item.id">{{ item.name }}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item class="g-operate--box">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submit"   :loading="isLoading">保存</el-button>
    </el-form-item>
    
  </el-form>
</template>

<script>
import { mapState, mapActions } from "vuex";

import { informationAdd } from "@/api/newApi";

import { editor } from "@/mixin/wangEditor.js";
import { uploadFileSize } from "@/mixin/uploadFileSize.js";
import aliUpload from "@/components/common/upload.vue";

export default {
  mixins: [uploadFileSize, editor],
  components: {
    "ali-upload": aliUpload
  },
  data() {
    return {
         cover:[],
      isLoading: false,
      isMust: [
        {
          id: 'A',
          name: "是"
        },
        {
          id: 'B',
          name: "否"
        }
      ],
      isOpen: [
        {
          id: 'A',
          name: "开启"
        },
        {
          id: 'B',
          name: "关闭"
        }
      ],
      form: {
        title:'',
        cover:'',
        content:'',
        remark:"",
        isrecommend:'',
        status:''
      },
      rules: {
        title: [
          {
            required: true,
            message: "请填写资讯标题",
            trigger: ["blur","change"]
          }
        ],
        remark: [
          {
            required: true,
            message: "请填写描述",
            trigger: ["blur","change"]
          }
        ],
       content: [
          {
            required: true,
            message: "请填写资讯内容",
            trigger: ["blur"]
          }
        ],
   
        cover:[{
             required: true, message: '请选择封面', trigger: ['change','blur']
        }],
        isrecommend: [
          {
            required: true,
            message: "请选择是否推荐",
            trigger: ["change", "blur"]
          }
        ],
        status: [
          {
            required: true,
            message: "请选择开启状态",
            trigger: ["change", "blur"]
          }
        ],
      }
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.initEditor();
    let self = this;
    this.editor.onchange = function() {
      self.form.content = this.$txt.html();
    };
  },
  created() {
    
  },
  methods: {
     uploadCover ({ file } = {}) {
             this.form.cover = this.cover.map((item,index) =>item.url)
      },
      remove(file){
             this.form.cover = [];
      },
    submit() {
      let that = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true;
        
           const formList = Object.assign({}, this.form); 
          const formData ={
              cover:this.getFileUrl(formList.cover[0]),//封面
              title:formList.title,//标题   
              content:formList.content,
              isrecommend:formList.isrecommend,
              status:formList.status,
              remark:formList.remark,
              orgType:'C',  
          } 
           informationAdd(formData).then(res => {
                        if (res.data.code === 200) {
                         
                            this.$message({
                                message: `提交成功`,
                                type: 'success',
                                onClose(){
                                     that.$router.go(-1)
                                }
                            })
                           
                          
                        } else {
                         
                            this.$message({
                                message: res.data.msg || `提交失败`,
                                type: 'error'
                            })
                              this.isLoading = false;
                        }
                    }).finally(() => {
                       
                    })
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
<style lang="scss" scoped>
.g-form--wrap{
  max-width: 1000px;
}
.wangEditor-container .wangEditor-txt {
  height: 200px !important;
}
</style>