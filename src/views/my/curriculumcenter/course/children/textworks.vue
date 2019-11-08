<template>
    <div class="textworks">
        <div class="nimi">
            <el-input
                placeholder="请输入活动主题"
                @keyup.native.enter="resetPage"
                v-model="input5"
                class="input-with-select"
            >
                <el-button slot="append" @click="resetPage" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <div class="textworksconent">
            <ul>
                <li @click="gotolist(item.id)" v-for="(item,index) in list" :key="index">
                    <div>
                        <ov-image :src-data="getFileUrl(item.cover)"></ov-image>
                    </div>
                    <div>
                        <h4>{{item.workName}}</h4>
                    </div>
                    <div>
                        <div class="minh">
                            <i :style="{'backgroundImage':'url('+yanjing+')'}"></i>
                            <span>{{item.browseNum}}</span>
                        </div>
                        <div class="minh">
                            <i :style="{'backgroundImage':'url('+fenxiang+')'}"></i>
                            <span>{{item.shareNum}}</span>
                        </div>
                        <div class="minh">
                            <i :style="{'backgroundImage':'url('+dianzan+')'}"></i>
                            <span>{{item.praiseNum}}</span>
                        </div>
                    </div>
                    <div>
                        <span>{{item.createName}}</span>
                        <span>{{item.className}}</span>
                    </div>
                </li>
            </ul>
            <div
                v-if="nomore"
                :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
            >
                <img src="~@assets/image/nothingData.svg" alt />
                <div :style="{'lineHeight':'0'}">
                    <i :style="{'fontSize':'18px'}">暂无数据...</i>
                </div>
            </div>
            <div class="block" :style="{'float':'right','marginTop':'30px'}" v-if="!nomore">
                <pagination
                    :style="{'textAlign':'right'}"
                    :param="pages"
                    :page-sizes="[10, 15, 20]"
                    :total="totalNum"
                    @change="getlists"
                ></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getdetailsofworks } from '@/api/frontstage'
export default {
    name: 'textworks',
    data() {
        return {
            value: '',
            input5: '',
            list: '',
            nomore: false,
            dianzan: require('../../../../../../static/img/dianzan02.png'),
            fenxiang: require('../../../../../../static/img/fenxiong.png'),
            yanjing: require('../../../../../../static/img/liulanhui.png'),
            options: [
                {
                    value: '选项1',
                    label: '进行中'
                },
                {
                    value: '选项2',
                    label: '已结束'
                }
            ]
        }
    },
    created() {
        this.getlists(this.courseId)
    },
    watch: {
        'list.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomore = true
                } else {
                    this.nomore = false
                }
            },
            deep: true
        }
    },
    methods: {
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.getlists()
        },
        gotolist(id) {
            localStorage.setItem('did', id)
            this.$router.push({
                path: '/community/course/textworks/workdetail',
                query: { id: id }
            })
        },
        async getlists() {
            let id = localStorage.getItem('mid')
            let datas = await getdetailsofworks(
                {
                    courseId: id,
                    workName: this.input5
                },
                this.pages
            )
            // console.log(datas);
            this.list = datas.data.entity.resultData
            this.totalNum = datas.data.entity.totalNum
            let listmore = this.list.slice(0, 3)
            console.log(this.list)
            console.log(this.listmore)
            sessionStorage.setItem('listmore', JSON.stringify(listmore))
        }
    }
}
</script>
<style lang="scss" scoped>
.nimi {
    background: #fff;
    height: 60px;
    line-height: 60px;
    padding-left: 22px;
    padding-right: 22px;
    margin-bottom: 18px;
    label {
        font-size: 16px;
        color: #333;
        margin-right: 12px;
    }
    .el-select {
        width: 200px;
        height: 32px;
    }
    .el-select .el-input {
        width: 130px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .el-input {
        margin-top: 12px;
        float: right;
        width: 226px;
        height: 40px;
    }
    .el-button {
        border-radius: none;
    }
}
.textworksconent {
    width: 100%;
    margin-bottom: 200px;
    min-height: 500px;
    ul {
        width: 100%;
        li {
            width: 270px;
            height: 260px;
            display: inline-block;
            margin-right: 36px;
            background: #fff;
            margin-bottom: 22px;
            &:nth-child(4n) {
                margin-right: 0px;
            }
            div {
                &:nth-child(1) {
                    height: 180px;
                    width: 100%;
                    img {
                        height: 180px;
                    }
                }
                &:nth-child(2) {
                    margin-top: 6px;
                    padding-left: 10px;
                    h4 {
                        font-size: 16px;
                        color: #333333;
                    }
                }
                &:nth-child(3) {
                    height: 20px;
                    margin-top: 9px;
                    padding-left: 10px;
                    height: 20px;
                    .minh {
                        height: 20px;
                        width: 50px;
                        float: left;
                        margin: 0;
                        i {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            background-repeat: no-repeat;
                            background-position: center;
                            background-size: 16px;
                            vertical-align: middle;
                        }
                        span {
                            font-size: 14px;
                            color: #cccccc;
                            margin-left: 5px;
                        }
                    }
                }
                &:nth-child(4) {
                    height: 20px;
                    padding-left: 10px;
                    margin-top: 5px;
                    span {
                        font-size: 14px;
                        color: #666666;
                        &:nth-child(1) {
                            margin-right: 12px;
                        }
                    }
                }
            }
        }
    }
}
</style>
