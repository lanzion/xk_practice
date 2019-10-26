<template>
  <div class="participation">
    <swriper :type="imgnum" />
    <div class="container" :style="{'paddingTop':'30px'}">
      <div class="aggregate_one">
        <div class="aggregate_one_t">
          <ul class="aggregate_one_t_u">
            <li>参与学校</li>
            <li>访问人数</li>
          </ul>
        </div>
        <div class="aggregate_one_q">
          <ul class="aggregate_one_t_w" :style="{'minHeight':'500px'}" v-if="!nomoretwo">
            <li @click="letgoone(g.id)" v-for="(g,index) in goods" :key="index">
              <span>{{g.schoolName}}</span>
              <span>{{g.browseNum}}</span>
            </li>
          </ul>
          <div
            v-if="nomoretwo"
            :style="{'width':'100%','height':'500px','background':'#fff','textAlign':'center'}"
          >
            <img src="~@assets/image/nothingData.svg" alt />
            <div :style="{'lineHeight':'0'}">
              <i :style="{'fontSize':'18px'}">暂无数据...</i>
            </div>
          </div>
        </div>
      </div>

      <div class="aggregate_two">
        <!-- 1 -->
        <div class="aggregate_two_q">
          <div class="aggregate_two_q_l">
            <span>地区:</span>
            <span>
              <!-- <el-select v-model="value" @change="getaddres" placeholder="请选择地区">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select> -->
              <region type="object" @change="getaddres" class="regions"></region>
            </span>
          </div>
          <div class="aggregate_two_q_r">
            <el-input
              placeholder="请输入学校名称"
              @keyup.native.enter="resetPage"
              v-model="schoolName"
              class="input-with-select"
            >
              <el-button slot="append" @click="resetPage" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </div>

        <!-- 3 -->

        <div class="aggregate_two_s">
          <ul class="aggregate_two_s_u">
            <li
              class="aggregate_two_s_l"
              @click="letgo(g.id)"
              v-for="(g,index) in datas"
              :key="index"
            >
              <div class="aggregate_two_s_l_top">
                <!-- <el-image :src="g.cover" fit="cover" style="width: 188px;height:188px">
                  <div
                    slot="error"
                    class="image-slot"
                    style="font-size: 60px;line-height: 180px;text-align: center;color:#ccc;"
                  >
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image> -->
                <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
              </div>
              <div class="aggregate_two_s_l_bot">
                <span>{{g.schoolName}}</span>
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

        <div class="aggregate_two_h" v-if="!nomore">
          <div class="block" :style="{'float':'right'}">
            <pagination
              :param="pages"
              :page-sizes="[16, 24, 32]"
              :total="totalNum"
              @change="getlist"
            ></pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
    getparticipationinschools,
    gettingareainterface
} from '@/api/frontstage'
export default {
    name: 'participation',
    data() {
        return {
            value: '',
            value1: '',
            value2: '',
            input3: '',
            datas: [],
            schoolName: '',
            goods: [],
            nomoretwo: false,
            id: '',
            options: [],
            nomore: false,
            pages: {
                pageNum: 1,
                pageSize: 16
            },
            imgnum: '4'
        }
    },
    created() {
        this.getlist()
        this.getadders()
        this.getgoods()
    },
    components: {
        swriper: resolve => require(['@/views/my/swriper/swriper'], resolve)
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
        },
        'goods.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomoretwo = true
                } else {
                    this.nomoretwo = false
                }
            },
            deep: true
        }
    },
    methods: {
        getaddres(value) {
            this.value = value[0].code
            this.value1 = value[1].code
            this.value2 = value[2].code
            this.getlist()
        },
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.getlist()
        },
        async getadders() {
            let res = await gettingareainterface()
            let qts = {
                name: '全部',
                id: ''
            }
            this.options = res.data.appendInfo.list
            this.options.unshift(qts)
        },
        async getlist() {
            let res = await getparticipationinschools(
                {
                    schoolName: this.schoolName,
                    provinceId: this.value,
                    cityId: this.value1,
                    areaId: this.value2
                },
                this.pages
            )
            this.datas = res.data.entity.resultData
            this.totalNum = res.data.entity.totalNum
        },
        async getgoods() {
            let res = await getparticipationinschools({}, this.pages)
            this.goods = res.data.entity.resultData
        },
        letgo(id) {
            localStorage.setItem('sid', id)
            this.$router.push({ path: '/schoolhomepage', query: { id: id } })
        },
        letgoone(id) {
            localStorage.setItem('sid', id)
            this.$router.push({ path: '/schoolhomepage', query: { id: id } })
        }
    }
}
</script>
<style lang="scss" scoped>
.participation {
  .banner {
    width: 100%;
    height: 400px;
    img {
      font-size: 0;
      border: none;
      height: 400px;
    }
  }
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.diyt {
  min-height: 500px;
  .banner {
    width: 100%;
    height: 400px;
    img {
      font-size: 0;
      border: none;
      height: 400px;
    }
  }
}
.container {
  height: 100%;
  overflow: hidden;
  margin-bottom: 150px;
  .aggregate_one {
    float: left;
    width: 240px;
    background: #fff;
    .aggregate_one_t {
      width: 100%;
      height: 40px;
      background-color: #e5004f;
      .aggregate_one_t_u {
        width: 100%;
        li {
          width: 50%;
          float: left;
          text-align: center;
          line-height: 40px;
          color: #ffffff;
          font-size: 16px;
        }
      }
    }
    .aggregate_one_q {
      width: 100%;
      .aggregate_one_t_w {
        width: 100%;
        padding: 14px 7px;
        box-sizing: border-box;
        li {
          width: 100%;
          height: 32px;
          cursor: pointer;
          &:hover {
            span {
              &:nth-child(1) {
                color: #008aff;
              }
            }
          }
          span {
            display: block;
            float: left;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            color: #666666;
            &:nth-child(1) {
              width: 80%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              box-sizing: border-box;
              padding-right: 10px;
              &::before {
                content: "*";
                width: 3px;
                height: 3px;
                margin-right: 10px;
                vertical-align: middle;
              }
            }
            &:nth-child(2) {
              width: 20%;
            }
          }
        }
      }
    }
  }
  .aggregate_two {
    float: right;
    width: 930px;
    min-height: 800px;
    .aggregate_two_q {
      width: 100%;
      height: 60px;
      margin-bottom: 18px;
      background: #fff;
      .aggregate_two_q_l {
        float: left;
        height: 60px;
        span {
          display: block;
          float: left;
          line-height: 60px;
          text-align: center;
          &:nth-child(1) {
            width: 100px;
            height: 100%;
            color: #333333;
            font-size: 16px;
            line-height: 60px;
          }
          &:nth-child(2) {
            width: 200px;
            height: 32px;
          }
        }
      }
      .aggregate_two_q_r {
        float: right;
        height: 60px;
        line-height: 60px;
        width: 230px;
        margin-right: 10px;
      }
    }
    .aggregate_two_z {
      width: 100%;
      height: 40px;
      background: #fff;
      overflow: hidden;
      border-bottom: 4px solid #fc8230;
      .aggregate_two_z_l {
        height: 100%;
        width: 110px;
        height: 34px;
        margin-top: 8px;
        margin-left: 25px;
        float: left;
        span {
          display: inline-block;
          width: 100%;
          height: 100%;
          background: #fc8230;
          border-radius: 4px 4px 0px 0px;
          color: #fff;
          font-size: 18px;
          text-align: center;
          line-height: 34px;
          cursor: pointer;
        }
      }
      .aggregate_two_z_r {
        float: right;
        height: 34px;
        margin-top: 8px;
        span {
          width: 100px;
          text-align: center;
          line-height: 34px;
          display: block;
          float: left;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .aggregate_two_s {
      box-sizing: border-box;
      padding: 24px 24px 30px 24px;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #fff;
      .aggregate_two_s_u {
        width: 100%;
        height: 100%;
        font-size: 0;
        .aggregate_two_s_l {
          width: 204px;
          height: 228px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          float: left;
          margin-right: 22px;
          margin-bottom: 22px;
          cursor: pointer;
          &:nth-child(4n) {
            margin-right: 0;
          }
          .aggregate_two_s_l_top {
            padding: 7px;
            width: 100%;
            height: 188px;
            box-sizing: border-box;
            overflow: hidden;
            img {
              width: 186px;
              height: 175px;
            }
          }
          .aggregate_two_s_l_bot {
            width: 100%;
            height: 38px;
            box-sizing: border-box;
            span {
              display: inline-block;
              width: 100%;
              height: 100%;
              line-height: 38px;
              text-align: left;
              padding-left: 10px;
              color: #333333;
              font-size: 16px;
              box-sizing: border-box;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
.aggregate_two_h {
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
}
.block {
  padding-bottom: 50px;
}
.active {
  color: #008aff;
}
</style>
