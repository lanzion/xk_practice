<template>
    <div class="list">
        <div class="start-stups">
            <div class="start-title">活动进度:</div>
            <div class="start-stups-col">
                <span :class="active > 0 ? 'start-stups-num active':'start-stups-num' ">1</span>
                <span :class="active > 0 ? 'start-stups-rows active':'start-stups-rows' ">学校发起活动</span>
                <span :class="active > 0 ? 'start-stups-width active':'start-stups-width' "></span>
            </div>
            <div class="start-stups-col">
                <span :class="active > 1 ? 'start-stups-num active':'start-stups-num' ">2</span>
                <span :class="active > 1 ? 'start-stups-rows active':'start-stups-rows' ">基地/机构确认活动</span>
                <span :class="active > 1 ? 'start-stups-width active':'start-stups-width' "></span>
            </div>
            <div class="start-stups-col">
                <span :class="active > 2 ? 'start-stups-num active':'start-stups-num' ">3</span>
                <span :class="active > 2 ? 'start-stups-rows active':'start-stups-rows' ">教育局确认活动</span>
                <span :class="active > 2 ? 'start-stups-width active':'start-stups-width' "></span>
            </div>
            <div class="start-stups-col">
                <span :class="active > 3 ? 'start-stups-num active':'start-stups-num' ">4</span>
                <span :class="active > 3 ? 'start-stups-rows active':'start-stups-rows' ">开展实践活动</span>
                <span :class="active > 3 ? 'start-stups-width active':'start-stups-width' "></span>
            </div>
            <div class="start-stups-col">
                <span :class="active > 4 ? 'start-stups-num active':'start-stups-num' ">5</span>
                <span :class="active > 4 ? 'start-stups-rows active':'start-stups-rows' ">活动评价</span>
            </div>
        </div>

        <div class="g-search--wrap clearfix">
            <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
                <el-form-item label="活动状态">
                    <el-select v-model="form.commentStatus" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in activityState"
                            :key="item.code"
                            :label="item.name"
                            :value="item.code"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="基地/机构">
                    <el-select v-model="form.activityTitle" filterable placeholder="请输入关键词或直接选择">
                        <el-option
                            v-for="item in one"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="学校名称">
                    <el-select v-model="form.schoolName" filterable placeholder="请输入关键词或直接选择">
                        <el-option
                            v-for="item in two"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-button type="primary" plain>搜索</el-button>
            </el-form>
        </div>

        <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border>
            <el-table-column prop="name" label="课程名称" align="center" show-overflow-tooltip />
            <el-table-column label="课程分类" align="center" show-overflow-tooltip>
                <template
                    slot-scope="scope"
                >{{scope.row.courseTypeName+'>'+scope.row.courseTypeParentName}}</template>
            </el-table-column>
            <el-table-column prop="title" label="基地/机构" align="center" show-overflow-tooltip />
            <el-table-column prop="name" label="参与学校" align="center" show-overflow-tooltip />
            <el-table-column prop="createDate" label="活动开始时间" sortable align="center" width="140"></el-table-column>
            <el-table-column label="活动时长" sortable align="center" width="110">
                <template slot-scope="scope">
                    <span>半天</span>
                </template>
            </el-table-column>
            <el-table-column prop="createDate" label="发起活动时间" sortable align="center" width="140"></el-table-column>
            <el-table-column prop="fit" label="学生人数" sortable align="center"></el-table-column>
            <el-table-column prop="fit" label="基地确认状态" sortable align="center" width="140">
                <template slot-scope="scope">
                    <span v-if="scope.row.isCompulsory=='A'">未确认</span>
                    <span v-else-if="scope.row.isCompulsory=='B'">已确认</span>
                    <span v-else-if="scope.row.isCompulsory=='C'">已确认</span>
                </template>
            </el-table-column>
            <el-table-column prop="fit" label="教育局确认状态" sortable align="center" width="160">
                <template slot-scope="scope">
                    <span v-if="scope.row.isCompulsory=='A'">未确认</span>
                    <span v-else-if="scope.row.isCompulsory=='B'">已确认</span>
                    <span v-else-if="scope.row.isCompulsory=='C'">已确认</span>
                </template>
            </el-table-column>
            <el-table-column prop="fit" label="活动状态" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.isCompulsory=='A'">未开始</span>
                    <span v-else-if="scope.row.isCompulsory=='B'">进行中</span>
                    <span v-else-if="scope.row.isCompulsory=='C'">已结束</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" align="center" :width="operateWidth">
                <template slot-scope="scope">
                    <list-operate
                        :items="listBtnGroup"
                        :data="scope.row"
                        :index="scope.$index"
                        v-bind="{
                        min: {  callback: min },
                         max: { visible:scope.row.isCompulsory=='E', callback: max },
                         mid: { visible:scope.row.isCompulsory=='C',callback: mid },
                         hig: { visible:scope.row.isCompulsory=='B', callback: hig },
                    }"
                    />
                </template>
            </el-table-column>
        </el-table>

        <el-dialog id="printMe" title :visible.sync="centerDialogVisible" width="50%" center>
            <div class="box">
                <div class="pos">基地/机构未确认</div>
                <div class="title">《园中生智,研来如此》活动确认书</div>
                <div class="center">
                    <div class="name">学校信息</div>
                    <el-row>
                        <el-col>
                            <span>学校名称:</span>
                            <span>{{123456789}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <span>学校带队教师及电话:</span>
                            <span>{{123456789}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <span>参加学生人数:</span>
                            <span>{{123456789}}</span>
                        </el-col>
                    </el-row>

                    <div class="name">活动信息</div>
                    <el-row>
                        <el-col>
                            <span>课程名称:</span>
                            <span>{{123456789}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <span>活动时间:</span>
                            <span>{{123456789}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <span>活动时长:</span>
                            <span>{{123456789}}</span>
                        </el-col>
                    </el-row>

                    <div class="name">基地/机构信息</div>
                    <el-row>
                        <el-col>
                            <span>基地/机构:</span>
                            <span>{{123456789}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <span>联系人及电话:</span>
                            <span>{{123456789}}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <span>地址:</span>
                            <span>{{123456789}}</span>
                        </el-col>
                    </el-row>
                </div>
                <div class="foot">温馨提示：请学校和基地/机构遵照此确认书完成实践活动，如有疑问，请联系***教育局***，联系电话020-2521235</div>
            </div>
            <div class="show">
                <el-button type="primary"  v-print="'#printMe'">打印</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'
import { activityState } from '@/utils/utility/dict.js'
import { courseList } from '@/api/resetApi'
export default {
    name: 'list',
    mixins: [permission, user],

    data() {
        return {
            active: 1,
            activityState: activityState,
            listData: [],
            centerDialogVisible: false,
            form: {
                activityTitle: '',
                commentStatus: '',
                schoolName: ''
            },
            one: [
                {
                    label: 'A',
                    value: '01'
                },
                {
                    label: 'A',
                    value: '02'
                }
            ],
            two: [
                {
                    label: 'A',
                    value: '01'
                },
                {
                    lable: 'A',
                    value: '02'
                }
            ]
        }
    },
    created() {
        this.getDatas()
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
            const res = await courseList(formList, this.pages)

            const { entity: datas = {} } = res.data

            try {
                this.listData = datas.resultData || []
                console.log(this.listData)
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.listData = []
            } finally {
                this.isLoading = false
            }
        },
        min() {
            this.centerDialogVisible = true
        },
        mid() {
            console.log(2)
        },
        max() {
            console.log(3)
        },
        hig() {
            console.log(4)
        },
        daying() {
            // let subOutputRankPrint = document.getElementById("printBox");
            //        let newWindow = window.open('_blank');   //  打开新窗口
            //        let codestr = document.getElementById('print').innerHTML;   //  获取需要生成pdf页面的div代码
            //        console.log(codestr);
            //        newWindow.document.write(codestr);   //  向文档写入HTML表达式或者JavaScript代码
            //        newWindow.document.close();     //  关闭document的输出流, 显示选定的数据
            //        newWindow.print();   //  打印当前窗口
            //        return true;
            let subOutputRankPrint = document.getElementById('printBox')
            let newContent = subOutputRankPrint.innerHTML
            let oldContent = document.body.innerHTML
            document.body.innerHTML = newContent
            window.print()
            window.location.reload()
            document.body.innerHTML = oldContent
            return false
        }
    }
}
</script>
<style lang='scss' scoped>
.start-stups {
    background-color: rgba(242, 242, 242, 1);
    text-align: center;
    height: 50px;
    margin-top: 10px;
    padding: 0 10px;
    .start-title {
        float: left;
        height: 50px;
        line-height: 50px;
        color: #000;
        font-size: 18px;
        margin-right: 20px;
    }
    .start-stups-col {
        float: left;
        margin-right: 10px;
        // width: 200px;
        height: 50px;
        line-height: 50px;
        text-align: left;
        .start-stups-num {
            display: inline-block;
            text-align: center;
            margin-top: 10px;
            margin-right: 10px;
            width: 30px;
            height: 30px;
            line-height: 30px;
            color: #ccc;
            border: 2px solid #ccc;
            border-radius: 50%;
        }
        .start-stups-rows {
            display: inline-block;
            color: #ccc;
            margin-right: 10px;
            font-size: 14px;
        }
        .start-stups-width {
            display: inline-block;
            border: 1px solid #ccc;
            width: 90px;
            vertical-align: middle;
        }
        .active {
            border-color: #000;
            color: #000;
        }
    }
}
.box {
    width: 90%;
    border: 1px solid #ccc;
    padding: 15px 20px;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    .pos {
        font-size: 18px;
        color: #333;
        position: absolute;
        right: -30px;
        top: 24px;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
    }
    .title {
        text-align: center;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        font-weight: 800;
        color: #000;
    }
    .center {
        padding: 10px 80px;
        .name {
            font-size: 18px;
            font-weight: 700;
            color: #000;
            height: 40px;
            line-height: 40px;
            margin-bottom: 20px;
        }
        .el-row {
            margin-bottom: 20px;
        }
        span {
            font-size: 16px;
            color: #333;
        }
    }
    .foot {
        font-size: 14px;
        color: #333;
        margin-top: 20px;
    }
}
.show {
    text-align: center;
    height: 60px;
    line-height: 60px;
}
</style>
