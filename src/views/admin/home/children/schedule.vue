<template>
    <div class="schedule">
        <div class="g-search--wrap clearfix" :style="{'marginTop':'18px'}">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>日程详情</el-breadcrumb-item>
            </el-breadcrumb>
            <div :style="{'margin':'20px 0'}">
                <span :style="{'fontSize':'14px'}">2019年2月份实践活动日程安排</span>
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
                <!-- <el-table-column type="selection" width="45" align="center"/> -->
                <el-table-column prop="account" label="来访时间" align="center" />
                <el-table-column prop="theme" label="来访学校" align="center" />
                <el-table-column prop="type" label="活动项目" align="center" />
                <el-table-column prop="time" label="代课教师" align="center" />
                <el-table-column prop="time" label="联系方式" align="center" />
                <el-table-column prop="state" label="来访班级" align="center" />
                <el-table-column prop="state" label="参与学生" align="center" />
            </el-table>
            <div :style="{'width':'100%','textAlign':'center','marginTop':'40px'}">
                <el-button @click="goback()">点击返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'schedule',
    data() {
        return {
            listData: [
                {
                    name: '李老师',
                    phone: '15245222002',
                    time: '2019-6-28 12:00',
                    theme: '小草药大用途',
                    type: '科技教育>科普教育',
                    account: '56d4122ds',
                    state: '已分配'
                },
                {
                    name: '昝老师',
                    phone: '15245222002',
                    time: '2019-6-28 12:00',
                    theme: '小草药大用途',
                    type: '科技教育>科普教育',
                    account: '56d4s5ds',
                    state: '未分配'
                },
                {
                    name: '王老师',
                    phone: '15245222002',
                    time: '2019-6-20 12:00',
                    theme: '小草药大用途',
                    type: '科技教育>科普教育',
                    account: '77d4s5ds',
                    state: '已终止'
                }
            ]
        }
    },
    methods: {
        goback() {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
