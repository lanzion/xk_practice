<template>
    <div class="content">
      
       
        <div class="school-detail-list">
            <div class="school-detail-item">
                      <span class="school-detail-list-head">模板名称</span>
                       <div class="school-detail-list-title">
                          {{datas.templateName}}
                       </div>
            </div>
            <div class="school-detail-item">
                 <span class="school-detail-list-head">应用对象</span>
                  <div class="school-detail-list-title">
                      <span v-if="datas.templateType=='ALL'">全部</span>
                      <span v-if="datas.templateType=='EVAL_TEMPLATE_TYPE_TEACHER'">教师</span>
                      <span v-if="datas.templateType=='EVAL_TEMPLATE_TYPE_STUDENT'">学生</span>
                  </div>
            </div>
        </div>
         <div class="school-detail-list">
            <div class="school-detail-item">
                      <span class="school-detail-list-head">所属学段</span>
                       <div class="school-detail-list-title">
                          <span v-if="datas.templateSection=='primarySchool'">小学</span>
                          <span v-else-if="datas.templateSection=='middleSchool'">初中</span>
                          <span v-else-if="datas.templateSection=='highSchool'">高中</span>
                       </div>
            </div>
            <div class="school-detail-item">
                 <span class="school-detail-list-head">适用年级</span>
                  <div class="school-detail-list-title">
                   
                      {{datas.templateGradeName}}
                  </div>
            </div>
        </div>
          <div class="school-detail-main-list">
                <span class="school-detail-list-head">活动类型</span>
                <div class="school-detail-list-redource">
                        {{datas.activityTypeName}}/{{datas.activityFieldName}}
                </div>
        </div>
         <el-form>
        <div class="school-detail-main-list">
               <span class="school-detail-list-head">备注</span>
                <div class="school-detail-list-title">
                       {{datas.remark}}
                </div>
        </div>
      
         <div class="model-table-box" style="marginTop:20px;">
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
                          <div class="model-center-box">
                                   {{item.defProjectName}}
                          </div>
                      
                      </div>
                </div>
                <div class="mode-table-right" >
                     <div class="mode-table-right-tr" v-for="(item1,index1) in item.defContentItems" :key="index1">
                        <div class="model-table-td">
                             <div class="model-center-box">
                                    {{item1.defContentName}}
                            </div>
                           
                        </div>
                        <div class="model-table-td">
                             <div class="model-center-box">
                                    {{item1.defStandardItems[0].defStandardName}}
                            </div>
                           
                        </div>
                        <div class="model-table-td">
                            <div class="mode-grade-box">
                                        {{item1.defStandardItems[0].defStandardScore}}
                            </div>
                           
                            
                        </div>
                     </div>
                </div>
            </div>
        </div>
      
            <div class="school-detail-main-list">
                    <span class="school-detail-list-head"></span>
                    <div class="school-detail-list-redource">
                            
                                <el-form-item class="g-form--footer">
                                    <!-- <el-button v-if="!disabled" type="primary" @click="submit" :loading="isLoading">{{ form.id ? '保存' : '立即创建' }}</el-button> -->
                                    <el-button @click="cancel" type="primary">返回列表</el-button>
                                </el-form-item>
                        
                    </div>
            </div>
        </el-form>
      
     
    </div>
</template>

<script>

import { templateDetail } from '@/api/resetApi'

export default {
    data() {
        return {
             
            datas:[],
            tree:[]
          
        }
    },
    props: {
       
    },
    computed: {
      
    },
    watch: {
      
    },
    mounted() {
       
    },
    created(){
        this.getDetailData();
    },
    methods: {
       
        // 获取详情
        getDetailData() {
            const id = this.id || this.$route.query.id
            if (id) {
                this.isLoading = true

                templateDetail({ id }).then(res => {
                    const { code, entity: datas } = res.data
                    if (code === 200 && datas) {
                        this.datas = datas || {}
                        this.tree = datas.defItems
                    }
                }).finally(() => {
                    this.isLoading = false
                })
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
                min-height: 40px;
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
        
        .model-center-box{
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
   
</style>
