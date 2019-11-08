<template>
  <div class="adopteder">
    <ul class="beaudited_ul">
      <li class="beaudited_li" v-for="(g,index) in datas" :key="index">
        <div class="beaudited_li_one">

          <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
          <div class="beaudited_li_one_p"></div>
        </div>
        <div class="beaudited_li_two">
          <div class="beaudited_li_two_one">
            <h3>{{g.workName}}</h3>
          </div>
          <div class="beaudited_li_two_two">
            <p>{{g.description}}</p>
          </div>
          <div class="beaudited_li_two_for">
            <span>上传时间</span>
            <span>{{g.createDate}}</span>
          </div>
        </div>
        <div class="beaudited_li_thr">
          <span @click="letgo(g.id)">作品详情</span>
        </div>
      </li>
    </ul>
     <no-data v-if="nomore"></no-data>
    <div class="block" v-if="!nomore">
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
import { listofpassedcourseworks } from '@/api/frontstage'
export default {
    name: 'adopteder',
    data() {
        return {
            datas: [],
            nomore: false,
            pages: {
                pageNum: 1,
                pageSize: 10
            }
        }
    },
    created() {
        this.getlist()
    },
    computed: {
        listname() {
            return this.$store.state.test.listname
        }
    },
    watch: {
        listname: {
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
        letgo(id) {
            localStorage.setItem('oid', id)
            this.$router.push({ path: '/space/mywork/studentworkdetails', query: { id: id } })
        },
        async getlist() {
            let res = await listofpassedcourseworks(
                { workName: this.listname },
                this.pages
            )
            this.datas = res.data.entity.resultData
            this.totalNum = res.data.entity.totalNum
        }
    }
}
</script>
<style lang="scss" scoped>
.adopteder {
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
        }
      }
      .beaudited_li_two {
        height: 180px;
        width: 460px;
        float: left;
        margin-left: 20px;
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
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
        .beaudited_li_two_for {
          width: 100%;
          height: 20px;
          margin-top: 48px;
          span {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #666666;
          }
        }
      }
      .beaudited_li_thr {
        float: left;
        width: 120px;
        height: 100%;
        line-height: 180px;
        text-align: center;
        margin-left: 60px;
        span {
          width: 108px;
          height: 38px;
          line-height: 38px;
          border: 1px solid #008aff;
          font-size: 16px;
          color: #008aff;
          display: inline-block;
          border-radius: 4px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
