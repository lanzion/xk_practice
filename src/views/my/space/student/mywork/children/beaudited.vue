<template>
  <div class="beaudited">
    <ul class="beaudited_ul">
      <li class="beaudited_li" v-for="(f,index) in datas" :key="index">
        <div class="beaudited_li_one">
          <!-- <el-image :src="f.cover" fit="cover" style="width: 277px;height:165px">
            <div
              slot="error"
              class="image-slot"
              style="font-size: 30px;line-height: 165px;text-align: center;"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image> -->
          <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
          <div class="beaudited_li_one_p">{{f.auditStatus}}</div>
        </div>
        <div class="beaudited_li_two">
          <div class="beaudited_li_two_one">
            <h3>{{f.workName}}</h3>
          </div>
          <div class="beaudited_li_two_two">
            <p>{{f.description}}</p>
          </div>
          <div class="beaudited_li_two_thr">
            <el-button
              @click="item.methods(f.id,f.courseId)"
              v-for="(item,index) in filerArr(f.auditStatus)"
              :key="index"
              :class="item.aideo == true ?'':'active'"
              :disabled="item.aideo"
            >{{item.name}}</el-button>
          </div>
          <el-dialog title="审核记录" :visible.sync="dialogTableVisible" align="center">
            <el-table :data="gridData">
              <el-table-column property="auditName" label="审核人" width="150" align="center"></el-table-column>
              <el-table-column property="name" label="审核状态" width="200" align="center"></el-table-column>
              <el-table-column property="auditComment" label="审核意见" align="center"></el-table-column>
            </el-table>
          </el-dialog>
          <div class="beaudited_li_two_for">
            <span>上传时间</span>
            <span>{{f.createDate}}</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- <div
      v-if="nomore"
      :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
    >
      <img src="~@assets/image/nothingData.svg" alt />
      <div :style="{'lineHeight':'0'}">
        <i :style="{'fontSize':'18px'}">暂无数据...</i>
      </div>
    </div> -->
     <no-data v-if="nomore"></no-data>
    <div class="block" v-if="!nomore" :style="{'float':'right','marginRight':'30px'}">
      <pagination :param="pages" :page-sizes="[9, 12, 15]" :total="totalNum" @change="getlists"></pagination>
    </div>
  </div>
