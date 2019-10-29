<template>
  <div class="tbuploaded">
    <ul>
      <li v-for="(item,index) in datas" :key="index">
        <div>
          <el-avatar :size="100" style="margin:12px 40px" :src="item.face" @error="errorHandler">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
          </el-avatar>
        </div>
        <p>{{item.name}}</p>
        <span class="liso">{{item.className}}</span>

        <el-button type="text" :style="{height:'26px'}" @click="changes(item.id,item.classId)">查看未上传</el-button>
      </li>
      <el-dialog title="未上传作品" :visible.sync="dialogTableVisible" align="center">
        <el-table :data="gridData">
          <el-table-column property="name" label="课程名称" width="250" align="center"></el-table-column>
          <!-- <el-table-column property="title" label="活动项目" width="200" align="center"></el-table-column> -->
          <el-table-column property="status" label="上传状态" width="150" align="center"></el-table-column>
        </el-table>
      </el-dialog>
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
    <div v-if="!nomore" :style="{'marginTop':'36px','overflow':'hidden'}">
      <pagination
        :style="{'textAlign':'right'}"
        :param="pages"
        :page-sizes="[10, 15, 20]"
        :total="totalNum"
        @change="getlist"
      ></pagination>
    </div>
  </div>
</template>
<script>
import {
    getstudentstoupload,
    viewthelistofstudentsnonuploadedworks
} from '@/api/frontstage'
export default {
    // 待上传
    name: 'tbuploaded',
    data() {
        return {
            nomore: false,
            datas: [],
            dialogTableVisible: false,
            pages: {
                pageNum: 1,
                pageSize: 10
            },
            gridData: [],
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    },
    created() {
        this.$store.commit('changetitle', '作品管理')
        this.getlist()
    },
    computed: {
        isok() {
            return this.$store.state.test.isok
        },
        teachernewworks() {
            return this.$store.state.test.teachernewworks
        }
    },
    watch: {
        teachernewworks: {
            handler: function () {
                this.getlist()
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
        errorHandler() {
            return true
        },
        async changes(id, cid) {
            this.dialogTableVisible = true
            let res = await viewthelistofstudentsnonuploadedworks(
                { studentId: id, classId: cid },
                this.pages
            )
            let gridData = res.data.entity.data
            gridData.forEach(x => {
                if (x.status == '未编辑') {
                    x.status = '未上传'
                }
            })
            this.gridData = gridData
        },
        async getlist() {
            let res = await getstudentstoupload(
                { name: this.teachernewworks },
                this.pages
            )
            this.datas = res.data.entity.resultData
            this.totalNum = res.data.entity.totalNum || 0
        }
    }
}
</script>
<style lang="scss" scoped>
.tbuploaded {
  background: #f8f8f8;
  min-height: 500px;
  margin-top: 32px;
  ul {
    width: 100%;
    overflow: hidden;
    height: 100%;
    font-size: 0px;
    li {
      width: 180px;
      margin-right: 21px;
      display: inline-block;
      height: 232px;
      background: #fff;
      text-align: center;
      margin-bottom: 24px;
      &:nth-child(5n) {
        margin-right: 0px;
      }
      div {
        height: 124px;
        width: 100%;
      }
      p {
        font-size: 16px;
        width: 100%;
        color: #333333;
        text-align: center;
        margin-bottom: 4px;
      }
      span {
        color: #999999;
        width: 100%;
        font-size: 12px;
        display: block;
        text-align: center;
      }
      .liso {
        margin-bottom: 26px;
      }
      .lisz {
        font-size: 14px;
        width: 100px;
        height: 26px;
        color: #feffff;
        line-height: 26px;
        text-align: center;
        background: #008aff;
        border-radius: 12px;
        margin-left: 40px;
        cursor: pointer;
      }
    }
  }
}
</style>
