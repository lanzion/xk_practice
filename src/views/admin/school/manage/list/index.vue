<template>
   <div class="school-list-wrap">
        <!-- 搜索表单 -->
        <div class="g-search--wrap clearfix">
            <el-form :inline="true"  class="fl elFrom" @submit.native.prevent :mode="form">
                 <el-form-item label="所在地区" v-if="identiy==5">
                    <region  type="object" @change="changeRegion"  class="regions"></region>
                </el-form-item>
                 <el-form-item label="所属学段">
                    <el-select v-model="form.schoolType" placeholder="全部学段" @change="resetPage" clearable>
                        <el-option
                        v-for="item in fpStates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item>
                    <el-input v-model="form.schoolName" placeholder="请输入学校名称" @keyup.native.enter="resetPage"></el-input>
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
            <el-table-column prop="identityCode" label="编码" align="center"/>
            <el-table-column prop="schoolName" label="学校名称" align="center"/>
            <el-table-column prop="schoolTypeList" label="学段" align="center"/>
            <el-table-column prop="location" label="所在地区" align="center"/>
            <el-table-column prop="linkName" label="负责人" align="center"/>
             <el-table-column prop="phone" label="联系方式" align="center"/>
            <el-table-column label="状态" align="center" >
                        <template slot-scope="scope">
                            <span v-if="scope.row.status=='1'">开启</span>
                            <span v-else>关闭</span>
                        </template>
            </el-table-column>
            <el-table-column label="操作" align="center" >
                      <template slot-scope="scope">
                        <list-operate :items="listBtnGroup" :data="scope.row" :index="scope.$index" v-bind="{
                                detail: { query: { id: 'id'} },
                                 edit: { query: { id: 'id'} },
                                del: { callback: doDel },
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

import { schoolList,schoolDel} from '@/api/resetApi'
import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'
const identiy = localStorage.getItem('xk_practice_identity');
export default {
    mixins: [permission, user],
    data() {
        return {
            identiy:identiy,
            form:{
                provinceId:'',
                cityId:'',
                areaId:'',
                schoolType:'',
                schoolName:'',
            },
           fpStates: [
              
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
           
            listData: [
               
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
         changeRegion(region) {
             this.form.provinceId =region[0].code||'';
             this.form.cityId =region[1].code||'';
             this.form.areaId =region[2].code||'';
             this.resetPage()
        },
        // 重置分页
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.getDatas()
        },
      

        // 获取列表数据
        async getDatas() {
            this.isLoading = true
            const formList = Object.assign({}, this.form)
            const res = await schoolList(formList, this.pages)
            
            const { entity: datas = {} } = res.data

            try {
                const list = datas.resultData||[];
                list.forEach(o=>{
                    let schoolTypeList =[];
                    if(o.schoolType.indexOf('primarySchool')!=-1){
                          schoolTypeList.push('小学')
                    }
                    if(o.schoolType.indexOf('middleSchool')!=-1){
                          schoolTypeList.push('初中')
                    }
                    if(o.schoolType.indexOf('highSchool')!=-1){
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
        // 删除操作
        doDel({data}) {
            const items = data;
            if (items) {
                const params = { id: items.id };
                this.$confirm(`确认删除该数据吗?`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    schoolDel(params).then(res => {
                    const { code, msg } = res.data;
                    if (code === 200) {
                        this.$message({
                        message: `删除成功`,
                        type: "success"
                        });

                        this.getDatas();
                    } else {
                        this.$message({
                        message: msg || "操作失败",
                        type: "error"
                        });
                    }
                    });
                })
                .catch(() => {});
            } else {
                this.$message({
                message: "请至少选择一条数据!",
                type: "warning"
                });
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
