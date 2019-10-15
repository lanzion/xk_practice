<template>
    <div class="school-list-wrap">
        <!-- 搜索表单 -->
        <div class="g-search--wrap clearfix">
            <el-form :inline="true" :model="form" class="fl" @submit.native.prevent>
                <el-form-item label="评分类型">
                    <el-select v-model="form.evaluationType" placeholder="全部类型" @change="resetPage">
                        <el-option
                        v-for="item in fpStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>  
                <el-form-item label="评分时间">
                    
                        <el-date-picker
                            v-model="activityTime"
                            type="daterange"
                             value-format="timestamp"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间" style="width:300px;" @change="resetPage" clearable>
                        </el-date-picker >
                   
                </el-form-item>
                <el-form-item label="所属班级">
                    <el-select v-model="form.busBelongId" placeholder="请选择班级" clearable :remote-method="remoteMethod" filterable @change="resetPage">
                        <el-option
                        v-for="item in classList"
                        :key="item.id"
                        :label="item.className"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>  
                <el-form-item label="归档状态">
                    <el-select v-model="form.isPortfolioStatus" placeholder="全部类型" @change="resetPage"> 
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>  
                 <el-form-item >
                    <el-form-item>
                        <el-input v-model="form.busAuthorName" placeholder="请输入被评学生名字"></el-input>
                    </el-form-item>
                    <el-button type="primary" plain @click="resetPage">搜索</el-button>
                </el-form-item>    
            </el-form>
        </div>
        
        <!-- 表格数据列表 -->
        <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border :header-cell-style="{'background-color':'#eee', 'color':'#666'}">
            <el-table-column prop="busName" label="作品名称"/>
            <el-table-column prop="busAuthorName" label="被评人" align="center" />
            <el-table-column prop="busBelongName" label="所属班级" align="center"/>
           <el-table-column label="类型" align="center"  >
                <template slot-scope="scope">
                  <span v-if="scope.row.evaluationType=='SELF_EVAL'">自评</span>
                  <span v-else-if="scope.row.evaluationType=='OTH_EVAL'">他评</span>
                  <span v-else-if="scope.row.evaluationType=='TEACHER_EVAL'">师评</span>
                </template>
            </el-table-column>
            <el-table-column prop="totalScore" label="得分" align="center"/>
            <el-table-column prop="remark" label="评语"  />
            <el-table-column prop="reviewerName" label="评分人" align="center" />
            <el-table-column prop="createDate" label="评分时间" align="center"/>
            <el-table-column label="归档状态" align="center" >
                <template slot-scope="scope">
                  <span v-if="scope.row.isPortfolioStatus=='HAS_PORTFOLIO'">已归档</span>
                   <span v-else>未归档</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <list-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        del: { callback: doDel },
                      
                    }" />
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination :param="pages"  :total="totalNum" @change="getDatas"></pagination>


        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { recordList,recordDelete,getClassAll } from '@/api/resetApi'

import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'



export default {
    mixins: [permission, user],
    data() {
        return {
            activityTime:'',
          
            form:{
                    createStTime:null,
                    createEndTime:null,
                    evaluationType:null,
                    busBelongId:null,
                    isPortfolioStatus:null,
                    busAuthorName:null
            },
            searchForm:{
                className:''
            },
           listData: [
               
            ],
            classList:[],
             fpStates: [
                {
                    value: null,
                    label: '全部类型'
                },
                {
                    value: 'TEACHER_EVAL',
                    label: '教师评'
                },
                {
                    value: 'SELF_EVAL',
                    label: '自评'
                },
                {
                    value: 'OTH_EVAL',
                    label: '他评'
                }
            ],
            options:[
                 {
                    value: null,
                    label: '全部'
                },
                {
                    value: 'NO_PORTFOLIO',
                    label: '未归档'
                },
                {
                    value: 'HAS_PORTFOLIO',
                    label: '已归档'
                }
            ],
            pages1:{
                'pageNum': 1,
                'pageSize':50
            }
        }
    },
    computed: {
       
    },
    created() {
        this.getClass();
        this.getDatas()
        
    },
    watch: {
        
    },
    methods: {
        resetPage1(key) {
            this.getClass(key)
        },
         remoteMethod(qurey){
            this.resetPage1(qurey);
        },
         // 获取班级数据
        async getClass(qurey) {
           
            const formList = Object.assign({}, this.searchForm)
            if(qurey){
                formList.className =qurey;
            }
            const res = await getClassAll(formList, this.pages1)

            const { entity: datas = {} } = res.data

            try {
                  const list = datas.resultData||[];
                this.classList = list;
              
            } catch (error) {
               this.classList = []
            } finally {
                
            }
        },

        // 重置分页
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.getDatas()
        },

        // 获取列表数据
        async getDatas() {
             if(!this.activityTime){
                  this.form.createStTime =null;
                  this.form.createEndTime = null;
            }else{
                  this.form.createStTime = this.activityTime[0]||null;
                 this.form.createEndTime = this.activityTime[1]||null;
            }
            const formList = Object.assign({}, this.form)
            this.isLoading = true;
            const res = await recordList(formList, this.pages)

            const { entity: datas = {} } = res.data

            try {
                this.listData = datas.resultData || []
                this.totalNum = datas.totalNum || 0
                 this.isLoading = false
            } catch (error) {
                this.listData = []
            } finally {
                this.isLoading = false
            }
        },
        // 删除操作
        doDel({ data }) {
            const items = data;
            if (items) {
                const params ={id:items.id}
                this.$confirm(`确认删除该数据吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => { 
                    recordDelete(params).then(res => {
                        const { code, msg } = res.data
                        if (code === 200) {
                            this.$message({
                                message: `删除成功`,
                                type: 'success'
                            })
                           
                            this.getDatas()
                        } else {
                            this.$message({
                                message: msg || '操作失败',
                                type: 'error'
                            })
                        }
                    })
                }).catch(() => {})
            } else {
                this.$message({
                    message: '请至少选择一条数据!',
                    type: 'warning'
                })
            }
        }
           
    }
}
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/mixin/core.scss';

    .lockStatus {
        &::before {
            font-size: 18px;
            vertical-align: sub;
        }
        @each $color-key, $color-value in $--lock-status-color {
            &.__status-#{$color-key} {
                color: $color-value;
            }
        }
    }
    .auditStatus {
        @each $color-key, $color-value in $--examine-status-color {
            &.__status-#{$color-key} {
                color: $color-value;
            }
        }
    }
</style>
