<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item label="时间筛选" prop="activityTime">
          <el-date-picker
            v-model="activityTime"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="resetPage"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetPage">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="myData">
      <div id="myChart" :style="{width: '100%', height: '615px'}"></div>
      <div class="curList-list">当前统计: {{datas.searchDate}}</div>
      <div class="curList-list">
        <span>总计</span>
        <span>
          实践课程:
          <em>{{datas.courseCount}}</em>
        </span>
        <span>
          参与学校:
          <em>{{datas.schoolCount}}</em>
        </span>
        <span>
          参与教师:
          <em>{{datas.teacherCount}}</em>
        </span>
        <span>
          参与学生:
          <em>{{datas.studentCount}}</em>
        </span>
      </div>
    </div>
    <div class="dtailedData">
      <div class="overHide">
        <p class="title fl">
          <i class="el-icon-s-data"></i>详细数据
        </p>
        <el-button class="fr" type="primary" @click="handleDownload">数据导出</el-button>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        align="center"
        id="rebateSetTable"
        border
        :header-cell-style="{'background-color':'#eee', 'color':'#666'}"
      >
        <el-table-column prop="courseName" label="活动标题" align="center"></el-table-column>
        <el-table-column prop="comeTime" label="上课时间" align="center"></el-table-column>
        <el-table-column prop="schoolName" label="学校" align="center"></el-table-column>
        <el-table-column prop="baseinfoName" label="活动基地" align="center"></el-table-column>
        <el-table-column prop="projectName" label="参与服务" align="center"></el-table-column>
        <el-table-column prop="className" label="参与班级" align="center"></el-table-column>
        <el-table-column prop="teacherName" label="教师名称" align="center"></el-table-column>
        <el-table-column prop="stuNum" label="参与学生" align="center"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>
    </div>
  </div>
</template>

