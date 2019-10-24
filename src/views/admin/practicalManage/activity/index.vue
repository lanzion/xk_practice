<template>
    <div class="school-list-wrap">
        <!-- 搜索表单 -->
        <div class="g-search--wrap clearfix">
            <el-form :inline="true"  class="fl" @submit.native.prevent>
                <el-form-item label="发布时间">
                   
                        <el-date-picker
                            value-format="yyyy-MM-dd"
                            v-model="activityTime"
                            :editable="false"
                            clearable
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间" style="width:300px;" @change="resetPage">
                        </el-date-picker >
                   
                </el-form-item>
                <el-form-item label="状态" v-if="userInfo.identity!=9">
                    <el-select v-model="form.status" placeholder="请选择状态" @change="resetPage" clearable>
                        <el-option
                        v-for="item in fpStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                  <el-form-item label="查看状态" v-if="userInfo.identity==9">
                    <el-select v-model="form.checkStatus" placeholder="请选择状态" @change="resetPage" clearable>
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动标题">
                    <el-input v-model="form.title" placeholder="请输入活动标题" @keyup.native.enter="resetPage"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
             <!-- 表头权限及统计 -->
            <section class="g-table--head clearfix fr">
                <head-operate class="fr" :items="headBtnGroup" v-bind="{
                    add: {},
                }" />
            </section>
        </div>
        <!-- 表格数据列表 -->
        <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border :header-cell-style="{'background-color':'#eee', 'color':'#666'}">
            <el-table-column prop="title" label="活动标题" width="500"/>
            <el-table-column prop="createDate" label="发布时间" align="center" />
             <el-table-column prop="orgName" label="发布教育局" align="center" />
            <el-table-column label="状态" align="center" v-if="userInfo.identity!=9">
                <template slot-scope="scope">
                  <span v-if="scope.row.status==1">开启</span>
                   <span v-else>关闭</span>
                </template>
            </el-table-column>
              <el-table-column label="查看状态" align="center" v-if="userInfo.identity==9">
                <template slot-scope="scope">
                  <span v-if="scope.row.checkStatus=='A'">已查看</span>
                   <span v-else>未查看</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" :width="operateWidth">
                <template slot-scope="scope">
                    <list-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        detail: { query: { id: 'id'} },
                         del: { callback: doDel },
                         edit: { query: { id: 'id'} },
                    }" v-if="userInfo.identity!=9" />
                    <list-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                        detail: { query: { id: 'id',detailId:'detailId'} }
                    }"  v-if="userInfo.identity==9"/>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <pagination :param="pages"  :total="totalNum" @change="getDatas"></pagination>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { activityList } from '@/api/newApi'

import { activityDel } from '@/api/resetApi'
import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'

export default {
    mixins: [permission, user],
    data() {
        return {
            activityTime: '', // 时间
            form: {
                title: null,
              
                startDateStr: null,
                endDateStr: null
                
            },
            listData: [
                
            ],
            options: [
                {
                    value: 'A',
                    label: '已查看'
                },
                {
                    value: 'B',
                    label: '未查看'
                }
            ],
            fpStates: [
                {
                    value: '1',
                    label: '开启'
                },
                {
                    value: '0',
                    label: '关闭'
                }
            ],
           
        }
    },
    computed: {
        ...mapState({
            // 用户信息
            userInfo: state => state.login.userInfo || {},
        }),
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
            if (!this.activityTime) {
                  
            } else {
                formList.startDateStr = this.activityTime[0] || ''
                formList.endDateStr = this.activityTime[1] || ''
            }
          
            const res = await activityList(formList, this.pages)

            const { entity: datas = {} } = res.data

            try {
                this.listData = datas.resultData || []
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.listData = []
                this.totalNum = 0
            } finally {
                this.isLoading = false
            }
        },
       
        // 删除操作
        doDel({ data }) {
            const items = data
            if (items) {
                const params = {id: items.id}
                this.$confirm(`确认删除该数据吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    activityDel(params).then(res => {
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
