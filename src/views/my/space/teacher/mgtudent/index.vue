<template>
    <div class="mgtudent">
        <div class="classroom_h">
            <ul>
                <li>
                    <span>班级</span>
                </li>
                <li>
                    <el-select v-model="value" placeholder="请选择班级" @change="changedatas(value)">
                        <el-option
                            v-for="item in datas"
                            :key="item.value"
                            :label="item.className"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </li>
                <div
                    class="search-wrap fl tab-search"
                    :style="{'marginTop':'10px','marginRight':'14px'}"
                >
                    <section data-v-89dd130e class="search clearfix">
                        <input
                            data-v-89dd130e
                            type="text"
                            v-model="input"
                            @change="inputchange()"
                            placeholder="请输入学生姓名搜索"
                            class="search-text"
                        />
                        <div data-v-89dd130e class="el-icon-search icon-search"></div>
                    </section>
                </div>
            </ul>
        </div>

        <div class="origs">
            <ul>
                <li v-for="(item,index) in lists" :key="index">
                    <div class="bigimg">
                        <el-avatar
                            :size="100"
                            style="margin:20px 40px"
                            :src="item.face"
                            @error="errorHandler"
                        >
                            <img
                                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                            />
                        </el-avatar>
                    </div>
                    <div class="bigclass">
                        <span>{{item.name}}</span>
                        <span>{{item.gradeName}}</span>
                    </div>
                    <div class="bigchange">
                        <span
                            @click="changes(item.id)"
                            class="spn2"
                            :style="{'marginRight':'12px'}"
                        >查看档案</span>
                        <span @click="change(item.id,item.name)" class="spn3">查看作品</span>
                    </div>
                </li>
            </ul>

            <no-data v-if="nomore"></no-data>
            <div v-if="!nomore" class="block" :style="{'float':'right'}">
                <pagination
                    :param="pages"
                    :page-sizes="[10, 15, 20]"
                    :total="totalNum"
                    @change="getlist"
                ></pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { teacherscheckclasslist, classviewstudentlist } from '@/api/frontstage'
export default {
    name: 'mgtudent',
    data() {
        return {
            nomore: false,
            datas: [],
            value: '',
            label: '',
            lists: [],
            input: '',
            classId: '',
            pages: {
                pageNum: 1,
                pageSize: 10
            },
            totalNum: 0
        }
    },
    watch: {
        'lists.length': {
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
        errorHandler() {
            return true
        },
        inputchange() {
            this.getinputchange()
        },
        async getinputchange() {
            let res = await classviewstudentlist(
                { name: this.input, classId: this.classId },
                this.pages
            )
            this.lists = res.data.entity.resultData
            this.totalNum = res.data.entity.totalNum
        },
        changes(studentId) {
            this.$router.push({
                path: '/space/archives',
                query: { studentId: studentId }
            })
        },
        change(id, name) {
            localStorage.setItem('xkcreateId', id)
            this.$router.push({
                path: '/space/mgtudent/viewworks',
                query: { id: id, name: name }
            })
        },
        async getlist(teacherId) {
            let res = await teacherscheckclasslist(
                { teacherId: teacherId },
                this.pages
            )
            this.datas = res.data.appendInfo.classList
            this.classId = this.datas.slice(0, 1)[0].id
            this.moren(this.classId)
        },
        async moren(classId) {
            let lists = await classviewstudentlist(
                {
                    classId: classId
                },
                this.pages
            )
            this.lists = lists.data.entity.resultData
            console.log(this.lists)
            this.totalNum = lists.data.entity.totalNum
        },
        async changedatas(classId) {
            this.classId = classId
            let lists = await classviewstudentlist(
                {
                    classId: classId
                },
                this.pages
            )
            this.lists = lists.data.entity.resultData
            this.totalNum = lists.data.entity.totalNum
        }
    },
    created() {
        this.$store.commit('changetitle', '学生管理')
        this.getlist(this.teacherId)
    },
    computed: {
        teacherId() {
            return this.$store.state.login.userInfo.baseId
        }
    }
}
</script>
<style lang="scss" scoped>
.mgtudent {
    border-bottom: 2px solid #eaeaea;
    .classroom_h {
        ul {
            height: 60px;
            border-bottom: 1px solid #ccc;
            li {
                float: left;
                width: 70px;
                height: 100%;
                font-size: 18px;
                color: #666;
                margin-left: 38px;
                line-height: 60px;
                text-align: center;
                cursor: pointer;
                &:nth-child(2) {
                    margin-left: 20px;
                    width: 168px;
                }
            }
        }
    }
}
.fl {
    float: right;
}
.search {
    position: relative;
    display: inline-block;
    width: 226px;
    height: 40px;
    box-sizing: border-box;
    font-size: 14px;
}
.search .search-text[data-v-89dd130e] {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 40px;
    text-indent: 20px;
    box-sizing: border-box;
    vertical-align: top;
}
.search .el-icon-search[data-v-89dd130e] {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    font-size: 20px;
    text-align: center;
    color: #ccc;
    cursor: pointer;
}
input::placeholder {
    font-size: 14px;
    color: #cccccc;
}
.active {
    border-bottom: 2px solid #008aff;
    color: #008aff;
}

.origs {
    width: 100%;
    overflow: hidden;
    padding-bottom: 80px;
    background: #fafafa;
    ul {
        width: 100%;
        height: 100%;
        font-size: 0px;
        padding: 0px 10px 0 10px;
        box-sizing: border-box;
        font-size: 0px;
        background: #fafafa;
        overflow: hidden;
        li {
            display: block;
            width: 180px;
            height: 240px;
            margin-right: 13px;
            margin-bottom: 40px;
            background: #ffffff;
            box-sizing: border-box;
            padding: 0 5px;
            float: left;
            cursor: pointer;
            .bigimg {
                width: 100%;
                height: 155px;
                img {
                    margin: 0 auto;
                    height: 100%;
                    display: block;
                }
            }
            .bigclass {
                margin-top: 10px;
                font-size: 16px;
                color: #333;
                text-indent: 6px;
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                span {
                    display: inline-block;
                    height: 30px;
                    line-height: 30px;
                    width: 60px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    &:nth-child(1) {
                        font-size: 18px;
                        color: #333;
                    }
                    &:nth-child(2) {
                        font-size: 14px;
                        color: #666;
                    }
                }
            }
            .bigchange {
                margin-top: 10px;
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                span {
                    width: 40%;
                    height: 20px;
                    box-sizing: border-box;
                    display: inline-block;
                    line-height: 20px;
                    text-align: center;
                    &:nth-child(1) {
                        border-radius: 2px;
                        border: solid 1px #008aff;
                        color: #008aff;
                        font-size: 14px;
                    }
                    &:nth-child(2) {
                        color: #ffffff;
                        font-size: 14px;
                        background-color: #008aff;
                        border-radius: 2px;
                    }
                }
            }
        }
    }
}
</style>
