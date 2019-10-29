<template>
    <div class="home">
        <div class="g-search--wrap clearfix">
             <div v-for="(k,index) in listArr" :key="index">
                  <div :style="{'padding':'20px 0'}">
                        <span :style="{'fontSize':'14px'}">{{k.month|getDate}}份实践活动日程安排</span>
                    </div>
                    <div class="model-table-box">
                        <div class="model-table-tr model-table-head">
                                <div class="model-table-td" v-for="(item,index1) in weeks" :key="index1">{{item}}</div>
                            </div>
                            <div class="model-table-tr">
                                <div class="model-table-td" :class="{'oy-active':item1.day!=''&&item1.dayNum>0}" @click="goDetail(k.month,item1)" v-for="(item1,index2) in k.dayList" :key="index2">
                                   {{item1.day}}
                                    <span v-show="item1.day!=''">
                                       <template v-if="item1.dayNum>0">
                                           号{{item1.dayNum}}次活动
                                       </template>
                                        <template v-else>
                                            号无活动
                                       </template>
                                    </span>
                                </div>
                            </div>
                    </div>
             </div>
          
        </div>
    </div>
</template>

<script>
import { selectCountArrange } from '@/api/resetApi';
// import permission from "@/mixin/admin-operate";
// import user from "@/mixin/admin-user";
export default {
    //  mixins: [permission, user],
    name: 'home',
    filters: {
            getDate: function (value) {
                if (!value) return ''
               let now = new Date(value);
                return `${now.getFullYear()}年${now.getMonth()+1}月`;
            }
    },
    data() {
        return {
            id:'',
            weeks:["星期日","星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            listArr: []
        }
    },
    created(){
          const id = this.id || this.$route.query.id;
          if(id){
              this.id =id;
          }else{
              const identiy = localStorage.getItem('xk_practice_identity');
                if(identiy==13){
                    const baseInfo = JSON.parse(localStorage.getItem("xk_practice_userInfo"));
                    this.id=baseInfo.baseId;
                }
              
          }
         this.getDetail()
    },
    methods: {
        goDetail(month,item){
            if(item.dayNum>0){
                 let day = item.day>10?`${month}-${item.day}`:`${month}-0${item.day}`
                  console.log(day)
                
                    this.$router.push({
                        path: '/practicalManage/baseAuthortySchedule/baseAuthortyScheduleDetail',
                        query:{day,id:this.id}
                    })
                
                 
                  
            }
          
        },
        getDetail(){
                const formData = {};
                if(this.id!=''){
                    formData.baseinfoId=this.id;
                }
                selectCountArrange(formData)
                    .then(res=>{
                        let datas = res.data;
                         datas.forEach(o =>{
                            let month = new Date(o.month),
                            getDate = new Date(month.getFullYear(),month.getMonth()+1,0),
                            dayNum = getDate.getDate(),
                            week = this.getDate(`${month.getFullYear()}-${month.getMonth()+1}-1`);
                            //console.log(week);
                            if(week>0){
                                for(let i=0;i<week;i++){
                                    o.dayList.unshift({
                                        day:'',
                                        dayNum:0,
                                        week:''
                                    })
                                }
                            }
                            
                           
                         })
                         this.listArr = datas;
                      
                    })
            .finally(()=>{
               
            })
        },
         getDate(time){//转换时间
                let now = new Date(time);
                let day = now.getDay();
                return day;
        },

    }
}
</script>

<style lang='scss' scoped>
   .model-table-box{
        margin-top:20px;
        border-top:1px solid #ddd;
        border-left:1px solid #ddd;
    }
     .model-table-tr{
        font-size: 0;
        
         .model-table-td{
            width:14.2857%;
             text-align: center;
            display: inline-block;
            border-bottom:1px solid #ddd;
            border-right:1px solid #ddd;
            font-size: 16px;
            color:#333;
            box-sizing: border-box;
            vertical-align: top;
            position: relative;
            height: 40px;
            line-height: 40px;
            &.oy-active{
                color:#f00;
                cursor:pointer;
            }
        }
         &.model-table-head{
            .model-table-td{
                background: #eef1f6;
               
            }
        }
    }
</style>
