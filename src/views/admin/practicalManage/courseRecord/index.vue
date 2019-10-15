<template>
   <div class="school-list-wrap">
        <!-- 搜索表单 -->
        <div class="g-search--wrap clearfix">
            <el-form :inline="true" :mode="form"  class="fl elFrom" @submit.native.prevent>
                <el-form-item label="课程所属单位">
                    <el-select v-model="form.createType" placeholder="请选择课程所属单位" clearable @change="resetPage">
                        <el-option
                        v-for="item in fpStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>      
                <el-form-item >
                    <el-form-item>
                        <el-input v-model="form.activityTitle" placeholder="活动标题"></el-input>
                    </el-form-item>
                    <el-button type="primary" plain @click="resetPage">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border :header-cell-style="{'background-color':'#eee', 'color':'#666'}">
            <el-table-column prop="activityTitle" label="活动标题" align="center"/>
            <el-table-column prop="courseName" label="课程名称" align="center"/>
          
            <el-table-column label="课程类型" align="center" >
                <template slot-scope="scope">
                      <div v-if="scope.row.dicTypeName">{{scope.row.dicTypeName}}/{{scope.row.dicTypeName}}</div>
                </template>
               
            </el-table-column>
            <el-table-column prop="baseinfoName" label="活动基地" align="center"/>
            <el-table-column prop="projectName" label="服务标题" align="center"/>
            <el-table-column prop="className" label="班级" align="center"/>
            <el-table-column prop="comeTime" label="上课时间" align="center"/>
            <el-table-column prop="stuNum" label="参与人数" align="center" width="100"/>
            <el-table-column label="操作" align="center" >
                  <template slot-scope="scope">
                   <list-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        detail: { query: { id: 'courseId'} },
                       
                    }" />
                </template>
               
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination :param="pages" :total="totalNum" @change="getDatas" ></pagination>

      
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { distributionClass } from '@/api/resetApi'

import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'

export default {
    mixins: [permission, user],
    data() {
        return {
            listData: [
               
            ],
            form:{
                createType:'',
                activityTitle:'',
                courseName:''
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
         
          
           
        }
    },
    computed: {
       
    },
    created() {
      
        this.getDatas()
    },
    watch: {
      
    },
    methods: {
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
             this.getDatas()
        },
       

        
        // 获取列表数据
        async getDatas() {
            this.isLoading = true
             const formList = Object.assign({}, this.form);
            const res = await distributionClass(formList, this.pages)

            const { entity: datas = {} } = res.data

            try {
                this.listData = datas.resultData || []
                this.totalNum = datas.totalNum || 0
            } catch (error) {
               this.listData =  []
                this.totalNum =  0
            } finally {
                this.isLoading = false
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
