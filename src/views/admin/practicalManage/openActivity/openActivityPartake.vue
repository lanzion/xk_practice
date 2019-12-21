<template>
    <div class="openactivitypartake">
        <div class="g-search--wrap clearfix">
            <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
                <el-form-item label="活动场次">
                    <el-select v-model="form.activity" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in activityList"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否已参加">
                    <el-select v-model="form.joinStatus" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in joinStatus"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label>
                    <el-input v-model="form.studentName" placeholder="请输入学生姓名关键字"></el-input>
                </el-form-item>

                <el-button type="primary" @click="getDatas" plain>搜索</el-button>
            </el-form>
        </div>

        <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border>
            <el-table-column label="学生头像" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <img :src="scope.row.face" :style="{'width':'30px'}" alt />
                </template>
            </el-table-column>
            <el-table-column prop="studentName" label="学生姓名" align="center" show-overflow-tooltip />
            <el-table-column prop="enrollDate" label="报名时间" align="center" show-overflow-tooltip />
            <el-table-column label="活动场次" align="center" sortable show-overflow-tooltip>
                <template
                    slot-scope="scope"
                >{{scope.row.activityStartDate}}至{{scope.row.activityEndDate}}</template>
            </el-table-column>
            <el-table-column label="是否已参加" align="center" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.joinStatus|filterJoinStatus}}</template>
            </el-table-column>
            <el-table-column prop="comment" label="学生评价内容" align="center" show-overflow-tooltip />
        </el-table>

        <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>
    </div>
</template>

<script>
import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'
import { openActivitySignupPager } from '@/api/newApi'
export default {
    mixins: [permission, user],
    data() {
        return {
            totalNum: 0,
            activityList: [],
            joinStatus: [
                { code: 1, name: '已参加' },
                { code: 0, name: '未参加' }
            ],
            form: {},
            listData: [],
            id: ''
        }
    },
    filters: {
        filterJoinStatus(val) {
            let txt = ''
            txt = val ? '已参加' : '未参加'
            return txt
        }
    },
    methods: {
        getDatas() {
            this.isLoading = true
            if (!this.form.activityId) {
                return
            }
            openActivitySignupPager(this.form, this.pages).then(res => {
                try {
                    let data = res.data
                    if (data.code === 200) {
                        this.listData = data.entity.resultData
                        this.totalNum = data.entity.totalNum
                    }
                } catch (err) {
                    console.log(err)
                } finally {
                    this.isLoading = false
                }
            })
        }
    },
    created() {
        const id = this.$route.query.id
        this.form.activityId = id
        this.getDatas()
    }
}
</script>

<style lang="scss" scoped>
</style>
