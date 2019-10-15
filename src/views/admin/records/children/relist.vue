<template>
    <div class="relist">
        <div class="g-search--wrap clearfix">
            <h3>审核记录</h3>

            <el-table
                ref="table"
                :data="listData"
                stripe
                align="center"
                v-loading="isLoading"
                border
                :header-cell-style="{'background-color':'#eee', 'color':'#666'}"
                class="mgtop"
            >
                <!-- <el-table-column type="selection" width="45" align="center"/> -->
                <el-table-column prop="date" label="提交时间" align="center" />
                <el-table-column prop="name" label="提交人" align="center" />
                <el-table-column prop="time" label="审核时间" align="center" />
                <el-table-column prop="sname" label="审核人" align="center" />
                <el-table-column prop="over" label="审核结果" align="center" />
                <el-table-column prop="soce" label="审核意见" align="center" />
            </el-table>
            <div class="contest">
                <span>发起机构</span>
                <p>教育局名称、、、</p>
            </div>
            <div class="contest">
                <span>联系人</span>
                <p>联系人</p>
            </div>
            <div class="contest">
                <span>联系方式</span>
                <p>11111111111</p>
            </div>
            <div class="contest">
                <span>实践主题</span>
                <p>实践主题名称</p>
            </div>
            <div class="contest">
                <span>实践时间</span>
                <p :style="{'width':'45%','float':'left'}">2019年6月1日</p>
                <p
                    :style="{'width':'45%','float':'right','paddingLeft':'20px','marginLeft':'50px'}"
                >2019年7月1日</p>
            </div>

            <div class="contest contest_f" :style="{'width':'100%','boxSizing':'border-box'}">
                <span>实践基地</span>
                <p class="contest_p" :style="{'paddingLeft':'60px','width':'90%'}">
                    <el-select v-model="value" placeholder="请选择" class="clelt" height="27">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </p>
            </div>

            <div class="contest">
                <span>基地地址</span>
                <p class="contest_p">广东省广州市天河区………………………</p>
            </div>
            <div class="contest">
                <span>开馆时间</span>
                <p class="contest_p">每周一至周五 上午 8：00至12：00 下午 14：00至18：00</p>
            </div>
            <div class="minmax">
                <p>
                    该基地每日最多可举办活动次数
                    <span class="spnshow">10</span>
                    次
                </p>
            </div>
            <el-table
                ref="table"
                :data="resData"
                stripe
                align="center"
                v-loading="isLoading"
                border
                :header-cell-style="{'background-color':'#eee', 'color':'#666'}"
                class="mgtop"
            >
                <!-- <el-table-column type="selection" width="45" align="center"/> -->
                <el-table-column prop="date" label="活动标题" align="center" />
                <el-table-column prop="name" label="活动类型" align="center" />
                <el-table-column prop="time" label="活动描述" align="center" />
                <el-table-column prop="sname" label="单日最多" align="center" />
                <el-table-column prop="over" label="活动附件" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">点击下载</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="imgmax">
                <div class="imgmax_l">
                    <span>详情海报</span>
                    <div class="imgmax_min">
                        <img src alt />
                    </div>
                </div>
                <div class="imgmax_r">
                    <span>封面图片</span>
                    <div class="imgmax_min">
                        <img src alt />
                    </div>
                </div>
            </div>
            <div class="description">详细说明</div>
            <textarea placeholder="本次活动的详细说明............" class="ctext"></textarea>
            <div class="examine">
                <div class="weitest">审核</div>
                <textarea placeholder="请填写本次审核意见" class="ctext"></textarea>
            </div>
            <div :style="{'marginTop':'20px'}">
                <el-row :style="{'textAlign':'right'}">
                    <el-button type="primary">取消</el-button>
                    <el-button type="primary" :style="{'marginLeft':'60px'}">通过</el-button>
                    <el-button type="primary">驳回</el-button>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'relist',
    data() {
        return {
            listData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    time: '2016-05-02',
                    sname: '王小虎',
                    over: '驳回',
                    soce: '未填写'
                },
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    time: '2016-05-02',
                    sname: '王小虎',
                    over: '驳回',
                    soce: '未填写'
                }
            ],
            resData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    time: '2016-05-02',
                    sname: '王小虎',
                    over: '驳回',
                    soce: '未填写'
                }
            ],
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            value: '',
            input: '',
            textarea: ''
        }
    }
}
</script>
<style lang="scss" scoped>
h3 {
    margin-top: 20px;
    font-size: 22px;
}
.contest {
    width: 100%;
    height: 30px;
    margin-top: 20px;
    position: relative;
    overflow: hidden;
    span {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        height: 30px;
        line-height: 30px;
        width: 60px;
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
        color: #324157;
        background: #fff;
    }
    p {
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: #ccc;
        padding-left: 80px;
        font-weight: 400;
        font-size: 13px;
    }
    .contest_p {
        background: #fff;
    }
    .contest_e_l {
        width: 680px;
        float: left;
    }
    .contest_e_r {
        width: 680px;
        float: right;
        padding-left: 20px;
    }
}
.contest_f {
    height: 40px;
    width: 1100px;
    overflow: unset;
}
.searchbtn {
    width: 100%;
    height: 30px;
    span {
        display: inline-block;
    }
    .clelt {
        display: inline-block;
    }
}
.minmax {
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    span {
        display: inline-block;
        width: 30px;
        height: 40px;
        line-height: 40px;
        background: #ccc;
        text-align: center;
    }
}
.imgmax {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 100px;
    line-height: 100px;
    .imgmax_l {
        height: 100px;
        width: 400px;
        float: left;
        margin-right: 50px;
    }
    .imgmax_r {
        width: 400px;
        height: 100px;
        float: left;
    }
    .imgmax_min {
        width: 224px;
        height: 98px;
        border: 1px solid #000;
        float: left;
    }
    span {
        display: block;
        height: 100px;
        float: left;
        font-size: 16px;
        margin-right: 15px;
    }
    img {
        width: 226px;
        height: 90px;
    }
}
.description {
    font-size: 16px;
    height: 30px;
    line-height: 30px;
}
.ctext {
    width: 100%;
    height: 200px;
    
}
.examine {
    width: 100%;
    margin-top: 20px;
}
.weitest {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    background: #008aff;
}
</style>