</template>
<script>
import {
    listofcourseworkstobeaudited,
    studentsubmissionofmywork,
    studentsdeletemyworks,
    studentisauditrecordofmyworks
} from '@/api/frontstage'
export default {
    name: 'beaudited',
    data() {
        return {
            datas: [],
            code: '',
            nomore: false,
            pages: {
                pageNum: 1,
                pageSize: 9
            },

            gridData: [],
            dialogTableVisible: false,

            arr01: [
                // 审核未通过
                {
                    name: '修改',
                    aideo: false,
                    methods: (id, courseId) => {
                        this.$router.push({
                            path: '/revisionworks',
                            query: { id: id, courseId: courseId }
                        })
                    }
                },
                {
                    name: '删除',
                    aideo: false,
                    methods: id => {
                        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        })
                            .then(() => {
                                this.deleteover(id)
                                if (this.code == '200') {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    })
                                }
                            })
                            .catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消删除'
                                })
                            })
                    }
                },
                {
                    name: '审核记录',
                    aideo: false,
                    methods: id => {
                        this.dialogTableVisible = true
                        this.getshow(id)
                    }
                },
                {
                    name: '提交',
                    aideo: false,
                    methods: id => {
                        this.$confirm('是否确认提交改作品', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        })
                            .then(() => {
                                this.tijiao()
                                if (this.code == '200') {
                                    this.$message({
                                        type: 'success',
                                        message: '提交成功!'
                                    })
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: res.data.msg
                                    })
                                }
                            })
                            .catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消提交'
                                })
                            })
                    }
                },
                {
                    name: '作品详情',
                    aideo: true
                }
            ],
            arr02: [
                // 待提交
                {
                    name: '修改',
                    aideo: false,
                    methods: (id, courseId) => {
                        this.$router.push({
                            path: '/revisionworks',
                            query: { id: id, courseId: courseId }
                        })
                    }
                },
                {
                    name: '删除',
                    aideo: false,
                    methods: id => {
                        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        })
                            .then(() => {
                                this.deleteover(id)
                                if (this.code == '200') {
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    })
                                }
                            })
                            .catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消删除'
                                })
                            })
                    }
                },
                {
                    name: '审核记录',
                    aideo: true
                },
                {
                    name: '提交',
                    aideo: false,
                    methods: id => {
                        this.$confirm('是否确认提交改作品', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        })
                            .then(() => {
                                this.tijiao()
                                if (this.code == '200') {
                                    this.$message({
                                        type: 'success',
                                        message: '提交成功!'
                                    })
                                } else {
                                    this.$message({
                                        type: 'warning',
                                        message: '提交失败'
                                    })
                                }
                            })
                            .catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消提交'
                                })
                            })
                    }
                },
                {
                    name: '作品详情',
                    aideo: true
                }
            ],
            arr03: [
                // 待审核
                {
                    name: '作品详情',
                    aideo: false,
                    methods: id => {
                        this.$router.push({
                            path: '/detailsofstudentworks',
                            query: { id: id }
                        })
                    }
                },
                {
                    name: '修改',
                    aideo: true
                },
                {
                    name: '提交',
                    aideo: true
                },
                {
                    name: '删除',
                    aideo: true
                },
                {
                    name: '审核记录',
                    aideo: true
                }
            ]
        }
    },
    created() {
        this.getlists()
    },
    computed: {
        listname() {
            return this.$store.state.test.listname
        }
    },
    watch: {
        listname: {
            handler: function () {
                this.getlists()
            }
        },
        'datas.length': {
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
        filerArr(item) {
            if (item == '审核不通过') {
                return this.arr01
            } else if (item == '待提交') {
                return this.arr02
            } else {
                return this.arr03
            }
        },
        async getlists() {
            let res = await listofcourseworkstobeaudited(
                { workName: this.listname },
                this.pages
            )
            // console.log(res.data.entity.resultData);
            this.datas = res.data.entity.resultData
            this.totalNum = res.data.entity.totalNum
            this.datas.forEach(x => {
                if (x.auditStatus == 'WAIT_COMMIT') {
                    x.auditStatus = '待提交'
                } else if (x.auditStatus == 'WAIT_AUDIT') {
                    x.auditStatus = '待审核'
                } else if (x.auditStatus == 'AUDIT_PASS') {
                    x.auditStatus = '审核通过'
                } else if (x.auditStatus == 'AUDIT_RETURN') {
                    x.auditStatus = '审核不通过'
                }
            })
        },
        goone(id) {
            this.$router.push({ path: '/revisionworks', query: { id: id } })
        },
        opendt(id) {
            this.getshow(id)
        },
        async tijiao(id) {
            let res = await studentsubmissionofmywork({ id: id })
            this.code = res.data.code
        },
        async deleteover(id) {
            let res = await studentsdeletemyworks({ id: id })
            // console.log(res.data.code);
            this.code = res.data.code
        },
        async getshow(id) {
            let res = await studentisauditrecordofmyworks({ workId: id })
            // console.log(res);
            this.gridData = res.data.entity.resultData
        },
        letgo(id) {
            localStorage.setItem('oid', id)
            this.$router.push({ path: '/detailsofstudentworks', query: { id: id } })
        }
    }
}
</script>
<style lang="scss" scoped>
.beaudited {
  width: 100%;
  height: auto;
  padding: 30px 20px;
  box-sizing: border-box;
  overflow: hidden;
  .beaudited_ul {
    width: 100%;
    overflow: hidden;
    .beaudited_li {
      width: 100%;
      height: 180px;
      margin-bottom: 30px;
      border-bottom: 1px solid #ccc;
      .beaudited_li_one {
        width: 270px;
        height: 165px;
        float: left;
        position: relative;
        margin-right: 10px;
        // img {
        //   width: 270px;
        //   height: 138px;
        // }
        .beaudited_li_one_p {
          width: 80px;
          height: 30px;
          position: absolute;
          right: 0px;
          top: 4px;
          color: #ffffff;
          font-size: 14px;
          line-height: 30px;
          text-align: center;
          background-color: #ff0000;
        }
      }
      .beaudited_li_two {
        height: 180px;
        width: 650px;
        float: left;
        margin-left: 16px;
        .beaudited_li_two_one {
          width: 100%;
          height: 30px;
          h3 {
            height: 100%;
            line-height: 30px;
            font-size: 20px;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .beaudited_li_two_two {
          width: 100%;
          height: 40px;
          margin-top: 10px;
          p {
            font-size: 14px;
            line-height: 24px;
            color: #666666;
            word-break: break-all;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
        .beaudited_li_two_thr {
          width: 100%;
          height: 40px;
          margin-top: 20px;
        }
        .beaudited_li_two_for {
          width: 100%;
          height: 20px;
          margin-top: 12px;
          span {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #666666;
          }
        }
      }
    }
  }
}
.active {
  background: #008aff;
  color: #fff;
}
</style>