<script>
// 引入基本模板
import { getActivityCount, selectExpert } from '@/api/resetApi'
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
    name: 'count', // 作品统计
    components: {
    // 'v-bar-tab-chart': barTabChart,
    // 'v-pie-d-chart': pieDoughnutChart,
    // 'v-tabs': tabs,
    // 'v-pagination': pagination
    },
    data() {
        return {
            downloadLoading: false,
            autoWidth: true,
            bookType: 'xlsx',
            filename: '活动统计表',
            activityTime: '',
            tableData: [],
            actAllNum: [],
            form: {
                startTimetxt: '',
                endTimetxt: ''
            },

            datas: {
                courseCount: '',
                schoolCount: '',
                studentCount: '',
                teacherCount: '',
                searchDate: ''
            },
            distributeDatas: []
        }
    },

    computed: {},
    watch: {},
    mounted() {},
    created() {
        this.getDatas('all')
    },
    methods: {
        async handleDownload() {
            // 导出列表

            this.downloadLoading = true
            if (!this.activityTime) {
                this.form.startTimetxt = ''
                this.form.endTimetxt = ''
            } else {
                this.form.startTimetxt = this.activityTime[0] || ''
                this.form.endTimetxt = this.activityTime[1] || ''
            }
            const formList = Object.assign({}, this.form)
            const res = await selectExpert(formList)
            const { entity: datas = {} } = res.data
      import('@/vendor/Export2Excel').then(excel => {
          const tHeader = [
              '活动标题',
              '上课时间',
              '学校',
              '活动基地',
              '参与服务',
              '参与班级',
              '教师名称',
              '参与学生'
          ]
          const filterVal = [
              'courseName',
              'comeTime',
              'schoolName',
              'baseinfoName',
              'projectName',
              'className',
              'teacherName',
              'stuNum'
          ]
          const list = datas.resultData || []
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: this.filename,
              autoWidth: this.autoWidth,
              bookType: this.bookType
          })
          this.downloadLoading = false
      })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    return v[j]
                })
            )
        },
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.getDatas('all')
        },

        // 获取列表数据
        async getDatas(key) {
            this.isLoading = true
            if (!this.activityTime) {
                this.form.startTimetxt = ''
                this.form.endTimetxt = ''
            } else {
                this.form.startTimetxt = this.activityTime[0] || ''
                this.form.endTimetxt = this.activityTime[1] || ''
            }
            const formList = Object.assign({}, this.form)
            const res = await getActivityCount(formList, this.pages)
            // console.log(res.data)
            const datas = res.data

            try {
                if (key == 'all') {
                    this.datas.courseCount = datas.courseCount
                    this.datas.schoolCount = datas.schoolCount
                    this.datas.studentCount = datas.studentCount
                    this.datas.teacherCount = datas.teacherCount
                    if (!this.activityTime) {
                        this.datas.searchDate = `${datas.actAllNum[0].year}年${datas.actAllNum[0].month}月`
                    } else {
                        this.datas.searchDate = datas.searchDate
                    }
                    this.actAllNum = datas.actAllNum
                    this.drawLine()
                }

                this.tableData = datas.detailData.resultData || []
                this.totalNum = datas.detailData.totalNum || 0
            } catch (error) {
                this.tableData = []
            } finally {
                this.isLoading = false
            }
        },

        // 报名开始/结束时间

        drawLine() {
            let that = this

            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myChart'))
            var posList = [
                'left',
                'right',
                'top',
                'bottom',
                'inside',
                'insideTop',
                'insideLeft',
                'insideRight',
                'insideBottom',
                'insideTopLeft',
                'insideTopRight',
                'insideBottomLeft',
                'insideBottomRight'
            ]
            myChart.configParameters = {
                rotate: {
                    min: -90,
                    max: 90
                },
                align: {
                    options: {
                        left: 'left',
                        center: 'center',
                        right: 'right'
                    }
                },
                verticalAlign: {
                    options: {
                        top: 'top',
                        middle: 'middle',
                        bottom: 'bottom'
                    }
                },
                position: {
                    options: echarts.util.reduce(
                        posList,
                        function (map, pos) {
                            map[pos] = pos
                            return map
                        },
                        {}
                    )
                },
                distance: {
                    min: 0,
                    max: 100
                }
            }

            var labelOption = {
                normal: {
                    show: false,
                    position: 'insideBottom',
                    distance: 15,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    formatter: '{c}  {name|{a}}',
                    fontSize: 16,
                    rich: {
                        name: {
                            textBorderColor: '#fff'
                        }
                    }
                }
            }
            myChart.setOption({
                // title: { text: 'ECharts 入门示例' },
                color: [
                    'rgb(0,51,102)',
                    'rgb(0,102,153)',
                    'rgb(76,171,206)',
                    'rgb(229,50,62)'
                ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '0%',
                    right: '0%',
                    bottom: '10%',
                    top: '10%',
                    containLabel: true
                },
                legend: {
                    textStyle: {
                        color: '#666',
                        fontSize: '16'
                    },
                    data: ['活动次数', '实践类型', '参与学校', '参与教师', '参与学生']
                },
                // 侧边图标栏
                toolbox: {
                    show: false,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            show: false,
                            length: 200
                        },
                        data:
              that.actAllNum.map(o => {
                  if (o.month) {
                      return `${o.year}年${o.month}月`
                  } else {
                      return `${o.year}年`
                  }
              }) || [],
                        axisLine: {
                            lineStyle: {
                                color: '#666'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#666',
                                width: 100
                            }
                        }
                        // nameTextStyle: {borderWidth: 100}
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#000'
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '活动次数',
                        type: 'bar',
                        // barGap: '-100%',
                        // stack: '数据',
                        label: labelOption,
                        data: that.actAllNum.map(o => o.actNum) || [],
                        barWidth: 20 // 柱图宽度
                    },
                    {
                        name: '参与学校',
                        type: 'bar',
                        // stack: '数据',
                        label: labelOption,
                        data: that.actAllNum.map(o => o.schNum) || [],
                        barWidth: 20 // 柱图宽度
                    },
                    {
                        name: '参与教师',
                        type: 'bar',
                        // stack: '数据',
                        label: labelOption,
                        data: that.actAllNum.map(o => o.teachNum) || [],
                        barWidth: 20 // 柱图宽度
                    },
                    {
                        name: '参与学生',
                        type: 'bar',
                        // stack: '数据',
                        label: labelOption,
                        data: that.actAllNum.map(o => o.stuNum) || [],
                        barWidth: 20 // 柱图宽度
                    }
                ]
            })
        }
    }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/css/mixin/core.scss";
#myData {
  width: 1200px;
  background-color: #fff;
  padding-top: 20px;
  overflow: hidden;
  .curList-list {
    font-size: 15px;
    color: #333;
    padding-bottom: 20px;
    line-height: 20px;
    span {
      margin-right: 40px;
      em {
        color: #f00;
        margin-left: 7px;
      }
    }
  }
}
.dtailedData {
  .overHide {
    overflow: hidden;
    padding: 0 0 20px 0;
    line-height: 32px;
    .title {
      color: #666;
      font-size: 14px;
    }
  }
}
</style>
