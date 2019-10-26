<template>
  <div>
    <div class="nimi">
      <label for>活动状态:</label>
      <el-select v-model="value" @change="getshow" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        placeholder="请输入活动主题"
        v-model="input5"
        @keyup.native.enter="resetPage"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search" @click="resetPage"></el-button>
      </el-input>
    </div>
    <div class="cord">
      <ul>
        <li @click="changes(item.id)" v-for="(item,index) in datas" :key="index" class="cordlist">
          <div class="mgshow">
            <!-- <el-image :src="item.cover" fit="cover" style="width: 590px;height:300px">
              <div
                slot="error"
                class="image-slot"
                style="font-size: 30px;line-height: 300px;text-align: center;"
              >
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image> -->
             <ov-image :src-data="getFileUrl(item.cover)"></ov-image>
            <span
              :class="item.activityStatus == '进行中'?'active':''"
              :style="item.activityStatus == '已结束'? {'background':'#ccc'}:''"
            >{{item.activityStatus}}</span>
          </div>
          <h5>{{item.title}}</h5>
          <div class="timeshow">
            <span class="spone">活动时间:</span>
            <span>{{item.startDate.slice(0,10)}}</span>
            <i>——</i>
            <span>{{item.endDate.slice(0,10)}}</span>
          </div>
          <div class="titleshow">
            <span>
              <el-avatar :size="30" style="float:left;" :src="item.orgCover" @error="errorHandler">
                <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
              </el-avatar>
            </span>
            <span>{{item.orgName}}</span>
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
    <div>
      <div class="block" v-if="!nomore">
        <pagination
          :style="{'textAlign':'right'}"
          :param="pages"
          :page-sizes="[10, 16, 24]"
          :total="totalNum"
          @change="getlists"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { gettingshow } from '@/api/frontstage'
export default {
    data() {
        return {
            morenImage: 'this.src="static/img/jiditubiao22.png"', // 默认头像
            datas: [],
            listData: [],
            codeid: '',
            input5: '',
            select: '',
            options: [
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: '1',
                    label: '未开始'
                },
                {
                    value: '2',
                    label: '进行中'
                },
                {
                    value: '3',
                    label: '已结束'
                }
            ],
            value: '',
            nomore: false
        }
    },
    created() {
        this.getlists()
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
        errorHandler() {
            return true
        },
        getshow() {
            this.getlists()
        },
        // 重置分页
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.getlists()
        },
        activeyover() {
            this.getlists()
        },
        async getlists() {
            this.isLoading = true
            let form = {
                title: this.input5,
                activityStatus: this.value
            }
            const res = await gettingshow(form, this.pages)
            const { entity: datas = {} } = res.data
            try {
                this.datas = datas.resultData || []
                this.listData = datas.resultData || []
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.datas = []
            } finally {
                this.isLoading = false
            }
        },
        changes(id) {
            localStorage.setItem('activeid', id)
            this.$router.push({ path: '/colleges', query: { id: id } })
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
  margin-top: 18px;
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
.cord {
  ul {
    width: 100%;
    li {
      display: inline-block;
      width: 590px;
      height: 446px;
      margin-right: 16px;
      background: #fff;
      margin-bottom: 12px;
      cursor: pointer;
      &:nth-child(2n) {
        margin-right: 0px;
      }
      .mgshow {
        position: relative;
        width: 100%;
        height: 300px;
        img {
          height: 300px;
          width: 590px;
        }
        span {
          display: block;
          width: 70px;
          height: 30px;
          font-size: 14px;
          line-height: 30px;
          position: absolute;
          color: #ffffff;
          background: #008aff;
          text-align: center;
          top: 25px;
          right: 0;
          border-radius: 15px 0 0 15px;
        }
        .active {
          background: #ff9900;
        }
      }
      h5 {
        width: 483px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 18px;
        color: #333333;
        padding-left: 17px;
        margin-top: 12px;
        margin-bottom: 15px;
      }
      .timeshow {
        padding-left: 17px;
        font-size: 16px;
        color: #999999;
        .spone {
          margin-right: 10px;
        }
      }
      .titleshow {
        margin-top: 25px;
        padding-left: 17px;
        height: 38px;
        margin-right: 10px;
        span {
          display: inline-block;
          font-size: 14px;
          color: #333333;
          height: 38px;
          line-height: 38px;
          vertical-align: middle;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
.addclass {
  box-shadow: 0 5px 5px 0 #ccc;
}
.el-pagination {
  text-align: right;
}
</style>
