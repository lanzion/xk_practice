<template>
    <div class="schedule">
        <div class="g-search--wrap clearfix" :style="{'marginTop':'18px'}">
            <div :style="{'margin':'20px 0'}">
                <span :style="{'fontSize':'14px'}">{{date}}</span>
            </div>
            <el-table
                ref="table"
                :data="listData"
                stripe
                align="center"
                v-loading="isLoading"
                border
                :header-cell-style="{'background-color':'#eee', 'color':'#666'}"
            >
                <el-table-column prop="comeTime" label="来访时间" align="center" />
                <el-table-column prop="schoolName" label="来访学校" align="center" />
                <el-table-column prop="projectName" label="服务标题" align="center" />
                <el-table-column prop="teacherName" label="代课教师" align="center" />
                <el-table-column prop="className" label="来访班级" align="center" />
                <el-table-column prop="stuNum" label="参与学生" align="center" />
            </el-table>
            <div :style="{'width':'100%','textAlign':'center','marginTop':'40px'}">
                <el-button @click="goback()">点击返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { selectCountArrangeDetail } from '@/api/resetApi';
export default {
    name: 'schedule',
    data() {
        return {
            date:'',
            weeks:["星期日","星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            listData: [
               
            ]
        }
    },
     created(){
          const id = this.baseinfoId || this.$route.query.id;
          const day = this.day || this.$route.query.day;
            if(id){
                this.baseinfoId =id;
            }
            if(day){
                this.day =day;
                this.date =  this.getDate(day);

            }
            this.getDetail()
        },
    methods: {
       
         getDetail(){
                const formData = {};
                if(this.baseinfoId){
                    formData.baseinfoId=this.baseinfoId;
                }
                    
                if(this.day){
                    formData.attendClassDateStr =this.day;
                }
                this.isLoading = true;
                selectCountArrangeDetail(formData)
                    .then(res=>{
                        let datas = res.data;
                        this.listData =datas.list||[]
                      
                    })
            .finally(()=>{
                this.isLoading = false;
            })

        },
       
        getDate(time){//转换时间
                let now = new Date(time);
                let day = this.weeks[now.getDay()];
                return `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日${day}`;
        },
        goback() {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
