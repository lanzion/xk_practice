<template>
  <div class="school-list-wrap">
    <!-- 搜索表单 -->
    <div class="g-search--wrap clearfix">
      <el-form :inline="true" class="fl elFrom" @submit.native.prevent>
        <el-form-item label="点评状态">
          <el-select v-model="form.commentStatus" placeholder="全部状态" @change="resetPage" clearable>
            <el-option
              v-for="item in fpStates"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动标题">
          <el-input
            v-model="form.activityTitle"
            placeholder="请输入活动标题"
            @keyup.native.enter="resetPage"
          ></el-input>
        </el-form-item>
        <el-form-item label="参与学校">
          <el-input v-model="form.schoolName" placeholder="请输入学校名称" @keyup.native.enter="resetPage"></el-input>
        </el-form-item>
        <el-button type="primary" plain @click="getDatas">搜索</el-button>
      </el-form>
    </div>
    <el-table ref="table" :data="listData" stripe align="center" v-loading="isLoading" border>
      <el-table-column
        prop="activityTitle"
        label="活动标题"
        align="center"
        sortable
        show-overflow-tooltip
      />
      <el-table-column prop="createDate" label="分配时间" align="center" />
      <el-table-column prop="schoolName" label="参与学校" align="center" />
      <el-table-column prop="liaisonMan" label="联系人" align="center" />
      <el-table-column prop="linkNumber" label="联系方式" align="center" />

      <el-table-column label="点评状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.commentStatus=='B'">未点评</span>
          <span v-else-if="scope.row.commentStatus=='A'">已点评</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            class="g-table--link"
            type="text"
            v-if="scope.row.commentStatus=='A'"
            @click="goDetail(scope.row,'detail')"
          >点评详情</el-button>
          <el-button
            class="g-table--link"
            @click="goDetail(scope.row,'add')"
            type="text"
            v-else
          >活动点评</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination :param="pages" :total="totalNum" @change="getDatas"></pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { commentList } from '@/api/resetApi'

import permission from '@/mixin/admin-operate'
import user from '@/mixin/admin-user'

export default {
    mixins: [permission, user],
    data() {
        return {
            form: {
                activityTitle: '',
                commentStatus: '',
                schoolName: ''
            },
            listData: [],
            fpStates: [
                {
                    value: 'B',
                    label: '未点评'
                },
                {
                    value: 'A',
                    label: '已点评'
                }
            ]
        }
    },
    computed: {},
    created() {
        this.getDatas()
    },
    watch: {},
    methods: {
        goDetail(row, key) {
            if (key == 'add') {
                this.$router.push({
                    path: `/practicalManage/practicalComment/${key}`,
                    query: {
                        id: row.id,
                        schoolName: row.schoolName,
                        activityId: row.activityId,
                        schoolId: row.schoolId
                    }
                })
            } else {
                this.$router.push({
                    path: `/practicalManage/practicalComment/${key}`,
                    query: { id: row.id }
                })
            }
        },
        // 重置分页
        resetPage() {
            this.$set(this.pages, 'pageNum', 1)
            this.getDatas()
        },
        // 获取列表数据
        async getDatas() {
            this.isLoading = true

            const formList = Object.assign({}, this.form)
            const res = await commentList(formList, this.pages)

            const { entity: datas = {} } = res.data

            try {
                this.listData = datas.resultData || []
                this.totalNum = datas.totalNum || 0
            } catch (error) {
                this.listData = []
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>

<style lang='scss' scoped>
.elFrom {
  width: 100%;
}
</style>
