<template>
  <div class="evaluateotherswithoutscoring">
    <div class="ungradedstudents">
      <div class="uploadworks">
        <ul>
          <li @click="changes(g.id)" v-for="(g,index) in datas" :key="index">
            <div>
              <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
            </div>
            <h4>{{g.cname}}</h4>
            <span>{{g.workName}}</span>
            <span>{{g.createName}}</span>
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
    </div>
  </div>
</template>
<script>
import { unevaluatedlistforevaluatingothers } from '@/api/frontstage'
export default {
    name: 'evaluateotherswithoutscoring',
    data() {
        return {
            pass: true,
            code: '',
            datas: [],
            nomore: false,
            pages: {
                pageNum: 1,
                pageSize: 9
            }
        }
    },
    created() {
        this.getlist()
    },
    computed: {
        newname() {
            return this.$store.state.test.newname
        }
    },
    watch: {
        newname: {
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
        async getlist() {
            let res = await unevaluatedlistforevaluatingothers(
                { cname: this.newname },
                this.pages
            )
            // console.log(res.data.entity.resultData);
            this.datas = res.data.entity.resultData
            this.totalNum = res.data.entity.totalNum
        },
        changes(id) {
            localStorage.setItem('busId', id)
            this.$router.push({
                path: '/space/selfevaluation/detailsofselfevaluation',
                query: { busId: id, type: 1, seetable: false }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.uploadworks {
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
      height: 285px;
      margin-left: 28px;
      margin-bottom: 40px;
      cursor: pointer;
      div {
        width: 100%;
        height: 155px;
        img {
          width: 100%;
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
        height: 30px;
        font-size: 14px;
        display: block;
        text-indent: 6px;
        border-radius: 12px;
        width: 100%;
        text-align: left;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
