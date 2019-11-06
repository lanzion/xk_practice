<template>
  <div class="schoolfirst">
    <div class="container">
      <div class="container_one">
        <div class="container_one_title">
          <span>最新实践课</span>
          <span @click="movemore01">更多></span>
        </div>
        <div class="container_one_conent">
          <ul>
            <li
              class="container_one_conent_li"
              @click="goone(g.id)"
              v-for="(g,index) in datas"
              :key="index"
            >
              <div class="container_one_conent_img">
                 <ov-image :src-data="getFileUrl(g.cover)"></ov-image>
              </div>
              <div class="container_one_conent_name">
                <p>{{g.name}}</p>
              </div>
              <div class="container_one_conent_show">
                <span>
                  <span v-for="(b,index) in g.fit" :key="index">{{arr[b-1]}}</span>
                </span>
                <span>
                  参与
                  <i>{{g.stuNum}}</i>人
                </span>
              </div>
            </li>
          </ul>
           <no-data v-if="nomore"></no-data>
        </div>
      </div>

      <div class="container_two">
        <div class="container_two_title">
          <span>最新作品</span>
          <!-- <span>更多></span> -->
        </div>
        <div class="container_two_conent">
          <div class="container_r_thr">
            <ul>
              <li @click="gotwo(k.id)" v-for="(k,index) in goods" :key="index">
                <div class="container_r_thr_img">
                   <ov-image :src-data="getFileUrl(k.cover)"></ov-image>
                </div>
                <div class="container_r_thr_title">
                  <h4>{{k.workName}}</h4>
                </div>
                <div class="container_r_thr_show">
                  <div class="minh">
                    <i :style="{'backgroundImage':'url('+yanjing+')'}"></i>
                    <span>{{k.browseNum}}</span>
                  </div>
                  <div class="minh">
                    <i :style="{'backgroundImage':'url('+fenxiang+')'}"></i>
                    <span>{{k.shareNum}}</span>
                  </div>
                  <div class="minh">
                    <i :style="{'backgroundImage':'url('+dianzan+')'}"></i>
                    <span>{{k.praiseNum}}</span>
                  </div>
                </div>
                <div class="container_r_thr_name">
                  <div class="container_r_thr_name_img">
                    <img :src="k.createFace" alt />
                  </div>
                  <div class="container_r_thr_name_conent">
                    <span>{{k.createName}}</span>
                    <span>{{k.className}}</span>
                  </div>
                </div>
              </li>
            </ul>
             <no-data v-if="nomoretwo"></no-data>
            <div v-if="! nomoretwo" class="block" :style="{'float':'right'}">
              <pagination
                :param="pages"
                :page-sizes="[6, 9, 12]"
                :total="totalNum"
                @change="getwork"
              ></pagination>
            </div>
          </div>
        </div>
      </div>

      <div class="container_thr">
        <div class="container_one_title">
          <span>校园资讯</span>
          <span @click="movemore02">更多></span>
        </div>
        <div v-if="!nomorethr" class="container_thr_conent">
          <div class="container_thr_conent_l">
            <div class="container_thr_conent_l_img">
              <el-carousel :interval="5000" arrow="never" height="318px">
                <el-carousel-item v-for="(p,index) in imgarr" :key="index">
                  <!-- <img :src="p" alt /> -->
                   <ov-image :src-data="getFileUrl(p)"></ov-image>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="container_thr_conent_r">
            <div class="container_thr_conent_r_one" v-for="(d,index) in timeshowone" :key="index">
              <div class="container_thr_conent_r_one_title">
                <h4>{{d.title}}</h4>
              </div>
              <div class="container_thr_conent_r_one_time">
                <span>{{d.createDate}}</span>
              </div>
              <div class="container_thr_conent_r_one_show">
                <p v-html="d.content"></p>
              </div>
            </div>
            <div class="container_thr_conent_r_two">
              <ul>
                <li @click="gothr(s.id)" v-for="(s,index) in timeshowtwo" :key="index">
                  <span>{{s.title}}</span>
                  <span>{{s.createDate.slice(0,10)}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
         <no-data v-if="nomorethr"></no-data>
      </div>
    </div>
  </div>
</template>
<script>
import {
    listofpracticalcourses,
    getalistofinformation,
    getlistofschoolworks
} from '@/api/frontstage'
export default {
    name: 'schoolfirst',
    data() {
        return {
            arr: ['小学', '初中', '高中'],
            datas: [],
            goods: [],
            imgarr: [],
            schoolId: '',
            nomore: false,
            nomoretwo: false,
            nomorethr: false,
            timeshow: [],
            timeshowone: [],
            timeshowtwo: [],
            dianzan: require('../../../../../../static/img/dianzan02.png'),
            fenxiang: require('../../../../../../static/img/fenxiong.png'),
            yanjing: require('../../../../../../static/img/liulanhui.png')
        }
    },
    created() {
        this.getlsit()
        this.getwork()
        this.getinformation()
    },
    watch: {
        pages: {
            handler: function () {
                this.getlists()
            },
            deep: true
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
        },
        'timeshow.length': {
            handler(newval, oldval) {
                if (newval === 0) {
                    this.nomorethr = true
                } else {
                    this.nomorethr = false
                }
            },
            deep: true
        }
    },
    methods: {
        async getlsit() {
            let uid = this.$route.query.id
            let sid = localStorage.getItem('sid')
            // console.log(uid, sid);
            let id = ''
            if (uid) {
                id = uid
            } else {
                id = sid
            }
            let res = await listofpracticalcourses({ schoolId: id }, this.pages)
            // console.log(res);
            this.datas = res.data.entity.resultData
            this.datas.forEach(x => {
                let sum = x.fit.split(',')
                x.fit = sum
            })
        },
        async getinformation() {
            let uid = this.$route.query.id
            let sid = localStorage.getItem('sid')
            // console.log(uid, sid);
            let id = ''
            if (uid) {
                id = uid
            } else {
                id = sid
            }
            let res = await getalistofinformation(
                { orgType: 'C', orgId: id },
                this.pages
            )
            this.timeshow = res.data.entity.resultData
            this.timeshowone = this.timeshow.slice(0, 1)
            this.timeshowtwo = this.timeshow.slice(1, 5)
            let imgarr = []
            this.timeshow.forEach(x => {
                imgarr.push(x.cover)
            })
            this.imgarr = imgarr
        },
        async getwork() {
            let uid = this.$route.query.id
            let sid = localStorage.getItem('sid')
            let id = ''
            if (uid) {
                id = uid
            } else {
                id = sid
            }
            this.schoolId = id
            let res = await getlistofschoolworks({ schoolId: id }, this.pages)
            if (res.data.code !== 200) {
                this.nomoretwo = true
            } else {
                this.goods = res.data.entity.resultData
            }
            if (res.data.entity) {
                this.totalNum = res.data.entity.totalNum || 0
            }
        },
        goone(id) {
            localStorage.setItem('mid', id)
            sessionStorage.setItem('schoolid', this.schoolId)
            this.$router.push({
                path: '/goods',
                qurey: { id: id, schoolId: this.schoolId }
            })
        },
        gotwo(id) {
            localStorage.setItem('did', id)
            this.$router.push({ path: '/listsdetail', qurey: { id: id } })
        },
        gothr(id) {
            localStorage.setItem('xid', id)
            this.$router.push({
                path: '/baseinformationdetails',
                query: { id: id, type: 2 }
            })
        },
        movemore01() {
            this.$router.push({ path: '/schoolpracticecourse' })
        },
        movemore02() {
            this.$router.push({ path: '/campusinformation' })
        }
    }
}
</script>
<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.container {
  margin-top: 20px;
  margin-bottom: 120px;
  .container_one {
    background: #fff;
    .container_one_title {
      width: 100%;
      height: 70px;
      padding: 0 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      span {
        display: block;
        width: 80px;
        height: 100%;
        line-height: 70px;
        text-align: center;
        &:nth-child(1) {
          float: left;
          font-size: 24px;
          color: #333333;
          width: 120px;
        }
        &:nth-child(2) {
          float: right;
          color: #666666;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .container_one_conent {
      width: 100%;
      height: 432px;
      padding-top: 20px;
      box-sizing: border-box;
      .container_one_conent_li {
        width: 224px;
        height: 184px;
        float: left;
        margin-right: 20px;
        margin-bottom: 20px;
        &:hover {
          box-shadow: 2px 2px 5px 0px #cacaca;
          .container_one_conent_name {
            p {
              color: #008aff;
            }
          }
        }
        &:nth-child(5n) {
          margin-right: 0px;
        }
        .container_one_conent_img {
          width: 100%;
          height: 124px;
          overflow: hidden;
          background: #ccc;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .container_one_conent_name {
          width: 100%;
          height: 30px;
          padding: 0 16px;
          box-sizing: border-box;
          p {
            font-size: 14px;
            color: #333333;
            line-height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .container_one_conent_show {
          width: 100%;
          padding: 0 16px;
          height: 30px;
          box-sizing: border-box;
          span {
            display: block;
            width: 80px;
            height: 100%;
            line-height: 30px;
            &:nth-child(1) {
              float: left;
              color: #999;
            }
            &:nth-child(2) {
              float: right;
              text-align: right;
              color: #999;
              i {
                color: #666;
              }
            }
          }
        }
      }
    }
  }
  .container_two {
    background: #fff;
    margin-top: 20px;
    overflow: hidden;
    .container_two_title {
      width: 100%;
      height: 70px;
      padding: 0 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      span {
        display: block;
        width: 80px;
        height: 100%;
        line-height: 70px;
        text-align: center;
        &:nth-child(1) {
          float: left;
          font-size: 24px;
          color: #333333;
          width: 120px;
        }
        &:nth-child(2) {
          float: right;
          color: #666666;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
  }
}
.container_r_thr {
  width: 100%;
  overflow: hidden;
  ul {
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;
    padding: 24px 31px;
    box-sizing: border-box;
    li {
      width: 274px;
      height: 305px;
      float: left;
      box-sizing: border-box;
      margin-right: 14px;
      background: #fff;
      &:nth-child(4n) {
        margin-right: 0px;
      }
      &:hover {
        .container_r_thr_title {
          h4 {
            color: #008aff;
          }
        }
      }
      .container_r_thr_img {
        height: 180px;
        width: 100%;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .container_r_thr_title {
        padding-left: 10px;
        box-sizing: border-box;
        height: 30px;
        h4 {
          font-size: 16px;
          color: #333333;
          width: 100%;
          height: 100%;
          text-align: left;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .container_r_thr_show {
        margin-top: 10px;
        padding-left: 10px;
        width: 100%;
        height: 30px;
        box-sizing: border-box;
        border-bottom: 1px solid #ccc;
        .minh {
          height: 30px;
          width: 70px;
          float: left;
          i {
            // display: block;
            // width: 20px;
            // height: 20px;
            // background-repeat: no-repeat;
            // background-size: 16px;

            // float: left;
            display: block;
            width: 20px;
            height: 20px;
            background-repeat: no-repeat;
            background-size: 14px;
            float: left;
          }
          span {
            height: 20px;
            display: block;
            font-size: 14px;
            color: #cccccc;
            float: left;
          }
        }
      }
      .container_r_thr_name {
        height: 30px;
        padding-left: 10px;
        margin-top: 5px;
        box-sizing: border-box;
        .container_r_thr_name_img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ccc;
          float: left;
          margin-right: 9px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .container_r_thr_name_conent {
          float: left;
          width: 200px;
          height: 100%;
          span {
            display: block;
            float: left;
            color: #666666;
            font-size: 14px;
            line-height: 30px;
            &:nth-child(2) {
              float: right;
            }
          }
        }
      }
    }
  }
}
.container_thr {
  background: #fff;
  margin-top: 20px;
  .container_one_title {
    width: 100%;
    height: 70px;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    span {
      display: block;
      width: 80px;
      height: 100%;
      line-height: 70px;
      text-align: center;
      &:nth-child(1) {
        float: left;
        font-size: 24px;
        color: #333333;
        width: 120px;
      }
      &:nth-child(2) {
        float: right;
        color: #666666;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
  .container_thr_conent {
    width: 100%;
    height: 392px;
    padding: 26px 3px 40px 28px;
    box-sizing: border-box;
    overflow: hidden;
    .container_thr_conent_l {
      width: 576px;
      height: 318px;
      overflow: hidden;
      float: left;
      margin-right: 10px;
      .container_thr_conent_l_img {
        height: 100%;
        overflow: hidden;
        background: #fff;
      }
    }
    .container_thr_conent_r {
      width: 574px;
      height: 100%;
      float: left;
      overflow: hidden;
      .container_thr_conent_r_one {
        width: 100%;
        height: 188px;
        background-color: #f4f4f4;
        border-radius: 5px;
        padding-left: 20px;
        box-sizing: border-box;
        .container_thr_conent_r_one_title {
          height: 30px;
          width: 100%;
          h4 {
            color: #008aff;
            font-size: 20px;
            line-height: 30px;
            width: 100%;
            height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .container_thr_conent_r_one_time {
          width: 100%;
          height: 20px;
          span {
            color: #999999;
            font-size: 12px;
            height: 20px;
            line-height: 20px;
            cursor: pointer;
          }
        }
        .container_thr_conent_r_one_show {
          width: 100%;
          margin-top: 30px;
          p {
            width: 100%;
            padding-right: 20px;
            box-sizing: border-box;
            color: #999999;
            font-size: 12px;
            line-height: 25px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            overflow: hidden;
          }
        }
      }
      .container_thr_conent_r_two {
        padding: 0 20px;
        width: 100%;
        height: 110px;
        margin-top: 20px;
        box-sizing: border-box;
        li {
          height: 30px;
          width: 100%;
          cursor: pointer;
          span {
            display: block;
            float: left;
            &:nth-child(1) {
              height: 100%;
              color: #333333;
              font-size: 14px;
              width: 360px;
              line-height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:hover {
                color: #008aff;
              }
              &::before {
                content: "";
                display: inline-block;
                width: 3px;
                height: 3px;
                background: #000;
                vertical-align: middle;
                margin-right: 10px;
              }
            }
            &:nth-child(2) {
              height: 100%;
              color: #999999;
              font-size: 12px;
              float: right;
              width: 130px;
              line-height: 30px;
            }
          }
        }
      }
    }
  }
}
</style>
