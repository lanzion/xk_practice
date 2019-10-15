<template>
   <div class="school-list-wrap">
        <!-- 搜索表单 -->
        <div class="g-search--wrap clearfix">
            <el-form :inline="true"  class="fl elFrom" @submit.native.prevent>
                 <el-form-item label="适用学段">
                    <el-select v-model="form.templateSection" placeholder="全部">
                        <el-option
                        v-for="item in fpStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
               
                <el-form-item>
                    <el-input v-model="form.templateName" placeholder="请输入模板名称" @keyup.native.enter="resetPage"></el-input>
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
        <el-table   ref="table" :data="listData" stripe align="center" v-loading="isLoading" border :header-cell-style="{'background-color':'#eee', 'color':'#666'}">
            <el-table-column prop="templateName" label="模板名称" align="center"/>
             <el-table-column label="适用学段" align="center" >
                  <template slot-scope="scope">
                        <span v-if="scope.row.templateSection=='primarySchool'">小学</span>
                        <span v-else-if="scope.row.templateSection=='middleSchool'">初中</span>
                        <span v-else-if="scope.row.templateSection=='highSchool'">高中</span>
                </template>
               
            </el-table-column>
    
             <el-table-column label="应用对象" align="center" >
                  <template slot-scope="scope">
                     <span v-if="scope.row.templateType=='ALL'">全部</span>
                     <span v-if="scope.row.templateType=='EVAL_TEMPLATE_TYPE_TEACHER'">教师</span>
                     <span v-if="scope.row.templateType=='EVAL_TEMPLATE_TYPE_STUDENT'">学生</span>
                </template>
               
            </el-table-column>
            <el-table-column prop="remark" label="备注" align="center" width="400"/>
            <el-table-column prop="createName" label="添加人" align="center"/>
            <el-table-column label="操作" align="center" >
                  <template slot-scope="scope">
                      <list-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        detail: { query: { id: 'id'} },
                         del: { callback: doDel },
                         edit: { query: { id: 'id'} },
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
import { templateList,templateDel} from '@/api/resetApi'

import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'

export default {
    mixins: [permission, user],
    data() {
        return {
            listData: [
               
            ],
            form:{
                   
                    templateSection:null,
                    templateName:null
                },
              fpStates: [
                {
                    value: null,
                    label: '全部'
                },
                {
                    value: 'primarySchool',
                    label: '小学'
                },
                {
                    value: 'middleSchool',
                    label: '初中'
                },
                {
                    value: 'highSchool',
                    label: '高中'
                }
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
       
      

        // 重置分页
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.getDatas()
        },
        // 获取列表数据
        async getDatas() {
            this.isLoading = true
             const formList = Object.assign({}, this.form)
            const res = await templateList(formList, this.pages)

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
                    templateDel(params).then(res => {
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
