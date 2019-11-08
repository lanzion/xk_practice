<template>
  <div class="uploadworks">
    <ul>
      <li v-for="(item,index) in datas" :key="index">
        <div>
          <ov-image :src-data="getFileUrl(item.cover)"></ov-image>
        </div>
        <h4>{{item.name}}</h4>
        <span @click="changes(item.id)" class="activeone">上传作品</span>
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
import { listofUnuploadedCourseWorks } from '@/api/frontstage'
export default {
    name: 'uploadworks',
    data() {
        return {
            datas: [],
            pass: true,
            code: '',
            pages: {
                pageNum: 1,
                pageSize: 9
            },
            nomore: false,
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
        async getlist() {
            let res = await listofUnuploadedCourseWorks(
                { name: this.listname },
                this.pages
            )
            if (res.data.entity) {
                this.datas = res.data.entity.resultData
            }
            this.totalNum = res.data.entity.totalNum
        },
        changes(id) {
            this.$router.push({
                path: '/space/mywork/submissionofworks',
                query: { id: id, type: 2 }
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
      margin-left: 28px;
      margin-bottom: 40px;
      overflow: hidden;
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
        height: 30px;
        font-size: 14px;
        display: block;
        text-indent: 6px;
        border-radius: 12px;
        width: 100px;
        text-align: center;
        line-height: 30px;
         border: 1px solid #008aff;
         color: #008aff;
        &:hover {
          background-color: #008aff;
          color: #ffffff;
        }
      }
    }
  }
}

</style>
