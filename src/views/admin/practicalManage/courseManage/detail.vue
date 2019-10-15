<template>
    <div class="content">
      
        <div class="school-detail-main-list">
                <span class="school-detail-list-head">所属活动</span>
                <div class="school-detail-list-redource">
                       {{data.title}}
                </div>
        </div>
        <div class="school-detail-list">
            <div class="school-detail-item">
                      <span class="school-detail-list-head">课程封面</span>
                       <div class="school-detail-list-title">
                           <el-image :src="getFileUrl(data.cover)" class="school-detail-img" @click="prewImage">
                            <div slot="placeholder" class="image-slot">
                                加载中<span class="dot">...</span>
                            </div>
                        </el-image>
                       </div>
            </div>
        </div>
        <div class="school-detail-main-list">
                <span class="school-detail-list-head">课程学段</span>
                <div class="school-detail-list-redource">
                    <span v-if="data.fit==1">小学</span>
                   <span v-else-if="data.fit==2">初中</span>
                   <span v-else-if="data.fit==3">高中</span>
                </div>
        </div>
        <div class="school-detail-main-list">
                <span class="school-detail-list-head">课程类型</span>
                <div class="school-detail-list-redource">
                     {{data.courseTypeParentName}}/{{data.courseTypeName}}
                </div>
        </div>
         <div class="school-detail-main-list">
                <span class="school-detail-list-head">课程名称</span>
                <div class="school-detail-list-redource">
                   {{data.name}}
                </div>
        </div>
        <div class="school-detail-main-list">
                <span class="school-detail-list-head">学习目标</span>
                <div class="school-detail-list-title">
                       {{data.target}}
                </div>
        </div>
        <div class="school-detail-main-list">
                <span class="school-detail-list-head">课程内容</span>
                <div class="school-detail-list-title">
                           {{data.content}}
                </div>
        </div>
       
        <div class="school-detail-main-list">
                <span class="school-detail-list-head">课程资源</span>
                <div class="school-detail-list-redource">
                        <div class="school-detail-redource-list" v-for="(item,index) in data.resourceDtoList" :key="item.courseId">
                                <span class="school-detail-name">附件{{index+1}}</span>
                                <span  class="school-detail-name-title">{{item.resourceName}}</span>
                               <a :href="item.resourceId" @click.prevent="downloadItem(item.resourceId,item.resourceName)" class="school-detail-download-btn">
                                    下载
                                </a>
                        </div>
                         
                </div>
        </div>
        <div class="school-detail-main-list">
                <span class="school-detail-list-head"></span>
                <div class="school-detail-list-redource">
                         <el-form>
                            <el-form-item class="g-form--footer">
                                <!-- <el-button v-if="!disabled" type="primary" @click="submit" :loading="isLoading">{{ form.id ? '保存' : '立即创建' }}</el-button> -->
                                <el-button @click="cancel" type="primary">返回列表</el-button>
                            </el-form-item>
                        </el-form>
                </div>
        </div>
      
          <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="getFileUrl(dialogImageUrl)" alt="">
                </el-dialog>
    </div>
</template>

<script>

import { courseDetail } from '@/api/resetApi'

export default {
    data() {
        return {
            data:{},
            dialogImageUrl:'',
            dialogVisible:false
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
        this.getDetailData()
    },
    methods: {
        prewImage(){
             this.dialogImageUrl = this.data.cover;
            this.dialogVisible = true;
        },
        // 获取详情
        getDetailData() {
            const id = this.id || this.$route.query.id
            if (id) {
                courseDetail({ id }).then(res => {

                    const { code, entity: datas } = res.data
                    if (code === 200 && datas) {
                        this.data = datas || {}
                       
                    }
                }).finally(() => {
                    
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
        .school-detail-img{
            width: 300px;
            height: 300px;
            cursor:pointer;
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
   
</style>
