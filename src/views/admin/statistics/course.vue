<template>
    <div class="school-list-wrap">
        <!-- 搜索表单 -->
        <div class="g-search--wrap clearfix">
            <el-form :inline="true" :model="form" class="fl" @submit.native.prevent>
                <el-form-item label="所属单位">
                    <el-select v-model="form.createType" placeholder="请选择所属单位" clearable @change="resetPage">
                        <el-option
                        v-for="item in fpStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" >
                        </el-option>
                    </el-select>
                </el-form-item>  
                 <el-form-item label="活动主题">
                    <el-select v-model="form.activityId" @change="resetPage" placeholder="请选择活动主题" filterable clearable remote :remote-method="remoteMethod">
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>  
                  <el-form-item label="参与学校">
                    <el-select v-model="form.schoolId" placeholder="请选择参与学校" clearable @change="resetPage"  filterable remote :remote-method="remoteMethod1">
                        <el-option
                        v-for="item in schooolList"
                        :key="item.id"
                        :label="item.schoolName"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>  
            </el-form>
        </div>
        
        <!-- 表格数据列表 -->
        <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border :header-cell-style="{'background-color':'#eee', 'color':'#666'}">
            <el-table-column prop="activityTitle"  align="center" label="活动主题"/>
            <el-table-column prop="schoolName"  align="center" label="活动学校"/>
            <el-table-column prop="baseinfoName"  align="center" label="活动基地"/>
            <el-table-column prop="price"  align="center" :label="priceAll" />
            <el-table-column label="操作" align="center" width="300">
              <template slot-scope="scope">
                     <list-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                         detail: { query: { schoolId: 'schoolId',actId:'activityId',baseinfoId:'baseinfoId',createType:'createType'} },
                       
                    }" />
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>

    
    

        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { activityList } from '@/api/newApi'
import { getCourseCount,schoolList } from '@/api/resetApi'

import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'
export default {
    mixins: [permission, user],
    data() {
        return {
          
           listData: [
               
            ],
            form: {
                createType: '',
                activityId: '',
                schoolId:''
            },
             fpStates: [
                {
                    value: 'A',
                    label: '教育局'
                },
                {
                    value: 'B',
                    label: '学校'
                },
              
            ],
             options: [
                
              
            ],
             schooolList: [
             
              
            ],
             searchForm:{

            },
            pages1:{
                pageNum:1,
                pageSize:100
            },
             pages2:{
                pageNum:1,
                pageSize:100
            }
        }
    },
    computed: {
      priceAll(){
            let num =0;
            this.listData.forEach(o =>{
                num =num+ parseFloat(o.price);
            })
           return `服务费总计￥${num}`
      }
    },
    created() {
        this.getDatas()
        this.getActiveList();
         this.getSchoolList();
    },
    watch: {
      
    },
    methods: {
         resetPage1(key) {
            this.getActiveList(key);
         },
          remoteMethod(qurey){
           
            this.resetPage1(qurey);
        },
         async getActiveList(key){
              const formList = Object.assign({}, this.searchForm)
              if(key){
                  formList.title =key;
                 
              }
             
               const res = await activityList(formList, this.pages1)
               const { entity: datas = {} } = res.data

            try {
                
                this.options =  datas.resultData||[];
               
            } catch (error) {
                 this.options  =[]
            } finally {
               
            }
      },
       resetPage2(key) {
            this.getSchoolList(key);
          
         },
          remoteMethod1(qurey){
           
            this.resetPage2(qurey);
        },
         async getSchoolList(key){
              const formList = {}
              if(key){
                  formList.schoolName =key;
                 
              }
             
               const res = await schoolList(formList, this.pages2)
               const { entity: datas = {} } = res.data

            try {
                
                this.schooolList =  datas.resultData||[];
               
            } catch (error) {
                 this.options  =[]
            } finally {
               
            }
      },
        // 重置搜索表单
         resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            if(!this.activityId){
                this.options =[];
                this.getActiveList();
            }
             if(!this.schoolId){
                this.schooolList =[];
                this.getSchoolList();
            }
            this.getDatas()
        },

        

     

        // 获取列表数据
        async getDatas() {
            this.isLoading = true
             const formList = Object.assign({}, this.form)
       
            const res = await getCourseCount(formList, this.pages)

            const { entity: datas = {} } = res.data

            try {
                this.listData = datas.resultData || []
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.datas = []
            } finally {
                this.isLoading = false
            }
        },
    }
}
</script>

<style lang='scss' scoped>
  

   
</style>
