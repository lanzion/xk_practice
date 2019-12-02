<template>
  <div class="activityfruilist">
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl" @submit.native.prevent>
        <el-form-item label="类型">
          <el-select v-model="form.resultType" placeholder="请选择类型" @change="resetPage" clearable>
            <el-option
              v-for="item in resultTypeList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.resultStatus" placeholder="请选择类型" @change="resetPage" clearable>
            <el-option
              v-for="item in resultStatusList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input v-model="form.title" placeholder="请输入标题关键字" @keyup.native.enter="resetPage"></el-input>
        </el-form-item>
        <el-button type="primary" @click="resetPage">搜索</el-button>
      </el-form>
      <div class="fr">
        <section class="g-table--head clearfix fr">
          <head-operate class="fr" :items="headBtnGroup" />
        </section>
      </div>
    </div>

    <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border>
      <el-table-column prop="title" label="活动成果标题" align="center" sortable show-overflow-tooltip />
      <el-table-column prop="courseName" label="关联活动" align="center" show-overflow-tooltip />
      <el-table-column
        prop="resultTypeName"
        label="类型"
        align="center"
        sortable
        show-overflow-tooltip
      />
      <el-table-column prop="createName" label="发布者" align="center" sortable show-overflow-tooltip />
      <el-table-column prop="gmtModify" label="更新时间" align="center" sortable show-overflow-tooltip />
      <el-table-column
        prop="publishDate"
        label="发布时间"
        align="center"
        sortable
        show-overflow-tooltip
      />
      <el-table-column prop="resultStatusName" label="状态" align="center" show-overflow-tooltip />
      <el-table-column label="审核者" align="center" show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.auditUserName?scope.row.auditUserName:'-'}}</template>
      </el-table-column>
      <el-table-column label="操作" align="center" :width="operateWidth">
        <template slot-scope="scope">
          <list-operate
            :items="listBtnGroup"
            :data="scope.row"
            :index="scope.$index"
            v-bind="{
                         edit: {visible:(scope.row.resultStatus!=0&&scope.row.resultStatus!=-3),  query: { id: 'id'} },
                         del: {callback:del},
                         shieid: {visible:scope.row.resultStatus==1,callback:shieid},
                         open: {visible:scope.row.resultStatus==-3,callback:open},
                    }"
          />
        </template>
      </el-table-column>
    </el-table>

    <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>

    <el-dialog title :visible.sync="dialogVisible" width="500px">
      <div class="visble_conter">
        <div class="visble_title">
          <span>*</span> 请选择屏蔽原因：
        </div>
        <div class="radio_list">
          <el-row>
            <el-col :span="8">
              <el-radio v-model="radio" label="内容抄袭">内容抄袭</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="违法信息">违法信息</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="人身攻击">人身攻击</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="涉黄信息">涉黄信息</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="不实信息">不实信息</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="广告营销">广告营销</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="涉及隐私">涉及隐私</el-radio>
            </el-col>
            <el-col :span="8">
              <el-radio v-model="radio" label="其它">其它</el-radio>
            </el-col>
          </el-row>
        </div>
        <div class="other" v-if="radio=='其它'">
          <div class="visble_title">
            <span>*</span> 屏蔽原因说明：
          </div>
          <div>
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="othertxt"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="shieidSubmi">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import permission from "@/mixin/admin-operate";
import user from "@/mixin/admin-user";
import {
  activityResultList,
  resultActivityDelete,
  activityResultPublishLockList,
  resultLockChange
} from "@/api/newApi";
export default {
  mixins: [permission, user],
  data() {
    return {
      resultStatusList: [
        {
          value: -3,
          name: "已屏蔽 "
        },
        {
          value: -2,
          name: "不通过"
        },
        {
          value: -1,
          name: "草稿"
        },
        {
          value: 0,
          name: "待审核"
        },
        {
          value: 1,
          name: "已发布"
        }
      ],
      resultTypeList: [
        {
          value: 1,
          name: "活动小结"
        },
        {
          value: 2,
          name: "学生作品"
        },
        {
          value: 3,
          name: "学生感悟"
        },
        {
          value: 4,
          name: "活动影像"
        }
      ],
      form: {},
      listData: [],
      dialogVisible: false,
      radio: "",
      othertxt: "",
      shieidData: {}
    };
  },
  computed: {
    ...mapState("login", {
      identity: state => state.identity || {}
    })
  },
  methods: {
    // 重置分页
    resetPage() {
      this.$set(this.pages, "pageNum", 1);
      this.getDatas();
    },
    async getDatas() {
      let haed;
      if (this.identity == 9) haed = activityResultList;
      else haed = activityResultPublishLockList;
      this.isLoading = true;
      const formList = Object.assign({}, this.form);
      const res = await haed(formList, this.pages);

      const { entity: datas = {} } = res.data;
      try {
        this.listData = datas.resultData || [];
        this.totalNum = datas.totalNum || 0;
      } catch (error) {
        this.listData = [];
      } finally {
        this.isLoading = false;
      }
    },
    goPulish() {
      this.$router.push({ path: "/activityfruit/publishActivityfruit" });
    },
    del(data) {
      let id = data.data.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          resultActivityDelete({ id }).then(res => {
            try {
              let _data = res.data;
              if (_data.code == 200) {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.getDatas();
              } else {
                this.$message({
                  message: res.data.msg || `删除失败`,
                  type: "error"
                });
              }
            } catch (err) {
              console.log(err);
            } finally {
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    shieidSubmi() {
      let content = "";
      content = this.radio == "其它" ? this.othertxt : this.radio;
      if (!content) {
        this.$message({
          message: "请选择屏蔽原因或填写屏蔽原因",
          type: "warning"
        });
        return;
      }
      resultLockChange({
        activityResultId: this.shieidData.id,
        content: content
      }).then(res => {
        let _data = res.data;
        if (_data.code == 200) {
          this.$message({
            message: "屏蔽成功",
            type: "success"
          });
          this.shieidData.resultStatus = -3;
          this.shieidData.resultStatusName = "已屏蔽";
          this.dialogVisible = false;
        } else {
          this.$message({
            message: _data.msg || "屏蔽失败",
            type: "error"
          });
        }
      });
    },
    shieid(data) {
      this.dialogVisible = true;
      this.shieidData = data.data;
    },
    open(data) {
      this.$confirm("确定启用内容吗？启用后用户将会看到。", " ", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          resultLockChange({ activityResultId: data.data.id }).then(res => {
            let _data = res.data;
            if (_data.code == 200) {
              this.$message({
                message: "启用成功",
                type: "success"
              });
              data.data.resultStatus = 1;
              data.data.resultStatusName = "已发布";
            } else {
              this.$message({
                message: _data.msg || "启用失败",
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    }
  },
  created() {
    this.getDatas();
  }
};
</script>

<style lang="scss" scoped>
.visble_conter {
  line-height: 30px;
  .visble_title {
    color: #000;
    span {
      color: #d9001b;
    }
  }
}
</style>