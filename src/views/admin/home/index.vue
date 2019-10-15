<template>
    <div class="home">

        <div class="g-search--wrap clearfix" v-if="isAdmin===1">
            <div :style="{'margin':'20px 0'}">
                <span :style="{'fontSize':'14px'}">2019年2月份实践活动日程安排</span>
            </div>
            <div>
                <ul class="tablelist" :style="{'width':'1407px','border':'1px solid #ccc','borderBottom':'none',}">
                    <li class="colors">星期一</li>
                    <li class="colors">星期二</li>
                    <li class="colors">星期三</li>
                    <li class="colors">星期四</li>
                    <li class="colors">星期五</li>
                    <li class="colors">星期六</li>
                    <li class="colors">星期日</li>
                </ul>
                <ul class="tablelist tablelists" :style="{'width':'1407px','border':'1px solid #ccc'}">
                    <li @click="changes()" v-for="(item,index) in arr" :key='index'>{{item}}</li>
                </ul>
            </div>

            <div :style="{'margin':'20px 0'}">
                <span :style="{'fontSize':'14px'}">2019年3月份实践活动日程安排</span>
            </div>
            <div>
                <ul class="tablelist" :style="{'width':'1407px','border':'1px solid #ccc','borderBottom':'none',}">
                    <li class="colors">星期一</li>
                    <li class="colors">星期二</li>
                    <li class="colors">星期三</li>
                    <li class="colors">星期四</li>
                    <li class="colors">星期五</li>
                    <li class="colors">星期六</li>
                    <li class="colors">星期日</li>
                </ul>
                <ul class="tablelist tablelists" :style="{'width':'1407px','border':'1px solid #ccc'}">
                    <li v-for="(item,index) in arr" :key='index'>{{item}}</li>
                </ul>
            </div>
        </div>
        <div class="school-home-box  clearfix" v-if="isAdmin===2">
            <div class="school-home-head">
                操作流程示意图
            </div>
            <div class="shcool-active-box">
                <div class="shool-active-item-box">
                  <div class="shool-active-item" :style="{backgroundImage:'url('+imgArr[0]+')'}">
                       <div class="school-active-item-head">
                            教育局发起活动处理
                       </div>
                       <div class="school-active-item-title">
                           接受或拒绝教育局分配的实践活动
                       </div>
                  </div>
                   <div class="shool-active-item school-last-item" :style="{backgroundImage:'url('+imgArr[4]+')'}">
                       <div class="school-active-item-head">
                           学校发起实践活动
                       </div>
                       <div class="school-active-item-title">
                          学校发起实践活动
                       </div>
                  </div>
                </div>
                <div class="shool-active-item-box school-arow">
                    <div class="school-first">
                        <div class="school-icon-item" :style="{backgroundImage:'url('+imgArr[5]+')'}"></div>
                    </div>
                      <div class="school-two" :style="{backgroundImage:'url('+imgArr[5]+')'}">

                      </div>
                </div>
                <div class="shool-active-item-box">
                  <div class="shool-active-item" :style="{backgroundImage:'url('+imgArr[1]+')'}">
                       <div class="school-active-item-head">
                           设置实践课程
                       </div>
                       <div class="school-active-item-title">
                          根据实践活动信息创建合适的课程
                       </div>
                  </div>
                </div>
                 <div class="shool-active-item-box school-arow-icon school-arow" :style="{backgroundImage:'url('+imgArr[5]+')'}">

                </div>
                <div class="shool-active-item-box">
                  <div class="shool-active-item" :style="{backgroundImage:'url('+imgArr[2]+')'}">
                       <div class="school-active-item-head">
                             排课
                       </div>
                       <div class="school-active-item-title">
                           将课程分配给适合的班级
                       </div>
                  </div>
                </div>
                <div class="shool-active-item-box school-arow-icon school-arow" :style="{backgroundImage:'url('+imgArr[5]+')'}">

                </div>
                <div class="shool-active-item-box">
                  <div class="shool-active-item" :style="{backgroundImage:'url('+imgArr[3]+')'}">
                       <div class="school-active-item-head">
                           实践课程跟进
                       </div>
                       <div class="school-active-item-title">
                          查看管理教师对课程的接受情况
                       </div>
                  </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>

export default {
    name: 'home',
    data() {
        return {
            arr: ['1号', '2号', '2号', '2号', '2号', '2号', '2号', '2号', '2号', '2号', '2号', '2号', '2号', '2号', '2号'],
            isAdmin:2,
            imgArr:[
                require('@assets/image/school1.png'),
                require('@assets/image/school2.png'),
                require('@assets/image/school3.png'),
                require('@assets/image/school4.png'),
                require('@assets/image/school5.png'),
                 require('@assets/image/school6.png')
                ]

        }
    },
    methods: {
        changes() {
            this.$router.push({
                name: 'schedule',
            })
        }
    }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/css/mixin/core.scss";
*{
    margin: 0;
    padding: 0;
}
.tablelist{
    width: 100%;
    font-size: 0;
    li{
        margin: 0;
        padding:0;
        display: inline-block;
        width: 200px;
        height: 30px;
        border:1px solid #ccc;
        border-right: none;
        border-top: none;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
    }
}
.colors{
    background: #f5f7fa;
}
.tablelists{
    li{
        &:nth-last-child(1){
            border-right: 1px solid #ccc;
        }
    }
}

.school-home-box{
      min-width: 1200px;
     overflow-x: scroll;
    .school-home-head{

        border-top:1px solid #dfdfdf;
        color:#008aff;
        font-size: 20px;
        margin-top:10px;
        padding:20px 0 30px 0;
    }
    .shcool-active-box{
        font-size: 0;
        .shool-active-item-box{
            display: inline-block;
            vertical-align: middle;
            &.school-arow{
                position: relative;
                width: 100px;
                height: 240px;
                .school-first{
                    position: absolute;
                    width: 100%;
                    top:50%;
                    left:0;
                    margin-top:-110px;
                    height: 100px;
                    display: flex;
                    align-items: center;
                    .school-icon-item{
                        width: 100px;
                        height:54px;
                        background-position: center;
                        background-repeat: no-repeat;
                        background-size:54px 35px;
                        transform: rotate(40deg)
                    }

                }
                .school-two{
                    position: absolute;
                    width: 100%;
                    bottom:20px;
                    left:0;
                    height:54px;
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size:54px 35px;
                    transform: rotate(-40deg)


                }
                &.school-arow-icon{
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size:54px 35px;
                }
            }
            .shool-active-item{
                height: 240px;
                width: 200px;
                background-position: center;
                background-repeat: no-repeat;
                background-size:cover;
                &.school-last-item{
                    margin-top:40px;
                }
                .school-active-item-head{
                    width: 165px;
                    color:#fff;
                    font-size: 18px;
                    text-align: center;
                    padding:67px 0 14px 0;
                    border-bottom: 1px solid #fff;
                    margin: 0 auto;
                }
                .school-active-item-title{
                        font-size: 14px;
                        color:#fff;
                        padding:0 10px;
                        line-height: 20px;
                        text-align: center;
                        padding-top:15px;
                }
            }
        }

    }
}
</style>
