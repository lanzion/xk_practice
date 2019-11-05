<template>
    <div class="school-list-wrap">
        <!-- 搜索表单 -->
        <div class="g-search--wrap clearfix">
            <el-form :inline="true" class="fl" @submit.native.prevent>
                <el-form-item label="状态">
                    <el-select v-model="form.arrangeStatus" placeholder="请选择状态" @change="resetPage" clearable>
                        <el-option
                        v-for="item in fpStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" >
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="是否必修">
                    <el-select v-model="form.isCompulsory" placeholder="请选择状态" @change="resetPage" clearable>
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value" >
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="活动/课程">
                    <el-input v-model="form.name" placeholder="所属活动或课程名称" @keyup.native.enter="resetPage"></el-input>
                </el-form-item>     
                <el-form-item>
                    <el-button type="primary" @click="resetPage">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        
        <!-- 表格数据列表 -->
        <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border :header-cell-style="{'background-color':'#eee', 'color':'#666'}">
            <el-table-column prop="title" label="所属活动" align="center" show-overflow-tooltip/>
            <el-table-column prop="name" label="课程名称" align="center" />
             <el-table-column label="课程类型" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                    {{scope.row.courseTypeName+'>'+scope.row.courseTypeParentName}}
                </template>
            </el-table-column>
            <el-table-column label="学段" align="center">
              <template slot-scope="scope">
                   <span v-if="scope.row.fit==1">小学</span>
                   <span v-else-if="scope.row.fit==2">初中</span>
                   <span v-else-if="scope.row.fit==3">高中</span>
               
                </template>
            </el-table-column>
            <el-table-column prop="createDate" align="center" label="创建时间" />
            <el-table-column prop="createName" align="center" label="创建人" />
            <el-table-column prop="statusNum" align="center" label="排课状态" />
             <el-table-column label="是否必修" align="center" width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.isCompulsory=='B'">否</span>
                   <span  v-else-if="scope.row.isCompulsory=='A'">是</span>
                </template>
            </el-table-column>
       
            <el-table-column label="操作" align="center" :width="operateWidth">
                <template slot-scope="scope">
                    <list-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        detail: { query: { id: 'id'} },
                         edit: { query: { id: 'id'} },
                         list: { query: { id: 'id'} },
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
import { courseList } from '@/api/resetApi'

import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'



export default {
    mixins: [permission, user],
    data() {
        return {
           form:{
                name:'',
                arrangeStatus:'',
                courseTypeParent:'',
                isCompulsory:'',
                courseType:'',
               
            },
           listData: [
               
            ],
             options: [
              
                {
                    value: 'A',
                    label: '必修'
                },
                {
                    value: 'B',
                    label: '选修'
                }
            ],
             fpStates: [
              
                {
                    value: 'A',
                    label: '已排课'
                },
                {
                    value: 'B',
                    label: '未排课'
                }
            ],
        }
    },
    computed: {
        ...mapState('dict', {
            sex: state => (state.sex || {}).dicList || [],
            auditStatus: state => (state.examineStatus || {}).dicList || [],
            lockStatus: state => (state.lockStatus || {}).dicList || []
        })
    },
    created() {
        this.getDatas()
    },
    watch: {
       
    },
   methods: {
        ...mapActions('dict', ['getDataDict']),
        // 重置分页
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
             this.getDatas()
        },
        // 获取列表数据
        async getDatas() {
            this.isLoading = true
            const formList = Object.assign({}, this.form)
            const res = await courseList(formList, this.pages)

            const { entity: datas = {} } = res.data

            try {
                this.listData = datas.resultData || []
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.listData = []
            } finally {
                this.isLoading = false
            }
        },

       
      
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
