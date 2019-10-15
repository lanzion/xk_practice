<template>
    <div class="content">
      
        <el-form ref="form" class="g-form--wrap" label-width="80px"  style="maxWidth:1200px;min-width: 700px" :model="form" :rules="rules"   @submit.native.prevent>
             <el-row>
            <el-col :span="8">
                 <el-form-item label="模板名称" prop="title">
                       <el-input v-model="form.title" placeholder="请输入模板名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="3">&nbsp;</el-col>
              <el-col :span="8">
                   <el-form-item label="应用对象" prop="group">
                        <el-select v-model="form.group" placeholder="请选择应用对象">
                                <el-option
                                v-for="item in fpStates"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                    </el-form-item>
            </el-col>
        </el-row>
         <el-row>
            <el-col :span="8">
                 <el-form-item label="所属学段" prop="schoolType">
                       <el-radio-group v-model="form.schoolType" >
                         <el-radio v-for="(item) in options" :label="item.key" :key="item.key">{{ item.label }}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
              <el-col :span="3">&nbsp;</el-col>
              <el-col :span="8">
                  <el-form-item label="适用年级" prop="classId">
                        <el-select v-model="form.classId" placeholder="请选择年级">
                                <el-option
                                v-for="item in gradeArr"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                                </el-option>
                            </el-select>
                    </el-form-item>
              
                </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                 <el-form-item label="课程类型" prop="values">
                    <el-cascader
                        v-model="form.values"
                        :options="options1"
                        :props="{ expandTrigger: 'hover' }"></el-cascader>
             
                </el-form-item>
            </el-col>
        </el-row>
        
        <el-form-item label="模板备注" prop="remark">
            <el-col :span="18">
                 <el-input type="textarea" :rows="4" placeholder="模板备注" v-model="form.remark" ></el-input>
            </el-col>
        </el-form-item>
<!--         
          <div class="school-detail-main-list">
               <span class="school-detail-list-head" style="position:relative">表格内容</span>
        </div> -->
        <div class="model-table-box">
            <div class="model-table-tr model-table-head">
                <div class="mode-table-left">
                      <div class="model-table-td">评价项目</div>
                </div>
                <div class="mode-table-right">
                     <div class="mode-table-right-tr">
                        <div class="model-table-td">评价内容</div>
                        <div class="model-table-td">评价标准</div>
                        <div class="model-table-td">分数</div>
                     </div>
                </div>
            </div>
             <div class="model-table-tr model-table-body" v-for="(item,index) in tree" :key="index">
                <div class="mode-table-left">
                      <div class="model-table-td" :style="{height:80*item.defContentItems.length+'px'}">
                          <textarea v-model="item.defProjectName" @input="checkStr(index)" placeholder="请输入项目内容(30字以内)" ref="myInput" maxlength="30"></textarea>
                           <i class="el-icon-delete oy-delete" @click="delItem(index,'p')" v-if="index==tree.length-1"></i>
                           <i class="el-icon-circle-plus oy-add-icon"  @click="addItem(index,'p')" v-if="index==tree.length-1"></i>
                      </div>
                </div>
                <div class="mode-table-right" >
                     <div class="mode-table-right-tr" v-for="(item1,index1) in item.defContentItems" :key="index1">
                        <div class="model-table-td">
                            <textarea v-model="item1.defContentName" placeholder="请输入评价内容(100字以内)" @input="checkNum(index,index1,'defContentName')" maxlength="100"  ref="myInput"></textarea>
                            <i class="el-icon-delete oy-delete"  @click="delItem(index,'c',index1)" v-if="index1==item.defContentItems.length-1"></i>
                             <i class="el-icon-circle-plus oy-add-icon" @click="addItem(index,'c')" v-if="index1==item.defContentItems.length-1"></i>
                        </div>
                        <div class="model-table-td">
                             <textarea v-model="item1.defStandardItems[0].defStandardName"  ref="myInput"  @input="checkNum(index,index1,'defStandardName')" placeholder="请输入评价标准(100字以内)" maxlength="100"></textarea>
                        </div>
                        <div class="model-table-td">
                            <div class="mode-grade-box">
                                      <el-input v-model="item1.defStandardItems[0].defStandardScore" style="textAlign:center;"   @keyup.native="getGradeAll" @input="checkNum(index,index1,'defStandardScore')" ref="myInput1"  placeholder="请输入分数" maxlength="3" ></el-input>
                            </div>
                           
                            
                        </div>
                     </div>
                </div>
            </div>
        </div>
        <div class="list-num">当前分值<span>{{grade}}</span>分</div>
        <div class="list-num">评分模板需满足<span>100</span>分</div>
            <div class="school-detail-main-list">
                    <span class="school-detail-list-head"></span>
                    <div class="school-detail-list-redource">
                            
                                <el-form-item class="g-form--footer">
                                     <el-button @click="cancel">取消</el-button>
                                    <el-button type="primary" @click="submit"   :loading="isLoading">保存</el-button>
                                    
                                </el-form-item>
                        
                    </div>
            </div>
        </el-form>
      
     
    </div>
