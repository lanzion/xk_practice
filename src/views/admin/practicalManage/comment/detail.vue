<template>
    <div class="content">
      
        <div class="school-detail-main-list">
                <span class="school-detail-list-head">点评学校</span>
                <div class="school-detail-list-redource">
                        {{data.schoolName}}
                </div>
        </div>
        <div class="school-detail-main-list">
                <span class="school-detail-list-head">评语</span>
                <div class="school-detail-list-title">
                        {{data.content}}
                </div>
        </div>
       
        <div class="school-detail-main-list">
                <span class="school-detail-list-head">活动相册</span>
                <div class="school-detail-list-redource">
                        <div class="course_scheduling_main">
                                <div class="course_scheduling_item"  @click="openDialog" v-for="item in data.resourceDtoList" :key="item.id">
                                    <div class="course_scheduling_img_box">
                                        <el-image :src="item.resourceId" class="course_scheduling_img">
                                                <div slot="placeholder" class="image-slot">
                                                    加载中<span class="dot">...</span>
                                                </div>
                                        </el-image>
                                    </div>
                                </div>
                        </div>
                </div>
        </div>
          <div class="school-detail-main-list">
                <span class="school-detail-list-head">点评时间</span>
                <div class="school-detail-list-redource">
                        {{data.createDate}}
                </div>
        </div>
          <div class="school-detail-main-list">
                <span class="school-detail-list-head">点评人</span>
                <div class="school-detail-list-redource">
                      {{data.createName}}
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
      
     
    </div>
</template>

<script>

import { commentDetail } from '@/api/resetApi'

export default {
    data() {
        return {
             data:{},
            
        }
    },
    props: {
        disabled: {
            type: Boolean,
            default: false
        }
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
       openDialog(){

       },
        // 获取详情
        getDetailData() {
            const id = this.id || this.$route.query.id
            if (id) {
                this.isLoading = true

                commentDetail({ shcActivityId:id }).then(res => {
                    const { code, entity: datas } = res.data
                    if (code === 200 && datas) {
                        this.data = datas || {}
                      
                    }
                }).finally(() => {
                    this.isLoading = false
                })
            }
        },

        // 返回列表页
        cancel() {
            this.$router.go(-1)
        }
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


     .course_scheduling_main{
            font-size: 0;
             max-width: 900px;
            .course_scheduling_item{
                display:inline-block;
                box-sizing: border-box;
                vertical-align: top;
                width:23%;
                cursor: pointer;
                margin:10px 2% 0 0;
                .course_scheduling_img_box{
                    position: relative;
                    padding-top: 100%;
                    margin-bottom: 7px;
                    .course_scheduling_img{
                            position: absolute;
                            top:0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                    }
                    .image-slot{
                        font-size: 14px;
                        color:#666666;
                    }
                }
            }
        }
   
</style>
