<template>
    <div class="content">
        <school-info :operation="true"></school-info>
    </div>
</template>

<script>
import schoolInfo  from './children/schoolInfo';
export default {
    name: "schoolDetail",
    components:{
        'school-info':schoolInfo
    },
    data() {
        return {
            datas:{

            },
           
        }
    },
    computed: {
      
    },
    watch: {
      
    },
    mounted() {
       
    },
    created(){
    },
    methods: {
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
   
</style>
