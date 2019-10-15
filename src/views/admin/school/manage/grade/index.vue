<template>
   <div class="school-list-wrap">
        <!-- 搜索表单 -->
        <div class="g-search--wrap clearfix">
            <el-form :inline="true"  class="fl elFrom" @submit.native.prevent>
              
                 <el-form-item label="年级">
                    <el-select v-model="form.gradeId" placeholder="请选择年级" @change="resetPage" clearable>
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item>
                    <el-input v-model="form.className" placeholder="请输入班级名称" @keyup.native.enter="resetPage"></el-input>
                </el-form-item>
                <el-button type="primary" plain @click="resetPage">搜索</el-button>
              
            </el-form>
        </div>
       <div>
            <!-- 表头权限及统计 -->
            <section class="g-table--head clearfix fr">
                <head-operate
                class="fr"
                :items="headBtnGroup"
                v-bind="{
                            add: {},
                        }"
                />
            </section>
            </div>
        <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border :header-cell-style="{'background-color':'#eee', 'color':'#666'}">
            <el-table-column prop="className" label="班级名称" align="center"/>
            <el-table-column prop="gradeName" label="年级" align="center"/>
            <el-table-column prop="teacherName" label="班主任" align="center"/>
            <el-table-column prop="schoolTypeList" label="学段" align="center"/>
            <el-table-column prop="schoolName" label="所属学校" align="center"/>
             <el-table-column prop="remark" label="备注" align="center"/>
            <el-table-column label="操作" align="center" :width="operateWidth">
                    <template slot-scope="scope">
                    <list-operate
                        :items="listBtnGroup"
                        :data="scope.row"
                        :index="scope.$index"
                        v-bind="{
                                    edit: { query: { id: 'id'} },
                                    detail: { query: { id: 'id'} },
                                    del: { callback: doDel },
                            }"
                    />
                    </template>
                </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>
      
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getClassAll,delClass,getGradeList} from '@/api/resetApi'

import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'
const identiy = localStorage.getItem('xk_practice_identity');
const baseInfo = JSON.parse(localStorage.getItem("xk_practice_baseInfo"));
export default {
    mixins: [permission, user],
    data() {
        return {
            schoolId:'',
             form:{
                gradeId:'',
                className:''
            },
           options: [
               
            ],
            listData: [
               
            ],
           
           
           
        }
    },
    computed: {
       
    },
    created() {
        
        this.getDatas()
        this.getGradeList()
    },
    watch: {
       
    },
    methods: {
       async getGradeList(){
         
            if(identiy==9){
                 this.schoolId = baseInfo.baseInfo.id;
                 const res = await getGradeList({schoolId:this.schoolId});
                const { entity: datas = {} } = res.data
                try {
                    this.options = datas || []
                } catch (error) {
                    this.options = datas;
                } 
            }else if(identiy==5){
                const res = await getGradeList({identiy});
                const { entity: datas = {} } = res.data
                try {
                    this.options = datas || []
                } catch (error) {
                    this.options = datas;
                } 
            }
            
          
           
        },
        // 重置分页
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.getDatas()
        },
        changeRegion(region) {
            // console.log(region)
        },

        // 获取列表数据
        async getDatas() {
            this.isLoading = true
            const formList = Object.assign({}, this.form)
            const res = await getClassAll(formList, this.pages)

            const { entity: datas = {} } = res.data

            try {
                  const list = datas.resultData||[];
                list.forEach(o=>{
                    let schoolTypeList =[];
                    if(o.classType.indexOf('primarySchool')!=-1){
                          schoolTypeList.push('小学')
                    }
                    if(o.classType.indexOf('middleSchool')!=-1){
                          schoolTypeList.push('初中')
                    }
                    if(o.classType.indexOf('highSchool')!=-1){
                          schoolTypeList.push('高中')
                    }
                    o.schoolTypeList =schoolTypeList.join(',');
                })
               
                this.listData = list;
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.listData = []
            } finally {
                this.isLoading = false
            }
        },
        doDel({data}){
             const items = data;
            if (items) {
                const params ={id:items.id}
                this.$confirm(`确认删除该数据吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => { 
                    delClass(params).then(res => {
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
        },

       
    }
}
</script>

<style lang='scss' scoped>
    @import '~@/assets/css/mixin/core.scss';
    .elFrom {
        width: 100%;
    }
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
    .icon-famous {
        font-size: 20px;
        vertical-align: middle;
        &.is-active {
            color: $--color-secondary;
        }
    }
    
</style>
