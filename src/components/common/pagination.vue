<template>
    <div class="pagination">
        <el-pagination :layout="layout" :total="total"
            :current-page="param.pageNum"
            :page-size="param.pageSize"
            :page-sizes="pageSizes"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange" />
    </div>
</template>

<script>
export default {
    name: 'pagination',
    props: {
        layout: {
            type: String,
            default: 'total,sizes, prev, pager, next,jumper'
        },
        pageSizes: {
            type: Array,
            default() {
                return [10, 15, 20]
            }
        },
        param: {
            type: Object,
            default() {
                return { pageSize: 10, pageNum: 1 }
            }
        },
        total: {
            type: Number,
            default: 0
        },
    },
    methods: {
        handleCurrentChange(val) {
            this.param.pageNum = val
            this.$emit('change', this.param)
        },
        handleSizeChange(val) {
            this.param.pageSize = val
            this.$emit('change', this.param)
        }
    }
}
</script>

<style lang='scss' scoped>
.pagination {
    width: 100%;
    margin: 20px auto;
    text-align: center;

    &.is-right {
        text-align: right;
    }
}
</style>