</template>

<script>

import {getActivityTypeParent,templateAdd,getGradeList} from '@/api/resetApi'

export default {
    data() {
        return {
          isLoading:false,
           fpStates:[
               {
                    value: 'ALL',
                    label: '全部'
                },
                {
                    value: 'EVAL_TEMPLATE_TYPE_TEACHER',
                    label: '教师'
                },
                {
                    value: 'EVAL_TEMPLATE_TYPE_STUDENT',
                    label: '学生'
                },
           ],
            options1:[],//课程类型
            options:[
                {
                     key:'1',
                    value: 'primarySchool',
                    label: '小学',
                },
                {
                    key:'2',
                    value: 'middleSchool',
                    label: '初中',
                    
                },
                {
                     key:'3',
                    value: 'highSchool',
                    label: '高中',
                    
                }
            ],
            gradeArr:[],
            grade:0,
            form:{
                title:'',
                classId:'',
                group:'',
                schoolType:'',
                remark:'',
                values:[]
            },
            tree:[
                {
                    key:0,
                    defProjectName:'',//评分项
                    defContentItems:[{
                            defContentName:'',
                            defStandardItems:[{//评分标准和分数
                                defStandardName:'',
                                defStandardScore:''
                            }],
                        
                        },
                    ]
                }
            ],
            rules: {
                title:[{
                     required: true, message: '请输入模板名称', trigger: ['blur']
                }],
                classId:[{
                     required: true, message: '请选择年级', trigger: ['change','blur']
                }],
                group:[{
                     required: true, message: '请选择应用对象', trigger: ['change','blur']
                }],
                schoolType:[{
                     required: true, message: '请选择所属学段', trigger: ['change','blur']
                }],
                remark:[{
                     required: true, message: '请输入模板备注', trigger: ['blur']
                }],
                 values:[
                      { required: true, message: '请选择所属领域', trigger: ['change', 'blur'] }
                ],
            }
        }
    },
    
    computed: {
      
    },
    watch: {
      
    },
    mounted() {
       this.getActivityTypeParent();
    },
    methods: {
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
                      

                         this.options1 =arrBox;
                         this.getGradeList()
                      
                     

                    }
                }).finally(() => {
                    
                })
               
           
        },
        //年级转换
        changeGrade(){
            let idx = this.form.schoolType-1;
          
            this.gradeArr = this.options[idx].grade;
            this.form.classId = '';
        },
         //调用计算总分数方法
        getGradeAll(){
          this.$nextTick(() => {
            let num1 = this.getGrade();
            this.grade = num1;
            
            })
        },
        //计算总分数方法
        getGrade(){
         
              let arr = [...this.$refs.myInput1],
                len = arr.length,
                num =0;
                  for(let i=0 ; i< len ; i++){
                  
                       let o = arr[i],
                         value = o.value||0;
                       
                       num =num + parseInt(value);
                       
                    }
                    
                    return num;
           
             
           
        },
        //去除空格
        checkStr(index){
             let value = this.tree[index].defProjectName+'',
              str = value.replace(/\s*/g, '');//去除空格;
             this.tree[index].defProjectName = str;
             
        },
        //输入验证是否为数字
        checkNum(index,index1,key){
             let str;
                
            if(key=='defStandardScore'){
                 let value = this.tree[index].defContentItems[index1].defStandardItems[0][key]+'';
                  str =value.replace(/[^\d]/g, '');
                  if(str[0]==0){
                        str = str.slice(1,str.length);
                  }
                if(str>100){
                    str = str.slice(0,2);
                }
               this.tree[index].defContentItems[index1].defStandardItems[0][key] = str;
               
               
            }else{
                if(key=='defStandardName'){
                     let value = this.tree[index].defContentItems[index1].defStandardItems[0][key]+'';
                      str = value.replace(/\s*/g, '');//去除空格;
                      this.tree[index].defContentItems[index1].defStandardItems[0][key] = str;
                }else{
                         let value = this.tree[index].defContentItems[index1][key]+'';
                      str = value.replace(/\s*/g, '');//去除空格;
                      this.tree[index].defContentItems[index1][key] = str;
                }
                
               

               
            }
         
               
        },
        //删除评价项目
       delItem(index,key,index1){
           if(key=='p'){
               let len =this.tree.length;
                if(len==1){
                     this.$message({
                        message: '评价项目最少为1条',
                        type: 'warning'
                        })
                }else{
                    let arr =[...this.tree].slice(0,len-1);
                      
                       this.tree = arr;
                     
                       this.getGradeAll()
                        
                }
           }else{
                 let len =this.tree[index].defContentItems.length;

                 if(len==1&&index==0){//判断是否剩下最后一项
                      this.$message({
                        message: '评价项最少为1',
                        type: 'warning'
                        })
                }else{
                        if(len==1){//判断是否只有一项
                            this.tree.splice(index,1)
                        }else{
                            let arr =[...this.tree[index].defContentItems].slice(0,len-1);
                             this.$set(this.tree[index], 'defContentItems', arr)
                         
                        }
                       
                        this.getGradeAll()
                   
                  
                }
           }
          
       },
       //添加评价项目
       addItem(index,key){
             if(key=='p'){//判断添加项的类型p:父类
                    this.tree.push( {
                        key:index+1,
                        defProjectName:'',
                        defContentItems:[{
                                defContentName:'',
                                defStandardItems:[{
                                    defStandardName:'',
                                    defStandardScore:''
                                }],
                            
                            },
                        ]
                 })
             }else{
                   this.tree[index].defContentItems.push({
                                defContentName:'',
                                defStandardItems:[{
                                    defStandardName:'',
                                    defStandardScore:''
                                }],
                            
                    })
             }
                    
       },

        // 根据是否有id提交添加/编辑表单
        submit() {
              let that = this;
            this.$refs.form.validate((valid) => {
                if (valid) {
                     let arr = [...this.$refs.myInput],
                        len = arr.length;
                    let arr1 = [...this.$refs.myInput1],
                        len1 = arr1.length;
                    for(let i=0 ; i< len ; i++){
                        
                            let o = arr[i];
                            if(o.value===''){
                                    this.$message({
                                        message: '评价项不能为空',
                                        type: 'warning'
                                    })
                                    return false;
                                    break;
                            }
                            
                            
                    }
                    for(let i=0 ; i< len1 ; i++){
                        
                            let o = arr1[i];
                            
                                
                            if(o.value===''){
                                    
                                    this.$message({
                                        message: '分数不能为空',
                                        type: 'warning'
                                    })
                                     return false;
                                    break;
                            }
                            
                            
                    }
                   
                    if(this.grade!=100){
                        this.$message({
                                        message: '总分数需满足100分',
                                        type: 'warning'
                        })
                        return false;
                    }
                     const formList = Object.assign({}, this.form);
                   
                    const formData ={
                        templateName:formList.title,
                        templateType:formList.group,
                        templateSection:this.options[formList.schoolType-1].value,
                        templateGrade:formList.classId,
                        remark:formList.remark,
                        defItems:this.tree,
                        activityField:formList.values[0],
                        activityType:formList.values[1],
                    } 
                        this.isLoading = true;
                    templateAdd(formData).then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                message: `提交成功`,
                                type: 'success',
                                onClose(){
                                  
                                    that.$router.go(-1)
                                }
                            })
                          
                        } else {
                            this.isLoading = false
                            this.$message({
                                message: res.data.msg || `提交失败`,
                                type: 'error'
                            })
                        }
                    }).finally(() => {
                        
                    })
                     
                }else {
                  
                    return false
                }
            })
           
          
           
        },
        //获取年级
        async getGradeList(){
             const res = await getGradeList();

            const { entity: datas = {} } = res.data
            try {
                 this.gradeArr = datas || []
                
                 
            } catch (error) {
                 this.gradeArr  =[]
            } 
          
           
        },
        // 返回列表页
        cancel() {
            this.$router.go(-1)
        },
       
    }
}
</script>

