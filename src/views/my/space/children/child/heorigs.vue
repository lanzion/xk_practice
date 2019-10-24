<template>
  <div class="heorigs">
    <ul>
      <li @click="changes(t.id)" v-for="(t,index) in datas" :key="index">
        <div>
          <el-image :src="t.cover" fit="cover" style="width: 277px;height:155px">
            <div
              slot="error"
              class="image-slot"
              style="font-size: 30px;line-height: 155px;text-align: center;"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <h4>{{t.cname}}</h4>
        <span class="spn1">{{t.createName}}</span>
        <span :style="{'marginRight':'12px','float': 'right'}">{{t.className}}</span>
        <!-- <span>七年级</span> -->
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
    <pagination
      v-if="!nomore"
      :param="pages"
      :total="totalNum"
      @change="getlist"
      :page-sizes="[6, 12, 18]"
      style="    text-align: right;"
    ></pagination>
  </div>
</template>
<script>
import { listofworkevaluatedbyteachers } from '@/api/frontstage'
export default {
    name: 'heorigs',
    data() {
        return {
            nomore: false,
            datas: [],
            pages: {
                pageNum: 1,
                pageSize: 6
            }
        }
    },
    created() {
        this.getlist()
    },
    computed: {
        teachernamefen() {
            return this.$store.state.test.teachernamefen
        }
    },
    watch: {
        teachernamefen: {
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
        changes(busId) {
            localStorage.setItem('busId', busId)
            this.$router.push({
                name: 'scofworks',
                params: { busId: busId, type: 2 }
            })
        },
        async getlist() {
            let res = await listofworkevaluatedbyteachers(
                { cname: this.teachernamefen },
                this.pages
            )
            // console.log(res.data.entity.resultData);
            this.datas = res.data.entity.resultData || []
            this.totalNum = res.data.entity.totalNum || 0
        }
    }
}
</script>
<style lang="scss" scoped>
.heorigs {
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
      height: 203px;
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
      }
      span {
        font-size: 12px;
        display: inline-block;
        text-indent: 6px;
        color: #999999;
      }
      .spn1 {
        color: #333333;
        font-size: 14px;
        margin-right: 28px;
      }
    }
  }
}
</style>
