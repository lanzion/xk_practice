<template>
  <div class="viewworks">
    <div class="classroom_h">
      <ul :style="{'position':'relative'}">
        <li>
          <span>当前查看:</span>
        </li>
        <li :style="{'textAlign':'left'}">
          <span>{{name}}</span>
        </li>
        <div class="search-wrap fl tab-search" :style="{'marginTop':'10px','marginRight':'98px'}">
          <section data-v-89dd130e class="search clearfix">
            <input
              data-v-89dd130e
              type="text"
              @change="getworkName"
              placeholder="请输入作品名称"
              v-model="workNames"
              class="search-text"
            />
            <div data-v-89dd130e class="el-icon-search icon-search"></div>
          </section>
        </div>
        <div @click="goback()" :style="{'position':'absolute','right':'5px','top':'10px'}">
          <el-button type="primary">返回</el-button>
        </div>
      </ul>
    </div>

    <div class="noaudited">
      <ul>
        <li v-for="(g,index) in datas" :key="index">
          <div :style="{'width':'240px','marginRight':'22px','height':'168px'}">
            <el-image :src="g.cover" style="width: 240px;height:168px">
              <div
                slot="error"
                class="image-slot"
                style="font-size: 30px;line-height: 168px;text-align: center;"
              >
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <div class="center">
            <h4>{{g.workName}}</h4>
            <p>
              <span>{{g.className}}</span>
              <span>/</span>
              <span>{{g.gradeName}}</span>
            </p>
            <span :style="{'display':'block','fontSize':'14px','color':'#666666'}">{{name}}</span>
            <div class="center_t">
              <span>上传时间</span>
              <span>{{g.createDate}}</span>
            </div>
          </div>
          <div class="center_r">
            <span @click="changes(g.id)">查看详情</span>
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
    </div>
    <div class="block" v-if="!nomore">
      <pagination
        :param="pages"
        :page-sizes="[10, 15, 20]"
        :total="totalNum"
        @change="getlist"
      ></pagination>
    </div>
  </div>
</template>
<script>
import { studentmanagementviewingworks } from '@/api/frontstage'
export default {
    name: 'viewworks',
    data() {
        return {
            workNames: '',
            nomore: false,
            datas: [],
            name: '',
        }
    },
    created() {
        this.name = this.$route.query.name
        this.getlist()
    },
    watch: {
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
            let rid = localStorage.getItem('xkcreateId')
            let qid = this.$route.query.id
            let id = ''
            if (qid) {
                id = qid
            } else {
                id = rid
            }
            let res = await studentmanagementviewingworks({ studentId: id, name: this.workNames }, this.pages)
            console.log(res)
            if (res.data.entity.resultData) {
                this.datas = res.data.entity.resultData
            } else if (res.data.entity.resultData[0]) {
                this.name = res.data.entity.resultData[0].createName || ''
            }
            this.totalNum = res.data.entity.totalNum
        },
        goback() {
            this.$router.go(-1)
        },
        changes(id) {
            this.$router.push({ path: '/space/agment/workdetails', query: {id: id} })
        },
        getworkName() {
            this.getlist()
        }
    }
}
</script>

<style lang="scss" scoped>
.viewworks {
  .classroom_h {
    border-bottom: 2px solid #eaeaea;
    ul {
      height: 60px;
      li {
        float: left;
        width: 80px;
        height: 100%;
        font-size: 18px;
        color: #333;
        margin-left: 38px;
        line-height: 60px;
        text-align: center;
        cursor: pointer;
        &:nth-child(2) {
          margin-left: 20px;
          width: 120px;
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
  height: 100%;
  border-bottom: 1px solid #ccc;
  padding-bottom: 80px;
  min-height: 500px;
  ul {
    width: 100%;
    height: 100%;
    font-size: 0px;
    padding: 42px 20px 0 20px;
    box-sizing: border-box;
    font-size: 0px;
    li {
      display: inline-block;
      width: 277px;
      height: 218px;
      margin-left: 28px;
      margin-bottom: 40px;
      background: #eee;
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
        color: #999999;
        font-size: 12px;
        margin-right: 45px;
      }
      .spn2 {
        color: #008aff;
        font-size: 14px;
        margin-right: 28px;
        width: 80px;
        height: 24px;
        background-color: #ffffff;
        border-radius: 2px;
        border: solid 1px #008aff;
        margin-right: 6px;
        line-height: 24px;
        text-align: center;
      }
      .spn3 {
        text-align: center;
        width: 80px;
        height: 24px;
        line-height: 24px;
        color: #ffffff;
        font-size: 14px;
        background-color: #008aff;
        border-radius: 2px;
      }
    }
  }
}
.noaudited {
  width: 100%;
  height: 100%;
  padding: 30px 25px;
  box-sizing: border-box;
  background: #fff;
  min-height: 500px;
  ul {
    width: 100%;
    height: 100%;
    li {
      width: 100%;
      height: 168px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 30px;
      &:nth-last-child(1) {
        border-bottom: none;
      }
      div {
        float: left;
        &:nth-last-child(1) {
          float: right;
        }
      }
      .center {
        h4 {
          font-size: 20px;
          color: #333333;
          margin-bottom: 12px;
        }
        p {
          margin-bottom: 12px;
          span {
            font-size: 14px;
            color: #008aff;
            margin-right: 16px;
          }
        }
      }
      .center_t {
        margin-top: 36px;
        span {
          font-size: 14px;
          color: #666666;
          margin-right: 12px;
        }
      }
    }
  }
}
.center_r {
  width: 108px;
  height: 100%;
  span {
    margin-top: 50px;
    display: block;
    height: 38px;
    width: 106px;
    border: solid 1px #008aff;
    border-radius: 4px;
    font-size: 16px;
    color: #008aff;
    line-height: 38px;
    text-align: center;
  }
}
</style>
