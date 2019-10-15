<template>
  <div class="baseservices">
    <div class="container">
      <ul>
        <li @click="gotoshow(g.id)" v-for="(g,index) in datas" :key="index">
          <div class="container_img">
            <el-image :src="g.cover" fit="cover" style="width: 246px;height:176px">
              <div
                slot="error"
                class="image-slot"
                style="font-size: 45px;line-height: 176px;text-align: center;color:#ccc;"
              >
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <div class="container_conent">
            <p>{{g.title}}</p>
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
      <div v-if="!nomore" class="block" :style="{'float':'right','margin':'30px 0'}">
          <pagination
            :param="pages"
            :page-sizes="[8, 12, 16]"
            :total="totalNum"
            @change="getlist"
          ></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getaccesstobasedetails,
  accesstobaseservicesdetails
} from "@/api/frontstage";
export default {
  name: "baseservices",
  data() {
    return {
      datas: [],
      lists: [],
      nomore: false,
      pages: {
        pageNum: 1,
        pageSize: 8
      }
    };
  },
  created() {
    // alert(1231131313)
    this.getlist();
    // this.lists = JSON.parse(sessionStorage.getItem("xkbase"))
    // console.log(this.lists)
  },
  watch: {
    "datas.length": {
      handler(newval, oldval) {
        if (newval === 0 || newval==undefined ) {
          this.nomore = true;
        } else {
          this.nomore = false;
        }
      },
      deep: true
    }
  },
  methods: {
    async getlist() {
      let nid = localStorage.getItem("nid");
      let oid = this.$route.query.id;
      let id = "";
      if (oid) {
        id = oid;
      } else {
        id = nid;
      }
      let res = await accesstobaseservicesdetails({ baseinfoId: id }, this.pages);
      // console.log(res);
      if(res.data.code != 200){
        
        return
      }
      this.datas = res.data.entity.resultData;
      this.totalNum = res.data.entity.totalNum;
      
    },

    gotoshow(id) {
      localStorage.setItem("zid", id);
      this.$router.push({ path: "/basedetails", query: { id: id } });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 15px 22px;
  box-sizing: border-box;
  background: #fff;
  margin-top: 10px;
  overflow: hidden;
  margin-bottom: 50px;
  ul {
    width: 100%;
    height: 100%;
    overflow: hidden;
    li {
      padding: 10px;
      box-sizing: border-box;
      float: left;
      width: 268px;
      height: 228px;
      border: 1px solid #ccc;
      margin-right: 28px;
      margin-bottom: 22px;
      &:nth-child(4n) {
        margin-right: 0px;
      }
      &:hover {
        .container_conent {
          p {
            color: #008aff;
          }
        }
      }
      .container_img {
        width: 100%;
        height: 176px;
      }
      .container_conent {
        width: 100%;
        padding:0 10px;
        margin-top: 10px;
        box-sizing: border-box;
        p {
          width: 100%;
          font-size: 16px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>