<style lang='scss' module>
    @import '~@/assets/css/base/utils.scss';
    @import '~@/assets/css/base/element-variables.scss';
    $--magnification: 20;
    $--dialog-width: 740px;
    $--cover-width: $--activity-cover-ratio-width * $--magnification;
    $--cover-height: $--activity-cover-ratio-height * $--magnification;
    $--copper-height: ($--dialog-width - $--dialog-padding-primary * 2) / $--activity-cover-ratio;

    :export {
        width: $--cover-width;
        height: $--cover-height;
        dialogWidth: $--dialog-width;
        boxHeight: $--copper-height;
    }
    textarea.el-textarea__inner{
        resize: none;
    }
    
</style>

<style lang="scss" scoped>
    @import '~@/assets/css/base/utils.scss';
    @import '~@/assets/css/base/element-variables.scss';
    @import '~@/assets/css/module/my-module-form.scss';
    .content{
        min-width: 900px;
        max-width: 1200px;
        .school-detail-img{
            width: 300px;
            height: 300px;
        }
        .school-detail-list{
            margin-top:20px;
            font-size: 0;
            .school-detail-item{
                display: inline-block;
                width: 50%;
                position: relative;
                vertical-align: top;
            }
        }
        .school-detail-main-list{
            position: relative;
            margin-top:30px;
            .school-detail-list-title{
                overflow-y: auto;
                max-height: 150px;
                max-width: 900px;
                border-radius: 4px;
	            border: solid 1px #eaeaea;
                word-break: break-all;
                padding:10px;
                box-sizing: border-box;
            }
            .school-detail-list-redource{
                font-size: 14px;
                color: #333333;
                margin-left: 82px;
                line-height: 20px;
                .school-detail-redource-list{
                    margin-bottom: 10px;
                }
                .school-detail-name{
                    color: #666666;
                    margin-right:10px;
                }
                .school-detail-name-title{
                    color: #333;
                    margin-right:10px;
                }
                .school-detail-download-btn{
                    display: inline-block;
                    vertical-align: middle;
                    width: 40px;
                    height: 20px;
                    background-color: #e4eefe;
                    border-radius: 4px;
                    border: solid 1px #008aff;
	                line-height: 20px;
                    color: #008aff;
                    text-align: center;
                    font-size:12px;
                }
            }
        }
        .school-detail-list-head{
            color: #666666;
            position: absolute;
            top:0;
            left: 0;
            width: 82px;
            font-size: 14px;
            line-height: 20px;
            &.list-active{
                position: static;
                width: 100%;
                span{
                    	color: #0099ff;
                        margin:0 7px;
                }
                margin-bottom: 20px;
            }
        }
        .school-detail-list-title{
            line-height: 20px;
            font-size: 14px;
            color: #333333;
            margin-left:82px; 
        }

    }
    .model-table-box{
        border-top:1px solid #ddd;
        border-left:1px solid #ddd;
    }
    .model-table-tr{
        display: flex;
        flex-wrap: nowrap;
        .model-table-td{
           display: inline-block;
            min-height: 40px;
            border-bottom:1px solid #ddd;
            border-right:1px solid #ddd;
            font-size: 16px;
            color:#333;
            box-sizing: border-box;
            vertical-align: top;
            position: relative;
            .oy-delete{
                position: absolute;
                bottom:7px;
                right:7px;
                z-index: 20;
                font-size: 25px;
                color:#008aff;
                cursor:pointer;

            }
            .oy-add-icon{
                position: absolute;
                bottom:7px;
                right:40px;
                z-index: 20;
                font-size: 25px;
                color:#008aff;
                cursor:pointer;
            }

        }
        .mode-table-left{
              flex:1;
              box-sizing: border-box;
        }
        .mode-table-right{
              width: 80%;
              font-size: 0;
              box-sizing: border-box;
              .mode-table-right-tr{
                    width: 100%;
                    .model-table-td:nth-child(1){
                        width:40%;
                    }
                    .model-table-td:nth-child(2){
                       width:40%;
                    }
                    .model-table-td:nth-child(3){
                       width:20%;
                    }
              }
        }
        .mode-table-left{
                .model-table-td{
                    width: 100%;
                }
        }
        &.model-table-head{
          
            .model-table-td{
                 height: 40px;
                 line-height: 40px;
                background: #eef1f6;
                text-align: center;
            }
        }
         &.model-table-body{
            .mode-table-left{
                .model-table-td{
                    min-height: 80px;
                }
            }
            .mode-table-right{
                .model-table-td{
                    height: 80px;
                }
            }
        }
        
    }
     .model-table-box{
         textarea{
            resize: none;
            border:none;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding:10px 5px;
            line-height: 20px;
            font-size: 16px;
            color:#000;
        }
    }
    .mode-grade-box{
        height:100%;
        line-height: 80px;
        text-align: center;
        input{
             text-align: center;
        }
    }
    .list-num{
        font-size: 14px;
        color:#333;
        padding-top:10px; 
        span{
            color:#f00;
        }
    }
   
</style>
