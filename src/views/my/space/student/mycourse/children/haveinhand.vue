<template>
  <div class="haveinhand">
    <ul>
      <li v-for="(g,index) in datas" :key="index">
        <div>
          <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
        </div>
        <h4>{{g.name}}</h4>
        <span @click="changes(g.id,g.cstatus)" class="activeone">{{g.cstatus}}</span>
      </li>
    </ul>
     <no-data v-if="nomore"></no-data>
    <div class="block" v-if="!nomore" :style="{'float':'right','marginRight':'30px'}">
      <pagination
        :param="pages"
        :page-sizes="[9, 12, 15]"
        :total="totalNum"
        @change="getlist"
      ></pagination>
    </div>
  </div>
</template>
<script>
import { inprogresslistofstudentcourses } from '@/api/frontstage'
export default {
    name: 'haveinhand',
    data() {
        return {
            datas: [],
            pass: true,
            pages: {
                pageNum: 1,
                pageSize: 9
            },
            nomore: false,
            code: ''
        }
    },
    created() {
        this.getlist()
    },
    computed: {
        workname() {
            return this.$store.state.test.workname
        }
    },
    watch: {
        workname: {
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
        async getlist(val) {
            let res = await inprogresslistofstudentcourses(
                { name: this.workname },
                this.pages
            )
            this.datas = res.data.entity.resultData
            this.datas.forEach(x => {
                if (x.cstatus === 'INPRO_NOWORK') {
                    x.cstatus = '上传作品'
                }
                if (x.cstatus === 'INPRO_HASWORK') {
                    x.cstatus = '查看详情'
                }
            })
        },
        changes(id, cstatus) {
            localStorage.setItem('gid', id)
            if (cstatus === '上传作品') {
                this.$router.push({
                    name: 'submissionofworks',
                    query: { id: id, type: 1 }
                })
            } else {
                this.$router.push({
                    name: 'detailsofstudentcourses',
                    params: { id: id }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.haveinhand {
  width: 100%;
  height: 100%;
  padding-bottom: 80px;
  min-height: 500px;
  ul {
    width: 100%;
    height: 100%;
    font-size: 0px;
    padding: 42px 20px 0 20px;
    box-sizing: border-box;
    li {
      display: inline-block;
      width: 277px;
      height: 220px;
      margin-left: 28px;
      margin-bottom: 40px;
      cursor: pointer;
      div {
        width: 100%;
        height: 155px;
        img {
          width: 100%;
          height: 155px;
        }
      }
      h4 {
        margin-top: 10px;
        margin-bottom: 7px;
        font-size: 16px;
        color: #333;
        text-indent: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span {
        height: 24px;
        font-size: 14px;
        display: block;
        text-indent: 6px;
        border-radius: 12px;
        width: 88px;
        text-align: center;
        line-height: 24px;
        &:hover {
          background-color: #008aff;
          color: #ffffff;
        }
      }
    }
  }
}
.activeone {
  border: 1px solid #008aff;
  color: #008aff;
}
</style>
